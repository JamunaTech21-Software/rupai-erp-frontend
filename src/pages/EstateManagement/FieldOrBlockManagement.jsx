import React, { useState } from "react";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import { useForm } from "react-hook-form";
import L from "leaflet";
import toast from "react-hot-toast";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { fieldAndBlockManagementData } from "../../data/EstateManagementData/FieldAndBlockManagementData";

import {
  RotateCcw,
  Save,
  X,
  Pencil,
  Trash2,
  Search,
  SlidersHorizontal,
  Plus,
  Layers3,
  Leaf,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  ZoomControl,
  Popup,
} from "react-leaflet";

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
  iconSize: [28, 45],
  iconAnchor: [14, 45],
  popupAnchor: [0, -40],
});

const FieldOrBlockManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [mapType, setMapType] = useState("street");
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [showFieldModal, setShowFieldModal] = useState(false);

  // =========================================================
  // Form Submit
  // =========================================================

  const FieldOrBlockManagementonSubmit = (data) => {
    console.log("Field / Block Data:", data);

    toast.success("Field / Block saved successfully.");

    reset();
    setShowFieldModal(false);
  };

  return (
    <div>
      <EstateManagementTabs />

      {/* =====================================================
          MAIN GRID
      ====================================================== */}

      <div className='grid grid-cols-1 items-start gap-2 xl:grid-cols-12'>
        {/* =====================================================
            1. FIELD / BLOCK LIST
            FULL WIDTH
        ====================================================== */}

        <div className='self-start xl:col-span-12'>
          <div className='h-fit w-full rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}

            <div className='flex flex-col gap-3 border-b border-gray-200 p-4 lg:flex-row lg:items-center lg:justify-between'>
              <h2 className='text-lg font-semibold text-green-800'>
                Field / Block List
                <span className='ml-1 text-sm font-normal text-gray-500'>
                  ({fieldAndBlockManagementData.details.division}
                  {" > "}
                  {fieldAndBlockManagementData.details.section})
                </span>
              </h2>

              <button
                type='button'
                onClick={() => setShowFieldModal(true)}
                className='btn flex h-10 cursor-pointer items-center justify-center gap-2 rounded-sm border-0 bg-green-700 px-4 text-white hover:bg-green-800'
              >
                <Plus size={16} />
                <span>Add Field / Block</span>
              </button>
            </div>

            {/* Search & Filter */}

            <div className='grid grid-cols-1 gap-3 border-b border-gray-200 p-4 md:grid-cols-[2fr_1fr_1fr_auto]'>
              <div className='relative'>
                <Search
                  size={18}
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                />

                <input
                  type='text'
                  placeholder={
                    fieldAndBlockManagementData.filters.searchPlaceholder
                  }
                  className='h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-green-600'
                />
              </div>

              <select className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'>
                <option value=''>
                  {fieldAndBlockManagementData.filters.fieldType}
                </option>

                {fieldAndBlockManagementData.fieldTypes.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <select className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'>
                <option value=''>
                  {fieldAndBlockManagementData.filters.status}
                </option>

                {fieldAndBlockManagementData.statuses.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <button
                type='button'
                className='flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white transition hover:bg-gray-100'
              >
                <SlidersHorizontal size={18} className='text-gray-600' />
              </button>
            </div>

            {/* Table */}

            <div className='max-h-61 overflow-auto'>
              <table className='w-full min-w-225 border-collapse text-sm'>
                <thead className='bg-gray-100'>
                  <tr>
                    {fieldAndBlockManagementData.tableHeaders.map((header) => (
                      <th
                        key={header}
                        className='whitespace-nowrap border border-gray-200 px-1 py-3 text-center text-xs font-semibold text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {fieldAndBlockManagementData.fieldList.map((field, index) => (
                    <tr key={field.id} className='hover:bg-gray-50'>
                      <td className='border border-gray-200 px-1 py-2 text-center'>
                        {index + 1}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 text-left'>
                        {field.fieldName}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {field.code}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {field.fieldType}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 text-center'>
                        {field.totalArea}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 text-center'>
                        {field.plantedArea === 0 ? "-" : field.plantedArea}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            field.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {field.status}
                        </span>
                      </td>

                      <td className='border border-gray-200 px-3 py-2'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            className='text-blue-600 transition hover:text-blue-800'
                            title='Edit'
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type='button'
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

            {/* Footer */}

            <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 sm:flex-row'>
              <p>
                Showing <strong>1</strong> to{" "}
                <strong>{fieldAndBlockManagementData.fieldList.length}</strong>{" "}
                of{" "}
                <strong>{fieldAndBlockManagementData.fieldList.length}</strong>{" "}
                entries
              </p>

              <div className='join'>
                <button type='button' className='join-item btn btn-sm' disabled>
                  Previous
                </button>

                <button
                  type='button'
                  className='join-item btn btn-sm btn-active'
                >
                  1
                </button>

                <button type='button' className='join-item btn btn-sm' disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            2. FIELD / BLOCK DETAILS
            5 COLUMNS
        ====================================================== */}

        <div className='self-start xl:col-span-6'>
          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Field / Block Details (
                {fieldAndBlockManagementData.details.fieldName})
              </h2>
            </div>

            <div className='grid grid-cols-1 gap-2 p-5 md:grid-cols-2'>
              {/* Left */}

              <div className='space-y-3'>
                {fieldAndBlockManagementData.detailsLeft.map((item) => (
                  <div key={item.key} className='flex items-center text-sm'>
                    <span className='w-36 font-medium text-gray-700'>
                      {item.label}
                    </span>

                    <span className='w-4 text-center text-gray-500'>:</span>

                    <span className='text-gray-900'>
                      {fieldAndBlockManagementData.details[item.key]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right */}

              <div className='space-y-4'>
                {fieldAndBlockManagementData.detailsRight.map((item) => (
                  <div key={item.key} className='flex items-center text-sm'>
                    <span className='w-36 font-medium text-gray-700'>
                      {item.label}
                    </span>

                    <span className='w-4 text-center text-gray-500'>:</span>

                    {item.key === "status" ? (
                      <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'>
                        {fieldAndBlockManagementData.details[item.key]}
                      </span>
                    ) : (
                      <span className='text-gray-900'>
                        {fieldAndBlockManagementData.details[item.key]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            3. MAP
            7 COLUMNS
        ====================================================== */}

        <div className='self-start xl:col-span-6'>
          <div
            className={
              isMapFullscreen
                ? "fixed inset-0 z-[9999] flex h-screen w-screen flex-col overflow-hidden bg-white"
                : "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            }
          >
            {/* =====================================================
                    HEADER
                ====================================================== */}

            <div className='flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Field / Block Map View (
                {fieldAndBlockManagementData.details.fieldName})
              </h2>

              {isMapFullscreen && (
                <button
                  type='button'
                  onClick={() => setIsMapFullscreen(false)}
                  className='flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50'
                >
                  Exit Full Screen
                  <span className='text-sm'>⛶</span>
                </button>
              )}
            </div>

            {/* =====================================================
                    MAP AREA
                ====================================================== */}

            <div
              className={
                isMapFullscreen
                  ? "relative min-h-0 min-w-0 w-screen flex-1 self-stretch"
                  : "relative h-80 w-full"
              }
            >
              {/* =================================================
                      LEAFLET MAP
                  ================================================== */}

              <MapContainer
                center={[
                  Number(fieldAndBlockManagementData.map.latitude),
                  Number(fieldAndBlockManagementData.map.longitude),
                ]}
                zoom={fieldAndBlockManagementData.map.zoom}
                zoomControl={false}
                className='h-full w-full'
              >
                {/* =========================
                        MAP LAYER
                    ========================== */}

                {mapType === "street" ? (
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                ) : (
                  <TileLayer
                    attribution='&copy; Esri'
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                  />
                )}

                {/* =========================
                        ZOOM CONTROL
                    ========================== */}

                <ZoomControl position='topleft' />

                {/* =========================
                        MARKER
                    ========================== */}

                <Marker
                  position={[
                    Number(fieldAndBlockManagementData.map.latitude),
                    Number(fieldAndBlockManagementData.map.longitude),
                  ]}
                  icon={blueMarker}
                >
                  <Popup>
                    <div className='space-y-2'>
                      <h3 className='font-semibold text-green-800'>
                        {fieldAndBlockManagementData.details.fieldName}
                      </h3>

                      <p>
                        Area: {fieldAndBlockManagementData.details.totalArea}
                      </p>

                      <p>
                        Division: {fieldAndBlockManagementData.details.division}
                      </p>

                      <p>
                        Section: {fieldAndBlockManagementData.details.section}
                      </p>

                      <p>
                        Status: {fieldAndBlockManagementData.details.status}
                      </p>
                    </div>
                  </Popup>
                </Marker>

                {/* =========================
                        FIELD POLYGON
                    ========================== */}

                <Polygon
                  positions={fieldAndBlockManagementData.map.polygon}
                  pathOptions={{
                    color: "#15803d",
                    fillColor: "#22c55e",
                    fillOpacity: 0.4,
                    weight: 2,
                  }}
                />
              </MapContainer>

              {/* =================================================
                      MAP LEGEND
                  ================================================== */}

              <div className='absolute right-3 top-3 z-[1000] w-36 rounded-md border border-gray-200 bg-white p-3 shadow-md'>
                <div className='space-y-2'>
                  {/* Selected Field */}

                  <div className='flex items-center gap-2'>
                    <span className='h-3 w-5 rounded-sm border-2 border-green-600 bg-green-500/30' />

                    <span className='text-xs text-gray-700'>
                      Selected Field
                    </span>
                  </div>

                  {/* Other Field */}

                  <div className='flex items-center gap-2'>
                    <span className='h-3 w-5 rounded-sm border border-green-700' />

                    <span className='text-xs text-gray-700'>Other Field</span>
                  </div>

                  {/* Road */}

                  <div className='flex items-center gap-2'>
                    <span className='w-5 border-t-2 border-dashed border-red-500' />

                    <span className='text-xs text-gray-700'>Road</span>
                  </div>

                  {/* Drain */}

                  <div className='flex items-center gap-2'>
                    <span className='w-5 border-t-2 border-dashed border-blue-500' />

                    <span className='text-xs text-gray-700'>Drain</span>
                  </div>

                  {/* Section Boundary */}

                  <div className='flex items-center gap-2'>
                    <span className='h-3 w-5 rounded-sm border-2 border-yellow-500' />

                    <span className='text-xs text-gray-700'>
                      Section Boundary
                    </span>
                  </div>
                </div>
              </div>

              {/* =================================================
                      LAYER BUTTON
                  ================================================== */}

              <div className='absolute bottom-3 left-3 z-[1000]'>
                <button
                  type='button'
                  onClick={() =>
                    setMapType(mapType === "street" ? "satellite" : "street")
                  }
                  className='flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-md transition hover:bg-gray-50'
                >
                  <Layers3 size={16} />

                  {mapType === "street" ? "Satellite" : "Street"}
                </button>
              </div>
            </div>

            {/* =====================================================
                  FOOTER
              ====================================================== */}

            <div className='flex shrink-0 flex-col gap-3 border-t border-gray-200 px-5 py-3 lg:flex-row lg:items-center lg:justify-between'>
              {/* =========================
                      MAP INFORMATION
                  ========================== */}

              <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600'>
                {/* Area */}

                <span>
                  Area:
                  <strong className='ml-1 text-gray-800'>
                    {fieldAndBlockManagementData.map.totalArea} Acre
                  </strong>
                </span>

                <span className='text-gray-300'>|</span>

                {/* Perimeter */}

                <span>
                  Perimeter:
                  <strong className='ml-1 text-gray-800'>
                    {fieldAndBlockManagementData.map.perimeter} Km
                  </strong>
                </span>

                <span className='text-gray-300'>|</span>

                {/* Coordinates */}

                <span>
                  Coordinates:
                  <strong className='ml-1 text-gray-800'>
                    {fieldAndBlockManagementData.map.latitude},{" "}
                    {fieldAndBlockManagementData.map.longitude}
                  </strong>
                </span>
              </div>

              {/* =================================================
                    FULLSCREEN BUTTON
                ================================================== */}

              {!isMapFullscreen && (
                <button
                  type='button'
                  onClick={() => setIsMapFullscreen(true)}
                  className='flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50'
                >
                  View in Full Screen
                  <span className='text-sm'>⛶</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FIELD / BLOCK INFORMATION MODAL
      ====================================================== */}

      {showFieldModal && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4'>
          <div className='w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-xl'>
            {/* Modal Header */}

            <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Field / Block Information
              </h2>

              <button
                type='button'
                onClick={() => {
                  reset();
                  setShowFieldModal(false);
                }}
                className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100'
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className='max-h-[80vh] overflow-y-auto p-5'>
              <form onSubmit={handleSubmit(FieldOrBlockManagementonSubmit)}>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Estate */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.estate
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Estate</option>

                      {fieldAndBlockManagementData.estates.map((estate) => (
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

                  {/* Division */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("division", {
                        required: "Division is required",
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.division
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Division</option>

                      {fieldAndBlockManagementData.divisions.map((division) => (
                        <option key={division.id} value={division.value}>
                          {division.name}
                        </option>
                      ))}
                    </select>

                    {errors.division && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.division.message}
                      </p>
                    )}
                  </div>

                  {/* Section */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Section <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("section", {
                        required: "Section is required",
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.section
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Section</option>

                      {fieldAndBlockManagementData.sections.map((section) => (
                        <option key={section.id} value={section.value}>
                          {section.name}
                        </option>
                      ))}
                    </select>

                    {errors.section && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.section.message}
                      </p>
                    )}
                  </div>

                  {/* Field Name */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Field / Block Name <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter field / block name'
                      {...register("fieldName", {
                        required: "Field / Block Name is required",
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.fieldName
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.fieldName && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.fieldName.message}
                      </p>
                    )}
                  </div>

                  {/* Field Code */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Field / Block Code <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter field / block code'
                      {...register("fieldCode", {
                        required: "Field / Block Code is required",
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.fieldCode
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.fieldCode && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.fieldCode.message}
                      </p>
                    )}
                  </div>

                  {/* Field Type */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Field Type <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("fieldType", {
                        required: "Field Type is required",
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.fieldType
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Field Type</option>

                      {fieldAndBlockManagementData.fieldTypes.map((type) => (
                        <option key={type.id} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>

                    {errors.fieldType && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.fieldType.message}
                      </p>
                    )}
                  </div>

                  {/* Parent */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Parent Field / Block
                    </label>

                    <select
                      {...register("parentField")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white'
                    >
                      <option value=''>Select Parent Field</option>

                      {fieldAndBlockManagementData.parentFields.map((field) => (
                        <option key={field.id} value={field.value}>
                          {field.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Total Area */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Total Area (Acres) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter total area'
                      {...register("totalArea", {
                        required: "Total Area is required",
                        min: {
                          value: 0.01,
                          message: "Area must be greater than 0",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
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

                  {/* Planted Area */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Planted Area (Acres){" "}
                      <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter planted area'
                      {...register("plantedArea", {
                        required: "Planted Area is required",
                        min: {
                          value: 0.01,
                          message: "Area must be greater than 0",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.plantedArea
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.plantedArea && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.plantedArea.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Year */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Year of Planting <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      placeholder='e.g. 2022'
                      {...register("plantingYear", {
                        required: "Planting Year is required",
                        min: {
                          value: 1900,
                          message: "Invalid year",
                        },
                        max: {
                          value: new Date().getFullYear(),
                          message: "Year cannot be in the future",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.plantingYear
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.plantingYear && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.plantingYear.message}
                      </p>
                    )}
                  </div>

                  {/* Bush Type */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Bush Type / Clone <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("bushType", {
                        required: "Bush Type is required",
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.bushType
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Bush Type</option>

                      {fieldAndBlockManagementData.bushTypes.map((type) => (
                        <option key={type.id} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>

                    {errors.bushType && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.bushType.message}
                      </p>
                    )}
                  </div>

                  {/* Spacing */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Spacing (Feet) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='e.g. 3 × 4'
                      {...register("spacing", {
                        required: "Spacing is required",
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.spacing
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.spacing && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.spacing.message}
                      </p>
                    )}
                  </div>

                  {/* Altitude */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Altitude (Meters)
                    </label>

                    <input
                      type='number'
                      placeholder='Enter altitude'
                      {...register("altitude", {
                        min: {
                          value: 0,
                          message: "Altitude cannot be negative",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.altitude
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.altitude && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.altitude.message}
                      </p>
                    )}
                  </div>

                  {/* Slope */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Average Slope (%)
                    </label>

                    <input
                      type='number'
                      step='0.1'
                      placeholder='Enter average slope'
                      {...register("averageSlope", {
                        min: {
                          value: 0,
                          message: "Slope cannot be negative",
                        },
                        max: {
                          value: 100,
                          message: "Slope cannot exceed 100%",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.averageSlope
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.averageSlope && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.averageSlope.message}
                      </p>
                    )}
                  </div>

                  {/* Irrigation */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Irrigation Source
                    </label>

                    <select
                      {...register("irrigation")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white'
                    >
                      <option value=''>Select Irrigation Source</option>

                      {fieldAndBlockManagementData.irrigationSources.map(
                        (source) => (
                          <option key={source.id} value={source.value}>
                            {source.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {/* Soil */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Soil Type
                    </label>

                    <select
                      {...register("soilType")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white'
                    >
                      <option value=''>Select Soil Type</option>

                      {fieldAndBlockManagementData.soilTypes.map((soil) => (
                        <option key={soil.id} value={soil.value}>
                          {soil.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Drainage */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Drainage
                    </label>

                    <select
                      {...register("drainage")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white'
                    >
                      <option value=''>Select Drainage</option>

                      {fieldAndBlockManagementData.drainage.map((item) => (
                        <option key={item.id} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Status <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("status", {
                        required: "Status is required",
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.status
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Status</option>

                      {fieldAndBlockManagementData.statuses.map((status) => (
                        <option key={status.id} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>

                    {errors.status && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.status.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}

                  <div className='md:col-span-2 xl:col-span-3'>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Description / Remarks
                    </label>

                    <textarea
                      rows={3}
                      placeholder='Enter description or remarks...'
                      {...register("description")}
                      className='textarea w-full rounded-lg border border-gray-300 bg-white p-2 focus:border-green-600 focus:outline-none'
                    />
                  </div>
                </div>

                {/* =================================================
                    Modal Footer
                ================================================== */}

                <div className='mt-5 border-t border-gray-200 pt-4'>
                  <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
                    <button
                      type='button'
                      onClick={() => {
                        reset();
                        setShowFieldModal(false);
                      }}
                      className='btn flex h-11 w-full items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 text-gray-700 sm:w-auto'
                    >
                      <X size={18} />
                      Cancel
                    </button>

                    <button
                      type='button'
                      onClick={() => reset()}
                      className='btn flex h-11 w-full items-center gap-2 rounded-lg border-0 bg-green-500 px-6 text-white sm:w-auto'
                    >
                      <RotateCcw size={18} />
                      Reset
                    </button>

                    <button
                      type='submit'
                      className='btn flex h-11 w-full items-center gap-2 rounded-lg border-0 bg-green-900 px-6 text-white sm:w-auto'
                    >
                      <Save size={18} />
                      Save Field
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SUMMARY
      ====================================================== */}

      <div className='mt-4 rounded-xl bg-green-50 p-5 shadow-sm'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-span-1'>
            <div className='flex h-full items-center justify-center'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-700'>
                <Leaf className='h-10 w-10 text-green-700' />
              </div>
            </div>
          </div>

          <div className='col-span-12 lg:col-span-11'>
            <div className='mb-5 pb-3'>
              <h2 className='text-sm font-normal text-green-900'>
                Field / Block Summary
              </h2>
            </div>

            <div className='flex flex-wrap justify-between gap-5'>
              <div className='text-center'>
                <p className='text-sm text-gray-500'>Tea Field</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.teaField}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Nursery</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.nursery}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Extension</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.extension}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Infrastructure</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.infrastructure}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Drain Area</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.drainArea}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Total Area (Acre)</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.totalArea}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Planted Area (Acre)</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.plantedArea}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Active Field</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.activeField}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Inactive Field</p>

                <h3 className='mt-2 text-2xl font-bold text-red-600'>
                  {fieldAndBlockManagementData.summary.inactiveField}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldOrBlockManagement;
