import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import EstateList from "./pages/EstateList";
import AddEstate from "./pages/AddEstate";

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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
