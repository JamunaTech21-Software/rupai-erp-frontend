import { useEffect, useState } from "react";
import { useForm } from "../../lib/useForm";
import toast from "react-hot-toast";
import { CheckCircle2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileSpreadsheet, Landmark, Pencil, Plus, Save, Search, Trash2, X, XCircle } from "lucide-react";
import MasterDataTabs from "./MasterDataTabs";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";

// One Master Data setup page for a list of records that have a Code, a Name, a Short Name and a Status
// (Association Setup, Regulatory Authority Setup). The page is told which API path and words to use.
//
// config: { path, noun, plural, codeLabel, nameLabel, totalLabel, codeKey, nameKey, totalKey, usage: [{ key, label }], codeExample, nameExample }
const PER_PAGE = 10;
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";
const boxClass = (error) => `h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:border-emerald-600 ${error ? "border-red-500" : "border-slate-300"}`;

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const CodeNameSetup = ({ config }) => {
  const { path, noun, plural, codeLabel, nameLabel, totalLabel, codeKey, nameKey, totalKey, usage = [], codeExample, nameExample } = config;
  const lower = noun.toLowerCase();
  const EMPTY_FORM = { [codeKey]: "", [nameKey]: "", shortName: "", status: "ACTIVE" };
  const FORM_KEYS = Object.keys(EMPTY_FORM);
  const columns = ["SL", "Code", nameLabel, "Short Name", ...usage.map((item) => item.label), "Status", "Action"];
  const centered = [...usage.map((item) => item.label), "Status", "Action"];
  const cards = [
    { key: totalKey, label: totalLabel, icon: Landmark, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600" },
    { key: "active", label: "Active", icon: CheckCircle2, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600" },
    { key: "inactive", label: "Inactive", icon: XCircle, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500" },
  ];

  const [formOpen, setFormOpen] = useState(false); // the Add / Edit popup
  const [editing, setEditing] = useState(null); // the record in the popup; none = a new one
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);

  const searchText = useDebounced(search.trim());

  // =========================================================
  // DATA
  // =========================================================

  const options = useApi(() => api.get(`${path}/filter-options`), [path]);
  const summary = useApi(() => api.get(`${path}/summary`, { search: searchText, status }), [path, searchText, status]);
  const params = { search: searchText, status };
  const list = useApi(() => api.get(path, { ...params, page, perPage: PER_PAGE }), [path, searchText, status, page]);
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;
  const statuses = options.data?.statuses ?? [];

  // The cards follow the list: a change approved elsewhere shows in both.
  useEffect(() => {
    if (list.data) summary.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.data]);

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  // =========================================================
  // FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  const openNew = () => {
    setEditing(null);
    reset(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    reset({ [codeKey]: row[codeKey] ?? "", [nameKey]: row[nameKey] ?? "", shortName: row.shortName ?? "", status: row.status ?? "ACTIVE" });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    reset(EMPTY_FORM);
  };

  const onSubmit = async (values) => {
    const shortName = values.shortName.trim();
    const body = {
      [codeKey]: values[codeKey].trim(),
      [nameKey]: values[nameKey].trim(),
      shortName: shortName === "" ? null : shortName,
      status: values.status,
    };
    try {
      const result = editing ? await api.put(`${path}/${editing.id}`, body) : await api.post(path, body);
      notifySaved(result, editing ? `${noun} updated successfully!` : `${noun} saved successfully!`);
      closeForm();
      if (!editing) setPage(1);
      list.reload();
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      for (const [key, message] of Object.entries(fields)) {
        if (FORM_KEYS.includes(key)) setError(key, { message });
        else unplaced = true;
      }
      // e.g. "There are no changes to save."
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download(`${path}/export`, { ...params, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${path.replace("/", "")}-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`${path}/${deleting.id}`);
      notifySaved(result, `${noun} deleted successfully!`);
      setDeleting(null);
      list.reload();
    } catch (error) {
      // e.g. "This association is used by 1 auction center and 1 broker."
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const waiting = editing ? (rows.find((item) => item.id === editing.id)?.pendingRequest ?? editing.pendingRequest) : null;
  const pageButton = "flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";
  const stats = summary.data;

  return (
    <div className='w-full space-y-4'>
      <MasterDataTabs />

      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className={`flex items-center gap-4 rounded-xl border bg-gradient-to-r p-5 shadow-sm ${card.tint}`}>
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${card.badge}`}>
                <Icon className='h-7 w-7' />
              </div>
              <div>
                <p className='text-sm font-semibold text-slate-700'>{card.label}</p>
                <p className='text-3xl font-bold text-slate-900'>{stats ? stats[card.key] : <span className='inline-block h-8 w-12 animate-pulse rounded bg-slate-200 align-middle' />}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          TOOLBAR + TABLE
      ====================================================== */}

      <div className='rounded-lg bg-white p-4 shadow-sm'>
        <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
          <div className='relative flex-1'>
            <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <input
              type='text'
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder={`Search by Code, ${nameLabel} or Short Name...`}
              className='h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-600'
            />
          </div>

          <Select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className='h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm lg:w-48'
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
            onClick={exportList}
            disabled={exporting}
            className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-emerald-600 bg-white px-6 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60'
          >
            <FileSpreadsheet className='h-4 w-4' />
            {exporting ? "Exporting..." : "Export"}
          </button>

          <button
            type='button'
            onClick={openNew}
            className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-6 text-sm font-semibold text-white hover:bg-emerald-900'
          >
            <Plus className='h-4 w-4' />
            Add New {noun}
          </button>
        </div>

        <div className='mt-4 overflow-x-auto'>
          <table className='w-full min-w-[820px] text-left text-sm'>
            <thead>
              <tr className='bg-slate-50 text-slate-800'>
                {columns.map((column) => (
                  <th key={column} className={`px-3 py-3 font-bold ${centered.includes(column) ? "text-center" : ""}`}>
                    {column}
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
                <EmptyRow columns={columns.length} message={`No ${plural} found`} />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className='hover:bg-slate-50/60'>
                    <td className='px-3 py-3'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='px-3 py-3 font-semibold text-slate-700'>{row[codeKey]}</td>
                    <td className='px-3 py-3 font-semibold text-slate-900'>{row[nameKey]}</td>
                    <td className='px-3 py-3 text-slate-600'>{row.shortName ?? "-"}</td>
                    {usage.map((item) => (
                      <td key={item.key} className='px-3 py-3 text-center'>
                        {row[item.key] ?? 0}
                      </td>
                    ))}
                    <td className='px-3 py-3 text-center'>
                      <PendingBadge row={row} />
                      <span className={`inline-block rounded px-3 py-1 text-xs font-semibold ${row.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{row.statusLabel}</span>
                    </td>
                    <td className='px-3 py-3'>
                      <div className='flex justify-center gap-2'>
                        <button
                          type='button'
                          title={waitingTitle(row, "Edit")}
                          disabled={Boolean(row.pendingRequest)}
                          onClick={() => openEdit(row)}
                          className='cursor-pointer rounded-md border border-emerald-200 p-2 text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                        >
                          <Pencil className='h-4 w-4' />
                        </button>
                        <button
                          type='button'
                          title={waitingTitle(row, "Delete")}
                          disabled={Boolean(row.pendingRequest)}
                          onClick={() => setDeleting(row)}
                          className='cursor-pointer rounded-md border border-red-200 p-2 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
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
          ADD / EDIT POPUP
      ====================================================== */}

      {formOpen && (
        <div
          className='fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6'
          onMouseDown={(event) => event.target === event.currentTarget && closeForm()}
        >
          <form onSubmit={handleSubmit(onSubmit)} role='dialog' aria-modal='true' className='w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl'>
            <div className='flex items-center justify-between bg-emerald-800 px-5 py-3.5 text-white'>
              <h2 className='flex items-center gap-2 text-lg font-bold'>
                <Landmark className='h-5 w-5' />
                {editing ? `Edit ${noun}` : `Add New ${noun}`}
              </h2>
              <button type='button' onClick={closeForm} aria-label='Close' title='Close' className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/15'>
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='max-h-[75vh] overflow-y-auto p-5'>
              {waiting && (
                <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700'>
                  Waiting for approval ({waiting.requestNo}). This {lower} cannot be saved until the request is decided.
                </p>
              )}

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className={labelClass}>
                    {codeLabel} <span className='text-red-500'>*</span>
                  </label>
                  <input type='text' maxLength={20} placeholder={`e.g. ${codeExample}`} {...register(codeKey, { required: `${codeLabel} is required` })} className={boxClass(errors[codeKey])} />
                  {errors[codeKey] && <p className='mt-1 text-xs text-red-500'>{errors[codeKey].message}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    {nameLabel} <span className='text-red-500'>*</span>
                  </label>
                  <input type='text' maxLength={160} placeholder={`e.g. ${nameExample}`} {...register(nameKey, { required: `${nameLabel} is required` })} className={boxClass(errors[nameKey])} />
                  {errors[nameKey] && <p className='mt-1 text-xs text-red-500'>{errors[nameKey].message}</p>}
                </div>
              </div>

              <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className={labelClass}>Short Name</label>
                  <input type='text' maxLength={50} placeholder='Optional' {...register("shortName")} className={boxClass(errors.shortName)} />
                  {errors.shortName && <p className='mt-1 text-xs text-red-500'>{errors.shortName.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    Status <span className='text-red-500'>*</span>
                  </label>
                  <Select {...register("status", { required: "Status is required" })} className={`${boxClass(errors.status)} cursor-pointer`}>
                    {statuses.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {errors.status && <p className='mt-1 text-xs text-red-500'>{errors.status.message}</p>}
                </div>
              </div>
            </div>

            <div className='flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end'>
              <button type='button' onClick={closeForm} className='flex h-11 cursor-pointer items-center justify-center rounded-md border border-slate-300 px-7 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting || Boolean(waiting)}
                className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-7 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60'
              >
                <Save className='h-4 w-4' />
                {isSubmitting ? "Saving..." : editing ? `Update ${noun}` : `Save ${noun}`}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.[nameKey] ?? lower}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default CodeNameSetup;
