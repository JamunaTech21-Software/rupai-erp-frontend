const ACTION = { create: "Entry", update: "Edit", delete: "Delete", restore: "Restore" };

// A small amber "Pending approval" tag for a row that has a request waiting on the Approval Dashboard.
export default function PendingBadge({ row }) {
  const request = row?.pendingRequest;
  if (!request) return null;
  return (
    <div className='mb-1 text-center'>
      <span
        title={`${ACTION[request.action] ?? request.action} waiting for approval (${request.requestNo})`}
        className='inline-block whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700'
      >
        Pending approval
      </span>
    </div>
  );
}
