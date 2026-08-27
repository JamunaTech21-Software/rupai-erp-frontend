import React, { useState } from "react";
import { productionEntryData } from "../../data/FactoryAndManufacturing/productionEntryData";
const { rawMaterials, sourceGardens, uoms } = productionEntryData;
import { useForm } from "react-hook-form";
import {
  Calendar,
  ChevronDown,
  Plus,
  ScanLine,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Package,
  ClipboardList,
  Factory,
  Leaf,
  CircleDollarSign,
  X,
  Trash2,
} from "lucide-react";

import FactoryAndManufacturingTabs from "./FactoryAndManufacturingTabs";

const ProductionEntry = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [rawMaterialDetails, setRawMaterialDetails] = useState(
    productionEntryData.rawMaterialDetails || [],
  );
  const [isRawMaterialModalOpen, setIsRawMaterialModalOpen] = useState(false);
  const [rawMaterialForm, setRawMaterialForm] = useState({
    rawMaterial: "",
    sourceGarden: "",
    uom: "",
    quantity: "",
    avgRate: "",
  });

  const {
    productionInformation,
    factories,
    productionLines,
    shifts,
    productionTypes,
    supervisors,
  } = productionEntryData;

  const { productionItems = [] } = productionEntryData;
  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const onSubmit = (data) => {
    console.log("Production Entry Data:", data);
  };
  const handleAddProductionItem = (formData) => {
    const selectedProduct = productionEntryData.products.find(
      (product) => product.id === formData.productId,
    );

    const selectedGrade = productionEntryData.grades.find(
      (grade) => grade.id === formData.gradeId,
    );

    const selectedUom = productionEntryData.uoms.find(
      (uom) => uom.id === formData.uomId,
    );

    const selectedRawMaterial = productionEntryData.rawMaterials.find(
      (material) => material.id === formData.rawMaterialId,
    );

    const quantityProduced = Number(formData.quantityProduced || 0);
    const rejectedWaste = Number(formData.rejectedWaste || 0);

    const newItem = {
      id: `ITEM-${Date.now()}`,

      serialNo: productionItems.length + 1,

      product: {
        id: selectedProduct.id,
        name: selectedProduct.name,
      },

      grade: {
        id: selectedGrade.id,
        name: selectedGrade.name,
      },

      uom: {
        id: selectedUom.id,
        name: selectedUom.name,
      },

      rawMaterial: {
        id: selectedRawMaterial.id,
        name: selectedRawMaterial.name,
      },

      quantityProduced,

      rejectedWaste,

      netOutput: quantityProduced - rejectedWaste,

      status: "active",
    };

    setProductionItems((prev) => [...prev, newItem]);

    reset();

    setIsAddItemModalOpen(false);
  };

  // const handleRawMaterialChange = (e) => {
  //   const { name, value } = e.target;

  //   console.log("Field Name:", name);
  //   console.log("Field Value:", value);

  //   setRawMaterialForm((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const handleAddRawMaterial = (data) => {
    console.log("Form Data:", data);

    const quantity = Number(data.quantity || 0);
    const avgRate = Number(data.avgRate || 0);

    const newRawMaterial = {
      id: Date.now(),

      rawMaterial: {
        name: data.rawMaterial,
      },

      sourceGarden: {
        name: data.sourceGarden,
      },

      uom: {
        name: data.uom,
      },

      quantity,
      avgRate,
      totalCost: quantity * avgRate,
    };

    console.log("New Raw Material:", newRawMaterial);

    setRawMaterials((prev) => {
      const updatedRawMaterials = [...prev, newRawMaterial];

      console.log("Updated Raw Materials:", updatedRawMaterials);

      return updatedRawMaterials;
    });

    reset();

    setIsRawMaterialModalOpen(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {/* =====================================================
          TOP TABS
      ====================================================== */}

      <FactoryAndManufacturingTabs />

      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}

      <div className='grid grid-cols-1 gap-4 xl:grid-cols-12'>
        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div className='space-y-4 xl:col-span-9'>
          {/* =================================================
              PRODUCTION INFORMATION
          ================================================== */}

          <div className='overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'>
            {/* Header */}

            <div className='flex items-center gap-2 border-b border-slate-200 bg-emerald-50 px-5 py-3'>
              <Factory className='h-5 w-5 text-emerald-700' />

              <h2 className='text-base font-semibold text-emerald-700'>
                {productionEntryData.pageInfo.title}
              </h2>
            </div>

            {/* Form Fields */}

            <div className='grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4'>
              {/* =====================================================
                      PRODUCTION DATE
                  ====================================================== */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Production Date <span className='text-red-500'>*</span>
                </label>

                <div className='relative'>
                  <input
                    type='date'
                    defaultValue={productionInformation.productionDate}
                    {...register("productionDate", {
                      required: "Production date is required",
                    })}
                    className={`h-10 w-full rounded-md border bg-white px-3 pr-10 text-sm text-slate-700 outline-none transition focus:ring-1 ${
                      errors.productionDate
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-600"
                    }`}
                  />

                  <Calendar className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
                </div>

                {errors.productionDate && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.productionDate.message}
                  </p>
                )}
              </div>

              {/* =====================================================
                        FACTORY / UNIT
                    ====================================================== */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Factory / Unit <span className='text-red-500'>*</span>
                </label>

                <div className='relative'>
                  <select
                    defaultValue={productionInformation.factory.id}
                    {...register("factoryId", {
                      required: "Factory / Unit is required",
                    })}
                    className={`h-10 w-full appearance-none rounded-md border bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:ring-1 ${
                      errors.factoryId
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-600"
                    }`}
                  >
                    <option value=''>Select Factory / Unit</option>

                    {factories.map((factory) => (
                      <option
                        key={factory.id}
                        value={factory.id}
                        disabled={factory.status !== "active"}
                      >
                        {factory.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
                </div>

                {errors.factoryId && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.factoryId.message}
                  </p>
                )}
              </div>

              {/* =====================================================
                      PRODUCTION LINE
                  ====================================================== */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Production Line
                </label>

                <div className='relative'>
                  <select
                    defaultValue={productionInformation.productionLine.id}
                    {...register("productionLineId")}
                    className='h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                  >
                    <option value=''>Select Production Line</option>

                    {productionLines.map((line) => (
                      <option
                        key={line.id}
                        value={line.id}
                        disabled={line.status !== "active"}
                      >
                        {line.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
                </div>
              </div>

              {/* =====================================================
                      SHIFT
                  ====================================================== */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Shift <span className='text-red-500'>*</span>
                </label>

                <div className='relative'>
                  <select
                    defaultValue={productionInformation.shift.id}
                    {...register("shiftId", {
                      required: "Shift is required",
                    })}
                    className={`h-10 w-full appearance-none rounded-md border bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:ring-1 ${
                      errors.shiftId
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-600"
                    }`}
                  >
                    <option value=''>Select Shift</option>

                    {shifts.map((shift) => (
                      <option key={shift.id} value={shift.id}>
                        {shift.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
                </div>

                {errors.shiftId && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.shiftId.message}
                  </p>
                )}
              </div>

              {/* =====================================================
                      PRODUCTION TYPE
                  ====================================================== */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Production Type <span className='text-red-500'>*</span>
                </label>

                <div className='relative'>
                  <select
                    defaultValue={productionInformation.productionType.id}
                    {...register("productionTypeId", {
                      required: "Production type is required",
                    })}
                    className={`h-10 w-full appearance-none rounded-md border bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:ring-1 ${
                      errors.productionTypeId
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-600"
                    }`}
                  >
                    <option value=''>Select Production Type</option>

                    {productionTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
                </div>

                {errors.productionTypeId && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.productionTypeId.message}
                  </p>
                )}
              </div>

              {/* =====================================================
                        BATCH / LOT NO
                    ====================================================== */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Batch / Lot No.
                </label>

                <input
                  type='text'
                  defaultValue={productionInformation.batchLotNo}
                  placeholder='Enter batch / lot no.'
                  {...register("batchLotNo")}
                  className='h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                />
              </div>

              {/* =====================================================
                        SUPERVISOR
                    ====================================================== */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Supervisor / Incharge <span className='text-red-500'>*</span>
                </label>

                <div className='relative'>
                  <select
                    defaultValue={productionInformation.supervisor.id}
                    {...register("supervisorId", {
                      required: "Supervisor is required",
                    })}
                    className={`h-10 w-full appearance-none rounded-md border bg-white px-3 pr-10 text-sm text-slate-700 outline-none focus:ring-1 ${
                      errors.supervisorId
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-600"
                    }`}
                  >
                    <option value=''>Select Supervisor</option>

                    {supervisors.map((supervisor) => (
                      <option key={supervisor.id} value={supervisor.id}>
                        {supervisor.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
                </div>

                {errors.supervisorId && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.supervisorId.message}
                  </p>
                )}
              </div>

              {/* =====================================================
                      REMARK
                  ====================================================== */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Remark
                </label>

                <input
                  type='text'
                  defaultValue={productionInformation.remark}
                  placeholder='Enter remark (optional)'
                  {...register("remark")}
                  className='h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                />
              </div>
            </div>
          </div>

          {/* =================================================
              PRODUCTION ITEMS
          ================================================== */}

          <div className='overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'>
            {/* =====================================================
                      HEADER
                ====================================================== */}
            <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3'>
              <div className='flex items-center gap-2'>
                <ClipboardList className='h-5 w-5 text-emerald-700' />

                <h2 className='text-base font-semibold text-emerald-700'>
                  Production Items
                </h2>
              </div>

              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  className='flex cursor-pointer h-9 items-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50'
                >
                  <ScanLine className='h-4 w-4' />
                  Scan Raw Material
                </button>

                <button
                  type='button'
                  onClick={() => setIsAddItemModalOpen(true)}
                  className='flex cursor-pointer h-9 items-center gap-2 rounded-md bg-emerald-700 px-3 text-sm font-medium text-white hover:bg-emerald-800'
                >
                  <Plus className='h-4 w-4' />
                  Add Item
                </button>
              </div>
            </div>

            {/* =====================================================
                    TABLE
              ====================================================== */}
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[1050px] table-fixed text-left'>
                {/* FIXED COLUMN WIDTHS */}
                <colgroup>
                  <col className='w-[55px]' />
                  <col className='w-[150px]' />
                  <col className='w-[90px]' />
                  <col className='w-[80px]' />
                  <col className='w-[180px]' />
                  <col className='w-[160px]' />
                  <col className='w-[160px]' />
                  <col className='w-[140px]' />
                  <col className='w-[120px]' />
                </colgroup>

                {/* =================================================
                          HEADER
                    ================================================== */}
                <thead>
                  <tr className='border-b text-center border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600'>
                    <th className='px-4 py-3'>SL</th>

                    <th className='px-4 py-3'>Item / Product</th>

                    <th className='px-4 py-3'>Grade</th>

                    <th className='px-4 py-3'>UOM</th>

                    <th className='px-4 py-3'>Raw Material Used</th>

                    <th className='px-4 py-3'>Quantity Produced</th>

                    <th className='px-4 py-3'>Rejected / Waste</th>

                    <th className='px-4 py-3'>Net Output</th>

                    <th className='px-4 py-3 text-center'>Action</th>
                  </tr>
                </thead>

                {/* =================================================
                          BODY
                    ================================================== */}
                <tbody>
                  {productionItems.length > 0 ? (
                    productionItems.map((item) => (
                      <tr
                        key={item.id}
                        className='border-b border-slate-100 text-sm text-slate-700 hover:bg-slate-50'
                      >
                        <td className='px-4 py-3 text-center'>
                          {item.serialNo}
                        </td>

                        <td className='px-4 py-3 font-medium'>
                          {item.product?.name}
                        </td>

                        <td className='px-4 py-3 text-center'>
                          {item.grade?.name}
                        </td>

                        <td className='px-4 py-3 text-center'>
                          {item.uom?.name}
                        </td>

                        <td className='px-4 py-3 text-center'>
                          {item.rawMaterial?.name}
                        </td>

                        <td className='px-4 py-3 text-center'>
                          {Number(item.quantityProduced || 0).toFixed(2)}
                        </td>

                        <td className='px-4 py-3 text-center text-red-500'>
                          {Number(item.rejectedWaste || 0).toFixed(2)}
                        </td>

                        <td className='px-4 py-3 text-center font-semibold text-emerald-700'>
                          {Number(item.netOutput || 0).toFixed(2)}
                        </td>

                        <td className='px-4 py-3'>
                          <div className='flex items-center justify-center gap-2'>
                            <button
                              type='button'
                              className='rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50'
                            >
                              Edit
                            </button>

                            <button
                              type='button'
                              className='rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50'
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className='px-4 py-12 text-center'>
                        <Package className='mx-auto h-10 w-10 text-slate-300' />

                        <p className='mt-2 text-sm font-medium text-slate-500'>
                          No production items added
                        </p>

                        <p className='mt-1 text-xs text-slate-400'>
                          Click "Add Item" to add production items.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* =================================================
                        FOOTER / TOTAL
                  ================================================== */}
                <tfoot>
                  <tr className='border-t border-slate-200 bg-slate-50'>
                    {/* SL + Item + Grade + UOM */}
                    <td colSpan={4} className='px-4 py-2.5'>
                      <button
                        type='button'
                        className='inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50'
                      >
                        <Plus className='h-4 w-4' />
                        Add Another Item
                      </button>
                    </td>

                    {/* Raw Material Used column */}
                    <td className='px-4 py-2.5 text-right text-sm font-semibold text-slate-700'>
                      Total
                    </td>

                    {/* Quantity Produced */}
                    <td className='px-4 py-2.5 text-center text-sm font-semibold text-slate-700'>
                      {productionItems
                        .reduce(
                          (total, item) =>
                            total + Number(item.quantityProduced || 0),
                          0,
                        )
                        .toFixed(2)}
                    </td>

                    {/* Rejected / Waste */}
                    <td className='px-4 py-2.5 text-center text-sm font-semibold text-red-500'>
                      {productionItems
                        .reduce(
                          (total, item) =>
                            total + Number(item.rejectedWaste || 0),
                          0,
                        )
                        .toFixed(2)}
                    </td>

                    {/* Net Output */}
                    <td className='px-4 py-2.5 text-center text-sm font-semibold text-emerald-700'>
                      {productionItems
                        .reduce(
                          (total, item) => total + Number(item.netOutput || 0),
                          0,
                        )
                        .toFixed(2)}
                    </td>

                    {/* Action */}
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* =================================================
                RAW MATERIAL DETAILS
            ================================================= */}

          <div className='overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'>
            {/* HEADER */}
            <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3'>
              <div className='flex items-center gap-2'>
                <Leaf className='h-5 w-5 text-emerald-700' />

                <h2 className='text-base font-semibold text-emerald-700'>
                  Raw Material Details
                </h2>
              </div>

              <button
                type='button'
                onClick={() => setIsRawMaterialModalOpen(true)}
                className='flex h-9 cursor-pointer items-center gap-2 rounded-md bg-emerald-700 px-3 text-sm font-medium text-white hover:bg-emerald-800'
              >
                <Plus className='h-4 w-4' />
                Add Raw Material
              </button>
            </div>

            {/* TABLE */}
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[900px] text-left'>
                {/* TABLE HEADER */}
                <thead>
                  <tr className='border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600'>
                    <th className='px-4 py-3'>Raw Material</th>

                    <th className='px-4 py-3'>Source / Garden</th>

                    <th className='px-4 py-3'>UOM</th>

                    <th className='px-4 py-3 text-right'>Quantity</th>

                    <th className='px-4 py-3 text-right'>Avg. Rate (৳)</th>

                    <th className='px-4 py-3 text-right'>Total Cost (৳)</th>

                    <th className='px-4 py-3 text-center'>Action</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {rawMaterialDetails.length > 0 ? (
                    rawMaterialDetails.map((material) => (
                      <tr
                        key={material.id}
                        className='border-b border-slate-100 text-sm text-slate-700 hover:bg-slate-50'
                      >
                        {/* RAW MATERIAL */}
                        <td className='px-4 py-3 font-medium'>
                          {material.rawMaterial?.name}
                        </td>

                        {/* SOURCE / GARDEN */}
                        <td className='px-4 py-3'>
                          {material.sourceGarden?.name}
                        </td>

                        {/* UOM */}
                        <td className='px-4 py-3'>{material.uom?.name}</td>

                        {/* QUANTITY */}
                        <td className='px-4 py-3 text-right'>
                          {Number(material.quantity || 0).toFixed(2)}
                        </td>

                        {/* AVG RATE */}
                        <td className='px-4 py-3 text-right'>
                          {Number(material.averageRate || 0).toFixed(2)}
                        </td>

                        {/* TOTAL COST */}
                        <td className='px-4 py-3 text-right font-semibold text-emerald-700'>
                          {Number(material.totalCost || 0).toFixed(2)}
                        </td>

                        {/* ACTION */}
                        <td className='px-4 py-3 text-center'>
                          <button
                            type='button'
                            className='inline-flex items-center justify-center rounded-md border border-red-200 p-2 text-red-500 transition hover:bg-red-50'
                          >
                            <Trash2 className='h-4 w-4' />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='7' className='px-4 py-10 text-center'>
                        <p className='text-sm font-medium text-slate-500'>
                          No raw materials added
                        </p>

                        <p className='mt-1 text-xs text-slate-400'>
                          Click "Add Raw Material" to add raw material.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>

                {/* FOOTER */}
                <tfoot>
                  <tr className='border-t border-slate-200 bg-slate-50'>
                    <td
                      colSpan='5'
                      className='px-4 py-3 text-right text-sm font-semibold text-slate-700'
                    >
                      Total Raw Material Cost:
                    </td>

                    <td className='px-4 py-3 text-right text-sm font-semibold text-emerald-700'>
                      {rawMaterialDetails
                        .reduce(
                          (total, material) =>
                            total + Number(material.totalCost || 0),
                          0,
                        )
                        .toFixed(2)}
                    </td>

                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* =================================================
              ATTACHMENTS & NOTES
          ================================================== */}

          <div className='overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'>
            <div className='flex items-center gap-2 border-b border-slate-200 bg-white px-5 py-3'>
              <FileText className='h-5 w-5 text-emerald-700' />

              <h2 className='text-base font-semibold text-emerald-700'>
                Attachments & Notes
              </h2>
            </div>

            <div className='grid grid-cols-1 gap-5 p-5 lg:grid-cols-2'>
              {/* Attachment */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Attachments
                </label>

                <label className='flex min-h-[125px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-4 text-center transition hover:border-emerald-500 hover:bg-emerald-50/30'>
                  <UploadCloud className='h-8 w-8 text-slate-400' />

                  <p className='mt-2 text-sm font-medium text-slate-600'>
                    Click to upload or drag and drop
                  </p>

                  <p className='mt-1 text-xs text-slate-400'>
                    JPG, PNG, PDF (Max. 5MB)
                  </p>

                  <input
                    type='file'
                    multiple
                    {...register("attachments")}
                    className='hidden'
                  />
                </label>

                <div className='mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3'>
                  <div className='flex items-center gap-2 rounded-md border border-slate-200 p-2'>
                    <FileText className='h-5 w-5 text-red-500' />

                    <span className='truncate text-xs text-slate-600'>
                      Attachment.pdf
                    </span>

                    <button type='button' className='ml-auto'>
                      <X className='h-3.5 w-3.5 text-slate-400' />
                    </button>
                  </div>

                  <div className='flex items-center gap-2 rounded-md border border-slate-200 p-2'>
                    <ImageIcon className='h-5 w-5 text-blue-500' />

                    <span className='truncate text-xs text-slate-600'>
                      Machine.jpg
                    </span>

                    <button type='button' className='ml-auto'>
                      <X className='h-3.5 w-3.5 text-slate-400' />
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes */}

              <div>
                <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                  Notes
                </label>

                <textarea
                  rows='6'
                  placeholder='Enter production notes...'
                  {...register("notes")}
                  className='w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                />

                <div className='mt-1 text-right text-xs text-slate-400'>
                  0 / 250 characters
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              FOOTER INFORMATION
          ================================================== */}

          <div className='overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'>
            <div className='grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0'>
              <div className='p-4'>
                <p className='text-xs text-slate-500'>Created By</p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>—</p>

                <p className='mt-0.5 text-xs text-slate-400'>Date & time</p>
              </div>

              <div className='p-4'>
                <p className='text-xs text-slate-500'>Last Updated By</p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>—</p>

                <p className='mt-0.5 text-xs text-slate-400'>Date & time</p>
              </div>

              <div className='p-4'>
                <p className='text-xs text-slate-500'>Status</p>

                <span className='mt-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600'>
                  Draft
                </span>
              </div>

              <div className='p-4'>
                <p className='text-xs text-slate-500'>Submission No.</p>

                <p className='mt-1 text-sm font-semibold text-slate-700'>—</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            RIGHT SIDEBAR
        ==================================================== */}

        <div className='space-y-4 xl:col-span-3'>
          {/* =================================================
              PRODUCTION SUMMARY
          ================================================== */}

          <div className='overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'>
            <div className='flex items-center gap-2 border-b border-slate-200 bg-emerald-50 px-5 py-3'>
              <ClipboardList className='h-5 w-5 text-emerald-700' />

              <h2 className='text-base font-semibold text-emerald-700'>
                Production Summary
              </h2>
            </div>

            <div className='space-y-4 p-5'>
              <div className='flex items-center justify-between gap-3'>
                <span className='text-sm text-slate-600'>
                  Total Raw Material Used
                </span>

                <span className='text-sm font-semibold text-slate-700'>
                  0.00 Kg
                </span>
              </div>

              <div className='flex items-center justify-between gap-3'>
                <span className='text-sm text-slate-600'>
                  Total Quantity Produced
                </span>

                <span className='text-sm font-semibold text-slate-700'>
                  0.00 Kg
                </span>
              </div>

              <div className='flex items-center justify-between gap-3'>
                <span className='text-sm text-slate-600'>
                  Total Rejected / Waste
                </span>

                <span className='text-sm font-semibold text-red-500'>
                  0.00 Kg
                </span>
              </div>

              <div className='border-t border-slate-200 pt-4'>
                <div className='flex items-center justify-between gap-3'>
                  <span className='text-sm font-semibold text-slate-700'>
                    Total Net Output
                  </span>

                  <span className='text-sm font-bold text-emerald-700'>
                    0.00 Kg
                  </span>
                </div>
              </div>

              <div className='rounded-lg bg-emerald-50 p-4'>
                <div className='flex items-center gap-2'>
                  <CircleDollarSign className='h-4 w-4 text-emerald-700' />

                  <span className='text-xs font-medium text-slate-600'>
                    Production Efficiency
                  </span>
                </div>

                <p className='mt-2 text-2xl font-bold text-emerald-700'>
                  0.00%
                </p>

                <div className='mt-2 h-2 overflow-hidden rounded-full bg-slate-200'>
                  <div className='h-full w-0 rounded-full bg-emerald-600' />
                </div>

                <p className='mt-2 text-[11px] text-slate-500'>
                  (Net Output / Produced)
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              PRODUCTION CHECKLIST
          ================================================== */}

          <div className='overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'>
            <div className='flex items-center gap-2 border-b border-slate-200 bg-emerald-50 px-5 py-3'>
              <CheckCircle2 className='h-5 w-5 text-emerald-700' />

              <h2 className='text-base font-semibold text-emerald-700'>
                Production Checklist
              </h2>
            </div>

            <div className='space-y-4 p-5'>
              {[
                "Raw material quality checked",
                "Machine & line condition checked",
                "Quality parameters followed",
                "Safety measures followed",
                "Waste recorded accurately",
              ].map((item) => (
                <label
                  key={item}
                  className='flex cursor-pointer items-start gap-2 text-sm text-slate-600'
                >
                  <input
                    type='checkbox'
                    {...register("checklist")}
                    value={item}
                    className='mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600'
                  />

                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM ACTION BAR
      ====================================================== */}

      <div className='sticky bottom-0 z-10 rounded-lg border border-slate-200 bg-white p-3 shadow-lg'>
        <div className='flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end'>
          <button
            type='button'
            className='flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50'
          >
            <X className='h-4 w-4' />
            Cancel
          </button>

          <button
            type='submit'
            className='flex h-10 items-center justify-center gap-2 rounded-md border border-emerald-600 px-4 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50'
          >
            Save as Draft
          </button>

          <button
            type='submit'
            className='flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 text-sm font-medium text-white transition hover:bg-emerald-800'
          >
            <CheckCircle2 className='h-4 w-4' />
            Save & Submit
          </button>
        </div>
        {/* =========================================================
                ADD PRODUCTION ITEM MODAL
            ========================================================= */}
        {isAddItemModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6'>
            {/* Modal */}
            <div className='w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl'>
              {/* =====================================================
                      MODAL HEADER
                  ====================================================== */}
              <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
                <div>
                  <h2 className='text-lg font-semibold text-emerald-700'>
                    Add Production Item
                  </h2>

                  <p className='mt-0.5 text-xs text-slate-500'>
                    Add production item details
                  </p>
                </div>

                <button
                  type='button'
                  onClick={() => {
                    setIsAddItemModalOpen(false);
                    reset();
                  }}
                  className='rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              {/* =====================================================
                      FORM
                  ====================================================== */}
              <form
                onSubmit={handleSubmit(handleAddProductionItem)}
                className='p-5'
              >
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  {/* =================================================
                          ITEM / PRODUCT
                      ================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Item / Product <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("productId", {
                        required: "Product is required",
                      })}
                      className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                    >
                      <option value=''>Select Product</option>

                      {productionEntryData.products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* =================================================
                          GRADE
                      ================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Grade <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("gradeId", {
                        required: "Grade is required",
                      })}
                      className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                    >
                      <option value=''>Select Grade</option>

                      {productionEntryData.grades.map((grade) => (
                        <option key={grade.id} value={grade.id}>
                          {grade.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* =================================================
                          UOM
                      ================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      UOM <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("uomId", {
                        required: "UOM is required",
                      })}
                      className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                    >
                      <option value=''>Select UOM</option>

                      {productionEntryData.uoms.map((uom) => (
                        <option key={uom.id} value={uom.id}>
                          {uom.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* =================================================
                          RAW MATERIAL
                      ================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Raw Material Used <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("rawMaterialId", {
                        required: "Raw material is required",
                      })}
                      className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                    >
                      <option value=''>Select Raw Material</option>

                      {productionEntryData.rawMaterials.map((material) => (
                        <option key={material.id} value={material.id}>
                          {material.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* =================================================
                          QUANTITY PRODUCED
                      ================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Quantity Produced <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      min='0'
                      {...register("quantityProduced", {
                        required: "Quantity is required",
                        min: {
                          value: 0,
                          message: "Quantity cannot be negative",
                        },
                      })}
                      placeholder='Enter quantity'
                      className='h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                    />
                  </div>

                  {/* =================================================
                            REJECTED / WASTE
                        ================================================== */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Rejected / Waste
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      min='0'
                      {...register("rejectedWaste", {
                        min: {
                          value: 0,
                          message: "Waste cannot be negative",
                        },
                      })}
                      placeholder='Enter rejected / waste'
                      className='h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                    />
                  </div>

                  {/* =================================================
                        NET OUTPUT
                    ================================================== */}
                  <div className='sm:col-span-2'>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Net Output
                    </label>

                    <input
                      type='text'
                      readOnly
                      value={(
                        Number(watch("quantityProduced") || 0) -
                        Number(watch("rejectedWaste") || 0)
                      ).toFixed(2)}
                      className='h-10 w-full rounded-md border border-emerald-200 bg-emerald-50 px-3 text-sm font-semibold text-emerald-700 outline-none'
                    />

                    <p className='mt-1 text-xs text-slate-400'>
                      Net Output = Quantity Produced - Rejected / Waste
                    </p>
                  </div>
                </div>

                {/* =====================================================
                        FOOTER BUTTONS
                    ====================================================== */}
                <div className='mt-6 flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end'>
                  <button
                    type='button'
                    onClick={() => {
                      setIsAddItemModalOpen(false);
                      reset();
                    }}
                    className='inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50'
                  >
                    <X className='h-4 w-4' />
                    Cancel
                  </button>

                  <button
                    type='submit'
                    className='h-10 rounded-md bg-emerald-700 px-5 text-sm font-medium text-white hover:bg-emerald-800'
                  >
                    <span className='flex cursor-pointer items-center gap-2'>
                      <Plus className='h-4 w-4' />
                      Add Item
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================
                ADD RAW MATERIAL MODAL
            ========================================================= */}

        {isRawMaterialModalOpen && (
          <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4'>
            <div className='w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl'>
              {/* ================= HEADER ================= */}

              <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
                <div>
                  <h2 className='text-lg font-semibold text-emerald-700'>
                    Add Raw Material
                  </h2>

                  <p className='mt-0.5 text-xs text-slate-500'>
                    Add raw material details for this production entry
                  </p>
                </div>

                <button
                  type='button'
                  onClick={() => setIsRawMaterialModalOpen(false)}
                  className='rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              {/* ================= FORM ================= */}

              <form onSubmit={handleSubmit(handleAddRawMaterial)}>
                <div className='grid grid-cols-1 gap-4 p-5 md:grid-cols-2'>
                  {/* Raw Material */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Raw Material
                      <span className='text-red-500'> *</span>
                    </label>

                    <select
                      value={rawMaterialForm.rawMaterial}
                      onChange={(e) =>
                        setRawMaterialForm({
                          ...rawMaterialForm,
                          rawMaterial: e.target.value,
                        })
                      }
                      className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600'
                      required
                    >
                      <option value=''>Select Raw Material</option>

                      {rawMaterials?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Source / Garden */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Source / Garden
                      <span className='text-red-500'> *</span>
                    </label>

                    <select
                      value={rawMaterialForm.sourceGarden}
                      onChange={(e) =>
                        setRawMaterialForm({
                          ...rawMaterialForm,
                          sourceGarden: e.target.value,
                        })
                      }
                      className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600'
                      required
                    >
                      <option value=''>Select Source / Garden</option>

                      {sourceGardens?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* UOM */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      UOM
                      <span className='text-red-500'> *</span>
                    </label>

                    <select
                      value={rawMaterialForm.uom}
                      onChange={(e) =>
                        setRawMaterialForm({
                          ...rawMaterialForm,
                          uom: e.target.value,
                        })
                      }
                      className='h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-600'
                      required
                    >
                      <option value=''>Select UOM</option>

                      {uoms?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Quantity
                      <span className='text-red-500'> *</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      min='0'
                      value={rawMaterialForm.quantity}
                      onChange={(e) =>
                        setRawMaterialForm({
                          ...rawMaterialForm,
                          quantity: e.target.value,
                        })
                      }
                      placeholder='Enter quantity'
                      className='h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-emerald-600'
                      required
                    />
                  </div>

                  {/* Average Rate */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Avg. Rate (৳)
                      <span className='text-red-500'> *</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      min='0'
                      value={rawMaterialForm.avgRate}
                      onChange={(e) =>
                        setRawMaterialForm({
                          ...rawMaterialForm,
                          avgRate: e.target.value,
                        })
                      }
                      placeholder='Enter average rate'
                      className='h-10 w-full rounded-md border border-slate-300 px-3 text-sm text-slate-700 outline-none focus:border-emerald-600'
                      required
                    />
                  </div>

                  {/* Total Cost Preview */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-slate-700'>
                      Total Cost (৳)
                    </label>

                    <div className='flex h-10 items-center rounded-md border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-emerald-700'>
                      {(
                        Number(rawMaterialForm.quantity || 0) *
                        Number(rawMaterialForm.avgRate || 0)
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* ================= FOOTER ================= */}

                <div className='flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3 sm:flex-row sm:justify-end'>
                  <button
                    type='button'
                    onClick={() => {
                      setRawMaterialForm({
                        rawMaterial: "",
                        sourceGarden: "",
                        uom: "",
                        quantity: "",
                        avgRate: "",
                      });

                      setIsRawMaterialModalOpen(false);
                    }}
                    className='h-10 cursor-pointer rounded-md border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50'
                  >
                    Cancel
                  </button>

                  <button
                    type='submit'
                    className='h-10 rounded-md bg-emerald-700 px-5 text-sm font-medium text-white transition hover:bg-emerald-800'
                  >
                    <span className='flex cursor-pointer items-center gap-2'>
                      <Plus className='h-4 w-4' />
                      Add Raw Material
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProductionEntry;
