import React from "react";
import { useForm } from "react-hook-form";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import { addNewWorkerData } from "../../data/HrWorkforceData/addNewWorkerData";

import {
  UserRound,
  CreditCard,
  FileText,
  Upload,
  Info,
  RotateCcw,
  Save,
  CheckCircle,
} from "lucide-react";
const AddNewWorker = () => {
  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: addNewWorkerData.initialData,
  });

  // =========================================================
  // SUBMIT
  // =========================================================

  const onSubmit = (data) => {
    console.log("Worker Form Data:", data);
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    reset(addNewWorkerData.initialData);
  };

  return (
    <div>
      {/* =====================================================
          HR WORKFORCE TABS
      ===================================================== */}

      <HrWorkforceTabs />

      {/* =====================================================
          MAIN FORM
      ===================================================== */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className='grid grid-cols-1 xl:grid-cols-12 gap-2'>
            {/* =================================================
                LEFT SIDE - 6 COLUMNS
            ================================================= */}

            <div className='xl:col-span-6 space-y-3'>
              {/* ===============================================
                  1. BASIC INFORMATION
              =============================================== */}

              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Header */}
                <div className='flex items-center gap-2 mb-6'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.basicInformation.title}
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6'>
                  {addNewWorkerData.sections.basicInformation.fields.map(
                    (field) => {
                      const options = field.optionsKey
                        ? addNewWorkerData.dropdownOptions[field.optionsKey] ||
                          []
                        : field.options || [];

                      return (
                        <div key={field.name}>
                          {/* Label */}
                          <label
                            htmlFor={field.name}
                            className='block text-xs font-medium text-gray-700 mb-1'
                          >
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-1'>*</span>
                            )}
                          </label>

                          {/* Text / Tel / Email / Number */}
                          {["text", "tel", "email", "number"].includes(
                            field.type,
                          ) && (
                            <input
                              id={field.name}
                              type={field.type}
                              placeholder={field.placeholder || ""}
                              disabled={field.disabled || false}
                              min={field.min}
                              step={field.step}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* Date */}
                          {field.type === "date" && (
                            <input
                              id={field.name}
                              type='date'
                              disabled={field.disabled || false}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* Select */}
                          {field.type === "select" && (
                            <select
                              id={field.name}
                              disabled={field.disabled || false}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            >
                              <option value=''>
                                {field.placeholder || "Select"}
                              </option>

                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* Error */}
                          {errors[field.name] && (
                            <p className='mt-1 text-[11px] text-red-500'>
                              {errors[field.name].message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* =================================================
                      2. EMPLOYMENT INFORMATION
                  ================================================= */}

              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-5'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.employmentInformation.title}
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6'>
                  {addNewWorkerData.sections.employmentInformation.fields.map(
                    (field) => {
                      const options = field.optionsKey
                        ? addNewWorkerData.dropdownOptions[field.optionsKey] ||
                          []
                        : field.options || [];

                      return (
                        <div key={field.name}>
                          {/* Label */}
                          <label
                            htmlFor={field.name}
                            className='block text-xs font-medium text-gray-700 mb-3'
                          >
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-1'>*</span>
                            )}
                          </label>

                          {/* =================================================
                                TEXT / TEL / EMAIL / NUMBER
                            ================================================= */}

                          {["text", "tel", "email", "number"].includes(
                            field.type,
                          ) && (
                            <input
                              id={field.name}
                              type={field.type}
                              placeholder={field.placeholder || ""}
                              disabled={field.disabled || false}
                              min={field.min}
                              max={field.max}
                              step={field.step}
                              defaultValue={field.defaultValue ?? ""}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* =================================================
                                    DATE
                                ================================================= */}

                          {field.type === "date" && (
                            <input
                              id={field.name}
                              type='date'
                              disabled={field.disabled || false}
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* =================================================
                                  SELECT
                              ================================================= */}

                          {field.type === "select" && (
                            <select
                              id={field.name}
                              disabled={field.disabled || false}
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            >
                              <option value=''>
                                {field.placeholder || "Select"}
                              </option>

                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* =================================================
                                VALIDATION ERROR
                            ================================================= */}

                          {errors[field.name] && (
                            <p className='mt-1 text-[11px] text-red-500'>
                              {errors[field.name].message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE - 6 COLUMNS
            ================================================= */}

            <div className='xl:col-span-6 space-y-3'>
              {/* ===============================================
                  CONTACT + PHOTO
              =============================================== */}

              <div className='grid grid-cols-1 lg:grid-cols-7 gap-2 items-stretch'>
                {/* =============================================
                    3. CONTACT & ADDRESS - 4 COLUMNS
                ============================================= */}

                <div className='lg:col-span-4'>
                  <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4 h-full'>
                    {/* Header */}
                    <div className='flex items-center gap-2 mb-4'>
                      <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                        <UserRound size={16} />
                      </div>

                      <h3 className='text-sm font-semibold text-green-700'>
                        {
                          addNewWorkerData.sections.contactAddressInformation
                            .title
                        }
                      </h3>
                    </div>

                    {/* Dynamic Contact Fields */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-4'>
                      {addNewWorkerData.sections.contactAddressInformation.fields.map(
                        (field) => {
                          const options = field.optionsKey
                            ? addNewWorkerData.dropdownOptions[
                                field.optionsKey
                              ] || []
                            : field.options || [];

                          return (
                            <div
                              key={field.name}
                              className={
                                field.type === "textarea"
                                  ? "sm:col-span-1 lg:col-span-3"
                                  : field.type === "checkbox"
                                    ? "sm:col-span-2 lg:col-span-6"
                                    : "sm:col-span-1 lg:col-span-2"
                              }
                            >
                              {/* Checkbox */}
                              {field.type === "checkbox" ? (
                                <label
                                  htmlFor={field.name}
                                  className='flex items-center gap-2 cursor-pointer'
                                >
                                  <input
                                    id={field.name}
                                    type='checkbox'
                                    {...register(field.name)}
                                    className='w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500'
                                  />

                                  <span className='text-xs font-medium text-gray-700'>
                                    {field.label}
                                  </span>
                                </label>
                              ) : (
                                <>
                                  {/* Label */}
                                  <label
                                    htmlFor={field.name}
                                    className='block text-xs font-medium text-gray-700 mb-1'
                                  >
                                    {field.label}

                                    {field.required && (
                                      <span className='text-red-500 ml-1'>
                                        *
                                      </span>
                                    )}
                                  </label>

                                  {/* Text / Tel / Email / Number */}
                                  {["text", "tel", "email", "number"].includes(
                                    field.type,
                                  ) && (
                                    <input
                                      id={field.name}
                                      type={field.type}
                                      placeholder={field.placeholder || ""}
                                      disabled={field.disabled || false}
                                      min={field.min}
                                      step={field.step}
                                      {...register(field.name, {
                                        required: field.required
                                          ? `${field.label} is required`
                                          : false,
                                      })}
                                      className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                        field.disabled
                                          ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                          : "bg-white text-gray-700"
                                      } ${
                                        errors[field.name]
                                          ? "border-red-500 focus:border-red-500"
                                          : "border-gray-300 focus:border-green-600"
                                      } focus:ring-1 focus:ring-green-100`}
                                    />
                                  )}

                                  {/* Textarea */}
                                  {field.type === "textarea" && (
                                    <textarea
                                      id={field.name}
                                      placeholder={field.placeholder || ""}
                                      disabled={field.disabled || false}
                                      {...register(field.name, {
                                        required: field.required
                                          ? `${field.label} is required`
                                          : false,
                                      })}
                                      className={`w-full min-h-[82px] resize-none rounded-md border px-3 py-2 text-xs outline-none transition ${
                                        field.disabled
                                          ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                          : "bg-white text-gray-700"
                                      } ${
                                        errors[field.name]
                                          ? "border-red-500 focus:border-red-500"
                                          : "border-gray-300 focus:border-green-600"
                                      } focus:ring-1 focus:ring-green-100`}
                                    />
                                  )}

                                  {/* Select */}
                                  {field.type === "select" && (
                                    <select
                                      id={field.name}
                                      disabled={field.disabled || false}
                                      {...register(field.name, {
                                        required: field.required
                                          ? `${field.label} is required`
                                          : false,
                                      })}
                                      className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                        field.disabled
                                          ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                          : "bg-white text-gray-700"
                                      } ${
                                        errors[field.name]
                                          ? "border-red-500 focus:border-red-500"
                                          : "border-gray-300 focus:border-green-600"
                                      } focus:ring-1 focus:ring-green-100`}
                                    >
                                      <option value=''>
                                        {field.placeholder || "Select"}
                                      </option>

                                      {options.map((option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  )}

                                  {/* Error */}
                                  {errors[field.name] && (
                                    <p className='mt-1 text-[11px] text-red-500'>
                                      {errors[field.name].message}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>

                {/* =================================================
                    PHOTO & BIOMETRIC - 3 COLUMNS
                ================================================= */}

                <div className='lg:col-span-3'>
                  <div className='border border-gray-200 rounded-xl bg-white p-2 sm:p-4 h-full'>
                    {/* Section Header */}
                    <h3 className='text-sm font-semibold text-green-700 mb-4'>
                      {addNewWorkerData.sections.photoBiometric.title}
                    </h3>

                    {/* Photo + Biometric Layout */}
                    <div className='grid grid-cols-2 gap-2'>
                      {/* =============================================
                        WORKER PHOTO
                    ============================================= */}

                      <div className='flex flex-col items-center'>
                        <div className='w-full h-40 rounded-md border border-gray-200 overflow-hidden bg-gray-50'>
                          <img
                            src='https://randomuser.me/api/portraits/women/44.jpg'
                            alt='Worker'
                            className='w-full h-full object-cover'
                          />
                        </div>

                        <button
                          type='button'
                          className='w-full mt-10 bg-green-700 hover:bg-green-800 text-white rounded-md py-4 text-[12px] font-medium'
                        >
                          + Change Photo
                        </button>
                      </div>

                      {/* =============================================
                              BIOMETRIC
                          ============================================= */}

                      <div className='space-y-6'>
                        {addNewWorkerData.sections.photoBiometric.biometric.map(
                          (biometric) => (
                            <div key={biometric.name}>
                              {/* Label */}
                              <label className='block text-[11px] font-medium text-gray-700 mb-2'>
                                {biometric.label}
                              </label>

                              {/* Capture Button */}
                              <button
                                type='button'
                                className='w-full h-9 border border-gray-300 rounded-md bg-white text-[11px] text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5'
                              >
                                <span className='text-gray-500'>◉</span>
                                Capture
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                      4. DISTRIBUTED AGRI LAND
                  ================================================= */}

              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.distributedAgriLand.title}
                  </h3>
                </div>

                {/* =================================================
                        TOP FORM FIELDS
                    ================================================= */}

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 mb-4'>
                  {addNewWorkerData.sections.distributedAgriLand.fields.map(
                    (field) => {
                      const options = field.optionsKey
                        ? addNewWorkerData.dropdownOptions[field.optionsKey] ||
                          []
                        : field.options || [];

                      return (
                        <div key={field.name}>
                          {/* Label */}
                          <label
                            htmlFor={field.name}
                            className='block text-xs font-medium text-gray-700 mb-1'
                          >
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-1'>*</span>
                            )}
                          </label>

                          {/* Number / Text */}
                          {["text", "number"].includes(field.type) && (
                            <input
                              id={field.name}
                              type={field.type}
                              placeholder={field.placeholder || ""}
                              min={field.min}
                              max={field.max}
                              step={field.step}
                              disabled={field.disabled || false}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* Select */}
                          {field.type === "select" && (
                            <select
                              id={field.name}
                              disabled={field.disabled || false}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            >
                              <option value=''>
                                {field.placeholder || "Select"}
                              </option>

                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* Validation Error */}
                          {errors[field.name] && (
                            <p className='mt-1 text-[11px] text-red-500'>
                              {errors[field.name].message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>

                {/* =================================================
                        LAND DETAILS TITLE
                    ================================================= */}

                <div className='mb-2'>
                  <h4 className='text-xs font-semibold text-green-700'>
                    {addNewWorkerData.sections.distributedAgriLand.table.title}
                  </h4>
                </div>

                {/* =================================================
                          LAND DETAILS TABLE
                      ================================================= */}

                <div className='w-full overflow-x-auto'>
                  <table className='w-full min-w-[700px] text-xs border-collapse'>
                    {/* Table Header */}
                    <thead>
                      <tr className='bg-gray-50 border-y border-gray-200'>
                        {addNewWorkerData.sections.distributedAgriLand.table.headers.map(
                          (header) => (
                            <th
                              key={header.key}
                              className='px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap'
                            >
                              {header.label}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {addNewWorkerData.sections.distributedAgriLand.table.rows.map(
                        (row) => (
                          <tr
                            key={row.id}
                            className='border-b border-gray-100 hover:bg-gray-50'
                          >
                            {/* SL */}
                            <td className='px-3 py-2 text-gray-700'>
                              {row.sl}
                            </td>

                            {/* Plot / Block */}
                            <td className='px-3 py-2 text-gray-700 whitespace-nowrap'>
                              {row.plotBlockNo}
                            </td>

                            {/* Mouza */}
                            <td className='px-3 py-2 text-gray-700'>
                              {row.mouza}
                            </td>

                            {/* Area */}
                            <td className='px-3 py-2 text-gray-700'>
                              {row.area}
                            </td>

                            {/* Distributed Date */}
                            <td className='px-3 py-2 text-gray-700 whitespace-nowrap'>
                              {row.distributedDate}
                            </td>

                            {/* Action */}
                            <td className='px-3 py-2'>
                              <div className='flex items-center gap-2'>
                                {/* Edit */}
                                <button
                                  type='button'
                                  title={
                                    addNewWorkerData.sections
                                      .distributedAgriLand.actions.editLabel
                                  }
                                  className='text-blue-500 hover:text-blue-700 text-xs'
                                >
                                  ✎
                                </button>

                                {/* Delete */}
                                <button
                                  type='button'
                                  title={
                                    addNewWorkerData.sections
                                      .distributedAgriLand.actions.deleteLabel
                                  }
                                  className='text-red-500 hover:text-red-700 text-xs'
                                >
                                  🗑
                                </button>
                              </div>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>

                {/* =================================================
                        ADD MORE LAND BUTTON
                    ================================================= */}

                <div className='flex justify-center mt-3'>
                  <button
                    type='button'
                    className='border border-gray-300 rounded-md px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50'
                  >
                    +{" "}
                    {
                      addNewWorkerData.sections.distributedAgriLand.actions
                        .addLandLabel
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* =========================================================
                    5. DEPENDENT (FAMILY MEMBER)
                ========================================================= */}

            <div className='xl:col-span-5'>
              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.dependentFamilyMember.title}
                  </h3>
                </div>

                {/* Table */}
                <div className='overflow-x-auto'>
                  <table className='w-full min-w-[620px] text-xs'>
                    {/* Table Header */}
                    <thead>
                      <tr className='border-b border-gray-200 bg-gray-50'>
                        {addNewWorkerData.sections.dependentFamilyMember.table.headers.map(
                          (header) => (
                            <th
                              key={header.key}
                              className='px-2 py-2 text-left font-semibold text-gray-600 whitespace-nowrap'
                            >
                              {header.label}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {addNewWorkerData.sections.dependentFamilyMember.table.rows.map(
                        (row) => (
                          <tr
                            key={row.id}
                            className='border-b border-gray-100 last:border-b-0 hover:bg-gray-50'
                          >
                            {addNewWorkerData.sections.dependentFamilyMember.table.headers.map(
                              (header) => (
                                <td
                                  key={header.key}
                                  className='px-2 py-2 text-gray-700 whitespace-nowrap'
                                >
                                  {header.key === "action" ? (
                                    <div className='flex items-center gap-2'>
                                      {/* Edit */}
                                      <button
                                        type='button'
                                        title='Edit'
                                        className='text-blue-500 hover:text-blue-700 transition'
                                        onClick={() => {
                                          console.log("Edit dependent:", row);
                                        }}
                                      >
                                        ✎
                                      </button>

                                      {/* Delete */}
                                      <button
                                        type='button'
                                        title='Delete'
                                        className='text-red-500 hover:text-red-700 transition'
                                        onClick={() => {
                                          console.log("Delete dependent:", row);
                                        }}
                                      >
                                        🗑
                                      </button>
                                    </div>
                                  ) : (
                                    row[header.key]
                                  )}
                                </td>
                              ),
                            )}
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Add Dependent Button */}
                <button
                  type='button'
                  className='w-full mt-2 border border-gray-200 rounded-md py-2 text-xs font-medium text-green-700 hover:bg-green-50 transition'
                  onClick={() => {
                    console.log("Add Dependent");
                  }}
                >
                  +{" "}
                  {
                    addNewWorkerData.sections.dependentFamilyMember.actions
                      .addDependent.label
                  }
                </button>
              </div>
            </div>

            {/* =========================================================
                    6. RESON CARD
                ========================================================= */}

            <div className='xl:col-span-3'>
              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <CreditCard size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.resonCard.title}
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3'>
                  {addNewWorkerData.sections.resonCard.fields
                    .filter((field) => field.type !== "file")
                    .map((field) => (
                      <div key={field.name}>
                        {/* Label */}
                        <label
                          htmlFor={field.name}
                          className='block text-xs font-medium text-gray-700 mb-1'
                        >
                          {field.label}

                          {field.required && (
                            <span className='text-red-500 ml-1'>*</span>
                          )}
                        </label>

                        {/* Text */}
                        {field.type === "text" && (
                          <input
                            id={field.name}
                            type='text'
                            placeholder={field.placeholder || ""}
                            className='w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100'
                          />
                        )}

                        {/* Date */}
                        {field.type === "date" && (
                          <input
                            id={field.name}
                            type='date'
                            className='w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100'
                          />
                        )}
                      </div>
                    ))}
                </div>

                {/* Upload Reson Card */}
                {addNewWorkerData.sections.resonCard.fields
                  .filter((field) => field.type === "file")
                  .map((field) => (
                    <div key={field.name} className='mt-3'>
                      {/* Label */}
                      <label
                        htmlFor={field.name}
                        className='block text-xs font-medium text-gray-700 mb-1'
                      >
                        {field.label}

                        {field.required && (
                          <span className='text-red-500 ml-1'>*</span>
                        )}
                      </label>

                      {/* File Input */}
                      <label
                        htmlFor={field.name}
                        className='flex items-center gap-2 w-full h-9 rounded-md border border-gray-300 bg-white px-3 cursor-pointer hover:border-green-500 transition'
                      >
                        <span className='text-gray-500 text-sm'>📄</span>

                        <span className='text-xs text-gray-600 truncate'>
                          Choose Reson Card
                        </span>

                        <input
                          id={field.name}
                          type='file'
                          accept={field.accept || ""}
                          className='hidden'
                        />
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            {/* =========================================================
                    7. ADDITIONAL IMPORTANT INFORMATION
                ========================================================= */}

            <div className='xl:col-span-4'>
              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {
                      addNewWorkerData.sections.additionalImportantInformation
                        .title
                    }
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3'>
                  {addNewWorkerData.sections.additionalImportantInformation.fields.map(
                    (field) => {
                      const options = field.optionsKey
                        ? addNewWorkerData.dropdownOptions[field.optionsKey] ||
                          []
                        : field.options || [];

                      return (
                        <div key={field.name}>
                          {/* Label */}
                          <label
                            htmlFor={field.name}
                            className='block text-xs font-medium text-gray-700 mb-1'
                          >
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-1'>*</span>
                            )}
                          </label>

                          {/* Text / Tel / Number */}
                          {["text", "tel", "number"].includes(field.type) && (
                            <input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              placeholder={field.placeholder || ""}
                              min={field.min}
                              step={field.step}
                              className='w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100'
                            />
                          )}

                          {/* Select */}
                          {field.type === "select" && (
                            <select
                              id={field.name}
                              name={field.name}
                              defaultValue=''
                              className='w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100'
                            >
                              <option value=''>
                                {field.placeholder || "Select"}
                              </option>

                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            {/* =========================================================
                    8. DOCUMENTS INFORMATION
                ========================================================= */}

            <div className='xl:col-span-6'>
              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-3'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <FileText size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.documentsInformation.title}
                  </h3>
                </div>

                {/* Upload Note */}
                <p className='text-[10px] text-gray-500 mb-3'>
                  {addNewWorkerData.sections.documentsInformation.uploadNote}
                </p>

                {/* Documents */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2'>
                  {addNewWorkerData.sections.documentsInformation.documents.map(
                    (document) => (
                      <div
                        key={document.id}
                        className='border border-gray-200 rounded-lg bg-white p-2'
                      >
                        {/* Document Label */}
                        <p className='text-[10px] font-medium text-gray-600 text-center mb-2 min-h-[28px] flex items-center justify-center'>
                          {document.label}
                        </p>

                        {/* Upload Area */}
                        <label
                          htmlFor={document.name}
                          className='flex flex-col items-center justify-center h-14 rounded-md border border-dashed border-gray-300 cursor-pointer hover:border-green-500 hover:bg-green-50/40 transition'
                        >
                          <Upload size={16} className='text-gray-400 mb-1' />

                          <span className='text-[10px] text-gray-500'>
                            Upload
                          </span>

                          <input
                            id={document.name}
                            name={document.name}
                            type='file'
                            accept={document.accept || ""}
                            className='hidden'
                          />
                        </label>

                        {/* Required */}
                        {document.required && (
                          <p className='text-[9px] text-red-500 text-center mt-1'>
                            Required
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* =========================================================
                9. SYSTEM INFORMATION
            ========================================================= */}

            <div className='xl:col-span-3'>
              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <Info size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.systemInformation.title}
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3'>
                  {addNewWorkerData.sections.systemInformation.fields.map(
                    (field) => (
                      <div key={field.name}>
                        {/* Label */}
                        <label
                          htmlFor={field.name}
                          className='block text-xs font-medium text-gray-700 mb-1'
                        >
                          {field.label}

                          {field.required && (
                            <span className='text-red-500 ml-1'>*</span>
                          )}
                        </label>

                        {/* Text */}
                        {field.type === "text" && (
                          <input
                            id={field.name}
                            name={field.name}
                            type='text'
                            placeholder={field.placeholder || ""}
                            disabled={field.disabled || false}
                            className='w-full h-9 rounded-md border border-gray-300 bg-gray-50 px-3 text-xs text-gray-600 outline-none cursor-not-allowed'
                          />
                        )}

                        {/* Date / Datetime */}
                        {["date", "datetime"].includes(field.type) && (
                          <input
                            id={field.name}
                            name={field.name}
                            type={
                              field.type === "datetime"
                                ? "datetime-local"
                                : "date"
                            }
                            disabled={field.disabled || false}
                            className='w-full h-9 rounded-md border border-gray-300 bg-gray-50 px-3 text-xs text-gray-600 outline-none cursor-not-allowed'
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              BOTTOM ACTION BUTTONS
          ===================================================== */}

          <div className='flex flex-wrap justify-end gap-2'>
            {/* Reset */}
            <button
              type='button'
              onClick={handleReset}
              className='flex items-center justify-center gap-1.5 border border-gray-300 rounded-md px-5 py-2 text-xs hover:bg-gray-50 transition'
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            {/* Save as Draft */}
            <button
              type='button'
              className='flex items-center justify-center gap-1.5 border border-gray-300 rounded-md px-5 py-2 text-xs hover:bg-gray-50 transition'
            >
              <Save size={14} />
              <span>Save as Draft</span>
            </button>

            {/* Save & Submit */}
            <button
              type='submit'
              className='flex items-center justify-center gap-1.5 bg-green-700 text-white rounded-md px-5 py-2 text-xs hover:bg-green-800 transition'
            >
              <CheckCircle size={14} />
              <span>Save & Submit</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewWorker;
