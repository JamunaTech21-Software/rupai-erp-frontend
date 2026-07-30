import React from "react";
import { useForm } from "react-hook-form";
import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";
import { bushRegisterData } from "../../data/PlantationManagementData/bushRegisterData";

import {
  RotateCcw,
  Upload,
  Eye,
  Pencil,
  Trash2,
  Search,
  ArrowUp,
  CircleOff,
  Gauge,
  GitBranch,
  Grid2x2,
  Leaf,
  Map,
  ShieldCheck,
  Sprout,
  TreePine,
  Trees,
  Expand,
  Layers,
  Minus,
  Plus,
} from "lucide-react";

const summaryIconMap = {
  Map,
  Rows: Grid2x2,
  Trees,
  Leaf,
  TreePine,
  CircleOff,
  Gauge,
  ArrowUp,
  GitBranch,
  Grid2x2,
  ShieldCheck,
  Sprout,
};
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
const healthBadgeMap = {
  Excellent: "bg-green-100 text-green-700 border border-green-200",

  Good: "bg-green-100 text-green-700 border border-green-200",

  Fair: "bg-yellow-100 text-yellow-700 border border-yellow-200",

  Poor: "bg-orange-100 text-orange-700 border border-orange-200",

  Dead: "bg-red-100 text-red-700 border border-red-200",
};

const BushRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const ageProfileData = bushRegisterData.bushAgeProfile.map((item) => ({
    name: item.age,
    value: item.area,
    color: item.color,
  }));
  return (
    <div className='space-y-6'>
      <PlantationManagementTabs />

      {/* ================= Bush Register ================= */}
      <div className='space-y-6'>
        {/* Top Section */}
        <div className='grid grid-cols-12 gap-2'>
          {/* ================= Bush Register information ================= */}

          <div className='col-span-12 xl:col-span-5 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Bush Register Information
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='space-y-2 p-2'>
                {/* ================= Row - 1 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Estate */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Estate</option>
                      <option value='north-estate'>North Estate</option>
                      <option value='south-estate'>South Estate</option>
                      <option value='east-estate'>East Estate</option>
                      <option value='west-estate'>West Estate</option>
                      <option value='central-estate'>Central Estate</option>
                    </select>

                    {errors.estate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.estate.message}
                      </p>
                    )}
                  </div>

                  {/* Division */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Division <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("division", {
                        required: "Division is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Division</option>
                      <option value='division-1'>Division 01</option>
                      <option value='division-2'>Division 02</option>
                      <option value='division-3'>Division 03</option>
                      <option value='division-4'>Division 04</option>
                      <option value='division-5'>Division 05</option>
                    </select>

                    {errors.division && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.division.message}
                      </p>
                    )}
                  </div>

                  {/* Section */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Section <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("section", {
                        required: "Section is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Section</option>
                      <option value='section-a'>Section A</option>
                      <option value='section-b'>Section B</option>
                      <option value='section-c'>Section C</option>
                      <option value='section-d'>Section D</option>
                      <option value='section-e'>Section E</option>
                    </select>

                    {errors.section && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.section.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= Row - 2 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Field / Block */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Field / Block <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("fieldBlock", {
                        required: "Field / Block is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Field / Block</option>
                      <option value='block-a'>Block A</option>
                      <option value='block-b'>Block B</option>
                      <option value='block-c'>Block C</option>
                      <option value='block-d'>Block D</option>
                      <option value='block-e'>Block E</option>
                    </select>

                    {errors.fieldBlock && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.fieldBlock.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Year */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Planting Year <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("plantingYear", {
                        required: "Planting Year is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Year</option>
                      <option value='2026'>2026</option>
                      <option value='2025'>2025</option>
                      <option value='2024'>2024</option>
                      <option value='2023'>2023</option>
                      <option value='2022'>2022</option>
                      <option value='2021'>2021</option>
                      <option value='2020'>2020</option>
                    </select>

                    {errors.plantingYear && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.plantingYear.message}
                      </p>
                    )}
                  </div>

                  {/* Bush Age */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Bush Age (Years) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      placeholder='Enter Bush Age'
                      {...register("bushAge", {
                        required: "Bush Age is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.bushAge && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.bushAge.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= Row - 3 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Total Area */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Total Area (Acre) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Total Area'
                      {...register("totalArea", {
                        required: "Total Area is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.totalArea && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.totalArea.message}
                      </p>
                    )}
                  </div>

                  {/* Row Spacing */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Row Spacing (Feet) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Row Spacing'
                      {...register("rowSpacing", {
                        required: "Row Spacing is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.rowSpacing && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.rowSpacing.message}
                      </p>
                    )}
                  </div>

                  {/* Plant Spacing */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Plant Spacing (Feet){" "}
                      <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter Plant Spacing'
                      {...register("plantSpacing", {
                        required: "Plant Spacing is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.plantSpacing && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.plantSpacing.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= Row - 4 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Survey Date */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Survey Date <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='date'
                      {...register("surveyDate", {
                        required: "Survey Date is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    />

                    {errors.surveyDate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.surveyDate.message}
                      </p>
                    )}
                  </div>

                  {/* Surveyor / In-charge */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Surveyor / In-charge{" "}
                      <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("surveyor", {
                        required: "Surveyor is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Surveyor</option>
                      <option value='md-faruk-hossain'>
                        Md. Faruk Hossain
                      </option>
                      <option value='abdul-karim'>Abdul Karim</option>
                      <option value='rahim-uddin'>Rahim Uddin</option>
                      <option value='jahangir-alam'>Jahangir Alam</option>
                      <option value='kamal-hossain'>Kamal Hossain</option>
                    </select>

                    {errors.surveyor && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.surveyor.message}
                      </p>
                    )}
                  </div>

                  {/* Bush Status */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Bush Status <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("bushStatus", {
                        required: "Bush Status is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Status</option>
                      <option value='active'>Active</option>
                      <option value='productive'>Productive</option>
                      <option value='under-maintenance'>
                        Under Maintenance
                      </option>
                      <option value='replant-required'>Replant Required</option>
                      <option value='inactive'>Inactive</option>
                    </select>

                    {errors.bushStatus && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.bushStatus.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= Row - 5 ================= */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Bush Health */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Bush Health <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("bushHealth", {
                        required: "Bush Health is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Health</option>
                      <option value='excellent'>Excellent</option>
                      <option value='good'>Good</option>
                      <option value='fair'>Fair</option>
                      <option value='poor'>Poor</option>
                      <option value='dead'>Dead</option>
                    </select>

                    {errors.bushHealth && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.bushHealth.message}
                      </p>
                    )}
                  </div>

                  {/* Production Zone */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Production Zone <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("productionZone", {
                        required: "Production Zone is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Zone</option>
                      <option value='zone-a'>Zone A</option>
                      <option value='zone-b'>Zone B</option>
                      <option value='zone-c'>Zone C</option>
                      <option value='zone-d'>Zone D</option>
                    </select>

                    {errors.productionZone && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.productionZone.message}
                      </p>
                    )}
                  </div>

                  {/* Row Direction */}
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Row Direction <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("rowDirection", {
                        required: "Row Direction is required",
                      })}
                      className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                    >
                      <option value=''>Select Direction</option>
                      <option value='north-south'>North → South</option>
                      <option value='south-north'>South → North</option>
                      <option value='east-west'>East → West</option>
                      <option value='west-east'>West → East</option>
                    </select>

                    {errors.rowDirection && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.rowDirection.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ================= Action Buttons ================= */}
                <div className='flex flex-wrap items-center justify-end gap-3 border-t border-gray-200 pt-5'>
                  {/* Reset Button */}
                  <button
                    type='button'
                    onClick={() => reset()}
                    className='flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100'
                  >
                    <RotateCcw size={18} />
                    Reset
                  </button>

                  {/* Search Button */}
                  <button
                    type='submit'
                    className='flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-green-700'
                  >
                    <Search size={18} />
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Middle */}
          <div className='col-span-12 xl:col-span-4 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Bush Register Summary
              </h2>
            </div>

            {/* Body */}
            <div className='grid lg:grid-cols-2  xl:grid-cols-3 gap-2  p-2'>
              {bushRegisterData.summary.map((item) => {
                const Icon = summaryIconMap[item.icon];

                return (
                  <div key={item.id} className='flex mb-6 items-center gap-2'>
                    <div className='rounded-lg bg-green-50 p-2'>
                      <Icon size={22} className='text-green-700' />
                    </div>

                    <div>
                      <p className='text-[11px] text-gray-500'>{item.title}</p>

                      <h4 className='mt-1 text-sm font-semibold text-green-700'>
                        {item.value}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-sm font-semibold text-green-700'>
                Field Map / Bush Density View
              </h2>
            </div>

            {/* Body */}
            <div className='space-y-3 p-4'>
              {/* Map */}
              <div className='relative overflow-hidden rounded-lg border border-gray-200'>
                {/* Map Controls */}
                <div className='absolute left-3 top-3 z-10 flex flex-col gap-2'>
                  <button className='flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-white shadow transition hover:bg-gray-100'>
                    <Plus size={18} />
                  </button>

                  <button className='flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-white shadow transition hover:bg-gray-100'>
                    <Minus size={18} />
                  </button>

                  <button className='flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-white shadow transition hover:bg-gray-100'>
                    <Layers size={18} />
                  </button>

                  <button className='flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-white shadow transition hover:bg-gray-100'>
                    <Expand size={18} />
                  </button>
                </div>

                {/* Image */}
                <img
                  src='/bush-register-map.png'
                  alt='Bush Density Map'
                  className='h-[260px] w-full object-cover'
                />
              </div>

              {/* Legend */}
              <div className='flex flex-wrap items-center justify-center gap-3'>
                {bushRegisterData.map.legends.map((item) => (
                  <div key={item.id} className='flex items-center gap-1'>
                    <span
                      className='h-3 w-3 rounded-sm'
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span className='text-[11px] text-gray-600'>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className='flex items-center justify-between border-t border-gray-200 pt-3'>
                <div className='text-xs text-gray-600'>
                  Latitude : {bushRegisterData.map.latitude}
                  <br />
                  Longitude : {bushRegisterData.map.longitude}
                </div>

                <button className='cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-xs transition hover:bg-gray-100'>
                  View Full Screen
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Table */}
          <div className='col-span-12 xl:col-span-9 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-3'>
              <h2 className='text-base font-semibold text-green-700'>
                Bush Register Details
              </h2>

              <div className='flex flex-wrap gap-2'>
                {/* Import Survey Data */}
                <button
                  type='button'
                  className='flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100'
                >
                  <Upload size={18} />
                  Import Survey Data
                </button>

                {/* Add Manual Entry */}
                <button
                  type='button'
                  className='flex cursor-pointer items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700'
                >
                  <Plus size={18} />
                  Add Manual Entry
                </button>
              </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='table table-zebra'>
                <thead className='bg-gray-50'>
                  <tr>
                    {bushRegisterData.tableHeaders.map((header) => (
                      <th
                        key={header.key}
                        className='border border-gray-200 px-3 py-2 text-center text-xs font-semibold whitespace-nowrap'
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {bushRegisterData.bushRegisterList.map((item, index) => (
                    <tr key={item.id} className='hover:bg-gray-50'>
                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {index + 1}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.rowNo}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.from}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.to}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.totalBush}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.productive}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.dead}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.missing}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.gap}%
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.height}
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.spread}
                      </td>

                      {/* Health */}
                      <td className='border border-gray-200 px-3 py-2 text-center'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            healthBadgeMap[item.health]
                          }`}
                        >
                          {item.health}
                        </span>
                      </td>

                      <td className='border border-gray-200 px-3 py-2 text-center text-sm'>
                        {item.remarks}
                      </td>

                      {/* Action */}
                      <td className='border border-gray-200 px-3 py-2'>
                        <div className='flex items-center justify-center gap-2'>
                          {/* View */}
                          <button
                            type='button'
                            className='cursor-pointer rounded-md p-1 text-blue-600 transition hover:bg-blue-50'
                            title='View'
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}
                          <button
                            type='button'
                            className='cursor-pointer rounded-md p-1 text-emerald-600 transition hover:bg-emerald-50'
                            title='Edit'
                          >
                            <Pencil size={16} />
                          </button>

                          {/* Delete */}
                          <button
                            type='button'
                            className='cursor-pointer rounded-md p-1 text-red-600 transition hover:bg-red-50'
                            title='Delete'
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className='bg-gray-50'>
                    <td
                      colSpan={4}
                      className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold text-gray-700'
                    >
                      Total
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {bushRegisterData.tableSummary.totalBush}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {bushRegisterData.tableSummary.productive}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {bushRegisterData.tableSummary.dead}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {bushRegisterData.tableSummary.missing}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {bushRegisterData.tableSummary.gap}%
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {bushRegisterData.tableSummary.height}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center text-sm font-semibold'>
                      {bushRegisterData.tableSummary.spread}
                    </td>

                    <td className='border border-gray-200 px-3 py-3 text-center'>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          healthBadgeMap[bushRegisterData.tableSummary.health]
                        }`}
                      >
                        {bushRegisterData.tableSummary.health}
                      </span>
                    </td>

                    <td className='border border-gray-200'></td>

                    <td className='border border-gray-200'></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className='flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 py-3 md:flex-row'>
              {/* Left */}
              <p className='text-sm text-gray-600'>
                Showing{" "}
                <span className='font-medium'>
                  {bushRegisterData.tablePagination.showingFrom}
                </span>{" "}
                to{" "}
                <span className='font-medium'>
                  {bushRegisterData.tablePagination.showingTo}
                </span>{" "}
                of{" "}
                <span className='font-medium'>
                  {bushRegisterData.tablePagination.totalRows.toLocaleString()}
                </span>{" "}
                rows
              </p>

              {/* Right */}
              <div className='flex items-center gap-2'>
                {/* Previous */}
                <button
                  type='button'
                  className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100'
                >
                  ❮
                </button>

                {/* Page Numbers */}
                {bushRegisterData.tablePagination.pages.map((page) => (
                  <button
                    key={page}
                    type='button'
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition ${
                      page === bushRegisterData.tablePagination.currentPage
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Dots */}
                <span className='px-1 text-gray-500'>...</span>

                {/* Last Page */}
                <button
                  type='button'
                  className='flex h-9 min-w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-2 text-sm transition hover:bg-gray-100'
                >
                  {bushRegisterData.tablePagination.totalPages}
                </button>

                {/* Next */}
                <button
                  type='button'
                  className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100'
                >
                  ❯
                </button>
              </div>
            </div>
          </div>

          {/* Chart */}
          {/* Chart */}
          <div className='col-span-12 xl:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-base font-semibold text-green-700'>
                Bush Age Profile (By Acre)
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-12 gap-3 p-4'>
              {/* Left */}
              <div className='col-span-12 flex justify-center lg:col-span-6'>
                <div className='relative h-40 w-40'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={ageProfileData}
                        dataKey='value'
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={1}
                      >
                        {ageProfileData.map((item) => (
                          <Cell key={item.name} fill={item.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center Text */}
                  <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                      {bushRegisterData.summary[0].value}
                    </h2>

                    <p className='text-sm text-gray-500'>Acre</p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className='col-span-12 space-y-4 lg:col-span-6'>
                {bushRegisterData.bushAgeProfile.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <span
                        className='h-3 w-3 rounded-sm'
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                      <span className='text-sm text-gray-600'>{item.age}</span>
                    </div>

                    <span className='text-sm font-medium text-gray-700'>
                      {item.area} Acre ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Gap Summary */}
          <div className='col-span-12 xl:col-span-5 rounded-xl border border-gray-200 bg-white p-2'>
            GAP SUMMARY
          </div>

          {/* Health Distribution */}
          <div className='col-span-12 xl:col-span-4 rounded-xl border border-gray-200 bg-white p-2'>
            HEALTH DISTRIBUTION
          </div>

          {/* Quick Action */}
          <div className='col-span-12 xl:col-span-3 rounded-xl border border-gray-200 bg-white p-2'>
            QUICK ACTION
          </div>
        </div>

        {/* Footer */}
        <div className='rounded-xl border border-gray-200 bg-white p-2'>
          FOOTER BUTTONS
        </div>
      </div>
    </div>
  );
};

export default BushRegister;
