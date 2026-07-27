import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";
import { nurseryManagementData } from "../../data/PlantationManagementData/nurseryManagementData";
import { RotateCcw, Save, Plus, SquarePen, Trash2 } from "lucide-react";
const NurseryManagement = () => {
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
            <div className='space-y-5 p-6'>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                {/* Estate */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Estate <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    placeholder='Jamuna Tea Estate'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Division */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Division <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    placeholder='Rangpur Division (DIV-01)'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Nursery Name */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Name
                  </label>

                  <input
                    type='text'
                    placeholder='Central Nursery'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Nursery Code */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Code
                  </label>

                  <input
                    type='text'
                    placeholder='NUR-001'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Nursery Type */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Type
                  </label>

                  <input
                    type='text'
                    placeholder='Clonal'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Supervisor */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Supervisor
                  </label>

                  <input
                    type='text'
                    placeholder='Md. Faruk Hossain'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Location */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Location
                  </label>

                  <input
                    type='text'
                    placeholder='North Zone'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Irrigation */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Irrigation Source
                  </label>

                  <input
                    type='text'
                    placeholder='Tube Well'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Area */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Total Area (Acre)
                  </label>

                  <input
                    type='text'
                    placeholder='5.60'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Status */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Status
                  </label>

                  <input
                    type='text'
                    placeholder='Active'
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />
                </div>
              </div>

              {/* Remarks */}

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Remarks
                </label>

                <textarea
                  rows={4}
                  placeholder='Write remarks...'
                  className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                />
              </div>

              {/* Buttons */}

              <div className='flex justify-end gap-3'>
                <button className='flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium'>
                  <RotateCcw size={16} />
                  Reset
                </button>

                <button className='flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2 text-sm font-medium text-white'>
                  <Save size={16} />
                  Save Nursery
                </button>
              </div>
            </div>
          </div>

          {/* Nursery Summary */}
          <div className='flex h-[220px] items-center justify-center rounded-xl border-2 border-dashed border-yellow-300 bg-yellow-50'>
            <h2 className='text-xl font-semibold text-yellow-700'>
              Nursery Production Summary
            </h2>
          </div>
        </div>

        {/* Right Side */}
        <div className='col-span-12 xl:col-span-7 space-y-6'>
          {/* Bed List */}
          <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='flex items-center justify-between border-b border-gray-200 px-6 py-4'>
              {/* Left */}
              <div>
                <h2 className='text-base font-semibold text-green-700'>
                  Nursery Bed / Section List
                </h2>
              </div>

              {/* Right */}
              <button
                type='button'
                className='flex items-center gap-2 rounded-lg border border-green-700 bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800'
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
                            className='rounded-md p-2 text-blue-600 transition hover:bg-blue-100'
                            title='Edit'
                          >
                            <SquarePen size={17} />
                          </button>

                          <button
                            type='button'
                            className='rounded-md p-2 text-red-600 transition hover:bg-red-100'
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
          <div className='flex h-[460px] items-center justify-center rounded-xl border-2 border-dashed border-purple-300 bg-purple-50'>
            <h2 className='text-xl font-semibold text-purple-700'>
              Nursery Map / Layout
            </h2>
          </div>
        </div>
      </div>

      {/* Bottom Section */}

      <section className='grid grid-cols-12 gap-6'>
        {/* Stock */}

        <div className='col-span-12 xl:col-span-7'>
          <div className='flex h-[300px] items-center justify-center rounded-xl border-2 border-dashed border-red-300 bg-red-50'>
            <h2 className='text-xl font-semibold text-red-700'>
              Plant Stock / Inventory
            </h2>
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
        <button className='rounded-lg border border-gray-300 px-6 py-2'>
          Cancel
        </button>

        <button className='rounded-lg bg-green-600 px-6 py-2 text-white'>
          Save All Changes
        </button>
      </section>
    </div>
  );
};

export default NurseryManagement;
