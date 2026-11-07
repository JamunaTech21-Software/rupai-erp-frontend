import { useCallback, useEffect, useRef, useState } from "react";

// How soon a page that has records waiting for approval looks again, and the least gap between two quiet refreshes.
const WATCH_MS = 8000;
const MIN_GAP_MS = 2000;

// Runs `fn()` (an api call) when `deps` change; gives { data, loading, error, reload }.
// A reload keeps the old data on screen (loading stays true) so lists do not flash empty.
//
// It also looks again by itself, quietly, so a change approved somewhere else shows up without a page refresh:
//  - when the browser tab is opened or focused again;
//  - every few seconds while the data holds a record that is waiting for approval (`pendingRequest`).
// A quiet refresh changes nothing on screen unless the data really changed.
export function useApi(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const requestId = useRef(0);
  const dataRef = useRef(null);
  const lastRun = useRef(0);

  const run = useCallback(() => {
    const id = ++requestId.current;
    lastRun.current = Date.now();
    setState((current) => ({ ...current, loading: true, error: null }));
    return fnRef
      .current()
      .then((data) => {
        if (id === requestId.current) {
          // The same answer keeps the same object, so nothing that depends on it runs again.
          const same = JSON.stringify(data) === JSON.stringify(dataRef.current);
          const keep = same ? dataRef.current : data;
          dataRef.current = keep;
          setState({ data: keep, loading: false, error: null });
        }
        return data;
      })
      .catch((error) => {
        if (id === requestId.current) setState((current) => ({ ...current, loading: false, error }));
      });
  }, []);

  // The quiet version: no loading flag, errors ignored, and the screen only changes when the answer is different.
  const quiet = useCallback(() => {
    const id = requestId.current;
    lastRun.current = Date.now();
    return fnRef
      .current()
      .then((data) => {
        if (id !== requestId.current) return;
        if (JSON.stringify(data) === JSON.stringify(dataRef.current)) return;
        dataRef.current = data;
        setState({ data, loading: false, error: null });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // Look again when the user comes back to this tab.
  useEffect(() => {
    const comeBack = () => {
      if (document.visibilityState === "hidden") return;
      if (Date.now() - lastRun.current < MIN_GAP_MS) return;
      quiet();
    };
    window.addEventListener("focus", comeBack);
    document.addEventListener("visibilitychange", comeBack);
    return () => {
      window.removeEventListener("focus", comeBack);
      document.removeEventListener("visibilitychange", comeBack);
    };
  }, [quiet]);

  // While a record is waiting for approval, keep looking so its approval shows up on its own.
  const waiting = typeof state.data === "object" && state.data !== null && JSON.stringify(state.data).includes('"pendingRequest":{');
  useEffect(() => {
    if (!waiting) return undefined;
    const timer = setInterval(() => {
      if (document.visibilityState !== "hidden") quiet();
    }, WATCH_MS);
    return () => clearInterval(timer);
  }, [waiting, quiet]);

  // `refresh` is the quiet version of `reload`: no loading flag, and the screen changes only if the data changed.
  return { ...state, reload: run, refresh: quiet };
}
