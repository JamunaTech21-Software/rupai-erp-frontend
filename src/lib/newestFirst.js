import { api } from "./api";

// The API lists records oldest first and cannot sort, so the newest-first pages are put together here:
// count the matches, work out which part of the list the page needs, and read the one or two API pages that hold it.
export async function loadNewestFirst(path, filters, page, perPage) {
  const count = await api.get(path, { ...filters, page: 1, perPage: 1 });
  const total = count?.meta?.total ?? 0;
  const totalPages = Math.max(Math.ceil(total / perPage), 1);
  const meta = { page, perPage, total, totalPages };
  if (total === 0 || page > totalPages) return { data: [], meta };
  const last = total - (page - 1) * perPage; // position of the newest wanted row, counting from the oldest
  const first = Math.max(1, last - perPage + 1);
  const pages = [];
  for (let p = Math.ceil(first / perPage); p <= Math.ceil(last / perPage); p += 1) pages.push(p);
  const parts = await Promise.all(pages.map((p) => api.get(path, { ...filters, page: p, perPage })));
  const rows = parts.flatMap((part) => part?.data ?? []);
  const offset = first - (pages[0] - 1) * perPage - 1;
  return { data: rows.slice(offset, offset + (last - first + 1)).reverse(), meta };
}
