export const bushRegisterData = {
  // ==============================
  // Bush Register Summary
  // ==============================
  summary: [
    {
      id: 1,
      title: "Total Area (Acre)",
      icon: "Map",
    },
    {
      id: 2,
      title: "Total Rows",
      icon: "Rows",
    },
    {
      id: 3,
      title: "Total Bushes",
      icon: "Trees",
    },
    {
      id: 4,
      title: "Productive Bushes",
      icon: "Leaf",
    },
    {
      id: 5,
      title: "Dead Bushes",
      icon: "TreePine",
    },
    {
      id: 6,
      title: "Missing Bushes",
      icon: "CircleOff",
    },
    {
      id: 7,
      title: "Gap Percentage",
      icon: "Gauge",
    },
    {
      id: 8,
      title: "Avg. Bush Height",
      icon: "ArrowUp",
    },
    {
      id: 9,
      title: "Avg. Bush Spread",
      icon: "GitBranch",
    },
    {
      id: 10,
      title: "Bush Density / Acre",
      icon: "Grid2x2",
    },
    {
      id: 11,
      title: "Bush Health",
      icon: "ShieldCheck",
    },
    {
      id: 12,
      title: "Repl. Requirement",
      icon: "Sprout",
    },
  ],

  // ==============================
  // GIS Map
  // ==============================
  map: {
    image: "/bush-register-map.webp",
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
  // ==============================
  // Bush Age Profile
  // ==============================
  // ==============================
  // Gap Summary
  // ==============================
  // ==============================
  // Gap Size
  // ==============================
  // ==============================
  // Bush Health Distribution
  // ==============================
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
  // ==============================
  // Table Pagination
  // ==============================
};
