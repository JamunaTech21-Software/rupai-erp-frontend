import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "../../lib/useForm";

import MasterDataTabs from "./MasterDataTabs";
import { teaTypeData } from "../../data/MasterData/teaTypeData";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";

const PER_PAGE = 10;
const EMPTY_FORM = teaTypeData.emptyTeaTypeForm;
const FORM_KEYS = Object.keys(EMPTY_FORM);
const labelClass = "mb-1.5 block text-xs font-semibold text-slate-700";
const boxClass = (error) => `h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ${error ? "border-red-500" : "border-slate-300"}`;
const areaClass = (error) => `w-full resize-none rounded-md border bg-white px-3 py-2 text-sm outline-none ${error ? "border-red-500" : "border-slate-300"}`;

// A saved tea type as form values (empty optional values come back as null).
const toForm = (teaType) =>
  Object.fromEntries(FORM_KEYS.map((key) => [key, key === "applicableFor" ? [...(teaType.applicableFor ?? [])] : teaType[key] ?? ""]));
// Cleared optional text goes to the server as null.
const toBody = (values) =>
  Object.fromEntries(
    FORM_KEYS.map((key) => {
      if (key === "applicableFor") return [key, Array.isArray(values[key]) ? values[key] : values[key] ? [values[key]] : []];
      const text = String(values[key] ?? "").trim();
      return [key, text === "" ? null : text];
    }),
  );

// The eight fields, shared by the Tea Type Information form and the Add popup.
function TeaTypeFields({ register, errors, options, showNotes }) {
  const { formFields } = teaTypeData;
  const field = (name) => formFields.find((item) => item.name === name);
  const text = (name) => {
    const config = field(name);
    return (
      <div key={name}>
        <label className={labelClass}>
          {config.label}
          {config.required && <span className='text-red-500'> *</span>}
        </label>
        <input
          type='text'
          placeholder={config.placeholder}
          maxLength={config.maxLength}
          {...register(name, { required: config.required ? `${config.label} is required` : false })}
          className={boxClass(errors[name])}
        />
        {errors[name] && <p className='mt-1 text-[11px] text-red-500'>{errors[name].message}</p>}
      </div>
    );
  };
  const area = (name) => {
    const config = field(name);
    return (
      <div key={name} className='mt-4'>
        <label className={labelClass}>
          {config.label}
          {config.required ? <span className='text-red-500'> *</span> : <span className='font-normal text-slate-400'> (Optional)</span>}
        </label>
        <textarea rows='3' maxLength={config.maxLength} placeholder={config.placeholder} {...register(name)} className={areaClass(errors[name])} />
        {showNotes && <div className='mt-1 text-right text-[11px] text-slate-500'>Maximum {config.maxLength} characters</div>}
        {errors[name] && <p className='mt-1 text-[11px] text-red-500'>{errors[name].message}</p>}
      </div>
    );
  };
  const processing = field("processingMethod");
  const status = field("status");
  const applicable = field("applicableFor");

  return (
    <>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {text("teaTypeCode")}
        {text("teaTypeName")}
        {text("shortName")}
        <div>
          <label className={labelClass}>
            {processing.label}
            <span className='text-red-500'> *</span>
          </label>
          <Select {...register("processingMethod", { required: `${processing.label} is required` })} className={boxClass(errors.processingMethod)}>
            <option value=''>{processing.placeholder}</option>
            {(options?.processingMethods ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.processingMethod && <p className='mt-1 text-[11px] text-red-500'>{errors.processingMethod.message}</p>}
        </div>
      </div>

      {area("description")}

      <div className='mt-4'>
        <label className='mb-2 block text-xs font-semibold text-slate-700'>
          {applicable.label}
          <span className='text-red-500'> *</span>
        </label>
        <div className='flex flex-wrap gap-3'>
          {(options?.applicableFor ?? []).map((option) => (
            <label key={option.value} className='flex cursor-pointer items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-700'>
              <input
                type='checkbox'
                value={option.value}
                {...register("applicableFor", { validate: (value) => (Array.isArray(value) ? value.length > 0 : Boolean(value)) || "Select at least one." })}
                className='h-4 w-4 cursor-pointer accent-emerald-600'
              />
              {option.label}
            </label>
          ))}
        </div>
        {errors.applicableFor && <p className='mt-1 text-[11px] text-red-500'>{errors.applicableFor.message}</p>}
      </div>

      <div className='mt-4'>
        <label className={labelClass}>
          {status.label}
          <span className='text-red-500'> *</span>
        </label>
        <Select {...register("status", { required: `${status.label} is required` })} className={`${boxClass(errors.status)} cursor-pointer`}>
          {(options?.statuses ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {errors.status && <p className='mt-1 text-[11px] text-red-500'>{errors.status.message}</p>}
      </div>

      {area("remarks")}
    </>
  );
}

const TeaType = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [isTeaTypeModalOpen, setIsTeaTypeModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null); // the tea type shown in the Tea Type Information form
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const { pageConfig, teaTypeTableHeaders } = teaTypeData;

  // =========================================================
  // DATA
  // =========================================================

  const options = useApi(() => api.get("/tea-types/filter-options"), []);
  const list = useApi(() => api.get("/tea-types", { page, perPage: PER_PAGE }), [page]);
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;

  // A page that no longer exists (after a delete) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  // =========================================================
  // FORMS
  // =========================================================

  const {
    register: registerMain,
    handleSubmit: handleMainSubmit,
    reset: resetMain,
    setError: setMainError,
    formState: { errors: mainErrors, isSubmitting: mainSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  const {
    register: registerModal,
    handleSubmit: handleModalSubmit,
    reset: resetModal,
    setError: setModalError,
    formState: { errors: modalErrors, isSubmitting: modalSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  // Server errors go to the field they belong to; anything else is a message.
  const showErrors = (error, setFieldError) => {
    const fields = error.fields ?? {};
    let unplaced = false;
    for (const [key, message] of Object.entries(fields)) {
      if (FORM_KEYS.includes(key)) setFieldError(key, { message });
      else unplaced = true;
    }
    if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
  };

  // =========================================================
  // MAIN FORM SUBMIT (saves the selected tea type, or adds one when none is selected)
  // =========================================================

  const onMainSubmit = async (values) => {
    try {
      const body = toBody(values);
      const result = selected ? await api.put(`/tea-types/${selected.id}`, body) : await api.post("/tea-types", body);
      notifySaved(result, selected ? "Tea type updated successfully!" : "Tea type saved successfully!");
      resetMain(EMPTY_FORM);
      setSelected(null);
      list.reload();
    } catch (error) {
      showErrors(error, setMainError);
    }
  };

  // =========================================================
  // MODAL FORM SUBMIT
  // =========================================================

  const onModalSubmit = async (values) => {
    try {
      const result = await api.post("/tea-types", toBody(values));
      notifySaved(result, "Tea type saved successfully!");
      resetModal(EMPTY_FORM);
      setIsTeaTypeModalOpen(false);
      setPage(1);
      list.reload();
    } catch (error) {
      showErrors(error, setModalError);
    }
  };

  const handleOpenModal = () => {
    resetModal(EMPTY_FORM);
    setIsTeaTypeModalOpen(true);
  };

  const handleCloseModal = () => {
    resetModal(EMPTY_FORM);
    setIsTeaTypeModalOpen(false);
  };

  const handleMainCancel = () => {
    setSelected(null);
    resetMain(EMPTY_FORM);
  };

  const startEdit = (teaType) => {
    setSelected(teaType);
    resetMain(toForm(teaType));
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      const result = await api.del(`/tea-types/${deleting.id}`);
      notifySaved(result, "Tea type deleted successfully!");
      if (selected?.id === deleting.id) handleMainCancel();
      setDeleting(null);
      list.reload();
    } catch (error) {
      // e.g. "This tea type is used by 2 tea grades."
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const pendingNote = selected?.pendingRequest ? `Waiting for approval (${selected.pendingRequest.requestNo})` : null;

  return (
    <div className='space-y-4'>
      {/* =====================================================
          MASTER DATA TABS
      ====================================================== */}

      <MasterDataTabs />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className='rounded-lg bg-white p-4 shadow-sm'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-12'>
          {/* =================================================
              LEFT SIDE - TEA TYPE INFORMATION
          ================================================== */}

          <div className='lg:col-span-5'>
            <div className='h-full rounded-lg border border-slate-200 bg-white'>
              {/* FORM HEADER */}

              <div className='border-b border-slate-200 px-5 py-4'>
                <h2 className='text-sm font-bold text-emerald-700'>
                  {pageConfig.formTitle}
                </h2>
              </div>

              {/* MAIN FORM */}

              <form onSubmit={handleMainSubmit(onMainSubmit)} className='p-5'>
                {pendingNote && (
                  <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-[11px] text-amber-700'>
                    {pendingNote}. This tea type cannot be saved until the request is decided.
                  </p>
                )}

                <TeaTypeFields register={registerMain} errors={mainErrors} options={options.data} showNotes />

                {/* BUTTONS */}

                <div className='mt-4 flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end'>
                  <button
                    type='button'
                    onClick={handleMainCancel}
                    className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-600'
                  >
                    <X className='h-4 w-4' />

                    {pageConfig.cancelButtonLabel}
                  </button>

                  <button
                    type='submit'
                    disabled={mainSubmitting || Boolean(selected?.pendingRequest)}
                    className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60'
                  >
                    <Save className='h-4 w-4' />

                    {mainSubmitting ? "Saving..." : pageConfig.saveButtonLabel}
                  </button>
                </div>

                {/* MANDATORY NOTE */}

                <p className='mt-4 text-[11px] text-red-500'>
                  {pageConfig.mandatoryNote}
                </p>
              </form>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE - TEA TYPE LIST
          ================================================== */}

          <div className='lg:col-span-7'>
            <div className='rounded-lg border border-slate-200 bg-white'>
              {/* LIST HEADER */}

              <div className='flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='text-sm font-bold text-emerald-700'>
                  {pageConfig.listTitle}
                </h2>

                <button
                  type='button'
                  onClick={handleOpenModal}
                  className='flex h-9 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-xs font-semibold text-white'
                >
                  <Plus className='h-4 w-4' />

                  {pageConfig.addButtonLabel}
                </button>
              </div>

              {/* TABLE */}

              <div className='overflow-x-auto p-3'>
                <table className='w-full min-w-[850px] text-left text-xs'>
                  {/* TABLE HEADER */}

                  <thead>
                    <tr className='bg-slate-50 text-slate-700'>
                      {teaTypeTableHeaders.map((header) => (
                        <th
                          key={header.key}
                          className={`px-3 py-3 font-semibold ${
                            header.align === "center"
                              ? "text-center"
                              : "text-left"
                          }`}
                        >
                          {header.label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* TABLE BODY */}

                  <tbody className='divide-y divide-slate-100'>
                    {list.loading && !list.data ? (
                      <TableSkeleton rows={5} columns={teaTypeTableHeaders.length} />
                    ) : list.error ? (
                      <tr>
                        <td colSpan={teaTypeTableHeaders.length} className='p-4'>
                          <ErrorState message={list.error.message} onRetry={list.reload} />
                        </td>
                      </tr>
                    ) : rows.length === 0 ? (
                      <EmptyRow columns={teaTypeTableHeaders.length} message='No tea types found' />
                    ) : (
                      rows.map((teaType, index) => (
                        <tr key={teaType.id}>
                          <td className='px-3 py-4'>{(page - 1) * PER_PAGE + index + 1}</td>

                          <td className='px-3 py-4'>{teaType.teaTypeCode}</td>

                          <td className='px-3 py-4'>{teaType.teaTypeName}</td>

                          <td className='px-3 py-4'>{teaType.shortName ?? "-"}</td>

                          <td className='px-3 py-4'>
                            {teaType.processingMethodLabel}
                          </td>

                          <td className='px-3 py-4'>
                            <PendingBadge row={teaType} />
                            <span
                              className={`rounded px-2 py-1 text-[11px] font-semibold ${
                                teaType.status === "ACTIVE"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {teaType.statusLabel}
                            </span>
                          </td>

                          <td className='px-3 py-4'>
                            <div className='flex justify-center gap-2'>
                              <button
                                type='button'
                                title={waitingTitle(teaType, "Edit")}
                                disabled={Boolean(teaType.pendingRequest)}
                                onClick={() => startEdit(teaType)}
                                className='cursor-pointer rounded border border-emerald-200 p-1.5 text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40'
                              >
                                <Pencil className='h-3.5 w-3.5' />
                              </button>

                              <button
                                type='button'
                                title={waitingTitle(teaType, "Delete")}
                                disabled={Boolean(teaType.pendingRequest)}
                                onClick={() => setDeleting(teaType)}
                                className='cursor-pointer rounded border border-red-200 p-1.5 text-red-500 disabled:cursor-not-allowed disabled:opacity-40'
                              >
                                <Trash2 className='h-3.5 w-3.5' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}

              <div className='flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
                <p className='text-xs text-slate-500'>
                  Showing {from} to {to} of {total} entries
                </p>

                <div className='flex items-center gap-1'>
                  <button
                    type='button'
                    aria-label='Previous page'
                    disabled={page <= 1}
                    onClick={() => setPage((current) => current - 1)}
                    className='cursor-pointer rounded border border-slate-200 px-3 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    ‹
                  </button>

                  <button
                    type='button'
                    className='cursor-pointer rounded bg-emerald-700 px-3 py-1.5 text-xs text-white'
                  >
                    {page}
                  </button>

                  <button
                    type='button'
                    aria-label='Next page'
                    disabled={page >= totalPages}
                    onClick={() => setPage((current) => current + 1)}
                    className='cursor-pointer rounded border border-slate-200 px-3 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ADD NEW TEA TYPE MODAL
      ====================================================== */}

      {isTeaTypeModalOpen && (
        <div
          className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4'
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          {/* MODAL CONTAINER */}

          <div className='w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl'>
            {/* MODAL HEADER */}

            <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
              <div>
                <h2 className='text-base font-bold text-emerald-700'>
                  {pageConfig.addButtonLabel}
                </h2>

                <p className='mt-0.5 text-xs text-slate-500'>
                  Enter tea type information
                </p>
              </div>

              <button
                type='button'
                onClick={handleCloseModal}
                className='cursor-pointer rounded-md p-2 text-slate-500 hover:bg-slate-100'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            {/* MODAL FORM */}

            <form onSubmit={handleModalSubmit(onModalSubmit)}>
              <div className='max-h-[75vh] overflow-y-auto p-5'>
                <TeaTypeFields register={registerModal} errors={modalErrors} options={options.data} />
              </div>

              {/* MODAL FOOTER */}

              <div className='flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-600'
                >
                  <X className='h-4 w-4' />

                  {pageConfig.cancelButtonLabel}
                </button>

                <button
                  type='submit'
                  disabled={modalSubmitting}
                  className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60'
                >
                  <Save className='h-4 w-4' />

                  {modalSubmitting ? "Saving..." : pageConfig.saveButtonLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.teaTypeName ?? "tea type"}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default TeaType;
