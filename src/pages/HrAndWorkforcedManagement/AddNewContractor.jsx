import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { contractorManagementData } from "../../data/HrWorkforceData/addNewContractorData";
import HrWorkforceTabs from "../../components/HrWorkforceTabs/HrWorkforceTabs";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import ErrorState from "../../components/common/ErrorState";

import {
  Upload,
  UserRound,
  Sprout,
  RotateCcw,
  FileText,
  CheckCircle,
} from "lucide-react";

const D = contractorManagementData;
const FORM_SECTIONS = [
  D.basicInformationFields,
  D.contactInformationFields,
  D.contactPersonInformationFields,
  D.businessRegistrationFields,
  D.contractInformationFields,
  D.bankingInformationFields,
  D.additionalInformationFields,
  D.emergencyContactFields,
];
// Fields the form sends: not the file pickers, not the read-only Contractor ID the server fills in.
const SENT = FORM_SECTIONS.flat().filter((field) => !field.disabled && field.type !== "file");
const FILE_FIELDS = [...D.contractorImageFields, ...D.documentFields].map((field) => field.name);
const blank = (value) => value ?? "";
const EMPTY_FORM = {
  ...Object.fromEntries(SENT.map((field) => [field.name, field.defaultValue ?? (field.type === "checkbox" ? false : "")])),
  sameAsPresent: false,
  contractorId: "Auto Generate",
};
const toForm = (record) => ({
  ...Object.fromEntries(SENT.map((field) => [field.name, blank(record[field.name])])),
  sameAsPresent: Boolean(record.sameAsPresent),
  contractorId: record.contractorId ?? "Auto Generate",
});

const AddNewContractor = () => {
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

  // The contractor being edited (?id=); without it the form adds a new one.
  const contractor = useApi(() => (editId ? api.get(`/contractors/${editId}`) : Promise.resolve(null)), [editId]);
  const saved = contractor.data;
  useEffect(() => {
    if (saved) reset(toForm(saved));
  }, [saved, reset]);

  // Each picked file is uploaded first; the record keeps its id (an unchanged file keeps the saved one).
  const onSubmit = async (values) => {
    try {
      const body = Object.fromEntries([...SENT.map((field) => [field.name, values[field.name]]), ["sameAsPresent", Boolean(values.sameAsPresent)]]);
      for (const name of FILE_FIELDS) {
        const picked = values[name]?.[0];
        body[name] = picked ? (await api.upload(picked)).id : (saved?.[name] ?? null);
      }
      if (editId) await api.put(`/contractors/${editId}`, body);
      else await api.post("/contractors", body);
      toast.success(editId ? "Contractor updated successfully!" : "Contractor information saved successfully!");
      reset(EMPTY_FORM);
      goBack();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };

  return (
    <div className='p-2 space-y-4'>
      {/* Tabs */}
      <HrWorkforceTabs />
      {editId && contractor.error && <ErrorState message={contractor.error.message} onRetry={contractor.reload} />}

      {/* FORM START */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ================= ROW 1 ================= */}
        <div className='grid grid-cols-12 gap-2'>
          {/* ===== LEFT SIDE (2 CARD SAME ROW) ===== */}
          <div className='col-span-12 xl:col-span-8 grid grid-cols-12 gap-2'>
            {/* BASIC INFO */}
            {/* ================= BASIC INFORMATION ================= */}
            <div className='col-span-12 lg:col-span-6 border rounded-xl p-4'>
              {/* HEADER */}
              <h3 className='font-semibold mb-4 text-green-700 flex items-center gap-2'>
                1. Basic Information
              </h3>

              {/* FORM FIELDS */}
              <div className='grid grid-cols-12 gap-3'>
                {contractorManagementData.basicInformationFields.map(
                  (field) => (
                    <div
                      key={field.name}
                      className={`col-span-12 ${
                        field.type === "textarea"
                          ? "md:col-span-12"
                          : field.colSpan || "md:col-span-4"
                      }`}
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
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                        >
                          <option value=''>Select {field.label}</option>

                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* TEXTAREA */}
                      {field.type === "textarea" && (
                        <textarea
                          rows='8'
                          placeholder={field.placeholder}
                          {...register(field.name, {
                            required: field.required ? "Required" : false,
                          })}
                          className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs resize-none outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                        />
                      )}

                      {/* ERROR */}
                      {errors?.[field.name] && (
                        <p className='text-red-500 text-[10px] mt-1'>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* CONTACT INFO */}
            {/* ================= CONTACT & ADDRESS INFORMATION ================= */}
            <div className='col-span-12 lg:col-span-6 border rounded-xl p-4'>
              {/* HEADER */}
              <h3 className='font-semibold mb-4 text-green-700 flex items-center gap-2'>
                2. Contact & Address Information
              </h3>

              {/* ================= CONTACT INFORMATION ================= */}
              <div className='grid grid-cols-12 gap-3'>
                {contractorManagementData.contactInformationFields
                  .filter(
                    (field) =>
                      field.name === "mobileNo" ||
                      field.name === "alternateMobile" ||
                      field.name === "email",
                  )
                  .map((field) => (
                    <div key={field.name} className='col-span-12 md:col-span-4'>
                      {/* LABEL */}
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      {/* INPUT */}
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      />

                      {/* ERROR */}
                      {errors?.[field.name] && (
                        <p className='text-red-500 text-[10px] mt-1'>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ))}
              </div>

              {/* ================= PRESENT ADDRESS ================= */}
              <div className='mt-4'>
                <h4 className='text-xs font-semibold text-gray-700 mb-2'>
                  Present Address
                </h4>

                <div className='grid grid-cols-12 gap-3'>
                  {/* ADDRESS */}
                  <div className='col-span-12 md:col-span-6'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Address
                      <span className='text-red-500'> *</span>
                    </label>

                    <textarea
                      rows='2'
                      placeholder='Enter Present Address'
                      {...register("presentAddress", {
                        required: "Required",
                      })}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs resize-none outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    />

                    {errors?.presentAddress && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors.presentAddress.message}
                      </p>
                    )}
                  </div>

                  {/* DISTRICT */}
                  <div className='col-span-12 md:col-span-3'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      District
                      <span className='text-red-500'> *</span>
                    </label>

                    <select
                      {...register("presentDistrict", {
                        required: "Required",
                      })}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    >
                      <option value=''>Select District</option>

                      {contractorManagementData.districtOptions.map(
                        (option) => (
                          <option key={option.id} value={option.value}>
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>

                    {errors?.presentDistrict && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors.presentDistrict.message}
                      </p>
                    )}
                  </div>

                  {/* UPAZILA */}
                  <div className='col-span-12 md:col-span-3'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Upazila
                      <span className='text-red-500'> *</span>
                    </label>

                    <select
                      {...register("presentUpazila", {
                        required: "Required",
                      })}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    >
                      <option value=''>Select Upazila</option>

                      {contractorManagementData.contactInformationFields
                        .find((field) => field.name === "presentUpazila")
                        ?.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>

                    {errors?.presentUpazila && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors.presentUpazila.message}
                      </p>
                    )}
                  </div>

                  {/* POSTAL CODE */}
                  <div className='col-span-12 md:col-span-4'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Postal Code
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Postal Code'
                      {...register("presentPostalCode")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    />
                  </div>
                </div>
              </div>

              {/* ================= SAME ADDRESS ================= */}
              <div className='flex items-center gap-2 mt-3'>
                <input
                  type='checkbox'
                  {...register("sameAsPresent")}
                  className='w-3.5 h-3.5 accent-green-600'
                />

                <label className='text-xs text-gray-600'>
                  Same as Present Address
                </label>
              </div>

              {/* ================= PERMANENT ADDRESS ================= */}
              <div className='mt-4'>
                <h4 className='text-xs font-semibold text-gray-700 mb-2'>
                  Permanent Address
                </h4>

                <div className='grid grid-cols-12 gap-3'>
                  {/* ADDRESS */}
                  <div className='col-span-12 md:col-span-6'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Address
                    </label>

                    <textarea
                      rows='2'
                      placeholder='Enter Permanent Address'
                      {...register("permanentAddress")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs resize-none outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    />
                  </div>

                  {/* DISTRICT */}
                  <div className='col-span-12 md:col-span-3'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      District
                    </label>

                    <select
                      {...register("permanentDistrict")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    >
                      <option value=''>Select District</option>

                      {contractorManagementData.districtOptions.map(
                        (option) => (
                          <option key={option.id} value={option.value}>
                            {option.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {/* UPAZILA */}
                  <div className='col-span-12 md:col-span-3'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Upazila
                    </label>

                    <select
                      {...register("permanentUpazila")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    >
                      <option value=''>Select Upazila</option>

                      {contractorManagementData.contactInformationFields
                        .find((field) => field.name === "permanentUpazila")
                        ?.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* POSTAL CODE */}
                  <div className='col-span-12 md:col-span-4'>
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      Postal Code
                    </label>

                    <input
                      type='text'
                      placeholder='Enter Postal Code'
                      {...register("permanentPostalCode")}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT SIDE ===== */}
          <div className='col-span-12 xl:col-span-4 space-y-4'>
            {/* IMAGE */}
            {/* ================= IMAGE & LOGO ================= */}
            <div className='border rounded-xl p-4'>
              {/* HEADER */}
              <h3 className='font-semibold mb-4 text-green-700 flex items-center gap-2'>
                3. Contractor Image & Logo
              </h3>

              {/* IMAGE / LOGO GRID */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {contractorManagementData.contractorImageFields.map(
                  (field) => (
                    <div key={field.name} className='min-w-0'>
                      {/* LABEL */}
                      <label className='block text-xs font-medium text-gray-700 text-center mb-2'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      {/* UPLOAD BOX */}
                      <div className='border border-gray-300 rounded-lg p-3'>
                        {/* PREVIEW AREA */}
                        <div className='h-24 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center'>
                          {saved?.[`${field.name}Url`] ? (
                            <img
                              src={saved[`${field.name}Url`]}
                              alt={field.label}
                              className='h-full w-full rounded-md object-contain'
                            />
                          ) : field.name === "contractorPhoto" ? (
                            <UserRound
                              size={42}
                              strokeWidth={1.5}
                              className='text-green-600'
                            />
                          ) : (
                            <Sprout
                              size={48}
                              strokeWidth={1.5}
                              className='text-green-600'
                            />
                          )}
                        </div>

                        {/* FILE INPUT */}
                        <label className='mt-3 flex items-center justify-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition'>
                          <Upload size={14} />

                          {field.buttonText}

                          <input
                            type='file'
                            accept={field.accept}
                            {...register(field.name)}
                            className='hidden'
                          />
                        </label>

                        {/* NOTE */}
                        <p className='text-[10px] text-gray-500 text-center mt-2'>
                          {field.note}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* CONTACT PERSON */}
            {/* ================= CONTACT PERSON ================= */}
            {/* ================= CONTACT PERSON / PROPRIETOR ================= */}
            <div className='border rounded-xl p-4'>
              {/* HEADER */}
              <h3 className='font-semibold mb-4 text-green-700 flex items-center gap-2'>
                4. Contact Person / Proprietor Information
              </h3>

              {/* FORM FIELDS */}
              <div className='grid grid-cols-12 gap-3'>
                {contractorManagementData.contactPersonInformationFields.map(
                  (field) => (
                    <div key={field.name} className='col-span-12 md:col-span-6'>
                      {/* LABEL */}
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        {field.label}

                        {field.required && (
                          <span className='text-red-500'> *</span>
                        )}
                      </label>

                      {/* INPUT */}
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      />

                      {/* ERROR */}
                      {errors?.[field.name] && (
                        <p className='text-red-500 text-[10px] mt-1'>
                          {errors[field.name]?.message}
                        </p>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= ROW 2 ================= */}
        <div className='grid grid-cols-12 gap-2 mt-4'>
          {/* ================= BUSINESS / REGISTRATION INFO ================= */}
          <div className='col-span-12 xl:col-span-4 border rounded-xl p-2'>
            {/* HEADER */}
            <h3 className='font-semibold mb-4 text-green-700 flex items-center gap-2'>
              5. Business / Registration Information
            </h3>

            {/* FORM FIELDS */}
            <div className='grid grid-cols-12 gap-3'>
              {contractorManagementData.businessRegistrationFields.map(
                (field) => (
                  <div key={field.name} className='col-span-12 md:col-span-4'>
                    {/* LABEL */}
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      {field.label}

                      {field.required && (
                        <span className='text-red-500'> *</span>
                      )}
                    </label>

                    {/* INPUT */}
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...register(field.name, {
                        required: field.required ? "Required" : false,
                      })}
                      className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                    />

                    {/* ERROR */}
                    {errors?.[field.name] && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* ================= CONTRACT INFORMATION ================= */}
          <div className='col-span-12 xl:col-span-4 border rounded-xl p-2'>
            {/* HEADER */}
            <h3 className='font-semibold mb-4 text-green-700 flex items-center gap-2'>
              6. Contract Information
            </h3>

            {/* FORM FIELDS */}
            <div className='grid grid-cols-12 gap-2'>
              {contractorManagementData.contractInformationFields?.map(
                (field) => (
                  <div key={field.name} className='col-span-12 md:col-span-4'>
                    {/* LABEL */}
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      {field.label}

                      {field.required && (
                        <span className='text-red-500'> *</span>
                      )}
                    </label>

                    {/* TEXT / DATE / NUMBER */}
                    {(field.type === "text" ||
                      field.type === "date" ||
                      field.type === "number") && (
                      <input
                        type={field.type}
                        defaultValue={field.defaultValue}
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      />
                    )}

                    {/* SELECT */}
                    {field.type === "select" && (
                      <select
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      >
                        <option value=''>Select {field.label}</option>

                        {field.optionsKey &&
                          contractorManagementData[field.optionsKey]?.map(
                            (option) => (
                              <option key={option.id} value={option.value}>
                                {option.label}
                              </option>
                            ),
                          )}
                      </select>
                    )}

                    {/* ERROR */}
                    {errors?.[field.name] && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* ================= BANKING INFORMATION ================= */}
          <div className='col-span-12 xl:col-span-4 border rounded-xl p-2'>
            {/* HEADER */}
            <h3 className='font-semibold mb-3 text-green-700 flex items-center gap-2'>
              7. Banking Information
            </h3>

            {/* FORM FIELDS */}
            <div className='grid grid-cols-12 gap-2'>
              {contractorManagementData.bankingInformationFields.map(
                (field) => (
                  <div key={field.name} className='col-span-12 md:col-span-6'>
                    {/* LABEL */}
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      {field.label}

                      {field.required && (
                        <span className='text-red-500'> *</span>
                      )}
                    </label>

                    {/* TEXT / NUMBER */}
                    {(field.type === "text" || field.type === "number") && (
                      <input
                        type={field.type}
                        defaultValue={field.defaultValue}
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      />
                    )}

                    {/* SELECT */}
                    {field.type === "select" && (
                      <select
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      >
                        <option value=''>Select {field.label}</option>

                        {contractorManagementData[field.optionsKey]?.map(
                          (option) => (
                            <option key={option.id} value={option.value}>
                              {option.label}
                            </option>
                          ),
                        )}
                      </select>
                    )}

                    {/* ERROR */}
                    {errors?.[field.name] && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* ================= ROW 3 ================= */}
        <div className='grid grid-cols-12 gap-2 mt-4'>
          {/* ================= DOCUMENTS & FILES ================= */}
          <div className='col-span-12 xl:col-span-4 border rounded-xl p-2'>
            {/* HEADER */}
            <h3 className='font-semibold mb-3 text-green-700 flex items-center gap-2'>
              8. Documents & Files
            </h3>

            {/* DOCUMENT GRID */}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-2'>
              {contractorManagementData.documentFields.map((field) => (
                <div
                  key={field.name}
                  className='border border-gray-200 rounded-md p-2 flex flex-col items-center justify-center text-center min-h-[72px]'
                >
                  {/* DOCUMENT NAME */}
                  <p className='text-[9px] font-medium text-gray-700 mb-2 leading-tight'>
                    {field.label}
                  </p>

                  {/* UPLOAD */}
                  <label
                    htmlFor={field.name}
                    className='cursor-pointer flex flex-col items-center justify-center'
                  >
                    <Upload size={14} className='text-gray-500 mb-1' />

                    <span className='text-[9px] text-gray-600'>Upload</span>
                  </label>

                  {/* FILE INPUT */}
                  <input
                    id={field.name}
                    type='file'
                    accept={field.accept}
                    className='hidden'
                    {...register(field.name, {
                      validate: (files) => {
                        if (!files || files.length === 0) {
                          return true;
                        }

                        const file = files[0];

                        const maxSize = field.maxSize * 1024 * 1024;

                        if (file.size > maxSize) {
                          return `Maximum file size is ${field.maxSize}MB`;
                        }

                        return true;
                      },
                    })}
                  />

                  {/* ERROR */}
                  {errors?.[field.name] && (
                    <p className='text-red-500 text-[8px] mt-1'>
                      {errors[field.name]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* NOTE */}
            <p className='text-[9px] text-gray-500 mt-3'>
              Note: {contractorManagementData.documentUploadNote}
            </p>
          </div>

          {/* ================= ADDITIONAL IMPORTANT INFORMATION ================= */}
          <div className='col-span-12 xl:col-span-4 border rounded-xl p-2'>
            {/* HEADER */}
            <h3 className='font-semibold mb-3 text-green-700'>
              9. Additional Important Information
            </h3>

            {/* FORM FIELDS */}
            <div className='grid grid-cols-12 gap-2'>
              {contractorManagementData.additionalInformationFields.map(
                (field, index) => (
                  <div
                    key={field.name}
                    className={`
            col-span-12
            ${
              index === 0
                ? "md:col-span-4"
                : index === 1
                  ? "md:col-span-5"
                  : index === 2
                    ? "md:col-span-3"
                    : index === 3
                      ? "md:col-span-6"
                      : index === 4
                        ? "md:col-span-6"
                        : "md:col-span-12"
            }
          `}
                  >
                    <label className='block text-xs font-medium text-gray-700 mb-1'>
                      {field.label}

                      {field.required && (
                        <span className='text-red-500'> *</span>
                      )}
                    </label>

                    {/* TEXT / NUMBER */}
                    {(field.type === "text" || field.type === "number") && (
                      <input
                        type={field.type}
                        defaultValue={field.defaultValue}
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      />
                    )}

                    {/* SELECT */}
                    {field.type === "select" && (
                      <select
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      >
                        <option value=''>Select {field.label}</option>

                        {contractorManagementData[field.optionsKey]?.map(
                          (option) => (
                            <option key={option.id} value={option.value}>
                              {option.label}
                            </option>
                          ),
                        )}
                      </select>
                    )}

                    {/* TEXTAREA */}
                    {field.type === "textarea" && (
                      <textarea
                        rows='2'
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          required: field.required ? "Required" : false,
                        })}
                        className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs resize-none outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                      />
                    )}

                    {/* ERROR */}
                    {errors?.[field.name] && (
                      <p className='text-red-500 text-[10px] mt-1'>
                        {errors[field.name]?.message}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* ================= EMERGENCY CONTACT ================= */}
          <div className='col-span-12 xl:col-span-4 border rounded-xl p-2'>
            {/* HEADER */}
            <h3 className='font-semibold mb-3 text-green-700 flex items-center gap-2'>
              10. Emergency Contact
            </h3>

            {/* FORM FIELDS */}
            <div className='grid grid-cols-12 gap-2'>
              {/* Emergency Contact Name */}
              <div className='col-span-12 md:col-span-6'>
                <label className='block text-xs font-medium text-gray-700 mb-1'>
                  Emergency Contact Name
                  <span className='text-red-500'> *</span>
                </label>

                <input
                  type='text'
                  placeholder='Enter Name'
                  {...register("emergencyContactName", {
                    required: "Required",
                  })}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                />

                {errors?.emergencyContactName && (
                  <p className='text-red-500 text-[10px] mt-1'>
                    {errors.emergencyContactName.message}
                  </p>
                )}
              </div>

              {/* Relation */}
              <div className='col-span-12 md:col-span-6'>
                <label className='block text-xs font-medium text-gray-700 mb-1'>
                  Relation
                  <span className='text-red-500'> *</span>
                </label>

                <select
                  {...register("emergencyRelation", {
                    required: "Required",
                  })}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs bg-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                >
                  <option value=''>Select Relation</option>

                  {contractorManagementData.relationOptions?.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {errors?.emergencyRelation && (
                  <p className='text-red-500 text-[10px] mt-1'>
                    {errors.emergencyRelation.message}
                  </p>
                )}
              </div>

              {/* Mobile No. */}
              <div className='col-span-12 md:col-span-6'>
                <label className='block text-xs font-medium text-gray-700 mb-1'>
                  Mobile No.
                  <span className='text-red-500'> *</span>
                </label>

                <input
                  type='text'
                  placeholder='01XXXXXXXXX'
                  {...register("emergencyMobile", {
                    required: "Required",
                  })}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                />

                {errors?.emergencyMobile && (
                  <p className='text-red-500 text-[10px] mt-1'>
                    {errors.emergencyMobile.message}
                  </p>
                )}
              </div>

              {/* Alternate Mobile */}
              <div className='col-span-12 md:col-span-6'>
                <label className='block text-xs font-medium text-gray-700 mb-1'>
                  Alternate Mobile
                </label>

                <input
                  type='text'
                  placeholder='01XXXXXXXXX'
                  {...register("emergencyAlternateMobile")}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                />
              </div>

              {/* Address */}
              <div className='col-span-12'>
                <label className='block text-xs font-medium text-gray-700 mb-1'>
                  Address
                </label>

                <textarea
                  rows='2'
                  placeholder='Enter Address'
                  {...register("emergencyAddress")}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 text-xs resize-none outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100'
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= FORM ACTIONS ================= */}
        <div className='border-t border-gray-200 mt-3 pt-2'>
          <div className='flex flex-wrap items-center justify-end gap-2'>
            {/* RESET */}
            <button
              type='button'
              onClick={() => reset(saved ? toForm(saved) : EMPTY_FORM)}
              className='flex items-center cursor-pointer justify-center gap-1.5 border border-gray-300 bg-white text-gray-700 rounded-md px-4 py-2 text-xs font-medium hover:bg-gray-50 transition'
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            {/* SAVE AS DRAFT */}
            <button
              type='button'
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className='flex items-center cursor-pointer justify-center gap-1.5 border border-gray-300 bg-white text-gray-700 rounded-md px-4 py-2 text-xs font-medium hover:bg-gray-50 transition disabled:opacity-60'
            >
              <FileText size={14} />
              <span>Save as Draft</span>
            </button>

            {/* SAVE & SUBMIT */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex cursor-pointer items-center justify-center gap-1.5 bg-green-700 hover:bg-green-800 text-white rounded-md px-4 py-2 text-xs font-medium transition disabled:opacity-60'
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

export default AddNewContractor;
