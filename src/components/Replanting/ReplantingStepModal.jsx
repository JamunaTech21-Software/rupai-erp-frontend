import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import Select from "../common/Select";
import { api, notifySaved } from "../../lib/api";
import { STEP_CONFIG, emptyRow, toEditorState, toRequestBody } from "../../lib/replantingSteps";

const inputClass = "h-9 w-full rounded-md border border-gray-300 bg-white px-2 text-sm text-gray-700 outline-none transition focus:border-green-600";

const computedText = (value) => (value === "" || value === null || Number.isNaN(Number(value)) ? "" : Number(value).toLocaleString("en-US"));

// Edits one step (2-8) of a replanting project: its fields and its table. Saves with PUT .../steps/:n.
export default function ReplantingStepModal({ projectId, step, saved, onClose, onSaved }) {
  const config = STEP_CONFIG[step];
  const [state, setState] = useState(() => toEditorState(config, saved));
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && !busy && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  const setField = (name, value) => {
    setState((current) => ({ ...current, fields: { ...current.fields, [name]: value } }));
    setErrors((current) => (current[name] ? { ...current, [name]: undefined } : current));
  };
  const setCell = (index, name, value) => {
    setState((current) => ({ ...current, rows: current.rows.map((row, i) => (i === index ? { ...row, [name]: value } : row)) }));
    setErrors((current) => (current[`rows.${index}.${name}`] ? { ...current, [`rows.${index}.${name}`]: undefined } : current));
  };
  const addRow = () => setState((current) => ({ ...current, rows: [...current.rows, emptyRow(config)] }));
  const removeRow = (index) => {
    setState((current) => ({ ...current, rows: current.rows.filter((_, i) => i !== index) }));
    setErrors({});
  };

  const save = async () => {
    setBusy(true);
    setErrors({});
    setNotice("");
    try {
      const result = await api.put(`/replanting-projects/${projectId}/steps/${step}`, toRequestBody(config, state));
      notifySaved(result, `${config.title} saved successfully!`);
      onSaved();
    } catch (error) {
      const fields = error.fields ?? {};
      setErrors(fields);
      const messages = Object.entries(fields).slice(0, 3).map(([key, message]) => {
        const match = key.match(/^rows\.(\d+)\.(.+)$/);
        if (!match) return message;
        const column = config.columns.find((c) => c.name === match[2]);
        return `${config.rowLabel} ${Number(match[1]) + 1} - ${column?.label ?? match[2]}: ${message}`;
      });
      setNotice(messages.length ? `Please correct the marked fields. ${messages.join(" ")}` : error.message);
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  const renderInput = (item, value, onChange, invalid, id) => {
    const common = { id, value, "data-invalid": invalid ? "true" : undefined, title: invalid || undefined };
    if (item.type === "textarea") return <textarea {...common} rows={2} onChange={(e) => onChange(e.target.value)} className={`${inputClass} h-auto py-1.5`} />;
    if (item.type === "select")
      return (
        <Select {...common} onChange={(e) => onChange(e.target.value)} className={inputClass}>
          <option value=''>Select</option>
          {item.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      );
    if (item.type === "combo")
      return (
        <>
          <input {...common} type='text' list={`${id}-list`} onChange={(e) => onChange(e.target.value)} className={inputClass} />
          <datalist id={`${id}-list`}>
            {(item.suggest ?? []).map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </>
      );
    return (
      <input
        {...common}
        type={item.type === "number" ? "number" : item.type === "date" ? "date" : "text"}
        min={item.type === "number" ? 0 : undefined}
        step={item.type === "number" ? "any" : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    );
  };

  const hasRows = config.columns.length > 0;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3' onMouseDown={() => !busy && onClose()}>
      <div
        role='dialog'
        aria-modal='true'
        aria-label={`Step ${step}: ${config.title}`}
        className='flex max-h-[92vh] w-full max-w-5xl flex-col rounded-2xl bg-white shadow-xl'
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
          <h3 className='text-base font-semibold text-green-800'>
            Step {step}: {config.title}
          </h3>
          <button type='button' onClick={onClose} disabled={busy} aria-label='Close' className='cursor-pointer rounded-md p-1.5 text-gray-500 hover:bg-gray-100'>
            <X size={18} />
          </button>
        </div>

        <div className='space-y-4 overflow-y-auto px-5 py-4'>
          {notice && (
            <div role='alert' className='rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700'>
              {notice}
            </div>
          )}

          {config.fields.length > 0 && (
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {config.fields.map((field) => (
                <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label htmlFor={`f-${field.name}`} className='mb-1 block text-sm font-medium text-gray-700'>
                    {field.label}
                  </label>
                  {renderInput(field, state.fields[field.name], (value) => setField(field.name, value), errors[field.name], `f-${field.name}`)}
                  {errors[field.name] && <p className='mt-1 text-xs text-red-600'>{errors[field.name]}</p>}
                </div>
              ))}
            </div>
          )}

          {hasRows && (
            <div>
              <div className='mb-2 flex items-center justify-between'>
                <h4 className='text-sm font-semibold text-gray-700'>{config.title} table</h4>
                <button
                  type='button'
                  onClick={addRow}
                  className='flex cursor-pointer items-center gap-1 rounded-md border border-green-700 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50'
                >
                  <Plus size={14} />
                  Add {config.rowLabel}
                </button>
              </div>
              <div className='overflow-x-auto rounded-lg border border-gray-200'>
                <table className='w-full min-w-[720px] border-collapse text-sm'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='w-10 px-2 py-2 text-center text-xs font-semibold text-gray-600'>#</th>
                      {config.columns.map((column) => (
                        <th key={column.name} className='whitespace-nowrap px-2 py-2 text-left text-xs font-semibold text-gray-600'>
                          {column.label}
                          {column.required && <span className='text-red-500'> *</span>}
                        </th>
                      ))}
                      <th className='w-10' />
                    </tr>
                  </thead>
                  <tbody>
                    {state.rows.length === 0 && (
                      <tr>
                        <td colSpan={config.columns.length + 2} className='px-3 py-6 text-center text-sm text-gray-500'>
                          No rows yet. Use "Add {config.rowLabel}".
                        </td>
                      </tr>
                    )}
                    {state.rows.map((row, index) => (
                      <tr key={index} className='border-t border-gray-100 align-top'>
                        <td className='px-2 py-2 text-center text-xs text-gray-500'>{index + 1}</td>
                        {config.columns.map((column) => {
                          const key = `rows.${index}.${column.name}`;
                          return (
                            <td key={column.name} className='min-w-28 px-1 py-1.5'>
                              {column.type === "computed" ? (
                                <span className='block px-2 py-1.5 text-sm text-gray-600'>{computedText(column.compute(row))}</span>
                              ) : (
                                <>
                                  {renderInput(column, row[column.name], (value) => setCell(index, column.name, value), errors[key], `r${index}-${column.name}`)}
                                  {errors[key] && <p className='mt-1 text-xs text-red-600'>{errors[key]}</p>}
                                </>
                              )}
                            </td>
                          );
                        })}
                        <td className='px-1 py-1.5 text-center'>
                          <button
                            type='button'
                            title={`Remove ${config.rowLabel}`}
                            onClick={() => removeRow(index)}
                            className='cursor-pointer rounded-md p-1.5 text-red-600 hover:bg-red-50'
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {errors.rows && <p className='mt-1 text-xs text-red-600'>{errors.rows}</p>}
              <p className='mt-2 text-xs text-gray-500'>Saving replaces the whole table with the rows shown here.</p>
            </div>
          )}
        </div>

        <div className='flex justify-end gap-2 border-t border-gray-200 px-5 py-3'>
          <button
            type='button'
            onClick={onClose}
            disabled={busy}
            className='cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={save}
            disabled={busy}
            className='cursor-pointer rounded-lg bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-60'
          >
            {busy ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
