import React from "react";
import { useForm } from "react-hook-form";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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
  documentTableHeaders,
  censusHistoryTableHeaders,
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
  Eye,
  Pencil,
  Trash2,
  Plus,
  Upload,
  Download,
  RotateCcw,
  X,
  Save,
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
const statusColor = {
  Excellent: "bg-green-100 text-green-700",
  Healthy: "bg-emerald-100 text-emerald-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  Critical: "bg-red-100 text-red-700",
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
                  <div className='flex items-center gap-1'>
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.iconColor}`}
                    >
                      <Icon size={16} />
                    </div>

                    {/* Content */}
                    <div className='flex-1'>
                      <p className='text-xs font-medium text-gray-500'>
                        {item.title}
                      </p>

                      <div className='mt-1 flex items-center justify-between'>
                        <h3 className='text-sm font-semibold text-green-800'>
                          {item.value}
                        </h3>

                        {item.badge && (
                          <span
                            className={`rounded-md px-1 py-1 text-xs font-semibold ${item.badgeColor}`}
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

          <div className='col-span-12 xl:col-span-6 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-200 px-4 py-2'>
              <h2 className='text-lg font-semibold text-green-700'>
                Row-wise Census Details
              </h2>
            </div>

            {/* Table */}
            <div className='max-h-[500px] overflow-auto'>
              <table className='min-w-full border-collapse'>
                {/* Table Header */}
                <thead className='sticky top-0 z-10 bg-gray-100'>
                  <tr>
                    <th className='border border-gray-200 px-1 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-700'>
                      SL
                    </th>

                    {rowWiseTable.headers.map((header) => (
                      <th
                        key={header.id}
                        className='border border-gray-200 px-1 py-3 text-center text-xs font-normal uppercase tracking-wide text-gray-700 whitespace-nowrap'
                      >
                        {header.label}
                      </th>
                    ))}

                    <th className='border border-gray-200 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-700'>
                      Action
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {rowWiseTable.rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`transition-colors hover:bg-green-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {/* SL */}
                      <td className='border border-gray-200 px-1 py-1 text-center text-sm'>
                        {index + 1}
                      </td>

                      {/* Dynamic Data */}
                      {rowWiseTable.headers.map((header) => (
                        <td
                          key={header.id}
                          className='border border-gray-200 px-1 py-1 text-center text-sm whitespace-nowrap'
                        >
                          {header.key === "status" ? (
                            <span
                              className={`inline-flex rounded-full px-1 py-1 text-xs font-medium ${
                                statusColor[row.status]
                              }`}
                            >
                              {row.status}
                            </span>
                          ) : (
                            row[header.key]
                          )}
                        </td>
                      ))}

                      {/* Actions */}
                      <td className='border border-gray-200 px-3 py-1'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            title='View'
                            className='rounded-md p-2 text-blue-600 transition hover:bg-blue-100'
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type='button'
                            title='Edit'
                            className='rounded-md p-2 text-amber-600 transition hover:bg-amber-100'
                          >
                            <Pencil size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Total / Average Row */}
                <tr className='bg-gray-100 font-semibold text-gray-800'>
                  <td className='border border-gray-200 px-1 py-2 text-center'>
                    -
                  </td>

                  <td className='border border-gray-200 px-3 py-2 whitespace-nowrap'>
                    Total / Average
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    4,999.00
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    2.10
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    10,250
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    9,678
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    567
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    5
                  </td>

                  <td className='border border-gray-200 px-3 py-2 text-center'>
                    5.53
                  </td>

                  <td className='border border-gray-200 px-3 py-2'></td>
                </tr>
              </table>
            </div>

            {/* Footer */}

            <div className='flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
              {/* Left */}
              <p className='text-sm text-gray-500'>
                Showing <span className='font-semibold text-gray-700'>1</span>{" "}
                to{" "}
                <span className='font-semibold text-gray-700'>
                  {rowWiseTable.rows.length}
                </span>{" "}
                of{" "}
                <span className='font-semibold text-gray-700'>
                  {rowWiseTable.rows.length}
                </span>{" "}
                rows
              </p>

              {/* Right */}
              <button
                type='button'
                className='inline-flex items-center justify-center gap-2 rounded-lg border border-green-600 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50'
              >
                <Plus size={16} />
                Add Row
              </button>
            </div>
          </div>

          {/* Live vs Dead Plants */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}

            <div className='border-b border-gray-200 px-2 py-4'>
              <h2 className='text-xl font-semibold text-green-700'>
                {charts.liveVsDeadChart.title}
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-12 items-center gap-2 px-2 py-10'>
              {/* Donut Chart */}
              <div className='col-span-7 flex justify-center'>
                <div className='relative h-50 w-50'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={charts.liveVsDeadChart.data}
                        dataKey='value'
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={2}
                        stroke='none'
                      >
                        {charts.liveVsDeadChart.data.map((item) => (
                          <Cell key={item.id} fill={item.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center Text */}
                  <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <p className='text-[11px] text-gray-500'>Total</p>

                    <h3 className='text-base font-bold text-gray-800'>
                      {charts.liveVsDeadChart.total.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className='col-span-5 space-y-3'>
                {charts.liveVsDeadChart.data.map((item) => (
                  <div key={item.id} className='flex items-center gap-2'>
                    <span
                      className='h-3 w-3 rounded-full flex-shrink-0'
                      style={{ backgroundColor: item.color }}
                    />

                    <div>
                      <p className='text-xs font-medium text-gray-700'>
                        {item.name}
                      </p>

                      <p className='text-[11px] text-gray-500'>
                        {item.value.toLocaleString()} ({item.percentage}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plant Distribution */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3'>
              <h2 className='text-sm font-semibold text-green-700'>
                {charts.plantDistributionChart.title}
              </h2>
            </div>

            {/* Chart */}
            <div className='h-64 p-2 '>
              <ResponsiveContainer width='100%' height='100%'>
                <ComposedChart
                  data={charts.plantDistributionChart.data}
                  margin={{
                    top: 5,
                    right: 5,
                    left: -20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid vertical={false} stroke='#f1f5f9' />

                  <XAxis
                    dataKey='row'
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    yAxisId='left'
                    width={28}
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    yAxisId='right'
                    orientation='right'
                    width={28}
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Legend
                    verticalAlign='bottom'
                    height={20}
                    iconSize={10}
                    wrapperStyle={{
                      fontSize: "11px",
                      paddingTop: "8px",
                    }}
                  />
                  <Bar
                    yAxisId='left'
                    dataKey='livePlants'
                    fill='#16A34A'
                    radius={[2, 2, 0, 0]}
                    name='Live Plants'
                  />

                  <Bar
                    yAxisId='left'
                    dataKey='deadPlants'
                    fill='#EF4444'
                    radius={[2, 2, 0, 0]}
                    name='Dead Plants'
                  />

                  <Line
                    yAxisId='right'
                    type='monotone'
                    dataKey='gap'
                    stroke='#F59E0B'
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name='Gap (%)'
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* Bottom Section */}
        {/* ================================================= */}
        <div className='grid grid-cols-12 gap-2'>
          {/* Field Photos */}
          <div className='col-span-12 md:col-span-6 xl:col-span-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            <div>
              {/* Header */}
              <div className='border-b border-gray-200 px-2 py-3'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Field Photos
                </h2>
              </div>

              {/* Body */}

              <div className='grid grid-cols-3 gap-1 p-1'>
                {fieldPhotos.slice(0, 3).map((photo) => (
                  <div
                    key={photo.id}
                    className='overflow-hidden rounded-lg border border-gray-200 bg-white'
                  >
                    {/* Title */}
                    <div className='border-b border-gray-100 px-1 py-2'>
                      <h3 className='truncate text-center text-[11px] font-semibold text-gray-700'>
                        {photo.title}
                      </h3>
                    </div>

                    {/* Image */}
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className='h-24 w-full object-cover'
                    />

                    {/* Footer */}
                    <div className='border-t border-gray-100 py-2'>
                      <button
                        type='button'
                        className='flex w-full items-center justify-center gap-1 text-xs font-medium text-gray-600 transition hover:text-green-700'
                      >
                        <Upload size={14} />
                        Upload
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className='col-span-12 md:col-span-6 xl:col-span-4 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-2 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Documents
              </h2>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full text-xs'>
                <thead className='bg-gray-50'>
                  <tr>
                    {documentTableHeaders.map((header) => (
                      <th
                        key={header.id}
                        className='border border-gray-200 px-2 py-2 text-center text-xs font-semibold'
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {documents.map((doc, index) => (
                    <tr key={doc.id}>
                      {documentTableHeaders.map((header) => (
                        <td
                          key={header.id}
                          className='border border-gray-200 px-2 py-2 text-center'
                        >
                          {header.key === "sl" ? (
                            index + 1
                          ) : header.key === "action" ? (
                            <div className='flex justify-center gap-2'>
                              <button>
                                <Download size={14} />
                              </button>

                              <button>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ) : (
                            doc[header.key]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className='border-t border-gray-200 p-2'>
              <button
                type='button'
                className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-1 text-sm font-medium hover:bg-gray-50'
              >
                <Upload size={16} />
                Upload More Document
              </button>
            </div>
          </div>

          {/* Census History */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-2 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Census History
              </h2>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full text-xs'>
                <thead className='bg-gray-50'>
                  <tr>
                    {censusHistoryTableHeaders.map((header) => (
                      <th
                        key={header.id}
                        className='border border-gray-200 px-2 py-2 text-left font-semibold'
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {censusHistory.map((item) => (
                    <tr key={item.id} className='hover:bg-green-50'>
                      {censusHistoryTableHeaders.map((header) => (
                        <td
                          key={header.id}
                          className='border border-gray-200 px-2 py-2'
                        >
                          {item[header.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Approval Status */}
          <div className='col-span-12 md:col-span-6 xl:col-span-3 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-2 py-3'>
              <h2 className='text-lg font-semibold text-green-700'>
                Approval Status
              </h2>
            </div>

            {/* Body */}
            <div className='space-y-3 p-3'>
              {approvalStatus.workflow.map((item, index) => (
                <div key={item.id} className='flex items-start gap-3'>
                  {/* Step Number */}
                  <div className='flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white'>
                    {index + 1}
                  </div>

                  {/* Details */}
                  <div className='flex-1'>
                    <h4 className='text-sm font-normal text-gray-800'>
                      {item.actionBy}
                    </h4>

                    <p className='text-xs text-gray-500'>{item.designation}</p>
                  </div>

                  {/* Right */}
                  <div className='text-right'>
                    <span
                      className={`mt-1 inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : ""
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* Footer Buttons */}
        {/* ================================================= */}
        <div className='mt-4 rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end'>
            {/* Buttons Here */}
            <button
              type='button'
              className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100'
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button
              type='button'
              className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600'
            >
              <X size={18} />
              Cancel
            </button>
            <button
              type='button'
              className='flex items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-green-800'
            >
              <Save size={18} />
              Save as Draft
            </button>
            <button
              type='submit'
              className='flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-green-700'
            >
              <CheckCircle2 size={18} />
              Submit for Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCensus;
