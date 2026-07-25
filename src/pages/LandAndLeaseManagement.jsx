import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import EstateManagementTabs from "../components/EstateManagement/EstateManagementTabs";
import { landLeaseManagementData } from "../data/landAndLeaseManagementData";
import { X, RotateCcw, Save, Download, Trash2, Plus } from "lucide-react";
const LandAndLeaseManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      // await axios.post(...)

      toast.success("Land / Lease saved successfully!");

      reset();
    } catch (error) {
      toast.error("Failed to save Land / Lease.");
    }
  };
  return (
    <div>
      <EstateManagementTabs />
      <div className='space-y-6'>
        {/* ================= Row 01 ================= */}
        <div className='grid grid-cols-12 gap-2'>
          {/* ================= Basic Information ================= */}
          {/* Form */}
          <div className='col-span-12 xl:col-span-7'>
            <form onSubmit={handleSubmit(onSubmit)}>
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

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                    >
                      <option value=''>Select Estate</option>
                      <option value='Jamuna Tea Estate'>
                        Jamuna Tea Estate
                      </option>
                      <option value='Rupai Tea Estate'>Rupai Tea Estate</option>
                      <option value='Karatoa Tea Estate'>
                        Karatoa Tea Estate
                      </option>
                      <option value='Green Valley Tea Estate'>
                        Green Valley Tea Estate
                      </option>
                      <option value='Surma Tea Estate'>Surma Tea Estate</option>
                    </select>

                    {errors.estate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.estate.message}
                      </p>
                    )}
                  </div>

                  {/* Land Type */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Land / Lease Type <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("landLeaseType", {
                        required: "Land / Lease Type is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                    >
                      <option value=''>Select Type</option>
                      <option value='Leased In'>Leased In</option>
                      <option value='Leased Out'>Leased Out</option>
                      <option value='Owned'>Owned</option>
                      <option value='Disputed'>Disputed</option>
                    </select>

                    {errors.landLeaseType && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.landLeaseType.message}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Land Category <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("landCategory", {
                        required: "Land Category is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                    >
                      <option value=''>Select Category</option>
                      <option value='Tea Garden Land'>Tea Garden Land</option>
                      <option value='Factory Land'>Factory Land</option>
                      <option value='Office Area'>Office Area</option>
                      <option value='Residential Area'>Residential Area</option>
                      <option value='Water Body'>Water Body</option>
                      <option value='Road'>Road</option>
                      <option value='Nursery'>Nursery</option>
                    </select>

                    {errors.landCategory && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.landCategory.message}
                      </p>
                    )}
                  </div>

                  {/* Land Name */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Land / Lease Name <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Land / Lease Name'
                      {...register("landLeaseName", {
                        required: "Land / Lease Name is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />

                    {errors.landLeaseName && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.landLeaseName.message}
                      </p>
                    )}
                  </div>

                  {/* Survey */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Survey / Khatian No.
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Survey / Khatian No.'
                      {...register("surveyKhatianNo")}
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
                      placeholder='Enter Plot / Dag No.'
                      {...register("plotDagNo")}
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
                      placeholder='Enter Mouza'
                      {...register("mouza")}
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
                      placeholder='Enter JL / LR No.'
                      {...register("jlNo")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* Record */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Record Type
                    </label>

                    <select
                      {...register("recordType")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                    >
                      <option value=''>Select Record Type</option>
                      <option value='C.S Record'>C.S Record</option>
                      <option value='S.A Record'>S.A Record</option>
                      <option value='R.S Record'>R.S Record</option>
                      <option value='B.S Record'>B.S Record</option>
                    </select>
                  </div>

                  {/* Total Area */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Total Area (Acre) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Total Area'
                      {...register("totalArea", {
                        required: "Total Area is required",
                        valueAsNumber: true,
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />

                    {errors.totalArea && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.totalArea.message}
                      </p>
                    )}
                  </div>

                  {/* Usable */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Usable Area (Acre)
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Usable Area'
                      {...register("usableArea", {
                        valueAsNumber: true,
                      })}
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
                      step='0.01'
                      placeholder='Enter Non Usable Area'
                      {...register("nonUsableArea", {
                        valueAsNumber: true,
                      })}
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
                      placeholder='Enter Location'
                      {...register("location")}
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
                        type='number'
                        step='0.01'
                        placeholder='Enter GPS Area'
                        {...register("gpsArea", {
                          valueAsNumber: true,
                        })}
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

                    <select
                      {...register("landStatus")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                    >
                      <option value=''>Select Status</option>
                      <option value='Active'>Active</option>
                      <option value='Inactive'>Inactive</option>
                      <option value='Under Process'>Under Process</option>
                      <option value='Expired'>Expired</option>
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
                      {...register("acquisitionDate", {
                        required: "Acquisition / Lease Date is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />

                    {errors.acquisitionDate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.acquisitionDate.message}
                      </p>
                    )}
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Start Date <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='date'
                      {...register("startDate", {
                        required: "Start Date is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />

                    {errors.startDate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>

                  {/* End Date */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      End Date <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='date'
                      {...register("endDate", {
                        required: "End Date is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />

                    {errors.endDate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.endDate.message}
                      </p>
                    )}
                  </div>

                  {/* Lease Term */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Lease Term (Year)
                    </label>

                    <input
                      type='number'
                      {...register("leaseTerm", {
                        valueAsNumber: true,
                      })}
                      placeholder='Enter Lease Term'
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
                      step='0.01'
                      {...register("rentAmount", {
                        valueAsNumber: true,
                      })}
                      placeholder='Enter Rent Amount'
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
                      step='0.01'
                      {...register("rentPerAcre", {
                        valueAsNumber: true,
                      })}
                      placeholder='Enter Rent Per Acre'
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
                      placeholder='Enter Purpose / Remarks'
                      {...register("purposeRemarks")}
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
                      {...register("documents")}
                      className='file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm h-11 w-full rounded-lg border border-gray-300 text-sm'
                    />
                  </div>

                  {/* Buttons */}
                  <div className='col-span-full flex flex-wrap justify-center gap-3 pt-2 sm:justify-end'>
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
                      type='button'
                      onClick={() => reset()}
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
            </form>
          </div>

          {/* Map */}
          <div className='col-span-12 xl:col-span-5 space-y-3'>
            {/* Map */}
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Land / Lease Map View
              </h2>

              {/* ================= Map UI ================= */}
              <div className='relative overflow-hidden rounded-lg border border-gray-200'>
                {/* Dummy Map */}
                <div
                  className='relative h-[360px] overflow-hidden rounded-lg bg-cover bg-center'
                  style={{
                    backgroundImage: "url('/land-lease-map.png')",
                  }}
                >
                  {/* Dummy Satellite Pattern */}
                  <div className='absolute inset-0 opacity-20'>
                    <div className='h-full w-full bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] [background-size:20px_20px]' />
                  </div>

                  {/* Left Toolbar */}
                  <div className='absolute left-3 top-3 flex flex-col gap-2'>
                    <button
                      type='button'
                      className='flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white shadow hover:bg-gray-100'
                    >
                      +
                    </button>

                    <button
                      type='button'
                      className='flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white shadow hover:bg-gray-100'
                    >
                      −
                    </button>

                    <button
                      type='button'
                      className='flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white shadow hover:bg-gray-100'
                    >
                      🗂
                    </button>

                    <button
                      type='button'
                      className='flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white shadow hover:bg-gray-100'
                    >
                      ⛶
                    </button>
                  </div>

                  {/* Dummy Marker */}
                  <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white' />
                  </div>

                  {/* Polygon */}
                  <svg
                    className='absolute inset-0 h-full w-full'
                    viewBox='0 0 100 100'
                    preserveAspectRatio='none'
                  >
                    <polygon
                      points='25,20 70,10 82,52 66,82 30,75 18,42'
                      fill='rgba(34,197,94,.35)'
                      stroke='white'
                      strokeWidth='0.7'
                      strokeDasharray='2'
                    />
                  </svg>

                  {/* Legend */}
                  <div className='absolute bottom-4 right-4 rounded-md bg-white px-4 py-2 shadow'>
                    <div className='flex items-center gap-2 text-sm'>
                      <span className='h-3 w-3 rounded bg-green-500'></span>
                      Selected Land
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className='flex flex-col gap-1 border-t bg-white p-1 md:flex-row md:items-center md:justify-between'>
                  <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700'>
                    <p>
                      <span className='font-semibold'>Area:</span> 125.50 Acre
                    </p>

                    <p>
                      <span className='font-semibold'>Perimeter:</span> 2.85 Km
                    </p>

                    <p>
                      <span className='font-semibold'>Latitude:</span> 25.7456
                    </p>

                    <p>
                      <span className='font-semibold'>Longitude:</span> 89.2741
                    </p>
                  </div>

                  <button
                    type='button'
                    className='rounded-md border border-gray-300 bg-white  text-sm hover:bg-gray-50'
                  >
                    View in Full Screen
                  </button>
                </div>
              </div>
            </div>

            {/* Ownership */}
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Land Ownership & Lease Details
              </h2>

              <div className='rounded-lg border border-gray-200 bg-white p-4'>
                <div className='space-y-2'>
                  {landLeaseManagementData.ownershipDetails.map((item) => (
                    <div
                      key={item.label}
                      className='grid grid-cols-12 items-start gap-2 text-sm'
                    >
                      {/* Label */}
                      <p className='col-span-5 font-medium text-gray-700'>
                        {item.label}
                      </p>

                      {/* Colon */}
                      <p className='col-span-1 text-center text-gray-500'>:</p>

                      {/* Value */}
                      <p className='col-span-6 text-gray-600 break-words'>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Row 02 ================= */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Payment */}
          <div className='col-span-12 xl:col-span-7'>
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <h2 className='mb-4 text-lg font-semibold text-green-800'>
                Lease Payment Information
              </h2>

              <div className='overflow-x-auto rounded-lg border border-gray-200'>
                <table className='min-w-full text-sm'>
                  <thead className='bg-gray-50'>
                    <tr>
                      {landLeaseManagementData.paymentTableHeaders.map(
                        (header) => (
                          <th
                            key={header}
                            className='border border-gray-200 px-3 py-3 text-center text-xs font-semibold whitespace-nowrap text-gray-700'
                          >
                            {header}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>

                  <tbody className='bg-white'>
                    {landLeaseManagementData.paymentList.map((payment) => (
                      <tr
                        key={payment.id}
                        className='hover:bg-gray-50 transition-colors'
                      >
                        {/* SL */}
                        <td className='border border-gray-200 px-3 py-2 text-center'>
                          {payment.id}
                        </td>

                        {/* Payment Year */}
                        <td className='border border-gray-200 px-3 py-2'>
                          {payment.year}
                        </td>

                        {/* Due Date */}
                        <td className='border border-gray-200 px-3 py-2'>
                          {payment.dueDate}
                        </td>

                        {/* Amount */}
                        <td className='border border-gray-200 px-3 py-2'>
                          {payment.amount}
                        </td>

                        {/* Paid Amount */}
                        <td className='border border-gray-200 px-3 py-2'>
                          {payment.paidAmount}
                        </td>

                        {/* Payment Date */}
                        <td className='border border-gray-200 px-3 py-2'>
                          {payment.paymentDate}
                        </td>

                        {/* Status */}
                        <td className='border border-gray-200 px-3 py-2'>
                          <span className='rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'>
                            {payment.status}
                          </span>
                        </td>

                        {/* Payment Method */}
                        <td className='border border-gray-200 px-3 py-2'>
                          {payment.paymentMethod}
                        </td>

                        {/* Action */}
                        <td className='border border-gray-200 px-3 py-2 text-center'>
                          <button
                            type='button'
                            className='text-blue-600 transition hover:text-blue-800'
                          >
                            👁
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='flex flex-col items-center justify-between gap-3 border border-t-0 border-gray-200 bg-white px-4 py-3 sm:flex-row'>
                  {/* Left */}
                  <p className='text-xs text-gray-600'>
                    Showing{" "}
                    <span className='font-semibold'>
                      {landLeaseManagementData.paymentPagination.showingFrom}
                    </span>{" "}
                    to{" "}
                    <span className='font-semibold'>
                      {landLeaseManagementData.paymentPagination.showingTo}
                    </span>{" "}
                    of{" "}
                    <span className='font-semibold'>
                      {landLeaseManagementData.paymentPagination.totalRecords}
                    </span>{" "}
                    entries
                  </p>

                  {/* Right */}
                  <button
                    type='button'
                    className='rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50'
                  >
                    View All Payments
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className='col-span-12 xl:col-span-5'>
            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              {/* Top Header */}
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-lg font-semibold text-green-800'>
                  Land / Lease Documents
                </h2>

                <button
                  type='button'
                  className='flex cursor-pointer items-center gap-2 rounded-md bg-green-700 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-800'
                >
                  <Plus size={14} />
                  Add Document
                </button>
              </div>

              {/* Table */}
              <div className='overflow-x-auto rounded-lg border border-gray-200'>
                <table className='min-w-full text-sm'>
                  {/* Table Header */}
                  <thead className='bg-gray-50'>
                    <tr>
                      {landLeaseManagementData.documentTableHeaders.map(
                        (header) => (
                          <th
                            key={header}
                            className='border border-gray-200 px-3 py-3 text-center text-xs font-semibold whitespace-nowrap text-gray-700'
                          >
                            {header}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className='bg-white'>
                    {landLeaseManagementData.documentList.map((doc) => (
                      <tr
                        key={doc.id}
                        className='transition-colors hover:bg-gray-50'
                      >
                        <td className='border border-gray-200 px-3 py-2 text-center text-xs'>
                          {doc.id}
                        </td>

                        <td className='border border-gray-200 px-3 py-2 text-xs'>
                          {doc.documentName}
                        </td>

                        <td className='border border-gray-200 px-3 py-2 text-center text-xs'>
                          {doc.type}
                        </td>

                        <td className='border border-gray-200 px-3 py-2 text-xs'>
                          {doc.file}
                        </td>

                        <td className='border border-gray-200 px-3 py-2 text-center text-xs whitespace-nowrap'>
                          {doc.uploadedOn}
                        </td>

                        <td className='border border-gray-200 px-3 py-2'>
                          <div className='flex items-center justify-center gap-2'>
                            <button
                              type='button'
                              title='Download'
                              className='cursor-pointer rounded-md p-1.5 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700'
                            >
                              <Download size={16} />
                            </button>

                            <button
                              type='button'
                              title='Delete'
                              className='cursor-pointer rounded-md p-1.5 text-red-500 transition hover:bg-red-50 hover:text-red-700'
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
          </div>
        </div>

        {/* ================= Row 03 ================= */}
        <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
          <h2 className='mb-4 text-lg font-semibold text-green-800'>
            Land / Lease List (Summary)
          </h2>

          <div className='overflow-x-auto rounded-lg border border-gray-200'>
            <table className='min-w-full text-sm'>
              {/* Table Header */}
              <thead className='bg-gray-50'>
                <tr>
                  {landLeaseManagementData.summaryTableHeaders.map((header) => (
                    <th
                      key={header}
                      className='border border-gray-200 px-3 py-3 text-center text-xs font-semibold whitespace-nowrap text-gray-700'
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className='bg-white'>
                {landLeaseManagementData.landLeaseList.map((land) => (
                  <tr
                    key={land.id}
                    className='transition-colors hover:bg-gray-50'
                  >
                    {/* SL */}
                    <td className='border border-gray-200 px-3 py-2 text-center text-xs'>
                      {land.id}
                    </td>

                    {/* Land Name */}
                    <td className='border border-gray-200 px-3 py-2 text-xs whitespace-nowrap'>
                      {land.landName}
                    </td>

                    {/* Estate */}
                    <td className='border border-gray-200 px-3 py-2 text-xs whitespace-nowrap'>
                      {land.estate}
                    </td>

                    {/* Type */}
                    <td className='border border-gray-200 px-3 py-2 text-center text-xs'>
                      {land.type}
                    </td>

                    {/* Category */}
                    <td className='border border-gray-200 px-3 py-2 text-xs whitespace-nowrap'>
                      {land.category}
                    </td>

                    {/* Owner */}
                    <td className='border border-gray-200 px-3 py-2 text-xs whitespace-nowrap'>
                      {land.owner}
                    </td>

                    {/* Area */}
                    <td className='border border-gray-200 px-3 py-2 text-center text-xs'>
                      {land.area}
                    </td>

                    {/* Lease Term */}
                    <td className='border border-gray-200 px-3 py-2 text-center text-xs'>
                      {land.leaseTerm}
                    </td>

                    {/* Status */}
                    <td className='border border-gray-200 px-3 py-2 text-center'>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          land.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : land.status === "Inactive"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {land.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className='border border-gray-200 px-3 py-2'>
                      <div className='flex items-center justify-center gap-2'>
                        <button
                          type='button'
                          title='Edit'
                          className='cursor-pointer rounded-md p-1.5 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700'
                        >
                          ✏️
                        </button>

                        <button
                          type='button'
                          title='Delete'
                          className='cursor-pointer rounded-md p-1.5 text-red-500 transition hover:bg-red-50 hover:text-red-700'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex flex-col gap-3 border border-t-0 border-gray-200 bg-white px-4 py-3 md:flex-row md:items-center md:justify-between'>
              {/* Left */}
              <p className='text-xs text-gray-600'>
                Showing{" "}
                <span className='font-semibold'>
                  {landLeaseManagementData.summaryPagination.showingFrom}
                </span>{" "}
                to{" "}
                <span className='font-semibold'>
                  {landLeaseManagementData.summaryPagination.showingTo}
                </span>{" "}
                of{" "}
                <span className='font-semibold'>
                  {landLeaseManagementData.summaryPagination.totalRecords}
                </span>{" "}
                entries
              </p>

              {/* Right */}
              <div className='flex flex-wrap items-center gap-3'>
                {/* Pagination */}
                <div className='flex items-center gap-2'>
                  {landLeaseManagementData.summaryPagination.pages.map(
                    (page) => (
                      <button
                        key={page}
                        type='button'
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border text-sm transition ${
                          page ===
                          landLeaseManagementData.summaryPagination.currentPage
                            ? "border-green-700 bg-green-700 text-white"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    type='button'
                    className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100'
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandAndLeaseManagement;
