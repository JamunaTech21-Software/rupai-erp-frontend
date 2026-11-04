import { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import Select from "../common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";

const inputClass = "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-green-600";
const FIELDS = ["projectName", "estate", "division", "section", "fieldBlock", "replantingType", "season", "surveyDate", "targetDate", "supervisor", "remarks"];
const LABELS = {
  projectName: "Project Name",
  estate: "Estate",
  division: "Division",
  section: "Section",
  fieldBlock: "Field / Block",
  replantingType: "Replanting Type",
  season: "Season",
  surveyDate: "Survey Date",
  targetDate: "Target Date",
  supervisor: "Supervisor",
  remarks: "Remarks",
};
const REQUIRED = ["projectName", "estate", "division", "section", "fieldBlock", "replantingType", "surveyDate"];
const TYPES = ["Replanting", "Gap Filling"];
const SEASONS = ["Spring (Feb - Mar)", "Monsoon (Jun - Jul)", "Autumn (Sep - Oct)"];

const day = (value) => (typeof value === "string" ? value.slice(0, 10) : "");

// Step 1 of a replanting project: create it (POST) or edit it (PUT).
export default function ReplantingProjectModal({ project, onClose, onSaved }) {
  const editing = Boolean(project);
  const [values, setValues] = useState(() =>
    Object.fromEntries(FIELDS.map((name) => [name, (name === "surveyDate" || name === "targetDate" ? day(project?.[name]) : project?.[name]) ?? ""])),
  );
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && !busy && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [busy, onClose]);

  const estates = useApi(() => api.get("/options/estates"), []);
  const divisions = useApi(() => (values.estate ? api.get("/options/divisions", { estate: values.estate }) : Promise.resolve([])), [values.estate]);
  const sections = useApi(() => (values.division ? api.get("/options/sections", { division: values.division }) : Promise.resolve([])), [values.division]);
  const fields = useApi(() => (values.section ? api.get("/options/fields", { section: values.section }) : Promise.resolve([])), [values.section]);

  const change = (name) => (event) => {
    const value = event.target.value;
    // Changing a place clears the ones below it.
    const below = { estate: ["division", "section", "fieldBlock"], division: ["section", "fieldBlock"], section: ["fieldBlock"] }[name] ?? [];
    setValues((current) => ({ ...current, [name]: value, ...Object.fromEntries(below.map((key) => [key, ""])) }));
    setErrors((current) => ({ ...current, [name]: undefined, ...Object.fromEntries(below.map((key) => [key, undefined])) }));
  };

  const problems = () => {
    const found = {};
    for (const name of REQUIRED) if (!String(values[name]).trim()) found[name] = `${LABELS[name]} is required.`;
    if (values.surveyDate && values.targetDate && values.targetDate < values.surveyDate) found.targetDate = "Target Date cannot be before Survey Date.";
    return found;
  };

  const save = async () => {
    const found = problems();
    if (Object.keys(found).length) {
      setErrors(found);
      setNotice(`Please correct ${Object.keys(found).map((key) => LABELS[key]).join(", ")} (marked in red).`);
      return;
    }
    setBusy(true);
    setErrors({});
    setNotice("");
    const body = Object.fromEntries(FIELDS.map((name) => [name, String(values[name]).trim() === "" ? null : String(values[name]).trim()]));
    body.remarks = body.remarks ?? "";
    try {
      const result = editing ? await api.put(`/replanting-projects/${project.id}`, body) : await api.post("/replanting-projects", body);
      notifySaved(result, editing ? "Project updated successfully!" : "Project created successfully!");
      onSaved(result);
    } catch (error) {
      const fieldErrors = error.fields ?? {};
      setErrors(fieldErrors);
      const names = Object.keys(fieldErrors).map((key) => LABELS[key] ?? key);
      setNotice(names.length ? `Please correct ${names.slice(0, 4).join(", ")} (marked in red).` : error.message);
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  };

  const field = (name, input) => (
    <div className={name === "remarks" || name === "projectName" ? "sm:col-span-2" : ""}>
      <label htmlFor={`p-${name}`} className='mb-1 block text-sm font-medium text-gray-700'>
        {LABELS[name]}
        {REQUIRED.includes(name) && <span className='text-red-500'> *</span>}
      </label>
      {input}
      {errors[name] && <p className='mt-1 text-xs text-red-600'>{errors[name]}</p>}
    </div>
  );
  const invalid = (name) => (errors[name] ? "true" : undefined);
  const list = (items) =>
    (items ?? []).map((item) => (
      <option key={item.id ?? item.value} value={item.value}>
        {item.label}
      </option>
    ));
  const withCurrent = (items, current) => (current && !items.includes(current) ? [...items, current] : items);

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-3' onMouseDown={() => !busy && onClose()}>
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Project Information'
        className='flex max-h-[92vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl'
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
          <h3 className='text-base font-semibold text-green-800'>Step 1: Project Information {editing ? `(${project.projectCode})` : ""}</h3>
          <button type='button' onClick={onClose} disabled={busy} aria-label='Close' className='cursor-pointer rounded-md p-1.5 text-gray-500 hover:bg-gray-100'>
            <X size={18} />
          </button>
        </div>

        <div className='space-y-3 overflow-y-auto px-5 py-4'>
          {notice && (
            <div role='alert' className='rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700'>
              {notice}
            </div>
          )}
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            {field("projectName", <input id='p-projectName' type='text' value={values.projectName} onChange={change("projectName")} data-invalid={invalid("projectName")} className={inputClass} />)}
            {field(
              "estate",
              <Select id='p-estate' value={values.estate} onChange={change("estate")} data-invalid={invalid("estate")} className={inputClass}>
                <option value=''>Select Estate</option>
                {list(estates.data)}
              </Select>,
            )}
            {field(
              "division",
              <Select id='p-division' value={values.division} onChange={change("division")} data-invalid={invalid("division")} className={inputClass}>
                <option value=''>{values.estate ? ((divisions.data ?? []).length ? "Select Division" : "No divisions in this estate") : "Select Estate first"}</option>
                {list(divisions.data)}
              </Select>,
            )}
            {field(
              "section",
              <Select id='p-section' value={values.section} onChange={change("section")} data-invalid={invalid("section")} className={inputClass}>
                <option value=''>{values.division ? ((sections.data ?? []).length ? "Select Section" : "No sections in this division") : "Select Division first"}</option>
                {list(sections.data)}
              </Select>,
            )}
            {field(
              "fieldBlock",
              <Select id='p-fieldBlock' value={values.fieldBlock} onChange={change("fieldBlock")} data-invalid={invalid("fieldBlock")} className={inputClass}>
                <option value=''>{values.section ? ((fields.data ?? []).length ? "Select Field / Block" : "No fields in this section") : "Select Section first"}</option>
                {list(fields.data)}
              </Select>,
            )}
            {field(
              "replantingType",
              <Select id='p-replantingType' value={values.replantingType} onChange={change("replantingType")} data-invalid={invalid("replantingType")} className={inputClass}>
                <option value=''>Select Replanting Type</option>
                {withCurrent(TYPES, values.replantingType).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>,
            )}
            {field(
              "season",
              <Select id='p-season' value={values.season} onChange={change("season")} data-invalid={invalid("season")} className={inputClass}>
                <option value=''>Select Season</option>
                {withCurrent(SEASONS, values.season).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>,
            )}
            {field("surveyDate", <input id='p-surveyDate' type='date' value={values.surveyDate} onChange={change("surveyDate")} data-invalid={invalid("surveyDate")} className={inputClass} />)}
            {field("targetDate", <input id='p-targetDate' type='date' min={values.surveyDate || undefined} value={values.targetDate} onChange={change("targetDate")} data-invalid={invalid("targetDate")} className={inputClass} />)}
            {field("supervisor", <input id='p-supervisor' type='text' value={values.supervisor} onChange={change("supervisor")} data-invalid={invalid("supervisor")} className={inputClass} />)}
            {field("remarks", <textarea id='p-remarks' rows={3} value={values.remarks} onChange={change("remarks")} data-invalid={invalid("remarks")} className={`${inputClass} h-auto py-2`} />)}
          </div>
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
            {busy ? "Saving..." : editing ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
