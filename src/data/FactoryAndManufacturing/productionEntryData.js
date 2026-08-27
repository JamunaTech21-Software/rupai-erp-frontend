export const productionEntryData = {
  // =========================================================
  // PAGE INFORMATION
  // =========================================================

  pageInfo: {
    title: "Production Entry",
    module: "Factory & Manufacturing",
    breadcrumb: ["Factory & Manufacturing", "Production Entry"],
  },

  // =========================================================
  // PRODUCTION INFORMATION
  // =========================================================

  productionInformation: {
    productionDate: "2026-06-06",

    factory: {
      id: "FAC-001",
      name: "Jamuna Tea Factory",
    },

    productionLine: {
      id: "LINE-001",
      name: "CTC Line - 01",
    },

    shift: {
      id: "SHIFT-001",
      name: "Day Shift (8 AM - 4 PM)",
    },

    productionType: {
      id: "PROD-TYPE-001",
      name: "CTC Tea",
    },

    batchLotNo: "CTC-06062026-001",

    supervisor: {
      id: "EMP-001",
      name: "Shahinur Begum",
    },

    remark: "",
  },

  // =========================================================
  // DROPDOWN OPTIONS
  // =========================================================

  factories: [
    {
      id: "FAC-001",
      name: "Jamuna Tea Factory",
      code: "JTF-001",
      status: "active",
    },
    {
      id: "FAC-002",
      name: "Srimangal Tea Factory",
      code: "STF-001",
      status: "active",
    },
    {
      id: "FAC-003",
      name: "Sylhet Tea Factory",
      code: "SYL-001",
      status: "active",
    },
  ],

  productionLines: [
    {
      id: "LINE-001",
      factoryId: "FAC-001",
      name: "CTC Line - 01",
      code: "CTC-01",
      status: "active",
    },
    {
      id: "LINE-002",
      factoryId: "FAC-001",
      name: "CTC Line - 02",
      code: "CTC-02",
      status: "active",
    },
    {
      id: "LINE-003",
      factoryId: "FAC-002",
      name: "CTC Line - 01",
      code: "CTC-01",
      status: "active",
    },
  ],

  shifts: [
    {
      id: "SHIFT-001",
      name: "Day Shift (8 AM - 4 PM)",
      startTime: "08:00",
      endTime: "16:00",
    },
    {
      id: "SHIFT-002",
      name: "Evening Shift (4 PM - 12 AM)",
      startTime: "16:00",
      endTime: "00:00",
    },
    {
      id: "SHIFT-003",
      name: "Night Shift (12 AM - 8 AM)",
      startTime: "00:00",
      endTime: "08:00",
    },
  ],

  productionTypes: [
    {
      id: "PROD-TYPE-001",
      name: "CTC Tea",
      code: "CTC",
    },
    {
      id: "PROD-TYPE-002",
      name: "Orthodox Tea",
      code: "ORTHODOX",
    },
    {
      id: "PROD-TYPE-003",
      name: "Green Tea",
      code: "GREEN",
    },
    {
      id: "PROD-TYPE-004",
      name: "Tea Dust",
      code: "DUST",
    },
  ],

  supervisors: [
    {
      id: "EMP-001",
      name: "Shahinur Begum",
      employeeCode: "EMP-001",
      designation: "Production Supervisor",
    },
    {
      id: "EMP-002",
      name: "Md. Rahim Uddin",
      employeeCode: "EMP-002",
      designation: "Production Supervisor",
    },
    {
      id: "EMP-003",
      name: "Karim Ahmed",
      employeeCode: "EMP-003",
      designation: "Factory Incharge",
    },
  ],

  // =========================================================
  // PRODUCTION ITEM OPTIONS
  // =========================================================

  products: [
    {
      id: "PROD-001",
      name: "CTC Tea",
      code: "CTC",
    },
    {
      id: "PROD-002",
      name: "CTC Tea Dust",
      code: "CTC-DUST",
    },
    {
      id: "PROD-003",
      name: "Orthodox Tea",
      code: "ORTHODOX",
    },
    {
      id: "PROD-004",
      name: "Green Tea",
      code: "GREEN",
    },
  ],

  grades: [
    {
      id: "GRADE-001",
      name: "BP",
      productType: "CTC Tea",
    },
    {
      id: "GRADE-002",
      name: "PF1",
      productType: "CTC Tea",
    },
    {
      id: "GRADE-003",
      name: "PF2",
      productType: "CTC Tea",
    },
    {
      id: "GRADE-004",
      name: "Dust",
      productType: "CTC Tea Dust",
    },
    {
      id: "GRADE-005",
      name: "BOP",
      productType: "Orthodox Tea",
    },
  ],

  uoms: [
    {
      id: "UOM-001",
      name: "Kg",
      symbol: "kg",
    },
    {
      id: "UOM-002",
      name: "Ton",
      symbol: "ton",
    },
    {
      id: "UOM-003",
      name: "Gram",
      symbol: "g",
    },
  ],

  rawMaterials: [
    {
      id: "RM-001",
      name: "Fresh Green Leaf",
      code: "FGL",
      defaultUom: "Kg",
    },
    {
      id: "RM-002",
      name: "CTC Fanning",
      code: "CTC-FAN",
      defaultUom: "Kg",
    },
    {
      id: "RM-003",
      name: "Tea Dust",
      code: "DUST",
      defaultUom: "Kg",
    },
  ],

  // =========================================================
  // PRODUCTION ITEMS
  // =========================================================

  productionItems: [
    {
      id: "ITEM-001",
      serialNo: 1,

      product: {
        id: "PROD-001",
        name: "CTC Tea",
      },

      grade: {
        id: "GRADE-001",
        name: "BP",
      },

      uom: {
        id: "UOM-001",
        name: "Kg",
      },

      rawMaterial: {
        id: "RM-001",
        name: "Fresh Green Leaf",
      },

      quantityProduced: 1250,
      rejectedWaste: 25,

      netOutput: 1225,

      status: "active",
    },

    {
      id: "ITEM-002",
      serialNo: 2,

      product: {
        id: "PROD-001",
        name: "CTC Tea",
      },

      grade: {
        id: "GRADE-002",
        name: "PF1",
      },

      uom: {
        id: "UOM-001",
        name: "Kg",
      },

      rawMaterial: {
        id: "RM-001",
        name: "Fresh Green Leaf",
      },

      quantityProduced: 980,
      rejectedWaste: 20,

      netOutput: 960,

      status: "active",
    },

    {
      id: "ITEM-003",
      serialNo: 3,

      product: {
        id: "PROD-001",
        name: "CTC Tea",
      },

      grade: {
        id: "GRADE-003",
        name: "PF2",
      },

      uom: {
        id: "UOM-001",
        name: "Kg",
      },

      rawMaterial: {
        id: "RM-001",
        name: "Fresh Green Leaf",
      },

      quantityProduced: 875,
      rejectedWaste: 15,

      netOutput: 860,

      status: "active",
    },

    {
      id: "ITEM-004",
      serialNo: 4,

      product: {
        id: "PROD-002",
        name: "CTC Tea Dust",
      },

      grade: {
        id: "GRADE-004",
        name: "Dust",
      },

      uom: {
        id: "UOM-001",
        name: "Kg",
      },

      rawMaterial: {
        id: "RM-002",
        name: "CTC Fanning",
      },

      quantityProduced: 300,
      rejectedWaste: 5,

      netOutput: 295,

      status: "active",
    },
  ],

  // =========================================================
  // RAW MATERIAL DETAILS
  // =========================================================

  rawMaterialDetails: [
    {
      id: "RMD-001",

      rawMaterial: {
        id: "RM-001",
        name: "Fresh Green Leaf",
      },

      sourceGarden: {
        id: "EST-001",
        name: "Jamuna Tea Estate",
      },

      uom: {
        id: "UOM-001",
        name: "Kg",
      },

      quantity: 3405,

      averageRate: 18.5,

      totalCost: 62992.5,
    },
  ],

  // =========================================================
  // SOURCE / GARDEN OPTIONS
  // =========================================================

  sourceGardens: [
    {
      id: "EST-001",
      name: "Jamuna Tea Estate",
      code: "JTE-001",
    },
    {
      id: "EST-002",
      name: "Srimangal Tea Estate",
      code: "STE-001",
    },
    {
      id: "EST-003",
      name: "Sylhet Tea Estate",
      code: "SYL-001",
    },
  ],

  // =========================================================
  // PRODUCTION SUMMARY
  // =========================================================

  productionSummary: {
    totalRawMaterialUsed: 3405,

    totalQuantityProduced: 3405,

    totalRejectedWaste: 65,

    totalNetOutput: 3340,

    productionEfficiency: 98.09,

    efficiencyFormula: "Net Output / Produced",
  },

  // =========================================================
  // PRODUCTION CHECKLIST
  // =========================================================

  productionChecklist: [
    {
      id: "CHECK-001",
      label: "Raw material quality checked",
      checked: true,
      required: true,
    },

    {
      id: "CHECK-002",
      label: "Machine & line condition checked",
      checked: true,
      required: true,
    },

    {
      id: "CHECK-003",
      label: "Quality parameters followed",
      checked: true,
      required: true,
    },

    {
      id: "CHECK-004",
      label: "Safety measures followed",
      checked: true,
      required: true,
    },

    {
      id: "CHECK-005",
      label: "Waste recorded accurately",
      checked: true,
      required: true,
    },
  ],

  // =========================================================
  // ATTACHMENTS
  // =========================================================

  attachments: [
    {
      id: "FILE-001",
      name: "raw_material_bill.pdf",
      type: "application/pdf",
      size: "324 KB",
      url: "#",
    },

    {
      id: "FILE-002",
      name: "machine_log.jpg",
      type: "image/jpeg",
      size: "461 KB",
      url: "#",
    },

    {
      id: "FILE-003",
      name: "qc_report.pdf",
      type: "application/pdf",
      size: "210 KB",
      url: "#",
    },
  ],

  // =========================================================
  // NOTES
  // =========================================================

  notes: {
    value:
      "Good quality green leaf received. All machines operated smoothly. No major issues.",

    maxLength: 250,
  },

  // =========================================================
  // AUDIT INFORMATION
  // =========================================================

  auditInformation: {
    createdBy: {
      id: "EMP-010",
      name: "Md. Faruk Hossain",
      designation: "Estate Manager",
      date: "2026-06-06",
      time: "10:15 AM",
    },

    lastUpdatedBy: {
      id: "EMP-010",
      name: "Md. Faruk Hossain",
      designation: "Estate Manager",
      date: "2026-06-06",
      time: "10:15 AM",
    },

    status: "Active",

    submissionNo: "PRD-06062026-001",

    approvedBy: null,

    approvedOn: null,
  },

  // =========================================================
  // FORM STATUS
  // =========================================================

  formStatus: {
    isDraft: true,
    isSubmitted: false,
    isApproved: false,
  },
};
