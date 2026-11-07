import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useBlocker, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "../../lib/useForm";
import { bushRegisterData } from "../../data/PlantationManagementData/bushRegisterData";
import { api, notifySaved } from "../../lib/api";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";
import { useApi } from "../../lib/useApi";
import { loadNewestCreated } from "../../lib/newestCreated";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import {
  FilePlus2,
  X,
  Save,
  Send,
  Printer,
  FileSpreadsheet,
  Download,
  RotateCcw,
  Upload,
  Eye,
  Pencil,
  Trash2,
  Search,
  ArrowUp,
  CircleOff,
  Gauge,
  GitBranch,
  Grid2x2,
  Leaf,
  Map,
  ShieldCheck,
  Sprout,
  TreePine,
  Trees,
  Expand,
  Layers,
  Minus,
  Plus,
  MapPinned,
  RefreshCcw,
  CalendarClock,
} from "lucide-react";
const gapSummaryIconMap = {
  totalGap: Trees,
  gapArea: MapPinned,
  replantRequired: Sprout,
  suggestedAction: RefreshCcw,
  recommendedClone: Leaf,
  bestTime: CalendarClock,
};
const summaryIconMap = {
  Map,
  Rows: Grid2x2,
  Trees,
  Leaf,
  TreePine,
  CircleOff,
  Gauge,
  ArrowUp,
  GitBranch,
  Grid2x2,
  ShieldCheck,
  Sprout,
};
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Select from "../../components/common/Select";
const healthBadgeMap = {
  Excellent: "bg-green-100 text-green-700 border border-green-200",

  Good: "bg-green-100 text-green-700 border border-green-200",

  Fair: "bg-yellow-100 text-yellow-700 border border-yellow-200",

  Poor: "bg-orange-100 text-orange-700 border border-orange-200",

  Dead: "bg-red-100 text-red-700 border border-red-200",
};

const PER_PAGE = 10;
const DASH = "-";
const num = (value) => (value === null || value === undefined ? DASH : Number(value).toLocaleString("en-IN"));
const fixed = (value, digits = 2) => (value === null || value === undefined ? DASH : Number(value).toFixed(digits));
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);

// Rows added, edited or removed on the page and not saved yet: new rows (with a temporary id), edited rows by id, removed ids.
const NO_CHANGES = { add: [], update: {}, remove: [] };
const MAX_ROWS_PER_SAVE = 2000;
const MARK_CLASS = {
  Unsaved: "bg-blue-100 text-blue-700",
  Edited: "bg-amber-100 text-amber-700",
  Removed: "bg-red-100 text-red-600",
};
let tempCount = 0;
const newTempId = () => `new-${++tempCount}`;

const EMPTY_GAP = { totalGap: null, gapArea: null, replantRequired: null, suggestedAction: null, recommendedClone: null, bestTime: null };

const HEALTH = ["Excellent", "Good", "Fair", "Poor", "Dead"];
const ROW_FIELDS = [
  ["rowNo", "Row No.", "text", true],
  ["from", "From", "number", true],
  ["to", "To", "number", true],
  ["totalBush", "Total", "number", true],
  ["productive", "Productive", "number", true],
  ["dead", "Dead", "number", true],
  ["missing", "Missing", "number", true],
  ["height", "Avg Height", "number", false],
  ["spread", "Avg Spread", "number", false],
  ["health", "Health", "select", false],
  ["remarks", "Remarks", "text", false],
];
const toRowForm = (row) => Object.fromEntries(ROW_FIELDS.map(([name]) => [name, row[name] ?? ""]));
// Same formula the server uses for the gap.
const gapOf = (row) => (Number(row.totalBush) ? ((Number(row.dead || 0) + Number(row.missing || 0)) / Number(row.totalBush)) * 100 : 0);

// Survey file columns (any capitalisation / spacing) -> the row fields.
const IMPORT_COLUMNS = {
  rowno: "rowNo", row: "rowNo", from: "from", to: "to", total: "totalBush", totalbush: "totalBush",
  productive: "productive", dead: "dead", missing: "missing", avgheight: "height", height: "height",
  avgspread: "spread", spread: "spread", health: "health", remarks: "remarks",
};
const IMPORT_HINT = "Row No., From, To, Total, Productive, Dead, Missing (optional: Avg Height, Avg Spread, Health, Remarks)";
// A small CSV reader: commas, quoted values, "" for a quote, CRLF or LF.
const parseCsv = (text) => {
  const lines = [];
  let line = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      line.push(cell);
      cell = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      line.push(cell);
      cell = "";
      lines.push(line);
      line = [];
    } else cell += char;
  }
  line.push(cell);
  lines.push(line);
  return lines.filter((cells) => cells.some((value) => value.trim() !== ""));
};

const BushRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // With ?id= that register is shown; otherwise the first one matching the search.
  const pickedId = searchParams.get("id");
  // Search applies the form as filters to the registers; the first match is shown.
  const [applied, setApplied] = useState({});
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);
  // Rows changed on the page and not saved yet, the server's complaints about single rows, and a question before leaving.
  const [changes, setChanges] = useState(NO_CHANGES);
  const [rowProblems, setRowProblems] = useState({});
  const [saving, setSaving] = useState(false);
  const [askLeave, setAskLeave] = useState(null);
  const leavingRef = useRef(false);
  // Row popup: { mode: "view" | "edit", id } plus the values being edited.
  const [rowPopup, setRowPopup] = useState(null);
  const [rowValues, setRowValues] = useState({});
  const [rowErrors, setRowErrors] = useState({});
  const importInput = useRef(null);
  const [importing, setImporting] = useState(false);
  const [importProblems, setImportProblems] = useState([]);

  const estateId = watch("estate");
  const divisionId = watch("division");
  const sectionId = watch("section");
  const estateOptions = useApi(() => api.get("/options/estates"), []);
  const divisionOptions = useApi(() => (estateId ? api.get("/options/divisions", { estate: estateId }) : Promise.resolve([])), [estateId]);
  const sectionOptions = useApi(() => (divisionId ? api.get("/options/sections", { division: divisionId }) : Promise.resolve([])), [divisionId]);
  const fieldOptions = useApi(() => (sectionId ? api.get("/options/fields", { section: sectionId }) : Promise.resolve([])), [sectionId]);

  const registers = useApi(() => (pickedId ? Promise.resolve(null) : loadNewestCreated("/bush-registers", applied, 1, 1)), [applied, pickedId]);
  const picked = useApi(() => (pickedId ? api.get(`/bush-registers/${pickedId}`) : Promise.resolve(null)), [pickedId]);
  const current = pickedId ? picked.data : registers.data?.data?.[0];
  const pendingRequest = current?.pendingRequest ?? null;
  const changesCount = changes.add.length + Object.keys(changes.update).length + changes.remove.length;
  // The table first lists the new (unsaved) rows, ten to a page, then the saved rows page by page.
  const newPages = Math.ceil(changes.add.length / PER_PAGE);
  const onNewPage = page <= newPages;
  const serverPage = onNewPage ? 1 : page - newPages;
  const rowsCall = useApi(
    () => (current ? api.get(`/bush-registers/${current.id}/rows`, { page: serverPage, perPage: PER_PAGE }) : Promise.resolve(null)),
    [current?.id, serverPage],
  );
  const report = useApi(() => (current ? api.get(`/bush-registers/${current.id}/report`) : Promise.resolve(null)), [current?.id, rowsCall.data]);
  const serverMeta = rowsCall.data?.meta ?? { page: 1, perPage: PER_PAGE, total: 0, totalPages: 1 };
  const rowMeta = { ...serverMeta, total: serverMeta.total + changes.add.length, totalPages: Math.max(1, newPages + serverMeta.totalPages) };
  // The rows of this page as the page shows them: saved rows with their unsaved edit or removal, or the new rows.
  const rows = onNewPage
    ? changes.add.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((row) => ({ ...row, id: row.tempId, isNew: true, mark: "Unsaved", gap: Math.round(gapOf(row) * 100) / 100 }))
    : (rowsCall.data?.data ?? []).map((row) => {
        const edit = changes.update[row.id];
        const removed = changes.remove.includes(row.id);
        return { ...row, ...(edit ?? {}), ...(edit ? { gap: Math.round(gapOf(edit) * 100) / 100 } : {}), removed, mark: removed ? "Removed" : edit ? "Edited" : null };
      });
  const tableSummary = rowsCall.data?.tableSummary ?? report.data?.tableSummary;
  const data = report.data;
  const waiting = pickedId ? picked.loading && !picked.data : registers.loading && !registers.data;
  const failure = registers.error ?? picked.error ?? rowsCall.error ?? report.error;

  // Anything that shows another register first asks, when rows are changed and not saved.
  const guard = (action) => {
    if (changesCount > 0) setAskLeave(() => action);
    else action();
  };
  const onSubmit = (values) => guard(() => runSearch(values));
  const runSearch = (values) => {
    const filters = {};
    for (const [key, value] of Object.entries(values)) if (value !== "" && value !== undefined && value !== null && key !== "bushAge" && key !== "totalArea" && key !== "rowSpacing" && key !== "plantSpacing" && key !== "surveyDate") filters[key] = value;
    setPage(1);
    if (pickedId) setSearchParams({});
    setApplied(filters);
    toast.success("Search completed successfully!");
  };
  const clearSearch = () => guard(doClearSearch);
  const doClearSearch = () => {
    reset({});
    setPage(1);
    if (pickedId) setSearchParams({});
    setApplied({});
  };
  const openRow = (mode, row) => {
    setRowPopup({ mode, id: row.id, isNew: Boolean(row.isNew) });
    setRowValues(toRowForm(row));
    setRowErrors({});
  };
  const openAdd = () => {
    if (!current) {
      toast.error("There is no bush register to add a row to. Search for one first.");
      return;
    }
    setRowPopup({ mode: "add" });
    setRowValues(toRowForm({}));
    setRowErrors({});
  };
  const closeRow = () => setRowPopup(null);
  // The problems of one row, or an empty object when it is fine.
  const problemsOf = (values) => {
    const problems = {};
    for (const [name, label, type, required] of ROW_FIELDS) {
      const value = values[name];
      if (required && (value === "" || value === null || value === undefined)) problems[name] = `${label} is required.`;
      else if (type === "number" && value !== "" && value !== null && value !== undefined && (Number.isNaN(Number(value)) || Number(value) < 0)) problems[name] = `${label} must be 0 or more.`;
    }
    return problems;
  };
  // Import Survey Data: a CSV file. Its good rows are put on the page as Unsaved rows, its problems are listed,
  // and Save Changes sends everything as one request.
  const importSurvey = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!current) {
      toast.error("There is no bush register to import into. Search for one first.");
      return;
    }
    if (!/\.csv$/i.test(file.name)) {
      toast.error("Please choose a .csv file (in Excel: Save As > CSV).");
      return;
    }
    setImporting(true);
    setImportProblems([]);
    try {
      const [header, ...lines] = parseCsv(await file.text());
      const fields = header.map((name) => IMPORT_COLUMNS[name.toLowerCase().replace(/[^a-z]/g, "")]);
      const missing = ["rowNo", "from", "to", "totalBush", "productive", "dead", "missing"].filter((name) => !fields.includes(name));
      if (missing.length) {
        toast.error(`The file needs these columns: ${IMPORT_HINT}.`);
        return;
      }
      if (lines.length === 0) {
        toast.error("The file has no rows.");
        return;
      }
      const problems = [];
      const good = [];
      const seen = new Set([...changes.add.map((row) => row.rowNo)]);
      for (const [index, cells] of lines.entries()) {
        const body = {};
        fields.forEach((name, column) => {
          if (name) body[name] = (cells[column] ?? "").trim();
        });
        for (const name of ["from", "to", "totalBush", "productive", "dead", "missing", "height", "spread"]) {
          if (body[name] === "" || body[name] === undefined) body[name] = null;
          else if (!Number.isNaN(Number(body[name]))) body[name] = Number(body[name]);
        }
        const wrong = problemsOf(body);
        const label = `Row ${index + 2}${body.rowNo ? ` (${body.rowNo})` : ""}`;
        if (Object.keys(wrong).length) problems.push(`${label} – ${Object.values(wrong).join(" ")}`);
        else if (seen.has(body.rowNo)) problems.push(`${label} – this row number is in the file or on the page twice.`);
        else {
          seen.add(body.rowNo);
          good.push({ ...body, tempId: newTempId() });
        }
      }
      if (changesCount + good.length > MAX_ROWS_PER_SAVE) {
        toast.error(`One save can change at most ${MAX_ROWS_PER_SAVE} rows. Save the rows on the page first, or use a shorter file.`);
        return;
      }
      setImportProblems(problems);
      if (good.length) {
        setChanges((cur) => ({ ...cur, add: [...cur.add, ...good] }));
        setPage(1);
        toast.success(`${good.length} ${good.length === 1 ? "row" : "rows"} read from the file. Press Save Changes to send them.`);
      }
      if (problems.length) toast.error(`${problems.length} ${problems.length === 1 ? "row has" : "rows have"} a problem and was left out.`);
    } catch (error) {
      toast.error(error.message || "Could not read the file.");
    } finally {
      setImporting(false);
    }
  };
  useEffect(() => {
    if (!rowPopup) return undefined;
    const onKey = (event) => event.key === "Escape" && setRowPopup(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [rowPopup]);
  // The popup changes the page only; Save Changes sends everything.
  const saveRow = (event) => {
    event.preventDefault();
    const problems = problemsOf(rowValues);
    setRowErrors(problems);
    if (Object.keys(problems).length) return;
    const body = Object.fromEntries(
      ROW_FIELDS.map(([name, , type]) => [name, rowValues[name] === "" ? null : type === "number" ? Number(rowValues[name]) : rowValues[name]]),
    );
    if (rowPopup.mode === "add") {
      if (changesCount + 1 > MAX_ROWS_PER_SAVE) {
        toast.error(`One save can change at most ${MAX_ROWS_PER_SAVE} rows.`);
        return;
      }
      setChanges((cur) => ({ ...cur, add: [...cur.add, { ...body, tempId: newTempId() }] }));
      setPage(1);
    } else if (rowPopup.isNew) {
      setChanges((cur) => ({ ...cur, add: cur.add.map((row) => (row.tempId === rowPopup.id ? { ...body, tempId: row.tempId } : row)) }));
    } else {
      setChanges((cur) => ({ ...cur, update: { ...cur.update, [rowPopup.id]: body } }));
    }
    setRowProblems((cur) => ({ ...cur, [rowPopup.id]: undefined }));
    setRowPopup(null);
  };

  const confirmDelete = () => {
    const row = deleting;
    setChanges((cur) =>
      row.isNew
        ? { ...cur, add: cur.add.filter((item) => item.tempId !== row.id) }
        : { ...cur, update: Object.fromEntries(Object.entries(cur.update).filter(([id]) => id !== row.id)), remove: [...cur.remove, row.id] },
    );
    setRowProblems((cur) => ({ ...cur, [row.id]: undefined }));
    setDeleting(null);
  };
  const restoreRow = (row) => {
    setChanges((cur) => ({ ...cur, remove: cur.remove.filter((id) => id !== row.id) }));
    setRowProblems((cur) => ({ ...cur, [row.id]: undefined }));
  };

  // ONE Save: every added, edited and removed row goes in one request, so there is one approval.
  const saveChanges = async () => {
    if (!current || changesCount === 0 || saving) return;
    if (changesCount > MAX_ROWS_PER_SAVE) {
      toast.error(`One save can change at most ${MAX_ROWS_PER_SAVE} rows. This one has ${changesCount}.`);
      return;
    }
    const ids = Object.keys(changes.update);
    const body = {
      add: changes.add.map(({ tempId, ...row }) => { void tempId; return row; }),
      update: ids.map((id) => ({ id, ...changes.update[id] })),
      remove: changes.remove,
    };
    setSaving(true);
    setRowProblems({});
    try {
      const result = await api.post(`/bush-registers/${current.id}/rows/changes`, body);
      notifySaved(result, "Changes saved successfully!");
      setChanges(NO_CHANGES);
      setImportProblems([]);
      setPage(1);
      registers.reload();
      picked.reload();
      rowsCall.reload();
      report.reload();
    } catch (error) {
      // Row errors go to their row (and are listed), everything else is said once.
      const issues = {};
      const listed = [];
      let other = "";
      let gone = false;
      for (const [key, message] of Object.entries(error.fields ?? {})) {
        const match = key.match(/^(add|update|remove)\.(\d+)/);
        if (match) {
          const index = Number(match[2]);
          const rowKey = match[1] === "update" ? ids[index] : match[1] === "remove" ? changes.remove[index] : changes.add[index]?.tempId;
          if (rowKey && !issues[rowKey]) {
            issues[rowKey] = message;
            const row = match[1] === "add" ? changes.add[index] : null;
            listed.push(`${row ? `Row ${row.rowNo}` : match[1] === "update" ? `Edited row ${index + 1}` : `Removed row ${index + 1}`} – ${message}`);
          }
        } else other = other || message;
        if (/no longer/i.test(message)) gone = true;
      }
      setRowProblems(issues);
      setImportProblems(listed);
      // Show the page of the first new row that has a problem.
      const firstNew = changes.add.findIndex((row) => issues[row.tempId]);
      if (firstNew >= 0) setPage(Math.floor(firstNew / PER_PAGE) + 1);
      const count = Object.keys(issues).length;
      if (count) toast.error(`${count} row${count === 1 ? " has" : "s have"} a problem. See the marked row${count === 1 ? "" : "s"}.`);
      else toast.error(other || error.message);
      if (gone) {
        rowsCall.reload();
        report.reload();
      }
    } finally {
      setSaving(false);
    }
  };

  // When a request that was waiting is decided, the rows are read again.
  const hadRequest = useRef(false);
  useEffect(() => {
    if (hadRequest.current && !pendingRequest) {
      rowsCall.reload();
      report.reload();
    }
    hadRequest.current = Boolean(pendingRequest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingRequest]);
  // Another register starts clean.
  useEffect(() => {
    setChanges(NO_CHANGES);
    setRowProblems({});
    setImportProblems([]);
    setPage(1);
  }, [current?.id]);
  // Warn before leaving the page (another page, refresh or closing the tab) with rows that are not saved.
  const blocker = useBlocker(({ currentLocation, nextLocation }) => changesCount > 0 && !leavingRef.current && currentLocation.pathname + currentLocation.search !== nextLocation.pathname + nextLocation.search);
  useEffect(() => {
    if (changesCount === 0) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [changesCount]);
  const rowOff = (row) => Boolean(pendingRequest || row.pendingRequest);
  const rowTitle = (row, label) => (pendingRequest ? `Waiting for approval (${pendingRequest.requestNo})` : waitingTitle(row, label));

  const gapSummary = data?.gapSummary ?? EMPTY_GAP;
  const gapSizeDetails = data?.gapSizeDetails ?? [];
  const healthDistribution = data?.healthDistribution ?? [];
  const bushAgeProfile = data?.bushAgeProfile ?? [];
  const summaryItems = bushRegisterData.summary.map((item, index) => {
    const live = data?.summary?.[index];
    const value = live?.value;
    return {
      ...item,
      value:
        value === null || value === undefined
          ? DASH
          : typeof value === "number"
            ? `${num(value)}${live.unit ? (live.unit === "%" ? "%" : ` ${live.unit}`) : ""}`
            : value,
    };
  });
  const mapLatitude = orDash(data?.map?.latitude);
  const mapLongitude = orDash(data?.map?.longitude);
  const gapSummaryItems = [
    {
      key: "totalGap",
      title: "Total Gaps Identified",
      value: num(gapSummary.totalGap),
    },
    {
      key: "gapArea",
      title: "Gap Area",
      value: gapSummary.gapArea == null ? DASH : `${gapSummary.gapArea} Acre`,
    },
    {
      key: "replantRequired",
      title: "Replanting Required",
      value: gapSummary.replantRequired == null ? DASH : `${num(gapSummary.replantRequired)} Bushes`,
    },
    {
      key: "suggestedAction",
      title: "Suggested Action",
      value: orDash(gapSummary.suggestedAction),
    },
    {
      key: "recommendedClone",
      title: "Recommended Clone",
      value: orDash(gapSummary.recommendedClone),
    },
    {
      key: "bestTime",
      title: "Best Time",
      value: orDash(gapSummary.bestTime),
    },
  ];
  const ageProfileData = bushAgeProfile.map((item) => ({
    name: item.age,
    value: item.area,
    color: item.color,
  }));
  const hasAgeData = ageProfileData.some((item) => Number(item.value) > 0);
  const totalGapCount = gapSizeDetails.reduce(
    (sum, item) => sum + (item.count ?? 0),
    0,
  );

  const totalGapPercentage = gapSizeDetails.reduce(
    (sum, item) => sum + item.percentage,
    0,
  );

  const totalReplant = gapSizeDetails.reduce(
    (sum, item) => sum + item.replant,
    0,
  );

  const quickActionIconMap = {
    "survey-entry": FilePlus2,
    "mark-replanting": MapPinned,
    "print-report": Printer,
    "export-excel": FileSpreadsheet,
    "export-survey": Download,
  };
  return (
    <div className='space-y-6'>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={() => navigate("/bush-register-list")}
          className='flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50'
        >
          Register List
        </button>
      </div>
      {pendingRequest && (
        <div role='status' className='rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800'>
          A request ({pendingRequest.requestNo}) is waiting for approval. This register cannot be changed until it is approved or rejected.
        </div>
      )}
      {!pendingRequest && changesCount > 0 && (
        <div role='status' className='rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800'>
          {changesCount} row change{changesCount === 1 ? "" : "s"} {changesCount === 1 ? "is" : "are"} not saved yet. Press Save Changes to send everything as one request.
        </div>
      )}
      {failure && (
        <ErrorState
          message={failure.message}
          onRetry={() => {
            registers.reload();
            picked.reload();
            rowsCall.reload();
            report.reload();
          }}
        />
      )}
      {!waiting && !failure && !current && (
        <p className='rounded-xl border border-gray-200 bg-white p-4 text-center text-sm text-gray-500'>
          No bush register found
        </p>
      )}

      {/* ================= Bush Register ================= */}
      <div className='space-y-6'>
        {/* Top Section */}
        <div className='grid grid-cols-12 gap-2'>
          {/* ================= Bush Register information ================= */}

          <div className='col-span-12 xl:col-span-5 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Bush Register Information
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-2 p-2'>
                {/* ================= Row - 1 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Estate */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("estate", {
                        required: "Estate is required",
                        onChange: () => { setValue("division", ""); setValue("section", ""); setValue("fieldBlock", ""); },
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Estate</option>
                      {(estateOptions.data ?? []).map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
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
                        onChange: () => { setValue("section", ""); setValue("fieldBlock", ""); },
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Division</option>
                      {(divisionOptions.data ?? []).map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
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
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Section <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("section", {
                        required: "Section is required",
                        onChange: () => { setValue("fieldBlock", ""); },
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>
                      {!divisionId
                        ? "Select Division first"
                        : sectionOptions.data?.length === 0
                          ? "No sections in this division"
                          : "Select Section"}
                    </option>
                      {(sectionOptions.data ?? []).map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
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

                {/* ================= Row - 2 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Field / Block */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Field / Block <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("fieldBlock", {
                        required: "Field / Block is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>
                      {!sectionId
                        ? "Select Section first"
                        : fieldOptions.data?.length === 0
                          ? "No fields in this section"
                          : "Select Field / Block"}
                    </option>
                      {(fieldOptions.data ?? []).map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>

                    {errors.fieldBlock && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.fieldBlock.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Year */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Planting Year <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("plantingYear", {
                        required: "Planting Year is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Year</option>
                      <option value='2026'>2026</option>
                      <option value='2025'>2025</option>
                      <option value='2024'>2024</option>
                      <option value='2023'>2023</option>
                      <option value='2022'>2022</option>
                      <option value='2021'>2021</option>
                      <option value='2020'>2020</option>
                    </Select>

                    {errors.plantingYear && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.plantingYear.message}
                      </p>
                    )}
                  </div>

                  {/* Bush Age */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Bush Age (Years) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      placeholder='Enter Bush Age'
                      {...register("bushAge", {
                        required: "Bush Age is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.bushAge && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.bushAge.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= Row - 3 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Total Area */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Total Area (Acre) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Total Area'
                      {...register("totalArea", {
                        required: "Total Area is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.totalArea && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.totalArea.message}
                      </p>
                    )}
                  </div>

                  {/* Row Spacing */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Row Spacing (Feet) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Row Spacing'
                      {...register("rowSpacing", {
                        required: "Row Spacing is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.rowSpacing && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.rowSpacing.message}
                      </p>
                    )}
                  </div>

                  {/* Plant Spacing */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Plant Spacing (Feet){" "}
                      <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Plant Spacing'
                      {...register("plantSpacing", {
                        required: "Plant Spacing is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.plantSpacing && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.plantSpacing.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= Row - 4 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Survey Date */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Survey Date <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='date'
                      {...register("surveyDate", {
                        required: "Survey Date is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.surveyDate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.surveyDate.message}
                      </p>
                    )}
                  </div>

                  {/* Surveyor / In-charge */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Surveyor / In-charge{" "}
                      <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("surveyor", {
                        required: "Surveyor is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Surveyor</option>
                      <option value='md-faruk-hossain'>
                        Md. Faruk Hossain
                      </option>
                      <option value='abdul-karim'>Abdul Karim</option>
                      <option value='rahim-uddin'>Rahim Uddin</option>
                      <option value='jahangir-alam'>Jahangir Alam</option>
                      <option value='kamal-hossain'>Kamal Hossain</option>
                    </Select>

                    {errors.surveyor && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.surveyor.message}
                      </p>
                    )}
                  </div>

                  {/* Bush Status */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Bush Status <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("bushStatus", {
                        required: "Bush Status is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Status</option>
                      <option value='active'>Active</option>
                      <option value='productive'>Productive</option>
                      <option value='under-maintenance'>
                        Under Maintenance
                      </option>
                      <option value='replant-required'>Replant Required</option>
                      <option value='inactive'>Inactive</option>
                    </Select>

                    {errors.bushStatus && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.bushStatus.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= Row - 5 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Bush Health */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Bush Health <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("bushHealth", {
                        required: "Bush Health is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Health</option>
                      <option value='excellent'>Excellent</option>
                      <option value='good'>Good</option>
                      <option value='fair'>Fair</option>
                      <option value='poor'>Poor</option>
                      <option value='dead'>Dead</option>
                    </Select>

                    {errors.bushHealth && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.bushHealth.message}
                      </p>
                    )}
                  </div>

                  {/* Production Zone */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Production Zone <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("productionZone", {
                        required: "Production Zone is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Zone</option>
                      <option value='zone-a'>Zone A</option>
                      <option value='zone-b'>Zone B</option>
                      <option value='zone-c'>Zone C</option>
                      <option value='zone-d'>Zone D</option>
                    </Select>

                    {errors.productionZone && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.productionZone.message}
                      </p>
                    )}
                  </div>

                  {/* Row Direction */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Row Direction <span className='text-red-500'>*</span>
                    </label>

                    <Select
                      {...register("rowDirection", {
                        required: "Row Direction is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Direction</option>
                      <option value='north-south'>North → South</option>
                      <option value='south-north'>South → North</option>
                      <option value='east-west'>East → West</option>
                      <option value='west-east'>West → East</option>
                    </Select>

                    {errors.rowDirection && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.rowDirection.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= Action Buttons ================= */}
                <div className='flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end'>
                  {/* Reset Button */}
                  <button
                    type='button'
                    onClick={clearSearch}
                    className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 sm:w-auto'
                  >
                    <RotateCcw size={18} />
                    Reset
                  </button>

                  {/* Search Button */}
                  <button
                    type='submit'
                    className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-green-700 sm:w-auto'
                  >
                    <Search size={18} />
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Middle */}
          <div className='col-span-12 flex flex-col xl:col-span-4 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Bush Register Summary
              </h2>
            </div>

            {/* Body */}
            <div className='grid flex-1 auto-rows-fr grid-cols-2 gap-2 p-2 xl:grid-cols-3'>
              {summaryItems.map((item) => {
                const Icon = summaryIconMap[item.icon];

                return (
                  <div key={item.id} className='mb-4 flex items-center gap-2 xl:mb-0'>
                    <div className='rounded-lg bg-green-50 p-2'>
                      <Icon size={22} className='text-green-700' />
                    </div>

                    <div>
                      <p className='text-[11px] text-gray-500'>{item.title}</p>

                      <h4 className='mt-1 text-sm font-semibold text-green-700'>
                        {item.value}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div className='col-span-12 flex flex-col md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-sm font-semibold text-green-700'>
                Field Map / Bush Density View
              </h2>
            </div>

            {/* Body */}
            <div className='flex flex-1 flex-col gap-3 p-4'>
              {/* Map: takes the spare height so the card is filled to the bottom */}
              <div className='relative min-h-[260px] flex-1 overflow-hidden rounded-lg border border-gray-200'>
                {/* Map Controls */}
                <div className='absolute left-3 top-3 z-10 flex flex-col gap-2'>
                  <button className='flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-white shadow transition hover:bg-gray-100'>
                    <Plus size={18} />
                  </button>

                  <button className='flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-white shadow transition hover:bg-gray-100'>
                    <Minus size={18} />
                  </button>

                  <button className='flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-white shadow transition hover:bg-gray-100'>
                    <Layers size={18} />
                  </button>

                  <button className='flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-white shadow transition hover:bg-gray-100'>
                    <Expand size={18} />
                  </button>
                </div>

                {/* Image */}
                <img
                  src='/bush-register-map.webp'
                  alt='Bush Density Map'
                  className='absolute inset-0 h-full w-full object-cover'
                />
              </div>

              {/* Legend */}
              <div className='flex flex-wrap items-center justify-center gap-3'>
                {bushRegisterData.map.legends.map((item) => (
                  <div key={item.id} className='flex items-center gap-1'>
                    <span
                      className='h-3 w-3 rounded-sm'
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span className='text-[11px] text-gray-600'>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className='flex items-center justify-between border-t border-gray-200 pt-3'>
                <div className='text-xs text-gray-600'>
                  Latitude : {mapLatitude}
                  <br />
                  Longitude : {mapLongitude}
                </div>

                <button className='cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-xs transition hover:bg-gray-100'>
                  View Full Screen
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Table */}
          <div className='col-span-12 xl:col-span-9 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3'>
              <h2 className='text-base font-semibold text-green-700'>
                Bush Register Details
              </h2>

              <div className='flex flex-wrap gap-2'>
                {/* Import Survey Data */}
                <input ref={importInput} type='file' accept='.csv,text/csv' className='hidden' onChange={importSurvey} />
                <button
                  type='button'
                  disabled={importing || Boolean(pendingRequest)}
                  onClick={() => importInput.current?.click()}
                  title={`CSV columns: ${IMPORT_HINT}`}
                  className='flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-60'
                >
                  <Upload size={18} />
                  {importing ? "Importing..." : "Import Survey Data"}
                </button>

                {/* Add Manual Entry */}
                <button
                  type='button'
                  onClick={openAdd}
                  disabled={Boolean(pendingRequest)}
                  className='flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <Plus size={18} />
                  Add Manual Entry
                </button>

                {/* Save Changes: one request for every row changed on the page */}
                <button
                  type='button'
                  onClick={saveChanges}
                  disabled={saving || changesCount === 0 || Boolean(pendingRequest)}
                  title={pendingRequest ? `Waiting for approval (${pendingRequest.requestNo})` : undefined}
                  className='flex cursor-pointer items-center gap-2 rounded-lg bg-green-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  <Save size={18} />
                  {saving ? "Saving..." : `Save Changes${changesCount ? ` (${changesCount})` : ""}`}
                </button>
              </div>
            </div>

            {importProblems.length > 0 && (
              <div className='border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                <div className='flex items-start justify-between gap-3'>
                  <p className='font-medium'>These rows have a problem:</p>
                  <button type='button' onClick={() => setImportProblems([])} aria-label='Dismiss' className='rounded p-0.5 hover:bg-red-100'>
                    <X size={16} />
                  </button>
                </div>
                <ul className='mt-1 max-h-32 list-disc space-y-0.5 overflow-y-auto pl-5 text-xs'>
                  {importProblems.map((problem) => (
                    <li key={problem}>{problem}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='table table-zebra'>
                <thead className='bg-gray-50'>
                  <tr>
                    {bushRegisterData.tableHeaders.map((header) => (
                      <th
                        key={header.key}
                        className='border border-gray-200 px-3 py-2 text-center text-xs font-semibold whitespace-nowrap'
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {waiting || (current && rowsCall.loading && !rowsCall.data && !onNewPage) ? (
                    <TableSkeleton rows={5} columns={bushRegisterData.tableHeaders.length} />
                  ) : rows.length === 0 ? (
                    <EmptyRow columns={bushRegisterData.tableHeaders.length} />
                  ) : null}
                  {rows.map((item, index) => (
                    <tr key={item.id} className={rowProblems[item.id] ? "bg-red-50" : item.removed ? "bg-gray-50 text-gray-400 line-through" : "hover:bg-gray-50"}>
                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {(page - 1) * PER_PAGE + index + 1}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.rowNo}
                        {item.mark && <span className={`ml-1 inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold no-underline ${MARK_CLASS[item.mark]}`}>{item.mark}</span>}
                        {rowProblems[item.id] && <p className='text-xs font-medium text-red-600 no-underline'>{rowProblems[item.id]}</p>}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.from}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.to}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {num(item.totalBush)}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {num(item.productive)}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.dead}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.missing}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.gap}%
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {fixed(item.height, 1)}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {fixed(item.spread, 1)}
                      </td>

                      {/* Health */}
                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            healthBadgeMap[item.health]
                          }`}
                        >
                          {item.health}
                        </span>
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {orDash(item.remarks)}
                      </td>

                      {/* Action */}
                      <td className='border border-gray-200 px-3 py-2'>
                        <PendingBadge row={item} />
                        <div className='flex items-center justify-center gap-2'>
                          {/* View */}
                          <button
                            type='button'
                            onClick={() => openRow("view", item)}
                            className='cursor-pointer rounded-md p-1 text-blue-600 transition hover:bg-blue-50'
                            title='View'
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}
                          {item.removed ? (
                            <button
                              type='button'
                              disabled={rowOff(item)}
                              title='Bring back'
                              onClick={() => restoreRow(item)}
                              className='cursor-pointer rounded-md p-1 text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40'
                            >
                              <RotateCcw size={16} />
                            </button>
                          ) : (
                            <>
                              <button
                                type='button'
                                disabled={rowOff(item)}
                                title={rowTitle(item, "Edit")}
                                onClick={() => openRow("edit", item)}
                                className='cursor-pointer rounded-md p-1 text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                              >
                                <Pencil size={16} />
                              </button>

                              {/* Remove */}
                              <button
                                type='button'
                                disabled={rowOff(item)}
                                title={rowTitle(item, "Remove")}
                                onClick={() => setDeleting(item)}
                                className='cursor-pointer rounded-md p-1 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className='bg-gray-50'>
                    <td
                      colSpan={4}
                      className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold text-gray-700'
                    >
                      Total
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {num(tableSummary?.totalBush)}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {num(tableSummary?.productive)}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {num(tableSummary?.dead)}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {num(tableSummary?.missing)}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {fixed(tableSummary?.gap)}%
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {fixed(tableSummary?.height, 1)}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {fixed(tableSummary?.spread, 1)}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center'>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          healthBadgeMap[tableSummary?.health]
                        }`}
                      >
                        {orDash(tableSummary?.health)}
                      </span>
                    </td>

                    <td className='border border-gray-200'></td>

                    <td className='border border-gray-200'></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className='flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 py-3 md:flex-row'>
              {/* Left */}
              <p className='text-sm text-gray-600'>
                Showing{" "}
                <span className='font-medium'>
                  {rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0}
                </span>{" "}
                to{" "}
                <span className='font-medium'>
                  {(page - 1) * PER_PAGE + rows.length}
                </span>{" "}
                of{" "}
                <span className='font-medium'>
                  {rowMeta.total.toLocaleString()}
                </span>{" "}
                rows
              </p>

              {/* Right */}
              <div className='flex items-center gap-2'>
                {/* Previous */}
                <button
                  type='button'
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100 disabled:opacity-50'
                >
                  ❮
                </button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(rowMeta.totalPages, 3) }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    type='button'
                    onClick={() => setPage(number)}
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition ${
                      number === page
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {number}
                  </button>
                ))}
                {rowMeta.totalPages > 3 && (
                  <>
                    {/* Dots */}
                    <span className='px-1 text-gray-500'>...</span>
                    {/* Last Page */}
                    <button
                      type='button'
                      onClick={() => setPage(rowMeta.totalPages)}
                      className='flex h-9 min-w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-2 text-sm transition hover:bg-gray-100'
                    >
                      {rowMeta.totalPages}
                    </button>
                  </>
                )}

                {/* Next */}
                <button
                  type='button'
                  disabled={page >= rowMeta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100 disabled:opacity-50'
                >
                  ❯
                </button>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className='col-span-12 xl:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-base font-semibold text-green-700'>
                Bush Age Profile (By Acre)
              </h2>
            </div>

            {/* Body */}
            <div className='flex flex-col items-center gap-4 p-4'>
              {/* Donut */}
              <div className='relative h-44 w-44 shrink-0'>
                {hasAgeData ? (
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={ageProfileData}
                        dataKey='value'
                        nameKey='name'
                        innerRadius='66%'
                        outerRadius='95%'
                        paddingAngle={1}
                        startAngle={90}
                        endAngle={-270}
                        stroke='none'
                      >
                        {ageProfileData.map((item) => (
                          <Cell key={item.name} fill={item.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${Number(value).toLocaleString()} Acre`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className='h-full w-full rounded-full border-[14px] border-gray-100' />
                )}

                {/* Center Text */}
                <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
                  <h2 className='max-w-[6.5rem] truncate text-lg font-semibold tabular-nums text-gray-800 sm:text-xl'>{summaryItems[0].value}</h2>
                  <p className='text-sm text-gray-500'>Acre</p>
                  {!hasAgeData && <p className='text-xs text-gray-400'>No data</p>}
                </div>
              </div>

              {/* Legend */}
              <div className='w-full space-y-3'>
                {bushAgeProfile.map((item) => (
                  <div key={item.id} className='flex items-center justify-between gap-3'>
                    <div className='flex min-w-0 items-center gap-2'>
                      <span className='h-3 w-3 shrink-0 rounded-sm' style={{ backgroundColor: item.color }} />
                      <span className='min-w-0 text-sm text-gray-600'>{item.age}</span>
                    </div>

                    <span className='shrink-0 whitespace-nowrap text-right text-sm font-medium tabular-nums text-gray-700'>
                      {item.area} Acre ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Gap Summary */}
          <div className='col-span-12 xl:col-span-3 rounded-xl border border-gray-200 bg-white p-1'>
            <div className='col-span-4 rounded-xl '>
              <div className='border-b px-2 py-3'>
                <h2 className='text-sm font-semibold text-green-700'>
                  Gap Summary & Recommendation
                </h2>
              </div>

              <div className='grid grid-cols-2 gap-1 p-2'>
                {gapSummaryItems.map((item) => {
                  const Icon = gapSummaryIconMap[item.key];

                  return (
                    <div
                      key={item.key}
                      className='flex items-center gap-3 rounded-lg border border-gray-200 p-3'
                    >
                      <div className='rounded-lg bg-green-100 p-2'>
                        <Icon size={18} className='text-green-700' />
                      </div>

                      <div>
                        <p className='text-xs text-gray-500'>{item.title}</p>

                        <h4 className='text-sm font-semibold'>{item.value}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Gap Size Wise Details */}
          <div className='col-span-12 xl:col-span-4 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-sm font-semibold text-green-700'>
                Gap Size Wise Details
              </h2>
            </div>

            {/* Table */}
            <div className='overflow-x-auto p-3'>
              <table className='w-full border-collapse text-xs'>
                <thead>
                  <tr className='bg-gray-50'>
                    <th className='border border-gray-200 px-2 py-2 text-left font-semibold'>
                      Gap Size
                    </th>

                    <th className='border border-gray-200 px-2 py-2 text-center font-semibold'>
                      No. of Gaps
                    </th>

                    <th className='border border-gray-200 px-2 py-2 text-center font-semibold'>
                      Total Gaps (%)
                    </th>

                    <th className='border border-gray-200 px-2 py-2 text-center font-semibold whitespace-nowrap'>
                      Replanting Required (Bush)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {gapSizeDetails.map((item) => (
                    <tr key={item.id} className='hover:bg-gray-50'>
                      <td className='border border-gray-200 px-2 py-2'>
                        {item.size}
                      </td>

                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {item.count.toLocaleString()}
                      </td>

                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {item.percentage.toFixed(2)}%
                      </td>

                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {item.replant.toLocaleString()}
                      </td>
                    </tr>
                  ))}

                  {/* Total */}
                  <tr className='bg-gray-50 font-semibold'>
                    <td className='border border-gray-200 px-2 py-2'>Total</td>

                    <td className='border border-gray-200 px-2 py-2 text-center'>
                      {totalGapCount.toLocaleString()}
                    </td>

                    <td className='border border-gray-200 px-2 py-2 text-center'>
                      {totalGapPercentage.toFixed(2)}%
                    </td>

                    <td className='border border-gray-200 px-2 py-2 text-center'>
                      {totalReplant.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bush Health Distribution */}
          <div className='col-span-12 xl:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-sm font-semibold text-green-700'>
                Bush Health Distribution
              </h2>
            </div>

            {/* Body */}
            <div className='space-y-4 p-4'>
              {healthDistribution.map((item) => (
                <div
                  key={item.id}
                  className='grid grid-cols-12 items-center gap-2'
                >
                  {/* Health Name */}
                  <div className='col-span-3'>
                    <span className='text-xs text-gray-600'>{item.name}</span>
                  </div>

                  {/* Progress */}
                  <div className='col-span-7'>
                    <div className='h-2 w-full overflow-hidden rounded-full bg-gray-200'>
                      <div
                        className='h-full rounded-full'
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Percentage */}
                  <div className='col-span-2 text-right'>
                    <span className='text-xs font-medium text-gray-700'>
                      {item.percentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className='grid grid-cols-12 items-center border-t border-gray-200 pt-3'>
                <div className='col-span-3'>
                  <span className='text-sm font-semibold'>Total</span>
                </div>

                <div className='col-span-7'></div>

                <div className='col-span-2 text-right'>
                  <span className='text-sm font-semibold'>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className='col-span-12 xl:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-sm font-semibold text-green-700'>
                Quick Actions
              </h2>
            </div>

            {/* Body */}
            <div className='space-y-2 p-3'>
              {bushRegisterData.quickActions.map((item) => {
                const Icon = quickActionIconMap[item.value];

                return (
                  <button
                    key={item.id}
                    type='button'
                    className='flex w-full cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left transition-all duration-200 hover:border-green-300 hover:bg-green-50'
                  >
                    <div className='rounded-md bg-green-100 p-1.5'>
                      <Icon size={16} className='text-green-700' />
                    </div>

                    <span className='text-xs font-medium text-gray-700'>
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
          <div className='flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:justify-end'>
            {/* Cancel */}
            <button
              type='button'
              className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto'
            >
              <X size={18} />
              Cancel
            </button>

            {/* Save as Draft */}
            <button
              type='button'
              className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 sm:w-auto'
            >
              <Save size={18} />
              Save as Draft
            </button>

            {/* Submit for Approval */}
            <button
              type='button'
              className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto'
            >
              <Send size={18} />
              Submit for Approval
            </button>

            {/* Save & Print */}
            <button
              type='button'
              disabled
              title='Save & Print is on hold until it is decided'
              className='flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition disabled:opacity-60 sm:w-auto'
            >
              <Printer size={18} />
              Save & Print
            </button>
          </div>
        </div>
      </div>
      {rowPopup && (
        <div className='fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-3' onMouseDown={closeRow}>
          <form
            role='dialog'
            aria-modal='true'
            aria-label={rowPopup.mode === "view" ? "Bush row details" : rowPopup.mode === "add" ? "Add bush row" : "Edit bush row"}
            onSubmit={saveRow}
            onMouseDown={(event) => event.stopPropagation()}
            className='flex max-h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl'
          >
            <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
              <h2 className='text-base font-semibold text-green-700'>
                {rowPopup.mode === "view" ? "Bush Row Details" : rowPopup.mode === "add" ? "Add Manual Entry" : "Edit Bush Row"}
              </h2>
              <button type='button' onClick={closeRow} aria-label='Close' className='rounded p-1 text-gray-500 hover:bg-gray-100'>
                <X size={18} />
              </button>
            </div>
            <div className='grid grid-cols-1 gap-x-6 gap-y-3 overflow-y-auto p-5 sm:grid-cols-2 lg:grid-cols-3'>
              {ROW_FIELDS.map(([name, label, type]) => (
                <div key={name}>
                  <label htmlFor={`row-${name}`} className='text-xs text-gray-500'>
                    {label}
                  </label>
                  {rowPopup.mode !== "view" ? (
                    <>
                      {type === "select" ? (
                        <Select
                          id={`row-${name}`}
                          value={rowValues[name] ?? ""}
                          onChange={(event) => setRowValues((values) => ({ ...values, [name]: event.target.value }))}
                          className='mt-1 h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                        >
                          <option value=''>Select</option>
                          {HEALTH.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      ) : (
                        <input
                          id={`row-${name}`}
                          type={type}
                          step='any'
                          min={type === "number" ? 0 : undefined}
                          value={rowValues[name] ?? ""}
                          onChange={(event) => setRowValues((values) => ({ ...values, [name]: event.target.value }))}
                          className='mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                        />
                      )}
                      {rowErrors[name] && <p className='mt-1 text-xs text-red-600'>{rowErrors[name]}</p>}
                    </>
                  ) : (
                    <p className='text-sm font-medium text-gray-800'>{orDash(rowValues[name])}</p>
                  )}
                </div>
              ))}
              <div>
                <span className='text-xs text-gray-500'>Gap %</span>
                <p className='text-sm font-medium text-gray-800'>{fixed(gapOf(rowValues))}%</p>
              </div>
            </div>
            <div className='flex justify-end gap-2 border-t border-gray-200 px-5 py-3'>
              <button type='button' onClick={closeRow} className='h-10 rounded-lg border border-gray-300 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50'>
                {rowPopup.mode === "view" ? "Close" : "Cancel"}
              </button>
              {rowPopup.mode !== "view" && (
                <button type='submit' className='h-10 rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800'>
                  {rowPopup.mode === "add" ? "Add Row" : "Update"}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
      <ConfirmDialog
        open={Boolean(deleting)}
        title='Remove row?'
        confirmLabel='Remove'
        message={`${deleting?.rowNo ?? ""} will be removed from this register when you press Save Changes.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
      <ConfirmDialog
        open={blocker.state === "blocked" || Boolean(askLeave)}
        title='Leave without saving?'
        message='Some rows on this page are not saved yet. If you leave, they are lost.'
        confirmLabel='Leave'
        onConfirm={() => {
          if (askLeave) {
            const action = askLeave;
            setAskLeave(null);
            action();
          } else blocker.proceed();
        }}
        onCancel={() => (askLeave ? setAskLeave(null) : blocker.reset())}
      />
    </div>
  );
};
export default BushRegister;
