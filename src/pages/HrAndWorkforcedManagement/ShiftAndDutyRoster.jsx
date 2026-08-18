import React from "react";
import { useForm } from "react-hook-form";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import { shiftAndDutyRosterData } from "../../data/HrWorkforceData/shiftAndDutyRosterData";
import {
  Plus,
  WandSparkles,
  Download,
  MoreHorizontal,
  Clock3,
  Building2,
  CalendarCheck,
  CalendarDays,
  CircleCheck,
  Users,
  Copy,
  Printer,
  UserCheck,
  UserX,
} from "lucide-react";
const actionIconMap = {
  plus: Plus,
  wand: WandSparkles,
  download: Download,
  more: MoreHorizontal,
};
const summaryIconMap = {
  clock: Clock3,
  users: Users,
  building: Building2,
  calendarCheck: CalendarCheck,
};
const quickActionIconMap = {
  plus: Plus,
  calendar: CalendarDays,
  users: Users,
  copy: Copy,
  printer: Printer,
};
const todaySummaryIconMap = {
  users: Users,
  "user-check": UserCheck,
  "user-x": UserX,
};
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
const ShiftAndDutyRoster = () => {
  // FILTER FORM
  const { register, handleSubmit, reset } = useForm();

  const onFilterSubmit = (data) => {
    console.log("Filter Data:", data);
  };

  return (
    <div>
      <HrWorkforceTabs />

      {/* =====================================================
          1. TOP ACTION BAR
      ====================================================== */}
      <div className='grid grid-cols-1 gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm sm:flex sm:flex-wrap sm:items-center sm:justify-end'>
        {shiftAndDutyRosterData.topActions.map((action) => {
          const Icon = actionIconMap[action.iconKey];

          return (
            <button
              key={action.id}
              type='button'
              className={
                action.variant === "primary"
                  ? "inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-green-800 px-4 text-xs font-semibold text-white transition hover:bg-green-900 sm:w-auto"
                  : "inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-xs font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
              }
            >
              {Icon && <Icon size={14} />}

              <span>{action.label}</span>

              {action.hasDropdown && <span className='text-[10px]'>⌄</span>}
            </button>
          );
        })}
      </div>

      {/* =====================================================
          2. SUMMARY CARDS
      ====================================================== */}
      <div className='grid grid-cols-1 py-4 gap-2 sm:grid-cols-2 xl:grid-cols-4'>
        {shiftAndDutyRosterData.summaryCards.map((card) => {
          const Icon = summaryIconMap[card.iconKey];

          return (
            <div
              key={card.id}
              className={`min-h-20 rounded-xl border border-gray-200 p-3 shadow-sm ${card.cardClass}`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.iconClass}`}
                >
                  {Icon && <Icon size={19} />}
                </div>

                <div className='min-w-0'>
                  <p className='text-[11px] font-medium text-gray-500'>
                    {card.title}
                  </p>

                  <h3 className='mt-0.5 text-lg font-bold text-gray-800'>
                    {card.id === "total-workers"
                      ? card.value.toLocaleString()
                      : card.id === "todays-coverage"
                        ? `${card.value}%`
                        : card.value}
                  </h3>

                  <p className='text-[10px] text-gray-500'>{card.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          3. MAIN CONTENT
      ====================================================== */}
      <div className='mt-3 grid grid-cols-1 gap-3 xl:grid-cols-12'>
        {/* ===================================================
            LEFT SIDE
        ==================================================== */}
        <div className='xl:col-span-9'>
          {/* =================================================
              FILTER + ROSTER
          ================================================== */}
          {/* ================= ROSTER MAIN SECTION ================= */}
          <div className='rounded-xl border border-gray-200 bg-white  mb-4 p-3 shadow-sm'>
            {/* ================= FILTER FORM ================= */}
            <form
              onSubmit={handleSubmit(onFilterSubmit)}
              className='border-b border-gray-100 pb-3'
            >
              {/* ================= DATE RANGE ================= */}
              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12'>
                {/* ================= DATE RANGE ================= */}
                <div className='xl:col-span-3'>
                  <label className='mb-1 block text-xs font-medium text-gray-700'>
                    Date Range <span className='text-red-500'>*</span>
                  </label>

                  <div className='flex h-9 w-full items-center overflow-hidden rounded-lg border border-gray-200 bg-white'>
                    <input
                      type='date'
                      {...register("startDate")}
                      className='h-full min-w-0 flex-1 border-0 bg-transparent px-2 text-[10px] text-gray-700 outline-none focus:ring-0'
                    />

                    <span className='shrink-0 px-1 text-[10px] text-gray-400'>
                      —
                    </span>

                    <input
                      type='date'
                      {...register("endDate")}
                      className='h-full min-w-0 flex-1 border-0 bg-transparent px-2 text-[10px] text-gray-700 outline-none focus:ring-0'
                    />

                    <div className='flex h-full w-7 shrink-0 items-center justify-center border-l border-gray-100 text-gray-400'>
                      <CalendarDays size={11} />
                    </div>
                  </div>
                </div>

                {/* ================= GARDEN / UNIT ================= */}
                <div className='xl:col-span-2'>
                  <label className='mb-1 block text-xs font-medium text-gray-700'>
                    Garden / Unit
                  </label>

                  <select
                    {...register("garden")}
                    className='h-9 w-full rounded-lg border border-gray-200 bg-white px-2 text-[10px] text-gray-700 outline-none focus:border-green-700'
                  >
                    {shiftAndDutyRosterData.filters.gardens.map((garden) => (
                      <option key={garden.value} value={garden.value}>
                        {garden.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ================= DEPARTMENT ================= */}
                <div className='xl:col-span-2'>
                  <label className='mb-1 block text-xs font-medium text-gray-700'>
                    Department
                  </label>

                  <select
                    {...register("department")}
                    className='h-9 w-full rounded-lg border border-gray-200 bg-white px-2 text-[10px] text-gray-700 outline-none focus:border-green-700'
                  >
                    {shiftAndDutyRosterData.filters.departments.map(
                      (department) => (
                        <option key={department.value} value={department.value}>
                          {department.label}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* ================= SECTION ================= */}
                <div className='xl:col-span-2'>
                  <label className='mb-1 block text-xs font-medium text-gray-700'>
                    Section
                  </label>

                  <select
                    {...register("section")}
                    className='h-9 w-full rounded-lg border border-gray-200 bg-white px-2 text-[10px] text-gray-700 outline-none focus:border-green-700'
                  >
                    {shiftAndDutyRosterData.filters.sections.map((section) => (
                      <option key={section.value} value={section.value}>
                        {section.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ================= SHIFT ================= */}
                <div className='xl:col-span-2'>
                  <label className='mb-1 block text-xs font-medium text-gray-700'>
                    Shift
                  </label>

                  <select
                    {...register("shift")}
                    className='h-9 w-full rounded-lg border border-gray-200 bg-white px-2 text-[10px] text-gray-700 outline-none focus:border-green-700'
                  >
                    {shiftAndDutyRosterData.filters.shifts.map((shift) => (
                      <option key={shift.value} value={shift.value}>
                        {shift.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ================= CLEAR ================= */}
                <div className='flex items-end xl:col-span-1'>
                  <button
                    type='button'
                    onClick={() => reset()}
                    className='h-9 w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-2 text-[10px] font-medium text-gray-600 transition hover:bg-gray-50'
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>

            {/* ================= VIEW TABS ================= */}
            <div className='mt-3 border-b border-gray-100'>
              <div className='flex flex-wrap gap-5'>
                <button
                  type='button'
                  className='border-b-2 border-green-700 px-1 pb-2 text-xs font-semibold text-green-700'
                >
                  Weekly Roster View
                </button>

                <button
                  type='button'
                  className='px-1 pb-2 text-xs font-medium text-gray-500 hover:text-gray-700'
                >
                  Daily View
                </button>

                <button
                  type='button'
                  className='px-1 pb-2 text-xs font-medium text-gray-500 hover:text-gray-700'
                >
                  List View
                </button>
              </div>
            </div>

            {/* ================= ROSTER HEADER ================= */}
            <div className='mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
              {/* ROSTER TITLE */}
              <div>
                <h3 className='text-sm font-semibold text-green-800'>
                  {shiftAndDutyRosterData.roster.title}

                  <span className='ml-1 font-normal text-gray-500'>
                    ({shiftAndDutyRosterData.roster.dateLabel})
                  </span>
                </h3>
              </div>

              {/* LEGENDS */}
              <div className='flex flex-wrap items-center gap-2'>
                {shiftAndDutyRosterData.roster.legends.map((legend) => (
                  <div
                    key={legend.id}
                    className='flex items-center gap-1.5 text-[10px] text-gray-600'
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-sm ${
                        legend.color === "green"
                          ? "bg-green-600"
                          : legend.color === "blue"
                            ? "bg-blue-600"
                            : legend.color === "purple"
                              ? "bg-purple-600"
                              : "bg-gray-400"
                      }`}
                    />

                    <span>{legend.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= ROSTER TABLE ================= */}
            <div className='mt-2 overflow-x-auto rounded-lg border border-gray-100'>
              <table className='min-w-[950px] w-full border-collapse'>
                {/* TABLE HEADER */}
                <thead>
                  <tr>
                    {shiftAndDutyRosterData.roster.table.columns.map(
                      (column) => (
                        <th
                          key={column.id}
                          className='px-3 py-2 text-center text-[11px] font-semibold text-gray-600'
                        >
                          {column.label}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {shiftAndDutyRosterData.roster.table.rows.map((row) => (
                    <tr key={row.workerId} className='border-b border-gray-100'>
                      <td className='px-3 py-3 text-center text-xs'>
                        {row.sl}
                      </td>

                      <td className='px-3 py-3 text-xs'>{row.workerId}</td>

                      <td className='px-3 py-2'>
                        <div className='flex items-center gap-2'>
                          <img
                            src={row.photoUrl}
                            alt={row.workerName}
                            className='h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-gray-100'
                          />

                          <span className='whitespace-nowrap text-[10px] font-medium text-gray-700'>
                            {row.workerName}
                          </span>
                        </div>
                      </td>

                      <td className='px-3 py-3 text-xs'>{row.department}</td>

                      {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
                        (day) => (
                          <td key={day} className='px-3 py-3 text-center'>
                            <span className='inline-flex h-6 min-w-8 items-center justify-center rounded-md bg-gray-50 px-2 text-[11px] font-semibold'>
                              {row[day]}
                            </span>
                          </td>
                        ),
                      )}

                      <td className='px-3 py-3 text-center text-[11px]'>
                        {row.weeklySummary.day}D&nbsp;
                        {row.weeklySummary.evening}E&nbsp;
                        {row.weeklySummary.night}N&nbsp;
                        {row.weeklySummary.rest}R&nbsp;
                        <strong>{row.weeklySummary.hours}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= TABLE FOOTER ================= */}
            <div className='mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              {/* ENTRY COUNT */}
              <div className='text-xs text-gray-500'>
                Showing 1 to 8 entries
              </div>

              {/* PAGINATION */}
              <div className='flex flex-wrap items-center gap-1'>
                <button
                  type='button'
                  className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-xs text-gray-500'
                >
                  ‹
                </button>

                <button
                  type='button'
                  className='h-7 w-7 rounded-md bg-green-800 text-xs font-medium text-white'
                >
                  1
                </button>

                <button
                  type='button'
                  className='h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600'
                >
                  2
                </button>

                <button
                  type='button'
                  className='h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600'
                >
                  3
                </button>

                <button
                  type='button'
                  className='h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600'
                >
                  4
                </button>

                <span className='px-1 text-xs text-gray-400'>...</span>

                <button
                  type='button'
                  className='h-7 w-9 rounded-md border border-gray-200 text-xs text-gray-600'
                >
                  308
                </button>

                <button
                  type='button'
                  className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-xs text-gray-500'
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          {/* ================= SHIFT DETAILS & RULES ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* SECTION HEADER */}
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-semibold text-green-800'>
                {shiftAndDutyRosterData.shiftDetails.title}
              </h3>
            </div>

            {/* SHIFT CARDS */}
            <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
              {shiftAndDutyRosterData.shiftDetails.shifts.map((shift) => (
                <div
                  key={shift.id}
                  className={`rounded-xl border p-3 ${
                    shift.variant === "green"
                      ? "border-green-100 bg-green-50"
                      : shift.variant === "blue"
                        ? "border-blue-100 bg-blue-50"
                        : shift.variant === "purple"
                          ? "border-purple-100 bg-purple-50"
                          : "border-orange-100 bg-orange-50"
                  }`}
                >
                  {/* SHIFT NAME */}
                  <div className='flex items-center justify-between'>
                    <h4
                      className={`text-xs font-semibold ${
                        shift.variant === "green"
                          ? "text-green-700"
                          : shift.variant === "blue"
                            ? "text-blue-700"
                            : shift.variant === "purple"
                              ? "text-purple-700"
                              : "text-orange-700"
                      }`}
                    >
                      {shift.name} ({shift.shortCode})
                    </h4>
                  </div>

                  {/* TIME */}
                  <p className='mt-2 text-[10px] font-medium text-gray-600'>
                    {shift.schedule.startTime} - {shift.schedule.endTime}
                  </p>

                  {/* DIVIDER */}
                  <div className='my-2 border-t border-gray-200/70' />

                  {/* WORKING HOURS */}
                  <div className='flex items-center justify-between py-1'>
                    <span className='text-[10px] text-gray-600'>
                      Working Hours
                    </span>

                    <span className='text-[10px] font-medium text-gray-700'>
                      {shift.workingHours}
                    </span>
                  </div>

                  {/* BREAK TIME */}
                  <div className='flex items-center justify-between py-1'>
                    <span className='text-[10px] text-gray-600'>
                      Break Time
                    </span>

                    <span className='text-[10px] font-medium text-gray-700'>
                      {shift.breakTime}
                    </span>
                  </div>

                  {/* GRACE IN */}
                  <div className='flex items-center justify-between py-1'>
                    <span className='text-[10px] text-gray-600'>Grace In</span>

                    <span className='text-[10px] font-medium text-gray-700'>
                      {shift.graceIn}
                    </span>
                  </div>

                  {/* GRACE OUT */}
                  <div className='flex items-center justify-between py-1'>
                    <span className='text-[10px] text-gray-600'>Grace Out</span>

                    <span className='text-[10px] font-medium text-gray-700'>
                      {shift.graceOut}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* NOTE */}
            <div className='mt-3 flex items-start gap-2 border-t border-gray-100 pt-3'>
              <div className='mt-0.5 shrink-0 text-green-700'>
                <CircleCheck size={13} />
              </div>

              <p className='text-[10px] leading-5 text-gray-500'>
                <span className='font-semibold text-gray-600'>Note:</span>{" "}
                {shiftAndDutyRosterData.shiftDetails.note.text}
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}
        <div className='space-y-3 xl:col-span-3'>
          {/* SHIFT INFORMATION */}
          <div className='min-h-52 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* ================= SHIFT INFORMATION ================= */}

            {/* HEADER */}
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-semibold text-green-800'>
                {shiftAndDutyRosterData.shiftInformation.title}
              </h3>

              <button
                type='button'
                className='flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-green-700 hover:bg-green-50 hover:text-green-700'
              >
                <Plus size={15} />
              </button>
            </div>

            {/* TABLE */}
            <div className='mt-3 overflow-x-auto'>
              <table className='w-full min-w-[280px] border-collapse'>
                {/* TABLE HEADER */}
                <thead>
                  <tr className='border-b border-gray-100'>
                    {shiftAndDutyRosterData.shiftInformation.columns.map(
                      (column) => (
                        <th
                          key={column.id}
                          className='px-1 py-2 text-left text-[9px] font-semibold text-gray-500'
                        >
                          {column.label}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {shiftAndDutyRosterData.shiftInformation.rows.map((shift) => (
                    <tr
                      key={shift.id}
                      className='border-b border-gray-50 last:border-b-0'
                    >
                      {/* SHIFT NAME */}
                      <td className='px-1 py-2 text-[9px] font-medium text-gray-700'>
                        {shift.shiftName}
                      </td>

                      {/* TIME */}
                      <td className='whitespace-nowrap px-1 py-2 text-[9px] text-gray-600'>
                        {shift.time}
                      </td>

                      {/* SHORT CODE */}
                      <td className='px-1 py-2'>
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-md border text-[9px] font-semibold ${
                            shift.variant === "green"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : shift.variant === "blue"
                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                : shift.variant === "purple"
                                  ? "border-purple-200 bg-purple-50 text-purple-700"
                                  : shift.variant === "orange"
                                    ? "border-orange-200 bg-orange-50 text-orange-700"
                                    : "border-gray-200 bg-gray-50 text-gray-600"
                          }`}
                        >
                          {shift.shortCode}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className='px-1 py-2'>
                        <span className='rounded-md bg-green-50 px-2 py-1 text-[8px] font-medium text-green-700'>
                          {shift.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER ACTION */}
            <div className='mt-2 border-t border-gray-100 pt-2'>
              <button
                type='button'
                className='w-full cursor-pointer rounded-md border border-gray-100 bg-white py-1 text-[9px] font-medium text-gray-600 transition hover:bg-gray-50 hover:text-green-700'
              >
                {shiftAndDutyRosterData.shiftInformation.footerAction.label}
              </button>
            </div>
          </div>

          {/* ================= DEPARTMENT COVERAGE ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* HEADER */}
            <div className='mb-3 flex items-center justify-between'>
              <h3 className='text-xs font-semibold text-green-800'>
                {shiftAndDutyRosterData.departmentCoverage.title}
                <span className='ml-1 font-normal text-gray-500'>
                  ({shiftAndDutyRosterData.departmentCoverage.subtitle})
                </span>
              </h3>
            </div>

            {/* CHART + LEGEND */}
            <div className='flex items-center justify-between gap-3'>
              {/* DONUT CHART */}
              <div className='h-32 w-32 shrink-0'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={shiftAndDutyRosterData.departmentCoverage.data}
                      dataKey='value'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      innerRadius={30}
                      outerRadius={48}
                      paddingAngle={2}
                      stroke='none'
                    >
                      {shiftAndDutyRosterData.departmentCoverage.data.map(
                        (item) => (
                          <Cell
                            key={item.id}
                            fill={
                              item.color === "green"
                                ? "#16a34a"
                                : item.color === "blue"
                                  ? "#2563eb"
                                  : item.color === "purple"
                                    ? "#9333ea"
                                    : item.color === "orange"
                                      ? "#f59e0b"
                                      : "#6b7280"
                            }
                          />
                        ),
                      )}
                    </Pie>

                    {/* TOOLTIP */}
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Coverage"]}
                      labelFormatter={(label) => label}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        backgroundColor: "#ffffff",
                        fontSize: "11px",
                        padding: "6px 8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* LEGEND */}
              <div className='flex min-w-0 flex-1 flex-col gap-2'>
                {shiftAndDutyRosterData.departmentCoverage.data.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between gap-2'
                  >
                    <div className='flex min-w-0 items-center gap-2'>
                      <span
                        className={`h-2 w-2 shrink-0 rounded-sm ${
                          item.color === "green"
                            ? "bg-green-600"
                            : item.color === "blue"
                              ? "bg-blue-600"
                              : item.color === "purple"
                                ? "bg-purple-600"
                                : item.color === "orange"
                                  ? "bg-orange-500"
                                  : "bg-gray-500"
                        }`}
                      />

                      <span className='truncate text-[10px] text-gray-600'>
                        {item.name}
                      </span>
                    </div>

                    <span className='shrink-0 text-[10px] font-medium text-gray-700'>
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* HEADER */}
            <div className='mb-3'>
              <h3 className='text-xs font-semibold text-green-800'>
                {shiftAndDutyRosterData.quickActions.title}
              </h3>
            </div>

            {/* ACTIONS */}
            <div className='grid grid-cols-5 gap-2'>
              {shiftAndDutyRosterData.quickActions.actions.map((action) => {
                const Icon = quickActionIconMap[action.iconKey];

                return (
                  <button
                    key={action.id}
                    type='button'
                    onClick={() => {
                      console.log("Quick Action:", action.action);
                    }}
                    className='group flex min-w-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-gray-100 bg-white px-1 py-2 transition hover:border-green-200 hover:bg-green-50'
                  >
                    {/* ICON */}
                    <div className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-green-700 transition group-hover:border-green-300 group-hover:bg-white'>
                      {Icon && <Icon size={13} />}
                    </div>

                    {/* LABEL */}
                    <span className='text-center text-[9px] font-medium leading-tight text-gray-600 group-hover:text-green-800'>
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= TODAY'S SUMMARY ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* HEADER */}
            <div className='mb-4'>
              <h3 className='text-xs font-semibold text-green-800'>
                {shiftAndDutyRosterData.todaySummary.title}
                <span className='ml-1 font-normal text-gray-500'>
                  ({shiftAndDutyRosterData.todaySummary.date})
                </span>
              </h3>
            </div>

            {/* STATS */}
            <div className='grid grid-cols-2 gap-3'>
              {shiftAndDutyRosterData.todaySummary.stats.map((stat) => {
                const Icon = todaySummaryIconMap[stat.iconKey];

                return (
                  <div key={stat.id} className='flex items-start gap-2'>
                    {/* ICON */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        stat.variant === "blue"
                          ? "bg-blue-50 text-blue-600"
                          : stat.variant === "green"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                      }`}
                    >
                      {Icon && <Icon size={15} />}
                    </div>

                    {/* VALUE */}
                    <div className='min-w-0'>
                      <p className='text-[9px] text-gray-500'>{stat.label}</p>

                      <p className='mt-0.5 text-sm font-semibold text-gray-800'>
                        {stat.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* COVERAGE */}
            <div className='mt-4'>
              <div className='mb-1 flex items-center justify-between'>
                <span className='text-[9px] font-medium text-gray-600'>
                  {shiftAndDutyRosterData.todaySummary.coverage.label}
                </span>

                <span className='text-[10px] font-semibold text-gray-700'>
                  {shiftAndDutyRosterData.todaySummary.coverage.value}%
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className='h-1.5 w-full overflow-hidden rounded-full bg-gray-200'>
                <div
                  className='h-full rounded-full bg-green-700 transition-all'
                  style={{
                    width: `${shiftAndDutyRosterData.todaySummary.coverage.value}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftAndDutyRoster;
