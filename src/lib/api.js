// One place for every backend call. Pages use `api.get/post/put/del/upload` only.
// The API address comes from VITE_API_URL (set in .env locally, in the Vercel project settings when deployed).
// Only `npm run dev` falls back to the local Docker backend; a production build without it fails loudly.
const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:4100/api/v1" : "");
if (!BASE_URL) {
  console.error("VITE_API_URL is not set: add it in the Vercel project settings (Environment Variables) and redeploy.");
}
const ACCESS_KEY = "rupai.accessToken";
const REFRESH_KEY = "rupai.refreshToken";

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
  set({ accessToken, refreshToken }) {
    if (accessToken) localStorage.setItem(ACCESS_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

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

function goToLogin() {
  tokens.clear();
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
      if (!response.ok) return false;
      tokens.set(await response.json());
      return true;
    })()
      .catch(() => false)
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

async function send(method, path, { params, body, form, auth = true } = {}, retried = false) {
  const headers = {};
  if (auth && tokens.access) headers.Authorization = `Bearer ${tokens.access}`;
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
    if (await refreshTokens()) return send(method, path, { params, body, form, auth }, true);
    goToLogin();
  }

  const data = await parse(response);
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

export const api = {
  get: (path, params) => send("GET", path, { params }),
  post: (path, body) => send("POST", path, { body: body ?? {} }),
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
