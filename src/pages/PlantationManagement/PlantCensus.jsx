import React from "react";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";
import {
  fieldMap,
  censusSummary,
  summaryCards,
  rowWiseTable,
  charts,
  fieldPhotos,
  documents,
  censusHistory,
  approvalStatus,
} from "../../data/PlantationManagementData/plantCensusData";

import {
  Map,
  Trees,
  Sprout,
  Leaf,
  CircleOff,
  AlertTriangle,
  Bug,
  TrendingUp,
  SquareDashed,
  CheckCircle2,
  TriangleAlert,
  Users,
  ShieldX,
  CircleDot,
  UsersRound,
} from "lucide-react";
const colorMap = {
  green: "bg-green-100 text-green-600",
  emerald: "bg-emerald-100 text-emerald-600",
  lime: "bg-lime-100 text-lime-600",
  red: "bg-red-100 text-red-600",
  yellow: "bg-yellow-100 text-yellow-600",
  orange: "bg-orange-100 text-orange-600",
  blue: "bg-blue-100 text-blue-600",
  gray: "bg-gray-100 text-gray-600",
  teal: "bg-teal-100 text-teal-600",
};
const summaryIconMap = {
  Map,
  Trees,
  Sprout,
  Leaf,
  CircleOff,
  AlertTriangle,
  Bug,
  TrendingUp,
  SquareDashed,
  CheckCircle2,
};
const summaryCardIconMap = {
  TriangleAlert,
  Users,
  Leaf,
  ShieldX,
  CircleDot,
  UsersRound,
  Sprout,
};
const PlantCensus = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <PlantationManagementTabs />
      <div className='space-y-6 mt-4'>
        {/* ================================================= */}

        {/* ================================================= */}
        {/* Top Section */}
        {/* ================================================= */}
        <div className='grid grid-cols-12 gap-1'>
          {/* Census Information */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='col-span-12 xl:col-span-6 rounded-xl border border-gray-200 bg-white shadow-sm'
          >
            {/* Header */}

            <div className='border-b border-gray-200 px-2 py-4'>
              <h2 className='text-lg font-semibold text-green-700'>
                Census Information
              </h2>
            </div>

            {/* Body */}

            <div className='p-2 space-y-2'>
              {/* ========================= Row 1 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                {/* Estate */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='estate'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Estate <span className='text-red-500'>*</span>
                  </label>

                  <select
                    id='estate'
                    {...register("estate", {
                      required: "Please select an estate.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.estate
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Estate</option>
                    <option value='jamuna'>Jamuna Tea Estate</option>
                    <option value='rangpur'>Rangpur Tea Estate</option>
                    <option value='rupai'>RupAI Tea Estate</option>
                  </select>

                  {errors.estate && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.estate.message}
                    </p>
                  )}
                </div>

                {/* Division */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='division'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Division <span className='text-red-500'>*</span>
                  </label>

                  <select
                    id='division'
                    {...register("division", {
                      required: "Please select a division.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.division
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Division</option>
                    <option value='div-01'>Rangpur Division (DIV-01)</option>
                    <option value='div-02'>Sylhet Division (DIV-02)</option>
                    <option value='div-03'>Chattogram Division (DIV-03)</option>
                  </select>

                  {errors.division && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.division.message}
                    </p>
                  )}
                </div>

                {/* Section */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='section'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Section <span className='text-red-500'>*</span>
                  </label>

                  <select
                    id='section'
                    {...register("section", {
                      required: "Please select a section.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.section
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Section</option>
                    <option value='sec-a'>Section-A (SEC-A)</option>
                    <option value='sec-b'>Section-B (SEC-B)</option>
                    <option value='sec-c'>Section-C (SEC-C)</option>
                  </select>

                  {errors.section && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.section.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 2 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                {/* Field / Block */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='fieldBlock'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Field / Block <span className='text-red-500'>*</span>
                  </label>

                  <select
                    id='fieldBlock'
                    {...register("fieldBlock", {
                      required: "Please select a field/block.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.fieldBlock
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Field / Block</option>
                    <option value='blk01'>BLK-01</option>
                    <option value='blk02'>BLK-02</option>
                    <option value='blk08'>BLK-08</option>
                  </select>

                  {errors.fieldBlock && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.fieldBlock.message}
                    </p>
                  )}
                </div>

                {/* Census Date */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='censusDate'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Census Date <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='censusDate'
                    type='date'
                    {...register("censusDate", {
                      required: "Please select the census date.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.censusDate
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.censusDate && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.censusDate.message}
                    </p>
                  )}
                </div>

                {/* Census Year */}
                <div className='col-span-12 lg:col-span-2'>
                  <label
                    htmlFor='censusYear'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Census Year <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='censusYear'
                    type='number'
                    placeholder='2026'
                    {...register("censusYear", {
                      required: "Please enter census year.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.censusYear
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.censusYear && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.censusYear.message}
                    </p>
                  )}
                </div>

                {/* Survey Type */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='surveyType'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Survey Type <span className='text-red-500'>*</span>
                  </label>

                  <select
                    id='surveyType'
                    {...register("surveyType", {
                      required: "Please select survey type.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.surveyType
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Survey Type</option>
                    <option value='full'>Full Census</option>
                    <option value='sample'>Sample Census</option>
                    <option value='random'>Random Survey</option>
                  </select>

                  {errors.surveyType && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.surveyType.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 3 ========================= */}

              <div className='grid grid-cols-12 gap-2'>
                {/* Row No. From */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='rowFrom'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Row No. From <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='rowFrom'
                    type='number'
                    placeholder='Enter Start Row'
                    {...register("rowFrom", {
                      required: "Starting row number is required.",
                      min: {
                        value: 1,
                        message: "Row number must be greater than 0.",
                      },
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.rowFrom
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.rowFrom && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.rowFrom.message}
                    </p>
                  )}
                </div>

                {/* Row No. To */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='rowTo'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Row No. To <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='rowTo'
                    type='number'
                    placeholder='Enter End Row'
                    {...register("rowTo", {
                      required: "Ending row number is required.",
                      min: {
                        value: 1,
                        message: "Row number must be greater than 0.",
                      },
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.rowTo
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.rowTo && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.rowTo.message}
                    </p>
                  )}
                </div>

                {/* Total Selected Rows */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='totalSelectedRows'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Total Selected Rows
                  </label>

                  <input
                    id='totalSelectedRows'
                    type='number'
                    placeholder='Auto Calculate'
                    readOnly
                    {...register("totalSelectedRows")}
                    className='w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm outline-none'
                  />
                </div>

                {/* Row Spacing */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='rowSpacing'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Row Spacing (ft) <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='rowSpacing'
                    type='number'
                    step='0.01'
                    placeholder='Enter Row Spacing'
                    {...register("rowSpacing", {
                      required: "Row spacing is required.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.rowSpacing
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.rowSpacing && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.rowSpacing.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 4 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                {/* Planting Year */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='plantingYear'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Planting Year <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='plantingYear'
                    type='number'
                    placeholder='e.g. 2021'
                    {...register("plantingYear", {
                      required: "Planting year is required.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.plantingYear
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.plantingYear && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.plantingYear.message}
                    </p>
                  )}
                </div>

                {/* Clone / Variety */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='cloneVariety'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Clone / Variety <span className='text-red-500'>*</span>
                  </label>

                  <select
                    id='cloneVariety'
                    {...register("cloneVariety", {
                      required: "Please select a clone/variety.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.cloneVariety
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Clone</option>
                    <option value='tv1'>TV-1</option>
                    <option value='tv23'>TV-23</option>
                    <option value='bt2'>BT-2</option>
                    <option value='seedling'>Seedling</option>
                  </select>

                  {errors.cloneVariety && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.cloneVariety.message}
                    </p>
                  )}
                </div>

                {/* Elevation */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='elevation'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Elevation (m)
                  </label>

                  <input
                    id='elevation'
                    type='number'
                    placeholder='e.g. 120'
                    {...register("elevation")}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                  />
                </div>

                {/* Plant Spacing */}
                <div className='col-span-12 lg:col-span-3'>
                  <label
                    htmlFor='plantSpacing'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Plant Spacing (ft) <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='plantSpacing'
                    type='number'
                    step='0.01'
                    placeholder='e.g. 3.5'
                    {...register("plantSpacing", {
                      required: "Plant spacing is required.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.plantSpacing
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.plantSpacing && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.plantSpacing.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 5 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                {/* Census By */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='censusBy'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Census By <span className='text-red-500'>*</span>
                  </label>

                  <input
                    id='censusBy'
                    type='text'
                    placeholder='Enter Enumerator Name'
                    {...register("censusBy", {
                      required: "Census by is required.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.censusBy
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  />

                  {errors.censusBy && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.censusBy.message}
                    </p>
                  )}
                </div>

                {/* Supervisor */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='supervisor'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Supervisor <span className='text-red-500'>*</span>
                  </label>

                  <select
                    id='supervisor'
                    {...register("supervisor", {
                      required: "Please select a supervisor.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.supervisor
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Supervisor</option>
                    <option value='sup-1'>Md. Rahman</option>
                    <option value='sup-2'>Jahid Hasan</option>
                    <option value='sup-3'>Arif Hossain</option>
                  </select>

                  {errors.supervisor && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.supervisor.message}
                    </p>
                  )}
                </div>

                {/* Census Method */}
                <div className='col-span-12 lg:col-span-4'>
                  <label
                    htmlFor='censusMethod'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Census Method <span className='text-red-500'>*</span>
                  </label>

                  <select
                    id='censusMethod'
                    {...register("censusMethod", {
                      required: "Please select a census method.",
                    })}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-all ${
                      errors.censusMethod
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-green-600"
                    }`}
                  >
                    <option value=''>Select Method</option>
                    <option value='manual'>Manual Counting</option>
                    <option value='mobile-app'>Mobile App</option>
                    <option value='gps'>GPS Survey</option>
                    <option value='drone'>Drone Survey</option>
                  </select>

                  {errors.censusMethod && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.censusMethod.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ========================= Row 6 ========================= */}

              <div className='grid grid-cols-12 gap-1'>
                <div className='col-span-12'>
                  <label
                    htmlFor='remarks'
                    className=' block text-sm font-medium text-gray-700'
                  >
                    Remarks
                  </label>

                  <textarea
                    id='remarks'
                    rows={2}
                    placeholder='Write additional remarks...'
                    {...register("remarks")}
                    className='w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition-all focus:border-green-600'
                  />
                </div>
              </div>
            </div>
          </form>

          {/* ================================================= */}
          {/* Field Map */}
          {/* ================================================= */}

          <div className='col-span-12 md:col-span-6 xl:col-span-4 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Field Map
              </h2>
            </div>

            {/* Body */}
            <div className='p-4'>
              {/* Static Map Placeholder */}
              <div className='h-[360px] overflow-hidden rounded-lg border border-gray-300'>
                <MapContainer
                  center={fieldMap.center}
                  zoom={fieldMap.gis.zoom}
                  scrollWheelZoom={false}
                  className='h-full w-full'
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />

                  <Polygon
                    positions={fieldMap.polygon}
                    pathOptions={{
                      color: "#16a34a",
                      weight: 3,
                      fillColor: "#22c55e",
                      fillOpacity: 0.35,
                    }}
                  />
                </MapContainer>
              </div>

              {/* Legend */}
              <div className='mt-4 flex flex-wrap items-center gap-5 border-t border-gray-200 pt-3'>
                <div className='flex items-center gap-2'>
                  <span className='h-4 w-4 rounded bg-green-600'></span>
                  <span className='text-sm text-gray-700'>Field Boundary</span>
                </div>

                <div className='flex items-center gap-2'>
                  <span className='h-4 w-4 rounded bg-blue-500'></span>
                  <span className='text-sm text-gray-700'>Water Body</span>
                </div>

                <div className='flex items-center gap-2'>
                  <span className='h-4 w-4 rounded bg-red-500'></span>
                  <span className='text-sm text-gray-700'>Road</span>
                </div>
              </div>
            </div>
          </div>

          {/* Census Summary */}
          <div className='col-span-12 md:col-span-6 xl:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Census Summary
              </h2>
            </div>

            {/* Body */}
            <div className='space-y-2 p-2'>
              <div className='space-y-3'>
                {censusSummary.map((item) => {
                  const Icon = summaryIconMap[item.icon];

                  return (
                    <div key={item.id} className='flex items-start gap-3'>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          colorMap[item.color]
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <p className='text-xs text-gray-500'>{item.title}</p>

                        <h3 className='text-lg font-bold text-gray-800'>
                          {item.value}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* Summary Cards */}
        {/* ================================================= */}

        <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7'>
            {summaryCards.map((item) => {
              const Icon = summaryCardIconMap[item.icon];

              return (
                <div
                  key={item.id}
                  className='rounded-xl border border-gray-200 bg-gray-50 p-3 transition-all hover:shadow-md'
                >
                  <div className='flex items-center gap-3'>
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.iconColor}`}
                    >
                      <Icon size={22} />
                    </div>

                    {/* Content */}
                    <div className='flex-1'>
                      <p className='text-xs font-medium text-gray-500'>
                        {item.title}
                      </p>

                      <div className='mt-1 flex items-center justify-between'>
                        <h3 className='text-2xl font-bold text-green-800'>
                          {item.value}
                        </h3>

                        {item.badge && (
                          <span
                            className={`rounded-md px-2 py-1 text-xs font-semibold ${item.badgeColor}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* ================================================= */}
        {/* Middle Section */}
        {/* ================================================= */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Row-wise Census Details */}
          <div className='col-span-12 xl:col-span-7 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            Row-wise Census Details
          </div>

          {/* Live vs Dead Plants */}
          <div className='col-span-12 md:col-span-6 xl:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            Live vs Dead Plants
          </div>

          {/* Plant Distribution */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            Plant Distribution
          </div>
        </div>

        {/* ================================================= */}
        {/* Bottom Section */}
        {/* ================================================= */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Field Photos */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            Field Photos
          </div>

          {/* Documents */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            Documents
          </div>

          {/* Census History */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            Census History
          </div>

          {/* Approval Status */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
            Approval Status
          </div>
        </div>

        {/* ================================================= */}
        {/* Footer Buttons */}
        {/* ================================================= */}
        <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
          Footer Buttons
        </div>
      </div>
    </div>
  );
};

export default PlantCensus;
