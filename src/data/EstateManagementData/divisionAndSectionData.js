export const divisionSectionData = {
  // =========================
  // Division Status
  // =========================
  divisionStatusOptions: [
    {
      id: 1,
      value: "Active",
      label: "Active",
    },
    {
      id: 2,
      value: "Inactive",
      label: "Inactive",
    },
  ],

  // =========================
  // Section Status
  // =========================
  sectionStatusOptions: [
    {
      id: 1,
      value: "Active",
      label: "Active",
    },
    {
      id: 2,
      value: "Inactive",
      label: "Inactive",
    },
  ],

  // =========================
  // Parent Section
  // =========================
  parentSectionOptions: [
    {
      id: 1,
      value: "",
      label: "Select (If any)",
    },
  ],

  // =========================
  // Manager Dropdown
  // =========================
  managerOptions: [
    {
      id: 1,
      value: "Md. Faruk Hossain",
      label: "Md. Faruk Hossain",
    },
    {
      id: 2,
      value: "Md. Jalal Uddin",
      label: "Md. Jalal Uddin",
    },
    {
      id: 3,
      value: "Md. Kamrul Hasan",
      label: "Md. Kamrul Hasan",
    },
    {
      id: 4,
      value: "Md. Monir Hossain",
      label: "Md. Monir Hossain",
    },
  ],

  // =========================
  // Division Form
  // =========================
  divisionForm: {
    estate: "",
    divisionName: "",
    divisionCode: "",
    totalArea: "",
    totalSection: "",
    status: "Active",
    description: "",
  },

  // =========================
  // Section Form
  // =========================
  sectionForm: {
    division: "",
    parentSection: "",
    sectionName: "",
    sectionCode: "",
    totalArea: "",
    manager: "",
    status: "Active",
    description: "",
  },

  // =========================
  // Division Table Headers
  // =========================
  divisionTableHeaders: [
    "SL",
    "Division Name",
    "Division Code",
    "Manager",
    "Total Area (Acre)",
    "Total Section",
    "Status",
    "Action",
  ],

  // =========================
  // Section Table Headers
  // =========================
  sectionTableHeaders: [
    "SL",
    "Division",
    "Section Name",
    "Section Code",
    "Parent Section",
    "Total Area (Acre)",
    "Status",
    "Action",
  ],

};
