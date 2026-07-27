export const nurseryManagementData = {
  pageTitle: "Nursery Management",

  tabs: [
    {
      id: 1,
      name: "Nursery Management",
      value: "nursery-management",
      active: true,
    },
    {
      id: 2,
      name: "Field Management",
      value: "field-management",
      active: false,
    },
    {
      id: 3,
      name: "Replanting & Gap Filling",
      value: "replanting-gap-filling",
      active: false,
    },
    {
      id: 4,
      name: "Plant Census",
      value: "plant-census",
      active: false,
    },
    {
      id: 5,
      name: "Bush Register",
      value: "bush-register",
      active: false,
    },
  ],

  dropdownOptions: {
    estates: [
      "Jamuna Tea Estate",
      "Green Valley Tea Estate",
      "Rupai Tea Estate",
      "Highland Tea Estate",
    ],

    divisions: [
      "Rangpur Division (DIV-01)",
      "North Division (DIV-02)",
      "South Division (DIV-03)",
      "East Division (DIV-04)",
    ],

    supervisors: [
      "Md. Faruk Hossain",
      "Abdul Karim",
      "Shamim Ahmed",
      "Rasel Islam",
    ],

    nurseryTypes: [
      "Clonal",
      "Seedling",
      "Research Nursery",
      "Commercial Nursery",
    ],

    irrigationSources: [
      "Tube Well",
      "Deep Tube Well",
      "Canal",
      "River",
      "Rain Water",
    ],

    statuses: ["Active", "Inactive", "Maintenance"],

    activeInstitutes: [
      "Tea Research Institute",
      "Bangladesh Tea Board",
      "Private Nursery",
    ],
  },

  nurseryInformation: {
    estate: "Jamuna Tea Estate",
    division: "Rangpur Division (DIV-01)",
    nurseryName: "Central Nursery",
    supervisor: "Md. Faruk Hossain",
    nurseryCode: "NUR-01",
    nurseryType: "Clonal",
    location: "Uttarkhan, Rangpur",
    irrigationSource: "Tube Well",
    establishedYear: "2020",
    status: "Active",
    totalArea: "5.60",
    usableArea: "4.80",
    activeInstitute: "Tea Research Institute",
    remarks: "Central nursery for clonal plant production.",
  },

  nurserySummary: [
    {
      id: 1,
      title: "Total Area (Acre)",
      value: "5.60",
      unit: "Acre",
      icon: "Map",
    },
    {
      id: 2,
      title: "Usable Area (Acre)",
      value: "4.80",
      unit: "Acre",
      icon: "MapPinned",
    },
    {
      id: 3,
      title: "Total Beds / Sections",
      value: "12",
      unit: "",
      icon: "LayoutGrid",
    },
    {
      id: 4,
      title: "Total Plants",
      value: "210500",
      unit: "",
      icon: "Sprout",
    },
    {
      id: 5,
      title: "Available Plants",
      value: "68500",
      unit: "",
      icon: "Leaf",
    },
    {
      id: 6,
      title: "Distributed This Month",
      value: "32000",
      unit: "",
      icon: "Truck",
    },
  ],

  plantationSummary: [
    {
      id: 1,
      title: "Total Field / Block",
      value: "48",
    },
    {
      id: 2,
      title: "Total Planted Area (Acre)",
      value: "4120",
    },
    {
      id: 3,
      title: "Mature Area (Acre)",
      value: "3200",
    },
    {
      id: 4,
      title: "Young Area (Acre)",
      value: "919.50",
    },
    {
      id: 5,
      title: "Nursery Area (Acre)",
      value: "25.60",
    },
  ],

  bedTableHeaders: [
    "SL",
    "Bed / Section Name",
    "Bed Code",
    "Clone / Seed",
    "Area (Acre)",
    "No. of Plants",
    "Sowing / Planting Date",
    "Status",
    "Action",
  ],

  nurseryBeds: [
    {
      id: 1,
      name: "North Bed A",
      code: "NB-001",
      clone: "TV-23",
      area: "0.50 Acre",
      plants: 2500,
      plantingDate: "12 Jan 2026",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      name: "South Bed B",
      code: "NB-002",
      clone: "TV-25",
      area: "0.40 Acre",
      plants: 2200,
      plantingDate: "18 Jan 2026",
      status: "Inactive",
      statusColor: "bg-red-100 text-red-700",
    },
    {
      id: 3,
      name: "East Bed C",
      code: "NB-003",
      clone: "BT-6",
      area: "0.35 Acre",
      plants: 1800,
      plantingDate: "22 Jan 2026",
      status: "Maintenance",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 4,
      name: "West Bed D",
      code: "NB-004",
      clone: "TV-26",
      area: "0.45 Acre",
      plants: 2800,
      plantingDate: "25 Jan 2026",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: 5,
      name: "Central Bed E",
      code: "NB-005",
      clone: "S-15",
      area: "0.60 Acre",
      plants: 3200,
      plantingDate: "30 Jan 2026",
      status: "Inactive",
      statusColor: "bg-red-100 text-red-700",
    },
    {
      id: 6,
      name: "Hardening Bed F",
      code: "NB-006",
      clone: "TV-30",
      area: "0.55 Acre",
      plants: 2950,
      plantingDate: "05 Feb 2026",
      status: "Maintenance",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
  ],

  stockTableHeaders: [
    "SL",
    "Clone / Seed",
    "Type",
    "Total Plants",
    "Available Plants",
    "Reserved Plants",
    "Distributed Plants",
    "Unit",
    "Action",
  ],

  stockInventory: [
    {
      id: 1,
      clone: "TV-23",
      type: "Clonal",
      total: "75000",
      available: "25000",
      reserved: "5000",
      distributed: "45000",
      unit: "Nos",
    },
    {
      id: 2,
      clone: "TV-26",
      type: "Clonal",
      total: "65000",
      available: "18500",
      reserved: "3000",
      distributed: "43500",
      unit: "Nos",
    },
    {
      id: 3,
      clone: "S-15",
      type: "Seedling",
      total: "40000",
      available: "15000",
      reserved: "2000",
      distributed: "23000",
      unit: "Nos",
    },
    {
      id: 4,
      clone: "R-1",
      type: "Clonal",
      total: "30000",
      available: "8000",
      reserved: "1000",
      distributed: "21000",
      unit: "Nos",
    },
  ],

  recentActivities: [
    {
      id: 1,
      activity: "32,000 plants of TV-23 distributed to Field BLK-08",
      date: "31/05/2026",
    },
    {
      id: 2,
      activity: "18,000 plants of TV-26 moved to Hardening Area",
      date: "28/05/2026",
    },
    {
      id: 3,
      activity: "New Bed BED-12 created",
      date: "25/05/2026",
    },
    {
      id: 4,
      activity: "Irrigation schedule updated for all nursery beds",
      date: "24/05/2026",
    },
    {
      id: 5,
      activity: "Fertilizer application completed in BED-01 to BED-06",
      date: "20/05/2026",
    },
  ],

  mapLegend: [
    {
      id: 1,
      title: "Nursery Bed",
      color: "#4CAF50",
    },
    {
      id: 2,
      title: "Hardening Area",
      color: "#FFC107",
    },
    {
      id: 3,
      title: "Polybag Area",
      color: "#A67C52",
    },
    {
      id: 4,
      title: "Water Tank",
      color: "#2196F3",
    },
    {
      id: 5,
      title: "Road",
      color: "#9E9E9E",
    },
  ],
};
