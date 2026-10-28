export const mapAndGISTrackingData = {
  // =========================
  // Dropdown Data
  // =========================

  fieldTypes: [
    "All Type",
    "Tea Field",
    "Nursery",
    "Extension",
    "Infrastructure",
    "Drain",
    "Water Body",
  ],

  statuses: ["All Status", "Active", "Inactive", "Under Development"],

  // =========================
  // Filter Form
  // =========================

  filters: {
    estate: "Jamuna Tea Estate",
    division: "Rangpur Division (DIV-01)",
    section: "All Section",
    fieldType: "All Type",
    status: "All Status",
  },

  // =========================
  // Layer Control
  // =========================

  layerControls: [
    {
      id: 1,
      key: "fieldBoundary",
      label: "Field / Block Boundary",
      checked: true,
      color: "#16a34a",
    },

    {
      id: 2,
      key: "road",
      label: "Road",
      checked: true,
      color: "#ef4444",
    },

    {
      id: 3,
      key: "drain",
      label: "Drain / Canal",
      checked: true,
      color: "#2563eb",
    },

    {
      id: 4,
      key: "waterBody",
      label: "Water Body",
      checked: true,
      color: "#38bdf8",
    },

    {
      id: 5,
      key: "building",
      label: "Building / Infrastructure",
      checked: true,
      color: "#a855f7",
    },

    {
      id: 6,
      key: "sectionBoundary",
      label: "Section Boundary",
      checked: true,
      color: "#facc15",
    },
  ],

  // =========================
  // Map Toolbar
  // =========================

  mapTools: [
    {
      id: 1,
      name: "Zoom In",
      action: "zoomIn",
      icon: "Plus",
    },

    {
      id: 2,
      name: "Zoom Out",
      action: "zoomOut",
      icon: "Minus",
    },

    {
      id: 3,
      name: "Fullscreen",
      action: "fullscreen",
      icon: "Expand",
    },

    {
      id: 4,
      name: "Layers",
      action: "layers",
      icon: "Layers3",
    },

    {
      id: 5,
      name: "Print",
      action: "print",
      icon: "Printer",
    },
  ],

  // =========================
  // Map Legend
  // =========================

  legends: [
    {
      id: 1,
      label: "Field / Block",
      color: "#16a34a",
    },

    {
      id: 2,
      label: "Road",
      color: "#ef4444",
    },

    {
      id: 3,
      label: "Drain / Canal",
      color: "#2563eb",
    },

    {
      id: 4,
      label: "Water Body",
      color: "#38bdf8",
    },

    {
      id: 5,
      label: "Building",
      color: "#a855f7",
    },

    {
      id: 6,
      label: "Section Boundary",
      color: "#facc15",
    },
  ],

  // =========================
  // Header Buttons
  // =========================

  actionButtons: [
    {
      id: 1,
      label: "Export",
      icon: "Download",
      color: "secondary",
    },

    {
      id: 2,
      label: "Add Field / Block",
      icon: "Plus",
      color: "primary",
    },
  ],
  // =========================
  // Estate GIS Statistics
  // =========================

  // =========================
  // Summary Cards
  // =========================

  // =========================
  // Quick Summary
  // =========================

  quickSummary: [
    {
      id: 1,
      title: "Total Area (Acre)",
      value: "5250.00",
    },

    {
      id: 2,
      title: "Tea Area (Acre)",
      value: "4120.00",
    },

    {
      id: 3,
      title: "Total Field / Block",
      value: "48",
    },

    {
      id: 4,
      title: "Active Field / Block",
      value: "42",
    },
  ],

  // =========================
  // Map Information
  // =========================

  // =========================
  // Map Footer
  // =========================

  // =========================
  // GIS Information
  // =========================

  gisInformation: [
    {
      label: "Projection",
      value: "WGS84",
    },

    {
      label: "Coordinate System",
      value: "EPSG:4326",
    },

    {
      label: "Last Survey",
      value: "May 2026",
    },

    {
      label: "Survey Team",
      value: "Tea Garden GIS Team",
    },

    {
      label: "Data Source",
      value: "Drone + GPS Survey",
    },

    {
      label: "Accuracy",
      value: "±0.5 Meter",
    },
  ],
  // =========================
  // Search & Filter
  // =========================

  filtersConfig: {
    searchPlaceholder: "Search by Field Name / Block Code...",
    defaultFieldType: "All Type",
    defaultStatus: "All Status",
  },

  // =========================
  // Table Headers
  // =========================

  tableHeaders: [
    "SL",
    "Field / Block",
    "Code",
    "Division",
    "Section",
    "Type",
    "Area (Acre)",
    "Tea Area",
    "Latitude",
    "Longitude",
    "Status",
    "Action",
  ],

  // =========================
  // Field / Block List
  // =========================

  // =========================
  // Pagination
  // =========================

  // =========================
  // Map Markers
  // =========================

  // =========================
  // Estate Boundary
  // =========================

  // =========================
  // Section Boundaries
  // =========================

  // =========================
  // Field Polygons
  // =========================

  // =========================
  // Roads
  // =========================

  // =========================
  // Drains
  // =========================

  // =========================
  // Water Bodies
  // =========================

  // =========================
  // Buildings
  // =========================

  // =========================
  // Map Settings
  // =========================

  mapSettings: {
    defaultZoom: 15,
    minZoom: 12,
    maxZoom: 20,
    center: [25.7467, 89.2712],
    tileProvider: "OpenStreetMap",
  },
};
