const auctionCenterData = {
  // =====================================================
  // FORM CONFIGURATION
  // =====================================================

  form: {
    title: "Auction Center Information",

    fields: [
      {
        name: "centerCode",
        label: "Center Code",
        type: "text",
        placeholder: "Enter center code",
        required: true,
      },
      {
        name: "centerName",
        label: "Center Name",
        type: "text",
        placeholder: "Enter center name",
        required: true,
      },
      {
        name: "shortName",
        label: "Short Name",
        type: "text",
        placeholder: "Enter short name",
        required: false,
      },
      {
        name: "address",
        label: "Address",
        type: "textarea",
        placeholder: "Enter auction center address",
        required: true,
        colSpan: 2,
      },
      {
        name: "cityDistrict",
        label: "City / District",
        type: "select",
        placeholder: "Select city / district",
        required: true,
      },
      {
        name: "division",
        label: "Division",
        type: "select",
        placeholder: "Select division",
        required: true,
      },
      {
        name: "contactPerson",
        label: "Contact Person",
        type: "text",
        placeholder: "Enter contact person",
        required: false,
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Enter phone number",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email address",
        required: false,
      },
      {
        name: "auctionDays",
        label: "Auction Day(s)",
        type: "multi-select",
        placeholder: "Select auction days",
        required: true,
        colSpan: 2,
      },
      {
        name: "auctionStartTime",
        label: "Auction Start Time",
        type: "time",
        placeholder: "",
        required: true,
      },
      {
        name: "timeZone",
        label: "Time Zone",
        type: "select",
        placeholder: "Select time zone",
        required: false,
      },
      {
        name: "currency",
        label: "Currency",
        type: "select",
        placeholder: "Select currency",
        required: false,
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "Select status",
        required: true,
      },
      {
        name: "managedBy",
        label: "Managed By",
        type: "select",
        placeholder: "Select managing organization",
        required: true,
        colSpan: 2,
      },
      {
        name: "regulatoryAuthority",
        label: "Regulatory Authority",
        type: "select",
        placeholder: "Select regulatory authority",
        required: true,
        colSpan: 2,
      },
      {
        name: "establishedOn",
        label: "Established On",
        type: "date",
        placeholder: "",
        required: false,
      },
      {
        name: "remarks",
        label: "Remarks (Optional)",
        type: "textarea",
        placeholder: "Enter remarks",
        required: false,
      },
    ],

    // =====================================================
    // DROPDOWN OPTIONS
    // =====================================================

    cityDistrictOptions: [
      {
        value: "chattogram",
        label: "Chattogram",
      },
      {
        value: "sreemangal",
        label: "Sreemangal",
      },
      {
        value: "panchagarh",
        label: "Panchagarh",
      },
      {
        value: "sylhet",
        label: "Sylhet",
      },
    ],

    divisionOptions: [
      {
        value: "chattogram",
        label: "Chattogram",
      },
      {
        value: "sylhet",
        label: "Sylhet",
      },
      {
        value: "rangpur",
        label: "Rangpur",
      },
      {
        value: "dhaka",
        label: "Dhaka",
      },
    ],

    auctionDayOptions: [
      {
        value: "sunday",
        label: "Sunday",
      },
      {
        value: "monday",
        label: "Monday",
      },
      {
        value: "tuesday",
        label: "Tuesday",
      },
      {
        value: "wednesday",
        label: "Wednesday",
      },
      {
        value: "thursday",
        label: "Thursday",
      },
      {
        value: "friday",
        label: "Friday",
      },
      {
        value: "saturday",
        label: "Saturday",
      },
    ],

    timeZoneOptions: [
      {
        value: "gmt6",
        label: "(GMT+06:00) Dhaka",
      },
    ],

    currencyOptions: [
      {
        value: "bdt",
        label: "BDT (Bangladeshi Taka)",
      },
      {
        value: "usd",
        label: "USD (US Dollar)",
      },
    ],

    statusOptions: [
      {
        value: "active",
        label: "Active",
      },
      {
        value: "inactive",
        label: "Inactive",
      },
    ],

    managedByOptions: [
      {
        value: "ttab",
        label: "Tea Traders Association of Bangladesh (TTAB)",
      },
      {
        value: "small-tea-garden",
        label:
          "Small Tea Garden Owners & Tea Traders Association of Bangladesh",
      },
    ],

    regulatoryAuthorityOptions: [
      {
        value: "bangladesh-tea-board",
        label: "Bangladesh Tea Board",
      },
    ],

    // =====================================================
    // BUTTONS
    // =====================================================

    buttons: {
      cancel: "Cancel",
      save: "Save Auction Center",
    },
  },

  // =====================================================
  // SELECTED / SAMPLE AUCTION CENTER
  // =====================================================

  selectedCenter: {
    centerCode: "AC-003",
    centerName: "Chattogram Tea Auction Centre",
    shortName: "CTAC",

    address: "Tea Auction Complex, Agrabad, Chattogram-4100, Bangladesh.",

    cityDistrict: "Chattogram",
    division: "Chattogram",

    contactPerson: "Mr. Abdul Karim",
    phone: "+880 31 251 0501",
    email: "ctac@teaboard.gov.bd",

    auctionDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],

    auctionStartTime: "10:30 AM",

    timeZone: "(GMT+06:00) Dhaka",

    currency: "BDT (Bangladeshi Taka)",

    managedBy: "Tea Traders Association of Bangladesh (TTAB)",

    regulatoryAuthority: "Bangladesh Tea Board",

    status: "Active",

    establishedOn: "1958-07-01",

    remarks: "",
  },

  // =====================================================
  // SUMMARY CONFIGURATION
  // =====================================================

  centerSummary: {
    title: "Center Summary",

    items: [
      {
        id: 1,
        label: "Center Code",
        value: "AC-001",
      },
      {
        id: 2,
        label: "Center Name",
        value: "Sylhet Tea Auction Center",
      },
      {
        id: 3,
        label: "Short Name",
        value: "STAC",
      },
      {
        id: 4,
        label: "Address",
        value: "Airport Road, Sylhet",
      },
      {
        id: 5,
        label: "City / District",
        value: "Sylhet",
      },
      {
        id: 6,
        label: "Division",
        value: "Sylhet",
      },
      {
        id: 7,
        label: "Contact Person",
        value: "Abdul Karim",
      },
      {
        id: 8,
        label: "Phone",
        value: "+880 1712-345678",
      },
      {
        id: 9,
        label: "Email",
        value: "info@sylhetauction.com",
      },
      {
        id: 10,
        label: "Auction Days",
        value: "Monday, Wednesday",
      },
      {
        id: 11,
        label: "Auction Start",
        value: "09:00 AM",
      },
      {
        id: 12,
        label: "Time Zone",
        value: "Asia/Dhaka",
      },
      {
        id: 13,
        label: "Currency",
        value: "BDT",
      },
      {
        id: 14,
        label: "Status",
        value: "Active",
      },
      {
        id: 15,
        label: "Managed By",
        value: "Bangladesh Tea Board",
      },
      {
        id: 16,
        label: "Regulatory Authority",
        value: "Bangladesh Tea Board",
      },
      {
        id: 17,
        label: "Established On",
        value: "1995-06-15",
      },
    ],
  },

  // =====================================================
  // OTHER AUCTION CENTERS
  // =====================================================

  otherCenters: {
    title: "Other Auction Centers",

    viewAllLabel: "View All",

    tableHeaders: [
      {
        key: "centerCode",
        label: "Code",
      },
      {
        key: "centerName",
        label: "Center Name",
      },
      {
        key: "city",
        label: "City",
      },
      {
        key: "managedBy",
        label: "Managed By",
      },
      {
        key: "regulatoryAuthority",
        label: "Regulatory Authority",
      },
      {
        key: "status",
        label: "Status",
      },
    ],

    data: [
      {
        id: 1,
        centerCode: "AC-001",
        centerName: "Sreemangal Tea Auction Centre",
        city: "Sreemangal",
        managedBy: "TTAB",
        regulatoryAuthority: "Bangladesh Tea Board",
        status: "Active",
      },
      {
        id: 2,
        centerCode: "AC-002",
        centerName: "Panchagarh Tea Auction Centre",
        city: "Panchagarh",
        managedBy:
          "Small Tea Garden Owners & Tea Traders Association of Bangladesh",
        regulatoryAuthority: "Bangladesh Tea Board",
        status: "Active",
      },
      {
        id: 3,
        centerCode: "AC-004",
        centerName: "Sylhet Tea Auction Centre",
        city: "Sylhet",
        managedBy: "TTAB",
        regulatoryAuthority: "Bangladesh Tea Board",
        status: "Active",
      },
      {
        id: 4,
        centerCode: "AC-005",
        centerName: "Bangladesh Small Tea Auction Centre",
        city: "Sreemangal",
        managedBy: "TTAB",
        regulatoryAuthority: "Bangladesh Tea Board",
        status: "Active",
      },
    ],
  },

  // =====================================================
  // PAGE SETTINGS
  // =====================================================

  page: {
    mandatoryText: "* Fields are mandatory",

    pagination: {
      currentPage: 1,
      perPage: 10,
      totalEntries: 4,
    },
  },
};

export default auctionCenterData;
