import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  Download,
  X,
  Save,
  UserPlus,
} from "lucide-react";

import MasterDataTabs from "./MasterDataTabs";

import { buyerSetupData } from "../../data/MasterData/buyerSetupData";

const BuyerSetup = () => {
  // =======================================================
  // JSON DATA
  // =======================================================

  const {
    pageConfig,
    buyerForm,
    formFields,
    buyerTypeOptions,
    tradingTypeOptions,
    countryOptions,
    contactPersonTypeOptions,
    designationOptions,
    statusOptions,
    contactTableHeaders,
    buyerTableHeaders,
    buyerList,
  } = buyerSetupData;

  // =======================================================
  // STATE
  // =======================================================

  const [buyers, setBuyers] = useState(buyerList);

  const [editingBuyerId, setEditingBuyerId] = useState(null);

  // =======================================================
  // REACT HOOK FORM
  // =======================================================

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: buyerForm,
  });

  // =======================================================
  // DYNAMIC CONTACT PERSON FIELD ARRAY
  // =======================================================

  const {
    fields: contactFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "contactPersons",
  });

  // =======================================================
  // ADD CONTACT PERSON
  // =======================================================

  const handleAddContactPerson = () => {
    append({
      mobileNumber: "",
      contactPersonName: "",
      designation: "",
      type: "",
      isPrimary: false,
    });
  };

  // =======================================================
  // SET PRIMARY CONTACT
  // =======================================================

  const handlePrimaryContact = (index) => {
    contactFields.forEach((_, contactIndex) => {
      setValue(
        `contactPersons.${contactIndex}.isPrimary`,
        contactIndex === index,
      );
    });
  };

  // =======================================================
  // FORM SUBMIT
  // =======================================================

  const onSubmit = (data) => {
    console.log("Buyer Form Data:", data);

    if (editingBuyerId) {
      setBuyers((previousBuyers) =>
        previousBuyers.map((buyer) =>
          buyer.id === editingBuyerId
            ? {
                ...buyer,
                ...data,
                id: editingBuyerId,
              }
            : buyer,
        ),
      );
    } else {
      const newBuyer = {
        ...data,
        id: Date.now(),
        isActive: data.status === "ACTIVE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setBuyers((previousBuyers) => [...previousBuyers, newBuyer]);
    }

    reset(buyerForm);
    setEditingBuyerId(null);
  };

  // =======================================================
  // EDIT BUYER
  // =======================================================

  const handleEdit = (buyer) => {
    reset({
      buyerCode: buyer.buyerCode,
      buyerName: buyer.buyerName,
      shortName: buyer.shortName,
      buyerType: buyer.buyerType,
      tradingType: buyer.tradingType,
      country: buyer.country,
      address: buyer.address,
      contactPersons: buyer.contactPersons,
      phone: buyer.phone,
      email: buyer.email,
      status: buyer.status,
      remarks: buyer.remarks,
    });

    setEditingBuyerId(buyer.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =======================================================
  // DELETE BUYER
  // =======================================================

  const handleDelete = (id) => {
    setBuyers((previousBuyers) =>
      previousBuyers.filter((buyer) => buyer.id !== id),
    );

    if (editingBuyerId === id) {
      reset(buyerForm);
      setEditingBuyerId(null);
    }
  };

  // =======================================================
  // CANCEL
  // =======================================================

  const handleCancel = () => {
    reset(buyerForm);
    setEditingBuyerId(null);
  };

  // =======================================================
  // FIELD ERROR CLASS
  // =======================================================

  const inputClass = (fieldName) =>
    `w-full rounded-md border px-3 py-2 text-sm outline-none transition ${
      errors[fieldName]
        ? "border-red-500 focus:border-red-500"
        : "border-slate-300 focus:border-emerald-600"
    }`;

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className='min-h-screen bg-slate-50'>
      {/* ===================================================
          MASTER DATA TABS
      =================================================== */}

      <MasterDataTabs />

      {/* ===================================================
          MAIN GRID
      =================================================== */}

      <div className='grid grid-cols-1 gap-4 xl:grid-cols-5'>
        {/* =================================================
            LEFT - BUYER FORM
        ================================================= */}

        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-2'>
          {/* HEADER */}

          <div className='mb-5 flex items-center justify-between'>
            <h2 className='text-base font-bold text-emerald-700'>
              {pageConfig.formTitle}
            </h2>

            {editingBuyerId && (
              <span className='rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700'>
                Edit Mode
              </span>
            )}
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* =================================================
                BUYER CODE + NAME
            ================================================= */}

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* Buyer Code */}

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  {formFields.find((f) => f.name === "buyerCode")?.label}
                  <span className='text-red-500'> *</span>
                </label>

                <input
                  type='text'
                  placeholder={
                    formFields.find((f) => f.name === "buyerCode")?.placeholder
                  }
                  className={inputClass("buyerCode")}
                  {...register("buyerCode", {
                    required: "Buyer code is required",
                  })}
                />

                {errors.buyerCode && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.buyerCode.message}
                  </p>
                )}
              </div>

              {/* Buyer Name */}

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  {formFields.find((f) => f.name === "buyerName")?.label}
                  <span className='text-red-500'> *</span>
                </label>

                <input
                  type='text'
                  placeholder={
                    formFields.find((f) => f.name === "buyerName")?.placeholder
                  }
                  className={inputClass("buyerName")}
                  {...register("buyerName", {
                    required: "Buyer name is required",
                  })}
                />

                {errors.buyerName && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.buyerName.message}
                  </p>
                )}
              </div>
            </div>

            {/* =================================================
                SHORT NAME
            ================================================= */}

            <div className='mt-4'>
              <label className='mb-1 block text-xs font-semibold text-slate-700'>
                Short Name
              </label>

              <input
                type='text'
                placeholder='Enter short name'
                className={inputClass("shortName")}
                {...register("shortName")}
              />
            </div>

            {/* =================================================
                BUYER TYPE + TRADING TYPE
            ================================================= */}

            <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
              {/* Buyer Type */}

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Buyer Type <span className='text-red-500'>*</span>
                </label>

                <select
                  className={inputClass("buyerType")}
                  {...register("buyerType", {
                    required: "Buyer type is required",
                  })}
                >
                  <option value=''>Select buyer type</option>

                  {buyerTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {errors.buyerType && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.buyerType.message}
                  </p>
                )}
              </div>

              {/* Trading Type */}

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Trading Type <span className='text-red-500'>*</span>
                </label>

                <select
                  className={inputClass("tradingType")}
                  {...register("tradingType", {
                    required: "Trading type is required",
                  })}
                >
                  <option value=''>Select trading type</option>

                  {tradingTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {errors.tradingType && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.tradingType.message}
                  </p>
                )}
              </div>
            </div>

            {/* =================================================
                COUNTRY
            ================================================= */}

            <div className='mt-4'>
              <label className='mb-1 block text-xs font-semibold text-slate-700'>
                Country <span className='text-red-500'>*</span>
              </label>

              <select
                className={inputClass("country")}
                {...register("country", {
                  required: "Country is required",
                })}
              >
                <option value=''>Select country</option>

                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {errors.country && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* =================================================
                ADDRESS
            ================================================= */}

            <div className='mt-4'>
              <label className='mb-1 block text-xs font-semibold text-slate-700'>
                Address <span className='text-red-500'>*</span>
              </label>

              <textarea
                rows={3}
                maxLength={250}
                placeholder='Enter address...'
                className={inputClass("address")}
                {...register("address", {
                  required: "Address is required",
                  maxLength: {
                    value: 250,
                    message: "Maximum 250 characters allowed",
                  },
                })}
              />

              {errors.address && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* =================================================
                CONTACT PERSONS
            ================================================= */}

            <div className='mt-5'>
              <div className='mb-3 flex flex-wrap items-center justify-between gap-2'>
                <h3 className='text-sm font-bold text-emerald-700'>
                  Contact Persons & Mobile Numbers{" "}
                  <span className='text-red-500'>*</span>
                </h3>

                <button
                  type='button'
                  onClick={handleAddContactPerson}
                  className='flex cursor-pointer items-center gap-1 rounded-md border border-emerald-600 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50'
                >
                  <UserPlus className='h-3.5 w-3.5' />
                  Add Another Contact Person
                </button>
              </div>

              {/* =================================================
                  CONTACT TABLE
              ================================================= */}

              <div className='overflow-x-auto rounded-md border border-slate-200'>
                <table className='w-full min-w-[850px] text-xs'>
                  <thead className='bg-slate-50'>
                    <tr>
                      {contactTableHeaders.map((header) => (
                        <th
                          key={header.key}
                          className='whitespace-nowrap border-b px-2 py-2 text-left font-semibold text-slate-700'
                        >
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {contactFields.map((field, index) => (
                      <tr key={field.id}>
                        {/* SL */}

                        <td className='border-b px-2 py-2'>{index + 1}</td>

                        {/* MOBILE */}

                        <td className='border-b px-2 py-2'>
                          <input
                            type='text'
                            placeholder='+880...'
                            className='w-32 rounded border border-slate-300 px-2 py-1.5 outline-none focus:border-emerald-600'
                            {...register(
                              `contactPersons.${index}.mobileNumber`,
                              {
                                required: "Mobile number is required",
                              },
                            )}
                          />
                        </td>

                        {/* CONTACT NAME */}

                        <td className='border-b px-2 py-2'>
                          <input
                            type='text'
                            placeholder='Contact person'
                            className='w-36 rounded border border-slate-300 px-2 py-1.5 outline-none focus:border-emerald-600'
                            {...register(
                              `contactPersons.${index}.contactPersonName`,
                              {
                                required: "Contact person is required",
                              },
                            )}
                          />
                        </td>

                        {/* DESIGNATION */}

                        <td className='border-b px-2 py-2'>
                          <select
                            className='w-36 cursor-pointer rounded border border-slate-300 px-2 py-1.5 outline-none focus:border-emerald-600'
                            {...register(
                              `contactPersons.${index}.designation`,
                              {
                                required: "Designation is required",
                              },
                            )}
                          >
                            <option value=''>Select</option>

                            {designationOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* TYPE */}

                        <td className='border-b px-2 py-2'>
                          <select
                            className='w-28 cursor-pointer rounded border border-slate-300 px-2 py-1.5 outline-none focus:border-emerald-600'
                            {...register(`contactPersons.${index}.type`)}
                          >
                            <option value=''>Select</option>

                            {contactPersonTypeOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* PRIMARY */}

                        <td className='border-b px-2 py-2 text-center'>
                          <input
                            type='radio'
                            name='primaryContact'
                            checked={field.isPrimary === true}
                            onChange={() => handlePrimaryContact(index)}
                            className='h-4 w-4 cursor-pointer accent-emerald-600'
                          />
                        </td>

                        {/* ACTION */}

                        <td className='border-b px-2 py-2 text-center'>
                          {contactFields.length > 1 && (
                            <button
                              type='button'
                              onClick={() => remove(index)}
                              className='cursor-pointer rounded border border-red-200 p-1.5 text-red-500 transition hover:bg-red-50'
                              title='Remove'
                            >
                              <Trash2 className='h-3.5 w-3.5' />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* =================================================
                PHONE + EMAIL
            ================================================= */}

            <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Phone
                </label>

                <input
                  type='text'
                  placeholder='Enter phone'
                  className={inputClass("phone")}
                  {...register("phone")}
                />
              </div>

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Email
                </label>

                <input
                  type='email'
                  placeholder='Enter email'
                  className={inputClass("email")}
                  {...register("email")}
                />
              </div>
            </div>

            {/* =================================================
                STATUS + REMARKS
            ================================================= */}

            <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Status <span className='text-red-500'>*</span>
                </label>

                <select
                  className={inputClass("status")}
                  {...register("status", {
                    required: "Status is required",
                  })}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='mb-1 block text-xs font-semibold text-slate-700'>
                  Remarks
                </label>

                <textarea
                  rows={2}
                  maxLength={250}
                  placeholder='Enter remarks...'
                  className={inputClass("remarks")}
                  {...register("remarks")}
                />
              </div>
            </div>

            {/* =================================================
                FORM ACTIONS
            ================================================= */}

            <div className='mt-5 flex flex-wrap justify-end gap-2'>
              <button
                type='button'
                onClick={handleCancel}
                className='flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
              >
                <X className='h-4 w-4' />

                {pageConfig.cancelButtonLabel}
              </button>

              <button
                type='submit'
                className='flex cursor-pointer items-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800'
              >
                <Save className='h-4 w-4' />

                {editingBuyerId ? "Update Buyer" : pageConfig.saveButtonLabel}
              </button>
            </div>

            {/* MANDATORY NOTE */}

            <p className='mt-4 text-xs font-medium text-red-500'>
              {pageConfig.mandatoryNote}
            </p>
          </form>
        </div>

        {/* =================================================
            RIGHT - BUYER LIST
        ================================================= */}

        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-3'>
          {/* HEADER */}

          <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
            <h2 className='text-base font-bold text-emerald-700'>
              {pageConfig.listTitle}
            </h2>

            <div className='flex flex-wrap gap-2'>
              {/* IMPORT */}

              <button
                type='button'
                className='flex cursor-pointer items-center gap-2 rounded-md border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50'
              >
                <Upload className='h-4 w-4' />

                {pageConfig.importButtonLabel}
              </button>

              {/* EXPORT */}

              <button
                type='button'
                className='flex cursor-pointer items-center gap-2 rounded-md border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50'
              >
                <Download className='h-4 w-4' />

                {pageConfig.exportButtonLabel}
              </button>

              {/* ADD */}

              <button
                type='button'
                onClick={handleCancel}
                className='flex cursor-pointer items-center gap-2 rounded-md bg-emerald-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800'
              >
                <Plus className='h-4 w-4' />

                {pageConfig.addButtonLabel}
              </button>
            </div>
          </div>

          {/* =================================================
              BUYER TABLE
          ================================================= */}

          <div className='overflow-x-auto'>
            <table className='w-full min-w-[1100px] text-xs'>
              <thead className='bg-slate-50'>
                <tr>
                  {buyerTableHeaders.map((header) => (
                    <th
                      key={header.key}
                      className='whitespace-nowrap border-b px-3 py-3 text-left font-semibold text-slate-700'
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {buyers.map((buyer, index) => {
                  const primaryContact =
                    buyer.contactPersons?.find(
                      (contact) => contact.isPrimary,
                    ) || buyer.contactPersons?.[0];

                  return (
                    <tr key={buyer.id} className='transition hover:bg-slate-50'>
                      {/* SL */}

                      <td className='border-b px-3 py-4'>{index + 1}</td>

                      {/* CODE */}

                      <td className='border-b px-3 py-4 font-medium'>
                        {buyer.buyerCode}
                      </td>

                      {/* NAME */}

                      <td className='border-b px-3 py-4'>{buyer.buyerName}</td>

                      {/* SHORT NAME */}

                      <td className='border-b px-3 py-4'>{buyer.shortName}</td>

                      {/* BUYER TYPE */}

                      <td className='border-b px-3 py-4'>{buyer.buyerType}</td>

                      {/* TRADING TYPE */}

                      <td className='border-b px-3 py-4'>
                        {buyer.tradingType === "BOTH"
                          ? "Both (Int–Exp)"
                          : buyer.tradingType}
                      </td>

                      {/* COUNTRY */}

                      <td className='border-b px-3 py-4'>{buyer.country}</td>

                      {/* PRIMARY MOBILE */}

                      <td className='border-b px-3 py-4 whitespace-nowrap'>
                        {primaryContact?.mobileNumber || "-"}
                      </td>

                      {/* PHONE */}

                      <td className='border-b px-3 py-4 whitespace-nowrap'>
                        {buyer.phone || "-"}
                      </td>

                      {/* STATUS */}

                      <td className='border-b px-3 py-4'>
                        <span
                          className={`rounded px-2 py-1 text-[10px] font-semibold ${
                            buyer.status === "ACTIVE"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {buyer.status === "ACTIVE" ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* ACTION */}

                      <td className='border-b px-3 py-4'>
                        <div className='flex items-center gap-2'>
                          {/* EDIT */}

                          <button
                            type='button'
                            onClick={() => handleEdit(buyer)}
                            className='cursor-pointer rounded border border-emerald-200 p-1.5 text-emerald-600 transition hover:bg-emerald-50'
                            title='Edit'
                          >
                            <Pencil className='h-3.5 w-3.5' />
                          </button>

                          {/* DELETE */}

                          <button
                            type='button'
                            onClick={() => handleDelete(buyer.id)}
                            className='cursor-pointer rounded border border-red-200 p-1.5 text-red-500 transition hover:bg-red-50'
                            title='Delete'
                          >
                            <Trash2 className='h-3.5 w-3.5' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* =================================================
              TABLE FOOTER
          ================================================= */}

          <div className='mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4'>
            <p className='text-xs text-slate-500'>
              Showing 1 to {buyers.length} of{" "}
              {buyerSetupData.pagination.totalEntries} entries
            </p>

            <div className='flex items-center gap-1'>
              <button
                type='button'
                className='cursor-pointer rounded border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50'
              >
                ‹
              </button>

              <button
                type='button'
                className='cursor-pointer rounded bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white'
              >
                1
              </button>

              <button
                type='button'
                className='cursor-pointer rounded border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50'
              >
                2
              </button>

              <button
                type='button'
                className='cursor-pointer rounded border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50'
              >
                3
              </button>

              <button
                type='button'
                className='cursor-pointer rounded border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-50'
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerSetup;
