// src/data/EstateManagementData/fieldAndBlockManagementData.js

export const fieldAndBlockManagementData = {
  // =========================================================
  // Dropdown / Master Data
  // =========================================================

  // =========================
  // Field Type Options
  // =========================
  fieldTypes: [
    {
      id: 1,
      value: "tea_field",
      label: "Tea Field",
    },
    {
      id: 2,
      value: "nursery",
      label: "Nursery",
    },
    {
      id: 3,
      value: "shade_area",
      label: "Shade Area",
    },
    {
      id: 4,
      value: "road_side",
      label: "Road Side",
    },
    {
      id: 5,
      value: "water_body",
      label: "Water Body",
    },
    {
      id: 6,
      value: "extension",
      label: "Extension",
    },
    {
      id: 7,
      value: "infrastructure",
      label: "Infrastructure",
    },
    {
      id: 8,
      value: "drain",
      label: "Drain",
    },
    {
      id: 9,
      value: "road_reserve",
      label: "Road Reserve",
    },
  ],

  // =========================
  // Status Options
  // =========================
  statuses: [
    {
      id: 1,
      value: "active",
      label: "Active",
    },
    {
      id: 2,
      value: "inactive",
      label: "Inactive",
    },
    {
      id: 3,
      value: "under_development",
      label: "Under Development",
    },
    {
      id: 4,
      value: "maintenance",
      label: "Maintenance",
    },
  ],

  // =========================
  // Parent Field Options
  // =========================
  parentFields: [
    {
      id: 1,
      value: "",
      label: "None",
    },
  ],

  // =========================
  // Bush / Clone Type Options
  // =========================
  bushTypes: [
    {
      id: 1,
      value: "tv-1",
      label: "TV-1",
    },
    {
      id: 2,
      value: "tv-18",
      label: "TV-18",
    },
    {
      id: 3,
      value: "bt-2",
      label: "BT-2",
    },
    {
      id: 4,
      value: "clone-6",
      label: "Clone 6",
    },
    {
      id: 5,
      value: "seedling",
      label: "Seedling",
    },
  ],

  // =========================
  // Irrigation Source Options
  // =========================
  irrigationSources: [
    {
      id: 1,
      value: "natural_rain",
      label: "Natural Rain",
    },
    {
      id: 2,
      value: "tube_well",
      label: "Tube Well",
    },
    {
      id: 3,
      value: "river",
      label: "River",
    },
    {
      id: 4,
      value: "canal",
      label: "Canal",
    },
  ],

  // =========================
  // Soil Type Options
  // =========================
  soilTypes: [
    {
      id: 1,
      value: "loamy",
      label: "Loamy",
    },
    {
      id: 2,
      value: "clay",
      label: "Clay",
    },
    {
      id: 3,
      value: "sandy",
      label: "Sandy",
    },
    {
      id: 4,
      value: "mixed",
      label: "Mixed",
    },
  ],

  // =========================
  // Drainage Options
  // =========================
  drainage: [
    {
      id: 1,
      value: "good",
      label: "Good",
    },
    {
      id: 2,
      value: "average",
      label: "Average",
    },
    {
      id: 3,
      value: "poor",
      label: "Poor",
    },
  ],

  // =========================
  // Manager Options
  // =========================
  managers: [
    {
      id: 1,
      value: "manager-001",
      label: "Md. Faruk Hossain",
    },
    {
      id: 2,
      value: "manager-002",
      label: "Rashed Khan",
    },
    {
      id: 3,
      value: "manager-003",
      label: "Arif Islam",
    },
    {
      id: 4,
      value: "manager-004",
      label: "Saiful Alam",
    },
  ],

  // =========================================================
  // Filter Configuration
  // =========================================================

  filters: {
    searchPlaceholder: "Search field / block...",
    fieldType: "All Field Type",
    status: "All Status",
  },

  // =========================================================
  // Table Headers
  // =========================================================

  tableHeaders: [
    "SL",
    "Field / Block Name",
    "Code",
    "Field Type",
    "Total Area (Acre)",
    "Planted Area (Acre)",
    "Status",
    "Action",
  ],

  // =========================================================
  // Field / Block List
  // =========================================================
  // Temporary frontend data.
  // Later this will come from backend/API.

  // =========================================================
  // Selected Field / Block Details
  // =========================================================
  // Temporary frontend data.
  // Later this will come from backend/API.

  // =========================================================
  // Details Left Column
  // =========================================================
  // UI configuration only.

  detailsLeft: [
    {
      label: "Estate",
      key: "estate",
    },
    {
      label: "Division",
      key: "division",
    },
    {
      label: "Section",
      key: "section",
    },
    {
      label: "Field / Block Name",
      key: "fieldName",
    },
    {
      label: "Field Code",
      key: "fieldCode",
    },
    {
      label: "Field Type",
      key: "fieldType",
    },
    {
      label: "Total Area",
      key: "totalArea",
    },
    {
      label: "Planted Area",
      key: "plantedArea",
    },
    {
      label: "Year of Planting",
      key: "yearOfPlanting",
    },
    {
      label: "Bush Type / Clone",
      key: "bushType",
    },
  ],

  // =========================================================
  // Details Right Column
  // =========================================================
  // UI configuration only.

  detailsRight: [
    {
      label: "Spacing",
      key: "spacing",
    },
    {
      label: "Altitude",
      key: "altitude",
    },
    {
      label: "Average Slope",
      key: "averageSlope",
    },
    {
      label: "Irrigation Source",
      key: "irrigation",
    },
    {
      label: "Soil Type",
      key: "soilType",
    },
    {
      label: "Drainage",
      key: "drainage",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Created By",
      key: "createdBy",
    },
    {
      label: "Created On",
      key: "createdOn",
    },
  ],

  // =========================================================
  // Map / GIS Data
  // =========================================================
  // Temporary frontend data.
  // Later this will come from backend/API.

  // =========================================================
  // Summary
  // =========================================================
  // Temporary frontend data.
  // Later this will come from backend/API.

};
