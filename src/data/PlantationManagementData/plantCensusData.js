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
    unit: "Acre",
    icon: "Map",
    color: "green",
  },
  {
    id: 2,
    title: "Total Rows",
    unit: "Rows",
    icon: "SquareDashed",
    color: "gray",
  },
  {
    id: 3,
    title: "Total Plants (Expected)",
    unit: "Plants",
    icon: "Sprout",
    color: "lime",
  },
  {
    id: 4,
    title: "Live Plants",
    unit: "Plants",
    icon: "Leaf",
    color: "green",
  },
  {
    id: 5,
    title: "Dead Plants",
    unit: "Plants",
    icon: "CircleOff",
    color: "red",
  },
  {
    id: 6,
    title: "Missing Plants",
    unit: "Plants",
    icon: "AlertTriangle",
    color: "yellow",
  },
  {
    id: 7,
    title: "Avg. Plants / Acre",
    unit: "",
    icon: "TrendingUp",
    color: "blue",
  },
  {
    id: 8,
    title: "Data Entry Status",
    unit: "",
    icon: "CheckCircle2",
    color: "teal",
  },
];
export const summaryCards = [
  {
    id: 1,
    title: "Total Area (Acre)",
    icon: "TriangleAlert",
    iconColor: "bg-green-100 text-green-600",
  },

  {
    id: 2,
    title: "Total Plants (Expected)",
    icon: "Users",
    iconColor: "bg-green-100 text-green-600",
  },

  {
    id: 3,
    title: "Live Plants",
    badge: "94.10%",
    icon: "Leaf",
    iconColor: "bg-green-100 text-green-600",
    badgeColor: "bg-green-100 text-green-700",
  },

  {
    id: 4,
    title: "Dead Plants",
    badge: "5.53%",
    icon: "ShieldX",
    iconColor: "bg-red-100 text-red-600",
    badgeColor: "bg-red-100 text-red-700",
  },

  {
    id: 5,
    title: "Missing Plants",
    badge: "0.05%",
    icon: "CircleDot",
    iconColor: "bg-yellow-100 text-yellow-600",
    badgeColor: "bg-yellow-100 text-yellow-700",
  },

  {
    id: 6,
    title: "Avg. Plants / Acre",
    icon: "UsersRound",
    iconColor: "bg-green-100 text-green-600",
  },

  {
    id: 7,
    title: "Plants / Meter (Avg.)",
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

};
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
