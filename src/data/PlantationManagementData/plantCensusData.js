export const fieldMap = {
  // ======================================================
  // Estate Information
  // ======================================================

  estate: {
    id: 1,
    name: "Jamuna Tea Estate",
    code: "JTE-001",
  },

  division: {
    id: 1,
    name: "Rangpur Division",
    code: "DIV-01",
  },

  section: {
    id: 1,
    name: "Section-A",
    code: "SEC-A",
  },

  block: {
    id: 8,
    name: "BLK-08",
    code: "BLK-08",
  },

  // ======================================================
  // GIS Information
  // ======================================================

  gis: {
    latitude: 24.89254,

    longitude: 91.86832,

    elevation: 152,

    area: 25.6,

    perimeter: 2045,

    zoom: 18,

    coordinateSystem: "WGS84",
  },

  // ======================================================
  // Map Center
  // ======================================================

  center: [24.89254, 91.86832],

  // ======================================================
  // Polygon Boundary
  // ======================================================

  polygon: [
    [24.89254, 91.86832],
    [24.89295, 91.86884],
    [24.89238, 91.86925],
    [24.89182, 91.86892],
    [24.89195, 91.86815],
    [24.89254, 91.86832],
  ],

  // ======================================================
  // Roads
  // ======================================================

  roads: [
    {
      id: 1,

      name: "Estate Main Road",

      coordinates: [
        [24.8914, 91.8677],
        [24.8932, 91.8694],
      ],
    },
  ],

  // ======================================================
  // Water Body
  // ======================================================

  waterBodies: [
    {
      id: 1,

      name: "Drain-01",

      coordinates: [
        [24.8921, 91.86895],
        [24.89245, 91.86912],
      ],
    },
  ],

  // ======================================================
  // Field Boundary
  // ======================================================

  boundaries: [
    {
      id: 1,

      name: "North Boundary",

      coordinates: [
        [24.89295, 91.86855],
        [24.89282, 91.86918],
      ],
    },
  ],

  // ======================================================
  // Row Labels
  // ======================================================

  rows: [
    {
      id: 1,

      label: "R-01",

      center: [24.89282, 91.86865],
    },
    {
      id: 2,

      label: "R-02",

      center: [24.89274, 91.8687],
    },
    {
      id: 3,

      label: "R-03",

      center: [24.89266, 91.86875],
    },
    {
      id: 4,

      label: "R-04",

      center: [24.89258, 91.8688],
    },
    {
      id: 5,

      label: "R-05",

      center: [24.8925, 91.86885],
    },
    {
      id: 6,

      label: "R-06",

      center: [24.89242, 91.8689],
    },
    {
      id: 7,

      label: "R-07",

      center: [24.89234, 91.86895],
    },
    {
      id: 8,

      label: "R-08",

      center: [24.89226, 91.869],
    },
    {
      id: 9,

      label: "R-09",

      center: [24.89218, 91.86905],
    },
    {
      id: 10,

      label: "R-10",

      center: [24.8921, 91.8691],
    },
    {
      id: 11,

      label: "R-11",

      center: [24.89202, 91.86915],
    },
    {
      id: 12,

      label: "R-12",

      center: [24.89194, 91.8692],
    },
    {
      id: 13,

      label: "R-13",

      center: [24.89186, 91.86925],
    },
    {
      id: 14,

      label: "R-14",

      center: [24.89178, 91.8693],
    },
    {
      id: 15,

      label: "R-15",

      center: [24.8917, 91.86935],
    },
    {
      id: 16,

      label: "R-16",

      center: [24.89162, 91.8694],
    },
    {
      id: 17,

      label: "R-17",

      center: [24.89154, 91.86945],
    },
    {
      id: 18,

      label: "R-18",

      center: [24.89146, 91.8695],
    },
    {
      id: 19,

      label: "R-19",

      center: [24.89138, 91.86955],
    },
    {
      id: 20,

      label: "R-20",

      center: [24.8913, 91.8696],
    },
  ],

  // ======================================================
  // Legend
  // ======================================================

  legends: [
    {
      id: 1,
      title: "Field Boundary",
      color: "#16A34A",
    },
    {
      id: 2,
      title: "Water Body",
      color: "#2563EB",
    },
    {
      id: 3,
      title: "Road",
      color: "#EF4444",
    },
  ],
};
export const censusSummary = [
  {
    id: 1,
    title: "Total Area",
    value: "25.60",
    unit: "Acre",
    icon: "Map",
    color: "green",
  },
  {
    id: 2,
    title: "Total Rows",
    value: "128",
    unit: "Rows",
    icon: "SquareDashed",
    color: "gray",
  },
  {
    id: 3,
    title: "Total Plants (Expected)",
    value: "102,500",
    unit: "Plants",
    icon: "Sprout",
    color: "lime",
  },
  {
    id: 4,
    title: "Live Plants",
    value: "96,780",
    unit: "Plants",
    icon: "Leaf",
    color: "green",
  },
  {
    id: 5,
    title: "Dead Plants",
    value: "5,670",
    unit: "Plants",
    icon: "CircleOff",
    color: "red",
  },
  {
    id: 6,
    title: "Missing Plants",
    value: "50",
    unit: "Plants",
    icon: "AlertTriangle",
    color: "yellow",
  },
  {
    id: 7,
    title: "Avg. Plants / Acre",
    value: "2.53%",
    unit: "",
    icon: "TrendingUp",
    color: "blue",
  },
  {
    id: 8,
    title: "Data Entry Status",
    value: "Completed",
    unit: "",
    icon: "CheckCircle2",
    color: "teal",
  },
];
export const summaryCards = [
  {
    id: 1,
    title: "Total Area (Acre)",
    value: "25.60",
    icon: "TriangleAlert",
    iconColor: "bg-green-100 text-green-600",
  },

  {
    id: 2,
    title: "Total Plants (Expected)",
    value: "102,500",
    icon: "Users",
    iconColor: "bg-green-100 text-green-600",
  },

  {
    id: 3,
    title: "Live Plants",
    value: "96,780",
    badge: "94.42%",
    icon: "Leaf",
    iconColor: "bg-green-100 text-green-600",
    badgeColor: "bg-green-100 text-green-700",
  },

  {
    id: 4,
    title: "Dead Plants",
    value: "5,670",
    badge: "5.53%",
    icon: "ShieldX",
    iconColor: "bg-red-100 text-red-600",
    badgeColor: "bg-red-100 text-red-700",
  },

  {
    id: 5,
    title: "Missing Plants",
    value: "50",
    badge: "0.05%",
    icon: "CircleDot",
    iconColor: "bg-yellow-100 text-yellow-600",
    badgeColor: "bg-yellow-100 text-yellow-700",
  },

  {
    id: 6,
    title: "Avg. Plants / Acre",
    value: "4,002",
    icon: "UsersRound",
    iconColor: "bg-green-100 text-green-600",
  },

  {
    id: 7,
    title: "Plants / Meter (Avg.)",
    value: "2.10",
    icon: "Sprout",
    iconColor: "bg-green-100 text-green-600",
  },
];
export const rowWiseTable = {
  headers: [
    {
      id: 1,
      key: "rowNo",
      label: "Row No",
    },
    {
      id: 2,
      key: "expectedPlants",
      label: "Expected Plants",
    },
    {
      id: 3,
      key: "livePlants",
      label: "Live Plants",
    },
    {
      id: 4,
      key: "deadPlants",
      label: "Dead Plants",
    },
    {
      id: 5,
      key: "missingPlants",
      label: "Missing Plants",
    },
    {
      id: 6,
      key: "diseasePlants",
      label: "Disease Plants",
    },
    {
      id: 7,
      key: "vacantSpots",
      label: "Vacant Spots",
    },
    {
      id: 8,
      key: "survivalRate",
      label: "Survival %",
    },
    {
      id: 9,
      key: "status",
      label: "Status",
    },
    {
      id: 10,
      key: "remarks",
      label: "Remarks",
    },
  ],

  rows: [
    {
      id: 1,
      rowNo: "R-01",
      expectedPlants: 630,
      livePlants: 621,
      deadPlants: 3,
      missingPlants: 4,
      diseasePlants: 2,
      vacantSpots: 4,
      survivalRate: 98.57,
      status: "Healthy",
      remarks: "Good condition",
    },

    {
      id: 2,
      rowNo: "R-02",
      expectedPlants: 628,
      livePlants: 618,
      deadPlants: 4,
      missingPlants: 4,
      diseasePlants: 2,
      vacantSpots: 4,
      survivalRate: 98.41,
      status: "Healthy",
      remarks: "Minor mortality",
    },

    {
      id: 3,
      rowNo: "R-03",
      expectedPlants: 632,
      livePlants: 620,
      deadPlants: 5,
      missingPlants: 5,
      diseasePlants: 2,
      vacantSpots: 5,
      survivalRate: 98.1,
      status: "Healthy",
      remarks: "Needs monitoring",
    },

    {
      id: 4,
      rowNo: "R-04",
      expectedPlants: 629,
      livePlants: 612,
      deadPlants: 7,
      missingPlants: 6,
      diseasePlants: 4,
      vacantSpots: 6,
      survivalRate: 97.3,
      status: "Moderate",
      remarks: "Disease observed",
    },

    {
      id: 5,
      rowNo: "R-05",
      expectedPlants: 631,
      livePlants: 626,
      deadPlants: 2,
      missingPlants: 2,
      diseasePlants: 1,
      vacantSpots: 2,
      survivalRate: 99.21,
      status: "Excellent",
      remarks: "Excellent growth",
    },
    {
      id: 6,
      rowNo: "R-06",
      expectedPlants: 630,
      livePlants: 619,
      deadPlants: 4,
      missingPlants: 5,
      diseasePlants: 2,
      vacantSpots: 5,
      survivalRate: 98.25,
      status: "Healthy",
      remarks: "Normal growth",
    },

    {
      id: 7,
      rowNo: "R-07",
      expectedPlants: 631,
      livePlants: 615,
      deadPlants: 6,
      missingPlants: 6,
      diseasePlants: 4,
      vacantSpots: 6,
      survivalRate: 97.46,
      status: "Moderate",
      remarks: "Requires field inspection",
    },

    {
      id: 8,
      rowNo: "R-08",
      expectedPlants: 629,
      livePlants: 624,
      deadPlants: 2,
      missingPlants: 2,
      diseasePlants: 1,
      vacantSpots: 2,
      survivalRate: 99.21,
      status: "Excellent",
      remarks: "Uniform plant stand",
    },

    {
      id: 9,
      rowNo: "R-09",
      expectedPlants: 632,
      livePlants: 617,
      deadPlants: 5,
      missingPlants: 7,
      diseasePlants: 3,
      vacantSpots: 7,
      survivalRate: 97.63,
      status: "Moderate",
      remarks: "Gap filling required",
    },

    {
      id: 10,
      rowNo: "R-10",
      expectedPlants: 630,
      livePlants: 627,
      deadPlants: 1,
      missingPlants: 2,
      diseasePlants: 0,
      vacantSpots: 2,
      survivalRate: 99.52,
      status: "Excellent",
      remarks: "Excellent plant health",
    },
    {
      id: 11,
      rowNo: "R-11",
      expectedPlants: 631,
      livePlants: 620,
      deadPlants: 4,
      missingPlants: 5,
      diseasePlants: 2,
      vacantSpots: 5,
      survivalRate: 98.26,
      status: "Healthy",
      remarks: "Routine monitoring completed",
    },

    {
      id: 12,
      rowNo: "R-12",
      expectedPlants: 628,
      livePlants: 610,
      deadPlants: 8,
      missingPlants: 6,
      diseasePlants: 4,
      vacantSpots: 6,
      survivalRate: 97.13,
      status: "Moderate",
      remarks: "Disease control recommended",
    },

    {
      id: 13,
      rowNo: "R-13",
      expectedPlants: 633,
      livePlants: 629,
      deadPlants: 1,
      missingPlants: 2,
      diseasePlants: 1,
      vacantSpots: 2,
      survivalRate: 99.37,
      status: "Excellent",
      remarks: "Healthy plantation",
    },

    {
      id: 14,
      rowNo: "R-14",
      expectedPlants: 629,
      livePlants: 614,
      deadPlants: 6,
      missingPlants: 5,
      diseasePlants: 4,
      vacantSpots: 5,
      survivalRate: 97.62,
      status: "Moderate",
      remarks: "Replanting required in some spots",
    },

    {
      id: 15,
      rowNo: "R-15",
      expectedPlants: 630,
      livePlants: 625,
      deadPlants: 2,
      missingPlants: 2,
      diseasePlants: 1,
      vacantSpots: 2,
      survivalRate: 99.21,
      status: "Excellent",
      remarks: "Very good plant condition",
    },
    {
      id: 16,
      rowNo: "R-16",
      expectedPlants: 632,
      livePlants: 624,
      deadPlants: 3,
      missingPlants: 3,
      diseasePlants: 2,
      vacantSpots: 3,
      survivalRate: 98.73,
      status: "Healthy",
      remarks: "Minor replacement required",
    },

    {
      id: 17,
      rowNo: "R-17",
      expectedPlants: 629,
      livePlants: 607,
      deadPlants: 10,
      missingPlants: 7,
      diseasePlants: 5,
      vacantSpots: 7,
      survivalRate: 96.5,
      status: "Critical",
      remarks: "Immediate replanting required",
    },

    {
      id: 18,
      rowNo: "R-18",
      expectedPlants: 631,
      livePlants: 626,
      deadPlants: 2,
      missingPlants: 2,
      diseasePlants: 1,
      vacantSpots: 2,
      survivalRate: 99.21,
      status: "Excellent",
      remarks: "Excellent field condition",
    },

    {
      id: 19,
      rowNo: "R-19",
      expectedPlants: 630,
      livePlants: 616,
      deadPlants: 5,
      missingPlants: 6,
      diseasePlants: 3,
      vacantSpots: 6,
      survivalRate: 97.78,
      status: "Moderate",
      remarks: "Monitor disease spread",
    },

    {
      id: 20,
      rowNo: "R-20",
      expectedPlants: 628,
      livePlants: 623,
      deadPlants: 2,
      missingPlants: 2,
      diseasePlants: 1,
      vacantSpots: 2,
      survivalRate: 99.2,
      status: "Excellent",
      remarks: "Census completed successfully",
    },
  ],
};
export const charts = {
  // ==========================================
  // Live vs Dead Plants
  // ==========================================

  liveVsDeadChart: [
    {
      name: "Live Plants",
      value: 12180,
      color: "#22C55E",
    },
    {
      name: "Dead Plants",
      value: 210,
      color: "#EF4444",
    },
    {
      name: "Missing Plants",
      value: 174,
      color: "#F59E0B",
    },
  ],

  // ==========================================
  // Plant Distribution
  // ==========================================

  plantDistributionChart: [
    {
      name: "Excellent",
      plants: 3130,
      percentage: 24.91,
      color: "#16A34A",
    },
    {
      name: "Healthy",
      plants: 6025,
      percentage: 47.95,
      color: "#22C55E",
    },
    {
      name: "Moderate",
      plants: 2795,
      percentage: 22.25,
      color: "#F59E0B",
    },
    {
      name: "Critical",
      plants: 614,
      percentage: 4.89,
      color: "#DC2626",
    },
  ],

  // ==========================================
  // Row Wise Survival Rate
  // ==========================================

  survivalRateChart: [
    { row: "R-01", survival: 98.57 },
    { row: "R-02", survival: 98.41 },
    { row: "R-03", survival: 98.1 },
    { row: "R-04", survival: 97.3 },
    { row: "R-05", survival: 99.21 },
    { row: "R-06", survival: 98.25 },
    { row: "R-07", survival: 97.46 },
    { row: "R-08", survival: 99.21 },
    { row: "R-09", survival: 97.63 },
    { row: "R-10", survival: 99.52 },
    { row: "R-11", survival: 98.26 },
    { row: "R-12", survival: 97.13 },
    { row: "R-13", survival: 99.37 },
    { row: "R-14", survival: 97.62 },
    { row: "R-15", survival: 99.21 },
    { row: "R-16", survival: 98.73 },
    { row: "R-17", survival: 96.5 },
    { row: "R-18", survival: 99.21 },
    { row: "R-19", survival: 97.78 },
    { row: "R-20", survival: 99.2 },
  ],

  // ==========================================
  // Census Progress
  // ==========================================

  censusProgress: {
    completedRows: 20,
    totalRows: 20,
    completedPercentage: 100,
    pendingRows: 0,
  },
};
export const fieldPhotos = [
  {
    id: 1,
    title: "Block Overview",
    category: "Overview",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
    capturedBy: "Md. Faruk Hossain",
    designation: "Field Officer",
    capturedDate: "2026-07-18",
    capturedTime: "09:15 AM",
    latitude: 24.89254,
    longitude: 91.86832,
    description: "Overall view of Block-08 before census started.",
    status: "Verified",
  },

  {
    id: 2,
    title: "Row Inspection",
    category: "Live Plants",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
    capturedBy: "Kamrul Hasan",
    designation: "Assistant Manager",
    capturedDate: "2026-07-18",
    capturedTime: "10:05 AM",
    latitude: 24.89261,
    longitude: 91.86871,
    description: "Inspection of healthy tea plants in Row-05.",
    status: "Verified",
  },

  {
    id: 3,
    title: "Missing Plant Area",
    category: "Missing Plants",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    capturedBy: "Md. Saad",
    designation: "Survey Officer",
    capturedDate: "2026-07-18",
    capturedTime: "10:48 AM",
    latitude: 24.89222,
    longitude: 91.86904,
    description: "Missing plants identified in Row-09.",
    status: "Pending Review",
  },

  {
    id: 4,
    title: "Disease Affected Plants",
    category: "Disease",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf",
    capturedBy: "Rafiquddin Ahmed",
    designation: "Supervisor",
    capturedDate: "2026-07-18",
    capturedTime: "11:20 AM",
    latitude: 24.89184,
    longitude: 91.86926,
    description: "Disease symptoms observed in Row-14.",
    status: "Verified",
  },

  {
    id: 5,
    title: "Completed Census",
    category: "Completion",
    image: "https://images.unsplash.com/photo-1463123081488-789f998ac9c4",
    capturedBy: "Md. Faruk Hossain",
    designation: "Field Officer",
    capturedDate: "2026-07-18",
    capturedTime: "03:35 PM",
    latitude: 24.8913,
    longitude: 91.8696,
    description: "Final field photo after completing plant census.",
    status: "Approved",
  },
];
export const documents = [
  {
    id: 1,
    documentNo: "DOC-2026-001",
    documentName: "Plant Census Report",
    category: "Report",
    fileType: "PDF",
    fileSize: "2.45 MB",
    uploadedBy: "Md. Faruk Hossain",
    designation: "Field Officer",
    uploadDate: "2026-07-18",
    uploadTime: "04:10 PM",
    version: "1.0",
    status: "Approved",
    downloadUrl: "/documents/plant-census-report.pdf",
    remarks: "Final census report for Block-08.",
  },

  {
    id: 2,
    documentNo: "DOC-2026-002",
    documentName: "Field Sketch Map",
    category: "Map",
    fileType: "PDF",
    fileSize: "1.28 MB",
    uploadedBy: "Kamrul Hasan",
    designation: "Assistant Manager",
    uploadDate: "2026-07-18",
    uploadTime: "04:20 PM",
    version: "1.0",
    status: "Verified",
    downloadUrl: "/documents/field-sketch-map.pdf",
    remarks: "Field boundary and row layout.",
  },

  {
    id: 3,
    documentNo: "DOC-2026-003",
    documentName: "GIS Coordinate Sheet",
    category: "GIS",
    fileType: "XLSX",
    fileSize: "845 KB",
    uploadedBy: "Rafiquddin Ahmed",
    designation: "Supervisor",
    uploadDate: "2026-07-18",
    uploadTime: "04:35 PM",
    version: "2.0",
    status: "Approved",
    downloadUrl: "/documents/gis-coordinate-sheet.xlsx",
    remarks: "GPS coordinates and polygon data.",
  },

  {
    id: 4,
    documentNo: "DOC-2026-004",
    documentName: "Row Wise Survey Sheet",
    category: "Survey",
    fileType: "XLSX",
    fileSize: "1.15 MB",
    uploadedBy: "Md. Saad",
    designation: "Survey Officer",
    uploadDate: "2026-07-18",
    uploadTime: "04:45 PM",
    version: "1.1",
    status: "Pending Review",
    downloadUrl: "/documents/row-wise-survey-sheet.xlsx",
    remarks: "Contains row-wise census records.",
  },

  {
    id: 5,
    documentNo: "DOC-2026-005",
    documentName: "Approval Letter",
    category: "Approval",
    fileType: "PDF",
    fileSize: "520 KB",
    uploadedBy: "Estate Manager",
    designation: "Estate Manager",
    uploadDate: "2026-07-19",
    uploadTime: "09:30 AM",
    version: "1.0",
    status: "Approved",
    downloadUrl: "/documents/approval-letter.pdf",
    remarks: "Official approval of plant census.",
  },
];
export const censusHistory = [
  {
    id: 1,
    censusId: "PC-2026-001",
    censusDate: "2026-07-18",
    surveyType: "Full Census",
    estate: "Jamuna Tea Estate",
    division: "Rangpur Division",
    section: "Section-A",
    block: "BLK-08",
    censusBy: "Md. Faruk Hossain",
    supervisor: "Kamrul Hasan",
    totalPlants: 12564,
    livePlants: 12180,
    deadPlants: 210,
    survivalRate: 96.95,
    status: "Approved",
    approvedBy: "Estate Manager",
    approvedDate: "2026-07-19",
    lastUpdated: "2026-07-19 09:30 AM",
  },

  {
    id: 2,
    censusId: "PC-2025-004",
    censusDate: "2025-07-20",
    surveyType: "Full Census",
    estate: "Jamuna Tea Estate",
    division: "Rangpur Division",
    section: "Section-A",
    block: "BLK-08",
    censusBy: "Rafiquddin Ahmed",
    supervisor: "Kamrul Hasan",
    totalPlants: 12485,
    livePlants: 12062,
    deadPlants: 255,
    survivalRate: 96.62,
    status: "Approved",
    approvedBy: "Estate Manager",
    approvedDate: "2025-07-21",
    lastUpdated: "2025-07-21 10:15 AM",
  },

  {
    id: 3,
    censusId: "PC-2024-006",
    censusDate: "2024-07-17",
    surveyType: "Verification Census",
    estate: "Jamuna Tea Estate",
    division: "Rangpur Division",
    section: "Section-A",
    block: "BLK-08",
    censusBy: "Md. Saad",
    supervisor: "Rafiquddin Ahmed",
    totalPlants: 12320,
    livePlants: 11885,
    deadPlants: 290,
    survivalRate: 96.47,
    status: "Approved",
    approvedBy: "Estate Manager",
    approvedDate: "2024-07-18",
    lastUpdated: "2024-07-18 04:20 PM",
  },

  {
    id: 4,
    censusId: "PC-2023-003",
    censusDate: "2023-07-15",
    surveyType: "Sample Census",
    estate: "Jamuna Tea Estate",
    division: "Rangpur Division",
    section: "Section-A",
    block: "BLK-08",
    censusBy: "Kamrul Hasan",
    supervisor: "Estate Manager",
    totalPlants: 12240,
    livePlants: 11762,
    deadPlants: 318,
    survivalRate: 96.09,
    status: "Archived",
    approvedBy: "Estate Manager",
    approvedDate: "2023-07-16",
    lastUpdated: "2023-07-16 05:10 PM",
  },

  {
    id: 5,
    censusId: "PC-2022-002",
    censusDate: "2022-07-14",
    surveyType: "Sample Census",
    estate: "Jamuna Tea Estate",
    division: "Rangpur Division",
    section: "Section-A",
    block: "BLK-08",
    censusBy: "Field Survey Team",
    supervisor: "Kamrul Hasan",
    totalPlants: 12110,
    livePlants: 11596,
    deadPlants: 355,
    survivalRate: 95.76,
    status: "Archived",
    approvedBy: "Estate Manager",
    approvedDate: "2022-07-15",
    lastUpdated: "2022-07-15 03:45 PM",
  },
];
export const approvalStatus = {
  currentStatus: "Approved",

  workflow: [
    {
      id: 1,
      stage: "Submitted",
      status: "Completed",
      actionBy: "Md. Faruk Hossain",
      designation: "Field Officer",
      actionDate: "2026-07-18",
      actionTime: "04:20 PM",
      comments: "Plant census data submitted successfully.",
    },

    {
      id: 2,
      stage: "Verified",
      status: "Completed",
      actionBy: "Kamrul Hasan",
      designation: "Assistant Manager",
      actionDate: "2026-07-18",
      actionTime: "05:15 PM",
      comments: "Verified field records and row-wise counts.",
    },

    {
      id: 3,
      stage: "Reviewed",
      status: "Completed",
      actionBy: "Rafiquddin Ahmed",
      designation: "Supervisor",
      actionDate: "2026-07-19",
      actionTime: "08:40 AM",
      comments: "Reviewed GIS map, documents, and summary statistics.",
    },

    {
      id: 4,
      stage: "Approved",
      status: "Completed",
      actionBy: "Abdul Karim",
      designation: "Estate Manager",
      actionDate: "2026-07-19",
      actionTime: "09:30 AM",
      comments: "Plant census approved for official record.",
    },
  ],

  approvalSummary: {
    submittedBy: "Md. Faruk Hossain",
    verifiedBy: "Kamrul Hasan",
    reviewedBy: "Rafiquddin Ahmed",
    approvedBy: "Abdul Karim",

    submittedDate: "2026-07-18",
    approvedDate: "2026-07-19",

    totalProcessingTime: "17 Hours 10 Minutes",

    finalStatus: "Approved",
  },
};
