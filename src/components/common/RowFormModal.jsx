import { useEffect, useState } from "react";
import { X } from "lucide-react";

const inputClass = "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-green-600";
const today = () => new Date().toISOString().slice(0, 10);

// A small form for one table row. Fields: { name, label, type?: "text"|"number"|"date", required?, maxLength?, noFuture? }.
// The tables have no inputs of their own, so the rules are checked here before the row is handed back.
export default function RowFormModal({ title, fields, initial, onSave, onClose }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.type === "date" ? String(initial?.[f.name] ?? "").slice(0, 10) : initial?.[f.name] ?? ""])),
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const problems = () => {
    const found = {};
    for (const f of fields) {
      const value = String(values[f.name]).trim();
      if (!value) {
        if (f.required) found[f.name] = `${f.label} is required.`;
        continue;
      }
      if (f.maxLength && value.length > f.maxLength) found[f.name] = `${f.label} can be at most ${f.maxLength} characters.`;
      if (f.type === "number" && (!Number.isFinite(Number(value)) || Number(value) < 0)) found[f.name] = `${f.label} must be a number.`;
      if (f.noFuture && value > today()) found[f.name] = `${f.label} cannot be in the future.`;
    }
    return found;
  };

  const save = (event) => {
    event.preventDefault();
    const found = problems();
    setErrors(found);
    if (Object.keys(found).length) return;
    const row = Object.fromEntries(
      fields.map((f) => {
        const value = String(values[f.name]).trim();
        return [f.name, value === "" ? null : f.type === "number" ? Number(value) : value];
      }),
    );
    onSave(row);
  };

  const change = (name) => (event) => {
    setValues((current) => ({ ...current, [name]: event.target.value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3' onMouseDown={onClose}>
      <form
        role='dialog'
        aria-modal='true'
        aria-label={title}
        noValidate
        onSubmit={save}
        onMouseDown={(event) => event.stopPropagation()}
        className='flex max-h-[92vh] w-full max-w-md flex-col rounded-2xl bg-white shadow-xl'
      >
        <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
          <h3 className='text-base font-semibold text-green-800'>{title}</h3>
          <button type='button' onClick={onClose} aria-label='Close' className='cursor-pointer rounded-md p-1.5 text-gray-500 hover:bg-gray-100'>
            <X size={18} />
          </button>
        </div>
        <div className='space-y-3 overflow-y-auto px-5 py-4'>
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={`row-${f.name}`} className='mb-1 block text-sm font-medium text-gray-700'>
                {f.label}
                {f.required && <span className='text-red-500'> *</span>}
              </label>
              <input
                id={`row-${f.name}`}
                type={f.type === "number" ? "text" : f.type ?? "text"}
                inputMode={f.type === "number" ? "decimal" : undefined}
                max={f.noFuture ? today() : undefined}
                value={values[f.name]}
                onChange={change(f.name)}
                aria-invalid={errors[f.name] ? "true" : undefined}
                className={`${inputClass} ${errors[f.name] ? "border-red-500" : ""}`}
              />
              {errors[f.name] && <p className='mt-1 text-xs text-red-600'>{errors[f.name]}</p>}
            </div>
          ))}
        </div>
        <div className='flex justify-end gap-2 border-t border-gray-200 px-5 py-3'>
          <button type='button' onClick={onClose} className='cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            Cancel
          </button>
          <button type='submit' className='cursor-pointer rounded-lg bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
