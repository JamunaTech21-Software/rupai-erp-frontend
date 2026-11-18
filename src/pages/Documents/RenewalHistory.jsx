import { Eye, History } from "lucide-react";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";

// RP1-198 F.N.7 Renewal History on the document view: GET /documents/:id/renewals, newest first.
const COLUMNS = ["Renewed On", "By", "Old Issue – Expiry", "New Issue – Expiry", "Issuing Authority", "Files"];

function FileLink({ file, label }) {
  if (!file?.url) return null;
  return (
    <a href={file.url} target='_blank' rel='noreferrer' title={file.name ?? label} className='inline-flex max-w-40 items-center gap-1 text-xs font-semibold text-blue-700 hover:underline'>
      <Eye className='h-3.5 w-3.5 shrink-0' />
      <span className='truncate'>
        {label}: {file.name ?? "file"}
      </span>
    </a>
  );
}

export default function RenewalHistory({ documentId }) {
  const history = useApi(() => api.get(`/documents/${documentId}/renewals`), [documentId]);
  const rows = history.data?.data ?? [];

  return (
    <div className='mt-5'>
      <h3 className='mb-2 flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-900'>
        <History className='h-4 w-4' />
        Renewal History
      </h3>
      {history.loading && !history.data ? (
        <div className='h-16 animate-pulse rounded-md bg-slate-100' aria-label='Loading' />
      ) : history.error ? (
        <p className='text-sm text-red-600'>{history.error.message}</p>
      ) : rows.length === 0 ? (
        <p className='px-1 text-sm text-slate-500'>No renewals yet.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[640px] text-left text-xs'>
            <thead>
              <tr className='bg-slate-50 text-slate-700'>
                {COLUMNS.map((column) => (
                  <th key={column} className='px-2 py-2 font-bold'>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className='whitespace-nowrap px-2 py-2'>
                    {row.renewedAt.slice(0, 10)}
                    {row.requestNo && <span className='block text-[11px] text-slate-500'>{row.requestNo}</span>}
                  </td>
                  <td className='px-2 py-2'>{row.renewedBy?.name ?? "-"}</td>
                  <td className='whitespace-nowrap px-2 py-2 text-slate-500'>
                    {row.oldIssueDate} – {row.oldExpiryDate ?? "-"}
                  </td>
                  <td className='whitespace-nowrap px-2 py-2 font-semibold text-emerald-800'>
                    {row.newIssueDate} – {row.newExpiryDate}
                  </td>
                  <td className='px-2 py-2'>
                    {row.issuingAuthority ?? "-"}
                    {row.oldIssuingAuthority && row.oldIssuingAuthority !== row.issuingAuthority && <span className='block text-[11px] text-slate-500'>was {row.oldIssuingAuthority}</span>}
                  </td>
                  <td className='space-y-1 px-2 py-2'>
                    <FileLink file={row.oldAttachment} label='Old' />
                    <FileLink file={row.newAttachment} label='New' />
                    {!row.oldAttachment && !row.newAttachment && "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
