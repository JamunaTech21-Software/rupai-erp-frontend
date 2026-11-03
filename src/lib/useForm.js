import { useEffect, useRef } from "react";
import { useForm as useHookForm } from "react-hook-form";

// react-hook-form's useForm, plus: every field that has an error gets a red border and, when the page
// has no error line of its own under it, the message too. Pages import this instead of "react-hook-form".
export function useForm(options) {
  const form = useHookForm(options);
  const { errors } = form.formState;
  const control = form.control;
  const marked = useRef([]);

  useEffect(() => {
    marked.current.forEach((el) => {
      el.removeAttribute("data-invalid");
      if (el.hasAttribute("data-field-error")) el.remove();
    });
    marked.current = [];
    const mark = (el) => {
      el.setAttribute("data-invalid", "true");
      marked.current.push(el);
    };
    const walk = (node, path) => {
      if (!node || typeof node !== "object") return;
      if (node.message !== undefined || node.type !== undefined) {
        const field = path.split(".").reduce((value, part) => value?.[part], control._fields);
        const element = field?._f?.ref;
        if (!(element instanceof Element) || !element.isConnected) return;
        mark(element);
        const isSelect = element.tagName === "SELECT";
        const anchor = isSelect ? element.parentElement : element;
        if (isSelect) {
          const trigger = element.parentElement?.querySelector("button");
          if (trigger) mark(trigger);
        }
        const message = node.message;
        if (!message || !anchor?.parentElement || anchor.parentElement.textContent.includes(message)) return;
        const note = document.createElement("p");
        note.setAttribute("data-field-error", "true");
        note.className = "mt-1 text-xs text-red-500";
        note.textContent = message;
        anchor.after(note);
        marked.current.push(note);
        return;
      }
      for (const [key, child] of Object.entries(node)) walk(child, path ? `${path}.${key}` : key);
    };
    walk(errors, "");
  }, [errors, control]);

  return form;
}

// Server-side field errors (`error.fields`) onto the form; the first wrong field is focused.
export function applyServerErrors(setError, error) {
  Object.entries(error?.fields ?? {}).forEach(([key, message], index) => setError(key, { message }, { shouldFocus: index === 0 }));
}
