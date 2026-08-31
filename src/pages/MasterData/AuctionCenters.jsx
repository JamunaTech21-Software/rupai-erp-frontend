import React from "react";
import { useForm } from "react-hook-form";

import MasterDataTabs from "./MasterDataTabs";
import auctionCentersData from "../../data/MasterData/auctionCentersData";

import {
  Building2,
  Clock,
  ShieldCheck,
  X,
  Pencil,
  Plus,
  Download,
} from "lucide-react";

const AuctionCenters = () => {
  // =====================================================
  // REACT HOOK FORM
  // =====================================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // =====================================================
  // HANDLERS

  // =====================================================

  const handleAddNew = () => {
    console.log("Add New Auction Center clicked");
  };

  const handleEdit = (center) => {
    console.log("Edit Auction Center:", center);
  };

  const handleSave = (formData) => {
    console.log("Save Auction Center:", formData);
  };

  const handleCancel = () => {
    console.log("Cancel Auction Center clicked");
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleExport = () => {
    console.log(
      "Export Auction Centers:",
      auctionCentersData.otherCenters.data,
    );
  };

  // =====================================================
  // FORM SUBMIT
  // =====================================================

  const onSubmit = (formData) => {
    console.log("Auction Center Form Data:", formData);

    handleSave(formData);
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
            LEFT SIDE - AUCTION CENTER FORM
        ==================================================== */}

        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-6'>
          {/* ================= HEADER ================= */}

          <div className='mb-5'>
            <h2 className='text-sm font-bold text-emerald-700'>
              {auctionCentersData.form.title}
            </h2>
          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* =================================================
                  DYNAMIC FORM FIELDS
              ================================================== */}

              {auctionCentersData.form.fields.map((field) => {
                const isFullWidth = field.fullWidth;

                return (
                  <div
                    key={field.name}
                    className={isFullWidth ? "md:col-span-2" : ""}
                  >
                    {/* ================= LABEL ================= */}

                    <label className='mb-3 block text-[10px] font-semibold text-slate-700'>
                      {field.label}

                      {field.required && (
                        <span className='ml-1 text-red-500'>*</span>
                      )}
                    </label>

                    {/* =================================================
                        SELECT
                    ================================================== */}

                    {field.type === "select" && (
                      <>
                        <select
                          {...register(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          className={`h-9 w-full rounded-md border bg-white px-3 text-[11px] text-slate-700 outline-none ${
                            errors[field.name]
                              ? "border-red-400 focus:border-red-500"
                              : "border-slate-200 focus:border-emerald-500"
                          }`}
                        >
                          <option value=''>{field.placeholder}</option>

                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        {/* Validation Error */}

                        {errors[field.name] && (
                          <p className='mt-2 text-[9px] text-red-500'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </>
                    )}

                    {/* =================================================
                        TEXTAREA
                    ================================================== */}

                    {field.type === "textarea" && (
                      <>
                        <textarea
                          {...register(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          placeholder={field.placeholder}
                          rows={field.rows || 3}
                          className={`w-full resize-none rounded-md border bg-white px-3 py-2 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 ${
                            errors[field.name]
                              ? "border-red-400 focus:border-red-500"
                              : "border-slate-200 focus:border-emerald-500"
                          }`}
                        />

                        {errors[field.name] && (
                          <p className='mt-2 text-[9px] text-red-500'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </>
                    )}

                    {/* =================================================
                        DATE
                    ================================================== */}

                    {field.type === "date" && (
                      <>
                        <input
                          type='date'
                          {...register(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          className={`h-9 w-full rounded-md border bg-white px-3 text-[11px] text-slate-700 outline-none ${
                            errors[field.name]
                              ? "border-red-400 focus:border-red-500"
                              : "border-slate-200 focus:border-emerald-500"
                          }`}
                        />

                        {errors[field.name] && (
                          <p className='mt-1 text-[9px] text-red-500'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </>
                    )}

                    {/* =================================================
                        TIME
                    ================================================== */}

                    {field.type === "time" && (
                      <>
                        <div className='relative'>
                          <Clock className='absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400' />

                          <input
                            type='time'
                            {...register(field.name, {
                              required: field.required
                                ? `${field.label} is required`
                                : false,
                            })}
                            className={`h-9 w-full rounded-md border bg-white pl-9 pr-3 text-[11px] text-slate-700 outline-none ${
                              errors[field.name]
                                ? "border-red-400 focus:border-red-500"
                                : "border-slate-200 focus:border-emerald-500"
                            }`}
                          />
                        </div>

                        {errors[field.name] && (
                          <p className='mt-2 text-[9px] text-red-500'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </>
                    )}

                    {/* =================================================
                        TEXT / EMAIL / TEL
                    ================================================== */}

                    {["text", "email", "tel"].includes(field.type) && (
                      <>
                        <input
                          type={field.type}
                          {...register(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          placeholder={field.placeholder}
                          className={`h-9 w-full rounded-md border bg-white px-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 ${
                            errors[field.name]
                              ? "border-red-400 focus:border-red-500"
                              : "border-slate-200 focus:border-emerald-500"
                          }`}
                        />

                        {errors[field.name] && (
                          <p className='mt-2 text-[9px] text-red-500'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </>
                    )}

                    {/* =================================================
                        AUCTION DAYS
                    ================================================== */}

                    {field.type === "days" && (
                      <>
                        <div
                          className={`flex min-h-9 flex-wrap gap-2 rounded-md border bg-white p-2 ${
                            errors[field.name]
                              ? "border-red-400"
                              : "border-slate-200"
                          }`}
                        >
                          {field.options?.map((day) => (
                            <label
                              key={day.value}
                              className='flex cursor-pointer items-center gap-1.5 rounded bg-slate-50 px-2 py-2 text-[10px] text-slate-600'
                            >
                              <input
                                type='checkbox'
                                value={day.value}
                                {...register(field.name, {
                                  required: field.required
                                    ? `${field.label} is required`
                                    : false,
                                })}
                                className='h-3 w-3 accent-emerald-600'
                              />

                              {day.label}
                            </label>
                          ))}
                        </div>

                        {errors[field.name] && (
                          <p className='mt-2 text-[9px] text-red-500'>
                            {errors[field.name].message}
                          </p>
                        )}
                      </>
                    )}

                    {/* =================================================
                        FIELD NOTE
                    ================================================== */}

                    {field.note && (
                      <p className='mt-2 text-[9px] text-emerald-700'>
                        {field.note}
                      </p>
                    )}
                  </div>
                );
              })}

              {/* =================================================
                  REGULATORY AUTHORITY
              ================================================== */}

              {auctionCentersData.form.regulatoryAuthority && (
                <div className='rounded-lg border border-emerald-200 bg-emerald-50 p-3 md:col-span-2'>
                  {/* ================= HEADER ================= */}

                  <div className='mb-3 flex items-center gap-2'>
                    <ShieldCheck className='h-4 w-4 text-emerald-700' />

                    <h3 className='text-[11px] font-bold text-emerald-700'>
                      {auctionCentersData.form.regulatoryAuthority.title}
                    </h3>

                    {auctionCentersData.form.regulatoryAuthority.required && (
                      <span className='text-red-500'>*</span>
                    )}
                  </div>

                  {/* ================= SELECT ================= */}

                  <select
                    {...register("regulatoryAuthority", {
                      required: auctionCentersData.form.regulatoryAuthority
                        .required
                        ? `${auctionCentersData.form.regulatoryAuthority.title} is required`
                        : false,
                    })}
                    className={`h-9 w-full rounded-md border bg-white px-3 text-[11px] text-slate-700 outline-none ${
                      errors.regulatoryAuthority
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-200 focus:border-emerald-500"
                    }`}
                  >
                    <option value=''>
                      {auctionCentersData.form.regulatoryAuthority.placeholder}
                    </option>

                    {auctionCentersData.form.regulatoryAuthority.options?.map(
                      (option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ),
                    )}
                  </select>

                  {/* Validation Error */}

                  {errors.regulatoryAuthority && (
                    <p className='mt-1 text-[9px] text-red-500'>
                      {errors.regulatoryAuthority.message}
                    </p>
                  )}

                  {/* ================= NOTE ================= */}

                  {auctionCentersData.form.regulatoryAuthority.note && (
                    <p className='mt-3 text-[9px] text-emerald-700'>
                      {auctionCentersData.form.regulatoryAuthority.note}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* =================================================
                FORM FOOTER
            ================================================== */}

            <div className='mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              {/* ================= MANDATORY ================= */}

              <p className='text-[9px] font-medium text-red-500'>
                {auctionCentersData.form.mandatoryText}
              </p>

              {/* ================= BUTTONS ================= */}

              <div className='flex flex-wrap gap-2'>
                {/* CANCEL */}

                <button
                  type='button'
                  onClick={handleCancel}
                  className='flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-[11px] font-medium text-slate-600 hover:bg-slate-50'
                >
                  <X className='h-3.5 w-3.5' />

                  {auctionCentersData.form.buttons.cancel}
                </button>

                {/* SAVE */}

                <button
                  type='submit'
                  className='flex h-9 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-[11px] font-medium text-white hover:bg-emerald-800'
                >
                  <Building2 className='h-3.5 w-3.5' />

                  {auctionCentersData.form.buttons.save}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}

        <div className='space-y-3 xl:col-span-6'>
          {/* =================================================
              AUCTION CENTER SUMMARY
          ================================================== */}

          <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
            {/* ================= HEADER ================= */}

            <div className='mb-3'>
              <h2 className='text-sm font-bold text-emerald-700'>
                {auctionCentersData.centerSummary.title}
              </h2>
            </div>

            {/* ================= SUMMARY ITEMS ================= */}

            <div className='space-y-2'>
              {auctionCentersData.centerSummary.items.map((item) => (
                <div
                  key={item.id}
                  className='grid grid-cols-[130px_15px_1fr] items-start gap-2 border-b border-slate-100 pb-2 last:border-0'
                >
                  {/* LABEL */}

                  <span className='text-[10px] font-medium text-slate-500'>
                    {item.label}
                  </span>

                  {/* COLON */}

                  <span className='text-[10px] text-slate-400'>:</span>

                  {/* VALUE */}

                  <span className='break-words text-right text-[10px] font-semibold text-slate-700'>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================
              OTHER AUCTION CENTERS
          ================================================== */}

          <div className='rounded-lg border border-slate-200 bg-white p-2 shadow-sm'>
            {/* ================= HEADER ================= */}

            <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
              <h2 className='text-sm font-bold text-emerald-700'>
                {auctionCentersData.otherCenters.title}
              </h2>

              <button
                type='button'
                onClick={handleAddNew}
                className='flex h-8 items-center gap-1.5 rounded-md bg-emerald-700 px-3 text-[10px] font-medium text-white hover:bg-emerald-800'
              >
                <Plus className='h-3.5 w-3.5' />

                {auctionCentersData.otherCenters.addButton}
              </button>
            </div>

            {/* =================================================
                TABLE
            ================================================== */}

            <div className='overflow-x-auto'>
              <table className='w-full min-w-[650px]'>
                {/* ================= TABLE HEADER ================= */}

                <thead>
                  <tr className='border-b border-slate-100 bg-slate-50'>
                    {auctionCentersData.otherCenters.tableHeaders.map(
                      (header) => (
                        <th
                          key={header.key}
                          className='px-2 py-3 text-left text-[9px] font-semibold text-slate-600'
                        >
                          {header.label}
                        </th>
                      ),
                    )}

                    <th className='px-2 py-3 text-center text-[9px] font-semibold text-slate-600'>
                      Action
                    </th>
                  </tr>
                </thead>

                {/* ================= TABLE BODY ================= */}

                <tbody>
                  {auctionCentersData.otherCenters.data.map((center, index) => (
                    <tr
                      key={center.id || index}
                      className='border-b border-slate-100 last:border-0 hover:bg-slate-50'
                    >
                      {/* DYNAMIC COLUMNS */}

                      {auctionCentersData.otherCenters.tableHeaders.map(
                        (header) => (
                          <td
                            key={header.key}
                            className='px-2 py-3 text-[9px] text-slate-600'
                          >
                            {center[header.key]}
                          </td>
                        ),
                      )}

                      {/* ACTION */}

                      <td className='px-2 py-3'>
                        <div className='flex justify-center'>
                          <button
                            type='button'
                            onClick={() => handleEdit(center)}
                            className='flex h-7 w-7 items-center justify-center rounded-md border border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                            title='Edit'
                          >
                            <Pencil className='h-3.5 w-3.5' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* =================================================
                TABLE FOOTER
            ================================================== */}

            <div className='mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              {/* FOOTER TEXT */}

              <span className='text-[10px] text-slate-500'>
                {auctionCentersData.otherCenters.footerText}
              </span>

              {/* EXPORT */}

              <button
                type='button'
                onClick={handleExport}
                className='flex h-8 items-center justify-center gap-2 rounded-md border border-emerald-200 px-3 text-[10px] font-medium text-emerald-700 hover:bg-emerald-50'
              >
                <Download className='h-3.5 w-3.5' />

                {auctionCentersData.otherCenters.exportButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCenters;
