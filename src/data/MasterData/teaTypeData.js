// =========================================================
// TEA TYPE MASTER DATA
// Backend/API friendly structure
// =========================================================

export const teaTypeData = {
  // =======================================================
  // PAGE CONFIGURATION
  // =======================================================

  pageConfig: {
    title: "Add New Tea Type",
    breadcrumb: ["Master Data", "Tea Type", "Add New"],
    formTitle: "Tea Type Information",
    listTitle: "Tea Type List",
    addButtonLabel: "Add New Tea Type",
    saveButtonLabel: "Save Tea Type",
    cancelButtonLabel: "Cancel",
    mandatoryNote: "* Fields are mandatory",
  },

  // =======================================================
  // TEA TYPE FORM
  // =======================================================

  teaTypeForm: {
    teaTypeCode: "",
    teaTypeName: "",
    shortName: "",
    processingMethod: "",
    description: "",
    applicableFor: [],
    status: "Active",
    remarks: "",
  },

  // =======================================================
  // FORM FIELD CONFIGURATION
  // Useful for future dynamic form mapping
  // =======================================================

  formFields: [
    {
      id: "teaTypeCode",
      name: "teaTypeCode",
      label: "Tea Type Code",
      type: "text",
      placeholder: "Enter tea type code",
      required: true,
      maxLength: 50,
    },

    {
      id: "teaTypeName",
      name: "teaTypeName",
      label: "Tea Type Name",
      type: "text",
      placeholder: "Enter tea type name",
      required: true,
      maxLength: 100,
    },

    {
      id: "shortName",
      name: "shortName",
      label: "Short Name",
      type: "text",
      placeholder: "Enter short name",
      required: false,
      maxLength: 50,
    },

    {
      id: "processingMethod",
      name: "processingMethod",
      label: "Processing Method",
      type: "select",
      placeholder: "Select processing method",
      required: true,
    },

    {
      id: "description",
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description...",
      required: false,
      maxLength: 250,
    },

    {
      id: "applicableFor",
      name: "applicableFor",
      label: "Applicable For",
      type: "checkbox",
      required: true,
    },

    {
      id: "status",
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      required: true,
    },

    {
      id: "remarks",
      name: "remarks",
      label: "Remarks",
      type: "textarea",
      placeholder: "Enter remarks...",
      required: false,
      maxLength: 250,
    },
  ],

  // =======================================================
  // PROCESSING METHOD OPTIONS
  // =======================================================

  processingMethodOptions: [
    {
      value: "CTC",
      label: "CTC (Crush, Tear, Curl)",
      description: "CTC tea processing method",
    },

    {
      value: "ORTHODOX",
      label: "Orthodox",
      description: "Traditional orthodox tea processing",
    },

    {
      value: "GREEN",
      label: "Green Tea Processing",
      description: "Green tea processing method",
    },

    {
      value: "WHITE",
      label: "White Tea Processing",
      description: "White tea processing method",
    },

    {
      value: "OOLONG",
      label: "Oolong Processing",
      description: "Oolong tea processing method",
    },

    {
      value: "OTHER",
      label: "Other Processing",
      description: "Other tea processing methods",
    },
  ],

  // =======================================================
  // APPLICABLE FOR OPTIONS
  // =======================================================

  applicableForOptions: [
    {
      value: "PRODUCTION",
      label: "Production",
      description: "Available for production",
    },

    {
      value: "AUCTION_SALE",
      label: "Auction / Sale",
      description: "Available for auction or sale",
    },
  ],

  // =======================================================
  // STATUS OPTIONS
  // =======================================================

  statusOptions: [
    {
      value: "ACTIVE",
      label: "Active",
    },

    {
      value: "INACTIVE",
      label: "Inactive",
    },
  ],

  // =======================================================
  // TABLE HEADERS
  // =======================================================

  teaTypeTableHeaders: [
    {
      key: "sl",
      label: "SL",
      align: "left",
    },

    {
      key: "code",
      label: "Code",
      align: "left",
    },

    {
      key: "teaTypeName",
      label: "Tea Type Name",
      align: "left",
    },

    {
      key: "shortName",
      label: "Short Name",
      align: "left",
    },

    {
      key: "processingMethod",
      label: "Processing Method",
      align: "left",
    },

    {
      key: "status",
      label: "Status",
      align: "left",
    },

    {
      key: "action",
      label: "Action",
      align: "center",
    },
  ],

  // =======================================================
  // TEA TYPE LIST
  // =======================================================

  teaTypeList: [
    {
      id: 1,
      code: "CTC",
      teaTypeName: "CTC Tea",
      shortName: "CTC",
      processingMethod: "CTC (Crush, Tear, Curl)",
      processingMethodCode: "CTC",

      applicableFor: ["PRODUCTION", "AUCTION_SALE"],

      status: "ACTIVE",

      description: "CTC (Crush, Tear, Curl) processed tea.",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:00:00",
      updatedAt: "2026-06-01T10:00:00",
    },

    {
      id: 2,
      code: "ORTH",
      teaTypeName: "Orthodox Tea",
      shortName: "ORTH",
      processingMethod: "Orthodox",
      processingMethodCode: "ORTHODOX",

      applicableFor: ["PRODUCTION", "AUCTION_SALE"],

      status: "ACTIVE",

      description: "Traditionally processed orthodox tea.",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:05:00",
      updatedAt: "2026-06-01T10:05:00",
    },

    {
      id: 3,
      code: "GREEN",
      teaTypeName: "Green Tea",
      shortName: "GREEN",
      processingMethod: "Green Tea Processing",
      processingMethodCode: "GREEN",

      applicableFor: ["PRODUCTION", "AUCTION_SALE"],

      status: "ACTIVE",

      description: "Green tea processed with minimal oxidation.",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:10:00",
      updatedAt: "2026-06-01T10:10:00",
    },

    {
      id: 4,
      code: "WHITE",
      teaTypeName: "White Tea",
      shortName: "WHITE",
      processingMethod: "White Tea Processing",
      processingMethodCode: "WHITE",

      applicableFor: ["PRODUCTION", "AUCTION_SALE"],

      status: "ACTIVE",

      description: "Delicately processed white tea.",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:15:00",
      updatedAt: "2026-06-01T10:15:00",
    },

    {
      id: 5,
      code: "OOLONG",
      teaTypeName: "Oolong Tea",
      shortName: "OOLONG",
      processingMethod: "Oolong Processing",
      processingMethodCode: "OOLONG",

      applicableFor: ["PRODUCTION", "AUCTION_SALE"],

      status: "ACTIVE",

      description: "Partially oxidized oolong tea.",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:20:00",
      updatedAt: "2026-06-01T10:20:00",
    },

    {
      id: 6,
      code: "OTHER",
      teaTypeName: "Other",
      shortName: "OTHER",
      processingMethod: "Other Processing",
      processingMethodCode: "OTHER",

      applicableFor: ["PRODUCTION", "AUCTION_SALE"],

      status: "ACTIVE",

      description: "Other tea types and processing methods.",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:25:00",
      updatedAt: "2026-06-01T10:25:00",
    },
  ],

  // =======================================================
  // PAGINATION
  // =======================================================

  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalEntries: 6,
    showingFrom: 1,
    showingTo: 6,
  },

  // =======================================================
  // EMPTY FORM
  // Used when clicking "Add New Tea Type"
  // =======================================================

  emptyTeaTypeForm: {
    teaTypeCode: "",
    teaTypeName: "",
    shortName: "",
    processingMethod: "",
    description: "",
    applicableFor: [],
    status: "ACTIVE",
    remarks: "",
  },
};
