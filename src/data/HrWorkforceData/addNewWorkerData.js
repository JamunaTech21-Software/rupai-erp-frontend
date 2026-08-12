export const addNewWorkerData = {
  // =========================================================
  // PAGE INFORMATION
  // =========================================================

  pageInfo: {
    title: "Add New Worker",
    module: "HR & Workforce Management",
    section: "Worker Management",
  },

  // =========================================================
  // PAGE ACTIONS
  // =========================================================

  actions: {
    top: [
      {
        id: "backToList",
        label: "Back to List",
        type: "button",
        action: "back",
      },
      {
        id: "saveDraft",
        label: "Save as Draft",
        type: "button",
        action: "saveDraft",
      },
      {
        id: "saveSubmit",
        label: "Save & Submit",
        type: "submit",
        action: "saveSubmit",
      },
    ],

    bottom: [
      {
        id: "reset",
        label: "Reset",
        type: "button",
        action: "reset",
      },
      {
        id: "saveDraftBottom",
        label: "Save as Draft",
        type: "button",
        action: "saveDraft",
      },
      {
        id: "saveSubmitBottom",
        label: "Save & Submit",
        type: "submit",
        action: "saveSubmit",
      },
    ],
  },

  // =========================================================
  // SECTIONS
  // =========================================================

  sections: {
    // =======================================================
    // 1. BASIC INFORMATION
    // =======================================================

    basicInformation: {
      id: "basicInformation",
      sectionNo: 1,
      title: "Basic Information",

      fields: [
        {
          name: "workerId",
          label: "Worker ID",
          type: "text",
          placeholder: "Auto Generate",
          required: false,
          disabled: true,
        },
        {
          name: "workerType",
          label: "Worker Type",
          type: "select",
          placeholder: "Select Type",
          required: true,
          optionsKey: "workerTypes",
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          placeholder: "Select Category",
          required: true,
          optionsKey: "categories",
        },
        {
          name: "title",
          label: "Title",
          type: "select",
          placeholder: "Select Title",
          required: false,
          optionsKey: "titles",
        },
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "Enter First Name",
          required: true,
        },
        {
          name: "middleName",
          label: "Middle Name",
          type: "text",
          placeholder: "Enter Middle Name",
          required: false,
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Enter Last Name",
          required: true,
        },
        {
          name: "fathersName",
          label: "Father's Name",
          type: "text",
          placeholder: "Enter Father's Name",
          required: true,
        },
        {
          name: "mothersName",
          label: "Mother's Name",
          type: "text",
          placeholder: "Enter Mother's Name",
          required: true,
        },
        {
          name: "dateOfBirth",
          label: "Date of Birth",
          type: "date",
          placeholder: "dd-mm-yyyy",
          required: true,
        },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          placeholder: "Select Gender",
          required: true,
          optionsKey: "genders",
        },
        {
          name: "bloodGroup",
          label: "Blood Group",
          type: "select",
          placeholder: "Select Blood Group",
          required: false,
          optionsKey: "bloodGroups",
        },
        {
          name: "maritalStatus",
          label: "Marital Status",
          type: "select",
          placeholder: "Select Status",
          required: true,
          optionsKey: "maritalStatuses",
        },
        {
          name: "nationality",
          label: "Nationality",
          type: "select",
          placeholder: "Select Nationality",
          required: true,
          optionsKey: "nationalities",
        },
        {
          name: "religion",
          label: "Religion",
          type: "select",
          placeholder: "Select Religion",
          required: true,
          optionsKey: "religions",
        },
        {
          name: "tinNo",
          label: "TIN No.",
          type: "text",
          placeholder: "Enter TIN No.",
          required: false,
        },
      ],
    },

    // =======================================================
    // 2. EMPLOYMENT INFORMATION
    // =======================================================

    employmentInformation: {
      id: "employmentInformation",
      sectionNo: 2,
      title: "Employment Information",

      fields: [
        {
          name: "gardenUnit",
          label: "Garden / Unit",
          type: "select",
          placeholder: "Select Garden",
          required: true,
          optionsKey: "gardenUnits",
        },
        {
          name: "section",
          label: "Section",
          type: "select",
          placeholder: "Select Section",
          required: true,
          optionsKey: "sections",
        },
        {
          name: "jobTask",
          label: "Job / Task",
          type: "select",
          placeholder: "Select Job / Task",
          required: true,
          optionsKey: "jobTasks",
        },
        {
          name: "workerStatus",
          label: "Worker Status",
          type: "select",
          placeholder: "Select Status",
          required: true,
          optionsKey: "workerStatuses",
          defaultValue: "active",
        },
        {
          name: "joinDate",
          label: "Join Date",
          type: "date",
          required: true,
        },
        {
          name: "employmentType",
          label: "Employment Type",
          type: "select",
          placeholder: "Select Type",
          required: false,
          optionsKey: "employmentTypes",
        },
        {
          name: "jobNature",
          label: "Job Nature",
          type: "select",
          placeholder: "Select Nature",
          required: false,
          optionsKey: "jobNatures",
        },
        {
          name: "numberOfDependents",
          label: "No. of Dependents",
          type: "number",
          placeholder: "0",
          required: false,
          min: 0,
          defaultValue: 0,
        },
        {
          name: "reportingTo",
          label: "Reporting To",
          type: "select",
          placeholder: "Select Reporting To",
          required: false,
          optionsKey: "reportingManagers",
        },
        {
          name: "workingLocation",
          label: "Working Location",
          type: "select",
          placeholder: "Select Location",
          required: false,
          optionsKey: "workingLocations",
        },
        {
          name: "employmentStatus",
          label: "Employment Status",
          type: "select",
          placeholder: "Select Status",
          required: false,
          optionsKey: "employmentStatuses",
        },
        {
          name: "probationEndDate",
          label: "Probation End Date",
          type: "date",
          required: false,
        },
      ],
    },

    // =======================================================
    // 3. CONTACT & ADDRESS INFORMATION
    // =======================================================

    contactAddressInformation: {
      id: "contactAddressInformation",
      sectionNo: 3,
      title: "Contact & Address Information",

      fields: [
        {
          name: "mobileNo",
          label: "Mobile No.",
          type: "tel",
          placeholder: "Enter Mobile Number",
          required: true,
        },
        {
          name: "alternateMobile",
          label: "Alternate Mobile",
          type: "tel",
          placeholder: "Enter Alternate Mobile",
          required: false,
        },
        {
          name: "personalEmail",
          label: "Personal Email",
          type: "email",
          placeholder: "Enter Personal Email",
          required: false,
        },
        {
          name: "presentAddress",
          label: "Present Address",
          type: "textarea",
          placeholder: "Enter Present Address",
          required: true,
        },
        {
          name: "permanentAddress",
          label: "Permanent Address",
          type: "textarea",
          placeholder: "Enter Permanent Address",
          required: true,
        },
        {
          name: "sameAsPresentAddress",
          label: "Same as Present Address",
          type: "checkbox",
          required: false,
        },
        {
          name: "district",
          label: "District",
          type: "select",
          placeholder: "Select District",
          required: true,
          optionsKey: "districts",
        },
        {
          name: "upazila",
          label: "Upazila",
          type: "select",
          placeholder: "Select Upazila",
          required: true,
          optionsKey: "upazilas",
        },
        {
          name: "postalCode",
          label: "Postal Code",
          type: "text",
          placeholder: "Enter Postal Code",
          required: false,
        },
      ],
    },

    // =======================================================
    // PHOTO & BIOMETRIC
    // =======================================================

    photoBiometric: {
      id: "photoBiometric",
      sectionNo: null,
      title: "Photo & Biometric",

      photo: {
        name: "workerPhoto",
        label: "Worker Photo",
        type: "image",
        required: true,
      },

      biometric: [
        {
          name: "face",
          label: "Face (For Attendance)",
          type: "capture",
          required: false,
        },
        {
          name: "rightThumb",
          label: "Right Thumb",
          type: "capture",
          required: false,
        },
        {
          name: "leftThumb",
          label: "Left Thumb",
          type: "capture",
          required: false,
        },
      ],
    },

    // =======================================================
    // 4. DISTRIBUTED AGRI LAND
    // =======================================================

    distributedAgriLand: {
      id: "distributedAgriLand",
      sectionNo: 4,
      title: "Distributed Agri Land",

      fields: [
        {
          name: "landDistributed",
          label: "Land Distributed",
          type: "select",
          placeholder: "Select",
          required: false,
          optionsKey: "landDistributedOptions",
        },
        {
          name: "landType",
          label: "Land Type",
          type: "select",
          placeholder: "Select Land Type",
          required: false,
          optionsKey: "landTypes",
        },
        {
          name: "totalLand",
          label: "Total Land (Acre)",
          type: "number",
          placeholder: "Enter Total Land",
          required: false,
          min: 0,
          step: "0.01",
        },
      ],

      table: {
        title: "Land Details",

        headers: [
          {
            key: "sl",
            label: "SL",
          },
          {
            key: "plotBlockNo",
            label: "Plot / Block No.",
          },
          {
            key: "mouza",
            label: "Mouza",
          },
          {
            key: "area",
            label: "Area (Acre)",
          },
          {
            key: "distributedDate",
            label: "Distributed Date",
          },
          {
            key: "action",
            label: "Action",
          },
        ],

        rows: [
          {
            id: 1,
            sl: 1,
            plotBlockNo: "BLK-12 / P-45",
            mouza: "Fultali",
            area: 0.75,
            distributedDate: "12-03-2023",
          },
          {
            id: 2,
            sl: 2,
            plotBlockNo: "BLK-16 / P-22",
            mouza: "Fultali",
            area: 0.5,
            distributedDate: "14-07-2023",
          },
        ],
      },

      actions: {
        addLandLabel: "Add More Land",
        editLabel: "Edit",
        deleteLabel: "Delete",
      },
    },

    // =======================================================
    // 5. DEPENDENT / FAMILY MEMBER
    // =======================================================

    dependentFamilyMember: {
      id: "dependentFamilyMember",
      sectionNo: 5,
      title: "Dependent (Family Member)",

      table: {
        headers: [
          {
            key: "sl",
            label: "SL",
          },
          {
            key: "name",
            label: "Name",
          },
          {
            key: "relation",
            label: "Relation",
          },
          {
            key: "dateOfBirth",
            label: "Date of Birth",
          },
          {
            key: "occupation",
            label: "Occupation",
          },
          {
            key: "action",
            label: "Action",
          },
        ],

        rows: [
          {
            id: 1,
            sl: 1,
            name: "Shanti Rani Tanti",
            relation: "Wife",
            dateOfBirth: "10-03-1995",
            occupation: "House Wife",
          },
          {
            id: 2,
            sl: 2,
            name: "Rima Tanti",
            relation: "Daughter",
            dateOfBirth: "05-06-2018",
            occupation: "-",
          },
          {
            id: 3,
            sl: 3,
            name: "Bappa Tanti",
            relation: "Son",
            dateOfBirth: "11-11-2021",
            occupation: "-",
          },
        ],
      },

      actions: {
        addDependent: {
          label: "Add Dependent",
          type: "button",
          action: "add",
        },

        rowActions: [
          {
            id: "edit",
            label: "Edit",
            action: "edit",
          },
          {
            id: "delete",
            label: "Delete",
            action: "delete",
          },
        ],
      },
    },

    // =======================================================
    // 6. RESON CARD
    // =======================================================

    resonCard: {
      id: "resonCard",
      sectionNo: 6,
      title: "Reson Card",

      fields: [
        {
          name: "resonCardNo",
          label: "Reson Card No.",
          type: "text",
          placeholder: "Enter Reson Card No.",
          required: false,
        },
        {
          name: "issueDate",
          label: "Issue Date",
          type: "date",
          placeholder: "dd-mm-yyyy",
          required: false,
        },
        {
          name: "validTill",
          label: "Valid Till",
          type: "date",
          placeholder: "dd-mm-yyyy",
          required: false,
        },
        {
          name: "reasonDealerOffice",
          label: "Reason Dealer / Office",
          type: "text",
          placeholder: "Enter Dealer / Office",
          required: false,
        },
        {
          name: "resonCardFile",
          label: "Upload Reson Card",
          type: "file",
          accept: ".jpg,.jpeg,.png,.pdf",
          maxSizeMB: 2,
          required: false,
        },
      ],

      actions: {
        uploadLabel: "Upload Reson Card",
        removeLabel: "Remove",
      },
    },

    // =======================================================
    // 7. ADDITIONAL IMPORTANT INFORMATION
    // =======================================================

    additionalImportantInformation: {
      id: "additionalImportantInformation",
      sectionNo: 7,
      title: "Additional Important Information",

      fields: [
        {
          name: "educationLevel",
          label: "Education Level",
          type: "select",
          placeholder: "Select Education",
          required: false,
          optionsKey: "educationLevels",
        },
        {
          name: "skillTraining",
          label: "Skill / Training",
          type: "select",
          placeholder: "Select Skill",
          required: false,
          optionsKey: "skills",
        },
        {
          name: "languageKnown",
          label: "Language Known",
          type: "select",
          placeholder: "Select Language",
          required: false,
          optionsKey: "languages",
        },
        {
          name: "experienceYear",
          label: "Experience (Year)",
          type: "number",
          placeholder: "0",
          required: false,
          min: 0,
        },
        {
          name: "emergencyContactName",
          label: "Emergency Contact Name",
          type: "text",
          placeholder: "Enter Contact Name",
          required: false,
        },
        {
          name: "emergencyContactNo",
          label: "Emergency Contact No.",
          type: "tel",
          placeholder: "Enter Contact Number",
          required: false,
        },
        {
          name: "bankName",
          label: "Bank Name",
          type: "text",
          placeholder: "Enter Bank Name",
          required: false,
        },
        {
          name: "accountNo",
          label: "Account No.",
          type: "text",
          placeholder: "Enter Account Number",
          required: false,
        },
        {
          name: "mobileBanking",
          label: "Mobile Banking (Bkash/Nagad)",
          type: "text",
          placeholder: "Enter Mobile Number",
          required: false,
        },
      ],
    },

    // =======================================================
    // 8. DOCUMENTS INFORMATION
    // =======================================================

    documentsInformation: {
      id: "documentsInformation",
      sectionNo: 8,
      title: "Documents Information",

      uploadNote: "Upload Documents (JPG / PNG / PDF, Max 2MB each)",

      documents: [
        {
          id: "nidFront",
          name: "nidFront",
          label: "NID Card (Front)",
          type: "file",
          accept: ".jpg,.jpeg,.png,.pdf",
          maxSizeMB: 2,
          required: true,
        },
        {
          id: "nidBack",
          name: "nidBack",
          label: "NID Card (Back)",
          type: "file",
          accept: ".jpg,.jpeg,.png,.pdf",
          maxSizeMB: 2,
          required: true,
        },
        {
          id: "birthCertificate",
          name: "birthCertificate",
          label: "Birth Certificate",
          type: "file",
          accept: ".jpg,.jpeg,.png,.pdf",
          maxSizeMB: 2,
          required: false,
        },
        {
          id: "nomineeIdCard",
          name: "nomineeIdCard",
          label: "Nominee ID Card",
          type: "file",
          accept: ".jpg,.jpeg,.png,.pdf",
          maxSizeMB: 2,
          required: false,
        },
        {
          id: "trainingCertificate",
          name: "trainingCertificate",
          label: "Training Certificate",
          type: "file",
          accept: ".jpg,.jpeg,.png,.pdf",
          maxSizeMB: 2,
          required: false,
        },
        {
          id: "otherDocument",
          name: "otherDocument",
          label: "Other Document",
          type: "file",
          accept: ".jpg,.jpeg,.png,.pdf",
          maxSizeMB: 2,
          required: false,
        },
      ],
    },

    // =======================================================
    // 9. SYSTEM INFORMATION
    // =======================================================

    systemInformation: {
      id: "systemInformation",
      sectionNo: 9,
      title: "System Information",

      fields: [
        {
          name: "createdBy",
          label: "Created By",
          type: "text",
          placeholder: "",
          required: false,
          disabled: true,
        },
        {
          name: "createdDate",
          label: "Created Date",
          type: "datetime",
          placeholder: "",
          required: false,
          disabled: true,
        },
        {
          name: "updatedBy",
          label: "Updated By",
          type: "text",
          placeholder: "",
          required: false,
          disabled: true,
        },
        {
          name: "updatedDate",
          label: "Updated Date",
          type: "datetime",
          placeholder: "",
          required: false,
          disabled: true,
        },
      ],
    },
  },

  // =========================================================
  // DROPDOWN OPTIONS
  // =========================================================

  dropdownOptions: {
    // =========================================================
    // BASIC INFORMATION OPTIONS
    // =========================================================

    workerTypes: [
      {
        label: "Permanent",
        value: "permanent",
      },
      {
        label: "Temporary",
        value: "temporary",
      },
      {
        label: "Contractual",
        value: "contractual",
      },
      {
        label: "Seasonal",
        value: "seasonal",
      },
    ],

    categories: [
      {
        label: "General Worker",
        value: "general-worker",
      },
      {
        label: "Skilled Worker",
        value: "skilled-worker",
      },
      {
        label: "Semi Skilled Worker",
        value: "semi-skilled-worker",
      },
      {
        label: "Technical Worker",
        value: "technical-worker",
      },
    ],

    titles: [
      {
        label: "Mr.",
        value: "mr",
      },
      {
        label: "Mrs.",
        value: "mrs",
      },
      {
        label: "Ms.",
        value: "ms",
      },
    ],

    genders: [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
      {
        label: "Other",
        value: "other",
      },
    ],

    bloodGroups: [
      {
        label: "A+",
        value: "a-positive",
      },
      {
        label: "A-",
        value: "a-negative",
      },
      {
        label: "B+",
        value: "b-positive",
      },
      {
        label: "B-",
        value: "b-negative",
      },
      {
        label: "AB+",
        value: "ab-positive",
      },
      {
        label: "AB-",
        value: "ab-negative",
      },
      {
        label: "O+",
        value: "o-positive",
      },
      {
        label: "O-",
        value: "o-negative",
      },
    ],

    maritalStatuses: [
      {
        label: "Single",
        value: "single",
      },
      {
        label: "Married",
        value: "married",
      },
      {
        label: "Widowed",
        value: "widowed",
      },
      {
        label: "Divorced",
        value: "divorced",
      },
    ],

    nationalities: [
      {
        label: "Bangladeshi",
        value: "bangladeshi",
      },
    ],

    religions: [
      {
        label: "Islam",
        value: "islam",
      },
      {
        label: "Hinduism",
        value: "hinduism",
      },
      {
        label: "Christianity",
        value: "christianity",
      },
      {
        label: "Buddhism",
        value: "buddhism",
      },
      {
        label: "Other",
        value: "other",
      },
    ],

    // =========================================================
    // EMPLOYMENT OPTIONS
    // =========================================================

    gardenUnits: [],
    sections: [],
    jobTasks: [],
    workerStatuses: [],
    employmentTypes: [],
    jobNatures: [],
    reportingManagers: [],
    workingLocations: [],
    employmentStatuses: [],

    // =========================================================
    // CONTACT & ADDRESS OPTIONS
    // =========================================================

    districts: [],
    upazilas: [],

    // =========================================================
    // DISTRIBUTED AGRI LAND OPTIONS
    // =========================================================

    landDistributedOptions: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],

    landTypes: [
      {
        label: "Agricultural",
        value: "agricultural",
      },
      {
        label: "Tea Garden",
        value: "tea-garden",
      },
      {
        label: "Cultivation",
        value: "cultivation",
      },
      {
        label: "Residential",
        value: "residential",
      },
    ],

    // =========================================================
    // ADDITIONAL INFORMATION OPTIONS
    // =========================================================

    educationLevels: [],
    skills: [],
    languages: [],
  },

  // =========================================================
  // INITIAL FORM DATA
  // =========================================================

  initialData: {
    workerId: "",
    workerType: "",
    category: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    fathersName: "",
    mothersName: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    nationality: "bangladeshi",
    religion: "",
    tinNo: "",

    gardenUnit: "",
    section: "",
    jobTask: "",
    workerStatus: "",
    joinDate: "",
    employmentType: "",
    jobNature: "",
    numberOfDependents: 0,
    reportingTo: "",
    workingLocation: "",
    employmentStatus: "",
    probationEndDate: "",

    mobileNo: "",
    alternateMobile: "",
    personalEmail: "",
    presentAddress: "",
    permanentAddress: "",
    sameAsPresentAddress: false,
    district: "",
    upazila: "",
    postalCode: "",

    workerPhoto: null,
    face: null,
    rightThumb: null,
    leftThumb: null,

    landDistributed: "no",
    landType: "",
    totalLand: 0,

    landDetails: [],
    dependents: [],

    resonCardNo: "",
    issueDate: "",
    validTill: "",
    reasonDealerOffice: "",
    resonCardFile: null,

    educationLevel: "",
    skillTraining: "",
    languageKnown: "",
    experienceYear: 0,
    emergencyContactName: "",
    emergencyContactNo: "",
    bankName: "",
    accountNo: "",
    mobileBanking: "",

    documents: {
      nidFront: null,
      nidBack: null,
      birthCertificate: null,
      nomineeIdCard: null,
      trainingCertificate: null,
      otherDocument: null,
    },

    systemInformation: {
      createdBy: "",
      createdDate: "",
      updatedBy: "",
      updatedDate: "",
    },
  },
};
