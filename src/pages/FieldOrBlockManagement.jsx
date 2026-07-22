import React from "react";
import EstateManagementTabs from "../components/EstateManagement/EstateManagementTabs";
import { useForm } from "react-hook-form";
import { RotateCcw, Save, X } from "lucide-react";
import { fieldAndBlockManagementData } from "../data/FieldAndBlockManagementData";
const FieldOrBlockManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const FieldOrBlockManagementonSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <EstateManagementTabs />
      <div className='grid grid-cols-1 gap-2 xl:grid-cols-12'>
        {/* Left */}
        <div className='xl:col-span-5'>
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
                    placeholder='Enter field / block name'
                    {...register("fieldName", {
                      required: "Field / Block Name is required",
                    })}
                    className={`input h-11 w-full rounded-lg border bg-white ${
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
                    className={`input h-11 w-full rounded-lg border bg-white ${
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
                    className={`input h-11 w-full rounded-lg border bg-white ${
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
                    className={`input h-11 w-full rounded-lg border bg-white ${
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
                    className={`input h-11 w-full rounded-lg border bg-white ${
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
                    className={`select h-11 w-full rounded-lg border bg-white ${
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
                    className={`input h-11 w-full rounded-lg border bg-white ${
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
                    className={`input h-11 w-full rounded-lg border bg-white ${
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
                    className={`input h-11 w-full rounded-lg border bg-white ${
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
                    className={`select h-11 w-full rounded-lg border bg-white ${
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
                    className='textarea w-full rounded-lg border border-gray-300 bg-white focus:border-green-600 focus:outline-none'
                  />
                </div>

                {/* Footer Buttons */}

                <div className='md:col-span-2 xl:col-span-3'>
                  <div className='mt-3 border-t border-gray-200 pt-2'>
                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
                      {/* Cancel */}
                      <button
                        type='button'
                        className='btn flex items-center gap-2 h-11 w-full rounded-lg border border-gray-300 bg-white px-6 text-gray-700 shadow-sm transition-all hover:bg-gray-50 sm:w-auto'
                      >
                        <X size={18} />
                        Cancel
                      </button>

                      {/* Reset */}
                      <button
                        type='button'
                        onClick={() => reset()}
                        className='btn flex items-center gap-2  h-11 w-full rounded-lg border-0 bg-green-500 px-6 text-white shadow-sm transition-all hover:bg-amber-600 sm:w-auto'
                      >
                        <RotateCcw size={18} />
                        Reset
                      </button>

                      {/* Save */}
                      <button
                        type='submit'
                        className='btn flex items-center gap-2 h-11 w-full rounded-lg border-0 bg-green-900 px-6 text-white shadow-sm transition-all hover:bg-green-800 sm:w-auto'
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
        <div className='xl:col-span-7'>
          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
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
                className='btn h-10 border-0 bg-green-700 px-4 text-white hover:bg-green-800'
              >
                + Add Field / Block
              </button>
            </div>

            {/* Search & Filter */}
            <div className='grid grid-cols-1 gap-3 border-b border-gray-200 p-4 md:grid-cols-2 xl:grid-cols-4'>
              {/* Search */}
              <input
                type='text'
                placeholder={
                  fieldAndBlockManagementData.filters.searchPlaceholder
                }
                className='input input-bordered h-10 w-full'
              />

              {/* Field Type */}
              <select className='select select-bordered h-10 w-full'>
                <option>{fieldAndBlockManagementData.filters.fieldType}</option>

                {fieldAndBlockManagementData.fieldTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              {/* Status */}
              <select className='select select-bordered h-10 w-full'>
                <option>{fieldAndBlockManagementData.filters.status}</option>

                {fieldAndBlockManagementData.statuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              {/* Filter Button */}
              <button
                className='btn h-10 border border-gray-300 bg-white hover:bg-gray-100'
                type='button'
              >
                Filter
              </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='table table-zebra'>
                <thead className='bg-gray-100'>
                  <tr>
                    {fieldAndBlockManagementData.tableHeaders.map((header) => (
                      <th
                        key={header}
                        className='whitespace-nowrap text-xs font-semibold uppercase text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {fieldAndBlockManagementData.fieldList.map((field, index) => (
                    <tr key={field.id}>
                      <td>{index + 1}</td>

                      <td className='font-normal whitespace-nowrap'>
                        {field.fieldName}
                      </td>

                      <td>{field.code}</td>

                      <td>{field.fieldType}</td>

                      <td>{field.totalArea}</td>

                      <td>
                        {field.plantedArea === 0 ? "-" : field.plantedArea}
                      </td>

                      <td>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            field.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {field.status}
                        </span>
                      </td>

                      <td>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            className='rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-600 transition hover:bg-amber-100'
                          >
                            Edit
                          </button>

                          <button
                            type='button'
                            className='rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100'
                          >
                            Delete
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
        </div>
      </div>
    </div>
  );
};

export default FieldOrBlockManagement;
