import { useForm } from "../../lib/useForm";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RotateCcw, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import MasterDataTabs from "./MasterDataTabs";
import teaBrokerData from "../../data/MasterData/brokerSalePositionData";
import React, { useEffect, useState } from "react";
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
const BROKER_KEYS = ["broker1", "broker2", "broker3", "broker4", "broker5", "broker6", "broker7"];
const EMPTY_FORM = { auctionCenter: "", saleNo: "", ...Object.fromEntries(BROKER_KEYS.map((key) => [key, ""])) };
const EMPTY_FILTERS = { auctionCenter: "all", season: "all", saleNo: "all", status: "all" };
// Sale numbers 01 to 25 for the Sale No filter (a season has far fewer sales than this).
const SALE_NO_CHOICES = Array.from({ length: 25 }, (_, index) => String(index + 1).padStart(2, "0"));
const iso = (value) => (value ? String(value).slice(0, 10) : "");

const BrokerSalePositionSetup = () => {
  const [formOpen, setFormOpen] = useState(false); // the Add / Edit popup

  const [isAddMode, setIsAddMode] = useState(false);
  const [editing, setEditing] = useState(null); // the position in the form; none = a new position
  const [draft, setDraft] = useState(EMPTY_FILTERS); // what the filter boxes show
  const [filters, setFilters] = useState(EMPTY_FILTERS); // what the list uses (after Filter)
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);

  // =========================================================
  // DATA
  // =========================================================

  const centers = useApi(() => api.get("/options/auction-centers"), []);
  const seasons = useApi(() => api.get("/options/seasons"), []);
  const brokers = useApi(() => api.get("/options/brokers"), []);
  const filterOptions = useApi(() => api.get("/broker-sale-positions/filter-options"), []);

  const params = {
    auctionCenter: filters.auctionCenter === "all" ? "" : filters.auctionCenter,
    season: filters.season === "all" ? "" : filters.season,
    saleNo: filters.saleNo === "all" ? "" : filters.saleNo,
    status: filters.status === "all" ? "" : filters.status,
  };
  const list = useApi(
    () => api.get("/broker-sale-positions", { ...params, page, perPage: PER_PAGE }),
    [params.auctionCenter, params.season, params.saleNo, params.status, page],
  );
  const positions = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = positions.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + positions.length;

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && positions.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, positions.length, page]);

  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  // The Sale No list is the sales of the chosen auction center.
  const centerId = watch("auctionCenter");
  const sales = useApi(() => (centerId ? api.get("/options/auction-schedules", { auctionCenter: centerId }) : Promise.resolve([])), [centerId]);
  const saleChoices = [...(sales.data ?? [])];
  if (editing && editing.auctionCenter === centerId && !saleChoices.some((item) => item.value === editing.auctionSchedule)) {
    saleChoices.push({ value: editing.auctionSchedule, label: `Sale ${editing.saleNoLabel ?? editing.saleNo} — ${iso(editing.saleDate)}` });
  }

  const optionsOf = (name) => {
    if (name === "auctionCenter") return centers.data ?? [];
    if (name === "saleNo") return saleChoices;
    return brokers.data ?? [];
  };

  // =========================================================
  // ACTIONS
  // =========================================================

  const startNew = () => {
    setIsAddMode(true);
    setEditing(null);
    reset(EMPTY_FORM);
    setFormOpen(true);
  };

  const startEdit = (position) => {
    setIsAddMode(false);
    setEditing(position);
    reset({
      auctionCenter: position.auctionCenter,
      saleNo: position.auctionSchedule,
      ...Object.fromEntries(BROKER_KEYS.map((key) => [key, position[key] ?? ""])),
    });
    setFormOpen(true);
  };

  const handleClear = () => {
    if (editing) reset({ auctionCenter: editing.auctionCenter, saleNo: editing.auctionSchedule, ...Object.fromEntries(BROKER_KEYS.map((key) => [key, editing[key] ?? ""])) });
    else reset(EMPTY_FORM);
  };

  const finish = () => {
    setFormOpen(false);
    setIsAddMode(false);
    setEditing(null);
    reset(EMPTY_FORM);
  };

  const onSubmit = async (values) => {
    const body = {
      auctionCenter: values.auctionCenter,
      auctionSchedule: values.saleNo,
      ...Object.fromEntries(BROKER_KEYS.map((key) => [key, values[key]])),
    };
    try {
      const result = editing ? await api.put(`/broker-sale-positions/${editing.id}`, body) : await api.post("/broker-sale-positions", body);
      notifySaved(result, editing ? "Sale position updated successfully!" : "Sale position saved successfully!");
      finish();
      if (!editing) setPage(1);
      list.reload();
    } catch (error) {
      const fields = error.fields ?? {};
      let unplaced = false;
      for (const [key, message] of Object.entries(fields)) {
        const name = key === "auctionSchedule" ? "saleNo" : key;
        if (name in EMPTY_FORM) setError(name, { message });
        else unplaced = true;
      }
      if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
    }
  };

  const applyFilters = () => {
    setFilters(draft);
    setPage(1);
  };

  // The export needs the token, so it is fetched and saved as a file here.
  const exportList = async () => {
    setExporting(true);
    try {
      const blob = await api.download("/broker-sale-positions/export", { ...params, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `broker-sale-positions-${new Date().toISOString().slice(0, 10)}.xlsx`;
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
      const result = await api.del(`/broker-sale-positions/${deleting.id}`);
      notifySaved(result, "Sale position deleted successfully!");
      if (editing?.id === deleting.id) finish();
      setDeleting(null);
      list.reload();
    } catch (error) {
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const waiting = positions.find((item) => item.id === editing?.id)?.pendingRequest ?? editing?.pendingRequest;
  const filterChoices = {
    auctionCenter: centers.data ?? [],
    season: seasons.data ?? [],
    saleNo: SALE_NO_CHOICES.map((value) => ({ value, label: value })),
    status: filterOptions.data?.statuses ?? teaBrokerData.list.filters.find((item) => item.name === "status").options.filter((option) => option.value !== "all"),
  };
  const pageButton =
    "flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div>
      <MasterDataTabs />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className='mt-4 grid grid-cols-1 gap-2 xl:grid-cols-4'>
        {/* =====================================================
            LEFT : BROKERS SALE POSITION SETUP
        ===================================================== */}

        <div
          className={formOpen ? "fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6" : "xl:col-span-1"}
          onMouseDown={formOpen ? (event) => event.target === event.currentTarget && finish() : undefined}
        >
        <form
          onSubmit={handleSubmit(onSubmit)}
          role={formOpen ? "dialog" : undefined}
          aria-modal={formOpen ? "true" : undefined}
          className={
            formOpen
              ? "w-full max-w-lg rounded-lg bg-white p-5 shadow-xl"
              : "rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          }
        >
          <div className='mb-5 flex items-center justify-between'>
            <h2 className='text-sm font-bold text-emerald-700'>
              {editing ? "Edit Broker Sale Position" : isAddMode ? "Add Broker Sale Position" : teaBrokerData.setup.title}
            </h2>

            {formOpen && (
              <button
                type='button'
                onClick={finish}
                aria-label='Close'
                title='Close'
                className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </div>

          {waiting && (
            <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-[11px] text-amber-700'>
              Waiting for approval ({waiting.requestNo}). This position cannot be saved until the request is decided.
            </p>
          )}

          <div>
            {teaBrokerData.setup.fields.map((field) => (
              <div key={field.name} className='mb-4'>
                <label className='mb-2 block text-[11px] font-medium text-slate-700'>
                  {field.label}

                  {field.required && <span className='ml-1 text-red-500'>*</span>}
                </label>

                <Select
                  {...register(field.name, {
                    required: field.required ? `${field.label} is required` : false,
                    onChange: field.name === "auctionCenter" ? () => setValue("saleNo", "") : undefined,
                  })}
                  className={`h-9 w-full rounded-md border bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 ${
                    errors[field.name] ? "border-red-400" : "border-slate-200"
                  }`}
                >
                  <option value=''>{field.name === "saleNo" && !centerId ? "--- Select Auction Center first ---" : field.placeholder}</option>

                  {optionsOf(field.name).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                {errors[field.name] && <p className='mt-1 text-[10px] text-red-500'>{errors[field.name].message}</p>}
              </div>
            ))}
          </div>

          <div className='mt-5 flex flex-col gap-2 sm:flex-row'>
            <button
              type='button'
              onClick={handleClear}
              className='flex flex-1 items-center justify-center gap-2 rounded-md border border-slate-200 px-6 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50'
            >
              <RotateCcw className='h-3.5 w-3.5' />

              {teaBrokerData.setup.buttons.clear}
            </button>

            <button
              type='submit'
              disabled={isSubmitting || Boolean(waiting)}
              className='flex flex-1 items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 py-2.5 text-xs font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <Save className='h-3.5 w-3.5' />

              {isSubmitting ? "Saving..." : editing ? "Update Position" : teaBrokerData.setup.buttons.save}
            </button>
          </div>

          <p className='mt-5 text-[10px] text-red-500'>{teaBrokerData.setup.mandatoryText}</p>
        </form>
        </div>

        {/* =========================================================
                RIGHT : BROKERS SALE POSITION LIST
            ========================================================= */}

        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-3'>
          <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <h2 className='text-sm font-bold text-emerald-700'>{teaBrokerData.list.title}</h2>

            <div className='flex  gap-2'>
              <button
                type='button'
                onClick={exportList}
                disabled={exporting}
                className='flex items-center gap-2 rounded-md border border-emerald-200 px-6 py-2.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-60'
              >
                ↓{exporting ? "Exporting..." : teaBrokerData.list.buttons.export}
              </button>

              <button type='button' onClick={startNew} className='rounded-md bg-emerald-700 px-6 py-2.5 text-xs font-medium text-white'>
                Add New
              </button>
            </div>
          </div>

          {/* FILTERS */}

          <div className='mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5'>
            {teaBrokerData.list.filters.map((filter) => (
              <div key={filter.name}>
                <label className='mb-2 block text-[10px] font-medium text-slate-600'>{filter.label}</label>

                <Select
                  value={draft[filter.name]}
                  onChange={(event) => setDraft((current) => ({ ...current, [filter.name]: event.target.value }))}
                  className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-emerald-500'
                >
                  <option value='all'>All</option>
                  {filterChoices[filter.name].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            ))}

            <div className='flex items-end'>
              <button
                type='button'
                onClick={applyFilters}
                className='flex h-9 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-2 text-xs font-medium text-white hover:bg-emerald-800 lg:w-full'
              >
                ⚱ {teaBrokerData.list.buttons.filter}
              </button>
            </div>
          </div>

          {/* TABLE */}

          <div className='overflow-x-auto rounded-md border border-slate-100'>
            <table className='w-full min-w-[1100px] border-collapse'>
              <thead>
                <tr className='bg-slate-50'>
                  {teaBrokerData.list.tableHeaders.map((header) => (
                    <th key={header} className='border-b border-slate-200 px-2 py-3 text-center text-[10px] font-semibold text-slate-600'>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {list.loading && !list.data ? (
                  <TableSkeleton rows={5} columns={teaBrokerData.list.tableHeaders.length} />
                ) : list.error ? (
                  <tr>
                    <td colSpan={teaBrokerData.list.tableHeaders.length} className='p-4'>
                      <ErrorState message={list.error.message} onRetry={list.reload} />
                    </td>
                  </tr>
                ) : positions.length === 0 ? (
                  <EmptyRow columns={teaBrokerData.list.tableHeaders.length} message='No sale positions found' />
                ) : (
                  positions.map((position, index) => (
                    <tr
                      key={position.id}
                      className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 ${editing?.id === position.id ? "bg-emerald-50/50" : ""}`}
                    >
                      <td className='px-3 py-4 text-center text-[9px] text-slate-600'>{(page - 1) * PER_PAGE + index + 1}</td>

                      <td className='px-3 py-4 text-center text-[10px] font-medium text-slate-700'>{position.auctionCenterName}</td>

                      <td className='px-3 py-4 text-center text-[10px] font-medium text-slate-700'>
                        <PendingBadge row={position} />
                        {position.saleNoLabel ?? "-"}
                      </td>

                      {BROKER_KEYS.map((key, brokerIndex) => (
                        <td
                          key={`${position.id}-${key}`}
                          className='max-w-[100px] px-2 py-4 text-center text-[10px] font-medium leading-3 text-slate-700'
                        >
                          {position.brokers?.[brokerIndex] ?? position[`${key}Name`] ?? "-"}
                        </td>
                      ))}

                      <td className='px-3 py-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            disabled={Boolean(position.pendingRequest)}
                            onClick={() => startEdit(position)}
                            className='flex h-7 w-7 items-center justify-center rounded-md border border-emerald-200 text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                            title={waitingTitle(position, "Edit")}
                          >
                            ✎
                          </button>

                          <button
                            type='button'
                            disabled={Boolean(position.pendingRequest)}
                            onClick={() => setDeleting(position)}
                            className='flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                            title={waitingTitle(position, "Delete")}
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER / PAGINATION */}

          <div className='mt-4 flex flex-col gap-3 text-[10px] text-slate-500 sm:flex-row sm:items-center sm:justify-between'>
            <span>
              Showing {from} to {to} of {total} entries
            </span>

            <div className='flex items-center gap-1'>
              <button type='button' className={pageButton} disabled={page <= 1} onClick={() => setPage(1)} aria-label='First page'>
                <ChevronsLeft size={14} />
              </button>

              <button type='button' className={pageButton} disabled={page <= 1} onClick={() => setPage((current) => current - 1)} aria-label='Previous page'>
                <ChevronLeft size={14} />
              </button>

              <span className='flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-xs font-medium text-white'>{page}</span>

              <button type='button' className={pageButton} disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} aria-label='Next page'>
                <ChevronRight size={14} />
              </button>

              <button type='button' className={pageButton} disabled={page >= totalPages} onClick={() => setPage(totalPages)} aria-label='Last page'>
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete the position of ${deleting?.auctionCenterName ?? "this"} sale ${deleting?.saleNoLabel ?? ""}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default BrokerSalePositionSetup;
