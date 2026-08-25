export const contractorManagementData = {
  // =========================
  // Contract Information Options
  // =========================

  contractDurationOptions: [
    { id: 1, value: "3-months", label: "3 Months" },
    { id: 2, value: "6-months", label: "6 Months" },
    { id: 3, value: "1-year", label: "1 Year" },
    { id: 4, value: "2-years", label: "2 Years" },
  ],
  districtOptions: [
    { id: 1, value: "dhaka", label: "Dhaka" },
    { id: 2, value: "chattogram", label: "Chattogram" },
  ],
  relationOptions: [
  {
    id: 1,
    value: "father",
    label: "Father",
  },
  {
    id: 2,
    value: "mother",
    label: "Mother",
  },
  {
    id: 3,
    value: "spouse",
    label: "Spouse",
  },
  {
    id: 4,
    value: "brother",
    label: "Brother",
  },
  {
    id: 5,
    value: "sister",
    label: "Sister",
  },
  {
    id: 6,
    value: "son",
    label: "Son",
  },
  {
    id: 7,
    value: "daughter",
    label: "Daughter",
  },
  {
    id: 8,
    value: "other",
    label: "Other",
  },
],
  paymentTermsOptions: [
    { id: 1, value: "advance", label: "Advance Payment" },
    { id: 2, value: "monthly", label: "Monthly" },
    { id: 3, value: "quarterly", label: "Quarterly" },
    { id: 4, value: "milestone", label: "Milestone Based" },
  ],

  workLocationOptions: [
    { id: 1, value: "estate", label: "Estate" },
    { id: 2, value: "factory", label: "Factory" },
    { id: 3, value: "office", label: "Office" },
    { id: 4, value: "field", label: "Field / Block" },
  ],

  reportingToOptions: [
    { id: 1, value: "estate-manager", label: "Estate Manager" },
    { id: 2, value: "hr-manager", label: "HR Manager" },
    { id: 3, value: "admin-manager", label: "Admin Manager" },
    { id: 4, value: "project-manager", label: "Project Manager" },
  ],

  contractStatusOptions: [
    { id: 1, value: "active", label: "Active" },
    { id: 2, value: "pending", label: "Pending" },
    { id: 3, value: "completed", label: "Completed" },
    { id: 4, value: "terminated", label: "Terminated" },
  ],
  // =========================
  // Additional Information Options
  // =========================

  safetyComplianceOptions: [
    {
      id: 1,
      value: "compliant",
      label: "Compliant",
    },
    {
      id: 2,
      value: "partially-compliant",
      label: "Partially Compliant",
    },
    {
      id: 3,
      value: "non-compliant",
      label: "Non-Compliant",
    },
  ],

  qualityRatingOptions: [
    {
      id: 1,
      value: "excellent",
      label: "Excellent",
    },
    {
      id: 2,
      value: "good",
      label: "Good",
    },
    {
      id: 3,
      value: "average",
      label: "Average",
    },
    {
      id: 4,
      value: "poor",
      label: "Poor",
    },
  ],
  // =========================
  // Basic Information
  // =========================

  basicInformationFields: [
    {
      name: "contractorId",
      label: "Contractor ID",
      type: "text",
      disabled: true,
      defaultValue: "Auto Generate",
      required: true,
    },
    {
      name: "contractorType",
      label: "Contractor Type",
      type: "select",
      required: true,
      options: [
        { value: "individual", label: "Individual" },
        { value: "company", label: "Company" },
        { value: "supplier", label: "Supplier" },
      ],
    },
    {
      name: "tradeCategory",
      label: "Trade / Work Category",
      type: "select",
      required: true,
      options: [
        { value: "construction", label: "Construction" },
        { value: "electrical", label: "Electrical" },
        { value: "mechanical", label: "Mechanical" },
        { value: "transport", label: "Transport" },
      ],
    },

    // Special layout: 8 columns
    {
      name: "contractorName",
      label: "Contractor Name",
      type: "text",
      placeholder: "Enter Contractor / Company Name",
      required: true,
      colSpan: "md:col-span-8",
    },

    // Special layout: 4 columns
    {
      name: "shortName",
      label: "Short Name",
      type: "text",
      placeholder: "Enter Short Name",
      colSpan: "md:col-span-4",
    },

    {
      name: "legalStatus",
      label: "Legal Status",
      type: "select",
      options: [
        { value: "proprietorship", label: "Proprietorship" },
        { value: "partnership", label: "Partnership" },
        { value: "private-ltd", label: "Private Limited" },
      ],
    },
    {
      name: "registrationType",
      label: "Registration Type",
      type: "text",
    },
    {
      name: "contractorSince",
      label: "Contractor Since",
      type: "date",
    },
    {
      name: "description",
      label: "Description / Nature of Work",
      type: "textarea",
    },
  ],

  // =========================
  // Contact & Address
  // =========================

  contactInformationFields: [
    // =========================
    // Contact Information
    // =========================
    {
      name: "mobileNo",
      label: "Mobile No.",
      type: "text",
      placeholder: "01XXXXXXXXX",
      required: true,
    },
    {
      name: "alternateMobile",
      label: "Alternate Mobile",
      type: "text",
      placeholder: "01XXXXXXXXX",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@email.com",
    },

    // =========================
    // Present Address
    // =========================
    {
      name: "presentAddress",
      label: "Address",
      type: "textarea",
      placeholder: "Enter Present Address",
      required: true,
    },
    {
      name: "presentDistrict",
      label: "District",
      type: "select",
      required: true,
      options: [
        { value: "dhaka", label: "Dhaka" },
        { value: "chattogram", label: "Chattogram" },
      ],
    },
    {
      name: "presentUpazila",
      label: "Upazila",
      type: "select",
      required: true,
      options: [
        { value: "savar", label: "Savar" },
        { value: "dhamrai", label: "Dhamrai" },
        { value: "kotwali", label: "Kotwali" },
      ],
    },
    {
      name: "presentPostalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "Enter Postal Code",
    },

    // =========================
    // Permanent Address
    // =========================
    {
      name: "permanentAddress",
      label: "Address",
      type: "textarea",
      placeholder: "Enter Permanent Address",
    },
    {
      name: "permanentDistrict",
      label: "District",
      type: "select",
      options: [
        { value: "dhaka", label: "Dhaka" },
        { value: "chattogram", label: "Chattogram" },
      ],
    },
    {
      name: "permanentUpazila",
      label: "Upazila",
      type: "select",
      options: [
        { value: "savar", label: "Savar" },
        { value: "dhamrai", label: "Dhamrai" },
        { value: "kotwali", label: "Kotwali" },
      ],
    },
    {
      name: "permanentPostalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "Enter Postal Code",
    },
  ],
  // =========================
  // Contractor Image & Logo
  // =========================

  contractorImageFields: [
    {
      name: "contractorPhoto",
      label: "Contractor Photo",
      type: "file",
      accept: "image/png,image/jpeg",
      buttonText: "Upload Photo",
      note: "JPG, PNG (Max 2MB)",
      required: false,
    },
    {
      name: "companyLogo",
      label: "Company Logo",
      type: "file",
      accept: "image/png,image/jpeg",
      buttonText: "Upload Logo",
      note: "JPG, PNG (Max 2MB)",
      required: false,
    },
  ],

  // =========================
  // Contact Person / Proprietor Information
  // =========================

  contactPersonInformationFields: [
    {
      name: "contactPersonName",
      label: "Contact Person Name",
      type: "text",
      placeholder: "Enter Name",
      required: true,
    },
    {
      name: "designation",
      label: "Designation",
      type: "text",
      placeholder: "Enter Designation",
    },
    {
      name: "contactPersonMobile",
      label: "Mobile No.",
      type: "text",
      placeholder: "01XXXXXXXXX",
      required: true,
    },
    {
      name: "contactPersonEmail",
      label: "Email",
      type: "email",
      placeholder: "example@email.com",
    },
  ],

  // =========================
  // Business / Registration Information
  // =========================

  businessRegistrationFields: [
    {
      name: "nationalIdNo",
      label: "National ID No.",
      type: "text",
      placeholder: "Enter National ID",
    },
    {
      name: "tradeLicenseNo",
      label: "Trade License No.",
      type: "text",
      placeholder: "Enter Trade License No.",
      required: true,
    },
    {
      name: "tradeLicenseExpiry",
      label: "Trade License Expiry",
      type: "date",
    },
    {
      name: "binNo",
      label: "BIN No.",
      type: "text",
      placeholder: "Enter BIN No.",
    },
    {
      name: "tinNo",
      label: "TIN No.",
      type: "text",
      placeholder: "Enter TIN No.",
    },
    {
      name: "vatRegistrationNo",
      label: "VAT Registration No.",
      type: "text",
      placeholder: "Enter VAT Reg. No.",
    },
    {
      name: "companyRegistrationNo",
      label: "Company Registration No.",
      type: "text",
      placeholder: "Enter Reg. No.",
    },
    {
      name: "registrationDate",
      label: "Registration Date",
      type: "date",
    },
    {
      name: "renewalDate",
      label: "Renewal Date",
      type: "date",
    },
  ],

  // =========================
  // Contract Information
  // =========================

  contractInformationFields: [
    {
      name: "contractReferenceNo",
      label: "Contract Reference No.",
      type: "text",
      placeholder: "Enter Contract Ref. No.",
      required: true,
    },
    {
      name: "contractStartDate",
      label: "Contract Start Date",
      type: "date",
      required: true,
    },
    {
      name: "contractEndDate",
      label: "Contract End Date",
      type: "date",
      required: true,
    },
    {
      name: "contractDuration",
      label: "Contract Duration",
      type: "select",
      optionsKey: "contractDurationOptions",
      required: true,
    },
    {
      name: "paymentTerms",
      label: "Payment Terms",
      type: "select",
      optionsKey: "paymentTermsOptions",
      required: true,
    },
    {
      name: "contractValue",
      label: "Contract Value (৳)",
      type: "number",
      placeholder: "Enter Amount",
    },
    {
      name: "workLocation",
      label: "Work Location / Area",
      type: "select",
      optionsKey: "workLocationOptions",
      required: true,
    },
    {
      name: "reportingTo",
      label: "Reporting To",
      type: "select",
      optionsKey: "reportingToOptions",
      required: true,
    },
    {
      name: "contractStatus",
      label: "Contract Status",
      type: "select",
      optionsKey: "contractStatusOptions",
      defaultValue: "active",
      required: true,
    },
  ],
  // =========================
  // Banking Information Options
  // =========================

  bankOptions: [
    {
      id: 1,
      value: "dbbl",
      label: "Dutch-Bangla Bank",
    },
    {
      id: 2,
      value: "brac",
      label: "BRAC Bank",
    },
    {
      id: 3,
      value: "city",
      label: "City Bank",
    },
    {
      id: 4,
      value: "prime",
      label: "Prime Bank",
    },
  ],
  // =========================
  // Banking Information
  // =========================

  bankingInformationFields: [
    {
      name: "bankName",
      label: "Bank Name",
      type: "select",
      optionsKey: "bankOptions",
      required: true,
    },
    {
      name: "branchName",
      label: "Branch Name",
      type: "text",
      placeholder: "Enter Branch Name",
      required: true,
    },
    {
      name: "accountName",
      label: "Account Name",
      type: "text",
      placeholder: "Enter Account Name",
      required: true,
    },
    {
      name: "accountNo",
      label: "Account No.",
      type: "text",
      placeholder: "Enter Account No.",
      required: true,
    },
    {
      name: "routingNo",
      label: "Routing No.",
      type: "text",
      placeholder: "Enter Routing No.",
    },
    {
      name: "mobileBanking",
      label: "Mobile Banking (Bkash / Nagad)",
      type: "text",
      placeholder: "01XXXXXXXXX",
    },
  ],
  // =========================
  // Documents & Files
  // =========================

  documentFields: [
    {
      name: "tradeLicense",
      label: "Trade License",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png",
      maxSize: 2,
    },
    {
      name: "tinCertificate",
      label: "TIN Certificate",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png",
      maxSize: 2,
    },
    {
      name: "vatCertificate",
      label: "VAT Certificate",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png",
      maxSize: 2,
    },
    {
      name: "bankDocument",
      label: "Bank Document",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png",
      maxSize: 2,
    },
    {
      name: "contractAgreement",
      label: "Contract Agreement",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png",
      maxSize: 2,
    },
    {
      name: "insurance",
      label: "Insurance",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png",
      maxSize: 2,
    },
    {
      name: "workPermit",
      label: "Work Permit",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png",
      maxSize: 2,
    },
    {
      name: "otherDocument1",
      label: "Other Document 1",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png",
      maxSize: 2,
    },
    {
      name: "otherDocument2",
      label: "Other Document 2",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png",
      maxSize: 2,
    },
  ],
  // =========================
  // Additional Important Information
  // =========================

  additionalInformationFields: [
    {
      name: "numberOfWorkers",
      label: "No. of Workers",
      type: "number",
      placeholder: "Enter Number",
    },
    {
      name: "equipmentToolsOwned",
      label: "Equipment / Tools Owned",
      type: "textarea",
      placeholder: "Enter details of equipment / tools",
    },
    {
      name: "yearsOfExperience",
      label: "Years of Experience",
      type: "number",
      placeholder: "Enter Years",
    },
    {
      name: "safetyCompliance",
      label: "Safety Compliance",
      type: "select",
      optionsKey: "safetyComplianceOptions",
    },
    {
      name: "qualityRating",
      label: "Quality Rating (If Any)",
      type: "select",
      optionsKey: "qualityRatingOptions",
    },
    {
      name: "remarks",
      label: "Remarks",
      type: "textarea",
      placeholder: "Enter any remarks",
    },
  ],

  // =========================
  // Emergency Contact
  // =========================

  emergencyContactFields: [
    {
      name: "emergencyContactName",
      label: "Emergency Contact Name",
      type: "text",
      placeholder: "Enter Name",
      required: true,
    },
    {
      name: "emergencyRelation",
      label: "Relation",
      type: "select",
      required: true,
      optionsKey: "relationOptions",
    },
    {
      name: "emergencyMobile",
      label: "Mobile No.",
      type: "text",
      placeholder: "01XXXXXXXXX",
      required: true,
    },
    {
      name: "emergencyAlternateMobile",
      label: "Alternate Mobile",
      type: "text",
      placeholder: "01XXXXXXXXX",
    },
    {
      name: "emergencyAddress",
      label: "Address",
      type: "textarea",
      placeholder: "Enter Address",
    },
  ],
  // =========================
  // Contractor Table
  // =========================

  contractorTableHeaders: [
    "SL",
    "Contractor Name",
    "Type",
    "Mobile",
    "Trade Category",
    "Status",
    "Action",
  ],

  contractorList: [
    {
      id: 1,
      name: "ABC Construction Ltd",
      type: "Company",
      mobile: "017XXXXXXXX",
      trade: "Construction",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahim Electric",
      type: "Individual",
      mobile: "018XXXXXXXX",
      trade: "Electrical",
      status: "Active",
    },
    {
      id: 3,
      name: "Karim Transport",
      type: "Supplier",
      mobile: "019XXXXXXXX",
      trade: "Transport",
      status: "Inactive",
    },
  ],

  summary: {
    totalContractor: 25,
    activeContractor: 20,
    inactiveContractor: 5,
    totalContractValue: 12500000,
  },
};
