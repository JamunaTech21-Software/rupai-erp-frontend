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

  // =========================
  // Stock Table Headers
  // =========================

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
