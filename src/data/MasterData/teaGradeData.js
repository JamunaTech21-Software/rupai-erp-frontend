const teaGradeData = {
  // =========================================================
  // SUMMARY CARDS
  // =========================================================
  summaryCards: [
    {
      id: 1,
      title: "Total Grades",
      value: 12,
      subtitle: "All Grades",
      icon: "cup",
    },
    {
      id: 2,
      title: "Active Grades",
      value: 12,
      subtitle: "Active",
      icon: "shield",
    },
    {
      id: 3,
      title: "Inactive Grades",
      value: 0,
      subtitle: "Inactive",
      icon: "inactive",
    },
    {
      id: 4,
      title: "Standard Grades",
      value: 10,
      subtitle: "With Standard",
      icon: "tag",
    },
    {
      id: 5,
      title: "Custom Grades",
      value: 2,
      subtitle: "Custom",
      icon: "edit",
    },
  ],

  // =========================================================
  // TABLE CONFIGURATION
  // =========================================================
  tableHeaders: [
    "SL",
    "Grade Code",
    "Grade Name",
    "Tea Type",
    "Category",
    "Standard",
    "Status",
    "Created By",
    "Created On",
    "Action",
  ],

  // =========================================================
  // TEA GRADE LIST
  // =========================================================
  grades: [
    {
      id: 1,
      gradeCode: "BOP",
      gradeName: "Broken Orange Pekoe",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1572",
      gradeSize: "2.00 - 2.80 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Well-made broken leaf with mixture of buds. A popular black tea grade.",
      remarks: "",
      createdBy: "Md. Faruk Hossain",
      createdOn: "01/06/2026 10:10 AM",
      lastUpdated: "01/06/2026 10:10 AM",
      lastUpdatedBy: "Md. Faruk Hossain",
    },

    {
      id: 2,
      gradeCode: "BOPF",
      gradeName: "Broken Orange Pekoe Fannings",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1573",
      gradeSize: "1.50 - 2.00 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Fine broken leaf grade suitable for producing a strong and bright liquor.",
      remarks: "",
      createdBy: "Md. Faruk Hossain",
      createdOn: "01/06/2026 10:15 AM",
      lastUpdated: "01/06/2026 10:15 AM",
      lastUpdatedBy: "Md. Faruk Hossain",
    },

    {
      id: 3,
      gradeCode: "BP",
      gradeName: "Broken Pekoe",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1574",
      gradeSize: "2.00 - 3.00 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Broken pekoe leaf grade with good strength and balanced character.",
      remarks: "",
      createdBy: "Md. Faruk Hossain",
      createdOn: "01/06/2026 10:20 AM",
      lastUpdated: "01/06/2026 10:20 AM",
      lastUpdatedBy: "Md. Faruk Hossain",
    },

    {
      id: 4,
      gradeCode: "PF",
      gradeName: "Pekoe Fannings",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1576",
      gradeSize: "1.00 - 1.50 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Small pekoe leaf particles producing a brisk and bright infusion.",
      remarks: "",
      createdBy: "Md. Faruk Hossain",
      createdOn: "01/06/2026 10:25 AM",
      lastUpdated: "01/06/2026 10:25 AM",
      lastUpdatedBy: "Md. Faruk Hossain",
    },

    {
      id: 5,
      gradeCode: "PD",
      gradeName: "Pekoe Dust",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1577",
      gradeSize: "0.50 - 1.00 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Fine pekoe particles used for producing strong and quick brewing tea.",
      remarks: "",
      createdBy: "Md. Faruk Hossain",
      createdOn: "01/06/2026 10:30 AM",
      lastUpdated: "01/06/2026 10:30 AM",
      lastUpdatedBy: "Md. Faruk Hossain",
    },

    {
      id: 6,
      gradeCode: "DUST",
      gradeName: "Dust",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1578",
      gradeSize: "Below 0.50 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Very fine tea particles providing fast infusion and strong liquor.",
      remarks: "",
      createdBy: "Afsana Begum",
      createdOn: "01/06/2026 11:00 AM",
      lastUpdated: "01/06/2026 11:00 AM",
      lastUpdatedBy: "Afsana Begum",
    },

    {
      id: 7,
      gradeCode: "OPA",
      gradeName: "Orange Pekoe A",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1571",
      gradeSize: "3.00 - 4.00 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Large whole leaf grade with delicate character and good appearance.",
      remarks: "",
      createdBy: "Afsana Begum",
      createdOn: "01/06/2026 11:05 AM",
      lastUpdated: "01/06/2026 11:05 AM",
      lastUpdatedBy: "Afsana Begum",
    },

    {
      id: 8,
      gradeCode: "OP",
      gradeName: "Orange Pekoe",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1570",
      gradeSize: "3.00 - 4.50 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Whole leaf black tea grade with good appearance and balanced flavor.",
      remarks: "",
      createdBy: "Afsana Begum",
      createdOn: "01/06/2026 11:10 AM",
      lastUpdated: "01/06/2026 11:10 AM",
      lastUpdatedBy: "Afsana Begum",
    },

    {
      id: 9,
      gradeCode: "P",
      gradeName: "Pekoe",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1569",
      gradeSize: "2.50 - 3.50 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Medium whole leaf tea grade with smooth and balanced character.",
      remarks: "",
      createdBy: "Md. Faruk Hossain",
      createdOn: "01/06/2026 11:15 AM",
      lastUpdated: "01/06/2026 11:15 AM",
      lastUpdatedBy: "Md. Faruk Hossain",
    },

    {
      id: 10,
      gradeCode: "TGFO P",
      gradeName: "Tippy Golden Flowery Orange Pekoe",
      teaType: "Black Tea",
      category: "Orthodox",
      standard: "ISO 1610",
      gradeSize: "3.00 - 4.00 mm",
      status: "Active",
      gradeClassification: "Standard",
      description:
        "Premium whole leaf grade containing golden tips and high-quality leaves.",
      remarks: "",
      createdBy: "Md. Faruk Hossain",
      createdOn: "02/06/2026 09:00 AM",
      lastUpdated: "02/06/2026 09:00 AM",
      lastUpdatedBy: "Md. Faruk Hossain",
    },

    {
      id: 11,
      gradeCode: "CTC-DUST",
      gradeName: "CTC Dust",
      teaType: "CTC Tea",
      category: "CTC",
      standard: "ISO 3102",
      gradeSize: "Below 0.50 mm",
      status: "Active",
      gradeClassification: "Custom",
      description:
        "Fine CTC tea particle designed for quick infusion and strong liquor.",
      remarks: "",
      createdBy: "Afsana Begum",
      createdOn: "02/06/2026 09:20 AM",
      lastUpdated: "02/06/2026 09:20 AM",
      lastUpdatedBy: "Afsana Begum",
    },

    {
      id: 12,
      gradeCode: "CTC-LEAF",
      gradeName: "CTC Leaf",
      teaType: "CTC Tea",
      category: "CTC",
      standard: "ISO 3101",
      gradeSize: "2.00 - 3.00 mm",
      status: "Active",
      gradeClassification: "Custom",
      description:
        "CTC processed leaf grade with strong liquor and consistent appearance.",
      remarks: "",
      createdBy: "Afsana Begum",
      createdOn: "02/06/2026 09:25 AM",
      lastUpdated: "02/06/2026 09:25 AM",
      lastUpdatedBy: "Afsana Begum",
    },
  ],

  // =========================================================
  // FORM CONFIGURATION
  // =========================================================
  form: {
    title: "Grade Details",

    fields: [
      {
        name: "gradeCode",
        label: "Grade Code",
        type: "text",
        placeholder: "Enter grade code",
        required: true,
      },

      {
        name: "gradeName",
        label: "Grade Name",
        type: "text",
        placeholder: "Enter grade name",
        required: true,
      },

      {
        name: "teaType",
        label: "Tea Type",
        type: "select",
        placeholder: "Select tea type",
        required: true,
      },

      {
        name: "category",
        label: "Category",
        type: "select",
        placeholder: "Select category",
        required: true,
      },

      {
        name: "standard",
        label: "Standard / Specification",
        type: "text",
        placeholder: "Enter standard",
        required: false,
      },

      {
        name: "gradeSize",
        label: "Grade Size / Particle",
        type: "text",
        placeholder: "Example: 2.00 - 2.80 mm",
        required: false,
      },

      {
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "Select status",
        required: true,
      },
    ],

    teaTypeOptions: [
      {
        value: "Black Tea",
        label: "Black Tea",
      },
      {
        value: "CTC Tea",
        label: "CTC Tea",
      },
      {
        value: "Green Tea",
        label: "Green Tea",
      },
      {
        value: "White Tea",
        label: "White Tea",
      },
    ],

    categoryOptions: [
      {
        value: "Orthodox",
        label: "Orthodox",
      },
      {
        value: "CTC",
        label: "CTC",
      },
      {
        value: "Specialty",
        label: "Specialty",
      },
    ],

    statusOptions: [
      {
        value: "Active",
        label: "Active",
      },
      {
        value: "Inactive",
        label: "Inactive",
      },
    ],

    description: {
      name: "description",
      label: "Description",
      placeholder: "Enter grade description...",
      maxLength: 500,
    },

    remarks: {
      name: "remarks",
      label: "Remarks (Optional)",
      placeholder: "Enter remarks...",
      maxLength: 300,
    },

    resetButton: {
      label: "Reset",
    },

    footer: {
      cancelButton: {
        label: "Cancel",
      },

      submitButton: {
        label: "Update Grade",
      },
    },
  },

  // =========================================================
  // INFORMATION PANEL
  // =========================================================
  information: {
    title: "Grade Information",

    items: [
      {
        id: 1,
        label: "Total Grades",
        value: 12,
        icon: "cup",
      },
      {
        id: 2,
        label: "Active Grades",
        value: 12,
        icon: "shield",
      },
      {
        id: 3,
        label: "Inactive Grades",
        value: 0,
        icon: "inactive",
      },
      {
        id: 4,
        label: "Standard Grades",
        value: 10,
        icon: "tag",
      },
      {
        id: 5,
        label: "Custom Grades",
        value: 2,
        icon: "edit",
      },
      {
        id: 6,
        label: "Last Updated",
        value: "02/06/2026 09:25 AM",
        icon: "clock",
      },
      {
        id: 7,
        label: "Last Updated By",
        value: "Afsana Begum",
        icon: "user",
      },
    ],
  },

  // =========================================================
  // TEA TYPE DISTRIBUTION
  // =========================================================
  teaTypeDistribution: [
    {
      name: "Black Tea",
      value: 10,
    },
    {
      name: "CTC Tea",
      value: 2,
    },
  ],

  // =========================================================
  // PAGINATION
  // =========================================================
  pagination: {
    pageSize: 10,
    currentPage: 1,
  },
};

export default teaGradeData;
