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
  // 🔥 MAP READY FIELDS
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
