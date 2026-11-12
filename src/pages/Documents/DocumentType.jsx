import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../lib/useForm";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileSpreadsheet, FileText, Layers, Pencil, Plus, Save, Search, Settings, Trash2, X, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";

const PER_PAGE = 10;
const EMPTY_FORM = { category: "", typeCode: "", typeName: "", description: "", status: "ACTIVE", displayOrder: "", renewalRequired: true };
const FORM_KEYS = Object.keys(EMPTY_FORM);
const COLUMNS = ["SL", "Type Code", "Type Name", "Category", "Description", "Renewal Required", "Total Documents", "Status", "Display Order", "Action"];
const CENTERED = ["Renewal Required", "Total Documents", "Status", "Display Order", "Action"];

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";
const boxClass = (error) => `h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:border-emerald-600 ${error ? "border-red-500" : "border-slate-300"}`;
const filterClass = "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm lg:w-52";

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const CARDS = [
  { key: "totalTypes", label: "Total Types", icon: Layers, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600" },
  { key: "active", label: "Active", icon: CheckCircle2, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600" },
  { key: "inactive", label: "Inactive", icon: XCircle, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500" },
  { key: "renewalRequired", label: "Renewal Required", icon: RefreshCw, tint: "from-amber-50 to-white border-amber-100", badge: "bg-amber-100 text-amber-600" },
  { key: "totalDocuments", label: "Total Documents", icon: FileText, tint: "from-violet-50 to-white border-violet-100", badge: "bg-violet-100 text-violet-600" },
];

const DocumentType = () => {
  const [formOpen, setFormOpen] = useState(false); // the Add / Edit popup
  const [editing, setEditing] = useState(null); // the type in the popup; none = a new type
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);

  const searchText = useDebounced(search.trim());

  // =========================================================
  // DATA
  // =========================================================

  const options = useApi(() => api.get("/document-types/filter-options"), []);
  const categories = useApi(() => api.get("/options/document-categories"), []); // the Category filter: all
  const activeCategories = useApi(() => api.get("/options/document-categories", { status: "ACTIVE" }), []); // the form: Active only
  const summary = useApi(() => api.get("/document-types/summary"), []);
  const params = { search: searchText, category, status };
  const list = useApi(() => api.get("/document-types", { ...params, page, perPage: PER_PAGE }), [searchText, category, status, page]);
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;
  const statuses = options.data?.statuses ?? [];

  // The cards follow the list: a change approved elsewhere shows in both.
  useEffect(() => {
    if (list.data) summary.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.data]);

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  // =========================================================
  // FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  // The Category list; the type's own category stays in it even when it is no longer offered.
  const categoryChoices = [...(activeCategories.data ?? [])];
  if (editing && !categoryChoices.some((item) => item.value === editing.category)) {
    categoryChoices.push({ value: editing.category, label: editing.categoryName ?? "Current category" });
  }

  const openNew = () => {
    setEditing(null);
    reset({ ...EMPTY_FORM, displayOrder: String((summary.data?.totalTypes ?? total) + 1) });
    setFormOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    reset({
      category: row.category ?? "",
      typeCode: row.typeCode ?? "",
      typeName: row.typeName ?? "",
      description: row.description ?? "",
      status: row.status ?? "ACTIVE",
      displayOrder: String(row.displayOrder ?? ""),
      renewalRequired: row.renewalRequired !== false,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    reset(EMPTY_FORM);
  };

  const onSubmit = async (values) => {
    const description = values.description.trim();
    const body = {
      category: values.category,
      typeCode: values.typeCode.trim(),
      typeName: values.typeName.trim(),
      description: description === "" ? null : description,
      status: values.status,
      displayOrder: Number(values.displayOrder),
      renewalRequired: Boolean(values.renewalRequired),
    };
    try {
      const result = editing ? await api.put(`/document-types/${editing.id}`, body) : await api.post("/document-types", body);
      notifySaved(result, editing ? "Document type updated successfully!" : "Document type saved successfully!");
      closeForm();
      if (!editing) setPage(1);
      list.reload();
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      for (const [key, message] of Object.entries(fields)) {
        if (FORM_KEYS.includes(key)) setError(key, { message });
        else unplaced = true;
      }
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/document-types/export", { ...params, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `document-types-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/document-types/${deleting.id}`);
      notifySaved(result, "Document type deleted successfully!");
      setDeleting(null);
      list.reload();
    } catch (error) {
      // e.g. "This type has 3 documents."
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const waiting = editing ? (rows.find((item) => item.id === editing.id)?.pendingRequest ?? editing.pendingRequest) : null;
  const pageButton = "flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";
  const stats = summary.data;

  return (
    <div className='w-full space-y-4'>
      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className={`flex items-center gap-4 rounded-xl border bg-gradient-to-r p-5 shadow-sm ${card.tint}`}>
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${card.badge}`}>
                <Icon className='h-7 w-7' />
              </div>
              <div>
                <p className='text-sm font-semibold text-slate-700'>{card.label}</p>
                <p className='text-3xl font-bold text-slate-900'>{stats ? stats[card.key] : <span className='inline-block h-8 w-12 animate-pulse rounded bg-slate-200 align-middle' />}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          TOOLBAR + TABLE
      ====================================================== */}

      <div className='rounded-lg bg-white p-4 shadow-sm'>
        <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
          <div className='relative flex-1'>
            <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <input
              type='text'
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder='Search by Type Code, Type Name or Category...'
              className='h-11 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-600'
            />
          </div>

          <Select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            className={filterClass}
          >
            <option value=''>All Categories</option>
            {(categories.data ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className={filterClass}
          >
            <option value=''>All Status</option>
            {statuses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

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
            onClick={openNew}
            className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-6 text-sm font-semibold text-white hover:bg-emerald-900'
          >
            <Plus className='h-4 w-4' />
            Add New Type
          </button>
        </div>

        <div className='mt-4 overflow-x-auto'>
          <table className='w-full min-w-[1100px] text-left text-sm'>
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
                <EmptyRow columns={COLUMNS.length} message='No document types found' />
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id} className='hover:bg-slate-50/60'>
                    <td className='px-3 py-3'>{(page - 1) * PER_PAGE + index + 1}</td>
                    <td className='px-3 py-3 font-semibold text-slate-700'>{row.typeCode}</td>
                    <td className='px-3 py-3 font-semibold text-slate-900'>{row.typeName}</td>
                    <td className='px-3 py-3 text-slate-700'>{row.categoryName ?? "-"}</td>
                    <td className='px-3 py-3 text-slate-600'>{row.description ?? "-"}</td>
                    <td className='px-3 py-3 text-center'>{row.renewalRequired ? "Yes" : "No"}</td>
                    <td className='px-3 py-3 text-center'>{row.totalDocuments ?? 0}</td>
                    <td className='px-3 py-3 text-center'>
                      <PendingBadge row={row} />
                      <span className={`inline-block rounded px-3 py-1 text-xs font-semibold ${row.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{row.statusLabel}</span>
                    </td>
                    <td className='px-3 py-3 text-center'>{String(row.displayOrder).padStart(2, "0")}</td>
                    <td className='px-3 py-3'>
                      <div className='flex justify-center gap-2'>
                        <button
                          type='button'
                          title={waitingTitle(row, "Edit")}
                          disabled={Boolean(row.pendingRequest)}
                          onClick={() => openEdit(row)}
                          className='cursor-pointer rounded-md border border-emerald-200 p-2 text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                        >
                          <Pencil className='h-4 w-4' />
                        </button>
                        <Link
                          to={`/documents-expiry-renewal?type=${row.id}`}
                          title='Expiry settings'
                          aria-label='Expiry settings'
                          className='cursor-pointer rounded-md border border-blue-200 p-2 text-blue-600 hover:bg-blue-50'
                        >
                          <Settings className='h-4 w-4' />
                        </Link>
                        <button
                          type='button'
                          title={waitingTitle(row, "Delete")}
                          disabled={Boolean(row.pendingRequest)}
                          onClick={() => setDeleting(row)}
                          className='cursor-pointer rounded-md border border-red-200 p-2 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
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
          ADD / EDIT POPUP
      ====================================================== */}

      {formOpen && (
        <div
          className='fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6'
          onMouseDown={(event) => event.target === event.currentTarget && closeForm()}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            role='dialog'
            aria-modal='true'
            className='w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl'
          >
            <div className='flex items-center justify-between bg-emerald-800 px-5 py-3.5 text-white'>
              <h2 className='flex items-center gap-2 text-lg font-bold'>
                <FileText className='h-5 w-5' />
                {editing ? "Edit Document Type" : "Add New Document Type"}
              </h2>
              <button
                type='button'
                onClick={closeForm}
                aria-label='Close'
                title='Close'
                className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/15'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='max-h-[75vh] overflow-y-auto p-5'>
              {waiting && (
                <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700'>
                  Waiting for approval ({waiting.requestNo}). This type cannot be saved until the request is decided.
                </p>
              )}

              <div>
                <label className={labelClass}>
                  Document Category <span className='text-red-500'>*</span>
                </label>
                <Select {...register("category", { required: "Document category is required" })} className={`${boxClass(errors.category)} cursor-pointer`}>
                  <option value=''>Select category</option>
                  {categoryChoices.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {errors.category && <p className='mt-1 text-xs text-red-500'>{errors.category.message}</p>}
              </div>

              <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className={labelClass}>
                    Type Code <span className='text-red-500'>*</span>
                  </label>
                  <input type='text' maxLength={20} placeholder='e.g. TL' {...register("typeCode", { required: "Type code is required" })} className={boxClass(errors.typeCode)} />
                  {errors.typeCode && <p className='mt-1 text-xs text-red-500'>{errors.typeCode.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    Type Name <span className='text-red-500'>*</span>
                  </label>
                  <input type='text' maxLength={150} placeholder='e.g. Trade License' {...register("typeName", { required: "Type name is required" })} className={boxClass(errors.typeName)} />
                  {errors.typeName && <p className='mt-1 text-xs text-red-500'>{errors.typeName.message}</p>}
                </div>
              </div>

              <div className='mt-4'>
                <label className={labelClass}>Description</label>
                <textarea
                  rows='3'
                  maxLength={500}
                  placeholder='What this document type is'
                  {...register("description")}
                  className={`w-full resize-none rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600 ${errors.description ? "border-red-500" : "border-slate-300"}`}
                />
                {errors.description && <p className='mt-1 text-xs text-red-500'>{errors.description.message}</p>}
              </div>

              <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label className={labelClass}>
                    Status <span className='text-red-500'>*</span>
                  </label>
                  <Select {...register("status", { required: "Status is required" })} className={`${boxClass(errors.status)} cursor-pointer`}>
                    {statuses.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                  {errors.status && <p className='mt-1 text-xs text-red-500'>{errors.status.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>
                    Display Order <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='number'
                    min='1'
                    {...register("displayOrder", { required: "Display order is required", validate: (value) => Number(value) >= 1 || "Must be 1 or more." })}
                    className={boxClass(errors.displayOrder)}
                  />
                  {errors.displayOrder && <p className='mt-1 text-xs text-red-500'>{errors.displayOrder.message}</p>}
                </div>
              </div>

              <label className='mt-5 flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700'>
                <input type='checkbox' {...register("renewalRequired")} className='h-4 w-4 cursor-pointer accent-emerald-700' />
                Renewal Required
              </label>
              <p className='mt-1 text-xs text-slate-500'>Reminder days and the other expiry values are set from Expiry &amp; Renewal.</p>
            </div>

            <div className='flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end'>
              <button
                type='button'
                onClick={closeForm}
                className='flex h-11 cursor-pointer items-center justify-center rounded-md border border-slate-300 px-7 text-sm font-semibold text-slate-700 hover:bg-slate-50'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting || Boolean(waiting)}
                className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-7 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60'
              >
                <Save className='h-4 w-4' />
                {isSubmitting ? "Saving..." : editing ? "Update Type" : "Save Type"}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.typeName ?? "document type"}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default DocumentType;
