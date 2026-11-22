import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, CalendarDays, CheckCircle2, Clock, FileText, Hourglass, Layers, Plus, ShieldCheck, Tag, ClipboardCheck, FolderOpen } from "lucide-react";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import ErrorState from "../../components/common/ErrorState";
import DocumentForm from "./DocumentForm";

const CARDS = [
  { key: "totalDocuments", label: "Total Documents", icon: FileText, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600" },
  { key: "active", label: "Active", icon: CheckCircle2, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600" },
  { key: "expiringSoon", label: "Expiring Soon", note: "(Next 90 Days)", icon: Clock, tint: "from-amber-50 to-white border-amber-100", badge: "bg-amber-100 text-amber-600" },
  { key: "expired", label: "Expired", icon: AlertTriangle, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500" },
  { key: "pendingApproval", label: "Pending Approval", icon: Hourglass, tint: "from-violet-50 to-white border-violet-100", badge: "bg-violet-100 text-violet-600" },
];

const SLICE_COLORS = ["#166534", "#2563eb", "#f59e0b", "#0d9488", "#e11d48", "#7c3aed", "#94a3b8"];
const TILE_ICONS = [Layers, ShieldCheck, FolderOpen, Tag, ClipboardCheck, FileText, CalendarDays, Layers, ShieldCheck, FolderOpen];
const LEVEL_STYLE = { danger: "bg-red-100 text-red-700", warning: "bg-amber-100 text-amber-700", ok: "bg-emerald-100 text-emerald-700" };
const RECENT_STYLE = { APPROVED: "bg-emerald-100 text-emerald-700", PENDING: "bg-amber-100 text-amber-700" };

const panel = "rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5";
const heading = "text-sm font-bold text-primary";

const dateText = (value) => (value ? String(value).slice(0, 10) : "-");
// "13 Sep 2026" from an ISO time.
const shortDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

function Pulse({ className }) {
  return <span aria-hidden="true" className={`animate-pulse rounded bg-slate-200 ${className}`} />;
}

function ViewAll({ to }) {
  return (
    <Link to={to} className='flex items-center gap-1 text-xs font-semibold text-primary hover:underline'>
      View All <ArrowRight className='h-3.5 w-3.5' />
    </Link>
  );
}

// A ring drawn from the category counts: each slice is a share of the circle (circumference 100).
function Donut({ items, total }) {
  let offset = 25; // start at the top
  return (
    <div className='relative h-[170px] w-[170px] shrink-0'>
      <svg viewBox='0 0 42 42' className='h-full w-full' role='img' aria-label='Documents by category'>
        <circle cx='21' cy='21' r='15.915' fill='none' stroke='#e2e8f0' strokeWidth='6' />
        {total > 0 &&
          items.map((item, index) => {
            const share = (item.totalDocuments / total) * 100;
            const slice = (
              <circle
                key={item.id ?? "other"}
                data-slice={item.label}
                cx='21'
                cy='21'
                r='15.915'
                fill='none'
                stroke={SLICE_COLORS[index % SLICE_COLORS.length]}
                strokeWidth='6'
                strokeDasharray={`${share} ${100 - share}`}
                strokeDashoffset={offset}
              />
            );
            offset -= share;
            return slice;
          })}
      </svg>
      <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
        <p className='text-2xl font-bold leading-tight text-slate-800'>{total}</p>
        <p className='text-[11px] text-slate-500'>Documents</p>
      </div>
    </div>
  );
}

const DocumentDashboard = () => {
  const dashboard = useApi(() => api.get("/documents/dashboard"), []);
  const [adding, setAdding] = useState(false);
  const data = dashboard.data;

  // A new document may change every part of the page, so it is all asked for again.
  const saved = () => {
    setAdding(false);
    dashboard.reload();
  };

  if (dashboard.error && !data) {
    return <ErrorState message={dashboard.error.message} onRetry={dashboard.reload} />;
  }

  const cards = data?.cards;
  const byCategory = data?.documentsByCategory;
  const months = data?.expiryStatus?.months ?? [];
  const topMonth = Math.max(1, ...months.map((month) => month.count));
  const categories = data?.documentCategories;
  const expiring = data?.expiringDocuments ?? [];
  const recent = data?.recentDocuments ?? [];

  return (
    <div className='space-y-5'>
      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className={`flex items-center gap-3 rounded-xl border bg-gradient-to-r p-4 shadow-sm ${card.tint}`}>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${card.badge}`}>
                <Icon className='h-6 w-6' />
              </div>
              <div>
                <p className='text-sm font-semibold text-slate-700'>{card.label}</p>
                <p className='flex items-baseline gap-1.5 text-2xl font-bold text-slate-900'>
                  {cards ? cards[card.key] : <Pulse className='inline-block h-7 w-10 align-middle' />}
                  {card.note && <span className='text-[11px] font-normal text-slate-500'>{card.note}</span>}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          CATEGORY DONUT + EXPIRY BARS + QUICK ACTIONS
      ====================================================== */}
      <div className='grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_280px]'>
        <div className={panel}>
          <h3 className={`mb-3 ${heading}`}>Documents by Category</h3>
          {!byCategory ? (
            <Pulse className='block h-[170px] w-full' />
          ) : (
            <div className='flex flex-col items-center gap-4 sm:flex-row'>
              <Donut items={byCategory.items} total={byCategory.totalDocuments} />
              <ul className='w-full min-w-0 flex-1 space-y-1.5' data-legend>
                {byCategory.items.length === 0 && <li className='text-xs text-slate-500'>No categories yet</li>}
                {byCategory.items.map((item, index) => (
                  <li key={item.id ?? "other"} className='flex items-center justify-between gap-2 text-xs'>
                    <span className='flex min-w-0 items-center gap-2'>
                      <span className='h-2.5 w-2.5 shrink-0 rounded-sm' style={{ backgroundColor: SLICE_COLORS[index % SLICE_COLORS.length] }} />
                      <span className='truncate text-slate-700'>{item.label}</span>
                    </span>
                    <span className='shrink-0 font-semibold text-slate-800'>
                      {item.totalDocuments} ({item.percent}%)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={panel}>
          <h3 className={`mb-3 ${heading}`}>Expiry Status</h3>
          {!data ? (
            <Pulse className='block h-[170px] w-full' />
          ) : (
            <div className='flex h-[190px] items-end gap-1.5 sm:gap-2' data-bars>
              {months.map((month) => (
                <div key={month.month} className='flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1'>
                  <span className='text-[11px] font-semibold text-slate-700'>{month.count}</span>
                  <div
                    data-bar={month.month}
                    className='w-full max-w-7 rounded-t bg-primary/80'
                    style={{ height: `${Math.max(month.count > 0 ? 4 : 1, (month.count / topMonth) * 100)}%`, maxHeight: "calc(100% - 38px)" }}
                  />
                  <span className='w-full truncate text-center text-[10px] text-slate-500' title={month.label}>
                    {month.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={panel}>
          <h3 className={`mb-3 ${heading}`}>Quick Actions</h3>
          <div className='flex flex-col gap-2.5 text-sm font-semibold'>
            <button
              type='button'
              onClick={() => setAdding(true)}
              className='flex h-11 cursor-pointer items-center gap-2.5 rounded-md bg-emerald-800 px-3.5 text-white transition hover:bg-emerald-900'
            >
              <Plus className='h-4 w-4' /> Add New Document
            </button>
            <Link to='/documents-category' className='flex h-11 items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3.5 text-slate-700 transition hover:bg-slate-100'>
              <Layers className='h-4 w-4 text-primary' /> Document Category Setup
            </Link>
            <Link to='/documents-type' className='flex h-11 items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3.5 text-slate-700 transition hover:bg-slate-100'>
              <Tag className='h-4 w-4 text-primary' /> Document Type Setup
            </Link>
            <Link to='/documents-expiry-renewal' className='flex h-11 items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3.5 text-slate-700 transition hover:bg-slate-100'>
              <CalendarDays className='h-4 w-4 text-primary' /> Expiry &amp; Renewal Settings
            </Link>
            <Link to='/approval-dashboard?module=documents' className='flex h-11 items-center gap-2.5 rounded-md border border-slate-200 bg-slate-50 px-3.5 text-slate-700 transition hover:bg-slate-100'>
              <ClipboardCheck className='h-4 w-4 text-primary' />
              <span>
                Approval Requests <span className='text-red-600'>({cards ? cards.pendingApproval : "…"})</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          DOCUMENT CATEGORIES
      ====================================================== */}
      <div className={panel}>
        <div className='mb-3 flex items-center justify-between gap-3'>
          <h3 className={heading}>Document Categories{categories ? ` (${categories.totalCategories})` : ""}</h3>
          <ViewAll to='/documents-category' />
        </div>
        {!categories ? (
          <Pulse className='block h-20 w-full' />
        ) : categories.items.length === 0 ? (
          <p className='py-6 text-center text-sm text-slate-500'>No categories yet</p>
        ) : (
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' data-tiles>
            {categories.items.map((item, index) => {
              const Icon = TILE_ICONS[index % TILE_ICONS.length];
              return (
                <Link
                  key={item.id ?? "other"}
                  to={item.other ? "/documents-category" : `/documents-register?category=${item.id}`}
                  className='flex items-center gap-3 rounded-lg border border-slate-100 bg-emerald-50/50 p-3 transition hover:border-primary/30 hover:bg-emerald-50'
                >
                  <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700'>
                    <Icon className='h-5 w-5' />
                  </div>
                  <div className='min-w-0'>
                    <p className='truncate text-xs font-semibold text-slate-700' title={item.label}>
                      {item.label}
                    </p>
                    <p className='text-xl font-bold text-slate-900'>{item.totalDocuments}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================
          EXPIRING + RECENT DOCUMENTS
      ====================================================== */}
      <div className='grid grid-cols-1 gap-5'>
        <div className={panel}>
          <div className='mb-3 flex items-center justify-between gap-3'>
            <h3 className={heading}>Expiring Documents</h3>
            <ViewAll to='/documents-register?status=expiring' />
          </div>
          <div className='overflow-x-auto rounded-lg border border-slate-300'>
            <table className='w-full min-w-[460px] border-collapse text-left text-sm'>
              <thead>
                <tr className='bg-slate-50 text-xs font-semibold text-slate-600'>
                  <th className='border border-slate-300 px-3 py-2'>SL</th>
                  <th className='border border-slate-300 px-3 py-2'>Document Name</th>
                  <th className='border border-slate-300 px-3 py-2'>Category</th>
                  <th className='border border-slate-300 px-3 py-2'>Expiry Date</th>
                  <th className='border border-slate-300 px-3 py-2 text-center'>Days Left</th>
                </tr>
              </thead>
              <tbody>
                {!data ? (
                  Array.from({ length: 5 }, (_, row) => (
                    <tr key={row}>
                      <td colSpan={5} className='border border-slate-200 px-3 py-2'>
                        <Pulse className='block h-4 w-full' />
                      </td>
                    </tr>
                  ))
                ) : expiring.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='border border-slate-200 px-3 py-8 text-center text-sm text-slate-500'>
                      No documents are expiring soon
                    </td>
                  </tr>
                ) : (
                  expiring.map((row, index) => (
                    <tr key={row.id} className='text-slate-700'>
                      <td className='border border-slate-200 px-3 py-2.5'>{index + 1}</td>
                      <td className='border border-slate-200 px-3 py-2.5 font-medium'>{row.documentName}</td>
                      <td className='border border-slate-200 px-3 py-2.5'>{row.categoryName}</td>
                      <td className='border border-slate-200 px-3 py-2.5 whitespace-nowrap'>{dateText(row.expiryDate)}</td>
                      <td className='border border-slate-200 px-3 py-2.5 text-center'>
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${LEVEL_STYLE[row.daysLeftLevel] ?? LEVEL_STYLE.ok}`}>{row.daysLeftLabel}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={panel}>
          <div className='mb-3 flex items-center justify-between gap-3'>
            <h3 className={heading}>Recent Documents</h3>
            <ViewAll to='/documents-register' />
          </div>
          <div className='overflow-x-auto rounded-lg border border-slate-300'>
            <table className='w-full min-w-[460px] border-collapse text-left text-sm'>
              <thead>
                <tr className='bg-slate-50 text-xs font-semibold text-slate-600'>
                  <th className='border border-slate-300 px-3 py-2'>SL</th>
                  <th className='border border-slate-300 px-3 py-2'>Document Name</th>
                  <th className='border border-slate-300 px-3 py-2'>Category</th>
                  <th className='border border-slate-300 px-3 py-2'>Uploaded On</th>
                  <th className='border border-slate-300 px-3 py-2 text-center'>Status</th>
                </tr>
              </thead>
              <tbody>
                {!data ? (
                  Array.from({ length: 5 }, (_, row) => (
                    <tr key={row}>
                      <td colSpan={5} className='border border-slate-200 px-3 py-2'>
                        <Pulse className='block h-4 w-full' />
                      </td>
                    </tr>
                  ))
                ) : recent.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='border border-slate-200 px-3 py-8 text-center text-sm text-slate-500'>
                      No documents yet
                    </td>
                  </tr>
                ) : (
                  recent.map((row, index) => (
                    <tr key={row.id ?? row.requestId} className='text-slate-700'>
                      <td className='border border-slate-200 px-3 py-2.5'>{index + 1}</td>
                      <td className='border border-slate-200 px-3 py-2.5 font-medium'>{row.documentName}</td>
                      <td className='border border-slate-200 px-3 py-2.5'>{row.categoryName}</td>
                      <td className='border border-slate-200 px-3 py-2.5 whitespace-nowrap'>{shortDate(row.uploadedOn)}</td>
                      <td className='border border-slate-200 px-3 py-2.5 text-center'>
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${RECENT_STYLE[row.status] ?? RECENT_STYLE.PENDING}`}>{row.statusLabel}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {adding && <DocumentForm popup onSaved={saved} onClose={() => setAdding(false)} />}
    </div>
  );
};

export default DocumentDashboard;
