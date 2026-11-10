import React, { useEffect, useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useForm } from "../../lib/useForm";
import { Plus, Pencil, Trash2, Upload, Download, X, Save, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import MasterDataTabs from "./MasterDataTabs";

import { buyerSetupData } from "../../data/MasterData/buyerSetupData";
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
const BLANK_CONTACT = { mobileNumber: "", contactPersonName: "", designation: "", type: "", isPrimary: false };
const EMPTY_FORM = {
  buyerCode: "",
  buyerName: "",
  shortName: "",
  buyerType: "",
  tradingType: "",
  country: "",
  address: "",
  phone: "",
  email: "",
  status: "ACTIVE",
  remarks: "",
};
const FORM_KEYS = Object.keys(EMPTY_FORM);
const OPTIONAL_KEYS = ["shortName", "phone", "email", "remarks"];
const blankForm = () => ({ ...EMPTY_FORM, contactPersons: [{ ...BLANK_CONTACT, isPrimary: true }] });
const filterClass = "h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs outline-none transition focus:border-emerald-600";

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

// A saved buyer as form values.
const toFormValues = (buyer) => ({
  ...Object.fromEntries(FORM_KEYS.map((key) => [key, buyer[key] ?? EMPTY_FORM[key]])),
  contactPersons: (buyer.contactPersons ?? []).length
    ? buyer.contactPersons.map((contact) => ({
        mobileNumber: contact.mobileNumber ?? "",
        contactPersonName: contact.contactPersonName ?? "",
        designation: contact.designation ?? "",
        type: contact.type ?? "",
        isPrimary: Boolean(contact.isPrimary),
      }))
    : [{ ...BLANK_CONTACT, isPrimary: true }],
});

const BuyerSetup = () => {
  // =======================================================
  // JSON DATA (labels and layout only)
  // =======================================================

  const { pageConfig, formFields, contactTable, buyerTableHeaders } = buyerSetupData;

  // =======================================================
  // STATE
  // =======================================================

  const [formOpen, setFormOpen] = useState(false); // the Add / Edit popup
  const [selected, setSelected] = useState(null); // the saved buyer in the form; none = a new buyer
  const [loadingId, setLoadingId] = useState(null);
  const [contactsError, setContactsError] = useState("");
  const [search, setSearch] = useState("");
  const [buyerType, setBuyerType] = useState("");
  const [tradingType, setTradingType] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const searchText = useDebounced(search.trim());

  // =======================================================
  // DATA
  // =======================================================

  const options = useApi(() => api.get("/buyers/filter-options"), []);
  const list = useApi(
    () => api.get("/buyers", { search: searchText, buyerType, tradingType, country, status, page, perPage: PER_PAGE }),
    [searchText, buyerType, tradingType, country, status, page],
  );
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;
  const buyerTypes = options.data?.buyerTypes ?? [];
  const tradingTypes = options.data?.tradingTypes ?? [];
  const countries = options.data?.countries ?? [];
  const contactTypes = options.data?.contactTypes ?? [];
  const designations = options.data?.designations ?? [];
  const statuses = options.data?.statuses ?? [];
  const hasFilters = Boolean(search || buyerType || tradingType || country || status);

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  // =======================================================
  // REACT HOOK FORM
  // =======================================================

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: blankForm() });

  const { fields: contactFields, append, remove } = useFieldArray({ control, name: "contactPersons" });
  const watchedContacts = useWatch({ control, name: "contactPersons" });

  // =======================================================
  // OPEN / CLOSE THE FORM
  // =======================================================

  const startNew = () => {
    setSelected(null);
    setContactsError("");
    reset(blankForm());
  };

  const openNew = () => {
    startNew();
    setFormOpen(true);
  };

  const closeForm = () => {
    startNew();
    setFormOpen(false);
  };

  // The list holds a short version; the full record (contact persons) is asked for.
  const handleEdit = async (row) => {
    setLoadingId(row.id);
    try {
      const buyer = await api.get(`/buyers/${row.id}`);
      setSelected(buyer);
      setContactsError("");
      reset(toFormValues(buyer));
      setFormOpen(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  // =======================================================
  // CONTACT PERSONS
  // =======================================================

  const handleAddContactPerson = () => append({ ...BLANK_CONTACT });

  const handleRemoveContact = (index) => {
    const current = watchedContacts || [];
    if (current.length <= 1) return;
    const removingPrimary = current[index]?.isPrimary;
    remove(index);
    // If the primary number was removed, the first remaining one becomes primary.
    if (removingPrimary) setTimeout(() => setValue("contactPersons.0.isPrimary", true), 0);
  };

  const handlePrimaryContact = (selectedIndex) => {
    (watchedContacts || []).forEach((_, index) => setValue(`contactPersons.${index}.isPrimary`, index === selectedIndex));
    setContactsError("");
  };

  // =======================================================
  // FORM SUBMIT
  // =======================================================

  const onSubmit = async (values) => {
    setContactsError("");
    const body = {
      ...Object.fromEntries(
        FORM_KEYS.map((key) => {
          const text = String(values[key] ?? "").trim();
          return [key, OPTIONAL_KEYS.includes(key) && text === "" ? null : text];
        }),
      ),
      contactPersons: values.contactPersons.map((contact) => ({
        mobileNumber: String(contact.mobileNumber ?? "").trim(),
        contactPersonName: String(contact.contactPersonName ?? "").trim(),
        designation: contact.designation,
        type: contact.type === "" ? null : contact.type,
        isPrimary: Boolean(contact.isPrimary),
      })),
    };
    try {
      const result = selected ? await api.put(`/buyers/${selected.id}`, body) : await api.post("/buyers", body);
      notifySaved(result, selected ? "Buyer updated successfully!" : "Buyer saved successfully!");
      closeForm();
      if (!selected) setPage(1);
      list.reload();
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      for (const [key, message] of Object.entries(fields)) {
        if (key === "contactPersons") setContactsError(message);
        else if (/^contactPersons\.\d+\.\w+$/.test(key)) setError(key, { message });
        else if (FORM_KEYS.includes(key)) setError(key, { message });
        else unplaced = true;
      }
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  // =======================================================
  // LIST ACTIONS
  // =======================================================

  const resetFilters = () => {
    setSearch("");
    setBuyerType("");
    setTradingType("");
    setCountry("");
    setStatus("");
    setPage(1);
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/buyers/export", { search: searchText, buyerType, tradingType, country, status, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `buyers-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/buyers/${deleting.id}`);
      notifySaved(result, "Buyer deleted successfully!");
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

  // =======================================================
  // FIELD ERROR CLASS
  // =======================================================

  const inputClass = (fieldName) =>
    `w-full rounded-md border px-3 py-2 text-sm outline-none transition ${
      errors[fieldName] ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-emerald-600"
    }`;
  const cellClass = (index, name) =>
    `h-[23px] w-full rounded border px-1 text-[9px] outline-none focus:border-emerald-600 ${
      errors.contactPersons?.[index]?.[name] ? "border-red-500" : "border-slate-300"
    }`;
  const cellError = (index, name) => errors.contactPersons?.[index]?.[name]?.message;
  const pageButton =
    "flex h-8 w-8 items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";
  const labelOf = (field) => formFields.find((f) => f.name === field)?.label;
  const placeholderOf = (field) => formFields.find((f) => f.name === field)?.placeholder;

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* ===================================================
          MASTER DATA TABS
      =================================================== */}

      <MasterDataTabs />

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <div className='grid grid-cols-1 gap-4 xl:grid-cols-5'>
        {/* =================================================
            LEFT - BUYER FORM (a popup on Add New / Edit)
        ================================================= */}

        <div
          className={formOpen ? "fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6" : "xl:col-span-2"}
          onMouseDown={formOpen ? (event) => event.target === event.currentTarget && closeForm() : undefined}
        >
          <div
            role={formOpen ? "dialog" : undefined}
            aria-modal={formOpen ? "true" : undefined}
            className={formOpen ? "w-full max-w-3xl rounded-lg bg-white p-5 shadow-xl" : "rounded-lg border border-slate-200 bg-white p-4 shadow-sm"}
          >
            {/* HEADER */}

            <div className='mb-5 flex items-center justify-between'>
              <h2 className='text-base font-bold text-emerald-700'>{pageConfig.formTitle}</h2>

              <div className='flex items-center gap-2'>
                {selected && <span className='rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700'>Edit Mode</span>}

                {formOpen && (
                  <button
                    type='button'
                    onClick={closeForm}
                    aria-label='Close'
                    title='Close'
                    className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
                  >
                    <X className='h-4 w-4' />
                  </button>
                )}
              </div>
            </div>

            {waiting && (
              <p role='status' className='mb-3 rounded-md bg-amber-50 px-3 py-2 text-[11px] text-amber-700'>
                Waiting for approval ({waiting.requestNo}). This buyer cannot be saved until the request is decided.
              </p>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* BUYER CODE + NAME */}

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-700'>
                    {labelOf("buyerCode")}
                    <span className='text-red-500'> *</span>
                  </label>

                  <input
                    type='text'
                    placeholder={placeholderOf("buyerCode")}
                    className={inputClass("buyerCode")}
                    {...register("buyerCode", { required: "Buyer code is required" })}
                  />

                  {errors.buyerCode && <p className='mt-1 text-xs text-red-500'>{errors.buyerCode.message}</p>}
                </div>

                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-700'>
                    {labelOf("buyerName")}
                    <span className='text-red-500'> *</span>
                  </label>

                  <input
                    type='text'
                    placeholder={placeholderOf("buyerName")}
                    className={inputClass("buyerName")}
                    {...register("buyerName", { required: "Buyer name is required" })}
                  />

                  {errors.buyerName && <p className='mt-1 text-xs text-red-500'>{errors.buyerName.message}</p>}
                </div>
              </div>

              {/* SHORT NAME */}

              <div className='mt-4'>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>Short Name</label>

                <input type='text' placeholder='Enter short name' className={inputClass("shortName")} {...register("shortName")} />

                {errors.shortName && <p className='mt-1 text-xs text-red-500'>{errors.shortName.message}</p>}
              </div>

              {/* BUYER TYPE + TRADING TYPE */}

              <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-700'>
                    Buyer Type <span className='text-red-500'>*</span>
                  </label>

                  <Select className={inputClass("buyerType")} {...register("buyerType", { required: "Buyer type is required" })}>
                    <option value=''>Select buyer type</option>

                    {buyerTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>

                  {errors.buyerType && <p className='mt-1 text-xs text-red-500'>{errors.buyerType.message}</p>}
                </div>

                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-700'>
                    Trading Type <span className='text-red-500'>*</span>
                  </label>

                  <Select className={inputClass("tradingType")} {...register("tradingType", { required: "Trading type is required" })}>
                    <option value=''>Select trading type</option>

                    {tradingTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>

                  {errors.tradingType && <p className='mt-1 text-xs text-red-500'>{errors.tradingType.message}</p>}
                </div>
              </div>

              {/* COUNTRY */}

              <div className='mt-4'>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Country <span className='text-red-500'>*</span>
                </label>

                <Select className={inputClass("country")} {...register("country", { required: "Country is required" })}>
                  <option value=''>Select country</option>

                  {countries.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                {errors.country && <p className='mt-1 text-xs text-red-500'>{errors.country.message}</p>}
              </div>

              {/* ADDRESS */}

              <div className='mt-4'>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Address <span className='text-red-500'>*</span>
                </label>

                <textarea
                  rows={3}
                  maxLength={250}
                  placeholder='Enter address...'
                  className={inputClass("address")}
                  {...register("address", {
                    required: "Address is required",
                    maxLength: { value: 250, message: "Maximum 250 characters allowed" },
                  })}
                />

                {errors.address && <p className='mt-1 text-xs text-red-500'>{errors.address.message}</p>}
              </div>

              {/* CONTACT PERSONS & MOBILE NUMBERS */}

              <div className='mt-5 w-full'>
                <div className='mb-2'>
                  <h3 className='text-[11px] font-bold text-emerald-700'>
                    {contactTable.title} {contactTable.required && <span className='text-red-500'>*</span>}
                  </h3>
                </div>

                <div className='w-full overflow-hidden rounded border border-slate-200'>
                  <table className='w-full table-fixed border-collapse text-[9px]'>
                    <colgroup>
                      {contactTable.columns.map((column) => (
                        <col key={column.key} style={{ width: column.width }} />
                      ))}
                    </colgroup>

                    <thead className='bg-slate-50'>
                      <tr>
                        {contactTable.columns.map((column) => (
                          <th
                            key={column.key}
                            className={`border-b border-slate-200 px-1 py-1.5 font-semibold text-slate-700 ${
                              column.align === "center" ? "text-center" : "text-left"
                            }`}
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {contactFields.map((field, index) => (
                        <tr key={field.id} className='hover:bg-slate-50'>
                          <td className='border-b border-slate-100 px-1 py-1 text-center text-slate-600'>{index + 1}</td>

                          <td className='border-b border-slate-100 px-1 py-1'>
                            <input
                              type='text'
                              placeholder='+880-...'
                              title={cellError(index, "mobileNumber")}
                              className={cellClass(index, "mobileNumber")}
                              {...register(`contactPersons.${index}.mobileNumber`, { required: "Mobile number is required" })}
                            />
                            {cellError(index, "mobileNumber") && <p className='mt-0.5 text-[8px] leading-tight text-red-500'>{cellError(index, "mobileNumber")}</p>}
                          </td>

                          <td className='border-b border-slate-100 px-1 py-1'>
                            <input
                              type='text'
                              placeholder='Contact person'
                              title={cellError(index, "contactPersonName")}
                              className={cellClass(index, "contactPersonName")}
                              {...register(`contactPersons.${index}.contactPersonName`, { required: "Contact person is required" })}
                            />
                            {cellError(index, "contactPersonName") && (
                              <p className='mt-0.5 text-[8px] leading-tight text-red-500'>{cellError(index, "contactPersonName")}</p>
                            )}
                          </td>

                          <td className='border-b border-slate-100 px-1 py-1'>
                            <Select
                              title={cellError(index, "designation")}
                              className={`${cellClass(index, "designation")} cursor-pointer bg-white`}
                              {...register(`contactPersons.${index}.designation`, { required: "Designation is required" })}
                            >
                              <option value=''>Select</option>

                              {designations.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                            {cellError(index, "designation") && <p className='mt-0.5 text-[8px] leading-tight text-red-500'>{cellError(index, "designation")}</p>}
                          </td>

                          <td className='border-b border-slate-100 px-1 py-1'>
                            <Select className={`${cellClass(index, "type")} cursor-pointer bg-white`} {...register(`contactPersons.${index}.type`)}>
                              <option value=''>Select</option>

                              {contactTypes.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                          </td>

                          <td className='border-b border-slate-100 px-1 py-1 text-center'>
                            <button
                              type='button'
                              onClick={() => handlePrimaryContact(index)}
                              className={`inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border transition ${
                                watchedContacts?.[index]?.isPrimary ? "border-emerald-600 bg-white" : "border-slate-300 bg-white hover:border-emerald-500"
                              }`}
                              title='Set as Primary'
                            >
                              {watchedContacts?.[index]?.isPrimary && <span className='h-2.5 w-2.5 rounded-full bg-emerald-600' />}
                            </button>
                          </td>

                          <td className='border-b border-slate-100 px-1 py-1 text-center'>
                            <button
                              type='button'
                              onClick={() => handleRemoveContact(index)}
                              title='Remove Contact Person'
                              className='inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-red-200 bg-white text-red-500 transition hover:bg-red-50 hover:text-red-600'
                            >
                              <Trash2 className='h-3.5 w-3.5' strokeWidth={2} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {contactsError && <p className='mt-1 text-xs text-red-500'>{contactsError}</p>}

                <div className='mt-1'>
                  <button
                    type='button'
                    onClick={handleAddContactPerson}
                    className='inline-flex cursor-pointer items-center gap-1 rounded-md border border-emerald-600 px-2.5 py-1 text-[14px] font-semibold text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-800'
                  >
                    <span className='text-[16px] leading-none'>+</span>

                    {contactTable.addButton.label}
                  </button>
                </div>
              </div>

              {/* PHONE + EMAIL */}

              <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-700'>Phone</label>

                  <input type='text' placeholder='Enter phone' className={inputClass("phone")} {...register("phone")} />

                  {errors.phone && <p className='mt-1 text-xs text-red-500'>{errors.phone.message}</p>}
                </div>

                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-700'>Email</label>

                  <input type='email' placeholder='Enter email' className={inputClass("email")} {...register("email")} />

                  {errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email.message}</p>}
                </div>
              </div>

              {/* STATUS + REMARKS */}

              <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-700'>
                    Status <span className='text-red-500'>*</span>
                  </label>

                  <Select className={inputClass("status")} {...register("status", { required: "Status is required" })}>
                    {statuses.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>

                  {errors.status && <p className='mt-1 text-xs text-red-500'>{errors.status.message}</p>}
                </div>

                <div>
                  <label className='mb-1 block text-xs font-semibold text-slate-700'>Remarks</label>

                  <textarea rows={2} maxLength={250} placeholder='Enter remarks...' className={inputClass("remarks")} {...register("remarks")} />

                  {errors.remarks && <p className='mt-1 text-xs text-red-500'>{errors.remarks.message}</p>}
                </div>
              </div>

              {/* FORM ACTIONS */}

              <div className='mt-5 flex flex-wrap justify-end gap-2'>
                <button
                  type='button'
                  onClick={closeForm}
                  className='flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
                >
                  <X className='h-4 w-4' />

                  {pageConfig.cancelButtonLabel}
                </button>

                <button
                  type='submit'
                  disabled={isSubmitting || Boolean(waiting)}
                  className='flex cursor-pointer items-center gap-2 rounded-md bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  <Save className='h-4 w-4' />

                  {isSubmitting ? "Saving..." : selected ? "Update Buyer" : pageConfig.saveButtonLabel}
                </button>
              </div>

              <p className='mt-4 text-xs font-medium text-red-500'>{pageConfig.mandatoryNote}</p>
            </form>
          </div>
        </div>

        {/* =================================================
            RIGHT - BUYER LIST
        ================================================= */}

        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-3'>
          {/* HEADER */}

          <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
            <h2 className='text-base font-bold text-emerald-700'>{pageConfig.listTitle}</h2>

            <div className='flex flex-wrap gap-2'>
              {/* IMPORT (the backend has no import yet) */}

              <button
                type='button'
                disabled
                title='Import from Excel is not available yet'
                className='flex cursor-not-allowed items-center gap-2 rounded-md border border-emerald-600 px-4 py-2.5 text-xs font-semibold text-emerald-700 opacity-50'
              >
                <Upload className='h-4 w-4' />

                {pageConfig.importButtonLabel}
              </button>

              {/* EXPORT */}

              <button
                type='button'
                onClick={handleExport}
                disabled={exporting}
                className='flex cursor-pointer items-center gap-2 rounded-md border border-emerald-600 px-4 py-2.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-60'
              >
                <Download className='h-4 w-4' />

                {exporting ? "Exporting..." : pageConfig.exportButtonLabel}
              </button>

              {/* ADD */}

              <button
                type='button'
                onClick={openNew}
                className='flex cursor-pointer items-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800'
              >
                <Plus className='h-4 w-4' />

                {pageConfig.addButtonLabel}
              </button>
            </div>
          </div>

          {/* SEARCH + FILTERS */}

          <div className='mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))_auto]'>
            <input
              type='text'
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder='Search code, name, mobile...'
              className={`${filterClass} sm:col-span-2 lg:col-span-1`}
            />

            <Select
              value={buyerType}
              onChange={(event) => {
                setBuyerType(event.target.value);
                setPage(1);
              }}
              className={filterClass}
            >
              <option value=''>All Buyer Types</option>
              {buyerTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Select
              value={tradingType}
              onChange={(event) => {
                setTradingType(event.target.value);
                setPage(1);
              }}
              className={filterClass}
            >
              <option value=''>All Trading Types</option>
              {tradingTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Select
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
                setPage(1);
              }}
              className={filterClass}
            >
              <option value=''>All Countries</option>
              {countries.map((option) => (
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
              {statuses.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <button
              type='button'
              onClick={resetFilters}
              disabled={!hasFilters}
              className='h-9 rounded-md border border-slate-300 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
            >
              Reset
            </button>
          </div>

          {/* =================================================
              BUYER TABLE
          ================================================= */}

          <div className='overflow-x-auto'>
            <table className='w-full min-w-[1100px] text-xs'>
              <thead className='bg-slate-50'>
                <tr>
                  {buyerTableHeaders.map((header) => (
                    <th key={header.key} className='whitespace-nowrap border-b px-3 py-3 text-left font-semibold text-slate-700'>
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {list.loading && !list.data ? (
                  <TableSkeleton rows={5} columns={buyerTableHeaders.length} />
                ) : list.error ? (
                  <tr>
                    <td colSpan={buyerTableHeaders.length} className='p-4'>
                      <ErrorState message={list.error.message} onRetry={list.reload} />
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <EmptyRow columns={buyerTableHeaders.length} message='No buyers found' />
                ) : (
                  rows.map((buyer, index) => (
                    <tr key={buyer.id} className='transition hover:bg-slate-50'>
                      <td className='border-b px-3 py-4'>{(page - 1) * PER_PAGE + index + 1}</td>

                      <td className='border-b px-3 py-4 font-medium'>{buyer.buyerCode}</td>

                      <td className='border-b px-3 py-4'>{buyer.buyerName}</td>

                      <td className='border-b px-3 py-4'>{buyer.shortName || DASH}</td>

                      <td className='border-b px-3 py-4'>{buyer.buyerTypeLabel}</td>

                      <td className='border-b px-3 py-4'>{buyer.tradingTypeLabel}</td>

                      <td className='border-b px-3 py-4'>{buyer.countryLabel}</td>

                      <td className='whitespace-nowrap border-b px-3 py-4'>{buyer.mobilePrimary || DASH}</td>

                      <td className='whitespace-nowrap border-b px-3 py-4'>{buyer.phone || DASH}</td>

                      <td className='border-b px-3 py-4'>
                        <PendingBadge row={buyer} />
                        <span
                          className={`rounded px-2 py-1 text-[10px] font-semibold ${
                            buyer.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {buyer.statusLabel}
                        </span>
                      </td>

                      <td className='border-b px-3 py-4'>
                        <div className='flex items-center gap-2'>
                          <button
                            type='button'
                            disabled={Boolean(buyer.pendingRequest) || loadingId === buyer.id}
                            onClick={() => handleEdit(buyer)}
                            className='cursor-pointer rounded border border-emerald-200 p-1.5 text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                            title={waitingTitle(buyer, "Edit")}
                          >
                            <Pencil className='h-3.5 w-3.5' />
                          </button>

                          <button
                            type='button'
                            disabled={Boolean(buyer.pendingRequest)}
                            onClick={() => setDeleting(buyer)}
                            className='cursor-pointer rounded border border-red-200 p-1.5 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                            title={waitingTitle(buyer, "Delete")}
                          >
                            <Trash2 className='h-3.5 w-3.5' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              TABLE FOOTER
          ================================================= */}

          <div className='mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4'>
            <p className='text-xs text-slate-500'>
              Showing {from} to {to} of {total} entries
            </p>

            <div className='flex items-center gap-1'>
              <button type='button' className={pageButton} disabled={page <= 1} onClick={() => setPage(1)} aria-label='First page'>
                <ChevronsLeft size={14} />
              </button>

              <button type='button' className={pageButton} disabled={page <= 1} onClick={() => setPage((current) => current - 1)} aria-label='Previous page'>
                <ChevronLeft size={14} />
              </button>

              <span className='flex h-8 min-w-8 items-center justify-center rounded bg-emerald-700 px-2 text-xs font-semibold text-white'>{page}</span>

              <button type='button' className={pageButton} disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} aria-label='Next page'>
                <ChevronRight size={14} />
              </button>

              <button type='button' className={pageButton} disabled={page >= totalPages} onClick={() => setPage(totalPages)} aria-label='Last page'>
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.buyerName ?? "this buyer"}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default BuyerSetup;
