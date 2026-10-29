import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import { addNewWorkerData } from "../../data/HrWorkforceData/addNewWorkerData";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import ErrorState from "../../components/common/ErrorState";

import {
  UserRound,
  CreditCard,
  FileText,
  Upload,
  Info,
  RotateCcw,
  Save,
  CheckCircle,
} from "lucide-react";
import Select from "../../components/common/Select";
const S = addNewWorkerData.sections;
const FORM_SECTIONS = [S.basicInformation, S.employmentInformation, S.contactAddressInformation, S.distributedAgriLand, S.resonCard, S.additionalImportantInformation];
// Fields the form sends: not the file pickers, not the read-only ones the server fills in.
const SENT = FORM_SECTIONS.flatMap((section) => section.fields).filter((field) => !field.disabled && field.type !== "file");
const FILE_FIELDS = [
  "workerPhoto", "face", "rightThumb", "leftThumb", "resonCardFile",
  ...S.documentsInformation.documents.map((document) => document.name),
];
const DASH = "-";
const toLocalInput = () => "";
const dmy = (iso) => (iso ? iso.slice(0, 10).split("-").reverse().join("-") : DASH);
const blank = (value) => value ?? "";
const EMPTY_FORM = {
  ...Object.fromEntries(SENT.map((field) => [field.name, field.defaultValue ?? (field.type === "checkbox" ? false : "")])),
  workerId: "Auto Generate",
  createdBy: DASH, createdDate: "", updatedBy: DASH, updatedDate: "",
};
const toForm = (record) => ({
  ...Object.fromEntries(SENT.map((field) => [field.name, field.type === "checkbox" ? Boolean(record[field.name]) : blank(record[field.name])])),
  workerId: record.workerId ?? "Auto Generate",
  createdBy: record.createdByName ?? DASH,
  createdDate: record.createdAt ? record.createdAt.slice(0, 16) : toLocalInput(),
  updatedBy: record.updatedByName ?? DASH,
  updatedDate: record.updatedAt ? record.updatedAt.slice(0, 16) : toLocalInput(),
});

const AddNewWorker = () => {
  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: EMPTY_FORM,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  // After a save, return to the page the user came from (the dashboard when the page was opened directly).
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"));
  const photoInput = useRef(null);
  const importInput = useRef(null);
  const [importing, setImporting] = useState(false);
  const [importProblems, setImportProblems] = useState([]);

  // The worker being edited (?id=); without it the form adds a new one.
  const worker = useApi(() => (editId ? api.get(`/workers/${editId}`) : Promise.resolve(null)), [editId]);
  const saved = worker.data;
  // Picked files by field name, the two child tables, and messages for fields that are not inputs.
  const [files, setFiles] = useState({});
  const [landRows, setLandRows] = useState([]);
  const [dependentRows, setDependentRows] = useState([]);
  const [fileErrors, setFileErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  useEffect(() => {
    if (saved) {
      reset(toForm(saved));
      setLandRows(saved.landDetails ?? []);
      setDependentRows(saved.dependents ?? []);
    }
  }, [saved, reset]);
  const pickFile = (name) => (event) => {
    const file = event.target.files?.[0];
    setFiles((current) => ({ ...current, [name]: file }));
    setFileErrors((current) => ({ ...current, [name]: undefined }));
    if (name === "workerPhoto") setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  // CSV / Excel: download the template, upload a filled one. Nothing is saved unless every row is right.
  const downloadTemplate = async (format) => {
    try {
      const blob = await api.download("/workers/import/template", { format });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `workers-template.${format}`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const importFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setImporting(true);
    setImportProblems([]);
    try {
      const result = await api.postFile("/workers/import", file);
      toast.success(`${result?.imported ?? ""} workers saved`.trim());
    } catch (error) {
      const lines = Object.entries(error.fields ?? {}).map(([key, message]) => {
        const match = key.match(/^rows\.(\d+)\.(.+)$/);
        return match ? `Row ${match[1]} – ${match[2]}: ${message}` : `${key}: ${message}`;
      });
      setImportProblems(lines.length ? lines : [error.message]);
      toast.error(error.message);
    } finally {
      setImporting(false);
    }
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  // Each picked file is uploaded first; the record keeps its id (an unchanged file keeps the saved one).
  const onSubmit = async (values) => {
    try {
      const body = Object.fromEntries(SENT.map((field) => [field.name, values[field.name]]));
      for (const name of FILE_FIELDS) {
        body[name] = files[name] ? (await api.upload(files[name])).id : (saved?.[name] ?? null);
      }
      body.landDetails = landRows.map(({ plotBlockNo, mouza, area, distributedDate }) => ({ plotBlockNo, mouza, area, distributedDate }));
      body.dependents = dependentRows.map(({ name, relation, dateOfBirth, occupation }) => ({ name, relation, dateOfBirth, occupation }));
      if (editId) await api.put(`/workers/${editId}`, body);
      else await api.post("/workers", body);
      toast.success(editId ? "Worker updated successfully!" : "Worker saved successfully!");
      reset(EMPTY_FORM);
      goBack();
    } catch (error) {
      const fileProblems = {};
      for (const [key, message] of Object.entries(error.fields ?? {})) {
        if (FILE_FIELDS.includes(key)) fileProblems[key] = message;
        else setError(key, { message });
      }
      setFileErrors(fileProblems);
      toast.error(error.message);
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    reset(saved ? toForm(saved) : EMPTY_FORM);
    setFiles({});
    setFileErrors({});
    setPhotoPreview(null);
    setLandRows(saved?.landDetails ?? []);
    setDependentRows(saved?.dependents ?? []);
  };

  return (
    <div>
      {/* =====================================================
          HR WORKFORCE TABS
      ===================================================== */}

      <HrWorkforceTabs />
      {/* ===== CSV / EXCEL IMPORT ===== */}
      <div className='mb-2 rounded-xl border border-gray-200 bg-white p-3'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='mr-auto text-sm font-semibold text-green-700'>Import Workers (CSV / Excel)</h3>
          <button type='button' onClick={() => downloadTemplate("xlsx")} className='rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50'>
            Download Template (Excel)
          </button>
          <button type='button' onClick={() => downloadTemplate("csv")} className='rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50'>
            Download Template (CSV)
          </button>
          <input ref={importInput} type='file' accept='.csv,.xlsx' className='hidden' onChange={importFile} />
          <button type='button' disabled={importing} onClick={() => importInput.current?.click()} className='flex items-center gap-1.5 rounded-md bg-green-700 px-3 py-1.5 text-xs text-white hover:bg-green-800 disabled:opacity-60'>
            <Upload size={13} />
            {importing ? "Importing..." : "Import CSV / Excel"}
          </button>
        </div>
        {importProblems.length > 0 && (
          <ul role='alert' className='mt-2 max-h-40 list-disc space-y-0.5 overflow-auto rounded-md bg-red-50 p-2 pl-6 text-[11px] text-red-600'>
            {importProblems.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
      </div>
      {editId && worker.error && <ErrorState message={worker.error.message} onRetry={worker.reload} />}

      {/* =====================================================
          MAIN FORM
      ===================================================== */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className='grid grid-cols-1 xl:grid-cols-12 gap-2'>
            {/* =================================================
                LEFT SIDE - 6 COLUMNS
            ================================================= */}

            <div className='xl:col-span-6 space-y-3'>
              {/* ===============================================
                  1. BASIC INFORMATION
              =============================================== */}

              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Header */}
                <div className='flex items-center gap-2 mb-6'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.basicInformation.title}
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6'>
                  {addNewWorkerData.sections.basicInformation.fields.map(
                    (field) => {
                      const options = field.optionsKey
                        ? addNewWorkerData.dropdownOptions[field.optionsKey] ||
                          []
                        : field.options || [];

                      return (
                        <div key={field.name}>
                          {/* Label */}
                          <label
                            htmlFor={field.name}
                            className='block text-xs font-medium text-gray-700 mb-1'
                          >
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-1'>*</span>
                            )}
                          </label>

                          {/* Text / Tel / Email / Number */}
                          {["text", "tel", "email", "number"].includes(
                            field.type,
                          ) && (
                            <input
                              id={field.name}
                              type={field.type}
                              placeholder={field.placeholder || ""}
                              disabled={field.disabled || false}
                              min={field.min}
                              step={field.step}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* Date */}
                          {field.type === "date" && (
                            <input
                              id={field.name}
                              type='date'
                              disabled={field.disabled || false}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* Select */}
                          {field.type === "select" && (
                            <Select
                              id={field.name}
                              disabled={field.disabled || false}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            >
                              <option value=''>
                                {field.placeholder || "Select"}
                              </option>

                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                          )}

                          {/* Error */}
                          {errors[field.name] && (
                            <p className='mt-1 text-[11px] text-red-500'>
                              {errors[field.name].message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* =================================================
                      2. EMPLOYMENT INFORMATION
                  ================================================= */}

              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-5'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.employmentInformation.title}
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6'>
                  {addNewWorkerData.sections.employmentInformation.fields.map(
                    (field) => {
                      const options = field.optionsKey
                        ? addNewWorkerData.dropdownOptions[field.optionsKey] ||
                          []
                        : field.options || [];

                      return (
                        <div key={field.name}>
                          {/* Label */}
                          <label
                            htmlFor={field.name}
                            className='block text-xs font-medium text-gray-700 mb-3'
                          >
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-1'>*</span>
                            )}
                          </label>

                          {/* =================================================
                                TEXT / TEL / EMAIL / NUMBER
                            ================================================= */}

                          {["text", "tel", "email", "number"].includes(
                            field.type,
                          ) && (
                            <input
                              id={field.name}
                              type={field.type}
                              placeholder={field.placeholder || ""}
                              disabled={field.disabled || false}
                              min={field.min}
                              max={field.max}
                              step={field.step}
                              defaultValue={field.defaultValue ?? ""}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* =================================================
                                    DATE
                                ================================================= */}

                          {field.type === "date" && (
                            <input
                              id={field.name}
                              type='date'
                              disabled={field.disabled || false}
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* =================================================
                                  SELECT
                              ================================================= */}

                          {field.type === "select" && (
                            <Select
                              id={field.name}
                              disabled={field.disabled || false}
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            >
                              <option value=''>
                                {field.placeholder || "Select"}
                              </option>

                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                          )}

                          {/* =================================================
                                VALIDATION ERROR
                            ================================================= */}

                          {errors[field.name] && (
                            <p className='mt-1 text-[11px] text-red-500'>
                              {errors[field.name].message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                RIGHT SIDE - 6 COLUMNS
            ================================================= */}

            <div className='xl:col-span-6 space-y-3'>
              {/* ===============================================
                  CONTACT + PHOTO
              =============================================== */}

              <div className='grid grid-cols-1 lg:grid-cols-7 gap-2 items-stretch'>
                {/* =============================================
                    3. CONTACT & ADDRESS - 4 COLUMNS
                ============================================= */}

                <div className='lg:col-span-4'>
                  <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4 h-full'>
                    {/* Header */}
                    <div className='flex items-center gap-2 mb-4'>
                      <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                        <UserRound size={16} />
                      </div>

                      <h3 className='text-sm font-semibold text-green-700'>
                        {
                          addNewWorkerData.sections.contactAddressInformation
                            .title
                        }
                      </h3>
                    </div>

                    {/* Dynamic Contact Fields */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-4'>
                      {addNewWorkerData.sections.contactAddressInformation.fields.map(
                        (field) => {
                          const options = field.optionsKey
                            ? addNewWorkerData.dropdownOptions[
                                field.optionsKey
                              ] || []
                            : field.options || [];

                          return (
                            <div
                              key={field.name}
                              className={
                                field.type === "textarea"
                                  ? "sm:col-span-1 lg:col-span-3"
                                  : field.type === "checkbox"
                                    ? "sm:col-span-2 lg:col-span-6"
                                    : "sm:col-span-1 lg:col-span-2"
                              }
                            >
                              {/* Checkbox */}
                              {field.type === "checkbox" ? (
                                <label
                                  htmlFor={field.name}
                                  className='flex items-center gap-2 cursor-pointer'
                                >
                                  <input
                                    id={field.name}
                                    type='checkbox'
                                    {...register(field.name)}
                                    className='w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500'
                                  />

                                  <span className='text-xs font-medium text-gray-700'>
                                    {field.label}
                                  </span>
                                </label>
                              ) : (
                                <>
                                  {/* Label */}
                                  <label
                                    htmlFor={field.name}
                                    className='block text-xs font-medium text-gray-700 mb-1'
                                  >
                                    {field.label}

                                    {field.required && (
                                      <span className='text-red-500 ml-1'>
                                        *
                                      </span>
                                    )}
                                  </label>

                                  {/* Text / Tel / Email / Number */}
                                  {["text", "tel", "email", "number"].includes(
                                    field.type,
                                  ) && (
                                    <input
                                      id={field.name}
                                      type={field.type}
                                      placeholder={field.placeholder || ""}
                                      disabled={field.disabled || false}
                                      min={field.min}
                                      step={field.step}
                                      {...register(field.name, {
                                        required: field.required
                                          ? `${field.label} is required`
                                          : false,
                                      })}
                                      className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                        field.disabled
                                          ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                          : "bg-white text-gray-700"
                                      } ${
                                        errors[field.name]
                                          ? "border-red-500 focus:border-red-500"
                                          : "border-gray-300 focus:border-green-600"
                                      } focus:ring-1 focus:ring-green-100`}
                                    />
                                  )}

                                  {/* Textarea */}
                                  {field.type === "textarea" && (
                                    <textarea
                                      id={field.name}
                                      placeholder={field.placeholder || ""}
                                      disabled={field.disabled || false}
                                      {...register(field.name, {
                                        required: field.required
                                          ? `${field.label} is required`
                                          : false,
                                      })}
                                      className={`w-full min-h-[82px] resize-none rounded-md border px-3 py-2 text-xs outline-none transition ${
                                        field.disabled
                                          ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                          : "bg-white text-gray-700"
                                      } ${
                                        errors[field.name]
                                          ? "border-red-500 focus:border-red-500"
                                          : "border-gray-300 focus:border-green-600"
                                      } focus:ring-1 focus:ring-green-100`}
                                    />
                                  )}

                                  {/* Select */}
                                  {field.type === "select" && (
                                    <Select
                                      id={field.name}
                                      disabled={field.disabled || false}
                                      {...register(field.name, {
                                        required: field.required
                                          ? `${field.label} is required`
                                          : false,
                                      })}
                                      className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                        field.disabled
                                          ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                          : "bg-white text-gray-700"
                                      } ${
                                        errors[field.name]
                                          ? "border-red-500 focus:border-red-500"
                                          : "border-gray-300 focus:border-green-600"
                                      } focus:ring-1 focus:ring-green-100`}
                                    >
                                      <option value=''>
                                        {field.placeholder || "Select"}
                                      </option>

                                      {options.map((option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      ))}
                                    </Select>
                                  )}

                                  {/* Error */}
                                  {errors[field.name] && (
                                    <p className='mt-1 text-[11px] text-red-500'>
                                      {errors[field.name].message}
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>

                {/* =================================================
                    PHOTO & BIOMETRIC - 3 COLUMNS
                ================================================= */}

                <div className='lg:col-span-3'>
                  <div className='border border-gray-200 rounded-xl bg-white p-2 sm:p-4 h-full'>
                    {/* Section Header */}
                    <h3 className='text-sm font-semibold text-green-700 mb-4'>
                      {addNewWorkerData.sections.photoBiometric.title}
                    </h3>

                    {/* Photo + Biometric Layout */}
                    <div className='grid grid-cols-2 gap-2'>
                      {/* =============================================
                        WORKER PHOTO
                    ============================================= */}

                      <div className='flex flex-col items-center'>
                        <div className='w-full h-40 rounded-md border border-gray-200 overflow-hidden bg-gray-50'>
                          {photoPreview || saved?.workerPhotoUrl ? (
                            <img
                              src={photoPreview ?? saved.workerPhotoUrl}
                              alt='Worker'
                              className='w-full h-full object-cover'
                            />
                          ) : (
                            <div className='flex h-full w-full items-center justify-center text-xs text-gray-400'>
                              No photo
                            </div>
                          )}
                        </div>

                        <input
                          ref={photoInput}
                          type='file'
                          accept='.jpg,.jpeg,.png'
                          className='hidden'
                          onChange={pickFile("workerPhoto")}
                        />
                        <button
                          type='button'
                          onClick={() => photoInput.current?.click()}
                          className='w-full mt-10 bg-green-700 hover:bg-green-800 text-white rounded-md py-4 text-[12px] font-medium'
                        >
                          + Change Photo
                        </button>
                        {fileErrors.workerPhoto && <p className='mt-1 text-[11px] text-red-500'>{fileErrors.workerPhoto}</p>}
                      </div>

                      {/* =============================================
                              BIOMETRIC
                          ============================================= */}

                      <div className='space-y-6'>
                        {addNewWorkerData.sections.photoBiometric.biometric.map(
                          (biometric) => (
                            <div key={biometric.name}>
                              {/* Label */}
                              <label className='block text-[11px] font-medium text-gray-700 mb-2'>
                                {biometric.label}
                              </label>

                              {/* Capture Button */}
                              <button
                                type='button'
                                className='w-full h-9 border border-gray-300 rounded-md bg-white text-[11px] text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5'
                              >
                                <span className='text-gray-500'>◉</span>
                                Capture
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                      4. DISTRIBUTED AGRI LAND
                  ================================================= */}

              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.distributedAgriLand.title}
                  </h3>
                </div>

                {/* =================================================
                        TOP FORM FIELDS
                    ================================================= */}

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 mb-4'>
                  {addNewWorkerData.sections.distributedAgriLand.fields.map(
                    (field) => {
                      const options = field.optionsKey
                        ? addNewWorkerData.dropdownOptions[field.optionsKey] ||
                          []
                        : field.options || [];

                      return (
                        <div key={field.name}>
                          {/* Label */}
                          <label
                            htmlFor={field.name}
                            className='block text-xs font-medium text-gray-700 mb-1'
                          >
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-1'>*</span>
                            )}
                          </label>

                          {/* Number / Text */}
                          {["text", "number"].includes(field.type) && (
                            <input
                              id={field.name}
                              type={field.type}
                              placeholder={field.placeholder || ""}
                              min={field.min}
                              max={field.max}
                              step={field.step}
                              disabled={field.disabled || false}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            />
                          )}

                          {/* Select */}
                          {field.type === "select" && (
                            <Select
                              id={field.name}
                              disabled={field.disabled || false}
                              {...register(field.name, {
                                required: field.required
                                  ? `${field.label} is required`
                                  : false,
                              })}
                              className={`w-full h-9 rounded-md border px-3 text-xs outline-none transition ${
                                field.disabled
                                  ? "bg-gray-50 text-gray-500 cursor-not-allowed"
                                  : "bg-white text-gray-700"
                              } ${
                                errors[field.name]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-gray-300 focus:border-green-600"
                              } focus:ring-1 focus:ring-green-100`}
                            >
                              <option value=''>
                                {field.placeholder || "Select"}
                              </option>

                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                          )}

                          {/* Validation Error */}
                          {errors[field.name] && (
                            <p className='mt-1 text-[11px] text-red-500'>
                              {errors[field.name].message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>

                {/* =================================================
                        LAND DETAILS TITLE
                    ================================================= */}

                <div className='mb-2'>
                  <h4 className='text-xs font-semibold text-green-700'>
                    {addNewWorkerData.sections.distributedAgriLand.table.title}
                  </h4>
                </div>

                {/* =================================================
                          LAND DETAILS TABLE
                      ================================================= */}

                <div className='w-full overflow-x-auto'>
                  <table className='w-full min-w-[700px] text-xs border-collapse'>
                    {/* Table Header */}
                    <thead>
                      <tr className='bg-gray-50 border-y border-gray-200'>
                        {addNewWorkerData.sections.distributedAgriLand.table.headers.map(
                          (header) => (
                            <th
                              key={header.key}
                              className='px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap'
                            >
                              {header.label}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {landRows.map(
                        (row, rowIndex) => (
                          <tr
                            key={row.id ?? rowIndex}
                            className='border-b border-gray-100 hover:bg-gray-50'
                          >
                            {/* SL */}
                            <td className='px-3 py-2 text-gray-700'>
                              {rowIndex + 1}
                            </td>

                            {/* Plot / Block */}
                            <td className='px-3 py-2 text-gray-700 whitespace-nowrap'>
                              {row.plotBlockNo}
                            </td>

                            {/* Mouza */}
                            <td className='px-3 py-2 text-gray-700'>
                              {row.mouza}
                            </td>

                            {/* Area */}
                            <td className='px-3 py-2 text-gray-700'>
                              {row.area}
                            </td>

                            {/* Distributed Date */}
                            <td className='px-3 py-2 text-gray-700 whitespace-nowrap'>
                              {dmy(row.distributedDate)}
                            </td>

                            {/* Action */}
                            <td className='px-3 py-2'>
                              <div className='flex items-center gap-2'>
                                {/* Edit */}
                                <button
                                  type='button'
                                  title={
                                    addNewWorkerData.sections
                                      .distributedAgriLand.actions.editLabel
                                  }
                                  className='text-blue-500 hover:text-blue-700 text-xs'
                                >
                                  ✎
                                </button>

                                {/* Delete */}
                                <button
                                  type='button'
                                  title={
                                    addNewWorkerData.sections
                                      .distributedAgriLand.actions.deleteLabel
                                  }
                                  onClick={() => setLandRows((rows) => rows.filter((_, i) => i !== rowIndex))}
                                  className='text-red-500 hover:text-red-700 text-xs'
                                >
                                  🗑
                                </button>
                              </div>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>

                {/* =================================================
                        ADD MORE LAND BUTTON
                    ================================================= */}

                <div className='flex justify-center mt-3'>
                  <button
                    type='button'
                    className='border border-gray-300 rounded-md px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50'
                  >
                    +{" "}
                    {
                      addNewWorkerData.sections.distributedAgriLand.actions
                        .addLandLabel
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* =========================================================
                    5. DEPENDENT (FAMILY MEMBER)
                ========================================================= */}

            <div className='xl:col-span-5'>
              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-3 mb-4'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.dependentFamilyMember.title}
                  </h3>
                </div>

                {/* Table */}
                <div className='overflow-x-auto'>
                  <table className='w-full min-w-155 text-xs'>
                    {/* Table Header */}
                    <thead>
                      <tr className='border-b border-gray-200 bg-gray-50'>
                        {addNewWorkerData.sections.dependentFamilyMember.table.headers.map(
                          (header) => (
                            <th
                              key={header.key}
                              className='px-2 py-3 text-left font-semibold text-gray-600 whitespace-nowrap'
                            >
                              {header.label}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {dependentRows.map(
                        (row, rowIndex) => (
                          <tr
                            key={row.id ?? rowIndex}
                            className='border-b border-gray-100 last:border-b-0 hover:bg-gray-50'
                          >
                            {addNewWorkerData.sections.dependentFamilyMember.table.headers.map(
                              (header) => (
                                <td
                                  key={header.key}
                                  className='px-2 py-3 text-gray-700 whitespace-nowrap'
                                >
                                  {header.key === "action" ? (
                                    <div className='flex items-center gap-2'>
                                      {/* Edit */}
                                      <button
                                        type='button'
                                        title='Edit'
                                        className='text-blue-500 hover:text-blue-700 transition'
                                        onClick={() => {
                                        }}
                                      >
                                        ✎
                                      </button>

                                      {/* Delete */}
                                      <button
                                        type='button'
                                        title='Delete'
                                        className='text-red-500 hover:text-red-700 transition'
                                        onClick={() => setDependentRows((rows) => rows.filter((_, i) => i !== rowIndex))}
                                      >
                                        🗑
                                      </button>
                                    </div>
                                  ) : (
                                    header.key === "sl"
                                      ? rowIndex + 1
                                      : header.key === "dateOfBirth"
                                        ? dmy(row.dateOfBirth)
                                        : (row[header.key] ?? DASH)
                                  )}
                                </td>
                              ),
                            )}
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Add Dependent Button */}
                <button
                  type='button'
                  className='w-full mt-2 border border-gray-200 rounded-md py-2 text-xs font-medium text-green-700 hover:bg-green-50 transition'
                  onClick={() => {
                  }}
                >
                  +{" "}
                  {
                    addNewWorkerData.sections.dependentFamilyMember.actions
                      .addDependent.label
                  }
                </button>
              </div>
            </div>

            {/* =========================================================
                    6. RESON CARD
                ========================================================= */}

            <div className='xl:col-span-3'>
              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <CreditCard size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.resonCard.title}
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3'>
                  {addNewWorkerData.sections.resonCard.fields
                    .filter((field) => field.type !== "file")
                    .map((field) => (
                      <div key={field.name}>
                        {/* Label */}
                        <label
                          htmlFor={field.name}
                          className='block text-xs font-medium text-gray-700 mb-1'
                        >
                          {field.label}

                          {field.required && (
                            <span className='text-red-500 ml-1'>*</span>
                          )}
                        </label>

                        {/* Text */}
                        {field.type === "text" && (
                          <input
                            id={field.name}
                            type='text'
                            placeholder={field.placeholder || ""}
                            className='w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100'
                          />
                        )}

                        {/* Date */}
                        {field.type === "date" && (
                          <input
                            id={field.name}
                            type='date'
                            className='w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100'
                          />
                        )}
                      </div>
                    ))}
                </div>

                {/* Upload Reson Card */}
                {addNewWorkerData.sections.resonCard.fields
                  .filter((field) => field.type === "file")
                  .map((field) => (
                    <div key={field.name} className='mt-3'>
                      {/* Label */}
                      <label
                        htmlFor={field.name}
                        className='block text-xs font-medium text-gray-700 mb-1'
                      >
                        {field.label}

                        {field.required && (
                          <span className='text-red-500 ml-1'>*</span>
                        )}
                      </label>

                      {/* File Input */}
                      <label
                        htmlFor={field.name}
                        className='flex items-center gap-2 w-full h-9 rounded-md border border-gray-300 bg-white px-3 cursor-pointer hover:border-green-500 transition'
                      >
                        <span className='text-gray-500 text-sm'>📄</span>

                        <span className='text-xs text-gray-600 truncate'>
                          {files.resonCardFile?.name ?? (saved?.resonCardFileName || "Choose Reson Card")}
                        </span>
                        <input
                          id={field.name}
                          type='file'
                          accept={field.accept || ""}
                          className='hidden'
                          onChange={pickFile("resonCardFile")}
                        />
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            {/* =========================================================
                    7. ADDITIONAL IMPORTANT INFORMATION
                ========================================================= */}

            <div className='xl:col-span-4'>
              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-4'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <UserRound size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {
                      addNewWorkerData.sections.additionalImportantInformation
                        .title
                    }
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3'>
                  {addNewWorkerData.sections.additionalImportantInformation.fields.map(
                    (field) => {
                      const options = field.optionsKey
                        ? addNewWorkerData.dropdownOptions[field.optionsKey] ||
                          []
                        : field.options || [];

                      return (
                        <div key={field.name}>
                          {/* Label */}
                          <label
                            htmlFor={field.name}
                            className='block text-xs font-medium text-gray-700 mb-1'
                          >
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-1'>*</span>
                            )}
                          </label>

                          {/* Text / Tel / Number */}
                          {["text", "tel", "number"].includes(field.type) && (
                            <input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              placeholder={field.placeholder || ""}
                              min={field.min}
                              step={field.step}
                              className='w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100'
                            />
                          )}

                          {/* Select */}
                          {field.type === "select" && (
                            <Select
                              id={field.name}
                              name={field.name}
                              defaultValue=''
                              className='w-full h-9 rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100'
                            >
                              <option value=''>
                                {field.placeholder || "Select"}
                              </option>

                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            {/* =========================================================
                    8. DOCUMENTS INFORMATION
                ========================================================= */}

            <div className='xl:col-span-6'>
              <div className='border border-gray-200 rounded-xl bg-white p-3 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-2 mb-3'>
                  <div className='flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-700'>
                    <FileText size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.documentsInformation.title}
                  </h3>
                </div>

                {/* Upload Note */}
                <p className='text-[10px] text-gray-500 mb-3'>
                  {addNewWorkerData.sections.documentsInformation.uploadNote}
                </p>

                {/* Documents */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2'>
                  {addNewWorkerData.sections.documentsInformation.documents.map(
                    (document) => (
                      <div
                        key={document.id}
                        className='border border-gray-200 rounded-lg bg-white p-2'
                      >
                        {/* Document Label */}
                        <p className='text-[10px] font-medium text-gray-600 text-center mb-2 min-h-[28px] flex items-center justify-center'>
                          {document.label}
                        </p>

                        {/* Upload Area */}
                        <label
                          htmlFor={document.name}
                          className='flex flex-col items-center justify-center h-14 rounded-md border border-dashed border-gray-300 cursor-pointer hover:border-green-500 hover:bg-green-50/40 transition'
                        >
                          <Upload size={16} className='text-gray-400 mb-1' />

                          <span className='text-[10px] text-gray-500'>
                            Upload
                          </span>

                          <input
                            id={document.name}
                            name={document.name}
                            type='file'
                            accept={document.accept || ""}
                            className='hidden'
                            onChange={pickFile(document.name)}
                          />
                        </label>
                        {(files[document.name] || saved?.[`${document.name}Name`]) && (
                          <p className='mt-1 truncate text-center text-[9px] text-green-700'>
                            {files[document.name]?.name ?? saved[`${document.name}Name`]}
                          </p>
                        )}
                        {fileErrors[document.name] && (
                          <p className='mt-1 text-center text-[9px] text-red-500'>{fileErrors[document.name]}</p>
                        )}

                        {/* Required */}
                        {document.required && (
                          <p className='text-[9px] text-red-500 text-center mt-1'>
                            Required
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* =========================================================
                9. SYSTEM INFORMATION
            ========================================================= */}

            <div className='xl:col-span-6'>
              <div className='border border-gray-200 rounded-xl bg-white p-4 sm:p-4'>
                {/* Section Header */}
                <div className='flex items-center gap-3 mb-8'>
                  <div className='flex items-center justify-center w-7 h-8 rounded-md bg-green-50 text-green-700'>
                    <Info size={16} />
                  </div>

                  <h3 className='text-sm font-semibold text-green-700'>
                    {addNewWorkerData.sections.systemInformation.title}
                  </h3>
                </div>

                {/* Dynamic Fields */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4'>
                  {addNewWorkerData.sections.systemInformation.fields.map(
                    (field) => (
                      <div key={field.name}>
                        {/* Label */}
                        <label
                          htmlFor={field.name}
                          className='block text-xs font-medium text-gray-700 mb-2'
                        >
                          {field.label}

                          {field.required && (
                            <span className='text-red-500 ml-1'>*</span>
                          )}
                        </label>

                        {/* Text */}
                        {field.type === "text" && (
                          <input
                            id={field.name}
                            {...register(field.name)}
                            type='text'
                            placeholder={field.placeholder || ""}
                            disabled={field.disabled || false}
                            className='w-full h-9 rounded-md border border-gray-300 bg-gray-50 px-3 text-xs text-gray-600 outline-none cursor-not-allowed'
                          />
                        )}

                        {/* Date / Datetime */}
                        {["date", "datetime"].includes(field.type) && (
                          <input
                            id={field.name}
                            {...register(field.name)}
                            type={
                              field.type === "datetime"
                                ? "datetime-local"
                                : "date"
                            }
                            disabled={field.disabled || false}
                            className='w-full h-9 rounded-md border border-gray-300 bg-gray-50 px-3 text-xs text-gray-600 outline-none cursor-not-allowed'
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              BOTTOM ACTION BUTTONS
          ===================================================== */}

          <div className='flex flex-wrap justify-end gap-2'>
            {/* Reset */}
            <button
              type='button'
              onClick={handleReset}
              className='flex items-center justify-center gap-1.5 border border-gray-300 rounded-md px-5 py-2 text-xs hover:bg-gray-50 transition'
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            {/* Save as Draft */}
            <button
              type='button'
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className='flex items-center justify-center gap-1.5 border border-gray-300 rounded-md px-5 py-2 text-xs hover:bg-gray-50 transition disabled:opacity-60'
            >
              <Save size={14} />
              <span>Save as Draft</span>
            </button>

            {/* Save & Submit */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex items-center justify-center gap-1.5 bg-green-700 text-white rounded-md px-5 py-2 text-xs hover:bg-green-800 transition disabled:opacity-60'
            >
              <CheckCircle size={14} />
              <span>Save & Submit</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewWorker;
