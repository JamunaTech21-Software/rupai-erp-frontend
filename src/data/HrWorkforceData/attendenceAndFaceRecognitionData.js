export const attendanceAndFaceRecognitionData = {
  // =====================================================
  // PAGE HEADER / TOP NAVIGATION
  // =====================================================

  pageNavigation: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/hr-workforce/attendance-face-recognition",
      active: true,
    },
    {
      id: "daily-attendance",
      label: "Daily Attendance",
      path: "/hr-workforce/attendance-face-recognition/daily-attendance",
      active: false,
    },
    {
      id: "attendance-sheet",
      label: "Attendance Sheet",
      path: "/hr-workforce/attendance-face-recognition/attendance-sheet",
      active: false,
    },
    {
      id: "reports",
      label: "Reports",
      path: "/hr-workforce/attendance-face-recognition/reports",
      active: false,
    },
    {
      id: "device-management",
      label: "Device Management",
      path: "/hr-workforce/attendance-face-recognition/device-management",
      active: false,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/hr-workforce/attendance-face-recognition/settings",
      active: false,
    },
  ],

  // =====================================================
  // TOP ACTIONS
  // =====================================================

  topActions: [
    {
      id: "live-monitor",
      label: "Live Attendance Monitor",
      type: "primary",
      action: "live-monitor",
    },
    {
      id: "export",
      label: "Export",
      type: "secondary",
      action: "export",
    },
    {
      id: "more",
      label: "More",
      type: "secondary",
      action: "more",
      hasDropdown: true,
    },
  ],

  // =====================================================
  // SUMMARY CARDS
  // =====================================================

  summaryCards: [
    {
      id: "total-workers",
      title: "Total Workers",
      value: 2458,
      subtitle: "All Active Workers",
      percentage: null,
      status: "total",
    },
    {
      id: "present-today",
      title: "Present Today",
      value: 1856,
      subtitle: "Present Workers",
      percentage: "75.58%",
      status: "present",
    },
    {
      id: "absent-today",
      title: "Absent Today",
      value: 482,
      subtitle: "Absent Workers",
      percentage: "19.64%",
      status: "absent",
    },
    {
      id: "on-leave",
      title: "On Leave",
      value: 96,
      subtitle: "Workers on Leave",
      percentage: "3.91%",
      status: "leave",
    },
    {
      id: "late-today",
      title: "Late Today",
      value: 124,
      subtitle: "Late Workers",
      percentage: "5.05%",
      status: "late",
    },
  ],

  // =====================================================
  // FILTERS
  // =====================================================

  // =====================================================
  // FILTERS
  // =====================================================

  filters: {
    // ---------------------------------------------------
    // DATE
    // ---------------------------------------------------

    date: {
      name: "date",
      label: "Date",
      type: "date",
      defaultValue: "2026-06-01",
    },

    // ---------------------------------------------------
    // GARDEN / UNIT
    // ---------------------------------------------------

    garden: {
      name: "garden",
      label: "Garden / Unit",
      type: "select",
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
          value: "main-garden",
          label: "Main Garden",
        },
        {
          value: "north-garden",
          label: "North Garden",
        },
        {
          value: "south-garden",
          label: "South Garden",
        },
        {
          value: "east-garden",
          label: "East Garden",
        },
        {
          value: "west-garden",
          label: "West Garden",
        },
      ],
    },

    // ---------------------------------------------------
    // SECTION
    // ---------------------------------------------------

    section: {
      name: "section",
      label: "Section",
      type: "select",
      placeholder: "All Sections",

      options: [
        {
          value: "all",
          label: "All Sections",
        },
        {
          value: "north-section",
          label: "North Section",
        },
        {
          value: "south-section",
          label: "South Section",
        },
        {
          value: "central-section",
          label: "Central Section",
        },
        {
          value: "east-section",
          label: "East Section",
        },
        {
          value: "west-section",
          label: "West Section",
        },
      ],
    },

    // ---------------------------------------------------
    // SHIFT
    // ---------------------------------------------------

    shift: {
      name: "shift",
      label: "Shift",
      type: "select",
      placeholder: "All Shifts",

      options: [
        {
          value: "all",
          label: "All Shifts",
        },
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
        {
          value: "night-shift",
          label: "Night Shift",
        },
      ],
    },

    // ---------------------------------------------------
    // STATUS
    // ---------------------------------------------------

    status: {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "All Status",

      options: [
        {
          value: "all",
          label: "All Status",
        },
        {
          value: "present",
          label: "Present",
        },
        {
          value: "absent",
          label: "Absent",
        },
        {
          value: "late",
          label: "Late",
        },
        {
          value: "on-leave",
          label: "On Leave",
        },
        {
          value: "check-out",
          label: "Check Out",
        },
      ],
    },

    // ---------------------------------------------------
    // SEARCH
    // ---------------------------------------------------

    search: {
      name: "search",
      label: "Search",
      type: "search",
      placeholder: "Search by ID, Name, Mobile...",
    },

    // ---------------------------------------------------
    // FILTER BUTTON
    // ---------------------------------------------------

    filterButton: {
      label: "Filter",
      action: "apply-filter",
    },
  },

  // =====================================================
  // TODAY'S ATTENDANCE TABLE
  // =====================================================

  attendanceTable: {
    title: "Today's Attendance",

    // ---------------------------------------------------
    // TABLE HEADERS
    // ---------------------------------------------------

    headers: [
      {
        id: "sl",
        label: "SL",
        key: "sl",
      },
      {
        id: "worker-id",
        label: "Worker ID",
        key: "workerId",
      },
      {
        id: "worker-name",
        label: "Worker Name",
        key: "workerName",
      },
      {
        id: "section",
        label: "Section",
        key: "section",
      },
      {
        id: "shift",
        label: "Shift",
        key: "shift",
      },
      {
        id: "check-in",
        label: "Check In",
        key: "checkIn",
      },
      {
        id: "check-out",
        label: "Check Out",
        key: "checkOut",
      },
      {
        id: "status",
        label: "Status",
        key: "status",
      },
      {
        id: "method",
        label: "Method",
        key: "method",
      },
      {
        id: "photo",
        label: "Photo",
        key: "photo",
      },
      {
        id: "action",
        label: "Action",
        key: "action",
      },
    ],

    // ---------------------------------------------------
    // TABLE ROWS
    // ---------------------------------------------------

    rows: [
      {
        sl: 1,
        workerId: "WRK-10001",
        workerName: "Rupa Rani Tanti",
        workerPhoto: "https://randomuser.me/api/portraits/women/44.jpg",
        section: "North Section",
        shift: "Day Shift",
        checkIn: "07:12 AM",
        checkOut: "04:28 PM",
        status: "Present",
        method: "Face Recognition",
        action: {
          view: true,
          more: true,
        },
      },

      {
        sl: 2,
        workerId: "WRK-10002",
        workerName: "Maya Barman",
        workerPhoto: "https://randomuser.me/api/portraits/women/68.jpg",
        section: "North Section",
        shift: "Day Shift",
        checkIn: "07:18 AM",
        checkOut: "04:35 PM",
        status: "Present",
        method: "Face Recognition",
        action: {
          view: true,
          more: true,
        },
      },

      {
        sl: 3,
        workerId: "WRK-10003",
        workerName: "Purnima Roy",
        workerPhoto: "https://randomuser.me/api/portraits/men/32.jpg",
        section: "Central Section",
        shift: "Day Shift",
        checkIn: "07:25 AM",
        checkOut: null,
        status: "Present",
        method: "Face Recognition",
        action: {
          view: true,
          more: true,
        },
      },

      {
        sl: 4,
        workerId: "WRK-10004",
        workerName: "Jhana Das",
        workerPhoto: "https://randomuser.me/api/portraits/women/65.jpg",
        section: "South Section",
        shift: "Day Shift",
        checkIn: "07:45 AM",
        checkOut: null,
        status: "Late",
        method: "Face Recognition",
        action: {
          view: true,
          more: true,
        },
      },

      {
        sl: 5,
        workerId: "WRK-10005",
        workerName: "Babul Sutradhar",
        workerPhoto: "https://randomuser.me/api/portraits/men/45.jpg",
        section: "East Section",
        shift: "Day Shift",
        checkIn: null,
        checkOut: null,
        status: "Absent",
        method: null,
        action: {
          view: true,
          more: true,
        },
      },

      {
        sl: 6,
        workerId: "WRK-10006",
        workerName: "Lata Rani Saha",
        workerPhoto: "https://randomuser.me/api/portraits/women/33.jpg",
        section: "North Section",
        shift: "Day Shift",
        checkIn: null,
        checkOut: null,
        status: "On Leave",
        method: null,
        action: {
          view: true,
          more: true,
        },
      },

      {
        sl: 7,
        workerId: "WRK-10007",
        workerName: "Ratan Tanti",
        workerPhoto: "https://randomuser.me/api/portraits/men/52.jpg",
        section: "Central Section",
        shift: "Day Shift",
        checkIn: "07:08 AM",
        checkOut: "04:10 PM",
        status: "Present",
        method: "Face Recognition",
        action: {
          view: true,
          more: true,
        },
      },

      {
        sl: 8,
        workerId: "WRK-10008",
        workerName: "Sukur Ali",
        workerPhoto: "https://randomuser.me/api/portraits/men/68.jpg",
        section: "West Section",
        shift: "Day Shift",
        checkIn: "07:08 AM",
        checkOut: "04:20 PM",
        status: "Present",
        method: "Face Recognition",
        action: {
          view: true,
          more: true,
        },
      },
    ],

    // ---------------------------------------------------
    // PAGINATION
    // ---------------------------------------------------

    pagination: {
      currentPage: 1,
      totalPages: 308,
      totalEntries: 2458,
      entriesPerPage: 8,

      showingFrom: 1,
      showingTo: 8,

      pageNumbers: [1, 2, 3, 4, 5],

      showEllipsis: true,

      previousLabel: "Previous",
      nextLabel: "Next",
    },

    // ---------------------------------------------------
    // EMPTY STATE
    // ---------------------------------------------------

    emptyState: {
      title: "No Attendance Records",
      message: "No attendance records found for the selected filters.",
    },
  },

  // =====================================================
  // LIVE CAMERA FEED
  // =====================================================

  // =====================================================
  // LIVE CAMERA FEED
  // =====================================================

  liveCameraFeed: {
    title: "Live Camera Feed",
    status: "Live",

    camera: {
      id: "main-gate-camera",
      name: "Main Gate Camera",
      location: "Main Gate",
      deviceId: "CAM-MG-001",
      streamUrl: null,
      isLive: true,
    },

    capturedWorker: {
      workerId: "WRK-10001",
      name: "Rupa Rani Tanti",

      // Same image used in attendance table
      photo: "https://randomuser.me/api/portraits/women/44.jpg",

      section: "North Section",
      status: "Present",
      device: "Main Gate Device",

      capturedAt: "07:12:35 AM",
      date: "01-06-2026",
      day: "Monday",
    },

    captureResult: {
      status: "success",
      message: "Capture Success",
      confidence: "98.7%",
    },
  },

  // =====================================================
  // ATTENDANCE BY STATUS
  // =====================================================

  attendanceByStatus: {
    title: "Attendance by Status",

    total: 2458,

    data: [
      {
        id: "present",
        label: "Present",
        value: 1856,
        percentage: "75.58%",
        status: "present",
      },
      {
        id: "absent",
        label: "Absent",
        value: 482,
        percentage: "19.64%",
        status: "absent",
      },
      {
        id: "on-leave",
        label: "On Leave",
        value: 96,
        percentage: "3.91%",
        status: "leave",
      },
      {
        id: "late",
        label: "Late",
        value: 124,
        percentage: "5.05%",
        status: "late",
      },
    ],
  },

  // =====================================================
  // ATTENDANCE TREND
  // =====================================================

  attendanceTrend: {
    title: "Attendance Trend (This Week)",

    period: "This Week",

    data: [
      {
        day: "Mon",
        date: "26 May",
        attendanceRate: 68.2,
      },
      {
        day: "Tue",
        date: "27 May",
        attendanceRate: 71.4,
      },
      {
        day: "Wed",
        date: "28 May",
        attendanceRate: 74.8,
      },
      {
        day: "Thu",
        date: "29 May",
        attendanceRate: 72.6,
      },
      {
        day: "Fri",
        date: "30 May",
        attendanceRate: 76.1,
      },
      {
        day: "Sat",
        date: "31 May",
        attendanceRate: 60.3,
      },
      {
        day: "Sun",
        date: "01 Jun",
        attendanceRate: 75.6,
      },
    ],
  },

  // =====================================================
  // DEVICE STATUS
  // =====================================================

  deviceStatus: {
    title: "Device Status",

    devices: [
      {
        id: "device-001",
        name: "Main Gate Device",
        deviceCode: "DEV-MG-001",
        location: "Main Gate",
        type: "Face Recognition",
        status: "Online",
        lastSync: "Just Now",
      },
      {
        id: "device-002",
        name: "Factory Gate Device",
        deviceCode: "DEV-FG-001",
        location: "Factory Gate",
        type: "Face Recognition",
        status: "Online",
        lastSync: "1 min ago",
      },
      {
        id: "device-003",
        name: "South Section Device",
        deviceCode: "DEV-SS-001",
        location: "South Section",
        type: "Face Recognition",
        status: "Online",
        lastSync: "2 min ago",
      },
      {
        id: "device-004",
        name: "West Section Device",
        deviceCode: "DEV-WS-001",
        location: "West Section",
        type: "Face Recognition",
        status: "Offline",
        lastSync: "25 min ago",
      },
      {
        id: "device-005",
        name: "North Section Device",
        deviceCode: "DEV-NS-001",
        location: "North Section",
        type: "Face Recognition",
        status: "Online",
        lastSync: "1 min ago",
      },
    ],
  },

  // =====================================================
  // RECENT ATTENDANCE LOGS
  // =====================================================

  recentAttendanceLogs: {
    title: "Recent Attendance Logs",

    logs: [
      {
        id: "log-001",
        workerId: "WRK-10001",
        workerName: "Rupa Rani Tanti",
        workerPhoto: "/workers/worker-01.jpg",
        time: "07:12 AM",
        status: "Present",
        method: "Face Recognition",
        device: "Main Gate Device",
      },
      {
        id: "log-002",
        workerId: "WRK-10002",
        workerName: "Maya Barman",
        workerPhoto: "/workers/worker-02.jpg",
        time: "07:18 AM",
        status: "Present",
        method: "Face Recognition",
        device: "Main Gate Device",
      },
      {
        id: "log-003",
        workerId: "WRK-10007",
        workerName: "Ratan Tanti",
        workerPhoto: "/workers/worker-07.jpg",
        time: "07:08 AM",
        status: "Present",
        method: "Face Recognition",
        device: "North Section Device",
      },
      {
        id: "log-004",
        workerId: "WRK-10004",
        workerName: "Jhana Das",
        workerPhoto: "/workers/worker-04.jpg",
        time: "07:45 AM",
        status: "Late",
        method: "Face Recognition",
        device: "South Section Device",
      },
      {
        id: "log-005",
        workerId: "WRK-10005",
        workerName: "Babul Sutradhar",
        workerPhoto: "/workers/worker-05.jpg",
        time: "06:58 PM",
        status: "Check Out",
        method: "Face Recognition",
        device: "Main Gate Device",
      },
    ],
  },

  // =====================================================
  // TODAY'S SUMMARY
  // =====================================================

  todaySummary: {
    title: "Today's Summary",

    items: [
      {
        id: "average-check-in",
        label: "Average Check In Time",
        value: "07:21 AM",
        type: "time",
      },
      {
        id: "average-check-out",
        label: "Average Check Out Time",
        value: "04:24 PM",
        type: "time",
      },
      {
        id: "attendance-rate",
        label: "Attendance Rate",
        value: "75.58%",
        type: "percentage",
      },
      {
        id: "total-working-hours",
        label: "Total Working Hours",
        value: "8h 15m",
        type: "duration",
      },
    ],
  },

  // =====================================================
  // ATTENDANCE STATUS CONFIG
  // =====================================================
  // এখানে icon রাখছি না।
  // UI component-এ lucide-react থেকে icon map করা হবে।

  statusConfig: {
    Present: {
      label: "Present",
      colorType: "success",
    },

    Absent: {
      label: "Absent",
      colorType: "danger",
    },

    Late: {
      label: "Late",
      colorType: "warning",
    },

    "On Leave": {
      label: "On Leave",
      colorType: "info",
    },

    "Check Out": {
      label: "Check Out",
      colorType: "neutral",
    },
  },

  // =====================================================
  // DEVICE STATUS CONFIG
  // =====================================================

  deviceStatusConfig: {
    Online: {
      label: "Online",
      colorType: "success",
    },

    Offline: {
      label: "Offline",
      colorType: "danger",
    },

    Maintenance: {
      label: "Maintenance",
      colorType: "warning",
    },
  },

  // =====================================================
  // EMPTY STATES
  // =====================================================

  emptyStates: {
    attendance: {
      title: "No Attendance Records",
      message: "No attendance records found for the selected filters.",
    },

    camera: {
      title: "Camera Unavailable",
      message: "Live camera feed is currently unavailable.",
    },

    logs: {
      title: "No Recent Logs",
      message: "There are no recent attendance logs.",
    },

    devices: {
      title: "No Devices Found",
      message: "No attendance devices are currently configured.",
    },
  },

  // =====================================================
  // TABLE ACTIONS
  // =====================================================

  tableActions: [
    {
      id: "view",
      label: "View",
      action: "view",
    },
    {
      id: "details",
      label: "Details",
      action: "details",
    },
  ],

  // =====================================================
  // EXPORT OPTIONS
  // =====================================================

  exportOptions: [
    {
      id: "excel",
      label: "Export as Excel",
      format: "xlsx",
    },
    {
      id: "csv",
      label: "Export as CSV",
      format: "csv",
    },
    {
      id: "pdf",
      label: "Export as PDF",
      format: "pdf",
    },
  ],
};
