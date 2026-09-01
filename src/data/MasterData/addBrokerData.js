export const addNewBrokerData = {
  // =========================================================
  // PAGE INFORMATION
  // =========================================================

  page: {
    title: "Add New Tea Broker",
    breadcrumb: ["Master Data", "Tea Brokers", "Add New"],
  },

  // =========================================================
  // BROKER INFORMATION
  // =========================================================

  brokerInformation: {
    title: "Broker Information",
    auctionCenterOptions: [
      {
        id: 1,
        code: "CTG",
        name: "Chattogram Tea Auction Centre",
      },
      {
        id: 2,
        code: "SRM",
        name: "Sreemangal Tea Auction Centre",
      },
      {
        id: 3,
        code: "PGR",
        name: "Panchagarh Tea Auction Centre",
      },
    ],

    associationOptions: [
      {
        id: 1,
        code: "TTAB",
        name: "Tea Traders Association of Bangladesh (TTAB)",
      },
    ],
    commission: {
      label: "Commission (%)",
      name: "commission",
      type: "number",
      placeholder: "Enter commission",
      required: true,
    },

    status: {
      label: "Status",
      name: "status",
      type: "select",
      placeholder: "Select Status",
      required: true,

      options: [
        {
          id: 1,
          code: "active",
          name: "Active",
        },
        {
          id: 2,
          code: "inactive",
          name: "Inactive",
        },
      ],
    },
    address: {
      label: "Address",
      name: "address",
      type: "textarea",
      placeholder: "Enter address",
      required: true,
    },
    remarksField: {
      id: "remarks",
      name: "remarks",
      label: "Remarks",
      placeholder: "Enter remarks...",
      type: "textarea",
      required: false,
      rows: 3,
    },

    fields: [
      {
        id: "brokerCode",
        name: "brokerCode",
        label: "Broker Code",
        type: "text",
        placeholder: "Enter broker code",
        required: true,
      },

      {
        id: "brokerName",
        name: "brokerName",
        label: "Broker Name",
        type: "text",
        placeholder: "Enter broker name",
        required: true,
      },

      {
        id: "licenseNo",
        name: "licenseNo",
        label: "License No.",
        type: "text",
        placeholder: "Enter license number",
        required: true,
      },

      {
        id: "contactPersonName",
        name: "contactPersonName",
        label: "Contact Person Name",
        type: "text",
        placeholder: "Enter contact person name",
        required: true,
      },

      {
        id: "designation",
        name: "designation",
        label: "Designation",
        type: "select",
        placeholder: "Select designation",
        required: true,
      },

      {
        id: "phone",
        name: "phone",
        label: "Phone (Landline)",
        type: "tel",
        placeholder: "Enter landline number",
        required: false,
      },
    ],

    designationOptions: [
      {
        id: 1,
        code: "PROPRIETOR",
        name: "Proprietor",
      },

      {
        id: 2,
        code: "MANAGER",
        name: "Manager",
      },

      {
        id: 3,
        code: "ACCOUNTS_OFFICER",
        name: "Accounts Officer",
      },

      {
        id: 4,
        code: "MARKETING_EXECUTIVE",
        name: "Marketing Executive",
      },
    ],
  },

  // =========================================================
  // MOBILE NUMBERS
  // =========================================================

  mobileNumbers: {
    title: "Mobile Numbers",

    required: true,

    addAction: {
      label: "Add Another Mobile Number",
    },

    columns: [
      {
        key: "sl",
        label: "SL",
      },

      {
        key: "mobileNumber",
        label: "Mobile Number",
      },

      {
        key: "contactPersonName",
        label: "Contact Person Name",
      },

      {
        key: "designation",
        label: "Designation",
      },

      {
        key: "type",
        label: "Type",
      },

      {
        key: "isPrimary",
        label: "Primary",
      },

      {
        key: "action",
        label: "Action",
      },
    ],

    rows: [
      {
        id: 1,
        mobileNumber: "01711-123456",
        contactPersonName: "Md. Anisur Rahman",
        designation: "PROPRIETOR",
        type: "PRIMARY",
        isPrimary: true,
      },

      {
        id: 2,
        mobileNumber: "01819-123456",
        contactPersonName: "Aminul Islam",
        designation: "MANAGER",
        type: "SECONDARY",
        isPrimary: false,
      },

      {
        id: 3,
        mobileNumber: "01912-345678",
        contactPersonName: "Kamal Hossain",
        designation: "ACCOUNTS_OFFICER",
        type: "WHATSAPP",
        isPrimary: false,
      },

      {
        id: 4,
        mobileNumber: "01617-987654",
        contactPersonName: "Rashedul Karim",
        designation: "MARKETING_EXECUTIVE",
        type: "OTHER",
        isPrimary: false,
      },
    ],

    designationOptions: [
      {
        id: 1,
        code: "PROPRIETOR",
        name: "Proprietor",
      },

      {
        id: 2,
        code: "MANAGER",
        name: "Manager",
      },

      {
        id: 3,
        code: "ACCOUNTS_OFFICER",
        name: "Accounts Officer",
      },

      {
        id: 4,
        code: "MARKETING_EXECUTIVE",
        name: "Marketing Executive",
      },
    ],

    typeOptions: [
      {
        id: 1,
        code: "PRIMARY",
        name: "Primary",
      },

      {
        id: 2,
        code: "SECONDARY",
        name: "Secondary",
      },

      {
        id: 3,
        code: "WHATSAPP",
        name: "WhatsApp",
      },

      {
        id: 4,
        code: "OTHER",
        name: "Other",
      },
    ],
  },

  // =========================================================
  // ADDITIONAL BROKER DETAILS
  // =========================================================

  additionalInformation: {
    fields: [
      {
        id: "email",
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email address",
        required: false,
      },

      {
        id: "tinNo",
        name: "tinNo",
        label: "TIN No.",
        type: "text",
        placeholder: "Enter TIN number",
        required: false,
      },

      {
        id: "commission",
        name: "commission",
        label: "Commission (%)",
        type: "number",
        placeholder: "Enter commission",
        required: true,
        suffix: "%",
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
        id: "address",
        name: "address",
        label: "Address",
        type: "textarea",
        placeholder: "Enter address",
        required: true,
      },

      {
        id: "remarks",
        name: "remarks",
        label: "Remarks",
        type: "textarea",
        placeholder: "Enter remarks...",
        required: false,
      },
    ],
  },

  // =========================================================
  // AUCTION CENTERS
  // =========================================================

  auctionCenters: {
    title: "Auction Center(s)",

    required: true,

    availableCenters: [
      {
        id: 1,
        code: "CTG",
        name: "Chattogram Tea Auction Centre",
        status: "ACTIVE",
      },

      {
        id: 2,
        code: "SREEMANGAL",
        name: "Sreemangal Tea Auction Centre",
        status: "ACTIVE",
      },

      {
        id: 3,
        code: "PANCHAGARH",
        name: "Panchagarh Tea Auction Centre",
        status: "ACTIVE",
      },
    ],

    selectedCenters: [
      {
        id: 1,
        code: "CTG",
        name: "Chattogram Tea Auction Centre",
        status: "ACTIVE",
      },

      {
        id: 2,
        code: "SREEMANGAL",
        name: "Sreemangal Tea Auction Centre",
        status: "ACTIVE",
      },

      {
        id: 3,
        code: "PANCHAGARH",
        name: "Panchagarh Tea Auction Centre",
        status: "ACTIVE",
      },
    ],
  },

  // =========================================================
  // ASSOCIATION
  // =========================================================

  associations: {
    title: "Association",

    required: true,

    options: [
      {
        id: 1,
        code: "TTAB",
        name: "Tea Traders Association of Bangladesh (TTAB)",
      },

      {
        id: 2,
        code: "OTHER",
        name: "Other Association",
      },
    ],
  },

  // =========================================================
  // STATUS
  // =========================================================

  statusOptions: [
    {
      id: 1,
      code: "ACTIVE",
      name: "Active",
    },

    {
      id: 2,
      code: "INACTIVE",
      name: "Inactive",
    },
  ],

  // =========================================================
  // BROKER SUMMARY
  // =========================================================

  brokerSummary: {
    title: "Broker Summary",

    items: [
      {
        key: "brokerCode",
        label: "Broker Code",
      },

      {
        key: "brokerName",
        label: "Broker Name",
      },

      {
        key: "licenseNo",
        label: "License No.",
      },

      {
        key: "contactPerson",
        label: "Contact Person",
      },

      {
        key: "phone",
        label: "Phone (Landline)",
      },

      {
        key: "mobileNumbers",
        label: "Mobile Numbers",
      },

      {
        key: "email",
        label: "Email",
      },

      {
        key: "auctionCenters",
        label: "Auction Center(s)",
      },

      {
        key: "association",
        label: "Association",
      },

      {
        key: "commission",
        label: "Commission (%)",
      },

      {
        key: "status",
        label: "Status",
      },

      {
        key: "createdBy",
        label: "Created By",
      },

      {
        key: "createdOn",
        label: "Created On",
      },
    ],
  },

  // =========================================================
  // CURRENT / PREVIEW DATA
  // =========================================================

  previewData: {
    brokerCode: "BRK-010",
    brokerName: "ABC Tea Brokers",
    licenseNo: "BRK/2026/010",

    contactPerson: "Md. Anisur Rahman (Proprietor)",

    phone: "01711-123456",

    mobileNumbers: "4 (1 Primary, 3 Others)",

    email: "abc.teabrokers@gmail.com",

    auctionCenters: "3 Center(s)",

    association: "Tea Traders Association of Bangladesh (TTAB)",

    commission: "2.50%",

    status: "Active",

    createdBy: "Md. Faruk Hossain",

    createdOn: "06/06/2026 10:15 AM",
  },

  // =========================================================
  // FORM ACTIONS
  // =========================================================

  actions: {
    cancel: {
      label: "Cancel",
    },

    save: {
      label: "Save Broker",
    },
  },

  // =========================================================
  // FORM NOTES
  // =========================================================

  notes: {
    mandatory: "* Fields are mandatory",
  },
};
