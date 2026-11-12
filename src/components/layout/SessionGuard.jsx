import { useEffect, useRef, useState } from "react";
import { endSession, SESSION_ENDED, tokens } from "../../lib/api";

const WARNING_MS = 60_000; // the warning shows this long before the idle limit
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "wheel", "click"];

// RP1-171: signs the user out when the session ends (sessionEndsAt) or after the idle limit, warns a minute
// before the idle limit, and follows a sign-out made in another tab. Last use is shared between tabs.
export default function SessionGuard() {
  const [secondsLeft, setSecondsLeft] = useState(null); // null: no warning
  const warning = useRef(false);
  const lastWrite = useRef(0);

  useEffect(() => {
    if (!localStorage.getItem("rupai.lastActivity")) tokens.touch();

    // Use in this tab counts for every tab; written at most once a second. Ignored while the warning shows:
    // only "Stay signed in" answers it.
    const onActivity = () => {
      if (warning.current) return;
      const now = Date.now();
      if (now - lastWrite.current < 1000) return;
      lastWrite.current = now;
      tokens.touch();
    };
    ACTIVITY_EVENTS.forEach((name) => window.addEventListener(name, onActivity, { passive: true, capture: true }));

    const tick = () => {
      if (!tokens.access) return;
      const end = tokens.sessionEndsAt;
      if (end && end <= Date.now()) return endSession(SESSION_ENDED);
      const limit = tokens.idleMinutes * 60_000;
      const idle = Date.now() - tokens.lastActivity;
      if (idle >= limit) {
        return endSession(`You were signed out after ${tokens.idleMinutes} minutes without activity. Please sign in again.`);
      }
      if (idle >= limit - WARNING_MS) {
        warning.current = true;
        setSecondsLeft(Math.max(1, Math.ceil((limit - idle) / 1000)));
      } else if (warning.current) {
        // Another tab was used: the warning is answered.
        warning.current = false;
        setSecondsLeft(null);
      }
    };
    const timer = setInterval(tick, 1000);

    // Sign-out in another tab removes the token here too.
    const onStorage = (event) => {
      if (event.key === "rupai.accessToken" && !event.newValue) {
        window.location.assign("/login?returnTo=" + encodeURIComponent(window.location.pathname + window.location.search));
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearInterval(timer);
      window.removeEventListener("storage", onStorage);
      ACTIVITY_EVENTS.forEach((name) => window.removeEventListener(name, onActivity, { capture: true }));
    };
  }, []);

  const stay = () => {
    tokens.touch();
    warning.current = false;
    setSecondsLeft(null);
  };

  if (secondsLeft === null) return null;
  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4' role='dialog' aria-modal='true' aria-label='Session timeout'>
      <div className='w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl'>
        <h3 className='text-lg font-bold text-slate-800'>Still there?</h3>
        <p className='mt-2 text-sm text-slate-600'>You will be signed out in {secondsLeft} seconds.</p>
        <button
          type='button'
          onClick={stay}
          className='mt-5 w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark'
        >
          Stay signed in
        </button>
      </div>
    </div>
  );
}
