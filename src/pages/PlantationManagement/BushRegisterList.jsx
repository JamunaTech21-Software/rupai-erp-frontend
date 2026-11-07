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
import { loadNewestCreated } from "../../lib/newestCreated";

const PER_PAGE = 10;
const HEADERS = ["SL", "Field", "Estate", "Planting Year", "Survey Date", "Rows", "Total Bush", "Productive", "Dead", "Missing", "Actions"];
const EMPTY_FILTERS = { search: "", estate: "", plantingYear: "" };

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
// 2026-05-15 -> 15-05-2026
const dmy = (value) => (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10).split("-").reverse().join("-") : orDash(value));

const filterClass = "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600";

const BushRegisterList = () => {
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

  // The last 40 years, newest first (bush are planted years before the survey).
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, index) => thisYear - index);

  const estates = useApi(() => api.get("/options/estates"), []);
  const registers = useApi(
    () => loadNewestCreated("/bush-registers", applied, page, PER_PAGE),
    [searchText, filters.estate, filters.plantingYear, page],
  );
  const rows = registers.data?.data ?? [];
  const meta = registers.data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;

  // After a delete took the last row of a page, step back one page.
  useEffect(() => {
    if (meta && page > meta.totalPages && meta.totalPages >= 1) setPage(meta.totalPages);
  }, [meta, page]);

  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/bush-registers/export", { ...applied, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `bush-registers-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/bush-registers/${deleting.id}`);
      notifySaved(result, "Bush register deleted successfully!");
      setDeleting(null);
      registers.reload();
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
          <h2 className='text-lg font-semibold text-green-800'>Bush Register List</h2>
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
              onClick={() => navigate("/bush-register")}
              className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition hover:bg-green-800'
            >
              <Plus size={16} />
              Add Register
            </button>
          </div>
        </div>

        {/* Search + filters */}
        <div className='grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))_auto]'>
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
          <Select value={filters.plantingYear} onChange={setFilter("plantingYear")} className={filterClass}>
            <option value=''>All Planting Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
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
              {registers.loading && !registers.data ? (
                <TableSkeleton rows={5} columns={HEADERS.length} />
              ) : registers.error ? (
                <tr>
                  <td colSpan={HEADERS.length} className='p-4'>
                    <ErrorState message={registers.error.message} onRetry={registers.reload} />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <EmptyRow columns={HEADERS.length} message='No bush registers found' />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className='border-b border-gray-200 transition hover:bg-green-50/40'>
                    <td className='px-3 py-3 text-center text-gray-700'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center font-medium text-gray-800'>{orDash(row.fieldBlockName)}</td>
                    <td className='px-3 py-3 text-left text-gray-700'>{orDash(row.estateName)}</td>
                    <td className='px-3 py-3 text-center text-gray-700'>{orDash(row.plantingYear)}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{dmy(row.surveyDate)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{count(row.rowCount)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{count(row.totalBush)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{count(row.productive)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{count(row.dead)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{count(row.missing)}</td>
                    <td className='px-3 py-3'>
                      <PendingBadge row={row} />
                      <div className='flex items-center justify-center gap-1'>
                        <button
                          type='button'
                          title='View'
                          onClick={() => navigate(`/bush-register?id=${row.id}`)}
                          className='cursor-pointer rounded-md p-2 text-gray-600 transition hover:bg-gray-100'
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type='button'
                          disabled={Boolean(row.pendingRequest)}
                          title={waitingTitle(row, "Edit")}
                          onClick={() => navigate(`/bush-register?id=${row.id}`)}
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
        title='Delete bush register?'
        message={`The bush register of ${deleting?.fieldBlockName ?? "this field"} will be removed from the list.`}
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default BushRegisterList;
