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
    badge: "94.10%",
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
      label: "Row No.",
    },
    {
      id: 2,
      key: "rowLength",
      label: "Row Length (Mtr.)",
    },
    {
      id: 3,
      key: "plantsPerMeter",
      label: "Plants / Meter (Avg.)",
    },
    {
      id: 4,
      key: "expectedPlants",
      label: "Total Plants (Expected)",
    },
    {
      id: 5,
      key: "livePlants",
      label: "Live Plants",
    },
    {
      id: 6,
      key: "deadPlants",
      label: "Dead Plants",
    },
    {
      id: 7,
      key: "missingPlants",
      label: "Missing",
    },
    {
      id: 8,
      key: "gapPercentage",
      label: "Gap (%)",
    },
  ],

  rows: [
    {
      id: 1,
      rowNo: "R-01",
      rowLength: 245.0,
      plantsPerMeter: 2.15,
      expectedPlants: 526,
      livePlants: 498,
      deadPlants: 28,
      missingPlants: 0,
      gapPercentage: 5.32,
    },
    {
      id: 2,
      rowNo: "R-02",
      rowLength: 248.0,
      plantsPerMeter: 2.18,
      expectedPlants: 541,
      livePlants: 512,
      deadPlants: 29,
      missingPlants: 0,
      gapPercentage: 5.36,
    },
    {
      id: 3,
      rowNo: "R-03",
      rowLength: 250.0,
      plantsPerMeter: 2.1,
      expectedPlants: 525,
      livePlants: 497,
      deadPlants: 28,
      missingPlants: 0,
      gapPercentage: 5.33,
    },
    {
      id: 4,
      rowNo: "R-04",
      rowLength: 240.0,
      plantsPerMeter: 2.05,
      expectedPlants: 492,
      livePlants: 466,
      deadPlants: 26,
      missingPlants: 0,
      gapPercentage: 5.28,
    },
    {
      id: 5,
      rowNo: "R-05",
      rowLength: 245.0,
      plantsPerMeter: 2.12,
      expectedPlants: 519,
      livePlants: 491,
      deadPlants: 28,
      missingPlants: 0,
      gapPercentage: 5.39,
    },
  ],
};
export const charts = {
  // ==========================================
  // Live vs Dead Plants
  // ==========================================

  liveVsDeadChart: {
    title: "Live vs Dead Plants",

    total: 102500,

    data: [
      {
        id: 1,
        name: "Live Plants",
        value: 96780,
        percentage: 94.47,
        color: "#15803D",
      },
      {
        id: 2,
        name: "Dead Plants",
        value: 5670,
        percentage: 5.53,
        color: "#EF4444",
      },
    ],
  },
  // ==========================================
  // Plant Distribution
  // ==========================================

  plantDistributionChart: {
    title: "Plant Distribution (Row Wise)",

    data: [
      {
        row: "R-01",
        livePlants: 498,
        deadPlants: 280,
        gap: 5.32,
      },
      {
        row: "R-02",
        livePlants: 512,
        deadPlants: 390,
        gap: 5.36,
      },
      {
        row: "R-03",
        livePlants: 497,
        deadPlants: 185,
        gap: 5.33,
      },
      {
        row: "R-04",
        livePlants: 466,
        deadPlants: 369,
        gap: 5.28,
      },
      {
        row: "R-05",
        livePlants: 491,
        deadPlants: 382,
        gap: 5.39,
      },
    ],
  },

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
    title: "Field view photo",
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
    title: "Row view photo",
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
    title: "During census",
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
];
export const documentTableHeaders = [
  {
    id: 1,
    key: "sl",
    label: "SL",
  },
  {
    id: 2,
    key: "documentName",
    label: "Document Name",
  },
  {
    id: 3,
    key: "type",
    label: "Type",
  },
  {
    id: 4,
    key: "fileName",
    label: "File Name",
  },
  {
    id: 5,
    key: "uploadedOn",
    label: "Uploaded On",
  },
  {
    id: 6,
    key: "action",
    label: "Action",
  },
];
export const documents = [
  {
    id: 1,
    documentName: "Census Data Sheet",
    type: "Document",
    fileName: "census_BLK08.pdf",
    uploadedOn: "01/06/2026",
  },
  {
    id: 2,
    documentName: "Field Map (GPS)",
    type: "Map",
    fileName: "map_BLK08.kmz",
    uploadedOn: "01/06/2026",
  },
  {
    id: 3,
    documentName: "Photo Report",
    type: "Document",
    fileName: "photo_BLK08.pdf",
    uploadedOn: "01/06/2026",
  },
];
export const censusHistoryTableHeaders = [
  {
    id: 1,
    key: "censusDate",
    label: "Date",
  },
  {
    id: 2,
    key: "action",
    label: "Action",
  },
  {
    id: 3,
    key: "user",
    label: "User",
  },
  {
    id: 4,
    key: "remarks",
    label: "Remarks",
  },
];
export const censusHistory = [
  {
    id: 1,
    censusDate: "01/06/2026",
    action: "Census Completed",
    user: "Faruk Hossain",
    remarks: "Data collection completed",
  },
  {
    id: 2,
    censusDate: "01/06/2026",
    action: "Data Entry",
    user: "Kamrul Hasan",
    remarks: "Row wise data entry",
  },
  {
    id: 3,
    censusDate: "01/06/2026",
    action: "Submitted",
    user: "Kamrul Hasan",
    remarks: "Submitted for approval",
  },
];
export const approvalStatus = {
  currentStatus: "Approved",

  workflow: [
    {
      id: 1,
      stage: "Submitted",
      actionBy: "Md. Faruk Hossain",
      designation: "Field Officer",
      actionDate: "18 Jul 2026",
      actionTime: "04:20 PM",
      status: "Approved",
    },

    {
      id: 2,
      stage: "Verified",
      actionBy: "Kamrul Hasan",
      designation: "Assistant Manager",
      actionDate: "18 Jul 2026",
      actionTime: "05:15 PM",
      status: "pending",
    },

    {
      id: 3,
      stage: "Reviewed",
      actionBy: "Rafiquddin Ahmed",
      designation: "Supervisor",
      actionDate: "19 Jul 2026",
      actionTime: "08:40 AM",
      status: "pending",
    },

    {
      id: 4,
      stage: "Approved",
      actionBy: "Abdul Karim",
      designation: "Estate Manager",
      actionDate: "19 Jul 2026",
      actionTime: "09:30 AM",
      status: "pending",
    },
  ],

  approvalSummary: {
    submittedDate: "18 Jul 2026",
    approvedDate: "19 Jul 2026",
    processingTime: "17 Hours 10 Minutes",
    finalStatus: "Approved",
  },
};
