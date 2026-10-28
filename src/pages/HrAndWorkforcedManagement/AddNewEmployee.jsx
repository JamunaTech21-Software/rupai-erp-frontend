import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import { employeeManagementData } from "../../data/HrWorkforceData/addNewEmployeeData";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import ErrorState from "../../components/common/ErrorState";
import {
  MapPin,
  WalletCards,
  Files,
  CloudUpload,
  Settings2,
  ScanFace,
  Upload,
  Camera,
  Fingerprint,
  PhoneCall,
  UserRoundCheck,
  RotateCcw,
  Save,
  CheckCircle,
} from "lucide-react";

const SECTIONS = [
  "basicInformationFields",
  "employmentInformationFields",
  "contactInformationFields",
  "salaryPayrollFields",
  "emergencyContactFields",
  "nomineeInformationFields",
];
const ALL_FIELDS = SECTIONS.flatMap((key) => employeeManagementData[key]);
// Fields the form sends: not the file pickers, not the read-only ones the server fills in.
const SENT = ALL_FIELDS.filter((field) => !field.disabled && field.type !== "file" && field.type !== "capture");
const FILE_FIELDS = [...employeeManagementData.documentFields, ...employeeManagementData.photoBiometricFields]
  .filter((field) => field.type === "file")
  .map((field) => field.name);
const NEW_SYSTEM = { createdBy: "-", createdDate: "-", updatedBy: "-", updatedDate: "-" };
const stamp = (iso) => (iso ? new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "-");
const blank = (value) => value ?? "";
const toForm = (record) => ({
  ...Object.fromEntries(SENT.map((field) => [field.name, field.type === "checkbox" ? Boolean(record[field.name]) : blank(record[field.name])])),
  employeeId: record.employeeId ?? "Auto Generate",
  totalSalary: record.totalSalary ?? 0,
  createdBy: record.createdByName ?? "-",
  createdDate: stamp(record.createdAt),
  updatedBy: record.updatedByName ?? "-",
  updatedDate: stamp(record.updatedAt),
});
const EMPTY_FORM = {
  ...Object.fromEntries(SENT.map((field) => [field.name, field.defaultValue ?? (field.type === "checkbox" ? false : "")])),
  employeeId: "Auto Generate",
  totalSalary: 0,
  ...NEW_SYSTEM,
};

const AddNewEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  // After a save, return to the page the user came from (the dashboard when the page was opened directly).
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"));
  const [preview, setPreview] = useState(null);

  // The employee being edited (?id=); without it the form adds a new one.
  const employee = useApi(() => (editId ? api.get(`/employees/${editId}`) : Promise.resolve(null)), [editId]);
  const saved = employee.data;
  useEffect(() => {
    if (saved) reset(toForm(saved));
  }, [saved, reset]);

  const resetForm = () => {
    reset(saved ? toForm(saved) : EMPTY_FORM);
    setPreview(null);
  };

  // =========================
  // FORM SUBMIT
  // =========================
  // Each picked file is uploaded first; the record keeps its id (an unchanged file keeps the saved one).
  const onSubmit = async (values) => {
    try {
      const body = Object.fromEntries(SENT.map((field) => [field.name, values[field.name]]));
      for (const name of FILE_FIELDS) {
        const picked = values[name]?.[0];
        body[name] = picked ? (await api.upload(picked)).id : (saved?.[name] ?? null);
      }
      if (editId) await api.put(`/employees/${editId}`, body);
      else await api.post("/employees", body);
      toast.success(editId ? "Employee updated successfully!" : "Employee saved successfully!");
      reset(EMPTY_FORM);
      goBack();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };
  const onPhotoPicked = (event) => {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div>
      <HrWorkforceTabs />
      {editId && employee.error && <ErrorState message={employee.error.message} onRetry={employee.reload} />}

      {/* ========================= */}
      {/* MAIN FORM */}
      {/* ========================= */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-12 gap-2'>
          {/* ========================================= */}
          {/* LEFT MAIN CONTENT - 9 COLUMNS */}
          {/* ========================================= */}

          <div className='col-span-12 xl:col-span-9 space-y-2'>
            {/* ================= ROW 1 ================= */}

            <div className='grid grid-cols-12 gap-2'>
              {/* ================================= */}
              {/* 1. BASIC INFORMATION */}
              {/* ================================= */}

              <div className='col-span-12 lg:col-span-6  border border-gray-200 rounded-xl p-2 bg-white '>
                <h3 className='font-semibold text-green-700 mb-3'>
                  1. Basic Information
                </h3>

                {/* BASIC INFORMATION FIELDS */}

                <div className='grid grid-cols-12 gap-2'>
                  {employeeManagementData.basicInformationFields.map(
                    (field) => {
                      const options =
                        employeeManagementData[field.optionsKey] || [];

                      return (
                        <div
                          key={field.name}
                          className='col-span-12 md:col-span-4'
                        >
                          {/* LABEL */}

                          <label className='block text-xs font-medium text-gray-700 mb-1'>
                            {field.label}

                            {field.required && (
                              <span className='text-red-500'> *</span>
                            )}
                          </label>

                          {/* TEXT / DATE */}

                          {(field.type === "text" || field.type === "date") && (
                            <input
                              type={field.type}
                              defaultValue={field.defaultValue}
                              disabled={field.disabled}
                              placeholder={field.placeholder}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                            />
                          )}

                          {/* SELECT */}

                          {field.type === "select" && (
                            <select
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                            >
                              <option value=''>Select {field.label}</option>

                              {options.map((option) => (
                                <option key={option.id} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* ERROR */}

                          {errors?.[field.name] && (
                            <p className='text-red-500 text-[10px] mt-1'>
                              {errors[field.name]?.message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* ================================= */}
              {/* 2. EMPLOYMENT INFORMATION */}
              {/* ================================= */}

              <div className='col-span-12 lg:col-span-6 border border-gray-200 rounded-xl  bg-white p-2'>
                {/* HEADER */}
                <h3 className='font-semibold text-green-700 mb-3'>
                  2. Employment Information
                </h3>

                {/* FORM FIELDS */}
                <div className='grid grid-cols-12 gap-2'>
                  {employeeManagementData.employmentInformationFields.map(
                    (field) => {
                      const options =
                        employeeManagementData[field.optionsKey] || [];

                      return (
                        <div
                          key={field.name}
                          className='col-span-12 md:col-span-4'
                        >
                          {/* LABEL */}
                          <label className='block text-xs font-medium text-gray-700 mb-1'>
                            {field.label}

                            {field.required && (
                              <span className='text-red-500'> *</span>
                            )}
                          </label>

                          {/* TEXT / NUMBER / DATE */}
                          {(field.type === "text" ||
                            field.type === "number" ||
                            field.type === "date") && (
                            <input
                              type={field.type}
                              defaultValue={field.defaultValue}
                              placeholder={field.placeholder}
                              disabled={field.disabled}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                            />
                          )}

                          {/* SELECT */}
                          {field.type === "select" && (
                            <select
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                            >
                              <option value=''>Select {field.label}</option>

                              {options.map((option) => (
                                <option key={option.id} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* ERROR */}
                          {errors?.[field.name] && (
                            <p className='text-red-500 text-[10px] mt-1'>
                              {errors[field.name]?.message}
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </div>

            {/* ================= ROW 2 ================= */}

            <div className='grid grid-cols-12 gap-2'>
              {/* ================================= */}
              {/* 3. CONTACT & ADDRESS INFORMATION */}
              {/* ================================= */}

              <div className='col-span-12 lg:col-span-6 border border-gray-200 rounded-xl p-2.5 bg-white'>
                {/* ================= HEADER ================= */}
                <div className='flex items-center gap-2 mb-2.5'>
                  <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                    <MapPin size={13} />
                  </div>

                  <h3 className='font-semibold text-green-700 text-[12px]'>
                    3. Contact & Address Information
                  </h3>
                </div>

                {/* ================= FORM FIELDS ================= */}
                <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                  {employeeManagementData.contactInformationFields
                    .filter((field) => field.type !== "checkbox")
                    .map((field) => {
                      const options =
                        employeeManagementData[field.optionsKey] || [];

                      /* -----------------------------------------
                            FIELD WIDTH
                        ----------------------------------------- */
                      const fieldClass =
                        field.type === "textarea"
                          ? "col-span-12 md:col-span-6"
                          : "col-span-12 md:col-span-4";

                      return (
                        <div key={field.name} className={fieldClass}>
                          {/* LABEL */}

                          <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                            {field.label}

                            {field.required && (
                              <span className='text-red-500 ml-0.5'>*</span>
                            )}
                          </label>

                          {/* ================= INPUT ================= */}
                          {(field.type === "text" ||
                            field.type === "email" ||
                            field.type === "date" ||
                            field.type === "number") && (
                            <input
                              type={field.type}
                              defaultValue={field.defaultValue}
                              placeholder={field.placeholder}
                              disabled={field.disabled}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='
                              w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                            />
                          )}

                          {/* ================= SELECT ================= */}
                          {field.type === "select" && (
                            <select
                              defaultValue={field.defaultValue || ""}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className=' w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100
                          '
                            >
                              <option value=''>Select {field.label}</option>

                              {options.map((option) => (
                                <option key={option.id} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* ================= TEXTAREA ================= */}
                          {field.type === "textarea" && (
                            <textarea
                              rows={2}
                              placeholder={field.placeholder}
                              {...register(field.name, {
                                required: field.required ? "Required" : false,
                              })}
                              className='w-full h-[46px] border border-gray-300 rounded-md px-2.5 py-1.5 text-[10px] text-gray-700 bg-white resize-none outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100'
                            />
                          )}

                          {/* ================= ERROR ================= */}
                          {errors?.[field.name] && (
                            <p className='text-red-500 text-[8px] mt-0.5'>
                              {errors[field.name]?.message}
                            </p>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              {/* =====================================================
                  4. SALARY & PAYROLL INFORMATION
              ===================================================== */}

              <div className='col-span-12 lg:col-span-6 border border-gray-200 rounded-xl p-2.5 bg-white'>
                {/* ================= HEADER ================= */}
                <div className='flex items-center gap-2 mb-2.5'>
                  <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                    <WalletCards size={13} />
                  </div>

                  <h3 className='font-semibold text-green-700 text-[12px]'>
                    4. Salary & Payroll Information
                  </h3>
                </div>

                {/* ================= FORM FIELDS ================= */}
                <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                  {employeeManagementData.salaryPayrollFields.map((field) => {
                    const options =
                      employeeManagementData[field.optionsKey] || [];

                    return (
                      <div
                        key={field.name}
                        className={
                          field.type === "textarea"
                            ? "col-span-12"
                            : "col-span-12 md:col-span-4"
                        }
                      >
                        {/* ================= LABEL ================= */}
                        <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                          {field.label}

                          {field.required && (
                            <span className='text-red-500 ml-0.5'>*</span>
                          )}
                        </label>

                        {/* ================= INPUT ================= */}
                        {(field.type === "text" || field.type === "number") && (
                          <input
                            type={field.type}
                            defaultValue={field.defaultValue}
                            placeholder={field.placeholder}
                            disabled={field.disabled}
                            min={field.min}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                          />
                        )}

                        {/* ================= SELECT ================= */}
                        {field.type === "select" && (
                          <select
                            defaultValue={field.defaultValue || ""}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                          >
                            <option value=''>Select {field.label}</option>

                            {options.map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* ================= TEXTAREA ================= */}
                        {field.type === "textarea" && (
                          <textarea
                            rows={2}
                            placeholder={field.placeholder}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[46px] min-h-[46px] border border-gray-300 rounded-md px-2.5 py-1.5 text-[10px] text-gray-700 bg-white resize-none outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100'
                          />
                        )}

                        {/* ================= ERROR ================= */}
                        {errors?.[field.name] && (
                          <p className='text-red-500 text-[8px] mt-0.5'>
                            {errors[field.name]?.message}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ================= ROW 3 ================= */}

            <div className='grid grid-cols-12 gap-2'>
              {/* =====================================================
                  5. DOCUMENTS INFORMATION
              ===================================================== */}

              <div className='col-span-12 lg:col-span-8 border border-gray-200 rounded-xl p-2.5 bg-white'>
                {/* ================= HEADER ================= */}
                <div className='flex items-center gap-2 mb-2'>
                  <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                    <Files size={13} />
                  </div>

                  <h3 className='font-semibold text-green-700 text-[12px]'>
                    5. Documents Information
                  </h3>
                </div>

                {/* ================= SUB TITLE ================= */}
                <p className='text-[9px] font-medium text-gray-700 mb-2'>
                  Upload Documents (JPG / PNG / PDF)
                </p>

                {/* ================= DOCUMENT CARDS ================= */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2'>
                  {employeeManagementData.documentFields.map((field) => (
                    <div
                      key={field.name}
                      className='border border-gray-200 rounded-md h-[76px] flex flex-col items-center justify-center bg-white hover:border-green-300 transition-colors'
                    >
                      {/* DOCUMENT LABEL */}
                      <p className='text-[8px] font-medium text-gray-700 text-center leading-tight px-1 min-h-[22px] flex items-center justify-center'>
                        {field.label}
                      </p>

                      {/* FILE INPUT */}
                      <label className='flex flex-col items-center justify-center cursor-pointer mt-1'>
                        <input
                          type='file'
                          accept={field.accept}
                          {...register(field.name)}
                          className='hidden'
                        />

                        {/* UPLOAD ICON */}
                        <div className='flex items-center justify-center w-6 h-6 text-gray-500 hover:text-green-600 transition-colors'>
                          <CloudUpload size={17} strokeWidth={1.8} />
                        </div>

                        {/* UPLOAD TEXT */}
                        <span className='text-[8px] text-gray-600'>Upload</span>
                      </label>
                    </div>
                  ))}
                </div>

                {/* ================= NOTE ================= */}
                <p className='text-[8px] text-gray-500 mt-2'>
                  Note: Maximum file size 2MB for each file.
                </p>
              </div>

              {/* =====================================================
                  6. SYSTEM INFORMATION
              ===================================================== */}

              <div className='col-span-12 lg:col-span-4 border border-gray-200 rounded-xl p-2.5 bg-white'>
                {/* ================= HEADER ================= */}
                <div className='flex items-center gap-2 mb-2.5'>
                  <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                    <Settings2 size={13} />
                  </div>

                  <h3 className='font-semibold text-green-700 text-[12px]'>
                    6. System Information
                  </h3>
                </div>

                {/* ================= FORM FIELDS ================= */}
                <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                  {employeeManagementData.systemInformationFields.map(
                    (field) => (
                      <div
                        key={field.name}
                        className='col-span-12 md:col-span-6'
                      >
                        {/* ================= LABEL ================= */}
                        <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                          {field.label}
                        </label>

                        {/* ================= INPUT ================= */}
                        <input
                          type={field.type}
                          defaultValue={field.defaultValue}
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          {...register(field.name)}
                          className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-600 bg-gray-100 outline-none disabled:bg-gray-100 disabled:text-gray-500'
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* RIGHT SIDEBAR - 3 COLUMNS */}
          {/* ========================================= */}

          <div className='col-span-12 xl:col-span-3 space-y-2'>
            {/* =====================================================
                7. PHOTO & BIOMETRICS
            ===================================================== */}

            <div className='col-span-12 lg:col-span-5 border border-gray-200 rounded-xl p-2.5 bg-white'>
              {/* ================= HEADER ================= */}
              <div className='flex items-center gap-2 mb-2.5'>
                <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                  <ScanFace size={13} />
                </div>

                <h3 className='font-semibold text-green-700 text-[12px]'>
                  Photo & Biometrics
                </h3>
              </div>

              {/* ================= PHOTO & BIOMETRIC AREA ================= */}
              <div className='grid grid-cols-12 gap-2.5'>
                {/* =================================================
                    EMPLOYEE PHOTO
                ================================================= */}
                <div className='col-span-12 md:col-span-5 flex flex-col items-center'>
                  {/* PHOTO */}
                  <div className='w-[104px] h-[118px] border border-gray-300 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center'>
                    {preview || saved?.employeePhotoUrl ? (
                      <img
                        src={preview ?? saved.employeePhotoUrl}
                        alt='Employee'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <span className='text-[9px] text-gray-400'>No photo</span>
                    )}
                  </div>

                  {/* CHANGE PHOTO */}
                  <label className='mt-2 w-[104px] h-[30px] border border-gray-300 rounded-md flex items-center justify-center gap-1.5 cursor-pointer bg-white hover:border-green-500 hover:text-green-600 transition-colors'>
                    <input
                      type='file'
                      accept='.jpg,.jpeg,.png'
                      {...register("employeePhoto", { onChange: onPhotoPicked })}
                      className='hidden'
                    />

                    <Upload size={12} />

                    <span className='text-[9px] font-medium'>Change Photo</span>
                  </label>
                </div>

                {/* =================================================
                  BIOMETRIC ACTIONS
              ================================================= */}
                <div className='col-span-12 md:col-span-7 flex flex-col justify-between'>
                  {/* EMPLOYEE FACE */}
                  <div>
                    <label className='block text-[9px] font-medium text-gray-700 mb-1'>
                      Employee Face (For Attendance)
                    </label>

                    <button
                      type='button'
                      className='w-full h-[30px] border border-gray-300 rounded-md flex items-center justify-center gap-1.5 text-[9px] text-gray-700 bg-white hover:border-green-500 hover:text-green-600 transition-colors'
                    >
                      <Camera size={12} />
                      Capture Face
                    </button>
                  </div>

                  {/* RIGHT THUMB */}
                  <div className='mt-2'>
                    <label className='block text-[9px] font-medium text-gray-700 mb-1'>
                      Right Thumb Impression
                    </label>

                    <button
                      type='button'
                      className='w-full h-[30px] border border-gray-300 rounded-md flex items-center justify-center gap-1.5 text-[9px] text-gray-700 bg-white hover:border-green-500 hover:text-green-600 transition-colors'
                    >
                      <Fingerprint size={12} />
                      Capture
                    </button>
                  </div>

                  {/* LEFT THUMB */}
                  <div className='mt-2'>
                    <label className='block text-[9px] font-medium text-gray-700 mb-1'>
                      Left Thumb Impression
                    </label>

                    <button
                      type='button'
                      className='w-full h-[30px] border border-gray-300 rounded-md flex items-center justify-center gap-1.5 text-[9px] text-gray-700 bg-white hover:border-green-500 hover:text-green-600 transition-colors'
                    >
                      <Fingerprint size={12} />
                      Capture
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                8. EMERGENCY CONTACT
            ===================================================== */}

            <div className='col-span-12 lg:col-span-5 border border-gray-200 rounded-xl p-2.5 bg-white'>
              {/* ================= HEADER ================= */}
              <div className='flex items-center gap-2 mb-2.5'>
                <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                  <PhoneCall size={13} />
                </div>

                <h3 className='font-semibold text-green-700 text-[12px]'>
                  Emergency Contact
                </h3>
              </div>

              {/* ================= FORM FIELDS ================= */}
              <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                {employeeManagementData.emergencyContactFields.map((field) => {
                  const options =
                    employeeManagementData[field.optionsKey] || [];

                  return (
                    <div
                      key={field.name}
                      className={
                        field.type === "textarea"
                          ? "col-span-12"
                          : "col-span-12 md:col-span-6"
                      }
                    >
                      {/* ================= LABEL ================= */}
                      <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500 ml-0.5'>*</span>
                        )}
                      </label>

                      {/* ================= INPUT ================= */}
                      {(field.type === "text" ||
                        field.type === "email" ||
                        field.type === "date" ||
                        field.type === "number") && (
                        <input
                          type={field.type}
                          defaultValue={field.defaultValue}
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                        />
                      )}

                      {/* ================= SELECT ================= */}
                      {field.type === "select" && (
                        <select
                          defaultValue={field.defaultValue || ""}
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                        >
                          <option value=''>Select {field.label}</option>

                          {options.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* ================= TEXTAREA ================= */}
                      {field.type === "textarea" && (
                        <textarea
                          rows={2}
                          placeholder={field.placeholder}
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          className='w-full h-[46px] min-h-[46px] border border-gray-300 rounded-md px-2.5 py-1.5 text-[10px] text-gray-700 bg-white resize-none outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100'
                        />
                      )}

                      {/* ================= ERROR ================= */}
                      {errors?.[field.name] && (
                        <p className='text-red-500 text-[8px] mt-0.5'>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =====================================================
              9. NOMINEE INFORMATION
          ===================================================== */}

            <div className='col-span-12 lg:col-span-5 border border-gray-200 rounded-xl p-2.5 bg-white'>
              {/* ================= HEADER ================= */}
              <div className='flex items-center gap-2 mb-2.5'>
                <div className='flex items-center justify-center w-5 h-5 rounded-md bg-green-50 text-green-700'>
                  <UserRoundCheck size={13} />
                </div>

                <h3 className='font-semibold text-green-700 text-[12px]'>
                  Nominee Information{" "}
                  <span className='text-gray-600'>(For PF/Gratuity)</span>
                </h3>
              </div>

              {/* ================= FORM FIELDS ================= */}
              <div className='grid grid-cols-12 gap-x-2.5 gap-y-2'>
                {employeeManagementData.nomineeInformationFields.map(
                  (field) => {
                    const options =
                      employeeManagementData[field.optionsKey] || [];

                    return (
                      <div
                        key={field.name}
                        className={
                          field.type === "textarea"
                            ? "col-span-12"
                            : "col-span-12 md:col-span-6"
                        }
                      >
                        {/* ================= LABEL ================= */}
                        <label className='block text-[10px] font-medium text-gray-700 mb-1'>
                          {field.label}

                          {field.required && (
                            <span className='text-red-500 ml-0.5'>*</span>
                          )}
                        </label>

                        {/* ================= INPUT ================= */}
                        {(field.type === "text" ||
                          field.type === "email" ||
                          field.type === "date" ||
                          field.type === "number") && (
                          <input
                            type={field.type}
                            defaultValue={field.defaultValue}
                            placeholder={field.placeholder}
                            disabled={field.disabled}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-500'
                          />
                        )}

                        {/* ================= SELECT ================= */}
                        {field.type === "select" && (
                          <select
                            defaultValue={field.defaultValue || ""}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[34px] border border-gray-300 rounded-md px-2.5 text-[10px] text-gray-700 bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                          >
                            <option value=''>Select {field.label}</option>

                            {options.map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* ================= TEXTAREA ================= */}
                        {field.type === "textarea" && (
                          <textarea
                            rows={2}
                            placeholder={field.placeholder}
                            {...register(field.name, {
                              required: field.required ? "Required" : false,
                            })}
                            className='w-full h-[46px] min-h-[46px] border border-gray-300 rounded-md px-2.5 py-1.5 text-[10px] text-gray-700 bg-white resize-none outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-100'
                          />
                        )}

                        {/* ================= ERROR ================= */}
                        {errors?.[field.name] && (
                          <p className='text-red-500 text-[8px] mt-0.5'>
                            {errors[field.name]?.message}
                          </p>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* FORM ACTION BUTTONS */}
        {/* ========================================= */}

        <div className='flex justify-end gap-2 mt-3'>
          {/* RESET */}
          <button
            type='button'
            onClick={resetForm}
            className='flex items-center justify-center gap-1.5 border border-gray-300 rounded-md px-5 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors'
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          {/* SAVE AS DRAFT */}
          <button
            type='button'
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className='flex items-center justify-center gap-1.5 border border-gray-300 rounded-md px-5 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60'
          >
            <Save size={13} />
            <span>Save as Draft</span>
          </button>

          {/* SAVE & SUBMIT */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='flex items-center justify-center gap-1.5 bg-green-700 text-white rounded-md px-5 py-2 text-xs hover:bg-green-800 transition-colors disabled:opacity-60'
          >
            <CheckCircle size={13} />
            <span>Save & Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewEmployee;
