// export const userManagementSummary = {
//   summary: {
//     totalUsers: 128,
//     activeUsers: 104,
//     inactiveUsers: 18,
//     totalRoles: 16,
//     totalPermissions: 243,
//     todayLogins: 23,
//   },

//   users: [
//     {
//       id: 1,
//       avatar: "/users/user-1.webp",
//       name: "Md. Faruk Hossain",
//       username: "faruk.hossain",
//       email: "faruk.hossain@jamunatea.com",
//       role: "Estate Manager",
//       department: "Estate Management",
//       status: "Active",
//       lastLogin: "06/06/2026 10:25 AM",
//       action: "menu",
//       isCurrentUser: true,
//     },
//     {
//       id: 2,
//       avatar: "/users/user-2.webp",
//       name: "Sumaiya Akter",
//       username: "sumaiya.akter",
//       email: "sumaiya.akter@jamunatea.com",
//       role: "HR Manager",
//       department: "HR & Workforce",
//       status: "Active",
//       lastLogin: "06/06/2026 09:12 AM",
//       action: "menu",
//       isCurrentUser: false,
//     },
//     {
//       id: 3,
//       avatar: "/users/user-3.webp",
//       name: "Rashidul Islam",
//       username: "rashidul.islam",
//       email: "rashidul.islam@jamunatea.com",
//       role: "Field Supervisor",
//       department: "Field Operations",
//       status: "Active",
//       lastLogin: "06/06/2026 08:45 AM",
//       action: "menu",
//       isCurrentUser: false,
//     },
//     {
//       id: 4,
//       avatar: "/users/user-4.webp",
//       name: "Jannatul Ferdous",
//       username: "jannatul.ferdous",
//       email: "jannatul.ferdous@jamunatea.com",
//       role: "Accounts Officer",
//       department: "Accounts & Finance",
//       status: "Active",
//       lastLogin: "05/06/2026 05:30 PM",
//       action: "menu",
//       isCurrentUser: false,
//     },
//     {
//       id: 5,
//       avatar: "/users/user-5.webp",
//       name: "Mahfuzur Rahman",
//       username: "mahfuzur.rahman",
//       email: "mahfuzur.rahman@jamunatea.com",
//       role: "Wage Officer",
//       department: "Payroll & Wages",
//       status: "Active",
//       lastLogin: "05/06/2026 04:15 PM",
//       action: "menu",
//       isCurrentUser: false,
//     },
//     {
//       id: 6,
//       avatar: "/users/user-6.webp",
//       name: "Abdul Karim",
//       username: "abdul.karim",
//       email: "abdul.karim@jamunatea.com",
//       role: "Store Keeper",
//       department: "Stores & Inventory",
//       status: "Active",
//       lastLogin: "05/06/2026 03:02 PM",
//       action: "menu",
//       isCurrentUser: false,
//     },
//     {
//       id: 7,
//       avatar: "/users/user-7.webp",
//       name: "Mst. Laila Khatun",
//       username: "laila.khatun",
//       email: "laila.khatun@jamunatea.com",
//       role: "Nursery Incharge",
//       department: "Nursery Management",
//       status: "Inactive",
//       lastLogin: "28/05/2026 11:20 AM",
//       action: "menu",
//       isCurrentUser: false,
//     },
//     {
//       id: 8,
//       avatar: "/users/user-8.webp",
//       name: "Imran Hossain",
//       username: "imran.hossain",
//       email: "imran.hossain@jamunatea.com",
//       role: "IT Administrator",
//       department: "Information Technology",
//       status: "Active",
//       lastLogin: "06/06/2026 09:40 AM",
//       action: "menu",
//       isCurrentUser: false,
//     },
//     {
//       id: 9,
//       avatar: "/users/user-9.webp",
//       name: "Afsana Mim",
//       username: "afsana.mim",
//       email: "afsana.mim@jamunatea.com",
//       role: "Data Entry Operator",
//       department: "Administration",
//       status: "Active",
//       lastLogin: "04/06/2026 02:10 PM",
//       action: "menu",
//       isCurrentUser: false,
//     },
//     {
//       id: 10,
//       avatar: "/users/user-10.webp",
//       name: "Sabbir Ahmed",
//       username: "sabbir.ahmed",
//       email: "sabbir.ahmed@jamunatea.com",
//       role: "Security Officer",
//       department: "Security",
//       status: "Active",
//       lastLogin: "04/06/2026 09:15 AM",
//       action: "menu",
//       isCurrentUser: false,
//     },
//   ],
// };

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
      title: "Today's Login",
      value: 23,
      description: "Users Logged In Today",
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

  // ==========================
  // Users Table
  // ==========================
  users: [
    {
      id: 1,
      avatar: "/users/user-1.webp",
      name: "Md. Faruk Hossain",
      username: "faruk.hossain",
      email: "faruk.hossain@jamunatea.com",
      role: "Estate Manager",
      department: "Estate Management",
      status: "Active",
      lastLogin: "06/06/2026 10:25 AM",
      isCurrentUser: true,
    },
    {
      id: 2,
      avatar: "/users/user-2.webp",
      name: "Sumaiya Akter",
      username: "sumaiya.akter",
      email: "sumaiya.akter@jamunatea.com",
      role: "HR Manager",
      department: "HR & Workforce",
      status: "Active",
      lastLogin: "06/06/2026 09:12 AM",
      isCurrentUser: false,
    },
    {
      id: 3,
      avatar: "/users/user-3.webp",
      name: "Rashidul Islam",
      username: "rashidul.islam",
      email: "rashidul.islam@jamunatea.com",
      role: "Field Supervisor",
      department: "Field Operations",
      status: "Active",
      lastLogin: "06/06/2026 08:45 AM",
      isCurrentUser: false,
    },
    {
      id: 4,
      avatar: "/users/user-4.webp",
      name: "Jannatul Ferdous",
      username: "jannatul.ferdous",
      email: "jannatul.ferdous@jamunatea.com",
      role: "Accounts Officer",
      department: "Accounts & Finance",
      status: "Active",
      lastLogin: "05/06/2026 05:30 PM",
      isCurrentUser: false,
    },
    {
      id: 5,
      avatar: "/users/user-5.webp",
      name: "Mahfuzur Rahman",
      username: "mahfuzur.rahman",
      email: "mahfuzur.rahman@jamunatea.com",
      role: "Wage Officer",
      department: "Payroll & Wages",
      status: "Active",
      lastLogin: "05/06/2026 04:15 PM",
      isCurrentUser: false,
    },
    {
      id: 6,
      avatar: "/users/user-6.webp",
      name: "Abdul Karim",
      username: "abdul.karim",
      email: "abdul.karim@jamunatea.com",
      role: "Store Keeper",
      department: "Stores & Inventory",
      status: "Active",
      lastLogin: "05/06/2026 03:02 PM",
      isCurrentUser: false,
    },
    {
      id: 7,
      avatar: "/users/user-7.webp",
      name: "Mst. Laila Khatun",
      username: "laila.khatun",
      email: "laila.khatun@jamunatea.com",
      role: "Nursery Incharge",
      department: "Nursery Management",
      status: "Inactive",
      lastLogin: "28/05/2026 11:20 AM",
      isCurrentUser: false,
    },
    {
      id: 8,
      avatar: "/users/user-8.webp",
      name: "Imran Hossain",
      username: "imran.hossain",
      email: "imran.hossain@jamunatea.com",
      role: "IT Administrator",
      department: "Information Technology",
      status: "Active",
      lastLogin: "06/06/2026 09:40 AM",
      isCurrentUser: false,
    },
    {
      id: 9,
      avatar: "/users/user-9.webp",
      name: "Afsana Mim",
      username: "afsana.mim",
      email: "afsana.mim@jamunatea.com",
      role: "Data Entry Operator",
      department: "Administration",
      status: "Active",
      lastLogin: "04/06/2026 02:10 PM",
      isCurrentUser: false,
    },
    {
      id: 10,
      avatar: "/users/user-10.webp",
      name: "Sabbir Ahmed",
      username: "sabbir.ahmed",
      email: "sabbir.ahmed@jamunatea.com",
      role: "Security Officer",
      department: "Security",
      status: "Active",
      lastLogin: "04/06/2026 09:15 AM",
      isCurrentUser: false,
    },
  ],

  // ==========================
  // User Summary Chart
  // ==========================
  userSummary: [
    { role: "Estate Manager", total: 12 },
    { role: "HR Manager", total: 8 },
    { role: "Field Supervisor", total: 28 },
    { role: "Accounts Officer", total: 15 },
    { role: "Wage Officer", total: 18 },
    { role: "Others", total: 47 },
  ],

  // ==========================
  // Recent Registration
  // ==========================
  recentRegistrations: [
    {
      id: 1,
      name: "Kamal Uddin",
      role: "Field Assistant",
      date: "06/06/2026",
    },
    {
      id: 2,
      name: "Shahinur Rahman",
      role: "Security Guard",
      date: "05/06/2026",
    },
    {
      id: 3,
      name: "Biplob Chandra",
      role: "Accounts Assistant",
      date: "05/06/2026",
    },
    {
      id: 4,
      name: "Rina Sultana",
      role: "HR Executive",
      date: "04/06/2026",
    },
  ],

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
