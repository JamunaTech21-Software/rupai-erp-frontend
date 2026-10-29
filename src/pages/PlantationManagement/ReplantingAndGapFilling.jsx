import React from "react";
import { useSearchParams } from "react-router-dom";
import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";
import { replantingAndGapFillingData } from "../../data/PlantationManagementData/replantingAndGapFillingData";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import CardSkeleton from "../../components/common/CardSkeleton";
import ErrorState from "../../components/common/ErrorState";
import {
  User,
  UserCheck,
  ShieldCheck,
  Building2,
  ArrowRight,
  Check,
} from "lucide-react";

const DASH = "-";
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);
// 2026-05-10 -> 10/05/2026 (no timezone: the text is rearranged, not parsed as a date)
const dmy = (iso) => (iso ? iso.slice(0, 10).split("-").reverse().join("/") : DASH);
const commas = (value) => (value === null || value === undefined ? DASH : Number(value).toLocaleString("en-US"));

// The step cards keep their layout (titles, labels, columns); the values come from the project's saved steps.
const fill = (fields, values) => fields.map((field, index) => ({ ...field, value: orDash(values[index]) }));
function buildForms(sample, d) {
  const [s1, s2, s3, s4, s5, s6, s7, s8] = d;
  const block = s1?.fieldBlockName;
  return {
    projectInformation: {
      ...sample.projectInformation,
      fields: fill(sample.projectInformation.fields, [
        s1?.estateName, s1?.divisionName, s1?.sectionName, s1?.fieldBlockName, s1?.replantingType, s1?.season,
        dmy(s1?.surveyDate), dmy(s1?.targetDate), s1?.supervisor, s1?.remarks,
      ]),
    },
    gapSurvey: {
      ...sample.gapSurvey,
      fields: fill(sample.gapSurvey.fields, [block, dmy(s2?.gapSurveyDate), s2?.surveyBy]),
      rows: (s2?.rows ?? []).map((row) => ({ ...row, action: "View" })),
    },
    landPreparation: {
      ...sample.landPreparation,
      fields: fill(sample.landPreparation.fields, [block]),
      rows: (s3?.rows ?? []).map((row) => ({ ...row, startDate: dmy(row.startDate), endDate: dmy(row.endDate) })),
    },
    materialPlanning: {
      ...sample.materialPlanning,
      fields: fill(sample.materialPlanning.fields, [
        block, s4?.plantVariety, dmy(s4?.planningDate), s4?.store, s4?.preparedBy, s4?.materialRemarks,
      ]),
      rows: s4?.rows ?? [],
      summary: { label: sample.materialPlanning.summary.label, value: commas(s4?.summary?.value ?? (s4?.rows ?? []).reduce((sum, row) => sum + Number(row.totalCost ?? 0), 0)) },
    },
    labourAllocation: {
      ...sample.labourAllocation,
      fields: fill(sample.labourAllocation.fields, [s5?.labourSource, s5?.wageType]),
      rows: s5?.rows ?? [],
      summary: {
        label: sample.labourAllocation.summary.label,
        male: orDash(s5?.summary?.male),
        female: orDash(s5?.summary?.female),
        rate: "",
        value: commas(s5?.summary?.value),
      },
    },
    plantingExecution: {
      ...sample.plantingExecution,
      fields: fill(sample.plantingExecution.fields, [dmy(s6?.plantingDate), s6?.cloneVariety]),
      rows: s6?.rows ?? [],
      summary: { label: sample.plantingExecution.summary.label, value: commas(s6?.summary?.value) },
    },
    progressMonitoring: {
      ...sample.progressMonitoring,
      fields: fill(sample.progressMonitoring.fields, [block, dmy(s7?.tillDate)]),
      summaryCards: sample.progressMonitoring.summaryCards.map((card, index) => ({
        ...card,
        value: s7?.summary
          ? [
              Number(s7.summary.totalArea).toFixed(2),
              commas(s7.summary.totalPlants),
              commas(s7.summary.plantedPlants),
              `${s7.summary.progress}%`,
            ][index]
          : DASH,
      })),
      rows: (s7?.rows ?? []).map((row) => ({
        ...row,
        date: dmy(row.date),
        areaCompleted: row.areaCompleted == null ? DASH : Number(row.areaCompleted).toFixed(2),
        plantsPlanted: row.plantsPlanted == null ? DASH : String(row.plantsPlanted),
        survival: row.survival == null ? DASH : `${row.survival}%`,
        remarks: orDash(row.remarks),
      })),
    },
    approvalCompletion: {
      ...sample.approvalCompletion,
      rows: (s8?.rows ?? []).map((row) => ({
        ...row,
        date: dmy(row.date),
        designation: orDash(row.designation),
        signature: row.signature ? "✍" : "",
      })),
      completion: {
        ...sample.approvalCompletion.completion,
        fields: fill(sample.approvalCompletion.completion.fields, [
          dmy(s8?.completionDate),
          s8?.survival90Days == null ? DASH : `${s8.survival90Days}%`,
          s8?.completionRemarks,
        ]),
      },
    },
  };
}

const ReplantingAndGapFilling = () => {
  const { steps, stepForms: sampleForms, databaseTables, approvalFlow, reports } =
    replantingAndGapFillingData;
  const [searchParams] = useSearchParams();

  // The project shown: ?id=, else the one furthest along.
  const projects = useApi(() => api.get("/replanting-projects", { perPage: 50 }), []);
  const projectRows = projects.data?.data ?? [];
  const project =
    projectRows.find((row) => row.id === searchParams.get("id")) ??
    [...projectRows].sort((a, b) => (b.lastStep ?? 0) - (a.lastStep ?? 0))[0];
  const detail = useApi(
    () =>
      project
        ? Promise.all([1, 2, 3, 4, 5, 6, 7, 8].map((n) => api.get(`/replanting-projects/${project.id}/steps/${n}`)))
        : Promise.resolve(null),
    [project?.id],
  );
  const stepForms = buildForms(sampleForms, detail.data ?? []);
  const loading = projects.loading || (project && detail.loading && !detail.data);
  const failure = projects.error ?? detail.error;

  const approvalIconMap = {
    User: User,
    UserCheck: UserCheck,
    ShieldCheck: ShieldCheck,
    Building2: Building2,
  };

  const approvalColorMap = {
    green: "bg-green-600",
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    orange: "bg-orange-500",
  };
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

            <div className='overflow-x-auto rounded border border-gray-200'>
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
            <div className='overflow-x-auto  rounded border border-gray-200'>
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
            <div className='overflow-x-auto rounded border border-gray-200'>
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

      case "labourAllocation": {
        const { title, fields, columns, rows, summary } =
          stepForms.labourAllocation;

        return (
          <div className='space-y-2'>
            {/* ================= Mini Form Title ================= */}
            <h4 className='border-b border-gray-200 pb-1 text-[16px] font-semibold text-gray-700'>
              {title}
            </h4>

            {/* ================= Form Preview ================= */}
            <div className='space-y-1'>
              {fields.map((field) => (
                <div
                  key={field.id}
                  className='grid grid-cols-12 items-center gap-1'
                >
                  <label className='col-span-4 text-[12px] font-medium text-gray-700'>
                    {field.label}
                  </label>

                  <div className='col-span-8 flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-2 text-[12px] text-gray-700'>
                    <span>{field.value}</span>
                    <span className='text-[10px] text-gray-500'>▼</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= Labour Table ================= */}
            <div className='overflow-x-auto rounded border border-gray-200'>
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
                        {row.labourType}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.male}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.female}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.rate}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className='border-t border-gray-300 font-semibold'>
                    <td className='px-2 py-1'>{summary.label}</td>

                    <td className='text-center'>{summary.male}</td>

                    <td className='text-center'>{summary.female}</td>

                    <td></td>

                    <td className='text-right px-2'>{summary.value}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        );
      }

      case "plantingExecution": {
        const { title, fields, columns, rows, summary } =
          stepForms.plantingExecution;

        return (
          <div className='space-y-2'>
            {/* ================= Mini Form Title ================= */}
            <h4 className='border-b border-gray-200 pb-1 text-[16px] font-semibold text-gray-700'>
              {title}
            </h4>

            {/* ================= Form Preview ================= */}
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
                    {field.type === "date" && (
                      <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-2 text-[12px] text-gray-700'>
                        <span>{field.value}</span>
                        <span className='text-[10px]'>📅</span>
                      </div>
                    )}

                    {field.type === "select" && (
                      <div className='flex h-5 items-center justify-between rounded border border-gray-200 bg-white px-2 text-[12px] text-gray-700'>
                        <span>{field.value}</span>
                        <span className='text-[10px]'>▼</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ================= Table ================= */}
            <div className='overflow-x-auto rounded border border-gray-200'>
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
                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.rowNo}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.fromPlant}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.toPlant}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.plants}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.plantedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className='border-t border-gray-300 bg-gray-50 font-semibold'>
                    <td colSpan={4} className='px-2 py-1 text-left text-[10px]'>
                      {summary.label}
                    </td>

                    <td className='px-2 py-1 text-right text-[10px]'>
                      {summary.value}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        );
      }

      case "progressMonitoring": {
        const { title, fields, summaryCards, columns, rows } =
          stepForms.progressMonitoring;

        return (
          <div className='space-y-2'>
            {/* ================= Mini Form Title ================= */}
            <h4 className='border-b border-gray-200 pb-1 text-[16px] font-semibold text-gray-700'>
              {title}
            </h4>

            {/* ================= Form Preview ================= */}
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
                    {field.type === "text" && (
                      <div className='h-5 rounded border border-gray-200 bg-white px-2 text-[12px] leading-5 text-gray-700'>
                        {field.value}
                      </div>
                    )}

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

            {/* ================= Summary ================= */}
            <div className='grid grid-cols-4 gap-1'>
              {summaryCards.map((item) => (
                <div
                  key={item.id}
                  className='rounded border border-gray-200 p-1 text-center'
                >
                  <p className='text-[8px] text-gray-500'>{item.title}</p>

                  <p className='text-[10px] font-bold text-gray-800'>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* ================= Progress Table ================= */}
            <div className='overflow-x-auto  rounded border border-gray-200'>
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
                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.date}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.areaCompleted}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.plantsPlanted}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.survival}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.remarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      case "approvalCompletion": {
        const { title, columns, rows, completion } =
          stepForms.approvalCompletion;

        return (
          <div className='space-y-2'>
            {/* ================= Mini Form Title ================= */}
            <h4 className='border-b border-gray-200 pb-1 text-[16px] font-semibold text-gray-700'>
              {title}
            </h4>

            {/* ================= Approval Table ================= */}
            <div className='overflow-x-auto rounded border border-gray-200'>
              <table className='min-w-[520px] border-collapse text-[10px]'>
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
                        {row.level}
                      </td>

                      <td className='border border-gray-200 px-1 py-1'>
                        {row.name}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.designation}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium ${
                            row.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : row.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.date}
                      </td>

                      <td className='border border-gray-200 px-1 py-1 text-center'>
                        {row.signature}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================= Completion ================= */}
            <div className='border-t border-gray-200 pt-2'>
              <h5 className='mb-2 text-[11px] font-semibold text-gray-700'>
                {completion.title}
              </h5>

              {/* Horizontal Scroll */}
              <div className='overflow-x-auto'>
                <div className='min-w-[550px]'>
                  <div className='grid grid-cols-12 gap-2'>
                    {/* Left Side */}
                    <div className='col-span-5 space-y-2'>
                      <div className='grid grid-cols-12 items-center gap-1'>
                        <label className='col-span-6 text-[10px] font-medium text-gray-700'>
                          {completion.fields[0].label}
                        </label>

                        <div className='col-span-6 flex h-5 items-center rounded border border-gray-200 bg-white px-2 text-[10px]'>
                          {completion.fields[0].value}
                        </div>
                      </div>

                      <div className='grid grid-cols-12 items-center gap-1'>
                        <label className='col-span-6 text-[10px] font-medium text-gray-700'>
                          {completion.fields[1].label}
                        </label>

                        <div className='col-span-6 flex h-5 items-center rounded border border-gray-200 bg-white px-2 text-[10px]'>
                          {completion.fields[1].value}
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className='col-span-7'>
                      <label className='mb-1 block text-[10px] font-medium text-gray-700'>
                        {completion.fields[2].label}
                      </label>

                      <div className='min-h-[45px] rounded border border-gray-200 bg-white p-2 text-[10px] text-gray-700'>
                        {completion.fields[2].value}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };
  return (
    <div className='space-y-6'>
      <PlantationManagementTabs />

      {loading && <CardSkeleton count={4} />}
      {failure && (
        <ErrorState
          message={failure.message}
          onRetry={() => {
            projects.reload();
            detail.reload();
          }}
        />
      )}
      {!loading && !failure && !project && (
        <p className='rounded-xl border border-gray-200 bg-white p-4 text-center text-sm text-gray-500'>
          No replanting project yet
        </p>
      )}
      {project && (
        <p className='text-sm text-gray-600'>
          Project: <span className='font-semibold text-green-800'>{project.projectCode}</span> {project.projectName}
        </p>
      )}

      {/* ================= Main Wrapper ================= */}
      <div className='rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
        {/* ================= Step Header ================= */}
        <div className='mb-8 flex justify-center'>
          <div className='rounded-md bg-green-700 px-4 py-2 text-center font-semibold text-white sm:px-12'>
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
                    <h3 className='text-[16px] font-semibold leading-none text-green-800'>
                      {step.title}
                    </h3>

                    <p className='mt-1 text-center text-xl font-medium text-gray-500'>
                      ({step.subTitle})
                    </p>
                  </div>
                </div>

                {/* ================= Form Area ================= */}
                <div className='flex h-[400px] flex-col rounded-md border border-gray-200 bg-white'>
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
        <div className='mt-12 grid grid-cols-12 gap-x-1 gap-y-12'>
          {/* User Role & Approval Flow */}
          <section className='col-span-12'>
            <div className='mb-6 flex justify-center'>
              <div className='rounded-md bg-green-700 px-4 py-2 text-center font-semibold text-white sm:px-10'>
                User Role & Approval Flow
              </div>
            </div>

            <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
              <div className='overflow-x-auto'>
              <div className='flex min-w-[640px] items-start justify-between'>
                {approvalFlow.map((item, index) => {
                  const Icon = approvalIconMap[item.icon];

                  return (
                    <div key={item.id} className='flex flex-1 items-center'>
                      {/* Role */}
                      <div className='flex flex-col items-center text-center'>
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-full ${approvalColorMap[item.color]} text-white shadow-md`}
                        >
                          <Icon size={28} />
                        </div>

                        <h4 className='mt-2 text-xs font-semibold text-gray-800'>
                          {item.role}
                        </h4>

                        <ul className='mt-2 space-y-1 text-left text-[11px] text-gray-600'>
                          {item.tasks.map((task) => (
                            <li key={task}>• {task}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Arrow */}
                      {index < approvalFlow.length - 1 && (
                        <div className='mx-3'>
                          <ArrowRight size={22} className='text-green-700' />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              </div>
              {/* Reports Area */}
              <div className='mt-4 rounded-xl   bg-amber-50  p-1 shadow-sm'>
                <div className='mt-2 '>
                  <div className='rounded-md text-green-700  py-2 font-semibold '>
                    Final Output / Reports
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-x-2 gap-y-3  p-3 rounded-xl'>
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className='flex items-center gap-2 text-[12px] text-gray-700'
                    >
                      <Check
                        size={14}
                        className='shrink-0 text-green-600'
                        strokeWidth={3}
                      />

                      <span className='leading-5'>{report.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Database Tables Overview: under the User Role & Approval Flow */}
          <section className='col-span-12'>
            {/* Header */}
            <div className='mb-6 flex justify-center'>
              <div className='rounded-md bg-green-700 px-4 py-2 text-center font-semibold text-white sm:px-10'>
                Database Tables Overview
              </div>
            </div>

            {/* Database Area */}
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
              {databaseTables.map((table) => (
                <div
                  key={table.id}
                  className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md mb-4'
                >
                  {/* Card Header */}
                  <div className='bg-green-700 p-1  py-2'>
                    <h3 className='text-sm font-normal text-white'>
                      {table.title}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className='space-y-3 p-1'>
                    {/* Primary Key */}
                    <div>
                      <p className='mb-1 text-[11px] font-semibold text-gray-700'>
                        Primary Key
                      </p>

                      <div className='rounded border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] text-gray-700'>
                        {table.primaryKey}
                      </div>
                    </div>

                    {/* Foreign Key */}
                    {table.foreignKey && (
                      <div>
                        <p className='mb-1 text-[11px] font-semibold text-gray-700'>
                          Foreign Key
                        </p>

                        <div className='rounded border border-gray-200 bg-gray-50 px-2 py-1 text-[11px] text-gray-700'>
                          {table.foreignKey}
                        </div>
                      </div>
                    )}

                    {/* Fields */}
                    <div>
                      <p className='mb-2 text-[11px] font-semibold text-gray-700'>
                        Fields
                      </p>

                      <div className='rounded border border-gray-200 bg-gray-50 p-2'>
                        <ul className='space-y-1'>
                          {table.fields.map((field) => (
                            <li
                              key={field}
                              className='flex items-center gap-2 text-[11px] text-gray-700'
                            >
                              <span className='h-1.5 w-1.5 rounded-full bg-green-600'></span>
                              {field}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReplantingAndGapFilling;
