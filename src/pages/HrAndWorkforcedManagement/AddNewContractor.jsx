import React from "react";
import { useForm } from "react-hook-form";
import { contractorManagementData } from "../../data/HrWorkforceData/addNewContractorData";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";

import { Upload, UserRound, Sprout } from "lucide-react";

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
              {/* ================= HEADER ================= */}
              <h3 className='font-semibold mb-4 text-green-700'>
                2. Contact & Address Information
              </h3>

              {/* ================= CONTACT INFORMATION ================= */}
              <div className='grid grid-cols-12 gap-3'>
                {contractorManagementData.contactInformationFields
                  .slice(0, 3)
                  .map((field, index) => (
                    <div
                      key={index}
                      className={`col-span-12 ${field.colSpan || "md:col-span-4"}`}
                    >
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        {field.label}
                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      />

                      {errors?.[field.name] && (
                        <p className='text-red-500 text-[10px] mt-1'>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ))}
              </div>

              {/* ================= PRESENT ADDRESS ================= */}
              <div className='mt-4'>
                <div className='grid grid-cols-12 gap-3'>
                  {/* ADDRESS */}
                  <div className='col-span-12 md:col-span-6'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Address
                      <span className='text-red-500'> *</span>
                    </label>

                    <textarea
                      rows='2'
                      placeholder='Enter Present Address'
                      {...register("presentAddress", {
                        required: "Required",
                      })}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs resize-none outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    />

                    {errors?.presentAddress && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors.presentAddress.message}
                      </p>
                    )}
                  </div>

                  {/* DISTRICT */}
                  <div className='col-span-12 md:col-span-3'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      District
                      <span className='text-red-500'> *</span>
                    </label>

                    <select
                      {...register("presentDistrict", {
                        required: "Required",
                      })}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    >
                      <option value=''>Select District</option>

                      {contractorManagementData.districtOptions.map(
                        (option) => (
                          <option key={option.id} value={option.value}>
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>

                    {errors?.presentDistrict && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors.presentDistrict.message}
                      </p>
                    )}
                  </div>

                  {/* UPAZILA */}
                  <div className='col-span-12 md:col-span-3'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Upazila
                      <span className='text-red-500'> *</span>
                    </label>

                    <select
                      {...register("presentUpazila", {
                        required: "Required",
                      })}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    >
                      <option value=''>Select Upazila</option>

                      {contractorManagementData.contactInformationFields
                        .find((field) => field.name === "presentUpazila")
                        ?.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>

                    {errors?.presentUpazila && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors.presentUpazila.message}
                      </p>
                    )}
                  </div>

                  {/* POSTAL CODE */}
                  <div className='col-span-12 md:col-span-4'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Postal Code
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Postal Code'
                      {...register("presentPostalCode")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    />
                  </div>
                </div>
              </div>

              {/* ================= SAME ADDRESS ================= */}
              <div className='flex items-center gap-2 mt-3'>
                <input
                  type='checkbox'
                  {...register("sameAsPresent")}
                  className='w-3.5 h-3.5 accent-green-600'
                />

                <label className='text-xs text-gray-600'>
                  Same as Present Address
                </label>
              </div>

              {/* ================= PERMANENT ADDRESS ================= */}
              <div className='mt-4'>
                <p className='text-xs font-semibold text-gray-700 mb-2'>
                  Permanent Address
                </p>

                <div className='grid grid-cols-12 gap-3'>
                  {/* ADDRESS */}
                  <div className='col-span-12 md:col-span-6'>
                    <textarea
                      rows='2'
                      placeholder='Enter Permanent Address'
                      {...register("permanentAddress")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs resize-none outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    />
                  </div>

                  {/* DISTRICT */}
                  <div className='col-span-12 md:col-span-3'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      District
                    </label>

                    <select
                      {...register("permanentDistrict")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    >
                      <option value=''>Select District</option>

                      {contractorManagementData.districtOptions.map(
                        (option) => (
                          <option key={option.id} value={option.value}>
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {/* UPAZILA */}
                  <div className='col-span-12 md:col-span-3'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Upazila
                    </label>

                    <select
                      {...register("permanentUpazila")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    >
                      <option value=''>Select Upazila</option>

                      {contractorManagementData.contactInformationFields
                        .find((field) => field.name === "permanentUpazila")
                        ?.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* POSTAL CODE */}
                  <div className='col-span-12 md:col-span-4'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Postal Code
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Postal Code'
                      {...register("permanentPostalCode")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT SIDE ===== */}
          <div className='col-span-12 xl:col-span-4 space-y-4'>
            {/* IMAGE */}
            {/* ================= IMAGE & LOGO ================= */}
            <div className='border rounded-xl p-4'>
              {/* HEADER */}
              <h3 className='font-semibold mb-4 text-green-700 flex items-center gap-2'>
                3. Contractor Image & Logo
              </h3>

              {/* IMAGE / LOGO GRID */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {contractorManagementData.contractorImageFields.map(
                  (field, index) => (
                    <div key={field.name} className='min-w-0'>
                      {/* LABEL */}
                      <label className='block text-xs font-medium text-gray-700 text-center mb-2'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      {/* UPLOAD BOX */}
                      <div className='border border-gray-300 rounded-lg p-3'>
                        {/* PREVIEW AREA */}
                        <div className='h-24 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center'>
                          {field.name === "contractorPhoto" ? (
                            <UserRound
                              size={42}
                              strokeWidth={1.5}
                              className='text-green-600'
                            />
                          ) : (
                            <Sprout
                              size={48}
                              strokeWidth={1.5}
                              className='text-green-600'
                            />
                          )}
                        </div>

                        {/* FILE INPUT */}
                        <label className='mt-3 flex items-center justify-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition'>
                          <Upload size={14} />

                          {field.buttonText}

                          <input
                            type='file'
                            accept={field.accept}
                            {...register(field.name)}
                            className='hidden'
                          />
                        </label>

                        {/* NOTE */}
                        <p className='text-[10px] text-gray-500 text-center mt-2'>
                          {field.note}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* CONTACT PERSON */}
            {/* ================= CONTACT PERSON ================= */}
            <div className='border rounded-xl p-4'>
              {/* HEADER */}
              <h3 className='font-semibold mb-4 text-green-700'>
                4. Contact Person / Proprietor Information
              </h3>

              {/* FORM FIELDS */}
              <div className='grid grid-cols-12 gap-3'>
                {contractorManagementData.contactPersonInformationFields.map(
                  (field) => (
                    <div
                      key={field.name}
                      className={`col-span-12 ${
                        field.colSpan || "md:col-span-6"
                      }`}
                    >
                      {/* LABEL */}
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      {/* INPUT */}
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      />

                      {/* ERROR */}
                      {errors?.[field.name] && (
                        <p className='text-red-500 text-[10px] mt-1'>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ),
                )}
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
