import { useEffect, useRef, useState } from "react";
import { useForm, applyServerErrors } from "../../lib/useForm";
import { useBlocker, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { nurseryManagementData } from "../../data/PlantationManagementData/nurseryManagementData";
import { api, notifySaved } from "../../lib/api";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import NurseryRowModal from "../../components/PlantationManagement/NurseryRowModal";
import {
  RotateCcw,
  Save,
  Plus,
  SquarePen,
  Trash2,
  Map,
  MapPinned,
  LayoutGrid,
  Sprout,
  Leaf,
  Truck,
  Minus,
  Expand,
  Eye,
} from "lucide-react";
import Select from "../../components/common/Select";
const summaryIconMap = {
  Map,
  MapPinned,
  LayoutGrid,
  Sprout,
  Leaf,
  Truck,
};
const FIELDS = [
  "estate", "division", "nurseryName", "supervisor", "nurseryCode", "nurseryType", "location", "irrigationSource",
  "establishedYear", "status", "totalArea", "netUsableArea", "active", "remarks",
];
const DASH = "-";
// Plain numbers with the grouping the page used (2,10,000).
const num = (value) => (value === null || value === undefined ? DASH : Number(value).toLocaleString("en-IN"));
// 2026-01-12 -> 12 Jan 2026 (no timezone: the text is rearranged, not parsed as a date)
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const longDate = (iso) => {
  if (!iso) return DASH;
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
};
const BED_STATUS_CLASS = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-600",
  Maintenance: "bg-yellow-100 text-yellow-700",
};
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);
// Bed and stock rows changed on the page and not saved yet: new rows (with a temporary id), edited rows by id, removed ids.
const NO_CHANGES = { beds: { add: [], update: {}, remove: [] }, stock: { add: [], update: {}, remove: [] } };
const KEY_OF = { bed: "beds", stock: "stock" };
const MARK_CLASS = {
  Unsaved: "bg-blue-100 text-blue-700",
  Edited: "bg-amber-100 text-amber-700",
  Removed: "bg-red-100 text-red-600",
};
const countOf = (list) => list.add.length + Object.keys(list.update).length + list.remove.length;
let tempCount = 0;
const newTempId = () => `new-${++tempCount}`;
const EMPTY_FORM = Object.fromEntries(FIELDS.map((name) => [name, ""]));
const toForm = (record) => Object.fromEntries(FIELDS.map((name) => [name, record?.[name] ?? ""]));

const NurseryManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const navigate = useNavigate();
  const leavingRef = useRef(false);
  // After a save, return to the page the user came from (the dashboard when the page was opened directly).
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"));

  // Every nursery, for the picker at the top of the form.
  const allNurseries = useApi(() => api.get("/nurseries", { perPage: 100 }), []);
  const pickNursery = (id) => setSearchParams(id ? { id } : {});

  // The nursery being edited (?id=), with its beds and stock. A page without ?id is a new nursery.
  const nursery = useApi(() => (editId ? api.get(`/nurseries/${editId}`) : Promise.resolve(null)), [editId]);
  const saved = nursery.data?.id === editId ? nursery.data : null;
  // One request is already waiting for this nursery: nothing can be changed until it is decided.
  const pendingRequest = saved?.pendingRequest ?? null;
  const shownId = editId;

  const summary = useApi(() => (shownId ? api.get(`/nurseries/${shownId}/summary`) : Promise.resolve(null)), [shownId]);
  const activities = useApi(() => (shownId ? api.get(`/nurseries/${shownId}/activities`) : Promise.resolve(null)), [shownId]);
  const activityRows = activities.data ?? [];
  // Nothing to show yet while the nursery is still being read.
  const waiting = Boolean(editId) && !saved && nursery.loading;

  // Beds and stock changed on the page and not saved yet, and the server's complaints about single rows.
  const [changes, setChanges] = useState(NO_CHANGES);
  const [problems, setProblems] = useState({});
  const changesCount = countOf(changes.beds) + countOf(changes.stock);
  // The form counts as edited once the user types or picks something (a reset by the page does not count).
  const [formEdited, setFormEdited] = useState(false);
  const hasUnsaved = formEdited || changesCount > 0;
  const dirtyRef = useRef(false);
  dirtyRef.current = formEdited;

  // Estate -> Division
  const estateId = watch("estate");
  const estateOptions = useApi(() => api.get("/options/estates"), []);
  const divisionOptions = useApi(
    () => (estateId ? api.get("/options/divisions", { estate: estateId }) : Promise.resolve([])),
    [estateId],
  );

  // Another nursery (or a new one) starts clean.
  useEffect(() => {
    setChanges(NO_CHANGES);
    setProblems({});
    setFormEdited(false);
    if (!editId) reset(EMPTY_FORM);
  }, [editId, reset]);
  useEffect(() => {
    if (saved && !dirtyRef.current) reset(toForm(saved));
  }, [saved, reset]);
  // The saved division shows once its options have loaded.
  useEffect(() => {
    const division = saved?.division;
    if (division && divisionOptions.data?.some((option) => option.value === division)) setValue("division", division);
  }, [saved, divisionOptions.data, setValue]);

  const reloadPanels = () => {
    nursery.reload();
    allNurseries.reload();
    summary.reload();
    activities.reload();
  };

  // The rows as the page shows them: saved rows with their unsaved edit or removal, then the new unsaved rows.
  const viewOf = (kind) => {
    const key = KEY_OF[kind];
    const list = changes[key];
    return [
      ...(saved?.[key] ?? []).map((row) => {
        const edit = list.update[row.id];
        const removed = list.remove.includes(row.id);
        return { ...row, ...(edit ?? {}), removed, mark: removed ? "Removed" : edit ? "Edited" : null };
      }),
      ...list.add.map((row) => ({ ...row, id: row.tempId, isNew: true, mark: "Unsaved" })),
    ];
  };
  const bedRows = viewOf("bed");
  const stockRows = viewOf("stock");
  const liveStock = stockRows.filter((row) => !row.removed);
  const sum = (field) => liveStock.reduce((total, row) => total + (Number(row[field]) || 0), 0);
  const stockTotals = liveStock.length
    ? [{ label: "Total", totalPlants: sum("totalPlants"), availablePlants: sum("availablePlants"), reservedPlants: sum("reservedPlants"), distributedPlants: sum("distributedPlants"), unit: "Nos" }]
    : [];

  // Bed and stock rows: one popup to view / add / edit; a question before remove. All of it changes the page only.
  const [rowPopup, setRowPopup] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);
  const openRowPopup = (kind, mode, row = null) => setRowPopup({ kind, mode, row });
  const clearProblem = (id) => setProblems((current) => ({ ...current, [id]: undefined }));
  const changeList = (kind, fn) => setChanges((current) => ({ ...current, [KEY_OF[kind]]: fn(current[KEY_OF[kind]]) }));
  const saveRow = (values) => {
    const { kind, row } = rowPopup;
    changeList(kind, (list) => {
      if (!row) return { ...list, add: [...list.add, { ...values, tempId: newTempId() }] };
      if (row.isNew) return { ...list, add: list.add.map((item) => (item.tempId === row.id ? { ...values, tempId: item.tempId } : item)) };
      return { ...list, update: { ...list.update, [row.id]: values } };
    });
    if (row) clearProblem(row.id);
    setRowPopup(null);
  };
  const removeRow = (kind, row) => {
    changeList(kind, (list) =>
      row.isNew
        ? { ...list, add: list.add.filter((item) => item.tempId !== row.id) }
        : { ...list, update: Object.fromEntries(Object.entries(list.update).filter(([id]) => id !== row.id)), remove: [...list.remove, row.id] },
    );
    clearProblem(row.id);
  };
  const restoreRow = (kind, row) => {
    changeList(kind, (list) => ({ ...list, remove: list.remove.filter((id) => id !== row.id) }));
    clearProblem(row.id);
  };
  const confirmDeleteRow = () => {
    removeRow(deletingRow.kind, deletingRow.row);
    setDeletingRow(null);
    setRowPopup(null);
  };

  // ONE Save: the form, the bed changes and the stock changes go in one request, so there is one approval.
  const onSubmit = async (values) => {
    const plain = (list) => list.map(({ tempId, ...row }) => { void tempId; return row; });
    let body;
    if (editId) {
      body = { ...values };
      for (const [kind, name] of [["bed", "bedChanges"], ["stock", "stockChanges"]]) {
        const list = changes[KEY_OF[kind]];
        const ids = Object.keys(list.update);
        if (countOf(list)) body[name] = { add: plain(list.add), update: ids.map((id) => ({ id, ...list.update[id] })), remove: list.remove };
      }
    } else {
      body = { ...values, beds: plain(changes.beds.add), stock: plain(changes.stock.add) };
    }
    try {
      const result = editId ? await api.put(`/nurseries/${editId}`, body) : await api.post("/nurseries", body);
      notifySaved(result, "Nursery saved successfully!");
      leavingRef.current = true;
      if (!result?.pending) reset(editId ? toForm(result) : EMPTY_FORM);
      reloadPanels();
      goBack();
    } catch (error) {
      // Row errors go to their row, everything else to the form field it names.
      const formErrors = {};
      const rowIssues = {};
      let gone = false;
      for (const [key, message] of Object.entries(error.fields ?? {})) {
        const match = key.match(/^(?:(bed|stock)Changes\.(add|update|remove)|(beds|stock))\.(\d+)/);
        if (match) {
          const list = changes[match[1] ? KEY_OF[match[1]] : match[3]];
          const index = Number(match[4]);
          const op = match[2] ?? "add";
          const rowKey = op === "update" ? Object.keys(list.update)[index] : op === "remove" ? list.remove[index] : list.add[index]?.tempId;
          if (rowKey && !rowIssues[rowKey]) rowIssues[rowKey] = message;
        } else formErrors[key] = message;
        if (/no longer/i.test(message)) gone = true;
      }
      setProblems(rowIssues);
      applyServerErrors(setError, { fields: formErrors });
      const rowCount = Object.keys(rowIssues).length;
      if (rowCount) toast.error(`${rowCount} row${rowCount === 1 ? " has" : "s have"} a problem. See the marked row${rowCount === 1 ? "" : "s"}.`);
      else toast.error(error.message);
      if (gone) reloadPanels(); // something was changed by someone else: show what is there now
    }
  };
  const resetAll = () => {
    reset(saved ? toForm(saved) : EMPTY_FORM);
    setChanges(NO_CHANGES);
    setProblems({});
    setFormEdited(false);
  };

  // Warn before leaving the page (another page, another nursery, refresh or closing the tab) with changes that are not saved.
  const blocker = useBlocker(({ currentLocation, nextLocation }) => hasUnsaved && !leavingRef.current && currentLocation.pathname + currentLocation.search !== nextLocation.pathname + nextLocation.search);
  useEffect(() => {
    if (!hasUnsaved) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasUnsaved]);
  const rowOff = (row) => Boolean(pendingRequest || row.pendingRequest);
  const rowTitle = (row, label) => (pendingRequest ? `Waiting for approval (${pendingRequest.requestNo})` : waitingTitle(row, label));
  const markOf = (row) => (row.mark ? <span className={`ml-2 inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold no-underline ${MARK_CLASS[row.mark]}`}>{row.mark}</span> : null);
  const problemOf = (row) => (problems[row.id] ? <p className='text-xs font-medium text-red-600 no-underline'>{problems[row.id]}</p> : null);
  const rowClass = (row) => `transition-colors ${problems[row.id] ? "bg-red-50" : row.removed ? "bg-gray-50 text-gray-400 line-through" : "hover:bg-gray-50"}`;
  return (
    <div className='space-y-6'>
      {pendingRequest && (
        <div role='status' className='rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800'>
          A request ({pendingRequest.requestNo}) is waiting for approval. This nursery cannot be changed until it is approved or rejected.
        </div>
      )}
      {!pendingRequest && changesCount > 0 && (
        <div role='status' className='rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800'>
          {changesCount} change{changesCount === 1 ? "" : "s"} to beds and stock {changesCount === 1 ? "is" : "are"} not saved yet. Press Save Nursery to send everything as one request.
        </div>
      )}

      {/* Main Layout */}
      <div className='grid grid-cols-12 gap-6'>
        {/* Left Side */}
        <div className='col-span-12 xl:col-span-5 flex flex-col gap-6'>
          {/* Nursery Information */}

          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-base font-semibold text-green-700'>
                  Nursery Information
                </h2>
                <button
                  type='button'
                  onClick={() => navigate("/nursery-list")}
                  className='cursor-pointer rounded-lg border border-green-700 bg-white px-3 py-1.5 text-sm font-medium text-green-700 transition hover:bg-green-50'
                >
                  Nursery List
                </button>
                <Select
                  aria-label='Select nursery'
                  value={editId ?? ""}
                  onChange={(e) => pickNursery(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-600 sm:w-auto'
                >
                  <option value=''>+ New nursery</option>
                  {(allNurseries.data?.data ?? []).map((nursery) => (
                    <option key={nursery.id} value={nursery.id}>
                      {nursery.nurseryName} ({nursery.nurseryCode})
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Body */}
            <form id='nursery-form' onChange={() => setFormEdited(true)} onSubmit={handleSubmit(onSubmit)} className='p-4 sm:p-6'>
              <fieldset disabled={Boolean(pendingRequest)} className='m-0 min-w-0 space-y-5 border-0 p-0'>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                {/* Estate */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Estate <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    {...register("estate", {
                      required: "Estate is required",
                      onChange: () => setValue("division", ""),
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Estate</option>
                    {(estateOptions.data ?? []).map((estate) => (
                      <option key={estate.id} value={estate.value}>
                        {estate.label}
                      </option>
                    ))}
                  </Select>

                  {errors.estate && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.estate.message}
                    </p>
                  )}
                </div>

                {/* Division */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Division <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    {...register("division", {
                      required: "Division is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>
{!estateId
 ? "Select Estate first"
 : divisionOptions.data?.length === 0
 ? "No divisions for this estate"
 : "Select Division"}
</option>
                    {(divisionOptions.data ?? []).map((division) => (
                      <option key={division.id} value={division.value}>
                        {division.label}
                      </option>
                    ))}
                  </Select>

                  {errors.division && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.division.message}
                    </p>
                  )}
                </div>

                {/* Nursery Name */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Name
                  </label>

                  <input
                    type='text'
                    placeholder='Central Nursery'
                    {...register("nurseryName", {
                      required: "Nursery Name is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.nurseryName && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.nurseryName.message}
                    </p>
                  )}
                </div>

                {/*Supervisor / In-charge  */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Supervisor / In-charge{" "}
                    <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    {...register("supervisor", {
                      required: "Supervisor is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Supervisor</option>
                    <option value='Md. Faruk Hossain'>Md. Faruk Hossain</option>
                    <option value='Abdul Karim'>Abdul Karim</option>
                    <option value='Nur Alam'>Nur Alam</option>
                  </Select>

                  {errors.supervisor && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.supervisor.message}
                    </p>
                  )}
                </div>

                {/* Nursery Code */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Code <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    placeholder='NUR-001'
                    {...register("nurseryCode", {
                      required: "Nursery Code is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.nurseryCode && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.nurseryCode.message}
                    </p>
                  )}
                </div>

                {/* Nursery type */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Type <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    {...register("nurseryType", {
                      required: "Nursery Type is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Nursery Type</option>
                    <option value='Clonal'>Clonal</option>
                    <option value='Seedling'>Seedling</option>
                    <option value='Experimental'>Experimental</option>
                  </Select>

                  {errors.nurseryType && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.nurseryType.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Location <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    placeholder='Uttarkhan, Rangpur'
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.location && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Irrigation */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Irrigation Source <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    {...register("irrigationSource", {
                      required: "Irrigation Source is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Irrigation Source</option>
                    <option value='Tube Well'>Tube Well</option>
                    <option value='Deep Tube Well'>Deep Tube Well</option>
                    <option value='River'>River</option>
                    <option value='Rain Water'>Rain Water</option>
                  </Select>

                  {errors.irrigationSource && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.irrigationSource.message}
                    </p>
                  )}
                </div>

                {/* Established Year */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Established Year <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    placeholder='2020'
                    {...register("establishedYear", {
                      required: "Established Year is required",
                      min: {
                        value: 1900,
                        message: "Enter a valid year",
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future",
                      },
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.establishedYear && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.establishedYear.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Status <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    {...register("status", {
                      required: "Status is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Status</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                    <option value='Under Maintenance'>Under Maintenance</option>
                  </Select>

                  {errors.status && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.status.message}
                    </p>
                  )}
                </div>
                {/* Total Area */}

                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Total Area (Acre) <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    step='0.01'
                    placeholder='5.60'
                    {...register("totalArea", {
                      required: "Total Area is required",
                      min: {
                        value: 0.01,
                        message: "Area must be greater than 0",
                      },
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.totalArea && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.totalArea.message}
                    </p>
                  )}
                </div>
                {/* Net useable are */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Net Usable Area (Acre){" "}
                    <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    step='0.01'
                    placeholder='4.80'
                    {...register("netUsableArea", {
                      required: "Net Usable Area is required",
                      min: {
                        value: 0.01,
                        message: "Area must be greater than 0",
                      },
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.netUsableArea && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.netUsableArea.message}
                    </p>
                  )}
                </div>
                {/* active select */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Active <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    {...register("active", {
                      required: "Please select an option",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select</option>
                    <option value='Tea Research Institute'>
                      Tea Research Institute
                    </option>
                    <option value='BTB'>Bangladesh Tea Board</option>
                    <option value='Private'>Private</option>
                  </Select>

                  {errors.active && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.active.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='col-span-full'>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Remarks
                </label>

                <textarea
                  rows={4}
                  placeholder='Write remarks...'
                  {...register("remarks")}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                />
              </div>

              {/* Buttons */}

              <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={resetAll}
                  className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium transition hover:bg-gray-100 sm:w-auto'
                >
                  <RotateCcw size={16} />
                  Reset
                </button>

                <button
                  type='submit'
                  disabled={isSubmitting || Boolean(pendingRequest)}
                  title={pendingRequest ? `Waiting for approval (${pendingRequest.requestNo})` : undefined}
                  className='flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2 text-sm cursor-pointer font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                >
                  <Save size={16} />
                  {isSubmitting ? "Saving..." : "Save Nursery"}
                </button>
              </div>
              </fieldset>
            </form>
          </div>

          {/* Nursery Production Summary */}

          <div className='flex-1 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Nursery Production Summary
              </h2>
            </div>

            {/* Body */}
            {summary.error && <ErrorState message={summary.error.message} onRetry={summary.reload} />}
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 p-4'>
              {/* Same-size empty boxes while loading, so the cards arriving does not change the page height. */}
              {(waiting || (summary.loading && !summary.data)) &&
                Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className='h-[84px] rounded-lg border border-gray-200 bg-gray-50' />
                ))}
              {(summary.data ?? []).map((item) => {
                const Icon = summaryIconMap[item.icon];

                return (
                  <div
                    key={item.id}
                    className='flex h-[84px] items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-green-300 hover:shadow-md'
                  >
                    {/* Icon */}
                    <div className='rounded-lg bg-green-100 p-1'>
                      <Icon size={22} className='text-green-700' />
                    </div>

                    {/* Content */}
                    <div>
                      <p className='text-xs text-gray-500'>{item.title}</p>

                      <h3 className='mt-1 text-xl font-bold text-green-700'>
                        {num(item.value)}
                        {item.unit && (
                          <span className='ml-1 text-sm font-medium text-gray-500'>
                            {item.unit}
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='col-span-12 xl:col-span-7 flex flex-col gap-6'>
          {/* Bed List */}
          <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-4 py-2 sm:px-6'>
              {/* Left */}
              <div>
                <h2 className='text-base font-semibold text-green-700'>
                  Nursery Bed / Section List
                </h2>
              </div>

              {/* Right */}
              <button
                type='button'
                onClick={() => openRowPopup("bed", "add")}
                disabled={Boolean(pendingRequest)}
                className='flex cursor-pointer items-center gap-2 rounded-lg border border-green-700 bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <Plus size={16} />
                Add Bed / Section
              </button>
            </div>

            {/* Every row (placeholder or real) is the same height and the box always holds 5 rows, so the list does not change size when its rows arrive. */}
            <div className='min-h-[316px] overflow-x-auto border border-t-0 border-gray-200 [&_tbody_tr]:h-[57px]'>
              <table className='min-w-full border-collapse'>
                <thead>
                  <tr className='bg-gray-50'>
                    {nurseryManagementData.bedTableHeaders.map((header) => (
                      <th
                        key={header}
                        className='border border-gray-200 px-1 py-1 text-left text-sm font-semibold text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {waiting ? (
                    <TableSkeleton rows={5} columns={nurseryManagementData.bedTableHeaders.length} />
                  ) : nursery.error ? (
                    <tr>
                      <td colSpan={nurseryManagementData.bedTableHeaders.length} className='p-4'>
                        <ErrorState message={nursery.error.message} onRetry={nursery.reload} />
                      </td>
                    </tr>
                  ) : bedRows.length === 0 ? (
                    <EmptyRow columns={nurseryManagementData.bedTableHeaders.length} />
                  ) : (
                  bedRows.map((bed, index) => (
                    <tr
                      key={bed.id}
                      className={rowClass(bed)}
                    >
                      <td className='border border-gray-200 px-4 py-3 text-sm text-center'>
                        {index + 1}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.name}
                        {markOf(bed)}
                        {problemOf(bed)}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.code}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {orDash(bed.clone)}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.area == null ? DASH : `${Number(bed.area).toFixed(2)} Acre`}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {num(bed.plants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {longDate(bed.plantingDate)}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-center'>
                        <span
                          className={`inline-flex rounded-full px-1 py-1 text-xs font-semibold ${BED_STATUS_CLASS[bed.status] ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {bed.status}
                        </span>
                      </td>

                      <td className='border border-gray-200 px-4 py-3'>
                        <PendingBadge row={bed} />
                        <div className='flex items-center justify-center gap-2 no-underline'>
                          {bed.removed ? (
                            <button
                              type='button'
                              disabled={rowOff(bed)}
                              title='Bring back'
                              onClick={() => restoreRow("bed", bed)}
                              className='rounded-md cursor-pointer p-2 text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40'
                            >
                              <RotateCcw size={17} />
                            </button>
                          ) : (
                            <>
                              <button
                                type='button'
                                disabled={rowOff(bed)}
                                title={rowTitle(bed, "Edit")}
                                onClick={() => openRowPopup("bed", "edit", bed)}
                                className='rounded-md cursor-pointer p-2 text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40'
                              >
                                <SquarePen size={17} />
                              </button>

                              <button
                                type='button'
                                disabled={rowOff(bed)}
                                title={rowTitle(bed, "Remove")}
                                onClick={() => setDeletingRow({ kind: "bed", row: bed })}
                                className='rounded-md cursor-pointer p-2 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40'
                              >
                                <Trash2 size={17} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
              {/* Table Footer */}

              <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-600 md:flex-row'>
                {/* Left */}
                <p>
                  Showing <span className='font-semibold text-gray-900'>{bedRows.length > 0 ? 1 : 0}</span>{" "}
                  to{" "}
                  <span className='font-semibold text-gray-900'>
                    {bedRows.length}
                  </span>{" "}
                  of{" "}
                  <span className='font-semibold text-green-700'>
                    {bedRows.length}
                  </span>{" "}
                  entries
                </p>

                {/* Right */}
                <p>
                  Total Beds :
                  <span className='ml-2 font-semibold text-green-700'>
                    {bedRows.length}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Nursery Map */}

          <div className='flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}

            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Nursery Map / Layout
              </h2>
            </div>

            {/* Body */}
            <div className='relative min-h-80 flex-1 overflow-hidden'>
              <img
                src='/land-lease-map.webp'
                alt='Nursery Map Layout'
                className='absolute inset-0 h-full w-full object-cover'
              />
              {/* Map Legend */}

              <div className='absolute right-16 top-3 w-44 rounded-xl border border-gray-200 bg-white p-3 shadow-lg sm:right-20 sm:top-5 sm:w-56 sm:p-5'>
                <h3 className='mb-3 text-sm font-semibold text-gray-800 sm:mb-4 sm:text-base'>
                  Map Legend
                </h3>
                {/* Map Controls */}

                <div className='space-y-3'>
                  {nurseryManagementData.mapLegend.map((item) => (
                    <div key={item.id} className='flex items-center gap-3'>
                      <span
                        className='h-4 w-4 rounded border border-gray-300'
                        style={{ backgroundColor: item.color }}
                      />

                      <span className='text-sm font-medium text-gray-700'>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg sm:right-5 sm:top-5'>
                {/* Zoom In */}
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center border-b border-gray-200 text-gray-700 transition hover:bg-gray-100'
                >
                  <Plus size={18} />
                </button>

                {/* Zoom Out */}
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center border-b border-gray-200 text-gray-700 transition hover:bg-gray-100'
                >
                  <Minus size={18} />
                </button>

                {/* Full Screen */}
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center text-gray-700 transition hover:bg-gray-100'
                >
                  <Expand size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}

      <section className='grid grid-cols-12 gap-6'>
        {/* Stock */}

        <div className='col-span-12 xl:col-span-7'>
          <div className='h-full rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Plant Stock / Inventory
              </h2>

              <button
                type='button'
                onClick={() => openRowPopup("stock", "add")}
                disabled={Boolean(pendingRequest)}
                className='flex cursor-pointer items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <Plus size={16} />
                Add Stock
              </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full border-collapse border border-gray-200'>
                {/* Table Header */}
                <thead>
                  <tr className='bg-gray-50'>
                    {nurseryManagementData.stockTableHeaders.map((header) => (
                      <th
                        key={header}
                        className='border border-gray-200 px-2 py-2 text-left text-sm font-normal text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {waiting ? (
                    <TableSkeleton rows={5} columns={nurseryManagementData.stockTableHeaders.length} />
                  ) : nursery.error ? (
                    <tr>
                      <td colSpan={nurseryManagementData.stockTableHeaders.length} className='p-4'>
                        <ErrorState message={nursery.error.message} onRetry={nursery.reload} />
                      </td>
                    </tr>
                  ) : stockRows.length === 0 ? (
                    <EmptyRow columns={nurseryManagementData.stockTableHeaders.length} />
                  ) : null}
                  {stockRows.map((item, index) => (
                    <tr
                      key={item.id}
                      className={rowClass(item)}
                    >
                      {/* SL */}
                      <td className='border border-gray-200 px-3 py-2 text-sm text-gray-700'>
                        {index + 1}
                      </td>

                      {/* Clone / Seed */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {item.clone}
                        {markOf(item)}
                        {problemOf(item)}
                      </td>

                      {/* Type */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {item.type}
                      </td>

                      {/* Total Plants */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {num(item.totalPlants)}
                      </td>

                      {/* Available Plants */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {num(item.availablePlants)}
                      </td>

                      {/* Reserved Plants */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {num(item.reservedPlants)}
                      </td>

                      {/* Distributed Plants */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {num(item.distributedPlants)}
                      </td>

                      {/* Unit */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {item.unit}
                      </td>

                      {/* Action */}
                      <td className='border border-gray-200 px-4 py-2 text-center'>
                        <PendingBadge row={item} />
                        <div className='flex items-center justify-center gap-2 no-underline'>
                          <button
                            type='button'
                            onClick={() => openRowPopup("stock", "view", item)}
                            className='cursor-pointer rounded-md text-blue-600 transition hover:bg-blue-100 hover:text-blue-700'
                            title='View Details'
                          >
                            <Eye size={18} />
                          </button>
                          {item.removed ? (
                            <button
                              type='button'
                              disabled={rowOff(item)}
                              title='Bring back'
                              onClick={() => restoreRow("stock", item)}
                              className='cursor-pointer rounded-md text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40'
                            >
                              <RotateCcw size={17} />
                            </button>
                          ) : (
                            <button
                              type='button'
                              disabled={rowOff(item)}
                              title={rowTitle(item, "Remove")}
                              onClick={() => setDeletingRow({ kind: "stock", row: item })}
                              className='cursor-pointer rounded-md text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40'
                            >
                              <Trash2 size={17} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {stockTotals.map((total) => (
                    <tr key={total.label} className='bg-gray-50 font-semibold'>
                      <td className='border border-gray-200 px-3 py-2'></td>

                      <td
                        colSpan={2}
                        className='border border-gray-200 px-4 py-2 text-center text-sm text-gray-700'
                      >
                        {total.label}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {num(total.totalPlants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {num(total.availablePlants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {num(total.reservedPlants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {num(total.distributedPlants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {total.unit}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className='flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-4 sm:px-6'>
              <p className='text-sm text-gray-600'>
                Showing {stockRows.length > 0 ? 1 : 0} to {stockRows.length} of{" "}
                {stockRows.length} entries
              </p>

              <button
                type='button'
                className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100'
              >
                View Stock Details
              </button>
            </div>
          </div>
        </div>

        {/* Activity */}

        <div className='col-span-12 xl:col-span-5'>
          <div className='flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-6'>
              <h2 className='text-base font-semibold text-green-700'>
                Recent Activities
              </h2>
            </div>

            {/* Body */}
            <div className='flex-1'>
              {activityRows.length === 0 && (
                <p className='px-5 py-6 text-center text-sm text-gray-500'>
                  {activities.error ? activities.error.message : "No recent activities"}
                </p>
              )}
              {activityRows.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between px-5 py-3 ${
                    index !== activityRows.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <p className='text-sm text-gray-700'>{item.activity}</p>

                  <span className='ml-4 shrink-0 text-xs text-gray-500'>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
            {/* Footer: always at the bottom of the card */}
            <div className='mt-auto flex flex-col-reverse gap-3 rounded-xl border border-gray-200 px-4 py-5 sm:flex-row sm:justify-end sm:px-6'>
              {/* Cancel */}
              <button
                type='button'
                className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto'
              >
                <RotateCcw size={16} />
                Cancel
              </button>

              {/* Save */}
              <button
                type='submit'
                form='nursery-form'
                disabled={isSubmitting || Boolean(pendingRequest)}
                title={pendingRequest ? `Waiting for approval (${pendingRequest.requestNo})` : undefined}
                className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
              >
                <Save size={16} />
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </section>

      {rowPopup && (
        <NurseryRowModal
          key={`${rowPopup.kind}-${rowPopup.row?.id ?? "new"}`}
          kind={rowPopup.kind}
          mode={rowPopup.mode}
          row={rowPopup.row}
          onClose={() => setRowPopup(null)}
          onSave={saveRow}
          onDelete={(row) => {
            setDeletingRow({ kind: rowPopup.kind, row });
            setRowPopup(null);
          }}
        />
      )}
      <ConfirmDialog
        open={Boolean(deletingRow)}
        title={deletingRow?.kind === "bed" ? "Remove bed / section?" : "Remove stock row?"}
        confirmLabel='Remove'
        message={`${deletingRow?.kind === "bed" ? deletingRow?.row?.name : deletingRow?.row?.clone} will be removed when you press Save Nursery.`}
        onConfirm={confirmDeleteRow}
        onCancel={() => setDeletingRow(null)}
      />
      <ConfirmDialog
        open={blocker.state === "blocked"}
        title='Leave without saving?'
        message='Some changes on this page are not saved yet. If you leave, they are lost.'
        confirmLabel='Leave'
        onConfirm={() => blocker.proceed()}
        onCancel={() => blocker.reset()}
      />
    </div>
  );
};

export default NurseryManagement;
