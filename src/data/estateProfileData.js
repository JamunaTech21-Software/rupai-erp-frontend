// src/data/estateProfileData.js

export const estateProfileData = {
  // ===========================
  // Top Navigation Tabs
  // ===========================
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

  // ===========================
  // Estate Basic Information
  // ===========================
  basicInformation: {
    estateName: "Jamuna Tea Estate",
    estateCode: "JTE-001",
    establishedYear: 1998,

    companyOwner: "Jamuna Tea Company Ltd.",

    estateType: "Company Owned",

    estateCategory: "Large Estate",

    address: "Panchagarh Sadar, Panchagarh, Bangladesh",

    policeStation: "Panchagarh Sadar",

    district: "Panchagarh",

    division: "Rangpur",

    country: "Bangladesh",

    zipCode: "5020",

    phone: "+8801712345678",

    email: "info@jamunateaestate.com",

    website: "https://www.jamunateaestate.com",
  },

  // ===========================
  // Estate Images
  // ===========================

  estateImages: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Tea Garden",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      title: "Factory",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
      title: "Main Gate",
    },
  ],

  // ===========================
  // Estate Summary
  // ===========================

  estateSummary: [
    {
      id: 1,
      title: "Total Land Area",
      value: "5250.00 Acre",
      icon: "map",
    },
    {
      id: 2,
      title: "Tea Area",
      value: "4120.00 Acre",
      icon: "leaf",
    },
    {
      id: 3,
      title: "Non Tea Area",
      value: "1130.00 Acre",
      icon: "trees",
    },
    {
      id: 4,
      title: "Total Division",
      value: "6",
      icon: "building",
    },
    {
      id: 5,
      title: "Total Section",
      value: "24",
      icon: "section",
    },
    {
      id: 6,
      title: "Total Field / Block",
      value: "48",
      icon: "field",
    },
    {
      id: 7,
      title: "Total Worker",
      value: "1250",
      icon: "users",
    },
    {
      id: 8,
      title: "Established Year",
      value: "1998",
      icon: "calendar",
    },
  ],
  // ===========================
  // Estate Overview
  // ===========================

  estateOverview: {
    totalLandArea: "5250.00",
    teaArea: "4120.00",
    nonTeaArea: "1130.00",
    totalFieldBlock: "48",
    totalDivision: "6",
    totalSection: "24",
    totalWorker: "1250",
    totalFamily: "980",
  },

  // ===========================
  // Manager Information
  // ===========================

  managerInformation: {
    manager: {
      name: "Md. Rahman Ali",
      designation: "Estate Manager",
      mobile: "+8801711122233",
      email: "manager@jamunateaestate.com",
    },

    assistantManager: {
      name: "Md. Faruk Hossain",
      designation: "Assistant Manager",
      mobile: "+8801713344556",
      email: "asst.manager@jamunateaestate.com",
    },
  },

  // ===========================
  // Facilities
  // ===========================

  facilities: [
    {
      id: 1,
      name: "Factory",
      checked: true,
    },
    {
      id: 2,
      name: "Warehouse",
      checked: true,
    },
    {
      id: 3,
      name: "Staff Quarter",
      checked: true,
    },
    {
      id: 4,
      name: "Hospital / Dispensary",
      checked: true,
    },
    {
      id: 5,
      name: "School",
      checked: true,
    },
    {
      id: 6,
      name: "Playground",
      checked: true,
    },
    {
      id: 7,
      name: "Mosque / Temple",
      checked: true,
    },
    {
      id: 8,
      name: "Electricity",
      checked: true,
    },
    {
      id: 9,
      name: "Water Supply",
      checked: true,
    },
    {
      id: 10,
      name: "Transport",
      checked: true,
    },
    {
      id: 11,
      name: "Canteen",
      checked: true,
    },
    {
      id: 12,
      name: "Club & Library",
      checked: true,
    },
  ],

  // ===========================
  // Geo Location
  // ===========================

  geoLocation: {
    latitude: "26.3417",
    longitude: "88.0008",

    zoom: 15,

    googleMap: "https://maps.google.com",

    address: "Panchagarh Sadar, Panchagarh, Bangladesh",
  },

  // ===========================
  // Description
  // ===========================

  description:
    "Jamuna Tea Estate is one of the largest tea estates in northern Bangladesh. Established in 1998, the estate is situated in Panchagarh district under Rangpur division. The estate produces premium CTC and Orthodox tea while operating modern processing facilities, worker residential areas, schools, healthcare services, warehouses and transport systems.",

  // ===========================
  // Action Buttons
  // ===========================

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
