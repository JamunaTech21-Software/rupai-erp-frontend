// =========================================================
// AUCTION SCHEDULE DATA
// Backend-friendly mock data
// =========================================================

export const auctionScheduleData = {
  // =======================================================
  // PAGE META
  // =======================================================

  pageMeta: {
    module: "Sales & Accounts",
    page: "Auction Schedule",
    title: "Auction Schedule (Annual Calendar)",
    description: "Annual tea auction schedule management",
  },

  // =======================================================
  // FILTER OPTIONS
  // =======================================================

  filters: {
    seasons: [
      {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
        status: "active",
      },
      {
        id: "season_2025_2026",
        code: "2025-2026",
        name: "2025-2026",
        status: "closed",
      },
      {
        id: "season_2024_2025",
        code: "2024-2025",
        name: "2024-2025",
        status: "closed",
      },
    ],

    auctionCenters: [
      {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
        status: "active",
      },
      {
        id: "auction_center_sylhet",
        code: "SYL",
        name: "Sylhet",
        status: "active",
      },
      {
        id: "auction_center_moulvibazar",
        code: "MLV",
        name: "Moulvibazar",
        status: "active",
      },
    ],

    years: [
      {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },
      {
        id: "year_2025_2026",
        code: "2025-2026",
        name: "2025-2026",
      },
    ],

    statuses: [
      {
        id: "all",
        code: "ALL",
        name: "All",
      },
      {
        id: "scheduled",
        code: "SCHEDULED",
        name: "Scheduled",
      },
      {
        id: "holiday",
        code: "HOLIDAY",
        name: "Holiday",
      },
      {
        id: "completed",
        code: "COMPLETED",
        name: "Completed",
      },
      {
        id: "cancelled",
        code: "CANCELLED",
        name: "Cancelled",
      },
    ],
  },

  // =======================================================
  // DEFAULT FILTER STATE
  // =======================================================

  defaultFilters: {
    seasonId: "season_2026_2027",
    auctionCenterId: "auction_center_chattogram",
    yearId: "year_2026_2027",
    status: "all",
  },

  // =======================================================
  // TABLE CONFIGURATION
  // =======================================================

  table: {
    keyField: "id",

    columns: [
      {
        key: "saleNo",
        label: "Sale No.",
        sortable: true,
      },
      {
        key: "saleDate",
        label: "Sale Date",
        sortable: true,
      },
      {
        key: "saleDay",
        label: "Sale Day",
        sortable: true,
      },
      {
        key: "buyerPromptDate",
        label: "Buyer Prompt Date",
        sortable: true,
      },
      {
        key: "catalogueClosingDate",
        label: "Catalogue Closing Date",
        sortable: true,
      },
      {
        key: "comments",
        label: "Comments",
        sortable: false,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
      },
      {
        key: "actions",
        label: "Action",
        sortable: false,
      },
    ],

    pagination: {
      defaultPage: 1,
      defaultPerPage: 15,
      perPageOptions: [10, 15, 25, 50],
    },
  },

  // =======================================================
  // AUCTION SCHEDULE LIST
  // =======================================================

  schedules: [
    {
      id: "auction_schedule_001",

      saleNo: 1,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-04-27",

      saleDay: "Monday",

      buyerPromptDate: "2026-04-19",

      catalogueClosingDate: "2026-04-19",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:00:00Z",
      updatedAt: "2026-01-10T09:00:00Z",
    },

    {
      id: "auction_schedule_002",

      saleNo: 2,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-05-04",

      saleDay: "Monday",

      buyerPromptDate: "2026-04-26",

      catalogueClosingDate: "2026-04-26",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:05:00Z",
      updatedAt: "2026-01-10T09:05:00Z",
    },

    {
      id: "auction_schedule_003",

      saleNo: 3,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-05-11",

      saleDay: "Monday",

      buyerPromptDate: "2026-05-03",

      catalogueClosingDate: "2026-05-03",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:10:00Z",
      updatedAt: "2026-01-10T09:10:00Z",
    },

    {
      id: "auction_schedule_004",

      saleNo: 4,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-05-18",

      saleDay: "Monday",

      buyerPromptDate: "2026-05-10",

      catalogueClosingDate: "2026-05-10",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:15:00Z",
      updatedAt: "2026-01-10T09:15:00Z",
    },

    {
      id: "auction_schedule_005",

      saleNo: 5,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-06-01",

      saleDay: "Monday",

      buyerPromptDate: "2026-05-24",

      catalogueClosingDate: "2026-05-24",

      comments: "Holiday",

      status: {
        code: "HOLIDAY",
        label: "Holiday",
      },

      isActive: true,

      createdAt: "2026-01-10T09:20:00Z",
      updatedAt: "2026-01-10T09:20:00Z",
    },

    {
      id: "auction_schedule_006",

      saleNo: 6,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-06-08",

      saleDay: "Monday",

      buyerPromptDate: "2026-05-31",

      catalogueClosingDate: "2026-05-31",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:25:00Z",
      updatedAt: "2026-01-10T09:25:00Z",
    },

    {
      id: "auction_schedule_007",

      saleNo: 7,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-06-15",

      saleDay: "Monday",

      buyerPromptDate: "2026-06-07",

      catalogueClosingDate: "2026-06-07",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:30:00Z",
      updatedAt: "2026-01-10T09:30:00Z",
    },

    {
      id: "auction_schedule_008",

      saleNo: 8,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-06-22",

      saleDay: "Monday",

      buyerPromptDate: "2026-06-14",

      catalogueClosingDate: "2026-06-14",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:35:00Z",
      updatedAt: "2026-01-10T09:35:00Z",
    },

    {
      id: "auction_schedule_009",

      saleNo: 9,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-06-29",

      saleDay: "Monday",

      buyerPromptDate: "2026-06-21",

      catalogueClosingDate: "2026-06-21",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:40:00Z",
      updatedAt: "2026-01-10T09:40:00Z",
    },

    {
      id: "auction_schedule_010",

      saleNo: 10,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-07-06",

      saleDay: "Monday",

      buyerPromptDate: "2026-06-28",

      catalogueClosingDate: "2026-06-28",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:45:00Z",
      updatedAt: "2026-01-10T09:45:00Z",
    },

    {
      id: "auction_schedule_011",

      saleNo: 11,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-07-13",

      saleDay: "Monday",

      buyerPromptDate: "2026-07-05",

      catalogueClosingDate: "2026-07-05",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:50:00Z",
      updatedAt: "2026-01-10T09:50:00Z",
    },

    {
      id: "auction_schedule_012",

      saleNo: 12,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-07-20",

      saleDay: "Monday",

      buyerPromptDate: "2026-07-12",

      catalogueClosingDate: "2026-07-12",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T09:55:00Z",
      updatedAt: "2026-01-10T09:55:00Z",
    },

    {
      id: "auction_schedule_013",

      saleNo: 13,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-07-27",

      saleDay: "Monday",

      buyerPromptDate: "2026-07-19",

      catalogueClosingDate: "2026-07-19",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T10:00:00Z",
      updatedAt: "2026-01-10T10:00:00Z",
    },

    {
      id: "auction_schedule_014",

      saleNo: 14,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-08-03",

      saleDay: "Monday",

      buyerPromptDate: "2026-07-26",

      catalogueClosingDate: "2026-07-26",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T10:05:00Z",
      updatedAt: "2026-01-10T10:05:00Z",
    },

    {
      id: "auction_schedule_015",

      saleNo: 15,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-08-10",

      saleDay: "Monday",

      buyerPromptDate: "2026-08-02",

      catalogueClosingDate: "2026-08-02",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T10:10:00Z",
      updatedAt: "2026-01-10T10:10:00Z",
    },

    {
      id: "auction_schedule_016",

      saleNo: 16,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-08-17",

      saleDay: "Monday",

      buyerPromptDate: "2026-08-09",

      catalogueClosingDate: "2026-08-09",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T10:15:00Z",
      updatedAt: "2026-01-10T10:15:00Z",
    },

    {
      id: "auction_schedule_017",

      saleNo: 17,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-08-24",

      saleDay: "Monday",

      buyerPromptDate: "2026-08-16",

      catalogueClosingDate: "2026-08-16",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T10:20:00Z",
      updatedAt: "2026-01-10T10:20:00Z",
    },

    {
      id: "auction_schedule_018",

      saleNo: 18,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-08-31",

      saleDay: "Monday",

      buyerPromptDate: "2026-08-23",

      catalogueClosingDate: "2026-08-23",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T10:25:00Z",
      updatedAt: "2026-01-10T10:25:00Z",
    },

    {
      id: "auction_schedule_019",

      saleNo: 19,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-09-07",

      saleDay: "Monday",

      buyerPromptDate: "2026-08-30",

      catalogueClosingDate: "2026-08-30",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T10:30:00Z",
      updatedAt: "2026-01-10T10:30:00Z",
    },

    {
      id: "auction_schedule_020",

      saleNo: 20,

      season: {
        id: "season_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      auctionCenter: {
        id: "auction_center_chattogram",
        code: "CTG",
        name: "Chattogram",
      },

      year: {
        id: "year_2026_2027",
        code: "2026-2027",
        name: "2026-2027",
      },

      saleDate: "2026-09-14",

      saleDay: "Monday",

      buyerPromptDate: "2026-09-06",

      catalogueClosingDate: "2026-09-06",

      comments: null,

      status: {
        code: "SCHEDULED",
        label: "Scheduled",
      },

      isActive: true,

      createdAt: "2026-01-10T10:35:00Z",
      updatedAt: "2026-01-10T10:35:00Z",
    },
  ],

  // =======================================================
  // SUMMARY / COUNTS
  // =======================================================

  summary: {
    totalSchedules: 38,
    scheduled: 37,
    holidays: 1,
    completed: 0,
    cancelled: 0,
  },

  // =======================================================
  // INFORMATION FOOTER
  // =======================================================

  information: {
    buyerPromptDate: {
      title: "Buyer Prompt Date",
      description: "Last date for buyers to submit prompt.",
    },

    catalogueClosingDate: {
      title: "Catalogue Closing Date",
      description: "Last date for submitting catalogue / lots for auction.",
    },
  },

  // =======================================================
  // PERMISSION / ACTION CONFIG
  // =======================================================

  permissions: {
    canCreate: true,
    canView: true,
    canEdit: true,
    canDelete: true,
    canImport: true,
    canExport: true,
  },
};
