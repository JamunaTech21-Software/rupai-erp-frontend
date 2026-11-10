import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useBlocker, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, applyServerErrors } from "../../lib/useForm";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  fieldMap,
  censusSummary as censusSummaryLayout,
  summaryCards as summaryCardsLayout,
  rowWiseTable as rowWiseLayout,
  approvalStatus,
  documentTableHeaders,
  censusHistoryTableHeaders,
} from "../../data/PlantationManagementData/plantCensusData";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import MapResizer from "../../components/common/MapResizer";

import {
  Map,
  Trees,
  Sprout,
  Leaf,
  CircleOff,
  AlertTriangle,
  Bug,
  TrendingUp,
  SquareDashed,
  CheckCircle2,
  TriangleAlert,
  Users,
  ShieldX,
  CircleDot,
  UsersRound,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Upload,
  Download,
  RotateCcw,
  X,
  Save,
} from "lucide-react";
import Select from "../../components/common/Select";
const colorMap = {
  green: "bg-green-100 text-green-600",
  emerald: "bg-emerald-100 text-emerald-600",
  lime: "bg-lime-100 text-lime-600",
  red: "bg-red-100 text-red-600",
  yellow: "bg-yellow-100 text-yellow-600",
  orange: "bg-orange-100 text-orange-600",
  blue: "bg-blue-100 text-blue-600",
  gray: "bg-gray-100 text-gray-600",
  teal: "bg-teal-100 text-teal-600",
};
const summaryIconMap = {
  Map,
  Trees,
  Sprout,
  Leaf,
  CircleOff,
  AlertTriangle,
  Bug,
  TrendingUp,
  SquareDashed,
  CheckCircle2,
};
const summaryCardIconMap = {
  TriangleAlert,
  Users,
  Leaf,
  ShieldX,
  CircleDot,
  UsersRound,
  Sprout,
};
const statusColor = {
  Excellent: "bg-green-100 text-green-700",
  Healthy: "bg-emerald-100 text-emerald-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  Critical: "bg-red-100 text-red-700",
};
const DASH = "-";
const FIELDS = [
  "estate", "division", "section", "fieldBlock", "censusYear", "censusDate", "surveyType", "censusMethod", "censusBy",
  "supervisor", "cloneVariety", "plantingYear", "plantSpacing", "rowSpacing", "elevation", "rowFrom", "rowTo",
  "totalSelectedRows", "remarks",
];
const EMPTY_FORM = Object.fromEntries(FIELDS.map((name) => [name, ""]));
const toForm = (record) => Object.fromEntries(FIELDS.map((name) => [name, record[name] ?? ""]));
const num = (value) => (value === null || value === undefined ? DASH : Number(value).toLocaleString("en-US"));
const fixed = (value, digits = 2) => (value === null || value === undefined ? DASH : Number(value).toFixed(digits));
// 2026-05-20 -> 20/05/2026 (no timezone: the text is rearranged, not parsed as a date)
const dmy = (iso) => (iso ? iso.slice(0, 10).split("-").reverse().join("/") : DASH);

const ROW_FIELDS = [
  ["rowNo", "Row No.", "text"],
  ["rowLength", "Row Length (Mtr.)", "number"],
  ["plantsPerMeter", "Plants / Meter (Avg.)", "number"],
  ["expectedPlants", "Total Plants (Expected)", "number"],
  ["livePlants", "Live Plants", "number"],
  ["deadPlants", "Dead Plants", "number"],
  ["missingPlants", "Missing", "number"],
];
const toRowForm = (row) => Object.fromEntries(ROW_FIELDS.map(([name]) => [name, row[name] ?? ""]));
// Same formula the server uses for the gap.
const gapOf = (row) => (Number(row.expectedPlants) ? ((Number(row.deadPlants || 0) + Number(row.missingPlants || 0)) / Number(row.expectedPlants)) * 100 : 0);

// Document table column widths (percent of the table): File Name is kept narrow and cut with "..." when long.
const DOCUMENT_COLUMN_WIDTH = { sl: "6%", documentName: "28%", type: "12%", fileName: "22%", uploadedOn: "18%", action: "14%" };

// Row and file changes wait on the page until Save, so one Save is one request (and one approval).
const NO_CHANGES = {
  rows: { add: [], update: {}, remove: [] },
  files: { photos: { add: [], remove: [] }, documents: { add: [], remove: [] } },
};
const countChanges = (changes) =>
  changes.rows.add.length +
  Object.keys(changes.rows.update).length +
  changes.rows.remove.length +
  ["photos", "documents"].reduce((total, kind) => total + changes.files[kind].add.length + changes.files[kind].remove.length, 0);
const bodyOfRow = (values) =>
  Object.fromEntries(ROW_FIELDS.map(([name, , type]) => [name, type === "number" ? Number(values[name]) : String(values[name]).trim()]));
const fileName = (url, fallback) => decodeURIComponent(url?.split("/").pop()?.split("?")[0] ?? "").replace(/\/content$/, "") || fallback;
const MARK_CLASS = {
  Unsaved: "bg-blue-100 text-blue-700",
  Edited: "bg-amber-100 text-amber-700",
  Removed: "bg-red-100 text-red-700",
};

const PlantCensus = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  // True once the user has changed something in Census Information: a reload of the record must not overwrite that.
  // react-hook-form's own isDirty is already true on a fresh page here, so the user's edits are noted by the form itself.
  const [formEdited, setFormEdited] = useState(false);
  const dirtyRef = useRef(false);
  dirtyRef.current = formEdited;
  const resetFor = useRef(null);
  // What the user typed but did not save is kept in this browser tab (per census, or for a new one), so a page
  // refresh brings it back. It is cleared when the census is saved or the form is reset.
  const draftRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  // After a save, return to the page the user came from (the dashboard when the page was opened directly).
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"));
  const leavingRef = useRef(false);
  const photoInput = useRef(null);
  const documentInput = useRef(null);
  const [uploading, setUploading] = useState(false);
  // Row popup: { mode: "view" | "add" | "edit", id } plus the values being edited.
  const [rowPopup, setRowPopup] = useState(null);
  const [rowValues, setRowValues] = useState({});
  const [rowErrors, setRowErrors] = useState({});
  const [rowNotice, setRowNotice] = useState("");
  // Document being removed (asks first).
  const [deletingDoc, setDeletingDoc] = useState(null);
  // Rows and files changed on the page and not saved yet; and the server's complaints about single rows.
  const [changes, setChanges] = useState(NO_CHANGES);
  const [rowProblems, setRowProblems] = useState({});
  const [draftActive, setDraftActive] = useState(false);

  // The census being edited (?id=). Without one the page is a new census, filled in fully before its first Save.
  const record = useApi(() => (editId ? api.get(`/plant-censuses/${editId}`) : Promise.resolve(null)), [editId]);
  const report = useApi(() => (editId ? api.get(`/plant-censuses/${editId}/report`) : Promise.resolve(null)), [editId]);
  const shown = record.data;
  // One request is already waiting for this census: nothing can be changed until it is decided.
  const pendingRequest = shown?.pendingRequest ?? null;
  // The map shows the boundary of the field picked in the form (or the saved one).
  const mapFieldId = watch("fieldBlock") || shown?.fieldBlock;
  const field = useApi(() => (mapFieldId ? api.get(`/fields/${mapFieldId}`) : Promise.resolve(null)), [mapFieldId]);
  const boundary = field.data?.map?.landBoundary ?? field.data?.map?.polygon ?? field.data?.polygon;
  const mapCenter = field.data?.map?.latitude != null ? [Number(field.data.map.latitude), Number(field.data.map.longitude)] : fieldMap.center;
  const changesCount = countChanges(changes);
  // Anything not saved yet: typed fields, rows, files.
  const hasUnsaved = formEdited || draftActive || changesCount > 0;

  // Estate -> Division -> Section -> Field / Block
  const estateId = watch("estate");
  const divisionId = watch("division");
  const sectionId = watch("section");
  const rowFrom = watch("rowFrom");
  const rowTo = watch("rowTo");
  const estateOptions = useApi(() => api.get("/options/estates"), []);
  const divisionOptions = useApi(() => (estateId ? api.get("/options/divisions", { estate: estateId }) : Promise.resolve([])), [estateId]);
  const sectionOptions = useApi(() => (divisionId ? api.get("/options/sections", { division: divisionId }) : Promise.resolve([])), [divisionId]);
  const fieldOptions = useApi(() => (sectionId ? api.get("/options/fields", { section: sectionId }) : Promise.resolve([])), [sectionId]);

  const draftKey = `rupai.plantCensus.draft.${editId ?? "new"}`;
  const clearDraft = () => {
    draftRef.current = null;
    setDraftActive(false);
    setFormEdited(false);
    setChanges(NO_CHANGES);
    setRowProblems({});
    try {
      sessionStorage.removeItem(draftKey);
      sessionStorage.removeItem(`${draftKey}.changes`);
    } catch {
      /* storage not available */
    }
  };
  // Load the draft of this census (or of the new one) before anything fills the form.
  useEffect(() => {
    try {
      const text = sessionStorage.getItem(draftKey);
      draftRef.current = text ? JSON.parse(text) : null;
    } catch {
      draftRef.current = null;
    }
    if (!editId && draftRef.current) reset({ ...EMPTY_FORM, ...draftRef.current });
    setDraftActive(Boolean(draftRef.current));
    try {
      const text = sessionStorage.getItem(`${draftKey}.changes`);
      setChanges(text ? JSON.parse(text) : NO_CHANGES);
    } catch {
      setChanges(NO_CHANGES);
    }
  }, [draftKey, editId, reset]);
  // Rows and files that are not saved yet are kept with the draft, so a refresh does not lose them.
  useEffect(() => {
    try {
      if (changesCount > 0) sessionStorage.setItem(`${draftKey}.changes`, JSON.stringify(changes));
      else sessionStorage.removeItem(`${draftKey}.changes`);
    } catch {
      /* storage not available */
    }
  }, [changes, changesCount, draftKey]);
  // Every change the user makes is saved as the draft a moment later.
  useEffect(() => {
    let timer;
    const subscription = watch((_values, info) => {
      if (info?.type !== "change") return;
      setFormEdited(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          const now = getValues();
          sessionStorage.setItem(draftKey, JSON.stringify(now));
          draftRef.current = now;
          setDraftActive(true);
        } catch {
          /* storage not available: the draft only lives until the next refresh */
        }
      }, 250);
    });
    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [watch, getValues, draftKey]);
  const editing = editId && record.data?.id === editId ? record.data : null;
  // Saved Division / Section / Field that the estate lists do not offer any more, by field name.
  const [savedPlace, setSavedPlace] = useState({});
  useEffect(() => {
    setSavedPlace({});
  }, [editId]);
  // The form is filled from the record when it is opened, and again after a reload only while the user has not
  // changed anything (adding a row, a file, or an approval elsewhere must not wipe what is being typed).
  useEffect(() => {
    if (!editing) return;
    if (resetFor.current !== editing.id) {
      resetFor.current = editing.id;
      reset({ ...toForm(editing), ...(draftRef.current ?? {}) }); // an unsaved draft wins over the saved values
    } else if (!dirtyRef.current && !draftRef.current) {
      reset(toForm(editing));
    }
  }, [editing, reset]);
  // The saved division / section / field show once their options have loaded.
  useEffect(() => {
    const wanted = draftRef.current ?? editing;
    if (!wanted || dirtyRef.current) return;
    for (const [name, options] of [
      ["division", divisionOptions.data],
      ["section", sectionOptions.data],
      ["fieldBlock", fieldOptions.data],
    ]) {
      if (options?.some((option) => option.value === wanted[name])) setValue(name, wanted[name]);
    }
  }, [editing, divisionOptions.data, sectionOptions.data, fieldOptions.data, setValue]);
  // A census saved before the estate data was re-created points to a Division / Section / Field that no longer exist:
  // those fields are emptied and shown in red, so it is clear which ones to pick again.
  useEffect(() => {
    if (!editing) return undefined;
    let cancelled = false;
    (async () => {
      const checks = [
        ["division", "/options/divisions", { estate: editing.estate }, "Division"],
        ["section", "/options/sections", { division: editing.division }, "Section"],
        ["fieldBlock", "/options/fields", { section: editing.section }, "Field / Block"],
      ];
      const missing = [];
      for (const [name, url, params, label] of checks) {
        if (missing.length === 0) {
          try {
            const options = editing[name] ? await api.get(url, params) : [];
            if (options.some((option) => option.value === editing[name])) continue;
          } catch {
            continue; // cannot tell (offline): leave the field alone
          }
        }
        missing.push([name, label]);
      }
      if (cancelled) return;
      // The saved value stays as it is (shown by its saved name); the list just no longer offers it.
      setSavedPlace(
        Object.fromEntries(
          missing.map(([name]) => [name, { value: editing[name], label: editing[`${name}Name`] || editing[name] }]),
        ),
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [editing]);
  // Once the saved name is offered as an option, select it again (the form reset could not select it before).
  useEffect(() => {
    if (!editing || dirtyRef.current || draftRef.current) return;
    for (const name of Object.keys(savedPlace)) setValue(name, editing[name]);
  }, [savedPlace, editing, setValue]);
  // The option that keeps a saved Division / Section / Field visible when the list does not offer it any more.
  const savedOption = (name, options, current) =>
    savedPlace[name] && current === savedPlace[name].value && !(options ?? []).some((option) => option.value === current) ? (
      <option value={savedPlace[name].value}>{savedPlace[name].label} (saved)</option>
    ) : null;
  // Picking a value clears that "no longer exists" mark.
  const fieldBlockId = watch("fieldBlock");
  useEffect(() => {
    for (const [name, value] of [["division", divisionId], ["section", sectionId], ["fieldBlock", fieldBlockId]]) {
      if (value && errors[name]?.type === "stale") clearErrors(name);
    }
  }, [divisionId, sectionId, fieldBlockId, errors, clearErrors]);
  // Total selected rows is worked out on every render from the two row numbers (not stored in the form).
  const rowsFilled = rowFrom !== undefined && rowTo !== undefined && String(rowFrom).trim() !== "" && String(rowTo).trim() !== "";
  const totalRows = rowsFilled && Number(rowTo) >= Number(rowFrom) ? Number(rowTo) - Number(rowFrom) + 1 : "";

  const reloadPanels = () => {
    record.reload();
    report.reload();
  };

  const bodyOf = (values) => ({
    ...values,
    totalSelectedRows: String(values.rowFrom ?? "").trim() !== "" && String(values.rowTo ?? "").trim() !== "" ? Number(values.rowTo) - Number(values.rowFrom) + 1 : values.totalSelectedRows,
  });
  // The rows as the page shows them: saved rows with their unsaved edit or removal, then the new unsaved rows.
  const viewRows = [
    ...(shown?.rows ?? []).map((row) => {
      const edit = changes.rows.update[row.id];
      const removed = changes.rows.remove.includes(row.id);
      const values = edit ? { ...row, ...edit, gapPercentage: gapOf(edit) } : row;
      return { ...values, id: row.id, removed, mark: removed ? "Removed" : edit ? "Edited" : null };
    }),
    ...changes.rows.add.map((row) => ({ ...row, id: row.tempId, gapPercentage: gapOf(row), mark: "Unsaved", isNew: true })),
  ];
  const liveRows = viewRows.filter((row) => !row.removed);

  // ONE Save: the form, the row changes and the file changes go in one request, so there is one approval.
  const onSubmit = async (values) => {
    const form = bodyOf(values);
    const addRows = changes.rows.add.map(({ tempId, ...row }) => { void tempId; return row; });
    const updateIds = Object.keys(changes.rows.update);
    const fileIds = (kind, list) => changes.files[kind][list].map((item) => (typeof item === "string" ? item : item.id));
    let body;
    if (editId) {
      body = { ...form };
      if (addRows.length || updateIds.length || changes.rows.remove.length) {
        body.rowChanges = {
          add: addRows,
          update: updateIds.map((id) => ({ id, ...changes.rows.update[id] })),
          remove: changes.rows.remove,
        };
      }
      if (["photos", "documents"].some((kind) => changes.files[kind].add.length || changes.files[kind].remove.length)) {
        body.fileChanges = Object.fromEntries(["photos", "documents"].map((kind) => [kind, { add: fileIds(kind, "add"), remove: fileIds(kind, "remove") }]));
      }
    } else {
      body = { ...form, rows: addRows, photos: fileIds("photos", "add"), documents: fileIds("documents", "add") };
    }
    try {
      const saved = editId ? await api.put(`/plant-censuses/${editId}`, body) : await api.post("/plant-censuses", body);
      notifySaved(saved, "Plant census saved successfully!");
      leavingRef.current = true;
      clearDraft();
      if (!saved?.pending) reset(editId ? toForm(saved) : EMPTY_FORM);
      reloadPanels();
      goBack();
    } catch (error) {
      // Row errors go to their row, file errors are said once, everything else to the form field it names.
      const formErrors = {};
      const rowIssues = {};
      const updateKeys = Object.keys(changes.rows.update);
      let fileIssue = "";
      let gone = false;
      for (const [key, message] of Object.entries(error.fields ?? {})) {
        const match = key.match(/^(rowChanges\.(add|update|remove)|rows)\.(\d+)/);
        if (match) {
          const index = Number(match[3]);
          const rowKey = match[2] === "update" ? updateKeys[index] : match[2] === "remove" ? changes.rows.remove[index] : changes.rows.add[index]?.tempId;
          if (rowKey) rowIssues[rowKey] = message;
        } else if (key.startsWith("fileChanges")) fileIssue = message;
        else formErrors[key] = message;
        if (/no longer/i.test(message)) gone = true;
      }
      setRowProblems(rowIssues);
      applyServerErrors(setError, { fields: formErrors });
      const rowCount = Object.keys(rowIssues).length;
      if (rowCount) toast.error(`${rowCount} row${rowCount === 1 ? " has" : "s have"} a problem. See the marked row${rowCount === 1 ? "" : "s"}.`);
      else toast.error(fileIssue || error.message);
      if (gone) reloadPanels(); // something was changed by someone else: show what is there now
    }
  };
  const resetForm = () => {
    clearDraft();
    reset(editing ? toForm(editing) : EMPTY_FORM);
  };

  const openRow = (mode, row) => {
    setRowPopup({ mode, id: row.id });
    setRowValues(toRowForm(row));
    setRowErrors({});
    setRowNotice("");
  };
  const openAdd = () => {
    setRowPopup({ mode: "add" });
    setRowValues(toRowForm({}));
    setRowErrors({});
    setRowNotice("");
  };
  const closeRow = () => setRowPopup(null);
  useEffect(() => {
    if (!rowPopup) return undefined;
    const onKey = (event) => event.key === "Escape" && setRowPopup(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [rowPopup]);
  // Add / Edit change the page only; the row is sent when the census is saved.
  const saveRow = (event) => {
    event.preventDefault();
    const problems = {};
    for (const [name, label, type] of ROW_FIELDS) {
      const value = rowValues[name];
      if (value === "" || value === null || value === undefined) problems[name] = `${label} is required.`;
      else if (type === "number" && (Number.isNaN(Number(value)) || Number(value) < 0)) problems[name] = `${label} must be 0 or more.`;
    }
    if (!problems.rowNo && liveRows.some((row) => row.id !== rowPopup.id && row.rowNo === String(rowValues.rowNo).trim())) {
      problems.rowNo = "This row is already in the census.";
    }
    const counted = Number(rowValues.livePlants || 0) + Number(rowValues.deadPlants || 0) + Number(rowValues.missingPlants || 0);
    if (!problems.expectedPlants && !problems.livePlants && !problems.deadPlants && !problems.missingPlants && counted > Number(rowValues.expectedPlants)) {
      problems.livePlants = `Live + Dead + Missing (${counted}) is more than the Total Plants (${Number(rowValues.expectedPlants)}).`;
    }
    setRowErrors(problems);
    setRowNotice("");
    if (Object.keys(problems).length) {
      const names = Object.keys(problems).map((name) => ROW_FIELDS.find((field) => field[0] === name)?.[1]);
      setRowNotice(`Please correct ${names.join(", ")} (marked in red) and try again.`);
      return;
    }
    const body = bodyOfRow(rowValues);
    setChanges((current) => {
      const rows = { ...current.rows };
      if (rowPopup.mode === "add") {
        rows.add = [...rows.add, { tempId: `new-${Date.now()}-${rows.add.length}`, ...body }];
      } else if (rows.add.some((row) => row.tempId === rowPopup.id)) {
        rows.add = rows.add.map((row) => (row.tempId === rowPopup.id ? { tempId: row.tempId, ...body } : row));
      } else {
        const saved = (shown?.rows ?? []).find((row) => row.id === rowPopup.id);
        const same = saved && ROW_FIELDS.every(([name]) => String(saved[name]) === String(body[name]));
        const update = { ...rows.update };
        if (same) delete update[rowPopup.id];
        else update[rowPopup.id] = body;
        rows.update = update;
      }
      return { ...current, rows };
    });
    setRowProblems((current) => {
      const next = { ...current };
      delete next[rowPopup.id];
      return next;
    });
    setRowPopup(null);
  };
  // Remove (or bring back) a row on the page; a new unsaved row is simply dropped.
  const removeRow = (row) => {
    setChanges((current) => {
      const rows = { ...current.rows };
      if (row.isNew) rows.add = rows.add.filter((item) => item.tempId !== row.id);
      else if (rows.remove.includes(row.id)) rows.remove = rows.remove.filter((id) => id !== row.id);
      else {
        rows.remove = [...rows.remove, row.id];
        const update = { ...rows.update };
        delete update[row.id];
        rows.update = update;
      }
      return { ...current, rows };
    });
  };

  // Pictures / documents upload when picked and are listed on the page; they join the census when it is saved.
  const addFiles = async (kind, event) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;
    setUploading(true);
    let added = 0;
    for (const file of files) {
      try {
        const uploaded = await api.upload(file);
        setChanges((current) => ({
          ...current,
          files: { ...current.files, [kind]: { ...current.files[kind], add: [...current.files[kind].add, { id: uploaded.id, name: uploaded.name ?? file.name, url: uploaded.url }] } },
        }));
        added += 1;
      } catch (error) {
        toast.error(`${file.name}: ${error.message}`);
      }
    }
    setUploading(false);
    if (added) toast.success(`${added} ${kind === "photos" ? "photo" : "document"}${added === 1 ? "" : "s"} added. Press Save to keep ${added === 1 ? "it" : "them"}.`);
  };

  const confirmRestoreDocument = (doc) =>
    setChanges((current) => ({
      ...current,
      files: { ...current.files, documents: { ...current.files.documents, remove: current.files.documents.remove.filter((id) => id !== doc.id) } },
    }));
  // Remove a document on the page (not on the server until Save); an unsaved one is simply dropped.
  const confirmDeleteDocument = () => {
    const doc = deletingDoc;
    setChanges((current) => {
      const list = current.files.documents;
      const next = doc.isNew
        ? { ...list, add: list.add.filter((item) => item.id !== doc.id) }
        : { ...list, remove: list.remove.includes(doc.id) ? list.remove.filter((id) => id !== doc.id) : [...list.remove, doc.id] };
      return { ...current, files: { ...current.files, documents: next } };
    });
    setDeletingDoc(null);
  };

  // What the panels show, in the shapes the page already uses.
  const data = report.data;
  const summaryValues = data
    ? [
        `${fixed(data.censusSummary.totalArea)}`,
        num(data.censusSummary.totalRows),
        num(data.censusSummary.expectedPlants),
        num(data.censusSummary.livePlants),
        num(data.censusSummary.deadPlants),
        num(data.censusSummary.missingPlants),
        `${fixed(data.censusSummary.gapPercentage)}%`,
        data.censusSummary.dataEntryStatus,
      ]
    : [];
  const censusSummary = censusSummaryLayout.map((item, index) => ({ ...item, value: summaryValues[index] ?? DASH }));
  const cardValues = data
    ? [
        fixed(data.summaryCards.totalArea),
        num(data.summaryCards.expectedPlants),
        num(data.summaryCards.livePlants),
        num(data.summaryCards.deadPlants),
        num(data.summaryCards.missingPlants),
        num(data.summaryCards.avgPlantsPerAcre),
        fixed(data.summaryCards.plantsPerMeter),
      ]
    : [];
  const summaryCards = summaryCardsLayout.map((item, index) => ({ ...item, value: cardValues[index] ?? DASH, badge: undefined }));
  const rowRows = liveRows;
  const rowWiseTable = {
    headers: rowWiseLayout.headers,
    rows: viewRows.map((row) => ({ ...row, gapPercentage: fixed(row.gapPercentage) })),
  };
  const sum = (key) => rowRows.reduce((total, row) => total + Number(row[key] ?? 0), 0);
  const avg = (key) => (rowRows.length ? sum(key) / rowRows.length : 0);
  const charts = data?.charts ?? {
    liveVsDeadChart: { title: "Live vs Dead Plants", total: 0, data: [] },
    plantDistributionChart: { title: "Plant Distribution (Row Wise)", data: [] },
  };
  const sliceTotal = charts.liveVsDeadChart.data.reduce((total, item) => total + Number(item.value || 0), 0);
  const liveDeadSlices = sliceTotal
    ? charts.liveVsDeadChart.data.map((item) => ({ ...item, value: Number(item.value) || 0, percentage: fixed(((Number(item.value) || 0) / sliceTotal) * 100) }))
    : [];
  // Saved photos (minus the ones removed here) followed by the ones added on this page.
  const photoUrls = [
    ...(shown?.photosUrl ?? []).filter((_url, index) => !changes.files.photos.remove.includes(shown.photos[index])),
    ...changes.files.photos.add.map((item) => item.url),
  ];
  const documents = [
    ...(shown?.documentsUrl ?? []).map((url, index) => {
      const id = shown.documents[index];
      const removed = changes.files.documents.remove.includes(id);
      return { id, documentName: fileName(url, `Document ${index + 1}`), type: "Document", fileName: url, uploadedOn: dmy(shown.updatedAt), url, removed, mark: removed ? "Removed" : null };
    }),
    ...changes.files.documents.add.map((item) => ({ id: item.id, documentName: item.name, type: "Document", fileName: item.name, uploadedOn: "-", url: item.url, isNew: true, mark: "Unsaved" })),
  ];
  const censusHistory = data?.censusHistory ?? [];
  // Warn before leaving the page (another page, refresh or closing the tab) with changes that are not saved.
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
  const failure = record.error ?? report.error;
  return (
    <div>
      {failure && (
        <ErrorState
          message={failure.message}
          onRetry={() => {
            record.reload();
            report.reload();
          }}
        />
      )}
      <div className='space-y-6 mt-4'>
        {pendingRequest && (
          <div role='status' className='rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800'>
            A request ({pendingRequest.requestNo}) is waiting for approval. This census cannot be changed until it is approved or rejected.
          </div>
        )}
        {!pendingRequest && changesCount > 0 && (
          <div role='status' className='rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800'>
            {changesCount} change{changesCount === 1 ? "" : "s"} to rows and files {changesCount === 1 ? "is" : "are"} not saved yet. Press Save to send everything as one request.
          </div>
        )}
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={() => navigate("/plant-census-list")}
            className='flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50'
          >
            Census List
          </button>
        </div>
        {/* ================================================= */}

        {/* ================================================= */}
        {/* Top Section */}
        {/* ================================================= */}
        <div className='grid grid-cols-12 gap-1'>
          {/* Census Information */}
          <form
            id='census-form'
            onSubmit={handleSubmit(onSubmit)}
            className='col-span-12 xl:col-span-6 rounded-xl border border-gray-200 bg-white shadow-sm'
          >
            {/* Header */}

            <div className='border-b border-gray-200 px-2 py-4'>
              <h2 className='text-lg font-semibold text-green-700'>
                Census Information
              </h2>
            </div>

            {/* Body */}

            <div className='p-2 space-y-2'>
              {/* ========================= Row 1 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                {/* Estate */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='estate'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Estate <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    id='estate'
                    {...register("estate", {
                      required: "Please select an estate.",
                      onChange: () => { setValue("division", ""); setValue("section", ""); setValue("fieldBlock", ""); },
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.estate
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
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
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='division'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Division <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    id='division'
                    {...register("division", {
                      required: "Please select a division.",
                      onChange: () => { setValue("section", ""); setValue("fieldBlock", ""); },
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.division
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Division</option>
                    {savedOption("division", divisionOptions.data, divisionId)}
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

                {/* Section */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='section'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Section <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    id='section'
                    {...register("section", {
                      required: "Please select a section.",
                      onChange: () => { setValue("fieldBlock", ""); },
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.section
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>
                      {!divisionId
                        ? "Select Division first"
                        : sectionOptions.data?.length === 0
                          ? "No sections in this division"
                          : "Select Section"}
                    </option>
                    {savedOption("section", sectionOptions.data, sectionId)}
                    {(sectionOptions.data ?? []).map((section) => (
                      <option key={section.id} value={section.value}>
                        {section.label}
                      </option>
                    ))}
                  </Select>

                  {errors.section && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.section.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 2 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                {/* Field / Block */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='fieldBlock'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Field / Block <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    id='fieldBlock'
                    {...register("fieldBlock", {
                      required: "Please select a field/block.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.fieldBlock
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>
                      {!sectionId
                        ? "Select Section first"
                        : fieldOptions.data?.length === 0
                          ? "No fields in this section"
                          : "Select Field / Block"}
                    </option>
                    {savedOption("fieldBlock", fieldOptions.data, fieldBlockId)}
                    {(fieldOptions.data ?? []).map((fieldOption) => (
                      <option key={fieldOption.id} value={fieldOption.value}>
                        {fieldOption.label}
                      </option>
                    ))}
                  </Select>

                  {errors.fieldBlock && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.fieldBlock.message}
                    </p>
                  )}
                </div>

                {/* Census Date */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='censusDate'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Census Date <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='censusDate'
                    type='date'
                    {...register("censusDate", {
                      required: "Please select the census date.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.censusDate
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.censusDate && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.censusDate.message}
                    </p>
                  )}
                </div>

                {/* Census Year */}
                <div className='col-span-12 lg:col-span-2'>
                  <label
                    htmlFor='censusYear'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Census Year <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='censusYear'
                    type='number'
                    placeholder='2026'
                    {...register("censusYear", {
                      required: "Please enter census year.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.censusYear
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.censusYear && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.censusYear.message}
                    </p>
                  )}
                </div>

                {/* Survey Type */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='surveyType'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Survey Type <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    id='surveyType'
                    {...register("surveyType", {
                      required: "Please select survey type.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.surveyType
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Survey Type</option>
                    <option value='full'>Full Census</option>
                    <option value='sample'>Sample Census</option>
                    <option value='random'>Random Survey</option>
                  </Select>

                  {errors.surveyType && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.surveyType.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 3 ========================= */}

              <div className='grid grid-cols-12 gap-2'>
                {/* Row No. From */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='rowFrom'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Row No. From <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='rowFrom'
                    type='number'
                    placeholder='Enter Start Row'
                    {...register("rowFrom", {
                      required: "Starting row number is required.",
                      min: {
                        value: 1,
                        message: "Row number must be greater than 0.",
                      },
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.rowFrom
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.rowFrom && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.rowFrom.message}
                    </p>
                  )}
                </div>

                {/* Row No. To */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='rowTo'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Row No. To <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='rowTo'
                    type='number'
                    placeholder='Enter End Row'
                    {...register("rowTo", {
                      required: "Ending row number is required.",
                      min: {
                        value: 1,
                        message: "Row number must be greater than 0.",
                      },
                      validate: (value) => Number(value) >= Number(rowFrom || 0) || "Row No. To cannot be less than Row No. From.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.rowTo
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.rowTo && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.rowTo.message}
                    </p>
                  )}
                </div>

                {/* Total Selected Rows */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='totalSelectedRows'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Total Selected Rows
                  </label>

                  <input
                    id='totalSelectedRows'
                    type='number'
                    placeholder='Auto Calculate'
                    readOnly
                    value={totalRows}
                    onChange={() => {}}
                    className='w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm outline-none'
                  />
                  {rowsFilled && totalRows === "" && (
                    <p className='mt-1 text-xs text-red-500'>Row No. To cannot be less than Row No. From.</p>
                  )}
                </div>

                {/* Row Spacing */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='rowSpacing'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Row Spacing (ft) <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='rowSpacing'
                    type='number'
                    step='0.01'
                    placeholder='Enter Row Spacing'
                    {...register("rowSpacing", {
                      required: "Row spacing is required.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.rowSpacing
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.rowSpacing && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.rowSpacing.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 4 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                {/* Planting Year */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='plantingYear'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Planting Year <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='plantingYear'
                    type='number'
                    placeholder='e.g. 2021'
                    {...register("plantingYear", {
                      required: "Planting year is required.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.plantingYear
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.plantingYear && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.plantingYear.message}
                    </p>
                  )}
                </div>

                {/* Clone / Variety */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='cloneVariety'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Clone / Variety <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    id='cloneVariety'
                    {...register("cloneVariety", {
                      required: "Please select a clone/variety.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.cloneVariety
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Clone</option>
                    <option value='tv1'>TV-1</option>
                    <option value='tv23'>TV-23</option>
                    <option value='bt2'>BT-2</option>
                    <option value='seedling'>Seedling</option>
                  </Select>

                  {errors.cloneVariety && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.cloneVariety.message}
                    </p>
                  )}
                </div>

                {/* Elevation */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='elevation'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Elevation (m)
                  </label>

                  <input
                    id='elevation'
                    type='number'
                    placeholder='e.g. 120'
                    {...register("elevation")}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                  />
                </div>

                {/* Plant Spacing */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='plantSpacing'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Plant Spacing (ft) <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='plantSpacing'
                    type='number'
                    step='0.01'
                    placeholder='e.g. 3.5'
                    {...register("plantSpacing", {
                      required: "Plant spacing is required.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.plantSpacing
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.plantSpacing && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.plantSpacing.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 5 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                {/* Census By */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='censusBy'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Census By <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='censusBy'
                    type='text'
                    placeholder='Enter Enumerator Name'
                    {...register("censusBy", {
                      required: "Census by is required.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.censusBy
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.censusBy && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.censusBy.message}
                    </p>
                  )}
                </div>

                {/* Supervisor */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='supervisor'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Supervisor <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    id='supervisor'
                    {...register("supervisor", {
                      required: "Please select a supervisor.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.supervisor
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Supervisor</option>
                    <option value='sup-1'>Md. Rahman</option>
                    <option value='sup-2'>Jahid Hasan</option>
                    <option value='sup-3'>Arif Hossain</option>
                  </Select>

                  {errors.supervisor && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.supervisor.message}
                    </p>
                  )}
                </div>

                {/* Census Method */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='censusMethod'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Census Method <span className='text-red-500'>*</span>
                  </label>

                  <Select
                    id='censusMethod'
                    {...register("censusMethod", {
                      required: "Please select a census method.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.censusMethod
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Method</option>
                    <option value='manual'>Manual Counting</option>
                    <option value='mobile-app'>Mobile App</option>
                    <option value='gps'>GPS Survey</option>
                    <option value='drone'>Drone Survey</option>
                  </Select>

                  {errors.censusMethod && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.censusMethod.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 6 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                <div className='col-span-12'>
                  <label
                    htmlFor='remarks'
                    className=' block text-sm font-medium text-gray-700'
                  >
                    Remarks
                  </label>

                  <textarea
                    id='remarks'
                    rows={2}
                    placeholder='Write additional remarks...'
                    {...register("remarks")}
                    className='w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                  />
                </div>
              </div>
            </div>
          </form>

          {/* ================================================= */}
          {/* Field Map */}
          {/* ================================================= */}

          <div className='col-span-12 md:col-span-6 xl:col-span-4 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Field Map
              </h2>
            </div>

            {/* Body */}
            <div className='p-4'>
              {/* Static Map Placeholder */}
              <div className='h-[260px] overflow-hidden rounded-lg border border-gray-300 sm:h-[360px]'>
                <MapContainer
                  key={`${shown?.id}-${field.data?.id}`}
                  center={mapCenter}
                  zoom={fieldMap.gis.zoom}
                  scrollWheelZoom={false}
                  className='h-full w-full'
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />

                  {boundary?.length > 0 && (
                    <Polygon
                      positions={boundary}
                      pathOptions={{
                        color: "#16a34a",
                        weight: 3,
                        fillColor: "#22c55e",
                        fillOpacity: 0.35,
                      }}
                    />
                  )}
                  <MapResizer trigger={shown?.id} />
                </MapContainer>
              </div>

              {/* Legend */}
              <div className='mt-4 flex flex-wrap items-center gap-5 border-t border-gray-200 pt-3'>
                <div className='flex items-center gap-2'>
                  <span className='h-4 w-4 rounded bg-green-600'></span>
                  <span className='text-sm text-gray-700'>Field Boundary</span>
                </div>

                <div className='flex items-center gap-2'>
                  <span className='h-4 w-4 rounded bg-blue-500'></span>
                  <span className='text-sm text-gray-700'>Water Body</span>
                </div>

                <div className='flex items-center gap-2'>
                  <span className='h-4 w-4 rounded bg-red-500'></span>
                  <span className='text-sm text-gray-700'>Road</span>
                </div>
              </div>
            </div>
          </div>

          {/* Census Summary */}
          <div className='col-span-12 md:col-span-6 xl:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Census Summary
              </h2>
            </div>

            {/* Body */}
            <div className='space-y-2 p-2'>
              <div className='space-y-3'>
                {censusSummary.map((item) => {
                  const Icon = summaryIconMap[item.icon];

                  return (
                    <div key={item.id} className='flex items-start gap-3'>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          colorMap[item.color]
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className='text-xs text-gray-500'>{item.title}</p>

                        <h3 className='text-lg font-bold text-gray-800'>
                          {item.value}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* Summary Cards */}
        {/* ================================================= */}

        <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7'>
            {summaryCards.map((item) => {
              const Icon = summaryCardIconMap[item.icon];

              return (
                <div
                  key={item.id}
                  className='rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all hover:shadow-md'
                >
                  <div className='flex items-center gap-1'>
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.iconColor}`}
                    >
                      <Icon size={16} />
                    </div>

                    {/* Content */}
                    <div className='flex-1'>
                      <p className='text-xs font-medium text-gray-500'>
                        {item.title}
                      </p>

                      <div className='mt-1 flex items-center justify-between'>
                        <h3 className='text-sm font-semibold text-green-800'>
                          {item.value}
                        </h3>

                        {item.badge && (
                          <span
                            className={`rounded-md px-1 py-1 text-xs font-semibold ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* ================================================= */}
        {/* Middle Section */}
        {/* ================================================= */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Row-wise Census Details */}

          <div className='col-span-12 xl:col-span-6 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-200 px-4 py-2'>
              <h2 className='text-lg font-semibold text-green-700'>
                Row-wise Census Details
              </h2>
            </div>

            {/* Table */}
            <div className='max-h-[500px] overflow-auto'>
              <table className='min-w-full border-collapse'>
                {/* Table Header */}
                <thead className='sticky top-0 z-10 bg-gray-100'>
                  <tr>
                    <th className='border border-gray-200 px-1 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-700'>
                      SL
                    </th>

                    {rowWiseTable.headers.map((header) => (
                      <th
                        key={header.id}
                        className='border border-gray-200 px-1 py-3 text-center text-xs font-normal uppercase tracking-wide text-gray-700 whitespace-nowrap'
                      >
                        {header.label}
                      </th>
                    ))}

                    <th className='border border-gray-200 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-700'>
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {editId && record.loading && !record.data ? (
                    <TableSkeleton rows={4} columns={rowWiseTable.headers.length + 2} />
                  ) : rowWiseTable.rows.length === 0 ? (
                    <EmptyRow columns={rowWiseTable.headers.length + 2} />
                  ) : null}
                  {rowWiseTable.rows.map((row, index) => (
                    <React.Fragment key={row.id}>
                    <tr
                      className={`transition-colors hover:bg-green-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } ${row.removed ? "line-through opacity-60" : ""} ${rowProblems[row.id] ? "outline outline-1 outline-red-400" : ""}`}
                    >
                      {/* SL */}
                      <td className='border border-gray-200 px-1 py-1 text-center text-sm'>
                        {index + 1}
                      </td>

                      {/* Dynamic Data */}
                      {rowWiseTable.headers.map((header) => (
                        <td
                          key={header.id}
                          className='border border-gray-200 px-1 py-1 text-center text-sm whitespace-nowrap'
                        >
                          {header.key === "status" ? (
                            <span
                              className={`inline-flex rounded-full px-1 py-1 text-xs font-medium ${
                                statusColor[row.status]
                              }`}
                            >
                              {row.status}
                            </span>
                          ) : (
                            row[header.key]
                          )}
                        </td>
                      ))}

                      {/* Actions */}
                      <td className='border border-gray-200 px-3 py-1'>
                        {row.mark && (
                          <div className='mb-1 text-center'>
                            <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold no-underline ${MARK_CLASS[row.mark]}`}>{row.mark}</span>
                          </div>
                        )}
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            title='View'
                            onClick={() => openRow("view", row)}
                            className='rounded-md p-2 text-blue-600 transition hover:bg-blue-100'
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type='button'
                            disabled={Boolean(pendingRequest) || row.removed}
                            title={pendingRequest ? `Waiting for approval (${pendingRequest.requestNo})` : "Edit"}
                            onClick={() => openRow("edit", row)}
                            className='rounded-md p-2 text-amber-600 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-40'
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type='button'
                            disabled={Boolean(pendingRequest)}
                            title={pendingRequest ? `Waiting for approval (${pendingRequest.requestNo})` : row.removed ? "Bring back" : "Remove"}
                            onClick={() => removeRow(row)}
                            className={`rounded-md p-2 transition disabled:cursor-not-allowed disabled:opacity-40 ${row.removed ? "text-green-700 hover:bg-green-100" : "text-red-600 hover:bg-red-100"}`}
                          >
                            {row.removed ? <RotateCcw size={16} /> : <Trash2 size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    {rowProblems[row.id] && (
                      <tr>
                        <td colSpan={rowWiseTable.headers.length + 2} className='border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-700'>
                          Row {row.rowNo}: {rowProblems[row.id]}
                        </td>
                      </tr>
                    )}
                    </React.Fragment>
                  ))}
                </tbody>
                {/* Total / Average Row */}
                <tfoot>
                <tr className='bg-gray-100 font-semibold text-gray-800'>
                  <td className='border border-gray-200 px-1 py-2 text-center'>
                    -
                  </td>

                  <td className='border border-gray-200 px-3 py-2 whitespace-nowrap'>
                    Total / Average
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    {fixed(sum("rowLength"))}
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    {fixed(avg("plantsPerMeter"))}
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    {num(sum("expectedPlants"))}
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    {num(sum("livePlants"))}
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    {num(sum("deadPlants"))}
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    {num(sum("missingPlants"))}
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    {fixed(avg("gapPercentage"))}
                  </td>

                  <td className='border border-gray-200 px-3 py-2'></td>
                </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer */}

            <div className='flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
              {/* Left */}
              <p className='text-sm text-gray-500'>
                Showing <span className='font-semibold text-gray-700'>1</span>{" "}
                to{" "}
                <span className='font-semibold text-gray-700'>
                  {rowWiseTable.rows.length}
                </span>{" "}
                of{" "}
                <span className='font-semibold text-gray-700'>
                  {rowWiseTable.rows.length}
                </span>{" "}
                rows
              </p>

              {/* Right */}
              <button
                type='button'
                disabled={Boolean(pendingRequest)}
                onClick={openAdd}
                className='inline-flex items-center justify-center gap-2 rounded-lg border border-green-600 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50'
              >
                <Plus size={16} />
                Add Row
              </button>
            </div>
          </div>

          {/* Live vs Dead Plants */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}

            <div className='border-b border-gray-200 px-2 py-4'>
              <h2 className='text-xl font-semibold text-green-700'>
                {charts.liveVsDeadChart.title}
              </h2>
            </div>

            {/* Body */}
            <div className='flex flex-col items-center gap-4 px-3 py-6'>
              {/* Donut Chart */}
              <div className='relative h-48 w-48 shrink-0'>
                {liveDeadSlices.length === 0 ? (
                  <div className='flex h-full items-center justify-center rounded-full border-[14px] border-gray-100 text-xs text-gray-400'>
                    No data
                  </div>
                ) : (
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={liveDeadSlices}
                        dataKey='value'
                        nameKey='name'
                        innerRadius='68%'
                        outerRadius='95%'
                        paddingAngle={2}
                        startAngle={90}
                        endAngle={-270}
                        stroke='none'
                      >
                        {liveDeadSlices.map((item) => (
                          <Cell key={item.id} fill={item.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [Number(value).toLocaleString(), name]} />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {/* Center Text */}
                <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
                  <p className='text-[11px] text-gray-500'>Total</p>
                  <h3 className='text-base font-bold text-gray-800'>{charts.liveVsDeadChart.total.toLocaleString()}</h3>
                </div>
              </div>

              {/* Legend */}
              <div className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
                {liveDeadSlices.map((item) => (
                  <div key={item.id} className='flex items-center gap-2'>
                    <span className='h-3 w-3 shrink-0 rounded-full' style={{ backgroundColor: item.color }} />
                    <div>
                      <p className='text-xs font-medium text-gray-700'>{item.name}</p>
                      <p className='text-[11px] text-gray-500'>
                        {item.value.toLocaleString()} ({item.percentage}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plant Distribution */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-sm font-semibold text-green-700'>
                {charts.plantDistributionChart.title}
              </h2>
            </div>

            {/* Chart */}
            <div className='h-64 p-2 '>
              {charts.plantDistributionChart.data.length === 0 ? (
                <div className='flex h-full items-center justify-center text-xs text-gray-400'>No rows yet</div>
              ) : (
              <ResponsiveContainer width='100%' height='100%'>
                <ComposedChart
                  data={charts.plantDistributionChart.data}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 4,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid vertical={false} stroke='#f1f5f9' />

                  <XAxis
                    dataKey='row'
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    yAxisId='left'
                    width={52}
                    tickFormatter={(value) => new Intl.NumberFormat('en', { notation: 'compact' }).format(value)}
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    yAxisId='right'
                    orientation='right'
                    width={32}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Legend
                    verticalAlign='bottom'
                    height={20}
                    iconSize={10}
                    wrapperStyle={{
                      fontSize: "11px",
                      paddingTop: "8px",
                    }}
                  />
                  <Bar
                    yAxisId='left'
                    dataKey='livePlants'
                    fill='#16A34A'
                    radius={[2, 2, 0, 0]}
                    name='Live Plants'
                  />

                  <Bar
                    yAxisId='left'
                    dataKey='deadPlants'
                    fill='#EF4444'
                    radius={[2, 2, 0, 0]}
                    name='Dead Plants'
                  />

                  <Line
                    yAxisId='right'
                    type='monotone'
                    dataKey='gap'
                    stroke='#F59E0B'
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name='Gap (%)'
                  />
                </ComposedChart>
              </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* Bottom Section */}
        {/* ================================================= */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Field Photos */}
          <div className='col-span-12 md:col-span-6 xl:col-span-4 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            <div>
              {/* Header */}
              <div className='border-b border-gray-200 px-2 py-3'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Field Photos
                </h2>
              </div>

              {/* Body */}

              <div className='grid grid-cols-3 gap-1 p-1'>
                {[0, 1, 2].map((index) => ({ id: index, title: `Photo ${index + 1}`, image: photoUrls[index] })).map((photo) => (
                  <div
                    key={photo.id}
                    className='overflow-hidden rounded-lg border border-gray-200 bg-white'
                  >
                    {/* Title */}
                    <div className='border-b border-gray-100 px-1 py-2'>
                      <h3 className='truncate text-center text-[11px] font-semibold text-gray-700'>
                        {photo.title}
                      </h3>
                    </div>

                    {/* Image */}
                    {photo.image ? (
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className='h-24 w-full object-cover'
                      />
                    ) : (
                      <div className='flex h-24 w-full items-center justify-center bg-gray-50 text-xs text-gray-400'>
                        No photo
                      </div>
                    )}

                    {/* Footer */}
                    <div className='border-t border-gray-100 py-2'>
                      <input ref={photoInput} type='file' accept='image/jpeg,image/png,image/webp' multiple className='hidden' onChange={(event) => addFiles("photos", event)} />
                      <button
                        type='button'
                        disabled={uploading || Boolean(pendingRequest)}
                        onClick={() => photoInput.current?.click()}
                        className='flex w-full items-center justify-center gap-1 text-xs font-medium text-gray-600 transition hover:text-green-700 disabled:opacity-60'
                      >
                        <Upload size={14} />
                        Upload
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Census History */}
          <div className='col-span-12 md:col-span-6 xl:col-span-4 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-2 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Census History
              </h2>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full text-xs'>
                <thead className='bg-gray-50'>
                  <tr>
                    {censusHistoryTableHeaders.map((header) => (
                      <th
                        key={header.id}
                        className='border border-gray-200 px-2 py-2 text-left font-semibold'
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {censusHistory.length === 0 && <EmptyRow columns={censusHistoryTableHeaders.length} />}
                  {censusHistory.map((item) => (
                    <tr key={item.id} className='hover:bg-green-50'>
                      {censusHistoryTableHeaders.map((header) => (
                        <td
                          key={header.id}
                          className='border border-gray-200 px-2 py-2'
                        >
                          {item[header.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Approval Status */}
          <div className='col-span-12 md:col-span-12 xl:col-span-4 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-2 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Approval Status
              </h2>
            </div>

            {/* Body */}
            <div className='space-y-3 p-3'>
              {approvalStatus.workflow.map((item, index) => (
                <div key={item.id} className='flex items-start gap-3'>
                  {/* Step Number */}
                  <div className='flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white'>
                    {index + 1}
                  </div>

                  {/* Details */}
                  <div className='flex-1'>
                    <h4 className='text-sm font-normal text-gray-800'>
                      {item.actionBy}
                    </h4>

                    <p className='text-xs text-gray-500'>{item.designation}</p>
                  </div>

                  {/* Right */}
                  <div className='text-right'>
                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Documents: full width, under the cards above */}
          <div className='col-span-12 flex flex-col rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-2 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Documents
              </h2>
            </div>

            {/* Table */}
            <div className='flex-1 overflow-x-auto'>
              <table className='w-full min-w-[560px] table-fixed text-xs'>
                <thead className='bg-gray-50'>
                  <tr>
                    {documentTableHeaders.map((header) => (
                      <th
                        key={header.id}
                        style={{ width: DOCUMENT_COLUMN_WIDTH[header.key] }}
                        className='border border-gray-200 px-2 py-2 text-center text-xs font-semibold'
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {documents.length === 0 && <EmptyRow columns={documentTableHeaders.length} />}
                  {documents.map((doc, index) => (
                    <tr key={doc.id} className={doc.removed ? "line-through opacity-60" : ""}>
                      {documentTableHeaders.map((header) => (
                        <td
                          key={header.id}
                          title={header.key === "documentName" || header.key === "fileName" ? String(doc[header.key] ?? "") : undefined}
                          className='truncate border border-gray-200 px-2 py-2 text-center'
                        >
                          {header.key === "sl" ? (
                            index + 1
                          ) : header.key === "action" ? (
                            <div className='flex justify-center gap-2'>
                              <button type='button' title='Download' onClick={() => window.open(doc.url, "_blank", "noopener")}>
                                <Download size={14} />
                              </button>

                              <button type='button' title={doc.removed ? "Bring back" : "Remove"} disabled={Boolean(pendingRequest)} onClick={() => (doc.removed ? confirmRestoreDocument(doc) : setDeletingDoc(doc))} className='disabled:cursor-not-allowed disabled:opacity-40'>
                                {doc.removed ? <RotateCcw size={14} /> : <Trash2 size={14} />}
                              </button>
                            </div>
                          ) : header.key === "documentName" && doc.mark ? (
                            <span className='inline-flex items-center gap-1'>
                              {doc.documentName}
                              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold no-underline ${MARK_CLASS[doc.mark]}`}>{doc.mark}</span>
                            </span>
                          ) : (
                            doc[header.key]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer: the upload button stays at the bottom of the card */}
            <div className='mt-auto flex justify-center border-t border-gray-200 p-2'>
              <input ref={documentInput} type='file' accept='.pdf,.jpg,.jpeg,.png,.doc,.docx' multiple className='hidden' onChange={(event) => addFiles("documents", event)} />
              <button
                type='button'
                disabled={uploading || Boolean(pendingRequest)}
                onClick={() => documentInput.current?.click()}
                className='flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 transition hover:border-green-700 hover:bg-green-700 hover:text-white disabled:opacity-60'
              >
                <Upload size={16} />
                Upload More Document
              </button>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* Footer Buttons */}
        {/* ================================================= */}
        <div className='mt-4 rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end'>
            {/* Buttons Here */}
            <button
              type='button'
              onClick={resetForm}
              className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto'
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button
              type='button'
              onClick={() => navigate(-1)}
              className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 sm:w-auto'
            >
              <X size={18} />
              Cancel
            </button>
            <button
              type='button'
              disabled={isSubmitting || Boolean(pendingRequest)}
              onClick={handleSubmit(onSubmit)}
              className='flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 disabled:opacity-60 sm:w-auto'
            >
              <Save size={18} />
              Save as Draft
            </button>
            <button
              type='submit'
              form='census-form'
              disabled={isSubmitting || Boolean(pendingRequest)}
              className='flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-60 sm:w-auto'
            >
              <CheckCircle2 size={18} />
              Submit for Approval
            </button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={Boolean(deletingDoc)}
        title='Remove document?'
        confirmLabel='Remove'
        message={`${deletingDoc?.documentName ?? "This document"} will be removed from this census when you press Save.`}
        onConfirm={confirmDeleteDocument}
        onCancel={() => setDeletingDoc(null)}
      />
      <ConfirmDialog
        open={blocker.state === "blocked"}
        title='Leave without saving?'
        message='Some changes on this page are not saved yet. If you leave, they are lost.'
        confirmLabel='Leave'
        onConfirm={() => {
          clearDraft();
          blocker.proceed();
        }}
        onCancel={() => blocker.reset()}
      />
      {rowPopup && (
        <div className='fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-3' onMouseDown={closeRow}>
          <form
            role='dialog'
            aria-modal='true'
            aria-label={rowPopup.mode === "view" ? "Census row details" : rowPopup.mode === "add" ? "Add census row" : "Edit census row"}
            onSubmit={saveRow}
            onMouseDown={(event) => event.stopPropagation()}
            className='flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl'
          >
            <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
              <h2 className='text-base font-semibold text-green-700'>
                {rowPopup.mode === "view" ? "Census Row Details" : rowPopup.mode === "add" ? "Add Census Row" : "Edit Census Row"}
              </h2>
              <button type='button' onClick={closeRow} aria-label='Close' className='rounded p-1 text-gray-500 hover:bg-gray-100'>
                <X size={18} />
              </button>
            </div>
            {rowNotice && rowPopup.mode !== "view" && (
              <p role='alert' className='mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>
                {rowNotice}
              </p>
            )}
            <div className='grid grid-cols-1 gap-x-6 gap-y-3 overflow-y-auto p-5 sm:grid-cols-2 lg:grid-cols-3'>
              {ROW_FIELDS.map(([name, label, type]) => (
                <div key={name}>
                  <label htmlFor={`row-${name}`} className='text-xs text-gray-500'>
                    {label}
                  </label>
                  {rowPopup.mode !== "view" ? (
                    <>
                      <input
                        id={`row-${name}`}
                        type={type}
                        step='any'
                        min={type === "number" ? 0 : undefined}
                        value={rowValues[name] ?? ""}
                        data-invalid={rowErrors[name] ? "true" : undefined}
                        onChange={(event) => setRowValues((current) => ({ ...current, [name]: event.target.value }))}
                        className='mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                      {rowErrors[name] && <p className='mt-1 text-xs text-red-600'>{rowErrors[name]}</p>}
                    </>
                  ) : (
                    <p className='text-sm font-medium text-gray-800'>{rowValues[name] === "" ? DASH : rowValues[name]}</p>
                  )}
                </div>
              ))}
              <div>
                <span className='text-xs text-gray-500'>Gap (%)</span>
                <p className='text-sm font-medium text-gray-800'>{fixed(gapOf(rowValues))}</p>
              </div>
            </div>
            <div className='flex justify-end gap-2 border-t border-gray-200 px-5 py-3'>
              <button type='button' onClick={closeRow} className='h-10 rounded-lg border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50'>
                {rowPopup.mode === "view" ? "Close" : "Cancel"}
              </button>
              {rowPopup.mode !== "view" && (
                <button type='submit' className='h-10 rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800'>
                  {rowPopup.mode === "add" ? "Add Row" : "Save"}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlantCensus;
