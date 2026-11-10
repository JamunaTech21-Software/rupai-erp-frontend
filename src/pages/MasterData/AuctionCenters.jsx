import React, { useEffect, useState } from "react";
import { useForm } from "../../lib/useForm";
import toast from "react-hot-toast";

import MasterDataTabs from "./MasterDataTabs";
import auctionCentersData from "../../data/MasterData/auctionCentersData";

import { Building2, ChevronLeft, ChevronRight, Clock, Download, Pencil, Plus, Trash2, X } from "lucide-react";
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
  centerCode: "",
  centerName: "",
  shortName: "",
  address: "",
  cityDistrict: "",
  division: "",
  contactPerson: "",
  phone: "",
  email: "",
  auctionDays: [],
  auctionStartTime: "",
  timeZone: "",
  currency: "",
  status: "active",
  managedBy: "",
  regulatoryAuthority: "",
  establishedOn: "",
  remarks: "",
};
const FORM_KEYS = Object.keys(EMPTY_FORM);
const OPTIONAL_KEYS = ["shortName", "contactPerson", "email", "timeZone", "currency", "establishedOn", "remarks"];
// Which list of the filter-options answer feeds each dropdown.
const OPTION_LIST = {
  cityDistrict: "cities",
  division: "divisions",
  timeZone: "timeZones",
  currency: "currencies",
  status: "statuses",
  managedBy: "managedBy",
  regulatoryAuthority: "regulatoryAuthorities",
};
// What the Center Summary shows, in order (labels come from the page data).
const SUMMARY_KEYS = [
  "centerCode",
  "centerName",
  "shortName",
  "address",
  "cityDistrictLabel",
  "divisionLabel",
  "contactPerson",
  "phone",
  "email",
  "auctionDaysLabel",
  "auctionStartTimeLabel",
  "timeZoneLabel",
  "currencyLabel",
  "statusLabel",
  "managedByLabel",
  "regulatoryAuthorityLabel",
  "establishedOn",
];
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);
const dmy = (iso) => (iso ? String(iso).slice(0, 10).split("-").reverse().join("/") : DASH);

// A saved center as form values (empty optional values come back as null).
const toForm = (center) =>
  Object.fromEntries(
    FORM_KEYS.map((key) => {
      if (key === "auctionDays") return [key, [...(center.auctionDays ?? [])]];
      if (key === "auctionStartTime") return [key, String(center.auctionStartTime ?? "").slice(0, 5)];
      if (key === "establishedOn") return [key, String(center.establishedOn ?? "").slice(0, 10)];
      return [key, center[key] ?? EMPTY_FORM[key]];
    }),
  );
// Cleared optional values go to the server as null.
const toBody = (values) =>
  Object.fromEntries(
    FORM_KEYS.map((key) => {
      if (key === "auctionDays") return [key, Array.isArray(values[key]) ? values[key] : values[key] ? [values[key]] : []];
      const text = String(values[key] ?? "").trim();
      return [key, OPTIONAL_KEYS.includes(key) && text === "" ? null : text];
    }),
  );

const AuctionCenters = () => {
  // =====================================================
  // STATE + DATA
  // =====================================================

  const [selected, setSelected] = useState(null); // the center in the form; none = a new center
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [formOpen, setFormOpen] = useState(false); // the Add / Edit popup

  const options = useApi(() => api.get("/auction-centers/filter-options"), []);
  const list = useApi(() => api.get("/auction-centers", { page, perPage: PER_PAGE }), [page]);
  const rows = list.data?.data ?? [];
  const others = rows.filter((row) => row.id !== selected?.id);
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;
  const choicesOf = (name) => (name === "cityDistrict" ? cityChoices : (options.data?.[OPTION_LIST[name]] ?? []));
  const dayChoices = options.data?.auctionDays ?? [];

  // A page that no longer exists (after a delete) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  // =====================================================
  // REACT HOOK FORM
  // =====================================================

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  // City / District follows the Division: a picked division narrows the districts to its own.
  const pickedDivision = watch("division");
  const allCities = options.data?.cities ?? [];
  const cityChoices = pickedDivision ? allCities.filter((city) => city.division === pickedDivision) : allCities;

  // Changing the Division clears a district that no longer belongs to it.
  const onDivisionChange = (event) => {
    const division = event.target.value;
    const current = allCities.find((city) => city.value === watch("cityDistrict"));
    if (division && current && current.division !== division) setValue("cityDistrict", "", { shouldDirty: true });
  };

  // With no Division picked yet, choosing a district fills in its Division.
  const onCityChange = (event) => {
    const city = allCities.find((item) => item.value === event.target.value);
    if (city && !watch("division")) setValue("division", city.division, { shouldDirty: true, shouldValidate: true });
  };

  const handleAddNew = () => {
    setSelected(null);
    reset(EMPTY_FORM);
    setFormOpen(true);
  };

  const handleCancel = () => {
    setFormOpen(false);
    setSelected(null);
    reset(EMPTY_FORM);
  };

  const handleEdit = (center) => {
    setSelected(center);
    reset(toForm(center));
    setFormOpen(true);
  };

  // =====================================================
  // FORM SUBMIT
  // =====================================================

  const onSubmit = async (values) => {
    try {
      const body = toBody(values);
      const result = selected ? await api.put(`/auction-centers/${selected.id}`, body) : await api.post("/auction-centers", body);
      notifySaved(result, selected ? "Auction center updated successfully!" : "Auction center saved successfully!");
      handleCancel();
      if (!selected) setPage(1);
      list.reload();
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      for (const [key, message] of Object.entries(fields)) {
        if (FORM_KEYS.includes(key)) setError(key, { message });
        else unplaced = true;
      }
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  // =====================================================
  // EXPORT + DELETE
  // =====================================================

  // The export needs the token, so it is fetched and saved as a file here.
  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/auction-centers/export", { format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `auction-centers-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/auction-centers/${deleting.id}`);
      notifySaved(result, "Auction center deleted successfully!");
      if (selected?.id === deleting.id) handleCancel();
      setDeleting(null);
      list.reload();
    } catch (error) {
      // e.g. "used by N auction schedule rows"
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const waiting = rows.find((row) => row.id === selected?.id)?.pendingRequest ?? selected?.pendingRequest;
  const boxClass = (name) =>
    `w-full rounded-md border bg-white px-3 text-[12px] text-slate-700 outline-none ${
      errors[name] ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-emerald-500"
    }`;
  const summaryValue = (key) => {
    if (!selected) return DASH;
    if (key === "establishedOn") return dmy(selected.establishedOn);
    return orDash(selected[key]);
  };

  return (
    <div className='space-y-4'>
      {/* =====================================================
          MASTER DATA TABS
      ====================================================== */}

      <MasterDataTabs />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className='grid grid-cols-1 gap-4 xl:grid-cols-12'>
        {/* ===================================================
            LEFT SIDE - AUCTION CENTER FORM (a popup on Add New / Edit)
        ==================================================== */}

        <div
          className={formOpen ? "fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6" : "xl:col-span-6"}
          onMouseDown={formOpen ? (event) => event.target === event.currentTarget && handleCancel() : undefined}
        >
        <div
          role={formOpen ? "dialog" : undefined}
          aria-modal={formOpen ? "true" : undefined}
          className={formOpen ? "w-full max-w-3xl rounded-lg bg-white p-5 shadow-xl" : "rounded-lg border border-slate-200 bg-white p-4 shadow-sm"}
        >
          <div className='mb-5 flex items-center justify-between'>
            <h2 className='text-sm font-bold text-emerald-700'>{selected ? "Edit Auction Center" : auctionCentersData.form.title}</h2>

            {formOpen && (
              <button
                type='button'
                onClick={handleCancel}
                aria-label='Close'
                title='Close'
                className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {waiting && (
              <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-[12px] text-amber-700'>
                Waiting for approval ({waiting.requestNo}). This center cannot be saved until the request is decided.
              </p>
            )}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {auctionCentersData.form.fields.map((field) => {
                const wide = field.colSpan === 2;
                const rule = {
                  required: field.required ? `${field.label} is required` : false,
                  onChange: field.name === "division" ? onDivisionChange : field.name === "cityDistrict" ? onCityChange : undefined,
                };

                return (
                  <div key={field.name} className={wide ? "md:col-span-2" : ""}>
                    <label className='mb-3 block text-[11px] font-semibold text-slate-700'>
                      {field.label}

                      {field.required && <span className='ml-1 text-red-500'>*</span>}
                    </label>

                    {field.type === "select" && (
                      <Select {...register(field.name, rule)} className={`h-9 ${boxClass(field.name)}`}>
                        <option value=''>{field.placeholder}</option>

                        {choicesOf(field.name).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    )}

                    {field.type === "textarea" && (
                      <textarea
                        {...register(field.name, rule)}
                        placeholder={field.placeholder}
                        rows={field.rows || 3}
                        className={`resize-none py-2 placeholder:text-slate-400 ${boxClass(field.name)}`}
                      />
                    )}

                    {field.type === "date" && <input type='date' {...register(field.name, rule)} className={`h-9 ${boxClass(field.name)}`} />}

                    {field.type === "time" && (
                      <div className='relative'>
                        <Clock className='absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400' />

                        <input type='time' {...register(field.name, rule)} className={`h-9 pl-9 ${boxClass(field.name)}`} />
                      </div>
                    )}

                    {["text", "email", "tel"].includes(field.type) && (
                      <input
                        type={field.type}
                        {...register(field.name, rule)}
                        placeholder={field.placeholder}
                        className={`h-9 placeholder:text-slate-400 ${boxClass(field.name)}`}
                      />
                    )}

                    {field.type === "multi-select" && (
                      <div className={`flex min-h-9 flex-wrap gap-2 rounded-md border bg-white p-2 ${errors[field.name] ? "border-red-400" : "border-slate-200"}`}>
                        {dayChoices.map((day) => (
                          <label key={day.value} className='flex cursor-pointer items-center gap-1.5 rounded bg-slate-50 px-2 py-2 text-[11px] text-slate-600'>
                            <input
                              type='checkbox'
                              value={day.value}
                              {...register(field.name, {
                                validate: (value) => (Array.isArray(value) ? value.length > 0 : Boolean(value)) || `${field.label} is required`,
                              })}
                              className='h-3 w-3 accent-emerald-600'
                            />

                            {day.label}
                          </label>
                        ))}
                      </div>
                    )}

                    {errors[field.name] && <p className='mt-2 text-[10px] text-red-500'>{errors[field.name].message}</p>}
                  </div>
                );
              })}
            </div>

            {/* FORM FOOTER */}

            <div className='mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              <p className='text-[10px] font-medium text-red-500'>{auctionCentersData.page.mandatoryText}</p>

              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  onClick={handleCancel}
                  className='flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-6 text-xs font-medium text-slate-600 hover:bg-slate-50'
                >
                  <X className='h-3.5 w-3.5' />

                  {auctionCentersData.form.buttons.cancel}
                </button>

                <button
                  type='submit'
                  disabled={isSubmitting || Boolean(waiting)}
                  className='flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 text-xs font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  <Building2 className='h-3.5 w-3.5' />

                  {isSubmitting ? "Saving..." : selected ? "Update Auction Center" : auctionCentersData.form.buttons.save}
                </button>
              </div>
            </div>
          </form>
        </div>
        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}

        <div className='space-y-3 xl:col-span-6'>
          {/* AUCTION CENTER SUMMARY */}

          <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
            <div className='mb-3'>
              <h2 className='text-sm font-bold text-emerald-700'>{auctionCentersData.centerSummary.title}</h2>
            </div>

            {!selected && <p className='mb-3 text-[12px] text-slate-400'>Pick Edit on a center to see its summary.</p>}

            <div className='space-y-2'>
              {auctionCentersData.centerSummary.items.map((item, index) => (
                <div key={item.id} className='grid grid-cols-[130px_15px_1fr] items-start gap-2 border-b border-slate-100 pb-2 last:border-0'>
                  <span className='text-[11px] font-medium text-slate-500'>{item.label}</span>

                  <span className='text-[11px] text-slate-400'>:</span>

                  <span className='break-words text-right text-[11px] font-semibold text-slate-700'>{summaryValue(SUMMARY_KEYS[index])}</span>
                </div>
              ))}
            </div>
          </div>

          {/* OTHER AUCTION CENTERS */}

          <div className='rounded-lg border border-slate-200 bg-white p-2 shadow-sm'>
            <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
              <h2 className='text-sm font-bold text-emerald-700'>{auctionCentersData.otherCenters.title}</h2>

              <button
                type='button'
                onClick={handleAddNew}
                className='flex h-10 items-center gap-1.5 rounded-md bg-emerald-700 px-5 text-xs font-medium text-white hover:bg-emerald-800'
              >
                <Plus className='h-3.5 w-3.5' />

                Add New
              </button>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full min-w-[650px]'>
                <thead>
                  <tr className='border-b border-slate-100 bg-slate-50'>
                    {auctionCentersData.otherCenters.tableHeaders.map((header) => (
                      <th key={header.key} className='px-2 py-3 text-left text-[10px] font-semibold text-slate-600'>
                        {header.label}
                      </th>
                    ))}

                    <th className='px-2 py-3 text-center text-[10px] font-semibold text-slate-600'>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {list.loading && !list.data ? (
                    <TableSkeleton rows={4} columns={7} />
                  ) : list.error ? (
                    <tr>
                      <td colSpan={7} className='p-4'>
                        <ErrorState message={list.error.message} onRetry={list.reload} />
                      </td>
                    </tr>
                  ) : others.length === 0 ? (
                    <EmptyRow columns={7} message='No other auction centers' />
                  ) : (
                    others.map((center) => (
                      <tr key={center.id} className='border-b border-slate-100 last:border-0 hover:bg-slate-50'>
                        <td className='px-2 py-3 text-[10px] text-slate-600'>{center.centerCode}</td>
                        <td className='px-2 py-3 text-[10px] text-slate-600'>{center.centerName}</td>
                        <td className='px-2 py-3 text-[10px] text-slate-600'>{orDash(center.cityDistrictLabel)}</td>
                        <td className='px-2 py-3 text-[10px] text-slate-600'>{orDash(center.managedByLabel)}</td>
                        <td className='px-2 py-3 text-[10px] text-slate-600'>{orDash(center.regulatoryAuthorityLabel)}</td>
                        <td className='px-2 py-3 text-[10px] text-slate-600'>
                          <PendingBadge row={center} />
                          {center.statusLabel ?? center.status}
                        </td>

                        <td className='px-2 py-3'>
                          <div className='flex justify-center gap-1'>
                            <button
                              type='button'
                              onClick={() => handleEdit(center)}
                              disabled={Boolean(center.pendingRequest)}
                              className='flex h-7 w-7 items-center justify-center rounded-md border border-emerald-200 text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                              title={waitingTitle(center, "Edit")}
                            >
                              <Pencil className='h-3.5 w-3.5' />
                            </button>

                            <button
                              type='button'
                              onClick={() => setDeleting(center)}
                              disabled={Boolean(center.pendingRequest)}
                              className='flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                              title={waitingTitle(center, "Delete")}
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

            {/* TABLE FOOTER */}

            <div className='mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              <span className='text-[11px] text-slate-500'>
                Showing {from} to {to} of {total} entries
              </span>

              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  aria-label='Previous page'
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                  className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
                >
                  <ChevronLeft className='h-3.5 w-3.5' />
                </button>

                <span className='flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-xs font-medium text-white'>{page}</span>

                <button
                  type='button'
                  aria-label='Next page'
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
                >
                  <ChevronRight className='h-3.5 w-3.5' />
                </button>

                <button
                  type='button'
                  onClick={handleExport}
                  disabled={exporting}
                  className='flex h-10 items-center justify-center gap-2 rounded-md border border-emerald-200 px-5 text-xs font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-60'
                >
                  <Download className='h-3.5 w-3.5' />

                  {exporting ? "Exporting..." : "Export"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.centerName ?? "auction center"}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default AuctionCenters;
