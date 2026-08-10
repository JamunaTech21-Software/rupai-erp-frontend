import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import EstateProfile from "./pages/EstateProfile";
import DivisionAndSection from "./pages/DivisionAndSection";
import MapAndGISTracking from "./pages/MapAndGISTracking";
import LandAndLeaseManagement from "./pages/LandAndLeaseManagement";
import FieldOrBlockManagement from "./pages/FieldOrBlockManagement";
import NurseryManagement from "./pages/PlantationManagement/NurseryManagement";
import ReplantingAndGapFilling from "./pages/PlantationManagement/ReplantingAndGapFilling";
import PlantCensus from "./pages/PlantationManagement/PlantCensus";
import BushRegister from "./pages/PlantationManagement/BushRegister";
import FieldPlanting from "./pages/PlantationManagement/FieldPlanting";
import NotFound from "./components/plantationManagementTab/404Page/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        handle: {
          title: "Dashboard",
        },
      },
      // Estate Management
      {
        path: "estate-profile",
        element: <EstateProfile />,
        handle: {
          title: "Estate Profile",
        },
      },
      {
        path: "division-&-section",
        element: <DivisionAndSection />,
        handle: {
          title: "Division & Section",
        },
      },
      {
        path: "field-or-block-management",
        element: <FieldOrBlockManagement />,
        handle: {
          title: "Field/Block Management",
        },
      },

      {
        path: "map-&-gis-tracking",
        element: <MapAndGISTracking />,
        handle: {
          title: "Map & GIS Tracking",
        },
      },
      {
        path: "land-&-lease-management",
        element: <LandAndLeaseManagement />,
        handle: {
          title: "Land & Lease Management",
        },
      },

      // Plantation Management
      {
        path: "nursery-management",
        element: <NurseryManagement />,
        handle: {
          title: "Nursery Management",
        },
      },
      {
        path: "field-planting",
        element: <FieldPlanting />,
        handle: {
          title: "Field Planting",
        },
      },
      {
        path: "replanting-&-gap-filling",
        element: <ReplantingAndGapFilling />,
        handle: {
          title: "Replanting & Gap Filling",
        },
      },
      {
        path: "plant-census",
        element: <PlantCensus />,
        handle: {
          title: "Plant Census",
        },
      },
      {
        path: "bush-register",
        element: <BushRegister />,
        handle: {
          title: "Bush register",
        },
      },

      // User Administration
      {
        path: "user-management",
        element: <UserManagement />,
        handle: {
          title: "User Management",
        },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
