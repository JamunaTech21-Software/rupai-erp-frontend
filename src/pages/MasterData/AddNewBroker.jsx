import React from "react";
import { Plus, Trash2, X, Save, Building2 } from "lucide-react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

import MasterDataTabs from "./MasterDataTabs";

import { addNewBrokerData } from "../../data/MasterData/addBrokerData";
import Select from "../../components/common/Select";
const AddNewBroker = () => {
  const { brokerInformation, mobileNumbers, brokerSummary, previewData } =
    addNewBrokerData;

  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobileNumbers: mobileNumbers?.rows || [],
    },
  });

  // =========================================================
  // MOBILE NUMBER FIELD ARRAY
  // =========================================================

  const {
    fields: mobileFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "mobileNumbers",
  });

  // =========================================================
  // WATCH MOBILE NUMBERS
  // =========================================================

  const watchedMobileNumbers = useWatch({
    control,
    name: "mobileNumbers",
  });

  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const onSubmit = () => {
  };

  // =========================================================
  // ADD MOBILE NUMBER
  // =========================================================

  const handleAddMobile = () => {
    append({
      id: Date.now(),
      mobileNumber: "",
      contactPersonName: "",
      designationId: "",
      typeCode: mobileNumbers?.typeOptions?.[0]?.code || "",
      isPrimary: false,
    });
  };

  // =========================================================
  // REMOVE MOBILE NUMBER
  // =========================================================

  const handleRemoveMobile = (index) => {
    const currentRows = watchedMobileNumbers || [];

    // If only one row exists, don't remove it
    if (currentRows.length <= 1) {
      return;
    }

    const removingPrimary = currentRows[index]?.isPrimary;

    remove(index);

    // If primary number was removed,
    // automatically make first remaining number primary
    if (removingPrimary && currentRows.length > 1) {
      setTimeout(() => {
        setValue("mobileNumbers.0.isPrimary", true);
      }, 0);
    }
  };

  // =========================================================
  // PRIMARY MOBILE NUMBER
  // =========================================================

  const handlePrimaryMobile = (selectedIndex) => {
    const currentRows = watchedMobileNumbers || [];

    currentRows.forEach((_, index) => {
      setValue(`mobileNumbers.${index}.isPrimary`, index === selectedIndex);
    });
  };

  const selectedCenters = addNewBrokerData.auctionCenters.selectedCenters;

  return (
    <div>
      <MasterDataTabs />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 gap-2 lg:grid-cols-12'>
          {/* =====================================================
                LEFT SIDE
          ====================================================== */}

          <div className='space-y-4 lg:col-span-8'>
            {/* =================================================
                  BROKER INFORMATION
            ================================================== */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              <div className='mb-4 border-b border-slate-200 pb-3'>
                <h2 className='text-sm font-bold text-emerald-700'>
                  {brokerInformation?.title}
                </h2>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {brokerInformation?.fields?.map((field) => (
                  <div key={field.id}>
                    <label className='mb-1 block text-xs font-semibold text-slate-700'>
                      {field.label}

                      {field.required && (
                        <span className='text-red-500'> *</span>
                      )}
                    </label>

                    {field.type === "select" ? (
                      <Select
                        {...register(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                        })}
                        className='h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-emerald-500'
                      >
                        <option value=''>{field.placeholder}</option>

                        {brokerInformation?.designationOptions?.map(
                          (option) => (
                            <option key={option.id} value={option.code}>
                              {option.name}
                            </option>
                          ),
                        )}
                      </Select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name, {
                          required: field.required
                            ? `${field.label} is required`
                            : false,
                        })}
                        className='h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-emerald-500'
                      />
                    )}

                    {errors[field.name] && (
                      <p className='mt-1 text-[10px] text-red-500'>
                        {errors[field.name].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* =====================================================
                    MOBILE NUMBERS
            ====================================================== */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              {/* ================= HEADER ================= */}

              <div className='mb-4 flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='text-sm font-bold text-emerald-700'>
                  {mobileNumbers?.title}
                </h2>

                <button
                  type='button'
                  onClick={handleAddMobile}
                  className='inline-flex w-full items-center justify-center gap-2 rounded-md border border-emerald-300 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:w-auto'
                >
                  <Plus className='h-4 w-4' />

                  {mobileNumbers?.addAction?.label}
                </button>
              </div>

              {/* ================= TABLE ================= */}

              <div className='overflow-x-auto'>
                <table className='w-full min-w-[750px]'>
                  {/* ================= HEADER ================= */}

                  <thead>
                    <tr className='border-b border-slate-200 bg-slate-50'>
                      {mobileNumbers?.columns?.map((column) => (
                        <th
                          key={column.key}
                          className={`px-3 py-3 text-xs font-semibold text-slate-600 ${
                            column.align === "center"
                              ? "text-center"
                              : "text-left"
                          }`}
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* ================= BODY ================= */}

                  <tbody>
                    {mobileFields?.map((row, index) => (
                      <tr key={row.id} className='border-b border-slate-100'>
                        {/* ================= SL ================= */}

                        <td className='px-3 py-2 text-xs text-slate-700'>
                          {index + 1}
                        </td>

                        {/* ================= MOBILE NUMBER ================= */}

                        <td className='px-3 py-2'>
                          <input
                            type='tel'
                            placeholder={
                              mobileNumbers?.fieldPlaceholders?.mobileNumber
                            }
                            {...register(
                              `mobileNumbers.${index}.mobileNumber`,
                              {
                                required: mobileNumbers?.validation
                                  ?.mobileNumber?.required
                                  ? mobileNumbers.validation.mobileNumber
                                      .message
                                  : false,
                              },
                            )}
                            className='h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs outline-none transition focus:border-emerald-500'
                          />

                          {errors.mobileNumbers?.[index]?.mobileNumber && (
                            <p className='mt-1 text-[10px] text-red-500'>
                              {errors.mobileNumbers[index].mobileNumber.message}
                            </p>
                          )}
                        </td>

                        {/* ================= CONTACT PERSON ================= */}

                        <td className='px-3 py-2'>
                          <input
                            type='text'
                            placeholder={
                              mobileNumbers?.fieldPlaceholders
                                ?.contactPersonName
                            }
                            {...register(
                              `mobileNumbers.${index}.contactPersonName`,
                            )}
                            className='h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs outline-none transition focus:border-emerald-500'
                          />
                        </td>

                        {/* ================= DESIGNATION ================= */}

                        <td className='px-3 py-2'>
                          <Select
                            {...register(
                              `mobileNumbers.${index}.designationId`,
                            )}
                            className='h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs outline-none transition focus:border-emerald-500'
                          >
                            <option value=''>
                              {mobileNumbers?.fieldPlaceholders?.designation}
                            </option>

                            {mobileNumbers?.designationOptions?.map(
                              (option) => (
                                <option key={option.id} value={option.code}>
                                  {option.name}
                                </option>
                              ),
                            )}
                          </Select>
                        </td>

                        {/* ================= TYPE ================= */}

                        <td className='px-3 py-2'>
                          <Select
                            {...register(`mobileNumbers.${index}.typeCode`)}
                            className='h-8 w-full rounded-md border border-slate-300 bg-white px-2 text-xs outline-none transition focus:border-emerald-500'
                          >
                            {mobileNumbers?.typeOptions?.map((option) => (
                              <option key={option.id} value={option.code}>
                                {option.name}
                              </option>
                            ))}
                          </Select>
                        </td>

                        {/* ================= PRIMARY ================= */}

                        <td className='px-3 py-2 text-center'>
                          <input
                            type='radio'
                            name='primaryMobile'
                            checked={
                              watchedMobileNumbers?.[index]?.isPrimary || false
                            }
                            onChange={() => handlePrimaryMobile(index)}
                            className='h-4 w-4 cursor-pointer accent-emerald-600'
                          />
                        </td>

                        {/* ================= ACTION ================= */}

                        <td className='px-3 py-2 text-center'>
                          <button
                            type='button'
                            onClick={() => handleRemoveMobile(index)}
                            className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-500 transition hover:bg-red-50'
                            title={mobileNumbers?.actionLabels?.remove}
                          >
                            <Trash2 className='h-4 w-4' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* =====================================================
                    EMAIL & TIN INFORMATION
                ====================================================== */}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* ================= EMAIL ================= */}

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Email
                </label>

                <input
                  type='email'
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className='h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-emerald-500'
                />

                {errors.email && (
                  <p className='mt-1 text-[10px] text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* ================= TIN NUMBER ================= */}

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  TIN No.
                </label>

                <input
                  type='text'
                  {...register("tinNo")}
                  className='h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs outline-none focus:border-emerald-500'
                />

                {errors.tinNo && (
                  <p className='mt-1 text-[10px] text-red-500'>
                    {errors.tinNo.message}
                  </p>
                )}
              </div>
            </div>

            {/* =====================================================
                    AUCTION CENTERS & ASSOCIATION
                ====================================================== */}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-12'>
              {/* ================= AUCTION CENTERS ================= */}

              <div className='md:col-span-7'>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Auction Center(s)
                  <span className='text-red-500'> *</span>
                </label>

                <div
                  className={`flex min-h-12 w-full flex-wrap items-center gap-2 rounded-md border bg-white p-2 ${
                    errors.auctionCenters
                      ? "border-red-400"
                      : "border-slate-300"
                  }`}
                >
                  {brokerInformation?.auctionCenterOptions?.map((center) => (
                    <label
                      key={center.id}
                      className='inline-flex cursor-pointer items-center gap-1.5 rounded bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-700'
                    >
                      <input
                        type='checkbox'
                        value={center.code}
                        {...register("auctionCenters", {
                          required: "Auction center is required",
                        })}
                        className='h-3.5 w-3.5 accent-emerald-600'
                      />

                      <span className='whitespace-nowrap'>{center.name}</span>

                      <span className='text-slate-400'>×</span>
                    </label>
                  ))}
                </div>

                {errors.auctionCenters && (
                  <p className='mt-1 text-[10px] text-red-500'>
                    {errors.auctionCenters.message}
                  </p>
                )}
              </div>

              {/* ================= ASSOCIATION ================= */}

              <div className='md:col-span-5'>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Association
                  <span className='text-red-500'> *</span>
                </label>

                <Select
                  {...register("associationId", {
                    required: "Association is required",
                  })}
                  className={`min-h-[48px] w-full rounded-md border bg-white px-3 py-2 text-xs outline-none transition ${
                    errors.associationId
                      ? "border-red-400"
                      : "border-slate-300 focus:border-emerald-500"
                  }`}
                >
                  <option value=''>Select Association</option>

                  {brokerInformation?.associationOptions?.map((association) => (
                    <option key={association.id} value={association.code}>
                      {association.name}
                    </option>
                  ))}
                </Select>

                {errors.associationId && (
                  <p className='mt-1 text-[10px] text-red-500'>
                    {errors.associationId.message}
                  </p>
                )}
              </div>
            </div>

            {/* =================================================
                  COMMISSION + STATUS
            ================================================== */}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* ================= COMMISSION ================= */}

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  {brokerInformation?.commission?.label}

                  {brokerInformation?.commission?.required && (
                    <span className='text-red-500'> *</span>
                  )}
                </label>

                <div className='flex'>
                  <input
                    type='number'
                    step='0.01'
                    placeholder={brokerInformation?.commission?.placeholder}
                    {...register("commission", {
                      required: brokerInformation?.commission?.required
                        ? `${brokerInformation?.commission?.label} is required`
                        : false,
                    })}
                    className={`h-9 w-full rounded-l-md border bg-white px-3 text-xs outline-none focus:border-emerald-500 ${
                      errors.commission ? "border-red-400" : "border-slate-300"
                    }`}
                  />

                  <span className='flex h-9 w-10 items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-slate-50 text-xs text-slate-600'>
                    %
                  </span>
                </div>

                {errors.commission && (
                  <p className='mt-1 text-[10px] text-red-500'>
                    {errors.commission.message}
                  </p>
                )}
              </div>

              {/* ================= STATUS ================= */}

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  {brokerInformation?.status?.label}

                  {brokerInformation?.status?.required && (
                    <span className='text-red-500'> *</span>
                  )}
                </label>

                <Select
                  {...register("status", {
                    required: brokerInformation?.status?.required
                      ? `${brokerInformation?.status?.label} is required`
                      : false,
                  })}
                  className={`h-9 w-full rounded-md border bg-white px-3 text-xs outline-none focus:border-emerald-500 ${
                    errors.status ? "border-red-400" : "border-slate-300"
                  }`}
                >
                  <option value=''>
                    {brokerInformation?.status?.placeholder}
                  </option>

                  {brokerInformation?.status?.options?.map((option) => (
                    <option key={option.id} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </Select>

                {errors.status && (
                  <p className='mt-1 text-[10px] text-red-500'>
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* =================================================
                  ADDRESS
            ================================================== */}

            <div>
              <label className='mb-1 block text-xs font-semibold text-slate-700'>
                {brokerInformation?.address?.label}

                {brokerInformation?.address?.required && (
                  <span className='text-red-500'> *</span>
                )}
              </label>

              <textarea
                rows={3}
                placeholder={brokerInformation?.address?.placeholder}
                {...register("address", {
                  required: brokerInformation?.address?.required
                    ? `${brokerInformation?.address?.label} is required`
                    : false,
                })}
                className={`w-full resize-none rounded-md border bg-white px-3 py-2 text-xs outline-none transition ${
                  errors.address
                    ? "border-red-400"
                    : "border-slate-300 focus:border-emerald-500"
                }`}
              />

              {errors.address && (
                <p className='mt-1 text-[10px] text-red-500'>
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* =====================================================
                    REMARKS
                ====================================================== */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              <div className='mb-2'>
                <label className='block text-xs font-semibold text-slate-700'>
                  {brokerInformation?.remarksField?.label}

                  {!brokerInformation?.remarksField?.required && (
                    <span className='font-normal text-slate-400'>
                      {" "}
                      (Optional)
                    </span>
                  )}

                  {brokerInformation?.remarksField?.required && (
                    <span className='text-red-500'> *</span>
                  )}
                </label>
              </div>

              <textarea
                rows={brokerInformation?.remarksField?.rows || 3}
                placeholder={brokerInformation?.remarksField?.placeholder}
                {...register(brokerInformation?.remarksField?.name, {
                  required: brokerInformation?.remarksField?.required
                    ? `${brokerInformation.remarksField.label} is required`
                    : false,
                })}
                className='w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-xs outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
              />

              {errors[brokerInformation?.remarksField?.name] && (
                <p className='mt-1 text-[10px] text-red-500'>
                  {errors[brokerInformation.remarksField.name].message}
                </p>
              )}
            </div>
            {/* =====================================================
                    FORM FOOTER / ACTIONS
                ====================================================== */}

            <div className='flex flex-col gap-3 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between'>
              {/* ================= MANDATORY NOTE ================= */}

              <p className='text-[10px] font-medium text-red-500'>
                * Fields are mandatory
              </p>

              {/* ================= ACTION BUTTONS ================= */}

              <div className='flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row'>
                {/* Cancel / Reset */}

                <button
                  type='button'
                  onClick={() => reset()}
                  className='inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] sm:w-auto'
                >
                  <X className='h-3.5 w-3.5' />

                  <span>Cancel</span>
                </button>

                {/* Save Broker */}

                <button
                  type='submit'
                  className='inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-md bg-emerald-700 px-3 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.98] sm:w-auto'
                >
                  <Save className='h-3.5 w-3.5' />

                  <span>Save Broker</span>
                </button>
              </div>
            </div>
          </div>

          {/* =====================================================
                RIGHT SIDE
          ====================================================== */}

          <div className='space-y-4 lg:col-span-4'>
            {/* =================================================
                  SELECTED AUCTION CENTERS
            ================================================== */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              {/* Header */}
              <div className='mb-4 border-b border-slate-200 pb-3'>
                <h2 className='text-sm font-bold text-emerald-700'>
                  {addNewBrokerData.auctionCenters.title}
                </h2>
              </div>

              {/* Selected Auction Centers */}
              <div className='space-y-3'>
                {selectedCenters.map((center) => (
                  <div
                    key={center.id}
                    className='flex items-center gap-3 rounded-md border border-slate-200 p-3'
                  >
                    {/* Icon */}
                    <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700'>
                      <Building2 className='h-4 w-4' />
                    </div>

                    {/* Name */}
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-xs font-semibold text-slate-700'>
                        {center.name}
                      </p>
                    </div>

                    {/* Status */}
                    <span className='rounded bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700'>
                      {center.status === "ACTIVE" ? "Active" : "Inactive"}
                    </span>

                    {/* Action */}
                    <button
                      type='button'
                      className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-red-500 transition hover:bg-red-50'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                  BROKER SUMMARY
            ================================================== */}

            <div className='rounded-lg border border-slate-200 bg-white p-4'>
              {/* ================= HEADER ================= */}

              <div className='mb-5 border-b border-slate-200 pb-3'>
                <h2 className='text-sm font-bold text-emerald-700'>
                  {brokerSummary.title}
                </h2>
              </div>

              {/* ================= SUMMARY ITEMS ================= */}

              <div className='space-y-3'>
                {brokerSummary.items.map((item) => {
                  const value = previewData[item.key];

                  return (
                    <div
                      key={item.key}
                      className='grid grid-cols-12 items-center gap-2'
                    >
                      {/* Label */}

                      <div className='col-span-4'>
                        <p className='text-[11px] font-semibold text-slate-700'>
                          {item.label}
                        </p>
                      </div>

                      {/* Colon */}

                      <div className='col-span-1 text-center'>
                        <span className='text-[11px] font-semibold text-slate-400'>
                          :
                        </span>
                      </div>

                      {/* Value */}

                      <div className='col-span-7 min-w-0'>
                        {item.key === "status" ? (
                          <span className='inline-flex rounded bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700'>
                            {value}
                          </span>
                        ) : (
                          <p className='truncate text-[11px] font-medium text-slate-700'>
                            {value || "—"}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewBroker;
