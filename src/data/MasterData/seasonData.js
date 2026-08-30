export const seasonData = {
  // =========================================================
  // PAGE HEADER
  // =========================================================

  pageHeader: {
    title: "Season Setup",
    breadcrumb: ["Master Data", "Season Setup"],
  },

  // =========================================================
  // SEASON LIST
  // =========================================================

  seasonList: {
    title: "Season List",

    search: {
      placeholder: "Search season...",
    },

    filter: {
      label: "Filters",
    },

    addButton: {
      label: "Add New Season",
    },

    // -------------------------------------------------------
    // TABLE HEADERS
    // -------------------------------------------------------

    tableHeaders: [
      {
        key: "sl",
        label: "SL",
      },
      {
        key: "seasonName",
        label: "Season Name",
      },
      {
        key: "seasonCode",
        label: "Season Code",
      },
      {
        key: "startDate",
        label: "Start Date",
      },
      {
        key: "endDate",
        label: "End Date",
      },
      {
        key: "type",
        label: "Type",
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
      {
        key: "action",
        label: "Action",
      },
    ],

    // -------------------------------------------------------
    // SEASON TABLE DATA
    // -------------------------------------------------------

    seasons: [
      {
        id: 1,
        sl: 1,

        seasonName: "2026 Main Season",
        current: true,

        seasonCode: "MS-2026",

        startDate: "01/01/2026",
        endDate: "31/12/2026",

        type: "Main",

        status: "Active",

        createdBy: "Md. Faruk Hossain",
        createdOn: "01/06/2026 10:15 AM",
      },

      {
        id: 2,
        sl: 2,

        seasonName: "2025 Main Season",
        current: false,

        seasonCode: "MS-2025",

        startDate: "01/01/2025",
        endDate: "31/12/2025",

        type: "Main",

        status: "Completed",

        createdBy: "Md. Faruk Hossain",
        createdOn: "02/06/2025 11:20 AM",
      },

      {
        id: 3,
        sl: 3,

        seasonName: "2025 Off Season",
        current: false,

        seasonCode: "OS-2025",

        startDate: "01/07/2025",
        endDate: "30/09/2025",

        type: "Off Season",

        status: "Completed",

        createdBy: "Afsana Begum",
        createdOn: "01/07/2025 09:30 AM",
      },

      {
        id: 4,
        sl: 4,

        seasonName: "2024 Main Season",
        current: false,

        seasonCode: "MS-2024",

        startDate: "01/01/2024",
        endDate: "31/12/2024",

        type: "Main",

        status: "Completed",

        createdBy: "Md. Faruk Hossain",
        createdOn: "03/06/2024 09:10 AM",
      },

      {
        id: 5,
        sl: 5,

        seasonName: "2024 Off Season",
        current: false,

        seasonCode: "OS-2024",

        startDate: "01/07/2024",
        endDate: "30/09/2024",

        type: "Off Season",

        status: "Completed",

        createdBy: "Afsana Begum",
        createdOn: "01/07/2024 10:05 AM",
      },
    ],

    // -------------------------------------------------------
    // PAGINATION
    // -------------------------------------------------------

    pagination: {
      currentPage: 1,
      perPage: 10,

      totalEntries: 5,

      showingFrom: 1,
      showingTo: 5,

      previousLabel: "Previous",
      nextLabel: "Next",

      perPageOptions: [5, 10, 20, 50],
    },

    // -------------------------------------------------------
    // ACTIONS
    // -------------------------------------------------------

    actions: {
      edit: {
        label: "Edit",
      },

      delete: {
        label: "Delete",
      },
    },

    // -------------------------------------------------------
    // EMPTY STATE
    // -------------------------------------------------------

    emptyState: {
      title: "No seasons found",
      description: "There are no seasons matching your search.",
    },
  },

  // =========================================================
  // FILTER OPTIONS
  // =========================================================

  filters: {
    seasonType: {
      label: "Season Type",

      options: [
        {
          value: "all",
          label: "All Types",
        },
        {
          value: "main",
          label: "Main Season",
        },
        {
          value: "off-season",
          label: "Off Season",
        },
      ],
    },

    status: {
      label: "Status",

      options: [
        {
          value: "all",
          label: "All Status",
        },
        {
          value: "active",
          label: "Active",
        },
        {
          value: "completed",
          label: "Completed",
        },
        {
          value: "inactive",
          label: "Inactive",
        },
      ],
    },

    year: {
      label: "Year",

      options: [
        {
          value: "all",
          label: "All Years",
        },
        {
          value: "2026",
          label: "2026",
        },
        {
          value: "2025",
          label: "2025",
        },
        {
          value: "2024",
          label: "2024",
        },
      ],
    },
  },

  // =========================================================
  // SEASON DETAILS
  // =========================================================

  seasonDetails: {
    title: "Season Details",

    resetButton: {
      label: "Reset",
    },

    fields: [
      {
        name: "seasonName",
        label: "Season Name",
        type: "text",
        placeholder: "Enter season name",
        required: true,
      },

      {
        name: "seasonCode",
        label: "Season Code",
        type: "text",
        placeholder: "Enter season code",
        required: true,
      },

      {
        name: "seasonType",
        label: "Season Type",
        type: "select",
        placeholder: "Select season type",
        required: true,
      },

      {
        name: "startDate",
        label: "Start Date",
        type: "date",
        placeholder: "Select start date",
        required: true,
      },

      {
        name: "endDate",
        label: "End Date",
        type: "date",
        placeholder: "Select end date",
        required: true,
      },

      {
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "Select status",
        required: true,
      },
    ],

    // -------------------------------------------------------
    // SELECT OPTIONS
    // -------------------------------------------------------

    seasonTypeOptions: [
      {
        value: "main",
        label: "Main Season",
      },
      {
        value: "off-season",
        label: "Off Season",
      },
    ],

    statusOptions: [
      {
        value: "active",
        label: "Active",
      },
      {
        value: "completed",
        label: "Completed",
      },
      {
        value: "inactive",
        label: "Inactive",
      },
    ],

    // -------------------------------------------------------
    // TEXT AREAS
    // -------------------------------------------------------

    description: {
      name: "description",
      label: "Description",
      placeholder: "Enter season description...",
      maxLength: 500,
    },

    remarks: {
      name: "remarks",
      label: "Remarks (Optional)",
      placeholder: "Enter remarks...",
      maxLength: 500,
    },

    // -------------------------------------------------------
    // CURRENT SELECTED SEASON
    // -------------------------------------------------------

    selectedSeason: {
      id: 1,

      seasonName: "2026 Main Season",
      seasonCode: "MS-2026",

      seasonType: "main",

      startDate: "01/01/2026",
      endDate: "31/12/2026",

      status: "active",

      description: "Main tea production season for the year 2026.",

      remarks: "",

      createdOn: "01/06/2026 10:15 AM",
      createdBy: "Md. Faruk Hossain",
    },

    // -------------------------------------------------------
    // FOOTER BUTTONS
    // -------------------------------------------------------

    footer: {
      cancelButton: {
        label: "Cancel",
      },

      submitButton: {
        label: "Update Season",
      },
    },
  },

  // =========================================================
  // SEASON OVERVIEW
  // =========================================================

  seasonOverview: {
    title: "Season Overview",

    cards: [
      {
        id: "total-seasons",
        title: "Total Seasons",
        value: 5,
        subtitle: "All Time",
        icon: "calendar",
      },

      {
        id: "active-seasons",
        title: "Active Seasons",
        value: 1,
        subtitle: "Currently Active",
        icon: "leaf",
      },

      {
        id: "completed-seasons",
        title: "Completed Seasons",
        value: 4,
        subtitle: "All Completed",
        icon: "circleCheck",
      },

      {
        id: "current-season-duration",
        title: "Current Season Duration",
        value: 181,
        unit: "Days",
        subtitle: "Current Season",
        icon: "clock",
      },

      {
        id: "total-production",
        title: "Total Production (Current Season)",
        value: "980.20",
        unit: "Kg",
        subtitle: "Till Now",
        icon: "factory",
      },

      {
        id: "total-sales",
        title: "Total Sales (Current Season)",
        value: "৳2,45,000.00",
        unit: "",
        subtitle: "Till Now",
        icon: "money",
      },
    ],

    // -------------------------------------------------------
    // INFORMATION NOTICE
    // -------------------------------------------------------

    notice: {
      icon: "info",

      message:
        "Season data will be used in production, inventory, sales & reports.",
    },
  },

  // =========================================================
  // STATUS CONFIGURATION
  // =========================================================

  statusConfig: {
    Active: {
      label: "Active",
      color: "green",
      bg: "green-50",
      text: "green-700",
    },

    Completed: {
      label: "Completed",
      color: "blue",
      bg: "blue-50",
      text: "blue-700",
    },

    Inactive: {
      label: "Inactive",
      color: "red",
      bg: "red-50",
      text: "red-700",
    },
  },

  // =========================================================
  // SEASON TYPE CONFIGURATION
  // =========================================================

  seasonTypeConfig: {
    Main: {
      label: "Main",
    },

    "Off Season": {
      label: "Off Season",
    },
  },

  // =========================================================
  // PAGE SETTINGS
  // =========================================================

  settings: {
    defaultPageSize: 10,

    maxDescriptionLength: 500,

    maxRemarksLength: 500,

    allowAdd: true,
    allowEdit: true,
    allowDelete: true,

    dateFormat: "DD/MM/YYYY",
  },
};
