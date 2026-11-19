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
  ],

  // =========================================================
  // TABLE CONFIGURATION
  // =========================================================
  tableHeaders: [
    "SL",
    "Grade Name",
    "Tea Type",
    "Category",
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
      gradeSize: "2.00 - 2.80 mm",
      status: "Active",
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
      gradeSize: "1.50 - 2.00 mm",
      status: "Active",
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
      gradeSize: "2.00 - 3.00 mm",
      status: "Active",
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
      gradeSize: "1.00 - 1.50 mm",
      status: "Active",
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
      gradeSize: "0.50 - 1.00 mm",
      status: "Active",
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
      gradeSize: "Below 0.50 mm",
      status: "Active",
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
      gradeSize: "3.00 - 4.00 mm",
      status: "Active",
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
      gradeSize: "3.00 - 4.50 mm",
      status: "Active",
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
      gradeSize: "2.50 - 3.50 mm",
      status: "Active",
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
      gradeSize: "3.00 - 4.00 mm",
      status: "Active",
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
      gradeSize: "Below 0.50 mm",
      status: "Active",
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
      gradeSize: "2.00 - 3.00 mm",
      status: "Active",
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
        name: "gradeName",
        label: "Grade Name",
        type: "text",
        placeholder: "Enter grade name",
        required: true,
      },

      {
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "Select status",
        required: true,
      },


    ],

    // RP1-209: fixed lists (the server's /tea-grades/filter-options is the source; these are the fallback).
    teaTypeOptions: [
      { value: "CTC", label: "CTC" },
      { value: "Green Tea", label: "Green Tea" },
      { value: "Orthodox", label: "Orthodox" },
    ],

    categoryOptions: [
      { value: "Leaf", label: "Leaf" },
      { value: "Dust", label: "Dust" },
      { value: "Green-Ortho", label: "Green-Ortho" },
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
        label: "Last Updated",
        value: "02/06/2026 09:25 AM",
        icon: "clock",
      },
      {
        id: 5,
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
