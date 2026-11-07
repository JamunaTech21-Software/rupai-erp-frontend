import React, { useEffect, useRef, useState } from "react";
import { useForm } from "../../lib/useForm";
import toast from "react-hot-toast";
import MasterDataTabs from "./MasterDataTabs";
import { seasonData } from "../../data/MasterData/seasonData";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";

import {
  CalendarDays,
  Leaf,
  CircleCheck,
  Clock3,
  Factory,
  Banknote,
  Info,
} from "lucide-react";
import Select from "../../components/common/Select";

const iconMap = {
  calendar: CalendarDays,
  leaf: Leaf,
  circleCheck: CircleCheck,
  clock: Clock3,
  factory: Factory,
  money: Banknote,
};

const PER_PAGE = 10;
const DASH = "-";
const EMPTY_FORM = { seasonName: "", seasonCode: "", seasonType: "", startDate: "", endDate: "", status: "", description: "", remarks: "" };
const FORM_KEYS = Object.keys(EMPTY_FORM);
const EMPTY_FILTERS = { seasonType: "", status: "", year: "" };
const STATUS_CLASS = {
  active: "bg-green-50 text-green-600",
  completed: "bg-blue-50 text-blue-600",
  inactive: "bg-red-50 text-red-600",
};
const inputClass =
  "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100";
const textareaClass =
  "w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100";

const dmy = (iso) => (iso ? iso.slice(0, 10).split("-").reverse().join("/") : DASH);
const dmyStamp = (stamp) => (stamp ? new Date(stamp).toLocaleDateString("en-GB") : DASH);
// The form shows a saved season; empty optional values come back as null.
const toForm = (season) => Object.fromEntries(FORM_KEYS.map((key) => [key, season[key] ?? ""]));
// Optional text that was cleared goes to the server as null.
const toBody = (values) => Object.fromEntries(FORM_KEYS.map((key) => [key, String(values[key] ?? "").trim() === "" ? null : String(values[key]).trim()]));
const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

// The six fields shared by the Season Details form and the Add Season popup.
function SeasonFields({ register, errors, options }) {
  const rule = (field) => ({ required: field.required ? `${field.label} is required` : false });
  const selectOptions = { seasonType: options?.seasonTypes ?? [], status: options?.statuses ?? [] };
  return seasonData.seasonDetails.fields.map((field) => (
    <div key={field.name} className='min-w-0'>
      <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>
        {field.label}
        {field.required && <span className='ml-1 text-red-500'>*</span>}
      </label>

      {(field.type === "text" || field.type === "date") && (
        <input type={field.type} placeholder={field.placeholder} {...register(field.name, rule(field))} className={inputClass} />
      )}

      {field.type === "select" && (
        <Select {...register(field.name, rule(field))} className={inputClass}>
          <option value=''>{field.placeholder}</option>
          {(selectOptions[field.name] ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}

      {errors[field.name] && <p className='mt-1 text-[10px] text-red-500'>{errors[field.name].message}</p>}
    </div>
  ));
}

// Description and Remarks, shared the same way.
function TextAreas({ register }) {
  const { description, remarks } = seasonData.seasonDetails;
  return [description, remarks].map((area) => (
    <div key={area.name} className='mt-4'>
      <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>{area.label}</label>
      <textarea rows={3} maxLength={area.maxLength} placeholder={area.placeholder} {...register(area.name)} className={textareaClass} />
    </div>
  ));
}

const Season = () => {
  const [isSeasonModalOpen, setIsSeasonModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null); // the season shown in the Season Details form
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const detailsRef = useRef(null);
  const searchText = useDebounced(search);

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

  // Modal form
  const {
    register: registerSeason,
    handleSubmit: handleSeasonSubmit,
    reset: resetSeason,
    setError: setSeasonError,
    formState: { errors: seasonErrors, isSubmitting: seasonSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  // =========================================================
  // DATA
  // =========================================================
  const options = useApi(() => api.get("/seasons/filter-options"), []);
  const list = useApi(
    () => api.get("/seasons", { search: searchText, ...filters, page, perPage: PER_PAGE }),
    [searchText, filters.seasonType, filters.status, filters.year, page],
  );
  const summary = useApi(() => api.get("/seasons/summary"), []);
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  const refresh = () => {
    list.reload();
    summary.reload();
    options.reload();
  };

  const setFilter = (name) => (event) => {
    setFilters((current) => ({ ...current, [name]: event.target.value }));
    setPage(1);
  };
  const hasFilters = Object.values(filters).some(Boolean);

  // Server errors go to the field they belong to; anything else is a message.
  const showErrors = (error, setFieldError) => {
    const fields = error.fields ?? {};
    let unplaced = false;
    for (const [key, message] of Object.entries(fields)) {
      if (FORM_KEYS.includes(key)) setFieldError(key, { message });
      else unplaced = true;
    }
    if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
  };

  // =========================================================
  // FORM SUBMIT
  // =========================================================
  // Season Details: saves the selected season, or adds a new one when none is selected.
  const onSubmit = async (values) => {
    try {
      const body = toBody(values);
      const result = selected ? await api.put(`/seasons/${selected.id}`, body) : await api.post("/seasons", body);
      notifySaved(result, selected ? "Season updated successfully!" : "Season saved successfully!");
      reset(EMPTY_FORM);
      setSelected(null);
      refresh();
    } catch (error) {
      showErrors(error, setError);
    }
  };

  const onAddSubmit = async (values) => {
    try {
      const result = await api.post("/seasons", toBody(values));
      notifySaved(result, "Season saved successfully!");
      resetSeason(EMPTY_FORM);
      setIsSeasonModalOpen(false);
      setPage(1);
      refresh();
    } catch (error) {
      showErrors(error, setSeasonError);
    }
  };

  const startEdit = (season) => {
    setSelected(season);
    reset(toForm(season));
    detailsRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  };
  const clearForm = () => {
    setSelected(null);
    reset(EMPTY_FORM);
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      const result = await api.del(`/seasons/${deleting.id}`);
      notifySaved(result, "Season deleted successfully!");
      if (selected?.id === deleting.id) clearForm();
      setDeleting(null);
      refresh();
    } catch (error) {
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  // Season Overview: the card titles come from the page, the numbers from the summary.
  const figures = summary.data ?? {};
  const cardValue = {
    "total-seasons": figures.totalSeasons ?? 0,
    "active-seasons": figures.activeSeasons ?? 0,
    "completed-seasons": figures.completedSeasons ?? 0,
    "current-season-duration": figures.currentSeasonDuration ?? 0,
    "total-production": Number(figures.totalProduction ?? 0).toFixed(2),
    "total-sales": `৳${Number(figures.totalSales ?? 0).toLocaleString("en-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  };

  const pendingNote = selected?.pendingRequest ? `Waiting for approval (${selected.pendingRequest.requestNo})` : null;

  return (
    <div className='space-y-4'>
      {/* =========================================================
          MASTER DATA TABS
      ========================================================= */}
      <MasterDataTabs />

      {/* =========================================================
          SEASON PAGE
      ========================================================= */}
      <div className='space-y-4'>
        {/* =======================================================
            SEASON LIST
        ======================================================= */}
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            {/* Title */}
            <h2 className='text-sm font-bold text-emerald-700'>
              {seasonData.seasonList.title}
            </h2>

            {/* Header Actions */}
            <div className='flex flex-col gap-2 sm:flex-row'>
              {/* Search */}
              <input
                type='text'
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder={seasonData.seasonList.search.placeholder}
                className='h-9 w-full rounded-md border border-slate-200 px-3 text-xs outline-none focus:border-emerald-500 sm:w-44'
              />

              {/* Filter */}
              <button
                type='button'
                onClick={() => setShowFilters((open) => !open)}
                aria-expanded={showFilters}
                className={`h-9 cursor-pointer w-full rounded-md border border-emerald-200 px-4 text-xs font-medium text-emerald-700 hover:bg-emerald-50 sm:w-20 ${hasFilters || showFilters ? "bg-emerald-50" : ""}`}
              >
                {seasonData.seasonList.filter.label}
              </button>

              {/* Add New Season */}
              <button
                type='button'
                onClick={() => setIsSeasonModalOpen(true)}
                className='h-9 cursor-pointer  rounded-md bg-emerald-700 px-2 text-xs font-medium text-white hover:bg-emerald-800 sm:w-32'
              >
                + {seasonData.seasonList.addButton.label}
              </button>
            </div>
          </div>

          {/* =====================================================
              FILTERS PANEL
          ===================================================== */}
          {showFilters && (
            <div className='mb-4 grid grid-cols-1 items-end gap-3 rounded-md border border-slate-100 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-4'>
              <div className='min-w-0'>
                <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>Season Type</label>
                <Select value={filters.seasonType} onChange={setFilter("seasonType")} className={inputClass}>
                  <option value=''>All</option>
                  {(options.data?.seasonTypes ?? []).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Select>
              </div>
              <div className='min-w-0'>
                <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>Status</label>
                <Select value={filters.status} onChange={setFilter("status")} className={inputClass}>
                  <option value=''>All</option>
                  {(options.data?.statuses ?? []).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Select>
              </div>
              <div className='min-w-0'>
                <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>Year</label>
                <Select value={filters.year} onChange={setFilter("year")} className={inputClass}>
                  <option value=''>All</option>
                  {(options.data?.years ?? []).map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Select>
              </div>
              <button
                type='button'
                disabled={!hasFilters}
                onClick={() => {
                  setFilters(EMPTY_FILTERS);
                  setPage(1);
                }}
                className='h-9 cursor-pointer rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* =========================================================
              TABLE
          ========================================================= */}

          <div className='overflow-x-auto'>
            <table className='w-full min-w-[1000px] border-collapse'>
              {/* =====================================================
                  TABLE HEADER
              ===================================================== */}
              <thead>
                <tr className='bg-slate-50'>
                  {seasonData.seasonList.tableHeaders.map((header) => (
                    <th
                      key={header.key}
                      className='px-3 py-3 text-left text-[11px] font-semibold text-slate-600'
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* =====================================================
                  TABLE BODY
              ===================================================== */}
              <tbody>
                {list.loading && !list.data ? (
                  <TableSkeleton rows={5} columns={seasonData.seasonList.tableHeaders.length} />
                ) : list.error ? (
                  <tr>
                    <td colSpan={seasonData.seasonList.tableHeaders.length} className='p-4'>
                      <ErrorState message={list.error.message} onRetry={list.reload} />
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <EmptyRow columns={seasonData.seasonList.tableHeaders.length} message='No seasons found' />
                ) : (
                  rows.map((season, index) => (
                    <tr
                      key={season.id}
                      className='border-b border-slate-100 hover:bg-slate-50'
                    >
                      {/* SL */}
                      <td className='px-3 py-3 text-[11px] text-slate-700'>
                        {(page - 1) * PER_PAGE + index + 1}
                      </td>

                      {/* Season Name */}
                      <td className='px-3 py-3 text-[11px] font-medium text-slate-700'>
                        <div className='flex items-center gap-2'>
                          <span>{season.seasonName}</span>

                          {/* Current Badge */}
                          {season.current && (
                            <span className='rounded bg-green-50 px-2 py-0.5 text-[9px] font-semibold text-green-600'>
                              Current
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Season Code */}
                      <td className='px-3 py-3 text-[11px] text-slate-600'>
                        {season.seasonCode}
                      </td>

                      {/* Start Date */}
                      <td className='px-3 py-3 text-[11px] text-slate-600'>
                        {dmy(season.startDate)}
                      </td>

                      {/* End Date */}
                      <td className='px-3 py-3 text-[11px] text-slate-600'>
                        {dmy(season.endDate)}
                      </td>

                      {/* Type */}
                      <td className='px-3 py-3 text-[11px] text-slate-600'>
                        {season.seasonTypeLabel}
                      </td>

                      {/* Status */}
                      <td className='px-3 py-3'>
                        <PendingBadge row={season} />
                        <span
                          className={`rounded px-2 py-1 text-[9px] font-semibold ${STATUS_CLASS[season.status] ?? STATUS_CLASS.inactive}`}
                        >
                          {season.statusLabel}
                        </span>
                      </td>

                      {/* Created By */}
                      <td className='px-3 py-3 text-[11px] text-slate-600'>
                        {season.createdByName ?? DASH}
                      </td>

                      {/* Created On */}
                      <td className='px-3 py-3 text-[11px] text-slate-600'>
                        {dmyStamp(season.createdAt)}
                      </td>

                      {/* Action */}
                      <td className='px-3 py-3'>
                        <div className='flex items-center gap-2'>
                          {/* Edit */}
                          <button
                            type='button'
                            title={waitingTitle(season, seasonData.seasonList.actions.edit.label)}
                            disabled={Boolean(season.pendingRequest)}
                            onClick={() => startEdit(season)}
                            className='flex cursor-pointer h-7 w-7 items-center justify-center rounded border border-emerald-200 text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                          >
                            ✎
                          </button>

                          {/* Delete */}
                          <button
                            type='button'
                            title={waitingTitle(season, seasonData.seasonList.actions.delete.label)}
                            disabled={Boolean(season.pendingRequest)}
                            onClick={() => setDeleting(season)}
                            className='flex cursor-pointer h-7 w-7 items-center justify-center rounded border border-red-200 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* =========================================================
              PAGINATION
          ========================================================= */}

          <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            {/* Showing Info */}
            <p className='text-xs text-slate-500'>
              Showing {from} to {to} of {total} entries
            </p>

            {/* Pagination Controls */}
            <div className='flex items-center gap-2'>
              {/* Previous */}
              <button
                type='button'
                aria-label='Previous page'
                disabled={page <= 1}
                onClick={() => setPage((current) => current - 1)}
                className='flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-slate-200 text-xs text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
              >
                ‹
              </button>

              {/* Current Page */}
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded bg-emerald-700 text-xs font-semibold text-white'
              >
                {page}
              </button>

              {/* Next */}
              <button
                type='button'
                aria-label='Next page'
                disabled={page >= totalPages}
                onClick={() => setPage((current) => current + 1)}
                className='flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-slate-200 text-xs text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
              >
                ›
              </button>

              {/* Per Page */}
              <button
                type='button'
                className='flex h-8 items-center justify-center rounded border border-slate-200 px-3 text-xs text-slate-600'
              >
                {PER_PAGE} / page
              </button>
            </div>
          </div>
        </div>

        {/* =======================================================
            DETAILS + OVERVIEW
        ======================================================= */}
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-7'>
          {/* =====================================================
              SEASON DETAILS
          ===================================================== */}
          <form
            ref={detailsRef}
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-4'
          >
            {/* =================================================
                    HEADER
                ================================================= */}
            <div className='mb-5 flex items-center justify-between'>
              <h2 className='text-sm font-bold text-emerald-700'>
                {seasonData.seasonDetails.title}
              </h2>

              <button
                type='button'
                onClick={() => (selected ? reset(toForm(selected)) : reset(EMPTY_FORM))}
                className='flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50'
              >
                {seasonData.seasonDetails.resetButton.label}
              </button>
            </div>

            {pendingNote && (
              <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-[11px] text-amber-700'>
                {pendingNote}. This season cannot be saved until the request is decided.
              </p>
            )}

            {/* =================================================
                    FORM FIELDS
                ================================================= */}
            <div className='grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-3'>
              <SeasonFields register={register} errors={errors} options={options.data} />
            </div>

            {/* =================================================
                    DESCRIPTION + REMARKS
                ================================================= */}
            <TextAreas register={register} />

            {/* =================================================
                    FOOTER
                ================================================= */}
            <div className='mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              {/* Created Information */}
              <div className='text-[9px] leading-5 text-slate-500'>
                Created On :{" "}
                <span className='font-medium text-slate-700'>
                  {selected ? dmyStamp(selected.createdAt) : DASH}
                </span>
                <span className='mx-2 text-slate-300'>|</span>
                Created By :{" "}
                <span className='font-medium text-slate-700'>
                  {selected?.createdByName ?? DASH}
                </span>
              </div>

              {/* Buttons */}
              <div className='flex w-full gap-2 sm:w-auto'>
                {/* Cancel */}
                <button
                  type='button'
                  onClick={clearForm}
                  className='flex-1 cursor-pointer rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 sm:flex-none'
                >
                  {seasonData.seasonDetails.footer.cancelButton.label}
                </button>

                {/* Submit */}
                <button
                  type='submit'
                  disabled={isSubmitting || Boolean(selected?.pendingRequest)}
                  className='flex-1 cursor-pointer rounded-md bg-emerald-700 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none'
                >
                  {isSubmitting ? "Saving..." : seasonData.seasonDetails.footer.submitButton.label}
                </button>
              </div>
            </div>
          </form>

          {/* add session modal */}
          {isSeasonModalOpen && (
            <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6'>
              <form
                onSubmit={handleSeasonSubmit(onAddSubmit)}
                className='w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl'
              >
                {/* =====================================================
          MODAL HEADER
      ====================================================== */}
                <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
                  <div>
                    <h2 className='text-sm font-bold text-emerald-700'>
                      Add Season
                    </h2>

                    <p className='mt-1 text-[10px] text-slate-500'>
                      Create a new season
                    </p>
                  </div>

                  <button
                    type='button'
                    onClick={() => {
                      resetSeason(EMPTY_FORM);
                      setIsSeasonModalOpen(false);
                    }}
                    className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100'
                  >
                    ✕
                  </button>
                </div>

                {/* =====================================================
          MODAL BODY
      ====================================================== */}
                <div className='max-h-[70vh] overflow-y-auto p-5'>
                  <div className='grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2'>
                    <SeasonFields register={registerSeason} errors={seasonErrors} options={options.data} />
                  </div>

                  <TextAreas register={registerSeason} />
                </div>

                {/* =====================================================
          MODAL FOOTER
      ====================================================== */}
                <div className='flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end'>
                  <button
                    type='button'
                    onClick={() => {
                      resetSeason(EMPTY_FORM);
                      setIsSeasonModalOpen(false);
                    }}
                    className='w-full cursor-pointer rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 sm:w-auto'
                  >
                    Cancel
                  </button>

                  <button
                    type='submit'
                    disabled={seasonSubmitting}
                    className='w-full cursor-pointer rounded-md bg-emerald-700 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                  >
                    {seasonSubmitting ? "Saving..." : "Save Season"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =====================================================
              SEASON OVERVIEW
          ===================================================== */}
          <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-3'>
            {/* Header */}
            <div className='mb-5'>
              <h2 className='text-sm font-bold text-emerald-700'>
                {seasonData.seasonOverview.title}
              </h2>
            </div>

            {summary.error && <ErrorState message={summary.error.message} onRetry={summary.reload} />}

            {/* =========================================================
                    OVERVIEW CARDS
                ========================================================= */}
            {!summary.error && (
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                {seasonData.seasonOverview.cards.map((card) => {
                  const Icon = iconMap[card.icon] || Info;

                  return (
                    <div
                      key={card.id}
                      className='min-h-[95px] rounded-lg border border-slate-100 bg-white p-3'
                    >
                      <div className='flex items-center gap-3'>
                        {/* =================================================
                                ICON
                            ================================================= */}
                        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50'>
                          <Icon className='h-5 w-5 text-emerald-600' />
                        </div>

                        {/* =================================================
                                CARD CONTENT
                            ================================================= */}
                        <div className='min-w-0 flex-1'>
                          <p className='mb-2 text-[10px] font-medium text-slate-500'>
                            {card.title}
                          </p>

                          <div className='flex items-baseline gap-1'>
                            <p className='text-lg font-bold text-slate-800'>
                              {summary.data ? cardValue[card.id] : DASH}
                            </p>

                            {card.unit && (
                              <span className='text-[9px] text-slate-500'>
                                {card.unit}
                              </span>
                            )}
                          </div>

                          <p className='mt-1 text-[9px] text-slate-500'>
                            {card.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* =========================================================
                    BOTTOM NOTICE
                ========================================================= */}
            <div className='mt-4 rounded-lg bg-slate-50 p-3'>
              <div className='flex items-start gap-2'>
                {/* Notice Icon */}
                <div className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white'>
                  <Info className='h-3 w-3 text-emerald-600' />
                </div>

                {/* Notice Message */}
                <p className='text-[10px] leading-5 text-slate-600'>
                  {seasonData.seasonOverview.notice.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.seasonName ?? "season"}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default Season;
