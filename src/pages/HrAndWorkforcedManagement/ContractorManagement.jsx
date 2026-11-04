import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import { contractorManagementData } from "../../data/HrWorkforceData/contractorManagementData.js";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
const { contractorProfile: profileStatic, actionShortcuts } = contractorManagementData;
const profileTabs = profileStatic.tabs;
const PER_PAGE = 10;
const COLUMNS = 11;
const EMPTY_FILTERS = { search: "", contractorType: "", tradeCategory: "", contractStatus: "", workLocation: "" };
const NO_PERFORMANCE = { onTimeWorkCompletion: 0, qualityRating: 0, compliance: 0 };
const orDash = (value) => (value === null || value === undefined || value === "" ? "-" : value);
// 2026-12-31 -> 31-12-2026
const dmy = (value) => (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10).split("-").reverse().join("-") : orDash(value));
const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};
import {
  Leaf,
  RotateCcw,
  UserRound,
  UserCheck,
  UserX,
  CalendarClock,
  UserPlus,
  CircleDollarSign,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Select from "../../components/common/Select";
// ===============================================
// ICON MAP
// ===============================================
const iconMap = {
  total: UserRound,
  active: UserCheck,
  inactive: UserX,
  expiring: CalendarClock,
  new: UserPlus,
  value: CircleDollarSign,
};
// ===============================================
// STYLE MAP
// ===============================================
const styleMap = {
  total: {
    background: "bg-green-50",
    icon: "text-green-700",
  },

  active: {
    background: "bg-green-50",
    icon: "text-green-600",
  },

  inactive: {
    background: "bg-red-50",
    icon: "text-red-500",
  },

  expiring: {
    background: "bg-orange-50",
    icon: "text-orange-500",
  },

  new: {
    background: "bg-blue-50",
    icon: "text-blue-500",
  },

  value: {
    background: "bg-purple-50",
    icon: "text-purple-500",
  },
};
const ContractorManagement = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
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
  const deps = [searchText, filters.contractorType, filters.tradeCategory, filters.contractStatus, filters.workLocation];

  const options = useApi(() => api.get("/contractors/filter-options"), []);
  const list = useApi(() => api.get("/contractors", { ...applied, page, perPage: PER_PAGE }), [...deps, page]);
  const summaryData = useApi(() => api.get("/contractors/summary", applied), deps);
  const contractors = list.data?.data ?? [];
  const meta = list.data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const from = contractors.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + contractors.length;

  // The profile panel shows the clicked contractor, or the first one in the list.
  const shownId = contractors.some((row) => row.id === selectedId) ? selectedId : (contractors[0]?.id ?? null);
  const profileData = useApi(() => (shownId ? api.get(`/contractors/${shownId}`) : Promise.resolve(null)), [shownId]);
  const profile = profileData.data ?? {};
  const pf = {
    status: profile.contractStatusLabel ?? "-",
    name: orDash(profile.contractorName),
    contractorId: orDash(profile.contractorId),
    type: orDash(profile.contractorTypeLabel),
    trade: orDash(profile.tradeCategoryLabel),
    mobile: orDash(profile.mobileNo),
    email: orDash(profile.email),
    workingLocation: orDash(profile.workLocationLabel),
    proprietor: orDash(profile.contactPersonName),
    address: orDash(profile.presentAddress),
    nationalId: orDash(profile.nationalIdNo),
    tradeLicense: orDash(profile.tradeLicenseNo),
    vatRegistration: orDash(profile.vatRegistrationNo),
    tinNumber: orDash(profile.tinNo),
    bankName: orDash(profile.bankName),
    bankAccountNumber: orDash(profile.accountNo),
    remarks: orDash(profile.remarks),
  };
  const documents = profile.documents ?? [];
  const performance = profile.performance ?? NO_PERFORMANCE;

  const summary = summaryData.data ?? {};
  const summaryCards = summary.summaryCards ?? [];
  const contractorTypeWise = summary.contractorTypeWise ?? [];
  const tradeWorkWise = summary.tradeWorkWise ?? [];
  const contractStatus = summary.contractStatus ?? [];
  const topContractors = summary.topContractors ?? [];
  const expiryAlerts = summary.expiryAlerts ?? [];
  const tradeMax = Math.max(1, ...tradeWorkWise.map((item) => item.value));

  // After a delete took the last row of a page, step back one page.
  useEffect(() => {
    if (meta && page > meta.totalPages && meta.totalPages >= 1) setPage(meta.totalPages);
  }, [meta, page]);

  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/contractors/export", { ...applied, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `contractors-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/contractors/${deleting.id}`);
      notifySaved(result, "Contractor deleted successfully!");
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
          HR & WORKFORCE TABS
      ====================================================== */}
      <HrWorkforceTabs />

      {/* =====================================================
          MAIN FORM
      ====================================================== */}
      <div className='space-y-4'>
        {/* ===================================================
                1. ACTION BAR
            ==================================================== */}
        <div className='py-3 '>
          <div className='flex justify-end'>
            <div className='flex flex-wrap items-center gap-2'>
              {/* ===============================================
                      ADD NEW CONTRACTOR
                  ================================================ */}
              <button
                type='button'
                onClick={() => navigate("/add-new-contractor")}
                className='flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-xs font-medium text-white'
              >
                <span>+</span>
                <span>Add New Contractor</span>
              </button>

              {/* ===============================================
                      IMPORT
                  ================================================ */}
              <button
                type='button'
                onClick={() => toast("Coming soon")}
                className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50'
              >
                <span>↓</span>

                <span>Import</span>
              </button>

              {/* ===============================================
                      EXPORT
                  ================================================ */}
              <button
                type='button'
                disabled={exporting}
                onClick={exportList}
                className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60'
              >
                <span>↓</span>

                <span>{exporting ? "Exporting..." : "Export"}</span>
              </button>

              {/* ===============================================
                      MORE
                  ================================================ */}
              <button
                type='button'
                className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50'
              >
                <span>•••</span>

                <span>More</span>

                <span className='text-[10px]'>▼</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================
                2. SUMMARY CARDS
            ==================================================== */}
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
          {summaryCards.map((card) => {
            const Icon = iconMap[card.type] || UserRound;

            const currentStyle = styleMap[card.type] || {
              background: "bg-gray-50",
              icon: "text-gray-500",
            };

            const formattedValue =
              card.type === "value"
                ? `${card.currency || "৳"} ${Number(card.value ?? 0).toLocaleString()}`
                : Number(card.value ?? 0).toLocaleString();

            return (
              <div
                key={card.id}
                className='rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
              >
                {/* =========================================
                  CARD CONTENT
              ========================================== */}
                <div className='flex items-center gap-3'>
                  {/* ICON */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${currentStyle.background}`}
                  >
                    <Icon
                      size={19}
                      strokeWidth={2}
                      className={currentStyle.icon}
                    />
                  </div>

                  {/* TEXT CONTENT */}
                  <div className='min-w-0 flex-1'>
                    {/* TITLE */}
                    <p className='truncate text-[10px] font-medium text-gray-500'>
                      {card.title}
                    </p>

                    {/* VALUE */}
                    <h3 className='mt-0.5 text-lg font-bold leading-tight text-gray-800'>
                      {formattedValue}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================
            3. MAIN CONTENT - 8 / 4
        ==================================================== */}
        <div className='grid grid-cols-12 gap-4'>
          {/* =================================================
              LEFT SIDE - 8 COLUMNS
          ================================================== */}
          <div className='col-span-12 space-y-4 lg:col-span-8'>
            {/* ===================================================
              3. CONTRACTOR LIST
          ==================================================== */}
            <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* =================================================
                    SECTION HEADER
                ================================================== */}
              <div className='border-b border-gray-200 px-4 py-3'>
                <div className='flex items-center justify-between'>
                  {/* TITLE */}
                  <h3 className='text-sm font-semibold text-green-700'>
                    Contractor List
                  </h3>
                </div>

                {/* =================================================
                        FILTER AREA
                    ================================================== */}
                <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
                  {/* ===============================================
                          CONTRACTOR TYPE
                      ================================================ */}
                  <div>
                    <label className='mb-3 block text-[10px] font-medium text-gray-600'>
                      Contractor Type
                    </label>

                    <div className='relative'>
                      <Select
                        value={filters.contractorType}
                        onChange={setFilter("contractorType")}
                        className='w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-4 pr-8 text-[11px] text-gray-700 outline-none transition focus:border-green-600'
                      >
                        <option value=''>All Types</option>

                        {optionList(options.data?.contractorTypes)}
                      </Select>

                      <ChevronDown
                        size={14}
                        className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500'
                      />
                    </div>
                  </div>

                  {/* ===============================================
                          TRADE / WORK CATEGORY
                      ================================================ */}
                  <div>
                    <label className='mb-1.5 block text-[10px] font-medium text-gray-600'>
                      Trade / Work Category
                    </label>

                    <div className='relative'>
                      <Select
                        value={filters.tradeCategory}
                        onChange={setFilter("tradeCategory")}
                        className='w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-[11px] text-gray-700 outline-none transition focus:border-green-600'
                      >
                        <option value=''>All Categories</option>

                        {optionList(options.data?.tradeCategories)}
                      </Select>

                      <ChevronDown
                        size={14}
                        className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500'
                      />
                    </div>
                  </div>

                  {/* ===============================================
                          STATUS
                      ================================================ */}
                  <div>
                    <label className='mb-1.5 block text-[10px] font-medium text-gray-600'>
                      Status
                    </label>

                    <div className='relative'>
                      <Select
                        value={filters.contractStatus}
                        onChange={setFilter("contractStatus")}
                        className='w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-[11px] text-gray-700 outline-none transition focus:border-green-600'
                      >
                        <option value=''>All Status</option>

                        {optionList(options.data?.statuses)}
                      </Select>

                      <ChevronDown
                        size={14}
                        className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500'
                      />
                    </div>
                  </div>

                  {/* ===============================================
                          WORKING LOCATION
                      ================================================ */}
                  <div>
                    <label className='mb-1.5 block text-[10px] font-medium text-gray-600'>
                      Working Location
                    </label>

                    <div className='relative'>
                      <Select
                        value={filters.workLocation}
                        onChange={setFilter("workLocation")}
                        className='w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-[11px] text-gray-700 outline-none transition focus:border-green-600'
                      >
                        <option value=''>All Locations</option>

                        {optionList(options.data?.locations)}
                      </Select>

                      <ChevronDown
                        size={14}
                        className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500'
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                        SEARCH + FILTER BUTTON
                    ================================================== */}
                <div className='mt-3 flex flex-col gap-2 sm:flex-row'>
                  {/* SEARCH */}
                  <div className='relative flex-1'>
                    <Search
                      size={14}
                      className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                    />

                    <input
                      type='text'
                      value={filters.search}
                      onChange={setFilter("search")}
                      placeholder='Search by Contractor Name, Mobile...'
                      className='w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-[11px] text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600'
                    />
                  </div>

                  {/* FILTER BUTTON */}
                  <button
                    type='button'
                    title='Reset Filters'
                    onClick={resetFilters}
                    disabled={!hasFilters}
                    className='flex h-9 w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-10'
                  >
                    <SlidersHorizontal size={15} />
                  </button>
                </div>
              </div>

              {/* =================================================
                      CONTRACTOR TABLE
                  ================================================== */}
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[1050px] text-left'>
                  {/* =================================================
                          TABLE HEADER
                      ================================================== */}
                  <thead className='bg-gray-50'>
                    <tr className='border-b border-gray-200'>
                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        SL
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Contractor ID
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Contractor Name
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Type
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Trade / Work
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Mobile
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Working Location
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Status
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Contract Start Date
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Contract End Date
                      </th>

                      <th className='px-3 py-2.5 text-center text-[9px] font-semibold text-gray-600'>
                        Action
                      </th>
                    </tr>
                  </thead>

                  {/* =================================================
                          TABLE BODY
                      ================================================== */}
                  <tbody>
                    {list.loading && !list.data ? (
                      <TableSkeleton rows={5} columns={COLUMNS} />
                    ) : list.error ? (
                      <tr>
                        <td colSpan={COLUMNS} className='p-4'>
                          <ErrorState message={list.error.message} onRetry={list.reload} />
                        </td>
                      </tr>
                    ) : contractors.length === 0 ? (
                      <EmptyRow columns={COLUMNS} message='No contractors found' />
                    ) : (
                      contractors.map((contractor, index) => (
                        <tr
                          key={contractor.id}
                          onClick={() => setSelectedId(contractor.id)}
                          className={`cursor-pointer border-b border-gray-100 transition hover:bg-gray-50 ${contractor.id === shownId ? "bg-green-50/60" : ""}`}
                        >
                          <td className='px-3 py-2.5 text-[10px] text-gray-600'>{(page - 1) * PER_PAGE + index + 1}</td>
                          <td className='px-3 py-2.5 text-[10px] font-medium text-gray-700'>{contractor.contractorId}</td>
                          <td className='px-3 py-2.5 text-[10px] font-medium text-gray-800'>{contractor.contractorName}</td>
                          <td className='px-3 py-2.5 text-[10px] text-gray-600'>{orDash(contractor.contractorTypeLabel)}</td>
                          <td className='px-3 py-2.5 text-[10px] text-gray-600'>{orDash(contractor.tradeCategoryLabel)}</td>
                          <td className='px-3 py-2.5 text-[10px] text-gray-600'>{orDash(contractor.mobileNo)}</td>
                          <td className='px-3 py-2.5 text-[10px] text-gray-600'>{orDash(contractor.workLocationLabel)}</td>
                          <td className='px-3 py-2.5'>
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-[9px] font-medium ${
                                contractor.contractStatus === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                              }`}
                            >
                              {orDash(contractor.contractStatusLabel)}
                            </span>
                          </td>
                          <td className='px-3 py-2.5 text-[10px] text-gray-600'>{dmy(contractor.contractStartDate)}</td>
                          <td className='px-3 py-2.5 text-[10px] text-gray-600'>{dmy(contractor.contractEndDate)}</td>
                          <td className='px-3 py-2.5' onClick={(event) => event.stopPropagation()}>
                            <PendingBadge row={contractor} />
                            <div className='flex items-center justify-center gap-1'>
                              <button
                                type='button'
                                title='View Contractor'
                                onClick={() => setSelectedId(contractor.id)}
                                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50'
                              >
                                <Eye size={13} />
                              </button>
                              <button
                                type='button'
                                disabled={Boolean(contractor.pendingRequest)}
                                title={waitingTitle(contractor, "Edit")}
                                onClick={() => navigate(`/add-new-contractor?id=${contractor.id}`)}
                                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40'
                              >
                                <Pencil size={13} />
                              </button>
                              <button
                                type='button'
                                disabled={Boolean(contractor.pendingRequest)}
                                title={waitingTitle(contractor, "Delete")}
                                onClick={() => setDeleting(contractor)}
                                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                              >
                                <Trash2 size={13} />
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
              <div className='flex flex-col gap-2 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
                {/* ENTRY INFO */}
                <p className='text-[10px] text-gray-500'>
                  Showing {from} to {to} of {total.toLocaleString()} entries
                </p>

                {/* PAGINATION */}
                <div className='flex items-center gap-1'>
                  <button
                    type='button'
                    aria-label='Previous page'
                    disabled={page <= 1}
                    onClick={() => setPage((current) => current - 1)}
                    className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <span className='flex h-7 min-w-7 items-center justify-center rounded-md bg-green-700 px-2 text-[10px] font-medium text-white'>
                    {page} / {totalPages}
                  </span>
                  <button
                    type='button'
                    aria-label='Next page'
                    disabled={page >= totalPages}
                    onClick={() => setPage((current) => current + 1)}
                    className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================
                CHART SECTION
            ================================================== */}
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
              {/* =================================================
                      1. CONTRACTOR TYPE WISE
                  ================================================== */}
              <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
                {/* TITLE */}
                <h3 className='text-sm font-semibold text-green-700'>
                  Contractor Type Wise
                </h3>

                {/* CHART + LEGEND */}
                <div className='mt-3 grid grid-cols-1 items-center gap-3 sm:grid-cols-2'>
                  {/* DONUT CHART */}
                  <div className='h-[180px] w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <PieChart>
                        <Pie
                          data={contractorTypeWise}
                          dataKey='value'
                          nameKey='name'
                          cx='50%'
                          cy='50%'
                          innerRadius={35}
                          outerRadius={55}
                          paddingAngle={1}
                          stroke='none'
                        >
                          {contractorTypeWise.map((item, index) => (
                            <Cell
                              key={`type-${index}`}
                              fill={
                                ["#15803d", "#0ea5e9", "#f59e0b", "#9333ea"][
                                  index % 4
                                ]
                              }
                            />
                          ))}
                        </Pie>

                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* LEGEND */}
                  <div className='space-y-3'>
                    {contractorTypeWise.map((item, index) => (
                      <div
                        key={item.name}
                        className='flex items-center justify-between gap-2'
                      >
                        <div className='flex min-w-0 items-center gap-2'>
                          {/* COLOR */}
                          <span
                            className='h-2.5 w-2.5 shrink-0 rounded-sm'
                            style={{
                              backgroundColor: [
                                "#15803d",
                                "#0ea5e9",
                                "#f59e0b",
                                "#9333ea",
                              ][index % 4],
                            }}
                          />

                          {/* NAME */}
                          <span className='truncate text-[10px] text-gray-600'>
                            {item.name}
                          </span>
                        </div>

                        {/* VALUE */}
                        <span className='shrink-0 text-[10px] font-medium text-gray-700'>
                          {item.value}
                          <span className='ml-1 text-[9px] text-gray-400'>
                            ({item.percentage}%)
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* =================================================
                      2. TRADE / WORK WISE
                  ================================================== */}
              <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
                <h3 className='text-sm font-semibold text-green-700'>
                  Trade / Work Wise
                </h3>

                <div className='mt-4 space-y-3'>
                  {tradeWorkWise.map((item) => (
                    <div key={item.name} className='flex items-center gap-3'>
                      {/* LABEL */}
                      <span className='w-24 shrink-0 text-[10px] text-gray-600'>
                        {item.name}
                      </span>

                      {/* BAR */}
                      <div className='h-2 flex-1 rounded-full bg-gray-100'>
                        <div
                          className='h-2 rounded-full bg-green-700'
                          style={{
                            width: `${(item.value / tradeMax) * 100}%`,
                          }}
                        />
                      </div>

                      {/* VALUE */}
                      <span className='w-8 text-right text-[10px] font-medium text-gray-600'>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* =================================================
                      3. CONTRACT STATUS
                  ================================================== */}
              <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
                <h3 className='text-sm font-semibold text-green-700'>
                  Contract Status
                </h3>

                <div className='mt-3 grid grid-cols-1 items-center gap-3 sm:grid-cols-2'>
                  {/* DONUT */}
                  <div className='h-[180px] w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <PieChart>
                        <Pie
                          data={contractStatus}
                          dataKey='value'
                          nameKey='name'
                          cx='50%'
                          cy='50%'
                          innerRadius={35}
                          outerRadius={55}
                          paddingAngle={1}
                          stroke='none'
                        >
                          {contractStatus.map((item, index) => (
                            <Cell
                              key={`status-${index}`}
                              fill={index === 0 ? "#15803d" : "#ef4444"}
                            />
                          ))}
                        </Pie>

                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* LEGEND */}
                  <div className='space-y-4'>
                    {contractStatus.map((item, index) => (
                      <div key={item.name} className='flex items-center gap-2'>
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            index === 0 ? "bg-green-700" : "bg-red-500"
                          }`}
                        />

                        <div>
                          <p className='text-[10px] font-medium text-gray-700'>
                            {item.name}
                          </p>

                          <p className='text-[9px] text-gray-400'>
                            {item.value} ({item.percentage}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE - 4 COLUMNS
          ================================================== */}
          <div className='col-span-12 space-y-4 lg:col-span-4'>
            {/* ===================================================
                    CONTRACTOR PROFILE
                ==================================================== */}
            <div className='col-span-12 lg:col-span-4'>
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* =================================================
                      PROFILE HEADER
                  ================================================== */}
                <div className='flex items-center justify-between border-b border-gray-100 px-4 py-8'>
                  <h3 className='text-sm font-semibold text-green-700'>
                    Contractor Profile
                  </h3>

                  {/* STATUS */}
                  <span
                    className={`inline-flex items-center mb-2 gap-2 rounded-full px-2 py-3 text-[9px] font-medium ${
                      pf.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 mb-1 py-1 rounded-full ${
                        pf.status === "Active"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    />

                    {pf.status}
                  </span>
                </div>

                {/* =================================================
                        BASIC PROFILE INFORMATION
                    ================================================== */}
                <div className='px-4 py-4'>
                  <div className='flex gap-4'>
                    {/* =============================================
                              PROFILE IMAGE / LOGO
                          ============================================== */}
                    <div className='flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white'>
                      <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-600 bg-green-50'>
                        <Leaf
                          size={34}
                          strokeWidth={1.5}
                          className='text-green-700'
                        />
                      </div>
                    </div>

                    {/* =============================================
                            BASIC INFO
                        ============================================== */}
                    <div className='min-w-0 flex-1'>
                      {/* NAME */}
                      <h4 className='truncate text-sm font-semibold text-gray-800'>
                        {pf.name}
                      </h4>

                      {/* DETAILS */}
                      <div className='mt-2 space-y-1'>
                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Contractor ID</span>

                          <span className='font-medium text-gray-700'>
                            {pf.contractorId}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Type</span>

                          <span className='font-medium text-gray-700'>
                            {pf.type}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Trade / Work</span>

                          <span className='font-medium text-gray-700'>
                            {pf.trade}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Mobile</span>

                          <span className='font-medium text-gray-700'>
                            {pf.mobile}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Email</span>

                          <span className='truncate font-medium text-gray-700'>
                            {pf.email}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Location</span>

                          <span className='font-medium text-gray-700'>
                            {pf.workingLocation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                        PROFILE TABS
                    ================================================== */}
                <div className='overflow-x-auto border-y border-gray-200'>
                  <div className='flex min-w-max'>
                    {profileTabs.map((tab, index) => (
                      <button
                        key={tab}
                        type='button'
                        className={`relative whitespace-nowrap px-3 py-2.5 text-[9px] font-medium transition ${
                          index === 0
                            ? "text-green-700"
                            : "text-gray-500 hover:text-green-700"
                        }`}
                      >
                        {tab}

                        {/* ACTIVE TAB LINE */}
                        {index === 0 && (
                          <span className='absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-green-700' />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* =================================================
                        GENERAL INFORMATION
                    ================================================== */}
                <div className='px-4 py-4'>
                  <div className='space-y-2.5'>
                    {/* PROPRIETOR */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        Proprietor / Contact Person
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {pf.proprietor}
                      </span>
                    </div>

                    {/* ADDRESS */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>Address</span>

                      <span className='text-gray-400'>:</span>

                      <span className='leading-4 text-gray-700'>
                        {pf.address}
                      </span>
                    </div>

                    {/* NATIONAL ID */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        National ID No.
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {pf.nationalId}
                      </span>
                    </div>

                    {/* TRADE LICENSE */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        Trade License No.
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {pf.tradeLicense}
                      </span>
                    </div>

                    {/* VAT */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        VAT Registration No.
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {pf.vatRegistration}
                      </span>
                    </div>

                    {/* TIN */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>TIN No.</span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {pf.tinNumber}
                      </span>
                    </div>

                    {/* BANK NAME */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        Bank Name
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {pf.bankName}
                      </span>
                    </div>

                    {/* BANK ACCOUNT */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        Bank Account No.
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {pf.bankAccountNumber}
                      </span>
                    </div>

                    {/* STATUS */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>Status</span>

                      <span className='text-gray-400'>:</span>

                      <span className='font-medium text-green-700'>
                        {pf.status}
                      </span>
                    </div>

                    {/* REMARKS */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>Remarks</span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {pf.remarks}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                    TOP 5 CONTRACTORS BY CONTRACT VALUE
                ================================================= */}
            <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
              {/* =================================================
                      TITLE
                  ================================================== */}
              <h3 className='text-sm font-semibold text-green-700'>
                Top 5 Contractors by Contract Value
              </h3>

              {/* =================================================
                      TABLE
                  ================================================== */}
              <div className='mt-3 overflow-x-auto'>
                <table className='w-full min-w-[280px]'>
                  {/* =================================================
                          TABLE HEADER
                      ================================================== */}
                  <thead>
                    <tr className='border-b border-gray-200'>
                      <th className='pb-2 text-left text-[9px] font-semibold text-gray-600'>
                        Contractor Name
                      </th>

                      <th className='pb-2 text-right text-[9px] font-semibold text-gray-600'>
                        Contract Value (৳)
                      </th>
                    </tr>
                  </thead>

                  {/* =================================================
                          TABLE BODY
                      ================================================== */}
                  <tbody>
                    {topContractors.map((contractor) => (
                      <tr
                        key={contractor.contractorId}
                        className='border-b border-gray-100 last:border-b-0'
                      >
                        {/* CONTRACTOR NAME */}
                        <td className='py-2 text-[10px] text-gray-700'>
                          {contractor.name}
                        </td>

                        {/* CONTRACT VALUE */}
                        <td className='py-2 text-right text-[10px] font-medium text-gray-700'>
                          {Number(contractor.contractValue ?? 0).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* =================================================
                          TOTAL
                      ================================================== */}
                  <tfoot>
                    <tr>
                      <td className='pt-2 text-center text-[10px] font-semibold text-green-700'>
                        Total
                      </td>

                      <td className='pt-2 text-right text-[11px] font-bold text-green-700'>
                        ৳{" "}
                        {topContractors
                          .reduce(
                            (total, contractor) =>
                              total + Number(contractor.contractValue ?? 0),
                            0,
                          )
                          .toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
                4. BOTTOM INFORMATION SECTION
            ==================================================== */}
        <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4'>
          {/* =================================================
                  1. CONTRACT EXPIRY ALERT
              ================================================== */}
          {/* =================================================
                  CONTRACT EXPIRY ALERT
              ================================================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* TITLE */}
            <h3 className='text-sm font-semibold text-green-700'>
              Contract Expiry Alert
            </h3>

            {/* TABLE */}
            <div className='mt-3 overflow-x-auto'>
              <table className='w-full min-w-[500px] table-fixed'>
                {/* TABLE HEADER */}
                <thead>
                  <tr className='border-b border-gray-200'>
                    <th className='w-[18%] pb-2 text-left text-[8px] font-semibold text-gray-600'>
                      Contractor ID
                    </th>

                    <th className='w-[30%] pb-2 text-left text-[8px] font-semibold text-gray-600'>
                      Contractor Name
                    </th>

                    <th className='w-[18%] pb-2 text-center text-[8px] font-semibold text-gray-600'>
                      End Date
                    </th>

                    <th className='w-[15%] pb-2 text-center text-[8px] font-semibold text-gray-600'>
                      Days Left
                    </th>

                    <th className='w-[19%] pb-2 text-center text-[8px] font-semibold text-gray-600'>
                      Status
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {expiryAlerts.map((alert) => (
                    <tr
                      key={alert.contractorId}
                      className='border-b border-gray-100 last:border-b-0'
                    >
                      {/* CONTRACTOR ID */}
                      <td className='py-2 text-left text-[8px] text-gray-600'>
                        {alert.contractorId}
                      </td>

                      {/* CONTRACTOR NAME */}
                      <td className='truncate py-2 text-left text-[8px] font-medium text-gray-700'>
                        {alert.contractorName}
                      </td>

                      {/* END DATE */}
                      <td className='py-2 text-center text-[8px] text-gray-600'>
                        {dmy(alert.endDate)}
                      </td>

                      {/* DAYS LEFT */}
                      <td className='py-2 text-center text-[8px] text-gray-600'>
                        {alert.daysLeft}
                      </td>

                      {/* STATUS */}
                      <td className='py-2 text-center'>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[7px] font-medium ${
                            alert.status === "Expiring Soon"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VIEW ALL BUTTON */}
            <div className='mt-3 flex justify-center'>
              <button
                type='button'
                className='rounded-md border border-gray-200 px-8 py-2 text-[9px] font-medium text-gray-600 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700'
              >
                View All Expiring Contracts
              </button>
            </div>
          </div>

          {/* =================================================
                  2. DOCUMENTS
              ================================================== */}
          <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            <h3 className='text-sm font-semibold text-green-700'>Documents</h3>

            <div className='mt-3 grid grid-cols-4 gap-2'>
              {documents.map((document) => (
                <div
                  key={document.id}
                  className='flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-3 text-center'
                >
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500'>
                    📄
                  </div>

                  <p className='mt-1 text-[9px] font-medium text-gray-600'>
                    {document.name}
                  </p>

                  <span className={`mt-1 text-[8px] ${document.status === "Uploaded" ? "text-green-600" : "text-gray-500"}`}>
                    {document.status}
                  </span>
                </div>
              ))}
            </div>

            <p className='mt-3 text-[8px] text-gray-400'>
              Note: Maximum file size 2MB for each file.
            </p>
          </div>

          {/* =================================================
                  3. PERFORMANCE SUMMARY
              ================================================== */}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            <h3 className='text-sm font-semibold text-green-700'>
              Performance Summary (This Month)
            </h3>

            <div className='mt-5 space-y-5'>
              {/* ON TIME WORK */}
              <div>
                <div className='mb-1 flex items-center justify-between'>
                  <span className='text-[10px] text-gray-600'>
                    On-Time Work Completion
                  </span>

                  <span className='text-[10px] font-semibold text-green-700'>
                    {performance.onTimeWorkCompletion}%
                  </span>
                </div>

                <div className='h-1.5 rounded-full bg-gray-100'>
                  <div
                    className='h-1.5 rounded-full bg-green-700'
                    style={{
                      width: `${performance.onTimeWorkCompletion}%`,
                    }}
                  />
                </div>
              </div>

              {/* QUALITY */}
              <div>
                <div className='mb-1 flex items-center justify-between'>
                  <span className='text-[10px] text-gray-600'>
                    Quality Rating (Avg.)
                  </span>

                  <span className='text-[10px] font-semibold text-green-700'>
                    {performance.qualityRating} / 5
                  </span>
                </div>

                <div className='h-1.5 rounded-full bg-gray-100'>
                  <div
                    className='h-1.5 rounded-full bg-green-700'
                    style={{
                      width: `${(performance.qualityRating / 5) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* COMPLIANCE */}
              <div>
                <div className='mb-1 flex items-center justify-between'>
                  <span className='text-[10px] text-gray-600'>Compliance</span>

                  <span className='text-[10px] font-semibold text-green-700'>
                    {performance.compliance}%
                  </span>
                </div>

                <div className='h-1.5 rounded-full bg-gray-100'>
                  <div
                    className='h-1.5 rounded-full bg-green-700'
                    style={{
                      width: `${performance.compliance}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              type='button'
              className='mt-4 w-full rounded-md border border-gray-200 py-2 text-[10px] font-medium text-gray-600 hover:bg-gray-50'
            >
              View Performance Report
            </button>
          </div>

          {/* =================================================
                  4. ACTION SHORTCUTS
              ================================================== */}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            <h3 className='text-sm font-semibold text-green-700'>
              Action Shortcuts
            </h3>

            <div className='mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5'>
              {actionShortcuts.map((action) => (
                <button
                  key={action.id}
                  type='button'
                  className='flex flex-col items-center gap-2 rounded-lg p-2 text-center transition hover:bg-green-50'
                >
                  <div className='flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-green-700'>
                    {action.type === "renewal" && "↻"}
                    {action.type === "payment" && "▣"}
                    {action.type === "workOrder" && "▤"}
                    {action.type === "document" && "▧"}
                    {action.type === "blacklist" && "♙"}
                    {action.type === "more" && "•••"}
                  </div>

                  <span className='text-[9px] font-medium leading-3 text-gray-600'>
                    {action.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================
            5. FOOTER
        ==================================================== */}
        <div className='flex flex-col gap-2 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-end'>
          <button
            type='button'
            onClick={resetFilters}
            disabled={!hasFilters}
            className='inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
          >
            <RotateCcw size={15} strokeWidth={1.8} />
            Reset Filters
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        title='Delete contractor?'
        message={`${deleting?.contractorName ?? "This contractor"} will be removed from the list.`}
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default ContractorManagement;
