import { api } from "./api";

const BATCH = 100;
const MAX_BATCHES = 20;

// Some lists are sorted by a date or a code, not by when they were added, so a new record can land in the middle
// or on a later page. This reads the matching records and puts the newest-added (createdAt) first.
// It answers like the API does: { data, meta }.
export async function loadNewestCreated(path, filters, page, perPage) {
  const all = [];
  let totalPages = 1;
  for (let next = 1; next <= Math.min(totalPages, MAX_BATCHES); next += 1) {
    const part = await api.get(path, { ...filters, page: next, perPage: BATCH });
    all.push(...(part?.data ?? []));
    totalPages = part?.meta?.totalPages ?? 1;
  }
  all.sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? "")) || String(b.id).localeCompare(String(a.id)));
  const total = all.length;
  const pages = Math.max(Math.ceil(total / perPage), 1);
  return { data: all.slice((page - 1) * perPage, page * perPage), meta: { page, perPage, total, totalPages: pages } };
}
