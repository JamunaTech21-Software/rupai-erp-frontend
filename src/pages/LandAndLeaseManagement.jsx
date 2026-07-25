import React from "react";
import EstateManagementTabs from "../components/EstateManagement/EstateManagementTabs";
import { X, RotateCcw, Save } from "lucide-react";
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
              <h2 className='mb-5 text-lg font-semibold text-green-800'>
                Land / Lease Information
              </h2>

              <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
                {/* Estate */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Estate <span className='text-red-500'>*</span>
                  </label>

                  <select className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'>
                    <option>Jamuna Tea Estate</option>
                    <option>Rupai Tea Estate</option>
                    <option>Karatoa Tea Estate</option>
                    <option>Green Valley Tea Estate</option>
                    <option>Surma Tea Estate</option>
                  </select>
                </div>

                {/* Land Type */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Land / Lease Type <span className='text-red-500'>*</span>
                  </label>

                  <select className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'>
                    <option>Leased In</option>
                    <option>Leased Out</option>
                    <option>Owned</option>
                    <option>Disputed</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Land Category <span className='text-red-500'>*</span>
                  </label>

                  <select className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'>
                    <option>Tea Garden Land</option>
                    <option>Factory Land</option>
                    <option>Office Area</option>
                    <option>Residential Area</option>
                    <option>Water Body</option>
                    <option>Road</option>
                    <option>Nursery</option>
                  </select>
                </div>

                {/* Land Name */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Land / Lease Name <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    defaultValue='Madhabpur Lease Land'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Survey */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Survey / Khatian No.
                  </label>

                  <input
                    type='text'
                    defaultValue='KH-1234, RS-5678'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Plot */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Plot / Dag No.
                  </label>

                  <input
                    type='text'
                    defaultValue='Dag-234/1, 234/2'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Mouza */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Mouza
                  </label>

                  <input
                    type='text'
                    defaultValue='Madhabpur'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* JL */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    JL No. / LR No.
                  </label>

                  <input
                    type='text'
                    defaultValue='JL-876/2015'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Record */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Record Type
                  </label>

                  <select className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'>
                    <option>C.S Record</option>
                    <option>S.A Record</option>
                    <option>R.S Record</option>
                    <option>B.S Record</option>
                  </select>
                </div>

                {/* Total Area */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Total Area (Acre) <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    defaultValue='125.50'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Usable */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Usable Area (Acre)
                  </label>

                  <input
                    type='number'
                    defaultValue='118.25'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Non Usable */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Non Usable Area (Acre)
                  </label>

                  <input
                    type='number'
                    defaultValue='7.25'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Location */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Location
                  </label>

                  <input
                    type='text'
                    defaultValue='Madhabpur, Rangpur'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* GPS */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    GPS Area (Acre)
                  </label>

                  <div className='flex gap-2'>
                    <input
                      type='text'
                      defaultValue='125.35'
                      className='h-11 flex-1 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />

                    <button
                      type='button'
                      className='rounded-lg border border-gray-300 px-4 text-sm hover:bg-gray-50'
                    >
                      Verify
                    </button>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Land Status
                  </label>

                  <select className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Under Process</option>
                    <option>Expired</option>
                  </select>
                </div>
                {/* Acquisition Date */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Acquisition / Lease Date{" "}
                    <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='date'
                    defaultValue='2015-01-01'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Start Date <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='date'
                    defaultValue='2015-01-01'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    End Date <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='date'
                    defaultValue='2035-12-31'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Lease Term */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Lease Term (Year)
                  </label>

                  <input
                    type='number'
                    defaultValue='20'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Rent Amount */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Rent / Lease Amount (BDT)
                  </label>

                  <input
                    type='number'
                    defaultValue='150000.00'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Rent Per Acre */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Rent / Lease Per Acre (BDT)
                  </label>

                  <input
                    type='number'
                    defaultValue='1196.81'
                    className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Purpose */}
                <div className='md:col-span-2'>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Purpose / Remarks
                  </label>

                  <textarea
                    rows={2}
                    defaultValue='Leased land for tea cultivation and factory development.'
                    className='w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Documents */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Documents
                  </label>

                  <input
                    type='file'
                    className='file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm h-11 w-full rounded-lg border border-gray-300 text-sm'
                  />
                </div>

                {/* Buttons */}
                <div className='col-span-full flex flex-wrap justify-end gap-3 pt-2'>
                  {/* Cancel */}
                  <button
                    type='button'
                    className='flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50'
                  >
                    <X size={16} />
                    Cancel
                  </button>

                  {/* Reset */}
                  <button
                    type='reset'
                    className='flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-green-700'
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>

                  {/* Save */}
                  <button
                    type='submit'
                    className='flex cursor-pointer items-center gap-2 rounded-lg bg-green-700 px-6 py-2 text-sm font-medium text-white transition hover:bg-green-800'
                  >
                    <Save size={16} />
                    Save Land / Lease
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className='col-span-12 xl:col-span-5 space-y-3'>
            {/* Map */}
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Land / Lease Map View
              </h2>

              <div className='flex h-[490px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
                <p className='text-lg font-semibold text-gray-400'>MAP VIEW</p>
              </div>
            </div>

            {/* Ownership */}
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Land Ownership & Lease Details
              </h2>

              <div className='flex h-[220px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
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
