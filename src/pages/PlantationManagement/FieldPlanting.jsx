import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fieldPlantingData } from "../../data/PlantationManagementData/fieldPlantingData";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import CardSkeleton from "../../components/common/CardSkeleton";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
const { historyTableHeaders, fieldMap, quickSummary, plantingProgress } = fieldPlantingData;

import {
  Upload,
  RotateCcw,
  X,
  Save,
  Send,
  Printer,
  Plus,
  Minus,
  Layers,
  Expand,
  Map,
  Leaf,
  Target,
  TrendingUp,
  Sprout,
  CirclePercent,
  Download,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import Select from "../../components/common/Select";
const summaryIconMap = {
  Map,
  Leaf,
  Target,
  TrendingUp,
  Sprout,
  CirclePercent,
};
const PER_PAGE = 10;
const DASH = "-";
const FIELDS = [
  "estate", "division", "section", "fieldBlock", "plantingYear", "plantingSeason", "plantingDate", "plantingMethod",
  "plantSource", "nurseryBed", "cloneVariety", "plantType", "totalArea", "netPlantableArea", "previousCrop",
  "rowSpacing", "plantSpacing", "pitSize", "expectedPlants", "targetPlants", "signalPlant", "soilType", "soilPH",
  "elevation", "slope", "drainage", "irrigationSource", "irrigationMethod", "basalFertilizer", "organicManure",
  "shadeTreePlanned", "npkAmount", "npkUnit", "tspAmount", "tspUnit", "mopAmount", "mopUnit", "fymAmount", "fymUnit",
  "shadeTreeSpecies", "shadeTreeSpacing", "shadeTreeCount", "shadePurpose", "shadePlantingDate", "shadeRemarks",
  "fieldOfficer", "assistantSupervisor", "totalLabour", "maleLabour", "femaleLabour", "labourSource", "remarks",
];
const num = (value) => (value === null || value === undefined ? DASH : Number(value).toLocaleString("en-IN"));
const fixed = (value) => (value === null || value === undefined ? DASH : Number(value).toFixed(2));
// 2026-02-15 -> 15/02/2026 (no timezone: the text is rearranged, not parsed as a date)
const dmy = (iso) => (iso ? iso.slice(0, 10).split("-").reverse().join("/") : DASH);
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);
const STATUS_CLASS = {
  Planned: "bg-gray-100 text-gray-600",
  "In Progress": "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};
const yesNo = (value) => (value ? "Yes" : "No");
const VIEW_FIELDS = [
  ["Estate", "estateName"], ["Division", "divisionName"], ["Section", "sectionName"], ["Field / Block", "fieldBlockName"],
  ["Planting Year", "plantingYear"], ["Planting Season", "plantingSeason"], ["Planting Date", "plantingDate", dmy],
  ["Planting Method", "plantingMethod"], ["Plant Source", "plantSource"], ["Nursery Bed", "nurseryBed"],
  ["Clone / Variety", "cloneVariety"], ["Plant Type", "plantType"], ["Total Area", "totalArea", fixed],
  ["Net Plantable Area", "netPlantableArea", fixed], ["Previous Crop", "previousCrop"], ["Row Spacing", "rowSpacing"],
  ["Plant Spacing", "plantSpacing"], ["Pit Size", "pitSize"], ["Expected Plants", "expectedPlants", num],
  ["Target Plants", "targetPlants", num], ["Planted Plants", "plantedPlants", num], ["Signal Plant", "signalPlant"],
  ["Soil Type", "soilType"], ["Soil pH", "soilPH"], ["Elevation", "elevation"], ["Slope", "slope"], ["Drainage", "drainage"],
  ["Irrigation Source", "irrigationSource"], ["Irrigation Method", "irrigationMethod"],
  ["Basal Fertilizer", "basalFertilizer"], ["Organic Manure", "organicManure"], ["Shade Tree Planned", "shadeTreePlanned", yesNo],
  ["Shade Tree Species", "shadeTreeSpecies"], ["Shade Tree Spacing", "shadeTreeSpacing"], ["Shade Tree Count", "shadeTreeCount"],
  ["Shade Purpose", "shadePurpose"], ["Shade Planting Date", "shadePlantingDate", dmy],
  ["Field Officer", "fieldOfficer"], ["Assistant Supervisor", "assistantSupervisor"], ["Total Labour", "totalLabour"],
  ["Male Labour", "maleLabour"], ["Female Labour", "femaleLabour"], ["Labour Source", "labourSource"],
  ["Completion", "completion", (value) => (value === null || value === undefined ? DASH : value + "%")],
  ["Status", "plantingStatus"], ["Remarks", "remarks"],
];
const toForm = (record) =>
  Object.fromEntries(FIELDS.map((name) => [name, name === "shadeTreePlanned" ? Boolean(record[name]) : (record[name] ?? "")]));
const EMPTY_FORM = Object.fromEntries(FIELDS.map((name) => [name, name === "shadeTreePlanned" ? false : ""]));

const FieldPlanting = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const formRef = useRef(null);
  const navigate = useNavigate();
  // After a save, return to the page the user came from (the dashboard when the page was opened directly).
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"));
  const [editingId, setEditingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  // History table, and the record shown in the panels (the clicked row, else the first).
  const history = useApi(() => api.get("/field-plantings", { page, perPage: PER_PAGE }), [page]);
  const historyRows = history.data?.data ?? [];
  const meta = history.data?.meta;
  const activeId = editingId ?? (historyRows.some((row) => row.id === selectedId) ? selectedId : historyRows[0]?.id);
  const record = useApi(() => (activeId ? api.get(`/field-plantings/${activeId}`) : Promise.resolve(null)), [activeId, history.data]);
  const shown = record.data;
  const progress = shown?.plantingProgress;
  const percent = Math.max(0, Math.min(100, Number(progress?.percentage) || 0));

  // Field Map: the picture can be zoomed, the legend switched off, and the map opened full screen;
  // the position is the middle of the field's boundary.
  const mapRef = useRef(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [showLegend, setShowLegend] = useState(true);
  const fieldShape = useApi(() => (shown?.fieldBlock ? api.get(`/fields/${shown.fieldBlock}`).catch(() => null) : Promise.resolve(null)), [shown?.fieldBlock]);
  const boundary = Array.isArray(fieldShape.data?.polygon) ? fieldShape.data.polygon.filter((p) => Array.isArray(p) && p.length >= 2) : [];
  const centre = boundary.length
    ? [boundary.reduce((t, p) => t + Number(p[0]), 0) / boundary.length, boundary.reduce((t, p) => t + Number(p[1]), 0) / boundary.length]
    : null;
  const openMapFullScreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else mapRef.current?.requestFullscreen?.().catch(() => toast.error("Full screen is not available in this browser."));
  };

  // Dropdowns that pick records follow each other.
  const estateId = watch("estate");
  const divisionId = watch("division");
  const sectionId = watch("section");
  const estateOptions = useApi(() => api.get("/options/estates"), []);
  const divisionOptions = useApi(
    () => (estateId ? api.get("/options/divisions", { estate: estateId }) : Promise.resolve([])),
    [estateId],
  );
  const sectionOptions = useApi(
    () => (divisionId ? api.get("/options/sections", { division: divisionId }) : Promise.resolve([])),
    [divisionId],
  );
  const fieldOptions = useApi(
    () => (sectionId ? api.get("/options/fields", { section: sectionId }) : Promise.resolve([])),
    [sectionId],
  );

  // Opening a planting for edit: the saved values show once their options exist. Records saved with a
  // display text ("Manual") still find their option ("manual") by its label.
  const editing = editingId && record.data?.id === editingId ? record.data : null;
  useEffect(() => {
    if (!editing) return;
    reset(toForm(editing));
    const timer = setTimeout(() => {
      const form = formRef.current;
      if (!form) return;
      for (const select of form.querySelectorAll("select[name]")) {
        const saved = editing[select.name];
        if (saved === null || saved === undefined || saved === "" || typeof saved === "boolean") continue;
        const text = String(saved).toLowerCase();
        const options = Array.from(select.options);
        if (options.some((option) => option.value === String(saved))) continue;
        const match = options.find((option) => {
          const label = option.text.trim().toLowerCase();
          return label && (label.startsWith(text) || text.startsWith(label));
        });
        if (match) setValue(select.name, match.value);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [editing, reset, setValue]);
  useEffect(() => {
    if (!editing) return;
    for (const [name, options] of [
      ["division", divisionOptions.data],
      ["section", sectionOptions.data],
      ["fieldBlock", fieldOptions.data],
    ]) {
      if (options?.some((option) => option.value === editing[name])) setValue(name, editing[name]);
    }
  }, [editing, divisionOptions.data, sectionOptions.data, fieldOptions.data, setValue]);

  const reloadAll = () => {
    history.reload();
    record.reload();
  };
  const resetForm = () => reset(editing ? toForm(editing) : EMPTY_FORM);
  const cancelEdit = () => {
    setEditingId(null);
    reset(EMPTY_FORM);
  };
  // Edit and View open as popups.
  const startEdit = (id) => {
    setViewOpen(false);
    setEditingId(id);
  };
  const startView = (id) => {
    if (editingId) cancelEdit();
    setSelectedId(id);
    setViewOpen(true);
  };
  useEffect(() => {
    if (!editingId && !viewOpen) return undefined;
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      if (viewOpen) setViewOpen(false);
      else {
        setEditingId(null);
        reset(EMPTY_FORM);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [editingId, viewOpen, reset]);

  // Each picked file is uploaded first; the record keeps the ids.
  const uploadAll = async (files, kept) => {
    const uploaded = [];
    for (const file of Array.from(files ?? [])) uploaded.push((await api.upload(file)).id);
    return [...kept, ...uploaded];
  };
  const savePlanting = async (values, { print = false } = {}) => {
    try {
      const body = {
        ...values,
        documents: await uploadAll(values.documents, editing?.documents ?? []),
        photos: await uploadAll(values.photos, editing?.photos ?? []),
      };
      const saved = editingId ? await api.put(`/field-plantings/${editingId}`, body) : await api.post("/field-plantings", body);
      toast.success("Field planting saved successfully!");
      const wasEditing = Boolean(editingId);
      reset(EMPTY_FORM);
      if (!wasEditing) setSelectedId(saved.id);
      reloadAll();
      if (print) window.print();
      // The edit popup closes after saving; the add form goes back to the previous page.
      if (wasEditing) setEditingId(null);
      else goBack();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };
  const onSubmit = (values) => savePlanting(values);

  // Export: every planting of the history (all pages) as a CSV file, in the table's columns.
  const exportHistory = async () => {
    setExporting(true);
    try {
      const rows = [];
      for (let pageNo = 1; ; pageNo += 1) {
        const part = await api.get("/field-plantings", { page: pageNo, perPage: 100 });
        rows.push(...part.data);
        if (pageNo >= (part.meta?.totalPages ?? 1)) break;
      }
      if (rows.length === 0) {
        toast.error("There is nothing to export.");
        return;
      }
      const cell = (value) => {
        const text = String(value ?? "");
        return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
      };
      const lines = [
        historyTableHeaders.slice(1, -1),
        ...rows.map((item) => [
          item.plantingYear,
          item.fieldBlockName,
          item.totalArea,
          item.cloneVariety,
          dmy(item.plantingDate),
          item.plantingMethod,
          item.expectedPlants,
          item.plantingProgress?.plantsPlanted,
          item.completion,
          item.plantingStatus,
        ]),
      ];
      const blob = new Blob(["\ufeff" + lines.map((line) => line.map(cell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `field-planting-history-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      toast.success(`${rows.length} ${rows.length === 1 ? "planting" : "plantings"} exported successfully!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setExporting(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      await api.del(`/field-plantings/${deleting.id}`);
      toast.success("Field planting deleted successfully!");
      if (editingId === deleting.id) cancelEdit();
      setDeleting(null);
      reloadAll();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteBusy(false);
    }
  };
  const documentCount = (editing?.documents?.length ?? 0) + (watch("documents")?.length ?? 0);
  const photoCount = watch("photos")?.length ?? 0;

  return (
    <div className='space-y-6'>
      {/* Plantation Tabs */}
      {/* ===========================
          Field Planting Form
      =========================== */}
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className={editingId ? "fixed inset-0 z-[90] overflow-y-auto bg-black/40 p-2 sm:p-6" : undefined}
        onMouseDown={editingId ? (event) => event.target === event.currentTarget && cancelEdit() : undefined}
      >
        {/* In the edit popup the form and its buttons share one panel, so there is no gap between them. */}
        <div className={editingId ? "mx-auto w-full max-w-5xl rounded-xl bg-slate-50 p-3" : "contents"}>
        <div className='grid grid-cols-12 gap-2'>
          {editingId && (
            <div className='col-span-12 flex items-center justify-between border-b border-gray-200 pb-2'>
              <h2 className='text-base font-semibold text-green-700'>Edit Field Planting</h2>
              <button type='button' onClick={cancelEdit} aria-label='Close' className='rounded p-1 text-gray-500 hover:bg-gray-100'>
                <X size={18} />
              </button>
            </div>
          )}
          {/* ===========================
              Left Section
          =========================== */}
          <div className={editingId ? "col-span-12 space-y-6" : "col-span-12 lg:col-span-8 space-y-6"}>
            {/* ===========================
                Planting Information
            =========================== */}
            <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* Card Header */}
              <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Field Planting Information
                </h2>
              </div>

              {/* Card Body */}
              <div className='space-y-5 p-2'>
                {/* ===========================
                  Row 01
                 =========================== */}

                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Estate */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("estate", {
                        required: "Estate is required",
                        onChange: () => {
                          setValue("division", "");
                          setValue("section", "");
                          setValue("fieldBlock", "");
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Estate</option>
                      {(estateOptions.data ?? []).map((estate) => (
                        <option key={estate.id} value={estate.value}>
                          {estate.label}
                        </option>
                      ))}
                    </Select>

                    {errors.estate && (
                      <p className='text-xs text-red-500'>
                        {errors.estate.message}
                      </p>
                    )}
                  </div>

                  {/* Division */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Division <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("division", {
                        required: "Division is required",
                        onChange: () => {
                          setValue("section", "");
                          setValue("fieldBlock", "");
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
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
                      <p className='text-xs text-red-500'>
                        {errors.division.message}
                      </p>
                    )}
                  </div>

                  {/* Section */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Section <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("section", {
                        required: "Section is required",
                        onChange: () => setValue("fieldBlock", ""),
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>
{!divisionId
 ? "Select Division first"
 : sectionOptions.data?.length === 0
 ? "No sections for this division"
 : "Select Section"}
</option>
                      {(sectionOptions.data ?? []).map((section) => (
                        <option key={section.id} value={section.value}>
                          {section.label}
                        </option>
                      ))}
                    </Select>

                    {errors.section && (
                      <p className='text-xs text-red-500'>
                        {errors.section.message}
                      </p>
                    )}
                  </div>

                  {/* Field / Block */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Field / Block <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("fieldBlock", {
                        required: "Field / Block is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>
{!sectionId
 ? "Select Section first"
 : fieldOptions.data?.length === 0
 ? "No fields in this section"
 : "Select Field / Block"}
</option>
                      {(fieldOptions.data ?? []).map((field) => (
                        <option key={field.id} value={field.value}>
                          {field.label}
                        </option>
                      ))}
                    </Select>

                    {errors.fieldBlock && (
                      <p className='text-xs text-red-500'>
                        {errors.fieldBlock.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Year */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Planting Year <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      placeholder='e.g. 2026'
                      {...register("plantingYear", {
                        required: "Planting Year is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />

                    {errors.plantingYear && (
                      <p className='text-xs text-red-500'>
                        {errors.plantingYear.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ===========================
                  Row 02
              =========================== */}

                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Planting Season */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Planting Season <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("plantingSeason", {
                        required: "Planting Season is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Season</option>
                      <option value='spring'>Spring</option>
                      <option value='summer'>Summer</option>
                      <option value='monsoon'>Monsoon</option>
                      <option value='winter'>Winter</option>
                    </Select>

                    {errors.plantingSeason && (
                      <p className='text-xs text-red-500'>
                        {errors.plantingSeason.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Date */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Planting Date <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='date'
                      {...register("plantingDate", {
                        required: "Planting Date is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />

                    {errors.plantingDate && (
                      <p className='text-xs text-red-500'>
                        {errors.plantingDate.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Method */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Planting Method <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("plantingMethod", {
                        required: "Planting Method is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Method</option>
                      <option value='manual'>Manual</option>
                      <option value='mechanical'>Mechanical</option>
                      <option value='mixed'>Mixed</option>
                    </Select>

                    {errors.plantingMethod && (
                      <p className='text-xs text-red-500'>
                        {errors.plantingMethod.message}
                      </p>
                    )}
                  </div>

                  {/* Plant Source */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Plant Source <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("plantSource", {
                        required: "Plant Source is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Source</option>
                      <option value='own-nursery'>Own Nursery</option>
                      <option value='central-nursery'>Central Nursery</option>
                      <option value='external'>External Supplier</option>
                    </Select>

                    {errors.plantSource && (
                      <p className='text-xs text-red-500'>
                        {errors.plantSource.message}
                      </p>
                    )}
                  </div>

                  {/* Nursery Bed / Section */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Nursery Bed / Section
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Nursery Bed'
                      {...register("nurseryBed")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>
                </div>

                {/* ===========================
                          Row 03
                    =========================== */}
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Clone / Variety */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Clone / Variety <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("cloneVariety", {
                        required: "Clone / Variety is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Clone</option>
                      <option value='bt1'>BT-1</option>
                      <option value='bt2'>BT-2</option>
                      <option value='bt3'>BT-3</option>
                      <option value='tv1'>TV-1</option>
                      <option value='tv23'>TV-23</option>
                    </Select>

                    {errors.cloneVariety && (
                      <p className='text-xs text-red-500'>
                        {errors.cloneVariety.message}
                      </p>
                    )}
                  </div>

                  {/* Plant Type */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Plant Type <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("plantType", {
                        required: "Plant Type is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Plant Type</option>
                      <option value='seedling'>Seedling</option>
                      <option value='clonal'>Clonal</option>
                      <option value='grafted'>Grafted</option>
                    </Select>

                    {errors.plantType && (
                      <p className='text-xs text-red-500'>
                        {errors.plantType.message}
                      </p>
                    )}
                  </div>

                  {/* Total Area */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Total Area (Acre)
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='0.00'
                      {...register("totalArea")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Net Plantable Area */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Net Plantable Area
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='0.00'
                      {...register("netPlantableArea")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Previous Crop / Land Use */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Previous Crop / Land
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Previous Crop'
                      {...register("previousCrop")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>
                </div>

                {/* ===========================
                        Row 04
                    =========================== */}
                {/* ---------------- Row 04 ---------------- */}

                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Plant Spacing */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Spacing (R × P) <span className='text-red-500'>*</span>
                    </label>

                    <div className='grid grid-cols-2 gap-2'>
                      <div className='flex'>
                        <input
                          type='number'
                          step='0.1'
                          placeholder='4.0'
                          {...register("rowSpacing")}
                          className='h-11 w-full rounded-l-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                        />
                        <span className='flex h-11 w-10 items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 text-sm'>
                          ft
                        </span>
                      </div>

                      <div className='flex'>
                        <input
                          type='number'
                          step='0.1'
                          placeholder='2.5'
                          {...register("plantSpacing")}
                          className='h-11 w-full rounded-l-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                        />
                        <span className='flex h-11 w-10 items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 text-sm'>
                          ft
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pit Size */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Pit Size (L × W × D)
                    </label>

                    <input
                      type='text'
                      placeholder='18" × 18" × 18"'
                      {...register("pitSize")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* Expected Plants */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Expected Plants
                    </label>

                    <input
                      type='number'
                      placeholder='24800'
                      {...register("expectedPlants")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* Target Plants */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Target Plants
                    </label>

                    <input
                      type='number'
                      placeholder='24600'
                      {...register("targetPlants")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* Signal Plant */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Signal Plant %
                    </label>

                    <div className='flex'>
                      <input
                        type='number'
                        placeholder='2'
                        {...register("signalPlant")}
                        className='h-11 w-full rounded-l-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />

                      <span className='flex h-11 w-10 items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 text-sm'>
                        %
                      </span>
                    </div>
                  </div>
                </div>

                {/* ===========================
                        Row 05
                    =========================== */}

                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Soil Type */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Soil Type <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("soilType", {
                        required: "Soil Type is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Soil Type</option>
                      <option value='loamy'>Loamy</option>
                      <option value='clay'>Clay</option>
                      <option value='sandy'>Sandy</option>
                      <option value='silty'>Silty</option>
                    </Select>

                    {errors.soilType && (
                      <p className='text-xs text-red-500'>
                        {errors.soilType.message}
                      </p>
                    )}
                  </div>

                  {/* Soil pH */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Soil pH
                    </label>

                    <input
                      type='number'
                      step='0.1'
                      placeholder='5.2'
                      {...register("soilPH")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Elevation */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Elevation (ft)
                    </label>

                    <input
                      type='number'
                      placeholder='240'
                      {...register("elevation")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Slope */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Slope (%)
                    </label>

                    <Select
                      {...register("slope")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Slope</option>
                      <option value='2%'>2%</option>
                      <option value='5%'>5%</option>
                      <option value='8%'>8%</option>
                      <option value='10%'>10%</option>
                    </Select>
                  </div>

                  {/* Drainage */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Drainage
                    </label>

                    <Select
                      {...register("drainage")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Drainage</option>
                      <option value='excellent'>Excellent</option>
                      <option value='good'>Good</option>
                      <option value='average'>Average</option>
                      <option value='poor'>Poor</option>
                    </Select>
                  </div>
                </div>

                {/* ===========================
                    Row 06
                =========================== */}
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Irrigation Source */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Irrigation Source
                    </label>

                    <Select
                      {...register("irrigationSource")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Source</option>
                      <option value='tube-well'>Tube Well</option>
                      <option value='river'>River</option>
                      <option value='canal'>Canal</option>
                      <option value='pond'>Pond</option>
                      <option value='rain-water'>Rain Water Harvesting</option>
                    </Select>
                  </div>

                  {/* Irrigation Method */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Irrigation Method
                    </label>

                    <Select
                      {...register("irrigationMethod")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Method</option>
                      <option value='sprinkler'>Sprinkler</option>
                      <option value='drip'>Drip Irrigation</option>
                      <option value='flood'>Flood Irrigation</option>
                      <option value='manual'>Manual</option>
                    </Select>
                  </div>

                  {/* Basal Fertilizer */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Basal Fertilizer ( Acre)
                    </label>

                    <Select
                      {...register("basalFertilizer")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Fertilizer</option>
                      <option value='npk-50'>NPK 50:50:50 - 20 Kg</option>
                      <option value='npk-40'>NPK 40:40:40 - 25 Kg</option>
                      <option value='dap'>DAP - 25 Kg</option>
                      <option value='urea'>Urea - 20 Kg</option>
                    </Select>
                  </div>

                  {/* Organic Manure */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Organic Manure (Ac)
                    </label>

                    <input
                      type='text'
                      placeholder='FYM - 1,000 Kg'
                      {...register("organicManure")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Shade Tree Planned */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Shade Tree Planned?
                    </label>

                    <div className='flex h-11 items-center gap-3 rounded-lg border border-gray-300 px-3'>
                      <span
                        className={`text-sm ${
                          watch("shadeTreePlanned")
                            ? "text-gray-400"
                            : "font-medium text-red-500"
                        }`}
                      >
                        No
                      </span>

                      <input
                        type='checkbox'
                        {...register("shadeTreePlanned")}
                        className='toggle toggle-success'
                      />

                      <span
                        className={`text-sm ${
                          watch("shadeTreePlanned")
                            ? "font-medium text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        Yes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fertilizer + Shade Tree */}
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
              {/* ===========================
                  Fertilizer Schedule
              =========================== */}
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                  <h2 className='text-lg font-semibold text-green-700'>
                    Fertilizer Schedule (At Planting Time)
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-3 p-4 sm:p-6'>
                  {/* Column Header */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-12 sm:col-span-5'>
                      <label className='text-sm font-semibold text-gray-700'>
                        Fertilizer / Material
                      </label>
                    </div>

                    <div className='col-span-12 sm:col-span-4'>
                      <label className='text-sm font-semibold text-gray-700'>
                        Amount (Per Acre)
                      </label>
                    </div>

                    <div className='col-span-12 sm:col-span-3'>
                      <label className='text-sm font-semibold text-gray-700'>
                        Unit
                      </label>
                    </div>
                  </div>

                  {/* Row 01 */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-12 sm:col-span-5'>
                      <input
                        type='text'
                        defaultValue='NPK (15:15:15)'
                        readOnly
                        className='h-10 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm'
                      />
                    </div>

                    <div className='col-span-12 sm:col-span-4'>
                      <input
                        type='number'
                        defaultValue='50'
                        {...register("npkAmount")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    <div className='col-span-12 sm:col-span-3'>
                      <Select
                        {...register("npkUnit")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option>Kg</option>
                        <option>Gram</option>
                        <option>Ton</option>
                        <option>Bag</option>
                      </Select>
                    </div>
                  </div>

                  {/* Row 02 */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-12 sm:col-span-5'>
                      <input
                        type='text'
                        defaultValue='TSP'
                        readOnly
                        className='h-10 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm'
                      />
                    </div>

                    <div className='col-span-12 sm:col-span-4'>
                      <input
                        type='number'
                        defaultValue='25'
                        {...register("tspAmount")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    <div className='col-span-12 sm:col-span-3'>
                      <Select
                        {...register("tspUnit")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option>Kg</option>
                        <option>Gram</option>
                        <option>Ton</option>
                        <option>Bag</option>
                      </Select>
                    </div>
                  </div>

                  {/* Row 03 */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-12 sm:col-span-5'>
                      <input
                        type='text'
                        defaultValue='MOP'
                        readOnly
                        className='h-10 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm'
                      />
                    </div>

                    <div className='col-span-12 sm:col-span-4'>
                      <input
                        type='number'
                        defaultValue='25'
                        {...register("mopAmount")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    <div className='col-span-12 sm:col-span-3'>
                      <Select
                        {...register("mopUnit")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option>Kg</option>
                        <option>Gram</option>
                        <option>Ton</option>
                        <option>Bag</option>
                      </Select>
                    </div>
                  </div>

                  {/* Row 04 */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-12 sm:col-span-5'>
                      <input
                        type='text'
                        defaultValue='FYM'
                        readOnly
                        className='h-10 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm'
                      />
                    </div>

                    <div className='col-span-12 sm:col-span-4'>
                      <input
                        type='number'
                        defaultValue='1000'
                        {...register("fymAmount")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    <div className='col-span-12 sm:col-span-3'>
                      <Select
                        {...register("fymUnit")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option>Kg</option>
                        <option>Gram</option>
                        <option>Ton</option>
                        <option>Bag</option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===========================
                      Shade Tree Information
                  =========================== */}
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                  <h2 className='text-lg font-semibold text-green-700'>
                    Shade Tree Information
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-4 p-2 pt-6'>
                  {/* ---------------- Row 01 ---------------- */}
                  <div className='grid grid-cols-12 gap-3'>
                    {/* Shade Tree Species */}
                    <div className='col-span-12 sm:col-span-4 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Shade Species
                      </label>

                      <Select
                        {...register("shadeTreeSpecies")}
                        className='h-14 w-full rounded-lg border border-gray-300 bg-white px-1 text-sm outline-none focus:border-green-600'
                      >
                        <option value=''>Select Species</option>
                        <option value='grevillea'>Grevillea Robusta</option>
                        <option value='albizia'>Albizia</option>
                        <option value='acacia'>Acacia</option>
                        <option value='gliricidia'>Gliricidia</option>
                      </Select>
                    </div>

                    {/* Spacing */}
                    <div className='col-span-12 sm:col-span-3 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Spacing
                      </label>

                      <Select
                        {...register("shadeTreeSpacing")}
                        className='h-14 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option value=''>Select</option>
                        <option>20 × 20 ft</option>
                        <option>25 × 25 ft</option>
                        <option>30 × 30 ft</option>
                      </Select>
                    </div>

                    {/* No of Shade Trees */}
                    <div className='col-span-12 sm:col-span-5 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        No. of shade tr (PA)
                      </label>

                      <input
                        type='number'
                        placeholder='25'
                        {...register("shadeTreeCount")}
                        className='h-14 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>
                  </div>

                  {/* ---------------- Row 02 ---------------- */}
                  <div className='grid grid-cols-12 gap-3 pt-6'>
                    {/* Purpose */}
                    <div className='col-span-12 sm:col-span-4 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Purpose
                      </label>

                      <input
                        type='text'
                        placeholder='Shade & Wind Break'
                        {...register("shadePurpose")}
                        className='h-14 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Planting Date */}
                    <div className='col-span-12 sm:col-span-4 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Planting Date
                      </label>

                      <input
                        type='date'
                        {...register("shadePlantingDate")}
                        className='h-14 w-full rounded-lg border border-gray-300 px-1 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Remarks */}
                    <div className='col-span-12 sm:col-span-4 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Remarks
                      </label>

                      <input
                        type='text'
                        placeholder='Planned along boundary'
                        {...register("shadeRemarks")}
                        className='h-14 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Officer + Labour */}
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
              {/* ===========================
                      Field Officer
                  =========================== */}
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                  <h2 className='text-lg font-semibold text-green-700'>
                    Field Officer / Supervisor
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-5 p-2'>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    {/* Field Officer */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Field Officer
                      </label>

                      <Select
                        {...register("fieldOfficer")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                      >
                        <option value=''>Select Field Officer</option>
                        <option value='faruk'>Md. Faruk Hossain</option>
                        <option value='kamrul'>Md. Kamrul Hasan</option>
                        <option value='rakib'>Md. Rakib Hasan</option>
                        <option value='saiful'>Md. Saiful Islam</option>
                      </Select>
                    </div>

                    {/* Assistant / Supervisor */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Assistant / Supervisor
                      </label>

                      <Select
                        {...register("assistantSupervisor")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                      >
                        <option value=''>Select Assistant</option>
                        <option value='kamrul'>Md. Kamrul Hasan</option>
                        <option value='faruk'>Md. Faruk Hossain</option>
                        <option value='rakib'>Md. Rakib Hasan</option>
                        <option value='saiful'>Md. Saiful Islam</option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===========================
                Labour Allocation
            =========================== */}
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                  <h2 className='text-lg font-semibold text-green-700'>
                    Labour Allocation
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-5 p-2'>
                  <div className='grid grid-cols-2 gap-2 xl:grid-cols-4'>
                    {/* Total Labour Required */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-normal text-gray-700'>
                        Total Required
                      </label>

                      <input
                        type='number'
                        placeholder='120'
                        {...register("totalLabour")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                      />
                    </div>

                    {/* Male Labour */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-normal text-gray-700'>
                        Male Labour
                      </label>

                      <input
                        type='number'
                        placeholder='80'
                        {...register("maleLabour")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                      />
                    </div>

                    {/* Female Labour */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-normal text-gray-700'>
                        Female Labour
                      </label>

                      <input
                        type='number'
                        placeholder='40'
                        {...register("femaleLabour")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                      />
                    </div>

                    {/* Labour Source */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-normal text-gray-700'>
                        Labour Source
                      </label>

                      <Select
                        {...register("labourSource")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                      >
                        <option value=''>Select Source</option>
                        <option value='local'>Local</option>
                        <option value='permanent'>Permanent</option>
                        <option value='seasonal'>Seasonal</option>
                        <option value='contract'>Contract</option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remarks + Documents + Photos */}
            <div className='grid grid-cols-12 gap-2'>
              <div className='col-span-12 xl:col-span-6'>
                {/* ===========================
                    Remarks
                =========================== */}
                <div className='rounded-xl border border-gray-200 bg-white shadow-sm '>
                  {/* Header */}
                  <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                    <h2 className='text-lg font-semibold text-green-700'>
                      Remarks
                    </h2>
                  </div>

                  {/* Body */}
                  <div className='p-2'>
                    {/* Body */}
                    <div className='p-2'>
                      <div className='space-y-1.5'>
                        <textarea
                          rows={2}
                          placeholder='Enter remarks...'
                          {...register("remarks")}
                          className='w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-green-600'
                          defaultValue='Replanting with high yielding clone TV-23. Land prepared well. Drainage improved.'
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-span-12 xl:col-span-3'>
                {/* ===========================
                  Documents
              =========================== */}
                <div className='rounded-xl border border-gray-200 bg-white shadow-sm '>
                  {/* Header */}
                  <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                    <h2 className='text-lg font-semibold text-green-700'>
                      Documents
                    </h2>
                  </div>

                  {/* Body */}
                  <div className='p-2'>
                    {/* Body */}
                    <div className='p-2'>
                      <div className='space-y-1.5'>
                        <label className='text-sm font-medium text-gray-700'>
                          Upload Documents
                        </label>

                        <div className='flex items-center justify-between rounded-lg border border-gray-300  '>
                          <input
                            type='file'
                            id='documents'
                            multiple
                            hidden
                            {...register("documents")}
                          />

                          <label
                            htmlFor='documents'
                            className='cursor-pointer rounded-md border border-gray-300  py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200'
                          >
                            Choose Files
                          </label>

                          <span className='text-xs text-gray-500'>
                            {documentCount} files uploaded
                          </span>

                          <button
                            type='button'
                            className='text-gray-500 hover:text-green-600'
                          >
                            <Upload size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-span-12 xl:col-span-3'>
                {/* ===========================
                      Photos
                  =========================== */}
                <div className='rounded-xl border border-gray-200 bg-white shadow-sm h-full'>
                  {/* Header */}
                  <div className='border-b border-gray-200 px-1 py-4'>
                    <h2 className='text-lg font-semibold text-green-700'>
                      Photo Before Planting
                    </h2>
                  </div>

                  {/* Body */}
                  <div className='p-1'>
                    {/* Body */}
                    <div className='p-1'>
                      <div className='space-y-1.5'>
                        <div className='grid grid-cols-4 gap-1'>
                          {(shown?.photosUrl ?? []).map((url, index) => (
                            <div
                              key={url}
                              className='h-16 overflow-hidden rounded-lg border border-gray-300'
                            >
                              <img
                                src={url}
                                alt={`Plantation ${index + 1}`}
                                className='h-full w-full object-cover'
                              />
                            </div>
                          ))}

                          {/* Add More */}
                          <label
                            htmlFor='photos'
                            className='flex  cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-500 transition-colors hover:border-green-600 hover:text-green-600'
                          >
                            <input
                              id='photos'
                              type='file'
                              multiple
                              hidden
                              {...register("photos")}
                            />

                            <span className='text-xl font-semibold leading-none'>
                              +
                            </span>
                            <span className='mt-1 text-center text-[10px] font-medium'>
                              {photoCount > 0 ? `${photoCount} selected` : "Add More"}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================
              Right Section
          =========================== */}
          <div className={editingId ? "hidden" : "col-span-12 flex flex-col gap-6 lg:col-span-4"}>
            {/* ===========================
                    Field Map
                =========================== */}
            <div className='flex flex-1 flex-col rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* Header */}
              <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Field Map
                </h2>
              </div>

              {/* Body */}
              <div className='flex flex-1 flex-col gap-4 p-4'>
                {/* Map: takes the spare height so the right side ends level with the left side */}
                <div ref={mapRef} className='relative min-h-64 flex-1 overflow-hidden rounded-lg border border-gray-300 bg-white'>
                  <img
                    src={fieldMap.image}
                    alt={shown?.fieldBlockName ?? fieldMap.title}
                    className='absolute inset-0 h-full w-full object-cover'
                    style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center' }}
                  />

                  {/* Controls */}
                  <div className='absolute left-3 top-3 flex flex-col gap-2'>
                    <button
                      type='button'
                      aria-label='Zoom in'
                      onClick={() => setMapZoom((z) => Math.min(3, Math.round((z + 0.25) * 100) / 100))}
                      className='flex h-9 w-9 items-center justify-center rounded-md bg-white shadow transition hover:bg-gray-100'
                    >
                      <Plus size={18} />
                    </button>

                    <button
                      type='button'
                      aria-label='Zoom out'
                      onClick={() => setMapZoom((z) => Math.max(1, Math.round((z - 0.25) * 100) / 100))}
                      className='flex h-9 w-9 items-center justify-center rounded-md bg-white shadow transition hover:bg-gray-100'
                    >
                      <Minus size={18} />
                    </button>

                    <button
                      type='button'
                      aria-label='Show or hide the legend'
                      onClick={() => setShowLegend((v) => !v)}
                      className='flex h-9 w-9 items-center justify-center rounded-md bg-white shadow transition hover:bg-gray-100'
                    >
                      <Layers size={18} />
                    </button>

                    <button
                      type='button'
                      aria-label='Full screen'
                      onClick={openMapFullScreen}
                      className='flex h-9 w-9 items-center justify-center rounded-md bg-white shadow transition hover:bg-gray-100'
                    >
                      <Expand size={18} />
                    </button>
                  </div>
                </div>

                {/* Legend */}
                <div className={showLegend ? 'flex flex-wrap items-center justify-center gap-5' : 'hidden'}>
                  {fieldMap.legend.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center gap-2 text-xs text-gray-600'
                    >
                      <span
                        className='h-2.5 w-5 rounded'
                        style={{ backgroundColor: item.color }}
                      />

                      {item.title}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between border-t border-gray-200 pt-3'>
                  <div className='text-xs text-gray-600'>
                    Latitude:
                    <span className='ml-1 font-medium'>{centre ? centre[0].toFixed(6) : DASH}</span>
                    <span className='mx-2'>|</span>
                    Longitude:
                    <span className='ml-1 font-medium'>{centre ? centre[1].toFixed(6) : DASH}</span>
                  </div>

                  <button
                    type='button'
                    onClick={openMapFullScreen}
                    className='rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-gray-50'
                  >
                    View Full Screen
                  </button>
                </div>
              </div>
            </div>

            {/* ===========================
                    Planting Progress
                =========================== */}
            <div className='rounded-xl border py-6 border-gray-200 bg-white shadow-sm'>
              {/* Header */}
              <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Planting Progress
                </h2>
              </div>

              {/* Body */}
              <div className='space-y-5 p-2'>
                <div className='grid grid-cols-12 gap-2'>
                  {/* Progress Circle */}
                  <div className='col-span-12 flex items-center justify-center sm:col-span-5'>
                    <div className='relative h-40 w-40 shrink-0'>
                      <svg viewBox='0 0 120 120' className='h-full w-full -rotate-90' role='img' aria-label='Planting progress'>
                        <circle cx='60' cy='60' r='50' fill='none' stroke='#e5e7eb' strokeWidth='12' />
                        <circle
                          cx='60'
                          cy='60'
                          r='50'
                          fill='none'
                          stroke='#15803d'
                          strokeWidth='12'
                          strokeLinecap={percent > 0 && percent < 100 ? "round" : "butt"}
                          pathLength='100'
                          strokeDasharray={`${percent} 100`}
                          className='transition-all duration-500'
                        />
                      </svg>
                      <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                        <h3 className='text-3xl font-bold text-gray-800'>{progress ? `${progress.percentage}%` : DASH}</h3>
                        <p className='text-xs text-gray-500'>{shown?.plantingStatus ?? DASH}</p>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className='col-span-12 flex flex-col justify-center gap-2 sm:col-span-7'>
                    {plantingProgress.stats.map((item, index) => (
                      <div
                        key={item.id}
                        className='flex items-center justify-between'
                      >
                        <div className='flex items-center gap-3'>
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                          />

                          <p className='text-sm text-gray-600'>{item.title}</p>
                        </div>

                        <p className='text-sm py-4 font-semibold text-gray-800'>
                          {progress
                            ? [
                                `${fixed(progress.areaCompleted)} Acre`,
                                num(progress.plantsPlanted),
                                `${fixed(progress.remainingArea)} Acre`,
                                num(progress.remainingPlants),
                              ][index]
                            : DASH}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ===========================
                    Quick Summary
                =========================== */}
            <div className='rounded-xl border py-6 border-gray-200 bg-white shadow-sm'>
              {/* Header */}
              <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Quick Summary
                </h2>
              </div>

              {/* Body */}
              <div className='space-y-4 p-4 sm:p-6'>
                {record.error && <ErrorState message={record.error.message} onRetry={record.reload} />}
                <div className='grid grid-cols-2 py-4 gap-5'>
                  {quickSummary.map((item, index) => {
                    const Icon = summaryIconMap[item.icon];
                    const quickValues = shown
                      ? [
                          fixed(shown.totalArea),
                          num(shown.expectedPlants),
                          num(shown.targetPlants),
                          DASH,
                          num(progress?.plantsPlanted),
                          `${shown.completion}%`,
                        ]
                      : [];

                    return (
                      <div
                        key={item.id}
                        className='flex py-2 items-center gap-3'
                      >
                        {/* Icon */}
                        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700'>
                          <Icon size={22} />
                        </div>

                        {/* Content */}
                        <div>
                          <p className='text-xs text-gray-500'>{item.title}</p>

                          <h4 className='mt-1 text-xl font-bold text-green-700'>
                            {quickValues[index] ?? DASH}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===========================
            Action Buttons
        =========================== */}

        <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${editingId ? "mt-2" : "mt-6"}`}>
          <div className='flex flex-wrap items-center justify-end gap-3 p-4 *:flex-1 *:justify-center sm:p-5 sm:*:flex-none'>
            <button
              type='button'
              onClick={resetForm}
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50'
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type='button'
              onClick={cancelEdit}
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-all hover:bg-red-50 hover:text-red-600'
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type='button'
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition-all hover:bg-green-800 disabled:opacity-60'
            >
              <Save size={16} />
              Save as Draft
            </button>

            <button
              type='submit'
              disabled={isSubmitting}
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition-all hover:bg-green-800 disabled:opacity-60'
            >
              <Send size={16} />
              Submit for Approval
            </button>

            <button
              type='button'
              disabled={isSubmitting}
              onClick={handleSubmit((values) => savePlanting(values, { print: true }))}
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition-all hover:bg-green-800 disabled:opacity-60'
            >
              <Printer size={16} />
              Save & Print
            </button>
          </div>
        </div>
        </div>
      </form>
      {/* ===========================
            History Section
        =========================== */}
      <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
        {/* Header */}
        <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
          <h2 className='text-lg font-semibold text-green-700'>
            Field Planting History
          </h2>
        </div>

        {/* Body */}
        <div className='p-4 sm:p-6'>
          {/* Table */}
          <div className='overflow-x-auto rounded-lg border border-gray-200'>
            <table className='w-full border-collapse text-sm'>
              {/* Table Header */}
              <thead className='bg-gray-50'>
                <tr>
                  {historyTableHeaders.map((header, index) => (
                    <th
                      key={index}
                      className='border-b border-r border-gray-200 px-4 py-3 text-center text-xs font-semibold whitespace-nowrap text-gray-700 last:border-r-0'
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {history.loading && !history.data ? (
                  <TableSkeleton rows={5} columns={historyTableHeaders.length} />
                ) : history.error ? (
                  <tr>
                    <td colSpan={historyTableHeaders.length} className='p-4'>
                      <ErrorState message={history.error.message} onRetry={history.reload} />
                    </td>
                  </tr>
                ) : historyRows.length === 0 ? (
                  <EmptyRow columns={historyTableHeaders.length} />
                ) : (
                historyRows.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-50 ${item.id === activeId ? "bg-green-50" : ""}`}
                  >
                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {(page - 1) * PER_PAGE + index + 1}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {item.plantingYear}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {orDash(item.fieldBlockName)}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {fixed(item.totalArea)}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {orDash(item.cloneVariety)}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center whitespace-nowrap'>
                      {dmy(item.plantingDate)}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {orDash(item.plantingMethod)}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {num(item.expectedPlants)}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {num(item.plantingProgress?.plantsPlanted)}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      <span
                        className={`font-semibold ${
                          item.completion >= 100
                            ? "text-green-600"
                            : "text-amber-500"
                        }`}
                      >
                        {item.completion}%
                      </span>
                    </td>

                    {/* Status */}
                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STATUS_CLASS[item.plantingStatus] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {item.plantingStatus}
                      </span>
                    </td>

                    {/* Action */}
                    <td className='border-b border-gray-200 px-4 py-3'>
                      <div className='flex items-center justify-center gap-2'>
                        {/* View */}
                        <button
                          type='button'
                          onClick={() => startView(item.id)}
                          className='rounded p-1 text-sky-500 transition hover:bg-sky-50 hover:text-sky-600'
                          title='View'
                        >
                          <Eye size={16} />
                        </button>

                        {/* Edit */}
                        <button
                          type='button'
                          onClick={() => startEdit(item.id)}
                          className='rounded p-1 text-blue-500 transition hover:bg-blue-50 hover:text-blue-600'
                          title='Edit'
                        >
                          <Pencil size={16} />
                        </button>
                        {/* Delete */}
                        <button
                          type='button'
                          onClick={() => setDeleting(item)}
                          className='rounded p-1 text-red-500 transition hover:bg-red-50 hover:text-red-600'
                          title='Delete'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className='mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            {/* Left */}
            <p className='text-sm text-gray-600'>
              Showing {historyRows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0} to{" "}
              {(page - 1) * PER_PAGE + historyRows.length} of {meta?.total ?? 0} entries
            </p>

            {/* Right */}
            <div className='flex flex-wrap items-center justify-end gap-2'>
              <button
                type='button'
                disabled={exporting}
                onClick={exportHistory}
                className='flex h-9 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm hover:bg-gray-50 disabled:opacity-60'
              >
                <Download size={16} />
                {exporting ? "Exporting..." : "Export"}
              </button>

              <div className='flex items-center gap-1'>
                {Array.from({ length: meta?.totalPages ?? 1 }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    type='button'
                    onClick={() => setPage(number)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm
          ${
            number === page
              ? "bg-green-700 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewOpen && (
        <div
          className='fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-3'
          onMouseDown={() => setViewOpen(false)}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-label='Field planting details'
            className='flex max-h-[90vh] w-full max-w-4xl flex-col rounded-xl bg-white shadow-xl'
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
              <h2 className='text-base font-semibold text-green-700'>Field Planting Details</h2>
              <button type='button' onClick={() => setViewOpen(false)} aria-label='Close' className='rounded p-1 text-gray-500 hover:bg-gray-100'>
                <X size={18} />
              </button>
            </div>
            <div className='overflow-y-auto p-5'>
              {shown?.id === selectedId ? (
                <dl className='grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3'>
                  {VIEW_FIELDS.map(([label, key, format]) => (
                    <div key={label}>
                      <dt className='text-xs text-gray-500'>{label}</dt>
                      <dd className='text-sm font-medium text-gray-800'>{format ? format(shown[key]) : orDash(shown[key])}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <CardSkeleton />
              )}
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog
        open={Boolean(deleting)}
        title='Delete field planting?'
        message={`${deleting?.fieldBlockName ?? ""} (${deleting?.plantingYear ?? ""}) will be removed.`}
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default FieldPlanting;
