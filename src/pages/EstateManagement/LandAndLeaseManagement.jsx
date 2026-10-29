import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import L from "leaflet";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import { landLeaseManagementData } from "../../data/EstateManagementData/landAndLeaseManagementData";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import MapResizer from "../../components/common/MapResizer";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  Popup,
  ZoomControl,
} from "react-leaflet";

import {
  Plus,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  Trash2,
  X,
  RotateCcw,
  Save,
  Layers3,
  FileText,
  CreditCard,
  UserRound,
} from "lucide-react";

// ============================================================
// LEAFLET MARKER
// ============================================================

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const blueMarker = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// ============================================================
// COMPONENT
// ============================================================

const PER_PAGE = 10;
const DASH = "-";

// Search boxes wait a moment after typing before asking the server.
const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const labelOf = (list, value) => list.find((item) => item.value === value)?.label ?? value ?? DASH;
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);
// 2015-12-31 -> 31/12/2015 (no timezone shift: the text is rearranged, not parsed as a date)
const dmy = (iso) => (iso ? iso.slice(0, 10).split("-").reverse().join("/") : DASH);
const dmyStamp = (stamp) => (stamp ? new Date(stamp).toLocaleDateString("en-GB") : DASH);
const money = (value) =>
  value === null || value === undefined || value === ""
    ? DASH
    : Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const blank = (value) => value ?? "";

const LAND_FIELDS = [
  "estate", "landLeaseType", "landCategory", "landLeaseName", "surveyNo", "plotNo", "mouza", "jlNo", "recordType",
  "totalArea", "usableArea", "nonUsableArea", "location", "gpsArea", "latitude", "longitude", "acquisitionDate",
  "startDate", "endDate", "leaseTerm", "rentAmount", "rentPerAcre", "landStatus", "purpose", "ownerName",
  "fatherOrCompanyName", "ownerMobile", "ownerEmail", "ownerNidTin", "ownerAddress", "ownershipRemarks",
];
const PAYMENT_FIELDS = ["year", "dueDate", "amount", "paidAmount", "paymentDate", "status", "paymentMethod", "referenceNo", "remarks"];

const LandAndLeaseManagement = () => {
  // ==========================================================
  // DATA
  // ==========================================================
  const data = landLeaseManagementData;
  // ==========================================================
  // REACT HOOK FORM
  // ==========================================================

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: data.formData,
  });
  const {
    register: registerPayment,
    handleSubmit: handlePaymentSubmit,
    reset: resetPayment,
    setError: setPaymentError,
    formState: { errors: paymentErrors, isSubmitting: paymentSubmitting },
  } = useForm();
  const {
    register: registerDocument,
    handleSubmit: handleDocumentSubmit,
    reset: resetDocument,
    setError: setDocumentError,
    formState: { errors: documentErrors, isSubmitting: documentSubmitting },
  } = useForm();

  // ==========================================================
  // STATES
  // ==========================================================

  const [showLandModal, setShowLandModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [editingLand, setEditingLand] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const [selectedLandId, setSelectedLandId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [estateFilter, setEstateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const [mapType, setMapType] = useState("street");

  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // ==========================================================
  // DATA FROM THE API
  // ==========================================================

  const search = useDebounced(searchTerm);
  useEffect(() => setPage(1), [search, estateFilter, typeFilter, statusFilter]);

  const estateOptions = useApi(() => api.get("/options/estates"), []);
  const lands = useApi(
    () =>
      api.get("/land-records", {
        search,
        estate: estateFilter,
        landLeaseType: typeFilter,
        status: statusFilter,
        page,
        perPage: PER_PAGE,
      }),
    [search, estateFilter, typeFilter, statusFilter, page],
  );
  const landRows = lands.data?.data ?? [];
  const landMeta = lands.data?.meta;

  // The record shown in the details, map, payments and documents: the clicked row, else the first.
  const activeId = landRows.some((row) => row.id === selectedLandId) ? selectedLandId : landRows[0]?.id;
  const land = useApi(() => (activeId ? api.get(`/land-records/${activeId}`) : Promise.resolve(null)), [activeId, lands.data]);
  const record = land.data;
  const payments = useApi(
    () => (activeId ? api.get("/land-payments", { landLeaseId: activeId, perPage: 20 }) : Promise.resolve(null)),
    [activeId],
  );
  const documents = useApi(
    () => (activeId ? api.get("/land-documents", { landLeaseId: activeId, perPage: 50 }) : Promise.resolve(null)),
    [activeId],
  );
  const paymentRows = payments.data?.data ?? [];
  const documentRows = documents.data?.data ?? [];

  const landMap = record?.map;
  const mapInfo = {
    totalArea: landMap?.totalArea != null ? `${landMap.totalArea} Acre` : DASH,
    perimeter: landMap?.perimeter != null ? `${landMap.perimeter} Km` : DASH,
    latitude: orDash(landMap?.latitude),
    longitude: orDash(landMap?.longitude),
    projection: data.mapInformation.projection,
  };
  const ownerValues = [
    labelOf(data.landLeaseTypes, record?.landLeaseType),
    record?.ownerName,
    record?.fatherOrCompanyName,
    record?.ownerAddress,
    record?.ownerMobile,
    record?.ownerEmail,
    record?.ownerNidTin,
    record?.ownershipRemarks,
  ];
  const ownershipRows = data.ownershipDetails.map((detail, index) => ({
    ...detail,
    value: record ? orDash(ownerValues[index]) : DASH,
  }));

  const reloadLands = () => {
    lands.reload();
    land.reload();
  };

  // ==========================================================
  // LAND / LEASE FORM
  // ==========================================================

  const toLandForm = (row) => ({
    ...data.formData,
    ...Object.fromEntries(LAND_FIELDS.map((name) => [name, blank(row[name])])),
  });

  const landLeaseOnSubmit = async (values) => {
    const body = { ...values };
    delete body.documents;
    try {
      const saved = editingLand
        ? await api.put(`/land-records/${editingLand.id}`, body)
        : await api.post("/land-records", body);
      toast.success("Land / Lease saved successfully.");
      setSelectedLandId(saved.id);
      closeLandModal();
      reloadLands();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };

  // ==========================================================
  // OPEN MODAL
  // ==========================================================

  const openLandModal = (row) => {
    setEditingLand(row ?? null);
    reset(row ? toLandForm(row) : data.formData);
    setShowLandModal(true);
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const closeLandModal = () => {
    reset(data.formData);
    setEditingLand(null);
    setShowLandModal(false);
  };

  // ==========================================================
  // PAYMENTS
  // ==========================================================

  const openPaymentModal = (row) => {
    if (!row && !activeId) {
      toast.error("Select a land / lease record first.");
      return;
    }
    setEditingPayment(row ?? null);
    resetPayment(row ? Object.fromEntries(PAYMENT_FIELDS.map((name) => [name, blank(row[name])])) : {});
    setShowPaymentModal(true);
  };
  const closePaymentModal = () => {
    resetPayment({});
    setEditingPayment(null);
    setShowPaymentModal(false);
  };
  const paymentOnSubmit = async (values) => {
    try {
      if (editingPayment) {
        await api.put(`/land-payments/${editingPayment.id}`, { ...values, landLeaseId: editingPayment.landLeaseId });
      } else {
        await api.post("/land-payments", { ...values, landLeaseId: activeId });
      }
      toast.success("Payment saved successfully");
      closePaymentModal();
      payments.reload();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setPaymentError(key, { message });
      toast.error(error.message);
    }
  };

  // ==========================================================
  // DOCUMENTS
  // ==========================================================

  const openDocumentModal = () => {
    if (!activeId) {
      toast.error("Select a land / lease record first.");
      return;
    }
    resetDocument({});
    setShowDocumentModal(true);
  };
  const closeDocumentModal = () => {
    resetDocument({});
    setShowDocumentModal(false);
  };
  // The picked file is uploaded first; the record keeps its id.
  const documentOnSubmit = async (values) => {
    try {
      const uploaded = await api.upload(values.file[0]);
      await api.post("/land-documents", {
        landLeaseId: activeId,
        documentName: values.documentName,
        documentType: values.documentType,
        documentNumber: values.documentNumber,
        issueDate: values.issueDate,
        expiryDate: values.expiryDate,
        file: uploaded.id,
        remarks: values.remarks,
      });
      toast.success("Document saved successfully");
      closeDocumentModal();
      documents.reload();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setDocumentError(key, { message });
      toast.error(error.message);
    }
  };

  // ==========================================================
  // DELETE (after the confirm dialog)
  // ==========================================================

  const confirmDelete = async () => {
    const { type, row } = deleting;
    setDeleteBusy(true);
    try {
      await api.del(`/${{ land: "land-records", payment: "land-payments", document: "land-documents" }[type]}/${row.id}`);
      toast.success("Deleted successfully");
      setDeleting(null);
      if (type === "land") reloadLands();
      else if (type === "payment") payments.reload();
      else documents.reload();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteBusy(false);
    }
  };
  const deletingName =
    deleting?.type === "land"
      ? deleting.row.landLeaseName
      : deleting?.type === "payment"
        ? `the ${deleting.row.year} payment`
        : deleting?.row?.documentName;

  // ==========================================================
  // STATUS CLASS
  // ==========================================================

  const getStatusClass = (status) => {
    if (status === "Active") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Inactive") {
      return "bg-gray-100 text-gray-600";
    }

    if (status === "Under Process") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Expired") {
      return "bg-red-100 text-red-600";
    }

    return "bg-gray-100 text-gray-600";
  };

  // ==========================================================
  // PAYMENT STATUS CLASS
  // ==========================================================

  const getPaymentStatusClass = (status) => {
    if (status === "Paid") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Overdue") {
      return "bg-red-100 text-red-600";
    }

    return "bg-gray-100 text-gray-600";
  };

  // ==========================================================
  // DOCUMENT STATUS
  // ==========================================================

  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <div className='w-full'>
      {/* ======================================================
          ESTATE MANAGEMENT TABS
      ======================================================= */}

      <EstateManagementTabs />

      {/* ======================================================
          MAIN 12 COLUMN GRID
      ======================================================= */}

      <div className='grid grid-cols-1 items-start gap-2 xl:grid-cols-12'>
        {/* ====================================================
            1. LAND / LEASE LIST
            FULL WIDTH
        ===================================================== */}

        <div className='self-start xl:col-span-12'>
          <div className='w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* ================= HEADER ================= */}

            <div className='flex flex-col gap-3 border-b border-gray-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between'>
              <div>
                <h2 className='text-lg font-semibold text-green-800'>
                  Land / Lease List
                </h2>

                <p className='mt-1 text-xs text-gray-500'>
                  Manage estate land and lease records
                </p>
              </div>

              <button
                type='button'
                onClick={() => openLandModal()}
                className='flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-green-700 px-4 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto'
              >
                <Plus size={16} />

                <span>Add Land / Lease</span>
              </button>
            </div>

            {/* ================= SEARCH / FILTER ================= */}

            <div className='grid grid-cols-1 gap-3 border-b border-gray-200 p-4 md:grid-cols-[2fr_1fr_1fr_1fr_auto]'>
              {/* Search */}

              <div className='relative'>
                <Search
                  size={18}
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                />

                <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={data.filtersConfig.searchPlaceholder}
                  className='h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-green-600'
                />
              </div>

              {/* Estate */}

              <select
                value={estateFilter}
                onChange={(e) => setEstateFilter(e.target.value)}
                className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
              >
                <option value=''>All Estates</option>

                {(estateOptions.data ?? []).map((estate) => (
                  <option key={estate.id} value={estate.value}>
                    {estate.label}
                  </option>
                ))}
              </select>

              {/* Land Type */}

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
              >
                <option value=''>{data.filtersConfig.defaultLandType}</option>

                {data.landLeaseTypes.map((type) => (
                  <option key={type.id} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Status */}

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
              >
                <option value=''>{data.filtersConfig.defaultStatus}</option>

                {data.landStatuses.map((status) => (
                  <option key={status.id} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              {/* More Filter */}

              <button
                type='button'
                title='Reset Filters'
                onClick={() => {
                  setSearchTerm("");
                  setEstateFilter("");
                  setTypeFilter("");
                  setStatusFilter("");
                }}
                className='flex h-10 w-full items-center justify-center rounded-md border border-gray-300 bg-white transition hover:bg-gray-100 md:w-10'
              >
                <SlidersHorizontal size={18} className='text-gray-600' />
              </button>
            </div>

            {/* =================================================
                TABLE
                5 DATA VISIBLE + SCROLLBAR
            ================================================== */}

            <div className='max-h-65 overflow-auto'>
              <table className='w-full min-w-[1050px] border-collapse text-sm'>
                <thead className='sticky top-0 z-10 bg-gray-100'>
                  <tr>
                    {data.summaryTableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className='whitespace-nowrap border border-gray-200 px-3 py-3 text-center text-xs font-semibold text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {lands.loading && !lands.data ? (
                    <TableSkeleton rows={5} columns={data.summaryTableHeaders.length} />
                  ) : lands.error ? (
                    <tr>
                      <td colSpan={data.summaryTableHeaders.length} className='p-4'>
                        <ErrorState message={lands.error.message} onRetry={lands.reload} />
                      </td>
                    </tr>
                  ) : landRows.length === 0 ? (
                    <EmptyRow columns={data.summaryTableHeaders.length} />
                  ) : (
                  landRows.map((row, index) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedLandId(row.id)}
                      className={`cursor-pointer transition ${
                        activeId === row.id
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {(page - 1) * PER_PAGE + index + 1}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 font-medium text-gray-800'>
                        {row.landLeaseName}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2'>
                        {row.estateName}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {labelOf(data.landLeaseTypes, row.landLeaseType)}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 text-center'>
                        {labelOf(data.landCategories, row.landCategory)}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {orDash(row.ownerName)}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {row.totalArea}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {orDash(row.leaseTerm)}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                            labelOf(data.landStatuses, row.landStatus),
                          )}`}
                        >
                          {labelOf(data.landStatuses, row.landStatus)}
                        </span>
                      </td>

                      <td className='border border-gray-200 px-3 py-2'>
                        <div
                          className='flex items-center justify-center gap-2'
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* View */}

                          <button
                            type='button'
                            onClick={() => setSelectedLandId(row.id)}
                            className='text-blue-600 transition hover:text-blue-800'
                            title='View'
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}

                          <button
                            type='button'
                            onClick={() => openLandModal(row)}
                            className='text-amber-600 transition hover:text-amber-800'
                            title='Edit'
                          >
                            <Pencil size={16} />
                          </button>

                          {/* Delete */}

                          <button
                            type='button'
                            onClick={() => setDeleting({ type: "land", row })}
                            className='text-red-500 transition hover:text-red-700'
                            title='Delete'
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ================= LIST FOOTER ================= */}

            <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-5 py-3 text-sm text-gray-600 sm:flex-row'>
              <p>
                Showing <strong>{landRows.length}</strong> of{" "}
                <strong>{landMeta?.total ?? 0}</strong> records
              </p>

              <div className='flex flex-wrap items-center justify-center gap-1'>
                {Array.from({ length: landMeta?.totalPages ?? 1 }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    type='button'
                    onClick={() => setPage(number)}
                    className={`h-8 min-w-8 rounded-md border px-2 text-xs ${
                      number === page
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
                2. OWNERSHIP & LEASE DETAILS
                6 COLUMNS
            ==================================================== */}

        <div className='flex xl:col-span-6'>
          <div className='flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* HEADER */}

            <div className='flex shrink-0 items-center gap-2 border-b border-gray-200 px-5 py-4'>
              <UserRound size={18} className='text-green-700' />

              <h2 className='text-lg font-semibold text-green-800'>
                Ownership & Lease Details
              </h2>
            </div>

            {/* OWNER DETAILS */}

            <div className='flex-1'>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                {ownershipRows.map((detail, index) => (
                  <div
                    key={detail.id}
                    className={`border-b border-gray-100 px-5 py-4 ${
                      index % 2 === 0 ? "md:border-r" : ""
                    }`}
                  >
                    <p className='text-xs text-gray-500'>{detail.label}</p>

                    <p className='mt-1 break-words text-sm font-medium text-gray-800'>
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
                3. LAND / LEASE MAP
                6 COLUMNS
            ==================================================== */}

        <div className='flex xl:col-span-6'>
          <div
            className={
              isMapFullscreen
                ? "fixed inset-0 z-[9999] flex h-screen w-screen flex-col overflow-hidden bg-white"
                : "flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            }
          >
            {/* =====================================================
                    MAP HEADER
                ====================================================== */}

            <div className='flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Land / Lease Map View
              </h2>

              {isMapFullscreen && (
                <button
                  type='button'
                  onClick={() => setIsMapFullscreen(false)}
                  className='flex h-9 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50'
                >
                  Exit Full Screen
                  <span>⛶</span>
                </button>
              )}
            </div>

            {/* =====================================================
                      MAP
                ====================================================== */}

            <div
              className={
                isMapFullscreen
                  ? "relative min-h-0 min-w-0 flex-1"
                  : "relative h-[220px] w-full shrink-0"
              }
            >
              <MapContainer
                key={activeId ?? "none"}
                center={
                  landMap?.latitude != null
                    ? [Number(landMap.latitude), Number(landMap.longitude)]
                    : data.mapSettings.center
                }
                zoom={data.mapSettings.defaultZoom}
                zoomControl={false}
                className='h-full w-full'
              >
                {/* ================= STREET / SATELLITE ================= */}

                {mapType === "street" ? (
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url={data.mapSettings.streetUrl}
                  />
                ) : (
                  <TileLayer
                    attribution='&copy; Esri'
                    url={data.mapSettings.satelliteUrl}
                  />
                )}

                {/* ================= ZOOM ================= */}

                <ZoomControl position='topleft' />

                <MapResizer trigger={isMapFullscreen} />

                {/* ================= MARKER ================= */}

                {landMap?.latitude != null && (
                <Marker
                  position={[Number(landMap.latitude), Number(landMap.longitude)]}
                  icon={blueMarker}
                >
                  <Popup>
                    <div className='space-y-2'>
                      <h3 className='font-semibold text-green-800'>
                        {record?.landLeaseName}
                      </h3>

                      <p>Area: {mapInfo.totalArea}</p>

                      <p>
                        Coordinates: {mapInfo.latitude},{" "}
                        {mapInfo.longitude}
                      </p>

                      <p>Projection: {mapInfo.projection}</p>
                    </div>
                  </Popup>
                </Marker>
                )}

                {/* ================= POLYGON ================= */}

                {landMap?.landBoundary?.length > 0 && (
                  <Polygon
                    positions={landMap.landBoundary}
                    pathOptions={{
                      color: "#15803d",
                      fillColor: "#22c55e",
                      fillOpacity: 0.4,
                      weight: 2,
                    }}
                  />
                )}
              </MapContainer>

              {/* ===================================================
                      MAP LEGEND
                  ==================================================== */}

              <div className='absolute right-3 top-3 z-[1000] w-36 rounded-md border border-gray-200 bg-white p-3 shadow-md'>
                <div className='space-y-2'>
                  {data.legends.map((legend) => (
                    <div key={legend.id} className='flex items-center gap-2'>
                      <span
                        className='h-3 w-5 rounded-sm border-2'
                        style={{
                          borderColor: legend.color,
                          backgroundColor:
                            legend.label === "Selected Land"
                              ? "#22c55e66"
                              : "transparent",
                        }}
                      />

                      <span className='text-xs text-gray-700'>
                        {legend.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ===================================================
                    LAYER BUTTON
                ==================================================== */}

              <div className='absolute bottom-3 left-3 z-[1000]'>
                <button
                  type='button'
                  onClick={() =>
                    setMapType(mapType === "street" ? "satellite" : "street")
                  }
                  className='flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-md transition hover:bg-gray-50'
                >
                  <Layers3 size={16} />

                  {mapType === "street" ? "Satellite" : "Street"}
                </button>
              </div>
            </div>

            {/* =====================================================
                    MAP FOOTER
                ====================================================== */}

            <div className='flex shrink-0 flex-col gap-3 border-t border-gray-200 px-5 py-3 lg:flex-row lg:items-center lg:justify-between'>
              <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600'>
                <span>
                  Area:
                  <strong className='ml-1 text-gray-800'>
                    {mapInfo.totalArea}
                  </strong>
                </span>

                <span className='text-gray-300'>|</span>

                <span>
                  Perimeter:
                  <strong className='ml-1 text-gray-800'>
                    {mapInfo.perimeter}
                  </strong>
                </span>

                <span className='text-gray-300'>|</span>

                <span>
                  Coordinates:
                  <strong className='ml-1 text-gray-800'>
                    {mapInfo.latitude}, {mapInfo.longitude}
                  </strong>
                </span>
              </div>

              {/* ================= FULL SCREEN ================= */}

              {!isMapFullscreen && (
                <button
                  type='button'
                  onClick={() => setIsMapFullscreen(true)}
                  className='flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50'
                >
                  View in Full Screen
                  <span>⛶</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ====================================================
            4. LEASE PAYMENT
            6 COLUMNS
        ===================================================== */}

        <div className='self-start xl:col-span-12'>
          <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* HEADER */}

            <div className='flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-2'>
                <CreditCard size={18} className='text-green-700' />

                <h2 className='text-lg font-semibold text-green-800'>
                  Lease Payment
                </h2>
              </div>

              <button
                type='button'
                onClick={() => openPaymentModal()}
                className='flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-green-700 px-3 text-xs font-medium text-white transition hover:bg-green-800'
              >
                <Plus size={15} />
                Add Payment
              </button>
            </div>

            {/* PAYMENT TABLE */}

            <div className='max-h-52 overflow-auto'>
              <table className='w-full min-w-212 border-collapse text-xs'>
                <thead className='sticky top-0 z-10 bg-gray-100'>
                  <tr>
                    {data.paymentTableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className='whitespace-nowrap border border-gray-200 px-2 py-3 text-center font-semibold text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {payments.loading && !payments.data ? (
                    <TableSkeleton rows={3} columns={data.paymentTableHeaders.length} />
                  ) : payments.error ? (
                    <tr>
                      <td colSpan={data.paymentTableHeaders.length} className='p-4'>
                        <ErrorState message={payments.error.message} onRetry={payments.reload} />
                      </td>
                    </tr>
                  ) : paymentRows.length === 0 ? (
                    <EmptyRow columns={data.paymentTableHeaders.length} />
                  ) : (
                  paymentRows.map((payment, index) => (
                    <tr key={payment.id} className='hover:bg-gray-50'>
                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {index + 1}
                      </td>

                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {payment.year}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {dmy(payment.dueDate)}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {money(payment.amount)}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {money(payment.paidAmount)}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {dmy(payment.paymentDate)}
                      </td>

                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${getPaymentStatusClass(
                            payment.status,
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {payment.paymentMethod}
                      </td>

                      <td className='border border-gray-200 px-2 py-2'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            onClick={() => openPaymentModal(payment)}
                            className='text-blue-600 hover:text-blue-800'
                            title='Edit'
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            type='button'
                            onClick={() => setDeleting({ type: "payment", row: payment })}
                            className='text-red-500 hover:text-red-700'
                            title='Delete'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ====================================================
            5. LAND / LEASE DOCUMENTS
            6 COLUMNS
        ===================================================== */}

        <div className='self-start xl:col-span-12'>
          <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* HEADER */}

            <div className='flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex items-center gap-2'>
                <FileText size={18} className='text-green-700' />

                <h2 className='text-lg font-semibold text-green-800'>
                  Land / Lease Documents
                </h2>
              </div>

              <button
                type='button'
                onClick={openDocumentModal}
                className='flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-green-700 px-3 text-xs font-medium text-white transition hover:bg-green-800'
              >
                <Plus size={15} />
                Add Document
              </button>
            </div>

            {/* DOCUMENT TABLE */}

            <div className='max-h-52 overflow-auto'>
              <table className='w-full min-w-175 border-collapse text-xs'>
                <thead className='sticky top-0 z-10 bg-gray-100'>
                  <tr>
                    {data.documentTableHeaders.map((header, index) => (
                      <th
                        key={index}
                        className='whitespace-nowrap border border-gray-200 px-2 py-3 text-center font-semibold text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {documents.loading && !documents.data ? (
                    <TableSkeleton rows={3} columns={data.documentTableHeaders.length} />
                  ) : documents.error ? (
                    <tr>
                      <td colSpan={data.documentTableHeaders.length} className='p-4'>
                        <ErrorState message={documents.error.message} onRetry={documents.reload} />
                      </td>
                    </tr>
                  ) : documentRows.length === 0 ? (
                    <EmptyRow columns={data.documentTableHeaders.length} />
                  ) : (
                  documentRows.map((document, index) => (
                    <tr key={document.id} className='hover:bg-gray-50'>
                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {index + 1}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 font-medium text-gray-800'>
                        {document.documentName}
                      </td>

                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {document.documentType}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {orDash(document.fileName)}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {dmyStamp(document.createdAt)}
                      </td>

                      <td className='border border-gray-200 px-2 py-2'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            onClick={() => window.open(document.fileUrl, "_blank", "noopener")}
                            className='text-blue-600 hover:text-blue-800'
                            title='Download'
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            type='button'
                            onClick={() => setDeleting({ type: "document", row: document })}
                            className='text-red-500 hover:text-red-700'
                            title='Delete'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          ADD LAND / LEASE INFORMATION MODAL
      ======================================================= */}

      {showLandModal && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4'>
          <div className='flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl'>
            {/* ================= MODAL HEADER ================= */}

            <div className='flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4'>
              <div>
                <h2 className='text-lg font-semibold text-green-800'>
                  Land / Lease Information
                </h2>

                <p className='mt-1 text-xs text-gray-500'>
                  Add a new land or lease record
                </p>
              </div>

              <button
                type='button'
                onClick={closeLandModal}
                className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100'
              >
                <X size={20} />
              </button>
            </div>

            {/* ================= MODAL BODY ================= */}

            <div className='min-h-0 overflow-y-auto p-5'>
              <form onSubmit={handleSubmit(landLeaseOnSubmit)}>
                {/* =================================================
                    BASIC INFORMATION
                ================================================== */}

                <div className='mb-6'>
                  <div className='mb-4 border-b border-gray-200 pb-2'>
                    <h3 className='text-sm font-semibold text-green-800'>
                      Basic Information
                    </h3>
                  </div>

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
                    {/* =================================================
      ESTATE
  ================================================== */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Estate <span className='text-red-500'>*</span>
                      </label>

                      <select
                        {...register("estate", {
                          required: "Estate is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.estate
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      >
                        <option value=''>Select Estate</option>

                        {(estateOptions.data ?? []).map((estate) => (
                          <option key={estate.id} value={estate.value}>
                            {estate.label}
                          </option>
                        ))}
                      </select>

                      {errors.estate && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.estate.message}
                        </p>
                      )}
                    </div>

                    {/* =================================================
      LAND / LEASE TYPE
  ================================================== */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Land / Lease Type{" "}
                        <span className='text-red-500'>*</span>
                      </label>

                      <select
                        {...register("landLeaseType", {
                          required: "Land / Lease Type is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.landLeaseType
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      >
                        <option value=''>Select Type</option>

                        {data.landLeaseTypes.map((type) => (
                          <option key={type.id} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>

                      {errors.landLeaseType && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.landLeaseType.message}
                        </p>
                      )}
                    </div>

                    {/* =================================================
      LAND CATEGORY
  ================================================== */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Land Category <span className='text-red-500'>*</span>
                      </label>

                      <select
                        {...register("landCategory", {
                          required: "Land Category is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.landCategory
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      >
                        <option value=''>Select Category</option>

                        {data.landCategories.map((category) => (
                          <option key={category.id} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>

                      {errors.landCategory && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.landCategory.message}
                        </p>
                      )}
                    </div>

                    {/* =================================================
      LAND / LEASE NAME
  ================================================== */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Land / Lease Name{" "}
                        <span className='text-red-500'>*</span>
                      </label>

                      <input
                        type='text'
                        placeholder='Enter land / lease name'
                        {...register("landLeaseName", {
                          required: "Land / Lease Name is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.landLeaseName
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      />

                      {errors.landLeaseName && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.landLeaseName.message}
                        </p>
                      )}
                    </div>

                    {/* =================================================
      SURVEY / KHATIAN
  ================================================== */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Survey / Khatian No.{" "}
                        <span className='text-red-500'>*</span>
                      </label>

                      <input
                        type='text'
                        placeholder='Enter survey / khatian no.'
                        {...register("surveyNo", {
                          required: "Survey / Khatian No is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.surveyNo
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      />

                      {errors.surveyNo && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.surveyNo.message}
                        </p>
                      )}
                    </div>

                    {/* =================================================
      PLOT / DAG
  ================================================== */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Plot / Dag No. <span className='text-red-500'>*</span>
                      </label>

                      <input
                        type='text'
                        placeholder='Enter plot / dag no.'
                        {...register("plotNo", {
                          required: "Plot / Dag No is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.plotNo
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      />

                      {errors.plotNo && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.plotNo.message}
                        </p>
                      )}
                    </div>

                    {/* =================================================
      MOUZA
  ================================================== */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Mouza
                      </label>

                      <select
                        {...register("mouza")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option value=''>Select Mouza</option>

                        {data.mouzas.map((mouza) => (
                          <option key={mouza.id} value={mouza.value}>
                            {mouza.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* =================================================
      JL NO.
  ================================================== */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        JL No.
                      </label>

                      <input
                        type='text'
                        placeholder='Enter JL No.'
                        {...register("jlNo")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* =================================================
      RECORD TYPE
  ================================================== */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Record Type
                      </label>

                      <select
                        {...register("recordType")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option value=''>Select Record Type</option>

                        {data.recordTypes.map((record) => (
                          <option key={record.id} value={record.value}>
                            {record.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* =================================================
                  OWNERSHIP & LEASE INFORMATION
              ================================================= */}

                <div className='mb-6'>
                  <div className='mb-4 border-b border-gray-200 pb-2'>
                    <h3 className='text-sm font-semibold text-green-800'>
                      Ownership & Lease Information
                    </h3>
                  </div>

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
                    {/* Owner / Lessor Name */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Owner / Lessor Name
                        <span className='text-red-500'> *</span>
                      </label>

                      <input
                        type='text'
                        placeholder='Enter owner / lessor name'
                        {...register("ownerName", {
                          required: "Owner / Lessor Name is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.ownerName
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      />

                      {errors.ownerName && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.ownerName.message}
                        </p>
                      )}
                    </div>

                    {/* Father's / Company Name */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Father's / Company Name
                      </label>

                      <input
                        type='text'
                        placeholder="Enter father's / company name"
                        {...register("fatherOrCompanyName")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Mobile */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Mobile
                      </label>

                      <input
                        type='text'
                        placeholder='Enter mobile number'
                        {...register("ownerMobile")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Email */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Email
                      </label>

                      <input
                        type='email'
                        placeholder='Enter email address'
                        {...register("ownerEmail")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* NID / TIN */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        NID / TIN
                      </label>

                      <input
                        type='text'
                        placeholder='Enter NID / TIN'
                        {...register("ownerNidTin")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Address */}

                    <div className='md:col-span-2'>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Owner / Lessor Address
                      </label>

                      <input
                        type='text'
                        placeholder='Enter owner / lessor address'
                        {...register("ownerAddress")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Relation / Remarks */}

                    <div className='md:col-span-1'>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Relation / Remarks
                      </label>

                      <input
                        type='text'
                        placeholder='Enter relation / remarks'
                        {...register("ownershipRemarks")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>
                  </div>
                </div>
                {/* =================================================
                    AREA INFORMATION
                ================================================== */}

                <div className='mb-6'>
                  <div className='mb-4 border-b border-gray-200 pb-2'>
                    <h3 className='text-sm font-semibold text-green-800'>
                      Area Information
                    </h3>
                  </div>

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
                    {/* Total Area */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Total Area (Acre){" "}
                        <span className='text-red-500'>*</span>
                      </label>

                      <input
                        type='number'
                        step='0.01'
                        placeholder='Enter total area'
                        {...register("totalArea", {
                          required: "Total Area is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.totalArea
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      />

                      {errors.totalArea && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.totalArea.message}
                        </p>
                      )}
                    </div>

                    {/* Usable Area */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Usable Area (Acre)
                      </label>

                      <input
                        type='number'
                        step='0.01'
                        placeholder='Enter usable area'
                        {...register("usableArea")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Non-Usable Area */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Non-Usable Area (Acre)
                      </label>

                      <input
                        type='number'
                        step='0.01'
                        placeholder='Enter non-usable area'
                        {...register("nonUsableArea")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    STATUS & LEASE
                ================================================== */}

                <div className='mb-6'>
                  <div className='mb-4 border-b border-gray-200 pb-2'>
                    <h3 className='text-sm font-semibold text-green-800'>
                      Status & Lease Information
                    </h3>
                  </div>

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
                    {/* Status */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Land Status <span className='text-red-500'>*</span>
                      </label>

                      <select
                        {...register("landStatus", {
                          required: "Land Status is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.landStatus
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      >
                        <option value=''>Select Status</option>

                        {data.landStatuses.map((status) => (
                          <option key={status.id} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>

                      {errors.landStatus && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.landStatus.message}
                        </p>
                      )}
                    </div>

                    {/* Acquisition Date */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Acquisition Date <span className='text-red-500'>*</span>
                      </label>

                      <input
                        type='date'
                        {...register("acquisitionDate", {
                          required: "Acquisition Date is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.acquisitionDate
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      />

                      {errors.acquisitionDate && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.acquisitionDate.message}
                        </p>
                      )}
                    </div>

                    {/* Start Date */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Start Date <span className='text-red-500'>*</span>
                      </label>

                      <input
                        type='date'
                        {...register("startDate", {
                          required: "Start Date is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.startDate
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      />

                      {errors.startDate && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.startDate.message}
                        </p>
                      )}
                    </div>

                    {/* End Date */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        End Date <span className='text-red-500'>*</span>
                      </label>

                      <input
                        type='date'
                        {...register("endDate", {
                          required: "End Date is required",
                        })}
                        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                          errors.endDate
                            ? "border-red-500"
                            : "border-gray-300 focus:border-green-600"
                        }`}
                      />

                      {errors.endDate && (
                        <p className='mt-1 text-xs text-red-500'>
                          {errors.endDate.message}
                        </p>
                      )}
                    </div>

                    {/* Lease Term */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Lease Term
                      </label>

                      <input
                        type='text'
                        placeholder='e.g. 20 Years'
                        {...register("leaseTerm")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Rent / Lease Amount */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Rent / Lease Amount
                      </label>

                      <input
                        type='number'
                        step='0.01'
                        placeholder='Enter amount'
                        {...register("rentAmount")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Rent / Lease Per Acre */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Rent / Lease Per Acre
                      </label>

                      <input
                        type='number'
                        step='0.01'
                        placeholder='Enter amount per acre'
                        {...register("rentPerAcre")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    LOCATION / GIS
                ================================================== */}

                <div className='mb-6'>
                  <div className='mb-4 border-b border-gray-200 pb-2'>
                    <h3 className='text-sm font-semibold text-green-800'>
                      Location / GIS Information
                    </h3>
                  </div>

                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
                    {/* Location */}

                    <div className='md:col-span-2'>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Location
                      </label>

                      <input
                        type='text'
                        placeholder='Enter location'
                        {...register("location")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* GPS Area */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        GPS Area
                      </label>

                      <input
                        type='text'
                        placeholder='GPS Area'
                        {...register("gpsArea")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Latitude */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Latitude
                      </label>

                      <input
                        type='number'
                        step='any'
                        placeholder='25.7456'
                        {...register("latitude")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Longitude */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Longitude
                      </label>

                      <input
                        type='number'
                        step='any'
                        placeholder='89.2741'
                        {...register("longitude")}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Perimeter */}

                    <div>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Perimeter
                      </label>

                      <input
                        type='text'
                        value={mapInfo.perimeter}
                        readOnly
                        className='h-11 w-full rounded-lg border border-gray-300 bg-gray-100 px-3 text-sm text-gray-600 outline-none'
                      />
                    </div>

                    {/* Boundary */}

                    <div className='md:col-span-2'>
                      <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                        Polygon / Boundary
                      </label>

                      <div className='flex h-11 items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-3'>
                        <span className='text-xs text-gray-500'>
                          Boundary will be selected from map
                        </span>

                        <button
                          type='button'
                          className='rounded-md border border-green-700 bg-white px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-50'
                        >
                          Select on Map
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    PURPOSE / REMARKS
                ================================================== */}

                <div>
                  <div className='mb-4 border-b border-gray-200 pb-2'>
                    <h3 className='text-sm font-semibold text-green-800'>
                      Purpose / Remarks
                    </h3>
                  </div>

                  <textarea
                    rows={4}
                    placeholder='Enter purpose or remarks...'
                    {...register("purpose")}
                    className='w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* =================================================
                    MODAL FOOTER
                ================================================== */}

                <div className='mt-6 border-t border-gray-200 pt-4'>
                  <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
                    <button
                      type='button'
                      onClick={closeLandModal}
                      className='flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 text-gray-700 transition hover:bg-gray-50 sm:w-auto'
                    >
                      <X size={18} />
                      Cancel
                    </button>

                    <button
                      type='button'
                      onClick={() => reset(editingLand ? toLandForm(editingLand) : data.formData)}
                      className='flex h-11 w-full items-center justify-center gap-2 rounded-lg border-0 bg-green-500 px-6 text-white transition hover:bg-green-600 sm:w-auto'
                    >
                      <RotateCcw size={18} />
                      Reset
                    </button>

                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='flex h-11 w-full items-center justify-center gap-2 rounded-lg border-0 bg-green-900 px-6 text-white transition hover:bg-green-950 disabled:opacity-60 sm:w-auto'
                    >
                      <Save size={18} />
                      {isSubmitting ? "Saving..." : "Save Land / Lease"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* ======================================================
              ADD PAYMENT MODAL
          ====================================================== */}

      {showPaymentModal && (
        <div className='fixed  inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4'>
          <div className='max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl'>
            {/* HEADER */}

            <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
              <div>
                <h2 className='text-lg font-semibold text-green-800'>
                  Add Lease Payment
                </h2>

                <p className='text-xs text-gray-500'>
                  Create a new lease payment record
                </p>
              </div>

              <button
                type='button'
                onClick={closePaymentModal}
                className='rounded-lg p-2 hover:bg-gray-100'
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}

            <form className='p-5' onSubmit={handlePaymentSubmit(paymentOnSubmit)}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Payment Year
                  </label>

                  <input {...registerPayment("year", data.paymentValidation.year)}
                    type='text'
                    placeholder='2026'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                {paymentErrors.year && <p className='mt-1 text-xs text-red-500'>{paymentErrors.year.message}</p>}
</div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Due Date
                  </label>

                  <input {...registerPayment("dueDate", data.paymentValidation.dueDate)}
                    type='date'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                {paymentErrors.dueDate && <p className='mt-1 text-xs text-red-500'>{paymentErrors.dueDate.message}</p>}
</div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Amount
                  </label>

                  <input {...registerPayment("amount", data.paymentValidation.amount)}
                    type='number'
                    placeholder='Enter amount'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                {paymentErrors.amount && <p className='mt-1 text-xs text-red-500'>{paymentErrors.amount.message}</p>}
</div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Paid Amount
                  </label>

                  <input {...registerPayment("paidAmount", data.paymentValidation.paidAmount)}
                    type='number'
                    placeholder='Enter paid amount'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                {paymentErrors.paidAmount && <p className='mt-1 text-xs text-red-500'>{paymentErrors.paidAmount.message}</p>}
</div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Payment Date
                  </label>

                  <input {...registerPayment("paymentDate", data.paymentValidation.paymentDate)}
                    type='date'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                {paymentErrors.paymentDate && <p className='mt-1 text-xs text-red-500'>{paymentErrors.paymentDate.message}</p>}
</div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Status
                  </label>

                  <select {...registerPayment("status", data.paymentValidation.status)} className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'>
                    <option value=''>Select Status</option>

                    {data.paymentStatuses.map((status) => (
                      <option key={status.id} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                {paymentErrors.status && <p className='mt-1 text-xs text-red-500'>{paymentErrors.status.message}</p>}
</div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Payment Method
                  </label>

                  <select {...registerPayment("paymentMethod", data.paymentValidation.paymentMethod)} className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'>
                    <option value=''>Select Method</option>

                    {data.paymentMethods.map((method) => (
                      <option key={method.id} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                {paymentErrors.paymentMethod && <p className='mt-1 text-xs text-red-500'>{paymentErrors.paymentMethod.message}</p>}
</div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Receipt No.
                  </label>

                  <input {...registerPayment("referenceNo", data.paymentValidation.referenceNo)}
                    type='text'
                    placeholder='REC-2026-001'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                {paymentErrors.referenceNo && <p className='mt-1 text-xs text-red-500'>{paymentErrors.referenceNo.message}</p>}
</div>

                <div className='md:col-span-2'>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Remarks
                  </label>

                  <textarea {...registerPayment("remarks", data.paymentValidation.remarks)}
                    rows={3}
                    placeholder='Enter remarks'
                    className='w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-green-600'
                  />
                {paymentErrors.remarks && <p className='mt-1 text-xs text-red-500'>{paymentErrors.remarks.message}</p>}
</div>
              </div>

              {/* FOOTER */}

              <div className='mt-6 flex flex-col-reverse gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={closePaymentModal}
                  className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-sm text-gray-700 transition hover:bg-gray-50 sm:w-auto'
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type='submit'
                  disabled={paymentSubmitting}
                  className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-900 disabled:opacity-60 sm:w-auto'
                >
                  <Save size={17} />
                  {paymentSubmitting ? "Saving..." : "Save Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ======================================================
              ADD DOCUMENT MODAL
          ====================================================== */}

      {showDocumentModal && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4'>
          <div className='flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl'>
            {/* ================= HEADER ================= */}

            <div className='flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4'>
              <div>
                <h2 className='text-lg font-semibold text-green-800'>
                  Add Land / Lease Document
                </h2>

                <p className='mt-1 text-xs text-gray-500'>
                  Upload and save a document for this land / lease record
                </p>
              </div>

              <button
                type='button'
                onClick={closeDocumentModal}
                className='cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'
              >
                <X size={20} />
              </button>
            </div>

            {/* ================= BODY ================= */}

            <form className='min-h-0 overflow-y-auto p-5' onSubmit={handleDocumentSubmit(documentOnSubmit)}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {/* Document Name */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Document Name <span className='text-red-500'>*</span>
                  </label>

                  <input {...registerDocument("documentName", data.documentValidation.documentName)}
                    type='text'
                    placeholder='Enter document name'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                {documentErrors.documentName && <p className='mt-1 text-xs text-red-500'>{documentErrors.documentName.message}</p>}
</div>

                {/* Document Type */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Document Type <span className='text-red-500'>*</span>
                  </label>

                  <select {...registerDocument("documentType", data.documentValidation.documentType)} className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'>
                    <option value=''>Select Document Type</option>

                    {data.documentTypes.map((type) => (
                      <option key={type.id} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                {documentErrors.documentType && <p className='mt-1 text-xs text-red-500'>{documentErrors.documentType.message}</p>}
</div>

                {/* Document Number */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Document Number
                  </label>

                  <input {...registerDocument("documentNumber", data.documentValidation.documentNumber)}
                    type='text'
                    placeholder='Enter document number'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                {documentErrors.documentNumber && <p className='mt-1 text-xs text-red-500'>{documentErrors.documentNumber.message}</p>}
</div>

                {/* Issue Date */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Issue Date
                  </label>

                  <input {...registerDocument("issueDate", data.documentValidation.issueDate)}
                    type='date'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                {documentErrors.issueDate && <p className='mt-1 text-xs text-red-500'>{documentErrors.issueDate.message}</p>}
</div>

                {/* Expiry Date */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Expiry Date
                  </label>

                  <input {...registerDocument("expiryDate", data.documentValidation.expiryDate)}
                    type='date'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                {documentErrors.expiryDate && <p className='mt-1 text-xs text-red-500'>{documentErrors.expiryDate.message}</p>}
</div>

                {/* File Upload */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Document File <span className='text-red-500'>*</span>
                  </label>

                  <input {...registerDocument("file", data.documentValidation.file)}
                    type='file'
                    accept='.pdf,.jpg,.jpeg,.png,.doc,.docx'
                    className='h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-green-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-green-700'
                  />

                  <p className='mt-1 text-[11px] text-gray-500'>
                    PDF, JPG, PNG, DOC or DOCX
                  </p>
                {documentErrors.file && <p className='mt-1 text-xs text-red-500'>{documentErrors.file.message}</p>}
</div>

                {/* Remarks */}

                <div className='md:col-span-2'>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Remarks
                  </label>

                  <textarea {...registerDocument("remarks", data.documentValidation.remarks)}
                    rows={4}
                    placeholder='Enter document remarks...'
                    className='w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none transition focus:border-green-600'
                  />
                {documentErrors.remarks && <p className='mt-1 text-xs text-red-500'>{documentErrors.remarks.message}</p>}
</div>
              </div>

              {/* ================= FOOTER ================= */}

              <div className='mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={closeDocumentModal}
                  className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-sm text-gray-700 transition hover:bg-gray-50 sm:w-auto'
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type='submit'
                  disabled={documentSubmitting}
                  className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-800 px-5 text-sm font-medium text-white transition hover:bg-green-900 disabled:opacity-60 sm:w-auto'
                >
                  <Save size={17} />
                  {documentSubmitting ? "Saving..." : "Save Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.type ?? ""}?`}
        message={`${deletingName ?? ""} will be removed.`}
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default LandAndLeaseManagement;
