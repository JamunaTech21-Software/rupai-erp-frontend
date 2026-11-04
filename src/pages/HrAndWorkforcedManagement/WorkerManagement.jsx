import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { workerManagementData } from "../../data/HrWorkforceData/workerManagementData";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";

import {
  Plus,
  Upload,
  Building2,
  FileText,
  ClipboardCheck,
  FileSpreadsheet,
  IdCard,
  ArrowRightLeft,
  UserMinus,
  Download,
  MoreHorizontal,
  Users,
  UserCheck,
  CalendarDays,
  UserX,
  UserPlus,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

const summaryIconMap = {
  users: Users,
  "user-check": UserCheck,
  calendar: CalendarDays,
  "user-x": UserX,
  "user-plus": UserPlus,
};

const summaryColorMap = {
  green: {
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
  },

  orange: {
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },

  red: {
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },

  blue: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
};
const statusStyleMap = {
  Active: "bg-green-50 text-green-700",
  "On Leave": "bg-orange-50 text-orange-600",
  Inactive: "bg-red-50 text-red-600",
  Resigned: "bg-gray-100 text-gray-600",
};
const workerTypeIconMap = {
  regular: Users,
  casual: UserCheck,
  temporary: UserPlus,
};
const actionIconMap = {
  attendance: ClipboardCheck,
  wage: FileSpreadsheet,
  idCard: IdCard,
  transfer: ArrowRightLeft,
  resignation: UserMinus,
  more: MoreHorizontal,
};
const documentIconMap = {
  upload: Upload,
  bank: Building2,
  document: FileText,
};
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Select from "../../components/common/Select";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";

const PER_PAGE = 8;
const EMPTY_FILTERS = { search: "", gardenUnit: "", section: "", jobTask: "", workerType: "", workerStatus: "" };
const NO_ATTENDANCE = {
  title: "Attendance Overview (This Month)",
  present: { value: 0, percentage: 0 },
  absent: { value: 0, percentage: 0 },
  leave: { value: 0, percentage: 0 },
  buttonText: "View Attendance Report",
};
const orDash = (value) => (value === null || value === undefined || value === "" ? "-" : value);
const words = (value) => (typeof value === "string" && value ? value.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : value);
const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};
const WorkerManagement = () => {
  const navigate = useNavigate();
  const importInput = useRef(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const searchText = useDebounced(filters.search);
  const applied = { ...filters, search: searchText };
  const setFilter = (name) => (event) => {
    setFilters((current) => ({ ...current, [name]: event.target.value }));
    setPage(1);
  };
  const hasFilters = Object.values(filters).some(Boolean);
  const resetFilters = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const options = useApi(() => api.get("/workers/filter-options"), []);
  const list = useApi(
    () => api.get("/workers", { ...applied, page, perPage: PER_PAGE }),
    [searchText, filters.gardenUnit, filters.section, filters.jobTask, filters.workerType, filters.workerStatus, page],
  );
  const summaryData = useApi(
    () => api.get("/workers/summary", applied),
    [searchText, filters.gardenUnit, filters.section, filters.jobTask, filters.workerType, filters.workerStatus],
  );
  const rows = list.data?.data ?? [];
  const meta = list.data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;

  // The profile panel shows the clicked worker, or the first one in the list.
  const shownId = rows.some((row) => row.id === selectedId) ? selectedId : (rows[0]?.id ?? null);
  const profileData = useApi(() => (shownId ? api.get(`/workers/${shownId}`) : Promise.resolve(null)), [shownId]);
  const profile = profileData.data ?? {};
  const pf = {
    workerName: orDash(profile.workerName),
    workerId: orDash(profile.workerId),
    jobTaskLabel: orDash(profile.jobTaskLabel),
    sectionLabel: orDash(profile.sectionLabel),
    mobileNo: orDash(profile.mobileNo),
    personalEmail: orDash(profile.personalEmail),
    joinDate: orDash(profile.joinDate),
    fathersName: orDash(profile.fathersName),
    mothersName: orDash(profile.mothersName),
    dateOfBirth: orDash(profile.dateOfBirth),
    gender: orDash(words(profile.gender)),
    bloodGroup: orDash(profile.bloodGroup ? String(profile.bloodGroup).toUpperCase() : null),
    maritalStatus: orDash(words(profile.maritalStatus)),
    presentAddress: orDash(profile.presentAddress),
    permanentAddress: orDash(profile.permanentAddress),
    status: profile.workerStatusLabel ?? "-",
  };
  const documents = profile.documents ?? [];

  const summary = summaryData.data ?? {};
  const summaryCards = summary.summaryCards ?? [];
  const categoryWiseWorkers = summary.categoryWiseWorkers ?? [];
  const sectionWiseDistribution = summary.sectionWiseDistribution ?? [];
  const workerTypes = summary.workerTypes ?? [];
  const recentJoinees = summary.recentJoinees ?? [];
  const attendanceOverview = summary.attendanceOverview ?? NO_ATTENDANCE;

  // After a delete took the last row of a page, step back one page.
  useEffect(() => {
    if (meta && page > meta.totalPages && meta.totalPages >= 1) setPage(meta.totalPages);
  }, [meta, page]);

  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/workers/export", { ...applied, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `workers-${new Date().toISOString().slice(0, 10)}.xlsx`;
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

  // Same import as the Add New Worker page: nothing is saved unless every row is right.
  const importFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setImporting(true);
    try {
      const result = await api.postFile("/workers/import", file);
      notifySaved(result, `${result?.imported ?? ""} workers saved`.trim());
      list.reload();
      summaryData.reload();
    } catch (error) {
      const lines = Object.entries(error.fields ?? {})
        .slice(0, 3)
        .map(([key, message]) => {
          const match = key.match(/^rows\.(\d+)\.(.+)$/);
          return match ? `Row ${match[1]} - ${match[2]}: ${message}` : `${key}: ${message}`;
        });
      toast.error([error.message, ...lines].join("\n"));
    } finally {
      setImporting(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      const result = await api.del(`/workers/${deleting.id}`);
      notifySaved(result, "Worker deleted successfully!");
      setDeleting(null);
      list.reload();
      summaryData.reload();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteBusy(false);
    }
  };

  const optionList = (items) =>
    (items ?? [])
      .filter((item) => item.value !== "")
      .map((item) => (
        <option key={item.id ?? item.value} value={item.value}>
          {item.label}
        </option>
      ));

  return (
    <div className='space-y-4'>
      {/* =====================================================
          HR WORKFORCE TABS
      ====================================================== */}
      <HrWorkforceTabs />

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className='p-2'>
        <div className='flex justify-end'>
          <div className='grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto'>
            {/* ADD NEW WORKER */}
            <button
              type='button'
              onClick={() => navigate("/add-new-worker")}
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-green-700 px-3 text-sm font-medium text-white transition hover:bg-green-800 sm:px-4'
            >
              <Plus size={17} />
              Add New Worker
            </button>

            {/* IMPORT */}
            <input ref={importInput} type='file' accept='.csv,.xlsx,.xls' className='hidden' onChange={importFile} />
            <button
              type='button'
              disabled={importing}
              onClick={() => importInput.current?.click()}
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 sm:px-4'
            >
              <Upload size={16} />
              {importing ? "Importing..." : "Import"}
            </button>

            {/* EXPORT */}
            <button
              type='button'
              disabled={exporting}
              onClick={exportList}
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 sm:px-4'
            >
              <Download size={16} />
              {exporting ? "Exporting..." : "Export"}
            </button>

            {/* MORE */}
            <button
              type='button'
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:px-4'
            >
              <MoreHorizontal size={17} />
              More
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
              SUMMARY CARDS
          ====================================================== */}
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5'>
        {summaryCards.map((card) => {
          const Icon = summaryIconMap[card.icon] || Users;

          const colors = summaryColorMap[card.bgColor] || summaryColorMap.green;

          return (
            <div
              key={card.id}
              className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md'
            >
              <div className='flex items-center gap-3'>
                {/* ICON */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors.iconBg} ${colors.iconColor}`}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>

                {/* CONTENT */}
                <div className='min-w-0'>
                  <p className='truncate text-[11px] font-medium text-gray-500'>
                    {card.title}
                  </p>

                  <h3 className='mt-1 text-lg font-semibold leading-none text-gray-800'>
                    {card.value.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className='grid grid-cols-1 gap-2 xl:grid-cols-12'>
        {/* ===================================================
                WORKER LIST
            ==================================================== */}
        <div className='xl:col-span-8'>
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* =================================================
                    SECTION HEADER
                ================================================== */}
            <div className='mb-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Worker List
              </h2>
            </div>

            {/* =================================================
                    FILTER AREA
                ================================================== */}
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
              {/* =================================================
                      GARDEN / UNIT
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Garden / Unit
                </label>

                <Select value={filters.gardenUnit} onChange={setFilter("gardenUnit")} className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  <option value=''>All Gardens</option>
                  {optionList(options.data?.gardens)}
                </Select>
              </div>

              {/* =================================================
                      SECTION
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Section
                </label>

                <Select value={filters.section} onChange={setFilter("section")} className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  <option value=''>All Sections</option>
                  {optionList(options.data?.sections)}
                </Select>
              </div>

              {/* =================================================
                      CATEGORY
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Category
                </label>

                <Select value={filters.jobTask} onChange={setFilter("jobTask")} className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  <option value=''>All Categories</option>
                  {optionList(options.data?.categories)}
                </Select>
              </div>

              {/* =================================================
                      WORKER TYPE
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Worker Type
                </label>

                <Select value={filters.workerType} onChange={setFilter("workerType")} className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  <option value=''>All Types</option>
                  {optionList(options.data?.workerTypes)}
                </Select>
              </div>

              {/* =================================================
                      STATUS
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Status
                </label>

                <Select value={filters.workerStatus} onChange={setFilter("workerStatus")} className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  <option value=''>All Status</option>
                  {optionList(options.data?.statuses)}
                </Select>
              </div>

              {/* =================================================
                      SEARCH
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Search Worker
                </label>

                <div className='relative'>
                  <Search
                    size={14}
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400'
                  />

                  <input
                    type='text'
                    value={filters.search}
                    onChange={setFilter("search")}
                    placeholder={
                      workerManagementData.filters.search.placeholder
                    }
                    className='h-9 w-full rounded-lg border border-gray-300 pl-8 pr-2 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600'
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                    FILTER BUTTON
                ================================================== */}
            <div className='mt-3 flex justify-end'>
              <button
                type='button'
                title='Reset Filters'
                onClick={resetFilters}
                disabled={!hasFilters}
                className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-gray-500 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <SlidersHorizontal size={15} />
              </button>
            </div>

            {/* =================================================
                    WORKER TABLE
                ================================================== */}
            <div className='mt-3 overflow-x-auto rounded-lg border border-gray-200'>
              <table className='min-w-[950px] w-full'>
                {/* =================================================
                        TABLE HEADER
                    ================================================== */}
                <thead className='bg-gray-50'>
                  <tr className='border-b border-gray-200'>
                    {workerManagementData.tableHeaders.map((header) => (
                      <th
                        key={header.id}
                        className='whitespace-nowrap px-3 py-2.5 text-left text-[10px] font-semibold text-gray-600'
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* =================================================
                        TABLE BODY
                    ================================================== */}
                <tbody>
                  {list.loading && !list.data ? (
                    <TableSkeleton rows={5} columns={workerManagementData.tableHeaders.length} />
                  ) : list.error ? (
                    <tr>
                      <td colSpan={workerManagementData.tableHeaders.length} className='p-4'>
                        <ErrorState message={list.error.message} onRetry={list.reload} />
                      </td>
                    </tr>
                  ) : rows.length === 0 ? (
                    <EmptyRow columns={workerManagementData.tableHeaders.length} message='No workers found' />
                  ) : (
                    rows.map((worker, index) => (
                      <tr
                        key={worker.id}
                        onClick={() => setSelectedId(worker.id)}
                        className={`cursor-pointer border-b border-gray-100 transition hover:bg-gray-50 ${worker.id === shownId ? "bg-green-50/60" : ""}`}
                      >
                        <td className='px-3 py-2.5 text-[10px] text-gray-600'>{(page - 1) * PER_PAGE + index + 1}</td>
                        <td className='whitespace-nowrap px-3 py-2.5 text-[10px] font-medium text-gray-700'>{worker.workerId}</td>
                        <td className='px-3 py-2.5'>
                          <div className='flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100 text-[10px] font-semibold text-gray-500'>
                            {worker.workerPhotoUrl ? (
                              <img src={worker.workerPhotoUrl} alt={worker.workerName} className='h-full w-full object-cover' />
                            ) : (
                              (worker.workerName || "").charAt(0).toUpperCase()
                            )}
                          </div>
                        </td>
                        <td className='whitespace-nowrap px-3 py-2.5 text-[10px] font-medium text-gray-700'>{worker.workerName}</td>
                        <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>{orDash(worker.fathersName)}</td>
                        <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>{orDash(worker.jobTaskLabel)}</td>
                        <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>{orDash(worker.sectionLabel)}</td>
                        <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>{orDash(worker.mobileNo)}</td>
                        <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>{orDash(worker.joinDate)}</td>
                        <td className='px-3 py-2.5'>
                          <span
                            className={`whitespace-nowrap rounded-md px-2 py-1 text-[9px] font-medium ${
                              statusStyleMap[worker.workerStatusLabel] || "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {orDash(worker.workerStatusLabel)}
                          </span>
                        </td>
                        <td className='px-3 py-2.5' onClick={(event) => event.stopPropagation()}>
                          <PendingBadge row={worker} />
                          <div className='flex items-center gap-1'>
                            <button
                              type='button'
                              title='View Worker'
                              onClick={() => setSelectedId(worker.id)}
                              className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50'
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              type='button'
                              disabled={Boolean(worker.pendingRequest)}
                              title={waitingTitle(worker, "Edit")}
                              onClick={() => navigate(`/add-new-worker?id=${worker.id}`)}
                              className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40'
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type='button'
                              disabled={Boolean(worker.pendingRequest)}
                              title={waitingTitle(worker, "Delete")}
                              onClick={() => setDeleting(worker)}
                              className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                            >
                              <Trash2 size={14} />
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
                    PAGINATION
                ================================================== */}
            <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              {/* SHOWING INFO */}
              <p className='text-[11px] text-gray-500'>
                Showing{" "}
                <span className='font-medium text-gray-700'>{from}</span>{" "}
                to <span className='font-medium text-gray-700'>{to}</span> of{" "}
                <span className='font-medium text-gray-700'>{total.toLocaleString()}</span> entries
              </p>

              {/* PAGE BUTTONS */}
              <div className='flex items-center gap-1'>
                <button
                  type='button'
                  aria-label='Previous page'
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                  className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
                >
                  <ChevronLeft size={14} />
                </button>
                <span className='flex h-7 min-w-7 items-center justify-center rounded-md bg-green-700 px-2 text-xs font-medium text-white'>
                  {page} / {totalPages}
                </span>
                <button
                  type='button'
                  aria-label='Next page'
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
                WORKER PROFILE
            ==================================================== */}
        <div className='xl:col-span-4'>
          <div className='h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* =================================================
                    PROFILE HEADER
                ================================================== */}
            <div className='flex items-center justify-between'>
              <h2 className='text-sm font-semibold text-green-700'>
                Worker Profile
              </h2>

              {/* STATUS */}
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  pf.status === "Active"
                    ? "bg-green-50 text-green-700"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                <span className='h-1.5 w-1.5 rounded-full bg-current' />

                {pf.status}
              </span>
            </div>

            {/* =================================================
                    PROFILE BASIC INFORMATION
                ================================================== */}
            <div className='mt-4 flex gap-4 border-b border-gray-200 pb-4'>
              {/* PROFILE IMAGE */}
              <div className='h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100'>
                {profile.workerPhotoUrl ? (
                  <img src={profile.workerPhotoUrl} alt={pf.workerName} className='h-full w-full object-cover' />
                ) : (
                  <div className='flex h-full w-full items-center justify-center text-2xl font-semibold text-gray-400'>
                    {(profile.workerName || "").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* BASIC DETAILS */}
              <div className='min-w-0 flex-1'>
                {/* NAME */}
                <h3 className='truncate text-base font-semibold text-gray-800'>
                  {pf.workerName}
                </h3>

                {/* WORKER ID */}
                <p className='mt-0.5 text-[10px] font-medium text-gray-500'>
                  {pf.workerId}
                </p>

                {/* DESIGNATION */}
                <div className='mt-2 flex items-center gap-2'>
                  <BriefcaseBusiness
                    size={13}
                    className='shrink-0 text-green-700'
                  />

                  <span className='truncate text-[10px] text-gray-600'>
                    {pf.jobTaskLabel}
                  </span>
                </div>

                {/* SECTION */}
                <div className='mt-1.5 flex items-center gap-2'>
                  <MapPin size={13} className='shrink-0 text-green-700' />

                  <span className='truncate text-[10px] text-gray-600'>
                    {pf.sectionLabel}
                  </span>
                </div>

                {/* MOBILE */}
                <div className='mt-1.5 flex items-center gap-2'>
                  <Phone size={13} className='shrink-0 text-green-700' />

                  <span className='text-[10px] text-gray-600'>
                    {pf.mobileNo}
                  </span>
                </div>

                {/* EMAIL */}
                <div className='mt-1.5 flex items-center gap-2'>
                  <Mail size={13} className='shrink-0 text-green-700' />

                  <span className='truncate text-[10px] text-gray-600'>
                    {pf.personalEmail}
                  </span>
                </div>

                {/* JOIN DATE */}
                <div className='mt-1.5 flex items-center gap-2'>
                  <Calendar size={13} className='shrink-0 text-green-700' />

                  <span className='text-[10px] text-gray-600'>
                    {pf.joinDate}
                  </span>

                  <span className='text-[9px] text-gray-400'>Join Date</span>
                </div>
              </div>
            </div>

            {/* =================================================
                    PROFILE TABS
                ================================================== */}
            <div className='mt-3 overflow-x-auto border-b border-gray-200'>
              <div className='flex min-w-max'>
                {workerManagementData.profileTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    type='button'
                    className={`whitespace-nowrap px-2.5 py-2 text-[9px] font-medium transition ${
                      index === 0
                        ? "border-b-2 border-green-700 text-green-700"
                        : "text-gray-500 hover:text-green-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                    PERSONAL INFORMATION
                ================================================== */}
            <div className='mt-4'>
              <div className='space-y-2.5'>
                {/* FATHER NAME */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Father's Name</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {pf.fathersName}
                  </span>
                </div>

                {/* MOTHER NAME */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Mother's Name</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {pf.mothersName}
                  </span>
                </div>

                {/* DATE OF BIRTH */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Date of Birth</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {
                      pf.dateOfBirth
                    }
                  </span>
                </div>

                {/* GENDER */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Gender</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {pf.gender}
                  </span>
                </div>

                {/* BLOOD GROUP */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Blood Group</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {pf.bloodGroup}
                  </span>
                </div>

                {/* MARITAL STATUS */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Marital Status</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {
                      pf.maritalStatus
                    }
                  </span>
                </div>

                {/* NID */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>National ID No.</span>

                  <span className='text-gray-400'>:</span>

                  <span className='break-all font-medium text-gray-700'>
                    {"-"}
                  </span>
                </div>

                {/* MOBILE */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Mobile No.</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {pf.mobileNo}
                  </span>
                </div>

                {/* PRESENT ADDRESS */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Present Address</span>

                  <span className='text-gray-400'>:</span>

                  <span className='leading-4 font-medium text-gray-700'>
                    {
                      pf.presentAddress
                    }
                  </span>
                </div>

                {/* PERMANENT ADDRESS */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Permanent Address</span>

                  <span className='text-gray-400'>:</span>

                  <span className='leading-4 font-medium text-gray-700'>
                    {
                      pf.permanentAddress
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANALYTICS SECTION
      ====================================================== */}
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-12'>
        {/* =====================================================
                CATEGORY WISE WORKERS
            ====================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm xl:col-span-3'>
          {/* HEADER */}
          <h3 className='text-sm font-semibold text-green-700'>
            Category Wise Workers
          </h3>

          {/* CHART + LEGEND */}
          <div className='mt-3 grid grid-cols-2 items-center gap-2'>
            {/* =================================================
                    DONUT CHART
                ================================================== */}
            <div className='h-[170px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={categoryWiseWorkers}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={1}
                    stroke='white'
                    strokeWidth={2}
                  >
                    {categoryWiseWorkers.map((item) => (
                      <Cell key={item.id} fill={item.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [
                      `${Number(value).toLocaleString()} Workers`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* =================================================
                    LEGEND
                ================================================== */}
            <div className='space-y-3'>
              {categoryWiseWorkers.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between gap-2'
                >
                  {/* CATEGORY */}
                  <div className='flex min-w-0 items-center gap-2'>
                    <span
                      className='h-2 w-2 shrink-0 rounded-sm'
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span className='truncate text-[10px] font-medium text-gray-600'>
                      {item.name}
                    </span>
                  </div>

                  {/* VALUE */}
                  <span className='whitespace-nowrap text-[10px] font-medium text-gray-700'>
                    {Number(item.value).toLocaleString()}{" "}
                    <span className='text-gray-400'>({item.percentage}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
                SECTION WISE DISTRIBUTION
            ====================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-3'>
          {/* HEADER */}
          <h3 className='text-sm font-semibold text-green-700'>
            Section Wise Distribution
          </h3>

          {/* DISTRIBUTION LIST */}
          <div className='mt-5 space-y-3'>
            {sectionWiseDistribution.map((item) => (
              <div key={item.id} className='flex items-center gap-3'>
                {/* SECTION NAME */}
                <div className='w-[82px] shrink-0'>
                  <span className='text-[10px] font-medium text-gray-600'>
                    {item.name}
                  </span>
                </div>

                {/* BAR */}
                <div className='min-w-0 flex-1'>
                  <div className='h-2 overflow-hidden rounded-full bg-gray-100'>
                    <div
                      className='h-full rounded-full bg-green-700 transition-all duration-500'
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* VALUE */}
                <div className='w-9 shrink-0 text-right'>
                  <span className='text-[10px] font-semibold text-gray-700'>
                    {Number(item.value).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
                WORKER TYPES
            ====================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-2'>
          {/* HEADER */}
          <h3 className='text-sm font-semibold text-green-700'>Worker Types</h3>

          {/* WORKER TYPE LIST */}
          <div className='mt-5 space-y-4'>
            {workerTypes.map((item) => {
              const Icon = workerTypeIconMap[item.icon] || Users;

              return (
                <div
                  key={item.id}
                  className='flex items-center justify-between gap-2'
                >
                  {/* LEFT SIDE */}
                  <div className='flex min-w-0 items-center gap-2'>
                    {/* ICON */}
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700'>
                      <Icon size={15} />
                    </div>

                    {/* NAME */}
                    <span className='truncate text-[10px] font-medium text-gray-600'>
                      {item.name}
                    </span>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className='whitespace-nowrap text-right'>
                    <span className='text-[10px] font-semibold text-gray-700'>
                      {Number(item.value).toLocaleString()}
                    </span>

                    <span className='ml-1 text-[9px] text-gray-400'>
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
                RECENT JOINEES
            ====================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-4'>
          {/* HEADER */}
          <h3 className='text-sm font-semibold text-green-700'>
            Recent Joinees
          </h3>

          {/* TABLE */}
          <div className='mt-4 overflow-hidden rounded-lg border border-gray-300'>
            <table className='w-full border-collapse'>
              {/* TABLE HEADER */}
              <thead className='bg-gray-50'>
                <tr>
                  <th className='border border-gray-300 px-3 py-2 text-left text-[9px] font-semibold text-gray-600'>
                    Worker ID
                  </th>

                  <th className='border border-gray-300 px-3 py-2 text-left text-[9px] font-semibold text-gray-600'>
                    Worker Name
                  </th>

                  <th className='border border-gray-300 px-3 py-2 text-right text-[9px] font-semibold text-gray-600'>
                    Join Date
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {recentJoinees.map((worker) => (
                  <tr key={worker.id} className='transition hover:bg-gray-50'>
                    {/* WORKER ID */}
                    <td className='border border-gray-300 px-3 py-1.5 text-[9px] text-gray-600'>
                      {worker.workerId}
                    </td>

                    {/* WORKER NAME */}
                    <td className='border border-gray-300 px-3 py-1.5 text-[9px] font-medium text-gray-700'>
                      {worker.workerName}
                    </td>

                    {/* JOIN DATE */}
                    <td className='border border-gray-300 px-3 py-1.5 text-right text-[9px] text-gray-600'>
                      {worker.joinDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VIEW ALL */}
          <button
            type='button'
            className='mt-2 cursor-pointer h-7 w-full rounded-md border border-gray-300 text-[9px] font-medium text-gray-600 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700'
          >
            View All
          </button>
        </div>
      </div>

      {/* =====================================================
              BOTTOM INFORMATION ROW
          ====================================================== */}

      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-12'>
        {/* ===================================================
                DOCUMENTS
            ==================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-4'>
          <h3 className='text-sm font-semibold text-green-700'>Documents</h3>

          <div className='mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5'>
            {documents.map((document) => {
              const Icon = documentIconMap[document.icon] || FileText;

              return (
                <div
                  key={document.id}
                  className='flex min-w-0 flex-col items-center rounded-lg border border-gray-200 px-2 py-3 text-center'
                >
                  {/* DOCUMENT NAME */}
                  <span className='line-clamp-2 text-[8px] font-medium text-gray-600'>
                    {document.name}
                  </span>

                  {/* ICON */}
                  <div className='mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-500'>
                    <Icon size={15} />
                  </div>

                  {/* STATUS */}
                  <span className={`mt-1.5 text-[8px] ${document.status === "Uploaded" ? "text-green-700" : "text-gray-500"}`}>
                    {document.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* NOTE */}
          <p className='mt-3 text-[9px] text-gray-400'>
            Note: Maximum file size 2MB for each file.
          </p>
        </div>

        {/* ===================================================
                ATTENDANCE OVERVIEW
            ==================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-4'>
          <h3 className='text-sm font-semibold text-green-700'>
            {attendanceOverview.title}
          </h3>

          {/* ATTENDANCE STATS */}
          <div className='mt-5 grid grid-cols-3 gap-3'>
            {/* PRESENT */}
            <div className='flex items-center gap-2'>
              <div
                className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full'
                style={{
                  background: `conic-gradient(
              #15803d ${attendanceOverview.present.percentage}%,
              #e5e7eb 0
            )`,
                }}
              >
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-white'>
                  <span className='text-[8px] font-semibold text-gray-700'>
                    {attendanceOverview.present.percentage}
                    %
                  </span>
                </div>
              </div>

              <div className='min-w-0'>
                <p className='text-[8px] text-gray-500'>Present</p>

                <p className='text-[9px] font-semibold text-gray-700'>
                  {Number(
                    attendanceOverview.present.value,
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* ABSENT */}
            <div className='flex items-center gap-2'>
              <div
                className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full'
                style={{
                  background: `conic-gradient(
              #f87171 ${attendanceOverview.absent.percentage}%,
              #e5e7eb 0
            )`,
                }}
              >
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-white'>
                  <span className='text-[8px] font-semibold text-gray-700'>
                    {attendanceOverview.absent.percentage}%
                  </span>
                </div>
              </div>

              <div className='min-w-0'>
                <p className='text-[8px] text-gray-500'>Absent</p>

                <p className='text-[9px] font-semibold text-gray-700'>
                  {Number(
                    attendanceOverview.absent.value,
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* LEAVE */}
            <div className='flex items-center gap-2'>
              <div
                className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full'
                style={{
                  background: `conic-gradient(
              #f59e0b ${attendanceOverview.leave.percentage}%,
              #e5e7eb 0
            )`,
                }}
              >
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-white'>
                  <span className='text-[8px] font-semibold text-gray-700'>
                    {attendanceOverview.leave.percentage}%
                  </span>
                </div>
              </div>

              <div className='min-w-0'>
                <p className='text-[8px] text-gray-500'>Leave</p>

                <p className='text-[9px] font-semibold text-gray-700'>
                  {Number(
                    attendanceOverview.leave.value,
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* ATTENDANCE REPORT BUTTON */}
          <button
            type='button'
            className='mx-auto cursor-pointer mt-4 block rounded-md border border-gray-300 px-4 py-1.5 text-[9px] font-medium text-gray-600 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700'
          >
            {attendanceOverview.buttonText}
          </button>
        </div>

        {/* ===================================================
                ACTION SHORTCUTS
            ==================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-4'>
          <h3 className='text-sm font-semibold text-green-700'>
            Action Shortcuts
          </h3>

          <div className='mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6 xl:grid-cols-3 2xl:grid-cols-6'>
            {workerManagementData.actionShortcuts.map((action) => {
              const Icon = actionIconMap[action.icon] || MoreHorizontal;

              return (
                <button
                  key={action.id}
                  type='button'
                  className='group flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2.5 transition hover:border-green-600 hover:bg-green-50'
                >
                  {/* ICON */}
                  <div className='flex h-8 w-8 items-center justify-center rounded-md bg-green-50 text-green-700 transition group-hover:bg-green-100'>
                    <Icon size={15} />
                  </div>

                  {/* LABEL */}
                  <span className='text-center text-[8px] font-medium leading-3 text-gray-600 group-hover:text-green-700'>
                    {action.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        title='Delete worker?'
        message={`${deleting?.workerName ?? "This worker"} will be removed from the list.`}
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default WorkerManagement;
