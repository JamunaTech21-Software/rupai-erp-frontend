import React from "react";
import { useForm } from "react-hook-form";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import { employeeManagementData } from "../../data/HrWorkforceData/addNewEmployeeData";
import {
  MapPin,
  WalletCards,
  Files,
  CloudUpload,
  Settings2,
  ScanFace,
  Upload,
  Camera,
  Fingerprint,
  PhoneCall,
  UserRoundCheck,
  RotateCcw,
  Save,
  CheckCircle,
} from "lucide-react";

const AddNewEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // =========================
  // FORM SUBMIT
  // =========================
  const onSubmit = () => {
  };

  return (
    <div>
      <HrWorkforceTabs />

      {/* ========================= */}
      {/* MAIN FORM */}
      {/* ========================= */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-12 gap-2'>
          {/* ========================================= */}
          {/* LEFT MAIN CONTENT - 9 COLUMNS */}
          {/* ========================================= */}

          <div className='col-span-12 xl:col-span-9 space-y-2'>
            {/* ================= ROW 1 ================= */}

            <div className='grid grid-cols-12 gap-2'>
              {/* ================================= */}
              {/* 1. BASIC INFORMATION */}
              {/* ================================= */}

              <div className='col-span-12 lg:col-span-6  border border-gray-200 rounded-xl p-2 bg-white '>
                <h3 className='font-semibold text-green-700 mb-3'>
                  1. Basic Information
                </h3>

                {/* BASIC INFORMATION FIELDS */}

                <div className='grid grid-cols-12 gap-2'>
                  {employeeManagementData.basicInformationFields.map(
                    (field) => {
                      const options =
                        employeeManagementData[field.optionsKey] || [];

                      return (
                        <div
                          key={field.name}
                          className='col-span-12 md:col-span-4'
                        >
                          {/* LABEL */}

                          <label className='block text-xs font-medium text-gray-700 mb-1'>
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
                              placeholder={field.placeholder}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                            />
                          )}

                          {/* SELECT */}

                          {field.type === "select" && (
                            <select
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                            >
                              <option value=''>Select {field.label}</option>

                              {options.map((option) => (
                                <option key={option.id} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* ERROR */}

                          {errors?.[field.name] && (
                            <p className='text-red-500 text-[10px] mt-1'>
                              {errors[field.name]?.message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* ================================= */}
              {/* 2. EMPLOYMENT INFORMATION */}
              {/* ================================= */}

              <div className='col-span-12 lg:col-span-6 border border-gray-200 rounded-xl  bg-white p-2'>
                {/* HEADER */}
                <h3 className='font-semibold text-green-700 mb-3'>
                  2. Employment Information
                </h3>

                {/* FORM FIELDS */}
                <div className='grid grid-cols-12 gap-2'>
                  {employeeManagementData.employmentInformationFields.map(
                    (field) => {
                      const options =
                        employeeManagementData[field.optionsKey] || [];

                      return (
                        <div
                          key={field.name}
                          className='col-span-12 md:col-span-4'
                        >
                          {/* LABEL */}
                          <label className='block text-xs font-medium text-gray-700 mb-1'>
                            {field.label}

                            {field.required && (
                              <span className='text-red-500'> *</span>
                            )}
                          </label>

                          {/* TEXT / NUMBER / DATE */}
                          {(field.type === "text" ||
                            field.type === "number" ||
                            field.type === "date") && (
                            <input
                              type={field.type}
                              defaultValue={field.defaultValue}
                              placeholder={field.placeholder}
                              disabled={field.disabled}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                            />
                          )}

                          {/* SELECT */}
                          {field.type === "select" && (
                            <select
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                            >
                              <option value=''>Select {field.label}</option>

                              {options.map((option) => (
                                <option key={option.id} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* ERROR */}
                          {errors?.[field.name] && (
                            <p className='text-red-500 text-[10px] mt-1'>
                              {errors[field.name]?.message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            {/* ================= ROW 2 ================= */}

            <div className='grid grid-cols-12 gap-2'>
              {/* ================================= */}
              {/* 3. CONTACT & ADDRESS INFORMATION */}
              {/* ================================= */}

              <div className='col-span-12 lg:col-span-6 border border-gray-200 rounded-xl p-2.5 bg-white'>
                {/* ================= HEADER ================= */}
                <div className='flex items-center gap-2 mb-2.5'>
                  <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                    <MapPin size={13} />
                  </div>

                  <h3 className='font-semibold text-green-700 text-[12px]'>
                    3. Contact & Address Information
                  </h3>
                </div>

                {/* ================= FORM FIELDS ================= */}
                <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                  {employeeManagementData.contactInformationFields
                    .filter((field) => field.type !== "checkbox")
                    .map((field) => {
                      const options =
                        employeeManagementData[field.optionsKey] || [];

                      /* -----------------------------------------
                            FIELD WIDTH
                        ----------------------------------------- */
                      const fieldClass =
                        field.type === "textarea"
                          ? "col-span-12 md:col-span-6"
                          : "col-span-12 md:col-span-4";

                      return (
                        <div key={field.name} className={fieldClass}>
                          {/* LABEL */}

                          <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-0.5'>*</span>
                            )}
                          </label>

                          {/* ================= INPUT ================= */}
                          {(field.type === "text" ||
                            field.type === "email" ||
                            field.type === "date" ||
                            field.type === "number") && (
                            <input
                              type={field.type}
                              defaultValue={field.defaultValue}
                              placeholder={field.placeholder}
                              disabled={field.disabled}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='
                              w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                            />
                          )}

                          {/* ================= SELECT ================= */}
                          {field.type === "select" && (
                            <select
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className=' w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100
                          '
                            >
                              <option value=''>Select {field.label}</option>

                              {options.map((option) => (
                                <option key={option.id} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* ================= TEXTAREA ================= */}
                          {field.type === "textarea" && (
                            <textarea
                              rows={2}
                              placeholder={field.placeholder}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full h-[46px] border border-gray-300 rounded-md px-2.5 py-1.5 text-[10px] text-gray-700 bg-white resize-none outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100'
                            />
                          )}

                          {/* ================= ERROR ================= */}
                          {errors?.[field.name] && (
                            <p className='text-red-500 text-[8px] mt-0.5'>
                              {errors[field.name]?.message}
                            </p>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* =====================================================
                  4. SALARY & PAYROLL INFORMATION
              ===================================================== */}

              <div className='col-span-12 lg:col-span-6 border border-gray-200 rounded-xl p-2.5 bg-white'>
                {/* ================= HEADER ================= */}
                <div className='flex items-center gap-2 mb-2.5'>
                  <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                    <WalletCards size={13} />
                  </div>

                  <h3 className='font-semibold text-green-700 text-[12px]'>
                    4. Salary & Payroll Information
                  </h3>
                </div>

                {/* ================= FORM FIELDS ================= */}
                <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                  {employeeManagementData.salaryPayrollFields.map((field) => {
                    const options =
                      employeeManagementData[field.optionsKey] || [];

                    return (
                      <div
                        key={field.name}
                        className={
                          field.type === "textarea"
                            ? "col-span-12"
                            : "col-span-12 md:col-span-4"
                        }
                      >
                        {/* ================= LABEL ================= */}
                        <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                          {field.label}

                          {field.required && (
                            <span className='text-red-500 ml-0.5'>*</span>
                          )}
                        </label>

                        {/* ================= INPUT ================= */}
                        {(field.type === "text" || field.type === "number") && (
                          <input
                            type={field.type}
                            defaultValue={field.defaultValue}
                            placeholder={field.placeholder}
                            disabled={field.disabled}
                            min={field.min}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                          />
                        )}

                        {/* ================= SELECT ================= */}
                        {field.type === "select" && (
                          <select
                            defaultValue={field.defaultValue || ""}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                          >
                            <option value=''>Select {field.label}</option>

                            {options.map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* ================= TEXTAREA ================= */}
                        {field.type === "textarea" && (
                          <textarea
                            rows={2}
                            placeholder={field.placeholder}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[46px] min-h-[46px] border border-gray-300 rounded-md px-2.5 py-1.5 text-[10px] text-gray-700 bg-white resize-none outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100'
                          />
                        )}

                        {/* ================= ERROR ================= */}
                        {errors?.[field.name] && (
                          <p className='text-red-500 text-[8px] mt-0.5'>
                            {errors[field.name]?.message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ================= ROW 3 ================= */}

            <div className='grid grid-cols-12 gap-2'>
              {/* =====================================================
                  5. DOCUMENTS INFORMATION
              ===================================================== */}

              <div className='col-span-12 lg:col-span-8 border border-gray-200 rounded-xl p-2.5 bg-white'>
                {/* ================= HEADER ================= */}
                <div className='flex items-center gap-2 mb-2'>
                  <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                    <Files size={13} />
                  </div>

                  <h3 className='font-semibold text-green-700 text-[12px]'>
                    5. Documents Information
                  </h3>
                </div>

                {/* ================= SUB TITLE ================= */}
                <p className='text-[9px] font-medium text-gray-700 mb-2'>
                  Upload Documents (JPG / PNG / PDF)
                </p>

                {/* ================= DOCUMENT CARDS ================= */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2'>
                  {employeeManagementData.documentFields.map((field) => (
                    <div
                      key={field.name}
                      className='border border-gray-200 rounded-md h-[76px] flex flex-col items-center justify-center bg-white hover:border-green-300 transition-colors'
                    >
                      {/* DOCUMENT LABEL */}
                      <p className='text-[8px] font-medium text-gray-700 text-center leading-tight px-1 min-h-[22px] flex items-center justify-center'>
                        {field.label}
                      </p>

                      {/* FILE INPUT */}
                      <label className='flex flex-col items-center justify-center cursor-pointer mt-1'>
                        <input
                          type='file'
                          accept={field.accept}
                          {...register(field.name)}
                          className='hidden'
                        />

                        {/* UPLOAD ICON */}
                        <div className='flex items-center justify-center w-6 h-6 text-gray-500 hover:text-green-600 transition-colors'>
                          <CloudUpload size={17} strokeWidth={1.8} />
                        </div>

                        {/* UPLOAD TEXT */}
                        <span className='text-[8px] text-gray-600'>Upload</span>
                      </label>
                    </div>
                  ))}
                </div>

                {/* ================= NOTE ================= */}
                <p className='text-[8px] text-gray-500 mt-2'>
                  Note: Maximum file size 2MB for each file.
                </p>
              </div>

              {/* =====================================================
                  6. SYSTEM INFORMATION
              ===================================================== */}

              <div className='col-span-12 lg:col-span-4 border border-gray-200 rounded-xl p-2.5 bg-white'>
                {/* ================= HEADER ================= */}
                <div className='flex items-center gap-2 mb-2.5'>
                  <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                    <Settings2 size={13} />
                  </div>

                  <h3 className='font-semibold text-green-700 text-[12px]'>
                    6. System Information
                  </h3>
                </div>

                {/* ================= FORM FIELDS ================= */}
                <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                  {employeeManagementData.systemInformationFields.map(
                    (field) => (
                      <div
                        key={field.name}
                        className='col-span-12 md:col-span-6'
                      >
                        {/* ================= LABEL ================= */}
                        <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                          {field.label}
                        </label>

                        {/* ================= INPUT ================= */}
                        <input
                          type={field.type}
                          defaultValue={field.defaultValue}
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          {...register(field.name)}
                          className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-600 bg-gray-100 outline-none disabled:bg-gray-100 disabled:text-gray-500'
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* RIGHT SIDEBAR - 3 COLUMNS */}
          {/* ========================================= */}

          <div className='col-span-12 xl:col-span-3 space-y-2'>
            {/* =====================================================
                7. PHOTO & BIOMETRICS
            ===================================================== */}

            <div className='col-span-12 lg:col-span-5 border border-gray-200 rounded-xl p-2.5 bg-white'>
              {/* ================= HEADER ================= */}
              <div className='flex items-center gap-2 mb-2.5'>
                <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                  <ScanFace size={13} />
                </div>

                <h3 className='font-semibold text-green-700 text-[12px]'>
                  Photo & Biometrics
                </h3>
              </div>

              {/* ================= PHOTO & BIOMETRIC AREA ================= */}
              <div className='grid grid-cols-12 gap-2.5'>
                {/* =================================================
                    EMPLOYEE PHOTO
                ================================================= */}
                <div className='col-span-12 md:col-span-5 flex flex-col items-center'>
                  {/* PHOTO */}
                  <div className='w-[104px] h-[118px] border border-gray-300 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center'>
                    <img
                      src='https://randomuser.me/api/portraits/men/32.jpg'
                      alt='Employee'
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* CHANGE PHOTO */}
                  <label className='mt-2 w-[104px] h-[30px] border border-gray-300 rounded-md flex items-center justify-center gap-1.5 cursor-pointer bg-white hover:border-green-500 hover:text-green-600 transition-colors'>
                    <input
                      type='file'
                      accept='.jpg,.jpeg,.png'
                      {...register("employeePhoto")}
                      className='hidden'
                    />

                    <Upload size={12} />

                    <span className='text-[9px] font-medium'>Change Photo</span>
                  </label>
                </div>

                {/* =================================================
                  BIOMETRIC ACTIONS
              ================================================= */}
                <div className='col-span-12 md:col-span-7 flex flex-col justify-between'>
                  {/* EMPLOYEE FACE */}
                  <div>
                    <label className='block text-[9px] font-medium text-gray-700 mb-1'>
                      Employee Face (For Attendance)
                    </label>

                    <button
                      type='button'
                      className='w-full h-[30px] border border-gray-300 rounded-md flex items-center justify-center gap-1.5 text-[9px] text-gray-700 bg-white hover:border-green-500 hover:text-green-600 transition-colors'
                    >
                      <Camera size={12} />
                      Capture Face
                    </button>
                  </div>

                  {/* RIGHT THUMB */}
                  <div className='mt-2'>
                    <label className='block text-[9px] font-medium text-gray-700 mb-1'>
                      Right Thumb Impression
                    </label>

                    <button
                      type='button'
                      className='w-full h-[30px] border border-gray-300 rounded-md flex items-center justify-center gap-1.5 text-[9px] text-gray-700 bg-white hover:border-green-500 hover:text-green-600 transition-colors'
                    >
                      <Fingerprint size={12} />
                      Capture
                    </button>
                  </div>

                  {/* LEFT THUMB */}
                  <div className='mt-2'>
                    <label className='block text-[9px] font-medium text-gray-700 mb-1'>
                      Left Thumb Impression
                    </label>

                    <button
                      type='button'
                      className='w-full h-[30px] border border-gray-300 rounded-md flex items-center justify-center gap-1.5 text-[9px] text-gray-700 bg-white hover:border-green-500 hover:text-green-600 transition-colors'
                    >
                      <Fingerprint size={12} />
                      Capture
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                8. EMERGENCY CONTACT
            ===================================================== */}

            <div className='col-span-12 lg:col-span-5 border border-gray-200 rounded-xl p-2.5 bg-white'>
              {/* ================= HEADER ================= */}
              <div className='flex items-center gap-2 mb-2.5'>
                <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                  <PhoneCall size={13} />
                </div>

                <h3 className='font-semibold text-green-700 text-[12px]'>
                  Emergency Contact
                </h3>
              </div>

              {/* ================= FORM FIELDS ================= */}
              <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                {employeeManagementData.emergencyContactFields.map((field) => {
                  const options =
                    employeeManagementData[field.optionsKey] || [];

                  return (
                    <div
                      key={field.name}
                      className={
                        field.type === "textarea"
                          ? "col-span-12"
                          : "col-span-12 md:col-span-6"
                      }
                    >
                      {/* ================= LABEL ================= */}
                      <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500 ml-0.5'>*</span>
                        )}
                      </label>

                      {/* ================= INPUT ================= */}
                      {(field.type === "text" ||
                        field.type === "email" ||
                        field.type === "date" ||
                        field.type === "number") && (
                        <input
                          type={field.type}
                          defaultValue={field.defaultValue}
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                        />
                      )}

                      {/* ================= SELECT ================= */}
                      {field.type === "select" && (
                        <select
                          defaultValue={field.defaultValue || ""}
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                        >
                          <option value=''>Select {field.label}</option>

                          {options.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* ================= TEXTAREA ================= */}
                      {field.type === "textarea" && (
                        <textarea
                          rows={2}
                          placeholder={field.placeholder}
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          className='w-full h-[46px] min-h-[46px] border border-gray-300 rounded-md px-2.5 py-1.5 text-[10px] text-gray-700 bg-white resize-none outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100'
                        />
                      )}

                      {/* ================= ERROR ================= */}
                      {errors?.[field.name] && (
                        <p className='text-red-500 text-[8px] mt-0.5'>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =====================================================
              9. NOMINEE INFORMATION
          ===================================================== */}

            <div className='col-span-12 lg:col-span-5 border border-gray-200 rounded-xl p-2.5 bg-white'>
              {/* ================= HEADER ================= */}
              <div className='flex items-center gap-2 mb-2.5'>
                <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                  <UserRoundCheck size={13} />
                </div>

                <h3 className='font-semibold text-green-700 text-[12px]'>
                  Nominee Information{" "}
                  <span className='text-gray-600'>(For PF/Gratuity)</span>
                </h3>
              </div>

              {/* ================= FORM FIELDS ================= */}
              <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                {employeeManagementData.nomineeInformationFields.map(
                  (field) => {
                    const options =
                      employeeManagementData[field.optionsKey] || [];

                    return (
                      <div
                        key={field.name}
                        className={
                          field.type === "textarea"
                            ? "col-span-12"
                            : "col-span-12 md:col-span-6"
                        }
                      >
                        {/* ================= LABEL ================= */}
                        <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                          {field.label}

                          {field.required && (
                            <span className='text-red-500 ml-0.5'>*</span>
                          )}
                        </label>

                        {/* ================= INPUT ================= */}
                        {(field.type === "text" ||
                          field.type === "email" ||
                          field.type === "date" ||
                          field.type === "number") && (
                          <input
                            type={field.type}
                            defaultValue={field.defaultValue}
                            placeholder={field.placeholder}
                            disabled={field.disabled}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                          />
                        )}

                        {/* ================= SELECT ================= */}
                        {field.type === "select" && (
                          <select
                            defaultValue={field.defaultValue || ""}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                          >
                            <option value=''>Select {field.label}</option>

                            {options.map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* ================= TEXTAREA ================= */}
                        {field.type === "textarea" && (
                          <textarea
                            rows={2}
                            placeholder={field.placeholder}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[46px] min-h-[46px] border border-gray-300 rounded-md px-2.5 py-1.5 text-[10px] text-gray-700 bg-white resize-none outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100'
                          />
                        )}

                        {/* ================= ERROR ================= */}
                        {errors?.[field.name] && (
                          <p className='text-red-500 text-[8px] mt-0.5'>
                            {errors[field.name]?.message}
                          </p>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* FORM ACTION BUTTONS */}
        {/* ========================================= */}

        <div className='flex justify-end gap-2 mt-3'>
          {/* RESET */}
          <button
            type='button'
            onClick={() => reset()}
            className='flex items-center justify-center gap-1.5 border border-gray-300 rounded-md px-5 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors'
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          {/* SAVE AS DRAFT */}
          <button
            type='button'
            className='flex items-center justify-center gap-1.5 border border-gray-300 rounded-md px-5 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors'
          >
            <Save size={13} />
            <span>Save as Draft</span>
          </button>

          {/* SAVE & SUBMIT */}
          <button
            type='submit'
            className='flex items-center justify-center gap-1.5 bg-green-700 text-white rounded-md px-5 py-2 text-xs hover:bg-green-800 transition-colors'
          >
            <CheckCircle size={13} />
            <span>Save & Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewEmployee;
