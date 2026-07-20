import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import EstateList from "./pages/EstateList";
import AddEstate from "./pages/AddEstate";
import UserManagement from "./pages/UserManagement";
// import UserMngAddUser from "./components/UserMngAddUser";

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
      {
        path: "estates",
        element: <EstateList />,
        handle: {
          title: "Estate List",
        },
      },
      {
        path: "add-estate",
        element: <AddEstate />,
        handle: {
          title: "Add Estate",
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
