import React from "react";
import EstateManagementTabs from "../components/EstateManagement/EstateManagementTabs";
import { useForm } from "react-hook-form";
import { mapAndGISTrackingData } from "../data/MapAndGISTrackingData";
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
const MapAndGISTracking = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    toast.success("Search completed successfully!");
  };

  const [mapType, setMapType] = React.useState("street");
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
                  {/* Estate */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Estate
                    </label>

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                      })}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                    >
                      <option value=''>Select Estate</option>
                      {mapAndGISTrackingData.estates.map((estate) => (
                        <option key={estate} value={estate}>
                          {estate}
                        </option>
                      ))}
                    </select>

                    {errors.estate && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.estate.message}
                      </p>
                    )}
                  </div>

                  {/* Division */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division
                    </label>

                    <select
                      {...register("division", {
                        required: "Division is required",
                      })}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                    >
                      <option value=''>Select Division</option>
                      {mapAndGISTrackingData.divisions.map((division) => (
                        <option key={division} value={division}>
                          {division}
                        </option>
                      ))}
                    </select>

                    {errors.division && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.division.message}
                      </p>
                    )}
                  </div>

                  {/* Section */}
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
                      <option value=''>Select Section</option>
                      {mapAndGISTrackingData.sections.map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>

                    {errors.section && (
                      <p className='mt-1 text-sm text-red-500'>
                        {errors.section.message}
                      </p>
                    )}
                  </div>

                  {/* Field Type */}
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

                  {/* Status */}
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

                  {/* Buttons */}
                  <div className='grid grid-cols-2 gap-3 pt-2'>
                    <button
                      type='submit'
                      className='btn h-11 border-0 bg-green-700 text-white hover:bg-green-800'
                    >
                      Search
                    </button>

                    <button
                      type='button'
                      onClick={() => reset()}
                      className='btn h-11 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
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
                <label className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm'
                  />
                  <span className='text-sm text-gray-700'>
                    Field / Block Boundary
                  </span>
                </label>

                <label className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm'
                  />
                  <span className='text-sm text-gray-700'>Road</span>
                </label>

                <label className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm'
                  />
                  <span className='text-sm text-gray-700'>Drain / Canal</span>
                </label>

                <label className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm'
                  />
                  <span className='text-sm text-gray-700'>Water Body</span>
                </label>

                <label className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm'
                  />
                  <span className='text-sm text-gray-700'>
                    Building / Infrastructure
                  </span>
                </label>

                <label className='flex items-center gap-3'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm'
                  />
                  <span className='text-sm text-gray-700'>
                    Section Boundary
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Map */}
          <div className='xl:col-span-9'>
            <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
              <div className='border-b border-gray-200 px-5 py-4'>
                <h2 className='text-lg font-semibold text-green-800'>
                  Estate Map - GIS View
                </h2>
              </div>

              <div className='relative h-[550px] w-full'>
                <div className='absolute left-4 top-4 z-[1000]'>
                  <button
                    type='button'
                    onClick={() =>
                      setMapType(mapType === "street" ? "satellite" : "street")
                    }
                    className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-lg hover:bg-gray-100'
                  >
                    {mapType === "street" ? "🛰 Satellite" : "🗺 Street"}
                  </button>
                </div>
                <MapContainer
                  center={mapAndGISTrackingData.mapSettings.center}
                  zoom={mapAndGISTrackingData.mapSettings.defaultZoom}
                  minZoom={mapAndGISTrackingData.mapSettings.minZoom}
                  maxZoom={mapAndGISTrackingData.mapSettings.maxZoom}
                  zoomControl={false}
                  className='h-full w-full'
                >
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

                  <ZoomControl position='topright' />
                  <Polygon
                    positions={mapAndGISTrackingData.estateBoundary}
                    pathOptions={{
                      color: "#15803d",
                      fillColor: "#22c55e",
                      fillOpacity: 0.2,
                      weight: 3,
                    }}
                    eventHandlers={{
                      mouseover: (e) => {
                        e.target.setStyle({
                          fillOpacity: 0.35,
                          weight: 5,
                        });
                      },
                      mouseout: (e) => {
                        e.target.setStyle({
                          fillOpacity: 0.2,
                          weight: 3,
                        });
                      },
                    }}
                  >
                    <Popup>
                      <div className='space-y-1'>
                        <h3 className='font-semibold'>
                          {mapAndGISTrackingData.mapInfo.estateName}
                        </h3>

                        <p>
                          Total Area: {mapAndGISTrackingData.mapInfo.totalArea}
                        </p>

                        <p>Tea Area: {mapAndGISTrackingData.mapInfo.teaArea}</p>
                      </div>
                    </Popup>
                  </Polygon>
                  {mapAndGISTrackingData.fieldPolygons.map((field) => (
                    <Polygon
                      key={field.id}
                      positions={field.coordinates}
                      pathOptions={{
                        color: field.color || "#2563eb",
                        fillColor: field.color || "#3b82f6",
                        fillOpacity: 0.45,
                        weight: 2,
                      }}
                      eventHandlers={{
                        mouseover: (e) => {
                          e.target.setStyle({
                            weight: 4,
                            fillOpacity: 0.7,
                          });
                        },
                        mouseout: (e) => {
                          e.target.setStyle({
                            weight: 2,
                            fillOpacity: 0.45,
                          });
                        },
                      }}
                    >
                      <Popup>
                        <div className='space-y-1 text-sm'>
                          <h3 className='font-semibold'>{field.name}</h3>

                          <p>
                            <strong>Code:</strong> {field.code}
                          </p>

                          <p>
                            <strong>Area:</strong> {field.area}
                          </p>

                          <p>
                            <strong>Tea:</strong> {field.teaType}
                          </p>

                          <p>
                            <strong>Plant Year:</strong> {field.plantingYear}
                          </p>

                          <p>
                            <strong>Status:</strong> {field.status}
                          </p>
                        </div>
                      </Popup>
                    </Polygon>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Summary ================= */}

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
          {mapAndGISTrackingData.summaryCards.map((card) => {
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
                    className={`inline-flex h-9 items-center gap-2 rounded-md px-4 text-sm font-medium transition ${
                      button.color === "primary"
                        ? "bg-green-700 text-white hover:bg-green-800"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={16} />
                    {button.label}
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
                    {mapAndGISTrackingData.fieldList.map((field, index) => (
                      <tr
                        key={field.id}
                        className='transition hover:bg-green-50'
                      >
                        <td className='border border-gray-200 px-3 py-3 text-center'>
                          {index + 1}
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
                          {field.fieldType}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center'>
                          {field.totalArea}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center'>
                          {field.teaArea}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center whitespace-nowrap'>
                          {field.latitude.toFixed(5)}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center whitespace-nowrap'>
                          {field.longitude.toFixed(5)}
                        </td>

                        <td className='border border-gray-200 px-3 py-3 text-center'>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              field.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {field.status}
                          </span>
                        </td>

                        <td className='border border-gray-200 px-3 py-3'>
                          <div className='flex items-center justify-center gap-2'>
                            <button
                              type='button'
                              className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100'
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              type='button'
                              className='flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100'
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type='button'
                              className='flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100'
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
            </div>
            <div className='mt-4 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-4 md:flex-row p-2'>
              <p className='text-sm text-gray-600'>
                Showing{" "}
                <span className='font-semibold'>
                  {mapAndGISTrackingData.pagination.showingFrom}
                </span>{" "}
                to{" "}
                <span className='font-semibold'>
                  {mapAndGISTrackingData.pagination.showingTo}
                </span>{" "}
                of{" "}
                <span className='font-semibold'>
                  {mapAndGISTrackingData.pagination.totalRecords}
                </span>{" "}
                entries
              </p>

              <div className='join'>
                <button className='join-item btn btn-sm'>«</button>

                {Array.from(
                  {
                    length: mapAndGISTrackingData.pagination.totalPages,
                  },
                  (_, index) => (
                    <button
                      key={index}
                      className={`join-item btn btn-sm ${
                        mapAndGISTrackingData.pagination.currentPage ===
                        index + 1
                          ? "btn-success"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  ),
                )}

                <button className='join-item btn btn-sm'>»</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapAndGISTracking;
