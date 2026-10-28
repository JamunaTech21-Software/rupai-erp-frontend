import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MasterDataTabs from "./MasterDataTabs";
import { seasonData } from "../../data/MasterData/seasonData";

import {
  CalendarDays,
  Leaf,
  CircleCheck,
  Clock3,
  Factory,
  Banknote,
  Info,
} from "lucide-react";

const iconMap = {
  CalendarDays,
  Leaf,
  CircleCheck,
  Clock3,
  Factory,
  Banknote,
};
const Season = () => {
  const [isSeasonModalOpen, setIsSeasonModalOpen] = useState(false);
  // =========================================================
  // REACT HOOK FORM
  // =========================================================
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // MOdal form
  const {
    register: registerSeason,
    handleSubmit: handleSeasonSubmit,
    reset: resetSeason,
    formState: { errors: seasonErrors },
  } = useForm();
  // =========================================================
  // FORM SUBMIT
  // =========================================================
  const onSubmit = () => {
  };

  return (
    <div className='space-y-4'>
      {/* =========================================================
          MASTER DATA TABS
      ========================================================= */}
      <MasterDataTabs />

      {/* =========================================================
          SEASON PAGE
      ========================================================= */}
      <div className='space-y-4'>
        {/* =======================================================
            SEASON LIST
        ======================================================= */}
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            {/* Title */}
            <h2 className='text-sm font-bold text-emerald-700'>
              {seasonData.seasonList.title}
            </h2>

            {/* Header Actions */}
            <div className='flex flex-col gap-2 sm:flex-row'>
              {/* Search */}
              <input
                type='text'
                placeholder={seasonData.seasonList.search.placeholder}
                className='h-9 w-full rounded-md border border-slate-200 px-3 text-xs outline-none focus:border-emerald-500 sm:w-44'
              />

              {/* Filter */}
              <button
                type='button'
                className='h-9 cursor-pointer w-full rounded-md border border-emerald-200 px-4 text-xs font-medium text-emerald-700 hover:bg-emerald-50 sm:w-20'
              >
                {seasonData.seasonList.filter.label}
              </button>

              {/* Add New Season */}
              <button
                type='button'
                onClick={() => setIsSeasonModalOpen(true)}
                className='h-9 cursor-pointer  rounded-md bg-emerald-700 px-2 text-xs font-medium text-white hover:bg-emerald-800 sm:w-32'
              >
                + {seasonData.seasonList.addButton.label}
              </button>
            </div>
          </div>

          {/* =========================================================
              TABLE
          ========================================================= */}

          <div className='overflow-x-auto'>
            <table className='w-full min-w-[1000px] border-collapse'>
              {/* =====================================================
                  TABLE HEADER
              ===================================================== */}
              <thead>
                <tr className='bg-slate-50'>
                  {seasonData.seasonList.tableHeaders.map((header) => (
                    <th
                      key={header.key}
                      className='px-3 py-3 text-left text-[11px] font-semibold text-slate-600'
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* =====================================================
                  TABLE BODY
              ===================================================== */}
              <tbody>
                {seasonData.seasonList.seasons.map((season, index) => (
                  <tr
                    key={season.id}
                    className='border-b border-slate-100 hover:bg-slate-50'
                  >
                    {/* SL */}
                    <td className='px-3 py-3 text-[11px] text-slate-700'>
                      {index + 1}
                    </td>

                    {/* Season Name */}
                    <td className='px-3 py-3 text-[11px] font-medium text-slate-700'>
                      <div className='flex items-center gap-2'>
                        <span>{season.seasonName}</span>

                        {/* Current Badge */}
                        {season.current && (
                          <span className='rounded bg-green-50 px-2 py-0.5 text-[9px] font-semibold text-green-600'>
                            Current
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Season Code */}
                    <td className='px-3 py-3 text-[11px] text-slate-600'>
                      {season.seasonCode}
                    </td>

                    {/* Start Date */}
                    <td className='px-3 py-3 text-[11px] text-slate-600'>
                      {season.startDate}
                    </td>

                    {/* End Date */}
                    <td className='px-3 py-3 text-[11px] text-slate-600'>
                      {season.endDate}
                    </td>

                    {/* Type */}
                    <td className='px-3 py-3 text-[11px] text-slate-600'>
                      {season.type}
                    </td>

                    {/* Status */}
                    <td className='px-3 py-3'>
                      <span
                        className={`rounded px-2 py-1 text-[9px] font-semibold ${
                          season.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : season.status === "Completed"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-red-50 text-red-600"
                        }`}
                      >
                        {season.status}
                      </span>
                    </td>

                    {/* Created By */}
                    <td className='px-3 py-3 text-[11px] text-slate-600'>
                      {season.createdBy}
                    </td>

                    {/* Created On */}
                    <td className='px-3 py-3 text-[11px] text-slate-600'>
                      {season.createdOn}
                    </td>

                    {/* Action */}
                    <td className='px-3 py-3'>
                      <div className='flex items-center gap-2'>
                        {/* Edit */}
                        <button
                          type='button'
                          title={seasonData.seasonList.actions.edit.label}
                          className='flex cursor-pointer h-7 w-7 items-center justify-center rounded border border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                        >
                          ✎
                        </button>

                        {/* Delete */}
                        <button
                          type='button'
                          title={seasonData.seasonList.actions.delete.label}
                          className='flex cursor-pointer h-7 w-7 items-center justify-center rounded border border-red-200 text-red-500 hover:bg-red-50'
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =========================================================
              PAGINATION
          ========================================================= */}

          <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            {/* Showing Info */}
            <p className='text-xs text-slate-500'>
              Showing {seasonData.seasonList.pagination.showingFrom} to{" "}
              {seasonData.seasonList.pagination.showingTo} of{" "}
              {seasonData.seasonList.pagination.totalEntries} entries
            </p>

            {/* Pagination Controls */}
            <div className='flex items-center gap-2'>
              {/* Previous */}
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-xs text-slate-500 hover:bg-slate-50'
              >
                ‹
              </button>

              {/* Current Page */}
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded bg-emerald-700 text-xs font-semibold text-white'
              >
                {seasonData.seasonList.pagination.currentPage}
              </button>

              {/* Next */}
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded border border-slate-200 text-xs text-slate-500 hover:bg-slate-50'
              >
                ›
              </button>

              {/* Per Page */}
              <button
                type='button'
                className='flex h-8 items-center justify-center rounded border border-slate-200 px-3 text-xs text-slate-600'
              >
                {seasonData.seasonList.pagination.perPage} / page
              </button>
            </div>
          </div>
        </div>

        {/* =======================================================
            DETAILS + OVERVIEW
        ======================================================= */}
        <div className='grid grid-cols-1 gap-4 xl:grid-cols-7'>
          {/* =====================================================
              SEASON DETAILS
          ===================================================== */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-4'
          >
            {/* =================================================
                    HEADER
                ================================================= */}
            <div className='mb-5 flex items-center justify-between'>
              <h2 className='text-sm font-bold text-emerald-700'>
                {seasonData.seasonDetails.title}
              </h2>

              <button
                type='button'
                onClick={() => reset()}
                className='flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50'
              >
                {seasonData.seasonDetails.resetButton.label}
              </button>
            </div>

            {/* =================================================
                    FORM FIELDS
                ================================================= */}
            <div className='grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2 xl:grid-cols-3'>
              {seasonData.seasonDetails.fields.map((field) => (
                <div key={field.name} className='min-w-0'>
                  {/* Label */}
                  <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>
                    {field.label}

                    {field.required && (
                      <span className='ml-1 text-red-500'>*</span>
                    )}
                  </label>

                  {/* ============================================
                        TEXT INPUT
                    ============================================ */}
                  {field.type === "text" && (
                    <input
                      type='text'
                      placeholder={field.placeholder}
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    />
                  )}

                  {/* ============================================
                            DATE INPUT
                        ============================================ */}
                  {field.type === "date" && (
                    <input
                      type='date'
                      placeholder={field.placeholder}
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    />
                  )}

                  {/* ============================================
                            SEASON TYPE SELECT
                        ============================================ */}
                  {field.name === "seasonType" && (
                    <select
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    >
                      <option value=''>{field.placeholder}</option>

                      {seasonData.seasonDetails.seasonTypeOptions.map(
                        (option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>
                  )}

                  {/* ============================================
                        STATUS SELECT
                    ============================================ */}
                  {field.name === "status" && (
                    <select
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    >
                      <option value=''>{field.placeholder}</option>

                      {seasonData.seasonDetails.statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* ============================================
                        VALIDATION ERROR
                    ============================================ */}
                  {errors[field.name] && (
                    <p className='mt-1 text-[10px] text-red-500'>
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* =================================================
                    DESCRIPTION
                ================================================= */}
            <div className='mt-4'>
              <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>
                {seasonData.seasonDetails.description.label}
              </label>

              <textarea
                rows={3}
                maxLength={seasonData.seasonDetails.description.maxLength}
                placeholder={seasonData.seasonDetails.description.placeholder}
                {...register(seasonData.seasonDetails.description.name)}
                className='w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
              />
            </div>

            {/* =================================================
                    REMARKS
                ================================================= */}
            <div className='mt-4'>
              <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>
                {seasonData.seasonDetails.remarks.label}
              </label>

              <textarea
                rows={3}
                maxLength={seasonData.seasonDetails.remarks.maxLength}
                placeholder={seasonData.seasonDetails.remarks.placeholder}
                {...register(seasonData.seasonDetails.remarks.name)}
                className='w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
              />
            </div>

            {/* =================================================
                    FOOTER
                ================================================= */}
            <div className='mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between'>
              {/* Created Information */}
              <div className='text-[9px] leading-5 text-slate-500'>
                Created On :{" "}
                <span className='font-medium text-slate-700'>
                  {seasonData.seasonDetails.selectedSeason.createdOn}
                </span>
                <span className='mx-2 text-slate-300'>|</span>
                Created By :{" "}
                <span className='font-medium text-slate-700'>
                  {seasonData.seasonDetails.selectedSeason.createdBy}
                </span>
              </div>

              {/* Buttons */}
              <div className='flex w-full gap-2 sm:w-auto'>
                {/* Cancel */}
                <button
                  type='button'
                  onClick={() => reset()}
                  className='flex-1 cursor-pointer rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 sm:flex-none'
                >
                  {seasonData.seasonDetails.footer.cancelButton.label}
                </button>

                {/* Submit */}
                <button
                  type='submit'
                  className='flex-1 cursor-pointer rounded-md bg-emerald-700 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-800 sm:flex-none'
                >
                  {seasonData.seasonDetails.footer.submitButton.label}
                </button>
              </div>
            </div>
          </form>

          {/* add session modal */}
          {isSeasonModalOpen && (
            <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6'>
              <form
                onSubmit={handleSeasonSubmit(() => {
                })}
                className='w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl'
              >
                {/* =====================================================
          MODAL HEADER
      ====================================================== */}
                <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
                  <div>
                    <h2 className='text-sm font-bold text-emerald-700'>
                      Add Season
                    </h2>

                    <p className='mt-1 text-[10px] text-slate-500'>
                      Create a new season
                    </p>
                  </div>

                  <button
                    type='button'
                    onClick={() => {
                      resetSeason();
                      setIsSeasonModalOpen(false);
                    }}
                    className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100'
                  >
                    ✕
                  </button>
                </div>

                {/* =====================================================
          MODAL BODY
      ====================================================== */}
                <div className='max-h-[70vh] overflow-y-auto p-5'>
                  <div className='grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2'>
                    {seasonData.seasonDetails.fields.map((field) => (
                      <div key={field.name} className='min-w-0'>
                        {/* Label */}
                        <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>
                          {field.label}

                          {field.required && (
                            <span className='ml-1 text-red-500'>*</span>
                          )}
                        </label>

                        {/* =================================================
                  TEXT INPUT
              ================================================== */}
                        {field.type === "text" && (
                          <input
                            type='text'
                            placeholder={field.placeholder}
                            {...registerSeason(field.name, {
                              required: field.required
                                ? `${field.label} is required`
                                : false,
                            })}
                            className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                          />
                        )}

                        {/* =================================================
                  DATE INPUT
              ================================================== */}
                        {field.type === "date" && (
                          <input
                            type='date'
                            {...registerSeason(field.name, {
                              required: field.required
                                ? `${field.label} is required`
                                : false,
                            })}
                            className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                          />
                        )}

                        {/* =================================================
                  SEASON TYPE
              ================================================== */}
                        {field.name === "seasonType" && (
                          <select
                            {...registerSeason(field.name, {
                              required: field.required
                                ? `${field.label} is required`
                                : false,
                            })}
                            className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                          >
                            <option value=''>{field.placeholder}</option>

                            {seasonData.seasonDetails.seasonTypeOptions.map(
                              (option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ),
                            )}
                          </select>
                        )}

                        {/* =================================================
                  STATUS
              ================================================== */}
                        {field.name === "status" && (
                          <select
                            {...registerSeason(field.name, {
                              required: field.required
                                ? `${field.label} is required`
                                : false,
                            })}
                            className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                          >
                            <option value=''>{field.placeholder}</option>

                            {seasonData.seasonDetails.statusOptions.map(
                              (option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ),
                            )}
                          </select>
                        )}

                        {/* Validation Error */}
                        {seasonErrors[field.name] && (
                          <p className='mt-1 text-[10px] text-red-500'>
                            {seasonErrors[field.name].message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* =====================================================
            DESCRIPTION
        ====================================================== */}
                  <div className='mt-4'>
                    <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>
                      {seasonData.seasonDetails.description.label}
                    </label>

                    <textarea
                      rows={3}
                      maxLength={seasonData.seasonDetails.description.maxLength}
                      placeholder={
                        seasonData.seasonDetails.description.placeholder
                      }
                      {...registerSeason(
                        seasonData.seasonDetails.description.name,
                      )}
                      className='w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    />
                  </div>

                  {/* =====================================================
            REMARKS
        ====================================================== */}
                  <div className='mt-4'>
                    <label className='mb-1.5 block text-[11px] font-semibold text-slate-700'>
                      {seasonData.seasonDetails.remarks.label}
                    </label>

                    <textarea
                      rows={3}
                      maxLength={seasonData.seasonDetails.remarks.maxLength}
                      placeholder={seasonData.seasonDetails.remarks.placeholder}
                      {...registerSeason(seasonData.seasonDetails.remarks.name)}
                      className='w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    />
                  </div>
                </div>

                {/* =====================================================
          MODAL FOOTER
      ====================================================== */}
                <div className='flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end'>
                  <button
                    type='button'
                    onClick={() => {
                      resetSeason();
                      setIsSeasonModalOpen(false);
                    }}
                    className='w-full cursor-pointer rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 sm:w-auto'
                  >
                    Cancel
                  </button>

                  <button
                    type='submit'
                    className='w-full cursor-pointer rounded-md bg-emerald-700 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-800 sm:w-auto'
                  >
                    Save Season
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =====================================================
              SEASON OVERVIEW
          ===================================================== */}
          {/* =========================================================
                    SEASON OVERVIEW
                ========================================================= */}
          <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-3'>
            {/* Header */}
            <div className='mb-5'>
              <h2 className='text-sm font-bold text-emerald-700'>
                {seasonData.seasonOverview.title}
              </h2>
            </div>

            {/* =========================================================
                    OVERVIEW CARDS
                ========================================================= */}
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {seasonData.seasonOverview.cards.map((card) => {
                // JSON থেকে icon name নেওয়া হচ্ছে
                const Icon = iconMap[card.icon] || Info;

                return (
                  <div
                    key={card.id}
                    className='min-h-[95px] rounded-lg border border-slate-100 bg-white p-3'
                  >
                    <div className='flex items-center gap-3'>
                      {/* =================================================
                                ICON
                            ================================================= */}
                      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50'>
                        <Icon className='h-5 w-5 text-emerald-600' />
                      </div>

                      {/* =================================================
                                CARD CONTENT
                            ================================================= */}
                      <div className='min-w-0 flex-1'>
                        <p className='mb-2 text-[10px] font-medium text-slate-500'>
                          {card.title}
                        </p>

                        <div className='flex items-baseline gap-1'>
                          <p className='text-lg font-bold text-slate-800'>
                            {card.value}
                          </p>

                          {card.unit && (
                            <span className='text-[9px] text-slate-500'>
                              {card.unit}
                            </span>
                          )}
                        </div>

                        <p className='mt-1 text-[9px] text-slate-500'>
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* =========================================================
                    BOTTOM NOTICE
                ========================================================= */}
            <div className='mt-4 rounded-lg bg-slate-50 p-3'>
              <div className='flex items-start gap-2'>
                {/* Notice Icon */}
                <div className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white'>
                  <Info className='h-3 w-3 text-emerald-600' />
                </div>

                {/* Notice Message */}
                <p className='text-[10px] leading-5 text-slate-600'>
                  {seasonData.seasonOverview.notice.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Season;
