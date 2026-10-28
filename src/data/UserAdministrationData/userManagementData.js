export const userManagementData = {
  // ==========================
  // Summary Cards
  // ==========================
  summaryCards: [
    {
      id: 1,
      title: "Total Users",
      value: 128,
      description: "All Active & Inactive Users",
      icon: "Users",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: 2,
      title: "Active Users",
      value: 104,
      description: "81.25% of Total",
      icon: "UserCheck",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Inactive Users",
      value: 18,
      description: "14.06% of Total",
      icon: "ShieldCheck",
      bgColor: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      id: 4,
      title: "Roles",
      value: 16,
      description: "System Roles",
      icon: "Shield",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: 5,
      title: "Permissions",
      value: 243,
      description: "Total Permissions",
      icon: "Lock",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      id: 6,
      title: "Last login (Today)",
      value: 23,
      description: "Users Logged In",
      icon: "Clock3",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ],

  // ==========================
  // Filter Section
  // ==========================
  filters: {
    search: {
      label: "Search User",
      placeholder: "Name, Email, Username...",
    },

    role: {
      label: "Role",
      options: [
        "All Roles",
        "Estate Manager",
        "HR Manager",
        "Field Supervisor",
        "Accounts Officer",
        "Wage Officer",
        "Store Keeper",
        "IT Administrator",
      ],
    },

    department: {
      label: "Department",
      options: [
        "All Departments",
        "Estate Management",
        "HR & Workforce",
        "Field Operations",
        "Accounts & Finance",
        "Payroll & Wages",
        "Stores & Inventory",
        "Information Technology",
        "Administration",
        "Security",
      ],
    },

    status: {
      label: "Status",
      options: ["All Status", "Active", "Inactive"],
    },

    userType: {
      label: "User Type",
      options: ["All Types", "Admin", "Manager", "Officer", "Employee"],
    },

    dateRange: {
      label: "Date Range",
      start: "01/06/2026",
      end: "30/06/2026",
    },
  },

  // ==========================
  // Filter Buttons
  // ==========================
  filterButtons: [
    {
      id: 1,
      text: "Search",
      variant: "primary",
    },
    {
      id: 2,
      text: "Reset Filter",
      variant: "secondary",
    },
  ],

  // ==========================
  // Tabs
  // ==========================
  tabs: [
    {
      id: 1,
      label: "User List",
      active: true,
    },
    {
      id: 2,
      label: "Role Management",
      active: false,
    },
    {
      id: 3,
      label: "Permission Management",
      active: false,
    },
    {
      id: 4,
      label: "User Activity Log",
      active: false,
    },
  ],

  // ==========================
  // Bulk Actions
  // ==========================
  bulkActions: [
    "Bulk Actions",
    "Activate Selected",
    "Deactivate Selected",
    "Delete Selected",
    "Export Selected",
  ],

  tableHeaders: [
    {
      id: 1,
      key: "checkbox",
      label: "",
    },
    {
      id: 2,
      key: "sl",
      label: "SL",
    },
    {
      id: 3,
      key: "user",
      label: "User",
    },
    {
      id: 4,
      key: "username",
      label: "Username",
    },
    {
      id: 5,
      key: "email",
      label: "Email",
    },
    {
      id: 6,
      key: "role",
      label: "Role",
    },
    {
      id: 7,
      key: "department",
      label: "Department",
    },
    {
      id: 8,
      key: "status",
      label: "Status",
    },
    {
      id: 9,
      key: "lastLogin",
      label: "Last Login",
    },
    {
      id: 10,
      key: "action",
      label: "Action",
    },
  ],
  // ==========================
  // Users Table
  // ==========================
  users: [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=1",
      name: "Md. Faruk Hossain",
      username: "faruk.hossain",
      email: "faruk.hossain@jamunatea.com",
      role: "Estate Manager",
      department: "Estate Management",
      status: "Active",
      lastLogin: "06/06/2026 10:25 AM",
      isCurrentUser: true,
      roleColor: "bg-green-100 text-green-700",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Sumaiya Akter",
      username: "sumaiya.akter",
      email: "sumaiya.akter@jamunatea.com",
      role: "HR Manager",
      department: "HR & Workforce",
      status: "Active",
      lastLogin: "06/06/2026 09:12 AM",
      isCurrentUser: false,
      roleColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Rashidul Islam",
      username: "rashidul.islam",
      email: "rashidul.islam@jamunatea.com",
      role: "Field Supervisor",
      department: "Field Operations",
      status: "Active",
      lastLogin: "06/06/2026 08:45 AM",
      isCurrentUser: false,
      roleColor: "bg-purple-100 text-purple-700",
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/150?img=4",
      name: "Jannatul Ferdous",
      username: "jannatul.ferdous",
      email: "jannatul.ferdous@jamunatea.com",
      role: "Accounts Officer",
      department: "Accounts & Finance",
      status: "Active",
      lastLogin: "05/06/2026 05:30 PM",
      isCurrentUser: false,
      roleColor: "bg-orange-100 text-orange-700",
    },
    {
      id: 5,
      avatar: "https://i.pravatar.cc/150?img=5",
      name: "Mahfuzur Rahman",
      username: "mahfuzur.rahman",
      email: "mahfuzur.rahman@jamunatea.com",
      role: "Wage Officer",
      department: "Payroll & Wages",
      status: "Active",
      lastLogin: "05/06/2026 04:15 PM",
      isCurrentUser: false,
      roleColor: "bg-cyan-100 text-cyan-700",
    },
    {
      id: 6,
      avatar: "https://i.pravatar.cc/150?img=6",
      name: "Abdul Karim",
      username: "abdul.karim",
      email: "abdul.karim@jamunatea.com",
      role: "Store Keeper",
      department: "Stores & Inventory",
      status: "Active",
      lastLogin: "05/06/2026 03:02 PM",
      isCurrentUser: false,
      roleColor: "bg-amber-100 text-amber-700",
    },
    {
      id: 7,
      avatar: "https://i.pravatar.cc/150?img=7",
      name: "Mst. Laila Khatun",
      username: "laila.khatun",
      email: "laila.khatun@jamunatea.com",
      role: "Nursery Incharge",
      department: "Nursery Management",
      status: "Inactive",
      lastLogin: "28/05/2026 11:20 AM",
      isCurrentUser: false,
      roleColor: "bg-pink-100 text-pink-700",
    },
    {
      id: 8,
      avatar: "https://i.pravatar.cc/150?img=8",
      name: "Imran Hossain",
      username: "imran.hossain",
      email: "imran.hossain@jamunatea.com",
      role: "IT Administrator",
      department: "Information Technology",
      status: "Active",
      lastLogin: "06/06/2026 09:40 AM",
      isCurrentUser: false,
      roleColor: "bg-sky-100 text-sky-700",
    },
    {
      id: 9,
      avatar: "https://i.pravatar.cc/150?img=9",
      name: "Afsana Mim",
      username: "afsana.mim",
      email: "afsana.mim@jamunatea.com",
      role: "Data Entry Operator",
      department: "Administration",
      status: "Active",
      lastLogin: "04/06/2026 02:10 PM",
      isCurrentUser: false,
      roleColor: "bg-gray-100 text-gray-700",
    },
    {
      id: 10,
      avatar: "https://i.pravatar.cc/150?img=10",
      name: "Sabbir Ahmed",
      username: "sabbir.ahmed",
      email: "sabbir.ahmed@jamunatea.com",
      role: "Security Officer",
      department: "Security",
      status: "Active",
      lastLogin: "04/06/2026 09:15 AM",
      isCurrentUser: false,
      roleColor: "bg-slate-100 text-slate-700",
    },
  ],
  // ==========================
  // Summary Panel
  // ==========================
  summaryPanel: {
    title: "User Summary",

    filter: {
      label: "View By",
      default: "By Role",

      options: ["By Role", "By Department", "By Status"],
    },
  },

  // ==========================
  // User Summary Chart
  // ==========================
  userSummary: {
    "By Role": [
      {
        label: "Estate Manager",
        total: 12,
        color: "#15803d",
      },
      {
        label: "HR Manager",
        total: 8,
        color: "#2563eb",
      },
      {
        label: "Field Supervisor",
        total: 28,
        color: "#8b5cf6",
      },
      {
        label: "Accounts Officer",
        total: 15,
        color: "#f97316",
      },
      {
        label: "Wage Officer",
        total: 18,
        color: "#14b8a6",
      },
      {
        label: "Others",
        total: 47,
        color: "#d1d5db",
      },
    ],

    "By Department": [
      {
        label: "Estate Management",
        total: 20,
        color: "#15803d",
      },
      {
        label: "HR & Workforce",
        total: 15,
        color: "#2563eb",
      },
      {
        label: "Field Operations",
        total: 28,
        color: "#8b5cf6",
      },
      {
        label: "Accounts & Finance",
        total: 15,
        color: "#f97316",
      },
      {
        label: "Payroll & Wages",
        total: 18,
        color: "#14b8a6",
      },
      {
        label: "Others",
        total: 32,
        color: "#d1d5db",
      },
    ],

    "By Status": [
      {
        label: "Active",
        total: 104,
        color: "#16a34a",
      },
      {
        label: "Inactive",
        total: 18,
        color: "#f59e0b",
      },
      {
        label: "Suspended",
        total: 6,
        color: "#ef4444",
      },
    ],
  },

  // ==========================
  // Recent Registration
  // ==========================
  recentRegistrations: {
    title: "Recent User Registrations",
    viewAll: "View All",

    users: [
      {
        id: 1,
        avatar: "https://i.pravatar.cc/150?img=11",
        name: "Kamal Uddin",
        role: "Field Assistant",
        date: "06/06/2026",
      },
      {
        id: 2,
        avatar: "https://i.pravatar.cc/150?img=12",
        name: "Shahinur Begum",
        role: "Nursery Worker",
        date: "05/06/2026",
      },
      {
        id: 3,
        avatar: "https://i.pravatar.cc/150?img=13",
        name: "Biplob Chandra",
        role: "Factory Incharge",
        date: "05/06/2026",
      },
      {
        id: 4,
        avatar: "https://i.pravatar.cc/150?img=14",
        name: "Rina Sultana",
        role: "HR Assistant",
        date: "04/06/2026",
      },
      {
        id: 5,
        avatar: "https://i.pravatar.cc/150?img=15",
        name: "Tariqul Islam",
        role: "Security Officer",
        date: "04/06/2026",
      },
    ],
  },
  // ==========================
  // Quick Actions
  // ==========================
  quickActions: {
    title: "Quick Actions",

    actions: [
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
        iconColor: "text-red-500",
      },
    ],
  },
  // ==========================
  // Important Notes
  // ==========================
  importantNotes: {
    title: "Important Notes",

    notes: [
      {
        id: 1,
        text: "Keep user information updated and secure.",
      },
      {
        id: 2,
        text: "Assign appropriate roles and permissions.",
      },
      {
        id: 3,
        text: "Deactivating a user will restrict system access.",
      },
      {
        id: 4,
        text: "Use strong passwords and enable 2FA for security.",
      },
    ],
  },

  // ==========================
  // Pagination
  // ==========================
  pagination: {
    currentPage: 1,
    totalPages: 12,
    pageSize: 10,
    totalUsers: 128,
  },
};
