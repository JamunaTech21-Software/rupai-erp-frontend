export const labourAllocationData = {
  // =========================================================
  // PAGE INFORMATION
  // =========================================================
  page: {
    id: "labour-allocation",
    title: "Labour Allocation",
    description:
      "Manage and allocate workers to different tasks and work areas.",
    module: "HR & Workforce Management",
    breadcrumb: ["HR & Workforce Management", "Labour Allocation"],
  },

  // =========================================================
  // PAGE ACTIONS
  // =========================================================
  pageActions: [
    {
      id: "new-allocation",
      label: "New Allocation",
      action: "navigate",
      path: "/labour-allocation-entry",
      iconKey: "plus",
      variant: "primary",
      visible: true,
    },
    {
      id: "import",
      label: "Import",
      action: "import",
      iconKey: "upload",
      variant: "secondary",
      visible: true,
      acceptedFileTypes: [".xlsx", ".xls", ".csv"],
    },
    {
      id: "export",
      label: "Export",
      action: "export",
      iconKey: "download",
      variant: "secondary",
      visible: true,
    },
    {
      id: "more",
      label: "More",
      action: "dropdown",
      iconKey: "moreHorizontal",
      dropdownIconKey: "chevronDown",
      variant: "secondary",
      visible: true,
    },
  ],

  // =========================================================
  // MORE ACTIONS
  // =========================================================
  moreActions: [
    {
      id: "bulk-allocation",
      label: "Bulk Allocation",
      action: "bulkAllocation",
      iconKey: "users",
      visible: true,
    },
    {
      id: "reallocate-workers",
      label: "Reallocate Workers",
      action: "reallocateWorkers",
      iconKey: "refreshCw",
      visible: true,
    },
    {
      id: "allocation-history",
      label: "View Allocation History",
      action: "viewHistory",
      iconKey: "history",
      visible: true,
    },
    {
      id: "allocation-report",
      label: "Allocation Report",
      action: "allocationReport",
      iconKey: "fileText",
      visible: true,
    },
    {
      id: "print-allocation",
      label: "Print Allocation",
      action: "printAllocation",
      iconKey: "printer",
      visible: true,
    },
    {
      id: "refresh-data",
      label: "Refresh Data",
      action: "refreshData",
      iconKey: "refreshCw",
      visible: true,
    },
  ],

  // =========================================================
  // SUMMARY CARDS
  // =========================================================
  summaryCards: [
    {
      id: "total-workers",
      title: "Total Workers",
      value: 2458,
      displayValue: "2,458",
      subtitle: "Active Workers",
      iconKey: "users",
      variant: "green",
      percentage: null,
      percentageType: null,
      trend: null,
    },
    {
      id: "allocated-today",
      title: "Allocated Today",
      value: 1856,
      displayValue: "1,856",
      subtitle: null,
      iconKey: "usersRound",
      variant: "blue",
      percentage: 75.58,
      percentageDisplay: "75.58%",
      percentageType: "positive",
      trend: "up",
    },
    {
      id: "total-tasks",
      title: "Total Tasks/Works",
      value: 24,
      displayValue: "24",
      subtitle: "Active Tasks",
      iconKey: "clipboardList",
      variant: "purple",
      percentage: null,
      percentageType: null,
      trend: null,
    },
    {
      id: "completed-today",
      title: "Completed Today",
      value: 18,
      displayValue: "18",
      subtitle: null,
      iconKey: "circleCheck",
      variant: "orange",
      percentage: 75,
      percentageDisplay: "75.00%",
      percentageType: "positive",
      trend: "up",
    },
    {
      id: "unallocated",
      title: "Unallocated",
      value: 602,
      displayValue: "602",
      subtitle: null,
      iconKey: "userRoundX",
      variant: "red",
      percentage: 24.42,
      percentageDisplay: "24.42%",
      percentageType: "negative",
      trend: "down",
    },
  ],

  // =========================================================
  // FILTER CONFIGURATION
  // =========================================================
  filters: [
    {
      id: "date",
      name: "date",
      label: "Date",
      type: "date",
      required: true,
      placeholder: "",
      defaultValue: "2026-06-01",
    },
    {
      id: "garden",
      name: "garden",
      label: "Garden / Unit",
      type: "select",
      required: false,
      placeholder: "All Gardens",
      options: [
        {
          value: "all",
          label: "All Gardens",
        },
        {
          value: "jamuna-tea-estate",
          label: "Jamuna Tea Estate",
        },
        {
          value: "north-garden",
          label: "North Garden",
        },
        {
          value: "south-garden",
          label: "South Garden",
        },
      ],
    },
    {
      id: "department",
      name: "department",
      label: "Department",
      type: "select",
      required: false,
      placeholder: "All Departments",
      options: [
        {
          value: "all",
          label: "All Departments",
        },
        {
          value: "field-operations",
          label: "Field Operations",
        },
        {
          value: "nursery",
          label: "Nursery",
        },
        {
          value: "estate-maintenance",
          label: "Estate Maintenance",
        },
      ],
    },
    {
      id: "section",
      name: "section",
      label: "Section / Field",
      type: "select",
      required: false,
      placeholder: "All Sections",
      options: [
        {
          value: "all",
          label: "All Sections",
        },
        {
          value: "north-field-01",
          label: "North Field - 01",
        },
        {
          value: "north-field-02",
          label: "North Field - 02",
        },
        {
          value: "central-field-01",
          label: "Central Field - 01",
        },
        {
          value: "central-field-02",
          label: "Central Field - 02",
        },
        {
          value: "south-field-01",
          label: "South Field - 01",
        },
        {
          value: "south-field-02",
          label: "South Field - 02",
        },
        {
          value: "nursery-section",
          label: "Nursery Section",
        },
        {
          value: "factory-road",
          label: "Factory Road",
        },
      ],
    },
    {
      id: "task-type",
      name: "taskType",
      label: "Task / Work Type",
      type: "select",
      required: false,
      placeholder: "All Tasks",
      options: [
        {
          value: "all",
          label: "All Tasks",
        },
        {
          value: "plucking",
          label: "Plucking",
        },
        {
          value: "pruning",
          label: "Pruning",
        },
        {
          value: "weeding",
          label: "Weeding",
        },
        {
          value: "fertilizer-application",
          label: "Fertilizer Application",
        },
        {
          value: "drain-cleaning",
          label: "Drain Cleaning",
        },
        {
          value: "shade-tree-pruning",
          label: "Shade Tree Pruning",
        },
        {
          value: "nursery-maintenance",
          label: "Nursery Maintenance",
        },
        {
          value: "road-maintenance",
          label: "Road Maintenance",
        },
      ],
    },
    {
      id: "supervisor",
      name: "supervisor",
      label: "Supervisor / Incharge",
      type: "select",
      required: false,
      placeholder: "All Supervisors",
      options: [
        {
          value: "all",
          label: "All Supervisors",
        },
        {
          value: "rahim-uddin",
          label: "Rahim Uddin",
        },
        {
          value: "jalal-mia",
          label: "Jalal Mia",
        },
        {
          value: "salma-begum",
          label: "Salma Begum",
        },
        {
          value: "monir-hossain",
          label: "Monir Hossain",
        },
        {
          value: "rubel-hasan",
          label: "Rubel Hasan",
        },
        {
          value: "abdul-karim",
          label: "Abdul Karim",
        },
        {
          value: "tariqul-islam",
          label: "Tariqul Islam",
        },
        {
          value: "arif-hossain",
          label: "Arif Hossain",
        },
      ],
    },
    {
      id: "status",
      name: "status",
      label: "Allocation Status",
      type: "select",
      required: false,
      placeholder: "All Status",
      options: [
        {
          value: "all",
          label: "All Status",
        },
        {
          value: "completed",
          label: "Completed",
        },
        {
          value: "in-progress",
          label: "In Progress",
        },
        {
          value: "pending",
          label: "Pending",
        },
      ],
    },
    {
      id: "search",
      name: "search",
      label: "Search",
      type: "search",
      required: false,
      placeholder: "Search by Worker ID, Name, Task...",
    },
  ],

  // =========================================================
  // FILTER ACTIONS
  // =========================================================
  filterActions: [
    {
      id: "reset",
      label: "Reset",
      action: "reset",
      variant: "secondary",
    },
    {
      id: "apply",
      label: "Apply Filter",
      action: "applyFilter",
      variant: "primary",
    },
  ],

  // =========================================================
  // ALLOCATION TABLE
  // =========================================================
  allocationTable: {
    title: "Allocation List",

    headers: [
      {
        key: "serial",
        label: "SL",
        align: "center",
      },
      {
        key: "allocationId",
        label: "Allocation ID",
        align: "left",
      },
      {
        key: "date",
        label: "Date",
        align: "left",
      },
      {
        key: "task",
        label: "Task / Work",
        align: "left",
      },
      {
        key: "department",
        label: "Department",
        align: "left",
      },
      {
        key: "section",
        label: "Section / Field",
        align: "left",
      },
      {
        key: "supervisor",
        label: "Supervisor",
        align: "left",
      },
      {
        key: "allocatedWorkers",
        label: "Allocated Workers",
        align: "center",
      },
      {
        key: "status",
        label: "Status",
        align: "center",
      },
      {
        key: "actions",
        label: "Action",
        align: "center",
      },
    ],

    rows: [
      {
        serial: 1,
        allocationId: "ALLOC-2026-0001",
        date: "01-06-2026",
        task: "Plucking",
        department: "Field Operations",
        section: "North Field - 01",
        supervisor: "Rahim Uddin",
        allocatedWorkers: 120,
        status: "completed",
        statusLabel: "Completed",
      },
      {
        serial: 2,
        allocationId: "ALLOC-2026-0002",
        date: "01-06-2026",
        task: "Pruning",
        department: "Field Operations",
        section: "North Field - 02",
        supervisor: "Jalal Mia",
        allocatedWorkers: 85,
        status: "in-progress",
        statusLabel: "In Progress",
      },
      {
        serial: 3,
        allocationId: "ALLOC-2026-0003",
        date: "01-06-2026",
        task: "Weeding",
        department: "Field Operations",
        section: "Central Field - 01",
        supervisor: "Salma Begum",
        allocatedWorkers: 95,
        status: "in-progress",
        statusLabel: "In Progress",
      },
      {
        serial: 4,
        allocationId: "ALLOC-2026-0004",
        date: "01-06-2026",
        task: "Fertilizer Application",
        department: "Field Operations",
        section: "South Field - 01",
        supervisor: "Monir Hossain",
        allocatedWorkers: 60,
        status: "pending",
        statusLabel: "Pending",
      },
      {
        serial: 5,
        allocationId: "ALLOC-2026-0005",
        date: "01-06-2026",
        task: "Drain Cleaning",
        department: "Field Operations",
        section: "South Field - 02",
        supervisor: "Rubel Hasan",
        allocatedWorkers: 45,
        status: "pending",
        statusLabel: "Pending",
      },
      {
        serial: 6,
        allocationId: "ALLOC-2026-0006",
        date: "01-06-2026",
        task: "Shade Tree Pruning",
        department: "Field Operations",
        section: "Central Field - 02",
        supervisor: "Abdul Karim",
        allocatedWorkers: 40,
        status: "completed",
        statusLabel: "Completed",
      },
      {
        serial: 7,
        allocationId: "ALLOC-2026-0007",
        date: "01-06-2026",
        task: "Nursery Maintenance",
        department: "Nursery",
        section: "Nursery Section",
        supervisor: "Tariqul Islam",
        allocatedWorkers: 30,
        status: "in-progress",
        statusLabel: "In Progress",
      },
      {
        serial: 8,
        allocationId: "ALLOC-2026-0008",
        date: "01-06-2026",
        task: "Road Maintenance",
        department: "Estate Maintenance",
        section: "Factory Road",
        supervisor: "Arif Hossain",
        allocatedWorkers: 25,
        status: "pending",
        statusLabel: "Pending",
      },
    ],

    pagination: {
      currentPage: 1,
      perPage: 8,
      totalEntries: 24,
      totalPages: 3,
      showingFrom: 1,
      showingTo: 8,
      pageNumbers: [1, 2, 3],
    },

    rowActions: [
      {
        id: "view",
        label: "View",
        action: "view",
        iconKey: "eye",
      },
      {
        id: "more",
        label: "More",
        action: "more",
        iconKey: "moreVertical",
      },
    ],
  },

  // =========================================================
  // NEW ALLOCATION FORM
  // =========================================================
  newAllocationForm: {
    title: "New Allocation",
    description: "Create a new labour allocation.",

    fields: [
      {
        id: "task-type",
        name: "taskType",
        label: "Task / Work Type",
        type: "select",
        required: true,
        placeholder: "Select Task / Work",
        options: [
          {
            value: "plucking",
            label: "Plucking",
          },
          {
            value: "pruning",
            label: "Pruning",
          },
          {
            value: "weeding",
            label: "Weeding",
          },
          {
            value: "fertilizer-application",
            label: "Fertilizer Application",
          },
          {
            value: "drain-cleaning",
            label: "Drain Cleaning",
          },
          {
            value: "shade-tree-pruning",
            label: "Shade Tree Pruning",
          },
          {
            value: "nursery-maintenance",
            label: "Nursery Maintenance",
          },
          {
            value: "road-maintenance",
            label: "Road Maintenance",
          },
        ],
      },

      {
        id: "department",
        name: "department",
        label: "Department",
        type: "select",
        required: true,
        placeholder: "Select Department",
        options: [
          {
            value: "field-operations",
            label: "Field Operations",
          },
          {
            value: "nursery",
            label: "Nursery",
          },
          {
            value: "estate-maintenance",
            label: "Estate Maintenance",
          },
        ],
      },

      {
        id: "section",
        name: "section",
        label: "Section / Field",
        type: "select",
        required: true,
        placeholder: "Select Section / Field",
        options: [
          {
            value: "north-field-01",
            label: "North Field - 01",
          },
          {
            value: "north-field-02",
            label: "North Field - 02",
          },
          {
            value: "central-field-01",
            label: "Central Field - 01",
          },
          {
            value: "central-field-02",
            label: "Central Field - 02",
          },
          {
            value: "south-field-01",
            label: "South Field - 01",
          },
          {
            value: "south-field-02",
            label: "South Field - 02",
          },
          {
            value: "nursery-section",
            label: "Nursery Section",
          },
          {
            value: "factory-road",
            label: "Factory Road",
          },
        ],
      },

      {
        id: "date",
        name: "date",
        label: "Date",
        type: "date",
        required: true,
        defaultValue: "2026-06-01",
      },

      {
        id: "supervisor",
        name: "supervisor",
        label: "Supervisor / Incharge",
        type: "select",
        required: true,
        placeholder: "Select Supervisor",
        options: [
          {
            value: "rahim-uddin",
            label: "Rahim Uddin",
          },
          {
            value: "jalal-mia",
            label: "Jalal Mia",
          },
          {
            value: "salma-begum",
            label: "Salma Begum",
          },
          {
            value: "monir-hossain",
            label: "Monir Hossain",
          },
          {
            value: "rubel-hasan",
            label: "Rubel Hasan",
          },
          {
            value: "abdul-karim",
            label: "Abdul Karim",
          },
          {
            value: "tariqul-islam",
            label: "Tariqul Islam",
          },
          {
            value: "arif-hossain",
            label: "Arif Hossain",
          },
        ],
      },

      {
        id: "estimated-workers",
        name: "estimatedWorkers",
        label: "Estimated Workers",
        type: "number",
        required: true,
        placeholder: "Enter Number",
        validation: {
          min: 1,
        },
      },

      {
        id: "remarks",
        name: "remarks",
        label: "Remarks / Notes",
        type: "textarea",
        required: false,
        placeholder: "Enter remarks or notes",
      },
    ],

    actions: [
      {
        id: "reset",
        label: "Reset",
        action: "reset",
        variant: "secondary",
      },
      {
        id: "next-select-workers",
        label: "Next: Select Workers",
        action: "nextSelectWorkers",
        variant: "primary",
      },
    ],
  },

  // =========================================================
  // RECENT ALLOCATIONS
  // =========================================================
  recentAllocations: {
    title: "Recent Allocations",

    items: [
      {
        id: "ALLOC-2026-0001",
        allocationId: "ALLOC-2026-0001",
        task: "Plucking",
        section: "North Field - 01",
        status: "completed",
        statusLabel: "Completed",
        workers: 120,
        time: "07:30 AM",
        iconKey: "clipboardCheck",
      },
      {
        id: "ALLOC-2026-0002",
        allocationId: "ALLOC-2026-0002",
        task: "Pruning",
        section: "North Field - 02",
        status: "in-progress",
        statusLabel: "In Progress",
        workers: 85,
        time: "07:15 AM",
        iconKey: "clipboardList",
      },
      {
        id: "ALLOC-2026-0003",
        allocationId: "ALLOC-2026-0003",
        task: "Weeding",
        section: "Central Field - 01",
        status: "in-progress",
        statusLabel: "In Progress",
        workers: 95,
        time: "07:10 AM",
        iconKey: "clipboardList",
      },
      {
        id: "ALLOC-2026-0004",
        allocationId: "ALLOC-2026-0004",
        task: "Fertilizer Application",
        section: "South Field - 01",
        status: "pending",
        statusLabel: "Pending",
        workers: 60,
        time: "06:55 AM",
        iconKey: "clipboard",
      },
    ],

    footerAction: {
      label: "View All Allocations",
      action: "viewAllAllocations",
    },
  },

  // =========================================================
  // ALLOCATION SUMMARY
  // =========================================================
  allocationSummary: {
    title: "Allocation Summary (Today)",

    chartData: [
      {
        id: "completed",
        label: "Completed",
        value: 18,
        percentage: 75,
        color: "#16A34A",
      },
      {
        id: "in-progress",
        label: "In Progress",
        value: 4,
        percentage: 16.67,
        color: "#3B82F6",
      },
      {
        id: "pending",
        label: "Pending",
        value: 2,
        percentage: 8.33,
        color: "#F59E0B",
      },
    ],

    totalLabel: "Total Allocations",
    total: 24,
  },

  // =========================================================
  // TASK / WORK SUMMARY
  // =========================================================
  taskWorkSummary: {
    title: "Task / Work Summary",

    columns: {
      task: "Task / Work",
      workers: "Allocated Workers",
    },

    items: [
      {
        id: "task-001",
        task: "Plucking",
        allocatedWorkers: 650,
      },
      {
        id: "task-002",
        task: "Pruning",
        allocatedWorkers: 320,
      },
      {
        id: "task-003",
        task: "Weeding",
        allocatedWorkers: 280,
      },
      {
        id: "task-004",
        task: "Fertilizer Application",
        allocatedWorkers: 150,
      },
      {
        id: "task-005",
        task: "Drain Cleaning",
        allocatedWorkers: 90,
      },
      {
        id: "task-006",
        task: "Shade Tree Pruning",
        allocatedWorkers: 60,
      },
      {
        id: "task-007",
        task: "Nursery Maintenance",
        allocatedWorkers: 30,
      },
      {
        id: "task-008",
        task: "Road Maintenance",
        allocatedWorkers: 25,
      },
    ],

    totalLabel: "Total",
    total: 1605,
  },

  // =========================================================
  // UNALLOCATED WORKERS
  // =========================================================
  unallocatedWorkers: {
    title: "Unallocated Workers",

    total: 602,

    percentage: "24.42%",

    action: {
      id: "view-unallocated-workers",
      label: "View Unallocated Workers",
    },
  },

  // =========================================================
  // QUICK ACTIONS
  // =========================================================
  quickActions: {
    title: "Quick Actions",

    items: [
      {
        id: "bulk-allocation",
        label: "Bulk Allocation",
        iconKey: "bulkAllocation",
      },
      {
        id: "reallocate-workers",
        label: "Reallocate Workers",
        iconKey: "reallocateWorkers",
      },
      {
        id: "update-allocation",
        label: "Update Allocation",
        iconKey: "updateAllocation",
      },
      {
        id: "allocation-report",
        label: "Allocation Report",
        iconKey: "allocationReport",
      },
      {
        id: "print-allocation",
        label: "Print Allocation",
        iconKey: "printAllocation",
      },
    ],
  },

  // =========================================================
  // INFORMATION
  // =========================================================
  informationSection: {
    title: "Information",

    cards: [
      {
        id: "work-types",
        title: "Work Types",
        description:
          "Different types of works and tasks that can be allocated to workers.",
        iconKey: "workTypes",
      },
      {
        id: "allocation-rules",
        title: "Allocation Rules",
        description:
          "Workers are allocated based on availability, skills and work requirements.",
        iconKey: "allocationRules",
      },
      {
        id: "reallocation",
        title: "Reallocation",
        description: "You can reallocate workers if needed based on priority.",
        iconKey: "reallocation",
      },
      {
        id: "approval-process",
        title: "Approval Process",
        description:
          "Some allocations may require approval from higher authority.",
        iconKey: "approvalProcess",
      },
    ],
  },

  // =========================================================
  // STATUS CONFIGURATION
  // =========================================================
  statusConfig: {
    completed: {
      label: "Completed",
      variant: "success",
    },

    "in-progress": {
      label: "In Progress",
      variant: "info",
    },

    pending: {
      label: "Pending",
      variant: "warning",
    },
  },

  // =========================================================
  // EMPTY STATE
  // =========================================================
  emptyState: {
    allocationList: {
      title: "No Allocations Found",
      description:
        "No labour allocation records are available for the selected filters.",
      iconKey: "inbox",
    },

    recentAllocations: {
      title: "No Recent Allocations",
      description: "There are no recent allocation records to display.",
      iconKey: "clipboardX",
    },

    taskSummary: {
      title: "No Task Data",
      description: "No task or work summary data is available.",
      iconKey: "chartNoAxesColumn",
    },
  },

  // =========================================================
  // TABLE CONFIGURATION
  // =========================================================
  tableConfig: {
    enablePagination: true,
    enableSearch: true,
    enableRowActions: true,
    enableSorting: true,
    enableHorizontalScroll: true,
    defaultRowsPerPage: 8,
    rowsPerPageOptions: [8, 15, 25, 50],
  },
};
