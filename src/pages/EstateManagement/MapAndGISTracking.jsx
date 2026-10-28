import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import { useForm } from "react-hook-form";
import { mapAndGISTrackingData } from "../../data/EstateManagementData/MapAndGISTrackingData";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import CardSkeleton from "../../components/common/CardSkeleton";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import FieldFormModal from "../../components/EstateManagement/FieldFormModal";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  Map,
  Leaf,
  Trees,
  SquareDashed,
  CheckCircle2,
  XCircle,
  Download,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const summaryIconMap = {
  Map,
  Leaf,
  Trees,
  SquareDashed,
  CheckCircle2,
  XCircle,
};
const actionIconMap = {
  Download,
  Plus,
};

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
const PER_PAGE = 10;

// The filter lists show labels; the API takes the stored values.
const FIELD_TYPE_VALUES = {
  "Tea Field": "tea_field",
  Nursery: "nursery",
  Extension: "extension",
  Infrastructure: "infrastructure",
  Drain: "drain",
  "Water Body": "water_body",
};
const STATUS_VALUES = { Active: "active", Inactive: "inactive", "Under Development": "under_development" };
const labelOfValue = (values, value) =>
  Object.entries(values).find(([, stored]) => stored === value)?.[0] ?? value ?? "-";

// Shape of an answer that has not arrived yet.
const EMPTY = {
  mapInfo: {},
  summaryCards: [],
  fieldList: [],
  estateBoundary: [],
  sectionBoundaries: [],
  fieldPolygons: [],
  roads: [],
  drains: [],
  waterBodies: [],
  buildings: [],
  meta: { page: 1, perPage: PER_PAGE, total: 0, totalPages: 1 },
};

const MapAndGISTracking = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // What the map and table show: the applied filters and page.
  const [applied, setApplied] = useState(null);
  const [page, setPage] = useState(1);

  // Dropdowns follow each other: estate -> division -> section.
  const estateId = watch("estate");
  const divisionId = watch("division");
  const estateOptions = useApi(() => api.get("/options/estates"), []);
  const divisionOptions = useApi(
    () => (estateId ? api.get("/options/divisions", { estate: estateId }) : Promise.resolve([])),
    [estateId],
  );
  const sectionOptions = useApi(
    () => (divisionId ? api.get("/options/sections", { division: divisionId }) : Promise.resolve([])),
    [divisionId],
  );

  // The first estate is shown until another is searched for.
  const firstEstate = estateOptions.data?.[0]?.value;
  useEffect(() => {
    if (firstEstate && !applied) {
      setApplied({ estate: firstEstate });
      setValue("estate", firstEstate);
    }
  }, [firstEstate, applied, setValue]);

  const result = useApi(
    () => (applied ? api.get("/map", { ...applied, page, perPage: PER_PAGE }) : Promise.resolve(null)),
    [applied, page],
  );
  const data = result.data ?? EMPTY;
  const { mapInfo, meta } = data;

  const [visibleLayers, setVisibleLayers] = useState(() => {
    const initialLayers = {};

    mapAndGISTrackingData.layerControls.forEach((layer) => {
      initialLayers[layer.key] = layer.checked;
    });

    return initialLayers;
  });
  const toggleLayer = (layerKey) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };
  const onSubmit = (values) => {
    setPage(1);
    setApplied({
      estate: values.estate,
      division: values.division,
      section: values.section,
      fieldType: FIELD_TYPE_VALUES[values.fieldType] ?? "",
      status: STATUS_VALUES[values.status] ?? "",
    });
    toast.success("Search completed successfully!");
  };

  const [mapType, setMapType] = React.useState("street");

  // Row buttons: View opens a popup, Edit opens the field's edit popup, Delete asks first.
  const [viewing, setViewing] = useState(null);
  // Edit / Add open the Field / Block form as a popup on this page.
  const [formField, setFormField] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const openEdit = async (field) => {
    try {
      setFormField(await api.get(`/fields/${field.id}`));
      setFormOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const closeForm = () => {
    setFormOpen(false);
    setFormField(null);
  };
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  useEffect(() => {
    if (!viewing) return undefined;
    const onKey = (event) => event.key === "Escape" && setViewing(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [viewing]);
  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      await api.del(`/fields/${deleting.id}`);
      toast.success("Field / Block deleted successfully.");
      setDeleting(null);
      // Deleting the last row of a page goes back one page.
      if (data.fieldList.length === 1 && page > 1) setPage(page - 1);
      else result.reload();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteBusy(false);
    }
  };
  // Export: every field of the current filters as a CSV file.
  const exportFields = async () => {
    if (!applied) return;
    setExporting(true);
    try {
      const rows = [];
      for (let pageNo = 1; ; pageNo += 1) {
        const part = await api.get("/map", { ...applied, page: pageNo, perPage: 100 });
        rows.push(...part.fieldList);
        if (pageNo >= (part.meta?.totalPages ?? 1)) break;
      }
      if (rows.length === 0) {
        toast.error("There is nothing to export.");
        return;
      }
      const cell = (value) => {
        const text = String(value ?? "");
        return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
      };
      const lines = [
        mapAndGISTrackingData.tableHeaders.slice(1, -1),
        ...rows.map((field) => [
          field.fieldName,
          field.code,
          field.division,
          field.section,
          labelOfValue(FIELD_TYPE_VALUES, field.fieldType),
          field.totalArea,
          field.teaArea,
          field.latitude,
          field.longitude,
          labelOfValue(STATUS_VALUES, field.status),
        ]),
      ];
      const blob = new Blob(["\ufeff" + lines.map((line) => line.map(cell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `fields-gis-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      toast.success(`${rows.length} ${rows.length === 1 ? "field" : "fields"} exported successfully!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setExporting(false);
    }
  };
  return (
    <div>
      <EstateManagementTabs />
      <div className='space-y-6'>
        {/* ================= Top Section ================= */}
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-12'>
          {/* Left Filter */}
          <div className='space-y-4 xl:col-span-3'>
            {/* ================= Filter Card ================= */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-2 py-2'>
                  <h2 className='text-lg font-semibold text-green-800'>
                    Filters
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-4 p-2'>
                  {/* =====================================================
                      Estate
                  ====================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Estate
                    </label>

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                        onChange: () => {
                          setValue("division", "");
                          setValue("section", "");
                        },
                      })}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                    >
                      <option value=''>Select Estate</option>

                      {(estateOptions.data ?? []).map((estate) => (
                        <option key={estate.id} value={estate.value}>
                          {estate.label}
                        </option>
                      ))}
                    </select>

                    {errors.estate && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.estate.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                        Division
                    ====================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division
                    </label>

                    <select
                      {...register("division", {
                        required: "Division is required",
                        onChange: () => setValue("section", ""),
                      })}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
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
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.division.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                          Section
                      ====================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Section
                    </label>

                    <select
                      {...register("section", {
                        required: "Section is required",
                      })}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
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
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.section.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                        Field / Block Type
                    ====================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Field / Block Type
                    </label>

                    <select
                      {...register("fieldType", {
                        required: "Field / Block Type is required",
                      })}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                    >
                      <option value=''>Select Type</option>

                      {mapAndGISTrackingData.fieldTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    {errors.fieldType && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.fieldType.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                          Status
                      ====================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Status
                    </label>

                    <select
                      {...register("status", {
                        required: "Status is required",
                      })}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                    >
                      <option value=''>Select Status</option>

                      {mapAndGISTrackingData.statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    {errors.status && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.status.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                          Buttons
                      ====================================================== */}
                  <div className='grid grid-cols-2 gap-3 pt-2'>
                    <button
                      type='submit'
                      className='btn h-11 cursor-pointer rounded-sm border-0 bg-green-700 text-white hover:bg-green-800'
                    >
                      Search
                    </button>

                    <button
                      type='button'
                      onClick={() => {
                        reset({ estate: firstEstate ?? "", division: "", section: "", fieldType: "", status: "" });
                        setPage(1);
                        if (firstEstate) setApplied({ estate: firstEstate });
                      }}
                      className='btn h-11 cursor-pointer rounded-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* ================= Layer Control Card ================= */}

            <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
              <div className='border-b border-gray-200 px-2 py-4'>
                <h2 className='text-lg font-semibold text-green-800'>
                  Layer Control
                </h2>
              </div>

              <div className='space-y-3 p-2'>
                {mapAndGISTrackingData.layerControls.map((layer) => (
                  <label
                    key={layer.id}
                    className='flex cursor-pointer items-center gap-3'
                  >
                    <input
                      type='checkbox'
                      checked={visibleLayers[layer.key] ?? false}
                      onChange={() => toggleLayer(layer.key)}
                      className='checkbox checkbox-success checkbox-sm'
                    />

                    <span
                      className='h-3 w-3 rounded-sm border border-gray-300'
                      style={{
                        backgroundColor: layer.color,
                      }}
                    />

                    <span className='text-sm text-gray-700'>{layer.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Map */}
          <div className='xl:col-span-9'>
            <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* =====================================================
                    MAP HEADER
                ====================================================== */}
              <div className='flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h2 className='text-lg font-semibold text-green-800'>
                    Estate Map - GIS View
                  </h2>

                  <p className='mt-1 text-xs text-gray-500'>
                    Interactive Estate GIS Map
                  </p>
                </div>

                {/* MAP TYPE */}
                <button
                  type='button'
                  onClick={() =>
                    setMapType(mapType === "street" ? "satellite" : "street")
                  }
                  className='flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50'
                >
                  {mapType === "street" ? <>🛰 Satellite</> : <>🗺 Street</>}
                </button>
              </div>

              {/* =====================================================
                      MAP BODY
                  ====================================================== */}
              <div className='relative isolate h-[550px] w-full'>
                <MapContainer
                  key={mapInfo.estateId ?? "none"}
                  center={
                    mapInfo.latitude != null
                      ? [Number(mapInfo.latitude), Number(mapInfo.longitude)]
                      : mapAndGISTrackingData.mapSettings.center
                  }
                  zoom={mapInfo.zoom ?? mapAndGISTrackingData.mapSettings.defaultZoom}
                  minZoom={mapAndGISTrackingData.mapSettings.minZoom}
                  maxZoom={mapAndGISTrackingData.mapSettings.maxZoom}
                  zoomControl={false}
                  className='h-full w-full'
                >
                  {/* =================================================
            TILE LAYER
        ================================================== */}

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

                  {/* =================================================
            ZOOM CONTROL
        ================================================== */}

                  <ZoomControl position='topright' />

                  {/* =================================================
            ESTATE BOUNDARY
        ================================================== */}

                  {visibleLayers?.estateBoundary !== false && (
                    <Polygon
                      positions={data.estateBoundary}
                      pathOptions={{
                        color: "#15803d",
                        fillColor: "#22c55e",
                        fillOpacity: 0.15,
                        weight: 3,
                      }}
                      eventHandlers={{
                        mouseover: (e) => {
                          e.target.setStyle({
                            fillOpacity: 0.3,
                            weight: 5,
                          });
                        },

                        mouseout: (e) => {
                          e.target.setStyle({
                            fillOpacity: 0.15,
                            weight: 3,
                          });
                        },
                      }}
                    >
                      <Popup>
                        <div className='space-y-1 text-sm'>
                          <h3 className='font-semibold text-green-800'>
                            {mapInfo.estateName}
                          </h3>

                          <p>
                            <strong>Total Area:</strong>{" "}
                            {mapInfo.totalArea}
                          </p>

                          <p>
                            <strong>Tea Area:</strong>{" "}
                            {mapInfo.teaArea}
                          </p>

                          <p>
                            <strong>Non Tea Area:</strong>{" "}
                            {mapInfo.nonTeaArea}
                          </p>
                        </div>
                      </Popup>
                    </Polygon>
                  )}

                  {/* =================================================
            SECTION BOUNDARIES
        ================================================== */}

                  {visibleLayers?.sectionBoundary &&
                    data.sectionBoundaries?.map((section) => (
                      <Polygon
                        key={section.id}
                        positions={section.coordinates}
                        pathOptions={{
                          color: section.color || "#7c3aed",
                          fillColor: section.color || "#8b5cf6",
                          fillOpacity: 0.08,
                          weight: 2,
                          dashArray: "6 5",
                        }}
                      >
                        <Popup>
                          <div className='text-sm'>
                            <h3 className='font-semibold text-green-800'>
                              {section.name}
                            </h3>
                          </div>
                        </Popup>
                      </Polygon>
                    ))}

                  {/* =================================================
            FIELD / BLOCK POLYGONS
        ================================================== */}

                  {visibleLayers?.fieldBoundary !== false &&
                    data.fieldPolygons?.map((field) => {
                      /*
                       * fieldPolygons-এর মধ্যে যদি শুধু fieldId থাকে,
                       * তাহলে fieldList থেকে actual field information নেওয়া হবে।
                       */

                      const fieldDetails =
                        data.fieldList?.find(
                          (item) => item.id === (field.fieldId ?? field.id),
                        );

                      return (
                        <Polygon
                          key={field.id}
                          positions={field.coordinates}
                          pathOptions={{
                            color: field.color || "#2563eb",

                            fillColor: field.color || "#3b82f6",

                            fillOpacity: 0.35,
                            weight: 2,
                          }}
                          eventHandlers={{
                            mouseover: (e) => {
                              e.target.setStyle({
                                weight: 4,
                                fillOpacity: 0.65,
                              });
                            },

                            mouseout: (e) => {
                              e.target.setStyle({
                                weight: 2,
                                fillOpacity: 0.35,
                              });
                            },
                          }}
                        >
                          <Popup>
                            <div className='min-w-[200px] space-y-1 text-sm'>
                              {/* FIELD NAME */}

                              <h3 className='mb-2 border-b border-gray-200 pb-2 font-semibold text-green-800'>
                                {fieldDetails?.fieldName ||
                                  field.name ||
                                  field.code ||
                                  "Field / Block"}
                              </h3>

                              {/* CODE */}

                              <p>
                                <strong>Code:</strong>{" "}
                                {fieldDetails?.code || field.code || "-"}
                              </p>

                              {/* FIELD TYPE */}

                              <p>
                                <strong>Field Type:</strong>{" "}
                                {labelOfValue(
                                  FIELD_TYPE_VALUES,
                                  fieldDetails?.fieldType || field.fieldType,
                                )}
                              </p>

                              {/* TOTAL AREA */}

                              <p>
                                <strong>Total Area:</strong>{" "}
                                {fieldDetails?.totalArea ?? field.area ?? "-"}
                              </p>

                              {/* TEA AREA */}

                              <p>
                                <strong>Tea Area:</strong>{" "}
                                {fieldDetails?.teaArea ?? field.teaArea ?? "-"}
                              </p>

                              {/* PLANTING YEAR */}

                              <p>
                                <strong>Plant Year:</strong>{" "}
                                {fieldDetails?.plantingYear ??
                                  field.plantingYear ??
                                  "-"}
                              </p>

                              {/* STATUS */}

                              <p>
                                <strong>Status:</strong>{" "}
                                {labelOfValue(
                                  STATUS_VALUES,
                                  fieldDetails?.status || field.status,
                                )}
                              </p>
                            </div>
                          </Popup>
                        </Polygon>
                      );
                    })}

                  {/* =================================================
            ROADS
        ================================================== */}

                  {visibleLayers?.road &&
                    data.roads?.map((road) => (
                      <Polyline
                        key={road.id}
                        positions={road.coordinates}
                        pathOptions={{
                          color: road.color || "#ef4444",
                          weight: 4,
                        }}
                      >
                        <Popup>
                          <div className='text-sm'>
                            <h3 className='font-semibold text-green-800'>
                              {road.name}
                            </h3>

                            {road.type && (
                              <p>
                                <strong>Type:</strong> {road.type}
                              </p>
                            )}
                          </div>
                        </Popup>
                      </Polyline>
                    ))}

                  {/* =================================================
            DRAINS / CANALS
        ================================================== */}

                  {visibleLayers?.drain &&
                    data.drains?.map((drain) => (
                      <Polyline
                        key={drain.id}
                        positions={drain.coordinates}
                        pathOptions={{
                          color: drain.color || "#2563eb",
                          weight: 3,
                          dashArray: "6 5",
                        }}
                      >
                        <Popup>
                          <div className='text-sm'>
                            <h3 className='font-semibold text-green-800'>
                              {drain.name}
                            </h3>

                            {drain.type && (
                              <p>
                                <strong>Type:</strong> {drain.type}
                              </p>
                            )}
                          </div>
                        </Popup>
                      </Polyline>
                    ))}

                  {/* =================================================
                        WATER BODIES
                    ================================================== */}

                  {visibleLayers?.waterBody &&
                    data.waterBodies?.map((water) => (
                      <Polygon
                        key={water.id}
                        positions={water.coordinates}
                        pathOptions={{
                          color: water.color || "#0284c7",
                          fillColor: water.color || "#38bdf8",
                          fillOpacity: 0.4,
                          weight: 2,
                        }}
                      >
                        <Popup>
                          <div className='text-sm'>
                            <h3 className='font-semibold text-green-800'>
                              {water.name}
                            </h3>

                            {water.type && (
                              <p>
                                <strong>Type:</strong> {water.type}
                              </p>
                            )}
                          </div>
                        </Popup>
                      </Polygon>
                    ))}

                  {/* =================================================
                            BUILDINGS / INFRASTRUCTURE
                        ================================================== */}

                  {visibleLayers?.building &&
                    data.buildings?.map((building) => (
                      <Marker
                        key={building.id}
                        position={[building.latitude, building.longitude]}
                      >
                        <Popup>
                          <div className='min-w-[180px] space-y-1 text-sm'>
                            <h3 className='font-semibold text-green-800'>
                              {building.name}
                            </h3>

                            {building.type && (
                              <p>
                                <strong>Type:</strong> {building.type}
                              </p>
                            )}

                            <p>
                              <strong>Latitude:</strong> {building.latitude}
                            </p>

                            <p>
                              <strong>Longitude:</strong> {building.longitude}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                </MapContainer>

                {/* =====================================================
                        MAP LEGEND
                    ====================================================== */}

                <div className='absolute bottom-4 left-4 z-[1000] rounded-lg border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm'>
                  <h3 className='mb-2 text-xs font-semibold text-gray-700'>
                    Map Legend
                  </h3>

                  <div className='space-y-2'>
                    {mapAndGISTrackingData.legends.map((legend) => (
                      <div
                        key={legend.id}
                        className='flex items-center gap-2 text-xs text-gray-600'
                      >
                        <span
                          className='h-3 w-3 rounded-sm border border-gray-300'
                          style={{
                            backgroundColor: legend.color,
                          }}
                        />

                        <span>{legend.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* =====================================================
                        MAP INFORMATION
                    ====================================================== */}

                <div className='absolute bottom-4 right-4 z-[1000] hidden rounded-lg border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur-sm md:block'>
                  <div className='space-y-1 text-xs text-gray-600'>
                    <p>
                      <span className='font-semibold'>Area:</span>{" "}
                      {mapInfo.totalArea}
                    </p>

                    <p>
                      <span className='font-semibold'>Tea Area:</span>{" "}
                      {mapInfo.teaArea}
                    </p>

                    <p>
                      <span className='font-semibold'>Latitude:</span>{" "}
                      {mapInfo.latitude}
                    </p>

                    <p>
                      <span className='font-semibold'>Longitude:</span>{" "}
                      {mapInfo.longitude}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Summary ================= */}

        {result.loading && !result.data && <CardSkeleton count={6} />}
        {result.error && <ErrorState message={result.error.message} onRetry={result.reload} />}
        <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
          {data.summaryCards.map((card) => {
            const Icon = summaryIconMap[card.icon];

            return (
              <div
                key={card.id}
                className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md'
              >
                <div className='flex items-center gap-4'>
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                      card.color === "red" ? "bg-red-50" : "bg-green-50"
                    }`}
                  >
                    <Icon
                      className={`h-8 w-8 ${
                        card.color === "red" ? "text-red-600" : "text-green-700"
                      }`}
                    />
                  </div>

                  <div>
                    <p className='text-xs font-medium text-gray-500'>
                      {card.title}
                    </p>

                    <h3
                      className={`mt-1 text-3xl font-bold ${
                        card.color === "red" ? "text-red-600" : "text-green-700"
                      }`}
                    >
                      {card.value}
                    </h3>

                    {card.unit && (
                      <p className='text-sm text-gray-500'>{card.unit}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= Table ================= */}

        <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
          <div className='flex flex-col gap-3 border-b border-gray-200 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between'>
            <h2 className='text-base font-semibold text-green-800'>
              Field / Block List with GIS Information
            </h2>

            <div className='flex flex-wrap items-center gap-2'>
              {mapAndGISTrackingData.actionButtons.map((button) => {
                const Icon = actionIconMap[button.icon];

                return (
                  <button
                    key={button.id}
                    type='button'
                    disabled={button.color !== "primary" && exporting}
                    onClick={() => {
                      if (button.color !== "primary") exportFields();
                      else {
                        setFormField(null);
                        setFormOpen(true);
                      }
                    }}
                    className={`inline-flex cursor-pointer h-9 items-center gap-2 rounded-md px-4 text-sm font-medium transition ${
                      button.color === "primary"
                        ? "bg-green-700 text-white hover:bg-green-800"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={16} />
                    {button.color !== "primary" && exporting ? "Exporting..." : button.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='overflow-x-auto'>
            <div className='overflow-hidden rounded-xl border border-gray-200 bg-white'>
              <div className='overflow-x-auto'>
                <table className='w-full border-collapse'>
                  <thead>
                    <tr className='bg-gray-50'>
                      {mapAndGISTrackingData.tableHeaders.map(
                        (header, index) => (
                          <th
                            key={index}
                            className='border border-gray-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-700 whitespace-nowrap'
                          >
                            {header}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {result.loading && !result.data ? (
                      <TableSkeleton rows={5} columns={mapAndGISTrackingData.tableHeaders.length} />
                    ) : data.fieldList.length === 0 ? (
                      <EmptyRow columns={mapAndGISTrackingData.tableHeaders.length} />
                    ) : (
                    data.fieldList.map((field, index) => (
                      <tr
                        key={field.id}
                        className='transition hover:bg-green-50'
                      >
                        <td className='border border-gray-200 px-3 py-3 text-center'>
                          {(page - 1) * PER_PAGE + index + 1}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 font-medium whitespace-nowrap'>
                          {field.fieldName}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 whitespace-nowrap'>
                          {field.code}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 whitespace-nowrap'>
                          {field.division}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 whitespace-nowrap'>
                          {field.section}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 whitespace-nowrap'>
                          {labelOfValue(FIELD_TYPE_VALUES, field.fieldType)}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center'>
                          {field.totalArea}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center'>
                          {field.teaArea}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center whitespace-nowrap'>
                          {Number(field.latitude).toFixed(5)}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center whitespace-nowrap'>
                          {Number(field.longitude).toFixed(5)}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center'>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              field.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {labelOfValue(STATUS_VALUES, field.status)}
                          </span>
                        </td>

                        <td className='border border-gray-200 px-3 py-3'>
                          <div className='flex items-center justify-center gap-2'>
                            <button
                              type='button'
                              title='View'
                              onClick={() => setViewing(field)}
                              className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100'
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              type='button'
                              title='Edit'
                              onClick={() => openEdit(field)}
                              className='flex cursor-pointer h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100'
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type='button'
                              title='Delete'
                              onClick={() => setDeleting(field)}
                              className='flex cursor-pointer h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100'
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
            </div>
            <div className='mt-4 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-4 md:flex-row p-2'>
              <p className='text-sm text-gray-600'>
                Showing{" "}
                <span className='font-semibold'>
                  {data.fieldList.length > 0 ? (page - 1) * PER_PAGE + 1 : 0}
                </span>{" "}
                to{" "}
                <span className='font-semibold'>
                  {(page - 1) * PER_PAGE + data.fieldList.length}
                </span>{" "}
                of{" "}
                <span className='font-semibold'>{meta.total}</span>{" "}
                entries
              </p>

              <div className='join'>
                <button
                  type='button'
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className='join-item btn btn-sm'
                >
                  «
                </button>

                {Array.from(
                  {
                    length: meta.totalPages,
                  },
                  (_, index) => (
                    <button
                      key={index}
                      type='button'
                      onClick={() => setPage(index + 1)}
                      className={`join-item btn btn-sm ${
                        page === index + 1 ? "btn-success" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ),
                )}

                <button
                  type='button'
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className='join-item btn btn-sm'
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewing && (
        <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-3' onMouseDown={() => setViewing(null)}>
          <div
            role='dialog'
            aria-modal='true'
            aria-label='Field / Block details'
            className='flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl bg-white shadow-xl'
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
              <h2 className='text-base font-semibold text-green-700'>Field / Block Details</h2>
              <button type='button' onClick={() => setViewing(null)} aria-label='Close' className='rounded p-1 text-gray-500 hover:bg-gray-100'>
                <X size={18} />
              </button>
            </div>
            <dl className='grid grid-cols-1 gap-x-6 gap-y-3 overflow-y-auto p-5 sm:grid-cols-2'>
              {[
                ["Field / Block", viewing.fieldName],
                ["Code", viewing.code],
                ["Division", viewing.division],
                ["Section", viewing.section],
                ["Type", labelOfValue(FIELD_TYPE_VALUES, viewing.fieldType)],
                ["Status", labelOfValue(STATUS_VALUES, viewing.status)],
                ["Area (Acre)", viewing.totalArea],
                ["Tea Area", viewing.teaArea],
                ["Latitude", viewing.latitude == null ? "-" : Number(viewing.latitude).toFixed(5)],
                ["Longitude", viewing.longitude == null ? "-" : Number(viewing.longitude).toFixed(5)],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className='text-xs text-gray-500'>{label}</dt>
                  <dd className='text-sm font-medium text-gray-800'>{value === null || value === undefined || value === "" ? "-" : value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
      {formOpen && (
        <FieldFormModal
          editing={formField}
          onClose={closeForm}
          onSaved={() => {
            closeForm();
            result.reload();
          }}
        />
      )}
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

export default MapAndGISTracking;
