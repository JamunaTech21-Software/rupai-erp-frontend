export const fieldAndBlockManagementData = {
  // =========================
  // Dropdown Data
  // =========================
  estates: [
    "Jamuna Tea Estate",
    "Rangpur Tea Estate",
    "Green Valley Tea Estate",
    "Sylhet Tea Estate",
    "Sunrise Tea Estate",
  ],

  divisions: [
    {
      id: 1,
      name: "Rangpur Division",
      code: "DIV-01",
    },
    {
      id: 2,
      name: "North Division",
      code: "DIV-02",
    },
    {
      id: 3,
      name: "South Division",
      code: "DIV-03",
    },
  ],

  sections: [
    {
      id: 1,
      divisionId: 1,
      name: "Section A",
      code: "SEC-A",
    },
    {
      id: 2,
      divisionId: 1,
      name: "Section B",
      code: "SEC-B",
    },
    {
      id: 3,
      divisionId: 2,
      name: "Section C",
      code: "SEC-C",
    },
    {
      id: 4,
      divisionId: 3,
      name: "Section D",
      code: "SEC-D",
    },
  ],

  fieldTypes: [
    "Tea Field",
    "Nursery",
    "Extension",
    "Infrastructure",
    "Drain",
    "Road Reserve",
  ],

  statuses: ["Active", "Inactive"],

  parentFields: ["None", "Block 01", "Block 02", "Block 03", "Block 04"],

  bushTypes: ["TV-1", "TV-18", "BT-2", "Clone 6", "Seedling"],

  irrigationSources: ["Natural Rain", "Tube Well", "River", "Canal"],

  soilTypes: ["Loamy", "Clay", "Sandy", "Mixed"],

  drainage: ["Good", "Average", "Poor"],

  managers: ["Md. Faruk Hossain", "Rashed Khan", "Arif Islam", "Saiful Alam"],

  // =========================
  // Filter
  // =========================

  filters: {
    searchPlaceholder: "Search field / block...",
    fieldType: "All Field Type",
    status: "All Status",
  },

  // =========================
  // Table Headers
  // =========================

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

  // =========================
  // Field List
  // =========================

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

  // =========================
  // Details
  // =========================

  details: {
    estate: "Jamuna Tea Estate",
    division: "Rangpur Division (DIV-01)",
    section: "Section A (SEC-A)",
    fieldName: "Block 01",
    fieldCode: "BLK-01",
    fieldType: "Tea Field",
    totalArea: "25.50 Acre",
    plantedArea: "23.75 Acre",
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
    createdOn: "25 May 2026",
  },
  detailsLeft: [
    { label: "Estate", key: "estate" },
    { label: "Division", key: "division" },
    { label: "Section", key: "section" },
    { label: "Field / Block Name", key: "fieldName" },
    { label: "Field Code", key: "fieldCode" },
    { label: "Field Type", key: "fieldType" },
    { label: "Total Area", key: "totalArea" },
    { label: "Planted Area", key: "plantedArea" },
    { label: "Year of Planting", key: "yearOfPlanting" },
    { label: "Bush Type / Clone", key: "bushType" },
  ],

  detailsRight: [
    { label: "Spacing", key: "spacing" },
    { label: "Altitude", key: "altitude" },
    { label: "Average Slope", key: "averageSlope" },
    { label: "Irrigation Source", key: "irrigation" },
    { label: "Soil Type", key: "soilType" },
    { label: "Drainage", key: "drainage" },
    { label: "Status", key: "status" },
    { label: "Created By", key: "createdBy" },
    { label: "Created On", key: "createdOn" },
  ],
  // =========================
  // Map
  // =========================

  map: {
    latitude: "25.7467",
    longitude: "89.2712",
    perimeter: "2.15 Km",
    totalArea: "25.50 Acre",
    zoom: 16,
    polygon: [
      [25.7468, 89.2708],
      [25.7475, 89.272],
      [25.7466, 89.273],
      [25.7457, 89.2724],
      [25.7459, 89.271],
    ],
  },

  // =========================
  // Summary
  // =========================

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
