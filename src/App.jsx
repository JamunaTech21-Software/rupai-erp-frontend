import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import EstateProfile from "./pages/EstateProfile";
import DivisionAndSection from "./pages/DivisionAndSection";
import MapAndGISTracking from "./pages/MapAndGISTracking";
import LandAndLeaseManagement from "./pages/LandAndLeaseManagement";
import FixedOrBlockManagement from "./pages/FixedOrBlockManagement";

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
        path: "fixed-or-block-management",
        element: <FixedOrBlockManagement />,
        handle: {
          title: "Fixed/Block Management",
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
