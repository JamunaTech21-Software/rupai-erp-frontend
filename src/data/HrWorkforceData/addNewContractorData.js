export const contractorManagementData = {
  // =========================
  // Dropdown Options
  // =========================

  contractorTypeOptions: [
    { id: 1, value: "individual", label: "Individual" },
    { id: 2, value: "company", label: "Company" },
    { id: 3, value: "supplier", label: "Supplier" },
  ],

  tradeCategoryOptions: [
    { id: 1, value: "construction", label: "Construction" },
    { id: 2, value: "electrical", label: "Electrical" },
    { id: 3, value: "mechanical", label: "Mechanical" },
    { id: 4, value: "transport", label: "Transport" },
  ],

  legalStatusOptions: [
    { id: 1, value: "proprietorship", label: "Proprietorship" },
    { id: 2, value: "partnership", label: "Partnership" },
    { id: 3, value: "private-ltd", label: "Private Limited" },
  ],

  districtOptions: [
    { id: 1, value: "dhaka", label: "Dhaka" },
    { id: 2, value: "chattogram", label: "Chattogram" },
  ],

  bankOptions: [
    { id: 1, value: "dbbl", label: "DBBL" },
    { id: 2, value: "brac", label: "BRAC Bank" },
  ],

  relationOptions: [
    { id: 1, value: "father", label: "Father" },
    { id: 2, value: "mother", label: "Mother" },
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
    {
      name: "contractorName",
      label: "Contractor Name",
      type: "text",
      placeholder: "Enter Contractor / Company Name",
      required: true,
      colSpan: "md:col-span-8",
    },
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
      colSpan: "col-span-12",
    },
  ],

  // =========================
  // Contact & Address
  // =========================

  contactInformationFields: [
    {
      name: "mobileNo",
      label: "Mobile No.",
      type: "text",
      placeholder: "01XXXXXXXXX",
      required: true,
      colSpan: "md:col-span-4",
    },
    {
      name: "alternateMobile",
      label: "Alternate Mobile",
      type: "text",
      placeholder: "01XXXXXXXXX",
      colSpan: "md:col-span-4",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "example@email.com",
      colSpan: "md:col-span-4",
    },

    // Present Address
    {
      name: "presentAddress",
      label: "Address",
      type: "textarea",
      placeholder: "Enter Present Address",
      required: true,
      colSpan: "md:col-span-6",
    },
    {
      name: "presentDistrict",
      label: "District",
      type: "select",
      required: true,
      colSpan: "md:col-span-3",
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
      colSpan: "md:col-span-3",
      options: [
        { value: "savar", label: "Savar" },
        { value: "dhamrai", label: "Dhamrai" },
        { value: "kotwali", label: "Kotwali" },
        { value: "kotwali", label: "Kotwali" },
        { value: "kotwali", label: "Kotwali" },
      ],
    },
    {
      name: "presentPostalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "Enter Postal Code",
      colSpan: "md:col-span-4",
    },

    // Permanent Address
    {
      name: "permanentAddress",
      label: "Address",
      type: "textarea",
      placeholder: "Enter Permanent Address",
      colSpan: "md:col-span-6",
    },
    {
      name: "permanentDistrict",
      label: "District",
      type: "select",
      colSpan: "md:col-span-3",
      options: [
        { value: "dhaka", label: "Dhaka" },
        { value: "chattogram", label: "Chattogram" },
      ],
    },
    {
      name: "permanentUpazila",
      label: "Upazila",
      type: "select",
      colSpan: "md:col-span-3",
      options: [
        { value: "savar", label: "Savar" },
        { value: "dhamrai", label: "Dhamrai" },
        { value: "kotwali", label: "Kotwali" },
        { value: "kotwali", label: "Kotwali" },
        { value: "kotwali", label: "Kotwali" },
      ],
    },
    {
      name: "permanentPostalCode",
      label: "Postal Code",
      type: "text",
      placeholder: "Enter Postal Code",
      colSpan: "md:col-span-4",
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
      colSpan: "md:col-span-6",
    },
    {
      name: "designation",
      label: "Designation",
      type: "text",
      placeholder: "Enter Designation",
      colSpan: "md:col-span-6",
    },
    {
      name: "contactPersonMobile",
      label: "Mobile No.",
      type: "text",
      placeholder: "01XXXXXXXXX",
      required: true,
      colSpan: "md:col-span-6",
    },
    {
      name: "contactPersonEmail",
      label: "Email",
      type: "email",
      placeholder: "example@email.com",
      colSpan: "md:col-span-6",
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
