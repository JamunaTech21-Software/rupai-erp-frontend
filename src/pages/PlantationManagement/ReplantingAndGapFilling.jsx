import React from "react";
import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";
import { replantingAndGapFillingData } from "../../data/PlantationManagementData/replantingAndGapFillingData";
const ReplantingAndGapFilling = () => {
  const { steps, stepForms } = replantingAndGapFillingData;

  const renderStepBody = (step) => {
    switch (step.formKey) {
      case "projectInformation": {
        const { title, fields } = stepForms.projectInformation;

        return (
          <div className='space-y-2'>
            {/* Mini Form Title */}
            <h4 className='border-b border-gray-200 pb-1 text-[16px] font-semibold text-gray-700'>
              {title}
            </h4>

            {/* Form Preview */}
            <div className='space-y-1'>
              {fields.map((field) => (
                <div
                  key={field.id}
                  className='grid grid-cols-12 items-center gap-1'
                >
                  {/* Label */}
                  <label className='col-span-4 text-[12px] font-medium text-gray-700'>
                    {field.label}
                  </label>

                  {/* Preview Field */}
                  <div className='col-span-8'>
                    {/* Text */}
                    {field.type === "text" && (
                      <div className='h-5 rounded border border-gray-200 bg-white px-2 text-[12px] leading-5 text-gray-700'>
                        {field.value}
                      </div>
                    )}

                    {/* Select */}
                    {field.type === "select" && (
                      <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-2 text-[12px] text-gray-700'>
                        <span>{field.value}</span>
                        <span className='text-[10px] text-gray-500'>▼</span>
                      </div>
                    )}

                    {/* Date */}
                    {field.type === "date" && (
                      <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-2 text-[12px] text-gray-700'>
                        <span>{field.value}</span>
                        <span className='text-[10px]'>📅</span>
                      </div>
                    )}

                    {/* Textarea */}
                    {field.type === "textarea" && (
                      <div className='min-h-[32px] rounded border border-gray-200 bg-white px-2 py-1 text-[12px] text-gray-700'>
                        {field.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case "gapSurvey": {
        const { title, fields, columns, rows } = stepForms.gapSurvey;

        return (
          <div className='space-y-2'>
            {/* ================= Form Title ================= */}
            <h4 className='border-b border-gray-200 pb-1 text-[16px] font-semibold text-gray-700'>
              {title}
            </h4>

            {/* ================= Survey Information ================= */}
            <div className='space-y-1'>
              {fields.map((field) => (
                <div
                  key={field.id}
                  className='grid grid-cols-12 items-center gap-1'
                >
                  <label className='col-span-4 text-[12px] font-medium text-gray-700'>
                    {field.label}
                  </label>

                  <div className='col-span-8'>
                    {/* Text */}
                    {field.type === "text" && (
                      <div className='h-5 rounded border border-gray-200 bg-white px-2 text-[12px] leading-5 text-gray-700'>
                        {field.value}
                      </div>
                    )}

                    {/* Date */}
                    {field.type === "date" && (
                      <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-2 text-[12px] text-gray-700'>
                        <span>{field.value}</span>

                        <span className='text-[10px]'>📅</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ================= Mini Table ================= */}

            <div className='overflow-hidden rounded border border-gray-200'>
              <table className='w-full border-collapse text-[10px]'>
                <thead className='bg-gray-100'>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column}
                        className='border border-gray-200 px-1 py-1 text-center font-semibold'
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.slice(0, 3).map((row) => (
                    <tr key={row.id}>
                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.gapId}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.gapSize}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.plants}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.gapType}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center text-green-700'>
                        {row.action}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      case "landPreparation": {
        const { title, fields, columns, rows } = stepForms.landPreparation;

        return (
          <div className='space-y-2'>
            {/* ================= Mini Form Title ================= */}
            <h4 className='border-b border-gray-200 pb-1 text-[16px] font-semibold text-gray-700'>
              {title}
            </h4>

            {/* ================= Field / Block ================= */}
            <div className='grid grid-cols-12 items-center '>
              <label className='col-span-4 text-[12px] font-medium text-gray-700'>
                {fields[0].label}
              </label>

              <div className='col-span-8 h-5 rounded  text-[12px] leading-5 text-gray-700'>
                {fields[0].value}
              </div>
            </div>

            {/* ================= Activity Table ================= */}
            <div className='overflow-hidden rounded border border-gray-200'>
              <table className='w-full border-collapse text-[10px]'>
                <thead className='bg-gray-100'>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column}
                        className='border border-gray-200 px-1 py-1 text-center font-semibold'
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className='border border-gray-200 px-1 py-1'>
                        {row.activity}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.startDate}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.endDate}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium ${
                            row.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : row.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      case "materialPlanning": {
        const { title, columns, rows, summary } = stepForms.materialPlanning;

        return (
          <div className='space-y-2'>
            {/* Mini Title */}
            <h4 className='border-b border-gray-200 pb-1 text-[16px] font-semibold text-gray-700'>
              {title}
            </h4>

            {/* Material Table */}
            <div className='overflow-hidden rounded border border-gray-200'>
              <table className='w-full border-collapse text-[10px]'>
                <thead className='bg-gray-100'>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column}
                        className='border border-gray-200 px-1 py-1 text-center font-semibold'
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className='border border-gray-200 px-1 py-1'>
                        {row.material}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.unit}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.requiredQty}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.unitCost}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.totalCost}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className='border-t border-gray-300'>
                    <td
                      colSpan={4}
                      className='px-2 py-1 text-left text-[10px] font-semibold'
                    >
                      {summary.label}
                    </td>

                    <td className='px-2 py-1 text-right text-[10px] font-semibold'>
                      {summary.value}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        );
      }

      case "labourAllocation":
        return <></>;

      case "plantingExecution":
        return <></>;

      case "progressMonitoring":
        return <></>;

      case "approvalCompletion":
        return <></>;

      default:
        return null;
    }
  };
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
        <div className='grid grid-cols-1 gap-x-1 gap-y-6 md:grid-cols-2 xl:grid-cols-4'>
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

                    <p className='mt-1 text-center text-xl font-medium text-gray-500'>
                      ({step.subTitle})
                    </p>
                  </div>
                </div>

                {/* ================= Form Area ================= */}
                <div className='flex min-h-[380px] flex-col rounded-md border border-gray-200 bg-white'>
                  {/* Placeholder */}
                  <div className='flex-1 overflow-y-auto p-2'>
                    {renderStepBody(step)}
                  </div>

                  {/* Footer Button */}
                  <div className='flex justify-end border-t border-gray-100 p-3'>
                    <button
                      type='button'
                      className='rounded bg-green-900 cursor-pointer px-4 py-1 text-xs font-medium text-white'
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
