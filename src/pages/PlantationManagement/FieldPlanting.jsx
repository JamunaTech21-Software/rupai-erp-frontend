import React from "react";
import { useForm } from "react-hook-form";

import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";

import { fieldPlantingData } from "../../data/PlantationManagementData/fieldPlantingData";
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
        <div className='grid grid-cols-12 gap-6'>
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
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
              {/* ===========================
    Fertilizer Schedule
=========================== */}
              <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
                {/* Header */}
                <div className='border-b border-gray-200 px-6 py-4'>
                  <h2 className='text-lg font-semibold text-green-700'>
                    Fertilizer Schedule
                  </h2>
                </div>

                {/* Body */}
                <div className='space-y-5 p-6'>
                  {/* Row 01 */}
                  <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-5'></div>

                    <div className='col-span-4'></div>

                    <div className='col-span-3'></div>
                  </div>

                  {/* Row 02 */}
                  <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-5'></div>

                    <div className='col-span-4'></div>

                    <div className='col-span-3'></div>
                  </div>

                  {/* Row 03 */}
                  <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-5'></div>

                    <div className='col-span-4'></div>

                    <div className='col-span-3'></div>
                  </div>

                  {/* Row 04 */}
                  <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-5'></div>

                    <div className='col-span-4'></div>

                    <div className='col-span-3'></div>
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
                <div className='space-y-5 p-6'>
                  {/* Row 01 */}
                  <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-6'></div>

                    <div className='col-span-3'></div>

                    <div className='col-span-3'></div>
                  </div>

                  {/* Row 02 */}
                  <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-6'></div>

                    <div className='col-span-3'></div>

                    <div className='col-span-3'></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Officer + Labour */}
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
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
                <div className='space-y-5 p-6'>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div></div>

                    <div></div>
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
                <div className='space-y-5 p-6'>
                  <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'>
                    <div></div>

                    <div></div>

                    <div></div>

                    <div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remarks + Documents + Photos */}
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-12 xl:col-span-6'>
                {/* ===========================
    Remarks
=========================== */}
                <div className='rounded-xl border border-gray-200 bg-white shadow-sm h-full'>
                  {/* Header */}
                  <div className='border-b border-gray-200 px-6 py-4'>
                    <h2 className='text-lg font-semibold text-green-700'>
                      Remarks
                    </h2>
                  </div>

                  {/* Body */}
                  <div className='p-6'>
                    <div className='min-h-[120px]'></div>
                  </div>
                </div>
              </div>

              <div className='col-span-12 xl:col-span-3'>
                {/* ===========================
    Documents
=========================== */}
                <div className='rounded-xl border border-gray-200 bg-white shadow-sm h-full'>
                  {/* Header */}
                  <div className='border-b border-gray-200 px-6 py-4'>
                    <h2 className='text-lg font-semibold text-green-700'>
                      Documents
                    </h2>
                  </div>

                  {/* Body */}
                  <div className='p-6'>
                    <div className='min-h-[120px]'></div>
                  </div>
                </div>
              </div>

              <div className='col-span-12 xl:col-span-3'>
                {/* ===========================
    Photos
=========================== */}
                <div className='rounded-xl border border-gray-200 bg-white shadow-sm h-full'>
                  {/* Header */}
                  <div className='border-b border-gray-200 px-6 py-4'>
                    <h2 className='text-lg font-semibold text-green-700'>
                      Photos
                    </h2>
                  </div>

                  {/* Body */}
                  <div className='p-6'>
                    <div className='min-h-[120px]'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================
              Right Section
          =========================== */}
          <div className='col-span-12 lg:col-span-4 space-y-6'>
            {/* Field Map */}
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
              <div className='p-6'>
                <div className='min-h-[350px]'></div>
              </div>
            </div>

            {/* Planting Progress */}
            {/* ===========================
    Planting Progress
=========================== */}
            <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* Header */}
              <div className='border-b border-gray-200 px-6 py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Planting Progress
                </h2>
              </div>

              {/* Body */}
              <div className='space-y-5 p-6'>
                <div></div>

                <div></div>

                <div></div>

                <div></div>
              </div>
            </div>

            {/* Quick Summary */}
            {/* ===========================
    Quick Summary
=========================== */}
            <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
              {/* Header */}
              <div className='border-b border-gray-200 px-6 py-4'>
                <h2 className='text-lg font-semibold text-green-700'>
                  Quick Summary
                </h2>
              </div>

              {/* Body */}
              <div className='space-y-4 p-6'>
                <div></div>

                <div></div>

                <div></div>

                <div></div>

                <div></div>
              </div>
            </div>
          </div>
        </div>

        {/* ===========================
            Action Buttons
        =========================== */}
        {/* ===========================
    Action Buttons
=========================== */}
        <div className='mt-6 rounded-xl border border-gray-200 bg-white shadow-sm'>
          <div className='flex flex-wrap items-center justify-end gap-3 p-5'>
            <div> btn</div>

            <div>btn</div>

            <div>btn</div>

            <div></div>
          </div>
        </div>
      </form>

      {/* ===========================
          History Section
      ==========={/* ===========================
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
          {/* Search */}

          <div></div>

          {/* Table */}

          <div></div>

          {/* Pagination */}

          <div></div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default FieldPlanting;
