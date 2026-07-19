import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import "react-datepicker/dist/react-datepicker.css";
import {
  Users,
  UserCheck,
  ShieldCheck,
  Shield,
  Lock,
  Clock3,
  Search,
  CalendarDays,
  RotateCcw,
  ListChecks,
  ChevronDown,
  Download,
  Plus,
  MoreVertical,
  UserPlus,
  History,
  FileDown,
  CircleCheck,
} from "lucide-react";

import { userManagementData } from "../data/userManagementData";

const iconMap = {
  Users,
  UserCheck,
  ShieldCheck,
  Shield,
  Lock,
  Clock3,
  UserPlus,
  History,
  FileDown,
};

const UserManagement = () => {
  const { search, role, department, status, userType, dateRange } =
    userManagementData.filters;

  const filterItems = [role, department, status, userType];
  return (
    <div className='space-y-6'>
      {/* ================= Summary Cards ================= */}
      <section className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6'>
        {userManagementData.summaryCards.map((card) => {
          const Icon = iconMap[card.icon];

          return (
            <div
              key={card.id}
              className='cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg'
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${card.bgColor}`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>

                <div className='min-w-0 flex-1'>
                  <p className='truncate text-[8px] font-medium uppercase tracking-wide text-slate-500'>
                    {card.title}
                  </p>

                  <h2 className='mt-1 text-2xl font-bold leading-none text-slate-900 md:text-3xl'>
                    {card.value}
                  </h2>

                  <p className='mt-1 text-[10px] leading-4 text-slate-500 md:text-xs'>
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ================= User Filter Section ================= */}
      <section>
        <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
          {/* Labels */}
          <div className='mb-2 hidden xl:grid xl:grid-cols-12 xl:gap-2'>
            <label className='col-span-2 text-sm font-medium text-gray-700'>
              {search.label}
            </label>

            {filterItems.map((item) => (
              <label
                key={item.label}
                className={`text-sm font-medium text-gray-700 ${
                  item.label === "Department" ? "col-span-2" : ""
                }`}
              >
                {item.label}
              </label>
            ))}

            <label className='col-span-3 text-sm font-medium text-gray-700'>
              {dateRange.label}
            </label>

            <div></div>
            <div></div>
          </div>

          {/* Fields */}
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 xl:gap-2'>
            {/* Search */}
            <div className='xl:col-span-2'>
              <label className='mb-1 block text-sm font-medium text-gray-700 xl:hidden'>
                {search.label}
              </label>

              <label className='flex h-10 items-center gap-2 rounded-lg border border-gray-300 px-3'>
                <Search size={16} className='text-gray-500 cursor-pointer' />

                <input
                  type='text'
                  placeholder={search.placeholder}
                  className='w-full bg-transparent text-sm outline-none'
                />
              </label>
            </div>

            {/* Dynamic Select */}
            {filterItems.map((item) => (
              <div
                key={item.label}
                className={item.label === "Department" ? "xl:col-span-2" : ""}
              >
                <label className='mb-1 block text-sm font-medium text-gray-700 xl:hidden'>
                  {item.label}
                </label>

                <select className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none'>
                  {item.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}

            {/* Date */}
            <div className='xl:col-span-3'>
              <label className='mb-1 block text-sm font-medium text-gray-700 xl:hidden'>
                {dateRange.label}
              </label>

              <label className='flex h-10 items-center gap-2 rounded-lg border border-gray-300 px-3'>
                <CalendarDays size={16} className='text-gray-500' />

                <input
                  type='text'
                  value={`${dateRange.start} - ${dateRange.end}`}
                  readOnly
                  className='w-full bg-transparent text-sm outline-none'
                />
              </label>
            </div>

            {/* Buttons */}
            {userManagementData.filterButtons.map((button) => (
              <button
                key={button.id}
                className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition xl:w-full ${
                  button.variant === "primary"
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {button.variant === "primary" ? (
                  <Search size={16} />
                ) : (
                  <RotateCcw size={16} />
                )}

                {button.text}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* ================= User List Section ================= */}
      <section className='grid grid-cols-1 gap-2 xl:grid-cols-12'>
        {/* Left Section */}
        <div className='w-full xl:col-span-9'>
          <div className='flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-3 lg:flex-row lg:items-center lg:justify-between'>
            {/* ================= Left Tabs ================= */}
            <div className='flex overflow-x-auto whitespace-nowrap scrollbar-hide'>
              <div className='flex items-center gap-3 sm:gap-5'>
                <button className='shrink-0 border-b-2 border-green-700 pb-1 text-[10px] font-semibold text-green-700 sm:text-xs'>
                  User List
                </button>

                <button className='shrink-0 pb-1 text-[10px] font-medium text-gray-600 transition hover:text-green-700 sm:text-xs'>
                  Role Management
                </button>

                <button className='shrink-0 pb-1 text-[10px] font-medium text-gray-600 transition hover:text-green-700 sm:text-xs'>
                  Permission Management
                </button>

                <button className='shrink-0 pb-1 text-[10px] font-medium text-gray-600 transition hover:text-green-700 sm:text-xs'>
                  User Activity Log
                </button>
              </div>
            </div>

            {/* ================= Right Buttons ================= */}
            <div className='grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-end'>
              {/* Bulk Action */}
              <button className='flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-[10px] font-medium text-gray-700 transition hover:bg-gray-50 sm:h-8 sm:text-xs'>
                <ListChecks size={14} />
                Bulk Actions
                <ChevronDown size={14} />
              </button>

              {/* Import */}
              <button className='flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 text-[10px] font-medium text-gray-700 transition hover:bg-gray-50 sm:h-8 sm:text-xs'>
                <Download size={14} />
                Import Users
              </button>

              {/* Add User */}
              <button className='flex h-9 items-center justify-center gap-2 rounded-md bg-green-700 px-3 text-[10px] font-medium text-white transition hover:bg-green-800 sm:h-8 sm:text-xs'>
                <Plus size={14} />
                Add New User
              </button>
            </div>
          </div>
          {/* ================= User table Section ================= */}
          <div className='mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white'>
            <div className='overflow-x-auto'>
              <table className='min-w-full'>
                {/* ================= Table Header ================= */}
                <thead className='bg-slate-50'>
                  <tr className='border-b border-gray-200'>
                    {userManagementData.tableHeaders.map((header) => (
                      <th
                        key={header.id}
                        className='whitespace-nowrap px-2 py-2 text-left text-[11px] font-medium text-slate-600'
                      >
                        {header.key === "checkbox" ? (
                          <input
                            type='checkbox'
                            className='checkbox checkbox-xs cursor-pointer'
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
                  {userManagementData.users.map((user, index) => (
                    <tr
                      key={user.id}
                      className='border-b border-gray-100 hover:bg-slate-50'
                    >
                      {/* Checkbox */}
                      <td className='px-2 py-2'>
                        <input
                          type='checkbox'
                          className='checkbox checkbox-xs cursor-pointer'
                        />
                      </td>

                      {/* SL */}
                      <td className='px-2 py-2 text-sm font-medium'>
                        {index + 1}
                      </td>

                      {/* User */}
                      <td className='px-2 py-2'>
                        <div className='flex items-center gap-2'>
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className='h-8 w-8 rounded-full object-cover cursor-pointer'
                          />

                          <div>
                            <div className='flex items-center gap-1'>
                              <h4 className='text-xs font-normal text-slate-800'>
                                {user.name}
                              </h4>

                              {user.isCurrentUser && (
                                <span className='rounded bg-green-100 px-1.5 py-0 text-[9px] font-semibold text-green-700'>
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Username */}
                      <td className='px-2 py-2 text-xs text-slate-600'>
                        {user.username}
                      </td>

                      {/* Email */}
                      <td className='px-2 py-2 text-xs text-slate-600'>
                        {user.email}
                      </td>

                      {/* Role */}
                      <td className='px-2 py-2'>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${user.roleColor}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Department */}
                      <td className='px-2 py-2 text-xs text-slate-600'>
                        {user.department}
                      </td>

                      {/* Status */}
                      <td className='px-2 py-2'>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Last Login */}
                      <td className='px-2 py-2 text-xs text-slate-600'>
                        {user.lastLogin}
                      </td>

                      {/* Action */}
                      <td className='px-2 py-2'>
                        <button className='rounded-md p-1 hover:bg-slate-100'>
                          <MoreVertical size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* ================= Pagination ================= */}
            <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3'>
              {/* Left Side */}
              <div className='text-xs text-slate-600'>
                Showing{" "}
                <span className='font-semibold text-slate-800'>
                  {userManagementData.pagination.pageSize}
                </span>{" "}
                of{" "}
                <span className='font-semibold text-slate-800'>
                  {userManagementData.pagination.totalUsers}
                </span>{" "}
                users
              </div>

              {/* Right Side */}
              <div className='flex items-center gap-1'>
                {/* Previous */}
                <button className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-slate-600 transition hover:bg-slate-100'>
                  &lt;
                </button>

                {/* Page Numbers */}
                <button className='flex h-8 w-8 items-center justify-center rounded-md bg-green-700 text-xs font-semibold text-white'>
                  1
                </button>

                <button className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-xs text-slate-600 transition hover:bg-slate-100'>
                  2
                </button>

                <button className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-xs text-slate-600 transition hover:bg-slate-100'>
                  3
                </button>

                <span className='px-1 text-slate-500'>...</span>

                <button className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-xs text-slate-600 transition hover:bg-slate-100'>
                  {userManagementData.pagination.totalPages}
                </button>

                {/* Next */}
                <button className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-slate-600 transition hover:bg-slate-100'>
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Right Section ================= */}
        <div className='w-full space-y-4 xl:col-span-3'>
          {/* ================= User Summary ================= */}

          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
              <h3 className='text-sm font-semibold text-slate-800'>
                {userManagementData.summaryPanel.title}
              </h3>

              <select className='rounded-md border border-gray-300 bg-white px-2 py-1 text-xs outline-none'>
                {userManagementData.summaryPanel.filter.options.map(
                  (option) => (
                    <option key={option}>{option}</option>
                  ),
                )}
              </select>
            </div>

            {/* Chart + Legend */}
            <div className='flex items-center gap-1 px-2 py-3'>
              {/* Pie Chart */}
              <div className='flex shrink-0 items-center justify-center'>
                <PieChart width={135} height={135}>
                  <Pie
                    data={userManagementData.userSummary}
                    cx='50%'
                    cy='50%'
                    innerRadius={32}
                    outerRadius={48}
                    paddingAngle={2}
                    dataKey='total'
                  >
                    {userManagementData.userSummary.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </div>

              {/* Legend */}
              <div className='flex-1 space-y-2'>
                {userManagementData.userSummary.map((item) => (
                  <div
                    key={item.role}
                    className='flex items-center justify-between'
                  >
                    <div className='flex w-[130px] items-center gap-2'>
                      <span
                        className='h-2.5 w-2.5 rounded-full'
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                      <span className='truncate text-[11px] text-slate-600'>
                        {item.role}
                      </span>
                    </div>

                    <span className='text-[11px] font-semibold text-slate-800'>
                      {item.total}

                      {item.percentage && (
                        <span className='ml-1 text-[10px] font-normal text-slate-500'>
                          ({item.percentage})
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Users */}
            <div className='flex items-center justify-center gap-2 border-t border-gray-200 py-3'>
              <p className='text-sm font-medium text-slate-500'>Total Users:</p>

              <h3 className='text-xl font-bold text-slate-800'>
                {userManagementData.pagination.totalUsers}
              </h3>
            </div>
          </div>
          {/* ================= Recent User Registrations ================= */}
          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
              <h3 className='text-sm font-semibold text-green-700'>
                {userManagementData.recentRegistrations.title}
              </h3>

              <button className='text-xs font-medium text-blue-600 hover:text-blue-700'>
                {userManagementData.recentRegistrations.viewAll}
              </button>
            </div>

            {/* Body */}
            <div className='space-y-3 px-4 py-4'>
              {userManagementData.recentRegistrations.users.map((user) => (
                <div
                  key={user.id}
                  className='grid grid-cols-3 items-center gap-2'
                >
                  {/* User */}
                  <div className='flex items-center gap-2 '>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className='h-8 w-8 rounded-full object-cover '
                    />

                    <span className='text-[12px] font-medium text-slate-800 '>
                      {user.name}
                    </span>
                  </div>

                  {/* Role */}
                  <p className='text-[12px] text-slate-500 ml-2'>{user.role}</p>

                  {/* Date */}
                  <p className='text-right text-[12px] text-slate-500'>
                    {user.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* ================= Quick Actions ================= */}
          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h3 className='text-sm font-semibold text-green-700'>
                {userManagementData.quickActions.title}
              </h3>
            </div>

            {/* Body */}
            <div className='grid grid-cols-5 gap-2 p-3'>
              {userManagementData.quickActions.actions.map((action) => {
                const Icon = iconMap[action.icon];

                return (
                  <button
                    key={action.id}
                    className='flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-2 py-3 transition hover:border-green-600 hover:bg-green-50'
                  >
                    <Icon size={18} className={action.iconColor} />

                    <span className='mt-2 text-[9px] font-medium leading-3 text-slate-600 text-center'>
                      {action.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {/* ================= Important Notes ================= */}
          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h3 className='text-sm font-semibold text-green-700'>
                {userManagementData.importantNotes.title}
              </h3>
            </div>

            {/* Body */}
            <div className='space-y-3 px-4 py-4'>
              {userManagementData.importantNotes.notes.map((note) => (
                <div key={note.id} className='flex items-start gap-2'>
                  <CircleCheck
                    size={16}
                    className='mt-0.5 shrink-0 text-green-600'
                  />

                  <p className='text-[11px] leading-5 text-slate-600'>
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserManagement;
