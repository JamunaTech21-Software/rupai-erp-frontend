export const bushRegisterData = {
  // ==============================
  // Bush Register Summary
  // ==============================
  summary: [
    {
      id: 1,
      title: "Total Area (Acre)",
      value: "25.60",
      icon: "Map",
    },
    {
      id: 2,
      title: "Total Rows",
      value: "2,560",
      icon: "Rows",
    },
    {
      id: 3,
      title: "Total Bushes",
      value: "1,28,000",
      icon: "Trees",
    },
    {
      id: 4,
      title: "Productive Bushes",
      value: "1,11,360",
      icon: "Leaf",
    },
    {
      id: 5,
      title: "Dead Bushes",
      value: "4,800",
      icon: "TreePine",
    },
    {
      id: 6,
      title: "Missing Bushes",
      value: "2,400",
      icon: "CircleOff",
    },
    {
      id: 7,
      title: "Gap Percentage",
      value: "5.63%",
      icon: "Gauge",
    },
    {
      id: 8,
      title: "Avg. Bush Height",
      value: "72.50 cm",
      icon: "ArrowUp",
    },
    {
      id: 9,
      title: "Avg. Bush Spread",
      value: "94.20 cm",
      icon: "GitBranch",
    },
    {
      id: 10,
      title: "Bush Density / Acre",
      value: "5,000",
      icon: "Grid2x2",
    },
    {
      id: 11,
      title: "Bush Health",
      value: "Good",
      icon: "ShieldCheck",
    },
    {
      id: 12,
      title: "Repl. Requirement",
      value: "2,400 Bushes",
      icon: "Sprout",
    },
  ],

  // ==============================
  // GIS Map
  // ==============================
  map: {
    image: "/bush-register-map.png",
    blockName: "BLK-08",
    area: "25.60 Acre",
    latitude: "25.7456",
    longitude: "89.2741",
    controls: [
      { id: 1, icon: "Plus" },
      { id: 2, icon: "Minus" },
      { id: 3, icon: "Layers" },
      { id: 4, icon: "Expand" },
    ],

    legends: [
      {
        id: 1,
        title: "High Density",
        color: "#0f8a28",
      },
      {
        id: 2,
        title: "Good Density",
        color: "#69c33d",
      },
      {
        id: 3,
        title: "Low Density",
        color: "#f2c300",
      },
      {
        id: 4,
        title: "Very Low Density",
        color: "#e53935",
      },
      {
        id: 5,
        title: "Road",
        color: "#8d8d8d",
      },
    ],
  },

  // ==============================
  // Table Header
  // ==============================
  tableHeaders: [
    {
      key: "sl",
      label: "SL",
    },
    {
      key: "rowNo",
      label: "Row No.",
    },
    {
      key: "from",
      label: "From",
    },
    {
      key: "to",
      label: "To",
    },
    {
      key: "totalBush",
      label: "Total",
    },
    {
      key: "productive",
      label: "Productive",
    },
    {
      key: "dead",
      label: "Dead",
    },
    {
      key: "missing",
      label: "Missing",
    },
    {
      key: "gap",
      label: "Gap %",
    },
    {
      key: "height",
      label: "Avg Height",
    },
    {
      key: "spread",
      label: "Avg Spread",
    },
    {
      key: "health",
      label: "Bush Health",
    },
    {
      key: "remarks",
      label: "Remarks",
    },
    {
      key: "action",
      label: "Action",
    },
  ],

  // ==============================
  // Bush Register List
  // ==============================
  bushRegisterList: [
    {
      id: 1,
      rowNo: "R-001",
      from: 1,
      to: 100,
      totalBush: 500,
      productive: 470,
      dead: 15,
      missing: 15,
      gap: 6.0,
      height: 70.5,
      spread: 92.0,
      health: "Good",
      remarks: "-",
    },
    {
      id: 2,
      rowNo: "R-002",
      from: 101,
      to: 200,
      totalBush: 500,
      productive: 458,
      dead: 20,
      missing: 22,
      gap: 8.4,
      height: 71.0,
      spread: 93.2,
      health: "Good",
      remarks: "-",
    },
    {
      id: 3,
      rowNo: "R-003",
      from: 201,
      to: 300,
      totalBush: 500,
      productive: 452,
      dead: 25,
      missing: 23,
      gap: 9.2,
      height: 69.8,
      spread: 91.5,
      health: "Fair",
      remarks: "-",
    },
    {
      id: 4,
      rowNo: "R-004",
      from: 301,
      to: 400,
      totalBush: 500,
      productive: 460,
      dead: 18,
      missing: 22,
      gap: 8.0,
      height: 72.3,
      spread: 95.0,
      health: "Good",
      remarks: "-",
    },
    {
      id: 5,
      rowNo: "R-005",
      from: 401,
      to: 500,
      totalBush: 500,
      productive: 470,
      dead: 12,
      missing: 18,
      gap: 6.0,
      height: 73.0,
      spread: 97.5,
      health: "Good",
      remarks: "-",
    },
  ],

  // ==============================
  // Bush Age Profile
  // ==============================
  bushAgeProfile: [
    {
      id: 1,
      age: "1 - 2 Year",
      area: 2.1,
      percentage: 8.2,
      color: "#0b7a29",
    },
    {
      id: 2,
      age: "3 - 5 Year",
      area: 12.8,
      percentage: 50.0,
      color: "#74bf45",
    },
    {
      id: 3,
      age: "6 - 10 Year",
      area: 8.3,
      percentage: 32.4,
      color: "#f3b400",
    },
    {
      id: 4,
      age: "10+ Year",
      area: 2.4,
      percentage: 9.4,
      color: "#db3d30",
    },
  ],

  // ==============================
  // Gap Summary
  // ==============================
  gapSummary: {
    totalGap: 2400,
    gapArea: 0.48,
    replantRequired: 2400,
    suggestedAction: "Replanting",
    recommendedClone: "TV-23",
    bestTime: "Monsoon (Jun - Jul)",
  },

  // ==============================
  // Gap Size
  // ==============================
  gapSizeDetails: [
    {
      id: 1,
      size: "Small (1-2 Plants)",
      count: 980,
      percentage: 40.83,
      replant: 980,
    },
    {
      id: 2,
      size: "Medium (3-5 Plants)",
      count: 860,
      percentage: 35.83,
      replant: 860,
    },
    {
      id: 3,
      size: "Large (6+ Plants)",
      count: 560,
      percentage: 23.34,
      replant: 560,
    },
  ],

  // ==============================
  // Bush Health Distribution
  // ==============================
  healthDistribution: [
    {
      id: 1,
      name: "Excellent",
      percentage: 16.2,
      color: "#0f8a28",
    },
    {
      id: 2,
      name: "Good",
      percentage: 54.8,
      color: "#4caf50",
    },
    {
      id: 3,
      name: "Fair",
      percentage: 20.5,
      color: "#f4b400",
    },
    {
      id: 4,
      name: "Poor",
      percentage: 6.1,
      color: "#ff9800",
    },
    {
      id: 5,
      name: "Dead",
      percentage: 2.4,
      color: "#f44336",
    },
  ],

  // ==============================
  // Quick Actions
  // ==============================

  quickActions: [
    {
      id: 1,
      title: "Bush Survey Entry",
      value: "survey-entry",
    },
    {
      id: 2,
      title: "Mark Replanting Area",
      value: "mark-replanting",
    },
    {
      id: 3,
      title: "Print Bush Register Report",
      value: "print-report",
    },
    {
      id: 4,
      title: "Export to Excel",
      value: "export-excel",
    },
    {
      id: 5,
      title: "Export Survey Data",
      value: "export-survey",
    },
  ],

  // ==============================
  // Table Summary
  // ==============================
  tableSummary: {
    totalBush: 2500,
    productive: 2310,
    dead: 90,
    missing: 100,
    gap: 7.2,
    height: 72.5,
    spread: 94.2,
    health: "Good",
  },

  // ==============================
  // Table Pagination
  // ==============================
  tablePagination: {
    showingFrom: 1,
    showingTo: 5,
    totalRows: 2560,
    currentPage: 1,
    totalPages: 512,
    pages: [1, 2, 3, 4, 5],
  },
};
