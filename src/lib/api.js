// One place for every backend call. Pages use `api.get/post/put/del/upload` only.
// The API address comes from VITE_API_URL (set in .env locally, in the Vercel project settings when deployed).
// Only `npm run dev` falls back to the local Docker backend; a production build without it fails loudly.
import toast from "react-hot-toast";

const RAW_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:4100/api/v1" : "");
// VITE_API_URL may be given with or without the /api/v1 part and with or without a trailing slash.
const BASE_URL = RAW_URL ? `${RAW_URL.replace(/\/+$/, "").replace(/\/api\/v1$/, "")}/api/v1` : "";
if (!BASE_URL) {
  console.error("VITE_API_URL is not set: add it in the Vercel project settings (Environment Variables) and redeploy.");
}
const ACCESS_KEY = "rupai.accessToken";
const REFRESH_KEY = "rupai.refreshToken";
// RP1-170/171: when the session ends (an ISO time from login / refresh), the idle limit, and the last use (shared by every tab).
const SESSION_END_KEY = "rupai.sessionEndsAt";
const IDLE_KEY = "rupai.idleMinutes";
const ACTIVITY_KEY = "rupai.lastActivity";
const NOTICE_KEY = "rupai.loginNotice";
export const SESSION_ENDED = "Your session has ended. Please sign in again.";

export class ApiError extends Error {
  constructor(status, code, message, fields = {}, body = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
    this.body = body;
  }
}

export const tokens = {
  get access() {
    return localStorage.getItem(ACCESS_KEY);
  },
  get refresh() {
    return localStorage.getItem(REFRESH_KEY);
  },
  get sessionEndsAt() {
    const value = Date.parse(localStorage.getItem(SESSION_END_KEY) ?? "");
    return Number.isNaN(value) ? null : value;
  },
  get idleMinutes() {
    const value = Number(localStorage.getItem(IDLE_KEY));
    return value > 0 ? value : 30;
  },
  get lastActivity() {
    return Number(localStorage.getItem(ACTIVITY_KEY)) || Date.now();
  },
  // Signed in, and the session's end has not passed.
  valid() {
    const end = this.sessionEndsAt;
    return !!this.access && !(end && end <= Date.now());
  },
  set({ accessToken, refreshToken, sessionEndsAt, idleMinutes }) {
    if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
    if (sessionEndsAt) localStorage.setItem(SESSION_END_KEY, sessionEndsAt);
    if (idleMinutes) localStorage.setItem(IDLE_KEY, String(idleMinutes));
  },
  touch() {
    localStorage.setItem(ACTIVITY_KEY, String(Date.now()));
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(SESSION_END_KEY);
    localStorage.removeItem(IDLE_KEY);
    localStorage.removeItem(ACTIVITY_KEY);
  },
};

// The message the sign-in page shows once after a sign-out we caused.
export const loginNotice = {
  set: (message) => sessionStorage.setItem(NOTICE_KEY, message),
  take() {
    const message = sessionStorage.getItem(NOTICE_KEY);
    sessionStorage.removeItem(NOTICE_KEY);
    return message ?? "";
  },
};

// Ends the session here: tokens cleared, then /login?returnTo= with the message. The server is told (best effort).
export function endSession(message = SESSION_ENDED) {
  const refreshToken = tokens.refresh;
  if (refreshToken) {
    fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => {});
  }
  goToLogin(message);
}

// Query string from params; empty values are skipped, arrays repeat the key.
function toQuery(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) value.forEach((item) => query.append(key, item));
    else query.append(key, value);
  }
  const text = query.toString();
  return text ? `?${text}` : "";
}

function goToLogin(message = SESSION_ENDED) {
  tokens.clear();
  loginNotice.set(message);
  const here = window.location.pathname + window.location.search;
  if (!window.location.pathname.startsWith("/login")) {
    window.location.assign(`/login?returnTo=${encodeURIComponent(here)}`);
  }
}

// One refresh at a time, shared by every call that got a 401.
let refreshing = null;
function refreshTokens() {
  if (!refreshing) {
    refreshing = (async () => {
      const refreshToken = tokens.refresh;
      if (!refreshToken) return false;
      const response = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) {
        // Another tab may have refreshed first (a refresh token works once): its new tokens are then already saved.
        return tokens.refresh !== refreshToken && !!tokens.refresh;
      }
      tokens.set(await response.json());
      return true;
    })()
      .catch(() => (navigator.onLine === false ? null : false))
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
}

async function parse(response) {
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function send(method, path, { params, body, form, auth = true, quiet = false } = {}, retried = false) {
  const headers = {};
  const sentToken = tokens.access;
  if (auth && sentToken) headers.Authorization = `Bearer ${sentToken}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}${toQuery(params)}`, {
      method,
      headers,
      body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
    });
  } catch {
    throw new ApiError(0, "NETWORK", "Cannot reach the server. Check your connection and try again.");
  }

  if (response.status === 401 && auth && !retried && path !== "/auth/login") {
    // The token was already replaced (a refresh finished while this call was on its way): send it again as is.
    const refreshed = tokens.access && tokens.access !== sentToken ? true : await refreshTokens();
    if (refreshed) return send(method, path, { params, body, form, auth, quiet }, true);
    // null: the server could not be reached, so the session is not known to be over; do not sign out.
    if (refreshed === false) goToLogin();
  }

  const data = await parse(response);
  // 202: the module's approval is On, so the change waits on the Approval Dashboard and nothing is saved yet.
  // The toast is shown here, once; pages only check `result.pending` to skip their "saved" steps.
  if (response.status === 202) {
    if (quiet) return { pending: true, ...(data ?? {}) };
    const number = data?.approval?.requestNo;
    toast.success(
      data?.rows ? `${data.rows} workers sent for approval${number ? ` (${number})` : ""}` : `Sent for approval${number ? ` (${number})` : ""}`,
    );
    return { pending: true, ...(data ?? {}) };
  }
  if (!response.ok) {
    const error = data?.error ?? {};
    throw new ApiError(
      response.status,
      error.code ?? "SERVER_ERROR",
      error.message ?? "Something went wrong",
      error.fields ?? {},
      data,
    );
  }
  return data;
}

// The page's own "saved" toast, left out when the change was only sent for approval (the 202 toast was already shown).
export const notifySaved = (result, message) => {
  if (!result?.pending) toast.success(message);
};

export const api = {
  get: (path, params) => send("GET", path, { params }),
  // `options.quiet` skips the "Sent for approval" toast (bulk loops show one summary instead).
  post: (path, body, options) => send("POST", path, { body: body ?? {}, ...options }),
  put: (path, body) => send("PUT", path, { body: body ?? {} }),
  del: (path) => send("DELETE", path),
  // Sends one picked file (multipart field "file"); resolves to { id, url, name, size, type }.
  upload: (file) => {
    const form = new FormData();
    form.append("file", file);
    return send("POST", "/files", { form });
  },
  // Sends a picked file to any endpoint that takes multipart field "file" (spreadsheet imports).
  postFile: (path, file) => {
    const form = new FormData();
    form.append("file", file);
    return send("POST", path, { form });
  },
  // Fetches a file (a template) and returns it as a Blob.
  download: async (path, params) => {
    const call = () =>
      fetch(`${BASE_URL}${path}${toQuery(params)}`, { headers: tokens.access ? { Authorization: `Bearer ${tokens.access}` } : {} });
    let response = await call();
    if (response.status === 401 && (await refreshTokens())) response = await call();
    if (!response.ok) throw new ApiError(response.status, "SERVER_ERROR", "Could not download the file");
    return response.blob();
  },
  // Same, for calls that must not send a token or follow the 401 rule (login).
  public: {
    post: (path, body) => send("POST", path, { body, auth: false }),
  },
};
