import React, { useState } from "react";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import { X, RotateCcw, Save, Plus, Pencil, Trash2, Map } from "lucide-react";
import { useForm } from "react-hook-form";
import { divisionSectionData } from "../../data/EstateManagementData/divisionAndSectionData";
import toast from "react-hot-toast";

const DivisionAndSection = () => {
  const [showDivisionModal, setShowDivisionModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const {
    register: registerSection,
    handleSubmit: handleSubmitSection,
    reset: resetSection,
    clearErrors: clearSectionErrors,
    formState: { errors: sectionErrors, isSubmitting: sectionSubmitting },
  } = useForm();
  const onSubmitDivision = async (data) => {
    try {
      console.log(data);

      toast.success("Division saved successfully!");

      reset();
      clearErrors();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  const onSubmitSection = async (data) => {
    try {
      console.log(data);

      toast.success("Section saved successfully!");

      resetSection();
      clearSectionErrors();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Top Tabs */}
      <EstateManagementTabs />

      {/* Main Layout */}
      <div className='grid grid-cols-12 gap-3'>
        {/* ================= Left Side ================= */}
        <div className='col-span-12 space-y-6 xl:col-span-5'>
          {/* =========================================================
                  Division Information
              ========================================================= */}

          {/* =========================================================
                  Section Information
              ========================================================= */}
        </div>

        {/* ================= Right Side ================= */}
        <div className='col-span-12 space-y-6 xl:col-span-12'>
          {/* Division List */}
          <div className='rounded-xl bg-white shadow-sm'>
            <div className='flex items-center justify-between border-b bg-green-50 px-6 py-3'>
              <h2 className='text-lg font-semibold text-green-800'>
                Division List
              </h2>

              <button
                type='button'
                onClick={() => setShowDivisionModal(true)}
                className='inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 cursor-pointer'
              >
                <Plus size={18} />
                Add Division
              </button>
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full border border-gray-200 border-collapse'>
                <thead className='border border-gray-200 bg-gray-50 px-2 py-3 text-left text-sm font-regular text-gray-700'>
                  <tr>
                    {divisionSectionData.divisionTableHeaders.map((header) => (
                      <th
                        key={header}
                        className={`border border-gray-200 bg-gray-50 px-1 py-3 text-sm font-medium text-gray-700 ${
                          header === "SL" ? "text-center" : "text-left"
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {divisionSectionData.divisionList.map((division, index) => (
                    <tr key={division.id} className='hover:bg-gray-50'>
                      {/* SL */}
                      <td className='border border-gray-200 px-4 py-3 text-sm text-center'>
                        {index + 1}
                      </td>

                      {/* Division Name */}
                      <td className='border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800'>
                        {division.divisionName}
                      </td>

                      {/* Division Code */}
                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {division.divisionCode}
                      </td>

                      {/* Total Area */}
                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {division.totalArea.toFixed(2)}
                      </td>

                      {/* Total Section */}
                      <td className='border border-gray-200 px-4 py-3 text-sm text-center'>
                        {division.totalSection}
                      </td>

                      {/* Status */}
                      <td className='border border-gray-200 px-4 py-3 text-center'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            division.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {division.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className='border border-gray-200 px-4 py-3'>
                        <div className='flex items-center justify-center gap-3'>
                          <button
                            type='button'
                            className='text-blue-600 transition-colors hover:text-blue-800 cursor-pointer'
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            type='button'
                            className='text-red-600 transition-colors hover:text-red-800 cursor-pointer'
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm text-gray-600'>
                <p>
                  Showing 1 to {divisionSectionData.divisionList.length} of{" "}
                  {divisionSectionData.divisionList.length} entries
                </p>
              </div>
            </div>
          </div>

          {/* Section List */}
          <div className='rounded-xl bg-white shadow-sm'>
            <div className='flex items-center justify-between border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Section List (Rangpur Division)
              </h2>

              <button
                type='button'
                className='inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 cursor-pointer'
              >
                <Plus size={18} />
                Add Section
              </button>
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full border border-gray-200 border-collapse'>
                <thead className='bg-gray-50'>
                  <tr>
                    {divisionSectionData.sectionTableHeaders.map((header) => (
                      <th
                        key={header}
                        className='border border-gray-200 px-2 py-3 text-left text-sm font-medium text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {divisionSectionData.sectionList.map((section, index) => (
                    <tr key={section.id} className='hover:bg-gray-50'>
                      {/* SL */}
                      <td className='border border-gray-200 px-1 py-3 text-center text-sm'>
                        {index + 1}
                      </td>

                      {/* Section Name */}
                      <td className='border border-gray-200 px-1 py-3 text-sm font-regular text-gray-800'>
                        {section.sectionName}
                      </td>

                      {/* Section Code */}
                      <td className='border border-gray-200 px-3 py-3 text-sm'>
                        {section.sectionCode}
                      </td>

                      {/* Parent Section */}
                      <td className='border border-gray-200 px-3 py-3 text-sm'>
                        {section.parentSection}
                      </td>

                      {/* Total Area */}
                      <td className='border border-gray-200 px-3 py-3 text-sm'>
                        {section.totalArea.toFixed(2)}
                      </td>

                      {/* Manager */}
                      <td className='border border-gray-200 px-3 py-3 text-sm'>
                        {section.manager}
                      </td>

                      {/* Status */}
                      <td className='border border-gray-200 px-3 py-3 text-center'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            section.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {section.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className='border border-gray-200 px-3 py-3'>
                        <div className='flex items-center justify-center gap-3'>
                          <button
                            type='button'
                            className='text-blue-600 hover:text-blue-800 cursor-pointer'
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            type='button'
                            className='text-red-600 hover:text-red-800 cursor-pointer'
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm text-gray-600'>
                <p>
                  Showing 1 to {divisionSectionData.sectionList.length} of{" "}
                  {divisionSectionData.sectionList.length} entries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================= Division & Section Summary ================= */}
      {/* Body */}
      <div className='flex bg-green-100'>
        {/* Left Icon - 1 Part */}
        <div className='flex w-1/12 items-center justify-center border-r border-green-100 p-6'>
          <Map size={48} strokeWidth={1.8} className='text-green-700' />
        </div>

        {/* Right Content - 11 Parts */}
        <div className='w-11/12'>
          {/* Header */}
          <div className='border-b border-green-100 px-6 pt-3'>
            <h2 className='text-sm font-semibold text-green-800'>
              Division & Section Summary
            </h2>
          </div>

          {/* Desktop */}
          <div className='hidden lg:grid lg:grid-cols-6 gap-6 p-6'>
            <div>
              <p className='text-sm text-gray-500'>Total Division</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.totalDivision}
              </h3>
            </div>

            <div>
              <p className='text-sm text-gray-500'>Total Section</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.totalSection}
              </h3>
            </div>

            <div>
              <p className='text-sm text-gray-500'>Total Area (Acre)</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.totalArea.toFixed(2)}
              </h3>
            </div>

            <div>
              <p className='text-sm text-gray-500'>Average Section Area</p>
              <h3 className='mt-2 whitespace-nowrap text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.averageSectionArea}
                <span className='ml-1 text-lg'> Acre</span>
              </h3>
            </div>

            <div>
              <p className='text-sm text-gray-500'>Active Division</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.activeDivision}
              </h3>
            </div>

            <div>
              <p className='text-sm text-gray-500'>Active Section</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.activeSection}
              </h3>
            </div>
          </div>

          {/* Mobile */}
          <div className='grid grid-cols-1 gap-3 p-4 lg:hidden'>
            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Total Division</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.totalDivision}
              </h3>
            </div>

            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Total Section</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.totalSection}
              </h3>
            </div>

            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Total Area (Acre)</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.totalArea.toFixed(2)}
              </h3>
            </div>

            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Average Section Area</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.averageSectionArea}
                <span className='ml-1 text-base'> Acre</span>
              </h3>
            </div>

            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Active Division</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.activeDivision}
              </h3>
            </div>

            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Active Section</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.activeSection}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* ================= Division Information Popup / Modal ================= */}
      {showDivisionModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          {/* Division Modal Container */}
          <div className='w-full max-w-3xl rounded-xl bg-white shadow-xl'>
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Division Information
              </h2>

              {/* Close Modal Button */}
              <button
                type='button'
                onClick={() => setShowDivisionModal(false)}
                className='rounded-lg p-2 text-gray-500 hover:bg-gray-100'
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onSubmitDivision)}>
              <div className='p-6'>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                  {/* Estate */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-green-600'
                    >
                      <option value=''>Select Estate</option>

                      {divisionSectionData.estateOptions.map((estate) => (
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

                  {/* Total Area */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Total Area (Acre) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      min={0}
                      step='0.01'
                      placeholder='Enter total area'
                      {...register("totalArea", {
                        required: "Total Area is required",
                        min: {
                          value: 0.01,
                          message: "Area must be greater than 0",
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {errors.totalArea && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.totalArea.message}
                      </p>
                    )}
                  </div>
                  {/* Division Name */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division Name <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter division name'
                      {...register("divisionName", {
                        required: "Division Name is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {errors.divisionName && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.divisionName.message}
                      </p>
                    )}
                  </div>

                  {/* Total Section */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Total Section
                    </label>

                    <input
                      type='number'
                      min={0}
                      placeholder='Enter total section'
                      {...register("totalSection", {
                        min: {
                          value: 0,
                          message: "Value cannot be negative",
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {errors.totalSection && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.totalSection.message}
                      </p>
                    )}
                  </div>

                  {/* Division Code */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division Code <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter division code'
                      {...register("divisionCode", {
                        required: "Division Code is required",
                        pattern: {
                          value: /^DIV-\d+$/,
                          message: "Example: DIV-01",
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {errors.divisionCode && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.divisionCode.message}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Status <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("status", {
                        required: "Status is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-green-600'
                    >
                      <option value=''>Select Status</option>

                      {divisionSectionData.divisionStatusOptions.map(
                        (status) => (
                          <option key={status.id} value={status.value}>
                            {status.label}
                          </option>
                        ),
                      )}
                    </select>

                    {errors.status && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                  {/* Description */}
                  <div className='mt-5'>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Description
                    </label>

                    <textarea
                      placeholder='Write division description...'
                      {...register("description", {
                        maxLength: {
                          value: 250,
                          message: "Maximum 250 characters",
                        },
                      })}
                      className='min-h-24 w-full resize-none rounded-lg border border-gray-300 p-4 outline-none transition focus:border-green-600'
                    />

                    {errors.description && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Division Form Footer */}
                <div className='mt-6 border-t pt-6'>
                  <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                    {/* Cancel */}
                    <button
                      type='button'
                      onClick={() => {
                        reset();
                        clearErrors();
                        setShowDivisionModal(false);
                      }}
                      className='inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto'
                    >
                      <X size={18} />
                      Cancel
                    </button>

                    {/* Reset */}
                    <button
                      type='button'
                      onClick={() => {
                        reset();
                        clearErrors();
                      }}
                      className='inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-5 text-sm font-medium text-green-700 transition hover:bg-green-100 sm:w-auto'
                    >
                      <RotateCcw size={18} />
                      Reset
                    </button>

                    {/* Save Division */}
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                    >
                      <Save size={18} />
                      {isSubmitting ? "Saving..." : "Save Division"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DivisionAndSection;
