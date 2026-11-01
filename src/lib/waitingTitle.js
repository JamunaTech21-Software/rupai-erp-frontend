// The tooltip of an Edit / Delete button: it explains why the button is off while a request waits for approval.
export const waitingTitle = (row, label) =>
  row?.pendingRequest ? `Waiting for approval (${row.pendingRequest.requestNo})` : label;
