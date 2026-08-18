import React from "react";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Lightbulb,
  Pencil,
  Settings2,
  Trash2,
  Users,
  ClipboardCheck,
  FileCheck2,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Search,
  Download,
  FileDown,
  FileSpreadsheet,
  Printer,
} from "lucide-react";

const ShiftAndDutyRosterEntryProcess = () => {
  return (
    <div>
      <HrWorkforceTabs />

      <div className='mt-4 space-y-4'>
        {/* ================= STEP GRID ================= */}
        <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3'>
          {/* ================= STEP 01 ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* ================= STEP HEADER ================= */}
            <div className='flex items-start gap-2'>
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-800 text-sm font-semibold text-white'>
                1
              </div>

              <div className='min-w-0'>
                <h2 className='text-sm font-semibold text-green-800'>
                  Create Shift (Shifts Define করুন)
                </h2>

                <p className='mt-1 text-[10px] leading-4 text-gray-500'>
                  প্রথমে বিভিন্ন শিফটের সময় নির্ধারণ করুন। যেমন: Day, Evening,
                  Night ইত্যাদি।
                </p>
              </div>
            </div>

            {/* ================= SHIFT MANAGEMENT ================= */}
            <div className='mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50'>
              <div className='flex min-h-[240px]'>
                {/* ================= MINI SIDEBAR ================= */}
                <div className='hidden w-9 shrink-0 flex-col items-center bg-green-900 py-3 sm:flex'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-white'>
                    <Settings2 size={13} />
                  </div>

                  <div className='mt-4 flex flex-col items-center gap-4 text-white/80'>
                    <div className='flex flex-col items-center gap-1'>
                      <CalendarDays size={11} />
                      <span className='text-[6px]'>Shift</span>
                    </div>

                    <div className='flex flex-col items-center gap-1'>
                      <Users size={11} />
                      <span className='text-[6px]'>Workers</span>
                    </div>

                    <div className='flex flex-col items-center gap-1'>
                      <Settings2 size={11} />
                      <span className='text-[6px]'>General</span>
                    </div>
                  </div>
                </div>

                {/* ================= MAIN CONTENT ================= */}
                <div className='min-w-0 flex-1 bg-white p-2.5'>
                  {/* HEADER */}
                  <div className='mb-2 flex items-center justify-between gap-2'>
                    <div className='min-w-0'>
                      <p className='text-[10px] font-semibold text-gray-700'>
                        Shift Management
                      </p>

                      <p className='truncate text-[7px] text-gray-400'>
                        HR & Workforce Management › Shift Management
                      </p>
                    </div>

                    <button
                      type='button'
                      className='shrink-0 rounded bg-green-800 px-2.5 py-1.5 text-[7px] font-medium text-white'
                    >
                      + Add Shift
                    </button>
                  </div>

                  {/* ================= SHIFT TABLE ================= */}
                  <div className='overflow-hidden rounded border border-gray-200 bg-white'>
                    {/* TABLE HEADER */}
                    <div className='grid grid-cols-[1.35fr_.5fr_.8fr_1.05fr_1.05fr_.7fr_.7fr_.65fr_.5fr] border-b border-gray-100 bg-gray-50 px-2 py-1.5'>
                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Shift Name
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Short Code
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Shift Type
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Start Time
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        End Time
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Grace In (m)
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Grace Out (m)
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Status
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Action
                      </span>
                    </div>

                    {/* TABLE ROWS */}
                    {[
                      [
                        "Day Shift",
                        "D",
                        "Day",
                        "06:00 AM",
                        "02:00 PM",
                        "15",
                        "15",
                      ],
                      [
                        "Evening Shift",
                        "E",
                        "Evening",
                        "02:00 PM",
                        "10:00 PM",
                        "15",
                        "15",
                      ],
                      [
                        "Night Shift",
                        "N",
                        "Night",
                        "10:00 PM",
                        "06:00 AM",
                        "15",
                        "15",
                      ],
                      [
                        "General Shift",
                        "G",
                        "General",
                        "08:00 AM",
                        "05:00 PM",
                        "15",
                        "15",
                      ],
                    ].map((shift) => (
                      <div
                        key={shift[1]}
                        className='grid grid-cols-[1.35fr_.5fr_.8fr_1.05fr_1.05fr_.7fr_.7fr_.65fr_.5fr] items-center border-b border-gray-50 px-2 py-1.5 last:border-0'
                      >
                        {/* SHIFT NAME */}
                        <span className='truncate text-[6.5px] text-gray-600'>
                          {shift[0]}
                        </span>

                        {/* SHORT CODE */}
                        <span className='text-[6.5px] text-gray-600'>
                          {shift[1]}
                        </span>

                        {/* TYPE */}
                        <span className='text-[6.5px] text-gray-600'>
                          {shift[2]}
                        </span>

                        {/* START TIME */}
                        <span className='whitespace-nowrap text-[6.5px] text-gray-600'>
                          {shift[3]}
                        </span>

                        {/* END TIME */}
                        <span className='whitespace-nowrap text-[6.5px] text-gray-600'>
                          {shift[4]}
                        </span>

                        {/* GRACE IN */}
                        <span className='text-[6.5px] text-gray-600'>
                          {shift[5]}
                        </span>

                        {/* GRACE OUT */}
                        <span className='text-[6.5px] text-gray-600'>
                          {shift[6]}
                        </span>

                        {/* STATUS */}
                        <span className='text-[6.5px] font-medium text-green-600'>
                          Active
                        </span>

                        {/* ACTION */}
                        <div className='flex items-center gap-1'>
                          <button
                            type='button'
                            className='text-gray-500 transition hover:text-green-700'
                          >
                            <Pencil size={8} />
                          </button>

                          <button
                            type='button'
                            className='text-red-500 transition hover:text-red-700'
                          >
                            <Trash2 size={8} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ================= ADD NEW SHIFT ================= */}
                  <div className='mt-2'>
                    <p className='mb-1.5 text-[8px] font-semibold text-green-800'>
                      Add New Shift
                    </p>

                    {/* ================= FORM ROW 1 ================= */}
                    <div className='grid grid-cols-4 gap-1.5'>
                      {/* SHIFT NAME */}
                      <div>
                        <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                          Shift Name <span className='text-red-500'>*</span>
                        </p>

                        <div className='flex h-5 items-center rounded border border-gray-200 bg-white px-1.5'>
                          <span className='truncate text-[6.5px] text-gray-400'>
                            Enter Shift Name
                          </span>
                        </div>
                      </div>

                      {/* SHORT CODE */}
                      <div>
                        <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                          Short Code <span className='text-red-500'>*</span>
                        </p>

                        <div className='flex h-5 items-center rounded border border-gray-200 bg-white px-1.5'>
                          <span className='truncate text-[6.5px] text-gray-400'>
                            Enter Code
                          </span>
                        </div>
                      </div>

                      {/* SHIFT TYPE */}
                      <div>
                        <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                          Shift Type <span className='text-red-500'>*</span>
                        </p>

                        <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                          <span className='truncate text-[6.5px] text-gray-400'>
                            Select Type
                          </span>

                          <ChevronDown size={8} className='text-gray-400' />
                        </div>
                      </div>

                      {/* START TIME */}
                      <div>
                        <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                          Start Time <span className='text-red-500'>*</span>
                        </p>

                        <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                          <span className='truncate text-[6.5px] text-gray-400'>
                            Select Start Time
                          </span>

                          <Clock3 size={8} className='text-gray-400' />
                        </div>
                      </div>
                    </div>

                    {/* ================= FORM ROW 2 ================= */}
                    <div className='mt-1.5 grid grid-cols-4 gap-1.5'>
                      {/* END TIME */}
                      <div>
                        <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                          End Time <span className='text-red-500'>*</span>
                        </p>

                        <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                          <span className='truncate text-[6.5px] text-gray-400'>
                            Select End Time
                          </span>

                          <Clock3 size={8} className='text-gray-400' />
                        </div>
                      </div>

                      {/* GRACE OUT */}
                      <div>
                        <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                          Grace Out (Minutes)
                        </p>

                        <div className='flex h-5 items-center rounded border border-gray-200 bg-white px-1.5'>
                          <span className='text-[6.5px] text-gray-400'>15</span>
                        </div>
                      </div>

                      {/* GRACE IN */}
                      <div>
                        <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                          Grace In (Minutes)
                        </p>

                        <div className='flex h-5 items-center rounded border border-gray-200 bg-white px-1.5'>
                          <span className='text-[6.5px] text-gray-400'>15</span>
                        </div>
                      </div>

                      {/* STATUS */}
                      <div>
                        <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                          Status
                        </p>

                        <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                          <span className='text-[6.5px] text-gray-600'>
                            Active
                          </span>

                          <ChevronDown size={8} className='text-gray-400' />
                        </div>
                      </div>
                    </div>

                    {/* ================= BUTTON ROW ================= */}
                    <div className='mt-1.5 flex items-center justify-end gap-1.5'>
                      <button
                        type='button'
                        className='h-5 rounded border border-gray-200 bg-white px-2.5 text-[6.5px] font-medium text-gray-600 transition hover:bg-gray-50'
                      >
                        Cancel
                      </button>

                      <button
                        type='button'
                        className='h-5 rounded bg-green-800 px-2.5 text-[6.5px] font-medium text-white transition hover:bg-green-900'
                      >
                        Save Shift
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= EXAMPLE ================= */}
            <div className='mt-2 flex items-center gap-1.5 rounded-lg bg-green-50 p-2'>
              <Lightbulb size={11} className='shrink-0 text-green-700' />

              <p className='text-[9px] leading-4 text-gray-600'>
                Example: Day Shift (06:00 AM - 02:00 PM)
              </p>
            </div>
          </div>

          {/* ================= STEP 02 ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* ================= STEP HEADER ================= */}
            <div className='flex items-start gap-2'>
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-800 text-sm font-semibold text-white'>
                2
              </div>

              <div className='min-w-0'>
                <h2 className='text-sm font-semibold text-green-800'>
                  Create Duty / Roster Template
                </h2>

                <p className='mt-1 text-[10px] leading-4 text-gray-500'>
                  কোন দিন কোন শিফট চলবে তা সেট করুন। Weekly Off সেট করতে পারবেন।
                </p>
              </div>
            </div>

            {/* ================= ROSTER TEMPLATE ================= */}
            <div className='mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50'>
              <div className='bg-white p-2.5'>
                {/* ================= HEADER ================= */}
                <div className='mb-2 flex items-center justify-between gap-2'>
                  <div className='min-w-0'>
                    <p className='text-[10px] font-semibold text-gray-700'>
                      Roster Template
                    </p>

                    <p className='truncate text-[7px] text-gray-400'>
                      HR & Workforce Management › Roster Template
                    </p>
                  </div>

                  <button
                    type='button'
                    className='shrink-0 rounded bg-green-800 px-2.5 py-1.5 text-[7px] font-medium text-white transition hover:bg-green-900'
                  >
                    + Create Template
                  </button>
                </div>

                {/* ================= TEMPLATE BASIC INFORMATION ================= */}
                <div className='grid grid-cols-4 gap-1.5'>
                  {/* TEMPLATE NAME */}
                  <div>
                    <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                      Template Name <span className='text-red-500'>*</span>
                    </p>

                    <div className='flex h-5 items-center rounded border border-gray-200 bg-white px-1.5'>
                      <span className='truncate text-[6.5px] text-gray-600'>
                        Weekly Roster
                      </span>
                    </div>
                  </div>

                  {/* START FROM */}
                  <div>
                    <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                      Start From <span className='text-red-500'>*</span>
                    </p>

                    <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                      <span className='text-[6.5px] text-gray-600'>
                        01-06-2026
                      </span>

                      <CalendarDays
                        size={8}
                        className='shrink-0 text-gray-400'
                      />
                    </div>
                  </div>

                  {/* WEEKLY OFF */}
                  <div>
                    <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                      Weekly Off
                    </p>

                    <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                      <span className='text-[6.5px] text-gray-600'>Friday</span>

                      <ChevronDown
                        size={8}
                        className='shrink-0 text-gray-400'
                      />
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                      Description
                    </p>

                    <div className='flex h-5 items-center rounded border border-gray-200 bg-white px-1.5'>
                      <span className='truncate text-[6.5px] text-gray-600'>
                        Standard weekly roster
                      </span>
                    </div>
                  </div>
                </div>

                {/* ================= WEEKLY ROSTER TABLE ================= */}
                <div className='mt-2 overflow-hidden rounded border border-gray-200 bg-white'>
                  {/* TABLE HEADER */}
                  <div className='grid grid-cols-[1fr_1.35fr_1.4fr_.8fr] border-b border-gray-100 bg-gray-50 px-2 py-1.5'>
                    <span className='text-[6.5px] font-semibold text-gray-500'>
                      Day
                    </span>

                    <span className='text-[6.5px] font-semibold text-gray-500'>
                      Shift
                    </span>

                    <span className='text-[6.5px] font-semibold text-gray-500'>
                      Working Hours
                    </span>

                    <span className='text-center text-[6.5px] font-semibold text-gray-500'>
                      Is Weekly Off?
                    </span>
                  </div>

                  {/* ================= MONDAY ================= */}
                  <div className='grid grid-cols-[1fr_1.35fr_1.4fr_.8fr] items-center border-b border-gray-50 px-2 py-1.5'>
                    <span className='text-[6.5px] text-gray-600'>Monday</span>

                    <span className='text-[6.5px] text-gray-600'>
                      Day Shift (D)
                    </span>

                    <span className='whitespace-nowrap text-[6.5px] text-gray-600'>
                      06:00 AM - 02:00 PM
                    </span>

                    <div className='flex justify-center'>
                      <div className='h-2.5 w-5 rounded-full bg-gray-200'>
                        <div className='mt-[1px] ml-[1px] h-2 w-2 rounded-full bg-white shadow-sm' />
                      </div>
                    </div>
                  </div>

                  {/* ================= TUESDAY ================= */}
                  <div className='grid grid-cols-[1fr_1.35fr_1.4fr_.8fr] items-center border-b border-gray-50 px-2 py-1.5'>
                    <span className='text-[6.5px] text-gray-600'>Tuesday</span>

                    <span className='text-[6.5px] text-gray-600'>
                      Day Shift (D)
                    </span>

                    <span className='whitespace-nowrap text-[6.5px] text-gray-600'>
                      06:00 AM - 02:00 PM
                    </span>

                    <div className='flex justify-center'>
                      <div className='h-2.5 w-5 rounded-full bg-gray-200'>
                        <div className='mt-[1px] ml-[1px] h-2 w-2 rounded-full bg-white shadow-sm' />
                      </div>
                    </div>
                  </div>

                  {/* ================= WEDNESDAY ================= */}
                  <div className='grid grid-cols-[1fr_1.35fr_1.4fr_.8fr] items-center border-b border-gray-50 px-2 py-1.5'>
                    <span className='text-[6.5px] text-gray-600'>
                      Wednesday
                    </span>

                    <span className='text-[6.5px] text-gray-600'>
                      Evening Shift (E)
                    </span>

                    <span className='whitespace-nowrap text-[6.5px] text-gray-600'>
                      02:00 PM - 10:00 PM
                    </span>

                    <div className='flex justify-center'>
                      <div className='h-2.5 w-5 rounded-full bg-gray-200'>
                        <div className='mt-[1px] ml-[1px] h-2 w-2 rounded-full bg-white shadow-sm' />
                      </div>
                    </div>
                  </div>

                  {/* ================= THURSDAY ================= */}
                  <div className='grid grid-cols-[1fr_1.35fr_1.4fr_.8fr] items-center border-b border-gray-50 px-2 py-1.5'>
                    <span className='text-[6.5px] text-gray-600'>Thursday</span>

                    <span className='text-[6.5px] text-gray-600'>
                      Evening Shift (E)
                    </span>

                    <span className='whitespace-nowrap text-[6.5px] text-gray-600'>
                      02:00 PM - 10:00 PM
                    </span>

                    <div className='flex justify-center'>
                      <div className='h-2.5 w-5 rounded-full bg-gray-200'>
                        <div className='mt-[1px] ml-[1px] h-2 w-2 rounded-full bg-white shadow-sm' />
                      </div>
                    </div>
                  </div>

                  {/* ================= FRIDAY ================= */}
                  <div className='grid grid-cols-[1fr_1.35fr_1.4fr_.8fr] items-center border-b border-gray-50 px-2 py-1.5'>
                    <span className='text-[6.5px] text-gray-600'>Friday</span>

                    <span className='text-[6.5px] font-medium text-gray-500'>
                      Weekly Off
                    </span>

                    <span className='text-[6.5px] text-gray-400'>-</span>

                    <div className='flex justify-center'>
                      <div className='h-2.5 w-5 rounded-full bg-green-700'>
                        <div className='mt-[1px] ml-[11px] h-2 w-2 rounded-full bg-white shadow-sm' />
                      </div>
                    </div>
                  </div>

                  {/* ================= SATURDAY ================= */}
                  <div className='grid grid-cols-[1fr_1.35fr_1.4fr_.8fr] items-center border-b border-gray-50 px-2 py-1.5'>
                    <span className='text-[6.5px] text-gray-600'>Saturday</span>

                    <span className='text-[6.5px] text-gray-600'>
                      Day Shift (D)
                    </span>

                    <span className='whitespace-nowrap text-[6.5px] text-gray-600'>
                      06:00 AM - 02:00 PM
                    </span>

                    <div className='flex justify-center'>
                      <div className='h-2.5 w-5 rounded-full bg-gray-200'>
                        <div className='mt-[1px] ml-[1px] h-2 w-2 rounded-full bg-white shadow-sm' />
                      </div>
                    </div>
                  </div>

                  {/* ================= SUNDAY ================= */}
                  <div className='grid grid-cols-[1fr_1.35fr_1.4fr_.8fr] items-center px-2 py-1.5'>
                    <span className='text-[6.5px] text-gray-600'>Sunday</span>

                    <span className='text-[6.5px] text-gray-600'>
                      Day Shift (D)
                    </span>

                    <span className='whitespace-nowrap text-[6.5px] text-gray-600'>
                      06:00 AM - 02:00 PM
                    </span>

                    <div className='flex justify-center'>
                      <div className='h-2.5 w-5 rounded-full bg-gray-200'>
                        <div className='mt-[1px] ml-[1px] h-2 w-2 rounded-full bg-white shadow-sm' />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= ACTION BUTTONS ================= */}
                <div className='mt-2 flex items-center justify-end gap-1.5'>
                  <button
                    type='button'
                    className='h-5 rounded border border-gray-200 bg-white px-2.5 text-[6.5px] font-medium text-gray-600 transition hover:bg-gray-50'
                  >
                    Cancel
                  </button>

                  <button
                    type='button'
                    className='h-5 rounded bg-green-800 px-2.5 text-[6.5px] font-medium text-white transition hover:bg-green-900'
                  >
                    Save Template
                  </button>
                </div>
              </div>
            </div>

            {/* ================= INFO ================= */}
            <div className='mt-2 flex items-start gap-1.5 rounded-lg bg-blue-50 p-2'>
              <Settings2 size={11} className='mt-0.5 shrink-0 text-blue-700' />

              <p className='text-[9px] leading-4 text-gray-600'>
                একটি Template তৈরি করে সেটি পরবর্তীতে একাধিক Department /
                Section-এ ব্যবহার করা যাবে।
              </p>
            </div>
          </div>

          {/* ================= STEP 03 ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* ================= STEP HEADER ================= */}
            <div className='flex items-start gap-2'>
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-800 text-sm font-semibold text-white'>
                3
              </div>

              <div className='min-w-0'>
                <h2 className='text-sm font-semibold text-green-800'>
                  Assign Template to Department / Section
                </h2>

                <p className='mt-1 text-[10px] leading-4 text-gray-500'>
                  রোস্টার টেমপ্লেট নির্দিষ্ট Department / Section এ অ্যাসাইন
                  করুন।
                </p>
              </div>
            </div>

            {/* ================= ASSIGN TEMPLATE CARD ================= */}
            <div className='mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50'>
              <div className='bg-white p-2.5'>
                {/* ================= CARD HEADER ================= */}
                <div className='mb-2'>
                  <p className='text-[10px] font-semibold text-gray-700'>
                    Assign Template
                  </p>

                  <p className='text-[7px] text-gray-400'>
                    HR & Workforce Management › Assign Template
                  </p>
                </div>

                {/* ================= ASSIGN FORM ================= */}
                <div className='grid grid-cols-3 gap-1.5'>
                  {/* TEMPLATE */}
                  <div>
                    <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                      Template
                    </p>

                    <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                      <span className='truncate text-[6.5px] text-gray-600'>
                        Weekly Roster
                      </span>

                      <ChevronDown
                        size={8}
                        className='shrink-0 text-gray-400'
                      />
                    </div>
                  </div>

                  {/* DEPARTMENT */}
                  <div>
                    <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                      Department
                    </p>

                    <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                      <span className='truncate text-[6.5px] text-gray-600'>
                        Plucking
                      </span>

                      <ChevronDown
                        size={8}
                        className='shrink-0 text-gray-400'
                      />
                    </div>
                  </div>

                  {/* EFFECTIVE FROM */}
                  <div>
                    <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                      Effective From <span className='text-red-500'>*</span>
                    </p>

                    <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                      <span className='text-[6.5px] text-gray-600'>
                        01-06-2026
                      </span>

                      <CalendarDays
                        size={8}
                        className='shrink-0 text-gray-400'
                      />
                    </div>
                  </div>

                  {/* SECTION */}
                  <div className='col-start-2'>
                    <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                      <span className='truncate text-[6.5px] text-gray-600'>
                        North Section
                      </span>

                      <ChevronDown
                        size={8}
                        className='shrink-0 text-gray-400'
                      />
                    </div>
                  </div>
                </div>

                {/* ================= ASSIGNED TABLE ================= */}
                <div className='mt-2.5'>
                  <p className='mb-1 text-[7px] font-semibold text-gray-600'>
                    Assigned Sections / Departments
                  </p>

                  <div className='overflow-hidden rounded border border-gray-200 bg-white'>
                    {/* TABLE HEADER */}
                    <div className='grid grid-cols-[1fr_1.2fr_1.2fr_1fr_.45fr] border-b border-gray-100 bg-gray-50 px-2 py-1.5'>
                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Department
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Section
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Template
                      </span>

                      <span className='text-[6.5px] font-semibold text-gray-500'>
                        Effective From
                      </span>

                      <span className='text-center text-[6.5px] font-semibold text-gray-500'>
                        Action
                      </span>
                    </div>

                    {/* ================= ROW 1 ================= */}
                    <div className='grid grid-cols-[1fr_1.2fr_1.2fr_1fr_.45fr] items-center border-b border-gray-50 px-2 py-1.5'>
                      <span className='text-[6.5px] text-gray-600'>
                        Plucking
                      </span>

                      <span className='text-[6.5px] text-gray-600'>
                        North Section
                      </span>

                      <span className='text-[6.5px] text-gray-600'>
                        Weekly Roster
                      </span>

                      <span className='text-[6.5px] text-gray-600'>
                        01-06-2026
                      </span>

                      <div className='flex justify-center'>
                        <button
                          type='button'
                          className='text-red-500 transition hover:text-red-700'
                        >
                          <Trash2 size={8} />
                        </button>
                      </div>
                    </div>

                    {/* ================= ROW 2 ================= */}
                    <div className='grid grid-cols-[1fr_1.2fr_1.2fr_1fr_.45fr] items-center border-b border-gray-50 px-2 py-1.5'>
                      <span className='text-[6.5px] text-gray-600'>
                        Plucking
                      </span>

                      <span className='text-[6.5px] text-gray-600'>
                        South Section
                      </span>

                      <span className='text-[6.5px] text-gray-600'>
                        Weekly Roster
                      </span>

                      <span className='text-[6.5px] text-gray-600'>
                        01-06-2026
                      </span>

                      <div className='flex justify-center'>
                        <button
                          type='button'
                          className='text-red-500 transition hover:text-red-700'
                        >
                          <Trash2 size={8} />
                        </button>
                      </div>
                    </div>

                    {/* ================= ROW 3 ================= */}
                    <div className='grid grid-cols-[1fr_1.2fr_1.2fr_1fr_.45fr] items-center px-2 py-1.5'>
                      <span className='text-[6.5px] text-gray-600'>
                        Factory
                      </span>

                      <span className='text-[6.5px] text-gray-600'>
                        Factory Section
                      </span>

                      <span className='text-[6.5px] text-gray-600'>
                        Weekly Roster
                      </span>

                      <span className='text-[6.5px] text-gray-600'>
                        01-06-2026
                      </span>

                      <div className='flex justify-center'>
                        <button
                          type='button'
                          className='text-red-500 transition hover:text-red-700'
                        >
                          <Trash2 size={8} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= ACTION BUTTONS ================= */}
                <div className='mt-2.5 flex items-center justify-end gap-1.5'>
                  <button
                    type='button'
                    className='h-5 rounded border border-gray-200 bg-white px-2.5 text-[6.5px] font-medium text-gray-600 transition hover:bg-gray-50'
                  >
                    Cancel
                  </button>

                  <button
                    type='button'
                    className='h-5 rounded bg-green-800 px-2.5 text-[6.5px] font-medium text-white transition hover:bg-green-900'
                  >
                    Assign Template
                  </button>
                </div>
              </div>
            </div>

            {/* ================= INFO ================= */}
            <div className='mt-2 flex items-start gap-1.5 rounded-lg bg-purple-50 p-2'>
              <ClipboardCheck
                size={11}
                className='mt-0.5 shrink-0 text-purple-700'
              />

              <p className='text-[9px] leading-4 text-gray-600'>
                সঠিক Department এবং Section নির্বাচন করে Template Assign করুন।
              </p>
            </div>
          </div>

          {/* ================= STEP 04 ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* ================= STEP HEADER ================= */}
            <div className='flex items-start gap-2'>
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-800 text-sm font-semibold text-white'>
                4
              </div>

              <div className='min-w-0'>
                <h2 className='text-sm font-semibold text-green-800'>
                  Assign Workers
                </h2>

                <p className='mt-1 text-[10px] leading-4 text-gray-500'>
                  নির্দিষ্ট Department / Section এর কর্মীদের টেমপ্লেট অনুযায়ী
                  রোস্টারে যুক্ত করুন।
                </p>
              </div>
            </div>

            {/* ================= MAIN CARD ================= */}
            <div className='mt-3 rounded-lg border border-gray-200 bg-gray-50 p-2.5'>
              {/* ================= CARD HEADER ================= */}
              <div className='mb-2'>
                <p className='text-[10px] font-semibold text-gray-700'>
                  Assign Workers to Roster
                </p>

                <p className='text-[7px] text-gray-400'>
                  HR & Workforce Management › Assign Workers
                </p>
              </div>

              {/* ================= TOP FILTERS ================= */}
              <div className='grid grid-cols-4 gap-1.5'>
                {/* DEPARTMENT */}
                <div>
                  <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                    Department
                  </p>

                  <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                    <span className='truncate text-[6.5px] text-gray-600'>
                      Plucking
                    </span>

                    <ChevronDown size={8} className='shrink-0 text-gray-400' />
                  </div>
                </div>

                {/* SECTION */}
                <div>
                  <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                    Section
                  </p>

                  <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                    <span className='truncate text-[6.5px] text-gray-600'>
                      North Section
                    </span>

                    <ChevronDown size={8} className='shrink-0 text-gray-400' />
                  </div>
                </div>

                {/* TEMPLATE */}
                <div>
                  <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                    Template
                  </p>

                  <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                    <span className='truncate text-[6.5px] text-gray-600'>
                      Weekly Roster
                    </span>

                    <ChevronDown size={8} className='shrink-0 text-gray-400' />
                  </div>
                </div>

                {/* EFFECTIVE FROM */}
                <div>
                  <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                    Effective From
                  </p>

                  <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                    <span className='text-[6.5px] text-gray-600'>
                      01-06-2026
                    </span>

                    <CalendarDays size={8} className='shrink-0 text-gray-400' />
                  </div>
                </div>
              </div>

              {/* ================= WORKER SELECTION ================= */}
              <div className='mt-2 grid grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] items-center gap-1.5'>
                {/* ================= AVAILABLE WORKERS ================= */}
                <div className='min-w-0 rounded border border-gray-200 bg-white p-2'>
                  <p className='text-[8px] font-semibold text-gray-600'>
                    Available Workers
                  </p>

                  {/* SEARCH */}
                  <div className='mt-1.5 flex h-5 items-center gap-1 rounded border border-gray-200 bg-white px-1.5'>
                    <Search size={8} className='shrink-0 text-gray-400' />

                    <span className='truncate text-[6.5px] text-gray-400'>
                      Search Worker...
                    </span>
                  </div>

                  {/* WORKERS */}
                  <div className='mt-1.5 space-y-0.5'>
                    {[
                      ["WRK-10001", "Rupa Rani Tanti"],
                      ["WRK-10002", "Maya Barman"],
                      ["WRK-10003", "Purnima Roy"],
                      ["WRK-10004", "Jhana Das"],
                      ["WRK-10005", "Babual Sutradhar"],
                      ["WRK-10006", "Lata Rani Saha"],
                    ].map(([id, name]) => (
                      <label
                        key={id}
                        className='flex cursor-pointer items-center gap-1 rounded px-1 py-1 transition hover:bg-gray-50'
                      >
                        <input
                          type='checkbox'
                          className='h-2.5 w-2.5 shrink-0 accent-green-700'
                        />

                        <span className='shrink-0 text-[6.5px] font-medium text-gray-500'>
                          {id}
                        </span>

                        <span className='min-w-0 truncate text-[6.5px] text-gray-600'>
                          {name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ================= ARROW BUTTONS ================= */}
                <div className='flex flex-col items-center justify-center gap-1'>
                  <button
                    type='button'
                    className='flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-green-800 text-white transition hover:bg-green-900'
                  >
                    <ArrowRight size={9} />
                  </button>

                  <button
                    type='button'
                    className='flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50'
                  >
                    <ArrowLeft size={9} />
                  </button>
                </div>

                {/* ================= SELECTED WORKERS ================= */}
                <div className='min-w-0 rounded border border-gray-200 bg-white p-2'>
                  <p className='text-[8px] font-semibold text-gray-600'>
                    Selected Workers (12)
                  </p>

                  <div className='mt-1.5 space-y-0.5'>
                    {[
                      ["WRK-10007", "Ratan Tanti"],
                      ["WRK-10008", "Sukur Ali"],
                      ["WRK-10009", "Salma Begum"],
                      ["WRK-10010", "Jamal Uddin"],
                      ["WRK-10011", "Mominul Islam"],
                      ["WRK-10012", "Shakil Ahmed"],
                    ].map(([id, name]) => (
                      <label
                        key={id}
                        className='flex cursor-pointer items-center gap-1 rounded px-1 py-1 transition hover:bg-gray-50'
                      >
                        <input
                          type='checkbox'
                          defaultChecked
                          className='h-2.5 w-2.5 shrink-0 accent-green-700'
                        />

                        <span className='shrink-0 text-[6.5px] font-medium text-gray-500'>
                          {id}
                        </span>

                        <span className='min-w-0 truncate text-[6.5px] text-gray-600'>
                          {name}
                        </span>
                      </label>
                    ))}

                    {/* MORE WORKERS */}
                    <div className='px-1 pt-0.5 text-[6.5px] text-gray-400'>
                      ...
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= BOTTOM ACTIONS ================= */}
              <div className='mt-2 flex items-center justify-end gap-1.5'>
                <button
                  type='button'
                  className='h-5 cursor-pointer rounded border border-gray-200 bg-white px-2.5 text-[6.5px] font-medium text-gray-600 transition hover:bg-gray-50'
                >
                  Cancel
                </button>

                <button
                  type='button'
                  className='h-5 cursor-pointer rounded bg-green-800 px-2.5 text-[6.5px] font-medium text-white transition hover:bg-green-900'
                >
                  Assign Workers
                </button>
              </div>
            </div>

            {/* ================= INFO ================= */}
            <div className='mt-2 flex items-start gap-1.5 rounded-lg bg-orange-50 p-2'>
              <Users size={11} className='mt-0.5 shrink-0 text-orange-700' />

              <p className='text-[9px] leading-4 text-gray-600'>
                যেসব কর্মী এই রোস্টারে কাজ করবেন তাদের Select করে Assign করুন।
              </p>
            </div>
          </div>

          {/* ================= STEP 05 ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* ================= STEP HEADER ================= */}
            <div className='flex items-start gap-2'>
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-800 text-sm font-semibold text-white'>
                5
              </div>

              <div className='min-w-0'>
                <h2 className='text-sm font-semibold text-green-800'>
                  Generate Roster
                </h2>

                <p className='mt-1 text-[10px] leading-4 text-gray-500'>
                  নির্দিষ্ট সময়সীমার জন্য রোস্টার তৈরি করুন এবং প্রিভিউ দেখে
                  যাচাই করুন।
                </p>
              </div>
            </div>

            {/* ================= ROSTER PREVIEW CARD ================= */}
            <div className='mt-3 rounded-lg border border-gray-200 bg-gray-50 p-2.5'>
              {/* CARD HEADER */}
              <div className='mb-2'>
                <p className='text-[10px] font-semibold text-gray-700'>
                  Roster Preview
                </p>

                <p className='text-[7px] text-gray-400'>
                  HR & Workforce Management › Roster Preview
                </p>
              </div>

              {/* ================= FILTER / GENERATE ================= */}
              <div className='grid grid-cols-4 gap-1.5'>
                {/* DEPARTMENT */}
                <div>
                  <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                    Department
                  </p>

                  <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                    <span className='truncate text-[6.5px] text-gray-600'>
                      Plucking
                    </span>

                    <ChevronDown size={8} className='shrink-0 text-gray-400' />
                  </div>
                </div>

                {/* SECTION */}
                <div>
                  <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                    Section
                  </p>

                  <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                    <span className='truncate text-[6.5px] text-gray-600'>
                      North Section
                    </span>

                    <ChevronDown size={8} className='shrink-0 text-gray-400' />
                  </div>
                </div>

                {/* FROM DATE */}
                <div>
                  <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                    From Date
                  </p>

                  <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                    <span className='text-[6.5px] text-gray-600'>
                      01-06-2026
                    </span>

                    <CalendarDays size={8} className='shrink-0 text-gray-400' />
                  </div>
                </div>

                {/* TO DATE + GENERATE */}
                <div>
                  <p className='mb-0.5 text-[6.5px] font-medium text-gray-500'>
                    To Date
                  </p>

                  <div className='flex gap-1'>
                    <div className='flex h-5 min-w-0 flex-1 items-center justify-between rounded border border-gray-200 bg-white px-1.5'>
                      <span className='truncate text-[6.5px] text-gray-600'>
                        07-06-2026
                      </span>

                      <CalendarDays
                        size={8}
                        className='shrink-0 text-gray-400'
                      />
                    </div>

                    <button
                      type='button'
                      className='h-5 shrink-0 cursor-pointer rounded bg-green-800 px-2 text-[6.5px] font-medium text-white transition hover:bg-green-900'
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>

              {/* ================= SHIFT LEGEND ================= */}
              <div className='mt-2 flex flex-wrap items-center gap-3 rounded border border-gray-200 bg-white px-2 py-1.5'>
                {/* DAY */}
                <div className='flex items-center gap-1'>
                  <span className='h-2 w-2 rounded-sm bg-green-600' />

                  <span className='text-[6.5px] text-gray-600'>
                    D - Day Shift
                  </span>
                </div>

                {/* EVENING */}
                <div className='flex items-center gap-1'>
                  <span className='h-2 w-2 rounded-sm bg-blue-600' />

                  <span className='text-[6.5px] text-gray-600'>
                    E - Evening Shift
                  </span>
                </div>

                {/* NIGHT */}
                <div className='flex items-center gap-1'>
                  <span className='h-2 w-2 rounded-sm bg-purple-600' />

                  <span className='text-[6.5px] text-gray-600'>
                    N - Night Shift
                  </span>
                </div>

                {/* WEEKLY OFF */}
                <div className='flex items-center gap-1'>
                  <span className='h-2 w-2 rounded-sm bg-gray-400' />

                  <span className='text-[6.5px] text-gray-600'>
                    WO - Weekly Off
                  </span>
                </div>
              </div>

              {/* ================= ROSTER TABLE ================= */}
              <div className='mt-2 overflow-hidden rounded border border-gray-200 bg-white'>
                {/* TABLE HEADER */}
                <div className='grid grid-cols-9 border-b border-gray-100 bg-gray-50 px-2 py-1.5'>
                  <span className='text-[6.5px] font-medium text-gray-500'>
                    Worker ID
                  </span>

                  <span className='text-[6.5px] font-medium text-gray-500'>
                    Worker Name
                  </span>

                  <span className='text-center text-[6.5px] font-medium text-gray-500'>
                    Mon
                    <br />
                    01 Jun
                  </span>

                  <span className='text-center text-[6.5px] font-medium text-gray-500'>
                    Tue
                    <br />
                    02 Jun
                  </span>

                  <span className='text-center text-[6.5px] font-medium text-gray-500'>
                    Wed
                    <br />
                    03 Jun
                  </span>

                  <span className='text-center text-[6.5px] font-medium text-gray-500'>
                    Thu
                    <br />
                    04 Jun
                  </span>

                  <span className='text-center text-[6.5px] font-medium text-gray-500'>
                    Fri
                    <br />
                    05 Jun
                  </span>

                  <span className='text-center text-[6.5px] font-medium text-gray-500'>
                    Sat
                    <br />
                    06 Jun
                  </span>

                  <span className='text-center text-[6.5px] font-medium text-gray-500'>
                    Sun
                    <br />
                    07 Jun
                  </span>
                </div>

                {/* TABLE ROWS */}
                {[
                  [
                    "WRK-10001",
                    "Rupa Rani Tanti",
                    "D",
                    "D",
                    "E",
                    "E",
                    "WO",
                    "D",
                    "D",
                  ],
                  [
                    "WRK-10002",
                    "Maya Barman",
                    "D",
                    "D",
                    "E",
                    "E",
                    "WO",
                    "D",
                    "D",
                  ],
                  [
                    "WRK-10003",
                    "Purnima Roy",
                    "D",
                    "D",
                    "E",
                    "E",
                    "WO",
                    "D",
                    "D",
                  ],
                  [
                    "WRK-10004",
                    "Jhana Das",
                    "D",
                    "D",
                    "E",
                    "E",
                    "WO",
                    "D",
                    "D",
                  ],
                ].map((row) => (
                  <div
                    key={row[0]}
                    className='grid grid-cols-9 items-center border-b border-gray-50 px-2 py-1.5 last:border-0'
                  >
                    {/* WORKER ID */}
                    <span className='truncate text-[6.5px] font-medium text-gray-500'>
                      {row[0]}
                    </span>

                    {/* WORKER NAME */}
                    <span className='truncate text-[6.5px] text-gray-600'>
                      {row[1]}
                    </span>

                    {/* MON */}
                    <span className='flex justify-center'>
                      <span className='flex h-3.5 min-w-5 items-center justify-center rounded bg-green-100 px-1 text-[6px] font-semibold text-green-700'>
                        {row[2]}
                      </span>
                    </span>

                    {/* TUE */}
                    <span className='flex justify-center'>
                      <span className='flex h-3.5 min-w-5 items-center justify-center rounded bg-green-100 px-1 text-[6px] font-semibold text-green-700'>
                        {row[3]}
                      </span>
                    </span>

                    {/* WED */}
                    <span className='flex justify-center'>
                      <span className='flex h-3.5 min-w-5 items-center justify-center rounded bg-blue-100 px-1 text-[6px] font-semibold text-blue-700'>
                        {row[4]}
                      </span>
                    </span>

                    {/* THU */}
                    <span className='flex justify-center'>
                      <span className='flex h-3.5 min-w-5 items-center justify-center rounded bg-blue-100 px-1 text-[6px] font-semibold text-blue-700'>
                        {row[5]}
                      </span>
                    </span>

                    {/* FRI */}
                    <span className='flex justify-center'>
                      <span className='flex h-3.5 min-w-5 items-center justify-center rounded bg-gray-100 px-1 text-[6px] font-semibold text-gray-600'>
                        {row[6]}
                      </span>
                    </span>

                    {/* SAT */}
                    <span className='flex justify-center'>
                      <span className='flex h-3.5 min-w-5 items-center justify-center rounded bg-green-100 px-1 text-[6px] font-semibold text-green-700'>
                        {row[7]}
                      </span>
                    </span>

                    {/* SUN */}
                    <span className='flex justify-center'>
                      <span className='flex h-3.5 min-w-5 items-center justify-center rounded bg-green-100 px-1 text-[6px] font-semibold text-green-700'>
                        {row[8]}
                      </span>
                    </span>
                  </div>
                ))}

                {/* MORE ROW */}
                <div className='border-t border-gray-50 px-2 py-1'>
                  <span className='text-[6.5px] text-gray-400'>...</span>
                </div>
              </div>

              {/* ================= BOTTOM ACTIONS ================= */}
              <div className='mt-2 flex items-center justify-end gap-1.5'>
                <button
                  type='button'
                  className='h-5 cursor-pointer rounded border border-gray-200 bg-white px-2.5 text-[6.5px] font-medium text-gray-600 transition hover:bg-gray-50'
                >
                  Back
                </button>

                <button
                  type='button'
                  className='h-5 cursor-pointer rounded bg-green-800 px-2.5 text-[6.5px] font-medium text-white transition hover:bg-green-900'
                >
                  Publish Roster
                </button>
              </div>
            </div>

            {/* ================= INFO ================= */}
            <div className='mt-2 flex items-start gap-1.5 rounded-lg bg-green-50 p-2'>
              <CalendarDays
                size={11}
                className='mt-0.5 shrink-0 text-green-700'
              />

              <p className='text-[9px] leading-4 text-gray-600'>
                Generate করার আগে Department, Section এবং Date Range সঠিকভাবে
                যাচাই করুন।
              </p>
            </div>
          </div>

          {/* ================= STEP 06 ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            {/* ================= STEP HEADER ================= */}
            <div className='flex items-start gap-2'>
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-800 text-sm font-semibold text-white'>
                6
              </div>

              <div className='min-w-0'>
                <h2 className='text-sm font-semibold text-green-800'>
                  Published Roster & Reports
                </h2>

                <p className='mt-1 text-[10px] leading-4 text-gray-500'>
                  রোস্টার প্রকাশের পর কর্মীরা নির্ধারিত শিফট দেখতে পারবেন এবং
                  বিভিন্ন রিপোর্ট পেতে পারবেন।
                </p>
              </div>
            </div>

            {/* ================= PUBLISHED ROSTER CARD ================= */}
            <div className='mt-3 rounded-lg border border-gray-200 bg-gray-50 p-2.5'>
              {/* CARD HEADER */}
              <div className='mb-2 flex items-center justify-between'>
                <div>
                  <p className='text-[10px] font-semibold text-gray-700'>
                    Published Roster
                  </p>

                  <p className='text-[7px] text-gray-400'>
                    HR & Workforce Management › Published Roster
                  </p>
                </div>

                {/* EXPORT */}
                <button
                  type='button'
                  className='inline-flex h-5 items-center gap-1 rounded bg-green-800 px-2 text-[6.5px] font-medium text-white transition hover:bg-green-900'
                >
                  <Download size={8} />
                  Export
                </button>
              </div>

              {/* ================= ROSTER INFORMATION ================= */}
              <div className='overflow-hidden rounded border border-gray-200 bg-white'>
                {/* TABLE HEADER */}
                <div className='grid grid-cols-5 border-b border-gray-100 bg-gray-50 px-2 py-1.5'>
                  <span className='text-[6.5px] font-medium text-gray-500'>
                    Roster Name
                  </span>

                  <span className='text-[6.5px] font-medium text-gray-500'>
                    Department
                  </span>

                  <span className='text-[6.5px] font-medium text-gray-500'>
                    Section
                  </span>

                  <span className='text-[6.5px] font-medium text-gray-500'>
                    Period
                  </span>

                  <span className='text-[6.5px] font-medium text-gray-500'>
                    Total Workers
                  </span>
                </div>

                {/* TABLE DATA */}
                <div className='grid grid-cols-5 border-b border-gray-50 px-2 py-2'>
                  <span className='truncate text-[6.5px] font-medium text-gray-600'>
                    Weekly Roster
                  </span>

                  <span className='truncate text-[6.5px] text-gray-600'>
                    Plucking
                  </span>

                  <span className='truncate text-[6.5px] text-gray-600'>
                    North Section
                  </span>

                  <span className='truncate text-[6.5px] text-gray-600'>
                    01-06-2026 to 07-06-2026
                  </span>

                  <span className='text-[6.5px] font-medium text-gray-600'>
                    48
                  </span>
                </div>

                {/* PUBLISHED DETAILS */}
                <div className='grid grid-cols-2 gap-2 px-2 py-2'>
                  <div>
                    <p className='text-[6px] text-gray-400'>Published On</p>

                    <p className='mt-0.5 text-[6.5px] text-gray-600'>
                      31-05-2026 10:30 AM
                    </p>
                  </div>

                  <div>
                    <p className='text-[6px] text-gray-400'>Published By</p>

                    <p className='mt-0.5 text-[6.5px] text-gray-600'>
                      Md. Faruk Hossain
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= ACTIONS TITLE ================= */}
              <p className='mb-1.5 mt-2 text-[8px] font-semibold text-gray-600'>
                Actions & Reports
              </p>

              {/* ================= ACTIONS ================= */}
              <div className='grid grid-cols-5 gap-1'>
                {/* VIEW ROSTER */}
                <button
                  type='button'
                  className='flex min-w-0 flex-col items-center justify-center rounded border border-gray-200 bg-white px-1 py-2 transition hover:bg-gray-50'
                >
                  <FileCheck2 size={10} className='text-gray-500' />

                  <span className='mt-1 text-center text-[6px] leading-3 text-gray-500'>
                    View Roster
                  </span>
                </button>

                {/* DOWNLOAD PDF */}
                <button
                  type='button'
                  className='flex min-w-0 flex-col items-center justify-center rounded border border-gray-200 bg-white px-1 py-2 transition hover:bg-gray-50'
                >
                  <FileDown size={10} className='text-gray-500' />

                  <span className='mt-1 text-center text-[6px] leading-3 text-gray-500'>
                    Download PDF
                  </span>
                </button>

                {/* DOWNLOAD EXCEL */}
                <button
                  type='button'
                  className='flex min-w-0 flex-col items-center justify-center rounded border border-gray-200 bg-white px-1 py-2 transition hover:bg-gray-50'
                >
                  <FileSpreadsheet size={10} className='text-gray-500' />

                  <span className='mt-1 text-center text-[6px] leading-3 text-gray-500'>
                    Download Excel
                  </span>
                </button>

                {/* PRINT ROSTER */}
                <button
                  type='button'
                  className='flex min-w-0 flex-col items-center justify-center rounded border border-gray-200 bg-white px-1 py-2 transition hover:bg-gray-50'
                >
                  <Printer size={10} className='text-gray-500' />

                  <span className='mt-1 text-center text-[6px] leading-3 text-gray-500'>
                    Print Roster
                  </span>
                </button>

                {/* ATTENDANCE SHEET */}
                <button
                  type='button'
                  className='flex min-w-0 flex-col items-center justify-center rounded border border-gray-200 bg-white px-1 py-2 transition hover:bg-gray-50'
                >
                  <ClipboardCheck size={10} className='text-gray-500' />

                  <span className='mt-1 text-center text-[6px] leading-3 text-gray-500'>
                    Attendance Sheet
                  </span>
                </button>
              </div>
            </div>

            {/* ================= SUCCESS MESSAGE ================= */}
            <div className='mt-2 flex items-start gap-1.5 rounded-lg bg-green-50 p-2'>
              <CheckCircle2
                size={11}
                className='mt-0.5 shrink-0 text-green-700'
              />

              <div>
                <p className='text-[8px] font-semibold text-green-700'>
                  Roster Published Successfully!
                </p>

                <p className='mt-0.5 text-[7px] leading-3 text-gray-500'>
                  Workers can now view their shifts in mobile app and web
                  portal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className='grid grid-cols-1 gap-2 lg:grid-cols-[2fr_1fr]'>
          {/* ================= KEY NOTES ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            <div className='flex items-center gap-2'>
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700'>
                <Lightbulb size={14} />
              </div>

              <h3 className='text-xs font-semibold text-green-800'>
                Key Notes
              </h3>
            </div>

            <div className='mt-2.5 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2'>
              {/* NOTE 1 */}
              <div className='flex items-start gap-1.5'>
                <span className='shrink-0 text-[9px] font-semibold text-gray-500'>
                  1.
                </span>

                <p className='text-[9px] leading-4 text-gray-600'>
                  Shift আগে থেকেই Create করতে হবে।
                </p>
              </div>

              {/* NOTE 2 */}
              <div className='flex items-start gap-1.5'>
                <span className='shrink-0 text-[9px] font-semibold text-gray-500'>
                  2.
                </span>

                <p className='text-[9px] leading-4 text-gray-600'>
                  Roster Template তৈরি করে Department/Section এ Assign করতে হবে।
                </p>
              </div>

              {/* NOTE 3 */}
              <div className='flex items-start gap-1.5'>
                <span className='shrink-0 text-[9px] font-semibold text-gray-500'>
                  3.
                </span>

                <p className='text-[9px] leading-4 text-gray-600'>
                  Workers Assign করার পর Generate করে Preview Check করতে হবে।
                </p>
              </div>

              {/* NOTE 4 */}
              <div className='flex items-start gap-1.5'>
                <span className='shrink-0 text-[9px] font-semibold text-gray-500'>
                  4.
                </span>

                <p className='text-[9px] leading-4 text-gray-600'>
                  সঠিকভাবে যাচাই করার পর Roster Publish করতে হবে।
                </p>
              </div>

              {/* NOTE 5 */}
              <div className='flex items-start gap-1.5'>
                <span className='shrink-0 text-[9px] font-semibold text-gray-500'>
                  5.
                </span>

                <p className='text-[9px] leading-4 text-gray-600'>
                  Workers Assign করার পর Generate করে Preview Check করতে হবে।
                </p>
              </div>

              {/* NOTE 6 */}
              <div className='flex items-start gap-1.5'>
                <span className='shrink-0 text-[9px] font-semibold text-gray-500'>
                  6.
                </span>

                <p className='text-[9px] leading-4 text-gray-600'>
                  সঠিকভাবে যাচাই করার পর Roster Publish করতে হবে।
                </p>
              </div>
            </div>
          </div>

          {/* ================= BENEFITS ================= */}
          <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
            <div className='flex items-center gap-2'>
              <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700'>
                <Users size={14} />
              </div>

              <h3 className='text-xs font-semibold text-green-800'>Benefits</h3>
            </div>

            <div className='mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5'>
              <span className='text-[9px] text-gray-600'>সময় সাশ্রয়</span>

              <span className='text-[9px] text-gray-600'>সুশৃঙ্খল রোস্টার</span>

              <span className='text-[9px] text-gray-600'>ভুল কম হয়</span>

              <span className='text-[9px] text-gray-600'>রিপোর্ট সহজ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftAndDutyRosterEntryProcess;
