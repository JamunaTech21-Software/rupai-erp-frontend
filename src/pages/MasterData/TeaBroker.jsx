import { useForm } from "react-hook-form";
import { RotateCcw, Save } from "lucide-react";
import MasterDataTabs from "./MasterDataTabs";
import teaBrokerData from "../../data/MasterData/teaBrokerData";
import React, { useRef, useState } from "react";
const TeaBroker = () => {
  const formRef = useRef(null);

  const [isAddMode, setIsAddMode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Broker Position Data:", data);

    setIsAddMode(false);
  };

  const handleClear = () => {
    reset();
  };

  return (
    <div>
      <MasterDataTabs />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className='mt-4 grid grid-cols-1 gap-2 xl:grid-cols-4'>
        {/* =====================================================
            LEFT : BROKERS SALE POSITION SETUP
        ===================================================== */}

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-1'
        >
          {/* Header */}

          <div className='mb-5'>
            <h2 className='text-sm font-bold text-emerald-700'>
              {isAddMode
                ? "Add Broker Sale Position"
                : teaBrokerData.setup.title}
            </h2>
          </div>

          {/* =====================================================
              FORM FIELDS
          ===================================================== */}

          <div>
            {teaBrokerData.setup.fields.map((field) => (
              <div key={field.name} className='mb-4'>
                {/* Label */}

                <label className='mb-2 block text-[11px] font-medium text-slate-700'>
                  {field.label}

                  {field.required && (
                    <span className='ml-1 text-red-500'>*</span>
                  )}
                </label>

                {/* Select */}

                <select
                  {...register(field.name, {
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                  })}
                  className={`h-9 w-full rounded-md border bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 ${
                    errors[field.name] ? "border-red-400" : "border-slate-200"
                  }`}
                >
                  <option value=''>{field.placeholder}</option>

                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Validation Error */}

                {errors[field.name] && (
                  <p className='mt-1 text-[10px] text-red-500'>
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* =====================================================
              ACTION BUTTONS
          ===================================================== */}

          <div className='mt-5 flex flex-col gap-2 sm:flex-row'>
            {/* Clear */}

            <button
              type='button'
              onClick={handleClear}
              className='flex flex-1 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50'
            >
              <RotateCcw className='h-3.5 w-3.5' />

              {teaBrokerData.setup.buttons.clear}
            </button>

            {/* Save */}

            <button
              type='submit'
              className='flex flex-1 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-800'
            >
              <Save className='h-3.5 w-3.5' />

              {teaBrokerData.setup.buttons.save}
            </button>
          </div>

          {/* Mandatory Text */}

          <p className='mt-5 text-[10px] text-red-500'>
            {teaBrokerData.setup.mandatoryText}
          </p>
        </form>

        {/* =========================================================
                RIGHT : BROKERS SALE POSITION LIST
            ========================================================= */}

        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-3'>
          {/* =====================================================
                  HEADER
              ===================================================== */}

          <div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <h2 className='text-sm font-bold text-emerald-700'>
              {teaBrokerData.list.title}
            </h2>

            <div className='flex  gap-2'>
              <button
                type='button'
                className='flex items-center gap-2 rounded-md border border-emerald-200 px-4 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50'
              >
                ↓{teaBrokerData.list.buttons.export}
              </button>

              <button
                type='button'
                onClick={() => {
                  setIsAddMode(true);
                  reset();

                  setTimeout(() => {
                    formRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }, 0);
                }}
                className='rounded-md bg-emerald-700 px-4 py-2 text-xs font-medium text-white'
              >
                Add New
              </button>
            </div>
          </div>

          {/* =====================================================
                  FILTERS
              ===================================================== */}

          <div className='mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5'>
            {teaBrokerData.list.filters.map((filter) => (
              <div key={filter.name}>
                <label className='mb-2 block text-[10px] font-medium text-slate-600'>
                  {filter.label}
                </label>

                <select className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-emerald-500'>
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Filter Button */}
            <div className='flex items-end'>
              <button
                type='button'
                className='flex h-9 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-2 text-xs font-medium text-white hover:bg-emerald-800 lg:w-full'
              >
                ⚱ {teaBrokerData.list.buttons.filter}
              </button>
            </div>
          </div>

          {/* =====================================================
                  TABLE
              ===================================================== */}

          <div className='overflow-x-auto rounded-md border border-slate-100'>
            <table className='w-full min-w-[1100px] border-collapse'>
              {/* TABLE HEADER */}

              <thead>
                <tr className='bg-slate-50'>
                  {teaBrokerData.list.tableHeaders.map((header, index) => (
                    <th
                      key={header}
                      className='border-b border-slate-200 px-2 py-3 text-center text-[10px] font-semibold text-slate-600'
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* TABLE BODY */}

              <tbody>
                {teaBrokerData.list.positions.map((position, index) => (
                  <tr
                    key={position.id}
                    className='border-b border-slate-100 last:border-0 hover:bg-slate-50'
                  >
                    {/* SL */}

                    <td className='px-3 py-4 text-center text-[9px] text-slate-600'>
                      {index + 1}
                    </td>

                    {/* AUCTION CENTER */}

                    <td className='px-3 py-4 text-center text-[10px] font-medium text-slate-700'>
                      {position.auctionCenter}
                    </td>

                    {/* SALE NO */}

                    <td className='px-3 py-4 text-center text-[10px] font-medium text-slate-700'>
                      {position.saleNo}
                    </td>

                    {/* BROKERS */}

                    {position.brokers.map((broker, brokerIndex) => (
                      <td
                        key={`${position.id}-${brokerIndex}`}
                        className='max-w-[100px] px-2 py-4 text-center text-[10px] font-medium leading-3 text-slate-700'
                      >
                        {broker}
                      </td>
                    ))}

                    {/* ACTION */}

                    <td className='px-3 py-4'>
                      <div className='flex items-center justify-center gap-2'>
                        {/* Edit */}

                        <button
                          type='button'
                          className='flex h-7 w-7 items-center justify-center rounded-md border border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          title='Edit'
                        >
                          ✎
                        </button>

                        {/* Delete */}

                        <button
                          type='button'
                          className='flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50'
                          title='Delete'
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =====================================================
                  FOOTER / PAGINATION
              ===================================================== */}

          <div className='mt-4 flex flex-col gap-3 text-[10px] text-slate-500 sm:flex-row sm:items-center sm:justify-between'>
            <span>
              Showing 1 to {teaBrokerData.list.positions.length} of{" "}
              {teaBrokerData.list.positions.length} entries
            </span>

            <div className='flex items-center gap-1'>
              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50'
              >
                «
              </button>

              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50'
              >
                ‹
              </button>

              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-xs font-medium text-white'
              >
                1
              </button>

              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50'
              >
                ›
              </button>

              <button
                type='button'
                className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50'
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaBroker;
