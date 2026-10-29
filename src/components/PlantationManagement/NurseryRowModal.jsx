import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { api } from "../../lib/api";
import Select from "../common/Select";

const BED_STATUSES = ["Active", "Inactive", "Maintenance", "Under Maintenance"];
const STOCK_TYPES = ["Clonal", "Seedling"];

const wholeNumber = (label) => ({
  required: `${label} is required`,
  min: { value: 0, message: "Value cannot be negative" },
  pattern: { value: /^\d+$/, message: "Enter a whole number" },
});

// What each popup asks for, in the order of the table: bed (Bed / Section) and stock (Plant Stock / Inventory).
const KINDS = {
  bed: {
    title: "Bed / Section",
    path: "beds",
    defaults: { name: "", code: "", clone: "", area: "", plants: "", plantingDate: "", status: "Active" },
    fields: [
      { name: "name", label: "Bed / Section Name", rules: { required: "Bed name is required" } },
      { name: "code", label: "Bed Code", rules: { required: "Bed code is required" } },
      { name: "clone", label: "Clone / Seed", rules: { required: "Clone / seed is required" } },
      { name: "area", label: "Area (Acre)", type: "number", step: "any", rules: { required: "Area is required", min: { value: 0.01, message: "Area must be more than 0" } } },
      { name: "plants", label: "No. of Plants", type: "number", rules: wholeNumber("Number of plants") },
      { name: "plantingDate", label: "Sowing / Planting Date", type: "date" },
      { name: "status", label: "Status", options: BED_STATUSES, rules: { required: "Status is required" } },
    ],
  },
  stock: {
    title: "Plant Stock",
    path: "stock",
    defaults: { clone: "", type: "Clonal", totalPlants: "", availablePlants: "", reservedPlants: "", distributedPlants: "", unit: "Nos", distributedThisMonth: "" },
    fields: [
      { name: "clone", label: "Clone / Seed", rules: { required: "Clone / seed is required" } },
      { name: "type", label: "Type", options: STOCK_TYPES, rules: { required: "Type is required" } },
      { name: "totalPlants", label: "Total Plants", type: "number", rules: wholeNumber("Total plants") },
      { name: "availablePlants", label: "Available Plants", type: "number", rules: wholeNumber("Available plants") },
      { name: "reservedPlants", label: "Reserved Plants", type: "number", rules: wholeNumber("Reserved plants") },
      { name: "distributedPlants", label: "Distributed Plants", type: "number", rules: wholeNumber("Distributed plants") },
      { name: "unit", label: "Unit", rules: { required: "Unit is required" } },
      { name: "distributedThisMonth", label: "Distributed This Month", type: "number", optional: true, rules: { min: { value: 0, message: "Value cannot be negative" }, pattern: { value: /^\d*$/, message: "Enter a whole number" } } },
    ],
  },
};

const toForm = (kind, row) =>
  Object.fromEntries(
    Object.keys(KINDS[kind].defaults).map((name) => [name, row?.[name] ?? KINDS[kind].defaults[name]]),
  );

const inputClass = "h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600";

// The popup for one bed or one stock row: view it, add a new one, or edit one. Saves to the nursery's
// /beds or /stock endpoints and tells the page, which then reloads the tables and the cards.
export default function NurseryRowModal({ kind, mode: startMode, nurseryId, row, onClose, onSaved, onDelete }) {
  const config = KINDS[kind];
  const [mode, setMode] = useState(startMode);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: toForm(kind, row) });

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const editing = Boolean(row);
  const reading = mode === "view";

  const submit = async (values) => {
    const body = { ...values };
    if (kind === "stock" && body.distributedThisMonth === "") delete body.distributedThisMonth;
    try {
      const base = `/nurseries/${nurseryId}/${config.path}`;
      if (editing) await api.put(`${base}/${row.id}`, body);
      else await api.post(base, body);
      toast.success(`${config.title} ${editing ? "updated" : "added"} successfully!`);
      onSaved();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4' onMouseDown={() => !isSubmitting && onClose()}>
      <div className='max-h-full w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl' onMouseDown={(event) => event.stopPropagation()}>
        <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
          <h2 className='text-lg font-semibold text-green-800'>
            {reading ? `${config.title} Details` : editing ? `Edit ${config.title}` : `Add ${config.title}`}
          </h2>
          <button type='button' onClick={onClose} className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100' aria-label='Close'>
            <X size={20} />
          </button>
        </div>

        {reading ? (
          <div className='p-5'>
            <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {config.fields.map((field) => (
                <div key={field.name}>
                  <dt className='text-xs text-gray-500'>{field.label}</dt>
                  <dd className='text-sm font-medium text-gray-800'>{row?.[field.name] === null || row?.[field.name] === undefined || row?.[field.name] === "" ? "-" : String(row[field.name])}</dd>
                </div>
              ))}
            </dl>
            <div className='mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end'>
              <button type='button' onClick={onClose} className='flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 text-gray-700 transition hover:bg-gray-50 sm:w-auto'>
                <X size={18} />
                Close
              </button>
              <button type='button' onClick={() => onDelete(row)} className='flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-6 text-red-600 transition hover:bg-red-100 sm:w-auto'>
                <Trash2 size={18} />
                Delete
              </button>
              <button
                type='button'
                onClick={() => {
                  reset(toForm(kind, row));
                  setMode("edit");
                }}
                className='flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-6 text-white transition hover:bg-green-800 sm:w-auto'
              >
                <Pencil size={18} />
                Edit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submit)} className='p-5'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {config.fields.map((field) => (
                <div key={field.name}>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    {field.label} {field.rules?.required && <span className='text-red-500'>*</span>}
                  </label>
                  {field.options ? (
                    <Select {...register(field.name, field.rules)} className={inputClass}>
                      {!field.options.includes(row?.[field.name]) && row?.[field.name] ? <option value={row[field.name]}>{row[field.name]}</option> : null}
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <input
                      type={field.type ?? "text"}
                      step={field.step}
                      min={field.type === "number" ? 0 : undefined}
                      {...register(field.name, field.rules)}
                      className={inputClass}
                    />
                  )}
                  {errors[field.name] && <p className='mt-1 text-xs text-red-500'>{errors[field.name].message}</p>}
                </div>
              ))}
            </div>
            <div className='mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end'>
              <button type='button' onClick={onClose} className='flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 text-gray-700 transition hover:bg-gray-50 sm:w-auto'>
                <X size={18} />
                Cancel
              </button>
              <button type='submit' disabled={isSubmitting} className='flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-6 text-white transition hover:bg-green-800 disabled:opacity-60 sm:w-auto'>
                <Save size={18} />
                {isSubmitting ? "Saving..." : editing ? "Update" : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
