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
  // Contractor Form
  // =========================
  contractorForm: {
    basicInformation: {
      contractorId: "AUTO",
      contractorType: "",
      tradeCategory: "",
      contractorName: "",
      shortName: "",
      legalStatus: "",
      registrationType: "",
      contractorSince: "",
      description: "",
    },

    contactInformation: {
      mobile: "",
      alternateMobile: "",
      email: "",
      address: "",
      district: "",
      upazila: "",
      postalCode: "",
    },

    contractInformation: {
      contractRef: "",
      startDate: "",
      endDate: "",
      duration: "",
      paymentTerms: "",
      contractValue: "",
    },

    bankingInformation: {
      bankName: "",
      branchName: "",
      accountName: "",
      accountNumber: "",
    },

    emergencyContact: {
      name: "",
      relation: "",
      mobile: "",
      address: "",
    },
  },

  // =========================
  // Contractor Table Headers
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

  // =========================
  // Contractor List (Dummy Data)
  // =========================
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

  // =========================
  // Summary Data
  // =========================
  summary: {
    totalContractor: 25,
    activeContractor: 20,
    inactiveContractor: 5,
    totalContractValue: 12500000,
  },
};
