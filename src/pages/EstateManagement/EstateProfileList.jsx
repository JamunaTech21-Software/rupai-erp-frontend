import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Pencil, Plus, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Select from "../../components/common/Select";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { estateProfileData } from "../../data/EstateManagementData/estateProfileData";

const PER_PAGE = 10;
const HEADERS = ["SL", "Estate Code", "Estate Name", "Short Name", "Location", "Total Area (Acre)", "Plucking Area (Acre)", "Status", "Actions"];
const STATUSES = ["Active", "Inactive"];

// Search boxes wait a moment after typing before asking the server.
const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const orDash = (value) => (value === null || value === undefined || value === "" ? "-" : value);
const acres = (value) => (value === null || value === undefined ? "-" : Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 }));
const twoDecimals = (value) => (value === null || value === undefined ? "-" : Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

const filterClass = "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600";

const EstateProfileList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [estateType, setEstateType] = useState("");
  const [estateCategory, setEstateCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const searchText = useDebounced(search);
  useEffect(() => setPage(1), [searchText, status, estateType, estateCategory, district]);

  const filters = { search: searchText, status, estateType, estateCategory, district };
  const estates = useApi(
    () => api.get("/estates", { ...filters, page, perPage: PER_PAGE }),
    [searchText, status, estateType, estateCategory, district, page],
  );
  const rows = estates.data?.data ?? [];
  const meta = estates.data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;

  // The District filter lists the districts the estates are in.
  const allEstates = useApi(() => api.get("/estates", { perPage: 100 }), []);
  const districts = useMemo(
    () => [...new Set((allEstates.data?.data ?? []).map((estate) => estate.district).filter(Boolean))].sort(),
    [allEstates.data],
  );

  const hasFilters = Boolean(search || status || estateType || estateCategory || district);
  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setEstateType("");
    setEstateCategory("");
    setDistrict("");
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/estates/export", { ...filters, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `estates-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      await api.del(`/estates/${deleting.id}`);
      toast.success("Estate deleted successfully!");
      setDeleting(null);
      // The last row of a page went: step back one page.
      if (rows.length === 1 && page > 1) setPage(page - 1);
      else estates.reload();
      allEstates.reload();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteBusy(false);
    }
  };

  const pageButton = "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className='space-y-6'>
      <EstateManagementTabs />

      <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
        {/* Header */}
        <div className='flex flex-col gap-3 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
          <h2 className='text-lg font-semibold text-green-800'>Estate Profile List</h2>
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
              onClick={() => navigate("/estate-profile")}
              className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition hover:bg-green-800'
            >
              <Plus size={16} />
              Add New Estate
            </button>
          </div>
        </div>

        {/* Search + filters */}
        <div className='grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:px-5 lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))_auto]'>
          <div className='relative sm:col-span-2 lg:col-span-1'>
            <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder='Search by Estate Code, Estate Name or Location...'
              className={`${filterClass} pl-9`}
            />
          </div>
          <Select value={status} onChange={(event) => setStatus(event.target.value)} className={filterClass}>
            <option value=''>All Status</option>
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select value={estateType} onChange={(event) => setEstateType(event.target.value)} className={filterClass}>
            <option value=''>All Estate Types</option>
            {estateProfileData.estateTypes.map((item) => (
              <option key={item.id} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
          <Select value={estateCategory} onChange={(event) => setEstateCategory(event.target.value)} className={filterClass}>
            <option value=''>All Categories</option>
            {estateProfileData.estateCategories.map((item) => (
              <option key={item.id} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
          <Select value={district} onChange={(event) => setDistrict(event.target.value)} className={filterClass}>
            <option value=''>All Districts</option>
            {districts.map((item) => (
              <option key={item} value={item}>
                {item}
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
          <table className='w-full min-w-225 border-collapse text-sm'>
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
              {estates.loading && !estates.data ? (
                <TableSkeleton rows={5} columns={HEADERS.length} />
              ) : estates.error ? (
                <tr>
                  <td colSpan={HEADERS.length} className='p-4'>
                    <ErrorState message={estates.error.message} onRetry={estates.reload} />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <EmptyRow columns={HEADERS.length} message='No estates found' />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className='border-b border-gray-200 transition hover:bg-green-50/40'>
                    <td className='px-3 py-3 text-center text-gray-700'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{orDash(row.estateCode)}</td>
                    <td className='px-3 py-3 text-left font-medium text-gray-800'>{orDash(row.estateName)}</td>
                    <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{orDash(row.shortName)}</td>
                    <td className='px-3 py-3 text-left text-gray-700'>{orDash(row.address)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{acres(row.totalLandArea)}</td>
                    <td className='px-3 py-3 text-right text-gray-700'>{twoDecimals(row.teaArea)}</td>
                    <td className='px-3 py-3 text-center'>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          row.status === "Inactive" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {row.status ?? "Active"}
                      </span>
                    </td>
                    <td className='px-3 py-3'>
                      <div className='flex items-center justify-center gap-1'>
                        <button
                          type='button'
                          title='Edit'
                          onClick={() => navigate(`/estate-profile?id=${row.id}`)}
                          className='cursor-pointer rounded-md p-2 text-blue-600 transition hover:bg-blue-100'
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type='button'
                          title='Delete'
                          onClick={() => setDeleting(row)}
                          className='cursor-pointer rounded-md p-2 text-red-600 transition hover:bg-red-100'
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
        title='Delete estate?'
        message={`${deleting?.estateName ?? "This estate"} will be removed from the list.`}
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default EstateProfileList;
