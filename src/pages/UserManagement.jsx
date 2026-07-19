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
} from "lucide-react";

import { userManagementData } from "../data/userManagementData";

const iconMap = {
  Users,
  UserCheck,
  ShieldCheck,
  Shield,
  Lock,
  Clock3,
};

const UserManagement = () => {
  const { search, role, department, status, userType, dateRange } =
    userManagementData.filters;

  const filterItems = [role, department, status, userType];
  return (
    <div className='space-y-6'>
      {/* ================= Summary Cards ================= */}
      <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6'>
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
                  <p className='truncate text-[11px] font-medium uppercase tracking-wide text-slate-500'>
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
                <Search size={16} className='text-gray-500' />

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
      <section className='grid grid-cols-12 gap-2'>
        {/* Left Section */}
        <div className='col-span-9'>
          <div className='flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2'>
            {/* Left Tabs */}
            <div className='flex items-center gap-5'>
              <button className='border-b-2 border-green-700 pb-1 text-xs font-semibold text-green-700'>
                User List
              </button>

              <button className='pb-1 text-xs font-medium text-gray-600 transition hover:text-green-700'>
                Role Management
              </button>

              <button className='pb-1 text-xs font-medium text-gray-600 transition hover:text-green-700'>
                Permission Management
              </button>

              <button className='pb-1 text-xs font-medium text-gray-600 transition hover:text-green-700'>
                User Activity Log
              </button>
            </div>

            {/* Right Buttons */}
            <div className='flex items-center gap-2'>
              {/* Bulk Action */}
              <button className='flex h-8 items-center gap-1 rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-700 hover:bg-gray-50'>
                <ListChecks size={14} />
                Bulk Actions
                <ChevronDown size={14} />
              </button>

              {/* Import */}
              <button className='flex h-8 items-center gap-1 rounded-md border border-gray-300 bg-white px-3 text-xs font-medium text-gray-700 hover:bg-gray-50'>
                <Download size={14} />
                Import Users
              </button>

              {/* Add User */}
              <button className='flex h-8 items-center gap-1 rounded-md bg-green-700 px-3 text-xs font-medium text-white hover:bg-green-800'>
                <Plus size={14} />
                Add New User
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className='col-span-3'>Right Content</div>
      </section>
    </div>
  );
};

export default UserManagement;
