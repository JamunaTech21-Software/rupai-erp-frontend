import React from "react";
import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";
import { replantingAndGapFillingData } from "../../data/PlantationManagementData/replantingAndGapFillingData";
const ReplantingAndGapFilling = () => {
  const { steps } = replantingAndGapFillingData;

  return (
    <div className='space-y-6'>
      <PlantationManagementTabs />

      {/* ================= Main Wrapper ================= */}
      <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        {/* ================= Step Header ================= */}
        <div className='mb-8 flex justify-center'>
          <div className='rounded-md bg-green-700 px-12 py-2 font-semibold text-white'>
            কাজের ধাপ (Step-by-Step Screens)
          </div>
        </div>

        {/* ================= Step Cards ================= */}
        {/* ================= Step Cards ================= */}
        <div className='grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 xl:grid-cols-4'>
          {steps.map((step) => (
            <section key={step.id}>
              {/* ================= Card ================= */}
              <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
                {/* Header */}
                <div className='mb-4 flex items-start gap-3'>
                  <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white'>
                    {step.stepNumber}
                  </div>

                  <div>
                    <h3 className='text-[22px] font-semibold leading-none text-green-800'>
                      {step.title}
                    </h3>

                    <p className='mt-1 text-center text-sm font-medium text-gray-500'>
                      ({step.subTitle})
                    </p>
                  </div>
                </div>

                {/* ================= Form Area ================= */}
                <div className='flex h-[250px] flex-col rounded-md border border-gray-200 bg-white'>
                  {/* Placeholder */}
                  <div className='flex-1'></div>

                  {/* Footer Button */}
                  <div className='flex justify-end border-t border-gray-100 p-3'>
                    <button
                      type='button'
                      className='rounded bg-green-700 px-4 py-1 text-xs font-medium text-white'
                    >
                      {step.buttonText}
                    </button>
                  </div>
                </div>
              </div>

              {/* ================= Notes ================= */}
              <div className='mt-3 px-2'>
                <ul className='space-y-1 text-sm text-gray-700'>
                  {step.notes.map((note, index) => (
                    <li key={index}>• {note}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        {/* ================= Database + User Flow ================= */}
        <div className='mt-12 grid grid-cols-12 gap-6'>
          {/* Left Side */}
          <section className='col-span-12 lg:col-span-7'>
            <div className='mb-6 flex justify-center'>
              <div className='rounded-md bg-green-700 px-10 py-2 font-semibold text-white'>
                Database Tables Overview
              </div>
            </div>

            {/* Database Area */}
          </section>

          {/* Right Side */}
          <section className='col-span-12 lg:col-span-5'>
            <div className='mb-6 flex justify-center'>
              <div className='rounded-md bg-green-700 px-10 py-2 font-semibold text-white'>
                User Role & Approval Flow
              </div>
            </div>

            {/* User Role Area */}

            <div className='mt-10 flex justify-center'>
              <div className='rounded-md bg-green-700 px-10 py-2 font-semibold text-white'>
                Final Output / Reports
              </div>
            </div>

            {/* Reports Area */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReplantingAndGapFilling;
