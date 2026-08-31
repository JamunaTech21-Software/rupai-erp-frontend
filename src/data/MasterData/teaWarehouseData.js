const teaWarehouseData = {
  // =========================================================
  // PAGE INFORMATION
  // =========================================================

  page: {
    title: "Add New Warehouse",
    breadcrumb: ["Master Data", "Warehouse", "Add New Warehouse"],
  },

  // =========================================================
  // FORM CONFIGURATION
  // =========================================================

  form: {
    title: "Warehouse Information",

    fields: [
      {
        name: "warehouseCode",
        label: "Warehouse Code",
        type: "text",
        required: true,
        placeholder: "Enter warehouse code",
      },

      {
        name: "warehouseName",
        label: "Warehouse Name",
        type: "text",
        required: true,
        placeholder: "Enter warehouse name",
      },

      {
        name: "shortName",
        label: "Short Name",
        type: "text",
        required: false,
        placeholder: "Enter short name",
      },

      {
        name: "location",
        label: "Location / Address",
        type: "textarea",
        required: true,
        placeholder: "Enter warehouse location or address",
        maxLength: 250,
        fullWidth: true,
      },

      {
        name: "warehouseType",
        label: "Warehouse Type",
        type: "select",
        required: true,
        placeholder: "Select warehouse type",
        options: [
          {
            value: "main",
            label: "Main Warehouse",
          },
          {
            value: "factory",
            label: "Factory Warehouse",
          },
          {
            value: "raw_material",
            label: "Raw Material Warehouse",
          },
          {
            value: "finished_goods",
            label: "Finished Goods Warehouse",
          },
          {
            value: "temporary",
            label: "Temporary Warehouse",
          },
        ],
      },

      {
        name: "capacity",
        label: "Capacity (MT)",
        type: "number",
        required: false,
        placeholder: "Enter capacity",
      },

      {
        name: "inChargePerson",
        label: "In-Charge Person",
        type: "text",
        required: true,
        placeholder: "Enter in-charge person",
      },
    ],
  },

  // =========================================================
  // PHONE INFORMATION
  // =========================================================

  phoneSection: {
    title: "Phone Number",

    fields: [
      {
        name: "officePhone",
        label: "Landline / Office Phone",
        type: "text",
        required: false,
        placeholder: "Enter office phone",
      },
    ],
  },

  // =========================================================
  // MOBILE CONTACT SECTION
  // =========================================================

  mobileContacts: {
    title: "Mobile Numbers & Contact Persons",

    note: "You can add multiple mobile numbers with contact persons and their designations.",

    tableHeaders: [
      {
        key: "sl",
        label: "SL",
      },
      {
        key: "number",
        label: "Mobile Number",
      },
      {
        key: "contactPerson",
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
        key: "primary",
        label: "Primary",
      },
      {
        key: "action",
        label: "Action",
      },
    ],

    typeOptions: [
      {
        value: "primary",
        label: "Primary",
      },
      {
        value: "secondary",
        label: "Secondary",
      },
      {
        value: "whatsapp",
        label: "WhatsApp",
      },
      {
        value: "office",
        label: "Office",
      },
      {
        value: "other",
        label: "Other",
      },
    ],

    // =======================================================
    // FAKE EXISTING CONTACT DATA
    // =======================================================

    data: [
      {
        id: 1,
        sl: 1,
        number: "+880-1711-123456",
        contactPerson: "Mr. Sohel Rana",
        designation: "Warehouse Manager",
        type: "primary",
        primary: true,
      },

      {
        id: 2,
        sl: 2,
        number: "+880-1819-654321",
        contactPerson: "Mr. Rahim Uddin",
        designation: "Asst. Warehouse Manager",
        type: "secondary",
        primary: false,
      },

      {
        id: 3,
        sl: 3,
        number: "+880-1912-345678",
        contactPerson: "Mr. Karim Ali",
        designation: "Store In-Charge",
        type: "whatsapp",
        primary: false,
      },

      {
        id: 4,
        sl: 4,
        number: "+880-1733-987654",
        contactPerson: "Mr. Imran Hossain",
        designation: "Store Keeper",
        type: "office",
        primary: false,
      },

      {
        id: 5,
        sl: 5,
        number: "+880-1622-112233",
        contactPerson: "Mr. Shakil Ahmed",
        designation: "Helper Supervisor",
        type: "other",
        primary: false,
      },
    ],

    addButton: "Add Another Mobile Number",
  },

  // =========================================================
  // FORM FOOTER
  // =========================================================

  footer: {
    mandatoryText: "* Fields are mandatory",

    cancelButton: "Cancel",

    submitButton: "Save Warehouse",
  },

  // =========================================================
  // WAREHOUSE SUMMARY
  // =========================================================

  summary: {
    title: "Warehouse Summary",

    fields: [
      {
        key: "warehouseCode",
        label: "Warehouse Code",
      },

      {
        key: "warehouseName",
        label: "Warehouse Name",
      },

      {
        key: "shortName",
        label: "Short Name",
      },

      {
        key: "location",
        label: "Location / Address",
      },

      {
        key: "warehouseType",
        label: "Warehouse Type",
      },

      {
        key: "capacity",
        label: "Capacity (MT)",
      },

      {
        key: "inChargePerson",
        label: "In-Charge Person",
      },

      {
        key: "officePhone",
        label: "Landline / Phone",
      },

      {
        key: "totalMobileNumbers",
        label: "Total Mobile Numbers",
      },

      {
        key: "primaryContact",
        label: "Primary Contact",
      },

      {
        key: "createdBy",
        label: "Created By",
      },

      {
        key: "createdOn",
        label: "Created On",
      },

      {
        key: "status",
        label: "Status",
      },
    ],
  },

  // =========================================================
  // FAKE SUMMARY DATA
  // =========================================================

  summaryData: {
    warehouseCode: "WH-001",

    warehouseName: "Main Warehouse",

    shortName: "MAIN WH",

    location: "63, Motijheel C/A, Dhaka-1000, Bangladesh",

    warehouseType: "Main Warehouse",

    capacity: "5000 MT",

    inChargePerson: "Mr. Sohel Rana",

    officePhone: "+880-2-9556789",

    totalMobileNumbers: 5,

    primaryContact: "Mr. Sohel Rana (+880-1711-123456)",

    createdBy: "Md. Faruk Hossain",

    createdOn: "29/05/2026 11:25 AM",

    status: "Active",
  },

  // =========================================================
  // STATUS OPTIONS
  // =========================================================

  statusOptions: [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "inactive",
      label: "Inactive",
    },
  ],

  // =========================================================
  // ACTION LABELS
  // =========================================================

  actions: {
    add: "Add Another Mobile Number",
    delete: "Delete",
    edit: "Edit",
    cancel: "Cancel",
    save: "Save Warehouse",
  },
};

export default teaWarehouseData;
