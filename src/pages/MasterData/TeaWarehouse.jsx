import React from "react";
import { useForm } from "react-hook-form";
import { Phone, Plus, Trash2, Save, X, Warehouse } from "lucide-react";

import MasterDataTabs from "./MasterDataTabs";
import teaWarehouseData from "../../data/MasterData/teaWarehouseData";

const TeaWarehouse = () => {
  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // =========================================================
  // HANDLERS

  // =========================================================

  const onSubmit = () => {
  };

  const handleAddMobile = () => {
  };

  const handleDeleteMobile = () => {
  };

  const handleCancel = () => {
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

      <div className='grid grid-cols-1 gap-4 xl:grid-cols-12'>
        {/* ===================================================
            LEFT SIDE - WAREHOUSE FORM
        ==================================================== */}

        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-8'>
          {/* ================= HEADER ================= */}

          <div className='mb-3 flex items-center gap-2 border-b border-slate-100 pb-3'>
            <Warehouse className='h-5 w-5 text-emerald-700' />

            <h2 className='text-sm font-bold text-emerald-700'>
              {teaWarehouseData.form.title}
            </h2>
          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* =================================================
                BASIC WAREHOUSE INFORMATION
            ================================================== */}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2  xl:grid-cols-3'>
              {teaWarehouseData.form.fields.map((field) => (
                <div
                  key={field.name}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  {/* LABEL */}

                  <label className='mb-2 block text-[10px] font-semibold text-slate-700'>
                    {field.label}

                    {field.required && (
                      <span className='ml-1 text-red-500'>*</span>
                    )}
                  </label>

                  {/* TEXTAREA */}

                  {field.type === "textarea" && (
                    <div>
                      <textarea
                        {...register(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                          maxLength: field.maxLength
                            ? {
                                value: field.maxLength,
                                message: `Maximum ${field.maxLength} characters allowed`,
                              }
                            : undefined,
                        })}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        className='min-h-[80px] w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 outline-none focus:border-emerald-500'
                      />

                      {field.maxLength && (
                        <div className='mt-1 text-right text-[9px] text-slate-400'>
                          Max {field.maxLength} characters
                        </div>
                      )}
                    </div>
                  )}

                  {/* SELECT */}

                  {field.type === "select" && (
                    <select
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-emerald-500'
                    >
                      <option value=''>{field.placeholder}</option>

                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* TEXT / NUMBER */}

                  {(field.type === "text" || field.type === "number") && (
                    <input
                      type={field.type}
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      placeholder={field.placeholder}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-emerald-500'
                    />
                  )}

                  {/* ERROR */}

                  {errors[field.name] && (
                    <p className='mt-1 text-[9px] text-red-500'>
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* =================================================
                PHONE NUMBER
            ================================================== */}

            <div className='mt-3 border-t border-slate-100 pt-2'>
              <div className='mb-4 flex items-center gap-2'>
                <Phone className='h-4 w-4 text-emerald-700' />

                <h3 className='text-xs font-bold text-emerald-700'>
                  {teaWarehouseData.phoneSection.title}
                </h3>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {teaWarehouseData.phoneSection.fields.map((field) => (
                  <div key={field.name}>
                    <label className='mb-2 block text-[10px] font-semibold text-slate-700'>
                      {field.label}

                      {field.required && (
                        <span className='ml-1 text-red-500'>*</span>
                      )}
                    </label>

                    <input
                      type={field.type}
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      placeholder={field.placeholder}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-emerald-500'
                    />

                    {errors[field.name] && (
                      <p className='mt-1 text-[9px] text-red-500'>
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                MOBILE NUMBERS & CONTACT PERSONS
            ================================================== */}

            <div className='mt-3 border-t border-slate-100 pt-2'>
              {/* HEADER */}

              <div className='mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <h3 className='text-xs font-bold text-emerald-700'>
                  {teaWarehouseData.mobileContacts.title}
                </h3>

                <button
                  type='button'
                  onClick={handleAddMobile}
                  className='flex h-8 w-full items-center justify-center gap-1.5 rounded-md border border-emerald-200 px-3 text-[10px] font-medium text-emerald-700 hover:bg-emerald-50 sm:w-auto'
                >
                  <Plus className='h-3.5 w-3.5' />

                  {teaWarehouseData.mobileContacts.addButton}
                </button>
              </div>

              {/* TABLE */}

              <div className='overflow-x-auto'>
                <table className='w-full '>
                  {/* TABLE HEADER */}

                  <thead>
                    <tr className='border-b border-slate-100 bg-slate-50'>
                      {teaWarehouseData.mobileContacts.tableHeaders.map(
                        (header) => (
                          <th
                            key={header.key}
                            className='px-2 py-2.5 text-left text-[9px] font-semibold text-slate-600'
                          >
                            {header.label}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>

                  {/* TABLE BODY */}

                  <tbody>
                    {teaWarehouseData.mobileContacts.data.map((contact) => (
                      <tr
                        key={contact.id}
                        className='border-b border-slate-100 last:border-0'
                      >
                        {/* SL */}

                        <td className='px-2 py-1'>
                          <span className='text-[9px] text-slate-600'>
                            {contact.sl}
                          </span>
                        </td>

                        {/* MOBILE NUMBER */}

                        <td className='px-2 py-1'>
                          <input
                            type='text'
                            defaultValue={contact.number}
                            className='h-8 w-full rounded-md border border-slate-200 px-2 text-[9px] text-slate-700 outline-none focus:border-emerald-500'
                          />
                        </td>

                        {/* CONTACT PERSON */}

                        <td className='px-2 py-1'>
                          <input
                            type='text'
                            defaultValue={contact.contactPerson}
                            className='h-8 w-full rounded-md border border-slate-200 px-2 text-[9px] text-slate-700 outline-none focus:border-emerald-500'
                          />
                        </td>

                        {/* DESIGNATION */}

                        <td className='px-2 py-1'>
                          <input
                            type='text'
                            defaultValue={contact.designation}
                            className='h-8 w-full rounded-md border border-slate-200 px-2 text-[9px] text-slate-700 outline-none focus:border-emerald-500'
                          />
                        </td>

                        {/* TYPE */}

                        <td className='px-2 py-1'>
                          <select
                            defaultValue={contact.type}
                            className='h-8 w-full rounded-md border border-slate-200 bg-white px-2 text-[9px] text-slate-700 outline-none focus:border-emerald-500'
                          >
                            {teaWarehouseData.mobileContacts.typeOptions.map(
                              (option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ),
                            )}
                          </select>
                        </td>

                        {/* PRIMARY */}

                        <td className='px-2 py-1 text-center'>
                          <input
                            type='radio'
                            name='primaryContact'
                            defaultChecked={contact.primary}
                            className='h-4 w-4 accent-emerald-600'
                          />
                        </td>

                        {/* ACTION */}

                        <td className='px-2 py-1 text-center'>
                          <button
                            type='button'
                            onClick={() => handleDeleteMobile(contact)}
                            className='flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50'
                            title={teaWarehouseData.actions.delete}
                          >
                            <Trash2 className='h-3.5 w-3.5' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* NOTE */}

              <p className='mt-3 text-[9px] text-slate-500'>
                <span className='font-semibold text-slate-600'>Note:</span>{" "}
                {teaWarehouseData.mobileContacts.note}
              </p>
            </div>

            {/* =================================================
                FORM FOOTER
            ================================================== */}

            <div className='mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              {/* MANDATORY */}

              <span className='text-[9px] font-medium text-red-500'>
                {teaWarehouseData.footer.mandatoryText}
              </span>

              {/* BUTTONS */}

              <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row'>
                <button
                  type='button'
                  onClick={handleCancel}
                  className='flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-slate-200 px-4 text-[10px] font-medium text-slate-600 hover:bg-slate-50 sm:w-auto'
                >
                  <X className='h-3.5 w-3.5' />

                  {teaWarehouseData.footer.cancelButton}
                </button>

                <button
                  type='submit'
                  className='flex h-9 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 px-4 text-[10px] font-medium text-white hover:bg-emerald-800 sm:w-auto'
                >
                  <Save className='h-3.5 w-3.5' />

                  {teaWarehouseData.footer.submitButton}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}

        <div className='space-y-4 xl:col-span-4'>
          {/* =================================================
              WAREHOUSE SUMMARY
          ================================================== */}

          <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
            {/* HEADER */}

            <div className='mb-5 flex items-center gap-2 border-b border-slate-100 pb-3'>
              <Warehouse className='h-4 w-4 text-emerald-700' />

              <h2 className='text-[14px] font-bold text-emerald-700'>
                {teaWarehouseData.summary.title}
              </h2>
            </div>

            {/* SUMMARY DATA */}

            <div className='space-y-4'>
              {teaWarehouseData.summary.fields.map((field) => (
                <div
                  key={field.key}
                  className='grid grid-cols-[125px_15px_1fr] gap-2 text-[14px]'
                >
                  {/* LABEL */}

                  <span className='font-medium text-[14px] text-slate-600'>
                    {field.label}
                  </span>

                  {/* COLON */}

                  <span className='text-slate-400'>:</span>

                  {/* VALUE */}

                  <span className='font-medium text-slate-700'>
                    {teaWarehouseData.summaryData[field.key] ?? "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaWarehouse;
