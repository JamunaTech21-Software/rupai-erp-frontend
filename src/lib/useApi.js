import { useCallback, useEffect, useRef, useState } from "react";

// Runs `fn()` (an api call) when `deps` change; gives { data, loading, error, reload }.
// A reload keeps the old data on screen (loading stays true) so lists do not flash empty.
export function useApi(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const requestId = useRef(0);

  const run = useCallback(() => {
    const id = ++requestId.current;
    setState((current) => ({ ...current, loading: true, error: null }));
    return fnRef
      .current()
      .then((data) => {
        if (id === requestId.current) setState({ data, loading: false, error: null });
        return data;
      })
      .catch((error) => {
        if (id === requestId.current) setState((current) => ({ ...current, loading: false, error }));
      });
  }, []);

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, reload: run };
}
