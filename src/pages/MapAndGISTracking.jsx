import React from "react";
import EstateManagementTabs from "../components/EstateManagement/EstateManagementTabs";
import { useForm } from "react-hook-form";
import { mapAndGISTrackingData } from "../data/MapandGisTrackingData";
const MapAndGISTracking = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
                      {...register("division")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                    >
                      <option value=''>Select Division</option>
                      {mapAndGISTrackingData.divisions.map((division) => (
                        <option key={division} value={division}>
                          {division}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Section */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Section
                    </label>

                    <select
                      {...register("section")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                    >
                      <option value=''>Select Section</option>
                      {mapAndGISTrackingData.sections.map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field Type */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Field / Block Type
                    </label>

                    <select
                      {...register("fieldType")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                    >
                      <option value=''>Select Type</option>
                      {mapAndGISTrackingData.fieldTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Status
                    </label>

                    <select
                      {...register("status")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white focus:border-green-600'
                    >
                      <option value=''>Select Status</option>
                      {mapAndGISTrackingData.statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
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

              <div className='flex h-[550px] items-center justify-center bg-gray-100'>
                <p className='text-gray-500'>MAP WILL COME HERE</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Summary ================= */}

        <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6'>
            <div className='rounded-lg border p-4 text-center'>
              Total Estate Area
            </div>

            <div className='rounded-lg border p-4 text-center'>Tea Area</div>

            <div className='rounded-lg border p-4 text-center'>
              Non Tea Area
            </div>

            <div className='rounded-lg border p-4 text-center'>Total Field</div>

            <div className='rounded-lg border p-4 text-center'>Active</div>

            <div className='rounded-lg border p-4 text-center'>Inactive</div>
          </div>
        </div>

        {/* ================= Table ================= */}

        <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
          <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
            <h2 className='text-lg font-semibold text-green-800'>
              Field / Block List with GIS Information
            </h2>

            <div className='flex gap-2'>
              <button className='btn btn-outline'>Export</button>

              <button className='btn bg-green-700 text-white'>Add Field</button>
            </div>
          </div>

          <div className='flex h-[400px] items-center justify-center'>
            <p className='text-gray-500'>TABLE WILL COME HERE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapAndGISTracking;
