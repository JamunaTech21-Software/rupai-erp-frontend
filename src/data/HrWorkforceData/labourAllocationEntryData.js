export const labourAllocationEntryData = {
  page: {
    title: "Labour Allocation Entry",
    breadcrumb: [
      "HR & Workforce Management",
      "Labour Allocation",
      "New Allocation",
    ],
  },

  topActions: [
    {
      id: "back-to-list",
      label: "Back to List",
      action: "back",
      variant: "secondary",
      iconKey: "arrowLeft",
    },
    {
      id: "save-draft",
      label: "Save as Draft",
      action: "saveDraft",
      variant: "secondary",
      iconKey: "save",
    },
    {
      id: "save-submit",
      label: "Save & Submit",
      action: "saveSubmit",
      variant: "primary",
      iconKey: "circleCheck",
    },
  ],

  /* =====================================================
     1. ALLOCATION INFORMATION
  ====================================================== */

  allocationInformation: {
    id: "allocation-information",
    title: "Allocation Information",
    iconKey: "clipboard",

    fields: [
      {
        id: "allocation-id",
        name: "allocationId",
        label: "Allocation ID",
        type: "text",
        placeholder: "Auto Generate",
        defaultValue: "",
        disabled: true,
        required: false,
      },

      {
        id: "allocation-date",
        name: "allocationDate",
        label: "Allocation Date",
        type: "date",
        defaultValue: "2026-06-01",
        required: true,
      },

      {
        id: "garden-unit",
        name: "gardenUnit",
        label: "Garden / Unit",
        type: "select",
        placeholder: "Select Garden / Unit",
        required: true,
        options: [
          {
            value: "jamuna-tea-estate",
            label: "Jamuna Tea Estate",
          },
          {
            value: "sreemangal-tea-estate",
            label: "Sreemangal Tea Estate",
          },
          {
            value: "lalakhal-tea-estate",
            label: "Lalakhal Tea Estate",
          },
        ],
      },

      {
        id: "division",
        name: "division",
        label: "Division",
        type: "select",
        placeholder: "Select Division",
        required: false,
        options: [
          {
            value: "main-division",
            label: "Main Division",
          },
          {
            value: "north-division",
            label: "North Division",
          },
          {
            value: "south-division",
            label: "South Division",
          },
        ],
      },

      {
        id: "department",
        name: "department",
        label: "Department",
        type: "select",
        placeholder: "Select Department",
        required: true,
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
        id: "section-field",
        name: "sectionField",
        label: "Section / Field",
        type: "select",
        placeholder: "Select Section / Field",
        required: true,
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
            value: "south-field-01",
            label: "South Field - 01",
          },
        ],
      },

      {
        id: "block-plot",
        name: "blockPlot",
        label: "Block / Plot",
        type: "select",
        placeholder: "Select Block / Plot",
        required: false,
        options: [
          {
            value: "block-01",
            label: "Block - 01",
          },
          {
            value: "block-02",
            label: "Block - 02",
          },
          {
            value: "block-03",
            label: "Block - 03",
          },
        ],
      },
    ],
  },

  /* =====================================================
     2. TASK / WORK INFORMATION
  ====================================================== */

  taskWorkInformation: {
    id: "task-work-information",
    title: "Task / Work Information",
    iconKey: "briefcase",

    fields: [
      {
        id: "task-work-type",
        name: "taskWorkType",
        label: "Task / Work Type",
        type: "select",
        placeholder: "Select Task / Work Type",
        required: true,
        options: [
          {
            value: "tea-plucking",
            label: "Tea Plucking",
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
        id: "work-category",
        name: "workCategory",
        label: "Work Category",
        type: "select",
        placeholder: "Select Category",
        required: false,
        options: [
          {
            value: "production",
            label: "Production",
          },
          {
            value: "maintenance",
            label: "Maintenance",
          },
          {
            value: "cultivation",
            label: "Cultivation",
          },
          {
            value: "nursery",
            label: "Nursery",
          },
        ],
      },

      {
        id: "priority",
        name: "priority",
        label: "Priority",
        type: "select",
        placeholder: "Select Priority",
        required: false,
        options: [
          {
            value: "low",
            label: "Low",
          },
          {
            value: "medium",
            label: "Medium",
          },
          {
            value: "high",
            label: "High",
          },
          {
            value: "urgent",
            label: "Urgent",
          },
        ],
      },

      {
        id: "target-area",
        name: "targetArea",
        label: "Target Area (Acre)",
        type: "number",
        placeholder: "Enter Area",
        required: false,
        validation: {
          min: 0,
        },
      },

      {
        id: "target-quantity",
        name: "targetQuantity",
        label: "Target Quantity (Kg)",
        type: "number",
        placeholder: "Enter Quantity",
        required: false,
        validation: {
          min: 0,
        },
      },

      {
        id: "work-description",
        name: "workDescription",
        label: "Work Description / Instructions",
        type: "textarea",
        placeholder: "Enter work description or instructions...",
        required: false,
      },
    ],
  },

  /* =====================================================
     3. SUPERVISOR / INCHARGE
  ====================================================== */

  supervisorIncharge: {
    id: "supervisor-incharge",
    title: "Supervisor / Incharge",
    iconKey: "userCheck",

    fields: [
      {
        id: "supervisor",
        name: "supervisor",
        label: "Supervisor",
        type: "select",
        placeholder: "Select Supervisor",
        required: true,
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
            value: "monir-hossain",
            label: "Monir Hossain",
          },
        ],
      },

      {
        id: "assistant-supervisor",
        name: "assistantSupervisor",
        label: "Asst. Supervisor",
        type: "select",
        placeholder: "Select Assistant Supervisor",
        required: false,
        options: [
          {
            value: "jalal-mia",
            label: "Jalal Mia",
          },
          {
            value: "salma-begum",
            label: "Salma Begum",
          },
        ],
      },

      {
        id: "field-officer",
        name: "fieldOfficer",
        label: "Field Officer",
        type: "select",
        placeholder: "Select Field Officer",
        required: false,
        options: [
          {
            value: "monir-hossain",
            label: "Monir Hossain",
          },
          {
            value: "abdul-karim",
            label: "Abdul Karim",
          },
        ],
      },

      {
        id: "checker",
        name: "checker",
        label: "Checker",
        type: "select",
        placeholder: "Select Checker",
        required: false,
        options: [
          {
            value: "salma-begum",
            label: "Salma Begum",
          },
          {
            value: "tariqul-islam",
            label: "Tariqul Islam",
          },
        ],
      },
    ],
  },

  /* =====================================================
     ALLOCATION SUMMARY
  ====================================================== */

  allocationSummary: {
    id: "allocation-summary",
    title: "Allocation Summary",
    iconKey: "users",

    items: [
      {
        id: "total-workers",
        label: "Total Workers",
        value: 120,
      },
      {
        id: "male",
        label: "Male",
        value: 25,
      },
      {
        id: "female",
        label: "Female",
        value: 95,
      },
      {
        id: "permanent",
        label: "Permanent",
        value: 60,
      },
      {
        id: "casual",
        label: "Casual",
        value: 50,
      },
      {
        id: "contractor",
        label: "Contractor",
        value: 10,
      },
    ],
  },

  /* =====================================================
     4. SELECT WORKERS
  ====================================================== */

  selectWorkers: {
    id: "select-workers",
    title: "Select Workers",
    iconKey: "users",

    search: {
      name: "workerSearch",
      placeholder: "Search by ID, Name or Mobile...",
    },

    filters: [
      {
        id: "worker-category",
        name: "workerCategory",
        label: "Category",
        type: "select",
        placeholder: "All Categories",
        options: [
          {
            value: "permanent",
            label: "Permanent",
          },
          {
            value: "casual",
            label: "Casual",
          },
          {
            value: "contractor",
            label: "Contractor",
          },
        ],
      },

      {
        id: "worker-skill",
        name: "workerSkill",
        label: "Skill",
        type: "select",
        placeholder: "All Skills",
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
        ],
      },

      {
        id: "worker-status",
        name: "workerStatus",
        label: "Status",
        type: "select",
        placeholder: "All Status",
        options: [
          {
            value: "active",
            label: "Active",
          },
          {
            value: "inactive",
            label: "Inactive",
          },
        ],
      },
    ],

    actions: [
      {
        id: "add-worker",
        label: "Add Worker",
        action: "addWorker",
        variant: "primary",
        iconKey: "plus",
      },
    ],

    table: {
      selectable: true,

      columns: [
        {
          id: "workerId",
          key: "workerId",
          label: "Worker ID",
        },
        {
          id: "workerName",
          key: "workerName",
          label: "Worker Name",
        },
        {
          id: "gender",
          key: "gender",
          label: "Gender",
        },
        {
          id: "category",
          key: "category",
          label: "Category",
        },
        {
          id: "skill",
          key: "skill",
          label: "Skill",
        },
        {
          id: "attendanceStatus",
          key: "attendanceStatus",
          label: "Attendance Status",
        },
        {
          id: "status",
          key: "status",
          label: "Status",
        },
      ],

      rows: [
        {
          id: "WRK-10001",
          workerId: "WRK-10001",
          workerName: "Rupa Rani Tanti",
          gender: "Female",
          category: "Permanent",
          skill: "Plucking",
          attendanceStatus: "Present",
          status: "Active",
          selected: true,
        },
        {
          id: "WRK-10002",
          workerId: "WRK-10002",
          workerName: "Maya Barman",
          gender: "Female",
          category: "Permanent",
          skill: "Plucking",
          attendanceStatus: "Present",
          status: "Active",
          selected: true,
        },
        {
          id: "WRK-10003",
          workerId: "WRK-10003",
          workerName: "Salma Begum",
          gender: "Female",
          category: "Casual",
          skill: "Plucking",
          attendanceStatus: "Present",
          status: "Active",
          selected: true,
        },
        {
          id: "WRK-10004",
          workerId: "WRK-10004",
          workerName: "Lata Rani Saha",
          gender: "Female",
          category: "Casual",
          skill: "Plucking",
          attendanceStatus: "Present",
          status: "Active",
          selected: true,
        },
        {
          id: "WRK-10005",
          workerId: "WRK-10005",
          workerName: "Jharna Das",
          gender: "Female",
          category: "Permanent",
          skill: "Plucking",
          attendanceStatus: "Present",
          status: "Active",
          selected: true,
        },
        {
          id: "WRK-10006",
          workerId: "WRK-10006",
          workerName: "Purnima Roy",
          gender: "Female",
          category: "Permanent",
          skill: "Pruning",
          attendanceStatus: "Absent",
          status: "Inactive",
          selected: false,
        },
      ],
    },

    pagination: {
      currentPage: 1,
      totalPages: 42,
      pageSize: 6,
      totalItems: 250,
    },
  },

  /* =====================================================
     WORK TIME & SHIFT
  ====================================================== */

  workTimeShift: {
    id: "work-time-shift",
    title: "Work Time & Shift",
    iconKey: "clock",

    fields: [
      {
        id: "shift",
        name: "shift",
        label: "Shift",
        type: "select",
        placeholder: "Select Shift",
        required: true,
        options: [
          {
            value: "day-shift",
            label: "Day Shift",
          },
          {
            value: "morning-shift",
            label: "Morning Shift",
          },
          {
            value: "evening-shift",
            label: "Evening Shift",
          },
        ],
      },

      {
        id: "start-time",
        name: "startTime",
        label: "Start Time",
        type: "time",
        defaultValue: "06:00",
        required: true,
      },

      {
        id: "end-time",
        name: "endTime",
        label: "End Time",
        type: "time",
        defaultValue: "14:00",
        required: true,
      },

      {
        id: "break-time",
        name: "breakTime",
        label: "Break Time",
        type: "select",
        placeholder: "Select Break Time",
        required: false,
        options: [
          {
            value: "15",
            label: "15 Min",
          },
          {
            value: "30",
            label: "30 Min",
          },
          {
            value: "45",
            label: "45 Min",
          },
          {
            value: "60",
            label: "60 Min",
          },
        ],
      },

      {
        id: "working-hours",
        name: "workingHours",
        label: "Working Hours",
        type: "text",
        defaultValue: "07h 30m",
        disabled: true,
        required: false,
      },
    ],
  },

  /* =====================================================
     EQUIPMENT / TOOLS
  ====================================================== */

  equipmentToolsAllocation: {
    title: "Equipment / Tools Allocation",

    fields: [
      {
        id: "plucking-basket",
        name: "pluckingBasket",
        label: "Plucking Basket",
        type: "number",
        defaultValue: 120,
        validation: {
          min: 0,
        },
      },

      {
        id: "shear-scissor",
        name: "shearScissor",
        label: "Shear / Scissor",
        type: "number",
        defaultValue: 120,
        validation: {
          min: 0,
        },
      },

      {
        id: "apron-bag",
        name: "apronBag",
        label: "Apron / Bag",
        type: "number",
        defaultValue: 120,
        validation: {
          min: 0,
        },
      },

      {
        id: "gloves",
        name: "gloves",
        label: "Gloves",
        type: "number",
        defaultValue: 0,
        validation: {
          min: 0,
        },
      },

      {
        id: "other-tools",
        name: "otherTools",
        label: "Other Tools",
        type: "text",
        defaultValue: "",
        placeholder: "Enter other tools",
      },

      {
        id: "vehicle-transport",
        name: "vehicleTransport",
        label: "Vehicle / Transport",
        type: "text",
        defaultValue: "N/A",
        placeholder: "Enter vehicle / transport",
      },
    ],
  },

  /* =====================================================
     5. WAGE / RATE INFORMATION
  ====================================================== */

  wageRateInformation: {
    id: "wage-rate-information",
    title: "Wage / Rate Information",
    iconKey: "wallet",

    fields: [
      {
        id: "wage-type",
        name: "wageType",
        label: "Wage Type",
        type: "select",
        placeholder: "Select Wage Type",
        required: true,
        options: [
          {
            value: "per-kg",
            label: "Per Kg (Plucking)",
          },
          {
            value: "per-day",
            label: "Per Day",
          },
          {
            value: "per-acre",
            label: "Per Acre",
          },
        ],
      },

      {
        id: "rate-per-kg",
        name: "ratePerKg",
        label: "Rate Per Kg (৳)",
        type: "number",
        defaultValue: 30,
        required: false,
        validation: {
          min: 0,
        },
      },

      {
        id: "daily-minimum",
        name: "dailyMinimum",
        label: "Daily Minimum (৳)",
        type: "number",
        defaultValue: 450,
        required: false,
        validation: {
          min: 0,
        },
      },

      {
        id: "incentive-bonus",
        name: "incentiveBonus",
        label: "Incentive / Bonus",
        type: "select",
        placeholder: "Select",
        required: false,
        options: [
          {
            value: "yes",
            label: "Yes",
          },
          {
            value: "no",
            label: "No",
          },
        ],
      },

      {
        id: "incentive-rate",
        name: "incentiveRate",
        label: "Incentive Rate (৳/Kg)",
        type: "number",
        defaultValue: 5,
        required: false,
        validation: {
          min: 0,
        },
      },

      {
        id: "overtime-eligible",
        name: "overtimeEligible",
        label: "Overtime Eligible",
        type: "select",
        placeholder: "Select",
        required: false,
        options: [
          {
            value: "yes",
            label: "Yes",
          },
          {
            value: "no",
            label: "No",
          },
        ],
      },
    ],
  },

  /* =====================================================
     6. REMARKS & NOTES
  ====================================================== */

  remarksNotes: {
    id: "remarks-notes",
    title: "Remarks & Notes",
    iconKey: "fileText",

    fields: [
      {
        id: "special-instructions",
        name: "specialInstructions",
        label: "Special Instructions",
        type: "textarea",
        placeholder: "Enter special instructions...",
        required: false,
      },

      {
        id: "weather-condition",
        name: "weatherCondition",
        label: "Weather Condition",
        type: "select",
        placeholder: "Select Weather",
        required: false,
        options: [
          {
            value: "sunny",
            label: "Sunny",
          },
          {
            value: "cloudy",
            label: "Cloudy",
          },
          {
            value: "rainy",
            label: "Rainy",
          },
        ],
      },

      {
        id: "safety-note",
        name: "safetyNote",
        label: "Safety Note",
        type: "textarea",
        placeholder: "Enter safety note...",
        required: false,
      },
    ],
  },

  /* =====================================================
     7. APPROVAL
  ====================================================== */

  approval: {
    id: "approval",
    title: "Approval",
    iconKey: "shieldCheck",

    fields: [
      {
        id: "approved-by",
        name: "approvedBy",
        label: "Approved By",
        type: "select",
        placeholder: "Select Approver",
        required: false,
        options: [
          {
            value: "rahim-uddin",
            label: "Rahim Uddin",
          },
          {
            value: "jalal-mia",
            label: "Jalal Mia",
          },
        ],
      },

      {
        id: "designation",
        name: "designation",
        label: "Designation",
        type: "select",
        placeholder: "Select Designation",
        required: false,
        options: [
          {
            value: "field-supervisor",
            label: "Field Supervisor",
          },
          {
            value: "estate-manager",
            label: "Estate Manager",
          },
          {
            value: "hr-manager",
            label: "HR Manager",
          },
        ],
      },

      {
        id: "approval-date",
        name: "approvalDate",
        label: "Approval Date",
        type: "date",
        defaultValue: "2026-06-01",
        required: false,
      },

      {
        id: "approval-status",
        name: "approvalStatus",
        label: "Status",
        type: "select",
        placeholder: "Select Status",
        required: false,
        options: [
          {
            value: "pending",
            label: "Pending",
          },
          {
            value: "approved",
            label: "Approved",
          },
          {
            value: "rejected",
            label: "Rejected",
          },
        ],
      },

      {
        id: "approval-remarks",
        name: "approvalRemarks",
        label: "Remarks",
        type: "textarea",
        placeholder: "Enter approval remarks...",
        required: false,
      },
    ],
  },

  /* =====================================================
     BOTTOM ACTIONS
  ====================================================== */

  bottomActions: [
    {
      id: "reset",
      label: "Reset",
      action: "reset",
      variant: "secondary",
    },
    {
      id: "save-draft",
      label: "Save as Draft",
      action: "draft",
      variant: "secondary",
    },
    {
      id: "save-submit",
      label: "Save & Submit",
      action: "submit",
      variant: "primary",
    },
  ],
};
