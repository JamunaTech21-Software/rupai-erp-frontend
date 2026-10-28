import React, { useEffect, useState } from "react";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import { useForm } from "react-hook-form";
import L from "leaflet";
import toast from "react-hot-toast";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { fieldAndBlockManagementData } from "../../data/EstateManagementData/FieldAndBlockManagementData";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import MapResizer from "../../components/common/MapResizer";

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

// The label of a stored option value ("tea_field" -> "Tea Field").
const labelOf = (list, value) => list.find((item) => item.value === value)?.label ?? value ?? DASH;
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);

const FieldOrBlockManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [mapType, setMapType] = useState("street");
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Table filters + page
  const [search, setSearch] = useState("");
  const [fieldTypeFilter, setFieldTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const searchText = useDebounced(search);
  useEffect(() => setPage(1), [searchText, fieldTypeFilter, statusFilter]);

  const filters = { search: searchText, fieldType: fieldTypeFilter, status: statusFilter };
  const fields = useApi(() => api.get("/fields", { ...filters, page, perPage: PER_PAGE }), [searchText, fieldTypeFilter, statusFilter, page]);
  const summary = useApi(() => api.get("/fields/summary", filters), [searchText, fieldTypeFilter, statusFilter]);
  const rows = fields.data?.data ?? [];
  const meta = fields.data?.meta;

  // The field shown in the details panel and on the map: the clicked row, else the first one.
  const activeId = rows.some((row) => row.id === selectedId) ? selectedId : rows[0]?.id;
  const record = useApi(() => (activeId ? api.get(`/fields/${activeId}`) : Promise.resolve(null)), [activeId, fields.data]);
  const field = record.data;
  // Without a drawn boundary the map is centred on the estate.
  const estateForMap = useApi(
    () => (field && !field.map ? api.get(`/estates/${field.estate}`) : Promise.resolve(null)),
    [field?.id, field?.map],
  );
  const map = field?.map ?? (estateForMap.data ? { latitude: estateForMap.data.latitude, longitude: estateForMap.data.longitude, perimeter: null, totalArea: field?.totalArea, polygon: null } : null);

  const details = {
    estate: orDash(field?.estateName),
    division: orDash(field?.divisionName),
    section: orDash(field?.sectionName),
    fieldName: orDash(field?.fieldName),
    fieldCode: orDash(field?.fieldCode),
    fieldType: field ? labelOf(fieldAndBlockManagementData.fieldTypes, field.fieldType) : DASH,
    totalArea: field ? `${field.totalArea} Acre` : DASH,
    plantedArea: field ? `${field.plantedArea} Acre` : DASH,
    yearOfPlanting: orDash(field?.plantingYear),
    bushType: field ? labelOf(fieldAndBlockManagementData.bushTypes, field.bushType) : DASH,
    spacing: orDash(field?.spacing),
    altitude: orDash(field?.altitude),
    averageSlope: orDash(field?.averageSlope),
    irrigation: field ? labelOf(fieldAndBlockManagementData.irrigationSources, field.irrigation) : DASH,
    soilType: field ? labelOf(fieldAndBlockManagementData.soilTypes, field.soilType) : DASH,
    drainage: field ? labelOf(fieldAndBlockManagementData.drainage, field.drainage) : DASH,
    status: field ? labelOf(fieldAndBlockManagementData.statuses, field.status) : DASH,
    createdBy: orDash(field?.createdByName),
    createdOn: field?.createdAt
      ? new Date(field.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
      : DASH,
  };

  // Form dropdowns follow each other: estate -> division -> section -> parent field.
  const estateId = watch("estate");
  const divisionId = watch("division");
  const sectionId = watch("section");
  const estateOptions = useApi(() => api.get("/options/estates"), []);
  const divisionOptions = useApi(
    () => (estateId ? api.get("/options/divisions", { estate: estateId }) : Promise.resolve([])),
    [estateId],
  );
  const sectionOptions = useApi(
    () => (divisionId ? api.get("/options/sections", { division: divisionId }) : Promise.resolve([])),
    [divisionId],
  );
  const parentOptions = useApi(
    () => (sectionId ? api.get("/options/fields", { section: sectionId }) : Promise.resolve([])),
    [sectionId],
  );
  // Opening a field for edit: each dropdown shows its saved value once its options have loaded.
  useEffect(() => {
    if (!editing) return;
    for (const [name, options] of [
      ["division", divisionOptions.data],
      ["section", sectionOptions.data],
      ["parentField", parentOptions.data],
    ]) {
      if (options?.some((option) => option.value === editing[name])) setValue(name, editing[name]);
    }
  }, [editing, divisionOptions.data, sectionOptions.data, parentOptions.data, setValue]);
  const parentFieldChoices = [
    fieldAndBlockManagementData.parentFields[0],
    ...(parentOptions.data ?? [])
      .filter((option) => option.id !== editing?.id)
      .map((option) => ({ id: option.id, value: option.value, label: option.label })),
  ];

  const reloadAll = () => {
    fields.reload();
    summary.reload();
    record.reload();
  };

  const openNew = () => {
    setEditing(null);
    reset({});
    setShowFieldModal(true);
  };
  const openEdit = (row) => {
    setEditing(row);
    reset({
      estate: row.estate ?? "",
      division: row.division ?? "",
      section: row.section ?? "",
      fieldName: row.fieldName ?? "",
      fieldCode: row.fieldCode ?? "",
      fieldType: row.fieldType ?? "",
      parentField: row.parentField ?? "",
      totalArea: row.totalArea ?? "",
      plantedArea: row.plantedArea ?? "",
      plantingYear: row.plantingYear ?? "",
      bushType: row.bushType ?? "",
      spacing: row.spacing ?? "",
      altitude: row.altitude ?? "",
      averageSlope: row.averageSlope ?? "",
      irrigation: row.irrigation ?? "",
      soilType: row.soilType ?? "",
      drainage: row.drainage ?? "",
      status: row.status ?? "",
      description: row.description ?? "",
    });
    setShowFieldModal(true);
  };
  const closeModal = () => {
    reset({});
    setEditing(null);
    setShowFieldModal(false);
  };

  // =========================================================
  // Form Submit
  // =========================================================

  const FieldOrBlockManagementonSubmit = async (values) => {
    try {
      if (editing) {
        await api.put(`/fields/${editing.id}`, values);
      } else {
        await api.post("/fields", values);
      }
      toast.success("Field / Block saved successfully.");
      closeModal();
      reloadAll();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      await api.del(`/fields/${deleting.id}`);
      toast.success("Field / Block deleted successfully.");
      setDeleting(null);
      reloadAll();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteBusy(false);
    }
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
                  ({details.division}
                  {" > "}
                  {details.section})
                </span>
              </h2>

              <button
                type='button'
                onClick={openNew}
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    fieldAndBlockManagementData.filters.searchPlaceholder
                  }
                  className='h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-green-600'
                />
              </div>

              <select
                value={fieldTypeFilter}
                onChange={(e) => setFieldTypeFilter(e.target.value)}
                className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
              >
                <option value=''>
                  {fieldAndBlockManagementData.filters.fieldType}
                </option>

                {fieldAndBlockManagementData.fieldTypes.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
              >
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
                title='Reset Filters'
                onClick={() => {
                  setSearch("");
                  setFieldTypeFilter("");
                  setStatusFilter("");
                }}
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
                  {fields.loading && !fields.data ? (
                    <TableSkeleton rows={5} columns={fieldAndBlockManagementData.tableHeaders.length} />
                  ) : fields.error ? (
                    <tr>
                      <td colSpan={fieldAndBlockManagementData.tableHeaders.length} className='p-4'>
                        <ErrorState message={fields.error.message} onRetry={fields.reload} />
                      </td>
                    </tr>
                  ) : rows.length === 0 ? (
                    <EmptyRow columns={fieldAndBlockManagementData.tableHeaders.length} />
                  ) : (
                  rows.map((row, index) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={`cursor-pointer hover:bg-gray-50 ${row.id === activeId ? "bg-green-50" : ""}`}
                    >
                      <td className='border border-gray-200 px-1 py-2 text-center'>
                        {(page - 1) * PER_PAGE + index + 1}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 text-left'>
                        {row.fieldName}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {row.fieldCode}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {labelOf(fieldAndBlockManagementData.fieldTypes, row.fieldType)}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 text-center'>
                        {row.totalArea}
                      </td>

                      <td className='whitespace-nowrap border border-gray-200 px-3 py-2 text-center'>
                        {Number(row.plantedArea) === 0 ? "-" : row.plantedArea}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            row.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {labelOf(fieldAndBlockManagementData.statuses, row.status)}
                        </span>
                      </td>

                      <td className='border border-gray-200 px-3 py-2'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit(row);
                            }}
                            className='text-blue-600 transition hover:text-blue-800'
                            title='Edit'
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type='button'
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleting(row);
                            }}
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

            {/* Footer */}

            <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 sm:flex-row'>
              <p>
                Showing <strong>{rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0}</strong> to{" "}
                <strong>{(page - 1) * PER_PAGE + rows.length}</strong>{" "}
                of{" "}
                <strong>{meta?.total ?? 0}</strong>{" "}
                entries
              </p>

              <div className='join'>
                <button
                  type='button'
                  className='join-item btn btn-sm'
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </button>

                <button
                  type='button'
                  className='join-item btn btn-sm btn-active'
                >
                  {page}
                </button>

                <button
                  type='button'
                  className='join-item btn btn-sm'
                  disabled={page >= (meta?.totalPages ?? 1)}
                  onClick={() => setPage((p) => p + 1)}
                >
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
                {details.fieldName})
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
                      {details[item.key]}
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
                        {details[item.key]}
                      </span>
                    ) : (
                      <span className='text-gray-900'>
                        {details[item.key]}
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
                {details.fieldName})
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
                key={`${field?.id}-${map?.latitude}-${map?.longitude}`}
                center={[Number(map?.latitude ?? 24.9), Number(map?.longitude ?? 91.87)]}
                zoom={map?.zoom ?? 16}
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

                <MapResizer trigger={isMapFullscreen} />

                {/* =========================
                        MARKER
                    ========================== */}

                {map && (
                <Marker
                  position={[Number(map.latitude), Number(map.longitude)]}
                  icon={blueMarker}
                >
                  <Popup>
                    <div className='space-y-2'>
                      <h3 className='font-semibold text-green-800'>
                        {details.fieldName}
                      </h3>

                      <p>
                        Area: {details.totalArea}
                      </p>

                      <p>
                        Division: {details.division}
                      </p>

                      <p>
                        Section: {details.section}
                      </p>

                      <p>
                        Status: {details.status}
                      </p>
                    </div>
                  </Popup>
                </Marker>
                )}

                {/* =========================
                        FIELD POLYGON
                    ========================== */}

                {map?.polygon && (
                  <Polygon
                    positions={map.polygon}
                    pathOptions={{
                      color: "#15803d",
                      fillColor: "#22c55e",
                      fillOpacity: 0.4,
                      weight: 2,
                    }}
                  />
                )}
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
                    {orDash(map?.totalArea)} Acre
                  </strong>
                </span>

                <span className='text-gray-300'>|</span>

                {/* Perimeter */}

                <span>
                  Perimeter:
                  <strong className='ml-1 text-gray-800'>
                    {orDash(map?.perimeter)} Km
                  </strong>
                </span>

                <span className='text-gray-300'>|</span>

                {/* Coordinates */}

                <span>
                  Coordinates:
                  <strong className='ml-1 text-gray-800'>
                    {orDash(map?.latitude)}, {orDash(map?.longitude)}
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
                onClick={closeModal}
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
                        onChange: () => {
                          setValue("division", "");
                          setValue("section", "");
                          setValue("parentField", "");
                        },
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
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

                  {/* Division */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("division", {
                        required: "Division is required",
                        onChange: () => {
                          setValue("section", "");
                          setValue("parentField", "");
                        },
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.division
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>
{!estateId
 ? "Select Estate first"
 : divisionOptions.data?.length === 0
 ? "No divisions for this estate"
 : "Select Division"}
</option>

                      {(divisionOptions.data ?? []).map((division) => (
                        <option key={division.id} value={division.value}>
                          {division.label}
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
                        onChange: () => setValue("parentField", ""),
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.section
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>
{!divisionId
 ? "Select Division first"
 : sectionOptions.data?.length === 0
 ? "No sections for this division"
 : "Select Section"}
</option>

                      {(sectionOptions.data ?? []).map((section) => (
                        <option key={section.id} value={section.value}>
                          {section.label}
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

                      {parentFieldChoices.map((field) => (
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
                      onClick={closeModal}
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
                      disabled={isSubmitting}
                      className='btn flex h-11 w-full items-center gap-2 rounded-lg border-0 bg-green-900 px-6 text-white disabled:opacity-60 sm:w-auto'
                    >
                      <Save size={18} />
                      {isSubmitting ? "Saving..." : "Save Field"}
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
                  {summary.data?.teaField ?? "—"}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Nursery</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {summary.data?.nursery ?? "—"}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Extension</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {summary.data?.extension ?? "—"}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Infrastructure</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {summary.data?.infrastructure ?? "—"}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Drain Area</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {summary.data?.drainArea ?? "—"}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Total Area (Acre)</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {summary.data?.totalArea ?? "—"}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Planted Area (Acre)</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {summary.data?.plantedArea ?? "—"}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Active Field</p>

                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {summary.data?.activeField ?? "—"}
                </h3>
              </div>

              <div className='text-center'>
                <p className='text-sm text-gray-500'>Inactive Field</p>

                <h3 className='mt-2 text-2xl font-bold text-red-600'>
                  {summary.data?.inactiveField ?? "—"}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={Boolean(deleting)}
        title='Delete field / block?'
        message={`${deleting?.fieldName ?? ""} will be removed from the list.`}
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default FieldOrBlockManagement;
