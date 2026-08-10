import React from "react";
import { useForm } from "react-hook-form";
import { contractorManagementData } from "../../data/HrWorkforceData/addNewContractorData";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";

const AddNewContractor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
                {contractorManagementData.basicInformationFields.map(
                  (field, index) => (
                    <div
                      key={index}
                      className={`col-span-12 ${field.colSpan || "md:col-span-4"}`}
                    >
                      <label className='text-xs font-medium'>
                        {field.label}
                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      {/* TEXT / DATE */}
                      {(field.type === "text" || field.type === "date") && (
                        <input
                          type={field.type}
                          defaultValue={field.defaultValue}
                          disabled={field.disabled}
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          placeholder={field.placeholder}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
                        />
                      )}

                      {/* SELECT */}
                      {field.type === "select" && (
                        <select
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
                        >
                          <option value=''>Select {field.label}</option>
                          {field.options?.map((opt, i) => (
                            <option key={i} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* TEXTAREA */}
                      {field.type === "textarea" && (
                        <textarea
                          {...register(field.name)}
                          rows='4'
                          className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none'
                        />
                      )}

                      {/* ERROR */}
                      {errors?.[field.name] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ),
                )}
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
