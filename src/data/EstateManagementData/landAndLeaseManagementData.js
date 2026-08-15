// src/data/EstateManagementData/landAndLeaseManagementData.js

export const landLeaseManagementData = {
  // =========================================================
  // Estate Dropdown
  // =========================================================

  estates: [
    {
      id: 1,
      value: "jamuna-tea-estate",
      label: "Jamuna Tea Estate",
    },
    {
      id: 2,
      value: "rupai-tea-estate",
      label: "Rupai Tea Estate",
    },
    {
      id: 3,
      value: "karatoa-tea-estate",
      label: "Karatoa Tea Estate",
    },
    {
      id: 4,
      value: "green-valley-tea-estate",
      label: "Green Valley Tea Estate",
    },
    {
      id: 5,
      value: "surma-tea-estate",
      label: "Surma Tea Estate",
    },
  ],

  // =========================================================
  // Land / Lease Type Options
  // =========================================================

  landLeaseTypes: [
    {
      id: 1,
      value: "leased_in",
      label: "Leased In",
    },
    {
      id: 2,
      value: "leased_out",
      label: "Leased Out",
    },
    {
      id: 3,
      value: "owned",
      label: "Owned",
    },
    {
      id: 4,
      value: "disputed",
      label: "Disputed",
    },
  ],

  // =========================================================
  // Land Category Options
  // =========================================================

  landCategories: [
    {
      id: 1,
      value: "tea_garden_land",
      label: "Tea Garden Land",
    },
    {
      id: 2,
      value: "factory_land",
      label: "Factory Land",
    },
    {
      id: 3,
      value: "office_area",
      label: "Office Area",
    },
    {
      id: 4,
      value: "residential_area",
      label: "Residential Area",
    },
    {
      id: 5,
      value: "water_body",
      label: "Water Body",
    },
    {
      id: 6,
      value: "road",
      label: "Road",
    },
    {
      id: 7,
      value: "nursery",
      label: "Nursery",
    },
  ],

  // =========================================================
  // Mouza Options
  // =========================================================

  mouzas: [
    {
      id: 1,
      value: "madhabpur",
      label: "Madhabpur",
    },
    {
      id: 2,
      value: "shahapur",
      label: "Shahapur",
    },
    {
      id: 3,
      value: "kashimpur",
      label: "Kashimpur",
    },
    {
      id: 4,
      value: "uttarkhan",
      label: "Uttarkhan",
    },
    {
      id: 5,
      value: "rupganj",
      label: "Rupganj",
    },
  ],

  // =========================================================
  // Record Type Options
  // =========================================================

  recordTypes: [
    {
      id: 1,
      value: "cs_record",
      label: "C.S Record",
    },
    {
      id: 2,
      value: "sa_record",
      label: "S.A Record",
    },
    {
      id: 3,
      value: "rs_record",
      label: "R.S Record",
    },
    {
      id: 4,
      value: "bs_record",
      label: "B.S Record",
    },
  ],

  // =========================================================
  // Land Status Options
  // =========================================================

  landStatuses: [
    {
      id: 1,
      value: "active",
      label: "Active",
    },
    {
      id: 2,
      value: "inactive",
      label: "Inactive",
    },
    {
      id: 3,
      value: "under_process",
      label: "Under Process",
    },
    {
      id: 4,
      value: "expired",
      label: "Expired",
    },
  ],

  // =========================================================
  // Default Filter Configuration
  // =========================================================

  filters: {
    estate: "",
    landLeaseType: "",
    landCategory: "",
    status: "",
  },

  // =========================================================
  // Search & Filter Configuration
  // =========================================================

  filtersConfig: {
    searchPlaceholder: "Search by Land Name / Plot No / Owner...",
    defaultStatus: "All Status",
    defaultLandType: "All Types",
  },

  // =========================================================
  // Form Default Structure
  // =========================================================
  // Empty values are intentional.
  // Backend/API data will populate these fields later.

  formData: {
    estate: "",
    landLeaseType: "",
    landCategory: "",
    landLeaseName: "",
    surveyNo: "",
    plotNo: "",
    mouza: "",
    jlNo: "",
    recordType: "",
    totalArea: "",
    usableArea: "",
    nonUsableArea: "",
    location: "",
    gpsArea: "",
    latitude: "",
    longitude: "",
    acquisitionDate: "",
    startDate: "",
    endDate: "",
    leaseTerm: "",
    rentAmount: "",
    rentPerAcre: "",
    purpose: "",
    documents: [],
  },

  // =========================================================
  // React Hook Form Validation
  // =========================================================

  validation: {
    estate: {
      required: "Estate is required",
    },

    landLeaseType: {
      required: "Land / Lease Type is required",
    },

    landCategory: {
      required: "Land Category is required",
    },

    landLeaseName: {
      required: "Land / Lease Name is required",
    },

    surveyNo: {
      required: "Survey / Khatian No is required",
    },

    plotNo: {
      required: "Plot / Dag No is required",
    },

    totalArea: {
      required: "Total Area is required",
    },

    acquisitionDate: {
      required: "Acquisition Date is required",
    },

    startDate: {
      required: "Start Date is required",
    },

    endDate: {
      required: "End Date is required",
    },
  },

  // =========================================================
  // Action Buttons Configuration
  // =========================================================

  actionButtons: [
    {
      id: 1,
      label: "Cancel",
      icon: "X",
      color: "secondary",
      type: "button",
    },
    {
      id: 2,
      label: "Reset",
      icon: "RotateCcw",
      color: "warning",
      type: "reset",
    },
    {
      id: 3,
      label: "Save Land / Lease",
      icon: "Save",
      color: "primary",
      type: "submit",
    },
    {
      id: 4,
      label: "Add Document",
      icon: "Plus",
      color: "primary",
      type: "button",
    },
    {
      id: 5,
      label: "Export",
      icon: "Download",
      color: "secondary",
      type: "button",
    },
  ],

  // =========================================================
  // Map Settings
  // =========================================================

  mapSettings: {
    defaultZoom: 16,
    minZoom: 12,
    maxZoom: 20,
    center: [25.7456, 89.2741],
    tileProvider: "OpenStreetMap",
  },

  // =========================================================
  // Map Information
  // =========================================================

  mapInformation: {
    totalArea: "125.50 Acre",
    perimeter: "2.85 Km",
    latitude: "25.7456",
    longitude: "89.2741",
    mapType: "Satellite",
    projection: "WGS84",
    coordinateSystem: "EPSG:4326",
    lastSurvey: "May 2026",
    surveyTeam: "Tea Garden GIS Team",
    accuracy: "±0.50 Meter",
  },

  // =========================================================
  // Map Toolbar
  // =========================================================

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
      name: "Layers",
      action: "layers",
      icon: "Layers3",
    },
    {
      id: 4,
      name: "Fullscreen",
      action: "fullscreen",
      icon: "Expand",
    },
  ],

  // =========================================================
  // Land Boundary
  // =========================================================

  landBoundary: [
    [25.7474, 89.2719],
    [25.7483, 89.2748],
    [25.7462, 89.2765],
    [25.7434, 89.2754],
    [25.7428, 89.2726],
    [25.7451, 89.2713],
    [25.7474, 89.2719],
  ],

  // =========================================================
  // Land Marker
  // =========================================================

  marker: {
    name: "Madhabpur Lease Land",
    latitude: 25.7456,
    longitude: 89.2741,
  },

  // =========================================================
  // Map Legend
  // =========================================================

  legends: [
    {
      id: 1,
      label: "Selected Land",
      color: "#22c55e",
    },
    {
      id: 2,
      label: "Boundary",
      color: "#ffffff",
    },
  ],

  // =========================================================
  // Ownership Details
  // =========================================================

  ownershipDetails: [
    {
      id: 1,
      label: "Ownership Status",
      value: "Leased In",
    },
    {
      id: 2,
      label: "Land Owner / Lessor",
      value: "Md. Abul Kalam",
    },
    {
      id: 3,
      label: "Father's / Company Name",
      value: "Late Hossain Ali",
    },
    {
      id: 4,
      label: "Address",
      value: "Madhabpur, Rangpur Sadar, Rangpur",
    },
    {
      id: 5,
      label: "Mobile",
      value: "+8801712345678",
    },
    {
      id: 6,
      label: "Email",
      value: "abulkalam@gmail.com",
    },
    {
      id: 7,
      label: "NID / TIN",
      value: "1234567890",
    },
    {
      id: 8,
      label: "Relation / Remarks",
      value: "Long term lease for tea cultivation.",
    },
  ],

  // =========================================================
  // Sidebar Summary Cards
  // =========================================================

  summaryCards: [
    {
      id: 1,
      title: "Land Area",
      value: "5250.00",
      unit: "Acre",
      icon: "Map",
      color: "green",
    },
    {
      id: 2,
      title: "Owned Land",
      value: "4120.00",
      unit: "Acre",
      icon: "Building2",
      color: "green",
    },
    {
      id: 3,
      title: "Leased In Land",
      value: "980.00",
      unit: "Acre",
      icon: "MapPinned",
      color: "blue",
    },
    {
      id: 4,
      title: "Leased Out Land",
      value: "150.00",
      unit: "Acre",
      icon: "ArrowUpRight",
      color: "orange",
    },
    {
      id: 5,
      title: "Disputed Land",
      value: "25.00",
      unit: "Acre",
      icon: "TriangleAlert",
      color: "red",
    },
  ],

  // =========================================================
  // Statistics
  // =========================================================

  statistics: {
    totalLand: 5250,
    ownedLand: 4120,
    leasedInLand: 980,
    leasedOutLand: 150,
    disputedLand: 25,
  },

  // =========================================================
  // Payment Table Headers
  // =========================================================

  paymentTableHeaders: [
    "SL",
    "Payment Year",
    "Due Date",
    "Amount (BDT)",
    "Paid Amount (BDT)",
    "Payment Date",
    "Status",
    "Payment Method",
    "Action",
  ],

  // =========================================================
  // Payment List
  // =========================================================

  paymentList: [
    {
      id: 1,
      year: "2015",
      dueDate: "31/12/2015",
      amount: "150,000.00",
      paidAmount: "150,000.00",
      paymentDate: "15/12/2015",
      status: "Paid",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 2,
      year: "2016",
      dueDate: "31/12/2016",
      amount: "150,000.00",
      paidAmount: "150,000.00",
      paymentDate: "28/12/2016",
      status: "Paid",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 3,
      year: "2017",
      dueDate: "31/12/2017",
      amount: "165,000.00",
      paidAmount: "165,000.00",
      paymentDate: "29/12/2017",
      status: "Paid",
      paymentMethod: "Cheque",
    },
    {
      id: 4,
      year: "2018",
      dueDate: "31/12/2018",
      amount: "165,000.00",
      paidAmount: "165,000.00",
      paymentDate: "30/12/2018",
      status: "Paid",
      paymentMethod: "Cheque",
    },
    {
      id: 5,
      year: "2019",
      dueDate: "31/12/2019",
      amount: "175,000.00",
      paidAmount: "175,000.00",
      paymentDate: "29/12/2019",
      status: "Paid",
      paymentMethod: "Bank Transfer",
    },
  ],

  // =========================================================
  // Payment Pagination
  // =========================================================

  paymentPagination: {
    currentPage: 1,
    totalPages: 4,
    totalRecords: 20,
    showingFrom: 1,
    showingTo: 5,
    pageSize: 5,
  },

  // =========================================================
  // Document Table Headers
  // =========================================================

  documentTableHeaders: [
    "SL",
    "Document Name",
    "Type",
    "File",
    "Uploaded On",
    "Action",
  ],

  // =========================================================
  // Document List
  // =========================================================

  documentList: [
    {
      id: 1,
      documentName: "Lease Deed",
      type: "Lease Deed",
      file: "lease_deed.pdf",
      uploadedOn: "05/01/2024",
    },
    {
      id: 2,
      documentName: "Khatian Copy",
      type: "Khatian",
      file: "khatian_1234.pdf",
      uploadedOn: "05/01/2024",
    },
    {
      id: 3,
      documentName: "CS Record",
      type: "CS Record",
      file: "cs_record.pdf",
      uploadedOn: "05/01/2024",
    },
    {
      id: 4,
      documentName: "Map / Survey Plan",
      type: "Map",
      file: "survey_plan.pdf",
      uploadedOn: "05/01/2024",
    },
    {
      id: 5,
      documentName: "NOC",
      type: "NOC",
      file: "noc.pdf",
      uploadedOn: "05/01/2024",
    },
  ],

  // =========================================================
  // Document Actions
  // =========================================================

  documentActions: [
    {
      id: 1,
      label: "Download",
      icon: "Download",
      color: "blue",
    },
    {
      id: 2,
      label: "Delete",
      icon: "Trash2",
      color: "red",
    },
  ],

  // =========================================================
  // Payment Status Configuration
  // =========================================================

  paymentStatus: [
    {
      value: "Paid",
      color: "green",
    },
    {
      value: "Pending",
      color: "yellow",
    },
    {
      value: "Overdue",
      color: "red",
    },
  ],

  // =========================================================
  // Summary Table Headers
  // =========================================================

  summaryTableHeaders: [
    "SL",
    "Land / Lease Name",
    "Estate",
    "Type",
    "Category",
    "Owner",
    "Area (Acre)",
    "Lease Term",
    "Status",
    "Action",
  ],

  // =========================================================
  // Land / Lease List
  // =========================================================

  landLeaseList: [
    {
      id: 1,
      landName: "Madhabpur Lease Land",
      estate: "Jamuna Tea Estate",
      type: "Leased In",
      category: "Tea Garden Land",
      owner: "Md. Abul Kalam",
      area: 125.5,
      leaseTerm: "20 Years",
      status: "Active",
    },
    {
      id: 2,
      landName: "Factory Expansion Area",
      estate: "Jamuna Tea Estate",
      type: "Owned",
      category: "Factory Land",
      owner: "Jamuna Tea Company",
      area: 32.75,
      leaseTerm: "-",
      status: "Active",
    },
    {
      id: 3,
      landName: "North Nursery",
      estate: "Rupai Tea Estate",
      type: "Owned",
      category: "Nursery",
      owner: "Rupai Tea Estate",
      area: 18.5,
      leaseTerm: "-",
      status: "Active",
    },
    {
      id: 4,
      landName: "West Residential Zone",
      estate: "Karatoa Tea Estate",
      type: "Leased Out",
      category: "Residential Area",
      owner: "ABC Housing Ltd.",
      area: 14.25,
      leaseTerm: "10 Years",
      status: "Inactive",
    },
    {
      id: 5,
      landName: "South Water Body",
      estate: "Green Valley Tea Estate",
      type: "Owned",
      category: "Water Body",
      owner: "Green Valley Tea Estate",
      area: 8.9,
      leaseTerm: "-",
      status: "Active",
    },
    {
      id: 6,
      landName: "Office Complex",
      estate: "Surma Tea Estate",
      type: "Owned",
      category: "Office Area",
      owner: "Surma Tea Estate",
      area: 12.4,
      leaseTerm: "-",
      status: "Active",
    },
    {
      id: 7,
      landName: "Road Side Plot",
      estate: "Jamuna Tea Estate",
      type: "Disputed",
      category: "Road",
      owner: "Government",
      area: 6.2,
      leaseTerm: "-",
      status: "Under Process",
    },
    {
      id: 8,
      landName: "Extension Zone",
      estate: "Rupai Tea Estate",
      type: "Leased In",
      category: "Tea Garden Land",
      owner: "Md. Harun",
      area: 45.8,
      leaseTerm: "15 Years",
      status: "Active",
    },
    {
      id: 9,
      landName: "Warehouse Area",
      estate: "Karatoa Tea Estate",
      type: "Owned",
      category: "Factory Land",
      owner: "Karatoa Tea Estate",
      area: 22.3,
      leaseTerm: "-",
      status: "Active",
    },
    {
      id: 10,
      landName: "Worker Colony",
      estate: "Surma Tea Estate",
      type: "Leased Out",
      category: "Residential Area",
      owner: "Tea Workers Association",
      area: 15.75,
      leaseTerm: "25 Years",
      status: "Active",
    },
  ],

  // =========================================================
  // Row Actions
  // =========================================================

  rowActions: [
    {
      id: 1,
      label: "View",
      icon: "Eye",
      color: "blue",
    },
    {
      id: 2,
      label: "Edit",
      icon: "Pencil",
      color: "amber",
    },
    {
      id: 3,
      label: "Delete",
      icon: "Trash2",
      color: "red",
    },
  ],

  // =========================================================
  // Status Badge Configuration
  // =========================================================

  statusBadge: {
    Active: "green",
    Inactive: "gray",
    "Under Process": "yellow",
    Expired: "red",
  },

  // =========================================================
  // Summary Pagination
  // =========================================================

  summaryPagination: {
    currentPage: 1,
    totalPages: 5,
    totalRecords: 50,
    showingFrom: 1,
    showingTo: 10,
    pageSize: 10,

    pages: [1, 2, 3, 4, 5],
  },
};
