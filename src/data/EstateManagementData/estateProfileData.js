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
  // Estate Profile Form Options
  // =========================================================

  // Estate Type Options
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

  // Estate Category Options
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
  // Estate Images
  // =========================================================

  estateImages: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Tea Garden",
      type: "tea_garden",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      title: "Factory",
      type: "factory",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156",
      title: "Main Gate",
      type: "main_gate",
    },
  ],

  // =========================================================
  // Estate Summary
  // =========================================================

  estateSummary: [
    {
      id: 1,
      key: "totalLandArea",
      title: "Total Land Area",
      value: "5250.00 Acre",
      icon: "map",
    },
    {
      id: 2,
      key: "teaArea",
      title: "Tea Area",
      value: "4120.00 Acre",
      icon: "leaf",
    },
    {
      id: 3,
      key: "nonTeaArea",
      title: "Non Tea Area",
      value: "1130.00 Acre",
      icon: "trees",
    },
    {
      id: 4,
      key: "totalDivision",
      title: "Total Division",
      value: "6",
      icon: "building",
    },
    {
      id: 5,
      key: "totalSection",
      title: "Total Section",
      value: "24",
      icon: "section",
    },
    {
      id: 6,
      key: "totalFieldBlock",
      title: "Total Field / Block",
      value: "48",
      icon: "field",
    },
    {
      id: 7,
      key: "totalWorker",
      title: "Total Worker",
      value: "1250",
      icon: "users",
    },
    {
      id: 8,
      key: "establishedYear",
      title: "Established Year",
      value: "1998",
      icon: "calendar",
    },
  ],

  // =========================================================
  // Estate Overview
  // =========================================================

  estateOverview: {
    totalLandArea: 5250.0,

    teaArea: 4120.0,

    nonTeaArea: 1130.0,

    totalFieldBlock: 48,

    totalDivision: 6,

    totalSection: 24,

    totalWorker: 1250,

    totalFamily: 980,
  },

  // =========================================================
  // Manager / In-charge Information
  // =========================================================

  managerInformation: {
    manager: {
      id: 1,
      name: "Md. Rahman Ali",
      designation: "Estate Manager",
      mobile: "+8801711122233",
      email: "manager@jamunateaestate.com",
    },

    assistantManager: {
      id: 2,
      name: "Md. Faruk Hossain",
      designation: "Assistant Manager",
      mobile: "+8801713344556",
      email: "asst.manager@jamunateaestate.com",
    },
  },

  // =========================================================
  // Facility Options
  // =========================================================
  // এগুলো system-এর available facilities.
  // পরে backend থেকেও এই list আসতে পারবে।

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
  // Estate Facilities
  // =========================================================
  // কোন facility এই estate-এ available সেটা এখানে থাকবে।

  facilities: [
    {
      id: 1,
      key: "factory",
      name: "Factory",
      checked: true,
    },
    {
      id: 2,
      key: "warehouse",
      name: "Warehouse",
      checked: true,
    },
    {
      id: 3,
      key: "staffQuarter",
      name: "Staff Quarter",
      checked: true,
    },
    {
      id: 4,
      key: "hospital",
      name: "Hospital / Dispensary",
      checked: true,
    },
    {
      id: 5,
      key: "school",
      name: "School",
      checked: true,
    },
    {
      id: 6,
      key: "playground",
      name: "Playground",
      checked: true,
    },
    {
      id: 7,
      key: "religiousPlace",
      name: "Mosque / Temple",
      checked: true,
    },
    {
      id: 8,
      key: "electricity",
      name: "Electricity",
      checked: true,
    },
    {
      id: 9,
      key: "waterSupply",
      name: "Water Supply",
      checked: true,
    },
    {
      id: 10,
      key: "transport",
      name: "Transport",
      checked: true,
    },
    {
      id: 11,
      key: "canteen",
      name: "Canteen",
      checked: true,
    },
    {
      id: 12,
      key: "clubLibrary",
      name: "Club & Library",
      checked: true,
    },
  ],

  // =========================================================
  // Geo Location
  // =========================================================

  geoLocation: {
    latitude: 26.3417,

    longitude: 88.0008,

    zoom: 15,

    googleMap: "https://maps.google.com",

    address: "Panchagarh Sadar, Panchagarh, Bangladesh",
  },

  // =========================================================
  // Description
  // =========================================================

  description:
    "Jamuna Tea Estate is one of the largest tea estates in northern Bangladesh. Established in 1998, the estate is situated in Panchagarh district under Rangpur division. The estate produces premium CTC and Orthodox tea while operating modern processing facilities, worker residential areas, schools, healthcare services, warehouses and transport systems.",

  // =========================================================
  // Action Buttons
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