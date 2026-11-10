import React, { useEffect, useState } from "react";
import { useForm } from "../../lib/useForm";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Pencil,
  Phone,
  Plus,
  Save,
  Search,
  SlidersHorizontal,
  Trash2,
  Warehouse,
  X,
} from "lucide-react";

import MasterDataTabs from "./MasterDataTabs";
import teaWarehouseData from "../../data/MasterData/teaWarehouseData";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";

const PER_PAGE = 10;
const DASH = "-";
const EMPTY_FORM = {
  warehouseCode: "",
  warehouseName: "",
  shortName: "",
  location: "",
  warehouseType: "",
  capacity: "",
  inChargePerson: "",
  officePhone: "",
  status: "active",
};
const FORM_KEYS = Object.keys(EMPTY_FORM);
const NUMBER_KEYS = ["capacity"];
const OPTIONAL_KEYS = ["shortName", "capacity", "officePhone"];
const LIST_HEADERS = ["SL", "Code", "Name", "Type", "Location", "Capacity (MT)", "In-Charge", "Primary Contact", "Status", "Action"];
const fieldClass =
  "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none focus:border-emerald-500";
const cellClass = "h-8 w-full rounded-md border border-slate-200 px-2 text-[10px] text-slate-700 outline-none focus:border-emerald-500";
const filterClass = "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600";

let nextKey = 1;
const newMobile = (values = {}) => ({
  key: `m${nextKey++}`,
  number: "",
  contactPerson: "",
  designation: "",
  type: "primary",
  primary: false,
  ...values,
});
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);
const stamp = (value) =>
  value
    ? new Date(value)
        .toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })
        .replace(",", "")
        .toUpperCase()
    : DASH;

// A saved warehouse as form values (empty optional values come back as null).
const toForm = (warehouse) => Object.fromEntries(FORM_KEYS.map((key) => [key, warehouse[key] ?? EMPTY_FORM[key]]));
// Cleared optional values go to the server as null; the capacity is a number.
const toBody = (values) =>
  Object.fromEntries(
    FORM_KEYS.map((key) => {
      const text = String(values[key] ?? "").trim();
      if (OPTIONAL_KEYS.includes(key) && text === "") return [key, null];
      return [key, NUMBER_KEYS.includes(key) ? Number(text) : text];
    }),
  );
const isBlank = (row) => !row.number.trim() && !row.contactPerson.trim() && !row.designation.trim();

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const TeaWarehouse = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [selected, setSelected] = useState(null); // the warehouse in the form; none = a new warehouse
  const [mobiles, setMobiles] = useState([]);
  const [mobileErrors, setMobileErrors] = useState({}); // { rowKey: { field: message } }
  const [mobilesError, setMobilesError] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const [warehouseType, setWarehouseType] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [formOpen, setFormOpen] = useState(false); // the Add / Edit popup
  const searchText = useDebounced(search.trim());

  // =========================================================
  // DATA
  // =========================================================

  const options = useApi(() => api.get("/tea-warehouses/filter-options"), []);
  const list = useApi(
    () => api.get("/tea-warehouses", { search: searchText, warehouseType, status, page, perPage: PER_PAGE }),
    [searchText, warehouseType, status, page],
  );
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;
  const typeOptions = options.data?.warehouseTypes ?? teaWarehouseData.form.fields.find((f) => f.name === "warehouseType").options;
  const statusOptions = options.data?.statuses ?? teaWarehouseData.statusOptions;
  const mobileTypeOptions = options.data?.mobileTypes ?? teaWarehouseData.mobileContacts.typeOptions;
  const hasFilters = Boolean(search || warehouseType || status);

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  // =========================================================
  // MOBILE NUMBER ROWS
  // =========================================================

  const clearMobileErrors = () => {
    setMobileErrors({});
    setMobilesError("");
  };
  const changeMobile = (key, patch) => {
    setMobiles((current) => current.map((row) => (row.key === key ? { ...row, ...patch } : row)));
    setMobileErrors((current) => (current[key] ? { ...current, [key]: {} } : current));
  };
  const setPrimary = (key) => {
    setMobiles((current) => current.map((row) => ({ ...row, primary: row.key === key })));
    setMobilesError("");
  };
  const addMobile = () => setMobiles((current) => [...current, newMobile({ type: current.length === 0 ? "primary" : "secondary" })]);
  const removeMobile = (key) => {
    setMobiles((current) => current.filter((row) => row.key !== key));
    clearMobileErrors();
  };

  // =========================================================
  // SELECT / NEW / CANCEL
  // =========================================================

  const startNew = () => {
    setSelected(null);
    setMobiles([]);
    clearMobileErrors();
    reset(EMPTY_FORM);
  };

  const openNew = () => {
    startNew();
    setFormOpen(true);
  };

  const closeForm = () => {
    startNew();
    setFormOpen(false);
  };

  // The list only holds a short version; the full record (with the mobile numbers) is asked for.
  const startEdit = async (row) => {
    setLoadingId(row.id);
    try {
      const warehouse = await api.get(`/tea-warehouses/${row.id}`);
      setSelected(warehouse);
      reset(toForm(warehouse));
      setMobiles((warehouse.mobileNumbers ?? []).map((item) => newMobile(item)));
      clearMobileErrors();
      setFormOpen(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  // =========================================================
  // SAVE
  // =========================================================

  const onSubmit = async (values) => {
    clearMobileErrors();
    const sent = mobiles.filter((row) => !isBlank(row));
    const body = {
      ...toBody(values),
      mobileNumbers: sent.map(({ number, contactPerson, designation, type, primary }) => ({
        number: number.trim(),
        contactPerson: contactPerson.trim(),
        designation: designation.trim() === "" ? null : designation.trim(),
        type,
        primary,
      })),
    };
    try {
      const result = selected ? await api.put(`/tea-warehouses/${selected.id}`, body) : await api.post("/tea-warehouses", body);
      notifySaved(result, selected ? "Warehouse updated successfully!" : "Warehouse saved successfully!");
      closeForm();
      if (!selected) setPage(1);
      list.reload();
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      const rowErrors = {};
      for (const [key, message] of Object.entries(fields)) {
        const rowMatch = /^mobileNumbers\.(\d+)\.(\w+)$/.exec(key);
        if (FORM_KEYS.includes(key)) setError(key, { message });
        else if (key === "mobileNumbers") setMobilesError(message);
        else if (rowMatch && sent[Number(rowMatch[1])]) {
          const rowKey = sent[Number(rowMatch[1])].key;
          rowErrors[rowKey] = { ...rowErrors[rowKey], [rowMatch[2]]: message };
        } else unplaced = true;
      }
      setMobileErrors(rowErrors);
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  // =========================================================
  // LIST ACTIONS
  // =========================================================

  const resetFilters = () => {
    setSearch("");
    setWarehouseType("");
    setStatus("");
    setPage(1);
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/tea-warehouses/export", { search: searchText, warehouseType, status, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `tea-warehouses-${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setExporting(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      const result = await api.del(`/tea-warehouses/${deleting.id}`);
      notifySaved(result, "Warehouse deleted successfully!");
      if (selected?.id === deleting.id) closeForm();
      setDeleting(null);
      list.reload();
    } catch (error) {
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const waiting = rows.find((row) => row.id === selected?.id)?.pendingRequest ?? selected?.pendingRequest;

  // =========================================================
  // SUMMARY (of the warehouse being edited)
  // =========================================================

  const summaryValues = selected
    ? {
        warehouseCode: selected.warehouseCode,
        warehouseName: selected.warehouseName,
        shortName: selected.shortName,
        location: selected.location,
        warehouseType: selected.warehouseTypeLabel,
        capacity: selected.capacity === null || selected.capacity === undefined ? null : `${selected.capacity} MT`,
        inChargePerson: selected.inChargePerson,
        officePhone: selected.officePhone,
        totalMobileNumbers: selected.totalMobileNumbers ?? selected.mobileNumbers?.length,
        primaryContact: selected.primaryContact,
        createdBy: selected.createdByName,
        createdOn: selected.createdAt ? stamp(selected.createdAt) : null,
        status: selected.statusLabel,
      }
    : {};

  const pageButton =
    "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className='space-y-4'>
      <MasterDataTabs />

      <div className='grid grid-cols-1 gap-4 xl:grid-cols-12'>
        {/* ===================================================
            LEFT SIDE - WAREHOUSE FORM (a popup on Add New / Edit)
        ==================================================== */}

        <div
          className={formOpen ? "fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6" : "xl:col-span-8"}
          onMouseDown={formOpen ? (event) => event.target === event.currentTarget && closeForm() : undefined}
        >
        <div
          role={formOpen ? "dialog" : undefined}
          aria-modal={formOpen ? "true" : undefined}
          className={formOpen ? "w-full max-w-4xl rounded-lg bg-white p-5 shadow-xl" : "rounded-lg border border-slate-200 bg-white p-4 shadow-sm"}
        >
          <div className='mb-3 flex items-center gap-2 border-b border-slate-100 pb-3'>
            <Warehouse className='h-5 w-5 text-emerald-700' />

            <h2 className='text-sm font-bold text-emerald-700'>{selected ? "Edit Warehouse" : teaWarehouseData.form.title}</h2>

            {formOpen && (
              <button
                type='button'
                onClick={closeForm}
                aria-label='Close'
                title='Close'
                className='ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {waiting && (
              <p role='status' className='mb-3 rounded-md bg-amber-50 px-3 py-2 text-[12px] text-amber-700'>
                Waiting for approval ({waiting.requestNo}). This warehouse cannot be saved until the request is decided.
              </p>
            )}

            {/* BASIC WAREHOUSE INFORMATION */}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2  xl:grid-cols-3'>
              {teaWarehouseData.form.fields.map((field) => (
                <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                  <label className='mb-2 block text-[11px] font-semibold text-slate-700'>
                    {field.label}

                    {field.required && <span className='ml-1 text-red-500'>*</span>}
                  </label>

                  {field.type === "textarea" && (
                    <div>
                      <textarea
                        {...register(field.name, {
                          required: field.required ? `${field.label} is required` : false,
                          maxLength: field.maxLength
                            ? { value: field.maxLength, message: `Maximum ${field.maxLength} characters allowed` }
                            : undefined,
                        })}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        className='min-h-[80px] w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-700 outline-none focus:border-emerald-500'
                      />

                      {field.maxLength && <div className='mt-1 text-right text-[10px] text-slate-400'>Max {field.maxLength} characters</div>}
                    </div>
                  )}

                  {field.type === "select" && (
                    <Select
                      {...register(field.name, { required: field.required ? `${field.label} is required` : false })}
                      className={fieldClass}
                    >
                      <option value=''>{field.placeholder}</option>

                      {typeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  )}

                  {(field.type === "text" || field.type === "number") && (
                    <input
                      type={field.type}
                      min={field.type === "number" ? 0 : undefined}
                      step={field.type === "number" ? "any" : undefined}
                      {...register(field.name, { required: field.required ? `${field.label} is required` : false })}
                      placeholder={field.placeholder}
                      className={fieldClass}
                    />
                  )}

                  {errors[field.name] && <p className='mt-1 text-[10px] text-red-500'>{errors[field.name].message}</p>}
                </div>
              ))}

              {/* STATUS (added: the only way to make a warehouse Inactive) */}

              <div>
                <label className='mb-2 block text-[11px] font-semibold text-slate-700'>
                  Status
                  <span className='ml-1 text-red-500'>*</span>
                </label>

                <Select {...register("status", { required: "Status is required" })} className={fieldClass}>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                {errors.status && <p className='mt-1 text-[10px] text-red-500'>{errors.status.message}</p>}
              </div>
            </div>

            {/* PHONE NUMBER */}

            <div className='mt-3 border-t border-slate-100 pt-2'>
              <div className='mb-4 flex items-center gap-2'>
                <Phone className='h-4 w-4 text-emerald-700' />

                <h3 className='text-xs font-bold text-emerald-700'>{teaWarehouseData.phoneSection.title}</h3>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {teaWarehouseData.phoneSection.fields.map((field) => (
                  <div key={field.name}>
                    <label className='mb-2 block text-[11px] font-semibold text-slate-700'>{field.label}</label>

                    <input type={field.type} {...register(field.name)} placeholder={field.placeholder} className={fieldClass} />

                    {errors[field.name] && <p className='mt-1 text-[10px] text-red-500'>{errors[field.name].message}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* MOBILE NUMBERS & CONTACT PERSONS */}

            <div className='mt-3 border-t border-slate-100 pt-2'>
              <div className='mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <h3 className='text-xs font-bold text-emerald-700'>{teaWarehouseData.mobileContacts.title}</h3>

                <button
                  type='button'
                  onClick={addMobile}
                  className='flex h-8 w-full items-center justify-center gap-1.5 rounded-md border border-emerald-200 px-3 text-[11px] font-medium text-emerald-700 hover:bg-emerald-50 sm:w-auto'
                >
                  <Plus className='h-3.5 w-3.5' />

                  {teaWarehouseData.mobileContacts.addButton}
                </button>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full '>
                  <thead>
                    <tr className='border-b border-slate-100 bg-slate-50'>
                      {teaWarehouseData.mobileContacts.tableHeaders.map((header) => (
                        <th key={header.key} className='px-2 py-2.5 text-left text-[10px] font-semibold text-slate-600'>
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {mobiles.length === 0 && (
                      <tr>
                        <td colSpan={teaWarehouseData.mobileContacts.tableHeaders.length} className='px-2 py-4 text-center text-[11px] text-slate-400'>
                          No mobile numbers added
                        </td>
                      </tr>
                    )}

                    {mobiles.map((contact, index) => {
                      const rowErrors = mobileErrors[contact.key] ?? {};
                      const box = (name) => `${cellClass} ${rowErrors[name] ? "border-red-500" : ""}`;

                      return (
                        <tr key={contact.key} className='border-b border-slate-100 align-top last:border-0'>
                          <td className='px-2 py-3'>
                            <span className='text-[10px] text-slate-600'>{index + 1}</span>
                          </td>

                          <td className='px-2 py-1'>
                            <input
                              type='text'
                              aria-label='Mobile Number'
                              value={contact.number}
                              onChange={(event) => changeMobile(contact.key, { number: event.target.value })}
                              className={box("number")}
                            />
                            {rowErrors.number && <p className='mt-0.5 text-[10px] text-red-500'>{rowErrors.number}</p>}
                          </td>

                          <td className='px-2 py-1'>
                            <input
                              type='text'
                              aria-label='Contact Person'
                              value={contact.contactPerson}
                              onChange={(event) => changeMobile(contact.key, { contactPerson: event.target.value })}
                              className={box("contactPerson")}
                            />
                            {rowErrors.contactPerson && <p className='mt-0.5 text-[10px] text-red-500'>{rowErrors.contactPerson}</p>}
                          </td>

                          <td className='px-2 py-1'>
                            <input
                              type='text'
                              aria-label='Designation'
                              value={contact.designation ?? ""}
                              onChange={(event) => changeMobile(contact.key, { designation: event.target.value })}
                              className={box("designation")}
                            />
                            {rowErrors.designation && <p className='mt-0.5 text-[10px] text-red-500'>{rowErrors.designation}</p>}
                          </td>

                          <td className='px-2 py-1'>
                            <Select
                              aria-label='Type'
                              value={contact.type}
                              onChange={(event) => changeMobile(contact.key, { type: event.target.value })}
                              className='h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-[10px] text-slate-700 outline-none focus:border-emerald-500'
                            >
                              {mobileTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                            {rowErrors.type && <p className='mt-0.5 text-[10px] text-red-500'>{rowErrors.type}</p>}
                          </td>

                          <td className='px-2 py-2.5 text-center'>
                            <input
                              type='radio'
                              name='primaryContact'
                              aria-label='Primary'
                              checked={Boolean(contact.primary)}
                              onChange={() => setPrimary(contact.key)}
                              className='h-4 w-4 accent-emerald-600'
                            />
                          </td>

                          <td className='px-2 py-1 text-center'>
                            <button
                              type='button'
                              onClick={() => removeMobile(contact.key)}
                              className='flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50'
                              title={teaWarehouseData.actions.delete}
                            >
                              <Trash2 className='h-3.5 w-3.5' />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {mobilesError && <p className='mt-2 text-[11px] text-red-500'>{mobilesError}</p>}

              <p className='mt-3 text-[10px] text-slate-500'>
                <span className='font-semibold text-slate-600'>Note:</span> {teaWarehouseData.mobileContacts.note}
              </p>
            </div>

            {/* FORM FOOTER */}

            <div className='mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              <span className='text-[10px] font-medium text-red-500'>{teaWarehouseData.footer.mandatoryText}</span>

              <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row'>
                <button
                  type='button'
                  onClick={closeForm}
                  className='flex h-10 w-full items-center justify-center gap-1.5 rounded-md border border-slate-200 px-6 text-[11px] font-medium text-slate-600 hover:bg-slate-50 sm:w-auto'
                >
                  <X className='h-3.5 w-3.5' />

                  {teaWarehouseData.footer.cancelButton}
                </button>

                <button
                  type='submit'
                  disabled={isSubmitting || Boolean(waiting)}
                  className='flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 px-6 text-[11px] font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                >
                  <Save className='h-3.5 w-3.5' />

                  {isSubmitting ? "Saving..." : selected ? "Update Warehouse" : teaWarehouseData.footer.submitButton}
                </button>
              </div>
            </div>
          </form>
        </div>
        </div>

        {/* ===================================================
            RIGHT SIDE - WAREHOUSE SUMMARY
        ==================================================== */}

        <div className='space-y-4 xl:col-span-4'>
          <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
            <div className='mb-5 flex items-center gap-2 border-b border-slate-100 pb-3'>
              <Warehouse className='h-4 w-4 text-emerald-700' />

              <h2 className='text-[14px] font-bold text-emerald-700'>{teaWarehouseData.summary.title}</h2>
            </div>

            {!selected && <p className='mb-4 text-[12px] text-slate-400'>Pick Edit on a warehouse in the list to see its summary.</p>}

            <div className='space-y-4'>
              {teaWarehouseData.summary.fields.map((field) => (
                <div key={field.key} className='grid grid-cols-[125px_15px_1fr] gap-2 text-[14px]'>
                  <span className='font-medium text-[14px] text-slate-600'>{field.label}</span>

                  <span className='text-slate-400'>:</span>

                  <span className='break-words font-medium text-slate-700'>{orDash(summaryValues[field.key])}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          WAREHOUSE LIST
      ====================================================== */}

      <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
        <div className='flex flex-col gap-3 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
          <h2 className='text-lg font-semibold text-green-800'>Warehouse List</h2>
          <div className='flex flex-col gap-2 sm:flex-row'>
            <button
              type='button'
              onClick={exportList}
              disabled={exporting}
              className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-700 bg-white px-5 text-sm font-medium text-green-700 transition hover:bg-green-50 disabled:opacity-60'
            >
              <Download size={16} />
              {exporting ? "Exporting..." : "Export"}
            </button>
            <button
              type='button'
              onClick={openNew}
              className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 text-sm font-medium text-white transition hover:bg-green-800'
            >
              <Plus size={16} />
              Add New Warehouse
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))_auto]'>
          <div className='relative sm:col-span-2 lg:col-span-1'>
            <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder='Search by Code, Name, Location or In-Charge...'
              className={`${filterClass} pl-9`}
            />
          </div>
          <Select
            value={warehouseType}
            onChange={(event) => {
              setWarehouseType(event.target.value);
              setPage(1);
            }}
            className={filterClass}
          >
            <option value=''>All Types</option>
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className={filterClass}
          >
            <option value=''>All Status</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <button
            type='button'
            title='Reset Filters'
            onClick={resetFilters}
            disabled={!hasFilters}
            className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <SlidersHorizontal size={18} className='text-gray-600' />
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full min-w-225 border-collapse text-sm'>
            <thead className='bg-gray-100'>
              <tr>
                {LIST_HEADERS.map((header) => (
                  <th key={header} className='whitespace-nowrap border border-gray-200 px-3 py-3 text-center text-xs font-semibold text-gray-700'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.loading && !list.data ? (
                <TableSkeleton rows={5} columns={LIST_HEADERS.length} />
              ) : list.error ? (
                <tr>
                  <td colSpan={LIST_HEADERS.length} className='p-4'>
                    <ErrorState message={list.error.message} onRetry={list.reload} />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <EmptyRow columns={LIST_HEADERS.length} message='No warehouses found' />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className={`border-b border-gray-200 transition hover:bg-green-50/40 ${selected?.id === row.id ? "bg-green-50/60" : ""}`}>
                    <td className='px-3 py-3 text-center text-gray-700'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{orDash(row.warehouseCode)}</td>
                    <td className='px-3 py-3 text-left font-medium text-gray-800'>{orDash(row.warehouseName)}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{orDash(row.warehouseTypeLabel)}</td>
                    <td className='px-3 py-3 text-left text-gray-700'>{orDash(row.location)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{orDash(row.capacity)}</td>
                    <td className='px-3 py-3 text-left text-gray-700'>{orDash(row.inChargePerson)}</td>
                    <td className='px-3 py-3 text-left text-gray-700'>{orDash(row.primaryContact)}</td>
                    <td className='px-3 py-3 text-center'>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          row.status === "inactive" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {row.statusLabel ?? row.status}
                      </span>
                    </td>
                    <td className='px-3 py-3'>
                      <PendingBadge row={row} />
                      <div className='flex items-center justify-center gap-1'>
                        <button
                          type='button'
                          disabled={Boolean(row.pendingRequest) || loadingId === row.id}
                          title={waitingTitle(row, "Edit")}
                          onClick={() => startEdit(row)}
                          className='cursor-pointer rounded-md p-2 text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40'
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type='button'
                          disabled={Boolean(row.pendingRequest)}
                          title={waitingTitle(row, "Delete")}
                          onClick={() => setDeleting(row)}
                          className='cursor-pointer rounded-md p-2 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 sm:flex-row sm:px-5'>
          <p>
            Showing <strong>{from}</strong> to <strong>{to}</strong> of <strong>{total}</strong> entries
          </p>
          <div className='flex items-center gap-1'>
            <button type='button' className={pageButton} disabled={page <= 1} onClick={() => setPage(1)} aria-label='First page'>
              <ChevronsLeft size={16} />
            </button>
            <button type='button' className={pageButton} disabled={page <= 1} onClick={() => setPage((current) => current - 1)} aria-label='Previous page'>
              <ChevronLeft size={16} />
            </button>
            <span className='flex h-8 min-w-8 items-center justify-center rounded-md bg-green-700 px-2 text-sm font-medium text-white'>{page}</span>
            <button type='button' className={pageButton} disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} aria-label='Next page'>
              <ChevronRight size={16} />
            </button>
            <button type='button' className={pageButton} disabled={page >= totalPages} onClick={() => setPage(totalPages)} aria-label='Last page'>
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.warehouseName ?? "warehouse"}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default TeaWarehouse;
