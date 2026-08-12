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
  Minus,
  Layers3,
  Expand,
  MapPin,
  Leaf,
  Sprout,
  Trees,
  Building2,
  Waves,
  SquareDashed,
  CheckCircle2,
  XCircle,
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
  const FieldOrBlockManagementonSubmit = async (data) => {
    try {
      await axios.post("/field-block", data);

      toast.success("Field / Block saved successfully.");

      reset();
    } catch (error) {
      toast.error("Failed to save Field / Block.");
    }
  };

  const [mapType, setMapType] = useState("street");
  return (
    <div>
      <EstateManagementTabs />
      <div className='grid grid-cols-1 items-start gap-4 xl:grid-cols-12'>
        {/* Left */}
        <div className='self-start xl:col-span-5'>
          <form
            onSubmit={handleSubmit(FieldOrBlockManagementonSubmit)}
            className='rounded-xl border border-gray-200 bg-white shadow-sm'
          >
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Field / Block Information
              </h2>
            </div>

            {/* Body */}
            <div className='space-y-6 py-4 px-2'>
              <div className='grid grid-cols-1 py-5 gap-3 md:grid-cols-2 xl:grid-cols-3'>
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
                    <option value='rupai'>Rupai Tea Estate</option>
                    <option value='karatoa'>Karatoa Tea Estate</option>
                    <option value='greenvalley'>Green Valley Tea Estate</option>
                    <option value='sunrise'>Sunrise Tea Estate</option>
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
                    <option value='north'>North Division</option>
                    <option value='south'>South Division</option>
                    <option value='east'>East Division</option>
                    <option value='west'>West Division</option>
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
                    <option value='section-a'>Section A</option>
                    <option value='section-b'>Section B</option>
                    <option value='section-c'>Section C</option>
                    <option value='section-d'>Section D</option>
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
                    placeholder='Enter field / block name '
                    {...register("fieldName", {
                      required: "Field / Block Name is required",
                    })}
                    className={`input h-11 w-full p-2 rounded-lg border bg-white ${
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
                    className={`input h-11 w-full rounded-lg border p-2 bg-white ${
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
                    <option value=''>Select Field type</option>
                    <option value='tea'>Tea Field</option>
                    <option value='nursery'>Nursery</option>
                    <option value='shade'>Shade Area</option>
                    <option value='road'>Road Side</option>
                    <option value='water'>Water Body</option>
                  </select>

                  {errors.fieldType && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.fieldType.message}
                    </p>
                  )}
                </div>
                {/* Parent Field / Block */}
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Parent Field / Block
                  </label>

                  <select
                    {...register("parentField")}
                    className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                  >
                    <option value=''>Select Parent Field</option>
                    <option value='north-01'>North Block-01</option>
                    <option value='north-02'>North Block-02</option>
                    <option value='south-01'>South Block-01</option>
                    <option value='south-02'>South Block-02</option>
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
                    className={`input h-11 p-2 w-full rounded-lg border bg-white ${
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
                    Planted Area (Acres) <span className='text-red-500'>*</span>
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
                    className={`input p-2 h-11 w-full rounded-lg border bg-white ${
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

                {/* Year of Planting */}
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
                    className={`input h-11 w-full rounded-lg border p-2 bg-white ${
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

                {/* Bush Type / Clone */}
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Bush Type / Clone <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("bushType", {
                      required: "Bush Type is required",
                    })}
                    className={`select h-11 w-full p-2 rounded-lg border bg-white ${
                      errors.bushType
                        ? "border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Bush Type</option>
                    <option value='bt1'>BT-1</option>
                    <option value='bt2'>BT-2</option>
                    <option value='bt6'>BT-6</option>
                    <option value='tv1'>TV-1</option>
                    <option value='tv23'>TV-23</option>
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
                    className={`input h-11 p-2 w-full rounded-lg border bg-white ${
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
                    className={`input p-2 h-11 w-full rounded-lg border bg-white ${
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

                {/* Average Slope */}
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
                    className={`input h-11 p-2 w-full rounded-lg border bg-white ${
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

                {/* Status */}
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Status <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("status", {
                      required: "Status is required",
                    })}
                    className={`select p-2 h-11 w-full rounded-lg border bg-white ${
                      errors.status
                        ? "border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Status</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                    <option value='under-development'>Under Development</option>
                    <option value='maintenance'>Maintenance</option>
                  </select>

                  {errors.status && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.status.message}
                    </p>
                  )}
                </div>
                {/* Description / Remarks */}
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

                {/* Footer Buttons */}

                <div className='md:col-span-2 xl:col-span-3'>
                  <div className='mt-3 border-t border-gray-200 pt-2'>
                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
                      {/* Cancel */}
                      <button
                        type='button'
                        className='btn flex items-center gap-2 h-11 w-full rounded-lg border border-gray-300 bg-white px-6 text-gray-700 shadow-sm transition-all hover:bg-gray-50 sm:w-auto  cursor-pointer'
                      >
                        <X size={18} />
                        Cancel
                      </button>

                      {/* Reset */}
                      <button
                        type='button'
                        onClick={() => reset()}
                        className=' cursor-pointer flex items-center gap-2  h-11 w-full rounded-lg border-0 bg-green-500 px-6 text-white shadow-sm transition-all hover:bg-amber-600 sm:w-auto cursor-pointer'
                      >
                        <RotateCcw size={18} />
                        Reset
                      </button>

                      {/* Save */}
                      <button
                        type='submit'
                        className='btn flex items-center gap-2 h-11 w-full rounded-lg border-0 bg-green-900 px-6 text-white shadow-sm transition-all hover:bg-green-800 sm:w-auto cursor-pointer'
                      >
                        <Save size={18} />
                        Save Field
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className='rounded-xl my-4 border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Field / Block Details (Block 01)
              </h2>
            </div>

            <div className='grid grid-cols-1 gap-2 p-5 md:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-2'>
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

              {/* Right Column */}
              <div className='space-y-2'>
                {fieldAndBlockManagementData.detailsRight.map((item) => (
                  <div key={item.key} className='flex items-center text-sm'>
                    <span className='w-36 font-regular text-gray-700'>
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

        {/* Right */}
        <div className='self-start xl:col-span-7'>
          <div className='h-fit w-full rounded-xl border border-gray-200 bg-white shadow-sm '>
            {/* Header */}
            <div className='flex flex-col gap-3 border-b border-gray-200 p-4 lg:flex-row lg:items-center lg:justify-between'>
              <h2 className='text-lg font-semibold text-green-800'>
                Field / Block List
                <span className='ml-1 text-sm font-normal text-gray-500'>
                  (Rangpur Division &gt; Section A)
                </span>
              </h2>

              <button
                type='button'
                className='btn h-10 border-0 rounded-sm bg-green-700 px-4 text-white hover:bg-green-800 cursor-pointer'
              >
                + Add Field / Block
              </button>
            </div>

            {/* Search & Filter */}
            <div className='grid grid-cols-1 gap-3 border-b border-gray-200 p-4 md:grid-cols-[2fr_1fr_1fr_auto]'>
              {/* Search */}
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

              {/* Field Type */}
              <select className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'>
                <option>{fieldAndBlockManagementData.filters.fieldType}</option>

                {fieldAndBlockManagementData.fieldTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              {/* Status */}
              <select className='h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'>
                <option>{fieldAndBlockManagementData.filters.status}</option>

                {fieldAndBlockManagementData.statuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              {/* Filter Icon */}
              <button
                type='button'
                className='flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white transition hover:bg-gray-100'
              >
                <SlidersHorizontal size={18} className='text-gray-600' />
              </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[900px] border-collapse text-sm'>
                <thead className='bg-gray-100'>
                  <tr>
                    {fieldAndBlockManagementData.tableHeaders.map((header) => (
                      <th
                        key={header}
                        className='border border-gray-200 px-1 py-3 text-center text-xs font-semibold whitespace-nowrap text-gray-700'
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

                      <td className='border border-gray-200 px-3 py-2 text-left whitespace-nowrap'>
                        {field.fieldName}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {field.code}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        {field.fieldType}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center whitespace-nowrap'>
                        {field.totalArea}
                      </td>
                      <td className='border border-gray-200 px-3 py-2 text-center whitespace-nowrap'>
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
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type='button'
                            className='text-red-500 transition hover:text-red-700'
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
            <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 px-4 py-3 text-sm text-gray-600 sm:flex-row mb-24'>
              <p>
                Showing <strong>1</strong> to{" "}
                <strong>{fieldAndBlockManagementData.fieldList.length}</strong>{" "}
                of{" "}
                <strong>{fieldAndBlockManagementData.fieldList.length}</strong>{" "}
                entries
              </p>

              <div className='join'>
                <button className='join-item btn btn-sm' disabled>
                  Previous
                </button>

                <button className='join-item btn btn-sm btn-active'>1</button>

                <button className='join-item btn btn-sm' disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
          {/* Map section start from here */}
          <div className='rounded-xl border border-gray-200 bg-white shadow-sm mt-4'>
            {/* Header */}

            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Field / Block Map View (Block 01)
              </h2>
            </div>

            {/* Map */}
            <div className='relative h-[320px] w-full'>
              {/* Layer Switch Button */}
              <div className='absolute left-4 top-4 z-[1000]'>
                <button
                  type='button'
                  onClick={() =>
                    setMapType(mapType === "street" ? "satellite" : "street")
                  }
                  className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-lg hover:bg-gray-100'
                >
                  <Layers3 size={18} />
                  {mapType === "street" ? "Satellite" : "Street"}
                </button>
              </div>

              <MapContainer
                center={[
                  Number(fieldAndBlockManagementData.map.latitude),
                  Number(fieldAndBlockManagementData.map.longitude),
                ]}
                zoom={16}
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

                <ZoomControl position='topleft' />

                <Marker
                  position={[
                    Number(fieldAndBlockManagementData.map.latitude),
                    Number(fieldAndBlockManagementData.map.longitude),
                  ]}
                  icon={blueMarker}
                >
                  <Popup>
                    <div className='space-y-2'>
                      <h3 className='font-semibold'>
                        {fieldAndBlockManagementData.details.fieldName}
                      </h3>

                      <p>
                        Area: {fieldAndBlockManagementData.details.totalArea}
                      </p>

                      <p>
                        Division: {fieldAndBlockManagementData.details.division}
                      </p>

                      <p>
                        Status: {fieldAndBlockManagementData.details.status}
                      </p>
                    </div>
                  </Popup>
                </Marker>

                <Polygon
                  positions={fieldAndBlockManagementData.map.polygon}
                  pathOptions={{
                    color: "#0d7d2f",
                    fillColor: "#20c05a",
                    fillOpacity: 0.45,
                    weight: 3,
                  }}
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.setStyle({
                        fillOpacity: 0.7,
                        weight: 5,
                      });
                    },
                    mouseout: (e) => {
                      e.target.setStyle({
                        fillOpacity: 0.45,
                        weight: 3,
                      });
                    },
                  }}
                />
              </MapContainer>
            </div>

            {/* Footer */}

            <div className='flex flex-col gap-4 border-t border-gray-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between'>
              <div className='flex flex-wrap items-center gap-5 text-sm'>
                <span>
                  Area:
                  <strong className='ml-1'>
                    {fieldAndBlockManagementData.map.totalArea}
                  </strong>
                </span>

                <span>
                  Perimeter:
                  <strong className='ml-1'>
                    {fieldAndBlockManagementData.map.perimeter}
                  </strong>
                </span>

                <span>
                  Coordinates:
                  <strong className='ml-1'>
                    {fieldAndBlockManagementData.map.latitude},
                    {fieldAndBlockManagementData.map.longitude}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ===================== Summary ===================== */}

      <div className='mt-4 bg-green-50 rounded-xl   p-5 shadow-sm'>
        <div className='grid grid-cols-12 gap-6 '>
          {/* Left (1 Column) */}
          <div className='col-span-12 lg:col-span-1'>
            <div className='flex h-full items-center justify-center'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full border-2 border-green-700'>
                <Leaf className='h-10 w-10 text-green-700' />
              </div>
            </div>
          </div>

          {/* Right (11 Column) */}
          <div className='col-span-12 lg:col-span-11'>
            {/* Header */}
            <div className='mb-5  border-green-700 pb-3'>
              <h2 className='text-sm font-regular text-green-900'>
                Field / Block Summary
              </h2>
            </div>

            {/* Summary Items */}
            <div className='flex flex-wrap justify-between'>
              {/* Tea */}
              <div className='text-center'>
                <p className='text-sm text-gray-500'>Tea Field</p>
                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.teaField}
                </h3>
              </div>

              {/* Nursery */}
              <div className='text-center'>
                <p className='text-sm text-gray-500'>Nursery</p>
                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.nursery}
                </h3>
              </div>

              {/* Extension */}
              <div className='text-center'>
                <p className='text-sm text-gray-500'>Extension</p>
                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.extension}
                </h3>
              </div>

              {/* Infrastructure */}
              <div className='text-center'>
                <p className='text-sm text-gray-500'>Infrastructure</p>
                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.infrastructure}
                </h3>
              </div>

              {/* Drain */}
              <div className='text-center'>
                <p className='text-sm text-gray-500'>Drain Area</p>
                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.drainArea}
                </h3>
              </div>

              {/* Total Area */}
              <div className='text-center'>
                <p className='text-sm text-gray-500'>Total Area (Acre)</p>
                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.totalArea}
                </h3>
              </div>

              {/* Planted */}
              <div className='text-center'>
                <p className='text-sm text-gray-500'>Planted Area (Acre)</p>
                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.plantedArea}
                </h3>
              </div>

              {/* Active */}
              <div className='text-center'>
                <p className='text-sm text-gray-500'>Active Field</p>
                <h3 className='mt-2 text-2xl font-bold text-green-700'>
                  {fieldAndBlockManagementData.summary.activeField}
                </h3>
              </div>

              {/* Inactive */}
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
