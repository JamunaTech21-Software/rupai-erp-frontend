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
        className={`max-h-full w-full overflow-y-auto rounded-xl bg-white shadow-xl ${wide ? "max-w-2xl" : "max-w-md"}`}
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

// The eye: what the request would change. Edit = Old -> New, Entry = the new values, Delete = the old values.
export function RequestDetailsModal({ id, onClose }) {
  const detail = useApi(() => api.get(`/approvals/${id}`), [id]);
  const request = detail.data;
  const values = request ? (request.action === "Delete" ? request.oldData : request.newData) : null;
  const changes = request?.changes ?? [];

  return (
    <Shell title={request ? `${request.requestNo} - ${request.action}` : "Request details"} onClose={onClose} wide>
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
              ) : values ? (
                <table className='w-full min-w-96 text-sm'>
                  <thead className='bg-gray-100 text-xs text-gray-700'>
                    <tr>
                      <th className='px-3 py-2 text-left font-semibold'>Field</th>
                      <th className='px-3 py-2 text-left font-semibold'>{request.action === "Delete" ? "Current value" : "New value"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(values).map(([key, value]) => (
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
