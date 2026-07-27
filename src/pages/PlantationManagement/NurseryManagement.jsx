import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";
import { nurseryManagementData } from "../../data/PlantationManagementData/nurseryManagementData";
import {
  RotateCcw,
  Save,
  Plus,
  SquarePen,
  Trash2,
  Map,
  MapPinned,
  LayoutGrid,
  Sprout,
  Leaf,
  Truck,
  Minus,
  Expand,
  Eye,
} from "lucide-react";
const summaryIconMap = {
  Map,
  MapPinned,
  LayoutGrid,
  Sprout,
  Leaf,
  Truck,
};
const NurseryManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    toast.success("Nursery saved successfully!");

    reset();
  };
  return (
    <div className='space-y-6'>
      <PlantationManagementTabs />

      {/* Main Layout */}
      <div className='grid grid-cols-12 gap-2'>
        {/* Left Side */}
        <div className='col-span-12 xl:col-span-5 space-y-6'>
          {/* Nursery Information */}

          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-6 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Nursery Information
              </h2>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 p-6'>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                {/* Estate */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Estate <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("estate", {
                      required: "Estate is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Estate</option>
                    <option value='Jamuna Tea Estate'>Jamuna Tea Estate</option>
                    <option value='Surma Tea Estate'>Surma Tea Estate</option>
                    <option value='Green Valley Tea Estate'>
                      Green Valley Tea Estate
                    </option>
                  </select>

                  {errors.estate && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.estate.message}
                    </p>
                  )}
                </div>

                {/* Division */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Division <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("division", {
                      required: "Division is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Division</option>
                    <option value='Rangpur Division (DIV-01)'>
                      Rangpur Division (DIV-01)
                    </option>
                    <option value='Sylhet Division (DIV-02)'>
                      Sylhet Division (DIV-02)
                    </option>
                    <option value='Chattogram Division (DIV-03)'>
                      Chattogram Division (DIV-03)
                    </option>
                  </select>

                  {errors.division && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.division.message}
                    </p>
                  )}
                </div>

                {/* Nursery Name */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Name
                  </label>

                  <input
                    type='text'
                    placeholder='Central Nursery'
                    {...register("nurseryName", {
                      required: "Nursery Name is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.nurseryName && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.nurseryName.message}
                    </p>
                  )}
                </div>

                {/*Supervisor / In-charge  */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Supervisor / In-charge{" "}
                    <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("supervisor", {
                      required: "Supervisor is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Supervisor</option>
                    <option value='Md. Faruk Hossain'>Md. Faruk Hossain</option>
                    <option value='Abdul Karim'>Abdul Karim</option>
                    <option value='Nur Alam'>Nur Alam</option>
                  </select>

                  {errors.supervisor && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.supervisor.message}
                    </p>
                  )}
                </div>

                {/* Nursery Code */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Code <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    placeholder='NUR-001'
                    {...register("nurseryCode", {
                      required: "Nursery Code is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.nurseryCode && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.nurseryCode.message}
                    </p>
                  )}
                </div>

                {/* Nursery type */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Type <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("nurseryType", {
                      required: "Nursery Type is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Nursery Type</option>
                    <option value='Clonal'>Clonal</option>
                    <option value='Seedling'>Seedling</option>
                    <option value='Experimental'>Experimental</option>
                  </select>

                  {errors.nurseryType && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.nurseryType.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Location <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    placeholder='Uttarkhan, Rangpur'
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.location && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Irrigation */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Irrigation Source <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("irrigationSource", {
                      required: "Irrigation Source is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Irrigation Source</option>
                    <option value='Tube Well'>Tube Well</option>
                    <option value='Deep Tube Well'>Deep Tube Well</option>
                    <option value='River'>River</option>
                    <option value='Rain Water'>Rain Water</option>
                  </select>

                  {errors.irrigationSource && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.irrigationSource.message}
                    </p>
                  )}
                </div>

                {/* Established Year */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Established Year <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    placeholder='2020'
                    {...register("establishedYear", {
                      required: "Established Year is required",
                      min: {
                        value: 1900,
                        message: "Enter a valid year",
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future",
                      },
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.establishedYear && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.establishedYear.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Status <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("status", {
                      required: "Status is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Status</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                    <option value='Under Maintenance'>Under Maintenance</option>
                  </select>

                  {errors.status && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.status.message}
                    </p>
                  )}
                </div>
                {/* Total Area */}

                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Total Area (Acre) <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    step='0.01'
                    placeholder='5.60'
                    {...register("totalArea", {
                      required: "Total Area is required",
                      min: {
                        value: 0.01,
                        message: "Area must be greater than 0",
                      },
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.totalArea && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.totalArea.message}
                    </p>
                  )}
                </div>
                {/* Net useable are */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Net Usable Area (Acre){" "}
                    <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    step='0.01'
                    placeholder='4.80'
                    {...register("netUsableArea", {
                      required: "Net Usable Area is required",
                      min: {
                        value: 0.01,
                        message: "Area must be greater than 0",
                      },
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.netUsableArea && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.netUsableArea.message}
                    </p>
                  )}
                </div>
                {/* active select */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Active <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("active", {
                      required: "Please select an option",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select</option>
                    <option value='Tea Research Institute'>
                      Tea Research Institute
                    </option>
                    <option value='BTB'>Bangladesh Tea Board</option>
                    <option value='Private'>Private</option>
                  </select>

                  {errors.active && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.active.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='col-span-full'>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Remarks
                </label>

                <textarea
                  rows={4}
                  placeholder='Write remarks...'
                  {...register("remarks")}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                />
              </div>

              {/* Buttons */}

              <div className='flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => reset()}
                  className='flex  cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium transition hover:bg-gray-100'
                >
                  <RotateCcw size={16} />
                  Reset
                </button>

                <button
                  type='submit'
                  className='flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2 text-sm cursor-pointer font-medium text-white transition hover:bg-green-800'
                >
                  <Save size={16} />
                  Save Nursery
                </button>
              </div>
            </form>
          </div>

          {/* Nursery Production Summary */}

          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Nursery Production Summary
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 p-4'>
              {nurseryManagementData.nurserySummary.map((item) => {
                const Icon = summaryIconMap[item.icon];

                return (
                  <div
                    key={item.id}
                    className='flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-green-300 hover:shadow-md'
                  >
                    {/* Icon */}
                    <div className='rounded-lg bg-green-100 p-1'>
                      <Icon size={22} className='text-green-700' />
                    </div>

                    {/* Content */}
                    <div>
                      <p className='text-xs text-gray-500'>{item.title}</p>

                      <h3 className='mt-1 text-xl font-bold text-green-700'>
                        {item.value}
                        {item.unit && (
                          <span className='ml-1 text-sm font-medium text-gray-500'>
                            {item.unit}
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='col-span-12 xl:col-span-7 space-y-6'>
          {/* Bed List */}
          <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='flex items-center justify-between border-b border-gray-200 px-6 py-2'>
              {/* Left */}
              <div>
                <h2 className='text-base font-semibold text-green-700'>
                  Nursery Bed / Section List
                </h2>
              </div>

              {/* Right */}
              <button
                type='button'
                className='flex cursor-pointer items-center gap-2 rounded-lg border border-green-700 bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800'
              >
                <Plus size={16} />
                Add Bed / Section
              </button>
            </div>

            <div className='overflow-x-auto border border-t-0 border-gray-200'>
              <table className='min-w-full border-collapse'>
                <thead>
                  <tr className='bg-gray-50'>
                    {nurseryManagementData.bedTableHeaders.map((header) => (
                      <th
                        key={header}
                        className='border border-gray-200 px-1 py-1 text-left text-sm font-semibold text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {nurseryManagementData.nurseryBeds.map((bed, index) => (
                    <tr
                      key={bed.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='border border-gray-200 px-4 py-3 text-sm text-center'>
                        {index + 1}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.name}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.code}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.clone}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.area}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.plants}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.plantingDate}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-center'>
                        <span
                          className={`inline-flex rounded-full px-1 py-1 text-xs font-semibold ${bed.statusColor}`}
                        >
                          {bed.status}
                        </span>
                      </td>

                      <td className='border border-gray-200 px-4 py-3'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            className='rounded-md cursor-pointer p-2 text-blue-600 transition hover:bg-blue-100'
                            title='Edit'
                          >
                            <SquarePen size={17} />
                          </button>

                          <button
                            type='button'
                            className='rounded-md cursor-pointer p-2 text-red-600 transition hover:bg-red-100'
                            title='Delete'
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Table Footer */}

              <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-600 md:flex-row'>
                {/* Left */}
                <p>
                  Showing <span className='font-semibold text-gray-900'>1</span>{" "}
                  to{" "}
                  <span className='font-semibold text-gray-900'>
                    {nurseryManagementData.nurseryBeds.length}
                  </span>{" "}
                  of{" "}
                  <span className='font-semibold text-green-700'>
                    {nurseryManagementData.nurseryBeds.length}
                  </span>{" "}
                  entries
                </p>

                {/* Right */}
                <p>
                  Total Beds :
                  <span className='ml-2 font-semibold text-green-700'>
                    {nurseryManagementData.nurseryBeds.length}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Nursery Map */}

          <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}

            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Nursery Map / Layout
              </h2>
            </div>

            {/* Body */}
            <div className='relative max-h-[450px]'>
              <img
                src='/land-lease-map.png'
                alt='Nursery Map Layout'
                className='h-full w-full object-cover'
              />
              {/* Map Legend */}

              <div className='absolute right-20 top-5 w-56 rounded-xl border border-gray-200 bg-white p-5 shadow-lg'>
                <h3 className='mb-4 text-base font-semibold text-gray-800'>
                  Map Legend
                </h3>
                {/* Map Controls */}

                <div className='space-y-3'>
                  {nurseryManagementData.mapLegend.map((item) => (
                    <div key={item.id} className='flex items-center gap-3'>
                      <span
                        className='h-4 w-4 rounded border border-gray-300'
                        style={{ backgroundColor: item.color }}
                      />

                      <span className='text-sm font-medium text-gray-700'>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='absolute right-5 top-20 flex -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg'>
                {/* Zoom In */}
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center border-b border-gray-200 text-gray-700 transition hover:bg-gray-100'
                >
                  <Plus size={18} />
                </button>

                {/* Zoom Out */}
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center border-b border-gray-200 text-gray-700 transition hover:bg-gray-100'
                >
                  <Minus size={18} />
                </button>

                {/* Full Screen */}
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center text-gray-700 transition hover:bg-gray-100'
                >
                  <Expand size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}

      <section className='grid grid-cols-12 gap-6'>
        {/* Stock */}

        <div className='col-span-12 xl:col-span-7'>
          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}

            <div className='flex items-center justify-between border-b border-gray-200 px-6 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Plant Stock / Inventory
              </h2>

              <button
                type='button'
                className='flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white'
              >
                <Plus size={16} />
                Add Stock
              </button>
            </div>

            {/* Table */}

            <div className='overflow-x-auto'>
              <table className='min-w-full border-collapse'>
                {/* Table Header */}

                <thead>
                  <tr className='bg-gray-50'>
                    {nurseryManagementData.stockTableHeaders.map((header) => (
                      <th
                        key={header}
                        className='border-b border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}

                <tbody>
                  {nurseryManagementData.stockInventory.map((item, index) => (
                    <tr
                      key={item.id}
                      className='border-b border-gray-200 transition hover:bg-gray-50'
                    >
                      {/* SL */}
                      <td className='px-4 py-3 text-sm text-gray-700'>
                        {index + 1}
                      </td>

                      {/* Clone / Seed */}
                      <td className='px-4 py-3 text-sm text-gray-700'>
                        {item.clone}
                      </td>

                      {/* Type */}
                      <td className='px-4 py-3 text-sm text-gray-700'>
                        {item.type}
                      </td>

                      {/* Total Plants */}
                      <td className='px-4 py-3 text-sm text-gray-700'>
                        {item.totalPlants}
                      </td>

                      {/* Available Plants */}
                      <td className='px-4 py-3 text-sm text-gray-700'>
                        {item.availablePlants}
                      </td>

                      {/* Reserved Plants */}
                      <td className='px-4 py-3 text-sm text-gray-700'>
                        {item.reservedPlants}
                      </td>

                      {/* Distributed Plants */}
                      <td className='px-4 py-3 text-sm text-gray-700'>
                        {item.distributedPlants}
                      </td>

                      {/* Unit */}
                      <td className='px-4 py-3 text-sm text-gray-700'>
                        {item.unit}
                      </td>

                      {/* Action */}
                      {/* Action */}
                      <td className='px-4 py-3 text-center'>
                        <button
                          type='button'
                          className='rounded-md p-2 text-blue-600 transition duration-200 hover:bg-blue-100 hover:text-blue-700'
                          title='View Details'
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}

            <div></div>
          </div>
        </div>

        {/* Activity */}

        <div className='col-span-12 xl:col-span-5'>
          <div className='flex h-[300px] items-center justify-center rounded-xl border-2 border-dashed border-cyan-300 bg-cyan-50'>
            <h2 className='text-xl font-semibold text-cyan-700'>
              Recent Activities
            </h2>
          </div>
        </div>
      </section>

      {/* Footer */}

      <section className='flex justify-end gap-3 rounded-xl border bg-white p-4'>
        <button className='rounded-lg border cursor-pointer border-gray-300 px-6 py-2'>
          Cancel
        </button>

        <button className='rounded-lg cursor-pointer bg-green-600 px-6 py-2 text-white'>
          Save All Changes
        </button>
      </section>
    </div>
  );
};

export default NurseryManagement;
