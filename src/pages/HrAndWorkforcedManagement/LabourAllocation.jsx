import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { labourAllocationData } from "../../data/HrWorkforceData/labourAllocationData";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";

import {
  BriefcaseBusiness,
  ClipboardCheck,
  RefreshCcw,
  ShieldCheck,
  Plus,
  Upload,
  Download,
  MoreHorizontal,
  ChevronDown,
  Users,
  UsersRound,
  ClipboardList,
  CircleCheck,
  UserRoundX,
  RotateCcw,
  ArrowRight,
  FilePenLine,
  FileText,
  Layers,
  Printer,
} from "lucide-react";

const summaryIconMap = {
  users: Users,
  usersRound: UsersRound,
  clipboardList: ClipboardList,
  circleCheck: CircleCheck,
  userRoundX: UserRoundX,
};
const quickActionIconMap = {
  bulkAllocation: Layers,
  reallocateWorkers: UsersRound,
  updateAllocation: FilePenLine,
  allocationReport: FileText,
  printAllocation: Printer,
};
const informationIconMap = {
  workTypes: BriefcaseBusiness,
  allocationRules: ClipboardCheck,
  reallocation: RefreshCcw,
  approvalProcess: ShieldCheck,
};
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const LabourAllocation = () => {
  // =========================================================
  // REACT HOOK FORM
  // =========================================================
  const { register, handleSubmit, reset } = useForm();

  return (
    <div className='space-y-4'>
      {/* =========================================================
          HR & WORKFORCE TABS
      ========================================================= */}
      <HrWorkforceTabs />

      {/* =========================================================
          PAGE ACTION BAR
      ========================================================= */}
      <div className='rounded-xl border border-gray-200 bg-white px-2 py-2 shadow-sm'>
        <div className='grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end'>
          {/* NEW ALLOCATION */}
          <button
            type='button'
            className='inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-green-800 px-3 text-sm font-semibold text-white transition hover:bg-green-900 sm:w-auto sm:px-4'
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>New Allocation</span>
          </button>

          {/* IMPORT */}
          <button
            type='button'
            className='inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-800 sm:w-auto sm:px-4'
          >
            <Upload size={15} />
            <span>Import</span>
          </button>

          {/* EXPORT */}
          <button
            type='button'
            className='inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-800 sm:w-auto sm:px-4'
          >
            <Download size={15} />
            <span>Export</span>
          </button>

          {/* MORE */}
          <button
            type='button'
            className='inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-800 sm:w-auto sm:px-4'
          >
            <MoreHorizontal size={16} />
            <span>More</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* =========================================================
              SUMMARY CARDS
          ========================================================= */}
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {labourAllocationData.summaryCards.map((card) => {
          const Icon = summaryIconMap[card.iconKey];

          return (
            <div
              key={card.id}
              className='min-h-24 rounded-xl border border-gray-200 bg-white p-4 shadow-sm'
            >
              <div className='flex items-center gap-3'>
                {/* ICON */}
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${card.variant === "green" ? "bg-green-50 text-green-700" : card.variant === "blue" ? "bg-blue-50 text-blue-600" : card.variant === "purple" ? "bg-purple-50 text-purple-600" : card.variant === "orange" ? "bg-orange-50 text-orange-600" : card.variant === "red" ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-600"}`}
                >
                  {Icon && <Icon size={22} strokeWidth={2} />}
                </div>

                {/* CARD CONTENT */}
                <div className='min-w-0'>
                  {/* TITLE */}
                  <p className='text-xs font-medium text-gray-500'>
                    {card.title}
                  </p>

                  {/* VALUE */}
                  <p className='mt-0.5 text-xl font-bold leading-tight text-gray-800'>
                    {card.value}
                  </p>

                  {/* SUBTITLE */}
                  {card.subtitle && (
                    <p className='mt-1 text-[11px] text-gray-500'>
                      {card.subtitle}
                    </p>
                  )}

                  {/* PERCENTAGE */}
                  {card.percentageDisplay && (
                    <p
                      className={`mt-1 text-[11px] font-semibold ${card.percentageType === "negative" ? "text-red-500" : "text-green-700"}`}
                    >
                      {card.percentageDisplay}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className='grid grid-cols-1 gap-2 xl:grid-cols-12'>
        {/* =======================================================
            LEFT SECTION
            8 COLUMNS
        ======================================================= */}
        <div className='space-y-4 xl:col-span-8'>
          {/* FILTER & SEARCH */}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {labourAllocationData.filters.map((field) => (
                  <div key={field.id}>
                    <label className='mb-1 block text-xs font-medium text-gray-700'>
                      {field.label}
                      {field.required && (
                        <span className='ml-1 text-red-500'>*</span>
                      )}
                    </label>

                    {field.type === "date" && (
                      <input
                        type='date'
                        {...register(field.name)}
                        defaultValue={field.defaultValue || ""}
                        className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-green-700'
                      />
                    )}

                    {field.type === "select" && (
                      <select
                        {...register(field.name)}
                        className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-green-700'
                      >
                        <option value=''>{field.placeholder}</option>

                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {field.type === "search" && (
                      <input
                        type='search'
                        {...register(field.name)}
                        placeholder={field.placeholder}
                        className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-green-700'
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* FILTER ACTIONS */}
              <div className='mt-3 flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 pt-3'>
                <button
                  type='button'
                  onClick={() => reset()}
                  className='h-9 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-100'
                >
                  Reset
                </button>

                <button
                  type='submit'
                  className='h-9 rounded-lg bg-green-800 px-4 text-sm font-medium text-white transition hover:bg-green-900'
                >
                  Apply Filter
                </button>
              </div>
            </form>
          </div>

          {/* =====================================================
              ALLOCATION LIST
          ===================================================== */}
          {/* ALLOCATION LIST */}
          <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* HEADER */}
            <div className='mb-3 flex items-center justify-between'>
              <h2 className='text-sm font-semibold text-green-800'>
                {labourAllocationData.allocationTable.title}
              </h2>
            </div>

            {/* TABLE */}
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[950px] border-collapse'>
                {/* TABLE HEAD */}
                <thead>
                  <tr className='border-b border-gray-200 bg-gray-50'>
                    {labourAllocationData.allocationTable.headers.map(
                      (header) => (
                        <th
                          key={header.key}
                          className='whitespace-nowrap px-3 py-2 text-left text-[11px] font-semibold text-gray-600'
                        >
                          {header.label}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {labourAllocationData.allocationTable.rows.map((row) => (
                    <tr
                      key={row.allocationId}
                      className='border-b border-gray-100 transition hover:bg-gray-50'
                    >
                      {labourAllocationData.allocationTable.headers.map(
                        (header) => (
                          <td
                            key={header.key}
                            className='whitespace-nowrap px-3 py-2 text-[11px] text-gray-700'
                          >
                            {/* STATUS */}
                            {header.key === "status" ? (
                              <span
                                className={`inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${row.status === "completed" ? "bg-green-50 text-green-700" : row.status === "in-progress" ? "bg-blue-50 text-blue-600" : row.status === "pending" ? "bg-orange-50 text-orange-600" : "bg-gray-50 text-gray-600"}`}
                              >
                                {row.statusLabel}
                              </span>
                            ) : header.key === "actions" ? (
                              /* ACTIONS */
                              <div className='flex items-center gap-1'>
                                <button
                                  type='button'
                                  className='rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-medium text-gray-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-700'
                                >
                                  View
                                </button>

                                <button
                                  type='button'
                                  className='flex h-6 w-6 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50'
                                >
                                  ⋮
                                </button>
                              </div>
                            ) : (
                              /* NORMAL DATA */
                              row[header.key]
                            )}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TABLE FOOTER */}
            <div className='mt-3 flex flex-col gap-3 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between'>
              {/* ENTRY COUNT */}
              <p className='text-xs text-gray-500'>
                Showing{" "}
                {labourAllocationData.allocationTable.pagination.showingFrom} to{" "}
                {labourAllocationData.allocationTable.pagination.showingTo} of{" "}
                {labourAllocationData.allocationTable.pagination.totalEntries}{" "}
                entries
              </p>

              {/* PAGINATION */}
              <div className='flex flex-wrap items-center gap-1'>
                {labourAllocationData.allocationTable.pagination.pageNumbers.map(
                  (page) => (
                    <button
                      key={page}
                      type='button'
                      className={`h-7 min-w-7 rounded-md border px-2 text-xs font-medium ${page === labourAllocationData.allocationTable.pagination.currentPage ? "border-green-800 bg-green-800 text-white" : "border-gray-200 bg-white text-gray-700 hover:bg-green-50 hover:text-green-800"}`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* =====================================================
              BOTTOM LEFT SECTION
          ===================================================== */}
          <div className='grid grid-cols-1 items-start gap-2 lg:grid-cols-2'>
            {/* NEW ALLOCATION */}
            <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
              {/* HEADER */}
              <div className=''>
                <h2 className='text-sm font-semibold text-green-800'>
                  {labourAllocationData.newAllocationForm.title}
                </h2>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div className='grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3'>
                  {labourAllocationData.newAllocationForm.fields.map(
                    (field) => (
                      <div
                        key={field.id}
                        className={
                          field.type === "textarea"
                            ? "sm:col-span-2 lg:col-span-3"
                            : ""
                        }
                      >
                        {/* LABEL */}
                        <label className='mb-2 block text-[11px] font-medium text-gray-700'>
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

                        {/* NUMBER */}
                        {field.type === "number" && (
                          <input
                            type='number'
                            {...register(field.name, {
                              required: field.required
                                ? `${field.label} is required`
                                : false,
                              min: field.validation?.min || undefined,
                            })}
                            placeholder={field.placeholder}
                            className='h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-700'
                          />
                        )}

                        {/* TEXTAREA */}
                        {field.type === "textarea" && (
                          <textarea
                            {...register(field.name)}
                            placeholder={field.placeholder}
                            rows={5}
                            className='w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 outline-none transition focus:border-green-700'
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>

                {/* ACTION BUTTONS */}
                <div className='mt-0 flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-1'>
                  {labourAllocationData.newAllocationForm.actions.map(
                    (action) => (
                      <button
                        key={action.id}
                        type={action.action === "reset" ? "button" : "submit"}
                        onClick={
                          action.action === "reset" ? () => reset() : undefined
                        }
                        className={
                          action.variant === "primary"
                            ? "inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-green-800 px-4 text-xs font-semibold text-white transition hover:bg-green-900"
                            : "inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                        }
                      >
                        {action.action === "reset" ? (
                          <RotateCcw size={14} />
                        ) : (
                          <ArrowRight size={14} />
                        )}

                        <span>{action.label}</span>
                      </button>
                    ),
                  )}
                </div>
              </form>
            </div>

            {/* RECENT ALLOCATIONS */}
            <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
              {/* HEADER */}
              <div className='mb-4 flex items-center justify-between'>
                <h2 className='text-sm font-semibold text-green-800'>
                  {labourAllocationData.recentAllocations.title}
                </h2>
              </div>

              {/* RECENT ITEMS */}
              <div className='space-y-2'>
                {labourAllocationData.recentAllocations.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-2 rounded-lg border border-gray-100 px-2 py-2 transition hover:bg-gray-50'
                  >
                    {/* ICON */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.status === "completed" ? "bg-green-50 text-green-700" : item.status === "in-progress" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}
                    >
                      <ClipboardList size={15} />
                    </div>

                    {/* ALLOCATION INFO */}
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-[11px] font-semibold text-gray-800'>
                        {item.allocationId}
                      </p>
                      <p className='truncate text-[10px] text-gray-500'>
                        {item.task} - {item.section}
                      </p>
                    </div>

                    {/* STATUS */}
                    <span
                      className={`hidden shrink-0 rounded-md px-2 py-1 text-[9px] font-semibold sm:inline-flex ${item.status === "completed" ? "bg-green-50 text-green-700" : item.status === "in-progress" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}
                    >
                      {item.statusLabel}
                    </span>

                    {/* WORKERS */}
                    <span className='hidden shrink-0 text-[10px] text-gray-500 md:block'>
                      {item.workers} Workers
                    </span>

                    {/* TIME */}
                    <span className='hidden shrink-0 text-[10px] text-gray-500 lg:block'>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* FOOTER BUTTON */}
              <button
                type='button'
                className='mt-3 cursor-pointer h-8 w-full rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-800'
              >
                {labourAllocationData.recentAllocations.footerAction.label}
              </button>
            </div>
          </div>
        </div>

        {/* =======================================================
            RIGHT SECTION
            4 COLUMNS
        ======================================================= */}
        <div className='space-y-4 xl:col-span-4'>
          {/* ALLOCATION SUMMARY */}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* HEADER */}
            <div className='mb-4'>
              <h2 className='text-sm font-semibold text-green-800'>
                {labourAllocationData.allocationSummary.title}
              </h2>
            </div>

            {/* CHART + LEGEND */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center'>
              {/* DONUT CHART */}
              <div className='h-40 w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={labourAllocationData.allocationSummary.chartData}
                      dataKey='value'
                      nameKey='label'
                      cx='50%'
                      cy='50%'
                      innerRadius={38}
                      outerRadius={58}
                      paddingAngle={2}
                      stroke='none'
                    >
                      {labourAllocationData.allocationSummary.chartData.map(
                        (item) => (
                          <Cell key={item.id} fill={item.color} />
                        ),
                      )}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* LEGEND */}
              <div className='space-y-3'>
                {labourAllocationData.allocationSummary.chartData.map(
                  (item) => (
                    <div
                      key={item.id}
                      className='flex items-center justify-between gap-2'
                    >
                      <div className='flex min-w-0 items-center gap-2'>
                        <span
                          className='h-2.5 w-2.5 shrink-0 rounded-sm'
                          style={{ backgroundColor: item.color }}
                        />

                        <span className='truncate text-xs font-medium text-gray-700'>
                          {item.label}
                        </span>
                      </div>

                      <span className='shrink-0 text-[11px] font-medium text-gray-600'>
                        {item.value} ({item.percentage.toFixed(2)}%)
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* TOTAL */}
            <div className='mt-3 rounded-lg border border-green-100 bg-green-50 px-3 py-2'>
              <div className='flex items-center justify-between'>
                <span className='text-[11px] font-medium text-green-800'>
                  {labourAllocationData.allocationSummary.totalLabel}
                </span>

                <span className='text-sm font-bold text-green-800'>
                  {labourAllocationData.allocationSummary.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* TASK / WORK SUMMARY */}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* HEADER */}
            <div className='mb-3'>
              <h2 className='text-sm font-semibold text-green-800'>
                {labourAllocationData.taskWorkSummary.title}
              </h2>
            </div>

            {/* TABLE */}
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[280px]'>
                {/* TABLE HEADER */}
                <thead>
                  <tr className='border-b border-gray-100'>
                    <th className='px-2 py-2 text-left text-[11px] font-semibold text-gray-600'>
                      {labourAllocationData.taskWorkSummary.columns.task}
                    </th>

                    <th className='px-2 py-2 text-right text-[11px] font-semibold text-gray-600'>
                      {labourAllocationData.taskWorkSummary.columns.workers}
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {labourAllocationData.taskWorkSummary.items.map((item) => (
                    <tr
                      key={item.id}
                      className='border-b border-gray-50 transition hover:bg-gray-50'
                    >
                      <td className='px-2 py-1.5 text-left text-[11px] text-gray-700'>
                        {item.task}
                      </td>

                      <td className='px-2 py-1.5 text-right text-[11px] font-medium text-gray-700'>
                        {item.allocatedWorkers.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* TOTAL */}
                <tfoot>
                  <tr>
                    <td className='px-2 pt-2 text-right text-xs font-bold text-green-800'>
                      {labourAllocationData.taskWorkSummary.totalLabel}
                    </td>

                    <td className='px-2 pt-2  text-right text-sm font-bold text-green-800'>
                      {labourAllocationData.taskWorkSummary.total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* UNALLOCATED WORKERS */}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* HEADER */}
            <div className='mb-3'>
              <h2 className='text-sm font-semibold text-green-800'>
                {labourAllocationData.unallocatedWorkers.title}
              </h2>
            </div>

            {/* CONTENT */}
            <div className='flex items-center gap-3'>
              {/* ICON */}
              <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500'>
                <UsersRound size={22} strokeWidth={2} />
              </div>

              {/* VALUE + PERCENTAGE */}
              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-4'>
                  <span className='text-lg font-bold text-gray-800'>
                    {labourAllocationData.unallocatedWorkers.total.toLocaleString()}
                  </span>

                  <span className='text-[11px] font-medium text-gray-500'>
                    {labourAllocationData.unallocatedWorkers.percentage}%
                  </span>
                </div>

                {/* ACTION */}
                <button
                  type='button'
                  className='mt-2 h-8 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 transition hover:border-green-700 hover:bg-green-50 hover:text-green-800'
                >
                  {labourAllocationData.unallocatedWorkers.action.label}
                </button>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* HEADER */}
            <div className='mb-4'>
              <h2 className='text-sm font-semibold text-green-800'>
                {labourAllocationData.quickActions.title}
              </h2>
            </div>

            {/* ACTIONS */}
            <div className='grid grid-cols-5 gap-2'>
              {labourAllocationData.quickActions.items.map((action) => {
                const Icon = quickActionIconMap[action.iconKey];

                return (
                  <button
                    key={action.id}
                    type='button'
                    className='group flex min-w-0 flex-col items-center justify-start gap-1.5 rounded-lg p-1.5 text-center transition hover:bg-green-50'
                  >
                    {/* ICON */}
                    <div className='flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition group-hover:border-green-200 group-hover:bg-green-50 group-hover:text-green-700'>
                      {Icon && <Icon size={15} strokeWidth={1.8} />}
                    </div>

                    {/* LABEL */}
                    <span className='text-[9px] font-medium leading-tight text-gray-600 group-hover:text-green-800'>
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
              INFORMATION SECTION
          ========================================================= */}
      <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
        {/* HEADER */}
        <div className='mb-4'>
          <h2 className='text-sm font-semibold text-green-800'>
            {labourAllocationData.informationSection.title}
          </h2>
        </div>

        {/* INFORMATION CARDS */}
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
          {labourAllocationData.informationSection.cards.map((card) => {
            const Icon = informationIconMap[card.iconKey];

            return (
              <div
                key={card.id}
                className='flex min-h-24 items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3'
              >
                {/* ICON */}
                <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600'>
                  {Icon && <Icon size={17} strokeWidth={2} />}
                </div>

                {/* CONTENT */}
                <div className='min-w-0'>
                  <h3 className='text-[11px] font-semibold text-gray-800'>
                    {card.title}
                  </h3>

                  <p className='mt-1 text-[9px] leading-relaxed text-gray-500'>
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LabourAllocation;
