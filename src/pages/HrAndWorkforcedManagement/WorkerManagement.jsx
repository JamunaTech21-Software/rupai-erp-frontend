import React from "react";
import { workerManagementData } from "../../data/HrWorkforceData/workerManagementData";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";

import {
  Plus,
  Upload,
  Building2,
  FileText,
  ClipboardCheck,
  FileSpreadsheet,
  IdCard,
  ArrowRightLeft,
  UserMinus,
  Download,
  MoreHorizontal,
  Users,
  UserCheck,
  CalendarDays,
  UserX,
  UserPlus,
  Search,
  SlidersHorizontal,
  Eye,
  Pencil,
  MoreVertical,
  BriefcaseBusiness,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

const summaryIconMap = {
  users: Users,
  "user-check": UserCheck,
  calendar: CalendarDays,
  "user-x": UserX,
  "user-plus": UserPlus,
};

const summaryColorMap = {
  green: {
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
  },

  orange: {
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },

  red: {
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },

  blue: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
};
const statusStyleMap = {
  Active: "bg-green-50 text-green-700",
  "On Leave": "bg-orange-50 text-orange-600",
  Inactive: "bg-red-50 text-red-600",
  Resigned: "bg-gray-100 text-gray-600",
};
const workerTypeIconMap = {
  regular: Users,
  casual: UserCheck,
  temporary: UserPlus,
};
const actionIconMap = {
  attendance: ClipboardCheck,
  wage: FileSpreadsheet,
  idCard: IdCard,
  transfer: ArrowRightLeft,
  resignation: UserMinus,
  more: MoreHorizontal,
};
const documentIconMap = {
  upload: Upload,
  bank: Building2,
  document: FileText,
};
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Select from "../../components/common/Select";
const WorkerManagement = () => {
  return (
    <div className='space-y-4'>
      {/* =====================================================
          HR WORKFORCE TABS
      ====================================================== */}
      <HrWorkforceTabs />

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className='p-2'>
        <div className='flex justify-end'>
          <div className='grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto'>
            {/* ADD NEW WORKER */}
            <button
              type='button'
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-green-700 px-3 text-sm font-medium text-white transition hover:bg-green-800 sm:px-4'
            >
              <Plus size={17} />
              Add New Worker
            </button>

            {/* IMPORT */}
            <button
              type='button'
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:px-4'
            >
              <Upload size={16} />
              Import
            </button>

            {/* EXPORT */}
            <button
              type='button'
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:px-4'
            >
              <Download size={16} />
              Export
            </button>

            {/* MORE */}
            <button
              type='button'
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:px-4'
            >
              <MoreHorizontal size={17} />
              More
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
              SUMMARY CARDS
          ====================================================== */}
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5'>
        {workerManagementData.summaryCards.map((card) => {
          const Icon = summaryIconMap[card.icon];

          const colors = summaryColorMap[card.bgColor] || summaryColorMap.green;

          return (
            <div
              key={card.id}
              className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md'
            >
              <div className='flex items-center gap-3'>
                {/* ICON */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors.iconBg} ${colors.iconColor}`}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>

                {/* CONTENT */}
                <div className='min-w-0'>
                  <p className='truncate text-[11px] font-medium text-gray-500'>
                    {card.title}
                  </p>

                  <h3 className='mt-1 text-lg font-semibold leading-none text-gray-800'>
                    {card.value.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className='grid grid-cols-1 gap-2 xl:grid-cols-12'>
        {/* ===================================================
                WORKER LIST
            ==================================================== */}
        <div className='xl:col-span-8'>
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* =================================================
                    SECTION HEADER
                ================================================== */}
            <div className='mb-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Worker List
              </h2>
            </div>

            {/* =================================================
                    FILTER AREA
                ================================================== */}
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
              {/* =================================================
                      GARDEN / UNIT
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Garden / Unit
                </label>

                <Select className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  {workerManagementData.filters.gardenOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* =================================================
                      SECTION
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Section
                </label>

                <Select className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  {workerManagementData.filters.sectionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* =================================================
                      CATEGORY
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Category
                </label>

                <Select className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  {workerManagementData.filters.categoryOptions.map(
                    (option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ),
                  )}
                </Select>
              </div>

              {/* =================================================
                      WORKER TYPE
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Worker Type
                </label>

                <Select className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  {workerManagementData.filters.workerTypeOptions.map(
                    (option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ),
                  )}
                </Select>
              </div>

              {/* =================================================
                      STATUS
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Status
                </label>

                <Select className='h-9 w-full rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-green-600'>
                  {workerManagementData.filters.statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>

              {/* =================================================
                      SEARCH
                  ================================================== */}
              <div>
                <label className='mb-1 block text-[11px] font-medium text-gray-600'>
                  Search Worker
                </label>

                <div className='relative'>
                  <Search
                    size={14}
                    className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400'
                  />

                  <input
                    type='text'
                    placeholder={
                      workerManagementData.filters.search.placeholder
                    }
                    className='h-9 w-full rounded-lg border border-gray-300 pl-8 pr-2 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600'
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                    FILTER BUTTON
                ================================================== */}
            <div className='mt-3 flex justify-end'>
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-500 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700'
              >
                <SlidersHorizontal size={15} />
              </button>
            </div>

            {/* =================================================
                    WORKER TABLE
                ================================================== */}
            <div className='mt-3 overflow-x-auto rounded-lg border border-gray-200'>
              <table className='min-w-[950px] w-full'>
                {/* =================================================
                        TABLE HEADER
                    ================================================== */}
                <thead className='bg-gray-50'>
                  <tr className='border-b border-gray-200'>
                    {workerManagementData.tableHeaders.map((header) => (
                      <th
                        key={header.id}
                        className='whitespace-nowrap px-3 py-2.5 text-left text-[10px] font-semibold text-gray-600'
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* =================================================
                        TABLE BODY
                    ================================================== */}
                <tbody>
                  {workerManagementData.workers.map((worker) => (
                    <tr
                      key={worker.id}
                      className='border-b border-gray-100 transition hover:bg-gray-50'
                    >
                      {/* SL */}
                      <td className='px-3 py-2.5 text-[10px] text-gray-600'>
                        {worker.sl}
                      </td>

                      {/* WORKER ID */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-[10px] font-medium text-gray-700'>
                        {worker.workerId}
                      </td>

                      {/* PHOTO */}
                      <td className='px-3 py-2.5'>
                        <div className='h-7 w-7 overflow-hidden rounded-full border border-gray-200 bg-gray-100'>
                          <img
                            src={worker.photo}
                            alt={worker.workerName}
                            className='h-full w-full object-cover'
                          />
                        </div>
                      </td>

                      {/* WORKER NAME */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-[10px] font-medium text-gray-700'>
                        {worker.workerName}
                      </td>

                      {/* FATHER NAME */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>
                        {worker.fatherName}
                      </td>

                      {/* CATEGORY */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>
                        {worker.category}
                      </td>

                      {/* SECTION */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>
                        {worker.section}
                      </td>

                      {/* MOBILE */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>
                        {worker.mobile}
                      </td>

                      {/* JOIN DATE */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-[10px] text-gray-600'>
                        {worker.joinDate}
                      </td>

                      {/* STATUS */}
                      <td className='px-3 py-2.5'>
                        <span
                          className={`whitespace-nowrap rounded-md px-2 py-1 text-[9px] font-medium ${
                            statusStyleMap[worker.status] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {worker.status}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className='px-3 py-2.5'>
                        <div className='flex items-center gap-1'>
                          {/* VIEW */}
                          <button
                            type='button'
                            title='View Worker'
                            className='flex h-7 w-7 items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50'
                          >
                            <Eye size={14} />
                          </button>

                          {/* EDIT */}
                          <button
                            type='button'
                            title='Edit Worker'
                            className='flex h-7 w-7 items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50'
                          >
                            <Pencil size={14} />
                          </button>

                          {/* MORE */}
                          <button
                            type='button'
                            title='More Actions'
                            className='flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100'
                          >
                            <MoreVertical size={14} />
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
            <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              {/* SHOWING INFO */}
              <p className='text-[11px] text-gray-500'>
                Showing{" "}
                <span className='font-medium text-gray-700'>
                  {workerManagementData.pagination.showingFrom}
                </span>{" "}
                to{" "}
                <span className='font-medium text-gray-700'>
                  {workerManagementData.pagination.showingTo}
                </span>{" "}
                of{" "}
                <span className='font-medium text-gray-700'>
                  {workerManagementData.pagination.totalItems.toLocaleString()}
                </span>{" "}
                entries
              </p>

              {/* PAGE BUTTONS */}
              <div className='flex items-center gap-1'>
                {/* PREVIOUS */}
                <button
                  type='button'
                  className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-xs text-gray-500 hover:bg-gray-50'
                >
                  ‹
                </button>

                {/* PAGE NUMBERS */}
                {workerManagementData.pagination.pages.map((page, index) => {
                  const isActive =
                    page === workerManagementData.pagination.currentPage;

                  if (page === "...") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className='flex h-7 w-7 items-center justify-center text-xs text-gray-500'
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      type='button'
                      className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium transition ${
                        isActive
                          ? "bg-green-700 text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* NEXT */}
                <button
                  type='button'
                  className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-xs text-gray-500 hover:bg-gray-50'
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
                WORKER PROFILE
            ==================================================== */}
        <div className='xl:col-span-4'>
          <div className='h-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            {/* =================================================
                    PROFILE HEADER
                ================================================== */}
            <div className='flex items-center justify-between'>
              <h2 className='text-sm font-semibold text-green-700'>
                Worker Profile
              </h2>

              {/* STATUS */}
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                  workerManagementData.workerProfile.status === "Active"
                    ? "bg-green-50 text-green-700"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                <span className='h-1.5 w-1.5 rounded-full bg-current' />

                {workerManagementData.workerProfile.status}
              </span>
            </div>

            {/* =================================================
                    PROFILE BASIC INFORMATION
                ================================================== */}
            <div className='mt-4 flex gap-4 border-b border-gray-200 pb-4'>
              {/* PROFILE IMAGE */}
              <div className='h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100'>
                <img
                  src={workerManagementData.workerProfile.photo}
                  alt={workerManagementData.workerProfile.workerName}
                  className='h-full w-full object-cover'
                />
              </div>

              {/* BASIC DETAILS */}
              <div className='min-w-0 flex-1'>
                {/* NAME */}
                <h3 className='truncate text-base font-semibold text-gray-800'>
                  {workerManagementData.workerProfile.workerName}
                </h3>

                {/* WORKER ID */}
                <p className='mt-0.5 text-[10px] font-medium text-gray-500'>
                  {workerManagementData.workerProfile.workerId}
                </p>

                {/* DESIGNATION */}
                <div className='mt-2 flex items-center gap-2'>
                  <BriefcaseBusiness
                    size={13}
                    className='shrink-0 text-green-700'
                  />

                  <span className='truncate text-[10px] text-gray-600'>
                    {workerManagementData.workerProfile.designation}
                  </span>
                </div>

                {/* SECTION */}
                <div className='mt-1.5 flex items-center gap-2'>
                  <MapPin size={13} className='shrink-0 text-green-700' />

                  <span className='truncate text-[10px] text-gray-600'>
                    {workerManagementData.workerProfile.section}
                  </span>
                </div>

                {/* MOBILE */}
                <div className='mt-1.5 flex items-center gap-2'>
                  <Phone size={13} className='shrink-0 text-green-700' />

                  <span className='text-[10px] text-gray-600'>
                    {workerManagementData.workerProfile.mobile}
                  </span>
                </div>

                {/* EMAIL */}
                <div className='mt-1.5 flex items-center gap-2'>
                  <Mail size={13} className='shrink-0 text-green-700' />

                  <span className='truncate text-[10px] text-gray-600'>
                    {workerManagementData.workerProfile.email}
                  </span>
                </div>

                {/* JOIN DATE */}
                <div className='mt-1.5 flex items-center gap-2'>
                  <Calendar size={13} className='shrink-0 text-green-700' />

                  <span className='text-[10px] text-gray-600'>
                    {workerManagementData.workerProfile.joinDate}
                  </span>

                  <span className='text-[9px] text-gray-400'>Join Date</span>
                </div>
              </div>
            </div>

            {/* =================================================
                    PROFILE TABS
                ================================================== */}
            <div className='mt-3 overflow-x-auto border-b border-gray-200'>
              <div className='flex min-w-max'>
                {workerManagementData.profileTabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    type='button'
                    className={`whitespace-nowrap px-2.5 py-2 text-[9px] font-medium transition ${
                      index === 0
                        ? "border-b-2 border-green-700 text-green-700"
                        : "text-gray-500 hover:text-green-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                    PERSONAL INFORMATION
                ================================================== */}
            <div className='mt-4'>
              <div className='space-y-2.5'>
                {/* FATHER NAME */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Father's Name</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {workerManagementData.workerProfile.personalInfo.fatherName}
                  </span>
                </div>

                {/* MOTHER NAME */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Mother's Name</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {workerManagementData.workerProfile.personalInfo.motherName}
                  </span>
                </div>

                {/* DATE OF BIRTH */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Date of Birth</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {
                      workerManagementData.workerProfile.personalInfo
                        .dateOfBirth
                    }
                  </span>
                </div>

                {/* GENDER */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Gender</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {workerManagementData.workerProfile.personalInfo.gender}
                  </span>
                </div>

                {/* BLOOD GROUP */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Blood Group</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {workerManagementData.workerProfile.personalInfo.bloodGroup}
                  </span>
                </div>

                {/* MARITAL STATUS */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Marital Status</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {
                      workerManagementData.workerProfile.personalInfo
                        .maritalStatus
                    }
                  </span>
                </div>

                {/* NID */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>National ID No.</span>

                  <span className='text-gray-400'>:</span>

                  <span className='break-all font-medium text-gray-700'>
                    {workerManagementData.workerProfile.personalInfo.nidNumber}
                  </span>
                </div>

                {/* MOBILE */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Mobile No.</span>

                  <span className='text-gray-400'>:</span>

                  <span className='font-medium text-gray-700'>
                    {workerManagementData.workerProfile.personalInfo.mobile}
                  </span>
                </div>

                {/* PRESENT ADDRESS */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Present Address</span>

                  <span className='text-gray-400'>:</span>

                  <span className='leading-4 font-medium text-gray-700'>
                    {
                      workerManagementData.workerProfile.personalInfo
                        .presentAddress
                    }
                  </span>
                </div>

                {/* PERMANENT ADDRESS */}
                <div className='grid grid-cols-[105px_10px_1fr] gap-1 text-[10px]'>
                  <span className='text-gray-600'>Permanent Address</span>

                  <span className='text-gray-400'>:</span>

                  <span className='leading-4 font-medium text-gray-700'>
                    {
                      workerManagementData.workerProfile.personalInfo
                        .permanentAddress
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANALYTICS SECTION
      ====================================================== */}
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-12'>
        {/* =====================================================
                CATEGORY WISE WORKERS
            ====================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm xl:col-span-3'>
          {/* HEADER */}
          <h3 className='text-sm font-semibold text-green-700'>
            Category Wise Workers
          </h3>

          {/* CHART + LEGEND */}
          <div className='mt-3 grid grid-cols-2 items-center gap-2'>
            {/* =================================================
                    DONUT CHART
                ================================================== */}
            <div className='h-[170px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={workerManagementData.categoryWiseWorkers}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={1}
                    stroke='white'
                    strokeWidth={2}
                  >
                    {workerManagementData.categoryWiseWorkers.map((item) => (
                      <Cell key={item.id} fill={item.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [
                      `${Number(value).toLocaleString()} Workers`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* =================================================
                    LEGEND
                ================================================== */}
            <div className='space-y-3'>
              {workerManagementData.categoryWiseWorkers.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center justify-between gap-2'
                >
                  {/* CATEGORY */}
                  <div className='flex min-w-0 items-center gap-2'>
                    <span
                      className='h-2 w-2 shrink-0 rounded-sm'
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span className='truncate text-[10px] font-medium text-gray-600'>
                      {item.name}
                    </span>
                  </div>

                  {/* VALUE */}
                  <span className='whitespace-nowrap text-[10px] font-medium text-gray-700'>
                    {Number(item.value).toLocaleString()}{" "}
                    <span className='text-gray-400'>({item.percentage}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
                SECTION WISE DISTRIBUTION
            ====================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-3'>
          {/* HEADER */}
          <h3 className='text-sm font-semibold text-green-700'>
            Section Wise Distribution
          </h3>

          {/* DISTRIBUTION LIST */}
          <div className='mt-5 space-y-3'>
            {workerManagementData.sectionWiseDistribution.map((item) => (
              <div key={item.id} className='flex items-center gap-3'>
                {/* SECTION NAME */}
                <div className='w-[82px] shrink-0'>
                  <span className='text-[10px] font-medium text-gray-600'>
                    {item.name}
                  </span>
                </div>

                {/* BAR */}
                <div className='min-w-0 flex-1'>
                  <div className='h-2 overflow-hidden rounded-full bg-gray-100'>
                    <div
                      className='h-full rounded-full bg-green-700 transition-all duration-500'
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* VALUE */}
                <div className='w-9 shrink-0 text-right'>
                  <span className='text-[10px] font-semibold text-gray-700'>
                    {Number(item.value).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
                WORKER TYPES
            ====================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-2'>
          {/* HEADER */}
          <h3 className='text-sm font-semibold text-green-700'>Worker Types</h3>

          {/* WORKER TYPE LIST */}
          <div className='mt-5 space-y-4'>
            {workerManagementData.workerTypes.map((item) => {
              const Icon = workerTypeIconMap[item.icon] || Users;

              return (
                <div
                  key={item.id}
                  className='flex items-center justify-between gap-2'
                >
                  {/* LEFT SIDE */}
                  <div className='flex min-w-0 items-center gap-2'>
                    {/* ICON */}
                    <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700'>
                      <Icon size={15} />
                    </div>

                    {/* NAME */}
                    <span className='truncate text-[10px] font-medium text-gray-600'>
                      {item.name}
                    </span>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className='whitespace-nowrap text-right'>
                    <span className='text-[10px] font-semibold text-gray-700'>
                      {Number(item.value).toLocaleString()}
                    </span>

                    <span className='ml-1 text-[9px] text-gray-400'>
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
                RECENT JOINEES
            ====================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-4'>
          {/* HEADER */}
          <h3 className='text-sm font-semibold text-green-700'>
            Recent Joinees
          </h3>

          {/* TABLE */}
          <div className='mt-4 overflow-hidden rounded-lg border border-gray-300'>
            <table className='w-full border-collapse'>
              {/* TABLE HEADER */}
              <thead className='bg-gray-50'>
                <tr>
                  <th className='border border-gray-300 px-3 py-2 text-left text-[9px] font-semibold text-gray-600'>
                    Worker ID
                  </th>

                  <th className='border border-gray-300 px-3 py-2 text-left text-[9px] font-semibold text-gray-600'>
                    Worker Name
                  </th>

                  <th className='border border-gray-300 px-3 py-2 text-right text-[9px] font-semibold text-gray-600'>
                    Join Date
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {workerManagementData.recentJoinees.map((worker) => (
                  <tr key={worker.id} className='transition hover:bg-gray-50'>
                    {/* WORKER ID */}
                    <td className='border border-gray-300 px-3 py-1.5 text-[9px] text-gray-600'>
                      {worker.workerId}
                    </td>

                    {/* WORKER NAME */}
                    <td className='border border-gray-300 px-3 py-1.5 text-[9px] font-medium text-gray-700'>
                      {worker.workerName}
                    </td>

                    {/* JOIN DATE */}
                    <td className='border border-gray-300 px-3 py-1.5 text-right text-[9px] text-gray-600'>
                      {worker.joinDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VIEW ALL */}
          <button
            type='button'
            className='mt-2 cursor-pointer h-7 w-full rounded-md border border-gray-300 text-[9px] font-medium text-gray-600 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700'
          >
            View All
          </button>
        </div>
      </div>

      {/* =====================================================
              BOTTOM INFORMATION ROW
          ====================================================== */}

      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-12'>
        {/* ===================================================
                DOCUMENTS
            ==================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-4'>
          <h3 className='text-sm font-semibold text-green-700'>Documents</h3>

          <div className='mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5'>
            {workerManagementData.documents.map((document) => {
              const Icon = documentIconMap[document.icon] || FileText;

              return (
                <div
                  key={document.id}
                  className='flex min-w-0 flex-col items-center rounded-lg border border-gray-200 px-2 py-3 text-center'
                >
                  {/* DOCUMENT NAME */}
                  <span className='line-clamp-2 text-[8px] font-medium text-gray-600'>
                    {document.name}
                  </span>

                  {/* ICON */}
                  <div className='mt-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-500'>
                    <Icon size={15} />
                  </div>

                  {/* STATUS */}
                  <span className='mt-1.5 text-[8px] text-gray-500'>
                    {document.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* NOTE */}
          <p className='mt-3 text-[9px] text-gray-400'>
            Note: Maximum file size 2MB for each file.
          </p>
        </div>

        {/* ===================================================
                ATTENDANCE OVERVIEW
            ==================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-4'>
          <h3 className='text-sm font-semibold text-green-700'>
            {workerManagementData.attendanceOverview.title}
          </h3>

          {/* ATTENDANCE STATS */}
          <div className='mt-5 grid grid-cols-3 gap-3'>
            {/* PRESENT */}
            <div className='flex items-center gap-2'>
              <div
                className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full'
                style={{
                  background: `conic-gradient(
              #15803d ${workerManagementData.attendanceOverview.present.percentage}%,
              #e5e7eb 0
            )`,
                }}
              >
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-white'>
                  <span className='text-[8px] font-semibold text-gray-700'>
                    {workerManagementData.attendanceOverview.present.percentage}
                    %
                  </span>
                </div>
              </div>

              <div className='min-w-0'>
                <p className='text-[8px] text-gray-500'>Present</p>

                <p className='text-[9px] font-semibold text-gray-700'>
                  {Number(
                    workerManagementData.attendanceOverview.present.value,
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* ABSENT */}
            <div className='flex items-center gap-2'>
              <div
                className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full'
                style={{
                  background: `conic-gradient(
              #f87171 ${workerManagementData.attendanceOverview.absent.percentage}%,
              #e5e7eb 0
            )`,
                }}
              >
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-white'>
                  <span className='text-[8px] font-semibold text-gray-700'>
                    {workerManagementData.attendanceOverview.absent.percentage}%
                  </span>
                </div>
              </div>

              <div className='min-w-0'>
                <p className='text-[8px] text-gray-500'>Absent</p>

                <p className='text-[9px] font-semibold text-gray-700'>
                  {Number(
                    workerManagementData.attendanceOverview.absent.value,
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* LEAVE */}
            <div className='flex items-center gap-2'>
              <div
                className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full'
                style={{
                  background: `conic-gradient(
              #f59e0b ${workerManagementData.attendanceOverview.leave.percentage}%,
              #e5e7eb 0
            )`,
                }}
              >
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-white'>
                  <span className='text-[8px] font-semibold text-gray-700'>
                    {workerManagementData.attendanceOverview.leave.percentage}%
                  </span>
                </div>
              </div>

              <div className='min-w-0'>
                <p className='text-[8px] text-gray-500'>Leave</p>

                <p className='text-[9px] font-semibold text-gray-700'>
                  {Number(
                    workerManagementData.attendanceOverview.leave.value,
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* ATTENDANCE REPORT BUTTON */}
          <button
            type='button'
            className='mx-auto cursor-pointer mt-4 block rounded-md border border-gray-300 px-4 py-1.5 text-[9px] font-medium text-gray-600 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700'
          >
            {workerManagementData.attendanceOverview.buttonText}
          </button>
        </div>

        {/* ===================================================
                ACTION SHORTCUTS
            ==================================================== */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm xl:col-span-4'>
          <h3 className='text-sm font-semibold text-green-700'>
            Action Shortcuts
          </h3>

          <div className='mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6 xl:grid-cols-3 2xl:grid-cols-6'>
            {workerManagementData.actionShortcuts.map((action) => {
              const Icon = actionIconMap[action.icon] || MoreHorizontal;

              return (
                <button
                  key={action.id}
                  type='button'
                  className='group flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2.5 transition hover:border-green-600 hover:bg-green-50'
                >
                  {/* ICON */}
                  <div className='flex h-8 w-8 items-center justify-center rounded-md bg-green-50 text-green-700 transition group-hover:bg-green-100'>
                    <Icon size={15} />
                  </div>

                  {/* LABEL */}
                  <span className='text-center text-[8px] font-medium leading-3 text-gray-600 group-hover:text-green-700'>
                    {action.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerManagement;
