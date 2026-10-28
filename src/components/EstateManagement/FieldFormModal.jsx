import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RotateCcw, Save, X } from "lucide-react";
import { fieldAndBlockManagementData } from "../../data/EstateManagementData/FieldAndBlockManagementData";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";

const FIELDS = [
  "estate", "division", "section", "fieldName", "fieldCode", "fieldType", "parentField", "totalArea", "plantedArea",
  "plantingYear", "bushType", "spacing", "altitude", "averageSlope", "irrigation", "soilType", "drainage", "status",
  "description",
];
const toForm = (row) => Object.fromEntries(FIELDS.map((name) => [name, row?.[name] ?? ""]));

// The Field / Block Information form as a popup: add a field (editing = null) or edit one.
// Used by the Field / Block page and the Map & GIS Tracking page.
const FieldFormModal = ({ editing, onClose, onSaved }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: toForm(editing) });

  // Form dropdowns follow each other: estate -> division -> section -> parent field.
  const estateId = watch("estate");
  const divisionId = watch("division");
  const sectionId = watch("section");
  const estateOptions = useApi(() => api.get("/options/estates"), []);
  const divisionOptions = useApi(
    () => (estateId ? api.get("/options/divisions", { estate: estateId }) : Promise.resolve([])),
    [estateId],
  );
  const sectionOptions = useApi(
    () => (divisionId ? api.get("/options/sections", { division: divisionId }) : Promise.resolve([])),
    [divisionId],
  );
  const parentOptions = useApi(
    () => (sectionId ? api.get("/options/fields", { section: sectionId }) : Promise.resolve([])),
    [sectionId],
  );
  // Opening a field for edit: each dropdown shows its saved value once its options have loaded.
  useEffect(() => {
    if (!editing) return;
    for (const [name, options] of [
      ["division", divisionOptions.data],
      ["section", sectionOptions.data],
      ["parentField", parentOptions.data],
    ]) {
      if (options?.some((option) => option.value === editing[name])) setValue(name, editing[name]);
    }
  }, [editing, divisionOptions.data, sectionOptions.data, parentOptions.data, setValue]);
  const parentFieldChoices = [
    fieldAndBlockManagementData.parentFields[0],
    ...(parentOptions.data ?? [])
      .filter((option) => option.id !== editing?.id)
      .map((option) => ({ id: option.id, value: option.value, label: option.label })),
  ];

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const FieldOrBlockManagementonSubmit = async (values) => {
    try {
      if (editing) await api.put(`/fields/${editing.id}`, values);
      else await api.post("/fields", values);
      toast.success("Field / Block saved successfully.");
      onSaved();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };
  const closeModal = onClose;

  return (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4'>
          <div className='w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-xl'>
            {/* Modal Header */}

            <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Field / Block Information
              </h2>

              <button
                type='button'
                onClick={closeModal}
                className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100'
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className='max-h-[80vh] overflow-y-auto p-5'>
              <form onSubmit={handleSubmit(FieldOrBlockManagementonSubmit)}>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
                  {/* Estate */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                        onChange: () => {
                          setValue("division", "");
                          setValue("section", "");
                          setValue("parentField", "");
                        },
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.estate
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Estate</option>

                      {(estateOptions.data ?? []).map((estate) => (
                        <option key={estate.id} value={estate.value}>
                          {estate.label}
                        </option>
                      ))}
                    </select>

                    {errors.estate && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.estate.message}
                      </p>
                    )}
                  </div>

                  {/* Division */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("division", {
                        required: "Division is required",
                        onChange: () => {
                          setValue("section", "");
                          setValue("parentField", "");
                        },
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.division
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>
{!estateId
 ? "Select Estate first"
 : divisionOptions.data?.length === 0
 ? "No divisions for this estate"
 : "Select Division"}
</option>

                      {(divisionOptions.data ?? []).map((division) => (
                        <option key={division.id} value={division.value}>
                          {division.label}
                        </option>
                      ))}
                    </select>

                    {errors.division && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.division.message}
                      </p>
                    )}
                  </div>

                  {/* Section */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Section <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("section", {
                        required: "Section is required",
                        onChange: () => setValue("parentField", ""),
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.section
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>
{!divisionId
 ? "Select Division first"
 : sectionOptions.data?.length === 0
 ? "No sections for this division"
 : "Select Section"}
</option>

                      {(sectionOptions.data ?? []).map((section) => (
                        <option key={section.id} value={section.value}>
                          {section.label}
                        </option>
                      ))}
                    </select>

                    {errors.section && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.section.message}
                      </p>
                    )}
                  </div>

                  {/* Field Name */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Field / Block Name <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter field / block name'
                      {...register("fieldName", {
                        required: "Field / Block Name is required",
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.fieldName
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.fieldName && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.fieldName.message}
                      </p>
                    )}
                  </div>

                  {/* Field Code */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Field / Block Code <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter field / block code'
                      {...register("fieldCode", {
                        required: "Field / Block Code is required",
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.fieldCode
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.fieldCode && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.fieldCode.message}
                      </p>
                    )}
                  </div>

                  {/* Field Type */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Field Type <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("fieldType", {
                        required: "Field Type is required",
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.fieldType
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Field Type</option>

                      {fieldAndBlockManagementData.fieldTypes.map((type) => (
                        <option key={type.id} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>

                    {errors.fieldType && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.fieldType.message}
                      </p>
                    )}
                  </div>

                  {/* Parent */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Parent Field / Block
                    </label>

                    <select
                      {...register("parentField")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white'
                    >
                      <option value=''>Select Parent Field</option>

                      {parentFieldChoices.map((field) => (
                        <option key={field.id} value={field.value}>
                          {field.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Total Area */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Total Area (Acres) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter total area'
                      {...register("totalArea", {
                        required: "Total Area is required",
                        min: {
                          value: 0.01,
                          message: "Area must be greater than 0",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.totalArea
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.totalArea && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.totalArea.message}
                      </p>
                    )}
                  </div>

                  {/* Planted Area */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Planted Area (Acres){" "}
                      <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      step='0.01'
                      placeholder='Enter planted area'
                      {...register("plantedArea", {
                        required: "Planted Area is required",
                        min: {
                          value: 0.01,
                          message: "Area must be greater than 0",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.plantedArea
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.plantedArea && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.plantedArea.message}
                      </p>
                    )}
                  </div>

                  {/* Planting Year */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Year of Planting <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      placeholder='e.g. 2022'
                      {...register("plantingYear", {
                        required: "Planting Year is required",
                        min: {
                          value: 1900,
                          message: "Invalid year",
                        },
                        max: {
                          value: new Date().getFullYear(),
                          message: "Year cannot be in the future",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.plantingYear
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.plantingYear && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.plantingYear.message}
                      </p>
                    )}
                  </div>

                  {/* Bush Type */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Bush Type / Clone <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("bushType", {
                        required: "Bush Type is required",
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.bushType
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Bush Type</option>

                      {fieldAndBlockManagementData.bushTypes.map((type) => (
                        <option key={type.id} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>

                    {errors.bushType && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.bushType.message}
                      </p>
                    )}
                  </div>

                  {/* Spacing */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Spacing (Feet) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='e.g. 3 × 4'
                      {...register("spacing", {
                        required: "Spacing is required",
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.spacing
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.spacing && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.spacing.message}
                      </p>
                    )}
                  </div>

                  {/* Altitude */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Altitude (Meters)
                    </label>

                    <input
                      type='number'
                      placeholder='Enter altitude'
                      {...register("altitude", {
                        min: {
                          value: 0,
                          message: "Altitude cannot be negative",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.altitude
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.altitude && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.altitude.message}
                      </p>
                    )}
                  </div>

                  {/* Slope */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Average Slope (%)
                    </label>

                    <input
                      type='number'
                      step='0.1'
                      placeholder='Enter average slope'
                      {...register("averageSlope", {
                        min: {
                          value: 0,
                          message: "Slope cannot be negative",
                        },
                        max: {
                          value: 100,
                          message: "Slope cannot exceed 100%",
                        },
                      })}
                      className={`input h-11 w-full rounded-lg border bg-white p-2 ${
                        errors.averageSlope
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    />

                    {errors.averageSlope && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.averageSlope.message}
                      </p>
                    )}
                  </div>

                  {/* Irrigation */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Irrigation Source
                    </label>

                    <select
                      {...register("irrigation")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white'
                    >
                      <option value=''>Select Irrigation Source</option>

                      {fieldAndBlockManagementData.irrigationSources.map(
                        (source) => (
                          <option key={source.id} value={source.value}>
                            {source.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {/* Soil */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Soil Type
                    </label>

                    <select
                      {...register("soilType")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white'
                    >
                      <option value=''>Select Soil Type</option>

                      {fieldAndBlockManagementData.soilTypes.map((soil) => (
                        <option key={soil.id} value={soil.value}>
                          {soil.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Drainage */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Drainage
                    </label>

                    <select
                      {...register("drainage")}
                      className='select h-11 w-full rounded-lg border border-gray-300 bg-white'
                    >
                      <option value=''>Select Drainage</option>

                      {fieldAndBlockManagementData.drainage.map((item) => (
                        <option key={item.id} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}

                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Status <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("status", {
                        required: "Status is required",
                      })}
                      className={`select h-11 w-full rounded-lg border bg-white ${
                        errors.status
                          ? "border-red-500"
                          : "border-gray-300 focus:border-green-600"
                      }`}
                    >
                      <option value=''>Select Status</option>

                      {fieldAndBlockManagementData.statuses.map((status) => (
                        <option key={status.id} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>

                    {errors.status && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.status.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}

                  <div className='md:col-span-2 xl:col-span-3'>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Description / Remarks
                    </label>

                    <textarea
                      rows={3}
                      placeholder='Enter description or remarks...'
                      {...register("description")}
                      className='textarea w-full rounded-lg border border-gray-300 bg-white p-2 focus:border-green-600 focus:outline-none'
                    />
                  </div>
                </div>

                {/* =================================================
                    Modal Footer
                ================================================== */}

                <div className='mt-5 border-t border-gray-200 pt-4'>
                  <div className='flex flex-col gap-3 sm:flex-row sm:justify-end'>
                    <button
                      type='button'
                      onClick={closeModal}
                      className='btn flex h-11 w-full items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 text-gray-700 sm:w-auto'
                    >
                      <X size={18} />
                      Cancel
                    </button>

                    <button
                      type='button'
                      onClick={() => reset()}
                      className='btn flex h-11 w-full items-center gap-2 rounded-lg border-0 bg-green-500 px-6 text-white sm:w-auto'
                    >
                      <RotateCcw size={18} />
                      Reset
                    </button>

                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='btn flex h-11 w-full items-center gap-2 rounded-lg border-0 bg-green-900 px-6 text-white disabled:opacity-60 sm:w-auto'
                    >
                      <Save size={18} />
                      {isSubmitting ? "Saving..." : "Save Field"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
};

export default FieldFormModal;
