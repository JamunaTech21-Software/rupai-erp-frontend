import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import RequireAuth from "./components/layout/RequireAuth";
import Login from "./pages/Login";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserManagement = lazy(() => import("./pages/UserAdministration/UserManagement"));
const EstateProfile = lazy(() => import("./pages/EstateManagement/EstateProfile"));
const DivisionAndSection = lazy(() => import("./pages/EstateManagement/DivisionAndSection"));
const MapAndGISTracking = lazy(() => import("./pages/EstateManagement/MapAndGISTracking"));
const LandAndLeaseManagement = lazy(() => import("./pages/EstateManagement/LandAndLeaseManagement"));
const FieldOrBlockManagement = lazy(() => import("./pages/EstateManagement/FieldOrBlockManagement"));
const NurseryManagement = lazy(() => import("./pages/PlantationManagement/NurseryManagement"));
const ReplantingAndGapFilling = lazy(() => import("./pages/PlantationManagement/ReplantingAndGapFilling"));
const PlantCensus = lazy(() => import("./pages/PlantationManagement/PlantCensus"));
const BushRegister = lazy(() => import("./pages/PlantationManagement/BushRegister"));
const FieldPlanting = lazy(() => import("./pages/PlantationManagement/FieldPlanting"));
const NotFound = lazy(() => import("./components/404Page/NotFound"));
const AddNewContractor = lazy(() => import("./pages/HrAndWorkforcedManagement/AddNewContractor"));
const AddNewEmployee = lazy(() => import("./pages/HrAndWorkforcedManagement/AddNewEmployee"));
const AddNewWorker = lazy(() => import("./pages/HrAndWorkforcedManagement/AddNewWorker"));
const AttendenceAndFaceRecognition = lazy(() => import("./pages/HrAndWorkforcedManagement/AttendenceAndFaceRecognition"));
const ContractorManagement = lazy(() => import("./pages/HrAndWorkforcedManagement/ContractorManagement"));
const WorkerManagement = lazy(() => import("./pages/HrAndWorkforcedManagement/WorkerManagement"));
const LabourAllocation = lazy(() => import("./pages/HrAndWorkforcedManagement/LabourAllocation"));
const LabourAllocationEntry = lazy(() => import("./pages/HrAndWorkforcedManagement/LabourAllocationEntry"));
const ShiftAndDutyRosterEntryProcess = lazy(() => import("./pages/HrAndWorkforcedManagement/ShiftAndDutyRosterEntryProcess"));
const ShiftAndDutyRoster = lazy(() => import("./pages/HrAndWorkforcedManagement/ShiftAndDutyRoster"));
const EmployeeManagement = lazy(() => import("./pages/HrAndWorkforcedManagement/EmployeeManagement"));
const ProductionEntry = lazy(() => import("./pages/FactoryAndManufacturing/ProductionEntry"));
const MasterDataDashboard = lazy(() => import("./pages/MasterData/MasterDataDashboard"));
const Season = lazy(() => import("./pages/MasterData/Season"));
const TeaGrade = lazy(() => import("./pages/MasterData/TeaGrade"));
const AuctionCenters = lazy(() => import("./pages/MasterData/AuctionCenters"));
const TeaWarehouse = lazy(() => import("./pages/MasterData/TeaWarehouse"));
const AuctionSchedule = lazy(() => import("./pages/MasterData/AuctionSchedule"));
const BrokerSalePositionSetup = lazy(() => import("./pages/MasterData/BrokerSalePositionSetup"));
const AddNewBroker = lazy(() => import("./pages/MasterData/AddNewBroker"));
const TeaType = lazy(() => import("./pages/MasterData/TeaType"));
const BuyerSetup = lazy(() => import("./pages/MasterData/BuyerSetup"));

// Shown while a page's code is loading.
function Page({ children }) {
  return (
    <Suspense
      fallback={
        <div className='flex h-64 items-center justify-center' role='status' aria-label='Loading'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary-muted border-t-primary' />
        </div>
      }
    >
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

      // Plantation Management
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
