import React, { useEffect, useMemo, useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Pencil,
  Plus,
  Save,
  Search,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import { useFieldArray, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { useForm } from "../../lib/useForm";

import MasterDataTabs from "./MasterDataTabs";

import { addNewBrokerData } from "../../data/MasterData/addBrokerData";
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
const LIST_HEADERS = ["SL", "Code", "Name", "License No.", "Contact Person", "Mobile Nos.", "Auction Center(s)", "Association", "Commission", "Status", "Action"];
const EMPTY_FORM = {
  brokerCode: "",
  brokerName: "",
  licenseNo: "",
  contactPersonName: "",
  designation: "",
  phone: "",
  email: "",
  tinNo: "",
  commission: "",
  status: "active",
  address: "",
  remarks: "",
  associationId: "",
};
const FORM_KEYS = Object.keys(EMPTY_FORM);
const OPTIONAL_KEYS = ["phone", "email", "tinNo", "remarks"];
const newMobileRow = (values = {}) => ({
  mobileNumber: "",
  contactPersonName: "",
  designationId: "",
  typeCode: "PRIMARY",
  isPrimary: false,
  ...values,
});
const filterClass = "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600";
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

// A saved broker as form values (the page's names: associationId, designationId, typeCode).
const toFormValues = (broker) => ({
  ...Object.fromEntries(FORM_KEYS.map((key) => [key, broker[key] ?? EMPTY_FORM[key]])),
  associationId: broker.association ?? "",
  commission: broker.commission === null || broker.commission === undefined ? "" : String(broker.commission),
  mobileNumbers: (broker.mobileNumbers ?? []).map((row) =>
    newMobileRow({
      mobileNumber: row.mobileNumber,
      contactPersonName: row.contactPersonName ?? "",
      designationId: row.designation ?? "",
      typeCode: row.type,
      isPrimary: Boolean(row.isPrimary),
    }),
  ),
});

const AddNewBroker = () => {
  const { brokerInformation, mobileNumbers, brokerSummary } = addNewBrokerData;

  // =========================================================
  // STATE
  // =========================================================

  const [selected, setSelected] = useState(null); // the broker in the form; none = a new broker
  const [centerIds, setCenterIds] = useState([]);
  const [centersError, setCentersError] = useState("");
  const [mobilesError, setMobilesError] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [search, setSearch] = useState("");
  const [designation, setDesignation] = useState("");
  const [association, setAssociation] = useState("");
  const [status, setStatus] = useState("");
  const [auctionCenter, setAuctionCenter] = useState("");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [formOpen, setFormOpen] = useState(false); // the Add / Edit popup
  const searchText = useDebounced(search.trim());

  // =========================================================
  // DATA
  // =========================================================

  const options = useApi(() => api.get("/brokers/filter-options"), []);
  const centerOptions = useApi(() => api.get("/options/auction-centers"), []);
  const centerList = useApi(() => api.get("/auction-centers", { perPage: 100 }), []);
  const list = useApi(
    () => api.get("/brokers", { search: searchText, designation, association, status, auctionCenter, page, perPage: PER_PAGE }),
    [searchText, designation, association, status, auctionCenter, page],
  );
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;
  const designations = options.data?.designations ?? [];
  const mobileTypes = options.data?.mobileTypes ?? mobileNumbers.typeOptions.map((item) => ({ value: item.code, label: item.name }));
  const associations = options.data?.associations ?? [];
  const statuses = options.data?.statuses ?? [];
  const centers = centerOptions.data ?? [];
  const centerStatus = useMemo(
    () => new Map((centerList.data?.data ?? []).map((center) => [center.id, center.statusLabel ?? center.status])),
    [centerList.data],
  );
  const hasFilters = Boolean(search || designation || association || status || auctionCenter);

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
    control,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { ...EMPTY_FORM, mobileNumbers: [newMobileRow({ isPrimary: true })] } });

  const { fields: mobileFields, append, remove } = useFieldArray({ control, name: "mobileNumbers" });
  const watchedMobileNumbers = useWatch({ control, name: "mobileNumbers" });

  const blankForm = () => ({ ...EMPTY_FORM, mobileNumbers: [newMobileRow({ isPrimary: true })] });

  const clearServerErrors = () => {
    setCentersError("");
    setMobilesError("");
  };

  const startNew = () => {
    setSelected(null);
    setCenterIds([]);
    clearServerErrors();
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

  // The list holds a short version; the full record (mobile numbers, summary) is asked for.
  const startEdit = async (row) => {
    setLoadingId(row.id);
    try {
      const broker = await api.get(`/brokers/${row.id}`);
      setSelected(broker);
      setCenterIds([...(broker.auctionCenters ?? [])]);
      clearServerErrors();
      reset(toFormValues(broker));
      setFormOpen(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  // =========================================================
  // MOBILE NUMBER ROWS
  // =========================================================

  const handleAddMobile = () => {
    append(newMobileRow({ typeCode: mobileTypes.find((item) => item.value !== "PRIMARY")?.value ?? "SECONDARY" }));
  };

  const handleRemoveMobile = (index) => {
    const currentRows = watchedMobileNumbers || [];

    // If only one row exists, don't remove it
    if (currentRows.length <= 1) {
      return;
    }

    const removingPrimary = currentRows[index]?.isPrimary;

    remove(index);

    // If the primary number was removed, the first remaining number becomes primary
    if (removingPrimary) {
      setTimeout(() => {
        setValue("mobileNumbers.0.isPrimary", true);
      }, 0);
    }
  };

  const handlePrimaryMobile = (selectedIndex) => {
    const currentRows = watchedMobileNumbers || [];

    currentRows.forEach((_, index) => {
      setValue(`mobileNumbers.${index}.isPrimary`, index === selectedIndex);
    });
    setMobilesError("");
  };

  // =========================================================
  // AUCTION CENTERS
  // =========================================================

  const toggleCenter = (id) => {
    setCenterIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    setCentersError("");
  };
  const centerLabel = (id) => centers.find((center) => center.value === id)?.label ?? selected?.auctionCentersName?.[selected.auctionCenters?.indexOf(id)] ?? id;

  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const onSubmit = async (values) => {
    clearServerErrors();
    if (centerIds.length === 0) {
      setCentersError("Auction center is required");
      return;
    }
    const body = {
      ...Object.fromEntries(
        FORM_KEYS.filter((key) => key !== "associationId").map((key) => {
          const text = String(values[key] ?? "").trim();
          return [key, OPTIONAL_KEYS.includes(key) && text === "" ? null : key === "commission" ? Number(text) : text];
        }),
      ),
      association: values.associationId,
      auctionCenters: centerIds,
      mobileNumbers: values.mobileNumbers.map((row) => ({
        mobileNumber: String(row.mobileNumber ?? "").trim(),
        contactPersonName: String(row.contactPersonName ?? "").trim() === "" ? null : String(row.contactPersonName).trim(),
        designation: row.designationId === "" ? null : row.designationId,
        type: row.typeCode,
        isPrimary: Boolean(row.isPrimary),
      })),
    };
    try {
      const result = selected ? await api.put(`/brokers/${selected.id}`, body) : await api.post("/brokers", body);
      notifySaved(result, selected ? "Broker updated successfully!" : "Broker saved successfully!");
      closeForm();
      if (!selected) setPage(1);
      list.reload();
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      for (const [key, message] of Object.entries(fields)) {
        const rowMatch = /^mobileNumbers\.(\d+)\.(\w+)$/.exec(key);
        if (key === "association") setError("associationId", { message });
        else if (key === "auctionCenters") setCentersError(message);
        else if (key === "mobileNumbers") setMobilesError(message);
        else if (rowMatch) {
          const field = rowMatch[2] === "designation" ? "designationId" : rowMatch[2] === "type" ? "typeCode" : rowMatch[2];
          setError(`mobileNumbers.${rowMatch[1]}.${field}`, { message });
        } else if (FORM_KEYS.includes(key)) setError(key, { message });
        else unplaced = true;
      }
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  // =========================================================
  // LIST ACTIONS
  // =========================================================

  const resetFilters = () => {
    setSearch("");
    setDesignation("");
    setAssociation("");
    setStatus("");
    setAuctionCenter("");
    setPage(1);
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/brokers/export", { search: searchText, designation, association, status, auctionCenter, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `brokers-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/brokers/${deleting.id}`);
      notifySaved(result, "Broker deleted successfully!");
      if (selected?.id === deleting.id) closeForm();
      setDeleting(null);
      list.reload();
    } catch (error) {
      // e.g. "This broker holds 2 sale positions."
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const waiting = rows.find((row) => row.id === selected?.id)?.pendingRequest ?? selected?.pendingRequest;
  const summary = selected?.brokerSummary ?? {};
  const pageButton =
    "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";
  const fieldOptions = { designation: designations };

  return (
    <div className='space-y-4'>
      <MasterDataTabs />

      <div
        className={formOpen ? "fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6" : undefined}
        onMouseDown={formOpen ? (event) => event.target === event.currentTarget && closeForm() : undefined}
      >
          <form
            onSubmit={handleSubmit(onSubmit)}
            role={formOpen ? "dialog" : undefined}
            aria-modal={formOpen ? "true" : undefined}
            className={formOpen ? "w-full max-w-4xl rounded-lg bg-slate-50 p-3 shadow-xl" : undefined}
          >
        <div className='grid grid-cols-1 gap-2 lg:grid-cols-12'>
          {/* =====================================================
                LEFT SIDE
          ====================================================== */}

          <div className={`space-y-4 ${formOpen ? "lg:col-span-12" : "lg:col-span-8"}`}>
            {/* =================================================
                  BROKER INFORMATION
            ================================================== */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              <div className='mb-4 flex items-center justify-between border-b border-slate-200 pb-3'>
                <h2 className='text-sm font-bold text-emerald-700'>{selected ? "Edit Broker" : brokerInformation?.title}</h2>

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

              {waiting && (
                <p role='status' className='mb-3 rounded-md bg-amber-50 px-3 py-2 text-[11px] text-amber-700'>
                  Waiting for approval ({waiting.requestNo}). This broker cannot be saved until the request is decided.
                </p>
              )}

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {brokerInformation?.fields?.map((field) => (
                  <div key={field.id}>
                    <label className='mb-1 block text-xs font-semibold text-slate-700'>
                      {field.label}

                      {field.required && <span className='text-red-500'> *</span>}
                    </label>

                    {field.type === "select" ? (
                      <Select
                        {...register(field.name, { required: field.required ? `${field.label} is required` : false })}
                        className='h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-emerald-500'
                      >
                        <option value=''>{field.placeholder}</option>

                        {(fieldOptions[field.name] ?? []).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name, { required: field.required ? `${field.label} is required` : false })}
                        className='h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-emerald-500'
                      />
                    )}

                    {errors[field.name] && <p className='mt-1 text-[10px] text-red-500'>{errors[field.name].message}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* =====================================================
                    MOBILE NUMBERS
            ====================================================== */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              <div className='mb-4 flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='text-sm font-bold text-emerald-700'>{mobileNumbers?.title}</h2>

                <button
                  type='button'
                  onClick={handleAddMobile}
                  className='inline-flex w-full items-center justify-center gap-2 rounded-md border border-emerald-300 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:w-auto'
                >
                  <Plus className='h-4 w-4' />

                  {mobileNumbers?.addAction?.label}
                </button>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full min-w-[750px]'>
                  <thead>
                    <tr className='border-b border-slate-200 bg-slate-50'>
                      {mobileNumbers?.columns?.map((column) => (
                        <th
                          key={column.key}
                          className={`px-3 py-3 text-xs font-semibold text-slate-600 ${column.align === "center" ? "text-center" : "text-left"}`}
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {mobileFields?.map((row, index) => (
                      <tr key={row.id} className='border-b border-slate-100 align-top'>
                        <td className='px-3 py-3 text-xs text-slate-700'>{index + 1}</td>

                        <td className='px-3 py-2'>
                          <input
                            type='tel'
                            placeholder={mobileNumbers?.fieldPlaceholders?.mobileNumber}
                            {...register(`mobileNumbers.${index}.mobileNumber`, {
                              required: mobileNumbers?.validation?.mobileNumber?.message ?? "Mobile number is required",
                            })}
                            className='h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs outline-none transition focus:border-emerald-500'
                          />

                          {errors.mobileNumbers?.[index]?.mobileNumber && (
                            <p className='mt-1 text-[10px] text-red-500'>{errors.mobileNumbers[index].mobileNumber.message}</p>
                          )}
                        </td>

                        <td className='px-3 py-2'>
                          <input
                            type='text'
                            placeholder={mobileNumbers?.fieldPlaceholders?.contactPersonName}
                            {...register(`mobileNumbers.${index}.contactPersonName`)}
                            className='h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs outline-none transition focus:border-emerald-500'
                          />

                          {errors.mobileNumbers?.[index]?.contactPersonName && (
                            <p className='mt-1 text-[10px] text-red-500'>{errors.mobileNumbers[index].contactPersonName.message}</p>
                          )}
                        </td>

                        <td className='px-3 py-2'>
                          <Select
                            {...register(`mobileNumbers.${index}.designationId`)}
                            className='h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs outline-none transition focus:border-emerald-500'
                          >
                            <option value=''>{mobileNumbers?.fieldPlaceholders?.designation}</option>

                            {designations.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Select>

                          {errors.mobileNumbers?.[index]?.designationId && (
                            <p className='mt-1 text-[10px] text-red-500'>{errors.mobileNumbers[index].designationId.message}</p>
                          )}
                        </td>

                        <td className='px-3 py-2'>
                          <Select
                            {...register(`mobileNumbers.${index}.typeCode`)}
                            className='h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs outline-none transition focus:border-emerald-500'
                          >
                            {mobileTypes.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Select>
                        </td>

                        <td className='px-3 py-2.5 text-center'>
                          <input
                            type='radio'
                            name='primaryMobile'
                            aria-label='Primary'
                            checked={watchedMobileNumbers?.[index]?.isPrimary || false}
                            onChange={() => handlePrimaryMobile(index)}
                            className='h-4 w-4 cursor-pointer accent-emerald-600'
                          />
                        </td>

                        <td className='px-3 py-2 text-center'>
                          <button
                            type='button'
                            onClick={() => handleRemoveMobile(index)}
                            className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-500 transition hover:bg-red-50'
                            title={mobileNumbers?.actionLabels?.remove ?? "Remove"}
                          >
                            <Trash2 className='h-4 w-4' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {mobilesError && <p className='mt-2 text-[10px] text-red-500'>{mobilesError}</p>}
            </div>

            {/* =====================================================
                    EMAIL & TIN INFORMATION
                ====================================================== */}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>Email</label>

                <input
                  type='email'
                  {...register("email", {
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" },
                  })}
                  className='h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-emerald-500'
                />

                {errors.email && <p className='mt-1 text-[10px] text-red-500'>{errors.email.message}</p>}
              </div>

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>TIN No.</label>

                <input
                  type='text'
                  {...register("tinNo")}
                  className='h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-emerald-500'
                />

                {errors.tinNo && <p className='mt-1 text-[10px] text-red-500'>{errors.tinNo.message}</p>}
              </div>
            </div>

            {/* =====================================================
                    AUCTION CENTERS & ASSOCIATION
                ====================================================== */}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-12'>
              <div className='md:col-span-7'>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Auction Center(s)
                  <span className='text-red-500'> *</span>
                </label>

                <div
                  className={`flex min-h-12 w-full flex-wrap items-center gap-2 rounded-md border bg-white p-2 ${
                    centersError ? "border-red-400" : "border-slate-300"
                  }`}
                >
                  {centers.length === 0 && <span className='px-1 text-[10px] text-slate-400'>No auction centers saved yet</span>}

                  {centers.map((center) => (
                    <label
                      key={center.value}
                      className='inline-flex cursor-pointer items-center gap-1.5 rounded bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-700'
                    >
                      <input
                        type='checkbox'
                        value={center.value}
                        checked={centerIds.includes(center.value)}
                        onChange={() => toggleCenter(center.value)}
                        className='h-3.5 w-3.5 accent-emerald-600'
                      />

                      <span className='whitespace-nowrap'>{center.label}</span>
                    </label>
                  ))}
                </div>

                {centersError && <p className='mt-1 text-[10px] text-red-500'>{centersError}</p>}
              </div>

              <div className='md:col-span-5'>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Association
                  <span className='text-red-500'> *</span>
                </label>

                <Select
                  {...register("associationId", { required: "Association is required" })}
                  className={`min-h-[48px] w-full rounded-md border bg-white px-3 py-2 text-xs outline-none transition ${
                    errors.associationId ? "border-red-400" : "border-slate-300 focus:border-emerald-500"
                  }`}
                >
                  <option value=''>Select Association</option>

                  {associations.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Select>

                {errors.associationId && <p className='mt-1 text-[10px] text-red-500'>{errors.associationId.message}</p>}
              </div>
            </div>

            {/* =================================================
                  COMMISSION + STATUS
            ================================================== */}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  {brokerInformation?.commission?.label}

                  {brokerInformation?.commission?.required && <span className='text-red-500'> *</span>}
                </label>

                <div className='flex'>
                  <input
                    type='number'
                    step='0.01'
                    min='0'
                    max='100'
                    placeholder={brokerInformation?.commission?.placeholder}
                    {...register("commission", {
                      required: brokerInformation?.commission?.required ? `${brokerInformation?.commission?.label} is required` : false,
                    })}
                    className={`h-9 w-full rounded-l-md border bg-white px-3 text-xs outline-none focus:border-emerald-500 ${
                      errors.commission ? "border-red-400" : "border-slate-300"
                    }`}
                  />

                  <span className='flex h-9 w-10 items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 text-xs text-slate-600'>
                    %
                  </span>
                </div>

                {errors.commission && <p className='mt-1 text-[10px] text-red-500'>{errors.commission.message}</p>}
              </div>

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  {brokerInformation?.status?.label}

                  {brokerInformation?.status?.required && <span className='text-red-500'> *</span>}
                </label>

                <Select
                  {...register("status", {
                    required: brokerInformation?.status?.required ? `${brokerInformation?.status?.label} is required` : false,
                  })}
                  className={`h-9 w-full rounded-md border bg-white px-3 text-xs outline-none focus:border-emerald-500 ${
                    errors.status ? "border-red-400" : "border-slate-300"
                  }`}
                >
                  <option value=''>{brokerInformation?.status?.placeholder}</option>

                  {statuses.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                {errors.status && <p className='mt-1 text-[10px] text-red-500'>{errors.status.message}</p>}
              </div>
            </div>

            {/* =================================================
                  ADDRESS
            ================================================== */}

            <div>
              <label className='mb-1 block text-xs font-semibold text-slate-700'>
                {brokerInformation?.address?.label}

                {brokerInformation?.address?.required && <span className='text-red-500'> *</span>}
              </label>

              <textarea
                rows={3}
                placeholder={brokerInformation?.address?.placeholder}
                {...register("address", {
                  required: brokerInformation?.address?.required ? `${brokerInformation?.address?.label} is required` : false,
                })}
                className={`w-full resize-none rounded-md border bg-white px-3 py-2 text-xs outline-none transition ${
                  errors.address ? "border-red-400" : "border-slate-300 focus:border-emerald-500"
                }`}
              />

              {errors.address && <p className='mt-1 text-[10px] text-red-500'>{errors.address.message}</p>}
            </div>

            {/* =====================================================
                    REMARKS
                ====================================================== */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              <div className='mb-2'>
                <label className='block text-xs font-semibold text-slate-700'>
                  {brokerInformation?.remarksField?.label}

                  <span className='font-normal text-slate-400'> (Optional)</span>
                </label>
              </div>

              <textarea
                rows={brokerInformation?.remarksField?.rows || 3}
                placeholder={brokerInformation?.remarksField?.placeholder}
                {...register(brokerInformation?.remarksField?.name)}
                className='w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-xs outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
              />

              {errors.remarks && <p className='mt-1 text-[10px] text-red-500'>{errors.remarks.message}</p>}
            </div>

            {/* =====================================================
                    FORM FOOTER / ACTIONS
                ====================================================== */}

            <div className='flex flex-col gap-3 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between'>
              <p className='text-[10px] font-medium text-red-500'>* Fields are mandatory</p>

              <div className='flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row'>
                <button
                  type='button'
                  onClick={closeForm}
                  className='inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-6 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] sm:w-auto'
                >
                  <X className='h-3.5 w-3.5' />

                  <span>Cancel</span>
                </button>

                <button
                  type='submit'
                  disabled={isSubmitting || Boolean(waiting)}
                  className='inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 px-6 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                >
                  <Save className='h-3.5 w-3.5' />

                  <span>{isSubmitting ? "Saving..." : selected ? "Update Broker" : "Save Broker"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* =====================================================
                RIGHT SIDE
          ====================================================== */}

          {!formOpen && (
          <div className='space-y-4 lg:col-span-4'>
            {/* SELECTED AUCTION CENTERS */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              <div className='mb-4 border-b border-slate-200 pb-3'>
                <h2 className='text-sm font-bold text-emerald-700'>{addNewBrokerData.auctionCenters.title}</h2>
              </div>

              <div className='space-y-3'>
                {centerIds.length === 0 && <p className='text-[11px] text-slate-400'>No auction center selected</p>}

                {centerIds.map((id) => (
                  <div key={id} className='flex items-center gap-3 rounded-md border border-slate-200 p-3'>
                    <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700'>
                      <Building2 className='h-4 w-4' />
                    </div>

                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-xs font-semibold text-slate-700'>{centerLabel(id)}</p>
                    </div>

                    {centerStatus.get(id) && (
                      <span
                        className={`rounded px-2 py-1 text-[10px] font-semibold ${
                          centerStatus.get(id) === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {centerStatus.get(id)}
                      </span>
                    )}

                    <button
                      type='button'
                      title='Remove'
                      onClick={() => toggleCenter(id)}
                      className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-red-500 transition hover:bg-red-50'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BROKER SUMMARY */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              <div className='mb-5 border-b border-slate-200 pb-3'>
                <h2 className='text-sm font-bold text-emerald-700'>{brokerSummary.title}</h2>
              </div>

              {!selected && <p className='mb-3 text-[11px] text-slate-400'>Pick Edit on a broker in the list to see its summary.</p>}

              <div className='space-y-3'>
                {brokerSummary.items.map((item) => {
                  const value = summary[item.key];

                  return (
                    <div key={item.key} className='grid grid-cols-12 items-center gap-2'>
                      <div className='col-span-4'>
                        <p className='text-[11px] font-semibold text-slate-700'>{item.label}</p>
                      </div>

                      <div className='col-span-1 text-center'>
                        <span className='text-[11px] font-semibold text-slate-400'>:</span>
                      </div>

                      <div className='col-span-7 min-w-0'>
                        {item.key === "status" && value ? (
                          <span
                            className={`inline-flex rounded px-2 py-1 text-[10px] font-semibold ${
                              value === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                            }`}
                          >
                            {value}
                          </span>
                        ) : (
                          <p className='break-words text-[11px] font-medium text-slate-700'>{orDash(value)}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          )}
        </div>
          </form>
      </div>

      {/* =====================================================
          BROKER LIST
      ====================================================== */}

      <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
        <div className='flex flex-col gap-3 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
          <h2 className='text-lg font-semibold text-green-800'>Broker List</h2>
          <div className='flex flex-col gap-2 sm:flex-row'>
            <button
              type='button'
              onClick={exportList}
              disabled={exporting}
              className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-700 bg-white px-4 text-sm font-medium text-green-700 transition hover:bg-green-50 disabled:opacity-60'
            >
              <Download size={16} />
              {exporting ? "Exporting..." : "Export"}
            </button>
            <button
              type='button'
              onClick={openNew}
              className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition hover:bg-green-800'
            >
              <Plus size={16} />
              Add New Broker
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))_auto]'>
          <div className='relative sm:col-span-2 lg:col-span-1'>
            <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder='Search by Code, Name, License No. or Contact...'
              className={`${filterClass} pl-9`}
            />
          </div>
          <Select
            value={designation}
            onChange={(event) => {
              setDesignation(event.target.value);
              setPage(1);
            }}
            className={filterClass}
          >
            <option value=''>All Designations</option>
            {designations.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select
            value={association}
            onChange={(event) => {
              setAssociation(event.target.value);
              setPage(1);
            }}
            className={filterClass}
          >
            <option value=''>All Associations</option>
            {associations.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select
            value={auctionCenter}
            onChange={(event) => {
              setAuctionCenter(event.target.value);
              setPage(1);
            }}
            className={filterClass}
          >
            <option value=''>All Auction Centers</option>
            {centers.map((option) => (
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
                <EmptyRow columns={LIST_HEADERS.length} message='No brokers found' />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className={`border-b border-gray-200 transition hover:bg-green-50/40 ${selected?.id === row.id ? "bg-green-50/60" : ""}`}>
                    <td className='px-3 py-3 text-center text-gray-700'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{orDash(row.brokerCode)}</td>
                    <td className='px-3 py-3 text-left font-medium text-gray-800'>{orDash(row.brokerName)}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{orDash(row.licenseNo)}</td>
                    <td className='px-3 py-3 text-left text-gray-700'>{orDash(row.contactPersonName)}</td>
                    <td className='px-3 py-3 text-center text-gray-700'>{orDash(row.totalMobileNumbers)}</td>
                    <td className='px-3 py-3 text-left text-gray-700'>{orDash((row.auctionCentersName ?? []).join(", "))}</td>
                    <td className='px-3 py-3 text-left text-gray-700'>{orDash(row.associationLabel)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{row.commission === null || row.commission === undefined ? DASH : `${row.commission}%`}</td>
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
        title={`Delete ${deleting?.brokerName ?? "broker"}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default AddNewBroker;
