// src/data/EstateManagementData/landAndLeaseManagementData.js

export const landLeaseManagementData = {
  // =========================================================
  // ESTATE DROPDOWN
  // =========================================================

  // =========================================================
  // LAND / LEASE TYPE
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
  ownershipTypes: [
    {
      id: 1,
      value: "owned",
      label: "Owned",
    },
    {
      id: 2,
      value: "leased_in",
      label: "Leased In",
    },
    {
      id: 3,
      value: "leased_out",
      label: "Leased Out",
    },
    {
      id: 4,
      value: "disputed",
      label: "Disputed",
    },
  ],
  // =========================================================
  // LAND CATEGORY
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
  // MOUZA OPTIONS
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
  // RECORD TYPE
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
  // LAND STATUS
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
  // FILTERS
  // =========================================================

  filters: {
    estate: "",
    landLeaseType: "",
    landCategory: "",
    status: "",
  },

  // =========================================================
  // FILTER CONFIGURATION
  // =========================================================

  filtersConfig: {
    searchPlaceholder: "Search by Land Name / Plot No / Owner...",
    defaultStatus: "All Status",
    defaultLandType: "All Types",
  },

  // =========================================================
  // MAIN LAND / LEASE FORM DEFAULT DATA
  // =========================================================

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
    landStatus: "",
    purpose: "",
    documents: [],
  },

  // =========================================================
  // PAYMENT FORM DEFAULT DATA
  // =========================================================

  paymentFormData: {
    landLeaseId: "",
    year: "",
    dueDate: "",
    amount: "",
    paidAmount: "",
    paymentDate: "",
    status: "",
    paymentMethod: "",
    referenceNo: "",
    remarks: "",
  },

  // =========================================================
  // DOCUMENT FORM DEFAULT DATA
  // =========================================================

  documentFormData: {
    landLeaseId: "",
    documentName: "",
    documentType: "",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
    file: null,
    remarks: "",
  },

  // =========================================================
  // MAIN FORM VALIDATION
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
  // PAYMENT VALIDATION
  // =========================================================

  paymentValidation: {
    year: {
      required: "Payment year is required",
    },

    dueDate: {
      required: "Due date is required",
    },

    amount: {
      required: "Payment amount is required",
    },

    status: {
      required: "Payment status is required",
    },

    paymentMethod: {
      required: "Payment method is required",
    },
  },

  // =========================================================
  // DOCUMENT VALIDATION
  // =========================================================

  documentValidation: {
    documentName: {
      required: "Document name is required",
    },

    documentType: {
      required: "Document type is required",
    },

    file: {
      required: "Document file is required",
    },
  },

  // =========================================================
  // PAYMENT STATUS OPTIONS
  // =========================================================

  paymentStatuses: [
    {
      id: 1,
      value: "Paid",
      label: "Paid",
    },
    {
      id: 2,
      value: "Pending",
      label: "Pending",
    },
    {
      id: 3,
      value: "Overdue",
      label: "Overdue",
    },
  ],

  // =========================================================
  // PAYMENT METHOD OPTIONS
  // =========================================================

  paymentMethods: [
    {
      id: 1,
      value: "Cash",
      label: "Cash",
    },
    {
      id: 2,
      value: "Bank Transfer",
      label: "Bank Transfer",
    },
    {
      id: 3,
      value: "Cheque",
      label: "Cheque",
    },
    {
      id: 4,
      value: "Online Payment",
      label: "Online Payment",
    },
  ],

  // =========================================================
  // DOCUMENT TYPE OPTIONS
  // =========================================================

  documentTypes: [
    {
      id: 1,
      value: "Lease Deed",
      label: "Lease Deed",
    },
    {
      id: 2,
      value: "Khatian",
      label: "Khatian",
    },
    {
      id: 3,
      value: "CS Record",
      label: "CS Record",
    },
    {
      id: 4,
      value: "SA Record",
      label: "SA Record",
    },
    {
      id: 5,
      value: "RS Record",
      label: "RS Record",
    },
    {
      id: 6,
      value: "BS Record",
      label: "BS Record",
    },
    {
      id: 7,
      value: "Map",
      label: "Map / Survey Plan",
    },
    {
      id: 8,
      value: "NOC",
      label: "NOC",
    },
    {
      id: 9,
      value: "Other",
      label: "Other",
    },
  ],

  // =========================================================
  // ACTION BUTTONS
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
  // MAP SETTINGS
  // =========================================================

  mapSettings: {
    center: [25.7456, 89.2741],
    defaultZoom: 14,

    streetUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    satelliteUrl:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

    polygon: {
      color: "#15803d",
      fillColor: "#22c55e",
      fillOpacity: 0.4,
      weight: 2,
    },
  },

  // =========================================================
  // MAP INFORMATION
  // =========================================================

  mapInformation: {
    mapType: "Satellite",
    projection: "WGS84",
    coordinateSystem: "EPSG:4326",
    lastSurvey: "May 2026",
    surveyTeam: "Tea Garden GIS Team",
    accuracy: "±0.50 Meter",
  },

  // =========================================================
  // MAP TOOLS
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
  // LAND BOUNDARY
  // =========================================================

  // =========================================================
  // LAND MARKER
  // =========================================================

  // =========================================================
  // MAP LEGEND
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
  // OWNERSHIP DETAILS
  // =========================================================

  ownershipDetails: [
    {
      id: 1,
      label: "Ownership Status",
    },
    {
      id: 2,
      label: "Land Owner / Lessor",
    },
    {
      id: 3,
      label: "Father's / Company Name",
    },
    {
      id: 4,
      label: "Address",
    },
    {
      id: 5,
      label: "Mobile",
    },
    {
      id: 6,
      label: "Email",
    },
    {
      id: 7,
      label: "NID / TIN",
    },
    {
      id: 8,
      label: "Relation / Remarks",
    },
  ],

  // =========================================================
  // SUMMARY CARDS
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
  // STATISTICS
  // =========================================================

  statistics: {
    totalLand: 5250,
    ownedLand: 4120,
    leasedInLand: 980,
    leasedOutLand: 150,
    disputedLand: 25,
  },

  // =========================================================
  // PAYMENT TABLE HEADERS
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
  // PAYMENT LIST
  // =========================================================

  // =========================================================
  // PAYMENT PAGINATION
  // =========================================================

  paymentPagination: {
    currentPage: 1,
    totalPages: 3,
    totalRecords: 12,
    showingFrom: 1,
    showingTo: 5,
    pageSize: 5,
    pages: [1, 2, 3],
  },

  // =========================================================
  // DOCUMENT TABLE HEADERS
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
  // DOCUMENT LIST
  // =========================================================

  // =========================================================
  // DOCUMENT ACTIONS
  // =========================================================

  documentActions: [
    {
      id: 1,
      label: "View",
      icon: "Eye",
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
  // PAYMENT STATUS CONFIGURATION
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
  // SUMMARY TABLE HEADERS
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
  // LAND / LEASE LIST
  // =========================================================

  // =========================================================
  // ROW ACTIONS
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
  // STATUS BADGE
  // =========================================================

  statusBadge: {
    Active: "green",
    Inactive: "gray",
    "Under Process": "yellow",
    Expired: "red",
  },

  // =========================================================
  // SUMMARY PAGINATION
  // =========================================================

};
