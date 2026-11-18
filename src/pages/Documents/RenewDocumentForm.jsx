import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CalendarClock, Eye, FileText, Info, Lock, Paperclip, RefreshCw, Trash2, UploadCloud, X } from "lucide-react";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { useForm } from "../../lib/useForm";

// RP1-198 F.N.7 Renew Document pop-up (Document Register "Renew" button, RP1-197 contract).
// Everything is read-only except Issuing Authority, Issue Date, Expiry Date, Reminder Settings and a new file.
// The current Issue / Expiry Dates show as Old Issued Date / Old Expiry Date.

const MAX_MB = 10;
const ACCEPT = ["application/pdf", "image/jpeg", "image/png"];
const FORM_KEYS = ["issuingAuthority", "issueDate", "expiryDate", "reminderSetting", "reminderDays"];

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";
const boxClass = (error) => `h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:border-emerald-600 ${error ? "border-red-500" : "border-slate-300"}`;
const readOnlyClass = "flex min-h-11 w-full items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700";

// ---- dates (plain YYYY-MM-DD text, so no time zone can move a day) ----
const parts = (iso) => iso.split("-").map(Number);
const valid = (iso) => /^\d{4}-\d{2}-\d{2}$/.test(iso || "") && !Number.isNaN(new Date(`${iso}T00:00:00Z`).getTime());
const pad = (n) => String(n).padStart(2, "0");
const addMonths = (iso, months) => {
  const [y, m, d] = parts(iso);
  const index = y * 12 + (m - 1) + months;
  const year = Math.floor(index / 12);
  const month = (index % 12) + 1;
  const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return `${year}-${pad(month)}-${pad(Math.min(d, last))}`;
};
const sizeText = (bytes) => (bytes == null ? "" : bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

function ReadOnly({ label, children, highlight = false }) {
  return (
    <div>
      <label className={`${labelClass} flex items-center gap-1`}>
        {label}
        <Lock className='h-3 w-3 text-slate-400' />
      </label>
      <div className={highlight ? `${readOnlyClass} border-amber-200 bg-amber-50 font-semibold text-amber-800` : readOnlyClass}>{children ?? "-"}</div>
    </div>
  );
}

export default function RenewDocumentForm({ document, onSaved, onClose }) {
  const info = useApi(() => api.get(`/documents/${document.id}/renew-form`), [document.id]);
  const data = info.data;
  const [file, setFile] = useState(null);
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
  } = useForm({ defaultValues: { issuingAuthority: "", issueDate: "", expiryDate: "", reminderSetting: "DEFAULT", reminderDays: "" } });
  const reminderSetting = watch("reminderSetting");

  // Pre-fill once the pop-up's values arrive.
  useEffect(() => {
    if (!data) return;
    reset({
      issuingAuthority: data.issuingAuthority ?? "",
      issueDate: data.suggestedIssueDate ?? "",
      expiryDate: data.suggestedExpiryDate ?? "",
      reminderSetting: data.reminderSetting ?? "DEFAULT",
      reminderDays: Array.isArray(data.reminderDays) ? data.reminderDays.join(", ") : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.id]);

  const typeDays = data?.typeReminderDays ?? [];
  const defaultLabel = `Use Default (${typeDays.length ? `${typeDays.join(", ")} Days` : "none"})`;
  const blocked = data && !data.canRenew;

  // A new Issue Date suggests the Expiry Date from the type's Renewal Validity.
  const fromIssue = (event) => {
    const issue = event.target.value;
    if (valid(issue) && data?.renewalMonths) setValue("expiryDate", addMonths(issue, data.renewalMonths));
  };

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

  const onSubmit = async (values) => {
    setFileError("");
    const days = String(values.reminderDays ?? "")
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number);
    const body = {
      issuingAuthority: values.issuingAuthority.trim() || null,
      issueDate: values.issueDate,
      expiryDate: values.expiryDate,
      reminderSetting: values.reminderSetting,
      reminderDays: values.reminderSetting === "CUSTOM" ? days : null,
      ...(file ? { attachment: file.id } : {}),
    };
    try {
      const result = await api.post(`/documents/${document.id}/renew`, body);
      notifySaved(result, "Document renewed successfully!");
      onSaved?.(result);
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      for (const [key, message] of Object.entries(fields)) {
        if (key === "attachment") setFileError(message);
        else if (FORM_KEYS.includes(key)) setError(key, { message });
        else unplaced = true;
      }
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  const fieldError = (name) => errors[name] && <p className='mt-1 text-xs text-red-500'>{errors[name].message}</p>;
  const sectionTitle = (icon, title) => (
    <h3 className='mb-3 flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-900'>
      {icon}
      {title}
    </h3>
  );

  return (
    <div className='fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6' onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}>
      <form onSubmit={handleSubmit(onSubmit)} role='dialog' aria-modal='true' className='w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl'>
        <div className='flex items-center justify-between bg-emerald-800 px-5 py-3.5 text-white'>
          <h2 className='flex items-center gap-2 text-lg font-bold'>
            <RefreshCw className='h-5 w-5' />
            Renew Document
          </h2>
          <button type='button' onClick={onClose} aria-label='Close' title='Close' className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/15'>
            <X className='h-5 w-5' />
          </button>
        </div>

        <div className='max-h-[75vh] overflow-y-auto p-5'>
          {info.loading && !data ? (
            <div className='space-y-3' aria-label='Loading'>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className='h-11 animate-pulse rounded-md bg-slate-100' />
              ))}
            </div>
          ) : info.error ? (
            <p role='alert' className='rounded-md bg-red-50 px-3 py-2 text-sm text-red-700'>
              {info.error.message}
            </p>
          ) : (
            <>
              {blocked && (
                <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700'>
                  {data.reason}
                </p>
              )}

              {sectionTitle(<FileText className='h-4 w-4' />, "Document Information")}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <ReadOnly label='Document Category'>{data.categoryName}</ReadOnly>
                <ReadOnly label='Document Type'>{data.typeName}</ReadOnly>
              </div>
              <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3'>
                <div className='sm:col-span-2'>
                  <ReadOnly label='Document Name'>{data.documentName}</ReadOnly>
                </div>
                <ReadOnly label='Document No.'>{data.documentNo}</ReadOnly>
              </div>
              <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3'>
                <ReadOnly label='Validity Period (Months)'>{data.validityMonths}</ReadOnly>
                <ReadOnly label='Renewal Required'>{data.renewalRequired ? "Yes" : "No"}</ReadOnly>
                <ReadOnly label='Status'>{data.statusLabel}</ReadOnly>
              </div>
              <div className='mt-4'>
                <ReadOnly label='Description / Remarks'>{data.remarks}</ReadOnly>
              </div>

              <div className='mt-6'>{sectionTitle(<CalendarClock className='h-4 w-4' />, "Renewal")}</div>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <ReadOnly label='Old Issued Date' highlight>
                  {data.oldIssueDate}
                </ReadOnly>
                <ReadOnly label='Old Expiry Date' highlight>
                  {data.oldExpiryDate}
                </ReadOnly>
              </div>

              <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3'>
                <div>
                  <label className={labelClass}>Issuing Authority</label>
                  <input type='text' maxLength={200} placeholder='e.g. Department of Environment (DoE)' {...register("issuingAuthority")} className={boxClass(errors.issuingAuthority)} />
                  {fieldError("issuingAuthority")}
                </div>
                <div>
                  <label className={labelClass}>
                    New Issue Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    {...register("issueDate", {
                      required: "Issue date is required",
                      onChange: fromIssue,
                      validate: (value) => !data.oldIssueDate || value >= data.oldIssueDate || `Must be on or after the Old Issued Date (${data.oldIssueDate}).`,
                    })}
                    className={boxClass(errors.issueDate)}
                  />
                  {fieldError("issueDate")}
                </div>
                <div>
                  <label className={labelClass}>
                    New Expiry Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='date'
                    {...register("expiryDate", {
                      required: "Expiry date is required",
                      validate: (value) => {
                        const issue = getValues("issueDate");
                        if (valid(issue) && value <= issue) return "Must be after the Issue Date.";
                        if (data.oldExpiryDate && value <= data.oldExpiryDate) return `Must be after the Old Expiry Date (${data.oldExpiryDate}).`;
                        return true;
                      },
                    })}
                    className={boxClass(errors.expiryDate)}
                  />
                  {fieldError("expiryDate")}
                  {data.renewalMonths && <p className='mt-1 text-xs text-slate-500'>Suggested: Issue Date + {data.renewalMonths} months</p>}
                </div>
              </div>

              <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
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
                {reminderSetting === "CUSTOM" && (
                  <div>
                    <label className={labelClass}>
                      Reminder Days <span className='text-red-500'>*</span>
                    </label>
                    <input type='text' placeholder='e.g. 60, 30, 7 (largest first, up to 4)' {...register("reminderDays")} className={boxClass(errors.reminderDays)} />
                    {fieldError("reminderDays")}
                  </div>
                )}
              </div>

              <div className='mt-6'>{sectionTitle(<Paperclip className='h-4 w-4' />, "Attachment")}</div>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <p className={labelClass}>Current File</p>
                  {data.attachmentUrl ? (
                    <a href={data.attachmentUrl} target='_blank' rel='noreferrer' className='inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100'>
                      <Eye className='h-4 w-4' />
                      {data.attachmentName ?? "Open attachment"}
                    </a>
                  ) : (
                    <p className='text-sm text-slate-500'>No file attached.</p>
                  )}
                  <p className='mt-2 text-xs text-slate-500'>The current file is kept in the Renewal History.</p>
                </div>

                {data.allowNewAttachment ? (
                  <div>
                    <p className={labelClass}>New File (optional)</p>
                    {file ? (
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
                    ) : (
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
                        className={`flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-3 py-3 text-center text-sm ${dragging ? "border-emerald-600 bg-emerald-50" : "border-blue-200 bg-blue-50/40"} ${fileError ? "border-red-400" : ""}`}
                      >
                        <UploadCloud className='h-6 w-6 text-emerald-700' />
                        <p className='mt-1 text-slate-700'>
                          {uploading ? (
                            "Uploading..."
                          ) : (
                            <>
                              Drag &amp; drop or <span className='font-semibold text-blue-600'>click to browse</span>
                            </>
                          )}
                        </p>
                        <p className='text-xs text-slate-500'>PDF, JPG, PNG (Max {MAX_MB} MB)</p>
                      </div>
                    )}
                    <input
                      ref={picker}
                      type='file'
                      accept='.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png'
                      className='hidden'
                      aria-label='New file'
                      onChange={(event) => {
                        pickFile(event.target.files);
                        event.target.value = "";
                      }}
                    />
                    {fileError && <p className='mt-1 text-xs text-red-500'>{fileError}</p>}
                  </div>
                ) : (
                  <p className='self-center rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-600'>This document type does not allow a new file on renewal; the current file stays.</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className='flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end'>
          <button type='button' onClick={onClose} className='flex h-11 cursor-pointer items-center justify-center rounded-md border border-slate-300 px-7 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
            Cancel
          </button>
          <button
            type='submit'
            disabled={!data || blocked || isSubmitting || uploading}
            className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-7 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60'
          >
            <RefreshCw className='h-4 w-4' />
            {isSubmitting ? "Renewing..." : "Renew Document"}
          </button>
        </div>
      </form>
    </div>
  );
}
