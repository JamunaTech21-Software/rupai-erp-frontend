import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "../../lib/useForm";
import toast from "react-hot-toast";

import {
  ChevronLeft,
  ChevronRight,
  CircleX,
  Clock3,
  Coffee,
  Edit3,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Search,
  ShieldCheck,
  Tag,
  Trash2,
  User,
  X,
} from "lucide-react";

import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

import MasterDataTabs from "./MasterDataTabs";
import teaGradeData from "../../data/MasterData/teaGradeData";
import Select from "../../components/common/Select";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import PendingBadge from "../../components/common/PendingBadge";
import { waitingTitle } from "../../lib/waitingTitle";

const DASH = "-";
const CHART_COLORS = ["#16a34a", "#2563eb", "#f59e0b", "#ef4444", "#8b5cf6"];
const EMPTY_FORM = {
  gradeCode: "",
  gradeName: "",
  teaType: "",
  category: "",
  standard: "",
  gradeSize: "",
  status: "Active",
  description: "",
  remarks: "",
};
const EMPTY_FILTERS = { teaType: "", category: "", status: "" };
const FORM_KEYS = Object.keys(EMPTY_FORM);
const OPTIONAL_KEYS = ["standard", "gradeSize", "description", "remarks"];
const filterClass =
  "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none focus:border-emerald-500";
const inputClass =
  "h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100";

// A saved grade as form values (empty optional values come back as null).
const toForm = (grade) => Object.fromEntries(FORM_KEYS.map((key) => [key, grade[key] ?? EMPTY_FORM[key]]));
// Cleared optional text goes to the server as null.
const toBody = (values) =>
  Object.fromEntries(
    FORM_KEYS.map((key) => {
      const text = String(values[key] ?? "").trim();
      return [key, OPTIONAL_KEYS.includes(key) && text === "" ? null : text];
    }),
  );
const stamp = (value) =>
  value
    ? new Date(value)
        .toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })
        .replace(",", "")
        .toUpperCase()
    : DASH;

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const iconMap = {
  cup: Coffee,
  shield: ShieldCheck,
  inactive: CircleX,
  tag: Tag,
  edit: Edit3,
  clock: Clock3,
  user: User,
};

const getStatusClass = (status) => (status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600");

const TeaGrade = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [formOpen, setFormOpen] = useState(false); // the Add / Edit popup
  const [selected, setSelected] = useState(null); // the grade shown in the form; none = a new grade
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const searchText = useDebounced(search.trim());

  // =========================================================
  // DATA
  // =========================================================

  const filterOptions = useApi(() => api.get("/tea-grades/filter-options"), []);
  const activeTypes = useApi(() => api.get("/options/tea-types", { status: "ACTIVE" }), []);
  const allTypes = useApi(() => api.get("/options/tea-types"), []);
  const list = useApi(
    () => api.get("/tea-grades", { search: searchText, ...filters, page, perPage }),
    [searchText, filters.teaType, filters.category, filters.status, page, perPage],
  );
  const summary = useApi(() => api.get("/tea-grades/summary"), []);
  const rows = list.data?.data ?? [];
  const total = list.data?.meta?.total ?? 0;
  const totalPages = Math.max(list.data?.meta?.totalPages ?? 1, 1);
  const from = rows.length > 0 ? (page - 1) * perPage + 1 : 0;
  const to = (page - 1) * perPage + rows.length;
  const stats = summary.data;

  // A page that no longer exists (after a delete or a filter) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  const refresh = () => {
    list.reload();
    summary.reload();
  };

  // The Tea Type dropdown lists active types; a saved grade whose type is no longer active keeps it.
  const teaTypeChoices = useMemo(() => {
    const choices = [...(activeTypes.data ?? [])];
    if (selected?.teaType && !choices.some((option) => option.value === selected.teaType)) {
      choices.push({ value: selected.teaType, label: selected.teaTypeName ?? selected.teaType });
    }
    return choices;
  }, [activeTypes.data, selected]);

  const setFilter = (name) => (event) => {
    setFilters((current) => ({ ...current, [name]: event.target.value }));
    setPage(1);
  };
  const hasFilters = Object.values(filters).some(Boolean);

  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  // Server errors go to the field they belong to; anything else is a message.
  const showErrors = (error) => {
    const fields = error.fields ?? {};
    let unplaced = false;
    for (const [key, message] of Object.entries(fields)) {
      if (FORM_KEYS.includes(key)) setError(key, { message });
      else unplaced = true;
    }
    if (unplaced || Object.keys(fields).length === 0) toast.error(error.message);
  };

  // =========================================================
  // SELECT / ADD / RESET
  // =========================================================

  const handleSelectGrade = (grade) => {
    setSelected(grade);
    reset(toForm(grade));
    setFormOpen(true);
  };

  const handleAddNewGrade = () => {
    setSelected(null);
    reset(EMPTY_FORM);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setSelected(null);
    reset(EMPTY_FORM);
  };

  const handleReset = () => reset(selected ? toForm(selected) : EMPTY_FORM);

  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const onSubmit = async (values) => {
    try {
      const body = toBody(values);
      const result = selected ? await api.put(`/tea-grades/${selected.id}`, body) : await api.post("/tea-grades", body);
      notifySaved(result, selected ? "Tea grade updated successfully!" : "Tea grade saved successfully!");
      closeForm();
      if (!selected) setPage(1);
      refresh();
    } catch (error) {
      showErrors(error);
    }
  };

  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      const result = await api.del(`/tea-grades/${deleting.id}`);
      notifySaved(result, "Tea grade deleted successfully!");
      if (selected?.id === deleting.id) closeForm();
      setDeleting(null);
      refresh();
    } catch (error) {
      toast.error(error.message);
      setDeleting(null);
    } finally {
      setDeleteBusy(false);
    }
  };

  const waiting = selected?.pendingRequest;

  // =========================================================
  // SUMMARY (cards + information panel)
  // =========================================================

  const count = (value) => (stats ? value : DASH);
  const summaryCards = [
    { ...teaGradeData.summaryCards[0], value: count(stats?.totalGrades) },
    { ...teaGradeData.summaryCards[1], value: count(stats?.activeGrades) },
    { ...teaGradeData.summaryCards[2], value: count(stats?.inactiveGrades) },
    { ...teaGradeData.summaryCards[3], value: count(stats?.standardGrades) },
    { ...teaGradeData.summaryCards[4], value: count(stats?.customGrades) },
  ];
  const infoItems = [
    ...summaryCards.map((card, index) => ({ ...teaGradeData.information.items[index], value: card.value })),
    { ...teaGradeData.information.items[5], value: stats?.lastUpdated ? stamp(stats.lastUpdated) : DASH },
    { ...teaGradeData.information.items[6], value: stats?.lastUpdatedBy ?? DASH },
  ];
  const distribution = stats?.teaTypeDistribution ?? [];
  const distributionTotal = distribution.reduce((sum, item) => sum + Number(item.value || 0), 0);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className='space-y-4'>
      {/* =========================================================
          MASTER DATA TABS
      ========================================================= */}

      <MasterDataTabs />

      {/* =========================================================
          SUMMARY CARDS
      ========================================================= */}

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {summaryCards.map((card) => {
          const Icon = iconMap[card.icon];

          return (
            <div key={card.id} className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50'>
                  {Icon && <Icon className='h-5 w-5 text-emerald-600' />}
                </div>

                <div className='min-w-0'>
                  <p className='text-[11px] font-medium text-slate-500'>{card.title}</p>

                  <p className='mt-1 text-lg font-bold text-slate-800'>{card.value}</p>

                  <p className='text-[10px] text-slate-500'>{card.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
          GRADE LIST
      ========================================================= */}

      <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
        {/* Header */}

        <div className='mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
          <h2 className='text-xl font-bold text-emerald-700'>Tea Grade List</h2>

          <div className='flex flex-col gap-2 sm:flex-row'>
            {/* Search */}

            <div className='relative w-full sm:w-56'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />

              <input
                type='text'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder='Search grade name or code...'
                className='h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-[12px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500'
              />
            </div>

            {/* Filter */}

            <button
              type='button'
              onClick={() => setShowFilters((open) => !open)}
              aria-expanded={showFilters}
              className={`flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 text-xs font-medium text-slate-600 hover:bg-slate-50 ${
                hasFilters || showFilters ? "bg-emerald-50" : ""
              }`}
            >
              <Tag className='h-3.5 w-3.5 text-emerald-600' />
              Filters
            </button>

            {/* Add */}

            <button
              type='button'
              onClick={handleAddNewGrade}
              className='flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 text-sm font-medium text-white hover:bg-emerald-800'
            >
              <Plus className='h-4 w-4' />
              Add New Grade
            </button>
          </div>
        </div>

        {/* =====================================================
            FILTERS PANEL
        ===================================================== */}

        {showFilters && (
          <div className='mb-4 grid grid-cols-1 items-end gap-3 rounded-md border border-slate-100 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='min-w-0'>
              <label className='mb-1.5 block text-[12px] font-semibold text-slate-700'>Tea Type</label>
              <Select value={filters.teaType} onChange={setFilter("teaType")} className={filterClass}>
                <option value=''>All</option>
                {(allTypes.data ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className='min-w-0'>
              <label className='mb-1.5 block text-[12px] font-semibold text-slate-700'>Category</label>
              <Select value={filters.category} onChange={setFilter("category")} className={filterClass}>
                <option value=''>All</option>
                {(filterOptions.data?.categories ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className='min-w-0'>
              <label className='mb-1.5 block text-[12px] font-semibold text-slate-700'>Status</label>
              <Select value={filters.status} onChange={setFilter("status")} className={filterClass}>
                <option value=''>All</option>
                {(filterOptions.data?.statuses ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <button
              type='button'
              disabled={!hasFilters}
              onClick={() => {
                setFilters(EMPTY_FILTERS);
                setPage(1);
              }}
              className='h-9 rounded-md border border-slate-200 bg-white px-4 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className='max-h-[350px] overflow-auto'>
          <table className='w-full min-w-[1100px] text-left'>
            <thead>
              <tr className='bg-slate-50'>
                {teaGradeData.tableHeaders.map((header) => (
                  <th key={header} className='whitespace-nowrap px-3 py-3 text-[11px] font-semibold text-slate-600'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {list.loading && !list.data ? (
                <TableSkeleton rows={5} columns={teaGradeData.tableHeaders.length} />
              ) : list.error ? (
                <tr>
                  <td colSpan={teaGradeData.tableHeaders.length} className='p-4'>
                    <ErrorState message={list.error.message} onRetry={list.reload} />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <EmptyRow columns={teaGradeData.tableHeaders.length} message='No tea grades found' />
              ) : (
                rows.map((grade, index) => {
                  const isSelected = selected?.id === grade.id;

                  return (
                    <tr
                      key={grade.id}
                      onClick={() => handleSelectGrade(grade)}
                      className={`cursor-pointer border-b border-slate-100 transition ${isSelected ? "bg-emerald-50/40" : "hover:bg-slate-50"}`}
                    >
                      <td className='px-3 py-3 text-[12px] text-slate-600'>{(page - 1) * perPage + index + 1}</td>

                      <td className='px-3 py-3 text-[12px] font-semibold text-slate-700'>{grade.gradeCode}</td>

                      <td className='px-3 py-3 text-[12px] font-medium text-slate-700'>{grade.gradeName}</td>

                      <td className='px-3 py-3 text-[12px] text-slate-600'>{grade.teaTypeName ?? DASH}</td>

                      <td className='px-3 py-3 text-[12px] text-slate-600'>{grade.category}</td>

                      <td className='px-3 py-3 text-[12px] text-slate-600'>{grade.standard ?? DASH}</td>

                      <td className='px-3 py-3'>
                        <PendingBadge row={grade} />
                        <span className={`rounded px-2 py-1 text-[12px] font-medium ${getStatusClass(grade.status)}`}>{grade.status}</span>
                      </td>

                      <td className='whitespace-nowrap px-3 py-3 text-[12px] text-slate-600'>{grade.createdByName ?? DASH}</td>

                      <td className='whitespace-nowrap px-3 py-3 text-[12px] text-slate-600'>{stamp(grade.createdAt)}</td>

                      <td className='px-3 py-3'>
                        <div className='flex items-center gap-2'>
                          <button
                            type='button'
                            title={waitingTitle(grade, "Edit")}
                            disabled={Boolean(grade.pendingRequest)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectGrade(grade);
                            }}
                            className='flex h-7 w-7 items-center justify-center rounded-md border border-emerald-200 text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40'
                          >
                            <Pencil className='h-3.5 w-3.5' />
                          </button>

                          <button
                            type='button'
                            title={waitingTitle(grade, "Delete")}
                            disabled={Boolean(grade.pendingRequest)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleting(grade);
                            }}
                            className='flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40'
                          >
                            <Trash2 className='h-3.5 w-3.5' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-[11px] text-slate-500'>
            Showing {from} to {to} of {total} entries
          </p>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              aria-label='Previous page'
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
              className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
            >
              <ChevronLeft className='h-3.5 w-3.5' />
            </button>

            <button type='button' className='flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-xs font-medium text-white'>
              {page}
            </button>

            <button
              type='button'
              aria-label='Next page'
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
              className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
            >
              <ChevronRight className='h-3.5 w-3.5' />
            </button>

            <Select
              value={String(perPage)}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className='h-8 rounded-md border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none'
            >
              <option value='10'>10 / page</option>
              <option value='20'>20 / page</option>
              <option value='50'>50 / page</option>
            </Select>
          </div>
        </div>
      </div>

      {/* =========================================================
          DETAILS + INFORMATION
      ========================================================= */}

      <div className='grid grid-cols-1 gap-2 xl:grid-cols-12'>
        {/* =====================================================
            GRADE DETAILS (popup)
        ===================================================== */}

        <div
          className={formOpen ? "fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6" : "xl:col-span-8"}
          onMouseDown={formOpen ? (e) => e.target === e.currentTarget && closeForm() : undefined}
        >
        <form
          onSubmit={handleSubmit(onSubmit)}
          role={formOpen ? "dialog" : undefined}
          aria-modal={formOpen ? "true" : undefined}
          className={formOpen ? "w-full max-w-4xl rounded-lg bg-white p-5 shadow-xl" : "rounded-lg border border-slate-200 bg-white p-4 shadow-sm"}
        >
          <div className='mb-2 flex items-center'>
            <h2 className='mr-auto text-sm font-bold text-emerald-700'>{selected ? teaGradeData.form.title : "Add Grade"}</h2>

            <button
              type='button'
              onClick={handleReset}
              className='flex items-center gap-2 rounded-md border border-slate-200 px-5 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50'
            >
              <RotateCcw className='h-3.5 w-3.5' />

              {teaGradeData.form.resetButton.label}
            </button>

            {formOpen && (
              <button
                type='button'
                onClick={closeForm}
                aria-label='Close'
                title='Close'
                className='ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </div>

          {waiting && (
            <p role='status' className='mb-3 rounded-md bg-amber-50 px-3 py-2 text-[12px] text-amber-700'>
              Waiting for approval ({waiting.requestNo}). This grade cannot be saved until the request is decided.
            </p>
          )}

          {/* =========================================================
                    FORM FIELDS
                ========================================================= */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            {teaGradeData.form.fields.map((field) => {
              const fieldClass = field.name === "standard" || field.name === "gradeSize" ? "md:col-span-2" : "md:col-span-1";
              const rule = { required: field.required ? `${field.label} is required` : false };
              const choices =
                field.name === "teaType"
                  ? teaTypeChoices
                  : field.name === "category"
                    ? (filterOptions.data?.categories ?? teaGradeData.form.categoryOptions)
                    : field.name === "status"
                      ? (filterOptions.data?.statuses ?? teaGradeData.form.statusOptions)
                      : null;

              return (
                <div key={field.name} className={fieldClass}>
                  <label className='mb-2 block text-xs font-medium text-slate-700'>
                    {field.label}

                    {field.required && <span className='ml-1 text-red-500'>*</span>}
                  </label>

                  {field.type === "text" && (
                    <input type='text' placeholder={field.placeholder} {...register(field.name, rule)} className={inputClass} />
                  )}

                  {choices && (
                    <Select {...register(field.name, rule)} className={inputClass}>
                      <option value=''>{field.placeholder}</option>

                      {choices.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  )}

                  {errors[field.name] && <p className='mt-1 text-[11px] text-red-500'>{errors[field.name].message}</p>}
                </div>
              );
            })}

            {/* =======================================================
                    DESCRIPTION
                ======================================================= */}
            <div className='md:col-span-3'>
              <label className='mb-2 block text-xs font-medium text-slate-700'>{teaGradeData.form.description.label}</label>

              <textarea
                rows={3}
                maxLength={teaGradeData.form.description.maxLength}
                placeholder={teaGradeData.form.description.placeholder}
                {...register(teaGradeData.form.description.name)}
                className='w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
              />
              {errors.description && <p className='mt-1 text-[11px] text-red-500'>{errors.description.message}</p>}
            </div>
          </div>

          {/* =========================================================
                    REMARKS
                ========================================================= */}
          <div className='mt-2'>
            <label className='mb-2 block text-xs font-medium text-slate-700'>{teaGradeData.form.remarks.label}</label>

            <textarea
              rows={3}
              maxLength={teaGradeData.form.remarks.maxLength}
              placeholder={teaGradeData.form.remarks.placeholder}
              {...register(teaGradeData.form.remarks.name)}
              className='w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[12px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
            />
            {errors.remarks && <p className='mt-1 text-[11px] text-red-500'>{errors.remarks.message}</p>}
          </div>

          {/* =========================================================
                    FOOTER
                ========================================================= */}
          <div className='mt-2 flex flex-col gap-3 border-t border-slate-100 pt-2 sm:flex-row sm:items-center sm:justify-between'>
            {/* Created Information */}
            <div className='text-[11px] text-slate-500'>
              {selected ? (
                <>
                  Created On : <span className='font-medium text-slate-700'>{stamp(selected.createdAt)}</span>
                  <span className='mx-2'>|</span>
                  Created By : <span className='font-medium text-slate-700'>{selected.createdByName ?? DASH}</span>
                </>
              ) : (
                <span className='text-slate-400'>New grade will be created</span>
              )}
            </div>

            {/* Buttons */}
            <div className='flex  gap-2'>
              <button
                type='button'
                onClick={closeForm}
                className='flex items-center justify-center gap-2 rounded-md border border-slate-200 px-6 py-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50'
              >
                <X className='h-3.5 w-3.5' />

                {teaGradeData.form.footer.cancelButton.label}
              </button>

              <button
                type='submit'
                disabled={isSubmitting || Boolean(waiting)}
                className='flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 py-2.5 text-xs font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60'
              >
                <Save className='h-3.5 w-3.5' />

                {isSubmitting ? "Saving..." : selected ? teaGradeData.form.footer.submitButton.label : "Save Grade"}
              </button>
            </div>
          </div>
        </form>
        </div>

        {/* =====================================================
            GRADE INFORMATION
        ===================================================== */}

        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-4'>
          <div className='mb-2'>
            <h2 className='text-xl font-bold text-emerald-700'>{teaGradeData.information.title}</h2>
          </div>

          <div className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
            {/* LEFT - INFORMATION ITEMS */}
            <div className='space-y-3'>
              {infoItems.map((item) => {
                const Icon = iconMap[item.icon];

                return (
                  <div key={item.id} className='flex items-center justify-between border-b border-slate-100 pb-2 last:border-0'>
                    <div className='flex min-w-0 items-center gap-2'>
                      {Icon && <Icon className='h-4 w-4 shrink-0 text-emerald-600' />}

                      <span className='truncate text-[12px] font-medium text-slate-500'>{item.label}</span>
                    </div>

                    <span className='ml-3 shrink-0 text-[12px] font-semibold text-slate-700'>{item.value}</span>
                  </div>
                );
              })}
            </div>

            {/* RIGHT - TEA TYPE DISTRIBUTION */}
            <div className='rounded-lg bg-slate-50 p-3'>
              <h3 className='mb-3 text-[12px] font-semibold text-slate-700'>Tea Type Distribution</h3>

              {distribution.length === 0 ? (
                <p className='py-8 text-center text-[12px] text-slate-400'>No grades yet</p>
              ) : (
                <>
                  <div className='relative h-[150px] w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <PieChart>
                        <Pie data={distribution} dataKey='value' nameKey='name' cx='50%' cy='50%' innerRadius={35} outerRadius={55} paddingAngle={2} stroke='none'>
                          {distribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                          ))}
                        </Pie>

                        <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "6px", border: "1px solid #e2e8f0" }} />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <span className='text-[12px] font-medium text-slate-500'>Total</span>

                        <span className='text-lg font-bold text-slate-800'>{stats?.totalGrades ?? 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className='mt-5 space-y-4'>
                    {distribution.map((item, index) => {
                      const percentage = distributionTotal > 0 ? ((Number(item.value) / distributionTotal) * 100).toFixed(2) : 0;

                      return (
                        <div key={item.name} className='flex items-center justify-between'>
                          <div className='flex min-w-0 items-center gap-2'>
                            <span className='h-2 w-2 shrink-0 rounded-full' style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />

                            <span className='truncate text-[10px] text-slate-600'>{item.name}</span>
                          </div>

                          <span className='ml-2 shrink-0 text-[12px] font-medium text-slate-700'>
                            {item.value} ({percentage}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`Delete ${deleting?.gradeName ?? "tea grade"}?`}
        message='With approval on, the deletion is sent for approval first.'
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default TeaGrade;
