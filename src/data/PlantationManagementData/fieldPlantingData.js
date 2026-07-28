export const fieldPlantingData = {
  pageTitle: "Field Planting",

  // ==========================================
  // Tabs
  // ==========================================

  tabs: [
    {
      id: 1,
      name: "Nursery Management",
      value: "nursery-management",
      active: false,
    },
    {
      id: 2,
      name: "Field Planting",
      value: "field-planting",
      active: true,
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

  // ==========================================
  // Dropdown Options
  // ==========================================

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

    sections: [
      "Section A (SEC-A)",
      "Section B (SEC-B)",
      "Section C (SEC-C)",
      "Section D (SEC-D)",
    ],

    fields: [
      "BLK-01",
      "BLK-02",
      "BLK-03",
      "BLK-04",
      "BLK-05",
      "BLK-06",
      "BLK-07",
      "BLK-08",
    ],

    plantingSeasons: [
      "Spring (Feb - Mar)",
      "Summer (Apr - May)",
      "Monsoon (Jun - Jul)",
      "Autumn (Sep - Oct)",
    ],

    cloneVarieties: ["TV-23", "TV-25", "TV-26", "TV-30", "S-15", "BT-6", "R-1"],

    plantTypes: ["Clonal", "Seedling", "Experimental"],

    plantingMethods: ["Manual", "Mechanized", "Semi-Mechanized"],

    nurseryBeds: ["Bed-01", "Bed-02", "Bed-03", "Bed-04", "Bed-05"],

    irrigationSources: [
      "Tube Well",
      "Deep Tube Well",
      "Canal",
      "River",
      "Rain Water",
    ],

    irrigationMethods: ["Sprinkler", "Drip", "Flood", "Manual"],

    soilTypes: ["Loamy", "Clay", "Sandy", "Silt"],

    drainageOptions: ["Excellent", "Good", "Moderate", "Poor"],

    previousLandUse: [
      "Replanting",
      "New Plantation",
      "Fallow Land",
      "Research Plot",
    ],

    fertilizers: [
      "NPK (15:15:15)",
      "TSP",
      "MOP",
      "FYM",
      "Compost",
      "Organic Mix",
    ],

    fertilizerUnits: ["Kg", "Ton", "Bag"],

    shadeTreeSpecies: ["Grevillea Robusta", "Albizia", "Acacia", "Silver Oak"],

    shadePurpose: ["Shade", "Wind Break", "Boundary", "Research"],

    labourSources: ["Local", "Contract", "Permanent", "Seasonal"],
  },

  // ==========================================
  // Default Form Data
  // ==========================================

  plantingInformation: {
    estate: "Jamuna Tea Estate",

    division: "Rangpur Division (DIV-01)",

    section: "Section A (SEC-A)",

    fieldBlock: "BLK-08",

    plantingYear: "2026",

    plantingSeason: "Spring (Feb - Mar)",

    plantingDate: "15/02/2026",

    plantingMethod: "Manual",

    plantSource: "Central Nursery",

    nurseryBed: "Bed-02",

    cloneVariety: "TV-23",

    plantType: "Clonal",

    totalArea: "25.60",

    netPlantableArea: "24.80",

    previousCrop: "Replanting",

    plantSpacingRow: "4.0",

    plantSpacingPlant: "2.5",

    pitSize: '18" × 18" × 18"',

    expectedPlants: "24800",

    targetPlants: "24600",

    signalPlant: "2",

    soilType: "Loamy",

    soilPH: "5.2",

    elevation: "240",

    slope: "5%",

    drainage: "Good",

    irrigationSource: "Tube Well",

    irrigationMethod: "Sprinkler",

    basalFertilizer: "NPK 50:50:50 - 20 Kg",

    organicManure: "FYM - 1000 Kg",

    shadeTreePlanned: true,

    remarks:
      "Replanting with high yielding clone TV-23. Land prepared well. Drainage improved.",
  },
  // ==========================================
  // Fertilizer Schedule
  // ==========================================

  fertilizerSchedule: [
    {
      id: 1,
      fertilizer: "NPK (15:15:15)",
      amount: "50",
      unit: "Kg",
    },
    {
      id: 2,
      fertilizer: "TSP",
      amount: "25",
      unit: "Kg",
    },
    {
      id: 3,
      fertilizer: "MOP",
      amount: "25",
      unit: "Kg",
    },
    {
      id: 4,
      fertilizer: "FYM",
      amount: "1000",
      unit: "Kg",
    },
  ],

  // ==========================================
  // Shade Tree Information
  // ==========================================

  shadeTreeInformation: {
    species: "Grevillea Robusta",
    spacing: "20 × 20 ft",
    treesPerAcre: "25",
    purpose: "Shade & Wind Break",
    plantingDate: "15/02/2026",
    remarks: "Planned along boundary",
  },

  // ==========================================
  // Labour Allocation
  // ==========================================

  labourAllocation: {
    totalLabour: "120",
    maleLabour: "80",
    femaleLabour: "40",
    labourSource: "Local",
  },

  // ==========================================
  // Field Officer
  // ==========================================

  fieldOfficer: {
    fieldOfficer: "Md. Faruk Hossain",
    assistantSupervisor: "Md. Kamrul Hasan",
  },

  // ==========================================
  // Documents
  // ==========================================

  documents: [
    {
      id: 1,
      fileName: "Planting_Plan_2026.pdf",
      fileSize: "2.3 MB",
      fileType: "PDF",
    },
    {
      id: 2,
      fileName: "Soil_Report.pdf",
      fileSize: "1.4 MB",
      fileType: "PDF",
    },
    {
      id: 3,
      fileName: "Drainage_Map.pdf",
      fileSize: "4.1 MB",
      fileType: "PDF",
    },
  ],

  // ==========================================
  // Photos
  // ==========================================

  photos: [
    {
      id: 1,
      title: "North Side",
      image: "/plantation/photo-1.jpg",
    },
    {
      id: 2,
      title: "East Side",
      image: "/plantation/photo-2.jpg",
    },
    {
      id: 3,
      title: "South Side",
      image: "/plantation/photo-3.jpg",
    },
  ],

  // ==========================================
  // Field Map
  // ==========================================

  fieldMap: {
    title: "BLK-08",

    area: "25.60 Acre",

    latitude: "25.7456",

    longitude: "89.2741",

    image: "/field-map.png",

    legend: [
      {
        id: 1,
        title: "Field Boundary",
        color: "#43A047",
      },
      {
        id: 2,
        title: "Water Body",
        color: "#42A5F5",
      },
      {
        id: 3,
        title: "Road",
        color: "#F44336",
      },
      {
        id: 4,
        title: "Drain",
        color: "#1565C0",
      },
    ],
  },

  // ==========================================
  // Planting Progress
  // ==========================================

  plantingProgress: {
    percentage: 45,

    completedArea: "11.52 Acre",

    plantsPlanted: "11,160",

    remainingArea: "13.28 Acre",

    remainingPlants: "13,440",
  },

  // ==========================================
  // Quick Summary
  // ==========================================

  quickSummary: [
    {
      id: 1,
      title: "Total Area (Acre)",
      value: "25.60",
      icon: "Map",
    },
    {
      id: 2,
      title: "Expected Plants",
      value: "24,800",
      icon: "Leaf",
    },
    {
      id: 3,
      title: "Target Plants",
      value: "24,600",
      icon: "Target",
    },
    {
      id: 4,
      title: "Today's Progress",
      value: "1.20 Acre",
      icon: "TrendingUp",
    },
    {
      id: 5,
      title: "Plants Planted",
      value: "11,160",
      icon: "Sprout",
    },
    {
      id: 6,
      title: "Completion %",
      value: "45%",
      icon: "CirclePercent",
    },
  ],

  // ==========================================
  // Plantation Summary (Left Sidebar)
  // ==========================================

  plantationSummary: [
    {
      id: 1,
      title: "Total Field / Block",
      value: "48",
    },
    {
      id: 2,
      title: "Total Planted Area (Acre)",
      value: "4,120.00",
    },
    {
      id: 3,
      title: "Mature Area (Acre)",
      value: "3,200.50",
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
  // ==========================================
  // Field Planting History Table Header
  // ==========================================

  historyTableHeaders: [
    "SL",
    "Planting Year",
    "Field / Block",
    "Area (Acre)",
    "Clone / Variety",
    "Planting Date",
    "Method",
    "Expected Plants",
    "Plants Planted",
    "Completion %",
    "Status",
    "Action",
  ],

  // ==========================================
  // Field Planting History
  // ==========================================

  historyTableData: [
    {
      id: 1,
      plantingYear: "2026",
      fieldBlock: "BLK-08",
      area: "25.60",
      clone: "TV-23",
      plantingDate: "15/02/2026",
      method: "Manual",
      expectedPlants: "24,800",
      plantedPlants: "11,160",
      completion: "45%",
      status: "In Progress",
      statusColor: "bg-yellow-100 text-yellow-700",
    },

    {
      id: 2,
      plantingYear: "2025",
      fieldBlock: "BLK-06",
      area: "18.30",
      clone: "TV-26",
      plantingDate: "20/02/2025",
      method: "Manual",
      expectedPlants: "17,600",
      plantedPlants: "17,600",
      completion: "100%",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },

    {
      id: 3,
      plantingYear: "2025",
      fieldBlock: "BLK-05",
      area: "16.00",
      clone: "TV-23",
      plantingDate: "18/02/2025",
      method: "Mechanized",
      expectedPlants: "15,500",
      plantedPlants: "15,500",
      completion: "100%",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },

    {
      id: 4,
      plantingYear: "2024",
      fieldBlock: "BLK-03",
      area: "22.75",
      clone: "S-15",
      plantingDate: "10/02/2024",
      method: "Manual",
      expectedPlants: "21,900",
      plantedPlants: "21,900",
      completion: "100%",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },

    {
      id: 5,
      plantingYear: "2024",
      fieldBlock: "BLK-01",
      area: "20.10",
      clone: "R-1",
      plantingDate: "05/02/2024",
      method: "Manual",
      expectedPlants: "19,400",
      plantedPlants: "19,400",
      completion: "100%",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },

    {
      id: 6,
      plantingYear: "2023",
      fieldBlock: "BLK-09",
      area: "24.20",
      clone: "TV-30",
      plantingDate: "12/02/2023",
      method: "Manual",
      expectedPlants: "23,500",
      plantedPlants: "23,500",
      completion: "100%",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },

    {
      id: 7,
      plantingYear: "2023",
      fieldBlock: "BLK-10",
      area: "19.80",
      clone: "BT-6",
      plantingDate: "08/02/2023",
      method: "Mechanized",
      expectedPlants: "18,900",
      plantedPlants: "18,900",
      completion: "100%",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },

    {
      id: 8,
      plantingYear: "2022",
      fieldBlock: "BLK-11",
      area: "21.40",
      clone: "TV-25",
      plantingDate: "16/02/2022",
      method: "Manual",
      expectedPlants: "20,800",
      plantedPlants: "20,800",
      completion: "100%",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },

    {
      id: 9,
      plantingYear: "2022",
      fieldBlock: "BLK-12",
      area: "17.60",
      clone: "TV-23",
      plantingDate: "21/02/2022",
      method: "Manual",
      expectedPlants: "16,700",
      plantedPlants: "16,700",
      completion: "100%",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },

    {
      id: 10,
      plantingYear: "2021",
      fieldBlock: "BLK-15",
      area: "23.00",
      clone: "TV-26",
      plantingDate: "14/02/2021",
      method: "Mechanized",
      expectedPlants: "22,300",
      plantedPlants: "22,300",
      completion: "100%",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },
  ],

  // ==========================================
  // Table Footer
  // ==========================================

  historyTableFooter: {
    showingFrom: 1,
    showingTo: 10,
    totalEntries: 28,
  },

  // ==========================================
  // Pagination
  // ==========================================

  pagination: {
    currentPage: 1,

    totalPages: 6,

    pages: [1, 2, 3, 4, 5, 6],
  },

  // ==========================================
  // Footer Action Buttons
  // ==========================================

  footerButtons: [
    {
      id: 1,
      label: "Reset",
      icon: "RotateCcw",
      variant: "outline",
    },

    {
      id: 2,
      label: "Cancel",
      icon: "X",
      variant: "outline",
    },

    {
      id: 3,
      label: "Save as Draft",
      icon: "Save",
      variant: "secondary",
    },

    {
      id: 4,
      label: "Submit for Approval",
      icon: "Send",
      variant: "primary",
    },

    {
      id: 5,
      label: "Save & Print",
      icon: "Printer",
      variant: "success",
    },
  ],
};
