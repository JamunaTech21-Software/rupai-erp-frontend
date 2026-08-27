const employeeManagementData = {
  // =========================================================
  // Page Meta
  // =========================================================
  page: {
    title: "Employee Management",
    module: "HR & Workforce Management",
  },

  // =========================================================
  // Summary Cards
  // =========================================================
  summaryCards: [
    {
      id: "total-employees",
      key: "totalEmployees",
      title: "Total Employees",
      value: 356,
      subtitle: "All Employees",
      unit: "employees",
      colorKey: "green",
    },
    {
      id: "active-employees",
      key: "activeEmployees",
      title: "Active Employees",
      value: 318,
      subtitle: "89.33% of Total",
      unit: "employees",
      colorKey: "blue",
    },
    {
      id: "on-leave",
      key: "onLeave",
      title: "On Leave",
      value: 18,
      subtitle: "5.06% of Total",
      unit: "employees",
      colorKey: "green",
    },
    {
      id: "new-this-month",
      key: "newThisMonth",
      title: "New This Month",
      value: 12,
      subtitle: "This Period",
      unit: "employees",
      colorKey: "blue",
    },
    {
      id: "exits-this-month",
      key: "exitsThisMonth",
      title: "Exits This Month",
      value: 3,
      subtitle: "This Period",
      unit: "employees",
      colorKey: "blue",
    },
    {
      id: "average-tenure",
      key: "averageTenure",
      title: "Avg. Tenure",
      value: 3.8,
      subtitle: "All Employees",
      unit: "years",
      colorKey: "green",
    },
  ],

  // =========================================================
  // Filters
  // =========================================================
  filters: {
    search: {
      key: "search",
      label: "Search Employee",
      placeholder: "Name, Employee ID, Email, Phone...",
      type: "search",
    },

    department: {
      key: "departmentId",
      label: "Department",
      type: "select",
      placeholder: "All Departments",

      options: [
        {
          value: "all",
          label: "All Departments",
        },
        {
          value: "estate-management",
          label: "Estate Management",
        },
        {
          value: "hr-admin",
          label: "HR & Admin",
        },
        {
          value: "field-operations",
          label: "Field Operations",
        },
        {
          value: "accounts-finance",
          label: "Accounts & Finance",
        },
        {
          value: "production",
          label: "Production",
        },
        {
          value: "nursery",
          label: "Nursery",
        },
        {
          value: "stores-inventory",
          label: "Stores & Inventory",
        },
        {
          value: "it-department",
          label: "IT Department",
        },
        {
          value: "administration",
          label: "Administration",
        },
      ],
    },

    designation: {
      key: "designationId",
      label: "Designation",
      type: "select",
      placeholder: "All Designations",

      options: [
        {
          value: "all",
          label: "All Designations",
        },
        {
          value: "estate-manager",
          label: "Estate Manager",
        },
        {
          value: "hr-manager",
          label: "HR Manager",
        },
        {
          value: "field-supervisor",
          label: "Field Supervisor",
        },
        {
          value: "accounts-officer",
          label: "Accounts Officer",
        },
        {
          value: "wage-officer",
          label: "Wage Officer",
        },
        {
          value: "nursery-incharge",
          label: "Nursery Incharge",
        },
        {
          value: "store-keeper",
          label: "Store Keeper",
        },
        {
          value: "it-administrator",
          label: "IT Administrator",
        },
        {
          value: "data-entry-operator",
          label: "Data Entry Operator",
        },
        {
          value: "security-officer",
          label: "Security Officer",
        },
      ],
    },

    employmentType: {
      key: "employmentType",
      label: "Employment Type",
      type: "select",
      placeholder: "All Types",

      options: [
        {
          value: "all",
          label: "All Types",
        },
        {
          value: "permanent",
          label: "Permanent",
        },
        {
          value: "contractual",
          label: "Contractual",
        },
        {
          value: "temporary",
          label: "Temporary",
        },
      ],
    },

    status: {
      key: "status",
      label: "Status",
      type: "select",
      placeholder: "All Status",

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
          value: "on-leave",
          label: "On Leave",
        },
        {
          value: "inactive",
          label: "Inactive",
        },
        {
          value: "terminated",
          label: "Terminated",
        },
      ],
    },

    dateRange: {
      key: "dateRange",
      label: "Date Range",
      type: "date-range",

      defaultValue: {
        from: "2026-06-01",
        to: "2026-06-30",
      },
    },
  },

  // =========================================================
  // Employee Management Tabs
  // =========================================================
  tabs: [
    {
      id: "employee-list",
      label: "Employee List",
      key: "employeeList",
    },
    {
      id: "department-overview",
      label: "Department Overview",
      key: "departmentOverview",
    },
    {
      id: "employment-type",
      label: "Employment Type",
      key: "employmentType",
    },
    {
      id: "reports",
      label: "Reports",
      key: "reports",
    },
    {
      id: "document-expiry",
      label: "Document Expiry",
      key: "documentExpiry",
    },
    {
      id: "birthday-anniversary",
      label: "Birthday / Anniversary",
      key: "birthdayAnniversary",
    },
  ],

  // =========================================================
  // Table Configuration
  // =========================================================
  table: {
    selectable: true,

    headers: [
      {
        key: "checkbox",
        label: "",
        type: "selection",
      },
      {
        key: "serial",
        label: "SL",
      },
      {
        key: "employeeId",
        label: "Employee ID",
      },
      {
        key: "employeeName",
        label: "Employee Name",
      },
      {
        key: "department",
        label: "Department",
      },
      {
        key: "designation",
        label: "Designation",
      },
      {
        key: "employmentType",
        label: "Employment Type",
      },
      {
        key: "status",
        label: "Status",
      },
      {
        key: "joinDate",
        label: "Join Date",
      },
      {
        key: "actions",
        label: "Action",
        type: "actions",
      },
    ],
  },

  // =========================================================
  // Employees
  // =========================================================
  employees: [
    {
      id: "emp-0001",
      employeeId: "EMP-0001",

      personalInfo: {
        firstName: "Faruk",
        lastName: "Hossain",
        fullName: "Md. Faruk Hossain",
        gender: "male",
        email: "faruk.hossain@example.com",
        phone: "+8801711000001",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
      },

      employment: {
        departmentId: "estate-management",
        departmentName: "Estate Management",

        designationId: "estate-manager",
        designationName: "Estate Manager",

        employmentType: "permanent",

        status: "active",

        joinDate: "2020-01-01",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-001",
        divisionName: "Main Division",
      },

      documents: {
        idCardExpiry: "2028-01-01",
        workPermitExpiry: "2028-06-01",
        medicalFitnessExpiry: "2027-12-15",
      },
    },

    {
      id: "emp-0002",
      employeeId: "EMP-0002",

      personalInfo: {
        firstName: "Sumaiya",
        lastName: "Akter",
        fullName: "Sumaiya Akter",
        gender: "female",
        email: "sumaiya.akter@example.com",
        phone: "+8801711000002",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
      },

      employment: {
        departmentId: "hr-admin",
        departmentName: "HR & Admin",

        designationId: "hr-manager",
        designationName: "HR Manager",

        employmentType: "permanent",

        status: "active",

        joinDate: "2021-03-15",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-001",
        divisionName: "Main Division",
      },

      documents: {
        idCardExpiry: "2029-03-15",
        workPermitExpiry: "2028-03-15",
        medicalFitnessExpiry: "2027-10-10",
      },
    },

    {
      id: "emp-0003",
      employeeId: "EMP-0003",

      personalInfo: {
        firstName: "Rashidul",
        lastName: "Islam",
        fullName: "Rashidul Islam",
        gender: "male",
        email: "rashidul.islam@example.com",
        phone: "+8801711000003",
        avatarUrl: "https://i.pravatar.cc/150?img=3",
      },

      employment: {
        departmentId: "field-operations",
        departmentName: "Field Operations",

        designationId: "field-supervisor",
        designationName: "Field Supervisor",

        employmentType: "permanent",

        status: "active",

        joinDate: "2021-06-10",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-002",
        divisionName: "North Division",
      },

      documents: {
        idCardExpiry: "2028-06-10",
        workPermitExpiry: "2027-11-20",
        medicalFitnessExpiry: "2027-09-15",
      },
    },

    {
      id: "emp-0004",
      employeeId: "EMP-0004",

      personalInfo: {
        firstName: "Jannatul",
        lastName: "Ferdous",
        fullName: "Jannatul Ferdous",
        gender: "female",
        email: "jannatul.ferdous@example.com",
        phone: "+8801711000004",
        avatarUrl: "https://i.pravatar.cc/150?img=4",
      },

      employment: {
        departmentId: "accounts-finance",
        departmentName: "Accounts & Finance",

        designationId: "accounts-officer",
        designationName: "Accounts Officer",

        employmentType: "permanent",

        status: "active",

        joinDate: "2021-09-01",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-001",
        divisionName: "Main Division",
      },

      documents: {
        idCardExpiry: "2029-09-01",
        workPermitExpiry: "2028-09-01",
        medicalFitnessExpiry: "2027-12-01",
      },
    },

    {
      id: "emp-0005",
      employeeId: "EMP-0005",

      personalInfo: {
        firstName: "Mahfuzur",
        lastName: "Rahman",
        fullName: "Mahfuzur Rahman",
        gender: "male",
        email: "mahfuzur.rahman@example.com",
        phone: "+8801711000005",
        avatarUrl: "https://i.pravatar.cc/150?img=5",
      },

      employment: {
        departmentId: "production",
        departmentName: "Production",

        designationId: "wage-officer",
        designationName: "Wage Officer",

        employmentType: "permanent",

        status: "active",

        joinDate: "2021-12-11",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-003",
        divisionName: "South Division",
      },

      documents: {
        idCardExpiry: "2028-12-11",
        workPermitExpiry: "2027-12-11",
        medicalFitnessExpiry: "2027-11-30",
      },
    },

    {
      id: "emp-0006",
      employeeId: "EMP-0006",

      personalInfo: {
        firstName: "Laila",
        lastName: "Khatun",
        fullName: "Mst. Laila Khatun",
        gender: "female",
        email: "laila.khatun@example.com",
        phone: "+8801711000006",
        avatarUrl: "https://i.pravatar.cc/150?img=6",
      },

      employment: {
        departmentId: "nursery",
        departmentName: "Nursery",

        designationId: "nursery-incharge",
        designationName: "Nursery Incharge",

        employmentType: "permanent",

        status: "on-leave",

        joinDate: "2022-05-01",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-004",
        divisionName: "Nursery Division",
      },

      documents: {
        idCardExpiry: "2028-05-01",
        workPermitExpiry: "2027-05-01",
        medicalFitnessExpiry: "2026-12-20",
      },
    },

    {
      id: "emp-0007",
      employeeId: "EMP-0007",

      personalInfo: {
        firstName: "Abdul",
        lastName: "Karim",
        fullName: "Abdul Karim",
        gender: "male",
        email: "abdul.karim@example.com",
        phone: "+8801711000007",
        avatarUrl: "https://i.pravatar.cc/150?img=7",
      },
      employment: {
        departmentId: "stores-inventory",
        departmentName: "Stores & Inventory",

        designationId: "store-keeper",
        designationName: "Store Keeper",

        employmentType: "permanent",

        status: "active",

        joinDate: "2022-02-18",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-001",
        divisionName: "Main Division",
      },

      documents: {
        idCardExpiry: "2029-02-18",
        workPermitExpiry: "2028-02-18",
        medicalFitnessExpiry: "2027-08-10",
      },
    },

    {
      id: "emp-0008",
      employeeId: "EMP-0008",

      personalInfo: {
        firstName: "Imran",
        lastName: "Hossain",
        fullName: "Imran Hossain",
        gender: "male",
        email: "imran.hossain@example.com",
        phone: "+8801711000008",
        avatarUrl: "https://i.pravatar.cc/150?img=8",
      },

      employment: {
        departmentId: "it-department",
        departmentName: "IT Department",

        designationId: "it-administrator",
        designationName: "IT Administrator",

        employmentType: "permanent",

        status: "active",

        joinDate: "2022-04-01",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-001",
        divisionName: "Main Division",
      },

      documents: {
        idCardExpiry: "2028-04-01",
        workPermitExpiry: "2027-04-01",
        medicalFitnessExpiry: "2027-10-01",
      },
    },

    {
      id: "emp-0009",
      employeeId: "EMP-0009",

      personalInfo: {
        firstName: "Afsana",
        lastName: "Mim",
        fullName: "Afsana Mim",
        gender: "female",
        email: "afsana.mim@example.com",
        phone: "+8801711000009",
        avatarUrl: "https://i.pravatar.cc/150?img=9",
      },

      employment: {
        departmentId: "administration",
        departmentName: "Administration",

        designationId: "data-entry-operator",
        designationName: "Data Entry Operator",

        employmentType: "contractual",

        status: "active",

        joinDate: "2022-05-15",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-001",
        divisionName: "Main Division",
      },

      documents: {
        idCardExpiry: "2027-05-15",
        workPermitExpiry: "2027-05-15",
        medicalFitnessExpiry: "2026-11-15",
      },
    },

    {
      id: "emp-0010",
      employeeId: "EMP-0010",

      personalInfo: {
        firstName: "Shahinur",
        lastName: "Begum",
        fullName: "Shahinur Begum",
        gender: "female",
        email: "shahinur.begum@example.com",
        phone: "+8801711000010",
        avatarUrl: "https://i.pravatar.cc/150?img=10",
      },

      employment: {
        departmentId: "field-operations",
        departmentName: "Field Operations",

        designationId: "security-officer",
        designationName: "Security Officer",

        employmentType: "contractual",

        status: "active",

        joinDate: "2022-06-01",
        exitDate: null,
      },

      organization: {
        estateId: "estate-001",
        estateName: "Jamuna Tea Estate",

        divisionId: "division-002",
        divisionName: "North Division",
      },

      documents: {
        idCardExpiry: "2027-06-01",
        workPermitExpiry: "2027-06-01",
        medicalFitnessExpiry: "2026-12-01",
      },
    },
  ],

  // =========================================================
  // Pagination
  // =========================================================
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 356,
    totalPages: 36,
  },
  departmentOverview: {
    title: "Employees by Department",

    totalEmployees: 356,

    data: [
      {
        id: 1,
        name: "Field Operations",
        count: 126,
        percentage: 35.39,
        color: "#166534",
      },
      {
        id: 2,
        name: "Estate Management",
        count: 58,
        percentage: 16.29,
        color: "#2563eb",
      },
      {
        id: 3,
        name: "HR & Admin",
        count: 46,
        percentage: 12.92,
        color: "#a855f7",
      },
      {
        id: 4,
        name: "Production",
        count: 45,
        percentage: 12.64,
        color: "#f97316",
      },
      {
        id: 5,
        name: "Accounts & Finance",
        count: 36,
        percentage: 10.11,
        color: "#14b8a6",
      },
      {
        id: 6,
        name: "Others",
        count: 45,
        percentage: 12.64,
        color: "#94a3b8",
      },
    ],
  },
  employmentTypeOverview: {
    title: "Employment Type",

    totalEmployees: 356,

    data: [
      {
        id: 1,
        name: "Permanent",
        count: 276,
        percentage: 77.53,
        color: "#166534",
      },
      {
        id: 2,
        name: "Contractual",
        count: 72,
        percentage: 20.22,
        color: "#2563eb",
      },
      {
        id: 3,
        name: "Temporary",
        count: 8,
        percentage: 2.25,
        color: "#d977a8",
      },
    ],
  },
  recentJoiners: [
    {
      employeeId: "emp-0011",
      fullName: "Tariqul Islam",
      designation: "Field Assistant",
      joinDate: "2026-06-06",
      avatarUrl: "https://i.pravatar.cc/150?img=11",
    },
    {
      employeeId: "emp-0012",
      fullName: "Rina Sultana",
      designation: "HR Assistant",
      joinDate: "2026-06-05",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
    },
    {
      employeeId: "emp-0013",
      fullName: "Biplob Chandra",
      designation: "Factory Helper",
      joinDate: "2026-06-04",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
    },
    {
      employeeId: "emp-0014",
      fullName: "Kamrul Ahmed",
      designation: "Field Assistant",
      joinDate: "2026-06-03",
      avatarUrl: "https://i.pravatar.cc/150?img=13",
    },
    {
      employeeId: "emp-0015",
      fullName: "Nayeem Hasan",
      designation: "Security Officer",
      joinDate: "2026-06-02",
      avatarUrl: "https://i.pravatar.cc/150?img=14",
    },
  ],

  // =========================================================
  // Department Analytics
  // =========================================================
  employeesByDepartment: {
    total: 356,

    data: [
      {
        departmentId: "field-operations",
        departmentName: "Field Operations",
        employeeCount: 126,
        percentage: 35.39,
      },
      {
        departmentId: "estate-management",
        departmentName: "Estate Management",
        employeeCount: 58,
        percentage: 16.29,
      },
      {
        departmentId: "hr-admin",
        departmentName: "HR & Admin",
        employeeCount: 46,
        percentage: 12.92,
      },
      {
        departmentId: "production",
        departmentName: "Production",
        employeeCount: 45,
        percentage: 12.64,
      },
      {
        departmentId: "accounts-finance",
        departmentName: "Accounts & Finance",
        employeeCount: 36,
        percentage: 10.11,
      },
      {
        departmentId: "others",
        departmentName: "Others",
        employeeCount: 45,
        percentage: 12.64,
      },
    ],
  },

  // =========================================================
  // Employment Type Analytics
  // =========================================================
  employeesByEmploymentType: {
    total: 356,

    data: [
      {
        type: "permanent",
        label: "Permanent",
        employeeCount: 276,
        percentage: 77.53,
      },
      {
        type: "contractual",
        label: "Contractual",
        employeeCount: 72,
        percentage: 20.22,
      },
      {
        type: "temporary",
        label: "Temporary",
        employeeCount: 8,
        percentage: 2.25,
      },
    ],
  },

  // =========================================================
  // Recent Joiners
  // =========================================================
  recentJoiners: [
    {
      employeeId: "emp-0011",
      fullName: "Tariqul Islam",
      designation: "Field Assistant",
      joinDate: "2026-06-06",
      avatarUrl: "/images/employees/emp-0011.jpg",
    },
    {
      employeeId: "emp-0012",
      fullName: "Rina Sultana",
      designation: "HR Assistant",
      joinDate: "2026-06-05",
      avatarUrl: "/images/employees/emp-0012.jpg",
    },
    {
      employeeId: "emp-0013",
      fullName: "Biplob Chandra",
      designation: "Factory Helper",
      joinDate: "2026-06-04",
      avatarUrl: "/images/employees/emp-0013.jpg",
    },
    {
      employeeId: "emp-0014",
      fullName: "Kamrul Ahmed",
      designation: "Field Assistant",
      joinDate: "2026-06-03",
      avatarUrl: "/images/employees/emp-0014.jpg",
    },
    {
      employeeId: "emp-0015",
      fullName: "Nayeem Hasan",
      designation: "Security Officer",
      joinDate: "2026-06-02",
      avatarUrl: "/images/employees/emp-0015.jpg",
    },
  ],

  // =========================================================
  // Quick Actions
  // =========================================================
  quickActions: [
    {
      id: "add-employee",
      key: "addEmployee",
      label: "Add Employee",
      action: "navigate",
      target: "/employee-management/add",
    },
    {
      id: "bulk-import",
      key: "bulkImport",
      label: "Bulk Import",
      action: "open-import",
      target: null,
    },
    {
      id: "employee-transfer",
      key: "employeeTransfer",
      label: "Employee Transfer",
      action: "navigate",
      target: "/employee-management/transfer",
    },
    {
      id: "reports",
      key: "reports",
      label: "Reports",
      action: "navigate",
      target: "/employee-management/reports",
    },
  ],

  // =========================================================
  // Gender Distribution
  // =========================================================
  genderDistribution: {
    total: 356,

    data: [
      {
        gender: "male",
        label: "Male",
        employeeCount: 228,
        percentage: 64.04,
      },
      {
        gender: "female",
        label: "Female",
        employeeCount: 128,
        percentage: 35.96,
      },
      {
        gender: "other",
        label: "Other",
        employeeCount: 0,
        percentage: 0,
      },
    ],
  },

  // =========================================================
  // Age Group Distribution
  // =========================================================
  ageGroupDistribution: {
    total: 356,

    data: [
      {
        ageGroup: "under-25",
        label: "< 25",
        employeeCount: 32,
      },
      {
        ageGroup: "25-35",
        label: "25 - 35",
        employeeCount: 98,
      },
      {
        ageGroup: "35-45",
        label: "35 - 45",
        employeeCount: 126,
      },
      {
        ageGroup: "45-55",
        label: "45 - 55",
        employeeCount: 72,
      },
      {
        ageGroup: "55-plus",
        label: "55+",
        employeeCount: 28,
      },
    ],
  },

  // =========================================================
  // Length of Service
  // =========================================================
  lengthOfService: {
    total: 356,

    data: [
      {
        range: "0-1",
        label: "0 - 1 Year",
        employeeCount: 45,
        percentage: 12.64,
      },
      {
        range: "1-3",
        label: "1 - 3 Years",
        employeeCount: 98,
        percentage: 27.53,
      },
      {
        range: "3-5",
        label: "3 - 5 Years",
        employeeCount: 86,
        percentage: 24.16,
      },
      {
        range: "5-10",
        label: "5 - 10 Years",
        employeeCount: 78,
        percentage: 21.91,
      },
      {
        range: "10-plus",
        label: "10+ Years",
        employeeCount: 49,
        percentage: 13.76,
      },
    ],
  },

  // =========================================================
  // Document Expiry Alerts
  // =========================================================
  documentExpiryAlerts: {
    totalAlerts: 19,

    data: [
      {
        documentType: "id-card",
        label: "ID Card",
        expiringCount: 5,
      },
      {
        documentType: "work-permit",
        label: "Work Permit",
        expiringCount: 3,
      },
      {
        documentType: "medical-fitness",
        label: "Medical Fitness",
        expiringCount: 7,
      },
      {
        documentType: "others",
        label: "Others",
        expiringCount: 4,
      },
    ],
  },

  // =========================================================
  // Table Actions
  // =========================================================
  rowActions: [
    {
      id: "view",
      key: "view",
      label: "View",
      action: "view",
    },
    {
      id: "edit",
      key: "edit",
      label: "Edit",
      action: "edit",
    },
    {
      id: "reset-password",
      key: "resetPassword",
      label: "Reset Password",
      action: "reset-password",
    },
    {
      id: "deactivate",
      key: "deactivate",
      label: "Deactivate",
      action: "deactivate",
    },
    {
      id: "delete",
      key: "delete",
      label: "Delete",
      action: "delete",
    },
  ],

  // =========================================================
  // Bulk Actions
  // =========================================================
  bulkActions: [
    {
      id: "activate",
      key: "activate",
      label: "Activate",
      action: "activate",
    },
    {
      id: "deactivate",
      key: "deactivate",
      label: "Deactivate",
      action: "deactivate",
    },
    {
      id: "assign-department",
      key: "assignDepartment",
      label: "Assign Department",
      action: "assign-department",
    },
    {
      id: "export",
      key: "export",
      label: "Export",
      action: "export",
    },
    {
      id: "delete",
      key: "delete",
      label: "Delete",
      action: "delete",
    },
  ],
};

export default employeeManagementData;
