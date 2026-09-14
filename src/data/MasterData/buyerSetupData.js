// =========================================================
// BUYER SETUP MASTER DATA
// Backend / API Friendly + Dynamic UI Configuration
// =========================================================

export const buyerSetupData = {
  // =======================================================
  // PAGE CONFIG
  // =======================================================

  pageConfig: {
    title: "Buyer Setup",

    breadcrumb: ["Sales & Accounts", "Settings", "Buyer Setup"],

    formTitle: "Add / Edit Buyer",

    listTitle: "Buyer List",

    addButtonLabel: "Add New Buyer",

    importButtonLabel: "Import from Excel",

    exportButtonLabel: "Export",

    saveButtonLabel: "Save Buyer",

    cancelButtonLabel: "Cancel",

    mandatoryNote: "* Fields are mandatory",
  },

  // =======================================================
  // BUYER FORM DEFAULT VALUES
  // =======================================================

  buyerForm: {
    buyerCode: "",
    buyerName: "",
    shortName: "",
    buyerType: "",
    tradingType: "",
    country: "",
    address: "",

    contactPersons: [
      {
        mobileNumber: "",
        contactPersonName: "",
        designation: "",
        type: "",
        isPrimary: false,
      },
    ],

    phone: "",
    email: "",
    status: "ACTIVE",
    remarks: "",
  },

  // =======================================================
  // FORM FIELD CONFIGURATION
  // =======================================================

  formFields: [
    {
      id: "buyerCode",
      name: "buyerCode",
      label: "Buyer Code",
      type: "text",
      placeholder: "Enter buyer code",
      required: true,
      maxLength: 50,
      colSpan: 1,
    },

    {
      id: "buyerName",
      name: "buyerName",
      label: "Buyer Name",
      type: "text",
      placeholder: "Enter buyer name",
      required: true,
      maxLength: 150,
      colSpan: 1,
    },

    {
      id: "shortName",
      name: "shortName",
      label: "Short Name",
      type: "text",
      placeholder: "Enter short name",
      required: false,
      maxLength: 50,
      colSpan: 2,
    },

    {
      id: "buyerType",
      name: "buyerType",
      label: "Buyer Type",
      type: "select",
      placeholder: "Select buyer type",
      required: true,
      colSpan: 1,
      optionsKey: "buyerTypeOptions",
    },

    {
      id: "tradingType",
      name: "tradingType",
      label: "Trading Type",
      type: "select",
      placeholder: "Select trading type",
      required: true,
      colSpan: 1,
      optionsKey: "tradingTypeOptions",
    },

    {
      id: "country",
      name: "country",
      label: "Country",
      type: "select",
      placeholder: "Select country",
      required: true,
      colSpan: 2,
      optionsKey: "countryOptions",
    },

    {
      id: "address",
      name: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter address...",
      required: true,
      maxLength: 250,
      colSpan: 2,
    },

    {
      id: "phone",
      name: "phone",
      label: "Phone",
      type: "text",
      placeholder: "Enter phone number",
      required: false,
      maxLength: 30,
      colSpan: 1,
    },

    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email address",
      required: false,
      maxLength: 150,
      colSpan: 1,
    },

    {
      id: "status",
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status",
      required: true,
      colSpan: 1,
      optionsKey: "statusOptions",
    },

    {
      id: "remarks",
      name: "remarks",
      label: "Remarks",
      type: "textarea",
      placeholder: "Enter remarks...",
      required: false,
      maxLength: 250,
      colSpan: 1,
    },
  ],

  // =======================================================
  // BUYER TYPE OPTIONS
  // =======================================================

  buyerTypeOptions: [
    {
      value: "LOCAL",
      label: "Local",
    },

    {
      value: "EXPORTER",
      label: "Exporter",
    },

    {
      value: "PACKER",
      label: "Packer",
    },

    {
      value: "TRADER",
      label: "Trader",
    },

    {
      value: "CORPORATE",
      label: "Corporate",
    },
  ],

  // =======================================================
  // TRADING TYPE OPTIONS
  // =======================================================

  tradingTypeOptions: [
    {
      value: "INTERNAL",
      label: "Internal",
    },

    {
      value: "EXPORT",
      label: "Export",
    },

    {
      value: "IMPORT",
      label: "Import",
    },

    {
      value: "BOTH",
      label: "Both (Int–Exp)",
    },
  ],

  // =======================================================
  // COUNTRY OPTIONS
  // =======================================================

  countryOptions: [
    {
      value: "BANGLADESH",
      label: "Bangladesh",
    },

    {
      value: "INDIA",
      label: "India",
    },

    {
      value: "PAKISTAN",
      label: "Pakistan",
    },

    {
      value: "SRI_LANKA",
      label: "Sri Lanka",
    },

    {
      value: "KENYA",
      label: "Kenya",
    },

    {
      value: "UNITED_KINGDOM",
      label: "United Kingdom",
    },
  ],

  // =======================================================
  // CONTACT PERSON TYPE OPTIONS
  // =======================================================

  contactPersonTypeOptions: [
    {
      value: "PRIMARY",
      label: "Primary",
    },

    {
      value: "SECONDARY",
      label: "Secondary",
    },

    {
      value: "WHATSAPP",
      label: "WhatsApp",
    },

    {
      value: "OFFICE",
      label: "Office",
    },
  ],

  // =======================================================
  // DESIGNATION OPTIONS
  // =======================================================

  designationOptions: [
    {
      value: "MANAGING_DIRECTOR",
      label: "Managing Director",
    },

    {
      value: "GENERAL_MANAGER",
      label: "General Manager",
    },

    {
      value: "ACCOUNTS_MANAGER",
      label: "Accounts Manager",
    },

    {
      value: "MARKETING_EXECUTIVE",
      label: "Marketing Executive",
    },

    {
      value: "SALES_MANAGER",
      label: "Sales Manager",
    },

    {
      value: "PURCHASE_MANAGER",
      label: "Purchase Manager",
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
  // CONTACT TABLE HEADERS
  // =======================================================

  contactTable: {
    title: "Contact Persons & Mobile Numbers",
    required: true,

    addButton: {
      label: "Add Another Contact Person",
      icon: "UserPlus",
    },

    columns: [
      {
        key: "sl",
        label: "SL",
        width: "6%",
        align: "center",
        type: "serial",
      },

      {
        key: "mobileNumber",
        label: "Mobile Number",
        width: "19%",
        type: "text",
        placeholder: "+880-...",
        required: true,
      },

      {
        key: "contactPersonName",
        label: "Contact Person Name",
        width: "22%",
        type: "text",
        placeholder: "Contact person",
        required: true,
      },

      {
        key: "designation",
        label: "Designation",
        width: "20%",
        type: "select",
        required: true,
        optionsKey: "designationOptions",
      },

      {
        key: "type",
        label: "Type",
        width: "15%",
        type: "select",
        required: false,
        optionsKey: "contactPersonTypeOptions",
      },

      {
        key: "isPrimary",
        label: "Primary",
        width: "9%",
        align: "center",
        type: "radio",
      },

      {
        key: "action",
        label: "Action",
        width: "9%",
        align: "center",
        type: "delete",
      },
    ],
  },

  // =======================================================
  // BUYER LIST TABLE HEADERS
  // =======================================================

  buyerTableHeaders: [
    {
      key: "sl",
      label: "SL",
    },

    {
      key: "buyerCode",
      label: "Buyer Code",
    },

    {
      key: "buyerName",
      label: "Buyer Name",
    },

    {
      key: "shortName",
      label: "Short Name",
    },

    {
      key: "buyerType",
      label: "Buyer Type",
    },

    {
      key: "tradingType",
      label: "Trading Type",
    },

    {
      key: "country",
      label: "Country",
    },

    {
      key: "mobilePrimary",
      label: "Mobile (Primary)",
    },

    {
      key: "phone",
      label: "Phone",
    },

    {
      key: "status",
      label: "Status",
    },

    {
      key: "action",
      label: "Action",
    },
  ],

  // =======================================================
  // BUYER LIST
  // =======================================================

  buyerList: [
    {
      id: 1,

      buyerCode: "BUY-001",

      buyerName: "NATIONAL BROKERS LIMITED",

      shortName: "NATIONAL",

      buyerType: "LOCAL",

      tradingType: "BOTH",

      country: "BANGLADESH",

      address: "63, Motijheel C/A, Dhaka-1000, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-123456",
          contactPersonName: "Mr. Sohel Rana",
          designation: "Managing Director",
          type: "PRIMARY",
          isPrimary: true,
        },

        {
          id: 2,
          mobileNumber: "+880-1810-654321",
          contactPersonName: "Mr. Rahim Uddin",
          designation: "General Manager",
          type: "SECONDARY",
          isPrimary: false,
        },

        {
          id: 3,
          mobileNumber: "+880-1912-345678",
          contactPersonName: "Mr. Karim Ali",
          designation: "Accounts Manager",
          type: "WHATSAPP",
          isPrimary: false,
        },

        {
          id: 4,
          mobileNumber: "+880-1713-987654",
          contactPersonName: "Mr. Manzur Rahman",
          designation: "Marketing Executive",
          type: "OFFICE",
          isPrimary: false,
        },
      ],

      phone: "+880-2-9561234",

      email: "info@nationalbrokers.com",

      status: "ACTIVE",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:00:00",

      updatedAt: "2026-06-01T10:00:00",
    },

    {
      id: 2,

      buyerCode: "BUY-002",

      buyerName: "PURBA BANGLA BROKERS LIMITED",

      shortName: "PURBA BANGLA",

      buyerType: "LOCAL",

      tradingType: "INTERNAL",

      country: "BANGLADESH",

      address: "Agrabad Commercial Area, Chattogram, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-987654",
          contactPersonName: "Mr. Abdul Karim",
          designation: "General Manager",
          type: "PRIMARY",
          isPrimary: true,
        },
      ],

      phone: "+880-1711-123456",

      email: "info@purbabangla.com",

      status: "ACTIVE",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:10:00",

      updatedAt: "2026-06-01T10:10:00",
    },

    {
      id: 3,

      buyerCode: "BUY-003",

      buyerName: "K.S BROKERS LIMITED",

      shortName: "K.S BROKERS",

      buyerType: "LOCAL",

      tradingType: "EXPORT",

      country: "BANGLADESH",

      address: "Kawran Bazar, Dhaka, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-456789",
          contactPersonName: "Mr. Hasan Ahmed",
          designation: "Sales Manager",
          type: "PRIMARY",
          isPrimary: true,
        },
      ],

      phone: "+880-2-8312345",

      email: "info@ksbrokers.com",

      status: "ACTIVE",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:20:00",

      updatedAt: "2026-06-01T10:20:00",
    },

    {
      id: 4,

      buyerCode: "BUY-004",

      buyerName: "PLANTERS BROKERS LIMITED",

      shortName: "PLANTERS",

      buyerType: "LOCAL",

      tradingType: "BOTH",

      country: "BANGLADESH",

      address: "Banani, Dhaka, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-112233",
          contactPersonName: "Mr. Tanvir Ahmed",
          designation: "Managing Director",
          type: "PRIMARY",
          isPrimary: true,
        },
      ],

      phone: "+880-2-9556789",

      email: "info@plantersbrokers.com",

      status: "ACTIVE",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:30:00",

      updatedAt: "2026-06-01T10:30:00",
    },

    {
      id: 5,

      buyerCode: "BUY-005",

      buyerName: "UNITY BROKERS LIMITED",

      shortName: "UNITY",

      buyerType: "LOCAL",

      tradingType: "EXPORT",

      country: "BANGLADESH",

      address: "Gulshan, Dhaka, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-223344",
          contactPersonName: "Mr. Imran Hossain",
          designation: "Sales Manager",
          type: "PRIMARY",
          isPrimary: true,
        },
      ],

      phone: "+880-2-9567890",

      email: "info@unitybrokers.com",

      status: "ACTIVE",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:40:00",

      updatedAt: "2026-06-01T10:40:00",
    },

    {
      id: 6,

      buyerCode: "BUY-006",

      buyerName: "PROGRESSIVE BROKERS LTD",

      shortName: "PROGRESSIVE",

      buyerType: "PACKER",

      tradingType: "EXPORT",

      country: "BANGLADESH",

      address: "Tejgaon Industrial Area, Dhaka, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-334455",
          contactPersonName: "Mr. Faisal Khan",
          designation: "Purchase Manager",
          type: "PRIMARY",
          isPrimary: true,
        },
      ],

      phone: "+880-2-9562345",

      email: "info@progressive.com",

      status: "ACTIVE",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T10:50:00",

      updatedAt: "2026-06-01T10:50:00",
    },

    {
      id: 7,

      buyerCode: "BUY-007",

      buyerName: "PRODUCE BROKERS LIMITED",

      shortName: "PRODUCE",

      buyerType: "LOCAL",

      tradingType: "BOTH",

      country: "BANGLADESH",

      address: "Motijheel, Dhaka, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-445566",
          contactPersonName: "Mr. Arif Hossain",
          designation: "General Manager",
          type: "PRIMARY",
          isPrimary: true,
        },
      ],

      phone: "+880-2-9563456",

      email: "info@producebrokers.com",

      status: "ACTIVE",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T11:00:00",

      updatedAt: "2026-06-01T11:00:00",
    },

    {
      id: 8,

      buyerCode: "BUY-008",

      buyerName: "M/S SHAH BROTHERS",

      shortName: "SHAH BROTHERS",

      buyerType: "PACKER",

      tradingType: "EXPORT",

      country: "BANGLADESH",

      address: "Narayanganj, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-556677",
          contactPersonName: "Mr. Shahidul Islam",
          designation: "Managing Director",
          type: "PRIMARY",
          isPrimary: true,
        },
      ],

      phone: "+880-2-9564567",

      email: "info@shahbrothers.com",

      status: "INACTIVE",

      remarks: "Currently inactive.",

      isActive: false,

      createdAt: "2026-06-01T11:10:00",

      updatedAt: "2026-06-01T11:10:00",
    },

    {
      id: 9,

      buyerCode: "BUY-009",

      buyerName: "GLOBAL TEA TRADERS",

      shortName: "GLOBAL",

      buyerType: "PACKER",

      tradingType: "BOTH",

      country: "BANGLADESH",

      address: "Gulshan-2, Dhaka, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-667788",
          contactPersonName: "Mr. Nayeem Hasan",
          designation: "Sales Manager",
          type: "PRIMARY",
          isPrimary: true,
        },
      ],

      phone: "+880-2-9565678",

      email: "info@globaltea.com",

      status: "ACTIVE",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T11:20:00",

      updatedAt: "2026-06-01T11:20:00",
    },

    {
      id: 10,

      buyerCode: "BUY-010",

      buyerName: "A.ONE TEA COMPANY",

      shortName: "A.ONE",

      buyerType: "LOCAL",

      tradingType: "INTERNAL",

      country: "BANGLADESH",

      address: "Chattogram, Bangladesh",

      contactPersons: [
        {
          id: 1,
          mobileNumber: "+880-1711-778899",
          contactPersonName: "Mr. Sabbir Ahmed",
          designation: "Purchase Manager",
          type: "PRIMARY",
          isPrimary: true,
        },
      ],

      phone: "+880-2-9566789",

      email: "info@aonetea.com",

      status: "ACTIVE",

      remarks: "",

      isActive: true,

      createdAt: "2026-06-01T11:30:00",

      updatedAt: "2026-06-01T11:30:00",
    },
  ],

  // =======================================================
  // PAGINATION
  // =======================================================

  pagination: {
    currentPage: 1,

    pageSize: 10,

    totalPages: 3,

    totalEntries: 23,

    showingFrom: 1,

    showingTo: 10,
  },

  // =======================================================
  // EMPTY FORM
  // =======================================================

  emptyBuyerForm: {
    buyerCode: "",
    buyerName: "",
    shortName: "",
    buyerType: "",
    tradingType: "",
    country: "",
    address: "",

    contactPersons: [
      {
        mobileNumber: "",
        contactPersonName: "",
        designation: "",
        type: "",
        isPrimary: false,
      },
    ],

    phone: "",
    email: "",
    status: "ACTIVE",
    remarks: "",
  },
};
