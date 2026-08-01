export const replantingAndGapFillingData = {
  // ======================================================
  // PAGE INFORMATION
  // ======================================================
  pageInfo: {
    module: "Plantation Management",
    page: "Replanting & Gap Filling",
    pageTitle: "Replanting & Gap Filling Workflow",
    shortTitle: "Replanting",
    description:
      "Manage the complete replanting and gap filling process from project planning to final approval and reporting.",

    version: "1.0.0",
    workflowVersion: "2026",
    company: "Rupai Tea Estate ERP",
    processCode: "PM-RGF",
    createdBy: "System Administrator",
    lastUpdated: "2026-08-01",
    status: "Active",
    icon: "Trees",
    color: "green",

    totalSteps: 8,
    totalDatabaseTables: 10,
    totalUserRoles: 6,
    totalReports: 8,

    allowCreate: true,
    allowEdit: true,
    allowDelete: false,
    allowApprove: true,
    allowExport: true,
    allowPrint: true,
    allowUpload: true,
    allowGIS: true,
    allowPhotoUpload: true,
    allowDocumentUpload: true,
  },

  // ======================================================
  // DATA SAVE FLOW
  // ======================================================
  saveFlow: [
    {
      id: 1,
      step: 1,
      title: "Project Information",
      description: "Create a new replanting project.",
      table: "replanting_master",
      component: "ProjectInformation",
      saveOrder: 1,
      required: true,
      status: "Pending",
    },

    {
      id: 2,
      step: 2,
      title: "Gap Survey Entry",
      description: "Record gap survey details.",
      table: "replanting_gap_details",
      component: "GapSurveyEntry",
      saveOrder: 2,
      required: true,
      status: "Pending",
    },

    {
      id: 3,
      step: 3,
      title: "Land Preparation",
      description: "Prepare land before planting.",
      table: "replanting_land_preparation",
      component: "LandPreparation",
      saveOrder: 3,
      required: true,
      status: "Pending",
    },

    {
      id: 4,
      step: 4,
      title: "Material Planning",
      description: "Allocate seedlings and materials.",
      table: "replanting_materials",
      component: "MaterialPlanning",
      saveOrder: 4,
      required: true,
      status: "Pending",
    },

    {
      id: 5,
      step: 5,
      title: "Labour Allocation",
      description: "Assign labour and supervisor.",
      table: "replanting_labour",
      component: "LabourAllocation",
      saveOrder: 5,
      required: true,
      status: "Pending",
    },

    {
      id: 6,
      step: 6,
      title: "Planting Execution",
      description: "Complete field planting activities.",
      table: "replanting_execution",
      component: "PlantingExecution",
      saveOrder: 6,
      required: true,
      status: "Pending",
    },

    {
      id: 7,
      step: 7,
      title: "Progress Monitoring",
      description: "Monitor field progress.",
      table: "replanting_progress",
      component: "ProgressMonitoring",
      saveOrder: 7,
      required: true,
      status: "Pending",
    },

    {
      id: 8,
      step: 8,
      title: "Approval & Completion",
      description: "Approve and complete workflow.",
      table: "replanting_approval",
      component: "ApprovalCompletion",
      saveOrder: 8,
      required: true,
      status: "Pending",
    },
  ],
  // ======================================================
  // DATABASE FLOW
  // Paste Below saveFlow
  // ======================================================
  databaseFlow: [
    {
      id: 1,
      sequence: 1,
      title: "Project Created",
      fromTable: "replanting_master",
      nextTable: "replanting_gap_details",
      action: "Create Project",
      icon: "FolderPlus",
      status: "Active",
    },

    {
      id: 2,
      sequence: 2,
      title: "Gap Survey Saved",
      fromTable: "replanting_gap_details",
      nextTable: "replanting_land_preparation",
      action: "Save Survey",
      icon: "ClipboardCheck",
      status: "Pending",
    },

    {
      id: 3,
      sequence: 3,
      title: "Land Preparation",
      fromTable: "replanting_land_preparation",
      nextTable: "replanting_materials",
      action: "Prepare Land",
      icon: "Map",
      status: "Pending",
    },

    {
      id: 4,
      sequence: 4,
      title: "Material Planning",
      fromTable: "replanting_materials",
      nextTable: "replanting_labour",
      action: "Allocate Materials",
      icon: "Package",
      status: "Pending",
    },

    {
      id: 5,
      sequence: 5,
      title: "Labour Assigned",
      fromTable: "replanting_labour",
      nextTable: "replanting_execution",
      action: "Assign Labour",
      icon: "Users",
      status: "Pending",
    },

    {
      id: 6,
      sequence: 6,
      title: "Planting Completed",
      fromTable: "replanting_execution",
      nextTable: "replanting_progress",
      action: "Execute Planting",
      icon: "Trees",
      status: "Pending",
    },

    {
      id: 7,
      sequence: 7,
      title: "Progress Updated",
      fromTable: "replanting_progress",
      nextTable: "replanting_approval",
      action: "Update Progress",
      icon: "TrendingUp",
      status: "Pending",
    },

    {
      id: 8,
      sequence: 8,
      title: "Approval Completed",
      fromTable: "replanting_approval",
      nextTable: null,
      action: "Workflow Complete",
      icon: "BadgeCheck",
      status: "Completed",
    },
  ],
  // ======================================================
  // DATA SAVE PROCESS
  // Paste Below databaseFlow
  // ======================================================
  saveProcess: [
    {
      id: 1,
      step: 1,
      title: "Create Project",
      description: "User creates a new replanting project.",
      action: "INSERT",
      table: "replanting_master",
      status: "Required",
    },

    {
      id: 2,
      step: 2,
      title: "Save Gap Survey",
      description: "Gap survey information is stored.",
      action: "INSERT",
      table: "replanting_gap_details",
      status: "Required",
    },

    {
      id: 3,
      step: 3,
      title: "Save Land Preparation",
      description: "Land preparation details are saved.",
      action: "INSERT",
      table: "replanting_land_preparation",
      status: "Required",
    },

    {
      id: 4,
      step: 4,
      title: "Save Material Planning",
      description: "Material allocation is stored.",
      action: "INSERT",
      table: "replanting_materials",
      status: "Required",
    },

    {
      id: 5,
      step: 5,
      title: "Save Labour Allocation",
      description: "Labour assignment information is saved.",
      action: "INSERT",
      table: "replanting_labour",
      status: "Required",
    },

    {
      id: 6,
      step: 6,
      title: "Save Planting Execution",
      description: "Planting execution data is recorded.",
      action: "INSERT",
      table: "replanting_execution",
      status: "Required",
    },

    {
      id: 7,
      step: 7,
      title: "Save Progress",
      description: "Progress monitoring information is updated.",
      action: "UPDATE",
      table: "replanting_progress",
      status: "Running",
    },

    {
      id: 8,
      step: 8,
      title: "Approve Workflow",
      description: "Final approval and workflow completion.",
      action: "UPDATE",
      table: "replanting_approval",
      status: "Completed",
    },
  ],
  // ======================================================
  // WORKFLOW STEPS
  // Paste Below saveProcess
  // ======================================================
  // ======================================================
  // STEP CARDS
  // ======================================================
  // ======================================================
  // STEP CARDS
  // ======================================================
  steps: [
    {
      id: 1,
      stepNumber: 1,
      title: "Project Information",
      subTitle: "Master Entry",
      component: "ProjectInformation",
      formKey: "projectInformation",
      table: "replanting_master",
      icon: "FolderPlus",
      color: "green",
      buttonText: "Save & Next",
      notes: [
        "এখানে একবার Save হবে",
        "Project ID তৈরি হবে (Auto)",
        "এখানে সকল তথ্য যুক্ত হবে",
      ],
    },

    {
      id: 2,
      stepNumber: 2,
      title: "Gap Survey Entry",
      subTitle: "Gap Survey",
      component: "GapSurveyEntry",
      formKey: "gapSurvey",
      table: "replanting_gap_details",
      icon: "ClipboardCheck",
      color: "green",
      buttonText: "Save & Next",
      notes: [
        "প্রতিটি Gap আলাদাভাবে Save হবে",
        "প্রতিটি Field-এর একাধিক Gap থাকতে পারে",
        "প্রতিটি Gap একটি Record হবে",
      ],
    },

    {
      id: 3,
      stepNumber: 3,
      title: "Land Preparation",
      subTitle: "Land Preparation",
      component: "LandPreparation",
      formKey: "landPreparation",
      table: "replanting_land_preparation",
      icon: "Map",
      color: "green",
      buttonText: "Save & Next",
      notes: [
        "Activity অনুযায়ী কাজের অগ্রগতি",
        "Start Date, End Date, Status",
        "পরবর্তীতে Progress এ যাবে",
      ],
    },

    {
      id: 4,
      stepNumber: 4,
      title: "Material Planning",
      subTitle: "Material Plan",
      component: "MaterialPlanning",
      formKey: "materialPlanning",
      table: "replanting_material",
      icon: "Package",
      color: "green",
      buttonText: "Save & Next",
      notes: [
        "কোন উপকরণ কত লাগবে",
        "খরচ সংরক্ষণ হবে",
        "Store Module-এর সাথে যুক্ত",
      ],
    },

    {
      id: 5,
      stepNumber: 5,
      title: "Labour Allocation",
      subTitle: "Labour Allocation",
      component: "LabourAllocation",
      formKey: "labourAllocation",
      table: "replanting_labour",
      icon: "Users",
      color: "green",
      buttonText: "Save & Next",
      notes: ["কতজন শ্রমিক, মজুরি, মোট খরচ", "Payroll Module-এর সাথে যুক্ত"],
    },

    {
      id: 6,
      stepNumber: 6,
      title: "Planting Execution",
      subTitle: "Planting Entry",
      component: "PlantingExecution",
      formKey: "plantingExecution",
      table: "replanting_execution",
      icon: "Trees",
      color: "green",
      buttonText: "Save & Next",
      notes: ["কোথায় কত গাছ লাগানো হলো", "মোট সংখ্যা ও জাতভিত্তিক তথ্য"],
    },

    {
      id: 7,
      stepNumber: 7,
      title: "Progress Monitoring",
      subTitle: "Progress Monitoring",
      component: "ProgressMonitoring",
      formKey: "progressMonitoring",
      table: "replanting_progress",
      icon: "TrendingUp",
      color: "green",
      buttonText: "Save & Next",
      notes: ["নিয়মিত অগ্রগতির আপডেট", "Progress % স্বয়ংক্রিয় হিসাব হবে"],
    },

    {
      id: 8,
      stepNumber: 8,
      title: "Approval & Completion",
      subTitle: "Approval",
      component: "ApprovalCompletion",
      formKey: "approvalCompletion",
      table: "replanting_approval",
      icon: "BadgeCheck",
      color: "green",
      buttonText: "Finish & Save",
      notes: ["ধাপে ধাপে অনুমোদন", "Completion হলে প্রকল্প বন্ধ হবে"],
    },
  ],
  // ======================================================
  // STEP FORMS
  // Paste Below steps
  // ======================================================
  stepForms: {
    projectInformation: {
      title: "Project Information",

      fields: [
        {
          id: 1,
          name: "projectName",
          label: "Project Name",
          type: "text",
          placeholder: "Enter Project Name",
          required: true,
        },

        {
          id: 2,
          name: "estate",
          label: "Estate",
          type: "select",
          options: "estates",
          required: true,
        },

        {
          id: 3,
          name: "division",
          label: "Division",
          type: "select",
          options: "divisions",
          required: true,
        },

        {
          id: 4,
          name: "section",
          label: "Section",
          type: "select",
          options: "sections",
          required: true,
        },

        {
          id: 5,
          name: "startDate",
          label: "Start Date",
          type: "date",
          required: true,
        },

        {
          id: 6,
          name: "expectedEndDate",
          label: "Expected End Date",
          type: "date",
          required: true,
        },

        {
          id: 7,
          name: "remarks",
          label: "Remarks",
          type: "textarea",
          placeholder: "Write remarks...",
          required: false,
        },
      ],
    },

    gapSurvey: {
      title: "Gap Survey Entry",
      fields: [],
    },

    landPreparation: {
      title: "Land Preparation",
      fields: [],
    },

    materialPlanning: {
      title: "Material Planning",
      fields: [],
    },

    labourAllocation: {
      title: "Labour Allocation",
      fields: [],
    },

    plantingExecution: {
      title: "Planting Execution",
      fields: [],
    },

    progressMonitoring: {
      title: "Progress Monitoring",
      fields: [],
    },

    approvalCompletion: {
      title: "Approval & Completion",
      fields: [],
    },
  },
  // ======================================================
  // DROPDOWN OPTIONS
  // Paste Below stepForms
  // ======================================================
  dropdownOptions: {
    estates: [
      { label: "Select Estate", value: "" },
      { label: "Rupai Tea Estate", value: "rupai" },
      { label: "North Garden Estate", value: "north_garden" },
      { label: "South Valley Estate", value: "south_valley" },
    ],

    divisions: [
      { label: "Select Division", value: "" },
      { label: "Division A", value: "division_a" },
      { label: "Division B", value: "division_b" },
      { label: "Division C", value: "division_c" },
    ],

    sections: [
      { label: "Select Section", value: "" },
      { label: "Section 01", value: "section_01" },
      { label: "Section 02", value: "section_02" },
      { label: "Section 03", value: "section_03" },
    ],

    fields: [
      { label: "Select Field", value: "" },
      { label: "Field 01", value: "field_01" },
      { label: "Field 02", value: "field_02" },
      { label: "Field 03", value: "field_03" },
    ],

    varieties: [
      { label: "Select Variety", value: "" },
      { label: "TV-1", value: "tv_1" },
      { label: "TV-23", value: "tv_23" },
      { label: "BT-5", value: "bt_5" },
    ],

    supervisors: [
      { label: "Select Supervisor", value: "" },
      { label: "Md. Rahman", value: "rahman" },
      { label: "Md. Karim", value: "karim" },
      { label: "Md. Hasan", value: "hasan" },
    ],

    labourTypes: [
      { label: "Permanent", value: "permanent" },
      { label: "Temporary", value: "temporary" },
      { label: "Contract", value: "contract" },
    ],

    priorities: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],

    status: [
      { label: "Pending", value: "pending" },
      { label: "Running", value: "running" },
      { label: "Completed", value: "completed" },
      { label: "Approved", value: "approved" },
    ],

    yesNo: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  // ======================================================
  // DATABASE TABLES OVERVIEW
  // Paste Below dropdownOptions
  // ======================================================
  databaseTables: [
    {
      id: 1,
      tableName: "replanting_master",
      primaryKey: "replanting_id",
      relatedStep: "Project Information",
      description: "Stores master project information.",
      totalFields: 18,
      relationship: "One-to-Many",
      status: "Active",
    },

    {
      id: 2,
      tableName: "replanting_gap_details",
      primaryKey: "gap_id",
      relatedStep: "Gap Survey Entry",
      description: "Stores gap survey details.",
      totalFields: 22,
      relationship: "Many-to-One",
      status: "Active",
    },

    {
      id: 3,
      tableName: "replanting_land_preparation",
      primaryKey: "land_preparation_id",
      relatedStep: "Land Preparation",
      description: "Stores land preparation activities.",
      totalFields: 15,
      relationship: "Many-to-One",
      status: "Active",
    },

    {
      id: 4,
      tableName: "replanting_materials",
      primaryKey: "material_id",
      relatedStep: "Material Planning",
      description: "Stores materials and seedlings.",
      totalFields: 20,
      relationship: "Many-to-One",
      status: "Active",
    },

    {
      id: 5,
      tableName: "replanting_labour",
      primaryKey: "labour_id",
      relatedStep: "Labour Allocation",
      description: "Stores labour allocation.",
      totalFields: 14,
      relationship: "Many-to-One",
      status: "Active",
    },

    {
      id: 6,
      tableName: "replanting_execution",
      primaryKey: "execution_id",
      relatedStep: "Planting Execution",
      description: "Stores execution records.",
      totalFields: 19,
      relationship: "Many-to-One",
      status: "Active",
    },

    {
      id: 7,
      tableName: "replanting_progress",
      primaryKey: "progress_id",
      relatedStep: "Progress Monitoring",
      description: "Stores progress updates.",
      totalFields: 17,
      relationship: "Many-to-One",
      status: "Active",
    },

    {
      id: 8,
      tableName: "replanting_approval",
      primaryKey: "approval_id",
      relatedStep: "Approval & Completion",
      description: "Stores approval information.",
      totalFields: 12,
      relationship: "Many-to-One",
      status: "Active",
    },

    {
      id: 9,
      tableName: "replanting_documents",
      primaryKey: "document_id",
      relatedStep: "Documents",
      description: "Stores uploaded documents.",
      totalFields: 10,
      relationship: "Many-to-One",
      status: "Active",
    },

    {
      id: 10,
      tableName: "replanting_photos",
      primaryKey: "photo_id",
      relatedStep: "Photos",
      description: "Stores field photos.",
      totalFields: 9,
      relationship: "Many-to-One",
      status: "Active",
    },
  ],
  // ======================================================
  // USER ROLES
  // Paste Below databaseTables
  // ======================================================
  userRoles: [
    {
      id: 1,
      role: "Field Officer",
      designation: "Field Officer",
      approvalLevel: 1,
      icon: "User",
      color: "green",
      responsibilities: [
        "Create Replanting Project",
        "Gap Survey Entry",
        "Upload Field Photos",
        "Submit for Approval",
      ],
      permissions: {
        create: true,
        edit: true,
        delete: false,
        approve: false,
        export: false,
      },
    },

    {
      id: 2,
      role: "Assistant Manager",
      designation: "Assistant Manager",
      approvalLevel: 2,
      icon: "Briefcase",
      color: "emerald",
      responsibilities: [
        "Review Survey",
        "Verify Materials",
        "Recommend Approval",
      ],
      permissions: {
        create: false,
        edit: true,
        delete: false,
        approve: true,
        export: true,
      },
    },

    {
      id: 3,
      role: "Estate Manager",
      designation: "Estate Manager",
      approvalLevel: 3,
      icon: "ShieldCheck",
      color: "blue",
      responsibilities: ["Approve Project", "Approve Labour", "Approve Budget"],
      permissions: {
        create: false,
        edit: true,
        delete: false,
        approve: true,
        export: true,
      },
    },

    {
      id: 4,
      role: "GIS Officer",
      designation: "GIS Officer",
      approvalLevel: 4,
      icon: "MapPinned",
      color: "cyan",
      responsibilities: [
        "Update GIS",
        "Verify Location",
        "Maintain GIS Records",
      ],
      permissions: {
        create: false,
        edit: true,
        delete: false,
        approve: false,
        export: true,
      },
    },

    {
      id: 5,
      role: "General Manager",
      designation: "General Manager",
      approvalLevel: 5,
      icon: "Crown",
      color: "purple",
      responsibilities: [
        "Final Approval",
        "Release Budget",
        "Generate Reports",
      ],
      permissions: {
        create: false,
        edit: false,
        delete: false,
        approve: true,
        export: true,
      },
    },

    {
      id: 6,
      role: "System Administrator",
      designation: "Administrator",
      approvalLevel: 6,
      icon: "Settings",
      color: "gray",
      responsibilities: [
        "Manage Users",
        "Maintain Database",
        "System Configuration",
      ],
      permissions: {
        create: true,
        edit: true,
        delete: true,
        approve: true,
        export: true,
      },
    },
  ],
  // ======================================================
  // APPROVAL FLOW
  // Paste Below userRoles
  // ======================================================
  approvalFlow: [
    {
      id: 1,
      level: 1,
      role: "Field Officer",
      action: "Create & Submit Project",
      nextRole: "Assistant Manager",
      status: "Pending",
      color: "green",
      icon: "User",
      canReject: false,
      canApprove: false,
    },

    {
      id: 2,
      level: 2,
      role: "Assistant Manager",
      action: "Review & Recommend",
      nextRole: "Estate Manager",
      status: "Pending",
      color: "emerald",
      icon: "Briefcase",
      canReject: true,
      canApprove: true,
    },

    {
      id: 3,
      level: 3,
      role: "Estate Manager",
      action: "Verify & Approve",
      nextRole: "General Manager",
      status: "Pending",
      color: "blue",
      icon: "ShieldCheck",
      canReject: true,
      canApprove: true,
    },

    {
      id: 4,
      level: 4,
      role: "General Manager",
      action: "Final Approval",
      nextRole: "Completed",
      status: "Pending",
      color: "purple",
      icon: "Crown",
      canReject: true,
      canApprove: true,
    },

    {
      id: 5,
      level: 5,
      role: "System",
      action: "Workflow Completed",
      nextRole: null,
      status: "Completed",
      color: "gray",
      icon: "CheckCircle",
      canReject: false,
      canApprove: false,
    },
  ],
  // ======================================================
  // REPORTS
  // Paste Below approvalFlow
  // ======================================================
  reports: [
    {
      id: 1,
      reportCode: "RPT-001",
      reportName: "Replanting Summary Report",
      category: "Summary",
      description: "Overall replanting project summary.",
      export: ["PDF", "Excel", "Print"],
      icon: "FileText",
      color: "green",
      permission: "View",
    },

    {
      id: 2,
      reportCode: "RPT-002",
      reportName: "Gap Survey Report",
      category: "Survey",
      description: "Gap survey details by field.",
      export: ["PDF", "Excel"],
      icon: "ClipboardList",
      color: "emerald",
      permission: "View",
    },

    {
      id: 3,
      reportCode: "RPT-003",
      reportName: "Material Consumption Report",
      category: "Material",
      description: "Material usage and stock consumption.",
      export: ["PDF", "Excel"],
      icon: "Package",
      color: "amber",
      permission: "View",
    },

    {
      id: 4,
      reportCode: "RPT-004",
      reportName: "Labour Cost Report",
      category: "Labour",
      description: "Labour allocation and cost analysis.",
      export: ["PDF", "Excel"],
      icon: "Users",
      color: "cyan",
      permission: "View",
    },

    {
      id: 5,
      reportCode: "RPT-005",
      reportName: "Planting Progress Report",
      category: "Progress",
      description: "Current planting progress by division.",
      export: ["PDF", "Excel"],
      icon: "TrendingUp",
      color: "blue",
      permission: "View",
    },

    {
      id: 6,
      reportCode: "RPT-006",
      reportName: "GIS Mapping Report",
      category: "GIS",
      description: "GIS location and plantation mapping.",
      export: ["PDF"],
      icon: "MapPinned",
      color: "teal",
      permission: "View",
    },

    {
      id: 7,
      reportCode: "RPT-007",
      reportName: "Approval History Report",
      category: "Approval",
      description: "Complete approval workflow history.",
      export: ["PDF", "Print"],
      icon: "BadgeCheck",
      color: "purple",
      permission: "View",
    },

    {
      id: 8,
      reportCode: "RPT-008",
      reportName: "Final Completion Report",
      category: "Final",
      description: "Final project completion report.",
      export: ["PDF", "Excel", "Print"],
      icon: "Award",
      color: "rose",
      permission: "View",
    },
  ],
};
