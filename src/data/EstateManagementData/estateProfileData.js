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
      value: 5250,
      unit: "Acre",
      icon: "map",
    },
    {
      id: 2,
      key: "teaArea",
      title: "Tea Area",
      value: 4120,
      unit: "Acre",
      icon: "leaf",
    },
    {
      id: 3,
      key: "nonTeaArea",
      title: "Non Tea Area",
      value: 1130,
      unit: "Acre",
      icon: "trees",
    },
    {
      id: 4,
      key: "totalFieldBlock",
      title: "Total Field / Block",
      value: 48,
      unit: "",
      icon: "field",
    },
    {
      id: 5,
      key: "totalDivision",
      title: "Total Division",
      value: 6,
      unit: "",
      icon: "building",
    },
    {
      id: 6,
      key: "totalSection",
      title: "Total Section",
      value: 24,
      unit: "",
      icon: "section",
    },
    {
      id: 7,
      key: "totalWorker",
      title: "Total Worker",
      value: 1250,
      unit: "",
      icon: "users",
    },
    {
      id: 8,
      key: "totalFamily",
      title: "Total Family",
      value: 980,
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
      name: "Md. Rahman Ali",
      designation: "Estate Manager",
      mobile: "+8801711122233",
      email: "manager@jamunateaestate.com",
    },
    {
      id: 2,
      type: "assistant_manager",
      title: "Assistant Manager",
      name: "Md. Faruk Hossain",
      designation: "Assistant Manager",
      mobile: "+8801713344556",
      email: "asst.manager@jamunateaestate.com",
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
  // Estate Images
  // =========================================================
  estateImages: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Tea Garden",
      type: "tea_garden",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      title: "Factory",
      type: "factory",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
      title: "Main Gate",
      type: "main_gate",
    },
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
