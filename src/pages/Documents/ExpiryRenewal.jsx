import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "../../lib/useForm";
import toast from "react-hot-toast";
import { Bell, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Info, MessageSquare, Pencil, Save, Search, Settings, X, Mail } from "lucide-react";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";

const PER_PAGE = 10;
const COLUMNS = ["SL", "Document Type", "Category", "Default Reminder Days", "Escalation Days", "Renewal Required", "Auto Status Update", "Action"];
const GLOBAL_KEYS = ["enableExpiryTracking", "enableRenewalReminder", "defaultReminderDays", "escalationDays", "emailEnabled", "inAppEnabled", "smsEnabled"];
const TYPE_KEYS = ["defaultReminderDays", "escalationDays", "renewalRequired", "autoStatusUpdate", "renewalValidity", "renewalValidityMonths", "allowVersionUpload", "keepPreviousVersions", "notifyResponsible"];
const RULES = [
  "Notify the responsible person and department.",
  'Mark the document as "Expiring Soon" or "Expired".',
  "Allow new version upload for renewal.",
  "Keep previous versions in the system.",
  "Update the status after approval.",
];

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";
const boxClass = (error) => `h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:border-emerald-600 ${error ? "border-red-500" : "border-slate-300"}`;
const panelClass = "rounded-lg border border-slate-200 bg-white shadow-sm";
const yesNo = (value) => (value ? "Yes" : "No");

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

// A switch for the form (a real checkbox underneath, so react-hook-form reads it) ...
function SwitchField({ register, name, label }) {
  return (
    <label className='flex cursor-pointer items-center justify-between gap-3 py-2'>
      <span className='text-sm font-semibold text-slate-700'>{label}</span>
      <span className='relative inline-flex'>
        <input type='checkbox' {...register(name)} className='peer sr-only' />
        <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-emerald-600 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-300 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition after:content-[''] peer-checked:after:translate-x-5" />
      </span>
    </label>
  );
}

// ... and the same look, not clickable, for the saved values on the page.
function SwitchView({ on }) {
  return (
    <span role='img' aria-label={on ? "On" : "Off"} className={`relative inline-block h-6 w-11 shrink-0 rounded-full ${on ? "bg-emerald-600" : "bg-slate-300"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? "left-[22px]" : "left-0.5"}`} />
    </span>
  );
}

const daysLabel = (reminder) => `${reminder.value} ${(reminder.unit ?? "DAYS").charAt(0)}${(reminder.unit ?? "DAYS").slice(1).toLowerCase()}`;

// The dropdown list with the saved value kept in it, even when it is not one of the usual choices.
const withCurrent = (list, current, label) => {
  const choices = [...(list ?? [])];
  if (current !== "" && current != null && !choices.some((item) => String(item.value) === String(current))) choices.push({ value: current, label: label(current) });
  return choices;
};

const ExpiryRenewal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [globalOpen, setGlobalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null); // the type-wise row in the popup
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowErrors, setRowErrors] = useState({}); // reminder errors, by reminder number

  const searchText = useDebounced(search.trim());

  // =========================================================
  // DATA
  // =========================================================

  const settings = useApi(() => api.get("/document-settings"), []);
  const options = useApi(() => api.get("/document-settings/filter-options"), []);
  const list = useApi(() => api.get("/document-types/expiry-settings", { search: searchText, page, perPage: PER_PAGE }), [searchText, page]);
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;
  const config = settings.data;
  const opts = options.data;
  const unitChoices = opts?.units ?? [];
  const reminderNames = opts?.reminderNames ?? ["First Reminder", "Second Reminder", "Third Reminder", "Final Reminder"];

  // A page that no longer exists (after a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  // =========================================================
  // FORMS (one for the global settings, one for a type)
  // =========================================================

  const globalForm = useForm({ defaultValues: {} });
  const typeForm = useForm({ defaultValues: {} });
  const validity = typeForm.watch("renewalValidity");

  const clearErrors = () => setRowErrors({});

  const openGlobal = () => {
    if (!config) return;
    clearErrors();
    globalForm.reset({
      enableExpiryTracking: config.enableExpiryTracking,
      enableRenewalReminder: config.enableRenewalReminder,
      defaultReminderDays: String(config.defaultReminderDays),
      escalationDays: String(config.escalationDays),
      reminders: config.reminders.map((item) => ({ enabled: item.enabled, value: String(item.value), unit: item.unit })),
      emailEnabled: config.emailEnabled,
      inAppEnabled: config.inAppEnabled,
      smsEnabled: config.smsEnabled,
    });
    setGlobalOpen(true);
  };

  const closeGlobal = () => {
    setGlobalOpen(false);
    clearErrors();
  };

  const openType = (row) => {
    clearErrors();
    typeForm.reset({
      defaultReminderDays: String(row.defaultReminderDays),
      escalationDays: String(row.escalationDays),
      renewalRequired: row.renewalRequired,
      autoStatusUpdate: row.autoStatusUpdate,
      renewalValidity: row.renewalValidity,
      renewalValidityMonths: row.renewalValidityMonths == null ? "" : String(row.renewalValidityMonths),
      allowVersionUpload: row.allowVersionUpload,
      keepPreviousVersions: row.keepPreviousVersions,
      notifyResponsible: row.notifyResponsible,
      reminders: row.reminders.map((item) => ({ enabled: item.enabled, days: String(item.days) })),
    });
    setEditingType(row);
  };

  const closeType = () => {
    setEditingType(null);
    clearErrors();
    if (searchParams.has("type")) setSearchParams({}, { replace: true });
  };

  // The Document Type page's "Expiry settings" link opens that type's form here.
  const wantedType = searchParams.get("type");
  useEffect(() => {
    if (!wantedType) return;
    let cancelled = false;
    api
      .get(`/document-types/${wantedType}/expiry-settings`)
      .then((row) => {
        if (!cancelled) openType(row);
      })
      .catch((error) => {
        toast.error(error.message);
        setSearchParams({}, { replace: true });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantedType]);

  // Server errors go to the field they belong to; reminder errors go under their row.
  const showErrors = (error, form, keys) => {
    const fields = error.fields ?? {};
    const reminders = {};
    let unplaced = false;
    for (const [key, message] of Object.entries(fields)) {
      const match = /^reminders\.(\d)/.exec(key);
      if (match) reminders[match[1]] = message;
      else if (keys.includes(key)) form.setError(key, { message });
      else unplaced = true;
    }
    setRowErrors(reminders);
    if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
  };

  const onGlobalSubmit = async (values) => {
    clearErrors();
    const body = {
      enableExpiryTracking: Boolean(values.enableExpiryTracking),
      enableRenewalReminder: Boolean(values.enableRenewalReminder),
      defaultReminderDays: Number(values.defaultReminderDays),
      escalationDays: Number(values.escalationDays),
      reminders: values.reminders.map((item) => ({ enabled: Boolean(item.enabled), value: Number(item.value), unit: item.unit })),
      emailEnabled: Boolean(values.emailEnabled),
      inAppEnabled: Boolean(values.inAppEnabled),
      smsEnabled: Boolean(values.smsEnabled),
    };
    try {
      const result = await api.put("/document-settings", body);
      notifySaved(result, "Settings updated successfully!");
      closeGlobal();
      settings.reload();
    } catch (error) {
      showErrors(error, globalForm, GLOBAL_KEYS);
    }
  };

  const onTypeSubmit = async (values) => {
    clearErrors();
    const custom = values.renewalValidity === "CUSTOM";
    const body = {
      defaultReminderDays: Number(values.defaultReminderDays),
      escalationDays: Number(values.escalationDays),
      renewalRequired: Boolean(values.renewalRequired),
      autoStatusUpdate: Boolean(values.autoStatusUpdate),
      renewalValidity: values.renewalValidity,
      renewalValidityMonths: custom && String(values.renewalValidityMonths).trim() !== "" ? Number(values.renewalValidityMonths) : null,
      allowVersionUpload: Boolean(values.allowVersionUpload),
      keepPreviousVersions: Boolean(values.keepPreviousVersions),
      notifyResponsible: Boolean(values.notifyResponsible),
      reminders: values.reminders.map((item) => ({ enabled: Boolean(item.enabled), days: Number(item.days) })),
    };
    try {
      const result = await api.put(`/document-types/${editingType.id}/expiry-settings`, body);
      notifySaved(result, "Expiry settings updated successfully!");
      closeType();
      list.reload();
    } catch (error) {
      showErrors(error, typeForm, TYPE_KEYS);
    }
  };

  const pageButton = "flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";
  const globalWaiting = config?.pendingRequest;
  const typeWaiting = editingType ? (rows.find((item) => item.id === editingType.id)?.pendingRequest ?? editingType.pendingRequest) : null;
  const buttonBase = "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md px-7 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60";

  const popupShell = (title, onClose, onSubmit, children, submitting, submitLabel, disabled, wide) => (
    <div className='fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6' onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form onSubmit={onSubmit} role='dialog' aria-modal='true' className={`w-full ${wide ? "max-w-3xl" : "max-w-xl"} overflow-hidden rounded-xl bg-white shadow-2xl`}>
        <div className='flex items-center justify-between bg-emerald-800 px-5 py-3.5 text-white'>
          <h2 className='flex items-center gap-2 text-lg font-bold'>
            <Settings className='h-5 w-5' />
            {title}
          </h2>
          <button type='button' onClick={onClose} aria-label='Close' title='Close' className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/15'>
            <X className='h-5 w-5' />
          </button>
        </div>
        <div className='max-h-[75vh] overflow-y-auto p-5'>{children}</div>
        <div className='flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end'>
          <button type='button' onClick={onClose} className={`${buttonBase} border border-slate-300 text-slate-700 hover:bg-slate-50`}>
            Cancel
          </button>
          <button type='submit' disabled={submitting || disabled} className={`${buttonBase} bg-emerald-800 text-white hover:bg-emerald-900`}>
            <Save className='h-4 w-4' />
            {submitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );

  const rowError = (index) => rowErrors[index] && <p className='mt-1 text-xs text-red-500'>{rowErrors[index]}</p>;
  const fieldError = (form, name) => form.formState.errors[name] && <p className='mt-1 text-xs text-red-500'>{form.formState.errors[name].message}</p>;
  const waitingNote = (waiting, what) =>
    waiting && (
      <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700'>
        Waiting for approval ({waiting.requestNo}). {what} cannot be saved until the request is decided.
      </p>
    );

  return (
    <div className='w-full space-y-4'>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className='flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 shadow-sm'>
        <Settings className='h-8 w-8 text-emerald-800' />
        <div>
          <h1 className='text-lg font-bold text-emerald-900'>Expiry &amp; Renewal Configuration</h1>
          <p className='text-sm text-slate-600'>Set up expiry reminder days, renewal rules and notification preferences for all document types.</p>
        </div>
      </div>

      {settings.error && !config ? (
        <ErrorState message={settings.error.message} onRetry={settings.reload} />
      ) : (
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-3'>
          {/* BASIC SETTINGS */}
          <div className={panelClass}>
            <h2 className='border-b border-slate-100 bg-emerald-50/40 px-5 py-3 text-base font-bold text-emerald-900'>Basic Settings</h2>
            {config ? (
              <div className='divide-y divide-slate-100 px-5'>
                <div className='flex items-center justify-between gap-3 py-4'>
                  <div>
                    <p className='text-sm font-bold text-slate-800'>Enable Expiry Tracking</p>
                    <p className='text-xs text-slate-500'>Automatically track expiry dates for all documents.</p>
                  </div>
                  <SwitchView on={config.enableExpiryTracking} />
                </div>
                <div className='flex items-center justify-between gap-3 py-4'>
                  <div>
                    <p className='text-sm font-bold text-slate-800'>Enable Renewal Reminder</p>
                    <p className='text-xs text-slate-500'>Send reminders before expiry date.</p>
                  </div>
                  <SwitchView on={config.enableRenewalReminder} />
                </div>
                <div className='flex items-center justify-between gap-3 py-4'>
                  <div>
                    <p className='text-sm font-bold text-slate-800'>Default Reminder Days</p>
                    <p className='text-xs text-slate-500'>Alert users before expiry (days).</p>
                  </div>
                  <span className='rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700'>{config.defaultReminderDays} Days</span>
                </div>
                <div className='flex items-center justify-between gap-3 py-4'>
                  <div>
                    <p className='text-sm font-bold text-slate-800'>Escalation Days (After Expiry)</p>
                    <p className='text-xs text-slate-500'>Send escalation notification if not renewed.</p>
                  </div>
                  <span className='rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700'>{config.escalationDays} Days</span>
                </div>
              </div>
            ) : (
              <div className='h-72 animate-pulse bg-slate-50' aria-busy='true' />
            )}
          </div>

          {/* REMINDER SCHEDULE + CHANNELS */}
          <div className={panelClass}>
            <h2 className='border-b border-slate-100 bg-emerald-50/40 px-5 py-3 text-base font-bold text-emerald-900'>Reminder Schedule</h2>
            {config ? (
              <div className='px-5 py-4'>
                <p className='text-xs text-slate-500'>Multiple reminders can be sent before the expiry date.</p>
                <ul className='mt-3 space-y-2'>
                  {config.reminders.map((item, index) => (
                    <li key={index} className='flex items-center gap-3 text-sm'>
                      <input type='checkbox' checked={item.enabled} readOnly aria-label={reminderNames[index]} className='h-4 w-4 accent-emerald-700' />
                      <span className='w-36 font-semibold text-slate-700'>{reminderNames[index]}</span>
                      <span className='rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700'>{daysLabel(item)}</span>
                    </li>
                  ))}
                </ul>

                <h3 className='mt-5 text-sm font-bold text-slate-800'>Notification Channels</h3>
                <ul className='mt-2 space-y-3'>
                  <li className='flex items-center justify-between text-sm text-slate-700'>
                    <span className='flex items-center gap-2'>
                      <Mail className='h-4 w-4 text-slate-500' /> Email
                    </span>
                    <SwitchView on={config.emailEnabled} />
                  </li>
                  <li className='flex items-center justify-between text-sm text-slate-700'>
                    <span className='flex items-center gap-2'>
                      <Bell className='h-4 w-4 text-slate-500' /> In-App Notification
                    </span>
                    <SwitchView on={config.inAppEnabled} />
                  </li>
                  <li className='flex items-center justify-between text-sm text-slate-700'>
                    <span className='flex items-center gap-2'>
                      <MessageSquare className='h-4 w-4 text-slate-500' /> SMS (Optional)
                    </span>
                    <SwitchView on={config.smsEnabled} />
                  </li>
                </ul>
              </div>
            ) : (
              <div className='h-72 animate-pulse bg-slate-50' aria-busy='true' />
            )}
          </div>

          {/* RENEWAL RULES */}
          <div className={panelClass}>
            <h2 className='border-b border-slate-100 bg-emerald-50/40 px-5 py-3 text-base font-bold text-emerald-900'>Renewal Rules</h2>
            <div className='px-5 py-4'>
              <p className='text-sm text-slate-700'>When a document is near expiry or expired, the system will:</p>
              <ol className='mt-3 space-y-2.5'>
                {RULES.map((rule, index) => (
                  <li key={rule} className='flex items-start gap-3 text-sm text-slate-700'>
                    <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white'>{index + 1}</span>
                    {rule}
                  </li>
                ))}
              </ol>
              <div className='mt-5 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs text-slate-600'>
                <p className='flex items-center gap-1.5 font-bold text-slate-800'>
                  <Info className='h-4 w-4 text-blue-600' /> Note
                </p>
                <p className='mt-1'>
                  Renewal settings apply to all document types. You can configure specific settings for each document type from the{" "}
                  <Link to='/documents-type' className='font-semibold text-blue-700 hover:underline'>
                    Document Type Setup
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DOCUMENT TYPE-WISE EXPIRY SETTINGS
      ====================================================== */}

      <div className={`${panelClass} p-5`}>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-base font-bold text-emerald-900'>Document Type-wise Expiry Settings</h2>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div className='relative'>
              <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
              <input
                type='text'
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder='Search by Type or Category...'
                className='h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-600 sm:w-72'
              />
            </div>
            <button
              type='button'
              onClick={openGlobal}
              disabled={!config}
              title={globalWaiting ? `Waiting for approval (${globalWaiting.requestNo})` : "Edit the global settings"}
              className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-6 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <Settings className='h-4 w-4' />
              Edit Settings
            </button>
          </div>
        </div>

        {globalWaiting && (
          <p role='status' className='mt-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700'>
            The global settings are waiting for approval ({globalWaiting.requestNo}).
          </p>
        )}

        <div className='mt-4 overflow-x-auto'>
          <table className='w-full min-w-[900px] text-left text-sm'>
            <thead>
              <tr className='bg-slate-50 text-slate-800'>
                {COLUMNS.map((column) => (
                  <th key={column} className={`px-3 py-3 font-bold ${["Action"].includes(column) ? "text-center" : ""}`}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {list.loading && !list.data ? (
                <TableSkeleton rows={6} columns={COLUMNS.length} />
              ) : list.error ? (
                <tr>
                  <td colSpan={COLUMNS.length} className='p-4'>
                    <ErrorState message={list.error.message} onRetry={list.reload} />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <EmptyRow columns={COLUMNS.length} message='No document types found' />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className='hover:bg-slate-50/60'>
                    <td className='px-3 py-3'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='px-3 py-3 font-semibold text-slate-800'>{row.typeName}</td>
                    <td className='px-3 py-3 text-slate-700'>{row.categoryName}</td>
                    <td className='px-3 py-3'>{row.defaultReminderDays}</td>
                    <td className='px-3 py-3'>{row.escalationDays}</td>
                    <td className='px-3 py-3'>{yesNo(row.renewalRequired)}</td>
                    <td className='px-3 py-3'>{yesNo(row.autoStatusUpdate)}</td>
                    <td className='px-3 py-3 text-center'>
                      {row.pendingRequest && (
                        <span title={`Waiting for approval (${row.pendingRequest.requestNo})`} className='mr-2 inline-block whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700'>
                          Pending approval
                        </span>
                      )}
                      <button
                        type='button'
                        title={row.pendingRequest ? `Waiting for approval (${row.pendingRequest.requestNo})` : "Edit"}
                        disabled={Boolean(row.pendingRequest)}
                        onClick={() => openType(row)}
                        className='inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-emerald-200 px-3 py-1.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                      >
                        <Pencil className='h-3.5 w-3.5' />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm font-semibold text-slate-700'>
            Showing {from} to {to} of {total} entries
          </p>
          <div className='flex items-center gap-1'>
            <button type='button' aria-label='First page' disabled={page <= 1} onClick={() => setPage(1)} className={pageButton}>
              <ChevronsLeft className='h-4 w-4' />
            </button>
            <button type='button' aria-label='Previous page' disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className={pageButton}>
              <ChevronLeft className='h-4 w-4' />
            </button>
            <span className='flex h-9 min-w-9 items-center justify-center rounded-md bg-emerald-800 px-3 text-sm font-semibold text-white'>{page}</span>
            <button type='button' aria-label='Next page' disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} className={pageButton}>
              <ChevronRight className='h-4 w-4' />
            </button>
            <button type='button' aria-label='Last page' disabled={page >= totalPages} onClick={() => setPage(totalPages)} className={pageButton}>
              <ChevronsRight className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          GLOBAL SETTINGS POPUP
      ====================================================== */}

      {globalOpen &&
        popupShell(
          "Edit Expiry & Renewal Settings",
          closeGlobal,
          globalForm.handleSubmit(onGlobalSubmit),
          <>
            {waitingNote(globalWaiting, "These settings")}

            <h3 className='mb-1 text-sm font-bold text-emerald-900'>Basic Settings</h3>
            <div className='divide-y divide-slate-100'>
              <SwitchField register={globalForm.register} name='enableExpiryTracking' label='Enable Expiry Tracking' />
              <SwitchField register={globalForm.register} name='enableRenewalReminder' label='Enable Renewal Reminder' />
            </div>
            <div className='mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label className={labelClass}>
                  Default Reminder Days <span className='text-red-500'>*</span>
                </label>
                <Select {...globalForm.register("defaultReminderDays")} className={`${boxClass(globalForm.formState.errors.defaultReminderDays)} cursor-pointer`}>
                  {withCurrent(opts?.reminderDays, config?.defaultReminderDays, (value) => `${value} Days`).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {fieldError(globalForm, "defaultReminderDays")}
              </div>
              <div>
                <label className={labelClass}>
                  Escalation Days (After Expiry) <span className='text-red-500'>*</span>
                </label>
                <Select {...globalForm.register("escalationDays")} className={`${boxClass(globalForm.formState.errors.escalationDays)} cursor-pointer`}>
                  {withCurrent(opts?.escalationDays, config?.escalationDays, (value) => `${value} Days`).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {fieldError(globalForm, "escalationDays")}
              </div>
            </div>

            <h3 className='mb-2 mt-6 text-sm font-bold text-emerald-900'>Reminder Schedule</h3>
            <ul className='space-y-3'>
              {reminderNames.map((name, index) => (
                <li key={name}>
                  <div className='flex flex-wrap items-center gap-3'>
                    <label className='flex w-44 cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700'>
                      <input type='checkbox' {...globalForm.register(`reminders.${index}.enabled`)} className='h-4 w-4 cursor-pointer accent-emerald-700' />
                      {name}
                    </label>
                    <Select {...globalForm.register(`reminders.${index}.value`)} className={`${boxClass(rowErrors[index])} w-28 cursor-pointer`}>
                      {withCurrent(opts?.reminderValues, config?.reminders?.[index]?.value, (value) => String(value)).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                    <Select {...globalForm.register(`reminders.${index}.unit`)} className={`${boxClass(rowErrors[index])} w-32 cursor-pointer`}>
                      {unitChoices.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  {rowError(index)}
                </li>
              ))}
            </ul>

            <h3 className='mb-1 mt-6 text-sm font-bold text-emerald-900'>Notification Channels</h3>
            <div className='divide-y divide-slate-100'>
              <SwitchField register={globalForm.register} name='emailEnabled' label='Email' />
              <SwitchField register={globalForm.register} name='inAppEnabled' label='In-App Notification' />
              <SwitchField register={globalForm.register} name='smsEnabled' label='SMS (Optional)' />
            </div>
          </>,
          globalForm.formState.isSubmitting,
          "Save Settings",
          Boolean(globalWaiting),
          false,
        )}

      {/* =====================================================
          ONE TYPE'S POPUP
      ====================================================== */}

      {editingType &&
        popupShell(
          "Edit Expiry Settings",
          closeType,
          typeForm.handleSubmit(onTypeSubmit),
          <>
            {waitingNote(typeWaiting, "This type")}

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label className={labelClass}>Document Type</label>
                <input type='text' value={editingType.typeName} readOnly className='h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700' />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <input type='text' value={editingType.categoryName} readOnly className='h-11 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700' />
              </div>
              <div>
                <label className={labelClass}>
                  Default Reminder Days <span className='text-red-500'>*</span>
                </label>
                <input type='number' min='1' max='365' {...typeForm.register("defaultReminderDays")} className={boxClass(typeForm.formState.errors.defaultReminderDays)} />
                {fieldError(typeForm, "defaultReminderDays")}
              </div>
              <div>
                <label className={labelClass}>
                  Escalation Days <span className='text-red-500'>*</span>
                </label>
                <input type='number' min='1' max='365' {...typeForm.register("escalationDays")} className={boxClass(typeForm.formState.errors.escalationDays)} />
                {fieldError(typeForm, "escalationDays")}
              </div>
            </div>

            <div className='mt-4 divide-y divide-slate-100'>
              <SwitchField register={typeForm.register} name='renewalRequired' label='Renewal Required' />
              <SwitchField register={typeForm.register} name='autoStatusUpdate' label='Auto Status Update' />
              <SwitchField register={typeForm.register} name='allowVersionUpload' label='Allow New Version Upload' />
              <SwitchField register={typeForm.register} name='keepPreviousVersions' label='Keep Previous Versions' />
              <SwitchField register={typeForm.register} name='notifyResponsible' label='Notify Responsible Person' />
            </div>

            <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <label className={labelClass}>
                  Renewal Validity <span className='text-red-500'>*</span>
                </label>
                <Select {...typeForm.register("renewalValidity")} className={`${boxClass(typeForm.formState.errors.renewalValidity)} cursor-pointer`}>
                  {(opts?.renewalValidity ?? []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {fieldError(typeForm, "renewalValidity")}
              </div>
              {validity === "CUSTOM" && (
                <div>
                  <label className={labelClass}>
                    Validity (Months) <span className='text-red-500'>*</span>
                  </label>
                  <input type='number' min='1' max='120' {...typeForm.register("renewalValidityMonths")} className={boxClass(typeForm.formState.errors.renewalValidityMonths)} />
                  {fieldError(typeForm, "renewalValidityMonths")}
                </div>
              )}
            </div>

            <h3 className='mb-2 mt-6 text-sm font-bold text-emerald-900'>Reminder Schedule (days before expiry)</h3>
            <ul className='space-y-3'>
              {reminderNames.map((name, index) => (
                <li key={name}>
                  <div className='flex flex-wrap items-center gap-3'>
                    <label className='flex w-44 cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700'>
                      <input type='checkbox' {...typeForm.register(`reminders.${index}.enabled`)} className='h-4 w-4 cursor-pointer accent-emerald-700' />
                      {name}
                    </label>
                    <input type='number' min='1' max='365' aria-label={`${name} days`} {...typeForm.register(`reminders.${index}.days`)} className={`${boxClass(rowErrors[index])} w-28`} />
                    <span className='text-sm text-slate-500'>Days</span>
                  </div>
                  {rowError(index)}
                </li>
              ))}
            </ul>
          </>,
          typeForm.formState.isSubmitting,
          "Save Settings",
          Boolean(typeWaiting),
          true,
        )}
    </div>
  );
};

export default ExpiryRenewal;
