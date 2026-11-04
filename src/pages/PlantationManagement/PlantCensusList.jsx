import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Eye, Pencil, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { waitingTitle } from "../../lib/waitingTitle";
import { useApi } from "../../lib/useApi";

const PER_PAGE = 10;
const HEADERS = ["SL", "Field", "Estate", "Census Date", "Census Year", "Survey Type", "Rows", "Live Plants", "Dead Plants", "Survival %", "Status", "Actions"];
const SURVEY_TYPES = [
  { value: "full", label: "Full Census" },
  { value: "sample", label: "Sample Census" },
  { value: "random", label: "Random Survey" },
];
const STATUS_STYLE = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-orange-100 text-orange-700",
  Pending: "bg-gray-100 text-gray-600",
};
const EMPTY_FILTERS = { search: "", estate: "", censusYear: "", surveyType: "" };

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const orDash = (value) => (value === null || value === undefined || value === "" ? "-" : value);
const count = (value) => (value === null || value === undefined ? "-" : Number(value).toLocaleString("en-US"));
const percent = (value) => (value === null || value === undefined ? "-" : `${Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}%`);
// 2026-05-20 -> 20-05-2026
const dmy = (value) => (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10).split("-").reverse().join("-") : orDash(value));
const surveyLabel = (value) => SURVEY_TYPES.find((item) => item.value === value)?.label ?? orDash(value);

const filterClass = "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600";

const PlantCensusList = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
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

  const estates = useApi(() => api.get("/options/estates"), []);
  const censuses = useApi(
    () => api.get("/plant-censuses", { ...applied, page, perPage: PER_PAGE }),
    [searchText, filters.estate, filters.censusYear, filters.surveyType, page],
  );
  const rows = censuses.data?.data ?? [];
  const meta = censuses.data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;

  // The last ten years, newest first.
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, index) => thisYear - index);

  // After a delete took the last row of a page, step back one page.
  useEffect(() => {
    if (meta && page > meta.totalPages && meta.totalPages >= 1) setPage(meta.totalPages);
  }, [meta, page]);

  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/plant-censuses/export", { ...applied, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `plant-censuses-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/plant-censuses/${deleting.id}`);
      notifySaved(result, "Plant census deleted successfully!");
      setDeleting(null);
      censuses.reload();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteBusy(false);
    }
  };

  const pageButton = "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className='space-y-6'>
      <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
        {/* Header */}
        <div className='flex flex-col gap-3 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
          <h2 className='text-lg font-semibold text-green-800'>Plant Census List</h2>
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
              onClick={() => navigate("/plant-census")}
              className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition hover:bg-green-800'
            >
              <Plus size={16} />
              Add Census
            </button>
          </div>
        </div>

        {/* Search + filters */}
        <div className='grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))_auto]'>
          <div className='relative sm:col-span-2 lg:col-span-1'>
            <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              value={filters.search}
              onChange={setFilter("search")}
              placeholder='Search by field, remarks...'
              className={`${filterClass} pl-9`}
            />
          </div>
          <Select value={filters.estate} onChange={setFilter("estate")} className={filterClass}>
            <option value=''>All Estates</option>
            {(estates.data ?? []).map((estate) => (
              <option key={estate.id} value={estate.value}>
                {estate.label}
              </option>
            ))}
          </Select>
          <Select value={filters.censusYear} onChange={setFilter("censusYear")} className={filterClass}>
            <option value=''>All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select value={filters.surveyType} onChange={setFilter("surveyType")} className={filterClass}>
            <option value=''>All Survey Types</option>
            {SURVEY_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
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

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full min-w-250 border-collapse text-sm'>
            <thead className='bg-gray-100'>
              <tr>
                {HEADERS.map((header) => (
                  <th key={header} className='whitespace-nowrap border border-gray-200 px-3 py-3 text-center text-xs font-semibold text-gray-700'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {censuses.loading && !censuses.data ? (
                <TableSkeleton rows={5} columns={HEADERS.length} />
              ) : censuses.error ? (
                <tr>
                  <td colSpan={HEADERS.length} className='p-4'>
                    <ErrorState message={censuses.error.message} onRetry={censuses.reload} />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <EmptyRow columns={HEADERS.length} message='No plant censuses found' />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className='border-b border-gray-200 transition hover:bg-green-50/40'>
                    <td className='px-3 py-3 text-center text-gray-700'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center font-medium text-gray-800'>{orDash(row.fieldBlockName)}</td>
                    <td className='px-3 py-3 text-left text-gray-700'>{orDash(row.estateName)}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{dmy(row.censusDate)}</td>
                    <td className='px-3 py-3 text-center text-gray-700'>{orDash(row.censusYear)}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{surveyLabel(row.surveyType)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{count(row.rowCount)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{count(row.livePlants)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{count(row.deadPlants)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{percent(row.survivalRate)}</td>
                    <td className='px-3 py-3 text-center'>
                      <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[row.dataEntryStatus] ?? "bg-gray-100 text-gray-600"}`}>
                        {orDash(row.dataEntryStatus)}
                      </span>
                    </td>
                    <td className='px-3 py-3'>
                      <PendingBadge row={row} />
                      <div className='flex items-center justify-center gap-1'>
                        <button
                          type='button'
                          title='View'
                          onClick={() => navigate(`/plant-census?id=${row.id}`)}
                          className='cursor-pointer rounded-md p-2 text-gray-600 transition hover:bg-gray-100'
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type='button'
                          disabled={Boolean(row.pendingRequest)}
                          title={waitingTitle(row, "Edit")}
                          onClick={() => navigate(`/plant-census?id=${row.id}`)}
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

        {/* Footer */}
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
        title='Delete plant census?'
        message={`The census of ${deleting?.fieldBlockName ?? "this field"} (${deleting?.censusYear ?? ""}) will be removed from the list.`}
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default PlantCensusList;
