import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import ErrorState from "../common/ErrorState";

// "mouzaName" -> "Mouza Name"
const humanize = (key) => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
const show = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const useEscape = (onClose, busy = false) => {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && !busy && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, busy]);
};

function Shell({ title, onClose, busy, children, wide }) {
  useEscape(onClose, busy);
  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4' onMouseDown={() => !busy && onClose()}>
      <div
        className={`max-h-full w-full overflow-y-auto rounded-xl bg-white shadow-xl ${wide === true ? "max-w-2xl" : wide || "max-w-md"}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
          <h2 className='text-lg font-semibold text-green-800'>{title}</h2>
          <button type='button' onClick={onClose} className='cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100' aria-label='Close'>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Reject: an optional reason, then the page does the call.
export function RejectDialog({ request, busy, onConfirm, onClose }) {
  const [reason, setReason] = useState("");
  return (
    <Shell title={`Reject ${request.requestNo}?`} onClose={onClose} busy={busy}>
      <div className='p-5'>
        <p className='text-sm text-gray-600'>{request.recordDetails}</p>
        <p className='mt-1 text-sm text-gray-600'>The change will not be applied. The record stays as it is.</p>
        <label className='mb-1.5 mt-4 block text-sm font-medium text-gray-700'>Reason (optional)</label>
        <textarea
          rows={3}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder='Why is this request rejected?'
          className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600'
        />
        <div className='mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end'>
          <button
            type='button'
            onClick={onClose}
            disabled={busy}
            className='h-10 cursor-pointer rounded-lg border border-gray-300 bg-white px-5 text-sm text-gray-700 transition hover:bg-gray-50 disabled:opacity-60'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => onConfirm(reason.trim())}
            disabled={busy}
            className='h-10 cursor-pointer rounded-lg bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60'
          >
            {busy ? "Please wait..." : "Reject"}
          </button>
        </div>
      </div>
    </Shell>
  );
}

// Lists inside a request. One save can carry many rows and files, so they get their own sections.
const ROW_LISTS = { rows: "Rows", beds: "Beds / sections", stock: "Plant stock" };
const FILE_LISTS = ["photos", "documents"];
const CHANGE_LABEL = {
  rowChanges: { plantCensus: "Census rows", bushRegister: "Bush register rows", _: "Rows" },
  bedChanges: { _: "Beds / sections" },
  stockChanges: { _: "Plant stock" },
};
const HIDDEN_COLUMNS = new Set(["id", "position", "censusId", "nurseryId", "registerId", "createdAt", "updatedAt", "createdBy", "updatedBy", "pendingRequest"]);
const PAGE_OF_ROWS = 50;

const isChangeGroup = (value) => value && typeof value === "object" && !Array.isArray(value) && ["added", "changed", "removed"].some((key) => Array.isArray(value[key]));

// Splits the values of a request into the plain form fields and the lists (rows, beds, stock, files).
function splitRequest(values, request) {
  const form = {};
  const sections = [];
  const removing = request.action === "Delete";
  for (const [key, value] of Object.entries(values ?? {})) {
    if (key === "fileChanges" && isChangeGroup(value)) {
      sections.push({ type: "files", key, title: "Files", added: value.added ?? [], removed: value.removed ?? [] });
    } else if (isChangeGroup(value)) {
      const labels = CHANGE_LABEL[key] ?? { _: humanize(key) };
      sections.push({ type: "rows", key, title: labels[request.resource] ?? labels._, added: value.added ?? [], changed: value.changed ?? [], removed: value.removed ?? [] });
    } else if (Array.isArray(value) && ROW_LISTS[key]) {
      if (value.length) sections.push({ type: "rows", key, title: ROW_LISTS[key], added: removing ? [] : value, changed: [], removed: removing ? value : [] });
    } else if (Array.isArray(value) && FILE_LISTS.includes(key)) {
      const items = value.map((item) => (typeof item === "string" ? { kind: key, fileId: item } : item));
      if (items.length) sections.push({ type: "files", key, title: key === "photos" ? "Photos" : "Documents", added: removing ? [] : items, removed: removing ? items : [] });
    } else form[key] = value;
  }
  return { form, sections };
}

function Chip({ tone, children }) {
  const tones = { Added: "bg-green-100 text-green-700", Changed: "bg-amber-100 text-amber-700", Removed: "bg-red-100 text-red-600" };
  return <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${tones[tone]}`}>{children}</span>;
}

// Rows added, changed and removed by the request: old -> new for a changed value. Long lists show 50 rows at a time inside a scrolling panel.
function RowsSection({ section }) {
  const [shown, setShown] = useState(PAGE_OF_ROWS);
  const entries = [
    ...section.added.map((row) => ({ kind: "Added", row })),
    ...section.changed.map((item) => ({ kind: "Changed", row: item.new ?? {}, old: item.old ?? {} })),
    ...section.removed.map((row) => ({ kind: "Removed", row })),
  ];
  const columns = [];
  for (const entry of entries) for (const key of Object.keys(entry.row)) if (!HIDDEN_COLUMNS.has(key) && !columns.includes(key)) columns.push(key);
  const tint = { Added: "bg-green-50/60", Changed: "bg-amber-50/60", Removed: "bg-red-50/60" };
  return (
    <div className='mt-5'>
      <div className='mb-2 flex flex-wrap items-center gap-2'>
        <h3 className='text-sm font-semibold text-green-800'>{section.title}</h3>
        {section.added.length > 0 && <Chip tone='Added'>{section.added.length} added</Chip>}
        {section.changed.length > 0 && <Chip tone='Changed'>{section.changed.length} changed</Chip>}
        {section.removed.length > 0 && <Chip tone='Removed'>{section.removed.length} removed</Chip>}
      </div>
      {entries.length === 0 ? (
        <p className='rounded-lg border border-gray-200 px-3 py-4 text-center text-sm text-gray-500'>No changes.</p>
      ) : (
        <div className='max-h-80 overflow-auto rounded-lg border border-gray-200'>
          <table className='w-full min-w-max text-sm'>
            <thead className='sticky top-0 bg-gray-100 text-xs text-gray-700'>
              <tr>
                <th className='px-3 py-2 text-left font-semibold'>Change</th>
                {columns.map((column) => (
                  <th key={column} className='whitespace-nowrap px-3 py-2 text-left font-semibold'>
                    {humanize(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.slice(0, shown).map((entry, index) => (
                <tr key={index} className={`border-t border-gray-200 ${tint[entry.kind]}`}>
                  <td className='px-3 py-2'>
                    <Chip tone={entry.kind}>{entry.kind}</Chip>
                  </td>
                  {columns.map((column) => {
                    const now = entry.row[column];
                    const was = entry.old?.[column];
                    const differs = entry.kind === "Changed" && show(was) !== show(now);
                    return (
                      <td key={column} className='whitespace-nowrap px-3 py-2 text-gray-800'>
                        {differs ? (
                          <>
                            <span className='text-red-600 line-through'>{show(was)}</span> <span className='text-gray-400'>→</span> <span className='font-medium text-green-700'>{show(now)}</span>
                          </>
                        ) : (
                          show(now)
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {entries.length > shown && (
        <button
          type='button'
          onClick={() => setShown((count) => count + PAGE_OF_ROWS)}
          className='mt-2 cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50'
        >
          Show {Math.min(PAGE_OF_ROWS, entries.length - shown)} more ({entries.length - shown} left)
        </button>
      )}
    </div>
  );
}

// One file of a request: its name (read from the server when the request only holds the id) and a link that opens it.
function FileItem({ item, tone }) {
  const info = useApi(() => (item.name ? Promise.resolve(null) : api.get(`/files/${item.fileId}`)), [item.fileId]);
  const name = item.name || info.data?.name || (info.error ? "File not available" : "Loading...");
  const open = async () => {
    const tab = window.open("", "_blank");
    try {
      const file = info.data ?? (await api.get(`/files/${item.fileId}`));
      if (tab) {
        tab.opener = null;
        tab.location = file.url;
      }
    } catch {
      if (tab) tab.close();
    }
  };
  return (
    <li className='flex flex-wrap items-center gap-2 border-t border-gray-200 px-3 py-2 text-sm first:border-t-0'>
      <Chip tone={tone}>{tone}</Chip>
      <span className='text-xs text-gray-500'>{item.kind === "photos" ? "Photo" : "Document"}</span>
      <span className='min-w-0 flex-1 break-all font-medium text-gray-800'>{name}</span>
      <button type='button' onClick={open} className='cursor-pointer rounded-lg border border-green-700 px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-50'>
        Open
      </button>
    </li>
  );
}

function FilesSection({ section }) {
  return (
    <div className='mt-5'>
      <div className='mb-2 flex flex-wrap items-center gap-2'>
        <h3 className='text-sm font-semibold text-green-800'>{section.title}</h3>
        {section.added.length > 0 && <Chip tone='Added'>{section.added.length} added</Chip>}
        {section.removed.length > 0 && <Chip tone='Removed'>{section.removed.length} removed</Chip>}
      </div>
      <ul className='max-h-60 overflow-y-auto rounded-lg border border-gray-200'>
        {section.added.map((item) => (
          <FileItem key={`a-${item.fileId}`} item={item} tone='Added' />
        ))}
        {section.removed.map((item) => (
          <FileItem key={`r-${item.fileId}`} item={item} tone='Removed' />
        ))}
      </ul>
    </div>
  );
}

// The eye: what the request would change. Edit = Old -> New, Entry = the new values, Delete = the old values.
// A request that holds rows, beds, stock or files shows them below the form fields.
export function RequestDetailsModal({ id, onClose }) {
  const detail = useApi(() => api.get(`/approvals/${id}`), [id]);
  const request = detail.data;
  const values = request ? (request.action === "Delete" ? request.oldData : request.newData) : null;
  const changes = request?.changes ?? [];
  const { form, sections } = request ? splitRequest(values, request) : { form: null, sections: [] };
  const formEntries = Object.entries(form ?? {});
  // An edit of rows or files alone has no changed form fields: say so instead of listing every field again.
  const onlyLists = request?.action === "Edit" && changes.length === 0 && sections.length > 0;

  return (
    <Shell title={request ? `${request.requestNo} - ${request.action}` : "Request details"} onClose={onClose} wide={sections.length > 0 ? "max-w-5xl" : true}>
      <div className='p-5'>
        {detail.loading && !request && <p className='py-8 text-center text-sm text-gray-500'>Loading...</p>}
        {detail.error && <ErrorState message={detail.error.message} onRetry={detail.reload} />}
        {request && (
          <>
            <dl className='grid grid-cols-1 gap-3 text-sm sm:grid-cols-2'>
              <div>
                <dt className='text-xs text-gray-500'>Module</dt>
                <dd className='font-medium text-gray-800'>{request.moduleLabel}</dd>
              </div>
              <div>
                <dt className='text-xs text-gray-500'>Status</dt>
                <dd className='font-medium text-gray-800'>{request.status}</dd>
              </div>
              <div className='sm:col-span-2'>
                <dt className='text-xs text-gray-500'>Record</dt>
                <dd className='font-medium text-gray-800'>{request.recordDetails}</dd>
              </div>
              {request.rejectReason && (
                <div className='sm:col-span-2'>
                  <dt className='text-xs text-gray-500'>Reject reason</dt>
                  <dd className='font-medium text-gray-800'>{request.rejectReason}</dd>
                </div>
              )}
              {request.error && (
                <div className='sm:col-span-2'>
                  <dt className='text-xs text-gray-500'>Last approve failed</dt>
                  <dd className='font-medium text-red-600'>{request.error}</dd>
                </div>
              )}
            </dl>

            {onlyLists ? (
              <p className='mt-5 rounded-lg border border-gray-200 px-3 py-3 text-sm text-gray-500'>No form fields are changed. This request changes the lists below.</p>
            ) : (
              <div className='mt-5 overflow-x-auto rounded-lg border border-gray-200'>
                {request.action === "Edit" && changes.length > 0 ? (
                  <table className='w-full min-w-96 text-sm'>
                    <thead className='bg-gray-100 text-xs text-gray-700'>
                      <tr>
                        <th className='px-3 py-2 text-left font-semibold'>Field</th>
                        <th className='px-3 py-2 text-left font-semibold'>Old</th>
                        <th className='px-3 py-2 text-left font-semibold'>New</th>
                      </tr>
                    </thead>
                    <tbody>
                      {changes.map((change) => (
                        <tr key={change.field} className='border-t border-gray-200'>
                          <td className='px-3 py-2 font-medium text-gray-700'>{change.label ?? humanize(change.field)}</td>
                          <td className='px-3 py-2 text-red-600'>{show(change.old)}</td>
                          <td className='px-3 py-2 text-green-700'>{show(change.new)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : formEntries.length > 0 ? (
                  <table className='w-full min-w-96 text-sm'>
                    <thead className='bg-gray-100 text-xs text-gray-700'>
                      <tr>
                        <th className='px-3 py-2 text-left font-semibold'>Field</th>
                        <th className='px-3 py-2 text-left font-semibold'>{request.action === "Delete" ? "Current value" : "New value"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formEntries.map(([key, value]) => (
                        <tr key={key} className='border-t border-gray-200'>
                          <td className='px-3 py-2 font-medium text-gray-700'>{humanize(key)}</td>
                          <td className='break-words px-3 py-2 text-gray-800'>{show(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className='px-3 py-6 text-center text-sm text-gray-500'>No details to show.</p>
                )}
              </div>
            )}

            {sections.map((section) => (section.type === "files" ? <FilesSection key={section.key} section={section} /> : <RowsSection key={section.key} section={section} />))}
          </>
        )}
        <div className='mt-5 flex justify-end'>
          <button
            type='button'
            onClick={onClose}
            className='h-10 cursor-pointer rounded-lg border border-gray-300 bg-white px-6 text-sm text-gray-700 transition hover:bg-gray-50'
          >
            Close
          </button>
        </div>
      </div>
    </Shell>
  );
}
