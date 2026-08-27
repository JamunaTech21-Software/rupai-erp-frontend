import React from "react";
import { useNavigate } from "react-router-dom";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import employeeManagementData from "../../data/HrWorkforceData/employeeManagementData";

import {
  Users,
  UserCheck,
  CalendarDays,
  UserPlus,
  UserMinus,
  Clock3,
  Search,
  RotateCcw,
  Upload,
  Plus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowRightLeft,
  FileBarChart,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
const EmployeeManagement = () => {
  const { employeesByEmploymentType } = employeeManagementData;
  const { recentJoiners } = employeeManagementData;
  // =========================================================
  // Summary Icons
  // =========================================================
  const summaryIconMap = {
    totalEmployees: Users,
    activeEmployees: UserCheck,
    onLeave: CalendarDays,
    newThisMonth: UserPlus,
    exitsThisMonth: UserMinus,
    averageTenure: Clock3,
  };

  // =========================================================
  // Summary Colors
  // =========================================================
  const summaryColorMap = {
    green: {
      icon: "text-emerald-600",
      background: "bg-emerald-50",
    },

    blue: {
      icon: "text-blue-600",
      background: "bg-blue-50",
    },

    orange: {
      icon: "text-orange-600",
      background: "bg-orange-50",
    },

    red: {
      icon: "text-red-600",
      background: "bg-red-50",
    },
  };
  const quickActionIconMap = {
    addEmployee: Plus,
    bulkImport: Upload,
    employeeTransfer: ArrowRightLeft,
    reports: FileBarChart,
  };
  const navigate = useNavigate();
  return (
    <div className='space-y-4'>
      {/* ========================================================= */}
      {/* HR Workforce Tabs */}
      {/* ========================================================= */}
      <HrWorkforceTabs />

      {/* ========================================================= */}
      {/* Summary Cards */}
      {/* ========================================================= */}
      <section className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6'>
        {employeeManagementData.summaryCards.map((card) => {
          const Icon = summaryIconMap[card.key];

          const color = summaryColorMap[card.colorKey] || summaryColorMap.green;

          return (
            <div
              key={card.id}
              className='flex min-h-28 items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'
            >
              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${color.background}`}
              >
                {Icon && (
                  <Icon size={24} strokeWidth={2} className={color.icon} />
                )}
              </div>

              {/* Content */}
              <div className='min-w-0'>
                <p className='text-xs font-medium text-gray-500'>
                  {card.title}
                </p>

                <div className='mt-1 flex items-baseline gap-1'>
                  <h3 className='text-xl font-bold text-gray-800'>
                    {card.value}
                  </h3>

                  {card.unit && (
                    <span className='text-xs font-medium text-gray-500'>
                      {card.unit}
                    </span>
                  )}
                </div>

                {card.subtitle && (
                  <p className='mt-1 text-xs text-gray-500'>{card.subtitle}</p>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================================= */}
      {/* Employee Filters */}
      {/* ========================================================= */}
      <section className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
        <div className='grid grid-cols-12 items-end gap-1'>
          {/* ================= Search Employee ================= */}
          <div className='col-span-12 md:col-span-2 xl:col-span-2'>
            <label className='mb-1.5 block text-xs font-semibold text-gray-700'>
              {employeeManagementData.filters.search.label}
            </label>

            <div className='relative'>
              <input
                type='text'
                placeholder={employeeManagementData.filters.search.placeholder}
                className='h-10 w-full rounded-lg border border-gray-200 bg-white px-3 pr-9 text-xs text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              />

              <Search
                size={16}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
              />
            </div>
          </div>

          {/* ================= Department ================= */}
          <div className='col-span-12 md:col-span-2 xl:col-span-2'>
            <label className='mb-1.5 block text-xs font-semibold text-gray-700'>
              {employeeManagementData.filters.department.label}
            </label>

            <select className='h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'>
              {employeeManagementData.filters.department.options.map(
                (option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* ================= Designation ================= */}
          <div className='col-span-12 md:col-span-2 xl:col-span-2'>
            <label className='mb-1.5 block text-xs font-semibold text-gray-700'>
              {employeeManagementData.filters.designation.label}
            </label>

            <select className='h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'>
              {employeeManagementData.filters.designation.options.map(
                (option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* ================= Employment Type ================= */}
          <div className='col-span-12 md:col-span-2 xl:col-span-1'>
            <label className='mb-1.5 block text-xs font-semibold text-gray-700'>
              {employeeManagementData.filters.employmentType.label}
            </label>

            <select className='h-10 w-full rounded-lg border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'>
              {employeeManagementData.filters.employmentType.options.map(
                (option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* ================= Status ================= */}
          <div className='col-span-12 md:col-span-2 xl:col-span-1'>
            <label className='mb-1.5 block text-xs font-semibold text-gray-700'>
              {employeeManagementData.filters.status.label}
            </label>

            <select className='h-10 w-full rounded-lg border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'>
              {employeeManagementData.filters.status.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* ================= Date Range ================= */}
          <div className='col-span-12 md:col-span-2 xl:col-span-2'>
            <label className='mb-1.5 block text-xs font-semibold text-gray-700'>
              {employeeManagementData.filters.dateRange.label}
            </label>

            <div className='relative'>
              <input
                type='text'
                value={`${employeeManagementData.filters.dateRange.defaultValue.from} - ${employeeManagementData.filters.dateRange.defaultValue.to}`}
                readOnly
                className='h-10 w-full rounded-lg border border-gray-200 bg-white px-3 pr-8 text-xs text-gray-700 outline-none'
              />

              <CalendarDays
                size={15}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400'
              />
            </div>
          </div>

          {/* ================= Search Button ================= */}
          <div className='col-span-12 md:col-span-1 xl:col-span-1'>
            <button
              type='button'
              className='flex cursor-pointer h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-2 text-xs font-medium text-white transition hover:bg-emerald-800'
            >
              <Search size={15} />
              <span>Search</span>
            </button>
          </div>

          {/* ================= Reset Button ================= */}
          <div className='col-span-12 md:col-span-1 xl:col-span-1'>
            <button
              type='button'
              className='flex cursor-pointer h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50'
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Employee Tabs */}
      {/* ========================================================= */}
      <section className='rounded-xl border border-gray-200 bg-white px-4'>
        <div className='flex overflow-x-auto'>
          {employeeManagementData.tabs.map((tab, index) => (
            <button
              key={tab.id}
              type='button'
              className={`relative whitespace-nowrap px-4 py-3 text-xs font-semibold transition ${
                index === 0
                  ? "text-emerald-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}

              {index === 0 && (
                <span className='absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-emerald-600' />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* Employee List */}
      {/* ========================================================= */}
      <section className='w-full'>
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
          {/* ================= Table Actions ================= */}
          <div className='flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-end'>
            <div className='flex flex-wrap items-center gap-2'>
              {/* Import Employees */}
              <button
                type='button'
                className='flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-600 transition hover:bg-gray-50'
              >
                <Upload size={15} />
                <span>Import Employees</span>
              </button>

              {/* Add New Employee */}
              <button
                type='button'
                onClick={() => navigate("/add-new-employee")}
                className='flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-3 text-xs font-medium text-white transition hover:bg-emerald-800'
              >
                <Plus size={15} />
                <span>Add New Employee</span>
              </button>
            </div>
          </div>

          {/* ================= Employee Table ================= */}
          <div className='overflow-x-auto'>
            {/* ================= Scrollable Table Body ================= */}
            <div className='max-h-78 overflow-y-auto'>
              <table className='min-w-[1050px] w-full'>
                {/* ================= Table Header ================= */}
                <thead className='sticky top-0 z-10 bg-gray-50'>
                  <tr className='border-b border-gray-200'>
                    {employeeManagementData.table.headers.map((header) => (
                      <th
                        key={header.key}
                        className='whitespace-nowrap px-3 py-3 text-left text-[11px] font-semibold text-gray-600'
                      >
                        {header.type === "selection" ? (
                          <input
                            type='checkbox'
                            className='h-3.5 w-3.5 cursor-pointer rounded border-gray-300 text-emerald-600 focus:ring-emerald-500'
                          />
                        ) : (
                          header.label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* ================= Table Body ================= */}
                <tbody>
                  {employeeManagementData.employees.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className='border-b border-gray-100 transition hover:bg-gray-50/50'
                    >
                      {/* Checkbox */}
                      <td className='px-3 py-2.5'>
                        <input
                          type='checkbox'
                          className='h-3.5 w-3.5 cursor-pointer rounded border-gray-300 text-emerald-600 focus:ring-emerald-500'
                        />
                      </td>

                      {/* SL */}
                      <td className='px-3 py-2.5 text-xs text-gray-600'>
                        {index + 1}
                      </td>

                      {/* Employee ID */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-xs font-medium text-gray-700'>
                        {employee.employeeId}
                      </td>

                      {/* Employee Name */}
                      <td className='px-3 py-2.5'>
                        <div className='flex items-center gap-2.5'>
                          <div className='h-8 w-8 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100'>
                            {employee.personalInfo.avatarUrl ? (
                              <img
                                src={employee.personalInfo.avatarUrl}
                                alt={employee.personalInfo.fullName}
                                className='h-full w-full object-cover'
                              />
                            ) : (
                              <div className='flex h-full w-full items-center justify-center text-xs font-semibold text-gray-500'>
                                {employee.personalInfo.fullName
                                  ?.charAt(0)
                                  ?.toUpperCase()}
                              </div>
                            )}
                          </div>

                          <span className='whitespace-nowrap text-xs font-medium text-gray-700'>
                            {employee.personalInfo.fullName}
                          </span>
                        </div>
                      </td>

                      {/* Department */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-xs text-gray-600'>
                        {employee.employment.departmentName}
                      </td>

                      {/* Designation */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-xs text-gray-600'>
                        {employee.employment.designationName}
                      </td>

                      {/* Employment Type */}
                      <td className='px-3 py-2.5'>
                        <span
                          className={`inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${
                            employee.employment.employmentType === "permanent"
                              ? "bg-emerald-50 text-emerald-700"
                              : employee.employment.employmentType ===
                                  "contractual"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-orange-50 text-orange-600"
                          }`}
                        >
                          {employee.employment.employmentType
                            .charAt(0)
                            .toUpperCase() +
                            employee.employment.employmentType.slice(1)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className='px-3 py-2.5'>
                        <span
                          className={`inline-flex rounded-md px-2 py-1 text-[10px] font-semibold ${
                            employee.employment.status === "active"
                              ? "bg-emerald-50 text-emerald-700"
                              : employee.employment.status === "on-leave"
                                ? "bg-orange-50 text-orange-600"
                                : employee.employment.status === "inactive"
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-red-50 text-red-600"
                          }`}
                        >
                          {employee.employment.status === "on-leave"
                            ? "On Leave"
                            : employee.employment.status
                                .charAt(0)
                                .toUpperCase() +
                              employee.employment.status.slice(1)}
                        </span>
                      </td>

                      {/* Join Date */}
                      <td className='whitespace-nowrap px-3 py-2.5 text-xs text-gray-600'>
                        {employee.employment.joinDate}
                      </td>

                      {/* Action */}
                      <td className='px-3 py-2.5'>
                        <button
                          type='button'
                          className='flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700'
                        >
                          <MoreVertical size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= Pagination ================= */}
          <div className='flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
            {/* Showing Information */}
            <p className='text-xs text-gray-500'>
              Showing{" "}
              <span className='font-semibold text-gray-700'>
                {(employeeManagementData.pagination.currentPage - 1) *
                  employeeManagementData.pagination.pageSize +
                  1}
              </span>{" "}
              to{" "}
              <span className='font-semibold text-gray-700'>
                {Math.min(
                  employeeManagementData.pagination.currentPage *
                    employeeManagementData.pagination.pageSize,
                  employeeManagementData.pagination.totalItems,
                )}
              </span>{" "}
              of{" "}
              <span className='font-semibold text-gray-700'>
                {employeeManagementData.pagination.totalItems}
              </span>{" "}
              entries
            </p>

            {/* Pagination Controls */}
            <div className='flex items-center gap-1'>
              {/* Previous */}
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50'
              >
                <ChevronLeft size={15} />
              </button>

              {/* Current Page */}
              <button
                type='button'
                className='flex h-8 min-w-8 items-center justify-center rounded-md bg-emerald-700 px-2 text-xs font-medium text-white'
              >
                {employeeManagementData.pagination.currentPage}
              </button>

              {/* Page 2 */}
              <button
                type='button'
                className='flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 px-2 text-xs text-gray-600 transition hover:bg-gray-50'
              >
                2
              </button>

              {/* Page 3 */}
              <button
                type='button'
                className='flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 px-2 text-xs text-gray-600 transition hover:bg-gray-50'
              >
                3
              </button>

              {/* Dots */}
              <span className='px-1 text-xs text-gray-400'>...</span>

              {/* Last Page */}
              <button
                type='button'
                className='flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 px-2 text-xs text-gray-600 transition hover:bg-gray-50'
              >
                {employeeManagementData.pagination.totalPages}
              </button>

              {/* Next */}
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50'
              >
                <ChevronRight size={15} />
              </button>

              {/* Page Size */}
              <select
                defaultValue={employeeManagementData.pagination.pageSize}
                className='ml-2 h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-600 outline-none'
              >
                <option value='10'>10 / page</option>
                <option value='20'>20 / page</option>
                <option value='50'>50 / page</option>
                <option value='100'>100 / page</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Department / Employment Type / Recent Joiners / Actions */}
      {/* ========================================================= */}
      <section className='grid grid-cols-1 gap-2 lg:grid-cols-12'>
        {/* ================= Employee Department ================= */}
        <div className='rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3'>
          {/* Header */}
          <div className='border-b border-gray-200 px-4 py-3'>
            <h3 className='text-sm font-semibold text-emerald-700'>
              {employeeManagementData.departmentOverview.title}
            </h3>
          </div>

          {/* Content */}
          <div className='p-4'>
            <div className='grid grid-cols-1 items-center gap-2 sm:grid-cols-2'>
              {/* ================= Donut Chart ================= */}
              <div className='h-40 w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={employeeManagementData.departmentOverview.data}
                      dataKey='count'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={1}
                      stroke='none'
                    >
                      {employeeManagementData.departmentOverview.data.map(
                        (item) => (
                          <Cell key={item.id} fill={item.color} />
                        ),
                      )}
                    </Pie>

                    <Tooltip
                      formatter={(value, name) => [`${value} Employees`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* ================= Department Legend ================= */}
              <div className='space-y-2'>
                {employeeManagementData.departmentOverview.data.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between gap-2'
                  >
                    {/* Name */}
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

                    {/* Count + Percentage */}
                    <span className='whitespace-nowrap text-[10px] font-semibold text-gray-700'>
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= Total ================= */}
            <div className='mt-3 text-center'>
              <span className='text-xs font-semibold text-gray-700'>
                Total Employees:{" "}
                {employeeManagementData.departmentOverview.totalEmployees}
              </span>
            </div>
          </div>
        </div>

        {/* ================= Employment Type ================= */}
        <div className='rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3'>
          {/* Header */}
          <div className='border-b border-gray-200 p-2'>
            <h3 className='text-sm font-semibold text-green-800'>
              Employment Type
            </h3>
          </div>

          {/* Content */}
          <div className='p-2'>
            <div className='flex items-center gap-3'>
              {/* Donut Chart */}
              <div className='h-28 w-28 shrink-0'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={employeesByEmploymentType.data}
                      dataKey='employeeCount'
                      nameKey='label'
                      cx='50%'
                      cy='50%'
                      innerRadius={28}
                      outerRadius={44}
                      paddingAngle={2}
                    >
                      {employeesByEmploymentType.data.map((item, index) => (
                        <Cell
                          key={`cell-${item.type || index}`}
                          fill={
                            index === 0
                              ? "#166534"
                              : index === 1
                                ? "#3b82f6"
                                : "#f9a8d4"
                          }
                        />
                      ))}
                    </Pie>

                    {/* Tooltip */}
                    <Tooltip
                      formatter={(value, name) => [`${value} Employees`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className='flex-1 space-y-3'>
                {employeesByEmploymentType.data.map((item, index) => (
                  <div
                    key={item.type || index}
                    className='flex items-center justify-between gap-2'
                  >
                    <div className='flex items-center gap-2'>
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-sm ${
                          index === 0
                            ? "bg-green-700"
                            : index === 1
                              ? "bg-blue-500"
                              : "bg-pink-300"
                        }`}
                      />

                      <span className='text-xs text-gray-600'>
                        {item.label}
                      </span>
                    </div>

                    <span className='whitespace-nowrap text-xs font-medium text-gray-700'>
                      {item.employeeCount} ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className='mt-3 text-center'>
              <span className='text-xs font-semibold text-gray-700'>
                Total Employees: {employeesByEmploymentType.total}
              </span>
            </div>
          </div>
        </div>

        {/* ================= Recent Joiners ================= */}
        <div className='rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3'>
          {/* Header */}
          <div className='flex items-center justify-between border-b border-gray-200 px-3 py-2.5'>
            <h3 className='text-sm font-semibold text-green-800'>
              Recent Joiners
            </h3>

            <button
              type='button'
              className='text-xs font-medium text-blue-600 transition hover:text-blue-700'
            >
              View All
            </button>
          </div>

          {/* Recent Joiners List */}
          <div className='p-3'>
            <div className='space-y-2.5'>
              {recentJoiners.map((employee) => (
                <div
                  key={employee.employeeId}
                  className='flex items-center gap-2'
                >
                  {/* Avatar */}
                  <div className='h-7 w-7 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100'>
                    {employee.avatarUrl ? (
                      <img
                        src={employee.avatarUrl}
                        alt={employee.fullName}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center text-[10px] font-semibold text-gray-500'>
                        {employee.fullName?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Employee Name */}
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-xs font-medium text-gray-800'>
                      {employee.fullName}
                    </p>
                  </div>

                  {/* Designation */}
                  <div className='w-24 shrink-0'>
                    <p className='truncate text-[10px] text-gray-500'>
                      {employee.designation}
                    </p>
                  </div>

                  {/* Join Date */}
                  <div className='w-20 shrink-0 text-right'>
                    <p className='whitespace-nowrap text-[10px] text-gray-500'>
                      {employee.joinDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= Quick Actions ================= */}
        <div className='rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3'>
          {/* Header */}
          <div className='border-b border-gray-200 px-3 py-2.5'>
            <h3 className='text-sm font-semibold text-green-800'>
              Quick Actions
            </h3>
          </div>

          {/* Actions */}
          <div className='grid grid-cols-2 gap-2 p-3'>
            {employeeManagementData.quickActions.map((action) => {
              const Icon = quickActionIconMap[action.key];

              return (
                <button
                  key={action.id}
                  type='button'
                  onClick={() => {
                    if (action.action === "navigate" && action.target) {
                      navigate(action.target);
                    }

                    if (action.action === "open-import") {
                      console.log("Open employee import");
                    }
                  }}
                  className='group flex min-h-[82px] cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-2 py-2 transition hover:border-gray-300 hover:bg-gray-50'
                >
                  {/* Icon */}
                  <div className='mb-2 flex h-8 w-8 items-center justify-center'>
                    {Icon && (
                      <Icon
                        size={22}
                        strokeWidth={2}
                        className={
                          action.key === "addEmployee"
                            ? "text-emerald-600"
                            : action.key === "bulkImport"
                              ? "text-blue-600"
                              : action.key === "employeeTransfer"
                                ? "text-purple-600"
                                : "text-orange-500"
                        }
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span className='text-center text-[10px] font-medium text-gray-700'>
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Bottom Analytics */}
      {/* ========================================================= */}
      <section className='grid grid-cols-1 gap-4 lg:grid-cols-12'>
        {/* ================= Gender Distribution ================= */}
        <div className='rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3'>
          <div className='border-b border-gray-200 p-4'>
            {/* Dynamic Header */}
          </div>

          <div className='p-4'>{/* Dynamic Gender Distribution Chart */}</div>
        </div>

        {/* ================= Age Group Distribution ================= */}
        <div className='rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3'>
          <div className='border-b border-gray-200 p-4'>
            {/* Dynamic Header */}
          </div>

          <div className='p-4'>
            {/* Dynamic Age Group Distribution Chart */}
          </div>
        </div>

        {/* ================= Length of Service ================= */}
        <div className='rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3'>
          <div className='border-b border-gray-200 p-4'>
            {/* Dynamic Header */}
          </div>

          <div className='p-4'>{/* Dynamic Length of Service Chart */}</div>
        </div>

        {/* ================= Document Expiry Alerts ================= */}
        <div className='rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-3'>
          <div className='border-b border-gray-200 p-4'>
            {/* Dynamic Header */}
          </div>

          <div className='p-4'>{/* Dynamic Document Expiry Alerts */}</div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeManagement;
