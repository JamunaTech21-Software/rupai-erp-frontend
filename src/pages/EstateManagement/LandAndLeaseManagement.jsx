import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import { landLeaseManagementData } from "../../data/EstateManagementData/landAndLeaseManagementData";
import {
  Plus,
  Minus,
  Layers3,
  Expand,
  MapPin,
  X,
  RotateCcw,
  Save,
  Download,
  Trash2,
} from "lucide-react";
const LandAndLeaseManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const FieldOrBlockManagementonSubmit = (data) => {
    console.log("Field / Block Data:", data);

    toast.success("Field / Block saved successfully.");

    reset();
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
            <form onSubmit={handleSubmit(FieldOrBlockManagementonSubmit)}>
              <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
                <h2 className='mb-5 text-lg font-semibold text-green-800'>
                  Land / Lease Information
                </h2>

                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
                  {/* =====================================================
                          Estate
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                      })}
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                        errors.estate
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Estate</option>

                      {landLeaseManagementData.estates.map((estate) => (
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

                  {/* =====================================================
                          Land / Lease Type
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Land / Lease Type <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("landLeaseType", {
                        required: "Land / Lease Type is required",
                      })}
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                        errors.landLeaseType
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Type</option>

                      {landLeaseManagementData.landLeaseTypes.map((type) => (
                        <option key={type.id} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>

                    {errors.landLeaseType && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.landLeaseType.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                          Land Category
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Land Category <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("landCategory", {
                        required: "Land Category is required",
                      })}
                      className={`h-11 w-full rounded-lg border bg-white px-3 text-sm outline-none ${
                        errors.landCategory
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Category</option>

                      {landLeaseManagementData.landCategories.map(
                        (category) => (
                          <option key={category.id} value={category.value}>
                            {category.label}
                          </option>
                        ),
                      )}
                    </select>

                    {errors.landCategory && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.landCategory.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                          Land / Lease Name
                      ====================================================== */}
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
                      className={`h-11 w-full rounded-lg border px-3 text-sm outline-none ${
                        errors.landLeaseName
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.landLeaseName && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.landLeaseName.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                          Survey / Khatian
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Survey / Khatian No.
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Survey / Khatian No.'
                      {...register("surveyNo")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* =====================================================
                          Plot / Dag
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Plot / Dag No.
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Plot / Dag No.'
                      {...register("plotNo")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* =====================================================
                          Mouza
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Mouza
                    </label>

                    <select
                      {...register("mouza")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                    >
                      <option value=''>Select Mouza</option>

                      {landLeaseManagementData.mouzas.map((mouza) => (
                        <option key={mouza.id} value={mouza.value}>
                          {mouza.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* =====================================================
                          JL / LR No
                      ====================================================== */}
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

                  {/* =====================================================
                          Record Type
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Record Type
                    </label>

                    <select
                      {...register("recordType")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                    >
                      <option value=''>Select Record Type</option>

                      {landLeaseManagementData.recordTypes.map((record) => (
                        <option key={record.id} value={record.value}>
                          {record.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* =====================================================
                          Total Area
                      ====================================================== */}
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
                      className={`h-11 w-full rounded-lg border px-3 text-sm outline-none ${
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

                  {/* =====================================================
                          Usable Area
                      ====================================================== */}
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

                  {/* =====================================================
                          Non Usable Area
                      ====================================================== */}
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

                  {/* =====================================================
                          Location
                      ====================================================== */}
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

                  {/* =====================================================
                          GPS Area
                      ====================================================== */}
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
                        className='h-11 min-w-0 flex-1 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />

                      <button
                        type='button'
                        className='rounded-lg border border-gray-300 px-4 text-sm transition hover:bg-gray-50'
                      >
                        Verify
                      </button>
                    </div>
                  </div>

                  {/* =====================================================
                          Land Status
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Land Status
                    </label>

                    <select
                      {...register("landStatus")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                    >
                      <option value=''>Select Status</option>

                      {landLeaseManagementData.landStatuses.map((status) => (
                        <option key={status.id} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* =====================================================
                          Acquisition / Lease Date
                      ====================================================== */}
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
                      className={`h-11 w-full rounded-lg border px-3 text-sm outline-none ${
                        errors.acquisitionDate
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.acquisitionDate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.acquisitionDate.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                          Start Date
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Start Date <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='date'
                      {...register("startDate", {
                        required: "Start Date is required",
                      })}
                      className={`h-11 w-full rounded-lg border px-3 text-sm outline-none ${
                        errors.startDate
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.startDate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                        End Date
                    ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      End Date <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='date'
                      {...register("endDate", {
                        required: "End Date is required",
                      })}
                      className={`h-11 w-full rounded-lg border px-3 text-sm outline-none ${
                        errors.endDate
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.endDate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.endDate.message}
                      </p>
                    )}
                  </div>

                  {/* =====================================================
                          Lease Term
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Lease Term (Year)
                    </label>

                    <input
                      type='number'
                      placeholder='Enter Lease Term'
                      {...register("leaseTerm", {
                        valueAsNumber: true,
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* =====================================================
                          Rent / Lease Amount
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Rent / Lease Amount (BDT)
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Rent Amount'
                      {...register("rentAmount", {
                        valueAsNumber: true,
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* =====================================================
                          Rent Per Acre
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Rent / Lease Per Acre (BDT)
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Rent Per Acre'
                      {...register("rentPerAcre", {
                        valueAsNumber: true,
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* =====================================================
                          Purpose / Remarks
                      ====================================================== */}
                  <div className='md:col-span-2'>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Purpose / Remarks
                    </label>

                    <textarea
                      rows={2}
                      placeholder='Enter Purpose / Remarks'
                      {...register("purpose")}
                      className='w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* =====================================================
                          Documents
                      ====================================================== */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Documents
                    </label>

                    <input
                      type='file'
                      {...register("documents")}
                      className='h-11 w-full rounded-lg border border-gray-300 text-sm file:mr-3 file:border-0 file:bg-gray-100 file:px-3 file:py-2'
                    />
                  </div>

                  {/* =====================================================
                          Action Buttons
                      ====================================================== */}
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
            {/* =========================================================
    Land / Lease Map
========================================================= */}

            <div className='mt-5 rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* =======================================================
      Map Header
  ======================================================== */}
              <div className='flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h2 className='text-lg font-semibold text-green-800'>
                    Land / Lease Map
                  </h2>

                  <p className='mt-1 text-xs text-gray-500'>
                    GIS location and land boundary information
                  </p>
                </div>

                {/* Map Type */}
                <div className='flex items-center gap-2'>
                  <span className='text-xs font-medium text-gray-500'>
                    Map Type:
                  </span>

                  <span className='rounded-md bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700'>
                    {landLeaseManagementData.mapInformation.mapType}
                  </span>
                </div>
              </div>

              {/* =======================================================
      Map Area
  ======================================================== */}

              <div className='relative h-[360px] w-full overflow-hidden rounded-b-xl'>
                {/* -------------------------------------------------------
        Map Background
    -------------------------------------------------------- */}

                <div
                  className='absolute inset-0 bg-cover bg-center'
                  style={{
                    backgroundImage: "url('/land-lease-map.png')",
                  }}
                >
                  {/* Map Overlay */}
                  <div className='absolute inset-0 bg-black/5' />

                  {/* =====================================================
          Land Boundary
      ====================================================== */}

                  <div
                    className='absolute rounded-[45%] border-2 border-green-700 bg-green-400/30 shadow-sm'
                    style={{
                      width: "52%",
                      height: "62%",
                      left: "23%",
                      top: "18%",
                      transform: "rotate(-8deg)",
                    }}
                  />

                  {/* =====================================================
          Marker
      ====================================================== */}

                  <div
                    className='absolute'
                    style={{
                      left: "50%",
                      top: "45%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Marker */}
                    <div className='relative flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white shadow-lg ring-4 ring-white/80'>
                      <MapPin size={20} />
                    </div>

                    {/* Marker Information */}
                    <div className='absolute left-1/2 top-12 w-52 -translate-x-1/2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg'>
                      <h3 className='mb-2 text-sm font-semibold text-green-800'>
                        {landLeaseManagementData.marker.name}
                      </h3>

                      <div className='space-y-1 text-xs text-gray-600'>
                        <p>
                          <span className='font-medium text-gray-700'>
                            Latitude:
                          </span>{" "}
                          {landLeaseManagementData.marker.latitude}
                        </p>

                        <p>
                          <span className='font-medium text-gray-700'>
                            Longitude:
                          </span>{" "}
                          {landLeaseManagementData.marker.longitude}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* =====================================================
          Map Toolbar
      ====================================================== */}

                  <div className='absolute right-4 top-4 flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg'>
                    {/* Zoom In */}
                    <button
                      type='button'
                      title='Zoom In'
                      className='flex h-10 w-10 items-center justify-center border-b border-gray-200 text-gray-700 transition hover:bg-gray-100'
                    >
                      <Plus size={18} />
                    </button>

                    {/* Zoom Out */}
                    <button
                      type='button'
                      title='Zoom Out'
                      className='flex h-10 w-10 items-center justify-center border-b border-gray-200 text-gray-700 transition hover:bg-gray-100'
                    >
                      <Minus size={18} />
                    </button>

                    {/* Layers */}
                    <button
                      type='button'
                      title='Layers'
                      className='flex h-10 w-10 items-center justify-center border-b border-gray-200 text-gray-700 transition hover:bg-gray-100'
                    >
                      <Layers3 size={18} />
                    </button>

                    {/* Fullscreen */}
                    <button
                      type='button'
                      title='Fullscreen'
                      className='flex h-10 w-10 items-center justify-center text-gray-700 transition hover:bg-gray-100'
                    >
                      <Expand size={18} />
                    </button>
                  </div>

                  {/* =====================================================
          Map Legend
      ====================================================== */}

                  <div className='absolute bottom-4 left-4 rounded-lg border border-gray-200 bg-white/95 p-3 shadow-md backdrop-blur-sm'>
                    <h4 className='mb-2 text-xs font-semibold text-gray-700'>
                      Map Legend
                    </h4>

                    <div className='space-y-2'>
                      {landLeaseManagementData.legends.map((legend) => (
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
          Coordinates Badge
      ====================================================== */}

                  <div className='absolute bottom-4 right-4 rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-md backdrop-blur-sm'>
                    <p className='text-xs text-gray-600'>
                      <span className='font-medium'>Coordinates:</span>{" "}
                      {landLeaseManagementData.mapInformation.latitude},{" "}
                      {landLeaseManagementData.mapInformation.longitude}
                    </p>
                  </div>
                </div>
              </div>

              {/* =======================================================
      Map Information Footer
  ======================================================== */}

              <div className='border-t border-gray-200 px-5 py-4'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                  {/* Total Area */}
                  <div className='rounded-lg border border-gray-200 bg-gray-50 p-3'>
                    <p className='text-xs text-gray-500'>Total Area</p>

                    <p className='mt-1 text-sm font-semibold text-gray-800'>
                      {landLeaseManagementData.mapInformation.totalArea}
                    </p>
                  </div>

                  {/* Perimeter */}
                  <div className='rounded-lg border border-gray-200 bg-gray-50 p-3'>
                    <p className='text-xs text-gray-500'>Perimeter</p>

                    <p className='mt-1 text-sm font-semibold text-gray-800'>
                      {landLeaseManagementData.mapInformation.perimeter}
                    </p>
                  </div>

                  {/* Latitude */}
                  <div className='rounded-lg border border-gray-200 bg-gray-50 p-3'>
                    <p className='text-xs text-gray-500'>Latitude</p>

                    <p className='mt-1 text-sm font-semibold text-gray-800'>
                      {landLeaseManagementData.mapInformation.latitude}
                    </p>
                  </div>

                  {/* Longitude */}
                  <div className='rounded-lg border border-gray-200 bg-gray-50 p-3'>
                    <p className='text-xs text-gray-500'>Longitude</p>

                    <p className='mt-1 text-sm font-semibold text-gray-800'>
                      {landLeaseManagementData.mapInformation.longitude}
                    </p>
                  </div>
                </div>

                {/* =====================================================
        Survey Information
    ====================================================== */}

                <div className='mt-4 grid grid-cols-1 gap-3 border-t border-gray-200 pt-4 sm:grid-cols-2 lg:grid-cols-4'>
                  {/* Projection */}
                  <div>
                    <p className='text-xs text-gray-500'>Projection</p>

                    <p className='mt-1 text-sm font-medium text-gray-800'>
                      {landLeaseManagementData.mapInformation.projection}
                    </p>
                  </div>

                  {/* Coordinate System */}
                  <div>
                    <p className='text-xs text-gray-500'>Coordinate System</p>

                    <p className='mt-1 text-sm font-medium text-gray-800'>
                      {landLeaseManagementData.mapInformation.coordinateSystem}
                    </p>
                  </div>

                  {/* Last Survey */}
                  <div>
                    <p className='text-xs text-gray-500'>Last Survey</p>

                    <p className='mt-1 text-sm font-medium text-gray-800'>
                      {landLeaseManagementData.mapInformation.lastSurvey}
                    </p>
                  </div>

                  {/* Accuracy */}
                  <div>
                    <p className='text-xs text-gray-500'>Accuracy</p>

                    <p className='mt-1 text-sm font-medium text-gray-800'>
                      {landLeaseManagementData.mapInformation.accuracy}
                    </p>
                  </div>
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
