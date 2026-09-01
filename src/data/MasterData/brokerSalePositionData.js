const BrokerSalePositionData = {
  setup: {
    title: "Brokers Sale Position Setup",

    fields: [
      {
        name: "auctionCenter",
        label: "Auction Center",
        placeholder: "--- Select Auction Center ---",
        required: true,
        options: [
          { value: "chattogram", label: "Chattogram" },
          { value: "sreemangal", label: "Sreemangal" },
          { value: "panchagarh", label: "Panchagarh" },
        ],
      },

      {
        name: "saleNo",
        label: "Sale No",
        placeholder: "--- Select Sale No ---",
        required: true,
        options: [
          { value: "01", label: "01" },
          { value: "02", label: "02" },
          { value: "03", label: "03" },
        ],
      },

      {
        name: "broker1",
        label: "1st Brokers",
        placeholder: "--- Select 1st Brokers ---",
        required: true,
        options: [
          {
            value: "national",
            label: "National Brokers Limited",
          },
          {
            value: "purba-bangla",
            label: "Purba Bangla Brokers Limited",
          },
          {
            value: "ks-brokers",
            label: "K.S Brokers Limited",
          },
          {
            value: "planters",
            label: "Planters Brokers Limited",
          },
          {
            value: "unity",
            label: "Unity Brokers Limited",
          },
          {
            value: "progressive",
            label: "Progressive Brokers Ltd",
          },
          {
            value: "produce",
            label: "Produce Brokers Limited",
          },
        ],
      },

      {
        name: "broker2",
        label: "2nd Brokers",
        placeholder: "--- Select 2nd Brokers ---",
        required: true,
        options: [
          {
            value: "national",
            label: "National Brokers Limited",
          },
          {
            value: "purba-bangla",
            label: "Purba Bangla Brokers Limited",
          },
          {
            value: "ks-brokers",
            label: "K.S Brokers Limited",
          },
          {
            value: "planters",
            label: "Planters Brokers Limited",
          },
          {
            value: "unity",
            label: "Unity Brokers Limited",
          },
          {
            value: "progressive",
            label: "Progressive Brokers Ltd",
          },
          {
            value: "produce",
            label: "Produce Brokers Limited",
          },
        ],
      },

      {
        name: "broker3",
        label: "3rd Brokers",
        placeholder: "--- Select 3rd Brokers ---",
        required: true,
        options: [
          {
            value: "national",
            label: "National Brokers Limited",
          },
          {
            value: "purba-bangla",
            label: "Purba Bangla Brokers Limited",
          },
          {
            value: "ks-brokers",
            label: "K.S Brokers Limited",
          },
          {
            value: "planters",
            label: "Planters Brokers Limited",
          },
          {
            value: "unity",
            label: "Unity Brokers Limited",
          },
          {
            value: "progressive",
            label: "Progressive Brokers Ltd",
          },
          {
            value: "produce",
            label: "Produce Brokers Limited",
          },
        ],
      },

      {
        name: "broker4",
        label: "4th Brokers",
        placeholder: "--- Select 4th Brokers ---",
        required: true,
        options: [
          {
            value: "national",
            label: "National Brokers Limited",
          },
          {
            value: "purba-bangla",
            label: "Purba Bangla Brokers Limited",
          },
          {
            value: "ks-brokers",
            label: "K.S Brokers Limited",
          },
          {
            value: "planters",
            label: "Planters Brokers Limited",
          },
          {
            value: "unity",
            label: "Unity Brokers Limited",
          },
          {
            value: "progressive",
            label: "Progressive Brokers Ltd",
          },
          {
            value: "produce",
            label: "Produce Brokers Limited",
          },
        ],
      },

      {
        name: "broker5",
        label: "5th Brokers",
        placeholder: "--- Select 5th Brokers ---",
        required: true,
        options: [
          {
            value: "national",
            label: "National Brokers Limited",
          },
          {
            value: "purba-bangla",
            label: "Purba Bangla Brokers Limited",
          },
          {
            value: "ks-brokers",
            label: "K.S Brokers Limited",
          },
          {
            value: "planters",
            label: "Planters Brokers Limited",
          },
          {
            value: "unity",
            label: "Unity Brokers Limited",
          },
          {
            value: "progressive",
            label: "Progressive Brokers Ltd",
          },
          {
            value: "produce",
            label: "Produce Brokers Limited",
          },
        ],
      },

      {
        name: "broker6",
        label: "6th Brokers",
        placeholder: "--- Select 6th Brokers ---",
        required: true,
        options: [
          {
            value: "national",
            label: "National Brokers Limited",
          },
          {
            value: "purba-bangla",
            label: "Purba Bangla Brokers Limited",
          },
          {
            value: "ks-brokers",
            label: "K.S Brokers Limited",
          },
          {
            value: "planters",
            label: "Planters Brokers Limited",
          },
          {
            value: "unity",
            label: "Unity Brokers Limited",
          },
          {
            value: "progressive",
            label: "Progressive Brokers Ltd",
          },
          {
            value: "produce",
            label: "Produce Brokers Limited",
          },
        ],
      },

      {
        name: "broker7",
        label: "7th Brokers",
        placeholder: "--- Select 7th Brokers ---",
        required: true,
        options: [
          {
            value: "national",
            label: "National Brokers Limited",
          },
          {
            value: "purba-bangla",
            label: "Purba Bangla Brokers Limited",
          },
          {
            value: "ks-brokers",
            label: "K.S Brokers Limited",
          },
          {
            value: "planters",
            label: "Planters Brokers Limited",
          },
          {
            value: "unity",
            label: "Unity Brokers Limited",
          },
          {
            value: "progressive",
            label: "Progressive Brokers Ltd",
          },
          {
            value: "produce",
            label: "Produce Brokers Limited",
          },
        ],
      },
    ],

    buttons: {
      clear: "Clear",
      save: "Save Position",
    },

    mandatoryText: "* Fields are mandatory",
  },
  list: {
    title: "Brokers Sale Position List",

    filters: [
      {
        name: "auctionCenter",
        label: "Auction Center",
        placeholder: "All",
        options: [
          { value: "all", label: "All" },
          { value: "chattogram", label: "Chattogram" },
          { value: "sreemangal", label: "Sreemangal" },
          { value: "panchagarh", label: "Panchagarh" },
        ],
      },

      {
        name: "season",
        label: "Season",
        placeholder: "2026-2027",
        options: [
          { value: "2026-2027", label: "2026-2027" },
          { value: "2025-2026", label: "2025-2026" },
        ],
      },

      {
        name: "saleNo",
        label: "Sale No",
        placeholder: "All",
        options: [
          { value: "all", label: "All" },
          { value: "01", label: "01" },
          { value: "02", label: "02" },
          { value: "03", label: "03" },
        ],
      },

      {
        name: "status",
        label: "Status",
        placeholder: "All",
        options: [
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ],
      },
    ],

    buttons: {
      export: "Export",
      addNew: "Add New",
      filter: "Filter",
    },

    tableHeaders: [
      "SL",
      "Auction Center",
      "Sale No",
      "1st Brokers",
      "2nd Brokers",
      "3rd Brokers",
      "4th Brokers",
      "5th Brokers",
      "6th Brokers",
      "7th Brokers",
      "Action",
    ],

    positions: [
      {
        id: 1,
        auctionCenter: "Chattogram",
        saleNo: "01",
        season: "2026-2027",
        status: "Active",
        brokers: [
          "National Brokers Limited",
          "Purba Bangla Brokers Limited",
          "K.S Brokers Limited",
          "Planters Brokers Limited",
          "Unity Brokers Limited",
          "Progressive Brokers Ltd",
          "Produce Brokers Limited",
        ],
      },

      {
        id: 2,
        auctionCenter: "Chattogram",
        saleNo: "02",
        season: "2026-2027",
        status: "Active",
        brokers: [
          "National Brokers Limited",
          "Purba Bangla Brokers Limited",
          "K.S Brokers Limited",
          "Planters Brokers Limited",
          "Unity Brokers Limited",
          "Progressive Brokers Ltd",
          "Produce Brokers Limited",
        ],
      },

      {
        id: 3,
        auctionCenter: "Chattogram",
        saleNo: "03",
        season: "2026-2027",
        status: "Active",
        brokers: [
          "National Brokers Limited",
          "Purba Bangla Brokers Limited",
          "K.S Brokers Limited",
          "Planters Brokers Limited",
          "Unity Brokers Limited",
          "Progressive Brokers Ltd",
          "Produce Brokers Limited",
        ],
      },

      {
        id: 4,
        auctionCenter: "Sreemangal",
        saleNo: "01",
        season: "2026-2027",
        status: "Active",
        brokers: [
          "National Brokers Limited",
          "Purba Bangla Brokers Limited",
          "K.S Brokers Limited",
          "Planters Brokers Limited",
          "Unity Brokers Limited",
          "Progressive Brokers Ltd",
          "Produce Brokers Limited",
        ],
      },

      {
        id: 5,
        auctionCenter: "Sreemangal",
        saleNo: "02",
        season: "2026-2027",
        status: "Active",
        brokers: [
          "National Brokers Limited",
          "Purba Bangla Brokers Limited",
          "K.S Brokers Limited",
          "Planters Brokers Limited",
          "Unity Brokers Limited",
          "Progressive Brokers Ltd",
          "Produce Brokers Limited",
        ],
      },

      {
        id: 6,
        auctionCenter: "Panchagarh",
        saleNo: "01",
        season: "2026-2027",
        status: "Active",
        brokers: [
          "National Brokers Limited",
          "Purba Bangla Brokers Limited",
          "K.S Brokers Limited",
          "Planters Brokers Limited",
          "Unity Brokers Limited",
          "Progressive Brokers Ltd",
          "Produce Brokers Limited",
        ],
      },

      {
        id: 7,
        auctionCenter: "Panchagarh",
        saleNo: "02",
        season: "2026-2027",
        status: "Active",
        brokers: [
          "National Brokers Limited",
          "Purba Bangla Brokers Limited",
          "K.S Brokers Limited",
          "Planters Brokers Limited",
          "Unity Brokers Limited",
          "Progressive Brokers Ltd",
          "Produce Brokers Limited",
        ],
      },
    ],

    pagination: {
      entriesPerPage: 10,
    },
  },
};

export default BrokerSalePositionData;
