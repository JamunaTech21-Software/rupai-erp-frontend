import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";

import { attendanceAndFaceRecognitionData } from "../../data/HrWorkforceData/attendenceAndFaceRecognitionData";

import {
  LogOut,
  ChartNoAxesColumnIncreasing,
  Timer,
  Monitor,
  Search,
  Camera,
  CheckCircle2,
  SlidersHorizontal,
  MoreVertical,
  ScanFace,
  Download,
  MoreHorizontal,
  ChevronDown,
  CalendarDays,
  FileText,
  Settings,
  Users,
  XCircle,
  Clock3,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import Select from "../../components/common/Select";
const AttendenceAndFaceRecognition = () => {
  // =====================================================
  // DATA
  // =====================================================

  const {
    pageNavigation,
    topActions,
    summaryCards,
    filters,
    attendanceTable,
    liveCameraFeed,
    attendanceByStatus,
    attendanceTrend,
    deviceStatus,
    recentAttendanceLogs,
    todaySummary,
  } = attendanceAndFaceRecognitionData;

  // =====================================================
  // REACT HOOK FORM
  // =====================================================

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      date: filters.date.defaultValue,
      garden: "all",
      section: "all",
      shift: "all",
      status: "all",
      search: "",
    },
  });

  // =====================================================
  // FILTER SUBMIT
  // =====================================================

  const onFilterSubmit = () => {

    // Later:
    // API / TanStack Query filtering
  };

  // =====================================================
  // ICON MAP
  // =====================================================

  const navigationIconMap = {
    "attendance-sheet": CalendarDays,
    reports: FileText,
    settings: Settings,
  };

  const actionIconMap = {
    "live-monitor": Monitor,
    export: Download,
    more: MoreHorizontal,
  };

  const summaryIconMap = {
    total: Users,
    present: CheckCircle2,
    absent: XCircle,
    leave: CalendarDays,
    late: Clock3,
  };

  // =====================================================
  // SUMMARY CARD COLOR
  // =====================================================

  const getSummaryIconStyle = (status) => {
    switch (status) {
      case "total":
        return "bg-green-50 text-green-700";

      case "present":
        return "bg-green-50 text-green-700";

      case "absent":
        return "bg-purple-50 text-purple-600";

      case "leave":
        return "bg-orange-50 text-orange-500";

      case "late":
        return "bg-blue-50 text-blue-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-50 text-green-700";

      case "Late":
        return "bg-orange-50 text-orange-600";

      case "Absent":
        return "bg-red-50 text-red-600";

      case "On Leave":
        return "bg-blue-50 text-blue-600";

      case "Check Out":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className='space-y-4'>
      {/* =====================================================
          HR WORKFORCE TABS
      ====================================================== */}

      <HrWorkforceTabs />

      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}

      <div className='space-y-4'>
        {/* ===================================================
            1. TOP NAVIGATION + ACTIONS
        ==================================================== */}

        <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
          <div className='flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between'>
            {/* LEFT NAVIGATION */}

            <div className='min-w-0 flex-1 overflow-x-auto'>
              <div className='flex min-w-max items-center'>
                {pageNavigation.map((item) => {
                  const Icon = navigationIconMap[item.id];

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className={({ isActive }) =>
                        `relative flex h-10 items-center gap-2 px-3 text-sm font-medium transition ${
                          isActive
                            ? "text-green-700"
                            : "text-gray-600 hover:text-green-700"
                        }`
                      }
                    >
                      {Icon && <Icon size={15} />}

                      <span>{item.label}</span>

                      {item.active && (
                        <span className='absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-green-700' />
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* RIGHT ACTIONS */}

            <div className='flex flex-wrap items-center gap-2'>
              {topActions.map((action) => {
                const Icon = actionIconMap[action.id];

                if (action.id === "more") {
                  return (
                    <button
                      key={action.id}
                      type='button'
                      className='inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50'
                    >
                      {Icon && <Icon size={16} />}

                      <span>{action.label}</span>

                      {action.hasDropdown && <ChevronDown size={15} />}
                    </button>
                  );
                }

                return (
                  <button
                    key={action.id}
                    type='button'
                    className={
                      action.type === "primary"
                        ? "inline-flex h-10 items-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition hover:bg-green-800"
                        : "inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    }
                  >
                    {Icon && <Icon size={16} />}

                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===================================================
            2. SUMMARY CARDS
        ==================================================== */}

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5'>
          {summaryCards.map((card) => {
            const Icon = summaryIconMap[card.status];

            return (
              <div
                key={card.id}
                className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'
              >
                <div className='flex items-center gap-3'>
                  {/* ICON */}

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${getSummaryIconStyle(
                      card.status,
                    )}`}
                  >
                    {Icon && <Icon size={21} />}
                  </div>

                  {/* CONTENT */}

                  <div className='min-w-0'>
                    <p className='text-xs font-medium text-gray-500'>
                      {card.title}
                    </p>

                    <h3 className='mt-1 text-xl font-bold leading-none text-gray-800'>
                      {card.value.toLocaleString()}
                    </h3>

                    <p
                      className={`mt-1 text-xs font-medium ${
                        card.status === "present"
                          ? "text-green-700"
                          : "text-gray-500"
                      }`}
                    >
                      {card.percentage || card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================
            3. MAIN CONTENT
        ==================================================== */}

        <div className='grid grid-cols-1 gap-2 xl:grid-cols-12'>
          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div className='space-y-4 xl:col-span-9'>
            {/* =================================================
                FILTER FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit(onFilterSubmit)}
              className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'
            >
              {/* FILTER FIELDS */}

              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
                {/* DATE */}

                <div>
                  <label className='mb-1.5 block text-xs font-medium text-gray-600'>
                    {filters.date.label}
                  </label>

                  <input
                    type='date'
                    {...register(filters.date.name)}
                    className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600'
                  />
                </div>

                {/* GARDEN */}

                <div>
                  <label className='mb-1.5 block text-xs font-medium text-gray-600'>
                    {filters.garden.label}
                  </label>

                  <Select
                    {...register(filters.garden.name)}
                    className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600'
                  >
                    {filters.garden.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* SECTION */}

                <div>
                  <label className='mb-1.5 block text-xs font-medium text-gray-600'>
                    {filters.section.label}
                  </label>

                  <Select
                    {...register(filters.section.name)}
                    className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600'
                  >
                    {filters.section.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* SHIFT */}

                <div>
                  <label className='mb-1.5 block text-xs font-medium text-gray-600'>
                    {filters.shift.label}
                  </label>

                  <Select
                    {...register(filters.shift.name)}
                    className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600'
                  >
                    {filters.shift.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* STATUS */}

                <div>
                  <label className='mb-1.5 block text-xs font-medium text-gray-600'>
                    {filters.status.label}
                  </label>

                  <Select
                    {...register(filters.status.name)}
                    className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600'
                  >
                    {filters.status.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* SEARCH */}

                <div>
                  <label className='mb-1.5 block text-xs font-medium text-gray-600'>
                    {filters.search.label}
                  </label>

                  <div className='relative'>
                    <Search
                      size={15}
                      className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                    />

                    <input
                      type='text'
                      {...register(filters.search.name)}
                      placeholder={filters.search.placeholder}
                      className='h-10 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-xs text-gray-700 outline-none placeholder:text-gray-400 focus:border-green-600'
                    />
                  </div>
                </div>
              </div>

              {/* FORM ACTIONS */}

              <div className='mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end'>
                {/* RESET */}

                <button
                  type='button'
                  onClick={() => reset()}
                  className='inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-xs font-medium text-gray-600 transition hover:bg-gray-50'
                >
                  Reset
                </button>

                {/* APPLY */}

                <button
                  type='submit'
                  className='inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-xs font-medium text-white transition hover:bg-green-800'
                >
                  <SlidersHorizontal size={15} />

                  {filters.filterButton.label}
                </button>
              </div>
            </form>

            {/* =================================================
                ATTENDANCE TABLE
            ================================================== */}

            <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* TABLE HEADER */}

              <div className='border-b border-gray-200 px-4 py-3'>
                <h3 className='text-sm font-semibold text-green-700'>
                  {attendanceTable.title}
                </h3>
              </div>

              {/* TABLE */}

              <div className='overflow-x-auto'>
                <table className='w-full min-w-[1050px] text-left text-xs'>
                  {/* HEAD */}

                  <thead className='bg-gray-50'>
                    <tr>
                      {attendanceTable.headers.map((header) => (
                        <th
                          key={header.id}
                          className='whitespace-nowrap px-3 py-3 text-[11px] font-semibold text-gray-600'
                        >
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* BODY */}

                  <tbody className='divide-y divide-gray-100'>
                    {attendanceTable.rows.map((row) => (
                      <tr
                        key={row.workerId}
                        className='transition hover:bg-gray-50'
                      >
                        {/* SL */}

                        <td className='whitespace-nowrap px-3 py-2.5 text-gray-600'>
                          {row.sl}
                        </td>

                        {/* WORKER ID */}

                        <td className='whitespace-nowrap px-3 py-2.5 font-medium text-gray-700'>
                          {row.workerId}
                        </td>

                        {/* WORKER */}

                        <td className='whitespace-nowrap px-3 py-2.5'>
                          <div className='flex items-center gap-2'>
                            {row.workerPhoto ? (
                              <img
                                src={row.workerPhoto}
                                alt={row.workerName}
                                className='h-7 w-7 rounded-full object-cover'
                              />
                            ) : (
                              <div className='flex h-7 w-7 items-center justify-center rounded-full bg-gray-100'>
                                <Users size={13} className='text-gray-400' />
                              </div>
                            )}

                            <span className='font-medium text-gray-700'>
                              {row.workerName}
                            </span>
                          </div>
                        </td>

                        {/* SECTION */}

                        <td className='whitespace-nowrap px-3 py-2.5 text-gray-600'>
                          {row.section}
                        </td>

                        {/* SHIFT */}

                        <td className='whitespace-nowrap px-3 py-2.5 text-gray-600'>
                          {row.shift}
                        </td>

                        {/* CHECK IN */}

                        <td
                          className={`whitespace-nowrap px-3 py-2.5 font-medium ${
                            row.status === "Late"
                              ? "text-orange-500"
                              : row.checkIn
                                ? "text-green-700"
                                : "text-gray-400"
                          }`}
                        >
                          {row.checkIn || "-"}
                        </td>

                        {/* CHECK OUT */}

                        <td
                          className={`whitespace-nowrap px-3 py-2.5 font-medium ${
                            row.checkOut ? "text-green-700" : "text-gray-400"
                          }`}
                        >
                          {row.checkOut || "-"}
                        </td>

                        {/* STATUS */}

                        <td className='whitespace-nowrap px-3 py-2.5'>
                          <span
                            className={`rounded-md px-2 py-1 text-[10px] font-medium ${getStatusStyle(
                              row.status,
                            )}`}
                          >
                            {row.status}
                          </span>
                        </td>

                        {/* METHOD */}

                        <td className='whitespace-nowrap px-3 py-2.5'>
                          {row.method ? (
                            <div className='flex items-center justify-center'>
                              <ScanFace size={17} className='text-gray-600' />
                            </div>
                          ) : (
                            <span className='text-gray-400'>-</span>
                          )}
                        </td>

                        {/* PHOTO */}

                        <td className='whitespace-nowrap px-3 py-2.5'>
                          {row.workerPhoto ? (
                            <img
                              src={row.workerPhoto}
                              alt={row.workerName}
                              className='h-7 w-7 rounded-md object-cover'
                            />
                          ) : (
                            <span className='text-gray-400'>-</span>
                          )}
                        </td>

                        {/* ACTION */}

                        <td className='whitespace-nowrap px-3 py-2.5'>
                          <div className='flex items-center gap-1'>
                            {row.action?.view && (
                              <button
                                type='button'
                                className='rounded-md border border-gray-200 px-2.5 py-1 text-[10px] font-medium text-gray-600 transition hover:bg-gray-50'
                              >
                                View
                              </button>
                            )}

                            {row.action?.more && (
                              <button
                                type='button'
                                className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50'
                              >
                                <MoreVertical size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}

              <div className='flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
                {/* ENTRY INFO */}

                <p className='text-xs text-gray-500'>
                  Showing{" "}
                  <span className='font-medium text-gray-700'>
                    {attendanceTable.pagination.showingFrom}
                  </span>{" "}
                  to{" "}
                  <span className='font-medium text-gray-700'>
                    {attendanceTable.pagination.showingTo}
                  </span>{" "}
                  of{" "}
                  <span className='font-medium text-gray-700'>
                    {attendanceTable.pagination.totalEntries.toLocaleString()}
                  </span>{" "}
                  entries
                </p>

                {/* PAGINATION */}

                <div className='flex items-center gap-1'>
                  {/* PREVIOUS */}

                  <button
                    type='button'
                    className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50'
                  >
                    ‹
                  </button>

                  {/* PAGE NUMBERS */}

                  {attendanceTable.pagination.pageNumbers.map((page) => (
                    <button
                      key={page}
                      type='button'
                      className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs transition ${
                        page === attendanceTable.pagination.currentPage
                          ? "border-green-700 bg-green-700 text-white"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* ELLIPSIS */}

                  {attendanceTable.pagination.showEllipsis && (
                    <button
                      type='button'
                      className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-xs text-gray-500'
                    >
                      ...
                    </button>
                  )}

                  {/* LAST PAGE */}

                  <button
                    type='button'
                    className='flex h-8 w-10 items-center justify-center rounded-md border border-gray-200 text-xs text-gray-600 transition hover:bg-gray-50'
                  >
                    {attendanceTable.pagination.totalPages}
                  </button>

                  {/* NEXT */}

                  <button
                    type='button'
                    className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50'
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div className='space-y-4 xl:col-span-3'>
            {/* =================================================
                LIVE CAMERA FEED
            ================================================== */}

            {/* =====================================================
                    LIVE CAMERA FEED
                ===================================================== */}

            <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
              {/* HEADER */}

              <div className='mb-3 flex items-center justify-between'>
                <h3 className='text-sm font-semibold text-green-700'>
                  {liveCameraFeed.title}
                </h3>

                {/* LIVE STATUS */}

                <div className='inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700'>
                  <span className='h-1.5 w-1.5 rounded-full bg-green-600' />

                  {liveCameraFeed.status}
                </div>
              </div>

              {/* ===================================================
                        CAMERA + WORKER INFORMATION
                    ==================================================== */}

              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1.1fr_0.9fr]'>
                {/* =================================================
                        CAMERA
                    ================================================== */}

                <div className='relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50'>
                  {liveCameraFeed.capturedWorker.photo ? (
                    <img
                      src={liveCameraFeed.capturedWorker.photo}
                      alt={liveCameraFeed.capturedWorker.name}
                      className='h-52 w-full object-cover'
                    />
                  ) : (
                    <div className='flex h-52 items-center justify-center text-gray-400'>
                      <Camera size={32} />
                    </div>
                  )}

                  {/* FACE DETECTION FRAME */}

                  <div className='pointer-events-none absolute inset-5 rounded-lg border-2 border-green-500/80' />

                  {/* TOP LEFT CAMERA INDICATOR */}

                  <div className='absolute left-2 top-2 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-[9px] font-medium text-white backdrop-blur-sm'>
                    <span className='h-1.5 w-1.5 rounded-full bg-green-400' />
                    Live
                  </div>
                </div>

                {/* =================================================
                        WORKER INFORMATION
                    ================================================== */}

                <div className='min-w-0 space-y-2'>
                  {/* TIME */}

                  <div>
                    <p className='text-sm font-bold leading-tight text-gray-800'>
                      {liveCameraFeed.capturedWorker.capturedAt}
                    </p>

                    <p className='text-[10px] text-gray-500'>
                      {liveCameraFeed.capturedWorker.date} |{" "}
                      {liveCameraFeed.capturedWorker.day}
                    </p>
                  </div>

                  {/* WORKER ID */}

                  <div>
                    <p className='text-[10px] font-medium text-gray-500'>
                      Worker ID
                    </p>

                    <p className='text-xs font-semibold text-gray-700'>
                      {liveCameraFeed.capturedWorker.workerId}
                    </p>
                  </div>

                  {/* NAME */}

                  <div>
                    <p className='text-[10px] font-medium text-gray-500'>
                      Name
                    </p>

                    <p className='truncate text-xs font-semibold text-gray-700'>
                      {liveCameraFeed.capturedWorker.name}
                    </p>
                  </div>

                  {/* SECTION */}

                  <div>
                    <p className='text-[10px] font-medium text-gray-500'>
                      Section
                    </p>

                    <p className='text-xs font-semibold text-gray-700'>
                      {liveCameraFeed.capturedWorker.section}
                    </p>
                  </div>

                  {/* STATUS */}

                  <div>
                    <p className='text-[10px] font-medium text-gray-500'>
                      Status
                    </p>

                    <span
                      className={`mt-0.5 inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${
                        liveCameraFeed.capturedWorker.status === "Present"
                          ? "bg-green-50 text-green-700"
                          : liveCameraFeed.capturedWorker.status === "Late"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {liveCameraFeed.capturedWorker.status}
                    </span>
                  </div>

                  {/* DEVICE */}

                  <div>
                    <p className='text-[10px] font-medium text-gray-500'>
                      Device
                    </p>

                    <p className='text-xs font-semibold text-gray-700'>
                      {liveCameraFeed.capturedWorker.device}
                    </p>
                  </div>
                </div>
              </div>

              {/* ===================================================
                      CAPTURE RESULT
                  ==================================================== */}

              <button
                type='button'
                className='mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-green-700 text-xs font-medium text-white transition hover:bg-green-800'
              >
                <CheckCircle2 size={12} />

                {liveCameraFeed.captureResult.message}
              </button>
            </div>

            {/* =================================================
                ATTENDANCE BY STATUS
            ================================================== */}

            {/* =====================================================
                  ATTENDANCE BY STATUS
              ===================================================== */}

            <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
              {/* HEADER */}

              <h3 className='text-sm font-semibold text-green-700'>
                {attendanceByStatus.title}
              </h3>

              {/* DONUT + LEGEND */}

              <div className='mt-4 flex items-center gap-5'>
                {/* =================================================
                    DONUT CHART
                ================================================== */}

                <div className='relative flex h-32 w-32 shrink-0 items-center justify-center'>
                  {(() => {
                    const total = attendanceByStatus.data.reduce(
                      (sum, item) => sum + item.value,
                      0,
                    );

                    let currentAngle = 0;

                    const segments = attendanceByStatus.data.map((item) => {
                      const percentage = (item.value / total) * 100;

                      const startAngle = currentAngle;

                      currentAngle += percentage;

                      return {
                        ...item,
                        percentageValue: percentage,
                        startAngle,
                        endAngle: currentAngle,
                      };
                    });

                    const gradient = segments
                      .map((item) => {
                        const color =
                          item.status === "present"
                            ? "#16a34a"
                            : item.status === "absent"
                              ? "#ef4444"
                              : item.status === "leave"
                                ? "#3b82f6"
                                : "#f59e0b";

                        return `${color} ${item.startAngle}% ${item.endAngle}%`;
                      })
                      .join(", ");

                    return (
                      <div
                        className='flex h-32 w-32 items-center justify-center rounded-full'
                        style={{
                          background: `conic-gradient(${gradient})`,
                        }}
                      >
                        {/* INNER CIRCLE */}

                        <div className='flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-white'>
                          <span className='text-lg font-bold text-gray-800'>
                            {attendanceByStatus.data.find(
                              (item) => item.status === "present",
                            )?.percentage || "0%"}
                          </span>

                          <span className='text-[9px] text-gray-500'>
                            Attendance
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* =================================================
                        STATUS LEGEND
                    ================================================== */}

                <div className='min-w-0 flex-1 space-y-3'>
                  {attendanceByStatus.data.map((item) => {
                    const dotColor =
                      item.status === "present"
                        ? "bg-green-600"
                        : item.status === "absent"
                          ? "bg-red-500"
                          : item.status === "leave"
                            ? "bg-blue-500"
                            : "bg-orange-500";

                    return (
                      <div
                        key={item.id}
                        className='flex items-center justify-between gap-2 text-xs'
                      >
                        {/* LABEL */}

                        <div className='flex min-w-0 items-center gap-2'>
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${dotColor}`}
                          />

                          <span className='truncate text-gray-600'>
                            {item.label}
                          </span>
                        </div>

                        {/* VALUE */}

                        <span className='shrink-0 text-[10px] font-medium text-gray-700'>
                          {item.value.toLocaleString()} ({item.percentage})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            4. BOTTOM SECTION
        ==================================================== */}

        <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-[1.35fr_0.8fr_1fr_1.05fr]'>
          {/* ATTENDANCE TREND */}

          {/* ===================================================
                ATTENDANCE TREND
            =================================================== */}

          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* HEADER */}

            <h3 className='text-sm font-semibold text-green-700'>
              {attendanceTrend.title}
            </h3>

            {/* CHART */}

            <div className='mt-3 h-[175px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart
                  data={attendanceTrend.data}
                  margin={{
                    top: 18,
                    right: 8,
                    left: -18,
                    bottom: 5,
                  }}
                >
                  {/* GRID */}

                  <CartesianGrid
                    stroke='#e5e7eb'
                    strokeDasharray='2 2'
                    vertical={false}
                  />

                  {/* Y AXIS */}

                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 9,
                      fill: "#6b7280",
                    }}
                    tickFormatter={(value) => `${value}%`}
                  />

                  {/* X AXIS */}

                  <XAxis
                    dataKey='day'
                    axisLine={false}
                    tickLine={false}
                    height={35}
                    tick={(props) => {
                      const { x, y, payload } = props;

                      const currentItem = attendanceTrend.data.find(
                        (item) => item.day === payload.value,
                      );

                      return (
                        <g>
                          {/* DAY */}

                          <text
                            x={x}
                            y={y + 8}
                            textAnchor='middle'
                            fill='#4b5563'
                            fontSize='9'
                            fontWeight='500'
                          >
                            {currentItem?.day}
                          </text>

                          {/* DATE */}

                          <text
                            x={x}
                            y={y + 20}
                            textAnchor='middle'
                            fill='#9ca3af'
                            fontSize='8'
                          >
                            {currentItem?.date}
                          </text>
                        </g>
                      );
                    }}
                  />

                  {/* TOOLTIP */}

                  <Tooltip
                    formatter={(value) => [`${value}%`, "Attendance"]}
                    labelFormatter={(label) => {
                      const item = attendanceTrend.data.find(
                        (data) => data.day === label,
                      );

                      return item ? `${item.day} ${item.date}` : label;
                    }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "10px",
                      padding: "6px 8px",
                    }}
                  />

                  {/* LINE */}

                  <Line
                    type='monotone'
                    dataKey='value'
                    stroke='#15803d'
                    strokeWidth={2}
                    dot={{
                      r: 3.5,
                      fill: "#15803d",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 5,
                    }}
                  >
                    {/* VALUE LABEL */}

                    <LabelList
                      dataKey='value'
                      position='top'
                      formatter={(value) => `${value}%`}
                      style={{
                        fontSize: 8,
                        fontWeight: 600,
                        fill: "#166534",
                      }}
                    />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ===================================================
                  DEVICE STATUS
              =================================================== */}

          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* HEADER */}

            <h3 className='text-sm font-semibold text-green-700'>
              {deviceStatus.title}
            </h3>

            {/* DEVICE LIST */}

            <div className='mt-4 space-y-3'>
              {deviceStatus.devices.map((device) => {
                const isOnline = device.status === "Online";

                return (
                  <div
                    key={device.id}
                    className='flex items-center justify-between gap-2'
                  >
                    {/* DEVICE INFO */}

                    <div className='flex min-w-0 items-center gap-2'>
                      {/* DEVICE ICON */}

                      <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-green-100 bg-green-50'>
                        <Monitor size={14} className='text-green-700' />
                      </div>

                      {/* DEVICE NAME */}

                      <span className='truncate text-[10px] font-medium text-gray-600'>
                        {device.name}
                      </span>
                    </div>

                    {/* STATUS */}

                    <span
                      className={`shrink-0 rounded-md px-2 py-1 text-[9px] font-medium ${
                        isOnline
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {device.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RECENT LOGS */}

          {/* ===================================================
              RECENT ATTENDANCE LOGS
          =================================================== */}

          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* HEADER */}

            <h3 className='text-sm font-semibold text-green-700'>
              {recentAttendanceLogs.title}
            </h3>

            {/* LOG LIST */}

            <div className='mt-4 space-y-3'>
              {recentAttendanceLogs.logs.map((log) => (
                <div key={log.id} className='flex items-center gap-2'>
                  {/* WORKER IMAGE */}

                  <div className='h-8 w-8 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100'>
                    {log.workerPhoto ? (
                      <img
                        src={log.workerPhoto}
                        alt={log.workerName}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center text-[9px] font-semibold text-gray-400'>
                        {log.workerName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* WORKER INFO */}

                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-[10px] font-semibold text-gray-700'>
                      {log.workerName}
                    </p>

                    <p className='text-[9px] text-gray-400'>{log.workerId}</p>
                  </div>

                  {/* TIME */}

                  <span className='shrink-0 text-[9px] text-gray-500'>
                    {log.time}
                  </span>

                  {/* STATUS */}

                  <span
                    className={`shrink-0 rounded-md px-2 py-1 text-[9px] font-medium ${
                      log.status === "Present"
                        ? "bg-green-50 text-green-700"
                        : log.status === "Late"
                          ? "bg-orange-50 text-orange-600"
                          : log.status === "Check Out"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================
                  TODAY'S SUMMARY
              =================================================== */}

          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* HEADER */}

            <h3 className='text-sm font-semibold text-green-700'>
              {todaySummary.title}
            </h3>

            {/* SUMMARY ITEMS */}

            <div className='mt-4 space-y-2.5'>
              {todaySummary.items.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2.5'
                >
                  {/* LEFT SIDE */}

                  <div className='flex min-w-0 items-center gap-2'>
                    {/* ICON */}

                    <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-50'>
                      {item.type === "time" &&
                      item.id === "average-check-in" ? (
                        <Clock3 size={14} className='text-green-700' />
                      ) : item.type === "time" ? (
                        <LogOut size={14} className='text-green-700' />
                      ) : item.type === "percentage" ? (
                        <ChartNoAxesColumnIncreasing
                          size={14}
                          className='text-green-700'
                        />
                      ) : (
                        <Timer size={14} className='text-green-700' />
                      )}
                    </div>

                    {/* LABEL */}

                    <span className='truncate text-[10px] font-medium text-gray-600'>
                      {item.label}
                    </span>
                  </div>

                  {/* VALUE */}

                  <span className='shrink-0 text-[11px] font-semibold text-gray-700'>
                    {item.value}
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

export default AttendenceAndFaceRecognition;
