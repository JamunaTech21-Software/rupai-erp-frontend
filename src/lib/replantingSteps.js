// What each Replanting & Gap Filling step (2-8) saves: its own fields, and the columns of its table.
// `suggest` lists are only suggestions (the server accepts any text); `computed` columns are shown, not typed.
const VARIETIES = ["TV-1", "TV-23", "BT-5"];
const PROGRESS = ["Pending", "In Progress", "Completed"];

export const STEP_CONFIG = {
  2: {
    title: "Gap Survey Entry",
    fields: [
      { name: "gapSurveyDate", label: "Survey Date", type: "date" },
      { name: "surveyBy", label: "Survey By", type: "text" },
    ],
    rowLabel: "Gap",
    columns: [
      { name: "gapId", label: "Gap ID", type: "text", required: true },
      { name: "gapSize", label: "Gap Size (Acre)", type: "number", required: true },
      { name: "plants", label: "No. of Plants", type: "number", required: true },
      { name: "gapType", label: "Gap Type", type: "combo", required: true, suggest: ["Dead Patch", "Missing Plants", "Weak Plants"] },
      { name: "location", label: "Location", type: "text" },
      { name: "status", label: "Status", type: "combo", suggest: PROGRESS },
    ],
  },
  3: {
    title: "Land Preparation",
    fields: [],
    rowLabel: "Activity",
    columns: [
      { name: "activity", label: "Activity", type: "text", required: true },
      { name: "startDate", label: "Start Date", type: "date", required: true },
      { name: "endDate", label: "End Date", type: "date", required: true },
      { name: "status", label: "Status", type: "combo", required: true, suggest: PROGRESS },
    ],
  },
  4: {
    title: "Material Planning",
    fields: [
      { name: "plantVariety", label: "Plant Variety", type: "combo", suggest: VARIETIES },
      { name: "planningDate", label: "Planning Date", type: "date" },
      { name: "store", label: "Store", type: "combo", suggest: ["Central Store"] },
      { name: "preparedBy", label: "Prepared By", type: "text" },
      { name: "materialRemarks", label: "Remarks", type: "textarea" },
    ],
    rowLabel: "Material",
    columns: [
      { name: "material", label: "Material", type: "text", required: true },
      { name: "unit", label: "Unit", type: "combo", required: true, suggest: ["Piece", "Kg", "Litre", "Bag"] },
      { name: "requiredQty", label: "Required Qty", type: "number", required: true },
      { name: "unitCost", label: "Unit Cost", type: "number", required: true },
      { name: "totalCost", label: "Total Cost", type: "computed", compute: (row) => Number(row.requiredQty || 0) * Number(row.unitCost || 0) },
    ],
  },
  5: {
    title: "Labour Allocation",
    fields: [
      { name: "labourSource", label: "Labour Source", type: "combo", suggest: ["Local", "Contractor"] },
      { name: "wageType", label: "Wage Type", type: "combo", suggest: ["Daily Wage", "Piece Rate"] },
    ],
    rowLabel: "Labour",
    columns: [
      { name: "labourType", label: "Labour Type", type: "combo", required: true, suggest: ["Permanent", "Temporary", "Contract"] },
      { name: "male", label: "Male", type: "number", required: true },
      { name: "female", label: "Female", type: "number", required: true },
      { name: "rate", label: "Rate (BDT)", type: "number", required: true },
      { name: "amount", label: "Amount", type: "computed", compute: (row) => (Number(row.male || 0) + Number(row.female || 0)) * Number(row.rate || 0) },
    ],
  },
  6: {
    title: "Planting Execution",
    fields: [
      { name: "plantingDate", label: "Planting Date", type: "date" },
      { name: "cloneVariety", label: "Clone / Variety", type: "combo", suggest: VARIETIES },
    ],
    rowLabel: "Row",
    columns: [
      { name: "rowNo", label: "Row No.", type: "number", required: true },
      { name: "fromPlant", label: "From Plant No.", type: "number", required: true },
      { name: "toPlant", label: "To Plant No.", type: "number", required: true },
      { name: "plants", label: "No. of Plants", type: "computed", compute: (row) => (row.fromPlant === "" || row.toPlant === "" ? "" : Number(row.toPlant) - Number(row.fromPlant) + 1) },
      { name: "plantedBy", label: "Planted By", type: "text" },
    ],
  },
  7: {
    title: "Progress Monitoring",
    fields: [{ name: "tillDate", label: "Till Date", type: "date" }],
    rowLabel: "Entry",
    columns: [
      { name: "date", label: "Date", type: "date", required: true },
      { name: "areaCompleted", label: "Area Completed", type: "number", required: true },
      { name: "plantsPlanted", label: "Plants Planted", type: "number", required: true },
      { name: "survival", label: "Survival %", type: "number" },
      { name: "remarks", label: "Remarks", type: "text" },
    ],
  },
  8: {
    title: "Approval & Completion",
    fields: [
      { name: "completionDate", label: "Completion Date", type: "date" },
      { name: "survival90Days", label: "Survival % (90 Days)", type: "number" },
      { name: "completionRemarks", label: "Remarks", type: "textarea" },
    ],
    rowLabel: "Approval",
    // The signature file is not edited here: it is sent back unchanged.
    keep: ["signature"],
    columns: [
      { name: "level", label: "Level", type: "text", required: true },
      { name: "name", label: "Name", type: "text" },
      { name: "designation", label: "Designation", type: "text" },
      { name: "status", label: "Status", type: "select", required: true, options: ["Approved", "Pending", "Rejected"] },
      { name: "date", label: "Date", type: "date" },
      { name: "remarks", label: "Remarks", type: "text" },
    ],
  },
};

const day = (value) => (typeof value === "string" ? value.slice(0, 10) : "");

// A saved step -> the editor's values (everything is held as text while typing).
export function toEditorState(config, saved) {
  const text = (value, type) => (value === null || value === undefined ? "" : type === "date" ? day(value) : String(value));
  const fields = Object.fromEntries(config.fields.map((f) => [f.name, text(saved?.[f.name], f.type)]));
  const rows = (saved?.rows ?? []).map((row) => ({
    ...Object.fromEntries(config.columns.filter((c) => c.type !== "computed").map((c) => [c.name, text(row[c.name], c.type)])),
    ...Object.fromEntries((config.keep ?? []).map((name) => [name, row[name] ?? null])),
  }));
  return { fields, rows };
}

export const emptyRow = (config) => ({
  ...Object.fromEntries(config.columns.filter((c) => c.type !== "computed").map((c) => [c.name, ""])),
  ...Object.fromEntries((config.keep ?? []).map((name) => [name, null])),
});

// The editor's values -> the request body (numbers as numbers, empty optional values as null).
export function toRequestBody(config, state) {
  const value = (item, raw) => {
    if (item.type === "number") return raw === "" || raw === undefined ? null : Number(raw);
    if (item.type === "date" || item.type === "text" || item.type === "combo" || item.type === "textarea" || item.type === "select") return raw === "" ? (item.required ? "" : null) : String(raw).trim();
    return raw;
  };
  return {
    ...Object.fromEntries(config.fields.map((f) => [f.name, value(f, state.fields[f.name])])),
    rows: state.rows.map((row) => ({
      ...Object.fromEntries(config.columns.filter((c) => c.type !== "computed").map((c) => [c.name, value(c, row[c.name])])),
      ...Object.fromEntries((config.keep ?? []).map((name) => [name, row[name] ?? null])),
    })),
  };
}
