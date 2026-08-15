// src/data/EstateManagementData/fieldAndBlockManagementData.js

export const fieldAndBlockManagementData = {
  // =========================================================
  // Dropdown / Master Data
  // =========================================================

  // =========================
  // Estate Options
  // =========================
  estates: [
    {
      id: 1,
      value: "jamuna-tea-estate",
      label: "Jamuna Tea Estate",
    },
    {
      id: 2,
      value: "rangpur-tea-estate",
      label: "Rangpur Tea Estate",
    },
    {
      id: 3,
      value: "green-valley-tea-estate",
      label: "Green Valley Tea Estate",
    },
    {
      id: 4,
      value: "sylhet-tea-estate",
      label: "Sylhet Tea Estate",
    },
    {
      id: 5,
      value: "sunrise-tea-estate",
      label: "Sunrise Tea Estate",
    },
  ],

  // =========================
  // Division Options
  // =========================
  divisions: [
    {
      id: 1,
      value: "div-01",
      name: "Rangpur Division",
      code: "DIV-01",
    },
    {
      id: 2,
      value: "div-02",
      name: "North Division",
      code: "DIV-02",
    },
    {
      id: 3,
      value: "div-03",
      name: "South Division",
      code: "DIV-03",
    },
  ],

  // =========================
  // Section Options
  // =========================
  sections: [
    {
      id: 1,
      value: "sec-a",
      divisionId: 1,
      name: "Section A",
      code: "SEC-A",
    },
    {
      id: 2,
      value: "sec-b",
      divisionId: 1,
      name: "Section B",
      code: "SEC-B",
    },
    {
      id: 3,
      value: "sec-c",
      divisionId: 2,
      name: "Section C",
      code: "SEC-C",
    },
    {
      id: 4,
      value: "sec-d",
      divisionId: 3,
      name: "Section D",
      code: "SEC-D",
    },
  ],

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
    {
      id: 2,
      value: "blk-01",
      label: "Block 01",
    },
    {
      id: 3,
      value: "blk-02",
      label: "Block 02",
    },
    {
      id: 4,
      value: "blk-03",
      label: "Block 03",
    },
    {
      id: 5,
      value: "blk-04",
      label: "Block 04",
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

  fieldList: [
    {
      id: 1,
      fieldName: "Block 01",
      code: "BLK-01",
      fieldType: "Tea Field",
      totalArea: 25.5,
      plantedArea: 23.75,
      status: "Active",
    },
    {
      id: 2,
      fieldName: "Block 02",
      code: "BLK-02",
      fieldType: "Tea Field",
      totalArea: 18.3,
      plantedArea: 17.2,
      status: "Active",
    },
    {
      id: 3,
      fieldName: "Block 03",
      code: "BLK-03",
      fieldType: "Tea Field",
      totalArea: 22.75,
      plantedArea: 21.1,
      status: "Active",
    },
    {
      id: 4,
      fieldName: "Block 04",
      code: "BLK-04",
      fieldType: "Tea Field",
      totalArea: 16,
      plantedArea: 15.3,
      status: "Inactive",
    },
    {
      id: 5,
      fieldName: "Nursery Block",
      code: "NUR-01",
      fieldType: "Nursery",
      totalArea: 2.5,
      plantedArea: 2.5,
      status: "Active",
    },
    {
      id: 6,
      fieldName: "Extension Field",
      code: "EXT-01",
      fieldType: "Extension",
      totalArea: 12.4,
      plantedArea: 0,
      status: "Active",
    },
    {
      id: 7,
      fieldName: "Road Reserve",
      code: "RD-01",
      fieldType: "Infrastructure",
      totalArea: 3.2,
      plantedArea: 0,
      status: "Active",
    },
    {
      id: 8,
      fieldName: "Drain Area",
      code: "DR-01",
      fieldType: "Drain",
      totalArea: 1.8,
      plantedArea: 0,
      status: "Active",
    },
  ],

  // =========================================================
  // Selected Field / Block Details
  // =========================================================
  // Temporary frontend data.
  // Later this will come from backend/API.

  details: {
    estate: "Jamuna Tea Estate",
    division: "Rangpur Division",
    section: "Section A",
    fieldName: "Block 01",
    fieldCode: "BLK-01",
    fieldType: "Tea Field",
    totalArea: "25 Acre",
    plantedArea: "23 Acre",
    yearOfPlanting: "2018",
    bushType: "TV-1",
    spacing: "4ft × 2.5ft",
    altitude: "240 ft",
    averageSlope: "5°",
    irrigation: "Natural Rain",
    soilType: "Loamy",
    drainage: "Good",
    status: "Active",
    createdBy: "Md. Faruk Hossain",
    createdOn: "May 2026",
  },

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

  map: {
    latitude: 25.7467,
    longitude: 89.2712,
    perimeter: 2.15,
    totalArea: 25.5,
    zoom: 16,

    polygon: [
      [25.7468, 89.2708],
      [25.7475, 89.272],
      [25.7466, 89.273],
      [25.7457, 89.2724],
      [25.7459, 89.271],
    ],
  },

  // =========================================================
  // Summary
  // =========================================================
  // Temporary frontend data.
  // Later this will come from backend/API.

  summary: {
    totalField: 48,
    teaField: 38,
    nursery: 3,
    extension: 2,
    infrastructure: 3,
    drainArea: 2,
    totalArea: 1256.75,
    plantedArea: 1138.5,
    activeField: 42,
    inactiveField: 6,
  },
};
