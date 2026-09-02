export const masterDataDashboardData = {
  // =========================================================
  // PAGE HEADER
  // =========================================================

  pageHeader: {
    title: "Master Data Dashboard",
    subtitle: "Overview of all master/setup data",
  },

  // =========================================================
  // SUMMARY CARDS
  // =========================================================

  summaryCards: [
    {
      id: "season",
      title: "Seasons",
      total: 5,
      active: 3,
      icon: "season",
    },
    {
      id: "tea-grade",
      title: "Tea Grades",
      total: 12,
      active: 12,
      icon: "teaGrade",
    },
    {
      id: "tea-brokers",
      title: "Tea Brokers",
      total: 28,
      active: 27,
      icon: "teaBrokers",
    },
    {
      id: "auction-centers",
      title: "Auction Centers",
      total: 4,
      active: 4,
      icon: "auctionCenters",
    },
    {
      id: "tea-warehouse",
      title: "Tea Warehouses",
      total: 6,
      active: 6,
      icon: "teaWarehouse",
    },
  ],

  // =========================================================
  // MASTER DATA OVERVIEW
  // =========================================================

  masterDataOverview: [
    {
      id: "season",
      name: "Season",
      total: 5,
      active: 3,
      inactive: 2,
      lastUpdated: "05/06/2026 10:15 AM",
      icon: "season",
      path: "/master-data-season",
    },

    {
      id: "tea-grade",
      name: "Tea Grade",
      total: 12,
      active: 12,
      inactive: 0,
      lastUpdated: "05/06/2026 09:40 AM",
      icon: "teaGrade",
      path: "/master-data-tea-grade",
    },

    {
      id: "tea-brokers",
      name: "Tea Brokers",
      total: 28,
      active: 27,
      inactive: 1,
      lastUpdated: "05/06/2026 11:20 AM",
      icon: "teaBrokers",
      path: "/master-data-tea-brokers",
    },

    {
      id: "auction-centers",
      name: "Auction Centers",
      total: 4,
      active: 4,
      inactive: 0,
      lastUpdated: "04/06/2026 04:30 PM",
      icon: "auctionCenters",
      path: "/master-data-auction-centers",
    },

    {
      id: "tea-warehouse",
      name: "Tea Warehouse",
      total: 6,
      active: 6,
      inactive: 0,
      lastUpdated: "05/06/2026 09:10 AM",
      icon: "teaWarehouse",
      path: "/master-data-tea-warehouse",
    },

    {
      id: "unit-of-measurement",
      name: "Unit of Measurement",
      total: 10,
      active: 10,
      inactive: 0,
      lastUpdated: "03/06/2026 02:25 PM",
      icon: "unitOfMeasurement",
      path: "/master-data-unit-of-measurement",
    },

    {
      id: "tea-type",
      name: "Tea Type",
      total: 6,
      active: 6,
      inactive: 0,
      lastUpdated: "03/06/2026 01:50 PM",
      icon: "teaType",
      path: "/master-data-tea-type",
    },

    {
      id: "production-type",
      name: "Production Type",
      total: 5,
      active: 5,
      inactive: 0,
      lastUpdated: "02/06/2026 11:05 AM",
      icon: "productionType",
      path: "/master-data-production-type",
    },

    {
      id: "common-status",
      name: "Common Status",
      total: 8,
      active: 8,
      inactive: 0,
      lastUpdated: "01/06/2026 05:45 AM",
      icon: "commonStatus",
      path: "/master-data-common-status",
    },
  ],

  // =========================================================
  // RECENTLY ADDED
  // =========================================================

  recentlyAdded: [
    {
      id: 1,
      masterData: "Season",
      name: "2026 Main Season",
      addedOn: "05/06/2026",
      addedBy: "Md. Faruk Hossain",
      icon: "season",
      path: "/master-data-season",
    },

    {
      id: 2,
      masterData: "Tea Grade",
      name: "BOPF",
      addedOn: "05/06/2026",
      addedBy: "Afsana Begum",
      icon: "teaGrade",
      path: "/master-data-tea-grade",
    },

    {
      id: 3,
      masterData: "Tea Brokers",
      name: "ABC Tea Brokers",
      addedOn: "04/06/2026",
      addedBy: "Rina Sultana",
      icon: "teaBrokers",
      path: "/master-data-tea-brokers",
    },

    {
      id: 4,
      masterData: "Auction Centers",
      name: "Chattogram Auction Center",
      addedOn: "04/06/2026",
      addedBy: "Md. Faruk Hossain",
      icon: "auctionCenters",
      path: "/master-data-auction-centers",
    },

    {
      id: 5,
      masterData: "Tea Warehouse",
      name: "CTC Warehouse - 01",
      addedOn: "04/06/2026",
      addedBy: "Salma Akter",
      icon: "teaWarehouse",
      path: "/master-data-tea-warehouse",
    },
  ],

  // =========================================================
  // MASTER DATA HEALTH
  // =========================================================

  masterDataHealth: {
    total: 84,
    active: 81,
    inactive: 3,

    percentages: {
      active: 96.43,
      inactive: 3.57,
      total: 100,
    },

    status: "healthy",

    message: {
      title: "All Good!",
      description: "Your master data is up to date and looks healthy.",
    },
  },

  // =========================================================
  // QUICK ACCESS
  // =========================================================

  quickAccess: [
    {
      id: "season",
      label: "Season",
      icon: "season",
      path: "/master-data-season",
    },

    {
      id: "tea-grade",
      label: "Tea Grade",
      icon: "teaGrade",
      path: "/master-data-tea-grade",
    },
    {
      id: "master-data-add-new-broker",
      label: "Add New Broker Setup",
      icon: "productionType",
      path: "/master-data-add-new-broker",
    },
    {
      id: "tea-brokers",
      label: "Tea Brokers",
      icon: "teaBrokers",
      path: "/master-data-tea-brokers",
    },

    {
      id: "auction-centers",
      label: "Auction Centers",
      icon: "auctionCenters",
      path: "/master-data-auction-centers",
    },

    {
      id: "tea-warehouse",
      label: "Tea Warehouse",
      icon: "teaWarehouse",
      path: "/master-data-tea-warehouse",
    },

    {
      id: "unit-of-measurement",
      label: "Auction schedule",
      icon: "unitOfMeasurement",
      path: "/master-data-auction-schedule",
    },

    {
      id: "tea-type",
      label: "Tea Type",
      icon: "teaType",
      path: "/master-data-tea-type",
    },

    {
      id: "common-status",
      label: "Common Status",
      icon: "commonStatus",
      path: "/master-data-common-status",
    },
  ],

  // =========================================================
  // FOOTER
  // =========================================================

  footer: {
    copyright: "© 2026 RupAi ERP. All rights reserved.",
    version: "Version 1.0.0",
  },
};
