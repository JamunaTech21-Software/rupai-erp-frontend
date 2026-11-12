import { useEffect, useRef, useState } from "react";
import { useForm } from "../../lib/useForm";
import toast from "react-hot-toast";
import { Eye, FileText, Info, Paperclip, Save, Trash2, UploadCloud, X } from "lucide-react";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";

const MAX_MB = 10;
const ACCEPT = ["application/pdf", "image/jpeg", "image/png"];
const FORM_KEYS = ["category", "type", "documentName", "documentNo", "issuingAuthority", "issueDate", "expiryDate", "validityMonths", "renewalRequired", "reminderSetting", "reminderDays", "attachment", "remarks", "isActive"];
const EMPTY_FORM = {
  category: "",
  type: "",
  documentName: "",
  documentNo: "",
  issuingAuthority: "",
  issueDate: "",
  expiryDate: "",
  validityMonths: "",
  renewalRequired: true,
  reminderSetting: "DEFAULT",
  reminderDays: "",
  remarks: "",
  isActive: true,
};

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";
const boxClass = (error) => `h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:border-emerald-600 ${error ? "border-red-500" : "border-slate-300"}`;

// ---- dates (plain YYYY-MM-DD text, so no time zone can move a day) ----
const parts = (iso) => iso.split("-").map(Number);
const valid = (iso) => /^\d{4}-\d{2}-\d{2}$/.test(iso || "") && !Number.isNaN(new Date(`${iso}T00:00:00Z`).getTime());
const pad = (n) => String(n).padStart(2, "0");
// Whole months from one date to the other (20 Oct 2026 to 20 Oct 2028 is 24), as the server counts them.
const monthsBetween = (from, to) => {
  const [fy, fm, fd] = parts(from);
  const [ty, tm, td] = parts(to);
  const months = (ty - fy) * 12 + tm - fm;
  return td < fd ? months - 1 : months;
};
// The date `months` after `iso`, on the same day (the month's last day when it has no such day).
const addMonths = (iso, months) => {
  const [y, m, d] = parts(iso);
  const index = y * 12 + (m - 1) + months;
  const year = Math.floor(index / 12);
  const month = (index % 12) + 1;
  const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return `${year}-${pad(month)}-${pad(Math.min(d, last))}`;
};
const sizeText = (bytes) => (bytes == null ? "" : bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

const toFormValues = (document) => ({
  category: document.category ?? "",
  type: document.type ?? "",
  documentName: document.documentName ?? "",
  documentNo: document.documentNo ?? "",
  issuingAuthority: document.issuingAuthority ?? "",
  issueDate: document.issueDate ?? "",
  expiryDate: document.expiryDate ?? "",
  validityMonths: document.validityMonths == null ? "" : String(document.validityMonths),
  renewalRequired: document.renewalRequired !== false,
  reminderSetting: document.reminderSetting ?? "DEFAULT",
  reminderDays: Array.isArray(document.reminderDays) ? document.reminderDays.join(", ") : "",
  remarks: document.remarks ?? "",
  isActive: document.isActive !== false,
});

// The Add New Document form (image 6). `document` set = edit; `popup` = shown over the page with a close icon.
export default function DocumentForm({ document = null, popup = false, onSaved, onClose }) {
  const editing = Boolean(document);
  const [file, setFile] = useState(
    document?.attachment ? { id: document.attachment, name: document.attachmentName ?? "Attachment", url: document.attachmentUrl ?? null, size: null } : null,
  );
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const picker = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: document ? toFormValues(document) : EMPTY_FORM });

  const categoryId = watch("category");
  const typeId = watch("type");
  const renewal = watch("renewalRequired");
  const reminderSetting = watch("reminderSetting");

  // =========================================================
  // DATA
  // =========================================================

  const categories = useApi(() => api.get("/options/document-categories", { status: "ACTIVE" }), []);
  const types = useApi(() => (categoryId ? api.get("/options/document-types", { category: categoryId, status: "ACTIVE" }) : Promise.resolve([])), [categoryId]);
  const typeSettings = useApi(() => (typeId ? api.get(`/document-types/${typeId}/expiry-settings`) : Promise.resolve(null)), [typeId]);

  // The saved category / type stay in their lists even when they are no longer offered.
  const categoryChoices = [...(categories.data ?? [])];
  if (document && categoryId === document.category && !categoryChoices.some((item) => item.value === document.category)) {
    categoryChoices.push({ value: document.category, label: document.categoryName ?? "Current category" });
  }
  const typeChoices = [...(types.data ?? [])];
  if (document && typeId === document.type && categoryId === document.category && !typeChoices.some((item) => item.value === document.type)) {
    typeChoices.push({ value: document.type, label: document.typeName ?? "Current type" });
  }

  // A new document starts with its type's Renewal Required.
  const pickedType = typeSettings.data;
  useEffect(() => {
    if (!editing && pickedType) setValue("renewalRequired", pickedType.renewalRequired !== false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedType?.id]);

  const typeDays = (typeSettings.data?.reminders ?? []).filter((item) => item.enabled).map((item) => item.days);
  const defaultLabel = typeId ? `Use Default (${typeDays.length ? `${typeDays.join(", ")} Days` : "none"})` : "Use Default";

  // =========================================================
  // DATES: Issue Date + Validity fills Expiry Date, and the other way round
  // =========================================================

  const fromIssue = (event) => {
    const issue = event.target.value;
    const months = Number(getValues("validityMonths"));
    const expiry = getValues("expiryDate");
    if (!valid(issue)) return;
    if (months >= 1) setValue("expiryDate", addMonths(issue, months), { shouldValidate: false });
    else if (valid(expiry) && expiry > issue) setValue("validityMonths", String(monthsBetween(issue, expiry)));
  };
  const fromValidity = (event) => {
    const months = Number(event.target.value);
    const issue = getValues("issueDate");
    if (valid(issue) && Number.isInteger(months) && months >= 1) setValue("expiryDate", addMonths(issue, months));
  };
  const fromExpiry = (event) => {
    const expiry = event.target.value;
    const issue = getValues("issueDate");
    if (!expiry) setValue("validityMonths", "");
    else if (valid(issue) && valid(expiry) && expiry > issue) setValue("validityMonths", String(monthsBetween(issue, expiry)));
  };

  // =========================================================
  // ATTACHMENT
  // =========================================================

  const pickFile = async (list) => {
    const picked = list?.[0];
    if (!picked) return;
    setFileError("");
    if (!ACCEPT.includes(picked.type)) return setFileError("Use a PDF, JPG or PNG file.");
    if (picked.size > MAX_MB * 1024 * 1024) return setFileError(`The file is larger than ${MAX_MB} MB.`);
    setUploading(true);
    try {
      const uploaded = await api.upload(picked);
      setFile({ id: uploaded.id, name: uploaded.name, url: uploaded.url, size: uploaded.size });
    } catch (error) {
      setFileError(error.message);
    } finally {
      setUploading(false);
    }
  };

  // =========================================================
  // SAVE
  // =========================================================

  const onSubmit = async (values) => {
    setFileError("");
    const issue = values.issueDate;
    const expiry = values.expiryDate;
    const days = String(values.reminderDays ?? "")
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number);
    const body = {
      category: values.category,
      type: values.type,
      documentName: values.documentName.trim(),
      documentNo: values.documentNo.trim(),
      issuingAuthority: values.issuingAuthority.trim() || null,
      issueDate: issue,
      expiryDate: expiry || null,
      // With both dates the months are worked out from them, as the server does.
      validityMonths: valid(issue) && valid(expiry) && expiry > issue ? monthsBetween(issue, expiry) : null,
      renewalRequired: Boolean(values.renewalRequired),
      reminderSetting: values.reminderSetting,
      reminderDays: values.reminderSetting === "CUSTOM" ? days : null,
      attachment: file?.id ?? null,
      remarks: values.remarks.trim() || null,
      isActive: Boolean(values.isActive),
    };
    try {
      const result = editing ? await api.put(`/documents/${document.id}`, body) : await api.post("/documents", body);
      notifySaved(result, editing ? "Document updated successfully!" : "Document saved successfully!");
      onSaved?.(result);
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      for (const [key, message] of Object.entries(fields)) {
        if (key === "attachment") setFileError(message);
        else if (key === "reminderDays") setError("reminderDays", { message });
        else if (FORM_KEYS.includes(key)) setError(key, { message });
        else unplaced = true;
      }
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  // Cancel: close the pop-up, or on the page clear the form.
  const cancel = () => {
    if (popup) return onClose?.();
    reset(EMPTY_FORM);
    setFile(null);
    setFileError("");
  };

  const waiting = editing ? document.pendingRequest : null;
  const fieldError = (name) => errors[name] && <p className='mt-1 text-xs text-red-500'>{errors[name].message}</p>;
  const sectionTitle = (icon, title) => (
    <h3 className='mb-3 flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-900'>
      {icon}
      {title}
    </h3>
  );

  const form = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      role={popup ? "dialog" : undefined}
      aria-modal={popup ? "true" : undefined}
      className={`w-full overflow-hidden rounded-xl bg-white ${popup ? "max-w-3xl shadow-2xl" : "border border-slate-200 shadow-sm"}`}
    >
      <div className='flex items-center justify-between bg-emerald-800 px-5 py-3.5 text-white'>
        <h2 className='flex items-center gap-2 text-lg font-bold'>
          <FileText className='h-5 w-5' />
          {editing ? "Edit Document" : "Add New Document"}
        </h2>
        {popup && (
          <button type='button' onClick={onClose} aria-label='Close' title='Close' className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/15'>
            <X className='h-5 w-5' />
          </button>
        )}
      </div>

      <div className={`p-5 ${popup ? "max-h-[75vh] overflow-y-auto" : ""}`}>
        {waiting && (
          <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700'>
            Waiting for approval ({waiting.requestNo}). This document cannot be saved until the request is decided.
          </p>
        )}

        {sectionTitle(null, "Document Information")}

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div>
            <label className={labelClass}>
              Document Category <span className='text-red-500'>*</span>
            </label>
            <Select
              {...register("category", {
                required: "Document category is required",
                onChange: () => setValue("type", ""),
              })}
              className={`${boxClass(errors.category)} cursor-pointer`}
            >
              <option value=''>Select category</option>
              {categoryChoices.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {fieldError("category")}
          </div>
          <div>
            <label className={labelClass}>
              Document Type <span className='text-red-500'>*</span>
            </label>
            <Select {...register("type", { required: "Document type is required" })} disabled={!categoryId} className={`${boxClass(errors.type)} cursor-pointer`}>
              <option value=''>{categoryId ? "Select type" : "Select a category first"}</option>
              {typeChoices.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {fieldError("type")}
          </div>
        </div>

        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div className='sm:col-span-2'>
            <label className={labelClass}>
              Document Name <span className='text-red-500'>*</span>
            </label>
            <input type='text' maxLength={200} placeholder='e.g. Environmental Clearance Certificate (ECC)' {...register("documentName", { required: "Document name is required" })} className={boxClass(errors.documentName)} />
            {fieldError("documentName")}
          </div>
          <div>
            <label className={labelClass}>
              Document No. <span className='text-red-500'>*</span>
            </label>
            <input type='text' maxLength={60} placeholder='e.g. ECC-2026-001' {...register("documentNo", { required: "Document number is required" })} className={boxClass(errors.documentNo)} />
            {fieldError("documentNo")}
          </div>
        </div>

        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div>
            <label className={labelClass}>Issuing Authority</label>
            <input type='text' maxLength={200} placeholder='e.g. Department of Environment (DoE)' {...register("issuingAuthority")} className={boxClass(errors.issuingAuthority)} />
            {fieldError("issuingAuthority")}
          </div>
          <div>
            <label className={labelClass}>
              Issue Date <span className='text-red-500'>*</span>
            </label>
            <input type='date' {...register("issueDate", { required: "Issue date is required", onChange: fromIssue })} className={boxClass(errors.issueDate)} />
            {fieldError("issueDate")}
          </div>
          <div>
            <label className={labelClass}>
              Expiry Date {renewal && <span className='text-red-500'>*</span>}
            </label>
            <input
              type='date'
              {...register("expiryDate", {
                onChange: fromExpiry,
                validate: (value) => !renewal || Boolean(value) || "Expiry date is required when renewal is required",
              })}
              className={boxClass(errors.expiryDate)}
            />
            {fieldError("expiryDate")}
          </div>
        </div>

        <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <div>
            <label className={labelClass}>Validity Period (Months)</label>
            <input type='number' min='1' {...register("validityMonths", { onChange: fromValidity })} className={boxClass(errors.validityMonths)} />
            {fieldError("validityMonths")}
          </div>
          <div>
            <label className={labelClass}>Renewal Required</label>
            <label className='flex h-11 cursor-pointer items-center gap-3'>
              <span className='relative inline-flex'>
                <input type='checkbox' {...register("renewalRequired")} className='peer sr-only' />
                <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-emerald-600 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition after:content-[''] peer-checked:after:translate-x-5" />
              </span>
              <span className='text-sm text-slate-600'>{renewal ? "Yes" : "No"}</span>
            </label>
          </div>
          <div>
            <label className={`${labelClass} flex items-center gap-1`}>
              Reminder Settings
              <span title="Use Default follows the document type's expiry settings." className='text-slate-400'>
                <Info className='h-3.5 w-3.5' />
              </span>
            </label>
            <Select {...register("reminderSetting")} className={`${boxClass(errors.reminderSetting)} cursor-pointer`}>
              <option value='DEFAULT'>{defaultLabel}</option>
              <option value='CUSTOM'>Custom</option>
            </Select>
            {fieldError("reminderSetting")}
          </div>
        </div>

        {reminderSetting === "CUSTOM" && (
          <div className='mt-4'>
            <label className={labelClass}>
              Reminder Days <span className='text-red-500'>*</span>
            </label>
            <input type='text' placeholder='e.g. 60, 30, 7 (largest first, up to 4)' {...register("reminderDays")} className={boxClass(errors.reminderDays)} />
            {fieldError("reminderDays")}
          </div>
        )}

        <div className='mt-6'>{sectionTitle(<Paperclip className='h-4 w-4' />, "Attachment")}</div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              pickFile(event.dataTransfer.files);
            }}
            onClick={() => picker.current?.click()}
            role='button'
            tabIndex={0}
            onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && picker.current?.click()}
            className={`flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-4 text-center text-sm ${dragging ? "border-emerald-600 bg-emerald-50" : "border-blue-200 bg-blue-50/40"} ${fileError ? "border-red-400" : ""}`}
          >
            <UploadCloud className='h-7 w-7 text-emerald-700' />
            <p className='mt-1 text-slate-700'>
              {uploading ? (
                "Uploading..."
              ) : (
                <>
                  Drag &amp; drop file here or <span className='font-semibold text-blue-600'>click to browse</span>
                </>
              )}
            </p>
            <p className='text-xs text-slate-500'>PDF, JPG, PNG (Max {MAX_MB} MB)</p>
            <input
              ref={picker}
              type='file'
              accept='.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png'
              className='hidden'
              aria-label='Attachment'
              onChange={(event) => {
                pickFile(event.target.files);
                event.target.value = "";
              }}
            />
          </div>

          {file && (
            <div className='flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3'>
              <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded bg-red-50 text-[11px] font-bold text-red-600'>{/pdf$/i.test(file.name) ? "PDF" : "IMG"}</span>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold text-slate-800'>{file.name}</p>
                <p className='text-xs text-slate-500'>{sizeText(file.size)}</p>
              </div>
              {file.url && (
                <a href={file.url} target='_blank' rel='noreferrer' title='View' aria-label='View file' className='flex h-9 w-9 items-center justify-center rounded-md border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100'>
                  <Eye className='h-4 w-4' />
                </a>
              )}
              <button type='button' title='Remove' aria-label='Remove file' onClick={() => setFile(null)} className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-500 hover:bg-red-100'>
                <Trash2 className='h-4 w-4' />
              </button>
            </div>
          )}
        </div>
        {fileError && <p className='mt-1 text-xs text-red-500'>{fileError}</p>}

        <div className='mt-6'>{sectionTitle(<Info className='h-4 w-4' />, "Additional Information")}</div>
        <label className={labelClass}>Description / Remarks</label>
        <textarea
          rows='3'
          maxLength={1000}
          placeholder='Notes about this document'
          {...register("remarks")}
          className={`w-full resize-none rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600 ${errors.remarks ? "border-red-500" : "border-slate-300"}`}
        />
        {fieldError("remarks")}
      </div>

      <div className='flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
        <label className='flex cursor-pointer items-center gap-2 text-sm text-slate-700'>
          <input type='checkbox' {...register("isActive")} className='h-4 w-4 cursor-pointer accent-emerald-700' />
          Set as Active
        </label>
        <div className='flex flex-col-reverse gap-2 sm:flex-row'>
          <button type='button' onClick={cancel} className='flex h-11 cursor-pointer items-center justify-center rounded-md border border-slate-300 px-7 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
            Cancel
          </button>
          <button
            type='submit'
            disabled={isSubmitting || uploading || Boolean(waiting)}
            className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-7 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60'
          >
            <Save className='h-4 w-4' />
            {isSubmitting ? "Saving..." : editing ? "Update Document" : "Save Document"}
          </button>
        </div>
      </div>
    </form>
  );

  if (!popup) return form;
  return (
    <div className='fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6' onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}>
      {form}
    </div>
  );
}
