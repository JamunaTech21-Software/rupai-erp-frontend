import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

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
const TeaGrade = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [selectedGrade, setSelectedGrade] = useState(teaGradeData.grades[0]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isAddMode, setIsAddMode] = useState(false);

  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gradeCode: teaGradeData.grades[0].gradeCode,
      gradeName: teaGradeData.grades[0].gradeName,
      teaType: teaGradeData.grades[0].teaType,
      category: teaGradeData.grades[0].category,
      standard: teaGradeData.grades[0].standard,
      gradeSize: teaGradeData.grades[0].gradeSize,
      status: teaGradeData.grades[0].status,
      description: teaGradeData.grades[0].description,
      remarks: teaGradeData.grades[0].remarks,
    },
  });

  // =========================================================
  // ICON MAP
  // =========================================================

  const iconMap = {
    cup: Coffee,
    shield: ShieldCheck,
    inactive: CircleX,
    tag: Tag,
    edit: Edit3,
    clock: Clock3,
    user: User,
  };

  // =========================================================
  // FILTERED GRADES
  // =========================================================

  const filteredGrades = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return teaGradeData.grades;
    }

    return teaGradeData.grades.filter(
      (grade) =>
        grade.gradeCode.toLowerCase().includes(search) ||
        grade.gradeName.toLowerCase().includes(search) ||
        grade.teaType.toLowerCase().includes(search) ||
        grade.category.toLowerCase().includes(search),
    );
  }, [searchTerm]);

  // =========================================================
  // SELECT GRADE
  // =========================================================

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
    setIsAddMode(false);

    reset({
      gradeCode: grade.gradeCode,
      gradeName: grade.gradeName,
      teaType: grade.teaType,
      category: grade.category,
      standard: grade.standard,
      gradeSize: grade.gradeSize,
      status: grade.status,
      description: grade.description,
      remarks: grade.remarks,
    });
  };

  // =========================================================
  // ADD NEW GRADE
  // =========================================================

  const handleAddNewGrade = () => {
    setIsAddMode(true);
    setSelectedGrade(null);

    reset({
      gradeCode: "",
      gradeName: "",
      teaType: "",
      category: "",
      standard: "",
      gradeSize: "",
      status: "Active",
      description: "",
      remarks: "",
    });
  };

  // =========================================================
  // RESET FORM
  // =========================================================

  const handleReset = () => {
    if (isAddMode) {
      reset({
        gradeCode: "",
        gradeName: "",
        teaType: "",
        category: "",
        standard: "",
        gradeSize: "",
        status: "Active",
        description: "",
        remarks: "",
      });

      return;
    }

    if (selectedGrade) {
      reset({
        gradeCode: selectedGrade.gradeCode,
        gradeName: selectedGrade.gradeName,
        teaType: selectedGrade.teaType,
        category: selectedGrade.category,
        standard: selectedGrade.standard,
        gradeSize: selectedGrade.gradeSize,
        status: selectedGrade.status,
        description: selectedGrade.description,
        remarks: selectedGrade.remarks,
      });
    }
  };

  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const onSubmit = () => {

    if (isAddMode) {
    } else {
    }
  };

  // =========================================================
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {
    if (status === "Active") {
      return "bg-emerald-50 text-emerald-700";
    }

    return "bg-red-50 text-red-600";
  };

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
        {teaGradeData.summaryCards.map((card) => {
          const Icon = iconMap[card.icon];

          return (
            <div
              key={card.id}
              className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'
            >
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50'>
                  {Icon && <Icon className='h-5 w-5 text-emerald-600' />}
                </div>

                <div className='min-w-0'>
                  <p className='text-[10px] font-medium text-slate-500'>
                    {card.title}
                  </p>

                  <p className='mt-1 text-lg font-bold text-slate-800'>
                    {card.value}
                  </p>

                  <p className='text-[9px] text-slate-500'>{card.subtitle}</p>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search grade name or code...'
                className='h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-[11px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500'
              />
            </div>

            {/* Filter */}

            <button
              type='button'
              className='flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 text-xs font-medium text-slate-600 hover:bg-slate-50'
            >
              <Tag className='h-3.5 w-3.5 text-emerald-600' />
              Filters
            </button>

            {/* Add */}

            <button
              type='button'
              onClick={handleAddNewGrade}
              className='flex h-9 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-xs font-medium text-white hover:bg-emerald-800'
            >
              <Plus className='h-4 w-4' />
              Add New Grade
            </button>
          </div>
        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className='max-h-[350px] overflow-auto'>
          <table className='w-full min-w-[1100px] text-left'>
            <thead>
              <tr className='bg-slate-50'>
                {teaGradeData.tableHeaders.map((header) => (
                  <th
                    key={header}
                    className='whitespace-nowrap px-3 py-3 text-[10px] font-semibold text-slate-600'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredGrades.map((grade, index) => {
                const isSelected = selectedGrade?.id === grade.id;

                return (
                  <tr
                    key={grade.id}
                    onClick={() => handleSelectGrade(grade)}
                    className={`cursor-pointer border-b border-slate-100 transition ${
                      isSelected ? "bg-emerald-50/40" : "hover:bg-slate-50"
                    }`}
                  >
                    <td className='px-3 py-3 text-[12px] text-slate-600'>
                      {index + 1}
                    </td>

                    <td className='px-3 py-3 text-[12px] font-semibold text-slate-700'>
                      {grade.gradeCode}
                    </td>

                    <td className='px-3 py-3 text-[12px] font-medium text-slate-700'>
                      {grade.gradeName}
                    </td>

                    <td className='px-3 py-3 text-[12px] text-slate-600'>
                      {grade.teaType}
                    </td>

                    <td className='px-3 py-3 text-[12px] text-slate-600'>
                      {grade.category}
                    </td>

                    <td className='px-3 py-3 text-[12px] text-slate-600'>
                      {grade.standard}
                    </td>

                    <td className='px-3 py-3'>
                      <span
                        className={`rounded px-2 py-1 text-[12px] font-medium ${getStatusClass(
                          grade.status,
                        )}`}
                      >
                        {grade.status}
                      </span>
                    </td>

                    <td className='whitespace-nowrap px-3 py-3 text-[12px] text-slate-600'>
                      {grade.createdBy}
                    </td>

                    <td className='whitespace-nowrap px-3 py-3 text-[12px] text-slate-600'>
                      {grade.createdOn}
                    </td>

                    <td className='px-3 py-3'>
                      <div className='flex items-center gap-2'>
                        <button
                          type='button'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectGrade(grade);
                          }}
                          className='flex h-7 w-7 items-center justify-center rounded-md border border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                        >
                          <Pencil className='h-3.5 w-3.5' />
                        </button>

                        <button
                          type='button'
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className='flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50'
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

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-[10px] text-slate-500'>
            Showing 1 to {filteredGrades.length} of {filteredGrades.length}{" "}
            entries
          </p>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50'
            >
              <ChevronLeft className='h-3.5 w-3.5' />
            </button>

            <button
              type='button'
              className='flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 text-xs font-medium text-white'
            >
              1
            </button>

            <button
              type='button'
              className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50'
            >
              <ChevronRight className='h-3.5 w-3.5' />
            </button>

            <Select
              defaultValue='10'
              className='h-8 rounded-md border border-slate-200 bg-white px-2 text-[10px] text-slate-600 outline-none'
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
            GRADE DETAILS
        ===================================================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-8'
        >
          {/* =========================================================
                    HEADER
                ========================================================= */}
          <div className='mb-2 flex items-center justify-between'>
            <h2 className='text-sm font-bold text-emerald-700'>
              {isAddMode ? "Add Grade" : teaGradeData.form.title}
            </h2>

            <button
              type='button'
              onClick={handleReset}
              className='flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50'
            >
              <RotateCcw className='h-3.5 w-3.5' />

              {teaGradeData.form.resetButton.label}
            </button>
          </div>

          {/* =========================================================
                    FORM FIELDS
                ========================================================= */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            {teaGradeData.form.fields.map((field) => {
              /* =====================================================
                    FIELD COLUMN SIZE
                ===================================================== */

              let fieldClass = "";

              // Standard / Specification → 2 columns
              if (field.name === "standard") {
                fieldClass = "md:col-span-2";
              }

              // Grade Size / Particle → 2 columns
              else if (field.name === "gradeSize") {
                fieldClass = "md:col-span-2";
              }

              // Description → 3 columns
              else if (field.name === "description") {
                fieldClass = "md:col-span-3";
              }

              // Status → 1 column
              else if (field.name === "status") {
                fieldClass = "md:col-span-1";
              }

              // Normal fields → 1 column
              else {
                fieldClass = "md:col-span-1";
              }

              return (
                <div key={field.name} className={fieldClass}>
                  {/* =================================================
                        LABEL
                    ================================================= */}
                  <label className='mb-2 block text-xs font-medium text-slate-700'>
                    {field.label}

                    {field.required && (
                      <span className='ml-1 text-red-500'>*</span>
                    )}
                  </label>

                  {/* =================================================
                            TEXT INPUT
                        ================================================= */}
                  {field.type === "text" && (
                    <input
                      type='text'
                      placeholder={field.placeholder}
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    />
                  )}

                  {/* =================================================
                            TEA TYPE
                        ================================================= */}
                  {field.name === "teaType" && (
                    <Select
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    >
                      <option value=''>{field.placeholder}</option>

                      {teaGradeData.form.teaTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  )}

                  {/* =================================================
                            CATEGORY
                        ================================================= */}
                  {field.name === "category" && (
                    <Select
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    >
                      <option value=''>{field.placeholder}</option>

                      {teaGradeData.form.categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  )}

                  {/* =================================================
                            STATUS
                        ================================================= */}
                  {field.name === "status" && (
                    <Select
                      {...register(field.name, {
                        required: field.required
                          ? `${field.label} is required`
                          : false,
                      })}
                      className='h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    >
                      <option value=''>{field.placeholder}</option>

                      {teaGradeData.form.statusOptions.map((option) => (
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
                    <p className='mt-1 text-[10px] text-red-500'>
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              );
            })}

            {/* =======================================================
                    DESCRIPTION
                ======================================================= */}
            <div className='md:col-span-3'>
              <label className='mb-2 block text-xs font-medium text-slate-700'>
                {teaGradeData.form.description.label}
              </label>

              <textarea
                rows={3}
                maxLength={teaGradeData.form.description.maxLength}
                placeholder={teaGradeData.form.description.placeholder}
                {...register(teaGradeData.form.description.name)}
                className='w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
              />
            </div>
          </div>

          {/* =========================================================
                    REMARKS
                ========================================================= */}
          <div className='mt-2'>
            <label className='mb-2 block text-xs font-medium text-slate-700'>
              {teaGradeData.form.remarks.label}
            </label>

            <textarea
              rows={3}
              maxLength={teaGradeData.form.remarks.maxLength}
              placeholder={teaGradeData.form.remarks.placeholder}
              {...register(teaGradeData.form.remarks.name)}
              className='w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
            />
          </div>

          {/* =========================================================
                    FOOTER
                ========================================================= */}
          <div className='mt-2 flex flex-col gap-3 border-t border-slate-100 pt-2 sm:flex-row sm:items-center sm:justify-between'>
            {/* Created Information */}
            <div className='text-[10px] text-slate-500'>
              {selectedGrade && !isAddMode ? (
                <>
                  Created On :{" "}
                  <span className='font-medium text-slate-700'>
                    {selectedGrade.createdOn}
                  </span>
                  <span className='mx-2'>|</span>
                  Created By :{" "}
                  <span className='font-medium text-slate-700'>
                    {selectedGrade.createdBy}
                  </span>
                </>
              ) : (
                <span className='text-slate-400'>
                  New grade will be created
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className='flex  gap-2'>
              {/* Cancel */}
              <button
                type='button'
                onClick={() => {
                  handleReset();

                  if (isAddMode) {
                    setIsAddMode(false);
                    handleSelectGrade(teaGradeData.grades[0]);
                  }
                }}
                className='flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50'
              >
                <X className='h-3.5 w-3.5' />

                {teaGradeData.form.footer.cancelButton.label}
              </button>

              {/* Submit */}
              <button
                type='submit'
                className='flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-800'
              >
                <Save className='h-3.5 w-3.5' />

                {isAddMode
                  ? "Save Grade"
                  : teaGradeData.form.footer.submitButton.label}
              </button>
            </div>
          </div>
        </form>

        {/* =====================================================
            GRADE INFORMATION
        ===================================================== */}

        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-4'>
          {/* =================================================
                HEADER
            ================================================= */}
          <div className='mb-2'>
            <h2 className='text-xl font-bold text-emerald-700'>
              {teaGradeData.information.title}
            </h2>
          </div>

          {/* =================================================
                INFORMATION + DISTRIBUTION
            ================================================= */}
          <div className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
            {/* =================================================
                    LEFT - INFORMATION ITEMS
                ================================================= */}
            <div className='space-y-3'>
              {teaGradeData.information.items.map((item) => {
                const Icon = iconMap[item.icon];

                return (
                  <div
                    key={item.id}
                    className='flex items-center justify-between border-b border-slate-100 pb-2 last:border-0'
                  >
                    {/* Label */}
                    <div className='flex min-w-0 items-center gap-2'>
                      {Icon && (
                        <Icon className='h-4 w-4 shrink-0 text-emerald-600' />
                      )}

                      <span className='truncate text-[12px] font-medium text-slate-500'>
                        {item.label}
                      </span>
                    </div>

                    {/* Value */}
                    <span className='ml-3 shrink-0 text-[12px] font-semibold text-slate-700'>
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* =================================================
                    RIGHT - TEA TYPE DISTRIBUTION
                ================================================= */}
            <div className='rounded-lg bg-slate-50 p-3'>
              <h3 className='mb-3 text-[12px] font-semibold text-slate-700'>
                Tea Type Distribution
              </h3>

              {/* ================= CHART ================= */}
              <div className='relative h-[150px] w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={teaGradeData.teaTypeDistribution}
                      dataKey='value'
                      nameKey='name'
                      cx='50%'
                      cy='50%'
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={2}
                      stroke='none'
                    >
                      {teaGradeData.teaTypeDistribution.map((entry, index) => {
                        const chartColors = [
                          "#16a34a",
                          "#2563eb",
                          "#f59e0b",
                          "#ef4444",
                          "#8b5cf6",
                        ];

                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.color ||
                              chartColors[index % chartColors.length]
                            }
                          />
                        );
                      })}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* ================= CENTER TOTAL ================= */}
                <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <span className='text-[12px] font-medium text-slate-500'>
                      Total
                    </span>

                    <span className='text-lg font-bold text-slate-800'>
                      {teaGradeData.information.items.find(
                        (item) => item.label.toLowerCase() === "total grades",
                      )?.value || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* =================================================
                    DISTRIBUTION LEGEND
                ================================================= */}
              <div className='mt-5 space-y-4'>
                {teaGradeData.teaTypeDistribution.map((item, index) => {
                  const chartColors = [
                    "#16a34a",
                    "#2563eb",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                  ];

                  const itemColor =
                    item.color || chartColors[index % chartColors.length];

                  const total = teaGradeData.teaTypeDistribution.reduce(
                    (sum, current) => sum + Number(current.value || 0),
                    0,
                  );

                  const percentage =
                    total > 0
                      ? ((Number(item.value) / total) * 100).toFixed(2)
                      : 0;

                  return (
                    <div
                      key={item.name}
                      className='flex items-center justify-between'
                    >
                      {/* Name */}
                      <div className='flex min-w-0 items-center gap-2'>
                        <span
                          className='h-2 w-2 shrink-0 rounded-full'
                          style={{ backgroundColor: itemColor }}
                        />

                        <span className='truncate text-[9px] text-slate-600'>
                          {item.name}
                        </span>
                      </div>

                      {/* Value + Percentage */}
                      <span className='ml-2 shrink-0 text-[12px] font-medium text-slate-700'>
                        {item.value} ({percentage}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaGrade;
