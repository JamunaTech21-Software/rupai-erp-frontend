import React, { useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { useForm } from "react-hook-form";

import MasterDataTabs from "./MasterDataTabs";
import { teaTypeData } from "../../data/MasterData/teaTypeData";

const TeaType = () => {
  // =========================================================
  // MODAL STATE
  // =========================================================

  const [isTeaTypeModalOpen, setIsTeaTypeModalOpen] = useState(false);

  // =========================================================
  // DATA FROM JSON
  // =========================================================

  const {
    pageConfig,
    teaTypeForm,
    formFields,
    processingMethodOptions,
    applicableForOptions,
    statusOptions,
    teaTypeTableHeaders,
    teaTypeList,
    pagination,
    emptyTeaTypeForm,
  } = teaTypeData;

  // =========================================================
  // MAIN FORM
  // =========================================================

  const {
    register: registerMain,
    handleSubmit: handleMainSubmit,
    reset: resetMain,
    formState: { errors: mainErrors },
  } = useForm({
    defaultValues: teaTypeForm,
  });

  // =========================================================
  // MODAL FORM
  // =========================================================

  const {
    register: registerModal,
    handleSubmit: handleModalSubmit,
    reset: resetModal,
    formState: { errors: modalErrors },
  } = useForm({
    defaultValues: emptyTeaTypeForm,
  });

  // =========================================================
  // MAIN FORM SUBMIT
  // =========================================================

  const onMainSubmit = (data) => {
    console.log("Main Tea Type Form Data:", data);
  };

  // =========================================================
  // MODAL FORM SUBMIT
  // =========================================================

  const onModalSubmit = (data) => {
    console.log("New Tea Type Data:", data);

    // Later:
    // API POST request will come here

    resetModal(emptyTeaTypeForm);
    setIsTeaTypeModalOpen(false);
  };

  // =========================================================
  // OPEN MODAL
  // =========================================================

  const handleOpenModal = () => {
    resetModal(emptyTeaTypeForm);
    setIsTeaTypeModalOpen(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const handleCloseModal = () => {
    resetModal(emptyTeaTypeForm);
    setIsTeaTypeModalOpen(false);
  };

  // =========================================================
  // MAIN FORM CANCEL
  // =========================================================

  const handleMainCancel = () => {
    resetMain(teaTypeForm);
  };

  return (
    <div className='space-y-4'>
      {/* =====================================================
          MASTER DATA TABS
      ====================================================== */}

      <MasterDataTabs />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className='rounded-lg bg-white p-4 shadow-sm'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-12'>
          {/* =================================================
              LEFT SIDE - TEA TYPE INFORMATION
          ================================================== */}

          <div className='lg:col-span-5'>
            <div className='h-full rounded-lg border border-slate-200 bg-white'>
              {/* =================================================
                  FORM HEADER
              ================================================== */}

              <div className='border-b border-slate-200 px-5 py-4'>
                <h2 className='text-sm font-bold text-emerald-700'>
                  {pageConfig.formTitle}
                </h2>
              </div>

              {/* =================================================
                  MAIN FORM
              ================================================== */}

              <form
                onSubmit={handleMainSubmit(onMainSubmit)}
                className='space-y-4 p-5'
              >
                {/* =================================================
                    TEXT INPUTS
                ================================================== */}

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  {formFields
                    .filter(
                      (field) =>
                        field.type === "text" && field.name !== "shortName",
                    )
                    .map((field) => (
                      <div key={field.id}>
                        <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                          {field.label}

                          {field.required && (
                            <span className='text-red-500'> *</span>
                          )}
                        </label>

                        <input
                          type='text'
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                          {...registerMain(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          className={`h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ${
                            mainErrors[field.name]
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        {mainErrors[field.name] && (
                          <p className='mt-1 text-[11px] text-red-500'>
                            {mainErrors[field.name].message}
                          </p>
                        )}
                      </div>
                    ))}
                </div>

                {/* =================================================
                    SHORT NAME + PROCESSING METHOD
                ================================================== */}

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  {/* SHORT NAME */}

                  {formFields
                    .filter((field) => field.name === "shortName")
                    .map((field) => (
                      <div key={field.id}>
                        <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                          {field.label}

                          {field.required && (
                            <span className='text-red-500'> *</span>
                          )}
                        </label>

                        <input
                          type='text'
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                          {...registerMain(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          className={`h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ${
                            mainErrors[field.name]
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        {mainErrors[field.name] && (
                          <p className='mt-1 text-[11px] text-red-500'>
                            {mainErrors[field.name].message}
                          </p>
                        )}
                      </div>
                    ))}

                  {/* PROCESSING METHOD */}

                  {formFields
                    .filter((field) => field.name === "processingMethod")
                    .map((field) => (
                      <div key={field.id}>
                        <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                          {field.label}

                          {field.required && (
                            <span className='text-red-500'> *</span>
                          )}
                        </label>

                        <select
                          {...registerMain(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          className={`h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ${
                            mainErrors[field.name]
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        >
                          <option value=''>{field.placeholder}</option>

                          {processingMethodOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        {mainErrors[field.name] && (
                          <p className='mt-1 text-[11px] text-red-500'>
                            {mainErrors[field.name].message}
                          </p>
                        )}
                      </div>
                    ))}
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                {formFields
                  .filter((field) => field.name === "description")
                  .map((field) => (
                    <div key={field.id}>
                      <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      <textarea
                        rows='3'
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        {...registerMain(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                        })}
                        className={`w-full resize-none rounded-md border bg-white px-3 py-2 text-sm outline-none ${
                          mainErrors[field.name]
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                      />

                      <div className='mt-1 text-right text-[11px] text-slate-500'>
                        Maximum {field.maxLength} characters
                      </div>

                      {mainErrors[field.name] && (
                        <p className='mt-1 text-[11px] text-red-500'>
                          {mainErrors[field.name].message}
                        </p>
                      )}
                    </div>
                  ))}

                {/* =================================================
                    APPLICABLE FOR
                ================================================== */}

                {formFields
                  .filter((field) => field.name === "applicableFor")
                  .map((field) => (
                    <div key={field.id}>
                      <label className='mb-2 block text-xs font-semibold text-slate-700'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      <div className='flex flex-wrap gap-3'>
                        {applicableForOptions.map((option) => (
                          <label
                            key={option.value}
                            className='flex cursor-pointer items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-700'
                          >
                            <input
                              type='checkbox'
                              value={option.value}
                              {...registerMain(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className='h-4 w-4 cursor-pointer accent-emerald-600'
                            />

                            {option.label}
                          </label>
                        ))}
                      </div>

                      {mainErrors[field.name] && (
                        <p className='mt-1 text-[11px] text-red-500'>
                          {mainErrors[field.name].message}
                        </p>
                      )}
                    </div>
                  ))}

                {/* =================================================
                    STATUS
                ================================================== */}

                {formFields
                  .filter((field) => field.name === "status")
                  .map((field) => (
                    <div key={field.id}>
                      <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      <select
                        {...registerMain(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                        })}
                        className={`h-10 w-full cursor-pointer rounded-md border bg-white px-3 text-sm outline-none ${
                          mainErrors[field.name]
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                      >
                        <option value=''>{field.placeholder}</option>

                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      {mainErrors[field.name] && (
                        <p className='mt-1 text-[11px] text-red-500'>
                          {mainErrors[field.name].message}
                        </p>
                      )}
                    </div>
                  ))}

                {/* =================================================
                    REMARKS
                ================================================== */}

                {formFields
                  .filter((field) => field.name === "remarks")
                  .map((field) => (
                    <div key={field.id}>
                      <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                        {field.label}

                        {!field.required && (
                          <span className='font-normal text-slate-400'>
                            {" "}
                            (Optional)
                          </span>
                        )}
                      </label>

                      <textarea
                        rows='3'
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        {...registerMain(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                        })}
                        className={`w-full resize-none rounded-md border bg-white px-3 py-2 text-sm outline-none ${
                          mainErrors[field.name]
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                      />

                      <div className='mt-1 text-right text-[11px] text-slate-500'>
                        Maximum {field.maxLength} characters
                      </div>

                      {mainErrors[field.name] && (
                        <p className='mt-1 text-[11px] text-red-500'>
                          {mainErrors[field.name].message}
                        </p>
                      )}
                    </div>
                  ))}

                {/* =================================================
                    BUTTONS
                ================================================== */}

                <div className='flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end'>
                  <button
                    type='button'
                    onClick={handleMainCancel}
                    className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-600'
                  >
                    <X className='h-4 w-4' />

                    {pageConfig.cancelButtonLabel}
                  </button>

                  <button
                    type='submit'
                    className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-medium text-white'
                  >
                    <Save className='h-4 w-4' />

                    {pageConfig.saveButtonLabel}
                  </button>
                </div>

                {/* =================================================
                    MANDATORY NOTE
                ================================================== */}

                <p className='text-[11px] text-red-500'>
                  {pageConfig.mandatoryNote}
                </p>
              </form>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE - TEA TYPE LIST
          ================================================== */}

          <div className='lg:col-span-7'>
            <div className='rounded-lg border border-slate-200 bg-white'>
              {/* =================================================
                  LIST HEADER
              ================================================== */}

              <div className='flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='text-sm font-bold text-emerald-700'>
                  {pageConfig.listTitle}
                </h2>

                <button
                  type='button'
                  onClick={handleOpenModal}
                  className='flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-xs font-semibold text-white'
                >
                  <Plus className='h-4 w-4' />

                  {pageConfig.addButtonLabel}
                </button>
              </div>

              {/* =================================================
                  TABLE
              ================================================== */}

              <div className='overflow-x-auto p-3'>
                <table className='w-full min-w-[850px] text-left text-xs'>
                  {/* TABLE HEADER */}

                  <thead>
                    <tr className='bg-slate-50 text-slate-700'>
                      {teaTypeTableHeaders.map((header) => (
                        <th
                          key={header.key}
                          className={`px-3 py-3 font-semibold ${
                            header.align === "center"
                              ? "text-center"
                              : "text-left"
                          }`}
                        >
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* TABLE BODY */}

                  <tbody className='divide-y divide-slate-100'>
                    {teaTypeList.map((teaType, index) => (
                      <tr key={teaType.id}>
                        <td className='px-3 py-4'>{index + 1}</td>

                        <td className='px-3 py-4'>{teaType.code}</td>

                        <td className='px-3 py-4'>{teaType.teaTypeName}</td>

                        <td className='px-3 py-4'>{teaType.shortName}</td>

                        <td className='px-3 py-4'>
                          {teaType.processingMethod}
                        </td>

                        <td className='px-3 py-4'>
                          <span
                            className={`rounded px-2 py-1 text-[11px] font-semibold ${
                              teaType.status === "ACTIVE"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {statusOptions.find(
                              (status) => status.value === teaType.status,
                            )?.label || teaType.status}
                          </span>
                        </td>

                        <td className='px-3 py-4'>
                          <div className='flex justify-center gap-2'>
                            <button
                              type='button'
                              className='cursor-pointer rounded border border-emerald-200 p-1.5 text-emerald-700'
                            >
                              <Pencil className='h-3.5 w-3.5' />
                            </button>

                            <button
                              type='button'
                              className='cursor-pointer rounded border border-red-200 p-1.5 text-red-500'
                            >
                              <Trash2 className='h-3.5 w-3.5' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* =================================================
                  PAGINATION
              ================================================== */}

              <div className='flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-xs text-slate-500'>
                  Showing {pagination.showingFrom} to {pagination.showingTo} of{" "}
                  {pagination.totalEntries} entries
                </p>

                <div className='flex items-center gap-1'>
                  <button
                    type='button'
                    className='cursor-pointer rounded border border-slate-200 px-3 py-1.5 text-xs'
                  >
                    ‹
                  </button>

                  <button
                    type='button'
                    className='cursor-pointer rounded bg-emerald-700 px-3 py-1.5 text-xs text-white'
                  >
                    {pagination.currentPage}
                  </button>

                  <button
                    type='button'
                    className='cursor-pointer rounded border border-slate-200 px-3 py-1.5 text-xs'
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ADD NEW TEA TYPE MODAL
      ====================================================== */}

      {isTeaTypeModalOpen && (
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4'
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          {/* =================================================
              MODAL CONTAINER
          ================================================== */}

          <div className='w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl'>
            {/* =================================================
                MODAL HEADER
            ================================================== */}

            <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
              <div>
                <h2 className='text-base font-bold text-emerald-700'>
                  {pageConfig.addButtonLabel}
                </h2>

                <p className='mt-0.5 text-xs text-slate-500'>
                  Enter tea type information
                </p>
              </div>

              <button
                type='button'
                onClick={handleCloseModal}
                className='cursor-pointer rounded-md p-2 text-slate-500 hover:bg-slate-100'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            {/* =================================================
                MODAL FORM
            ================================================== */}

            <form onSubmit={handleModalSubmit(onModalSubmit)}>
              {/* =================================================
                  MODAL BODY
              ================================================== */}

              <div className='max-h-[75vh] overflow-y-auto p-5'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  {/* =================================================
                      TEA TYPE CODE
                  ================================================== */}

                  <div>
                    <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                      Tea Type Code
                      <span className='text-red-500'> *</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter tea type code'
                      maxLength={50}
                      {...registerModal("teaTypeCode", {
                        required: "Tea Type Code is required",
                      })}
                      className={`h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ${
                        modalErrors.teaTypeCode
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                    />

                    {modalErrors.teaTypeCode && (
                      <p className='mt-1 text-[11px] text-red-500'>
                        {modalErrors.teaTypeCode.message}
                      </p>
                    )}
                  </div>

                  {/* =================================================
                      TEA TYPE NAME
                  ================================================== */}

                  <div>
                    <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                      Tea Type Name
                      <span className='text-red-500'> *</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter tea type name'
                      maxLength={100}
                      {...registerModal("teaTypeName", {
                        required: "Tea Type Name is required",
                      })}
                      className={`h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ${
                        modalErrors.teaTypeName
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                    />

                    {modalErrors.teaTypeName && (
                      <p className='mt-1 text-[11px] text-red-500'>
                        {modalErrors.teaTypeName.message}
                      </p>
                    )}
                  </div>

                  {/* =================================================
                      SHORT NAME
                  ================================================== */}

                  <div>
                    <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                      Short Name
                    </label>

                    <input
                      type='text'
                      placeholder='Enter short name'
                      maxLength={50}
                      {...registerModal("shortName")}
                      className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none'
                    />
                  </div>

                  {/* =================================================
                      PROCESSING METHOD
                  ================================================== */}

                  <div>
                    <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                      Processing Method
                      <span className='text-red-500'> *</span>
                    </label>

                    <select
                      {...registerModal("processingMethod", {
                        required: "Processing Method is required",
                      })}
                      className={`h-10 w-full cursor-pointer rounded-md border bg-white px-3 text-sm outline-none ${
                        modalErrors.processingMethod
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                    >
                      <option value=''>Select processing method</option>

                      {processingMethodOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {modalErrors.processingMethod && (
                      <p className='mt-1 text-[11px] text-red-500'>
                        {modalErrors.processingMethod.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <div className='mt-4'>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Description
                  </label>

                  <textarea
                    rows='3'
                    maxLength={250}
                    placeholder='Enter description...'
                    {...registerModal("description")}
                    className='w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none'
                  />
                </div>

                {/* =================================================
                    APPLICABLE FOR
                ================================================== */}

                <div className='mt-4'>
                  <label className='mb-2 block text-xs font-semibold text-slate-700'>
                    Applicable For
                    <span className='text-red-500'> *</span>
                  </label>

                  <div className='flex flex-wrap gap-3'>
                    {applicableForOptions.map((option) => (
                      <label
                        key={option.value}
                        className='flex cursor-pointer items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-700'
                      >
                        <input
                          type='checkbox'
                          value={option.value}
                          {...registerModal("applicableFor", {
                            required: "Please select at least one option",
                          })}
                          className='h-4 w-4 cursor-pointer accent-emerald-600'
                        />

                        {option.label}
                      </label>
                    ))}
                  </div>

                  {modalErrors.applicableFor && (
                    <p className='mt-1 text-[11px] text-red-500'>
                      {modalErrors.applicableFor.message}
                    </p>
                  )}
                </div>

                {/* =================================================
                    STATUS
                ================================================== */}

                <div className='mt-4'>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Status
                    <span className='text-red-500'> *</span>
                  </label>

                  <select
                    {...registerModal("status", {
                      required: "Status is required",
                    })}
                    className={`h-10 w-full cursor-pointer rounded-md border bg-white px-3 text-sm outline-none ${
                      modalErrors.status ? "border-red-500" : "border-slate-300"
                    }`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {modalErrors.status && (
                    <p className='mt-1 text-[11px] text-red-500'>
                      {modalErrors.status.message}
                    </p>
                  )}
                </div>

                {/* =================================================
                    REMARKS
                ================================================== */}

                <div className='mt-4'>
                  <label className='mb-1.5 block text-xs font-semibold text-slate-700'>
                    Remarks
                    <span className='font-normal text-slate-400'>
                      {" "}
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    rows='3'
                    maxLength={250}
                    placeholder='Enter remarks...'
                    {...registerModal("remarks")}
                    className='w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none'
                  />
                </div>
              </div>

              {/* =================================================
                  MODAL FOOTER
              ================================================== */}

              <div className='flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-600'
                >
                  <X className='h-4 w-4' />

                  {pageConfig.cancelButtonLabel}
                </button>

                <button
                  type='submit'
                  className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-medium text-white'
                >
                  <Save className='h-4 w-4' />

                  {pageConfig.saveButtonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeaType;
