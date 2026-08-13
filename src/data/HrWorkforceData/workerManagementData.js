export const workerManagementData = {
  /* =========================================================
     PAGE ACTIONS
  ========================================================== */
  pageActions: [
    {
      id: "add-worker",
      label: "Add New Worker",
      icon: "plus",
      type: "primary",
    },
    {
      id: "import-worker",
      label: "Import",
      icon: "upload",
      type: "secondary",
    },
    {
      id: "export-worker",
      label: "Export",
      icon: "download",
      type: "secondary",
    },
    {
      id: "more-actions",
      label: "More",
      icon: "more",
      type: "secondary",
    },
  ],

  /* =========================================================
     SUMMARY CARDS
  ========================================================== */
  summaryCards: [
    {
      id: "total-workers",
      title: "Total Workers",
      value: 2458,
      icon: "users",
      iconColor: "green",
      bgColor: "green",
    },
    {
      id: "active-workers",
      title: "Active Workers",
      value: 2213,
      icon: "user-check",
      iconColor: "green",
      bgColor: "green",
    },
    {
      id: "on-leave",
      title: "On Leave Today",
      value: 62,
      icon: "calendar",
      iconColor: "orange",
      bgColor: "orange",
    },
    {
      id: "inactive-workers",
      title: "Inactive / Resigned",
      value: 183,
      icon: "user-x",
      iconColor: "red",
      bgColor: "red",
    },
    {
      id: "new-this-month",
      title: "New This Month",
      value: 48,
      icon: "user-plus",
      iconColor: "blue",
      bgColor: "blue",
    },
  ],

  /* =========================================================
     FILTERS
  ========================================================== */
  filters: {
    gardenOptions: [
      {
        value: "all",
        label: "All Gardens",
      },
      {
        value: "jamuna",
        label: "Jamuna Tea Estate",
      },
      {
        value: "madhupur",
        label: "Madhupur Tea Estate",
      },
      {
        value: "sylhet",
        label: "Sylhet Tea Estate",
      },
    ],

    sectionOptions: [
      {
        value: "all",
        label: "All Sections",
      },
      {
        value: "north",
        label: "North Section",
      },
      {
        value: "central",
        label: "Central Section",
      },
      {
        value: "south",
        label: "South Section",
      },
      {
        value: "east",
        label: "East Section",
      },
      {
        value: "west",
        label: "West Section",
      },
    ],

    categoryOptions: [
      {
        value: "all",
        label: "All Categories",
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
        value: "others",
        label: "Others",
      },
    ],

    workerTypeOptions: [
      {
        value: "all",
        label: "All Types",
      },
      {
        value: "regular",
        label: "Regular",
      },
      {
        value: "casual",
        label: "Casual",
      },
      {
        value: "temporary",
        label: "Temporary",
      },
    ],

    statusOptions: [
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
        value: "resigned",
        label: "Resigned",
      },
    ],

    search: {
      placeholder: "Search by ID, Name, Mobile...",
    },
  },

  /* =========================================================
     WORKER TABLE HEADERS
  ========================================================== */
  tableHeaders: [
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
      id: "photo",
      label: "Photo",
      key: "photo",
    },
    {
      id: "worker-name",
      label: "Worker Name",
      key: "workerName",
    },
    {
      id: "father-name",
      label: "Father's Name",
      key: "fatherName",
    },
    {
      id: "category",
      label: "Category",
      key: "category",
    },
    {
      id: "section",
      label: "Section",
      key: "section",
    },
    {
      id: "mobile",
      label: "Mobile",
      key: "mobile",
    },
    {
      id: "join-date",
      label: "Join Date",
      key: "joinDate",
    },
    {
      id: "status",
      label: "Status",
      key: "status",
    },
    {
      id: "action",
      label: "Action",
      key: "action",
    },
  ],

  /* =========================================================
     WORKER LIST
  ========================================================== */
  workers: [
    {
      id: "worker-001",
      sl: 1,
      workerId: "WRK-10001",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      workerName: "Rupa Rani Tanti",
      fatherName: "Nirmal Chandra Tanti",
      motherName: "Shanti Rani Tanti",
      category: "Plucking",
      section: "North Section",
      garden: "Jamuna Tea Estate",
      mobile: "01712-345678",
      email: "ruparani.tanti@rupai.com",
      joinDate: "12-01-2023",
      dateOfBirth: "10-03-1995",
      gender: "Female",
      bloodGroup: "B+",
      maritalStatus: "Married",
      nidNumber: "19951234567890123",
      workerType: "Regular",
      designation: "Plucking Worker",
      status: "Active",
      presentAddress:
        "Vill: Uttar Raighat, Post: Rajghat, PS: Moulvibazar, District: Moulvibazar",
      permanentAddress:
        "Vill: Uttar Raighat, Post: Rajghat, PS: Moulvibazar, District: Moulvibazar",
    },

    {
      id: "worker-002",
      sl: 2,
      workerId: "WRK-10002",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      workerName: "Maya Barman",
      fatherName: "Kamal Barman",
      motherName: "Mina Barman",
      category: "Plucking",
      section: "North Section",
      garden: "Jamuna Tea Estate",
      mobile: "01798-765432",
      email: "maya.barman@rupai.com",
      joinDate: "05-02-2023",
      dateOfBirth: "18-06-1993",
      gender: "Female",
      bloodGroup: "O+",
      maritalStatus: "Married",
      nidNumber: "19931876543210987",
      workerType: "Regular",
      designation: "Plucking Worker",
      status: "Active",
      presentAddress:
        "Vill: North Garden, Post: Rajghat, District: Moulvibazar",
      permanentAddress:
        "Vill: North Garden, Post: Rajghat, District: Moulvibazar",
    },

    {
      id: "worker-003",
      sl: 3,
      workerId: "WRK-10003",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      workerName: "Purnima Roy",
      fatherName: "Haripada Roy",
      motherName: "Maya Roy",
      category: "Pruning",
      section: "Central Section",
      garden: "Jamuna Tea Estate",
      mobile: "01822-334455",
      email: "purnima.roy@rupai.com",
      joinDate: "20-01-2023",
      dateOfBirth: "22-11-1990",
      gender: "Female",
      bloodGroup: "A+",
      maritalStatus: "Married",
      nidNumber: "19902233445566778",
      workerType: "Regular",
      designation: "Pruning Worker",
      status: "Active",
      presentAddress:
        "Vill: Central Garden, Post: Rajghat, District: Moulvibazar",
      permanentAddress:
        "Vill: Central Garden, Post: Rajghat, District: Moulvibazar",
    },

    {
      id: "worker-004",
      sl: 4,
      workerId: "WRK-10004",
      photo: "https://randomuser.me/api/portraits/women/32.jpg",
      workerName: "Jharna Das",
      fatherName: "Gopal Das",
      motherName: "Rina Das",
      category: "Weeding",
      section: "South Section",
      garden: "Jamuna Tea Estate",
      mobile: "01766-778899",
      email: "jharna.das@rupai.com",
      joinDate: "10-03-2023",
      dateOfBirth: "14-08-1992",
      gender: "Female",
      bloodGroup: "B+",
      maritalStatus: "Married",
      nidNumber: "19927788990011223",
      workerType: "Casual",
      designation: "Weeding Worker",
      status: "Active",
      presentAddress:
        "Vill: South Garden, Post: Rajghat, District: Moulvibazar",
      permanentAddress:
        "Vill: South Garden, Post: Rajghat, District: Moulvibazar",
    },

    {
      id: "worker-005",
      sl: 5,
      workerId: "WRK-10005",
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
      workerName: "Babulal Sutradhaar",
      fatherName: "Dilip Sutradhaar",
      motherName: "Kamala Sutradhaar",
      category: "Plucking",
      section: "East Section",
      garden: "Jamuna Tea Estate",
      mobile: "01833-112233",
      email: "babulal.sutradhaar@rupai.com",
      joinDate: "18-02-2023",
      dateOfBirth: "02-05-1988",
      gender: "Male",
      bloodGroup: "O+",
      maritalStatus: "Married",
      nidNumber: "19881122334455667",
      workerType: "Regular",
      designation: "Plucking Worker",
      status: "Active",
      presentAddress: "Vill: East Garden, Post: Rajghat, District: Moulvibazar",
      permanentAddress:
        "Vill: East Garden, Post: Rajghat, District: Moulvibazar",
    },

    {
      id: "worker-006",
      sl: 6,
      workerId: "WRK-10006",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      workerName: "Lata Rani Saha",
      fatherName: "Nabin Saha",
      motherName: "Mina Rani Saha",
      category: "Plucking",
      section: "North Section",
      garden: "Jamuna Tea Estate",
      mobile: "01744-556677",
      email: "lata.saha@rupai.com",
      joinDate: "22-01-2023",
      dateOfBirth: "09-09-1991",
      gender: "Female",
      bloodGroup: "A+",
      maritalStatus: "Married",
      nidNumber: "19915566778899001",
      workerType: "Regular",
      designation: "Plucking Worker",
      status: "On Leave",
      presentAddress:
        "Vill: North Garden, Post: Rajghat, District: Moulvibazar",
      permanentAddress:
        "Vill: North Garden, Post: Rajghat, District: Moulvibazar",
    },

    {
      id: "worker-007",
      sl: 7,
      workerId: "WRK-10007",
      photo: "https://randomuser.me/api/portraits/men/52.jpg",
      workerName: "Ratan Tanti",
      fatherName: "Bhola Tanti",
      motherName: "Shila Tanti",
      category: "Pruning",
      section: "Central Section",
      garden: "Jamuna Tea Estate",
      mobile: "01888-998877",
      email: "ratan.tanti@rupai.com",
      joinDate: "15-03-2023",
      dateOfBirth: "17-04-1987",
      gender: "Male",
      bloodGroup: "B+",
      maritalStatus: "Married",
      nidNumber: "19879988776655443",
      workerType: "Regular",
      designation: "Pruning Worker",
      status: "Active",
      presentAddress:
        "Vill: Central Garden, Post: Rajghat, District: Moulvibazar",
      permanentAddress:
        "Vill: Central Garden, Post: Rajghat, District: Moulvibazar",
    },

    {
      id: "worker-008",
      sl: 8,
      workerId: "WRK-10008",
      photo: "https://randomuser.me/api/portraits/men/67.jpg",
      workerName: "Sukur Ali",
      fatherName: "Halima Begum",
      motherName: "Rahima Begum",
      category: "Weeding",
      section: "West Section",
      garden: "Jamuna Tea Estate",
      mobile: "01799-887766",
      email: "sukur.ali@rupai.com",
      joinDate: "01-02-2023",
      dateOfBirth: "25-12-1989",
      gender: "Male",
      bloodGroup: "O+",
      maritalStatus: "Married",
      nidNumber: "19898877665544332",
      workerType: "Casual",
      designation: "Weeding Worker",
      status: "Active",
      presentAddress: "Vill: West Garden, Post: Rajghat, District: Moulvibazar",
      permanentAddress:
        "Vill: West Garden, Post: Rajghat, District: Moulvibazar",
    },
  ],

  /* =========================================================
     PAGINATION
  ========================================================== */
  pagination: {
    currentPage: 1,
    totalPages: 308,
    itemsPerPage: 8,
    totalItems: 2458,
    showingFrom: 1,
    showingTo: 8,

    pages: [1, 2, 3, 4, 5, "...", 308],
  },

  /* =========================================================
     WORKER PROFILE TABS
  ========================================================== */
  profileTabs: [
    {
      id: "personal-info",
      label: "Personal Info",
    },
    {
      id: "employment",
      label: "Employment",
    },
    {
      id: "attendance",
      label: "Attendance",
    },
    {
      id: "documents",
      label: "Documents",
    },
    {
      id: "activity-log",
      label: "Activity Log",
    },
  ],

  /* =========================================================
     SELECTED WORKER PROFILE
  ========================================================== */
  workerProfile: {
    workerId: "WRK-10001",
    workerName: "Rupa Rani Tanti",

    // Random profile image
    photo: "https://randomuser.me/api/portraits/women/44.jpg",

    status: "Active",

    designation: "Plucking Worker",
    section: "North Section",
    garden: "Jamuna Tea Estate",

    mobile: "01712-345678",
    email: "ruparani.tanti@rupai.com",

    joinDate: "12-01-2023",

    personalInfo: {
      fatherName: "Nirmal Chandra Tanti",
      motherName: "Shanti Rani Tanti",
      dateOfBirth: "10 March 1995",
      gender: "Female",
      bloodGroup: "B+",
      maritalStatus: "Married",
      nidNumber: "19951234567890123",
      mobile: "01712-345678",
      presentAddress:
        "Vill: Uttar Raighat, Post: Rajghat, PS: Moulvibazar, District: Moulvibazar",
      permanentAddress:
        "Vill: Uttar Raighat, Post: Rajghat, PS: Moulvibazar, District: Moulvibazar",
    },

    employmentInfo: {
      workerType: "Regular",
      category: "Plucking",
      designation: "Plucking Worker",
      garden: "Jamuna Tea Estate",
      division: "North Division",
      section: "North Section",
      joiningDate: "12-01-2023",
      employmentStatus: "Active",
      workerCode: "WRK-10001",
    },

    attendanceInfo: {
      present: 156,
      absent: 26,
      leave: 8,
      attendancePercentage: 82.1,
    },

    documents: [
      {
        id: "nid-front",
        name: "NID Card Front",
        fileName: "WRK-10001-NID-FRONT.jpg",
        status: "Uploaded",
      },
      {
        id: "nid-back",
        name: "NID Card Back",
        fileName: "WRK-10001-NID-BACK.jpg",
        status: "Uploaded",
      },
      {
        id: "photo",
        name: "Passport Size Photo",
        fileName: "WRK-10001-PHOTO.jpg",
        status: "Uploaded",
      },
      {
        id: "bank-account",
        name: "Bank Account",
        fileName: "WRK-10001-BANK.pdf",
        status: "Uploaded",
      },
      {
        id: "other-document",
        name: "Other Document",
        fileName: null,
        status: "Pending",
      },
    ],
  },

  /* =========================================================
     CATEGORY WISE WORKERS
  ========================================================== */
  categoryWiseWorkers: [
    {
      id: "plucking",
      name: "Plucking",
      value: 1652,
      percentage: 67.2,
      color: "#15803d",
    },
    {
      id: "pruning",
      name: "Pruning",
      value: 312,
      percentage: 12.71,
      color: "#2563eb",
    },
    {
      id: "weeding",
      name: "Weeding",
      value: 284,
      percentage: 11.56,
      color: "#f59e0b",
    },
    {
      id: "others",
      name: "Others",
      value: 210,
      percentage: 8.53,
      color: "#9333ea",
    },
  ],

  /* =========================================================
     SECTION WISE DISTRIBUTION
  ========================================================== */
  sectionWiseDistribution: [
    {
      id: "north-section",
      name: "North Section",
      value: 652,
      percentage: 100,
    },
    {
      id: "central-section",
      name: "Central Section",
      value: 548,
      percentage: 84.05,
    },
    {
      id: "south-section",
      name: "South Section",
      value: 486,
      percentage: 74.54,
    },
    {
      id: "east-section",
      name: "East Section",
      value: 402,
      percentage: 61.66,
    },
    {
      id: "west-section",
      name: "West Section",
      value: 370,
      percentage: 56.75,
    },
  ],

  /* =========================================================
     WORKER TYPES
  ========================================================== */
  workerTypes: [
    {
      id: "regular",
      name: "Regular",
      value: 2056,
      percentage: 83.66,
      icon: "regular",
    },
    {
      id: "casual",
      name: "Casual",
      value: 312,
      percentage: 12.71,
      icon: "casual",
    },
    {
      id: "temporary",
      name: "Temporary",
      value: 90,
      percentage: 3.66,
      icon: "temporary",
    },
  ],

  /* =========================================================
     RECENT JOINEES
  ========================================================== */
  recentJoinees: [
    {
      id: "recent-001",
      workerId: "WRK-10245",
      workerName: "Maloti Rani Das",
      joinDate: "29-05-2026",
    },
    {
      id: "recent-002",
      workerId: "WRK-10244",
      workerName: "Paban Sutradhar",
      joinDate: "28-05-2026",
    },
    {
      id: "recent-003",
      workerId: "WRK-10243",
      workerName: "Tasmina Begum",
      joinDate: "27-05-2026",
    },
    {
      id: "recent-004",
      workerId: "WRK-10242",
      workerName: "Biplob Roy",
      joinDate: "26-05-2026",
    },
    {
      id: "recent-005",
      workerId: "WRK-10241",
      workerName: "Rina Rani",
      joinDate: "25-05-2026",
    },
  ],

  documents: [
    {
      id: "nid-front",
      name: "NID Card (Front)",
      icon: "upload",
      status: "Uploaded",
    },
    {
      id: "nid-back",
      name: "NID Card (Back)",
      icon: "upload",
      status: "Uploaded",
    },
    {
      id: "passport-photo",
      name: "Passport Size Photo",
      icon: "upload",
      status: "Uploaded",
    },
    {
      id: "bank-account",
      name: "Bank Account",
      icon: "bank",
      status: "Uploaded",
    },
    {
      id: "other-document",
      name: "Other Document",
      icon: "document",
      status: "Uploaded",
    },
  ],

  attendanceOverview: {
    title: "Attendance Overview (This Month)",

    present: {
      value: 1856,
      percentage: 84.12,
    },

    absent: {
      value: 312,
      percentage: 14.15,
    },

    leave: {
      value: 62,
      percentage: 2.81,
    },

    buttonText: "View Attendance Report",
  },

  actionShortcuts: [
    {
      id: "bulk-attendance",
      name: "Bulk Attendance",
      icon: "attendance",
    },
    {
      id: "wage-sheet",
      name: "Wage Sheet",
      icon: "wage",
    },
    {
      id: "id-card",
      name: "ID Card Print",
      icon: "idCard",
    },
    {
      id: "worker-transfer",
      name: "Worker Transfer",
      icon: "transfer",
    },
    {
      id: "resignation",
      name: "Resignation",
      icon: "resignation",
    },
    {
      id: "more-actions",
      name: "More Actions",
      icon: "more",
    },
  ],

  /* =========================================================
     ADD WORKER FORM CONFIG
     ========================================================= */
  addWorkerForm: {
    sections: [
      {
        id: "basic-information",
        title: "Basic Information",
        fields: [
          {
            name: "workerName",
            label: "Worker Name",
            type: "text",
            placeholder: "Enter worker name",
            required: true,
          },
          {
            name: "fatherName",
            label: "Father's Name",
            type: "text",
            placeholder: "Enter father's name",
            required: true,
          },
          {
            name: "motherName",
            label: "Mother's Name",
            type: "text",
            placeholder: "Enter mother's name",
            required: false,
          },
          {
            name: "dateOfBirth",
            label: "Date of Birth",
            type: "date",
            required: true,
          },
          {
            name: "gender",
            label: "Gender",
            type: "select",
            required: true,
            options: [
              {
                value: "male",
                label: "Male",
              },
              {
                value: "female",
                label: "Female",
              },
              {
                value: "other",
                label: "Other",
              },
            ],
          },
          {
            name: "bloodGroup",
            label: "Blood Group",
            type: "select",
            required: false,
            options: [
              {
                value: "A+",
                label: "A+",
              },
              {
                value: "A-",
                label: "A-",
              },
              {
                value: "B+",
                label: "B+",
              },
              {
                value: "B-",
                label: "B-",
              },
              {
                value: "AB+",
                label: "AB+",
              },
              {
                value: "AB-",
                label: "AB-",
              },
              {
                value: "O+",
                label: "O+",
              },
              {
                value: "O-",
                label: "O-",
              },
            ],
          },
          {
            name: "mobile",
            label: "Mobile Number",
            type: "tel",
            placeholder: "Enter mobile number",
            required: true,
          },
          {
            name: "nidNumber",
            label: "NID Number",
            type: "text",
            placeholder: "Enter NID number",
            required: false,
          },
          {
            name: "maritalStatus",
            label: "Marital Status",
            type: "select",
            required: false,
            options: [
              {
                value: "single",
                label: "Single",
              },
              {
                value: "married",
                label: "Married",
              },
              {
                value: "widowed",
                label: "Widowed",
              },
              {
                value: "divorced",
                label: "Divorced",
              },
            ],
          },
        ],
      },

      {
        id: "employment-information",
        title: "Employment Information",
        fields: [
          {
            name: "garden",
            label: "Garden / Unit",
            type: "select",
            required: true,
          },
          {
            name: "division",
            label: "Division",
            type: "select",
            required: true,
          },
          {
            name: "section",
            label: "Section",
            type: "select",
            required: true,
          },
          {
            name: "category",
            label: "Worker Category",
            type: "select",
            required: true,
          },
          {
            name: "workerType",
            label: "Worker Type",
            type: "select",
            required: true,
          },
          {
            name: "joiningDate",
            label: "Joining Date",
            type: "date",
            required: true,
          },
          {
            name: "employmentStatus",
            label: "Employment Status",
            type: "select",
            required: true,
          },
          {
            name: "workerCode",
            label: "Worker Code",
            type: "text",
            placeholder: "Enter worker code",
            required: false,
          },
          {
            name: "designation",
            label: "Designation",
            type: "text",
            placeholder: "Enter designation",
            required: false,
          },
        ],
      },

      {
        id: "address-information",
        title: "Address Information",
        fields: [
          {
            name: "presentAddress",
            label: "Present Address",
            type: "textarea",
            placeholder: "Enter present address",
            required: false,
          },
          {
            name: "permanentAddress",
            label: "Permanent Address",
            type: "textarea",
            placeholder: "Enter permanent address",
            required: false,
          },
        ],
      },
    ],
  },
};
