import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileSpreadsheet, History, Pencil, Plus, RotateCcw, Search, Trash2, X } from "lucide-react";
import Select from "../../components/common/Select";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { waitingTitle } from "../../lib/waitingTitle";
import weatherEntriesData from "../../data/Weather/weatherEntriesData";

const PER_PAGE = 10;
const filterBox = "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600";
const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";
const iconButton = "cursor-pointer rounded-md border p-1.5 disabled:cursor-not-allowed disabled:opacity-40";
const dateText = (value) => (value ? String(value).slice(0, 10) : "-");
const number = (value, digits = 1) => (value === null || value === undefined || value === "" ? "-" : Number(value).toFixed(digits));
const when = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const WeatherEntries = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [station, setStation] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [entryStatus, setEntryStatus] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [historyOf, setHistoryOf] = useState(null);
  const [exporting, setExporting] = useState(false);

  const searchText = useDebounced(search.trim());

  // =========================================================
  // DATA
  // =========================================================

  const options = useApi(() => api.get("/weather-entries/filter-options"), []);
  const stations = useApi(() => api.get("/options/weather-stations"), []);
  const params = { search: searchText, station, dateFrom, dateTo, entryStatus, weatherCondition };
  const list = useApi(() => api.get("/weather-entries", { ...params, page, perPage: PER_PAGE }), [searchText, station, dateFrom, dateTo, entryStatus, weatherCondition, page]);
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;
  const filtered = Boolean(search || station || dateFrom || dateTo || entryStatus || weatherCondition);

  const history = useApi(() => (historyOf ? api.get(`/weather-entries/${historyOf.id}/history`) : Promise.resolve(null)), [historyOf?.id]);

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  const change = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };

  const reset = () => {
    setSearch("");
    setStation("");
    setDateFrom("");
    setDateTo("");
    setEntryStatus("");
    setWeatherCondition("");
    setPage(1);
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/weather-entries/export", { ...params, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `weather-entries-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/weather-entries/${deleting.id}`);
      notifySaved(result, "Weather entry deleted successfully!");
      setDeleting(null);
      list.reload();
    } catch (error) {
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const columns = weatherEntriesData.columns;
  const pageButton = "flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className='w-full space-y-4'>
      <div className='rounded-lg bg-white p-4 shadow-sm'>
        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-lg font-bold text-slate-900'>{weatherEntriesData.title}</h2>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <button
              type='button'
              onClick={exportList}
              disabled={exporting}
              className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-emerald-600 bg-white px-6 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <FileSpreadsheet className='h-4 w-4' />
              {exporting ? "Exporting..." : "Export"}
            </button>
            <Link to={weatherEntriesData.addPath} className='flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-800 px-6 text-sm font-semibold text-white hover:bg-emerald-900'>
              <Plus className='h-4 w-4' />
              Add Weather Entry
            </Link>
          </div>
        </div>

        {/* FILTERS */}

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          <div className='relative sm:col-span-2 xl:col-span-1'>
            <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <input type='text' value={search} onChange={change(setSearch)} placeholder='Search by station, location or remarks...' className={`${filterBox} pl-9`} />
          </div>
          <Select value={station} onChange={change(setStation)} className={filterBox}>
            <option value=''>All Stations</option>
            {(stations.data ?? []).map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select value={entryStatus} onChange={change(setEntryStatus)} className={filterBox}>
            <option value=''>All Status</option>
            {(options.data?.entryStatuses ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select value={weatherCondition} onChange={change(setWeatherCondition)} className={filterBox}>
            <option value=''>All Conditions</option>
            {(options.data?.weatherConditions ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className='mt-3 flex flex-col gap-3 lg:flex-row lg:items-end'>
          <div className='grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-xl'>
            <div>
              <label className={labelClass}>Date From</label>
              <input type='date' value={dateFrom} max={dateTo || undefined} onChange={change(setDateFrom)} className={filterBox} />
            </div>
            <div>
              <label className={labelClass}>Date To</label>
              <input type='date' value={dateTo} min={dateFrom || undefined} onChange={change(setDateTo)} className={filterBox} />
            </div>
          </div>
          <button
            type='button'
            onClick={reset}
            disabled={!filtered}
            className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 lg:ml-auto'
          >
            <RotateCcw className='h-4 w-4' />
            Reset
          </button>
        </div>

        {/* TABLE */}

        <div className='mt-4 overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead>
              <tr className='bg-slate-50 text-slate-800'>
                {columns.map((column) => (
                  <th key={column.key} className={`px-2.5 py-3 font-bold ${column.center ? "text-center" : ""}`}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='divide-y divide-slate-100'>
              {list.loading && !list.data ? (
                <TableSkeleton rows={6} columns={columns.length} />
              ) : list.error ? (
                <tr>
                  <td colSpan={columns.length} className='p-4'>
                    <ErrorState message={list.error.message} onRetry={list.reload} />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <EmptyRow columns={columns.length} message='No weather entries found' />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className='hover:bg-slate-50/60'>
                    <td className='px-2.5 py-3'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='whitespace-nowrap px-2.5 py-3'>{dateText(row.entryDate)}</td>
                    <td className='px-2.5 py-3 font-semibold text-slate-900'>{row.stationName}</td>
                    <td className='px-2.5 py-3 text-center'>{number(row.totalRainfall)}</td>
                    <td className='whitespace-nowrap px-2.5 py-3 text-center'>
                      {number(row.maxTemperature)} / {number(row.minTemperature)}
                    </td>
                    <td className='px-2.5 py-3 text-center'>{number(row.avgHumidity)}</td>
                    <td className='px-2.5 py-3'>{row.weatherConditionLabel ?? "-"}</td>
                    <td className='px-2.5 py-3 text-center'>
                      <PendingBadge row={row} />
                      <span className={`inline-block whitespace-nowrap rounded px-2.5 py-1 text-xs font-semibold ${weatherEntriesData.statusBadge[row.entryStatus] ?? weatherEntriesData.statusBadge.DRAFT}`}>{row.entryStatusLabel}</span>
                    </td>
                    <td className='px-2.5 py-3'>{row.createdByName ?? "-"}</td>
                    <td className='px-2.5 py-3'>
                      <div className='flex justify-center gap-1.5'>
                        <button type='button' title='History' onClick={() => setHistoryOf(row)} className={`${iconButton} border-blue-200 text-blue-600 hover:bg-blue-50`}>
                          <History className='h-4 w-4' />
                        </button>
                        <button
                          type='button'
                          title={waitingTitle(row, "Edit")}
                          disabled={Boolean(row.pendingRequest)}
                          onClick={() => navigate(`${weatherEntriesData.addPath}?id=${row.id}`)}
                          className={`${iconButton} border-emerald-200 text-emerald-700 hover:bg-emerald-50`}
                        >
                          <Pencil className='h-4 w-4' />
                        </button>
                        <button
                          type='button'
                          title={waitingTitle(row, "Delete")}
                          disabled={Boolean(row.pendingRequest)}
                          onClick={() => setDeleting(row)}
                          className={`${iconButton} border-red-200 text-red-500 hover:bg-red-50`}
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm font-semibold text-slate-700'>
            Showing {from} to {to} of {total} entries
          </p>
          <div className='flex items-center gap-1'>
            <button type='button' aria-label='First page' disabled={page <= 1} onClick={() => setPage(1)} className={pageButton}>
              <ChevronsLeft className='h-4 w-4' />
            </button>
            <button type='button' aria-label='Previous page' disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className={pageButton}>
              <ChevronLeft className='h-4 w-4' />
            </button>
            <span className='flex h-9 min-w-9 items-center justify-center rounded-md bg-emerald-800 px-3 text-sm font-semibold text-white'>{page}</span>
            <button type='button' aria-label='Next page' disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} className={pageButton}>
              <ChevronRight className='h-4 w-4' />
            </button>
            <button type='button' aria-label='Last page' disabled={page >= totalPages} onClick={() => setPage(totalPages)} className={pageButton}>
              <ChevronsRight className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          HISTORY POPUP
      ====================================================== */}

      {historyOf && (
        <div className='fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6' onMouseDown={(event) => event.target === event.currentTarget && setHistoryOf(null)}>
          <div role='dialog' aria-modal='true' className='w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl'>
            <div className='flex items-center justify-between bg-emerald-800 px-5 py-3.5 text-white'>
              <h2 className='flex items-center gap-2 text-lg font-bold'>
                <History className='h-5 w-5' />
                Entry History – {dateText(historyOf.entryDate)}, {historyOf.stationName}
              </h2>
              <button type='button' onClick={() => setHistoryOf(null)} aria-label='Close' title='Close' className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/15'>
                <X className='h-5 w-5' />
              </button>
            </div>
            <div className='max-h-[70vh] overflow-auto p-5'>
              {history.error ? (
                <ErrorState message={history.error.message} onRetry={history.reload} />
              ) : (
                <table className='w-full text-left text-sm'>
                  <thead>
                    <tr className='bg-slate-50 text-slate-800'>
                      <th className='px-2.5 py-2.5 font-bold'>When</th>
                      <th className='px-2.5 py-2.5 font-bold'>Action</th>
                      <th className='px-2.5 py-2.5 font-bold'>Changed By</th>
                      <th className='px-2.5 py-2.5 font-bold'>Approval</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-100'>
                    {history.loading && !history.data ? (
                      <TableSkeleton rows={3} columns={4} />
                    ) : (history.data ?? []).length === 0 ? (
                      <EmptyRow columns={4} message='No history yet' />
                    ) : (
                      history.data.map((item, index) => (
                        <tr key={`${item.changedAt}-${index}`}>
                          <td className='whitespace-nowrap px-2.5 py-2.5'>{when(item.changedAt)}</td>
                          <td className='px-2.5 py-2.5'>{weatherEntriesData.actions[item.action] ?? item.action}</td>
                          <td className='px-2.5 py-2.5'>{item.changedBy?.name ?? "-"}</td>
                          <td className='px-2.5 py-2.5'>{item.approval ? `${item.approval.requestNo}${item.approval.approvedBy ? ` – ${item.approval.approvedBy.name}` : ""}` : "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete the entry of ${dateText(deleting?.entryDate)}?`}
        message='A submitted entry is sent for approval first when approval is on.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default WeatherEntries;
