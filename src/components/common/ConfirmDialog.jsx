import { useEffect } from "react";

// Asks before a destructive action (Delete): title, text, Cancel / confirm.
export default function ConfirmDialog({
  open,
  title = "Delete record?",
  message = "This cannot be undone from the list.",
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && !loading && onCancel();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, loading, onCancel]);

  if (!open) return null;
  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4' onMouseDown={() => !loading && onCancel()}>
      <div
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='confirm-title'
        className='w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl'
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h3 id='confirm-title' className='text-base font-semibold text-slate-800'>
          {title}
        </h3>
        <p className='mt-2 text-sm text-slate-600'>{message}</p>
        <div className='mt-5 flex justify-end gap-2'>
          <button
            type='button'
            onClick={onCancel}
            disabled={loading}
            className='cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={loading}
            className='cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60'
          >
            {loading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
