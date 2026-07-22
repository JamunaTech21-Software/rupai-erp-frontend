export const divisionSectionData = {
  // =========================
  // Estate Dropdown
  // =========================
  estateOptions: [
    {
      id: 1,
      value: "jamuna-tea-estate",
      label: "Jamuna Tea Estate",
    },
    {
      id: 2,
      value: "rupai-tea-estate",
      label: "RupAi Tea Estate",
    },
  ],

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
    {
      id: 2,
      value: "SEC-A",
      label: "Section A",
    },
    {
      id: 3,
      value: "SEC-B",
      label: "Section B",
    },
    {
      id: 4,
      value: "SEC-C",
      label: "Section C",
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
    "Section Name",
    "Section Code",
    "Parent Section",
    "Total Area (Acre)",
    "Manager / In-charge",
    "Status",
    "Action",
  ],

  // =========================
  // Division Table
  // =========================
  divisionList: [
    {
      id: 1,
      divisionName: "Rangpur Division",
      divisionCode: "DIV-01",
      totalArea: 1250,
      totalSection: 8,
      status: "Active",
    },
    {
      id: 2,
      divisionName: "Uttara Division",
      divisionCode: "DIV-02",
      totalArea: 980.5,
      totalSection: 6,
      status: "Active",
    },
    {
      id: 3,
      divisionName: "Dakshin Division",
      divisionCode: "DIV-03",
      totalArea: 1120.75,
      totalSection: 7,
      status: "Active",
    },
    {
      id: 4,
      divisionName: "Purba Division",
      divisionCode: "DIV-04",
      totalArea: 860.25,
      totalSection: 5,
      status: "Inactive",
    },
    {
      id: 5,
      divisionName: "Paschim Division",
      divisionCode: "DIV-05",
      totalArea: 1045,
      totalSection: 6,
      status: "Active",
    },
  ],

  // =========================
  // Section Table
  // =========================
  sectionList: [
    {
      id: 1,
      sectionName: "Section A",
      sectionCode: "SEC-A",
      parentSection: "-",
      totalArea: 180,
      manager: "Md. Faruk Hossain",
      status: "Active",
    },
    {
      id: 2,
      sectionName: "Section B",
      sectionCode: "SEC-B",
      parentSection: "-",
      totalArea: 165.5,
      manager: "Md. Jalal Uddin",
      status: "Active",
    },
    {
      id: 3,
      sectionName: "Section C",
      sectionCode: "SEC-C",
      parentSection: "-",
      totalArea: 210.75,
      manager: "Md. Kamrul Hasan",
      status: "Active",
    },
    {
      id: 4,
      sectionName: "Section D",
      sectionCode: "SEC-D",
      parentSection: "-",
      totalArea: 175,
      manager: "Md. Rezaul Karim",
      status: "Inactive",
    },
    {
      id: 5,
      sectionName: "Section E",
      sectionCode: "SEC-E",
      parentSection: "-",
      totalArea: 190,
      manager: "Md. Abul Bashar",
      status: "Active",
    },
    {
      id: 6,
      sectionName: "Section F",
      sectionCode: "SEC-F",
      parentSection: "-",
      totalArea: 220.25,
      manager: "Md. Monir Hossain",
      status: "Active",
    },
    {
      id: 7,
      sectionName: "Section G",
      sectionCode: "SEC-G",
      parentSection: "-",
      totalArea: 160,
      manager: "Md. Nazrul Islam",
      status: "Active",
    },
    {
      id: 8,
      sectionName: "Section H",
      sectionCode: "SEC-H",
      parentSection: "-",
      totalArea: 210.5,
      manager: "Md. Shahidul Islam",
      status: "Active",
    },
  ],

  // =========================
  // Summary
  // =========================
  summary: {
    totalDivision: 5,
    totalSection: 32,
    totalArea: 5256.5,
    averageSectionArea: 164.27,
    activeDivision: 4,
    activeSection: 28,
  },
};
