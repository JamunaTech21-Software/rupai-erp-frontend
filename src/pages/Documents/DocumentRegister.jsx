import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Clock, Eye, FileSpreadsheet, FileText, Hourglass, MinusCircle, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";
import DocumentForm from "./DocumentForm";

const PER_PAGE = 10;
const COLUMNS = ["SL", "Document Name", "Category", "Type", "Document No.", "Issuing Authority", "Issue Date", "Expiry Date", "Days Left", "Status", "Action"];
const CENTERED = ["Days Left", "Status", "Action"];
const STATUS_VALUES = ["ACTIVE", "EXPIRING_SOON", "EXPIRED", "INACTIVE"];

const CARDS = [
  { key: "totalDocuments", label: "Total Documents", icon: FileText, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600" },
  { key: "active", label: "Active", icon: CheckCircle2, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600" },
  { key: "expiringSoon", label: "Expiring Soon", icon: Clock, tint: "from-amber-50 to-white border-amber-100", badge: "bg-amber-100 text-amber-600" },
  { key: "expired", label: "Expired", icon: AlertTriangle, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500" },
  { key: "inactive", label: "Inactive", icon: MinusCircle, tint: "from-slate-50 to-white border-slate-200", badge: "bg-slate-100 text-slate-500" },
  { key: "pendingApproval", label: "Pending Approval", icon: Hourglass, tint: "from-violet-50 to-white border-violet-100", badge: "bg-violet-100 text-violet-600" },
];

const STATUS_STYLE = {
  ACTIVE: "bg-emerald-100 text-emerald-700",
  EXPIRING_SOON: "bg-amber-100 text-amber-700",
  EXPIRED: "bg-red-100 text-red-700",
  INACTIVE: "bg-slate-100 text-slate-600",
};
// The Days Left colours come from the server's level (red up to 15 days, amber up to 45, green above).
const LEVEL_STYLE = { danger: "bg-red-100 text-red-700", warning: "bg-amber-100 text-amber-700", ok: "bg-emerald-100 text-emerald-700" };

const labelClass = "mb-1.5 block text-xs font-semibold text-slate-600";
const filterBox = "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600";

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

// "?status=expiring" (the dashboard's View All links), "expiring-soon" and "EXPIRING_SOON" all mean the same filter.
const statusFromUrl = (raw) => {
  const key = String(raw ?? "").trim().toUpperCase().replace(/[\s-]+/g, "_");
  if (key === "EXPIRING") return "EXPIRING_SOON";
  return STATUS_VALUES.includes(key) ? key : "";
};
const dateText = (value) => (value ? String(value).slice(0, 10) : "-");

function Detail({ label, children }) {
  return (
    <div>
      <p className='text-xs font-semibold text-slate-500'>{label}</p>
      <div className='mt-0.5 break-words text-sm text-slate-800'>{children || "-"}</div>
    </div>
  );
}

const DocumentRegister = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState(() => statusFromUrl(searchParams.get("status")));
  const [expiryFrom, setExpiryFrom] = useState("");
  const [expiryTo, setExpiryTo] = useState("");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(null); // null = closed, "new", or the document being edited
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);

  const searchText = useDebounced(search.trim());

  // =========================================================
  // DATA
  // =========================================================

  const filterOptions = useApi(() => api.get("/documents/filter-options"), []);
  const categories = useApi(() => api.get("/options/document-categories"), []);
  const types = useApi(() => api.get("/options/document-types", category ? { category } : undefined), [category]);
  const params = { search: searchText, category, type, status, expiryFrom, expiryTo };
  const list = useApi(() => api.get("/documents", { ...params, page, perPage: PER_PAGE }), [searchText, category, type, status, expiryFrom, expiryTo, page]);
  const summary = useApi(() => api.get("/documents/summary", params), [searchText, category, type, status, expiryFrom, expiryTo]);
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;
  const statuses = filterOptions.data?.statuses ?? [];
  const stats = summary.data;

  // The cards follow the list: a change approved elsewhere shows in both.
  useEffect(() => {
    if (list.data) summary.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.data]);

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  const change = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };

  const closeForm = () => setForm(null);
  const saved = () => {
    closeForm();
    list.reload();
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/documents/export", { ...params, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `document-register-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/documents/${deleting.id}`);
      notifySaved(result, "Document deleted successfully!");
      setDeleting(null);
      list.reload();
    } catch (error) {
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const pageButton = "flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";
  const iconButton = "cursor-pointer rounded-md border p-2 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className='w-full space-y-4'>
      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6'>
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className={`flex items-center gap-3 rounded-xl border bg-gradient-to-r p-4 shadow-sm ${card.tint}`}>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${card.badge}`}>
                <Icon className='h-6 w-6' />
              </div>
              <div>
                <p className='text-sm font-semibold text-slate-700'>{card.label}</p>
                <p className='text-2xl font-bold text-slate-900'>{stats ? stats[card.key] : <span className='inline-block h-7 w-10 animate-pulse rounded bg-slate-200 align-middle' />}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          FILTERS + TABLE
      ====================================================== */}

      <div className='rounded-lg bg-white p-4 shadow-sm'>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          <div className='relative sm:col-span-2 xl:col-span-1'>
            <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <input
              type='text'
              value={search}
              onChange={change(setSearch)}
              placeholder='Search by name, number or authority...'
              className={`${filterBox} pl-9`}
            />
          </div>
          <Select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setType("");
              setPage(1);
            }}
            className={filterBox}
          >
            <option value=''>All Categories</option>
            {(categories.data ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select value={type} onChange={change(setType)} className={filterBox}>
            <option value=''>All Types</option>
            {(types.data ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select value={status} onChange={change(setStatus)} className={filterBox}>
            <option value=''>All Status</option>
            {statuses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className='mt-3 flex flex-col gap-3 lg:flex-row lg:items-end'>
          <div className='grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-xl'>
            <div>
              <label className={labelClass}>Expiry From</label>
              <input type='date' value={expiryFrom} onChange={change(setExpiryFrom)} className={filterBox} />
            </div>
            <div>
              <label className={labelClass}>Expiry To</label>
              <input type='date' value={expiryTo} onChange={change(setExpiryTo)} className={filterBox} />
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row lg:ml-auto'>
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
              onClick={() => setForm("new")}
              className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-6 text-sm font-semibold text-white hover:bg-emerald-900'
            >
              <Plus className='h-4 w-4' />
              Add New Document
            </button>
          </div>
        </div>

        <div className='mt-4 overflow-x-auto'>
          <table className='w-full min-w-[1250px] text-left text-sm'>
            <thead>
              <tr className='bg-slate-50 text-slate-800'>
                {COLUMNS.map((column) => (
                  <th key={column} className={`px-3 py-3 font-bold ${CENTERED.includes(column) ? "text-center" : ""}`}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='divide-y divide-slate-100'>
              {list.loading && !list.data ? (
                <TableSkeleton rows={6} columns={COLUMNS.length} />
              ) : list.error ? (
                <tr>
                  <td colSpan={COLUMNS.length} className='p-4'>
                    <ErrorState message={list.error.message} onRetry={list.reload} />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <EmptyRow columns={COLUMNS.length} message='No documents found' />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className='hover:bg-slate-50/60'>
                    <td className='px-3 py-3'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='px-3 py-3 font-semibold text-slate-900'>{row.documentName}</td>
                    <td className='px-3 py-3 text-slate-700'>{row.categoryName}</td>
                    <td className='px-3 py-3 text-slate-700'>{row.typeName}</td>
                    <td className='px-3 py-3 text-slate-700'>{row.documentNo}</td>
                    <td className='px-3 py-3 text-slate-600'>{row.issuingAuthority ?? "-"}</td>
                    <td className='whitespace-nowrap px-3 py-3'>{dateText(row.issueDate)}</td>
                    <td className='whitespace-nowrap px-3 py-3'>{dateText(row.expiryDate)}</td>
                    <td className='px-3 py-3 text-center'>
                      {row.daysLeftLabel ? (
                        <span className={`inline-block whitespace-nowrap rounded px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLE[row.daysLeftLevel] ?? LEVEL_STYLE.ok}`}>{row.daysLeftLabel}</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className='px-3 py-3 text-center'>
                      <PendingBadge row={row} />
                      <span className={`inline-block whitespace-nowrap rounded px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[row.status] ?? STATUS_STYLE.ACTIVE}`}>{row.statusLabel}</span>
                    </td>
                    <td className='px-3 py-3'>
                      <div className='flex justify-center gap-2'>
                        <button type='button' title='View' onClick={() => setViewing(row)} className={`${iconButton} border-blue-200 text-blue-600 hover:bg-blue-50`}>
                          <Eye className='h-4 w-4' />
                        </button>
                        <button
                          type='button'
                          title={waitingTitle(row, "Edit")}
                          disabled={Boolean(row.pendingRequest)}
                          onClick={() => setForm(row)}
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
          ADD / EDIT POPUP (the Add New Document form)
      ====================================================== */}

      {form && <DocumentForm popup document={form === "new" ? null : form} onSaved={saved} onClose={closeForm} />}

      {/* =====================================================
          VIEW POPUP
      ====================================================== */}

      {viewing && (
        <div className='fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6' onMouseDown={(event) => event.target === event.currentTarget && setViewing(null)}>
          <div role='dialog' aria-modal='true' className='w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl'>
            <div className='flex items-center justify-between bg-emerald-800 px-5 py-3.5 text-white'>
              <h2 className='flex items-center gap-2 text-lg font-bold'>
                <FileText className='h-5 w-5' />
                Document Details
              </h2>
              <button type='button' onClick={() => setViewing(null)} aria-label='Close' title='Close' className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/15'>
                <X className='h-5 w-5' />
              </button>
            </div>
            <div className='max-h-[75vh] overflow-y-auto p-5'>
              <div className='flex flex-wrap items-center gap-2'>
                <h3 className='text-base font-bold text-slate-900'>{viewing.documentName}</h3>
                <span className={`rounded px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[viewing.status] ?? STATUS_STYLE.ACTIVE}`}>{viewing.statusLabel}</span>
                {viewing.daysLeftLabel && <span className={`rounded px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLE[viewing.daysLeftLevel] ?? LEVEL_STYLE.ok}`}>{viewing.daysLeftLabel}</span>}
              </div>
              <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <Detail label='Document Category'>{viewing.categoryName}</Detail>
                <Detail label='Document Type'>{viewing.typeName}</Detail>
                <Detail label='Document No.'>{viewing.documentNo}</Detail>
                <Detail label='Issuing Authority'>{viewing.issuingAuthority}</Detail>
                <Detail label='Issue Date'>{dateText(viewing.issueDate)}</Detail>
                <Detail label='Expiry Date'>{dateText(viewing.expiryDate)}</Detail>
                <Detail label='Validity Period (Months)'>{viewing.validityMonths}</Detail>
                <Detail label='Renewal Required'>{viewing.renewalRequired ? "Yes" : "No"}</Detail>
                <Detail label='Reminder Settings'>{viewing.reminderSettingLabel}</Detail>
                <Detail label='Set as Active'>{viewing.isActive ? "Yes" : "No"}</Detail>
              </div>
              <div className='mt-4'>
                <Detail label='Description / Remarks'>{viewing.remarks}</Detail>
              </div>
              <div className='mt-4'>
                <p className='text-xs font-semibold text-slate-500'>Attachment</p>
                {viewing.attachmentUrl ? (
                  <a href={viewing.attachmentUrl} target='_blank' rel='noreferrer' className='mt-1 inline-flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100'>
                    <Eye className='h-4 w-4' />
                    {viewing.attachmentName ?? "Open attachment"}
                  </a>
                ) : (
                  <p className='mt-0.5 text-sm text-slate-800'>-</p>
                )}
              </div>
            </div>
            <div className='flex justify-end border-t border-slate-200 px-5 py-4'>
              <button type='button' onClick={() => setViewing(null)} className='flex h-11 cursor-pointer items-center justify-center rounded-md border border-slate-300 px-7 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.documentName ?? "document"}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default DocumentRegister;
