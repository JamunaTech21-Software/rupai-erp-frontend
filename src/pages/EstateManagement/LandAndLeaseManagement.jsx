import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import L from "leaflet";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import { landLeaseManagementData } from "../../data/EstateManagementData/landAndLeaseManagementData";
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
    formState: { errors },
  } = useForm({
    defaultValues: data.formData,
  });

  // ==========================================================
  // STATES
  // ==========================================================

  const [showLandModal, setShowLandModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const [selectedLandId, setSelectedLandId] = useState(
    data.landLeaseList[0]?.id || null,
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [mapType, setMapType] = useState("street");

  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // ==========================================================
  // SELECTED LAND
  // ==========================================================

  const selectedLand =
    data.landLeaseList.find((item) => item.id === selectedLandId) ||
    data.landLeaseList[0];

  // ==========================================================
  // SEARCH
  // ==========================================================

  const filteredLandList = data.landLeaseList.filter((land) =>
    `
      ${land.landName}
      ${land.estate}
      ${land.type}
      ${land.category}
      ${land.owner}
      ${land.area}
      ${land.status}
    `
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const landLeaseOnSubmit = (formData) => {
    console.log("Land / Lease Form Data:", formData);

    toast.success("Land / Lease saved successfully.");

    reset(data.formData);
    setShowLandModal(false);
  };

  // ==========================================================
  // OPEN MODAL
  // ==========================================================

  const openLandModal = () => {
    reset(data.formData);
    setShowLandModal(true);
  };

  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const closeLandModal = () => {
    reset(data.formData);
    setShowLandModal(false);
  };

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

  const getDocumentStatusClass = (status) => {
    if (status === "Verified") {
      return "bg-green-100 text-green-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

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
                onClick={openLandModal}
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

              <select className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'>
                <option value=''>All Estates</option>

                {data.estates.map((estate) => (
                  <option key={estate.id} value={estate.value}>
                    {estate.label}
                  </option>
                ))}
              </select>

              {/* Land Type */}

              <select className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'>
                <option value=''>{data.filtersConfig.defaultLandType}</option>

                {data.landLeaseTypes.map((type) => (
                  <option key={type.id} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Status */}

              <select className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'>
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
                  {filteredLandList.map((land, index) => (
                    <tr
                      key={land.id}
                      onClick={() => setSelectedLandId(land.id)}
                      className={`cursor-pointer transition ${
                        selectedLandId === land.id
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {index + 1}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 font-medium text-gray-800'>
                        {land.landName}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2'>
                        {land.estate}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {land.type}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 text-center'>
                        {land.category}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {land.owner}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {land.area}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {land.leaseTerm}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                            land.status,
                          )}`}
                        >
                          {land.status}
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
                            onClick={() => setSelectedLandId(land.id)}
                            className='text-blue-600 transition hover:text-blue-800'
                            title='View'
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}

                          <button
                            type='button'
                            onClick={openLandModal}
                            className='text-amber-600 transition hover:text-amber-800'
                            title='Edit'
                          >
                            <Pencil size={16} />
                          </button>

                          {/* Delete */}

                          <button
                            type='button'
                            onClick={() =>
                              toast.success(
                                `Delete action for ${land.landName}`,
                              )
                            }
                            className='text-red-500 transition hover:text-red-700'
                            title='Delete'
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= LIST FOOTER ================= */}

            <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-5 py-3 text-sm text-gray-600 sm:flex-row'>
              <p>
                Showing <strong>{filteredLandList.length}</strong> of{" "}
                <strong>{data.landLeaseList.length}</strong> records
              </p>

              <div className='flex items-center gap-1'>
                {data.summaryPagination.pages.map((page) => (
                  <button
                    key={page}
                    type='button'
                    className={`h-8 min-w-8 rounded-md border px-2 text-xs ${
                      page === data.summaryPagination.currentPage
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
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
                {data.ownershipDetails.map((detail, index) => (
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
                center={data.mapSettings.center}
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

                {/* ================= MARKER ================= */}

                <Marker
                  position={[
                    Number(data.marker.latitude),
                    Number(data.marker.longitude),
                  ]}
                  icon={blueMarker}
                >
                  <Popup>
                    <div className='space-y-2'>
                      <h3 className='font-semibold text-green-800'>
                        {data.marker.name}
                      </h3>

                      <p>Area: {data.mapInformation.totalArea}</p>

                      <p>
                        Coordinates: {data.mapInformation.latitude},{" "}
                        {data.mapInformation.longitude}
                      </p>

                      <p>Projection: {data.mapInformation.projection}</p>
                    </div>
                  </Popup>
                </Marker>

                {/* ================= POLYGON ================= */}

                <Polygon
                  positions={data.landBoundary}
                  pathOptions={{
                    color: "#15803d",
                    fillColor: "#22c55e",
                    fillOpacity: 0.4,
                    weight: 2,
                  }}
                />
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
                    {data.mapInformation.totalArea}
                  </strong>
                </span>

                <span className='text-gray-300'>|</span>

                <span>
                  Perimeter:
                  <strong className='ml-1 text-gray-800'>
                    {data.mapInformation.perimeter}
                  </strong>
                </span>

                <span className='text-gray-300'>|</span>

                <span>
                  Coordinates:
                  <strong className='ml-1 text-gray-800'>
                    {data.mapInformation.latitude},{" "}
                    {data.mapInformation.longitude}
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
                onClick={() => setShowPaymentModal(true)}
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
                  {data.paymentList.map((payment, index) => (
                    <tr key={payment.id} className='hover:bg-gray-50'>
                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {index + 1}
                      </td>

                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {payment.year}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {payment.dueDate}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {payment.amount}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {payment.paidAmount}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {payment.paymentDate}
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
                            className='text-blue-600 hover:text-blue-800'
                            title='Edit'
                          >
                            <Pencil size={14} />
                          </button>

                          <button
                            type='button'
                            className='text-red-500 hover:text-red-700'
                            title='Delete'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
                onClick={() => setShowDocumentModal(true)}
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
                  {data.documentList.map((document, index) => (
                    <tr key={document.id} className='hover:bg-gray-50'>
                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {index + 1}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 font-medium text-gray-800'>
                        {document.documentName}
                      </td>

                      <td className='border border-gray-200 px-2 py-2 text-center'>
                        {document.type}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {document.file}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-2 py-2 text-center'>
                        {document.uploadedOn}
                      </td>

                      <td className='border border-gray-200 px-2 py-2'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            className='text-blue-600 hover:text-blue-800'
                            title='Download'
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            type='button'
                            className='text-red-500 hover:text-red-700'
                            title='Delete'
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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

                        {data.estates.map((estate) => (
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
                        value={data.mapInformation.perimeter}
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
                      onClick={() => reset(data.formData)}
                      className='flex h-11 w-full items-center justify-center gap-2 rounded-lg border-0 bg-green-500 px-6 text-white transition hover:bg-green-600 sm:w-auto'
                    >
                      <RotateCcw size={18} />
                      Reset
                    </button>

                    <button
                      type='submit'
                      className='flex h-11 w-full items-center justify-center gap-2 rounded-lg border-0 bg-green-900 px-6 text-white transition hover:bg-green-950 sm:w-auto'
                    >
                      <Save size={18} />
                      Save Land / Lease
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
          <div className='w-full max-w-3xl rounded-xl bg-white shadow-2xl'>
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
                onClick={() => setShowPaymentModal(false)}
                className='rounded-lg p-2 hover:bg-gray-100'
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}

            <div className='p-5'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Payment Year
                  </label>

                  <input
                    type='text'
                    placeholder='2026'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Due Date
                  </label>

                  <input
                    type='date'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Amount
                  </label>

                  <input
                    type='number'
                    placeholder='Enter amount'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Paid Amount
                  </label>

                  <input
                    type='number'
                    placeholder='Enter paid amount'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Payment Date
                  </label>

                  <input
                    type='date'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Status
                  </label>

                  <select className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'>
                    <option value=''>Select Status</option>

                    {data.paymentStatuses.map((status) => (
                      <option key={status.id} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Payment Method
                  </label>

                  <select className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'>
                    <option value=''>Select Method</option>

                    {data.paymentMethods.map((method) => (
                      <option key={method.id} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Receipt No.
                  </label>

                  <input
                    type='text'
                    placeholder='REC-2026-001'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                <div className='md:col-span-2'>
                  <label className='mb-1 block text-sm font-medium text-gray-700'>
                    Remarks
                  </label>

                  <textarea
                    rows={3}
                    placeholder='Enter remarks'
                    className='w-full resize-none rounded-lg border border-gray-300 p-3 text-sm outline-none focus:border-green-600'
                  />
                </div>
              </div>

              {/* FOOTER */}

              <div className='mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4'>
                <button
                  type='button'
                  onClick={() => setShowPaymentModal(false)}
                  className='flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-sm text-gray-700 transition hover:bg-gray-50'
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type='button'
                  onClick={() => {
                    toast.success("Payment saved successfully");
                    setShowPaymentModal(false);
                  }}
                  className='flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-800 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-900'
                >
                  <Save size={17} />
                  Save Payment
                </button>
              </div>
            </div>
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
                onClick={() => setShowDocumentModal(false)}
                className='cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'
              >
                <X size={20} />
              </button>
            </div>

            {/* ================= BODY ================= */}

            <div className='min-h-0 overflow-y-auto p-5'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {/* Document Name */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Document Name <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    placeholder='Enter document name'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                </div>

                {/* Document Type */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Document Type <span className='text-red-500'>*</span>
                  </label>

                  <select className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'>
                    <option value=''>Select Document Type</option>

                    {data.documentTypes.map((type) => (
                      <option key={type.id} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Document Number */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Document Number
                  </label>

                  <input
                    type='text'
                    placeholder='Enter document number'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                </div>

                {/* Issue Date */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Issue Date
                  </label>

                  <input
                    type='date'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                </div>

                {/* Expiry Date */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Expiry Date
                  </label>

                  <input
                    type='date'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                </div>

                {/* File Upload */}

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Document File <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='file'
                    accept='.pdf,.jpg,.jpeg,.png,.doc,.docx'
                    className='h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-green-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-green-700'
                  />

                  <p className='mt-1 text-[11px] text-gray-500'>
                    PDF, JPG, PNG, DOC or DOCX
                  </p>
                </div>

                {/* Remarks */}

                <div className='md:col-span-2'>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Remarks
                  </label>

                  <textarea
                    rows={4}
                    placeholder='Enter document remarks...'
                    className='w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none transition focus:border-green-600'
                  />
                </div>
              </div>

              {/* ================= FOOTER ================= */}

              <div className='mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={() => setShowDocumentModal(false)}
                  className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-sm text-gray-700 transition hover:bg-gray-50 sm:w-auto'
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type='button'
                  onClick={() => {
                    toast.success("Document saved successfully");
                    setShowDocumentModal(false);
                  }}
                  className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-800 px-5 text-sm font-medium text-white transition hover:bg-green-900 sm:w-auto'
                >
                  <Save size={17} />
                  Save Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandAndLeaseManagement;
