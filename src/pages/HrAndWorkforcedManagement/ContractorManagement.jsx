import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import { contractorManagementData } from "../../data/HrWorkforceData/contractorManagementData.js";
const {
  summaryCards,
  filters,
  contractors,
  contractorProfile,
  contractorTypeWise,
  tradeWorkWise,
  contractStatus,
  topContractors,
  expiryAlerts,
  documents,
  performance,
  actionShortcuts,
} = contractorManagementData;
import {
  Leaf,
  Save,
  CheckCircle2,
  RotateCcw,
  UserRound,
  UserCheck,
  UserX,
  CalendarClock,
  UserPlus,
  CircleDollarSign,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Eye,
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// ===============================================
// ICON MAP
// ===============================================
const iconMap = {
  total: UserRound,
  active: UserCheck,
  inactive: UserX,
  expiring: CalendarClock,
  new: UserPlus,
  value: CircleDollarSign,
};
// ===============================================
// STYLE MAP
// ===============================================
const styleMap = {
  total: {
    background: "bg-green-50",
    icon: "text-green-700",
  },

  active: {
    background: "bg-green-50",
    icon: "text-green-600",
  },

  inactive: {
    background: "bg-red-50",
    icon: "text-red-500",
  },

  expiring: {
    background: "bg-orange-50",
    icon: "text-orange-500",
  },

  new: {
    background: "bg-blue-50",
    icon: "text-blue-500",
  },

  value: {
    background: "bg-purple-50",
    icon: "text-purple-500",
  },
};
const ContractorManagement = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // =====================================================
  // FORM SUBMIT
  // =====================================================
  const onSubmit = (data) => {
    console.log("Contractor Management Data:", data);
  };

  return (
    <div className='space-y-4'>
      {/* =====================================================
          HR & WORKFORCE TABS
      ====================================================== */}
      <HrWorkforceTabs />

      {/* =====================================================
          MAIN FORM
      ====================================================== */}
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* ===================================================
                1. ACTION BAR
            ==================================================== */}
        <div className='py-3 '>
          <div className='flex justify-end'>
            <div className='flex flex-wrap items-center gap-2'>
              {/* ===============================================
                      ADD NEW CONTRACTOR
                  ================================================ */}
              <button
                type='button'
                onClick={() => navigate("/add-new-contractor")}
                className='flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-xs font-medium text-white'
              >
                <span>+</span>
                <span>Add New Contractor</span>
              </button>

              {/* ===============================================
                      IMPORT
                  ================================================ */}
              <button
                type='button'
                className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50'
              >
                <span>↓</span>

                <span>Import</span>
              </button>

              {/* ===============================================
                      EXPORT
                  ================================================ */}
              <button
                type='button'
                className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50'
              >
                <span>↓</span>

                <span>Export</span>
              </button>

              {/* ===============================================
                      MORE
                  ================================================ */}
              <button
                type='button'
                className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50'
              >
                <span>•••</span>

                <span>More</span>

                <span className='text-[10px]'>▼</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================
                2. SUMMARY CARDS
            ==================================================== */}
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
          {summaryCards.map((card) => {
            const Icon = iconMap[card.type];

            const currentStyle = styleMap[card.type] || {
              background: "bg-gray-50",
              icon: "text-gray-500",
            };

            const formattedValue =
              card.type === "value"
                ? `${card.currency || "৳"} ${card.value.toLocaleString()}`
                : card.value.toLocaleString();

            return (
              <div
                key={card.id}
                className='rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
              >
                {/* =========================================
                  CARD CONTENT
              ========================================== */}
                <div className='flex items-center gap-3'>
                  {/* ICON */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${currentStyle.background}`}
                  >
                    <Icon
                      size={19}
                      strokeWidth={2}
                      className={currentStyle.icon}
                    />
                  </div>

                  {/* TEXT CONTENT */}
                  <div className='min-w-0 flex-1'>
                    {/* TITLE */}
                    <p className='truncate text-[10px] font-medium text-gray-500'>
                      {card.title}
                    </p>

                    {/* VALUE */}
                    <h3 className='mt-0.5 text-lg font-bold leading-tight text-gray-800'>
                      {formattedValue}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================
            3. MAIN CONTENT - 8 / 4
        ==================================================== */}
        <div className='grid grid-cols-12 gap-4'>
          {/* =================================================
              LEFT SIDE - 8 COLUMNS
          ================================================== */}
          <div className='col-span-12 space-y-4 lg:col-span-8'>
            {/* ===================================================
              3. CONTRACTOR LIST
          ==================================================== */}
            <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* =================================================
                    SECTION HEADER
                ================================================== */}
              <div className='border-b border-gray-200 px-4 py-3'>
                <div className='flex items-center justify-between'>
                  {/* TITLE */}
                  <h3 className='text-sm font-semibold text-green-700'>
                    Contractor List
                  </h3>
                </div>

                {/* =================================================
                        FILTER AREA
                    ================================================== */}
                <div className='mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
                  {/* ===============================================
                          CONTRACTOR TYPE
                      ================================================ */}
                  <div>
                    <label className='mb-3 block text-[10px] font-medium text-gray-600'>
                      Contractor Type
                    </label>

                    <div className='relative'>
                      <select
                        {...register("contractorType")}
                        className='w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-4 pr-8 text-[11px] text-gray-700 outline-none transition focus:border-green-600'
                      >
                        <option value=''>All Types</option>

                        {filters.contractorTypes
                          .filter((item) => item !== "All Types")
                          .map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                      </select>

                      <ChevronDown
                        size={14}
                        className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500'
                      />
                    </div>
                  </div>

                  {/* ===============================================
                          TRADE / WORK CATEGORY
                      ================================================ */}
                  <div>
                    <label className='mb-1.5 block text-[10px] font-medium text-gray-600'>
                      Trade / Work Category
                    </label>

                    <div className='relative'>
                      <select
                        {...register("tradeWork")}
                        className='w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-[11px] text-gray-700 outline-none transition focus:border-green-600'
                      >
                        <option value=''>All Categories</option>

                        {filters.tradeCategories
                          .filter((item) => item !== "All Categories")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>

                      <ChevronDown
                        size={14}
                        className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500'
                      />
                    </div>
                  </div>

                  {/* ===============================================
                          STATUS
                      ================================================ */}
                  <div>
                    <label className='mb-1.5 block text-[10px] font-medium text-gray-600'>
                      Status
                    </label>

                    <div className='relative'>
                      <select
                        {...register("status")}
                        className='w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-[11px] text-gray-700 outline-none transition focus:border-green-600'
                      >
                        <option value=''>All Status</option>

                        {filters.statuses
                          .filter((item) => item !== "All Status")
                          .map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                      </select>

                      <ChevronDown
                        size={14}
                        className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500'
                      />
                    </div>
                  </div>

                  {/* ===============================================
                          WORKING LOCATION
                      ================================================ */}
                  <div>
                    <label className='mb-1.5 block text-[10px] font-medium text-gray-600'>
                      Working Location
                    </label>

                    <div className='relative'>
                      <select
                        {...register("workingLocation")}
                        className='w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-[11px] text-gray-700 outline-none transition focus:border-green-600'
                      >
                        <option value=''>All Locations</option>

                        {filters.locations
                          .filter((item) => item !== "All Locations")
                          .map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                      </select>

                      <ChevronDown
                        size={14}
                        className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500'
                      />
                    </div>
                  </div>
                </div>

                {/* =================================================
                        SEARCH + FILTER BUTTON
                    ================================================== */}
                <div className='mt-3 flex flex-col gap-2 sm:flex-row'>
                  {/* SEARCH */}
                  <div className='relative flex-1'>
                    <Search
                      size={14}
                      className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                    />

                    <input
                      type='text'
                      {...register("search")}
                      placeholder='Search by Contractor Name, Mobile...'
                      className='w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-[11px] text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-600'
                    />
                  </div>

                  {/* FILTER BUTTON */}
                  <button
                    type='button'
                    className='flex h-9 w-full items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 sm:w-10'
                  >
                    <SlidersHorizontal size={15} />
                  </button>
                </div>
              </div>

              {/* =================================================
                      CONTRACTOR TABLE
                  ================================================== */}
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[1050px] text-left'>
                  {/* =================================================
                          TABLE HEADER
                      ================================================== */}
                  <thead className='bg-gray-50'>
                    <tr className='border-b border-gray-200'>
                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        SL
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Contractor ID
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Contractor Name
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Type
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Trade / Work
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Mobile
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Working Location
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Status
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Contract Start Date
                      </th>

                      <th className='px-3 py-2.5 text-[9px] font-semibold text-gray-600'>
                        Contract End Date
                      </th>

                      <th className='px-3 py-2.5 text-center text-[9px] font-semibold text-gray-600'>
                        Action
                      </th>
                    </tr>
                  </thead>

                  {/* =================================================
                          TABLE BODY
                      ================================================== */}
                  <tbody>
                    {contractors.map((contractor, index) => (
                      <tr
                        key={contractor.id}
                        className='border-b border-gray-100 transition hover:bg-gray-50'
                      >
                        {/* SL */}
                        <td className='px-3 py-2.5 text-[10px] text-gray-600'>
                          {index + 1}
                        </td>

                        {/* CONTRACTOR ID */}
                        <td className='px-3 py-2.5 text-[10px] font-medium text-gray-700'>
                          {contractor.id}
                        </td>

                        {/* CONTRACTOR NAME */}
                        <td className='px-3 py-2.5 text-[10px] font-medium text-gray-800'>
                          {contractor.name}
                        </td>

                        {/* TYPE */}
                        <td className='px-3 py-2.5 text-[10px] text-gray-600'>
                          {contractor.type}
                        </td>

                        {/* TRADE */}
                        <td className='px-3 py-2.5 text-[10px] text-gray-600'>
                          {contractor.trade}
                        </td>

                        {/* MOBILE */}
                        <td className='px-3 py-2.5 text-[10px] text-gray-600'>
                          {contractor.mobile}
                        </td>

                        {/* WORKING LOCATION */}
                        <td className='px-3 py-2.5 text-[10px] text-gray-600'>
                          {contractor.workingLocation}
                        </td>

                        {/* STATUS */}
                        <td className='px-3 py-2.5'>
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-[9px] font-medium ${
                              contractor.status === "Active"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {contractor.status}
                          </span>
                        </td>

                        {/* START DATE */}
                        <td className='px-3 py-2.5 text-[10px] text-gray-600'>
                          {contractor.contractStartDate}
                        </td>

                        {/* END DATE */}
                        <td className='px-3 py-2.5 text-[10px] text-gray-600'>
                          {contractor.contractEndDate}
                        </td>

                        {/* ACTION */}
                        <td className='px-3 py-2.5'>
                          <div className='flex items-center justify-center gap-1'>
                            {/* VIEW */}
                            <button
                              type='button'
                              className='flex h-6 w-6 items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50'
                            >
                              <Eye size={13} />
                            </button>

                            {/* EDIT */}
                            <button
                              type='button'
                              className='flex h-6 w-6 items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50'
                            >
                              <Pencil size={13} />
                            </button>

                            {/* MORE */}
                            <button
                              type='button'
                              className='flex h-6 w-6 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100'
                            >
                              <MoreVertical size={13} />
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
              <div className='flex flex-col gap-2 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
                {/* ENTRY INFO */}
                <p className='text-[10px] text-gray-500'>
                  Showing 1 to {contractors.length} of 86 entries
                </p>

                {/* PAGINATION */}
                <div className='flex items-center gap-1'>
                  {/* PREVIOUS */}
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50'
                  >
                    <ChevronLeft size={13} />
                  </button>

                  {/* PAGE 1 */}
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-md bg-green-700 text-[10px] font-medium text-white'
                  >
                    1
                  </button>

                  {/* PAGE 2 */}
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-[10px] text-gray-600 hover:bg-gray-50'
                  >
                    2
                  </button>

                  {/* PAGE 3 */}
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-[10px] text-gray-600 hover:bg-gray-50'
                  >
                    3
                  </button>

                  {/* PAGE 4 */}
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-[10px] text-gray-600 hover:bg-gray-50'
                  >
                    4
                  </button>

                  {/* PAGE 5 */}
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-[10px] text-gray-600 hover:bg-gray-50'
                  >
                    5
                  </button>

                  {/* MORE */}
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-[10px] text-gray-600'
                  >
                    ...
                  </button>

                  {/* PAGE 11 */}
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-[10px] text-gray-600 hover:bg-gray-50'
                  >
                    11
                  </button>

                  {/* NEXT */}
                  <button
                    type='button'
                    className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50'
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================
                CHART SECTION
            ================================================== */}
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
              {/* =================================================
                      1. CONTRACTOR TYPE WISE
                  ================================================== */}
              <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
                {/* TITLE */}
                <h3 className='text-sm font-semibold text-green-700'>
                  Contractor Type Wise
                </h3>

                {/* CHART + LEGEND */}
                <div className='mt-3 grid grid-cols-1 items-center gap-3 sm:grid-cols-2'>
                  {/* DONUT CHART */}
                  <div className='h-[180px] w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <PieChart>
                        <Pie
                          data={contractorTypeWise}
                          dataKey='value'
                          nameKey='name'
                          cx='50%'
                          cy='50%'
                          innerRadius={35}
                          outerRadius={55}
                          paddingAngle={1}
                          stroke='none'
                        >
                          {contractorTypeWise.map((item, index) => (
                            <Cell
                              key={`type-${index}`}
                              fill={
                                ["#15803d", "#0ea5e9", "#f59e0b", "#9333ea"][
                                  index % 4
                                ]
                              }
                            />
                          ))}
                        </Pie>

                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* LEGEND */}
                  <div className='space-y-3'>
                    {contractorTypeWise.map((item, index) => (
                      <div
                        key={item.name}
                        className='flex items-center justify-between gap-2'
                      >
                        <div className='flex min-w-0 items-center gap-2'>
                          {/* COLOR */}
                          <span
                            className='h-2.5 w-2.5 shrink-0 rounded-sm'
                            style={{
                              backgroundColor: [
                                "#15803d",
                                "#0ea5e9",
                                "#f59e0b",
                                "#9333ea",
                              ][index % 4],
                            }}
                          />

                          {/* NAME */}
                          <span className='truncate text-[10px] text-gray-600'>
                            {item.name}
                          </span>
                        </div>

                        {/* VALUE */}
                        <span className='shrink-0 text-[10px] font-medium text-gray-700'>
                          {item.value}
                          <span className='ml-1 text-[9px] text-gray-400'>
                            ({item.percentage}%)
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* =================================================
                      2. TRADE / WORK WISE
                  ================================================== */}
              <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
                <h3 className='text-sm font-semibold text-green-700'>
                  Trade / Work Wise
                </h3>

                <div className='mt-4 space-y-3'>
                  {tradeWorkWise.map((item) => (
                    <div key={item.name} className='flex items-center gap-3'>
                      {/* LABEL */}
                      <span className='w-24 shrink-0 text-[10px] text-gray-600'>
                        {item.name}
                      </span>

                      {/* BAR */}
                      <div className='h-2 flex-1 rounded-full bg-gray-100'>
                        <div
                          className='h-2 rounded-full bg-green-700'
                          style={{
                            width: `${(item.value / 28) * 100}%`,
                          }}
                        />
                      </div>

                      {/* VALUE */}
                      <span className='w-8 text-right text-[10px] font-medium text-gray-600'>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* =================================================
                      3. CONTRACT STATUS
                  ================================================== */}
              <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
                <h3 className='text-sm font-semibold text-green-700'>
                  Contract Status
                </h3>

                <div className='mt-3 grid grid-cols-1 items-center gap-3 sm:grid-cols-2'>
                  {/* DONUT */}
                  <div className='h-[180px] w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <PieChart>
                        <Pie
                          data={contractStatus}
                          dataKey='value'
                          nameKey='name'
                          cx='50%'
                          cy='50%'
                          innerRadius={35}
                          outerRadius={55}
                          paddingAngle={1}
                          stroke='none'
                        >
                          {contractStatus.map((item, index) => (
                            <Cell
                              key={`status-${index}`}
                              fill={index === 0 ? "#15803d" : "#ef4444"}
                            />
                          ))}
                        </Pie>

                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* LEGEND */}
                  <div className='space-y-4'>
                    {contractStatus.map((item, index) => (
                      <div key={item.name} className='flex items-center gap-2'>
                        <span
                          className={`h-2.5 w-2.5 rounded-sm ${
                            index === 0 ? "bg-green-700" : "bg-red-500"
                          }`}
                        />

                        <div>
                          <p className='text-[10px] font-medium text-gray-700'>
                            {item.name}
                          </p>

                          <p className='text-[9px] text-gray-400'>
                            {item.value} ({item.percentage}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE - 4 COLUMNS
          ================================================== */}
          <div className='col-span-12 space-y-4 lg:col-span-4'>
            {/* ===================================================
                    CONTRACTOR PROFILE
                ==================================================== */}
            <div className='col-span-12 lg:col-span-4'>
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* =================================================
                      PROFILE HEADER
                  ================================================== */}
                <div className='flex items-center justify-between border-b border-gray-100 px-4 py-8'>
                  <h3 className='text-sm font-semibold text-green-700'>
                    Contractor Profile
                  </h3>

                  {/* STATUS */}
                  <span
                    className={`inline-flex items-center mb-2 gap-2 rounded-full px-2 py-3 text-[9px] font-medium ${
                      contractorProfile.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 mb-1 py-1 rounded-full ${
                        contractorProfile.status === "Active"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    />

                    {contractorProfile.status}
                  </span>
                </div>

                {/* =================================================
                        BASIC PROFILE INFORMATION
                    ================================================== */}
                <div className='px-4 py-4'>
                  <div className='flex gap-4'>
                    {/* =============================================
                              PROFILE IMAGE / LOGO
                          ============================================== */}
                    <div className='flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white'>
                      <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-600 bg-green-50'>
                        <Leaf
                          size={34}
                          strokeWidth={1.5}
                          className='text-green-700'
                        />
                      </div>
                    </div>

                    {/* =============================================
                            BASIC INFO
                        ============================================== */}
                    <div className='min-w-0 flex-1'>
                      {/* NAME */}
                      <h4 className='truncate text-sm font-semibold text-gray-800'>
                        {contractorProfile.basicInfo.name}
                      </h4>

                      {/* DETAILS */}
                      <div className='mt-2 space-y-1'>
                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Contractor ID</span>

                          <span className='font-medium text-gray-700'>
                            {contractorProfile.basicInfo.contractorId}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Type</span>

                          <span className='font-medium text-gray-700'>
                            {contractorProfile.basicInfo.type}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Trade / Work</span>

                          <span className='font-medium text-gray-700'>
                            {contractorProfile.basicInfo.trade}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Mobile</span>

                          <span className='font-medium text-gray-700'>
                            {contractorProfile.basicInfo.mobile}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Email</span>

                          <span className='truncate font-medium text-gray-700'>
                            {contractorProfile.basicInfo.email}
                          </span>
                        </div>

                        <div className='grid grid-cols-[80px_1fr] gap-2 text-[10px]'>
                          <span className='text-gray-500'>Location</span>

                          <span className='font-medium text-gray-700'>
                            {contractorProfile.basicInfo.workingLocation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =================================================
                        PROFILE TABS
                    ================================================== */}
                <div className='overflow-x-auto border-y border-gray-200'>
                  <div className='flex min-w-max'>
                    {contractorProfile.tabs.map((tab, index) => (
                      <button
                        key={tab}
                        type='button'
                        className={`relative whitespace-nowrap px-3 py-2.5 text-[9px] font-medium transition ${
                          index === 0
                            ? "text-green-700"
                            : "text-gray-500 hover:text-green-700"
                        }`}
                      >
                        {tab}

                        {/* ACTIVE TAB LINE */}
                        {index === 0 && (
                          <span className='absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-green-700' />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* =================================================
                        GENERAL INFORMATION
                    ================================================== */}
                <div className='px-4 py-4'>
                  <div className='space-y-2.5'>
                    {/* PROPRIETOR */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        Proprietor / Contact Person
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {contractorProfile.generalInfo.proprietor}
                      </span>
                    </div>

                    {/* ADDRESS */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>Address</span>

                      <span className='text-gray-400'>:</span>

                      <span className='leading-4 text-gray-700'>
                        {contractorProfile.generalInfo.address}
                      </span>
                    </div>

                    {/* NATIONAL ID */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        National ID No.
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {contractorProfile.generalInfo.nationalId}
                      </span>
                    </div>

                    {/* TRADE LICENSE */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        Trade License No.
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {contractorProfile.generalInfo.tradeLicense}
                      </span>
                    </div>

                    {/* VAT */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        VAT Registration No.
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {contractorProfile.generalInfo.vatRegistration}
                      </span>
                    </div>

                    {/* TIN */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>TIN No.</span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {contractorProfile.generalInfo.tinNumber}
                      </span>
                    </div>

                    {/* BANK NAME */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        Bank Name
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {contractorProfile.generalInfo.bankName}
                      </span>
                    </div>

                    {/* BANK ACCOUNT */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>
                        Bank Account No.
                      </span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {contractorProfile.generalInfo.bankAccountNumber}
                      </span>
                    </div>

                    {/* STATUS */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>Status</span>

                      <span className='text-gray-400'>:</span>

                      <span className='font-medium text-green-700'>
                        {contractorProfile.generalInfo.status}
                      </span>
                    </div>

                    {/* REMARKS */}
                    <div className='grid grid-cols-[115px_12px_1fr] gap-1 text-[10px]'>
                      <span className='font-medium text-gray-600'>Remarks</span>

                      <span className='text-gray-400'>:</span>

                      <span className='text-gray-700'>
                        {contractorProfile.generalInfo.remarks}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                    TOP 5 CONTRACTORS BY CONTRACT VALUE
                ================================================= */}
            <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
              {/* =================================================
                      TITLE
                  ================================================== */}
              <h3 className='text-sm font-semibold text-green-700'>
                Top 5 Contractors by Contract Value
              </h3>

              {/* =================================================
                      TABLE
                  ================================================== */}
              <div className='mt-3 overflow-x-auto'>
                <table className='w-full min-w-[280px]'>
                  {/* =================================================
                          TABLE HEADER
                      ================================================== */}
                  <thead>
                    <tr className='border-b border-gray-200'>
                      <th className='pb-2 text-left text-[9px] font-semibold text-gray-600'>
                        Contractor Name
                      </th>

                      <th className='pb-2 text-right text-[9px] font-semibold text-gray-600'>
                        Contract Value (৳)
                      </th>
                    </tr>
                  </thead>

                  {/* =================================================
                          TABLE BODY
                      ================================================== */}
                  <tbody>
                    {topContractors.map((contractor) => (
                      <tr
                        key={contractor.contractorId}
                        className='border-b border-gray-100 last:border-b-0'
                      >
                        {/* CONTRACTOR NAME */}
                        <td className='py-2 text-[10px] text-gray-700'>
                          {contractor.name}
                        </td>

                        {/* CONTRACT VALUE */}
                        <td className='py-2 text-right text-[10px] font-medium text-gray-700'>
                          {contractor.contractValue.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* =================================================
                          TOTAL
                      ================================================== */}
                  <tfoot>
                    <tr>
                      <td className='pt-2 text-center text-[10px] font-semibold text-green-700'>
                        Total
                      </td>

                      <td className='pt-2 text-right text-[11px] font-bold text-green-700'>
                        ৳{" "}
                        {topContractors
                          .reduce(
                            (total, contractor) =>
                              total + contractor.contractValue,
                            0,
                          )
                          .toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
                4. BOTTOM INFORMATION SECTION
            ==================================================== */}
        <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4'>
          {/* =================================================
                  1. CONTRACT EXPIRY ALERT
              ================================================== */}
          {/* =================================================
                  CONTRACT EXPIRY ALERT
              ================================================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* TITLE */}
            <h3 className='text-sm font-semibold text-green-700'>
              Contract Expiry Alert
            </h3>

            {/* TABLE */}
            <div className='mt-3 overflow-x-auto'>
              <table className='w-full min-w-[500px] table-fixed'>
                {/* TABLE HEADER */}
                <thead>
                  <tr className='border-b border-gray-200'>
                    <th className='w-[18%] pb-2 text-left text-[8px] font-semibold text-gray-600'>
                      Contractor ID
                    </th>

                    <th className='w-[30%] pb-2 text-left text-[8px] font-semibold text-gray-600'>
                      Contractor Name
                    </th>

                    <th className='w-[18%] pb-2 text-center text-[8px] font-semibold text-gray-600'>
                      End Date
                    </th>

                    <th className='w-[15%] pb-2 text-center text-[8px] font-semibold text-gray-600'>
                      Days Left
                    </th>

                    <th className='w-[19%] pb-2 text-center text-[8px] font-semibold text-gray-600'>
                      Status
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {expiryAlerts.map((alert) => (
                    <tr
                      key={alert.contractorId}
                      className='border-b border-gray-100 last:border-b-0'
                    >
                      {/* CONTRACTOR ID */}
                      <td className='py-2 text-left text-[8px] text-gray-600'>
                        {alert.contractorId}
                      </td>

                      {/* CONTRACTOR NAME */}
                      <td className='truncate py-2 text-left text-[8px] font-medium text-gray-700'>
                        {alert.contractorName}
                      </td>

                      {/* END DATE */}
                      <td className='py-2 text-center text-[8px] text-gray-600'>
                        {alert.endDate}
                      </td>

                      {/* DAYS LEFT */}
                      <td className='py-2 text-center text-[8px] text-gray-600'>
                        {alert.daysLeft}
                      </td>

                      {/* STATUS */}
                      <td className='py-2 text-center'>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[7px] font-medium ${
                            alert.status === "Expiring Soon"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {alert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VIEW ALL BUTTON */}
            <div className='mt-3 flex justify-center'>
              <button
                type='button'
                className='rounded-md border border-gray-200 px-8 py-2 text-[9px] font-medium text-gray-600 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700'
              >
                View All Expiring Contracts
              </button>
            </div>
          </div>

          {/* =================================================
                  2. DOCUMENTS
              ================================================== */}
          <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            <h3 className='text-sm font-semibold text-green-700'>Documents</h3>

            <div className='mt-3 grid grid-cols-4 gap-2'>
              {documents.map((document) => (
                <div
                  key={document.id}
                  className='flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-3 text-center'
                >
                  <div className='flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500'>
                    📄
                  </div>

                  <p className='mt-1 text-[9px] font-medium text-gray-600'>
                    {document.name}
                  </p>

                  <span className='mt-1 text-[8px] text-green-600'>
                    {document.status}
                  </span>
                </div>
              ))}
            </div>

            <p className='mt-3 text-[8px] text-gray-400'>
              Note: Maximum file size 2MB for each file.
            </p>
          </div>

          {/* =================================================
                  3. PERFORMANCE SUMMARY
              ================================================== */}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            <h3 className='text-sm font-semibold text-green-700'>
              Performance Summary (This Month)
            </h3>

            <div className='mt-5 space-y-5'>
              {/* ON TIME WORK */}
              <div>
                <div className='mb-1 flex items-center justify-between'>
                  <span className='text-[10px] text-gray-600'>
                    On-Time Work Completion
                  </span>

                  <span className='text-[10px] font-semibold text-green-700'>
                    {performance.onTimeWorkCompletion}%
                  </span>
                </div>

                <div className='h-1.5 rounded-full bg-gray-100'>
                  <div
                    className='h-1.5 rounded-full bg-green-700'
                    style={{
                      width: `${performance.onTimeWorkCompletion}%`,
                    }}
                  />
                </div>
              </div>

              {/* QUALITY */}
              <div>
                <div className='mb-1 flex items-center justify-between'>
                  <span className='text-[10px] text-gray-600'>
                    Quality Rating (Avg.)
                  </span>

                  <span className='text-[10px] font-semibold text-green-700'>
                    {performance.qualityRating} / 5
                  </span>
                </div>

                <div className='h-1.5 rounded-full bg-gray-100'>
                  <div
                    className='h-1.5 rounded-full bg-green-700'
                    style={{
                      width: `${(performance.qualityRating / 5) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* COMPLIANCE */}
              <div>
                <div className='mb-1 flex items-center justify-between'>
                  <span className='text-[10px] text-gray-600'>Compliance</span>

                  <span className='text-[10px] font-semibold text-green-700'>
                    {performance.compliance}%
                  </span>
                </div>

                <div className='h-1.5 rounded-full bg-gray-100'>
                  <div
                    className='h-1.5 rounded-full bg-green-700'
                    style={{
                      width: `${performance.compliance}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              type='button'
              className='mt-4 w-full rounded-md border border-gray-200 py-2 text-[10px] font-medium text-gray-600 hover:bg-gray-50'
            >
              View Performance Report
            </button>
          </div>

          {/* =================================================
                  4. ACTION SHORTCUTS
              ================================================== */}
          <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
            <h3 className='text-sm font-semibold text-green-700'>
              Action Shortcuts
            </h3>

            <div className='mt-5 grid grid-cols-3 gap-3 sm:grid-cols-5'>
              {actionShortcuts.map((action) => (
                <button
                  key={action.id}
                  type='button'
                  className='flex flex-col items-center gap-2 rounded-lg p-2 text-center transition hover:bg-green-50'
                >
                  <div className='flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-green-700'>
                    {action.type === "renewal" && "↻"}
                    {action.type === "payment" && "▣"}
                    {action.type === "workOrder" && "▤"}
                    {action.type === "document" && "▧"}
                    {action.type === "blacklist" && "♙"}
                    {action.type === "more" && "•••"}
                  </div>

                  <span className='text-[9px] font-medium leading-3 text-gray-600'>
                    {action.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================
            5. FORM FOOTER
        ==================================================== */}
        <div className='flex flex-col gap-2 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-end'>
          {/* RESET */}
          <button
            type='button'
            onClick={() => reset()}
            className='inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-xs font-medium text-gray-600 transition hover:bg-gray-50 sm:w-auto'
          >
            <RotateCcw size={15} strokeWidth={1.8} />
            Reset
          </button>

          {/* SAVE AS DRAFT */}
          <button
            type='button'
            className='inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto'
          >
            <Save size={15} strokeWidth={1.8} />
            Save as Draft
          </button>

          {/* SAVE & SUBMIT */}
          <button
            type='submit'
            className='inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 text-xs font-medium text-white transition hover:bg-green-800 sm:w-auto'
          >
            <CheckCircle2 size={15} strokeWidth={1.8} />
            Save & Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContractorManagement;
