export const contractorManagementData = {
  pageInfo: {
    title: "Contractor Management",
    description:
      "Manage contractor information, contracts, documents and performance",
  },

  summaryCards: [
    {
      id: 1,
      title: "Total Contractors",
      value: 86,
      type: "total",
      badge: "Total",
    },
    {
      id: 2,
      title: "Active Contractors",
      value: 72,
      type: "active",
      badge: "Active",
    },
    {
      id: 3,
      title: "Inactive Contractors",
      value: 14,
      type: "inactive",
      badge: "Inactive",
    },
    {
      id: 4,
      title: "Contracts Expiring",
      value: 8,
      type: "expiring",
      badge: "30 Days",
    },
    {
      id: 5,
      title: "New This Month",
      value: 5,
      type: "new",
      badge: "New",
    },
    {
      id: 6,
      title: "Total Contract Value",
      value: 24850000,
      type: "value",
      badge: "Value",
      currency: "৳",
    },
  ],

  filters: {
    contractorTypes: [
      "All Types",
      "Service",
      "Labour Supply",
      "Transportation",
    ],

    tradeCategories: [
      "All Categories",
      "Plucking",
      "Pruning",
      "Weeding",
      "Leaf Transport",
      "Garden Cleaning",
      "Road Maintenance",
      "Security",
      "Water Supply",
    ],

    statuses: ["All Status", "Active", "Inactive"],

    locations: [
      "All Locations",
      "North Division",
      "Central Division",
      "East Division",
      "South Division",
      "Factory Unit",
      "Estate Wide",
    ],
  },

  contractors: [
    {
      id: "CON-1001",
      name: "M/S Green Leaf Services",
      type: "Service",
      trade: "Plucking",
      mobile: "01712-345678",
      email: "greenleafservices@gmail.com",
      workingLocation: "North Division",
      status: "Active",
      contractStartDate: "01-01-2026",
      contractEndDate: "31-12-2026",
      contractValue: 8450000,
    },

    {
      id: "CON-1002",
      name: "M/S Akter Enterprise",
      type: "Labour Supply",
      trade: "Pruning",
      mobile: "01798-765432",
      email: "akterenterprise@gmail.com",
      workingLocation: "Central Division",
      status: "Active",
      contractStartDate: "15-01-2026",
      contractEndDate: "14-01-2027",
      contractValue: 5250000,
    },

    {
      id: "CON-1003",
      name: "M/S Hasan & Sons",
      type: "Transportation",
      trade: "Leaf Transport",
      mobile: "01822-334455",
      email: "hasanandsons@gmail.com",
      workingLocation: "Factory Unit",
      status: "Active",
      contractStartDate: "01-02-2026",
      contractEndDate: "31-01-2027",
      contractValue: 4125000,
    },

    {
      id: "CON-1004",
      name: "M/S Safety First",
      type: "Service",
      trade: "Weeding",
      mobile: "01766-778899",
      email: "safetyfirst@gmail.com",
      workingLocation: "South Division",
      status: "Active",
      contractStartDate: "05-01-2026",
      contractEndDate: "04-01-2027",
      contractValue: 3250000,
    },

    {
      id: "CON-1005",
      name: "M/S Clean & Care",
      type: "Service",
      trade: "Garden Cleaning",
      mobile: "01833-112233",
      email: "cleanandcare@gmail.com",
      workingLocation: "East Division",
      status: "Inactive",
      contractStartDate: "01-06-2025",
      contractEndDate: "31-05-2026",
      contractValue: 2875000,
    },

    {
      id: "CON-1006",
      name: "M/S Road Master",
      type: "Service",
      trade: "Road Maintenance",
      mobile: "01744-556677",
      email: "roadmaster@gmail.com",
      workingLocation: "Estate Wide",
      status: "Active",
      contractStartDate: "10-01-2026",
      contractEndDate: "09-01-2027",
      contractValue: 2875000,
    },

    {
      id: "CON-1007",
      name: "M/S Security Plus",
      type: "Service",
      trade: "Security",
      mobile: "01888-998877",
      email: "securityplus@gmail.com",
      workingLocation: "Estate Wide",
      status: "Active",
      contractStartDate: "01-03-2026",
      contractEndDate: "28-02-2027",
      contractValue: 2100000,
    },

    {
      id: "CON-1008",
      name: "M/S Water Supply Co.",
      type: "Service",
      trade: "Water Supply",
      mobile: "01799-887766",
      email: "watersupply@gmail.com",
      workingLocation: "Factory Unit",
      status: "Active",
      contractStartDate: "20-02-2026",
      contractEndDate: "19-02-2027",
      contractValue: 1925000,
    },
  ],

  contractorProfile: {
    status: "Active",

    basicInfo: {
      name: "M/S Green Leaf Services",
      contractorId: "CON-1001",
      type: "Service",
      trade: "Plucking",
      mobile: "01712-345678",
      email: "greenleafservices@gmail.com",
      workingLocation: "North Division",
    },

    generalInfo: {
      proprietor: "Mr. Jahangir Alam",
      address: "House-12, Road-05, Tea Garden Road, Sreemangal",
      nationalId: "19851234567890123",
      tradeLicense: "TL-2026-1256",
      vatRegistration: "VAT-123456789",
      tinNumber: "123456789012",
      bankName: "Islami Bank Bangladesh Ltd.",
      bankAccountNumber: "05012345678901",
      status: "Active",
      remarks: "Regular contractor",
    },

    tabs: [
      "General Info",
      "Documents",
      "Payment Info",
      "Performance",
      "Other Info",
    ],
  },

  contractorTypeWise: [
    {
      name: "Service",
      value: 38,
      percentage: 44.19,
    },
    {
      name: "Labour Supply",
      value: 22,
      percentage: 25.58,
    },
    {
      name: "Transportation",
      value: 8,
      percentage: 9.3,
    },
    {
      name: "Others",
      value: 18,
      percentage: 20.93,
    },
  ],

  tradeWorkWise: [
    {
      name: "Plucking",
      value: 28,
    },
    {
      name: "Pruning",
      value: 15,
    },
    {
      name: "Weeding",
      value: 10,
    },
    {
      name: "Leaf Transport",
      value: 8,
    },
    {
      name: "Garden Cleaning",
      value: 6,
    },
    {
      name: "Others",
      value: 19,
    },
  ],

  contractStatus: [
    {
      name: "Active",
      value: 72,
      percentage: 83.72,
    },
    {
      name: "Inactive",
      value: 14,
      percentage: 16.28,
    },
  ],

  topContractors: [
    {
      contractorId: "CON-1001",
      name: "M/S Green Leaf Services",
      contractValue: 8450000,
    },
    {
      contractorId: "CON-1002",
      name: "M/S Akter Enterprise",
      contractValue: 5250000,
    },
    {
      contractorId: "CON-1003",
      name: "M/S Hasan & Sons",
      contractValue: 4125000,
    },
    {
      contractorId: "CON-1004",
      name: "M/S Safety First",
      contractValue: 3250000,
    },
    {
      contractorId: "CON-1006",
      name: "M/S Road Master",
      contractValue: 2875000,
    },
  ],

  expiryAlerts: [
    {
      contractorId: "CON-1004",
      contractorName: "M/S Safety First",
      endDate: "04-01-2027",
      daysLeft: 216,
      status: "Safe",
    },
    {
      contractorId: "CON-1006",
      contractorName: "M/S Road Master",
      endDate: "09-01-2027",
      daysLeft: 221,
      status: "Safe",
    },
    {
      contractorId: "CON-1008",
      contractorName: "M/S Water Supply Co.",
      endDate: "19-02-2027",
      daysLeft: 262,
      status: "Safe",
    },
    {
      contractorId: "CON-1005",
      contractorName: "M/S Clean & Care",
      endDate: "31-05-2026",
      daysLeft: 29,
      status: "Expiring Soon",
    },
    {
      contractorId: "CON-1003",
      contractorName: "M/S Hasan & Sons",
      endDate: "31-01-2027",
      daysLeft: 212,
      status: "Safe",
    },
  ],

  documents: [
    {
      id: 1,
      name: "Trade License",
      status: "Uploaded",
    },
    {
      id: 2,
      name: "TIN Certificate",
      status: "Uploaded",
    },
    {
      id: 3,
      name: "VAT Certificate",
      status: "Uploaded",
    },
    {
      id: 4,
      name: "Bank Document",
      status: "Uploaded",
    },
    {
      id: 5,
      name: "Contract Agreement",
      status: "Uploaded",
    },
    {
      id: 6,
      name: "Insurance",
      status: "Uploaded",
    },
    {
      id: 7,
      name: "Work Permit",
      status: "Uploaded",
    },
    {
      id: 8,
      name: "Other Document",
      status: "Uploaded",
    },
  ],

  performance: {
    onTimeWorkCompletion: 92,
    qualityRating: 4.3,
    compliance: 88,
  },

  actionShortcuts: [
    {
      id: 1,
      name: "Contract Renewal",
      type: "renewal",
    },
    {
      id: 2,
      name: "Payment Entry",
      type: "payment",
    },
    {
      id: 3,
      name: "Work Order",
      type: "workOrder",
    },
    {
      id: 4,
      name: "Document Request",
      type: "document",
    },
    {
      id: 5,
      name: "Blacklist Contractor",
      type: "blacklist",
    },
    {
      id: 6,
      name: "More Actions",
      type: "more",
    },
  ],
};
