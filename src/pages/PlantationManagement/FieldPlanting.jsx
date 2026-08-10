import React from "react";
import { useForm } from "react-hook-form";
import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";

import { fieldPlantingData } from "../../data/PlantationManagementData/fieldPlantingData";
const {
  historyTableHeaders,
  historyTableData,
  fieldMap,
  quickSummary,
  plantingProgress,
  pagination,
} = fieldPlantingData;

import {
  Upload,
  RotateCcw,
  X,
  Save,
  Send,
  Printer,
  Plus,
  Minus,
  Layers,
  Expand,
  Map,
  Leaf,
  Target,
  TrendingUp,
  Sprout,
  CirclePercent,
  Download,
  Eye,
  Pencil,
  Copy,
  Trash2,
} from "lucide-react";
const summaryIconMap = {
  Map,
  Leaf,
  Target,
  TrendingUp,
  Sprout,
  CirclePercent,
};
const FieldPlanting = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='space-y-6'>
      {/* Plantation Tabs */}
      <PlantationManagementTabs tabs={fieldPlantingData.tabs} />
      {/* ===========================
          Field Planting Form
      =========================== */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-12 gap-2'>
          {/* ===========================
              Left Section
          =========================== */}
          <div className='col-span-12 lg:col-span-8 space-y-6'>
            {/* ===========================
                Planting Information
            =========================== */}
            <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* Card Header */}
              <div className='border-b border-gray-200 px-6 py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Field Planting Information
                </h2>
              </div>

              {/* Card Body */}
              <div className='space-y-5 p-2'>
                {/* ===========================
                  Row 01
                 =========================== */}

                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Estate */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Estate</option>
                      <option value='rupai'>Rupai Tea Estate</option>
                      <option value='green-valley'>
                        Green Valley Tea Estate
                      </option>
                      <option value='sunrise'>Sunrise Tea Estate</option>
                    </select>

                    {errors.estate && (
                      <p className='text-xs text-red-500'>
                        {errors.estate.message}
                      </p>
                    )}
                  </div>

                  {/* Division */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Division <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("division", {
                        required: "Division is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Division</option>
                      <option value='north'>North Division</option>
                      <option value='south'>South Division</option>
                      <option value='east'>East Division</option>
                      <option value='west'>West Division</option>
                    </select>

                    {errors.division && (
                      <p className='text-xs text-red-500'>
                        {errors.division.message}
                      </p>
                    )}
                  </div>

                  {/* Section */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Section <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("section", {
                        required: "Section is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Section</option>
                      <option value='a'>Section A</option>
                      <option value='b'>Section B</option>
                      <option value='c'>Section C</option>
                      <option value='d'>Section D</option>
                    </select>

                    {errors.section && (
                      <p className='text-xs text-red-500'>
                        {errors.section.message}
                      </p>
                    )}
                  </div>

                  {/* Field / Block */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Field / Block <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("fieldBlock", {
                        required: "Field / Block is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Field / Block</option>
                      <option value='field-01'>Field-01</option>
                      <option value='field-02'>Field-02</option>
                      <option value='field-03'>Field-03</option>
                      <option value='field-04'>Field-04</option>
                    </select>

                    {errors.fieldBlock && (
                      <p className='text-xs text-red-500'>
                        {errors.fieldBlock.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Year */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Planting Year <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      placeholder='e.g. 2026'
                      {...register("plantingYear", {
                        required: "Planting Year is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />

                    {errors.plantingYear && (
                      <p className='text-xs text-red-500'>
                        {errors.plantingYear.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* ===========================
                  Row 02
              =========================== */}

                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Planting Season */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Planting Season <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("plantingSeason", {
                        required: "Planting Season is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Season</option>
                      <option value='spring'>Spring</option>
                      <option value='summer'>Summer</option>
                      <option value='monsoon'>Monsoon</option>
                      <option value='winter'>Winter</option>
                    </select>

                    {errors.plantingSeason && (
                      <p className='text-xs text-red-500'>
                        {errors.plantingSeason.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Date */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Planting Date <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='date'
                      {...register("plantingDate", {
                        required: "Planting Date is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />

                    {errors.plantingDate && (
                      <p className='text-xs text-red-500'>
                        {errors.plantingDate.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Method */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Planting Method <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("plantingMethod", {
                        required: "Planting Method is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Method</option>
                      <option value='manual'>Manual</option>
                      <option value='mechanical'>Mechanical</option>
                      <option value='mixed'>Mixed</option>
                    </select>

                    {errors.plantingMethod && (
                      <p className='text-xs text-red-500'>
                        {errors.plantingMethod.message}
                      </p>
                    )}
                  </div>

                  {/* Plant Source */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Plant Source <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("plantSource", {
                        required: "Plant Source is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Source</option>
                      <option value='own-nursery'>Own Nursery</option>
                      <option value='central-nursery'>Central Nursery</option>
                      <option value='external'>External Supplier</option>
                    </select>

                    {errors.plantSource && (
                      <p className='text-xs text-red-500'>
                        {errors.plantSource.message}
                      </p>
                    )}
                  </div>

                  {/* Nursery Bed / Section */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Nursery Bed / Section
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Nursery Bed'
                      {...register("nurseryBed")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>
                </div>

                {/* ===========================
                          Row 03
                    =========================== */}
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Clone / Variety */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Clone / Variety <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("cloneVariety", {
                        required: "Clone / Variety is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Clone</option>
                      <option value='bt1'>BT-1</option>
                      <option value='bt2'>BT-2</option>
                      <option value='bt3'>BT-3</option>
                      <option value='tv1'>TV-1</option>
                      <option value='tv23'>TV-23</option>
                    </select>

                    {errors.cloneVariety && (
                      <p className='text-xs text-red-500'>
                        {errors.cloneVariety.message}
                      </p>
                    )}
                  </div>

                  {/* Plant Type */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Plant Type <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("plantType", {
                        required: "Plant Type is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Plant Type</option>
                      <option value='seedling'>Seedling</option>
                      <option value='clonal'>Clonal</option>
                      <option value='grafted'>Grafted</option>
                    </select>

                    {errors.plantType && (
                      <p className='text-xs text-red-500'>
                        {errors.plantType.message}
                      </p>
                    )}
                  </div>

                  {/* Total Area */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Total Area (Acre)
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='0.00'
                      {...register("totalArea")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Net Plantable Area */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Net Plantable Area
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='0.00'
                      {...register("netPlantableArea")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Previous Crop / Land Use */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Previous Crop / Land
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Previous Crop'
                      {...register("previousCrop")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>
                </div>

                {/* ===========================
                        Row 04
                    =========================== */}
                {/* ---------------- Row 04 ---------------- */}

                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Plant Spacing */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Spacing (R × P) <span className='text-red-500'>*</span>
                    </label>

                    <div className='grid grid-cols-2 gap-2'>
                      <div className='flex'>
                        <input
                          type='number'
                          step='0.1'
                          placeholder='4.0'
                          {...register("rowSpacing")}
                          className='h-11 w-full rounded-l-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                        />
                        <span className='flex h-11 w-10 items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 text-sm'>
                          ft
                        </span>
                      </div>

                      <div className='flex'>
                        <input
                          type='number'
                          step='0.1'
                          placeholder='2.5'
                          {...register("plantSpacing")}
                          className='h-11 w-full rounded-l-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                        />
                        <span className='flex h-11 w-10 items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 text-sm'>
                          ft
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pit Size */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Pit Size (L × W × D)
                    </label>

                    <input
                      type='text'
                      placeholder='18" × 18" × 18"'
                      {...register("pitSize")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* Expected Plants */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Expected Plants
                    </label>

                    <input
                      type='number'
                      placeholder='24800'
                      {...register("expectedPlants")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* Target Plants */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Target Plants
                    </label>

                    <input
                      type='number'
                      placeholder='24600'
                      {...register("targetPlants")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                    />
                  </div>

                  {/* Signal Plant */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Signal Plant %
                    </label>

                    <div className='flex'>
                      <input
                        type='number'
                        placeholder='2'
                        {...register("signalPlant")}
                        className='h-11 w-full rounded-l-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />

                      <span className='flex h-11 w-10 items-center justify-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-100 text-sm'>
                        %
                      </span>
                    </div>
                  </div>
                </div>

                {/* ===========================
                        Row 05
                    =========================== */}

                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Soil Type */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Soil Type <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("soilType", {
                        required: "Soil Type is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Soil Type</option>
                      <option value='loamy'>Loamy</option>
                      <option value='clay'>Clay</option>
                      <option value='sandy'>Sandy</option>
                      <option value='silty'>Silty</option>
                    </select>

                    {errors.soilType && (
                      <p className='text-xs text-red-500'>
                        {errors.soilType.message}
                      </p>
                    )}
                  </div>

                  {/* Soil pH */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Soil pH
                    </label>

                    <input
                      type='number'
                      step='0.1'
                      placeholder='5.2'
                      {...register("soilPH")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Elevation */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Elevation (ft)
                    </label>

                    <input
                      type='number'
                      placeholder='240'
                      {...register("elevation")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Slope */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Slope (%)
                    </label>

                    <select
                      {...register("slope")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Slope</option>
                      <option value='2%'>2%</option>
                      <option value='5%'>5%</option>
                      <option value='8%'>8%</option>
                      <option value='10%'>10%</option>
                    </select>
                  </div>

                  {/* Drainage */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Drainage
                    </label>

                    <select
                      {...register("drainage")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Drainage</option>
                      <option value='excellent'>Excellent</option>
                      <option value='good'>Good</option>
                      <option value='average'>Average</option>
                      <option value='poor'>Poor</option>
                    </select>
                  </div>
                </div>

                {/* ===========================
                    Row 06
                =========================== */}
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5'>
                  {/* Irrigation Source */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Irrigation Source
                    </label>

                    <select
                      {...register("irrigationSource")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Source</option>
                      <option value='tube-well'>Tube Well</option>
                      <option value='river'>River</option>
                      <option value='canal'>Canal</option>
                      <option value='pond'>Pond</option>
                      <option value='rain-water'>Rain Water Harvesting</option>
                    </select>
                  </div>

                  {/* Irrigation Method */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Irrigation Method
                    </label>

                    <select
                      {...register("irrigationMethod")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Method</option>
                      <option value='sprinkler'>Sprinkler</option>
                      <option value='drip'>Drip Irrigation</option>
                      <option value='flood'>Flood Irrigation</option>
                      <option value='manual'>Manual</option>
                    </select>
                  </div>

                  {/* Basal Fertilizer */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Basal Fertilizer ( Acre)
                    </label>

                    <select
                      {...register("basalFertilizer")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                    >
                      <option value=''>Select Fertilizer</option>
                      <option value='npk-50'>NPK 50:50:50 - 20 Kg</option>
                      <option value='npk-40'>NPK 40:40:40 - 25 Kg</option>
                      <option value='dap'>DAP - 25 Kg</option>
                      <option value='urea'>Urea - 20 Kg</option>
                    </select>
                  </div>

                  {/* Organic Manure */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Organic Manure (Ac)
                    </label>

                    <input
                      type='text'
                      placeholder='FYM - 1,000 Kg'
                      {...register("organicManure")}
                      className='h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                    />
                  </div>

                  {/* Shade Tree Planned */}
                  <div className='space-y-1.5'>
                    <label className='text-sm font-medium text-gray-700'>
                      Shade Tree Planned?
                    </label>

                    <div className='flex h-11 items-center gap-3 rounded-lg border border-gray-300 px-3'>
                      <span
                        className={`text-sm ${
                          watch("shadeTreePlanned")
                            ? "text-gray-400"
                            : "font-medium text-red-500"
                        }`}
                      >
                        No
                      </span>

                      <input
                        type='checkbox'
                        {...register("shadeTreePlanned")}
                        className='toggle toggle-success'
                      />

                      <span
                        className={`text-sm ${
                          watch("shadeTreePlanned")
                            ? "font-medium text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        Yes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fertilizer + Shade Tree */}
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
              {/* ===========================
                  Fertilizer Schedule
              =========================== */}
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-6 py-4'>
                  <h2 className='text-lg font-semibold text-green-700'>
                    Fertilizer Schedule (At Planting Time)
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-3 p-6'>
                  {/* Column Header */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-5'>
                      <label className='text-sm font-semibold text-gray-700'>
                        Fertilizer / Material
                      </label>
                    </div>

                    <div className='col-span-4'>
                      <label className='text-sm font-semibold text-gray-700'>
                        Amount (Per Acre)
                      </label>
                    </div>

                    <div className='col-span-3'>
                      <label className='text-sm font-semibold text-gray-700'>
                        Unit
                      </label>
                    </div>
                  </div>

                  {/* Row 01 */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-5'>
                      <input
                        type='text'
                        defaultValue='NPK (15:15:15)'
                        readOnly
                        className='h-10 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm'
                      />
                    </div>

                    <div className='col-span-4'>
                      <input
                        type='number'
                        defaultValue='50'
                        {...register("npkAmount")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    <div className='col-span-3'>
                      <select
                        {...register("npkUnit")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option>Kg</option>
                        <option>Gram</option>
                        <option>Ton</option>
                        <option>Bag</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 02 */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-5'>
                      <input
                        type='text'
                        defaultValue='TSP'
                        readOnly
                        className='h-10 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm'
                      />
                    </div>

                    <div className='col-span-4'>
                      <input
                        type='number'
                        defaultValue='25'
                        {...register("tspAmount")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    <div className='col-span-3'>
                      <select
                        {...register("tspUnit")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option>Kg</option>
                        <option>Gram</option>
                        <option>Ton</option>
                        <option>Bag</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 03 */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-5'>
                      <input
                        type='text'
                        defaultValue='MOP'
                        readOnly
                        className='h-10 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm'
                      />
                    </div>

                    <div className='col-span-4'>
                      <input
                        type='number'
                        defaultValue='25'
                        {...register("mopAmount")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    <div className='col-span-3'>
                      <select
                        {...register("mopUnit")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option>Kg</option>
                        <option>Gram</option>
                        <option>Ton</option>
                        <option>Bag</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 04 */}
                  <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-5'>
                      <input
                        type='text'
                        defaultValue='FYM'
                        readOnly
                        className='h-10 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm'
                      />
                    </div>

                    <div className='col-span-4'>
                      <input
                        type='number'
                        defaultValue='1000'
                        {...register("fymAmount")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    <div className='col-span-3'>
                      <select
                        {...register("fymUnit")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option>Kg</option>
                        <option>Gram</option>
                        <option>Ton</option>
                        <option>Bag</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===========================
                      Shade Tree Information
                  =========================== */}
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-6 py-4'>
                  <h2 className='text-lg font-semibold text-green-700'>
                    Shade Tree Information
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-4 p-2 pt-6'>
                  {/* ---------------- Row 01 ---------------- */}
                  <div className='grid grid-cols-12 gap-3'>
                    {/* Shade Tree Species */}
                    <div className='col-span-4 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Shade Species
                      </label>

                      <select
                        {...register("shadeTreeSpecies")}
                        className='h-14 w-full rounded-lg border border-gray-300 bg-white px-1 text-sm outline-none focus:border-green-600'
                      >
                        <option value=''>Select Species</option>
                        <option value='grevillea'>Grevillea Robusta</option>
                        <option value='albizia'>Albizia</option>
                        <option value='acacia'>Acacia</option>
                        <option value='gliricidia'>Gliricidia</option>
                      </select>
                    </div>

                    {/* Spacing */}
                    <div className='col-span-3 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Spacing
                      </label>

                      <select
                        {...register("shadeTreeSpacing")}
                        className='h-14 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-green-600'
                      >
                        <option value=''>Select</option>
                        <option>20 × 20 ft</option>
                        <option>25 × 25 ft</option>
                        <option>30 × 30 ft</option>
                      </select>
                    </div>

                    {/* No of Shade Trees */}
                    <div className='col-span-5 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        No. of shade tr (PA)
                      </label>

                      <input
                        type='number'
                        placeholder='25'
                        {...register("shadeTreeCount")}
                        className='h-14 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>
                  </div>

                  {/* ---------------- Row 02 ---------------- */}
                  <div className='grid grid-cols-12 gap-3 pt-6'>
                    {/* Purpose */}
                    <div className='col-span-4 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Purpose
                      </label>

                      <input
                        type='text'
                        placeholder='Shade & Wind Break'
                        {...register("shadePurpose")}
                        className='h-14 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Planting Date */}
                    <div className='col-span-4 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Planting Date
                      </label>

                      <input
                        type='date'
                        {...register("shadePlantingDate")}
                        className='h-14 w-full rounded-lg border border-gray-300 px-1 text-sm outline-none focus:border-green-600'
                      />
                    </div>

                    {/* Remarks */}
                    <div className='col-span-4 space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Remarks
                      </label>

                      <input
                        type='text'
                        placeholder='Planned along boundary'
                        {...register("shadeRemarks")}
                        className='h-14 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-green-600'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Officer + Labour */}
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
              {/* ===========================
                      Field Officer
                  =========================== */}
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-6 py-4'>
                  <h2 className='text-lg font-semibold text-green-700'>
                    Field Officer / Supervisor
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-5 p-2'>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    {/* Field Officer */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Field Officer
                      </label>

                      <select
                        {...register("fieldOfficer")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                      >
                        <option value=''>Select Field Officer</option>
                        <option value='faruk'>Md. Faruk Hossain</option>
                        <option value='kamrul'>Md. Kamrul Hasan</option>
                        <option value='rakib'>Md. Rakib Hasan</option>
                        <option value='saiful'>Md. Saiful Islam</option>
                      </select>
                    </div>

                    {/* Assistant / Supervisor */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-medium text-gray-700'>
                        Assistant / Supervisor
                      </label>

                      <select
                        {...register("assistantSupervisor")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                      >
                        <option value=''>Select Assistant</option>
                        <option value='kamrul'>Md. Kamrul Hasan</option>
                        <option value='faruk'>Md. Faruk Hossain</option>
                        <option value='rakib'>Md. Rakib Hasan</option>
                        <option value='saiful'>Md. Saiful Islam</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===========================
                Labour Allocation
            =========================== */}
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-6 py-4'>
                  <h2 className='text-lg font-semibold text-green-700'>
                    Labour Allocation
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-5 p-2'>
                  <div className='grid grid-cols-2 gap-2 xl:grid-cols-4'>
                    {/* Total Labour Required */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-normal text-gray-700'>
                        Total Required
                      </label>

                      <input
                        type='number'
                        placeholder='120'
                        {...register("totalLabour")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                      />
                    </div>

                    {/* Male Labour */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-normal text-gray-700'>
                        Male Labour
                      </label>

                      <input
                        type='number'
                        placeholder='80'
                        {...register("maleLabour")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                      />
                    </div>

                    {/* Female Labour */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-normal text-gray-700'>
                        Female Labour
                      </label>

                      <input
                        type='number'
                        placeholder='40'
                        {...register("femaleLabour")}
                        className='h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:border-green-600'
                      />
                    </div>

                    {/* Labour Source */}
                    <div className='space-y-1.5'>
                      <label className='text-sm font-normal text-gray-700'>
                        Labour Source
                      </label>

                      <select
                        {...register("labourSource")}
                        className='h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition-colors focus:border-green-600'
                      >
                        <option value=''>Select Source</option>
                        <option value='local'>Local</option>
                        <option value='permanent'>Permanent</option>
                        <option value='seasonal'>Seasonal</option>
                        <option value='contract'>Contract</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remarks + Documents + Photos */}
            <div className='grid grid-cols-12 gap-2'>
              <div className='col-span-12 xl:col-span-6'>
                {/* ===========================
                    Remarks
                =========================== */}
                <div className='rounded-xl border border-gray-200 bg-white shadow-sm '>
                  {/* Header */}
                  <div className='border-b border-gray-200 px-6 py-4'>
                    <h2 className='text-lg font-semibold text-green-700'>
                      Remarks
                    </h2>
                  </div>

                  {/* Body */}
                  <div className='p-2'>
                    {/* Body */}
                    <div className='p-2'>
                      <div className='space-y-1.5'>
                        <textarea
                          rows={2}
                          placeholder='Enter remarks...'
                          {...register("remarks")}
                          className='w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-green-600'
                          defaultValue='Replanting with high yielding clone TV-23. Land prepared well. Drainage improved.'
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-span-12 xl:col-span-3'>
                {/* ===========================
                  Documents
              =========================== */}
                <div className='rounded-xl border border-gray-200 bg-white shadow-sm '>
                  {/* Header */}
                  <div className='border-b border-gray-200 px-6 py-4'>
                    <h2 className='text-lg font-semibold text-green-700'>
                      Documents
                    </h2>
                  </div>

                  {/* Body */}
                  <div className='p-2'>
                    {/* Body */}
                    <div className='p-2'>
                      <div className='space-y-1.5'>
                        <label className='text-sm font-medium text-gray-700'>
                          Upload Documents
                        </label>

                        <div className='flex items-center justify-between rounded-lg border border-gray-300  '>
                          <input
                            type='file'
                            id='documents'
                            multiple
                            hidden
                            {...register("documents")}
                          />

                          <label
                            htmlFor='documents'
                            className='cursor-pointer rounded-md border border-gray-300  py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200'
                          >
                            Choose Files
                          </label>

                          <span className='text-xs text-gray-500'>
                            3 files uploaded
                          </span>

                          <button
                            type='button'
                            className='text-gray-500 hover:text-green-600'
                          >
                            <Upload size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-span-12 xl:col-span-3'>
                {/* ===========================
                      Photos
                  =========================== */}
                <div className='rounded-xl border border-gray-200 bg-white shadow-sm h-full'>
                  {/* Header */}
                  <div className='border-b border-gray-200 px-1 py-4'>
                    <h2 className='text-lg font-semibold text-green-700'>
                      Photo Before Planting
                    </h2>
                  </div>

                  {/* Body */}
                  <div className='p-1'>
                    {/* Body */}
                    <div className='p-1'>
                      <div className='space-y-1.5'>
                        <div className='grid grid-cols-4 gap-1'>
                          {/* Photo 01 */}
                          <div className='h-16 overflow-hidden rounded-lg border border-gray-300'>
                            <img
                              src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300'
                              alt='Plantation'
                              className='h-full w-full object-cover'
                            />
                          </div>

                          {/* Photo 02 */}
                          <div className='h-16 overflow-hidden rounded-lg border border-gray-300'>
                            <img
                              src='https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300'
                              alt='Plantation'
                              className='h-full w-full object-cover'
                            />
                          </div>

                          {/* Photo 03 */}
                          <div className='h-16 overflow-hidden rounded-lg border border-gray-300'>
                            <img
                              src='https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300'
                              alt='Plantation'
                              className='h-full w-full object-cover'
                            />
                          </div>

                          {/* Add More */}
                          <label
                            htmlFor='photos'
                            className='flex  cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 text-gray-500 transition-colors hover:border-green-600 hover:text-green-600'
                          >
                            <input
                              id='photos'
                              type='file'
                              multiple
                              hidden
                              {...register("photos")}
                            />

                            <span className='text-xl font-semibold leading-none'>
                              +
                            </span>
                            <span className='mt-1 text-center text-[10px] font-medium'>
                              Add More
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================
              Right Section
          =========================== */}
          <div className='col-span-12 lg:col-span-4 space-y-6'>
            {/* ===========================
                    Field Map
                =========================== */}
            <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* Header */}
              <div className='border-b border-gray-200 px-6 py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Field Map
                </h2>
              </div>

              {/* Body */}
              <div className='space-y-4 p-4'>
                {/* Map */}
                <div className='relative overflow-hidden rounded-lg border border-gray-300'>
                  <img
                    src={fieldMap.image}
                    alt={fieldMap.title}
                    className='h-64 w-full object-cover'
                  />

                  {/* Controls */}
                  <div className='absolute left-3 top-3 flex flex-col gap-2'>
                    <button
                      type='button'
                      className='flex h-9 w-9 items-center justify-center rounded-md bg-white shadow transition hover:bg-gray-100'
                    >
                      <Plus size={18} />
                    </button>

                    <button
                      type='button'
                      className='flex h-9 w-9 items-center justify-center rounded-md bg-white shadow transition hover:bg-gray-100'
                    >
                      <Minus size={18} />
                    </button>

                    <button
                      type='button'
                      className='flex h-9 w-9 items-center justify-center rounded-md bg-white shadow transition hover:bg-gray-100'
                    >
                      <Layers size={18} />
                    </button>

                    <button
                      type='button'
                      className='flex h-9 w-9 items-center justify-center rounded-md bg-white shadow transition hover:bg-gray-100'
                    >
                      <Expand size={18} />
                    </button>
                  </div>
                </div>

                {/* Legend */}
                <div className='flex flex-wrap items-center justify-center gap-5'>
                  {fieldMap.legend.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center gap-2 text-xs text-gray-600'
                    >
                      <span
                        className='h-2.5 w-5 rounded'
                        style={{ backgroundColor: item.color }}
                      />

                      {item.title}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between border-t border-gray-200 pt-3'>
                  <div className='text-xs text-gray-600'>
                    Latitude:
                    <span className='ml-1 font-medium'>
                      {fieldMap.latitude}
                    </span>
                    <span className='mx-2'>|</span>
                    Longitude:
                    <span className='ml-1 font-medium'>
                      {fieldMap.longitude}
                    </span>
                  </div>

                  <button
                    type='button'
                    className='rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium transition hover:bg-gray-50'
                  >
                    View Full Screen
                  </button>
                </div>
              </div>
            </div>

            {/* ===========================
                    Planting Progress
                =========================== */}
            <div className='rounded-xl border py-6 border-gray-200 bg-white shadow-sm'>
              {/* Header */}
              <div className='border-b border-gray-200 px-6 py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Planting Progress
                </h2>
              </div>

              {/* Body */}
              <div className='space-y-5 p-2'>
                <div className='grid grid-cols-12 gap-2'>
                  {/* Progress Circle */}
                  <div className='col-span-5 flex items-center justify-center'>
                    <div className='relative flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-gray-200'>
                      <div
                        className='absolute inset-0 rounded-full'
                        style={{
                          background:
                            "conic-gradient(#15803d 45%, transparent 45%)",
                          mask: "radial-gradient(circle, transparent 58%, black 60%)",
                          WebkitMask:
                            "radial-gradient(circle, transparent 58%, black 60%)",
                        }}
                      />

                      <div className='z-10 text-center'>
                        <h3 className='text-3xl  font-bold text-gray-800'>
                          {plantingProgress.percentage}%
                        </h3>

                        <p className='text-xs text-gray-500'>
                          {plantingProgress.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className='col-span-7 flex flex-col justify-center gap-2'>
                    {plantingProgress.stats.map((item) => (
                      <div
                        key={item.id}
                        className='flex items-center justify-between'
                      >
                        <div className='flex items-center gap-3'>
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                          />

                          <p className='text-sm text-gray-600'>{item.title}</p>
                        </div>

                        <p className='text-sm py-4 font-semibold text-gray-800'>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ===========================
                    Quick Summary
                =========================== */}
            <div className='rounded-xl border py-6 border-gray-200 bg-white shadow-sm'>
              {/* Header */}
              <div className='border-b border-gray-200 px-6 py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Quick Summary
                </h2>
              </div>

              {/* Body */}
              <div className='space-y-4 p-6'>
                <div className='grid grid-cols-2 py-4 gap-5'>
                  {quickSummary.map((item) => {
                    const Icon = summaryIconMap[item.icon];

                    return (
                      <div
                        key={item.id}
                        className='flex py-2 items-center gap-3'
                      >
                        {/* Icon */}
                        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700'>
                          <Icon size={22} />
                        </div>

                        {/* Content */}
                        <div>
                          <p className='text-xs text-gray-500'>{item.title}</p>

                          <h4 className='mt-1 text-xl font-bold text-green-700'>
                            {item.value}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===========================
            Action Buttons
        =========================== */}

        <div className='mt-6 rounded-xl border border-gray-200 bg-white shadow-sm'>
          <div className='flex flex-wrap items-center justify-center gap-3 p-5'>
            <button
              type='reset'
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50'
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type='button'
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-all hover:bg-red-50 hover:text-red-600'
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type='button'
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition-all hover:bg-green-800'
            >
              <Save size={16} />
              Save as Draft
            </button>

            <button
              type='submit'
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition-all hover:bg-green-800'
            >
              <Send size={16} />
              Submit for Approval
            </button>

            <button
              type='button'
              className='flex cursor-pointer h-10 items-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition-all hover:bg-green-800'
            >
              <Printer size={16} />
              Save & Print
            </button>
          </div>
        </div>
      </form>
      {/* ===========================
            History Section
        =========================== */}
      <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
        {/* Header */}
        <div className='border-b border-gray-200 px-6 py-4'>
          <h2 className='text-lg font-semibold text-green-700'>
            Field Planting History
          </h2>
        </div>

        {/* Body */}
        <div className='p-6'>
          {/* Table */}
          <div className='overflow-x-auto rounded-lg border border-gray-200'>
            <table className='w-full border-collapse text-sm'>
              {/* Table Header */}
              <thead className='bg-gray-50'>
                <tr>
                  {historyTableHeaders.map((header, index) => (
                    <th
                      key={index}
                      className='border-b border-r border-gray-200 px-4 py-3 text-center text-xs font-semibold whitespace-nowrap text-gray-700 last:border-r-0'
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {historyTableData.map((item, index) => (
                  <tr key={item.id} className='hover:bg-gray-50'>
                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {index + 1}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {item.plantingYear}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {item.fieldBlock}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {item.area}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {item.clone}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center whitespace-nowrap'>
                      {item.plantingDate}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {item.method}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {item.expectedPlants}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      {item.plantedPlants}
                    </td>

                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      <span
                        className={`font-semibold ${
                          item.completion === "100%"
                            ? "text-green-600"
                            : "text-amber-500"
                        }`}
                      >
                        {item.completion}
                      </span>
                    </td>

                    {/* Status */}
                    <td className='border-b border-r border-gray-200 px-4 py-3 text-center'>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${item.statusColor}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className='border-b border-gray-200 px-4 py-3'>
                      <div className='flex items-center justify-center gap-2'>
                        {/* View */}
                        <button
                          type='button'
                          className='rounded p-1 text-sky-500 transition hover:bg-sky-50 hover:text-sky-600'
                          title='View'
                        >
                          <Eye size={16} />
                        </button>

                        {/* Edit */}
                        <button
                          type='button'
                          className='rounded p-1 text-blue-500 transition hover:bg-blue-50 hover:text-blue-600'
                          title='Edit'
                        >
                          <Pencil size={16} />
                        </button>
                        {/* Delete */}
                        <button
                          type='button'
                          className='rounded p-1 text-red-500 transition hover:bg-red-50 hover:text-red-600'
                          title='Delete'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className='mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            {/* Left */}
            <p className='text-sm text-gray-600'>
              Showing 1 to 5 of 28 entries
            </p>

            {/* Right */}
            <div className='flex flex-wrap items-center justify-end gap-2'>
              <button
                type='button'
                className='flex h-9 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm hover:bg-gray-50'
              >
                <Download size={16} />
                Export
              </button>

              <div className='flex items-center gap-1'>
                {pagination.pages.map((page, index) => (
                  <button
                    key={index}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm
          ${
            page === pagination.currentPage
              ? "bg-green-700 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldPlanting;
