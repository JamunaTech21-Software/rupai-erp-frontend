import React, { useEffect, useState } from "react";
import { useForm } from "../../lib/useForm";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Download,
  Eye,
  FileUp,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import MasterDataTabs from "./MasterDataTabs";
import { auctionScheduleData } from "../../data/MasterData/auctionSheduleData";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";

const EMPTY_FORM = {
  seasonId: "",
  auctionCenterId: "",
  yearId: "",
  saleDate: "",
  buyerPromptDate: "",
  catalogueClosingDate: "",
  comments: "",
  status: "SCHEDULED",
};
// The page names for the pickers; the server calls them season, auctionCenter and year.
const TO_PAGE = { season: "seasonId", auctionCenter: "auctionCenterId", year: "yearId" };
const iso = (value) => (value ? String(value).slice(0, 10) : "");
// The auction year a date falls in (April to March), as the server works it out.
const auctionYear = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  const start = date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
  return `${start}-${start + 1}`;
};

const AuctionSchedule = () => {
  // =========================================================
  // DATA
  // =========================================================

  const { pageMeta, table, information, permissions } = auctionScheduleData;

  // =========================================================
  // STATES
  // =========================================================

  const [selectedFilters, setSelectedFilters] = useState({ seasonId: "all", auctionCenterId: "all", yearId: "", status: "all" });
  const [yearSet, setYearSet] = useState(false);
  const [currentPage, setCurrentPage] = useState(table.pagination.defaultPage);
  const [perPage, setPerPage] = useState(table.pagination.defaultPerPage);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [viewingSchedule, setViewingSchedule] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);

  // =========================================================
  // API DATA
  // =========================================================

  const options = useApi(() => api.get("/auction-schedules/filter-options"), []);
  const seasons = useApi(() => api.get("/options/seasons"), []);
  const centers = useApi(() => api.get("/options/auction-centers"), []);

  // The Year filter starts on the current auction year once the server has said which it is.
  useEffect(() => {
    if (!yearSet && options.data) {
      setYearSet(true);
      setSelectedFilters((prev) => ({ ...prev, yearId: options.data.currentYear ?? "all" }));
    }
  }, [yearSet, options.data]);

  const filterParams = {
    season: selectedFilters.seasonId === "all" ? "" : selectedFilters.seasonId,
    auctionCenter: selectedFilters.auctionCenterId === "all" ? "" : selectedFilters.auctionCenterId,
    year: selectedFilters.yearId === "all" ? "" : selectedFilters.yearId,
    status: selectedFilters.status === "all" ? "" : selectedFilters.status,
  };
  const list = useApi(
    () => api.get("/auction-schedules", { ...filterParams, page: currentPage, perPage }),
    [filterParams.season, filterParams.auctionCenter, filterParams.year, filterParams.status, currentPage, perPage],
  );
  const paginatedSchedules = list.data?.data ?? [];
  const totalEntries = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + paginatedSchedules.length;
  const yearList = options.data?.years ?? [];
  const statusList = options.data?.statuses ?? [];

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && paginatedSchedules.length === 0 && currentPage > 1) setCurrentPage(currentPage - 1);
  }, [list.loading, list.data, paginatedSchedules.length, currentPage]);

  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  const saleDate = watch("saleDate");
  const formYear = watch("yearId");

  // Picking a Sale Date fills the Year when none is chosen yet.
  useEffect(() => {
    if (isFormModalOpen && saleDate && !getValues("yearId")) setValue("yearId", auctionYear(saleDate));
  }, [isFormModalOpen, saleDate, getValues, setValue]);

  // The Year list holds the years of the saved sales, plus the one in the form.
  const yearChoices = [...yearList.map((item) => item.value), ...(formYear && !yearList.some((item) => item.value === formYear) ? [formYear] : [])];

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(`${iso(dateString)}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // =========================================================
  // SALE DAY
  // =========================================================

  const getSaleDay = (dateString) => {
    if (!dateString) return "Auto calculated";

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
      return "Auto calculated";
    }

    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);
  };

  // =========================================================
  // FILTER CHANGE
  // =========================================================

  const handleFilterChange = (field, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [field]: value,
    }));

    setCurrentPage(1);
  };

  // =========================================================
  // ADD / EDIT / CLOSE
  // =========================================================

  const handleOpenAddModal = () => {
    setEditingSchedule(null);

    reset({
      ...EMPTY_FORM,
      seasonId: selectedFilters.seasonId === "all" ? "" : selectedFilters.seasonId,
      auctionCenterId: selectedFilters.auctionCenterId === "all" ? "" : selectedFilters.auctionCenterId,
      yearId: selectedFilters.yearId === "all" ? "" : selectedFilters.yearId,
    });

    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (schedule) => {
    setEditingSchedule(schedule);

    reset({
      seasonId: schedule.season || "",
      auctionCenterId: schedule.auctionCenter || "",
      yearId: schedule.year || "",
      saleDate: iso(schedule.saleDate),
      buyerPromptDate: iso(schedule.buyerPromptDate),
      catalogueClosingDate: iso(schedule.catalogueClosingDate),
      comments: schedule.comments || "",
      status: schedule.status || "SCHEDULED",
    });

    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingSchedule(null);
    reset(EMPTY_FORM);
  };

  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const onSubmit = async (values) => {
    const body = {
      season: values.seasonId,
      auctionCenter: values.auctionCenterId,
      year: values.yearId,
      saleDate: values.saleDate,
      buyerPromptDate: values.buyerPromptDate,
      catalogueClosingDate: values.catalogueClosingDate,
      comments: values.comments.trim() === "" ? null : values.comments.trim(),
      status: values.status,
    };
    try {
      const result = editingSchedule
        ? await api.put(`/auction-schedules/${editingSchedule.id}`, body)
        : await api.post("/auction-schedules", body);
      notifySaved(result, editingSchedule ? "Auction schedule updated successfully!" : "Auction schedule saved successfully!");
      handleCloseFormModal();
      list.reload();
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      for (const [key, message] of Object.entries(fields)) {
        const name = TO_PAGE[key] ?? key;
        if (name in EMPTY_FORM) setError(name, { message });
        else unplaced = true;
      }
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  // =========================================================
  // VIEW
  // =========================================================

  const handleView = (schedule) => {
    setViewingSchedule(schedule);
    setIsViewModalOpen(true);
  };

  // =========================================================
  // DELETE
  // =========================================================

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      const result = await api.del(`/auction-schedules/${deleting.id}`);
      notifySaved(result, "Auction schedule deleted successfully!");
      setDeleting(null);
      list.reload();
    } catch (error) {
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  // =========================================================
  // EXPORT
  // =========================================================

  // The export needs the token, so it is fetched and saved as a file here.
  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/auction-schedules/export", { ...filterParams, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `auction-schedule-${new Date().toISOString().slice(0, 10)}.xlsx`;
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

  // =========================================================
  // PAGINATION
  // =========================================================

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setCurrentPage(1);
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusClass = (statusCode) => {
    switch (statusCode) {
      case "SCHEDULED":
        return "bg-blue-50 text-blue-600";

      case "HOLIDAY":
        return "bg-orange-50 text-orange-500";

      case "COMPLETED":
        return "bg-emerald-50 text-emerald-600";

      case "CANCELLED":
        return "bg-red-50 text-red-600";

      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className='w-full'>
      {/* =====================================================
          MASTER DATA TABS
      ====================================================== */}

      <MasterDataTabs />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className='mt-4 rounded-xl  bg-white p-4 shadow-sm sm:p-5 lg:p-6'>
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
          {/* TITLE */}

          <div>
            <h1 className='text-base font-bold text-emerald-700 sm:text-lg'>
              {pageMeta.title}
            </h1>

            <p className='mt-1 text-xs text-slate-500'>
              {pageMeta.description}
            </p>
          </div>

          {/* ACTION BUTTONS */}

          <div className='flex flex-wrap gap-2'>
            {/* IMPORT */}

            {permissions.canImport && (
              <button
                type='button'
                disabled
                title='Import from Excel is not available yet'
                className='inline-flex h-9 cursor-not-allowed items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 opacity-50'
              >
                <FileUp className='h-4 w-4' />

                <span>Import from Excel</span>
              </button>
            )}

            {/* EXPORT */}

            {permissions.canExport && (
              <button
                type='button'
                onClick={handleExport}
                disabled={exporting}
                className='inline-flex cursor-pointer h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60'
              >
                <Download className='h-4 w-4' />

                <span>{exporting ? "Exporting..." : "Export"}</span>
              </button>
            )}

            {/* ADD */}

            {permissions.canCreate && (
              <button
                type='button'
                onClick={handleOpenAddModal}
                className='inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800'
              >
                <Plus className='h-4 w-4' />

                <span>Add New Schedule</span>
              </button>
            )}
          </div>
        </div>

        {/* ===================================================
            FILTER SECTION
        ==================================================== */}

        <div className='mt-5 grid grid-cols-1 gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2 lg:grid-cols-4'>
          {/* SEASON */}

          <div>
            <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
              Season
            </label>

            <div className='relative'>
              <Select
                value={selectedFilters.seasonId}
                onChange={(e) => handleFilterChange("seasonId", e.target.value)}
                className='h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-9 text-sm text-slate-700 outline-none focus:border-emerald-600'
              >
                <option value='all'>All Seasons</option>
                {(seasons.data ?? []).map((season) => (
                  <option key={season.value} value={season.value}>
                    {season.label}
                  </option>
                ))}
              </Select>

              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
            </div>
          </div>

          {/* AUCTION CENTER */}

          <div>
            <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
              Auction Center
            </label>

            <div className='relative'>
              <Select
                value={selectedFilters.auctionCenterId}
                onChange={(e) =>
                  handleFilterChange("auctionCenterId", e.target.value)
                }
                className='h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-9 text-sm text-slate-700 outline-none focus:border-emerald-600'
              >
                <option value='all'>All Auction Centers</option>
                {(centers.data ?? []).map((center) => (
                  <option key={center.value} value={center.value}>
                    {center.label}
                  </option>
                ))}
              </Select>

              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
            </div>
          </div>

          {/* YEAR */}

          <div>
            <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
              Year
            </label>

            <div className='relative'>
              <Select
                value={selectedFilters.yearId}
                onChange={(e) => handleFilterChange("yearId", e.target.value)}
                className='h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-9 text-sm text-slate-700 outline-none focus:border-emerald-600'
              >
                <option value='all'>All Years</option>
                {yearList.map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </Select>

              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
            </div>
          </div>

          {/* STATUS */}

          <div>
            <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
              Status
            </label>

            <div className='relative'>
              <Select
                value={selectedFilters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className='h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-9 text-sm text-slate-700 outline-none focus:border-emerald-600'
              >
                <option value='all'>All Status</option>
                {statusList.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </Select>

              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
            </div>
          </div>
        </div>

        {/* ===================================================
            TABLE
        ==================================================== */}

        <div className='mt-5 overflow-hidden rounded-lg border border-slate-200'>
          <div className='overflow-x-auto'>
            <table className='min-w-[1100px] w-full'>
              {/* TABLE HEADER */}

              <thead>
                <tr className='bg-slate-50'>
                  {table.columns.map((column) => (
                    <th
                      key={column.key}
                      className='whitespace-nowrap px-4 py-3 text-left text-[12px] font-bold text-slate-700'
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* TABLE BODY */}

              <tbody>
                {list.loading && !list.data ? (
                  <TableSkeleton rows={5} columns={table.columns.length} />
                ) : list.error ? (
                  <tr>
                    <td colSpan={table.columns.length} className='p-4'>
                      <ErrorState message={list.error.message} onRetry={list.reload} />
                    </td>
                  </tr>
                ) : paginatedSchedules.length > 0 ? (
                  paginatedSchedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className='border-t border-slate-100 hover:bg-slate-50/50'
                    >
                      {/* SALE NO */}

                      <td className='px-4 py-3 text-xs font-semibold text-slate-700'>
                        {schedule.saleNo}
                      </td>

                      {/* SALE DATE */}

                      <td className='whitespace-nowrap px-4 py-3 text-xs text-slate-700'>
                        {formatDate(schedule.saleDate)}
                      </td>

                      {/* SALE DAY */}

                      <td className='px-4 py-3 text-xs text-slate-700'>
                        {schedule.saleDay}
                      </td>

                      {/* BUYER PROMPT DATE */}

                      <td className='whitespace-nowrap px-4 py-3 text-xs text-slate-700'>
                        {formatDate(schedule.buyerPromptDate)}
                      </td>

                      {/* CATALOGUE CLOSING DATE */}

                      <td className='whitespace-nowrap px-4 py-3 text-xs text-slate-700'>
                        {formatDate(schedule.catalogueClosingDate)}
                      </td>

                      {/* COMMENTS */}

                      <td className='max-w-[180px] px-4 py-3 text-xs text-slate-600'>
                        <span className='block truncate'>
                          {schedule.comments || "—"}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td className='px-4 py-3'>
                        <PendingBadge row={schedule} />
                        <span
                          className={`inline-flex rounded-md px-2.5 py-1 text-[11px] font-semibold ${getStatusClass(
                            schedule.status,
                          )}`}
                        >
                          {schedule.statusLabel}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-2'>
                          {/* VIEW */}

                          {permissions.canView && (
                            <button
                              type='button'
                              title='View'
                              onClick={() => handleView(schedule)}
                              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            >
                              <Eye className='h-4 w-4' />
                            </button>
                          )}

                          {/* EDIT */}

                          {permissions.canEdit && (
                            <button
                              type='button'
                              title={waitingTitle(schedule, "Edit")}
                              disabled={Boolean(schedule.pendingRequest)}
                              onClick={() => handleOpenEditModal(schedule)}
                              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                            >
                              <Pencil className='h-4 w-4' />
                            </button>
                          )}

                          {/* DELETE */}

                          {permissions.canDelete && (
                            <button
                              type='button'
                              title={waitingTitle(schedule, "Delete")}
                              disabled={Boolean(schedule.pendingRequest)}
                              onClick={() => setDeleting(schedule)}
                              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-200 bg-white text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                            >
                              <Trash2 className='h-4 w-4' />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={table.columns.length}
                      className='px-4 py-12 text-center text-sm text-slate-500'
                    >
                      No auction schedule found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <div className='mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          {/* SHOWING */}

          <p className='text-xs text-slate-500'>
            Showing{" "}
            <span className='font-semibold text-slate-700'>
              {totalEntries === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to <span className='font-semibold text-slate-700'>{endIndex}</span>{" "}
            of{" "}
            <span className='font-semibold text-slate-700'>{totalEntries}</span>{" "}
            entries
          </p>

          {/* PAGINATION */}

          <div className='flex flex-wrap items-center gap-2'>
            <button
              type='button'
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 disabled:opacity-40'
            >
              <ArrowLeft className='h-3.5 w-3.5' />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(
                Math.max(0, currentPage - 2),
                Math.min(totalPages, currentPage + 1),
              )
              .map((page) => (
                <button
                  key={page}
                  type='button'
                  onClick={() => handlePageChange(page)}
                  className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold ${
                    currentPage === page
                      ? "bg-emerald-700 text-white"
                      : "border border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {page}
                </button>
              ))}

            <button
              type='button'
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 disabled:opacity-40'
            >
              <ArrowRight className='h-3.5 w-3.5' />
            </button>

            <div className='relative ml-1'>
              <Select
                value={perPage}
                onChange={(e) => handlePerPageChange(e.target.value)}
                className='h-8 appearance-none rounded-md border border-slate-200 bg-white px-3 pr-7 text-xs text-slate-600 outline-none'
              >
                {table.pagination.perPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} / page
                  </option>
                ))}
              </Select>

              <ChevronDown className='pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400' />
            </div>
          </div>
        </div>

        {/* ===================================================
            INFORMATION
        ==================================================== */}

        <div className='mt-4 grid grid-cols-1 gap-3 rounded-lg border border-emerald-100 bg-emerald-50/40 p-3 sm:grid-cols-2'>
          {/* BUYER PROMPT */}

          <div className='flex gap-2'>
            <div className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500 text-[11px] font-bold text-emerald-600'>
              i
            </div>

            <div>
              <p className='text-[12px] font-bold text-slate-700'>
                {information.buyerPromptDate.title}
              </p>

              <p className='mt-0.5 text-[11px] leading-4 text-slate-500'>
                {information.buyerPromptDate.description}
              </p>
            </div>
          </div>

          {/* CATALOGUE */}

          <div className='flex gap-2'>
            <div className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500 text-[11px] font-bold text-emerald-600'>
              i
            </div>

            <div>
              <p className='text-[12px] font-bold text-slate-700'>
                {information.catalogueClosingDate.title}
              </p>

              <p className='mt-0.5 text-[11px] leading-4 text-slate-500'>
                {information.catalogueClosingDate.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {isFormModalOpen && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6'>
          <div className='max-h-[95vh] w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl'>
            {/* MODAL HEADER */}

            <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
              <div>
                <h2 className='text-base font-bold text-emerald-700'>
                  {editingSchedule
                    ? "Edit Auction Schedule"
                    : "Add New Auction Schedule"}
                </h2>

                <p className='mt-1 text-xs text-slate-500'>
                  Auction schedule information
                </p>
              </div>

              <button
                type='button'
                onClick={handleCloseFormModal}
                className='inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='max-h-[calc(95vh-140px)] overflow-y-auto'
            >
              <div className='grid grid-cols-1 gap-5 p-5 md:grid-cols-2'>
                {/* SEASON */}

                <div>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Season
                    <span className='text-red-500'> *</span>
                  </label>

                  <Select
                    {...register("seasonId", {
                      required: "Season is required",
                    })}
                    className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600'
                  >
                    <option value=''>Select Season</option>

                    {(seasons.data ?? []).map((season) => (
                      <option key={season.value} value={season.value}>
                        {season.label}
                      </option>
                    ))}
                  </Select>

                  {errors.seasonId && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.seasonId.message}
                    </p>
                  )}
                </div>

                {/* AUCTION CENTER */}

                <div>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Auction Center
                    <span className='text-red-500'> *</span>
                  </label>

                  <Select
                    {...register("auctionCenterId", {
                      required: "Auction center is required",
                    })}
                    className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600'
                  >
                    <option value=''>Select Auction Center</option>

                    {(centers.data ?? []).map((center) => (
                      <option key={center.value} value={center.value}>
                        {center.label}
                      </option>
                    ))}
                  </Select>

                  {errors.auctionCenterId && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.auctionCenterId.message}
                    </p>
                  )}
                </div>

                {/* YEAR */}

                <div>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Year
                    <span className='text-red-500'> *</span>
                  </label>

                  <Select
                    {...register("yearId", {
                      required: "Year is required",
                    })}
                    className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600'
                  >
                    <option value=''>Select Year</option>

                    {yearChoices.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Select>

                  {errors.yearId && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.yearId.message}
                    </p>
                  )}
                </div>

                {/* STATUS */}

                <div>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Status
                    <span className='text-red-500'> *</span>
                  </label>

                  <Select
                    {...register("status", {
                      required: "Status is required",
                    })}
                    className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600'
                  >
                    {statusList.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Select>

                  {errors.status && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.status.message}
                    </p>
                  )}
                </div>

                {/* SALE DATE */}

                <div>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Sale Date
                    <span className='text-red-500'> *</span>
                  </label>

                  <input
                    type='date'
                    {...register("saleDate", {
                      required: "Sale date is required",
                    })}
                    className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600'
                  />

                  {errors.saleDate && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.saleDate.message}
                    </p>
                  )}
                </div>

                {/* SALE DAY */}

                <div>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Sale Day
                  </label>

                  <div className='flex h-10 items-center rounded-md border border-slate-300 bg-slate-50 px-3 text-sm text-slate-600'>
                    {getSaleDay(saleDate)}
                  </div>
                </div>

                {/* BUYER PROMPT DATE */}

                <div>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Buyer Prompt Date
                    <span className='text-red-500'> *</span>
                  </label>

                  <input
                    type='date'
                    {...register("buyerPromptDate", {
                      required: "Buyer prompt date is required",
                    })}
                    className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600'
                  />

                  {errors.buyerPromptDate && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.buyerPromptDate.message}
                    </p>
                  )}
                </div>

                {/* CATALOGUE CLOSING DATE */}

                <div>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Catalogue Closing Date
                    <span className='text-red-500'> *</span>
                  </label>

                  <input
                    type='date'
                    {...register("catalogueClosingDate", {
                      required: "Catalogue closing date is required",
                    })}
                    className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600'
                  />

                  {errors.catalogueClosingDate && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.catalogueClosingDate.message}
                    </p>
                  )}
                </div>

                {/* COMMENTS */}

                <div className='md:col-span-2'>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Comments
                  </label>

                  <textarea
                    {...register("comments")}
                    rows={3}
                    placeholder='Enter comments...'
                    className='w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600'
                  />
                </div>
              </div>

              {/* FORM FOOTER */}

              <div className='flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={handleCloseFormModal}
                  className='h-11 rounded-md border border-slate-300 bg-white px-7 text-sm font-semibold text-slate-700 hover:bg-slate-50'
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='h-11 rounded-md bg-emerald-700 px-7 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {isSubmitting ? "Saving..." : editingSchedule ? "Update Schedule" : "Save Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          VIEW MODAL
      ====================================================== */}

      {isViewModalOpen && viewingSchedule && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6'>
          <div className='w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl'>
            {/* HEADER */}

            <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
              <div>
                <h2 className='text-base font-bold text-emerald-700'>
                  Auction Schedule Details
                </h2>

                <p className='mt-1 text-xs text-slate-500'>
                  Sale No. {viewingSchedule.saleNo}
                </p>
              </div>

              <button
                type='button'
                onClick={() => setIsViewModalOpen(false)}
                className='inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            {/* DETAILS */}

            <div className='grid grid-cols-1 gap-4 p-5 sm:grid-cols-2'>
              <div>
                <p className='text-[12px] font-semibold text-slate-500'>
                  Season
                </p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>
                  {viewingSchedule.seasonName}
                </p>
              </div>

              <div>
                <p className='text-[12px] font-semibold text-slate-500'>
                  Auction Center
                </p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>
                  {viewingSchedule.auctionCenterName}
                </p>
              </div>

              <div>
                <p className='text-[12px] font-semibold text-slate-500'>Year</p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>
                  {viewingSchedule.year}
                </p>
              </div>

              <div>
                <p className='text-[12px] font-semibold text-slate-500'>
                  Sale Date
                </p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>
                  {formatDate(viewingSchedule.saleDate)}
                </p>
              </div>

              <div>
                <p className='text-[12px] font-semibold text-slate-500'>
                  Sale Day
                </p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>
                  {viewingSchedule.saleDay}
                </p>
              </div>

              <div>
                <p className='text-[12px] font-semibold text-slate-500'>
                  Buyer Prompt Date
                </p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>
                  {formatDate(viewingSchedule.buyerPromptDate)}
                </p>
              </div>

              <div>
                <p className='text-[12px] font-semibold text-slate-500'>
                  Catalogue Closing Date
                </p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>
                  {formatDate(viewingSchedule.catalogueClosingDate)}
                </p>
              </div>

              <div>
                <p className='text-[12px] font-semibold text-slate-500'>
                  Status
                </p>

                <span
                  className={`mt-1 inline-flex rounded-md px-2.5 py-1 text-[11px] font-semibold ${getStatusClass(
                    viewingSchedule.status,
                  )}`}
                >
                  {viewingSchedule.statusLabel}
                </span>
              </div>

              <div className='sm:col-span-2'>
                <p className='text-[12px] font-semibold text-slate-500'>
                  Comments
                </p>

                <p className='mt-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700'>
                  {viewingSchedule.comments || "No comments"}
                </p>
              </div>
            </div>

            {/* FOOTER */}

            <div className='flex justify-end border-t border-slate-200 bg-slate-50 px-5 py-4'>
              <button
                type='button'
                onClick={() => setIsViewModalOpen(false)}
                className='h-9 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete sale no. ${deleting?.saleNo ?? ""}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default AuctionSchedule;
