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

    image: "/field-map-img.webp",

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

    stats: [
      {
        id: 1,
        title: "Area Completed",
        color: "bg-green-600",
      },
      {
        id: 2,
        title: "Plants Planted",
        color: "bg-green-600",
      },
      {
        id: 3,
        title: "Remaining Area",
        color: "bg-sky-500",
      },
      {
        id: 4,
        title: "Remaining Plants",
        color: "bg-green-700",
      },
    ],
  },
  // ==========================================
  // Quick Summary
  // ==========================================

  quickSummary: [
    {
      id: 1,
      title: "Total Area (Acre)",
      icon: "Map",
    },
    {
      id: 2,
      title: "Expected Plants",
      icon: "Leaf",
    },
    {
      id: 3,
      title: "Target Plants",
      icon: "Target",
    },
    {
      id: 4,
      title: "Today's Progress",
      icon: "TrendingUp",
    },
    {
      id: 5,
      title: "Plants Planted",
      icon: "Sprout",
    },
    {
      id: 6,
      title: "Completion %",
      icon: "CirclePercent",
    },
  ],

  // ==========================================
  // Plantation Summary (Left Sidebar)
  // ==========================================

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

  // ==========================================
  // Table Footer
  // ==========================================

  // ==========================================
  // Pagination
  // ==========================================

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
