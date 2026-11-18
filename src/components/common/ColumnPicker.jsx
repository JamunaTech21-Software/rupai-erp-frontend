import { useEffect, useRef, useState } from "react";
import { Columns3, Lock, RotateCcw } from "lucide-react";

// RP1-206 The "Columns" button: show / hide a table's columns (state from useColumns).
export default function ColumnPicker({ table, className = "" }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const hiddenCount = table.columns.length - table.visible.length;

  useEffect(() => {
    if (!open) return undefined;
    const outside = (event) => boxRef.current && !boxRef.current.contains(event.target) && setOpen(false);
    const escape = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div className='relative' ref={boxRef}>
      <button
        type='button'
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup='dialog'
        className={`flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 ${className}`}
      >
        <Columns3 className='h-4 w-4' />
        Columns
        {hiddenCount > 0 && <span className='rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600'>{hiddenCount} hidden</span>}
      </button>

      {open && (
        <div role='dialog' aria-label='Show or hide columns' className='absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg'>
          <p className='border-b border-slate-100 px-4 py-2.5 text-xs font-bold uppercase text-slate-500'>Show columns</p>
          <ul className='max-h-[min(26rem,60vh)] overflow-y-auto py-1'>
            {table.columns.map((column) => (
              <li key={column.key}>
                <label className={`flex items-center gap-2.5 px-4 py-2 text-sm ${column.locked ? "cursor-not-allowed text-slate-400" : "cursor-pointer text-slate-700 hover:bg-slate-50"}`}>
                  <input
                    type='checkbox'
                    checked={table.isShown(column.key)}
                    disabled={column.locked}
                    onChange={() => table.toggle(column.key)}
                    className='h-4 w-4 cursor-pointer accent-emerald-700 disabled:cursor-not-allowed'
                  />
                  <span className='flex-1'>{column.label}</span>
                  {column.locked && <Lock className='h-3.5 w-3.5' aria-label='Always shown' />}
                </label>
              </li>
            ))}
          </ul>
          <div className='border-t border-slate-100 px-2 py-1.5'>
            <button
              type='button'
              onClick={table.reset}
              disabled={table.isDefault}
              className='flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
            >
              <RotateCcw className='h-3.5 w-3.5' />
              Reset to default
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
