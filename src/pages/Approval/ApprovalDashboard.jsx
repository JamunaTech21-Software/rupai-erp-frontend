import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Eye,
  Factory,
  FileText,
  FileSpreadsheet,
  Hourglass,
  Layers,
  Leaf,
  Pencil,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Sprout,
  Trash2,
  Users,
  X,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import Select from "../../components/common/Select";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { RejectDialog, RequestDetailsModal } from "../../components/Approval/ApprovalModals";
import ApprovalSettingsModal from "../../components/Approval/ApprovalSettingsModal";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";

const PER_PAGE = 10;
const MODULE_ICONS = {
  estate: Building2,
  plantation: Sprout,
  hr: Users,
  production: Leaf,
  factory: Factory,
  sales: ShoppingCart,
  inventory: FileText,
  reports: BarChart3,
  system: Settings,
};
const ACTIONS = [
  { value: "entry", label: "Entry" },
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
  { value: "restore", label: "Restore" },
];
const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];
const ACTION_STYLE = {
  Entry: { className: "bg-green-100 text-green-700", Icon: Plus },
  Edit: { className: "bg-blue-100 text-blue-700", Icon: Pencil },
  Delete: { className: "bg-red-100 text-red-700", Icon: Trash2 },
  Restore: { className: "bg-purple-100 text-purple-700", Icon: Check },
};
const STATUS_STYLE = {
  Pending: { className: "bg-amber-100 text-amber-700", Icon: Clock },
  Approved: { className: "bg-green-100 text-green-700", Icon: CheckCircle2 },
  Rejected: { className: "bg-red-100 text-red-700", Icon: XCircle },
};
const HEADERS = ["SL", "Request ID", "Module", "Record Details", "Action", "Requested By", "Requested On", "Status", "Action"];

// dd/MM/yyyy hh:mm a in the viewer's local time.
const formatDateTime = (iso) => {
  if (!iso) return "-";
  const date = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  const hours = date.getHours();
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(hours % 12 || 12)}:${pad(date.getMinutes())} ${hours >= 12 ? "PM" : "AM"}`;
};

const selectClass = "h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600";

const ApprovalDashboard = () => {
  // Top: module tab, date range and status; the table below has its own search, action and status.
  const [module, setModule] = useState("");
  const tabsRef = useRef(null);

  // Keep the active module tab in view, whichever control changed it (a tab or a module card).
  useEffect(() => {
    const row = tabsRef.current;
    const active = row?.querySelector("[data-active]");
    if (!row || !active) return;
    const left = active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [module]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [summaryStatus, setSummaryStatus] = useState("");
  const [draftSearch, setDraftSearch] = useState("");
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [module, from, to, search, action, status]);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [approving, setApproving] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [busy, setBusy] = useState(false);
  const [exporting, setExporting] = useState(false);

  const modules = useApi(() => api.get("/options/approval-modules"), []);
  const summary = useApi(
    () => api.get("/approvals/summary", { module, from, to, status: summaryStatus }),
    [module, from, to, summaryStatus],
  );
  const requests = useApi(
    () => api.get("/approvals", { module, action, status, from, to, search, page, perPage: PER_PAGE }),
    [module, action, status, from, to, search, page],
  );
  const rows = requests.data?.data ?? [];
  const meta = requests.data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const showingFrom = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const showingTo = (page - 1) * PER_PAGE + rows.length;
  const counts = summary.data;

  const reloadAll = () => {
    requests.reload();
    summary.reload();
  };

  const approve = async () => {
    setBusy(true);
    try {
      await api.post(`/approvals/${approving.id}/approve`);
      toast.success(`${approving.requestNo} approved`);
      setApproving(null);
    } catch (error) {
      // e.g. "The record changed after this request was made."
      toast.error(error.message);
      setApproving(null);
    } finally {
      setBusy(false);
      reloadAll();
    }
  };

  const reject = async (reason) => {
    setBusy(true);
    try {
      await api.post(`/approvals/${rejecting.id}/reject`, reason ? { reason } : {});
      toast.success(`${rejecting.requestNo} rejected`);
      setRejecting(null);
    } catch (error) {
      toast.error(error.message);
      setRejecting(null);
    } finally {
      setBusy(false);
      reloadAll();
    }
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/approvals/export", { module, action, status: status || summaryStatus, from, to, search, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `approval-requests-${new Date().toISOString().slice(0, 10)}.xlsx`;
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

  const moduleTabs = modules.data ?? [];
  const statCards = [
    { label: "Pending Approval", value: counts?.pending, Icon: Hourglass, card: "border-amber-100 bg-amber-50", icon: "bg-amber-100 text-amber-600" },
    { label: "Approved", value: counts?.approved, Icon: Check, card: "border-green-100 bg-green-50", icon: "bg-green-100 text-green-600" },
    { label: "Rejected", value: counts?.rejected, Icon: X, card: "border-red-100 bg-red-50", icon: "bg-red-100 text-red-600" },
    { label: "Total Requests", value: counts?.total, Icon: FileText, card: "border-blue-100 bg-blue-50", icon: "bg-blue-100 text-blue-600" },
  ];
  const pageButton = "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";
  const number = (value) => (value === undefined || value === null ? "-" : Number(value).toLocaleString("en-US"));

  return (
    <div className='space-y-6'>
      {/* Module tabs */}
      <div className='flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm lg:flex-row lg:items-center'>
        <div
          ref={tabsRef}
          className='relative flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1'
          // Mouse wheel scrolls the tab row sideways (a plain wheel only scrolls vertically).
          onWheel={(event) => {
            if (event.deltaY && !event.deltaX) event.currentTarget.scrollLeft += event.deltaY;
          }}
        >
          {[{ value: "", label: "All Modules (Whole System)", Icon: Layers }, ...moduleTabs.map((item) => ({ ...item, Icon: MODULE_ICONS[item.value] ?? FileText }))].map((tab) => (
            <button
              key={tab.value || "all"}
              type='button'
              data-active={module === tab.value ? "true" : undefined}
              onClick={() => setModule(tab.value)}
              className={`flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-4 text-sm font-semibold transition-all duration-200 ${
                module === tab.value
                  ? "border-green-700 bg-green-800 text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-700 hover:border-green-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <tab.Icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
        <button
          type='button'
          onClick={() => setSettingsOpen(true)}
          className='flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-700 bg-white px-4 text-sm font-semibold text-green-700 transition hover:bg-green-50'
        >
          <Settings size={16} />
          Approval Settings
        </button>
      </div>

      {/* Cards */}
      {summary.error && !summary.data ? (
        <ErrorState message={summary.error.message} onRetry={summary.reload} />
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
          {statCards.map((card) => (
            <div key={card.label} className={`flex items-center gap-4 rounded-xl border p-4 shadow-sm ${card.card}`}>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${card.icon}`}>
                <card.Icon size={22} />
              </div>
              <div>
                <p className='text-sm font-medium text-gray-700'>{card.label}</p>
                <p className='min-h-9 text-3xl font-bold text-gray-800'>{number(card.value)}</p>
              </div>
            </div>
          ))}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:col-span-2 xl:col-span-1'>
            <p className='text-sm font-semibold text-gray-800'>Entry Action Summary</p>
            <div className='mt-3 flex flex-wrap gap-2 text-sm font-semibold'>
              <span className='rounded-md bg-green-100 px-2.5 py-1 text-green-700'>Entry: {number(counts?.actions?.entry)}</span>
              <span className='rounded-md bg-blue-100 px-2.5 py-1 text-blue-700'>Edit: {number(counts?.actions?.edit)}</span>
              <span className='rounded-md bg-red-100 px-2.5 py-1 text-red-700'>Delete: {number(counts?.actions?.delete)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Requests by module */}
      <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
        <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
          <h2 className='text-lg font-semibold text-green-800'>Approval Requests by Module (Whole ERP)</h2>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-[auto_auto_1fr_auto] sm:items-center'>
            <div className='flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3'>
              <CalendarDays size={16} className='shrink-0 text-gray-500' />
              <input
                type='date'
                value={from}
                max={to || undefined}
                onChange={(event) => setFrom(event.target.value)}
                aria-label='From date'
                className='h-10 w-full min-w-0 bg-transparent text-sm outline-none'
              />
              <span className='text-gray-400'>-</span>
              <input
                type='date'
                value={to}
                min={from || undefined}
                onChange={(event) => setTo(event.target.value)}
                aria-label='To date'
                className='h-10 w-full min-w-0 bg-transparent text-sm outline-none'
              />
            </div>
            <Select value={summaryStatus} onChange={(event) => setSummaryStatus(event.target.value)} className={`${selectClass} sm:w-40`}>
              <option value=''>All Status</option>
              {STATUSES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <span className='hidden sm:block' />
            <button
              type='button'
              onClick={exportList}
              disabled={exporting}
              className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-700 bg-white px-4 text-sm font-medium text-green-700 transition hover:bg-green-50 disabled:opacity-60'
            >
              <FileSpreadsheet size={16} />
              {exporting ? "Exporting..." : "Export"}
            </button>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-9'>
          {(counts?.modules ?? moduleTabs.map((item) => ({ key: item.value, label: item.label }))).map((item) => {
            const Icon = MODULE_ICONS[item.key] ?? FileText;
            return (
              <button
                key={item.key}
                type='button'
                onClick={() => setModule(item.key)}
                className={`flex min-h-20 cursor-pointer items-center gap-3 rounded-lg border bg-white p-3 text-left transition hover:border-green-600 hover:shadow-sm ${
                  module === item.key ? "border-green-700 ring-1 ring-green-700" : "border-gray-200"
                }`}
              >
                <Icon size={22} className='shrink-0 text-green-700' />
                <span className='min-w-0'>
                  <span className='block text-xs leading-tight text-gray-700'>{item.label}</span>
                  <span className='block min-h-6 text-lg font-bold text-gray-800'>{number(item.count)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Requests table */}
      <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
        <div className='flex flex-col gap-3 border-b border-gray-200 px-4 py-4 sm:px-5 xl:flex-row xl:items-center xl:justify-between'>
          <h2 className='text-lg font-semibold text-green-800'>
            Approval Requests <span className='font-normal text-gray-700'>(All Modules)</span>
          </h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSearch(draftSearch.trim());
            }}
            className='grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-[18rem_9rem_9rem_9rem_auto]'
          >
            <div className='relative sm:col-span-2 xl:col-span-1'>
              <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                value={draftSearch}
                onChange={(event) => setDraftSearch(event.target.value)}
                placeholder='Search by Request ID, Module, Record Details...'
                className={`${selectClass} pl-9`}
              />
            </div>
            <Select value={module} onChange={(event) => setModule(event.target.value)} className={selectClass}>
              <option value=''>All Modules</option>
              {moduleTabs.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Select value={action} onChange={(event) => setAction(event.target.value)} className={selectClass}>
              <option value=''>All Actions</option>
              {ACTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Select value={status} onChange={(event) => setStatus(event.target.value)} className={selectClass}>
              <option value=''>All Status</option>
              {STATUSES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <button
              type='submit'
              className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 text-sm font-medium text-white transition hover:bg-green-800'
            >
              <Search size={16} />
              Search
            </button>
          </form>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full min-w-280 border-collapse text-sm'>
            <thead className='bg-gray-100'>
              <tr>
                {HEADERS.map((header, index) => (
                  <th key={`${header}-${index}`} className='whitespace-nowrap border border-gray-200 px-3 py-3 text-center text-xs font-semibold text-gray-700'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.loading && !requests.data ? (
                <TableSkeleton rows={5} columns={HEADERS.length} />
              ) : requests.error ? (
                <tr>
                  <td colSpan={HEADERS.length} className='p-4'>
                    <ErrorState message={requests.error.message} onRetry={requests.reload} />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <EmptyRow columns={HEADERS.length} message='No approval requests found' />
              ) : (
                rows.map((row, index) => {
                  const actionStyle = ACTION_STYLE[row.action] ?? ACTION_STYLE.Entry;
                  const statusStyle = STATUS_STYLE[row.status] ?? STATUS_STYLE.Pending;
                  const pending = row.status === "Pending";
                  return (
                    <tr key={row.id} className='border-b border-gray-200 transition hover:bg-green-50/40'>
                      <td className='px-3 py-3 text-center text-gray-700'>{(page - 1) * PER_PAGE + index + 1}</td>
                      <td className='whitespace-nowrap px-3 py-3 text-center text-gray-700'>{row.requestNo}</td>
                      <td className='px-3 py-3 text-gray-700'>{row.moduleLabel}</td>
                      <td className='px-3 py-3 text-gray-800'>{row.recordDetails}</td>
                      <td className='px-3 py-3 text-center'>
                        <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold ${actionStyle.className}`}>
                          <actionStyle.Icon size={12} />
                          {row.action}
                        </span>
                      </td>
                      <td className='whitespace-nowrap px-3 py-3 text-gray-700'>{row.requestedBy?.name ?? "-"}</td>
                      <td className='whitespace-nowrap px-3 py-3 text-gray-700'>{formatDateTime(row.requestedAt)}</td>
                      <td className='px-3 py-3 text-center'>
                        <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.className}`}>
                          <statusStyle.Icon size={12} />
                          {row.status}
                        </span>
                        {row.error && <p className='mt-1 max-w-48 text-xs text-red-600'>{row.error}</p>}
                      </td>
                      <td className='px-3 py-3'>
                        <div className='flex items-center justify-center gap-2'>
                          {pending && (
                            <>
                              <button
                                type='button'
                                onClick={() => setApproving(row)}
                                className='flex cursor-pointer items-center gap-1 rounded-md border border-green-600 bg-white px-2.5 py-1 text-xs font-medium text-green-700 transition hover:bg-green-50'
                              >
                                <Check size={14} />
                                Approve
                              </button>
                              <button
                                type='button'
                                onClick={() => setRejecting(row)}
                                className='flex cursor-pointer items-center gap-1 rounded-md border border-red-500 bg-white px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50'
                              >
                                <X size={14} />
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            type='button'
                            title='View details'
                            onClick={() => setViewing(row)}
                            className='cursor-pointer rounded-md p-2 text-gray-700 transition hover:bg-gray-100'
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 sm:flex-row sm:px-5'>
          <p>
            Showing <strong>{showingFrom}</strong> to <strong>{showingTo}</strong> of <strong>{total}</strong> entries
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

      {/* Workflow + notes */}
      <div className='grid grid-cols-1 gap-6 xl:grid-cols-[3fr_2fr]'>
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5'>
          <h2 className='text-lg font-semibold text-green-800'>
            Approval Workflow <span className='text-sm font-normal text-gray-700'>(Effect on Entry, Edit, Soft Delete)</span>
          </h2>
          <div className='mt-4 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]'>
            <WorkflowStep Icon={Pencil} title='Request' text='Entry / Edit / Soft Delete' box='border-gray-200 bg-gray-50 text-gray-700' />
            <Arrow />
            <WorkflowStep Icon={Clock} title='Pending Approval' text='Record is on hold (Not yet effective)' box='border-amber-200 bg-amber-50 text-amber-600' />
            <Arrow />
            <WorkflowStep Icon={CheckCircle2} title='Approved' text='Changes applied (Visible in system)' box='border-green-200 bg-green-50 text-green-600' />
            <Arrow />
            <WorkflowStep Icon={XCircle} title='Rejected' text='No change applied (Request closed)' box='border-red-200 bg-red-50 text-red-600' />
          </div>
        </div>
        <div className='rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm sm:p-5'>
          <h2 className='text-lg font-semibold text-green-800'>Key Notes</h2>
          <ul className='mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700'>
            <li>
              <strong>Entry:</strong> New record will be created only after approval.
            </li>
            <li>
              <strong>Edit:</strong> Changes will update the existing record only after approval.
            </li>
            <li>
              <strong>Soft Delete:</strong> Record will be marked as &quot;Inactive&quot; after approval (data remains for audit).
            </li>
            <li>Until approval, no change is visible in the live data.</li>
          </ul>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(approving)}
        title={`Approve ${approving?.requestNo ?? "request"}?`}
        message={`${approving?.recordDetails ?? ""} The change will be applied now.`}
        confirmLabel='Approve'
        confirmClass='bg-green-700 hover:bg-green-800'
        loading={busy}
        onConfirm={approve}
        onCancel={() => setApproving(null)}
      />
      {rejecting && <RejectDialog request={rejecting} busy={busy} onConfirm={reject} onClose={() => setRejecting(null)} />}
      {viewing && <RequestDetailsModal id={viewing.id} onClose={() => setViewing(null)} />}
      {settingsOpen && <ApprovalSettingsModal onClose={() => setSettingsOpen(false)} />}
    </div>
  );
};

function WorkflowStep({ Icon, title, text, box }) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-lg border p-3 text-center ${box}`}>
      <Icon size={22} />
      <p className='mt-1 text-sm font-semibold text-gray-800'>{title}</p>
      <p className='mt-0.5 text-xs text-gray-600'>{text}</p>
    </div>
  );
}

function Arrow() {
  return <span className='flex items-center justify-center text-xl text-gray-500 max-sm:rotate-90'>&rarr;</span>;
}

export default ApprovalDashboard;
