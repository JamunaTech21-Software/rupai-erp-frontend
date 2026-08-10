import React from "react";
import { useForm } from "react-hook-form";
import { contractorManagementData } from "../../data/HrWorkforceData/addNewContractorData";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";

const AddNewContractor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: contractorManagementData.contractorForm.basicInformation,
  });

  const onSubmit = (data) => {
    console.log("FORM DATA:", data);
  };

  return (
    <div className='p-2 space-y-4'>
      {/* Tabs */}
      <HrWorkforceTabs />

      {/* FORM START */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ================= ROW 1 ================= */}
        <div className='grid grid-cols-12 gap-2'>
          {/* ===== LEFT SIDE (2 CARD SAME ROW) ===== */}
          <div className='col-span-12 xl:col-span-8 grid grid-cols-12 gap-2'>
            {/* BASIC INFO */}
            <div className='col-span-12 lg:col-span-6 border rounded-xl p-2'>
              <h3 className='font-semibold mb-4 text-green-700 flex items-center gap-2'>
                1. Basic Information
              </h3>

              <div className='grid grid-cols-12 gap-3'>
                {/* Contractor ID */}
                <div className='col-span-12 md:col-span-4'>
                  <label className='text-xs font-medium'>
                    Contractor ID <span className='text-red-500'>*</span>
                  </label>
                  <input
                    value='Auto Generate'
                    disabled
                    className='w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-sm'
                  />
                </div>

                {/* Contractor Type */}
                <div className='col-span-12 md:col-span-4'>
                  <label className='text-xs font-medium'>
                    Contractor Type <span className='text-red-500'>*</span>
                  </label>
                  <select
                    {...register("contractorType", { required: "Required" })}
                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500'
                  >
                    <option value=''>Select Type</option>
                    {contractorManagementData.contractorTypeOptions.map(
                      (item) => (
                        <option key={item.id} value={item.value}>
                          {item.label}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* Trade Category */}
                <div className='col-span-12 md:col-span-4'>
                  <label className='text-xs font-medium'>
                    Trade / Work Category{" "}
                    <span className='text-red-500'>*</span>
                  </label>
                  <select
                    {...register("tradeCategory", { required: "Required" })}
                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500'
                  >
                    <option value=''>Select Category</option>
                    {contractorManagementData.tradeCategoryOptions.map(
                      (item) => (
                        <option key={item.id} value={item.value}>
                          {item.label}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* Contractor Name */}
                <div className='col-span-12 md:col-span-8'>
                  <label className='text-xs font-medium'>
                    Contractor Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    {...register("contractorName", { required: "Required" })}
                    placeholder='Enter Contractor / Company Name'
                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500'
                  />
                </div>

                {/* Short Name */}
                <div className='col-span-12 md:col-span-4'>
                  <label className='text-xs font-medium'>Short Name</label>
                  <input
                    {...register("shortName")}
                    placeholder='Enter Short Name'
                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
                  />
                </div>

                {/* Legal Status */}
                <div className='col-span-12 md:col-span-4'>
                  <label className='text-xs font-medium'>Legal Status</label>
                  <select
                    {...register("legalStatus")}
                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
                  >
                    <option value=''>Select Legal Status</option>
                    {contractorManagementData.legalStatusOptions.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Registration Type */}
                <div className='col-span-12 md:col-span-4'>
                  <label className='text-xs font-medium'>
                    Registration Type
                  </label>
                  <input
                    {...register("registrationType")}
                    placeholder='Select Registration Type'
                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
                  />
                </div>

                {/* Contractor Since */}
                <div className='col-span-12 md:col-span-4'>
                  <label className='text-xs font-medium'>
                    Contractor Since
                  </label>
                  <input
                    type='date'
                    {...register("contractorSince")}
                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
                  />
                </div>

                {/* Description */}
                <div className='col-span-12'>
                  <label className='text-xs font-medium'>
                    Description / Nature of Work
                  </label>
                  <textarea
                    {...register("description")}
                    rows='4'
                    placeholder='Enter description of work / services'
                    className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none'
                  ></textarea>
                </div>
              </div>
            </div>

            {/* CONTACT INFO */}
            <div className='col-span-12 lg:col-span-6 border rounded-xl p-4'>
              <h3 className='font-semibold mb-4 text-green-700'>
                2. Contact & Address Information
              </h3>

              {/* 👉 contact form */}
            </div>
          </div>

          {/* ===== RIGHT SIDE ===== */}
          <div className='col-span-12 xl:col-span-4 space-y-4'>
            {/* IMAGE */}
            <div className='border rounded-xl p-4'>
              <h3 className='font-semibold mb-3 text-green-700'>
                3. Contractor Image & Logo
              </h3>

              <div className='grid grid-cols-2 gap-3'>
                <div className='h-32 border rounded-md flex items-center justify-center'>
                  Photo
                </div>
                <div className='h-32 border rounded-md flex items-center justify-center'>
                  Logo
                </div>
              </div>
            </div>

            {/* CONTACT PERSON */}
            <div className='border rounded-xl p-4'>
              <h3 className='font-semibold mb-3 text-green-700'>
                4. Contact Person / Proprietor Information
              </h3>

              <div className='space-y-2'>
                <input
                  placeholder='Name'
                  className='w-full border border-gray-300 rounded-md px-3 py-2'
                />
                <input
                  placeholder='Mobile'
                  className='w-full border border-gray-300 rounded-md px-3 py-2'
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= ROW 2 ================= */}
        <div className='grid grid-cols-12 gap-4 mt-4'>
          <div className='col-span-12 xl:col-span-4 border rounded-xl p-4'>
            <h3 className='font-semibold'>5. Business Info</h3>
          </div>

          <div className='col-span-12 xl:col-span-4 border rounded-xl p-4'>
            <h3 className='font-semibold'>6. Contract Info</h3>
          </div>

          <div className='col-span-12 xl:col-span-4 border rounded-xl p-4'>
            <h3 className='font-semibold'>7. Banking Info</h3>
          </div>
        </div>

        {/* ================= ROW 3 ================= */}
        <div className='grid grid-cols-12 gap-4 mt-4'>
          <div className='col-span-12 xl:col-span-4 border rounded-xl p-4'>
            <h3 className='font-semibold'>8. Documents</h3>
          </div>

          <div className='col-span-12 xl:col-span-4 border rounded-xl p-4'>
            <h3 className='font-semibold'>9. Additional Info</h3>
          </div>

          <div className='col-span-12 xl:col-span-4 border rounded-xl p-4'>
            <h3 className='font-semibold'>10. Emergency</h3>
          </div>
        </div>

        {/* ================= SUBMIT ================= */}
        <div className='flex justify-end mt-4'>
          <button type='submit' className='btn btn-success'>
            Save & Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewContractor;
