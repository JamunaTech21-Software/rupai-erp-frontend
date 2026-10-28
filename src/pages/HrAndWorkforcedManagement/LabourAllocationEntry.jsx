import React from "react";
import { useForm } from "react-hook-form";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import { labourAllocationEntryData } from "../../data/HrWorkforceData/labourAllocationEntryData";

import {
  ArrowLeft,
  Save,
  CircleCheck,
  Clipboard,
  Briefcase,
  UserCheck,
  Users,
  Search,
  Plus,
  Clock,
  BriefcaseBusiness,
  Wallet,
  FileText,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

const actionIconMap = {
  arrowLeft: ArrowLeft,
  save: Save,
  circleCheck: CircleCheck,
  plus: Plus,
};
const LabourAllocationEntry = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = () => {

    reset();
  };

  return (
    <div className='space-y-4'>
      {/* HR & WORKFORCE TABS */}
      <HrWorkforceTabs />

      {/* MAIN FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        {/* TOP ACTION BAR */}
        <div className='flex min-h-12 flex-wrap items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm'>
          {labourAllocationEntryData.topActions.map((action) => {
            const Icon = actionIconMap[action.iconKey];

            return (
              <button
                key={action.id}
                type='button'
                className={
                  action.variant === "primary"
                    ? "inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-green-800 px-4 text-xs font-semibold text-white transition hover:bg-green-900  cursor-pointer"
                    : "inline-flex h-9 items-center cursor-pointer justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-xs font-medium text-gray-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-800"
                }
              >
                {Icon && <Icon size={15} strokeWidth={2} />}

                <span>{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================
                ROW 1
            ========================================================== */}
        <div className='grid grid-cols-1 gap-2 xl:grid-cols-12'>
          {/* LEFT AREA */}
          <div className='space-y-3 xl:col-span-9'>
            {/* 1. ALLOCATION INFORMATION */}

            <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
              {/* HEADER */}
              <div className='mb-3 flex items-center gap-2'>
                <Clipboard size={16} className='text-green-700' />

                <h2 className='text-sm font-semibold text-green-800'>
                  1. {labourAllocationEntryData.allocationInformation.title}
                </h2>
              </div>

              {/* FIELDS */}
              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7'>
                {labourAllocationEntryData.allocationInformation.fields.map(
                  (field) => (
                    <div key={field.id}>
                      <label className='mb-1 block text-[11px] font-medium text-gray-700'>
                        {field.label}

                        {field.required && (
                          <span className='ml-1 text-red-500'>*</span>
                        )}
                      </label>

                      {/* TEXT */}
                      {field.type === "text" && (
                        <input
                          type='text'
                          {...register(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          placeholder={field.placeholder}
                          defaultValue={field.defaultValue || ""}
                          disabled={field.disabled}
                          className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                        />
                      )}

                      {/* DATE */}
                      {field.type === "date" && (
                        <input
                          type='date'
                          {...register(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          defaultValue={field.defaultValue || ""}
                          className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                        />
                      )}

                      {/* SELECT */}
                      {field.type === "select" && (
                        <select
                          {...register(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                        >
                          <option value=''>{field.placeholder}</option>

                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* 2 + 3 SECTION */}
            <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
              {/* 2. TASK / WORK INFORMATION */}
              <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
                <div className='mb-3 flex items-center gap-2'>
                  <Briefcase size={16} className='text-green-700' />

                  <h2 className='text-sm font-semibold text-green-800'>
                    2. {labourAllocationEntryData.taskWorkInformation.title}
                  </h2>
                </div>

                <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5'>
                  {labourAllocationEntryData.taskWorkInformation.fields.map(
                    (field) => (
                      <div
                        key={field.id}
                        className={
                          field.type === "textarea"
                            ? "sm:col-span-2 lg:col-span-5"
                            : ""
                        }
                      >
                        <label className='mb-1 block text-[11px] font-medium text-gray-700'>
                          {field.label}

                          {field.required && (
                            <span className='ml-1 text-red-500'>*</span>
                          )}
                        </label>

                        {/* SELECT */}
                        {field.type === "select" && (
                          <select
                            {...register(field.name, {
                              required: field.required
                                ? `${field.label} is required`
                                : false,
                            })}
                            className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-green-700'
                          >
                            <option value=''>{field.placeholder}</option>

                            {field.options?.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* NUMBER */}
                        {field.type === "number" && (
                          <input
                            type='number'
                            {...register(field.name, {
                              required: field.required
                                ? `${field.label} is required`
                                : false,
                              min: field.validation?.min,
                            })}
                            placeholder={field.placeholder}
                            className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-green-700'
                          />
                        )}

                        {/* TEXTAREA */}
                        {field.type === "textarea" && (
                          <textarea
                            {...register(field.name, {
                              required: field.required
                                ? `${field.label} is required`
                                : false,
                            })}
                            placeholder={field.placeholder}
                            rows={2}
                            className='w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-green-700'
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* 3. SUPERVISOR / INCHARGE */}
              <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
                <div className='mb-3 flex items-center gap-2'>
                  <UserCheck size={16} className='text-green-700' />

                  <h2 className='text-sm font-semibold text-green-800'>
                    3. {labourAllocationEntryData.supervisorIncharge.title}
                  </h2>
                </div>

                <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3'>
                  {labourAllocationEntryData.supervisorIncharge.fields.map(
                    (field) => (
                      <div key={field.id}>
                        <label className='mb-1 block text-[11px] font-medium text-gray-700'>
                          {field.label}

                          {field.required && (
                            <span className='ml-1 text-red-500'>*</span>
                          )}
                        </label>

                        <select
                          {...register(field.name, {
                            required: field.required
                              ? `${field.label} is required`
                              : false,
                          })}
                          className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none focus:border-green-700'
                        >
                          <option value=''>{field.placeholder}</option>

                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ALLOCATION SUMMARY */}
          <div className='xl:col-span-3'>
            {/* 4. ALLOCATION SUMMARY */}
            <div className='h-full rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
              {/* HEADER */}
              <div className='mb-4 flex items-center gap-2'>
                <Users size={16} className='text-green-700' />

                <h2 className='text-sm font-semibold text-green-800'>
                  {labourAllocationEntryData.allocationSummary.title}
                </h2>
              </div>

              {/* SUMMARY ITEMS */}
              <div className='space-y-3'>
                {labourAllocationEntryData.allocationSummary.items.map(
                  (item) => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between border-b border-gray-50 pb-2 last:border-b-0'
                    >
                      <span className='text-xs font-medium text-gray-600'>
                        {item.label}
                      </span>

                      <span className='text-xs font-semibold text-gray-800'>
                        {item.value}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
                ROW 2
            ========================================================== */}
        <div className='grid grid-cols-1 gap-3 xl:grid-cols-12'>
          {/* 4. SELECT WORKERS */}
          <div className='xl:col-span-8'>
            {/* 4. SELECT WORKERS */}
            <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
              {/* HEADER */}
              <div className='mb-3 flex items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <Users size={16} className='text-green-700' />

                  <h2 className='text-sm font-semibold text-green-800'>
                    4. {labourAllocationEntryData.selectWorkers.title}
                  </h2>
                </div>

                {/* ACTION BUTTON */}
                <div className='flex flex-wrap gap-2'>
                  {labourAllocationEntryData.selectWorkers.actions.map(
                    (action) => {
                      const Icon = actionIconMap[action.iconKey];

                      return (
                        <button
                          key={action.id}
                          type='button'
                          className='inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-green-800 px-3 text-xs font-semibold text-white transition hover:bg-green-900'
                        >
                          {Icon && <Icon size={14} />}
                          <span>{action.label}</span>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* SEARCH + FILTERS */}
              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'>
                {/* SEARCH */}
                <div className='relative'>
                  <Search
                    size={14}
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                  />

                  <input
                    type='text'
                    {...register(
                      labourAllocationEntryData.selectWorkers.search.name,
                    )}
                    placeholder={
                      labourAllocationEntryData.selectWorkers.search.placeholder
                    }
                    className='h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                  />
                </div>

                {/* FILTERS */}
                {labourAllocationEntryData.selectWorkers.filters.map(
                  (filter) => (
                    <div key={filter.id}>
                      <select
                        {...register(filter.name)}
                        className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                      >
                        <option value=''>{filter.placeholder}</option>

                        {filter.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ),
                )}
              </div>

              {/* WORKER TABLE */}
              <div className='mt-3 overflow-x-auto rounded-lg border border-gray-200'>
                <table className='w-full min-w-[800px] border-collapse'>
                  {/* TABLE HEADER */}
                  <thead>
                    <tr className='border-b border-gray-200 bg-gray-50'>
                      {/* SELECT ALL */}
                      {labourAllocationEntryData.selectWorkers.table
                        .selectable && (
                        <th className='w-10 px-3 py-2 text-center'>
                          <input
                            type='checkbox'
                            className='h-3.5 w-3.5 accent-green-700'
                          />
                        </th>
                      )}

                      {labourAllocationEntryData.selectWorkers.table.columns.map(
                        (column) => (
                          <th
                            key={column.id}
                            className='whitespace-nowrap px-3 py-2 text-left text-[10px] font-semibold text-gray-600'
                          >
                            {column.label}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>

                  {/* TABLE BODY */}
                  <tbody>
                    {labourAllocationEntryData.selectWorkers.table.rows.map(
                      (worker) => (
                        <tr
                          key={worker.id}
                          className='border-b border-gray-100 transition hover:bg-gray-50'
                        >
                          {/* CHECKBOX */}
                          {labourAllocationEntryData.selectWorkers.table
                            .selectable && (
                            <td className='px-3 py-2 text-center'>
                              <input
                                type='checkbox'
                                defaultChecked={worker.selected}
                                className='h-3.5 w-3.5 accent-green-700'
                              />
                            </td>
                          )}

                          {/* DYNAMIC COLUMNS */}
                          {labourAllocationEntryData.selectWorkers.table.columns.map(
                            (column) => (
                              <td
                                key={column.id}
                                className='whitespace-nowrap px-3 py-2 text-[10px] text-gray-700'
                              >
                                {/* ATTENDANCE STATUS */}
                                {column.key === "attendanceStatus" ? (
                                  <span
                                    className={`inline-flex rounded-md px-2 py-1 text-[9px] font-semibold ${
                                      worker.attendanceStatus === "Present"
                                        ? "bg-green-50 text-green-700"
                                        : "bg-red-50 text-red-500"
                                    }`}
                                  >
                                    {worker.attendanceStatus}
                                  </span>
                                ) : column.key === "status" ? (
                                  /* WORKER STATUS */
                                  <span
                                    className={`inline-flex rounded-md px-2 py-1 text-[9px] font-semibold ${
                                      worker.status === "Active"
                                        ? "bg-green-50 text-green-700"
                                        : "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {worker.status}
                                  </span>
                                ) : (
                                  worker[column.key]
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

              {/* TABLE FOOTER */}
              <div className='mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-xs text-gray-500'>
                  Showing 1 to{" "}
                  {labourAllocationEntryData.selectWorkers.table.rows.length}{" "}
                  workers
                </p>

                {/* PAGINATION */}
                <div className='flex flex-wrap items-center gap-1'>
                  {[1, 2, 3, 4, 5, "...", 42, "→"].map((page, index) => (
                    <button
                      key={`${page}-${index}`}
                      type='button'
                      className={`h-7 min-w-7 rounded-md border px-2 text-xs font-medium ${
                        page === 1
                          ? "border-green-800 bg-green-800 text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-green-50 hover:text-green-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className='space-y-3 xl:col-span-4'>
            {/* WORK TIME & SHIFT */}
            <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
              {/* HEADER */}
              <div className='mb-3 flex items-center gap-2'>
                <Clock size={16} className='text-green-700' />

                <h2 className='text-sm font-semibold text-green-800'>
                  {labourAllocationEntryData.workTimeShift.title}
                </h2>
              </div>

              {/* FIELDS */}
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                {labourAllocationEntryData.workTimeShift.fields.map((field) => (
                  <div
                    key={field.id}
                    className={
                      field.id === "working-hours"
                        ? "sm:col-span-2 lg:col-span-4"
                        : ""
                    }
                  >
                    {/* LABEL */}
                    <label className='mb-1 block text-[11px] font-medium text-gray-700'>
                      {field.label}

                      {field.required && (
                        <span className='ml-1 text-red-500'>*</span>
                      )}
                    </label>

                    {/* SELECT */}
                    {field.type === "select" && (
                      <select
                        {...register(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                        })}
                        className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                      >
                        <option value=''>{field.placeholder}</option>

                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* TIME */}
                    {field.type === "time" && (
                      <input
                        type='time'
                        {...register(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                        })}
                        defaultValue={field.defaultValue || ""}
                        className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                      />
                    )}

                    {/* TEXT / READ ONLY */}
                    {field.type === "text" && (
                      <input
                        type='text'
                        {...register(field.name)}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue || ""}
                        readOnly={field.readOnly}
                        className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* EQUIPMENT / TOOLS ALLOCATION */}
            <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
              {/* HEADER */}
              <div className='mb-3 flex items-center gap-2'>
                <BriefcaseBusiness size={16} className='text-green-700' />

                <h2 className='text-sm font-semibold text-green-800'>
                  {labourAllocationEntryData.equipmentToolsAllocation.title}
                </h2>
              </div>

              {/* FIELDS */}
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                {labourAllocationEntryData.equipmentToolsAllocation.fields.map(
                  (field) => (
                    <div
                      key={field.id}
                      className={
                        field.id === "other-tools" ||
                        field.id === "vehicle-transport"
                          ? "lg:col-span-2"
                          : ""
                      }
                    >
                      {/* LABEL */}
                      <label className='mb-1 block text-[11px] font-medium text-gray-700'>
                        {field.label}
                      </label>

                      {/* NUMBER */}
                      {field.type === "number" && (
                        <input
                          type='number'
                          {...register(field.name, {
                            min: field.validation?.min ?? undefined,
                          })}
                          defaultValue={field.defaultValue ?? ""}
                          placeholder={field.placeholder}
                          className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                        />
                      )}

                      {/* TEXT */}
                      {field.type === "text" && (
                        <input
                          type='text'
                          {...register(field.name)}
                          defaultValue={field.defaultValue ?? ""}
                          placeholder={field.placeholder}
                          className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                        />
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
                ROW 3
            ========================================================== */}
        <div className='grid grid-cols-1 gap-3 lg:grid-cols-12'>
          {/* =====================================================
                  5. WAGE / RATE INFORMATION
              ====================================================== */}
          <div className='min-h-40 rounded-xl border border-gray-200 bg-white p-3 shadow-sm lg:col-span-3'>
            {/* HEADER */}
            <div className='mb-3 flex items-center gap-2'>
              <Wallet size={16} className='text-green-700' />

              <h2 className='text-sm font-semibold text-green-800'>
                {labourAllocationEntryData.wageRateInformation.title}
              </h2>
            </div>

            {/* FIELDS */}
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {labourAllocationEntryData.wageRateInformation.fields.map(
                (field) => (
                  <div key={field.id}>
                    {/* LABEL */}
                    <label className='mb-1 block text-[11px] font-medium text-gray-700'>
                      {field.label}

                      {field.required && (
                        <span className='ml-1 text-red-500'>*</span>
                      )}
                    </label>

                    {/* SELECT */}
                    {field.type === "select" && (
                      <select
                        {...register(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                        })}
                        defaultValue={field.defaultValue ?? ""}
                        className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                      >
                        <option value=''>{field.placeholder}</option>

                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* NUMBER */}
                    {field.type === "number" && (
                      <input
                        type='number'
                        {...register(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                          valueAsNumber: true,
                          min: field.validation?.min ?? undefined,
                        })}
                        defaultValue={field.defaultValue ?? ""}
                        placeholder={field.placeholder}
                        className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                      />
                    )}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* =====================================================
                  6. REMARKS & NOTES
              ====================================================== */}
          <div className='min-h-40 rounded-xl border border-gray-200 bg-white p-3 shadow-sm lg:col-span-4'>
            {/* HEADER */}
            <div className='mb-3 flex items-center gap-2'>
              <FileText size={16} className='text-green-700' />

              <h2 className='text-sm font-semibold text-green-800'>
                {labourAllocationEntryData.remarksNotes.title}
              </h2>
            </div>

            {/* FIELDS */}
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {labourAllocationEntryData.remarksNotes.fields.map((field) => (
                <div
                  key={field.id}
                  className={field.type === "textarea" ? "sm:col-span-2" : ""}
                >
                  {/* LABEL */}
                  <label className='mb-1 block text-[11px] font-medium text-gray-700'>
                    {field.label}

                    {field.required && (
                      <span className='ml-1 text-red-500'>*</span>
                    )}
                  </label>

                  {/* SELECT */}
                  {field.type === "select" && (
                    <select
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      defaultValue={field.defaultValue ?? ""}
                      className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                    >
                      <option value=''>{field.placeholder}</option>

                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* TEXTAREA */}
                  {field.type === "textarea" && (
                    <textarea
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      placeholder={field.placeholder}
                      rows={3}
                      className='w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none transition focus:border-green-700'
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* =====================================================
                  7. APPROVAL
              ====================================================== */}
          <div className='min-h-40 rounded-xl border border-gray-200 bg-white p-3 shadow-sm lg:col-span-5'>
            {/* HEADER */}
            <div className='mb-3 flex items-center gap-2'>
              <ShieldCheck size={16} className='text-green-700' />

              <h2 className='text-sm font-semibold text-green-800'>
                {labourAllocationEntryData.approval.title}
              </h2>
            </div>

            {/* FIELDS */}
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {labourAllocationEntryData.approval.fields.map((field) => (
                <div
                  key={field.id}
                  className={
                    field.type === "textarea"
                      ? "sm:col-span-2 lg:col-span-3"
                      : ""
                  }
                >
                  {/* LABEL */}
                  <label className='mb-1 block text-[11px] font-medium text-gray-700'>
                    {field.label}

                    {field.required && (
                      <span className='ml-1 text-red-500'>*</span>
                    )}
                  </label>

                  {/* SELECT */}
                  {field.type === "select" && (
                    <select
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      defaultValue={field.defaultValue ?? ""}
                      className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                    >
                      <option value=''>{field.placeholder}</option>

                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* DATE */}
                  {field.type === "date" && (
                    <input
                      type='date'
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      defaultValue={field.defaultValue ?? ""}
                      className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                    />
                  )}

                  {/* TEXTAREA */}
                  {field.type === "textarea" && (
                    <textarea
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      placeholder={field.placeholder}
                      rows={3}
                      className='w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none transition focus:border-green-700'
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* BOTTOM ACTION BAR */}
        <div className='mt-3 flex  flex-wrap items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm'>
          {labourAllocationEntryData.bottomActions.map((action) => (
            <button
              key={action.id}
              type={action.action === "reset" ? "button" : "submit"}
              onClick={action.action === "reset" ? () => reset() : undefined}
              className={
                action.variant === "primary"
                  ? "inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-800 px-4 text-xs font-semibold text-white transition hover:bg-green-900"
                  : "inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              }
            >
              {action.action === "reset" && <RotateCcw size={14} />}

              {action.action === "draft" && <Save size={14} />}

              {action.action === "submit" && <CircleCheck size={14} />}

              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default LabourAllocationEntry;
