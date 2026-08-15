import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import { estateProfileData } from "../../data/EstateManagementData/estateProfileData";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Map,
  Leaf,
  Trees,
  Building2,
  LayoutGrid,
  Users,
  CalendarDays,
  X,
  RotateCcw,
  Save,
} from "lucide-react";
const summaryIconMap = {
  map: Map,
  leaf: Leaf,
  trees: Trees,
  building: Building2,
  section: LayoutGrid,
  field: LayoutGrid,
  users: Users,
  calendar: CalendarDays,
};

const EstateProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  // hooks
  const navigate = useNavigate();
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  // onsubmit functionality
  const estateProfileSubmit = async (data) => {
    try {
      console.log(data);

      toast.success("Estate created");

      reset();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <form onSubmit={handleSubmit(estateProfileSubmit)} className='space-y-6'>
      {/* Top Tabs */}
      <EstateManagementTabs />

      {/* Main Layout */}
      <div className='grid grid-cols-12 gap-6'>
        {/* Left Side */}
        <div className='col-span-12 space-y-6 xl:col-span-7'>
          {/* Estate Basic Information */}

          <div className='rounded-xl  shadow-sm  '>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold  text-green-800 '>
                Estate Basic Information
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-5 p-6 md:grid-cols-2 xl:grid-cols-3'>
              {/* Estate Name */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter estate name'
                  {...register("estateName", {
                    required: "Estate Name is required",
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.estateName && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.estateName.message}
                  </p>
                )}
              </div>

              {/* Estate Code */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Code <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter estate code'
                  {...register("estateCode", {
                    required: "Estate Code is required",
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.estateCode && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.estateCode.message}
                  </p>
                )}
              </div>

              {/* Established Year */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Established Year
                </label>
                <input
                  type='number'
                  placeholder='e.g. 1998'
                  {...register("establishedYear", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.establishedYear && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.establishedYear.message}
                  </p>
                )}
              </div>

              {/* Company / Owner */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Company / Owner
                </label>
                <input
                  type='text'
                  placeholder='Enter company name'
                  {...register("companyOwner")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.companyOwner && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.companyOwner.message}
                  </p>
                )}
              </div>

              {/* Estate Type */}
              <select
                {...register("estateType")}
                className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'
              >
                <option value=''>Select Estate Type</option>

                {estateProfileData.estateTypes.map((type) => (
                  <option key={type.id} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Estate Category */}
              <select
                {...register("estateCategory")}
                className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'
              >
                <option value=''>Select Category</option>

                {estateProfileData.estateCategories.map((category) => (
                  <option key={category.id} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* Address */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Address
                </label>

                <textarea
                  rows={1}
                  placeholder='Enter estate address'
                  {...register("address")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.address && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Police Station */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Police Station
                </label>
                <input
                  type='text'
                  placeholder='Police Station'
                  {...register("policeStation")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.policeStation && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.policeStation.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  District
                </label>
                <input
                  type='text'
                  placeholder='District'
                  {...register("district")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.district && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Division */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Division
                </label>
                <input
                  type='text'
                  placeholder='Division'
                  {...register("division")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.division && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.division.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Country
                </label>
                <input
                  type='text'
                  placeholder='Country'
                  {...register("country")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.country && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Zip Code */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Zip Code
                </label>
                <input
                  type='text'
                  placeholder='Zip Code'
                  {...register("zipCode")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.zipCode && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Phone
                </label>
                <input
                  type='text'
                  placeholder='+8801XXXXXXXXX'
                  {...register("phone", {
                    pattern: {
                      value: /^(\+8801|01)[3-9]\d{8}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.phone && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  placeholder='example@email.com'
                  {...register("email", {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.email && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Website */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Website
                </label>
                <input
                  type='url'
                  placeholder='https://example.com'
                  {...register("website")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.website && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.website.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Estate Overview */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b px-6 py-4 bg-green-50'>
              <h2 className='text-lg font-semibold text-green-800'>
                Estate Overview
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 xl:grid-cols-4'>
              {/* Total Land Area */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Land Area (Acre)
                  <span className='ml-1 text-red-500'>*</span>
                </label>

                <input
                  type='number'
                  step='0.01'
                  placeholder='0.00'
                  {...register("totalLandArea", {
                    required: "Total Land Area is required",
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.totalLandArea && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalLandArea.message}
                  </p>
                )}
              </div>

              {/* Tea Area */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Tea Area (Acre)
                  <span className='ml-1 text-red-500'>*</span>
                </label>

                <input
                  type='number'
                  step='0.01'
                  placeholder='0.00'
                  {...register("teaArea", {
                    required: "Tea Area is required",
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.teaArea && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.teaArea.message}
                  </p>
                )}
              </div>

              {/* Non Tea Area */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Non Tea Area (Acre)
                </label>

                <input
                  type='number'
                  step='0.01'
                  placeholder='0.00'
                  {...register("nonTeaArea", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.nonTeaArea && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.nonTeaArea.message}
                  </p>
                )}
              </div>

              {/* Total Field / Block */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Field / Block
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalField", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalField && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalField.message}
                  </p>
                )}
              </div>

              {/* Total Division */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Division
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalDivision", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalDivision && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalDivision.message}
                  </p>
                )}
              </div>

              {/* Total Section */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Section
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalSection", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalSection && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalSection.message}
                  </p>
                )}
              </div>

              {/* Total Worker */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Worker
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalWorker", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalWorker && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalWorker.message}
                  </p>
                )}
              </div>

              {/* Total Family */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Family
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalFamily", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalFamily && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalFamily.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Manager / In-charge Information */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold bg-green-50 text-green-800'>
                Manager / In-charge Information
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 xl:grid-cols-3'>
              {/* Estate Manager */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Manager
                </label>

                <input
                  type='text'
                  placeholder='Enter estate manager name'
                  {...register("estateManager", {
                    required: "Estate Manager is required",
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.estateManager && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.estateManager.message}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Mobile
                </label>

                <input
                  type='tel'
                  placeholder='+8801XXXXXXXXX'
                  {...register("estateManagerMobile", {
                    required: "Mobile Number is required",
                    pattern: {
                      value: /^(\+8801|01)[3-9]\d{8}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.estateManagerMobile && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.estateManagerMobile.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Email
                </label>

                <input
                  type='email'
                  placeholder='manager@example.com'
                  {...register("estateManagerEmail", {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.estateManagerEmail && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.estateManagerEmail.message}
                  </p>
                )}
              </div>

              {/* Assistant Manager */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Assistant Manager
                </label>

                <input
                  type='text'
                  placeholder='Enter assistant manager name'
                  {...register("assistantManager")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.assistantManager && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.assistantManager.message}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Mobile
                </label>

                <input
                  type='tel'
                  placeholder='+8801XXXXXXXXX'
                  {...register("assistantManagerMobile", {
                    pattern: {
                      value: /^(\+8801|01)[3-9]\d{8}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.assistantManagerMobile && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.assistantManagerMobile.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Email
                </label>

                <input
                  type='email'
                  placeholder='assistant@example.com'
                  {...register("assistantManagerEmail", {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.assistantManagerEmail && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.assistantManagerEmail.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Facilities / Amenities */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold bg-green-50 text-green-800'>
                Facilities / Amenities
              </h2>
            </div>

            {/* Body */}
            {/* Body */}
            <div className='grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-4'>
              {/* Dynamic Facilities */}
              <div className='md:col-span-2 xl:col-span-3'>
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
                  {estateProfileData.facilityOptions.map((facility) => (
                    <label
                      key={facility.id}
                      className='flex items-center gap-2 text-sm text-gray-700'
                    >
                      <input
                        type='checkbox'
                        {...register(facility.key)}
                        className='checkbox checkbox-success checkbox-sm rounded'
                      />

                      {facility.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Others */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Others (Specify)
                </label>

                <input
                  type='text'
                  placeholder='Gym, Guest House...'
                  {...register("otherFacilityName")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.otherFacilityName && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.otherFacilityName.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='col-span-12 space-y-6 xl:col-span-5'>
          {/* Estate Images */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b px-6 py-4'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Estate Images
              </h2>
            </div>

            {/* Body */}
            <div className='p-6'>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                {estateProfileData.estateImages.map((image) => (
                  <div
                    key={image.id}
                    className='overflow-hidden rounded-xl border border-gray-200'
                  >
                    <img
                      src={image.image}
                      alt={image.title}
                      className='h-28 w-full object-cover transition duration-300 hover:scale-105 cursor-pointer'
                    />
                  </div>
                ))}

                {/* Add More */}
                <button
                  type='button'
                  className='flex h-28 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-green-600 hover:text-green-600 cursor-pointer'
                >
                  <span className='text-3xl font-light'>+</span>
                  <span className='mt-2 text-sm font-medium'>Add More</span>
                </button>
              </div>
            </div>
          </div>

          {/* Estate Summary */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Estate Summary
              </h2>
            </div>

            {/* Body */}
            <div className='p-6'>
              <div className='space-y-2'>
                {estateProfileData.estateSummary.map((item) => {
                  const Icon = summaryIconMap[item.icon];

                  return (
                    <div
                      key={item.id}
                      className='flex items-center justify-between py-1'
                    >
                      <div className='flex items-center gap-3'>
                        <Icon size={18} className='text-gray-500' />

                        <span className='text-sm text-gray-700'>
                          {item.title}
                        </span>
                      </div>

                      <span className='text-sm font-semibold text-green-700'>
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Geo Location */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Geo Location
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-5 p-3 lg:grid-cols-2'>
              {/* Left */}
              <div className='space-y-5'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Latitude
                  </label>

                  <input
                    type='number'
                    step='any'
                    placeholder='26.3417'
                    {...register("latitude", {
                      required: "Latitude is required",
                      valueAsNumber: true,
                      min: {
                        value: -90,
                        message: "Latitude must be greater than -90",
                      },
                      max: {
                        value: 90,
                        message: "Latitude must be less than 90",
                      },
                    })}
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />

                  {errors.latitude && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.latitude.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Longitude
                  </label>

                  <input
                    type='number'
                    step='any'
                    placeholder='88.0008'
                    {...register("longitude", {
                      required: "Longitude is required",
                      valueAsNumber: true,
                      min: {
                        value: -180,
                        message: "Longitude must be greater than -180",
                      },
                      max: {
                        value: 180,
                        message: "Longitude must be less than 180",
                      },
                    })}
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />

                  {errors.longitude && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.longitude.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right */}
              <div className='overflow-hidden rounded-xl border border-gray-200'>
                <iframe
                  title='Estate Location'
                  src={`https://maps.google.com/maps?q=${latitude || 26.3417},${longitude || 88.0008}&z=14&output=embed`}
                  className='h-64 w-full'
                  loading='lazy'
                />
              </div>
            </div>
          </div>

          {/* Description / Note */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Description / Note
              </h2>
            </div>

            {/* Body */}
            <div className='p-6'>
              <textarea
                rows={10}
                placeholder='Write estate description...'
                {...register("description")}
                className='w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
              />
              {errors.description && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}

      <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
        <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
          <p className='text-sm text-red-500'>* Mandatory Field</p>

          <div className='flex items-center gap-3'>
            {/* Cancel */}
            <button
              type='button'
              onClick={() => navigate(-1)}
              className='inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 cursor-pointer'
            >
              <X size={18} />
              Cancel
            </button>

            {/* Reset */}
            <button
              type='button'
              onClick={() => reset()}
              className='inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-6 text-sm font-medium text-green-700 transition-all duration-200 hover:bg-green-100 hover:border-green-300 cursor-pointer'
            >
              <RotateCcw
                size={18}
                className={isSubmitting ? "animate-spin" : ""}
              />
              Reset
            </button>

            {/* Save */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='inline-flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-lg bg-green-700 px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer'
            >
              <Save size={18} />
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EstateProfile;
