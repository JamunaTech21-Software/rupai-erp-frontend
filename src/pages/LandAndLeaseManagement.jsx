import React from "react";
import EstateManagementTabs from "../components/EstateManagement/EstateManagementTabs";

const LandAndLeaseManagement = () => {
  return (
    <div>
      <EstateManagementTabs />
      <div className='space-y-6'>
        {/* ================= Row 01 ================= */}
        <div className='grid grid-cols-12 gap-6'>
          {/* ================= Basic Information ================= */}
          {/* Form */}
          <div className='col-span-12 xl:col-span-7'>
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Land / Lease Information
              </h2>

              <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
                  {/* Estate */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <select className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600'>
                      <option>Select Estate</option>
                    </select>
                  </div>

                  {/* Division */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Division <span className='text-red-500'>*</span>
                    </label>

                    <select className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600'>
                      <option>Select Division</option>
                    </select>
                  </div>

                  {/* Section */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Section <span className='text-red-500'>*</span>
                    </label>

                    <select className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600'>
                      <option>Select Section</option>
                    </select>
                  </div>

                  {/* Land ID */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Land ID
                    </label>

                    <input
                      type='text'
                      placeholder='LAND-001'
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600'
                    />
                  </div>

                  {/* Land Name */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Land Name <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Land Name'
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600'
                    />
                  </div>

                  {/* Ownership Type */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Ownership Type
                    </label>

                    <select className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600'>
                      <option>Select Ownership Type</option>
                      <option>Owned</option>
                      <option>Lease</option>
                      <option>Government</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className='col-span-12 xl:col-span-5 space-y-6'>
            {/* Map */}
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Land / Lease Map View
              </h2>

              <div className='flex h-[320px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
                <p className='text-lg font-semibold text-gray-400'>MAP VIEW</p>
              </div>
            </div>

            {/* Ownership */}
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Land Ownership & Lease Details
              </h2>

              <div className='flex h-[274px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
                <p className='text-lg font-semibold text-gray-400'>
                  OWNERSHIP DETAILS
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Row 02 ================= */}
        <div className='grid grid-cols-12 gap-6'>
          {/* Payment */}
          <div className='col-span-12 xl:col-span-7'>
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Lease Payment Information
              </h2>

              <div className='flex h-[260px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
                <p className='text-xl font-semibold text-gray-400'>
                  PAYMENT TABLE
                </p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className='col-span-12 xl:col-span-5'>
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Land / Lease Documents
              </h2>

              <div className='flex h-[260px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
                <p className='text-xl font-semibold text-gray-400'>
                  DOCUMENT TABLE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Row 03 ================= */}
        <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
          <h2 className='mb-4 text-lg font-semibold text-green-800'>
            Land / Lease List (Summary)
          </h2>

          <div className='flex h-[420px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
            <p className='text-xl font-semibold text-gray-400'>
              LAND / LEASE SUMMARY TABLE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandAndLeaseManagement;
