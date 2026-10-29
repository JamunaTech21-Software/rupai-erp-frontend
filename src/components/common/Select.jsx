import { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Search } from "lucide-react";

// Classes that place the select in its row (width, margin, flex/grid sizing) belong to the outer box;
// the rest (border, padding, text, colours) belong to the visible button.
const LAYOUT_CLASS = /^(?:[a-z0-9-]+:)*(?:w-|min-w-|max-w-|flex-1$|flex-none$|shrink|grow|col-span-|col-start-|row-span-|self-|justify-self-|-?m[trblxy]?-|order-)/;

const ESTIMATED_LIST_HEIGHT = 288;

const nativeValue = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value");

function readOptions(select) {
  if (!select) return [];
  return Array.from(select.options).map((option) => ({
    value: option.value,
    text: option.text,
    disabled: option.disabled,
  }));
}

// A drop-in replacement for <select>: same props, same <option> children, same react-hook-form
// register / setValue / reset behaviour, but the list opens in a box where you can type to filter.
// A real (hidden) <select> stays in the page, so the form value, validation and onChange work as before.
const Select = forwardRef(function Select({ className = "", children, disabled, onBlur, ...rest }, forwardedRef) {
  const selectRef = useRef(null);
  const buttonRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const popupRef = useRef(null);
  const [, bump] = useState(0);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [box, setBox] = useState(null);

  const setRefs = useCallback(
    (element) => {
      selectRef.current = element;
      if (typeof forwardedRef === "function") forwardedRef(element);
      else if (forwardedRef) forwardedRef.current = element;
      if (!element || element.__searchable) return;
      element.__searchable = true;
      // react-hook-form sets .value directly (setValue, reset) and calls .focus() on a field with an error.
      Object.defineProperty(element, "value", {
        configurable: true,
        get() {
          return nativeValue.get.call(this);
        },
        set(next) {
          nativeValue.set.call(this, next);
          bump((n) => n + 1);
        },
      });
      element.focus = (options) => buttonRef.current?.focus(options);
    },
    [forwardedRef],
  );

  // After every render, read what the real <select> holds (its options and the chosen one) and show it.
  const [snap, setSnap] = useState({ signature: "", label: "", placeholder: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const element = selectRef.current;
    if (!element) return;
    const chosen = element.selectedIndex >= 0 ? element.options[element.selectedIndex] : null;
    const next = {
      signature: Array.from(element.options).map((o) => `${o.value}${o.text}${o.disabled}`).join(""),
      label: chosen ? chosen.text : "",
      placeholder: !chosen || chosen.value === "",
    };
    setSnap((current) => (current.signature === next.signature && current.label === next.label && current.placeholder === next.placeholder ? current : next));
  });
  const { label, placeholder: isPlaceholder, signature } = snap;

  const options = useMemo(() => readOptions(selectRef.current), [signature]); // eslint-disable-line react-hooks/exhaustive-deps
  const needle = query.trim().toLowerCase();
  const shown = needle ? options.filter((o) => o.text.toLowerCase().includes(needle)) : options;

  const place = useCallback(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const below = window.innerHeight - rect.bottom;
    const flip = below < Math.min(ESTIMATED_LIST_HEIGHT, 220) && rect.top > below;
    setBox({
      left: Math.max(4, Math.min(rect.left, window.innerWidth - Math.max(rect.width, 160) - 4)),
      width: Math.max(rect.width, 160),
      ...(flip ? { bottom: window.innerHeight - rect.top + 4 } : { top: rect.bottom + 4 }),
      maxHeight: Math.max(160, (flip ? rect.top : below) - 16),
    });
  }, []);

  const close = useCallback((refocus) => {
    setOpen(false);
    setQuery("");
    if (refocus) buttonRef.current?.focus();
  }, []);

  const openList = () => {
    if (disabled) return;
    const index = options.findIndex((o) => o.value === (selectRef.current?.value ?? ""));
    setActive(Math.max(0, index));
    setQuery("");
    place();
    setOpen(true);
  };

  const choose = (option) => {
    if (!option || option.disabled) return;
    const element = selectRef.current;
    if (element && nativeValue.get.call(element) !== option.value) {
      // Set the value the way the browser does and fire a real change event, so React's onChange runs.
      nativeValue.set.call(element, option.value);
      element.dispatchEvent(new Event("change", { bubbles: true }));
      bump((n) => n + 1);
    }
    close(true);
  };

  useEffect(() => {
    if (!open) return undefined;
    searchRef.current?.focus();
    const onDown = (event) => {
      if (popupRef.current?.contains(event.target) || buttonRef.current?.contains(event.target)) return;
      close(false);
    };
    const onScroll = (event) => {
      if (popupRef.current?.contains(event.target)) return;
      close(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", place);
    };
  }, [open, close, place]);

  // Keep the highlighted row in view.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, shown.length]);

  const onButtonKey = (event) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openList();
    }
  };

  const onSearchKey = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(shown.length - 1, i + 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(shown[active]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      close(true);
    } else if (event.key === "Tab") {
      close(false);
    }
  };

  const tokens = String(className).split(/\s+/).filter(Boolean);
  const outerClass = tokens.filter((t) => LAYOUT_CLASS.test(t)).join(" ");
  const innerClass = tokens.filter((t) => !LAYOUT_CLASS.test(t)).join(" ");
  const gap = { paddingRight: "2rem" };

  return (
    <div className={`relative inline-block max-w-full align-top ${outerClass}`}>
      {/* The real select: keeps the form value, and sizes the box to the longest option. */}
      <select
        {...rest}
        ref={setRefs}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden='true'
        className={`pointer-events-none block w-full opacity-0 ${innerClass}`}
        style={gap}
      >
        {children}
      </select>
      <button
        ref={buttonRef}
        type='button'
        disabled={disabled}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-label={rest["aria-label"]}
        onClick={() => (open ? close(false) : openList())}
        onKeyDown={onButtonKey}
        onBlur={(event) => {
          if (popupRef.current?.contains(event.relatedTarget)) return;
          onBlur?.({ target: selectRef.current, currentTarget: selectRef.current, type: "blur" });
        }}
        className={`absolute inset-0 flex w-full items-center text-left ${innerClass} ${isPlaceholder ? "text-gray-500" : ""}`}
        style={gap}
      >
        <span className='block min-w-0 flex-1 truncate'>{label}</span>
        <ChevronDown size={16} className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open &&
        box &&
        createPortal(
          <div
            ref={popupRef}
            style={{ position: "fixed", zIndex: 300, left: box.left, width: box.width, top: box.top, bottom: box.bottom, maxHeight: box.maxHeight }}
            className='flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-sm shadow-lg'
          >
            <div className='flex items-center gap-2 border-b border-gray-100 px-3 py-2'>
              <Search size={14} className='shrink-0 text-gray-400' />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onSearchKey}
                placeholder='Search...'
                aria-label='Search options'
                className='w-full min-w-0 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400'
              />
            </div>
            <ul ref={listRef} role='listbox' className='min-h-0 flex-1 overflow-y-auto py-1'>
              {shown.length === 0 && <li className='px-3 py-2 text-gray-400'>No match</li>}
              {shown.map((option, index) => {
                const isSelected = option.value === (selectRef.current?.value ?? "");
                return (
                  <li
                    key={`${option.value}-${index}`}
                    data-index={index}
                    role='option'
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    onMouseEnter={() => setActive(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => choose(option)}
                    className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-1.5 ${
                      option.disabled ? "cursor-not-allowed text-gray-300" : index === active ? "bg-green-50 text-green-800" : "text-gray-700"
                    } ${isSelected ? "font-semibold" : ""} ${option.value === "" ? "text-gray-500" : ""}`}
                  >
                    <span className='truncate'>{option.text}</span>
                    {isSelected && <Check size={14} className='shrink-0 text-green-700' />}
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body,
        )}
    </div>
  );
});

export default Select;
