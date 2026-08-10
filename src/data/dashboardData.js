export const navSections = [
  {
    label: null,
    items: [{ id: "dashboard", label: "Dashboard", icon: "Home", path: "/" }],
  },
  {
    items: [
      {
        id: "estate-mgmt",
        label: "Estate Management",
        icon: "Map",
        expandable: true,
        children: [
          {
            id: "estate-profile",
            label: "Estate Profile",
            path: "/estate-profile",
          },
          {
            id: "division-&-section",
            label: "Division & Section",
            path: "/division-&-section",
          },
          {
            id: "field-or-block-management",
            label: "Field/Block Management",
            path: "/field-or-block-management",
          },
          {
            id: "map-&-gis-tracking",
            label: "Map & GIS Tracking",
            path: "/map-&-gis-tracking",
          },
          {
            id: "land-&-lease-management",
            label: "Land & Lease Management",
            path: "/land-&-lease-management",
          },
        ],
      },
      {
        id: "Plantation-mgmt",
        label: "Plantation Management",
        icon: "Layers",
        expandable: true,
        children: [
          {
            id: "nursery-management",
            label: "Nursery Management",
            path: "/nursery-management",
          },
          {
            id: "field-planting",
            label: "Field Planting",
            path: "/field-planting",
          },
          {
            id: "replantin-&-gap-filling",
            label: "Replanting & Gap Filling",
            path: "/replanting-&-gap-filling",
          },
          {
            id: "plant-census",
            label: "Plant Census",
            path: "/plant-census",
          },
          {
            id: "bush-register",
            label: "Bush Register",
            path: "/bush-register",
          },
        ],
      },
      {
        id: "hr-&-workforce-management",
        label: "HR & Workforce Management",
        icon: "Users",
        expandable: true,
        children: [
          {
            id: "add-new-contractor",
            label: "Add New Contractor",
            path: "/add-new-contractor",
          },
          {
            id: "add-new-employee",
            label: "Add New Employee",
            path: "/add-new-employee",
          },
          {
            id: "add-new-worker",
            label: "Add New Worker",
            path: "/add-new-worker",
          },
          {
            id: "attendance-and-face-recognition",
            label: "Attendance (Face ID)",
            path: "/attendance-and-face-recognition",
          },
          {
            id: "contractor-management",
            label: "Contractor Management",
            path: "/contractor-management",
          },
          {
            id: "worker-management",
            label: "Worker Management",
            path: "/worker-management",
          },
        ],
      },
      {
        id: "replanting",
        label: "Replanting & Gap Filling",
        icon: "Replace",
        expandable: true,
        children: [
          { id: "replanting-entry", label: "Replanting Entry" },
          { id: "gap-filling", label: "Gap Filling" },
        ],
      },
      {
        id: "plant-census",
        label: "Plant Census",
        icon: "ClipboardList",
        expandable: true,
        children: [
          { id: "census-entry", label: "Census Entry" },
          { id: "census-report", label: "Census Report" },
        ],
      },
      {
        id: "bush-register",
        label: "Bush Register",
        icon: "BookOpen",
        expandable: true,
        children: [
          { id: "bush-list", label: "Bush List" },
          { id: "add-bush", label: "Add Bush Record" },
        ],
      },
    ],
  },
  {
    label: "Nursery Management",
    items: [
      {
        id: "nursery-mgmt",
        label: "Nursery Management",
        icon: "TreeDeciduous",
        expandable: true,
        children: [
          { id: "nursery-list", label: "Nursery List" },
          { id: "add-nursery", label: "Add Nursery" },
          { id: "nursery-stock", label: "Nursery Stock" },
        ],
      },
      {
        id: "seed-clone",
        label: "Seed & Clone Management",
        icon: "Flower2",
        expandable: true,
        children: [
          { id: "seed-stock", label: "Seed Stock" },
          { id: "clone-records", label: "Clone Records" },
        ],
      },
    ],
  },
  {
    label: "Workforce Management",
    items: [
      {
        id: "attendance",
        label: "Attendance (Face ID)",
        icon: "ScanFace",
        expandable: true,
        children: [
          { id: "daily-attendance", label: "Daily Attendance" },
          { id: "face-scan", label: "Face Recognition" },
          { id: "attendance-report", label: "Attendance Report" },
        ],
      },
      {
        id: "work-allocation",
        label: "Work Allocation",
        icon: "UserCog",
        expandable: true,
        children: [
          { id: "allocate-work", label: "Allocate Work" },
          { id: "allocation-list", label: "Allocation List" },
        ],
      },
      {
        id: "payroll",
        label: "Payroll & Wage",
        icon: "Wallet",
        expandable: true,
        children: [
          { id: "wage-process", label: "Process Wage" },
          { id: "payroll-history", label: "Payroll History" },
        ],
      },
      {
        id: "pf-gratuity",
        label: "PF, Gratuity & Advance",
        icon: "HandCoins",
        expandable: true,
        children: [
          { id: "pf-records", label: "PF Records" },
          { id: "gratuity", label: "Gratuity" },
          { id: "advance", label: "Advance" },
        ],
      },
    ],
  },
  {
    label: "Production Management",
    items: [
      {
        id: "plucking",
        label: "Plucking Management",
        icon: "Leaf",
        expandable: true,
        children: [
          { id: "plucking-entry", label: "Plucking Entry" },
          { id: "plucking-report", label: "Plucking Report" },
        ],
      },
      {
        id: "factory",
        label: "Factory & Manufacturing",
        icon: "Factory",
        expandable: true,
        children: [
          { id: "production-entry", label: "Production Entry" },
          { id: "batch-list", label: "Batch List" },
        ],
      },
      {
        id: "quality",
        label: "Quality Control",
        icon: "BadgeCheck",
        expandable: true,
        children: [
          { id: "qc-entry", label: "QC Entry" },
          { id: "qc-reports", label: "QC Reports" },
        ],
      },
      {
        id: "inventory",
        label: "Inventory & Store",
        icon: "Package",
        expandable: true,
        children: [
          { id: "stock-list", label: "Stock List" },
          { id: "add-stock", label: "Add Stock" },
          { id: "stock-out", label: "Stock Out" },
        ],
      },
    ],
  },
  {
    label: "Sales & Accounts",
    items: [
      {
        id: "sales",
        label: "Sales & Auction",
        icon: "ShoppingCart",
        expandable: true,
        children: [
          { id: "sales-entry", label: "Sales Entry" },
          { id: "auction-list", label: "Auction List" },
        ],
      },
      {
        id: "accounts",
        label: "Accounts & Finance",
        icon: "Calculator",
        expandable: true,
        children: [
          { id: "ledger", label: "Ledger" },
          { id: "expenses", label: "Expenses" },
          { id: "balance-sheet", label: "Balance Sheet" },
        ],
      },
    ],
  },
  {
    label: "Reports & Analytics",
    items: [
      {
        id: "reports",
        label: "Reports & Analytics",
        icon: "BarChart3",
        expandable: true,
        children: [
          { id: "daily-reports", label: "Daily Reports" },
          { id: "monthly-reports", label: "Monthly Reports" },
          { id: "analytics-dashboard", label: "Analytics" },
        ],
      },
    ],
  },
  {
    label: "System settings",
    items: [
      {
        id: "users",
        label: "User Administration",
        icon: "Users",
        expandable: true,
        children: [
          {
            id: "user-management",
            label: "User Management",
            path: "/user-management",
          },
          {
            id: "role-management",
            label: "Role Management",
            path: "/role-management",
          },
          {
            id: "permission-management",
            label: "Permission Management",
            path: "/permission-management",
          },
          {
            id: "user-activity-log",
            label: "User Activity Log",
            path: "/user-activity-log",
          },
          {
            id: "system-settings",
            label: "System Settings",
            path: "/system-settings",
          },
          {
            id: "backup-&-restore",
            label: "Backup & Restore",
            path: "/back-&-restore",
          },
        ],
      },
      {
        id: "settings",
        label: "System Settings",
        icon: "Settings",
        expandable: true,
        children: [
          { id: "general-settings", label: "General Settings" },
          { id: "estate-settings", label: "Estate Settings" },
        ],
      },
    ],
  },
];

export const welcomeStats = [
  { label: "Estate", value: "3" },
  { label: "Total Area", value: "1,250.75 Acre" },
  { label: "Total Fields", value: "48" },
  { label: "Total Workers", value: "1,248" },
];

export const weather = {
  temp: 28,
  condition: "Light Rain",
  humidity: 82,
  wind: 18,
  rainfall: 12.4,
  location: "Sreemangal",
  datetime: "17 May 2026, 09:30 AM",
};

export const statCards = [
  {
    id: "today-plucking",
    title: "Today's Plucking",
    value: "18,750.50",
    unit: "kg",
    change: "8.42% vs yesterday",
    positive: true,
    icon: "Sprout",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "mtd",
    title: "Month to Date",
    value: "385,450.30",
    unit: "kg",
    change: "12.68% vs last month",
    positive: true,
    icon: "Briefcase",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-700",
  },
  {
    id: "ytd",
    title: "Year to Date",
    value: "3,875,650.40",
    unit: "kg",
    change: "9.25% vs last year",
    positive: true,
    icon: "ChartNoAxesCombined",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    id: "workers",
    title: "Today's Workers",
    value: "1,048",
    unit: "Present",
    change: "94.18% of total",
    positive: true,
    icon: "Users",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    id: "wage",
    title: "Daily Wage Cost",
    value: " 1,82,650.00",
    unit: "",
    change: "6.21% vs yesterday",
    positive: true,
    icon: "Wallet",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: "expense",
    title: "Monthly Expense",
    value: " 24,75,860.00",
    unit: "",
    change: "7.35% vs last month",
    positive: true,
    icon: "BarChart3",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
];

export const pluckingTrend = [
  { day: "11 May", kg: 14250 },
  { day: "12 May", kg: 16480 },
  { day: "13 May", kg: 13890 },
  { day: "14 May", kg: 17620 },
  { day: "15 May", kg: 15940 },
  { day: "16 May", kg: 17110 },
  { day: "17 May", kg: 18750 },
];

export const fieldWisePlucking = [
  { name: "Field A-01", value: 4250.5, color: "#0d9488" },
  { name: "Field A-02", value: 3850.0, color: "#84cc16" },
  { name: "Field B-01", value: 3120.25, color: "#f59e0b" },
  { name: "Field B-02", value: 2980.0, color: "#a78bfa" },
  { name: "Field C-01", value: 2550.25, color: "#8b5cf6" },
  { name: "Others", value: 1999.5, color: "#14b8a6" },
];

export const topFields = [
  { rank: 1, name: "Field A-01", productivity: 2450.3, max: 2500 },
  { rank: 2, name: "Field B-02", productivity: 2180.5, max: 2500 },
  { rank: 3, name: "Field A-03", productivity: 1950.75, max: 2500 },
  { rank: 4, name: "Field C-01", productivity: 1820.4, max: 2500 },
  { rank: 5, name: "Field B-01", productivity: 1650.2, max: 2500 },
];

export const attendance = [
  {
    name: "Present",
    value: 1048,
    percent: 84.0,
    color: "#1b5e4b",
    textColor: "text-primary",
  },
  {
    name: "Absent",
    value: 150,
    percent: 12.0,
    color: "#ef4444",
    textColor: "text-red-500",
  },
  {
    name: "On Leave",
    value: 50,
    percent: 4.0,
    color: "#eab308",
    textColor: "text-yellow-500",
  },
];

export const recentActivities = [
  {
    id: 1,
    title: "Plucking entry added in Field A-01",
    detail: "By: Rahim Uddin",
    time: "09:15 AM",
    icon: "Leaf",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 2,
    title: "New worker registered: Salma Begum",
    detail: "ID: WRK-1250",
    time: "08:45 AM",
    icon: "UserPlus",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: 3,
    title: "Fertilizer applied in Field B-02",
    detail: "By: Field Officer",
    time: "08:20 AM",
    icon: "ClipboardList",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
  {
    id: 4,
    title: "Replanting entry added in Field C-01",
    detail: "By: Nazrul Islam",
    time: "Yesterday",
    icon: "Sprout",
    iconBg: "bg-lime-50",
    iconColor: "text-lime-600",
  },
  {
    id: 5,
    title: "Payroll processed for April 2026",
    detail: "Total Workers: 1,215",
    time: "16 May 2026",
    icon: "Users",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
  },
];

export const mapLegend = [
  { label: "Field", count: 48, color: "#10b981" },
  { label: "Nursery", count: 5, color: "#3b82f6" },
  { label: "Factory", count: 2, color: "#8b5cf6" },
  { label: "Store", count: 3, color: "#ef4444" },
  { label: "Office", count: 4, color: "#eab308" },
  { label: "Other Locations", count: 6, color: "#14b8a6" },
];

export const mapPins = [
  { id: 1, x: 28, y: 32, type: "Field", color: "#10b981" },
  { id: 2, x: 48, y: 25, type: "Field", color: "#10b981" },
  { id: 3, x: 62, y: 38, type: "Nursery", color: "#3b82f6" },
  { id: 4, x: 38, y: 52, type: "Factory", color: "#8b5cf6" },
  { id: 5, x: 55, y: 58, type: "Store", color: "#ef4444" },
  { id: 6, x: 70, y: 48, type: "Office", color: "#eab308" },
  { id: 7, x: 42, y: 70, type: "Other Locations", color: "#14b8a6" },
  { id: 8, x: 22, y: 60, type: "Field", color: "#10b981" },
];

export const quickActions = [
  {
    id: 1,
    title: "Add New User",
    icon: "UserPlus",
    iconColor: "text-green-600",
  },
  {
    id: 2,
    title: "Create Role",
    icon: "Users",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    title: "Assign Permission",
    icon: "ShieldCheck",
    iconColor: "text-violet-600",
  },
  {
    id: 4,
    title: "User Activity Log",
    icon: "History",
    iconColor: "text-orange-500",
  },
  {
    id: 5,
    title: "Export Users",
    icon: "FileDown",
    iconColor: "text-orange-500",
  },
];

export const headerInfo = {
  estate: "Jamuna Tea Estate",
  date: "17 May 2026, Saturday",
  user: {
    name: "Md. Saadi",
    role: "Super Admin",
    avatar: "/admin-image.webp",
  },
  notifications: 5,
};
