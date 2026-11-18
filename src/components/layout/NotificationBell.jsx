import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { api } from "../../lib/api";

// RP1-202 F.N.9 The header bell (RP1-201 contract): document expiry reminders and escalations.
// The badge is the signed-in user's unread count, refreshed every minute and when the tab comes back.
const REFRESH_MS = 60_000;
const LIST_SIZE = 10;
const DOT = { danger: "bg-red-500", warning: "bg-amber-500" };

const timeAgo = (iso) => {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true });
  } catch {
    return "";
  }
};

export default function NotificationBell() {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState({ loading: false, error: null, data: [], total: 0 });
  const [marking, setMarking] = useState(false);
  const boxRef = useRef(null);

  const loadCount = useCallback(() => {
    api
      .get("/notifications/unread-count")
      .then((result) => setUnread(result.unread ?? 0))
      .catch(() => {});
  }, []);

  const loadList = useCallback(() => {
    setList((current) => ({ ...current, loading: true, error: null }));
    api
      .get("/notifications", { perPage: LIST_SIZE })
      .then((result) => {
        setList({ loading: false, error: null, data: result.data ?? [], total: result.meta?.total ?? 0 });
        setUnread(result.meta?.unread ?? 0);
      })
      .catch((error) => setList((current) => ({ ...current, loading: false, error })));
  }, []);

  // Badge: now, every minute, and when the tab is opened again.
  useEffect(() => {
    loadCount();
    const timer = setInterval(loadCount, REFRESH_MS);
    const onFocus = () => document.visibilityState === "visible" && loadCount();
    document.addEventListener("visibilitychange", onFocus);
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onFocus);
      window.removeEventListener("focus", onFocus);
    };
  }, [loadCount]);

  // Close on a click outside.
  useEffect(() => {
    if (!open) return undefined;
    const outside = (event) => boxRef.current && !boxRef.current.contains(event.target) && setOpen(false);
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [open]);

  const toggle = () => {
    if (!open) loadList();
    setOpen((value) => !value);
  };

  // Open the document in the register (and mark the notification read).
  const openOne = async (item) => {
    setOpen(false);
    if (!item.read) {
      setUnread((count) => Math.max(0, count - 1));
      // Shown as read at once, also before the list loads again.
      setList((current) => ({ ...current, data: current.data.map((one) => (one.id === item.id ? { ...one, read: true } : one)) }));
      api
        .post(`/notifications/${item.id}/read`)
        .then((result) => setUnread(result.unread ?? 0))
        .catch(() => loadCount());
    }
    if (item.documentNo) navigate(`/documents-register?search=${encodeURIComponent(item.documentNo)}`);
  };

  const readAll = async () => {
    setMarking(true);
    try {
      await api.post("/notifications/read-all");
      setUnread(0);
      setList((current) => ({ ...current, data: current.data.map((item) => ({ ...item, read: true })) }));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className='relative' ref={boxRef}>
      <button
        type='button'
        onClick={toggle}
        className='relative cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        aria-expanded={open}
      >
        <Bell className='h-5 w-5' />
        {unread > 0 && (
          <span className='absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white'>
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          role='dialog'
          aria-label='Notifications'
          className='absolute right-0 top-full z-50 mt-2 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg'
        >
          <div className='flex items-center justify-between border-b border-slate-100 px-4 py-3'>
            <div>
              <p className='text-sm font-bold text-slate-800'>Notifications</p>
              <p className='text-[11px] text-slate-500'>{unread > 0 ? `${unread} unread` : "All caught up"}</p>
            </div>
            <button
              type='button'
              onClick={readAll}
              disabled={unread === 0 || marking}
              className='flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-primary hover:bg-primary-muted disabled:cursor-not-allowed disabled:opacity-40'
            >
              <CheckCheck className='h-3.5 w-3.5' />
              Mark all as read
            </button>
          </div>

          <div className='max-h-[60vh] overflow-y-auto'>
            {list.loading && list.data.length === 0 ? (
              <div className='space-y-2 p-4' aria-label='Loading'>
                {[0, 1, 2].map((i) => (
                  <div key={i} className='h-12 animate-pulse rounded-md bg-slate-100' />
                ))}
              </div>
            ) : list.error ? (
              <div className='p-4 text-sm'>
                <p className='text-red-600'>{list.error.message}</p>
                <button type='button' onClick={loadList} className='mt-2 cursor-pointer text-xs font-semibold text-primary hover:underline'>
                  Try again
                </button>
              </div>
            ) : list.data.length === 0 ? (
              <p className='px-4 py-8 text-center text-sm text-slate-500'>No notifications</p>
            ) : (
              <ul className='divide-y divide-slate-100'>
                {list.data.map((item) => (
                  <li key={item.id}>
                    <button
                      type='button'
                      onClick={() => openOne(item)}
                      className={`flex w-full cursor-pointer gap-3 px-4 py-3 text-left transition hover:bg-slate-50 ${item.read ? "" : "bg-primary-muted/40"}`}
                    >
                      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${DOT[item.level] ?? DOT.warning}`} aria-hidden='true' />
                      <span className='min-w-0 flex-1'>
                        <span className={`block text-sm ${item.read ? "font-medium text-slate-700" : "font-bold text-slate-900"}`}>{item.title}</span>
                        <span className='mt-0.5 block text-xs text-slate-600'>{item.message}</span>
                        <span className='mt-1 block text-[11px] text-slate-400'>
                          {item.kindLabel} · {timeAgo(item.createdAt)}
                        </span>
                      </span>
                      {!item.read && <span className='mt-1 shrink-0 text-[10px] font-bold uppercase text-primary'>New</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {list.total > list.data.length && (
            <p className='border-t border-slate-100 px-4 py-2 text-center text-[11px] text-slate-500'>
              Showing the latest {list.data.length} of {list.total}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
