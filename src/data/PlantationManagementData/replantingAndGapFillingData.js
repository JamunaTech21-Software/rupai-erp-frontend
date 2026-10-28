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
    // ======================================================
    // STEP-1 : PROJECT INFORMATION
    // ======================================================
    projectInformation: {
      title: "Project Information",

      preview: {
        projectName: "Replanting Project 2026",
        estate: "Jamuna Tea Estate",
        division: "Rangpur Division",
        section: "Section-A",
        fieldBlock: "BLK-08",
        replantingType: "Replanting",
        season: "Monsoon (Jun-Jul)",
        surveyDate: "10/05/2026",
        targetDate: "01/06/2026",
        supervisor: "Md. Faruk Hossain",
        remarks: "Old bushes are low yielding.",
      },

      fields: [
        {
          id: 1,
          label: "Estate",
          value: "Jamuna Tea Estate",
          type: "text",
        },
        {
          id: 2,
          label: "Division",
          value: "Rangpur Division",
          type: "text",
        },
        {
          id: 3,
          label: "Section",
          value: "Section-A",
          type: "text",
        },
        {
          id: 4,
          label: "Field / Block",
          value: "BLK-08",
          type: "text",
        },
        {
          id: 5,
          label: "Replanting Type",
          value: "Replanting",
          type: "select",
        },
        {
          id: 6,
          label: "Season",
          value: "Monsoon (Jun - Jul)",
          type: "select",
        },
        {
          id: 7,
          label: "Survey Date",
          value: "10/05/2026",
          type: "date",
        },
        {
          id: 8,
          label: "Target Date",
          value: "01/06/2026",
          type: "date",
        },
        {
          id: 9,
          label: "Supervisor",
          value: "Md. Faruk Hossain",
          type: "text",
        },
        {
          id: 10,
          label: "Remarks",
          value: "Old bushes are low yielding.",
          type: "textarea",
        },
      ],
    },

    // ======================================================
    // STEP-2 : GAP SURVEY ENTRY
    // ======================================================
    gapSurvey: {
      title: "Gap Survey Entry",

      fields: [
        {
          id: 1,
          label: "Field / Block",
          value: "BLK-08",
          type: "text",
        },
        {
          id: 2,
          label: "Survey Date",
          value: "10/05/2026",
          type: "date",
        },
        {
          id: 3,
          label: "Survey By",
          value: "Field Officer",
          type: "text",
        },
      ],

      columns: [
        "Gap ID",
        "Gap Size (Acre)",
        "No. of Plants",
        "Gap Type",
        "Action",
      ],

    },

    // ======================================================
    // STEP-3 : LAND PREPARATION
    // ======================================================
    landPreparation: {
      title: "Land Preparation",

      fields: [
        {
          id: 1,
          label: "Field / Block",
          value: "BLK-08",
          type: "text",
        },
      ],

      columns: ["Activity", "Start Date", "End Date", "Status"],

    },

    // ======================================================
    // STEP-4 : MATERIAL PLANNING
    // ======================================================
    materialPlanning: {
      title: "Material Planning",

      fields: [
        {
          id: 1,
          label: "Field / Block",
          value: "BLK-08",
          type: "text",
        },
        {
          id: 2,
          label: "Plant Variety",
          value: "TV-23",
          type: "select",
        },
        {
          id: 3,
          label: "Planning Date",
          value: "28/05/2026",
          type: "date",
        },
        {
          id: 4,
          label: "Store",
          value: "Central Store",
          type: "select",
        },
        {
          id: 5,
          label: "Prepared By",
          value: "Store Officer",
          type: "text",
        },
        {
          id: 6,
          label: "Remarks",
          value: "Materials allocated as per plantation requirement.",
          type: "textarea",
        },
      ],

      columns: ["Material", "Unit", "Required Qty", "Unit Cost", "Total Cost"],


      summary: {
        label: "Total Estimated Cost",
        value: "69,945",
      },
    },
    // ======================================================
    // STEP-5 : LABOUR ALLOCATION
    // ======================================================
    labourAllocation: {
      title: "Labour Allocation",

      fields: [
        {
          id: 1,
          label: "Labour Source",
          value: "Local",
          type: "select",
        },
        {
          id: 2,
          label: "Wage Type",
          value: "Daily Wage",
          type: "select",
        },
      ],

      columns: ["Labour Type", "Male", "Female", "Rate (BDT)", "Amount"],


      summary: {
        label: "Total Labour",
        male: 100,
        female: 0,
        rate: "",
        value: "35,400",
      },
    },

    // ======================================================
    // STEP-6 : PLANTING EXECUTION
    // ======================================================
    plantingExecution: {
      title: "Planting Entry",

      fields: [
        {
          id: 1,
          label: "Planting Date",
          value: "09/06/2026",
          type: "date",
        },
        {
          id: 2,
          label: "Clone / Variety",
          value: "Central Nursery",
          type: "select",
        },
      ],

      columns: [
        "Row No.",
        "From Plant No.",
        "To Plant No.",
        "No. of Plants",
        "Planted By",
      ],


      summary: {
        label: "Total Plants Planted",
        value: 1000,
      },
    },

    // ======================================================
    // STEP-7 : PROGRESS MONITORING
    // ======================================================
    progressMonitoring: {
      title: "Progress Monitoring",

      fields: [
        {
          id: 1,
          label: "Field / Block",
          value: "BLK-08",
          type: "text",
        },
        {
          id: 2,
          label: "Till Date",
          value: "01/06/2026",
          type: "date",
        },
      ],

      summaryCards: [
        {
          id: 1,
          title: "Total Area (Acre)",
          value: "5.25",
        },
        {
          id: 2,
          title: "Total Plants",
          value: "5,250",
        },
        {
          id: 3,
          title: "Planted Plants",
          value: "3,150",
        },
        {
          id: 4,
          title: "Progress (%)",
          value: "40%",
        },
      ],

      columns: [
        "Date",
        "Area Completed",
        "Plants Planted",
        "Survival %",
        "Remarks",
      ],

    },

    // ======================================================
    // STEP-8 : APPROVAL & COMPLETION
    // ======================================================
    approvalCompletion: {
      title: "Approval",

      columns: ["Level", "Name", "Designation", "Status", "Date", "Signature"],


      completion: {
        title: "Completion",

        fields: [
          {
            id: 1,
            label: "Completion Date",
            value: "20/07/2026",
            type: "date",
          },
          {
            id: 2,
            label: "Survival % (90 Days)",
            value: "92%",
            type: "text",
          },
          {
            id: 3,
            label: "Remarks",
            value: "Replanting completed successfully.",
            type: "textarea",
          },
        ],

        button: {
          text: "Finish & Save",
        },
      },
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
  // ======================================================

  databaseTables: [
    {
      id: 1,
      title: "1. replanting_master",
      tableName: "replanting_master",
      primaryKey: "replant_id (PK)",
      foreignKey: null,

      fields: [
        "estate_id",
        "division_id",
        "section_id",
        "field_id",
        "replant_type",
        "season",
        "survey_date",
        "target_date",
        "supervisor_id",
        "status",
      ],
    },

    {
      id: 2,
      title: "2. replanting_gap_details",
      tableName: "replanting_gap_details",
      primaryKey: "gap_id (PK)",
      foreignKey: "replant_id (FK)",

      fields: ["gap_size", "gap_type", "no_of_plants", "location", "status"],
    },

    {
      id: 3,
      title: "3. replanting_preparation",
      tableName: "replanting_land_preparation",
      primaryKey: "land_preparation_id (PK)",
      foreignKey: "replant_id (FK)",

      fields: ["activity", "start_date", "end_date", "status"],
    },

    {
      id: 4,
      title: "4. replanting_material",
      tableName: "replanting_material",
      primaryKey: "material_id (PK)",
      foreignKey: "replant_id (FK)",

      fields: [
        "material_name",
        "unit",
        "required_qty",
        "unit_cost",
        "total_cost",
      ],
    },

    {
      id: 5,
      title: "5. replanting_labour",
      tableName: "replanting_labour",
      primaryKey: "labour_id (PK)",
      foreignKey: "replant_id (FK)",

      fields: [
        "labour_type",
        "male_qty",
        "female_qty",
        "rate",
        "amount",
        "labour_source",
      ],
    },

    {
      id: 6,
      title: "6. replanting_schedule",
      tableName: "replanting_schedule",
      primaryKey: "schedule_id (PK)",
      foreignKey: "replant_id (FK)",

      fields: ["activity_name", "start_date", "end_date", "status"],
    },

    {
      id: 7,
      title: "7. replanting_photo",
      tableName: "replanting_photo",
      primaryKey: "photo_id (PK)",
      foreignKey: "replant_id (FK)",

      fields: ["photo_type", "photo_path", "caption", "upload_date"],
    },

    {
      id: 8,
      title: "8. replanting_document",
      tableName: "replanting_document",
      primaryKey: "doc_id (PK)",
      foreignKey: "replant_id (FK)",

      fields: ["doc_type", "file_name", "file_path", "upload_date"],
    },

    {
      id: 9,
      title: "9. replanting_progress",
      tableName: "replanting_progress",
      primaryKey: "progress_id (PK)",
      foreignKey: "replant_id (FK)",

      fields: [
        "progress_date",
        "area_completed",
        "plants_planted",
        "survival_percent",
        "remarks",
      ],
    },

    {
      id: 10,
      title: "10. replanting_approval",
      tableName: "replanting_approval",
      primaryKey: "approval_id (PK)",
      foreignKey: "replant_id (FK)",

      fields: [
        "level",
        "approved_by",
        "approved_date",
        "status",
        "signature_path",
        "remarks",
      ],
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
      role: "Field Officer",
      icon: "User",
      color: "green",

      tasks: ["Gap Survey", "Data Entry", "Update Progress"],
    },

    {
      id: 2,
      role: "Estate Manager",
      icon: "UserCheck",
      color: "blue",

      tasks: ["Review", "Approve", "Monitor"],
    },

    {
      id: 3,
      role: "GM (Estate)",
      icon: "ShieldCheck",
      color: "purple",

      tasks: ["Review", "Approve"],
    },

    {
      id: 4,
      role: "Head Office",
      icon: "Building2",
      color: "orange",

      tasks: ["Final Approval", "Report", "Analytics"],
    },
  ],
  // ======================================================
  // REPORTS
  // Paste Below approvalFlow
  // ======================================================
  // =========================================
  // Final Output / Reports
  // =========================================
  reports: [
    {
      id: 1,
      title: "Replanting Progress Report",
      icon: "Check",
    },
    {
      id: 2,
      title: "Gap Wise Status Report",
      icon: "Check",
    },
    {
      id: 3,
      title: "Material Consumption Report",
      icon: "Check",
    },
    {
      id: 4,
      title: "Labour Cost Report",
      icon: "Check",
    },
    {
      id: 5,
      title: "Survival Rate Report",
      icon: "Check",
    },
    {
      id: 6,
      title: "Approval Report",
      icon: "Check",
    },
    {
      id: 7,
      title: "Cost Summary Report",
      icon: "Check",
    },
  ],
};
