import EstateManagementTabs from "../components/estateManagement/EstateManagementTabs";
import { estateProfileData } from "../data/estateProfileData";
import {
  Map,
  Leaf,
  Trees,
  Building2,
  LayoutGrid,
  Users,
  CalendarDays,
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
  return (
    <div className='space-y-6'>
      {/* Top Tabs */}
      <EstateManagementTabs />

      {/* Main Layout */}
      <div className='grid grid-cols-12 gap-6'>
        {/* Left Side */}
        <div className='col-span-12 space-y-6 xl:col-span-7'>
          {/* Estate Basic Information */}

          <div className='rounded-xl  shadow-sm  '>
            {/* Header */}
            <div className='border-b px-6 py-4'>
              <h2 className='text-lg font-semibold bg-green-50 text-green-800 '>
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
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Estate Code */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Code <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter estate code'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Established Year */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Established Year
                </label>
                <input
                  type='number'
                  placeholder='e.g. 1998'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Company / Owner */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Company / Owner
                </label>
                <input
                  type='text'
                  placeholder='Enter company name'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Estate Type */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Type
                </label>

                <select className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'>
                  <option value=''>Select Estate Type</option>
                  <option>Company Owned</option>
                  <option>Private Estate</option>
                  <option>Government Estate</option>
                </select>
              </div>

              {/* Estate Category */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Category
                </label>

                <select className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'>
                  <option value=''>Select Category</option>
                  <option>Large Estate</option>
                  <option>Medium Estate</option>
                  <option>Small Estate</option>
                </select>
              </div>

              {/* Address */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Address
                </label>

                <textarea
                  rows='1'
                  placeholder='Enter estate address'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                ></textarea>
              </div>

              {/* Police Station */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Police Station
                </label>
                <input
                  type='text'
                  placeholder='Police Station'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* District */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  District
                </label>
                <input
                  type='text'
                  placeholder='District'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Division */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Division
                </label>
                <input
                  type='text'
                  placeholder='Division'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Country */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Country
                </label>
                <input
                  type='text'
                  placeholder='Country'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Zip Code
                </label>
                <input
                  type='text'
                  placeholder='Zip Code'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Phone */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Phone
                </label>
                <input
                  type='text'
                  placeholder='+8801XXXXXXXXX'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Email */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  placeholder='example@email.com'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Website */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Website
                </label>
                <input
                  type='url'
                  placeholder='https://example.com'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
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
                  placeholder='0.00'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Tea Area */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Tea Area (Acre)
                  <span className='ml-1 text-red-500'>*</span>
                </label>

                <input
                  type='number'
                  placeholder='0.00'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Non Tea Area */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Non Tea Area (Acre)
                </label>

                <input
                  type='number'
                  placeholder='0.00'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Total Field / Block */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Field / Block
                </label>

                <input
                  type='number'
                  placeholder='0'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Total Division */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Division
                </label>

                <input
                  type='number'
                  placeholder='0'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Total Section */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Section
                </label>

                <input
                  type='number'
                  placeholder='0'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Total Worker */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Worker
                </label>

                <input
                  type='number'
                  placeholder='0'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Total Family */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Family
                </label>

                <input
                  type='number'
                  placeholder='0'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>
            </div>
          </div>

          {/* Manager / In-charge Information */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b px-6 py-4'>
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
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Mobile */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Mobile
                </label>

                <input
                  type='tel'
                  placeholder='+8801XXXXXXXXX'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Email */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Email
                </label>

                <input
                  type='email'
                  placeholder='manager@example.com'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Assistant Manager */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Assistant Manager
                </label>

                <input
                  type='text'
                  placeholder='Enter assistant manager name'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Mobile */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Mobile
                </label>

                <input
                  type='tel'
                  placeholder='+8801XXXXXXXXX'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>

              {/* Email */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Email
                </label>

                <input
                  type='email'
                  placeholder='assistant@example.com'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>
            </div>
          </div>

          {/* Facilities / Amenities */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b px-6 py-4'>
              <h2 className='text-lg font-semibold bg-green-50 text-green-800'>
                Facilities / Amenities
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-4'>
              {/* Column 1 */}
              <div className='space-y-3'>
                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Factory
                </label>

                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Warehouse
                </label>

                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Staff Quarter
                </label>

                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Hospital / Dispensary
                </label>
              </div>

              {/* Column 2 */}
              <div className='space-y-3'>
                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  School
                </label>

                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Playground
                </label>

                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Mosque / Temple
                </label>

                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Electricity
                </label>
              </div>

              {/* Column 3 */}
              <div className='space-y-3'>
                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Water Supply
                </label>

                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Transport
                </label>

                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Canteen
                </label>

                <label className='flex items-center gap-2 text-sm text-gray-700'>
                  <input
                    type='checkbox'
                    className='checkbox checkbox-success checkbox-sm rounded'
                  />
                  Others
                </label>
              </div>

              {/* Column 4 */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Others (Specify)
                </label>

                <input
                  type='text'
                  placeholder='Club, Library, Gym...'
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='col-span-12 space-y-6 xl:col-span-5'>
          {/* Estate Images */}
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
                      className='h-28 w-full object-cover transition duration-300 hover:scale-105'
                    />
                  </div>
                ))}

                {/* Add More */}
                <button
                  type='button'
                  className='flex h-28 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-green-600 hover:text-green-600'
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
                    type='text'
                    placeholder='26.3417'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Longitude
                  </label>

                  <input
                    type='text'
                    placeholder='88.0008'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />
                </div>
              </div>

              {/* Right */}
              <div className='overflow-hidden rounded-xl border border-gray-200'>
                <iframe
                  title='Estate Location'
                  src='https://maps.google.com/maps?q=26.3417,88.0008&z=14&output=embed'
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
                defaultValue={estateProfileData.description}
                className='w-full resize-none rounded-lg border  bg-white px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateProfile;
