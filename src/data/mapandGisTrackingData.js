export const mapAndGISTrackingData = {
  // =========================
  // Dropdown Data
  // =========================

  estates: [
    "Jamuna Tea Estate",
    "Rupai Tea Estate",
    "Karatoa Tea Estate",
    "Green Valley Tea Estate",
    "Surma Tea Estate",
    "Sylhet Tea Estate",
  ],

  divisions: [
    "Rangpur Division (DIV-01)",
    "North Division (DIV-02)",
    "South Division (DIV-03)",
    "East Division (DIV-04)",
    "West Division (DIV-05)",
  ],

  sections: [
    "All Section",
    "Section A",
    "Section B",
    "Section C",
    "Section D",
    "Section E",
    "Section F",
  ],

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

  statistics: {
    totalEstateArea: 5250.0,
    teaArea: 4120.0,
    nonTeaArea: 1130.0,
    totalFieldBlock: 48,
    activeFieldBlock: 42,
    inactiveFieldBlock: 6,
  },

  // =========================
  // Summary Cards
  // =========================

  summaryCards: [
    {
      id: 1,
      title: "Total Estate Area",
      value: "5250.00",
      unit: "Acre",
      icon: "Map",
      color: "green",
    },

    {
      id: 2,
      title: "Tea Area",
      value: "4120.00",
      unit: "Acre",
      icon: "Leaf",
      color: "green",
    },

    {
      id: 3,
      title: "Non Tea Area",
      value: "1130.00",
      unit: "Acre",
      icon: "Trees",
      color: "green",
    },

    {
      id: 4,
      title: "Total Field / Block",
      value: "48",
      unit: "",
      icon: "SquareDashed",
      color: "green",
    },

    {
      id: 5,
      title: "Active Field / Block",
      value: "42",
      unit: "",
      icon: "CheckCircle2",
      color: "green",
    },

    {
      id: 6,
      title: "Inactive Field / Block",
      value: "6",
      unit: "",
      icon: "XCircle",
      color: "red",
    },
  ],

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

  mapInfo: {
    estateName: "Jamuna Tea Estate",

    latitude: 25.7467,

    longitude: 89.2712,

    zoom: 15,

    totalArea: "5250.00 Acre",

    teaArea: "4120.00 Acre",

    nonTeaArea: "1130.00 Acre",

    coordinateSystem: "WGS84",

    lastUpdated: "15 June 2026",

    updatedBy: "Admin",
  },

  // =========================
  // Map Footer
  // =========================

  mapFooter: {
    totalArea: "5250.00 Acre",

    perimeter: "18.45 Km",

    totalFields: 48,

    activeFields: 42,

    inactiveFields: 6,

    coordinates: {
      latitude: 25.7467,
      longitude: 89.2712,
    },
  },

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

  fieldList: [
    {
      id: 1,
      fieldName: "Block A-01",
      code: "BLK-001",
      division: "Rangpur Division",
      section: "Section A",
      fieldType: "Tea Field",
      totalArea: 32.5,
      teaArea: 30.8,
      latitude: 25.74671,
      longitude: 89.27111,
      status: "Active",
    },

    {
      id: 2,
      fieldName: "Block A-02",
      code: "BLK-002",
      division: "Rangpur Division",
      section: "Section A",
      fieldType: "Tea Field",
      totalArea: 28.4,
      teaArea: 27.2,
      latitude: 25.74652,
      longitude: 89.27184,
      status: "Active",
    },

    {
      id: 3,
      fieldName: "Block A-03",
      code: "BLK-003",
      division: "Rangpur Division",
      section: "Section A",
      fieldType: "Nursery",
      totalArea: 12.8,
      teaArea: 10.6,
      latitude: 25.74714,
      longitude: 89.27244,
      status: "Active",
    },

    {
      id: 4,
      fieldName: "Block B-01",
      code: "BLK-004",
      division: "North Division",
      section: "Section B",
      fieldType: "Tea Field",
      totalArea: 36.4,
      teaArea: 35.0,
      latitude: 25.74851,
      longitude: 89.27355,
      status: "Active",
    },

    {
      id: 5,
      fieldName: "Block B-02",
      code: "BLK-005",
      division: "North Division",
      section: "Section B",
      fieldType: "Extension",
      totalArea: 15.0,
      teaArea: 0,
      latitude: 25.74811,
      longitude: 89.2741,
      status: "Inactive",
    },

    {
      id: 6,
      fieldName: "Block C-01",
      code: "BLK-006",
      division: "South Division",
      section: "Section C",
      fieldType: "Tea Field",
      totalArea: 25.6,
      teaArea: 24.2,
      latitude: 25.74482,
      longitude: 89.26951,
      status: "Active",
    },

    {
      id: 7,
      fieldName: "Block C-02",
      code: "BLK-007",
      division: "South Division",
      section: "Section C",
      fieldType: "Drain",
      totalArea: 5.4,
      teaArea: 0,
      latitude: 25.74451,
      longitude: 89.26915,
      status: "Active",
    },

    {
      id: 8,
      fieldName: "Block D-01",
      code: "BLK-008",
      division: "East Division",
      section: "Section D",
      fieldType: "Tea Field",
      totalArea: 40.2,
      teaArea: 39.1,
      latitude: 25.7426,
      longitude: 89.26844,
      status: "Active",
    },

    {
      id: 9,
      fieldName: "Block D-02",
      code: "BLK-009",
      division: "East Division",
      section: "Section D",
      fieldType: "Water Body",
      totalArea: 7.8,
      teaArea: 0,
      latitude: 25.74221,
      longitude: 89.2681,
      status: "Inactive",
    },

    {
      id: 10,
      fieldName: "Block E-01",
      code: "BLK-010",
      division: "West Division",
      section: "Section E",
      fieldType: "Infrastructure",
      totalArea: 10.5,
      teaArea: 0,
      latitude: 25.74142,
      longitude: 89.2672,
      status: "Active",
    },
  ],

  // =========================
  // Pagination
  // =========================

  pagination: {
    currentPage: 1,
    totalPages: 5,
    totalRecords: 50,
    showingFrom: 1,
    showingTo: 10,
    pageSize: 10,
  },
  // =========================
  // Map Markers
  // =========================

  markers: [
    {
      id: 1,
      name: "Estate Office",
      type: "Building",
      latitude: 25.7467,
      longitude: 89.2712,
      icon: "Building2",
    },

    {
      id: 2,
      name: "Factory",
      type: "Factory",
      latitude: 25.7458,
      longitude: 89.2728,
      icon: "Factory",
    },

    {
      id: 3,
      name: "Worker Camp",
      type: "Camp",
      latitude: 25.7446,
      longitude: 89.2706,
      icon: "House",
    },

    {
      id: 4,
      name: "Hospital",
      type: "Hospital",
      latitude: 25.7475,
      longitude: 89.2699,
      icon: "Hospital",
    },

    {
      id: 5,
      name: "Warehouse",
      type: "Warehouse",
      latitude: 25.7483,
      longitude: 89.2731,
      icon: "Warehouse",
    },
  ],

  // =========================
  // Estate Boundary
  // =========================

  estateBoundary: [
    [25.7482, 89.2681],
    [25.7498, 89.2724],
    [25.7479, 89.2763],
    [25.7442, 89.2765],
    [25.7423, 89.2729],
    [25.7434, 89.2686],
    [25.7482, 89.2681],
  ],

  // =========================
  // Section Boundaries
  // =========================

  sectionBoundaries: [
    {
      id: 1,
      name: "Section A",
      color: "#22c55e",

      coordinates: [
        [25.748, 89.2692],
        [25.7488, 89.2714],
        [25.7472, 89.272],
        [25.7464, 89.2696],
      ],
    },

    {
      id: 2,
      name: "Section B",
      color: "#f59e0b",

      coordinates: [
        [25.7463, 89.2721],
        [25.7475, 89.2742],
        [25.7458, 89.2754],
        [25.7448, 89.2731],
      ],
    },
  ],

  // =========================
  // Field Polygons
  // =========================

  fieldPolygons: [
    {
      id: 1,
      code: "BLK-001",
      color: "#16a34a",

      coordinates: [
        [25.7474, 89.2701],
        [25.7478, 89.2709],
        [25.747, 89.2715],
        [25.7465, 89.2706],
      ],
    },

    {
      id: 2,
      code: "BLK-002",
      color: "#16a34a",

      coordinates: [
        [25.7461, 89.2721],
        [25.7468, 89.273],
        [25.7459, 89.2737],
        [25.7452, 89.2727],
      ],
    },
  ],

  // =========================
  // Roads
  // =========================

  roads: [
    {
      id: 1,

      name: "Main Road",

      coordinates: [
        [25.7421, 89.2682],
        [25.7443, 89.2706],
        [25.7466, 89.2728],
        [25.7486, 89.2751],
      ],
    },

    {
      id: 2,

      name: "Internal Road",

      coordinates: [
        [25.7445, 89.2698],
        [25.7458, 89.2713],
        [25.7468, 89.2726],
      ],
    },
  ],

  // =========================
  // Drains
  // =========================

  drains: [
    {
      id: 1,

      name: "Drain 01",

      coordinates: [
        [25.7435, 89.2689],
        [25.7446, 89.2703],
        [25.746, 89.2724],
      ],
    },
  ],

  // =========================
  // Water Bodies
  // =========================

  waterBodies: [
    {
      id: 1,

      name: "Lake",

      coordinates: [
        [25.7448, 89.2738],
        [25.7456, 89.2747],
        [25.7449, 89.2753],
        [25.7441, 89.2745],
      ],
    },
  ],

  // =========================
  // Buildings
  // =========================

  buildings: [
    {
      id: 1,

      name: "Factory",

      latitude: 25.7458,

      longitude: 89.2728,
    },

    {
      id: 2,

      name: "Estate Office",

      latitude: 25.7467,

      longitude: 89.2712,
    },

    {
      id: 3,

      name: "Hospital",

      latitude: 25.7475,

      longitude: 89.2699,
    },
  ],

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
