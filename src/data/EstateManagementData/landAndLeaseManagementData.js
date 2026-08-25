// src/data/EstateManagementData/landAndLeaseManagementData.js

export const landLeaseManagementData = {
  // =========================================================
  // ESTATE DROPDOWN
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
  // LAND MARKER
  // =========================================================

  marker: {
    name: "Madhabpur Lease Land",
    latitude: 25.7456,
    longitude: 89.2741,
  },

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

  paymentList: [
    {
      id: 1,
      landLeaseId: 1,
      year: "2015",
      dueDate: "31/12/2015",
      amount: "150,000.00",
      paidAmount: "150,000.00",
      paymentDate: "15/12/2015",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      referenceNo: "REC-2015-001",
      remarks: "Annual lease payment",
    },
    {
      id: 2,
      landLeaseId: 1,
      year: "2016",
      dueDate: "31/12/2016",
      amount: "150,000.00",
      paidAmount: "150,000.00",
      paymentDate: "28/12/2016",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      referenceNo: "REC-2016-001",
      remarks: "Annual lease payment",
    },
    {
      id: 3,
      landLeaseId: 1,
      year: "2017",
      dueDate: "31/12/2017",
      amount: "165,000.00",
      paidAmount: "165,000.00",
      paymentDate: "29/12/2017",
      status: "Paid",
      paymentMethod: "Cheque",
      referenceNo: "CHQ-2017-001",
      remarks: "Annual lease payment",
    },
    {
      id: 4,
      landLeaseId: 1,
      year: "2018",
      dueDate: "31/12/2018",
      amount: "165,000.00",
      paidAmount: "165,000.00",
      paymentDate: "30/12/2018",
      status: "Paid",
      paymentMethod: "Cheque",
      referenceNo: "CHQ-2018-001",
      remarks: "Annual lease payment",
    },
    {
      id: 5,
      landLeaseId: 1,
      year: "2019",
      dueDate: "31/12/2019",
      amount: "175,000.00",
      paidAmount: "175,000.00",
      paymentDate: "29/12/2019",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      referenceNo: "REC-2019-001",
      remarks: "Annual lease payment",
    },
    {
      id: 6,
      landLeaseId: 1,
      year: "2020",
      dueDate: "31/12/2020",
      amount: "175,000.00",
      paidAmount: "175,000.00",
      paymentDate: "28/12/2020",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      referenceNo: "REC-2020-001",
      remarks: "Annual lease payment",
    },
    {
      id: 7,
      landLeaseId: 1,
      year: "2021",
      dueDate: "31/12/2021",
      amount: "185,000.00",
      paidAmount: "185,000.00",
      paymentDate: "27/12/2021",
      status: "Paid",
      paymentMethod: "Online Payment",
      referenceNo: "PAY-2021-001",
      remarks: "Annual lease payment",
    },
    {
      id: 8,
      landLeaseId: 1,
      year: "2022",
      dueDate: "31/12/2022",
      amount: "185,000.00",
      paidAmount: "185,000.00",
      paymentDate: "29/12/2022",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      referenceNo: "REC-2022-001",
      remarks: "Annual lease payment",
    },
    {
      id: 9,
      landLeaseId: 1,
      year: "2023",
      dueDate: "31/12/2023",
      amount: "195,000.00",
      paidAmount: "195,000.00",
      paymentDate: "28/12/2023",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      referenceNo: "REC-2023-001",
      remarks: "Annual lease payment",
    },
    {
      id: 10,
      landLeaseId: 1,
      year: "2024",
      dueDate: "31/12/2024",
      amount: "195,000.00",
      paidAmount: "0.00",
      paymentDate: "-",
      status: "Pending",
      paymentMethod: "-",
      referenceNo: "",
      remarks: "Payment pending",
    },
    {
      id: 11,
      landLeaseId: 1,
      year: "2025",
      dueDate: "31/12/2025",
      amount: "210,000.00",
      paidAmount: "0.00",
      paymentDate: "-",
      status: "Overdue",
      paymentMethod: "-",
      referenceNo: "",
      remarks: "Payment overdue",
    },
    {
      id: 12,
      landLeaseId: 1,
      year: "2026",
      dueDate: "31/12/2026",
      amount: "220,000.00",
      paidAmount: "0.00",
      paymentDate: "-",
      status: "Pending",
      paymentMethod: "-",
      referenceNo: "",
      remarks: "Current year payment",
    },
  ],

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

  documentList: [
    {
      id: 1,
      landLeaseId: 1,
      documentName: "Lease Deed",
      type: "Lease Deed",
      documentNumber: "LD-2024-001",
      issueDate: "01/01/2024",
      expiryDate: "31/12/2043",
      file: "lease_deed.pdf",
      uploadedOn: "05/01/2024",
      remarks: "Original lease deed",
    },
    {
      id: 2,
      landLeaseId: 1,
      documentName: "Khatian Copy",
      type: "Khatian",
      documentNumber: "KH-1234",
      issueDate: "10/01/2024",
      expiryDate: "",
      file: "khatian_1234.pdf",
      uploadedOn: "05/01/2024",
      remarks: "Certified khatian copy",
    },
    {
      id: 3,
      landLeaseId: 1,
      documentName: "CS Record",
      type: "CS Record",
      documentNumber: "CS-5678",
      issueDate: "15/01/2024",
      expiryDate: "",
      file: "cs_record.pdf",
      uploadedOn: "05/01/2024",
      remarks: "C.S record document",
    },
    {
      id: 4,
      landLeaseId: 1,
      documentName: "Map / Survey Plan",
      type: "Map",
      documentNumber: "MAP-2024-001",
      issueDate: "20/01/2024",
      expiryDate: "",
      file: "survey_plan.pdf",
      uploadedOn: "05/01/2024",
      remarks: "Latest survey plan",
    },
    {
      id: 5,
      landLeaseId: 1,
      documentName: "NOC",
      type: "NOC",
      documentNumber: "NOC-2024-001",
      issueDate: "25/01/2024",
      expiryDate: "25/01/2027",
      file: "noc.pdf",
      uploadedOn: "05/01/2024",
      remarks: "No objection certificate",
    },
    {
      id: 6,
      landLeaseId: 1,
      documentName: "SA Record",
      type: "SA Record",
      documentNumber: "SA-2024-001",
      issueDate: "28/01/2024",
      expiryDate: "",
      file: "sa_record.pdf",
      uploadedOn: "06/01/2024",
      remarks: "S.A record copy",
    },
    {
      id: 7,
      landLeaseId: 1,
      documentName: "RS Record",
      type: "RS Record",
      documentNumber: "RS-2024-001",
      issueDate: "30/01/2024",
      expiryDate: "",
      file: "rs_record.pdf",
      uploadedOn: "06/01/2024",
      remarks: "R.S record copy",
    },
    {
      id: 8,
      landLeaseId: 1,
      documentName: "BS Record",
      type: "BS Record",
      documentNumber: "BS-2024-001",
      issueDate: "02/02/2024",
      expiryDate: "",
      file: "bs_record.pdf",
      uploadedOn: "06/01/2024",
      remarks: "B.S record copy",
    },
  ],

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
