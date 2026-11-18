import { useCallback, useMemo, useState } from "react";

// RP1-206 Column management for a table: which columns are shown, saved in this browser.
//
// columns: [{ key, label, locked?, hidden? }]
//   locked = always shown (not in the picker's choices); hidden = hidden by default.
// Only the hidden keys are saved (localStorage `columns:<storageKey>`), so a column added later shows by default.
const read = (storageKey) => {
  try {
    const saved = JSON.parse(localStorage.getItem(`columns:${storageKey}`));
    return Array.isArray(saved) ? saved : null;
  } catch {
    return null;
  }
};

export function useColumns(storageKey, columns) {
  const defaults = useMemo(() => columns.filter((column) => column.hidden && !column.locked).map((column) => column.key), [columns]);
  const [hidden, setHidden] = useState(() => read(storageKey) ?? defaults);

  const save = useCallback(
    (next) => {
      setHidden(next);
      try {
        localStorage.setItem(`columns:${storageKey}`, JSON.stringify(next));
      } catch {
        // Private mode or full storage: the choice still applies until the page is reloaded.
      }
    },
    [storageKey],
  );

  const isShown = useCallback((key) => columns.find((column) => column.key === key)?.locked || !hidden.includes(key), [columns, hidden]);
  const visible = useMemo(() => columns.filter((column) => isShown(column.key)), [columns, isShown]);
  const toggle = (key) => save(hidden.includes(key) ? hidden.filter((item) => item !== key) : [...hidden, key]);
  const reset = () => {
    try {
      localStorage.removeItem(`columns:${storageKey}`);
    } catch {
      // ignore
    }
    setHidden(defaults);
  };
  const isDefault = hidden.length === defaults.length && defaults.every((key) => hidden.includes(key));

  return { columns, visible, isShown, toggle, reset, isDefault };
}
