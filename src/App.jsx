import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import RequireAuth from "./components/layout/RequireAuth";
import PlantationLayout from "./components/plantationManagementTab/PlantationLayout";
import Login from "./pages/Login";

// Every page is its own chunk. They are all fetched shortly after start-up, so opening a page never waits for its code and never flashes a spinner first.
const loaders = [];
function lazyPage(load) {
  loaders.push(load);
  return lazy(load);
}

const Dashboard = lazyPage(() => import("./pages/Dashboard"));
const UserManagement = lazyPage(() => import("./pages/UserAdministration/UserManagement"));
const EstateProfile = lazyPage(() => import("./pages/EstateManagement/EstateProfile"));
const DivisionAndSection = lazyPage(() => import("./pages/EstateManagement/DivisionAndSection"));
const MapAndGISTracking = lazyPage(() => import("./pages/EstateManagement/MapAndGISTracking"));
const LandAndLeaseManagement = lazyPage(() => import("./pages/EstateManagement/LandAndLeaseManagement"));
const FieldOrBlockManagement = lazyPage(() => import("./pages/EstateManagement/FieldOrBlockManagement"));
const NurseryManagement = lazyPage(() => import("./pages/PlantationManagement/NurseryManagement"));
const ReplantingAndGapFilling = lazyPage(() => import("./pages/PlantationManagement/ReplantingAndGapFilling"));
const PlantCensus = lazyPage(() => import("./pages/PlantationManagement/PlantCensus"));
const BushRegister = lazyPage(() => import("./pages/PlantationManagement/BushRegister"));
const FieldPlanting = lazyPage(() => import("./pages/PlantationManagement/FieldPlanting"));
const NotFound = lazyPage(() => import("./components/404Page/NotFound"));
const AddNewContractor = lazyPage(() => import("./pages/HrAndWorkforcedManagement/AddNewContractor"));
const AddNewEmployee = lazyPage(() => import("./pages/HrAndWorkforcedManagement/AddNewEmployee"));
const AddNewWorker = lazyPage(() => import("./pages/HrAndWorkforcedManagement/AddNewWorker"));
const AttendenceAndFaceRecognition = lazyPage(() => import("./pages/HrAndWorkforcedManagement/AttendenceAndFaceRecognition"));
const ContractorManagement = lazyPage(() => import("./pages/HrAndWorkforcedManagement/ContractorManagement"));
const WorkerManagement = lazyPage(() => import("./pages/HrAndWorkforcedManagement/WorkerManagement"));
const LabourAllocation = lazyPage(() => import("./pages/HrAndWorkforcedManagement/LabourAllocation"));
const LabourAllocationEntry = lazyPage(() => import("./pages/HrAndWorkforcedManagement/LabourAllocationEntry"));
const ShiftAndDutyRosterEntryProcess = lazyPage(() => import("./pages/HrAndWorkforcedManagement/ShiftAndDutyRosterEntryProcess"));
const ShiftAndDutyRoster = lazyPage(() => import("./pages/HrAndWorkforcedManagement/ShiftAndDutyRoster"));
const EmployeeManagement = lazyPage(() => import("./pages/HrAndWorkforcedManagement/EmployeeManagement"));
const ProductionEntry = lazyPage(() => import("./pages/FactoryAndManufacturing/ProductionEntry"));
const MasterDataDashboard = lazyPage(() => import("./pages/MasterData/MasterDataDashboard"));
const Season = lazyPage(() => import("./pages/MasterData/Season"));
const TeaGrade = lazyPage(() => import("./pages/MasterData/TeaGrade"));
const AuctionCenters = lazyPage(() => import("./pages/MasterData/AuctionCenters"));
const TeaWarehouse = lazyPage(() => import("./pages/MasterData/TeaWarehouse"));
const AuctionSchedule = lazyPage(() => import("./pages/MasterData/AuctionSchedule"));
const BrokerSalePositionSetup = lazyPage(() => import("./pages/MasterData/BrokerSalePositionSetup"));
const AddNewBroker = lazyPage(() => import("./pages/MasterData/AddNewBroker"));
const TeaType = lazyPage(() => import("./pages/MasterData/TeaType"));
const BuyerSetup = lazyPage(() => import("./pages/MasterData/BuyerSetup"));

setTimeout(() => loaders.forEach((load) => load().catch(() => {})), 500);

// Nothing is shown while a page's code loads (no spinner), so the screen does not flash.
function Page({ children }) {
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  );
}

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <RequireAuth />,
    children: [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Page><Dashboard /></Page>,
        handle: {
          title: "Dashboard",
        },
      },
      // Estate Management
      {
        path: "estate-profile",
        element: <Page><EstateProfile /></Page>,
        handle: {
          title: "Estate Profile",
        },
      },
      {
        path: "division-&-section",
        element: <Page><DivisionAndSection /></Page>,
        handle: {
          title: "Division & Section",
        },
      },
      {
        path: "field-or-block-management",
        element: <Page><FieldOrBlockManagement /></Page>,
        handle: {
          title: "Field/Block Management",
        },
      },

      {
        path: "map-&-gis-tracking",
        element: <Page><MapAndGISTracking /></Page>,
        handle: {
          title: "Map & GIS Tracking",
        },
      },
      {
        path: "land-&-lease-management",
        element: <Page><LandAndLeaseManagement /></Page>,
        handle: {
          title: "Land & Lease Management",
        },
      },

      // Plantation Management: one shared tab bar above all five pages
      {
        element: <PlantationLayout />,
        children: [
        {
          path: "nursery-management",
          element: <Page><NurseryManagement /></Page>,
          handle: {
            title: "Nursery Management",
          },
        },
        {
          path: "field-planting",
          element: <Page><FieldPlanting /></Page>,
          handle: {
            title: "Field Planting",
          },
        },
        {
          path: "replanting-&-gap-filling",
          element: <Page><ReplantingAndGapFilling /></Page>,
          handle: {
            title: "Replanting & Gap Filling",
          },
        },
        {
          path: "plant-census",
          element: <Page><PlantCensus /></Page>,
          handle: {
            title: "Plant Census",
          },
        },
        {
          path: "bush-register",
          element: <Page><BushRegister /></Page>,
          handle: {
            title: "Bush register",
          },
        },
        ],
      },

      // HR AND WORKFORCE MANAGEMENT
      {
        path: "add-new-contractor",
        element: <Page><AddNewContractor /></Page>,
        handle: {
          title: "Add New Contractor",
        },
      },
      {
        path: "add-new-employee",
        element: <Page><AddNewEmployee /></Page>,
        handle: {
          title: "Add New Employee",
        },
      },
      {
        path: "add-new-worker",
        element: <Page><AddNewWorker /></Page>,
        handle: {
          title: "Add New Worker",
        },
      },
      {
        path: "attendance-and-face-recognition",
        element: <Page><AttendenceAndFaceRecognition /></Page>,
        handle: {
          title: "Attendance ( Face  ID)",
        },
      },
      {
        path: "contractor-management",
        element: <Page><ContractorManagement /></Page>,
        handle: {
          title: "Contractor Management",
        },
      },
      {
        path: "worker-management",
        element: <Page><WorkerManagement /></Page>,
        handle: {
          title: "Worker Management",
        },
      },
      {
        path: "labour-allocation",
        element: <Page><LabourAllocation /></Page>,
        handle: {
          title: "Labour Allocation",
        },
      },
      {
        path: "labour-allocation-entry",
        element: <Page><LabourAllocationEntry /></Page>,
        handle: {
          title: "Labour Allocation Entry",
        },
      },
      {
        path: "shift-and-duty-roster-entry-process",
        element: <Page><ShiftAndDutyRosterEntryProcess /></Page>,
        handle: {
          title: "Shift and Duty Roster Process",
        },
      },
      {
        path: "shift-and-duty-roster",
        element: <Page><ShiftAndDutyRoster /></Page>,
        handle: {
          title: "Shift and Duty Roster",
        },
      },
      {
        path: "employee-management",
        element: <Page><EmployeeManagement /></Page>,
        handle: {
          title: "Employee Management",
        },
      },

      // Factory And Manufacturing

      {
        path: "production-entry",
        element: <Page><ProductionEntry /></Page>,
        handle: {
          title: "Production Entry",
        },
      },

      // Master Data Dashboard

      {
        path: "master-data-dashboard",
        element: <Page><MasterDataDashboard /></Page>,
        handle: {
          title: "Master Data Dashboard",
        },
      },

      {
        path: "master-data-season",
        element: <Page><Season /></Page>,
        handle: {
          title: "Season Setup",
        },
      },
      {
        path: "master-data-tea-grade",
        element: <Page><TeaGrade /></Page>,
        handle: {
          title: "Tea Grade",
        },
      },
      {
        path: "master-data-add-new-broker",
        element: <AddNewBroker></AddNewBroker>,
        handle: {
          title: "Add New Broker Setup",
        },
      },
      {
        path: "master-data-brokers-sale-position",
        element: <BrokerSalePositionSetup></BrokerSalePositionSetup>,
        handle: {
          title: "Broker Sale Position Setup",
        },
      },
      {
        path: "master-data-auction-centers",
        element: <AuctionCenters></AuctionCenters>,
        handle: {
          title: "Add New Auction Center",
        },
      },
      {
        path: "master-data-auction-schedule",
        element: <AuctionSchedule></AuctionSchedule>,
        handle: {
          title: "Add New Auction Schedule",
        },
      },
      {
        path: "master-data-tea-warehouse",
        element: <TeaWarehouse></TeaWarehouse>,
        handle: {
          title: "Add New Warehouse",
        },
      },
      {
        path: "master-data-tea-type",
        element: <TeaType></TeaType>,
        handle: {
          title: "Add New Tea Type",
        },
      },
      {
        path: "master-data-buyer-setup",
        element: <BuyerSetup></BuyerSetup>,
        handle: {
          title: "Buyer Setup",
        },
      },
      // User Administration
      {
        path: "user-management",
        element: <Page><UserManagement /></Page>,
        handle: {
          title: "User Management",
        },
      },
    ],
  },
    ],
  },
  {
    path: "*",
    element: <Page><NotFound /></Page>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
