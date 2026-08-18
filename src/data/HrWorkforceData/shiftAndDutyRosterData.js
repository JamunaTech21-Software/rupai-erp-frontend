export const shiftAndDutyRosterData = {
  // =========================================================
  // TOP ACTIONS
  // =========================================================
  topActions: [
    {
      id: "create-shift",
      label: "Create Shift",
      action: "create-shift",
      variant: "primary",
      iconKey: "plus",
    },
    {
      id: "generate-roster",
      label: "Generate Roster",
      action: "generate-roster",
      variant: "primary",
      iconKey: "wand",
    },
    {
      id: "export",
      label: "Export",
      action: "export",
      variant: "secondary",
      iconKey: "download",
    },
    {
      id: "more",
      label: "More",
      action: "more",
      variant: "secondary",
      iconKey: "more",
      hasDropdown: true,
    },
  ],

  // =========================================================
  // SUMMARY CARDS
  // =========================================================
  summaryCards: [
    {
      id: "total-shifts",
      title: "Total Shifts",
      value: 4,
      displayValue: "4",
      subtitle: "Active Shifts",
      iconKey: "clock",
      cardClass: "bg-green-50",
      iconClass: "bg-green-100 text-green-700",
    },

    {
      id: "total-workers",
      title: "Total Workers",
      value: 2458,
      displayValue: "2,458",
      subtitle: "Assigned This Month",
      iconKey: "users",
      cardClass: "bg-blue-50",
      iconClass: "bg-blue-100 text-blue-700",
    },

    {
      id: "departments",
      title: "Departments",
      value: 8,
      displayValue: "8",
      subtitle: "Active Departments",
      iconKey: "building",
      cardClass: "bg-purple-50",
      iconClass: "bg-purple-100 text-purple-700",
    },

    {
      id: "todays-coverage",
      title: "Today's Coverage",
      value: 98.2,
      displayValue: "98.2%",
      subtitle: "Good",
      iconKey: "calendarCheck",
      cardClass: "bg-orange-50",
      iconClass: "bg-orange-100 text-orange-700",
    },
  ],

  // =========================================================
  // FILTERS
  // =========================================================
  filters: {
    gardens: [
      { value: "all", label: "All Gardens" },
      { value: "jamuna", label: "Jamuna Tea Estate" },
      { value: "sylhet", label: "Sylhet Tea Estate" },
      { value: "moulvibazar", label: "Moulvibazar Tea Estate" },
    ],

    departments: [
      { value: "all", label: "All Departments" },
      { value: "plucking", label: "Plucking" },
      { value: "pruning", label: "Pruning" },
      { value: "weeding", label: "Weeding" },
      { value: "transport", label: "Transport" },
      { value: "factory", label: "Factory" },
      { value: "maintenance", label: "Maintenance" },
      { value: "security", label: "Security" },
    ],

    sections: [
      { value: "all", label: "All Sections" },
      { value: "north", label: "North Section" },
      { value: "south", label: "South Section" },
      { value: "east", label: "East Section" },
      { value: "west", label: "West Section" },
    ],

    shifts: [
      { value: "all", label: "All Shifts" },
      { value: "day", label: "Day Shift" },
      { value: "evening", label: "Evening Shift" },
      { value: "night", label: "Night Shift" },
      { value: "general", label: "General Shift" },
    ],
  },

  // =========================================================
  // ROSTER VIEW
  // =========================================================
  roster: {
    title: "Roster",
    dateLabel: "01 June - 07 June 2026",

    viewTabs: [
      {
        id: "weekly",
        label: "Weekly Roster View",
        value: "weekly",
        active: true,
      },
      {
        id: "daily",
        label: "Daily View",
        value: "daily",
        active: false,
      },
      {
        id: "list",
        label: "List View",
        value: "list",
        active: false,
      },
    ],

    legends: [
      {
        id: "day",
        label: "Day Shift",
        shortCode: "D",
        color: "green",
      },
      {
        id: "evening",
        label: "Evening Shift",
        shortCode: "E",
        color: "blue",
      },
      {
        id: "night",
        label: "Night Shift",
        shortCode: "N",
        color: "purple",
      },
      {
        id: "rest",
        label: "Rest / Off",
        shortCode: "R",
        color: "gray",
      },
    ],

    table: {
      selectable: false,

      columns: [
        {
          id: "sl",
          key: "sl",
          label: "SL",
        },
        {
          id: "worker-id",
          key: "workerId",
          label: "Worker ID",
        },
        {
          id: "worker-name",
          key: "workerName",
          label: "Worker Name",
        },
        {
          id: "department",
          key: "department",
          label: "Department",
        },
        {
          id: "mon",
          key: "mon",
          label: "Mon",
        },
        {
          id: "tue",
          key: "tue",
          label: "Tue",
        },
        {
          id: "wed",
          key: "wed",
          label: "Wed",
        },
        {
          id: "thu",
          key: "thu",
          label: "Thu",
        },
        {
          id: "fri",
          key: "fri",
          label: "Fri",
        },
        {
          id: "sat",
          key: "sat",
          label: "Sat",
        },
        {
          id: "sun",
          key: "sun",
          label: "Sun",
        },
        {
          id: "weekly-summary",
          key: "weeklySummary",
          label: "Weekly Summary",
        },
      ],

      rows: [
        {
          sl: 1,
          workerId: "WRK-10001",
          workerName: "Rupa Rani Tanti",
          photoUrl: "https://i.pravatar.cc/100?img=47",
          department: "Plucking",

          mon: "D",
          tue: "D",
          wed: "E",
          thu: "E",
          fri: "D",
          sat: "R",
          sun: "R",

          weeklySummary: {
            day: 4,
            evening: 2,
            night: 0,
            rest: 2,
            hours: "48h",
          },
        },

        {
          sl: 2,
          workerId: "WRK-10002",
          workerName: "Maya Barman",
          photoUrl: "https://i.pravatar.cc/100?img=32",
          department: "Plucking",

          mon: "E",
          tue: "E",
          wed: "N",
          thu: "N",
          fri: "E",
          sat: "R",
          sun: "R",

          weeklySummary: {
            day: 0,
            evening: 3,
            night: 2,
            rest: 2,
            hours: "48h",
          },
        },

        {
          sl: 3,
          workerId: "WRK-10003",
          workerName: "Purnima Roy",
          photoUrl: "https://i.pravatar.cc/100?img=12",
          department: "Pruning",

          mon: "D",
          tue: "D",
          wed: "D",
          thu: "E",
          fri: "D",
          sat: "R",
          sun: "R",

          weeklySummary: {
            day: 4,
            evening: 1,
            night: 0,
            rest: 2,
            hours: "48h",
          },
        },

        {
          sl: 4,
          workerId: "WRK-10004",
          workerName: "Jhana Das",
          photoUrl: "https://i.pravatar.cc/100?img=44",
          department: "Weeding",

          mon: "N",
          tue: "N",
          wed: "N",
          thu: "D",
          fri: "N",
          sat: "R",
          sun: "R",

          weeklySummary: {
            day: 1,
            evening: 0,
            night: 4,
            rest: 2,
            hours: "48h",
          },
        },

        {
          sl: 5,
          workerId: "WRK-10005",
          workerName: "Babual Sutradhar",
          photoUrl: "https://i.pravatar.cc/100?img=15",
          department: "Transport",

          mon: "D",
          tue: "E",
          wed: "E",
          thu: "E",
          fri: "D",
          sat: "R",
          sun: "R",

          weeklySummary: {
            day: 2,
            evening: 3,
            night: 0,
            rest: 2,
            hours: "48h",
          },
        },

        {
          sl: 6,
          workerId: "WRK-10006",
          workerName: "Lata Rani Saha",
          photoUrl: "https://i.pravatar.cc/100?img=49",
          department: "Factory",

          mon: "E",
          tue: "E",
          wed: "N",
          thu: "N",
          fri: "E",
          sat: "R",
          sun: "R",

          weeklySummary: {
            day: 0,
            evening: 3,
            night: 2,
            rest: 2,
            hours: "48h",
          },
        },

        {
          sl: 7,
          workerId: "WRK-10007",
          workerName: "Ratan Tanti",
          photoUrl: "https://i.pravatar.cc/100?img=11",
          department: "Maintenance",

          mon: "D",
          tue: "D",
          wed: "E",
          thu: "D",
          fri: "E",
          sat: "R",
          sun: "R",

          weeklySummary: {
            day: 3,
            evening: 2,
            night: 0,
            rest: 2,
            hours: "48h",
          },
        },

        {
          sl: 8,
          workerId: "WRK-10008",
          workerName: "Sukur Ali",
          photoUrl: "https://i.pravatar.cc/100?img=68",
          department: "Security",

          mon: "N",
          tue: "N",
          wed: "N",
          thu: "E",
          fri: "N",
          sat: "R",
          sun: "R",

          weeklySummary: {
            day: 0,
            evening: 1,
            night: 4,
            rest: 2,
            hours: "48h",
          },
        },
      ],
    },

    pagination: {
      currentPage: 1,
      perPage: 10,
      totalItems: 8,
      totalPages: 1,
      showingFrom: 1,
      showingTo: 8,
    },
  },

  // =========================================================
  // SHIFT INFORMATION
  // =========================================================
  shiftInformation: {
    title: "Shift Information",

    actions: [
      {
        id: "add-shift",
        label: "Add Shift",
        action: "add-shift",
        variant: "primary",
        iconKey: "plus",
      },
    ],

    columns: [
      {
        id: "shift-name",
        key: "shiftName",
        label: "Shift Name",
      },
      {
        id: "time",
        key: "time",
        label: "Time",
      },
      {
        id: "short-code",
        key: "shortCode",
        label: "Short Code",
      },
      {
        id: "status",
        key: "status",
        label: "Status",
      },
    ],

    // =========================
    // UPDATE THIS PART
    // =========================
    rows: [
      {
        id: "day",
        shiftName: "Day Shift",
        time: "06:00 AM - 02:00 PM",
        shortCode: "D",
        status: "Active",
        variant: "green",
      },
      {
        id: "evening",
        shiftName: "Evening Shift",
        time: "02:00 PM - 10:00 PM",
        shortCode: "E",
        status: "Active",
        variant: "blue",
      },
      {
        id: "night",
        shiftName: "Night Shift",
        time: "10:00 PM - 06:00 AM",
        shortCode: "N",
        status: "Active",
        variant: "purple",
      },
      {
        id: "general",
        shiftName: "General Shift",
        time: "08:00 AM - 05:00 PM",
        shortCode: "G",
        status: "Active",
        variant: "orange",
      },
    ],

    footerAction: {
      id: "view-all-shifts",
      label: "View All Shifts",
      action: "view-all",
    },
  },

  // =========================================================
  // DEPARTMENT COVERAGE
  // =========================================================
  // =========================================================
  // DEPARTMENT COVERAGE
  // =========================================================
  departmentCoverage: {
    title: "Department Coverage",
    subtitle: "This Week",

    data: [
      {
        id: "plucking",
        name: "Plucking",
        value: 68.5,
        color: "green",
      },
      {
        id: "pruning",
        name: "Pruning",
        value: 72.3,
        color: "blue",
      },
      {
        id: "weeding",
        name: "Weeding",
        value: 70.1,
        color: "purple",
      },
      {
        id: "factory",
        name: "Factory",
        value: 65.8,
        color: "orange",
      },
      {
        id: "others",
        name: "Others",
        value: 63.2,
        color: "gray",
      },
    ],
  },

  // =========================================================
  // QUICK ACTIONS
  // =========================================================
  quickActions: {
    title: "Quick Actions",

    actions: [
      {
        id: "create-shift",
        label: "Create Shift",
        iconKey: "plus",
        action: "create-shift",
      },
      {
        id: "generate-roster",
        label: "Generate Roster",
        iconKey: "calendar",
        action: "generate-roster",
      },
      {
        id: "bulk-assign",
        label: "Bulk Assign",
        iconKey: "users",
        action: "bulk-assign",
      },
      {
        id: "copy-roster",
        label: "Copy Roster",
        iconKey: "copy",
        action: "copy-roster",
      },
      {
        id: "print-roster",
        label: "Print Roster",
        iconKey: "printer",
        action: "print-roster",
      },
    ],
  },

  // =========================================================
  // TODAY'S SUMMARY
  // =========================================================
  todaySummary: {
    title: "Today's Summary",
    date: "01 June 2026",

    stats: [
      {
        id: "total-scheduled",
        label: "Total Scheduled",
        value: 2312,
        iconKey: "users",
        variant: "blue",
      },
      {
        id: "present",
        label: "Present",
        value: 2184,
        iconKey: "user-check",
        variant: "green",
      },
      {
        id: "absent",
        label: "Absent",
        value: 128,
        iconKey: "user-x",
        variant: "red",
      },
    ],

    coverage: {
      label: "Coverage",
      value: 94.46,
    },
  },

  // =========================================================
  // SHIFT DETAILS & RULES
  // =========================================================
  shiftDetails: {
    title: "Shift Details & Rules",

    shifts: [
      {
        id: "day",
        name: "Day Shift",
        shortCode: "D",
        variant: "green",

        schedule: {
          startTime: "06:00",
          endTime: "14:00",
        },

        workingHours: "8h 00m",
        breakTime: "30m",
        graceIn: "15m",
        graceOut: "15m",
      },

      {
        id: "evening",
        name: "Evening Shift",
        shortCode: "E",
        variant: "blue",

        schedule: {
          startTime: "14:00",
          endTime: "22:00",
        },

        workingHours: "8h 00m",
        breakTime: "30m",
        graceIn: "15m",
        graceOut: "15m",
      },

      {
        id: "night",
        name: "Night Shift",
        shortCode: "N",
        variant: "purple",

        schedule: {
          startTime: "22:00",
          endTime: "06:00",
        },

        workingHours: "8h 00m",
        breakTime: "30m",
        graceIn: "15m",
        graceOut: "15m",
      },

      {
        id: "general",
        name: "General Shift",
        shortCode: "G",
        variant: "orange",

        schedule: {
          startTime: "08:00",
          endTime: "17:00",
        },

        workingHours: "8h 00m",
        breakTime: "60m",
        graceIn: "15m",
        graceOut: "15m",
      },
    ],

    note: {
      iconKey: "check",
      text: "Roster is auto generated based on shift rules and worker availability. Manual shift editing can be performed when required.",
    },
  },

  // =========================================================
  // BOTTOM ACTIONS
  // =========================================================
  bottomActions: [
    {
      id: "reset",
      label: "Reset",
      action: "reset",
      variant: "secondary",
      iconKey: "reset",
    },
    {
      id: "save",
      label: "Save Roster",
      action: "save",
      variant: "primary",
      iconKey: "check",
    },
  ],
};
