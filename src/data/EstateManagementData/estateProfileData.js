// src/data/EstateManagementData/estateProfileData.js

export const estateProfileData = {
  // =========================================================
  // Top Navigation Tabs
  // =========================================================
  tabs: [
    {
      id: 1,
      title: "Estate Profile",
      path: "/estate-profile",
    },
    {
      id: 2,
      title: "Division & Section",
      path: "/division-&-section",
    },
    {
      id: 3,
      title: "Field / Block Management",
      path: "/field-or-block-management",
    },
    {
      id: 4,
      title: "Map & GIS Tracking",
      path: "/map-&-gis-tracking",
    },
    {
      id: 5,
      title: "Land & Lease Management",
      path: "/land-&-lease-management",
    },
  ],

  // =========================================================
  // Estate Type Options
  // =========================================================
  estateTypes: [
    {
      id: 1,
      value: "company_owned",
      label: "Company Owned",
    },
    {
      id: 2,
      value: "private_estate",
      label: "Private Estate",
    },
    {
      id: 3,
      value: "government_estate",
      label: "Government Estate",
    },
  ],

  // =========================================================
  // Estate Category Options
  // =========================================================
  estateCategories: [
    {
      id: 1,
      value: "large_estate",
      label: "Large Estate",
    },
    {
      id: 2,
      value: "medium_estate",
      label: "Medium Estate",
    },
    {
      id: 3,
      value: "small_estate",
      label: "Small Estate",
    },
  ],

  // =========================================================
  // Estate Basic Information
  // =========================================================
  basicInformation: {
    estateName: "Jamuna Tea Estate",

    estateCode: "JTE-001",

    establishedYear: 1998,

    companyOwner: "Jamuna Tea Company Ltd.",

    // Backend-friendly values
    estateType: "company_owned",

    estateCategory: "large_estate",

    // Location Information
    address: "Panchagarh Sadar, Panchagarh, Bangladesh",

    policeStation: "Panchagarh Sadar",

    district: "Panchagarh",

    division: "Rangpur",

    country: "Bangladesh",

    zipCode: "5020",

    // Contact Information
    phone: "+8801712345678",

    email: "info@jamunateaestate.com",

    website: "https://www.jamunateaestate.com",
  },

  // =========================================================
  // Estate Overview
  // =========================================================
  estateOverview: [
    {
      id: 1,
      key: "totalLandArea",
      title: "Total Land Area",
      unit: "Acre",
      icon: "map",
    },
    {
      id: 2,
      key: "teaArea",
      title: "Tea Area",
      unit: "Acre",
      icon: "leaf",
    },
    {
      id: 3,
      key: "nonTeaArea",
      title: "Non Tea Area",
      unit: "Acre",
      icon: "trees",
    },
    {
      id: 4,
      key: "totalFieldBlock",
      title: "Total Field / Block",
      unit: "",
      icon: "field",
    },
    {
      id: 5,
      key: "totalDivision",
      title: "Total Division",
      unit: "",
      icon: "building",
    },
    {
      id: 6,
      key: "totalSection",
      title: "Total Section",
      unit: "",
      icon: "section",
    },
    {
      id: 7,
      key: "totalWorker",
      title: "Total Worker",
      unit: "",
      icon: "users",
    },
    {
      id: 8,
      key: "totalFamily",
      title: "Total Family",
      unit: "",
      icon: "users",
    },
  ],

  // =========================================================
  // Manager / In-charge Information
  // =========================================================
  // =========================================================
  // Manager / In-charge Information
  // =========================================================
  managerInformation: [
    {
      id: 1,
      type: "estate_manager",
      title: "Estate Manager",
      designation: "Estate Manager",
    },
    {
      id: 2,
      type: "assistant_manager",
      title: "Assistant Manager",
      designation: "Assistant Manager",
    },
  ],

  // =========================================================
  // Facility Options
  // =========================================================
  // System-এর available facility list
  facilityOptions: [
    {
      id: 1,
      key: "factory",
      value: "factory",
      label: "Factory",
    },
    {
      id: 2,
      key: "warehouse",
      value: "warehouse",
      label: "Warehouse",
    },
    {
      id: 3,
      key: "staffQuarter",
      value: "staff_quarter",
      label: "Staff Quarter",
    },
    {
      id: 4,
      key: "hospital",
      value: "hospital",
      label: "Hospital / Dispensary",
    },
    {
      id: 5,
      key: "school",
      value: "school",
      label: "School",
    },
    {
      id: 6,
      key: "playground",
      value: "playground",
      label: "Playground",
    },
    {
      id: 7,
      key: "religiousPlace",
      value: "religious_place",
      label: "Mosque / Temple",
    },
    {
      id: 8,
      key: "electricity",
      value: "electricity",
      label: "Electricity",
    },
    {
      id: 9,
      key: "waterSupply",
      value: "water_supply",
      label: "Water Supply",
    },
    {
      id: 10,
      key: "transport",
      value: "transport",
      label: "Transport",
    },
    {
      id: 11,
      key: "canteen",
      value: "canteen",
      label: "Canteen",
    },
    {
      id: 12,
      key: "clubLibrary",
      value: "club_library",
      label: "Club & Library",
    },
  ],

  // =========================================================
  // Selected Facilities
  // =========================================================
  // এই Estate-এ বর্তমানে যেসব facility available
  selectedFacilities: [
    "factory",
    "warehouse",
    "staff_quarter",
    "hospital",
    "school",
    "playground",
    "religious_place",
    "electricity",
    "water_supply",
    "transport",
    "canteen",
    "club_library",
  ],

  // =========================================================
  // Geo Location
  // =========================================================
  geoLocation: {
    latitude: 26.3417,

    longitude: 88.0008,

    zoom: 15,

    address: "Panchagarh Sadar, Panchagarh, Bangladesh",
  },

  // =========================================================
  // Description
  // =========================================================
  description:
    "Jamuna Tea Estate is one of the largest tea estates in northern Bangladesh. Established in 1998, the estate is situated in Panchagarh district under Rangpur division. The estate produces premium CTC and Orthodox tea while operating modern processing facilities, worker residential areas, schools, healthcare services, warehouses and transport systems.",

  // =========================================================
  // Footer Actions
  // =========================================================
  actions: [
    {
      id: 1,
      label: "Cancel",
      type: "cancel",
    },
    {
      id: 2,
      label: "Reset",
      type: "reset",
    },
    {
      id: 3,
      label: "Save",
      type: "submit",
    },
  ],
};
