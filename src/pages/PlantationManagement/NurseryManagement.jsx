import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import PlantationManagementTabs from "../../components/plantationManagementTab/PlantationManagementTabs";
import { nurseryManagementData } from "../../data/PlantationManagementData/nurseryManagementData";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import CardSkeleton from "../../components/common/CardSkeleton";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import {
  RotateCcw,
  Save,
  Plus,
  SquarePen,
  Trash2,
  Map,
  MapPinned,
  LayoutGrid,
  Sprout,
  Leaf,
  Truck,
  Minus,
  Expand,
  Eye,
} from "lucide-react";
const summaryIconMap = {
  Map,
  MapPinned,
  LayoutGrid,
  Sprout,
  Leaf,
  Truck,
};
const FIELDS = [
  "estate", "division", "nurseryName", "supervisor", "nurseryCode", "nurseryType", "location", "irrigationSource",
  "establishedYear", "status", "totalArea", "netUsableArea", "active", "remarks",
];
const DASH = "-";
// Plain numbers with the grouping the page used (2,10,000).
const num = (value) => (value === null || value === undefined ? DASH : Number(value).toLocaleString("en-IN"));
// 2026-01-12 -> 12 Jan 2026 (no timezone: the text is rearranged, not parsed as a date)
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const longDate = (iso) => {
  if (!iso) return DASH;
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
};
const BED_STATUS_CLASS = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-600",
  Maintenance: "bg-yellow-100 text-yellow-700",
};
const orDash = (value) => (value === null || value === undefined || value === "" ? DASH : value);

const NurseryManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const navigate = useNavigate();
  // After a save, return to the page the user came from (the dashboard when the page was opened directly).
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"));

  // Every nursery, for the picker at the top of the form.
  const allNurseries = useApi(() => api.get("/nurseries", { perPage: 100 }), []);
  const pickNursery = (id) => setSearchParams(id ? { id } : {});

  // The nursery being edited (?id=); the panels show it, or the first nursery when adding a new one.
  const nursery = useApi(() => (editId ? api.get(`/nurseries/${editId}`) : Promise.resolve(null)), [editId]);
  const first = useApi(() => (editId ? Promise.resolve(null) : api.get("/nurseries", { perPage: 1 })), [editId]);
  const shownId = editId ?? first.data?.data?.[0]?.id;

  const summary = useApi(() => (shownId ? api.get(`/nurseries/${shownId}/summary`) : Promise.resolve(null)), [shownId]);
  const beds = useApi(() => (shownId ? api.get(`/nurseries/${shownId}/beds`) : Promise.resolve(null)), [shownId]);
  const stock = useApi(() => (shownId ? api.get(`/nurseries/${shownId}/stock`) : Promise.resolve(null)), [shownId]);
  const activities = useApi(() => (shownId ? api.get(`/nurseries/${shownId}/activities`) : Promise.resolve(null)), [shownId]);
  const bedRows = beds.data ?? [];
  const stockRows = stock.data?.stockInventory ?? [];
  const stockTotals = stock.data?.stockInventoryTotal ? [stock.data.stockInventoryTotal] : [];
  const activityRows = activities.data ?? [];
  // Nothing to show yet while the first nursery is still being looked up.
  const waiting = !shownId && (first.loading || nursery.loading);

  // Estate -> Division
  const estateId = watch("estate");
  const estateOptions = useApi(() => api.get("/options/estates"), []);
  const divisionOptions = useApi(
    () => (estateId ? api.get("/options/divisions", { estate: estateId }) : Promise.resolve([])),
    [estateId],
  );

  useEffect(() => {
    if (nursery.data) {
      reset(Object.fromEntries(FIELDS.map((name) => [name, nursery.data[name] ?? ""])));
    }
  }, [nursery.data, reset]);
  // The saved division shows once its options have loaded.
  useEffect(() => {
    const saved = nursery.data?.division;
    if (saved && divisionOptions.data?.some((option) => option.value === saved)) setValue("division", saved);
  }, [nursery.data, divisionOptions.data, setValue]);

  const reloadPanels = () => {
    nursery.reload();
    first.reload();
    allNurseries.reload();
    summary.reload();
    beds.reload();
    stock.reload();
    activities.reload();
  };

  const onSubmit = async (values) => {
    try {
      if (editId) {
        const saved = await api.put(`/nurseries/${editId}`, values);
        reset(Object.fromEntries(FIELDS.map((name) => [name, saved[name] ?? ""])));
      } else {
        await api.post("/nurseries", values);
        reset(Object.fromEntries(FIELDS.map((name) => [name, ""])));
      }
      toast.success("Nursery saved successfully!");
      reloadPanels();
      goBack();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };
  return (
    <div className='space-y-6'>
      <PlantationManagementTabs />

      {/* Main Layout */}
      <div className='grid grid-cols-12 gap-6'>
        {/* Left Side */}
        <div className='col-span-12 xl:col-span-5 flex flex-col gap-6'>
          {/* Nursery Information */}

          <div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <h2 className='text-base font-semibold text-green-700'>
                  Nursery Information
                </h2>
                <select
                  aria-label='Select nursery'
                  value={editId ?? ""}
                  onChange={(e) => pickNursery(e.target.value)}
                  className='w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-green-600 sm:w-auto'
                >
                  <option value=''>+ New nursery</option>
                  {(allNurseries.data?.data ?? []).map((nursery) => (
                    <option key={nursery.id} value={nursery.id}>
                      {nursery.nurseryName} ({nursery.nurseryCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 p-4 sm:p-6'>
              <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                {/* Estate */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Estate <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("estate", {
                      required: "Estate is required",
                      onChange: () => setValue("division", ""),
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
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
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Division <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("division", {
                      required: "Division is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
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

                {/* Nursery Name */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Name
                  </label>

                  <input
                    type='text'
                    placeholder='Central Nursery'
                    {...register("nurseryName", {
                      required: "Nursery Name is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.nurseryName && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.nurseryName.message}
                    </p>
                  )}
                </div>

                {/*Supervisor / In-charge  */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Supervisor / In-charge{" "}
                    <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("supervisor", {
                      required: "Supervisor is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Supervisor</option>
                    <option value='Md. Faruk Hossain'>Md. Faruk Hossain</option>
                    <option value='Abdul Karim'>Abdul Karim</option>
                    <option value='Nur Alam'>Nur Alam</option>
                  </select>

                  {errors.supervisor && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.supervisor.message}
                    </p>
                  )}
                </div>

                {/* Nursery Code */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Code <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    placeholder='NUR-001'
                    {...register("nurseryCode", {
                      required: "Nursery Code is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.nurseryCode && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.nurseryCode.message}
                    </p>
                  )}
                </div>

                {/* Nursery type */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Nursery Type <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("nurseryType", {
                      required: "Nursery Type is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Nursery Type</option>
                    <option value='Clonal'>Clonal</option>
                    <option value='Seedling'>Seedling</option>
                    <option value='Experimental'>Experimental</option>
                  </select>

                  {errors.nurseryType && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.nurseryType.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Location <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='text'
                    placeholder='Uttarkhan, Rangpur'
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.location && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Irrigation */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Irrigation Source <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("irrigationSource", {
                      required: "Irrigation Source is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Irrigation Source</option>
                    <option value='Tube Well'>Tube Well</option>
                    <option value='Deep Tube Well'>Deep Tube Well</option>
                    <option value='River'>River</option>
                    <option value='Rain Water'>Rain Water</option>
                  </select>

                  {errors.irrigationSource && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.irrigationSource.message}
                    </p>
                  )}
                </div>

                {/* Established Year */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Established Year <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    placeholder='2020'
                    {...register("establishedYear", {
                      required: "Established Year is required",
                      min: {
                        value: 1900,
                        message: "Enter a valid year",
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future",
                      },
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.establishedYear && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.establishedYear.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Status <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("status", {
                      required: "Status is required",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select Status</option>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                    <option value='Under Maintenance'>Under Maintenance</option>
                  </select>

                  {errors.status && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.status.message}
                    </p>
                  )}
                </div>
                {/* Total Area */}

                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Total Area (Acre) <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    step='0.01'
                    placeholder='5.60'
                    {...register("totalArea", {
                      required: "Total Area is required",
                      min: {
                        value: 0.01,
                        message: "Area must be greater than 0",
                      },
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.totalArea && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.totalArea.message}
                    </p>
                  )}
                </div>
                {/* Net useable are */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Net Usable Area (Acre){" "}
                    <span className='text-red-500'>*</span>
                  </label>

                  <input
                    type='number'
                    step='0.01'
                    placeholder='4.80'
                    {...register("netUsableArea", {
                      required: "Net Usable Area is required",
                      min: {
                        value: 0.01,
                        message: "Area must be greater than 0",
                      },
                    })}
                    className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  />

                  {errors.netUsableArea && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.netUsableArea.message}
                    </p>
                  )}
                </div>
                {/* active select */}
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Active <span className='text-red-500'>*</span>
                  </label>

                  <select
                    {...register("active", {
                      required: "Please select an option",
                    })}
                    className='w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-600'
                  >
                    <option value=''>Select</option>
                    <option value='Tea Research Institute'>
                      Tea Research Institute
                    </option>
                    <option value='BTB'>Bangladesh Tea Board</option>
                    <option value='Private'>Private</option>
                  </select>

                  {errors.active && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.active.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='col-span-full'>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Remarks
                </label>

                <textarea
                  rows={4}
                  placeholder='Write remarks...'
                  {...register("remarks")}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-600'
                />
              </div>

              {/* Buttons */}

              <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                <button
                  type='button'
                  onClick={() =>
                    reset(
                      nursery.data
                        ? Object.fromEntries(FIELDS.map((name) => [name, nursery.data[name] ?? ""]))
                        : Object.fromEntries(FIELDS.map((name) => [name, ""])),
                    )
                  }
                  className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium transition hover:bg-gray-100 sm:w-auto'
                >
                  <RotateCcw size={16} />
                  Reset
                </button>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='flex w-full items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2 text-sm cursor-pointer font-medium text-white transition hover:bg-green-800 disabled:opacity-60 sm:w-auto'
                >
                  <Save size={16} />
                  {isSubmitting ? "Saving..." : "Save Nursery"}
                </button>
              </div>
            </form>
          </div>

          {/* Nursery Production Summary */}

          <div className='flex-1 rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Nursery Production Summary
              </h2>
            </div>

            {/* Body */}
            {(waiting || (summary.loading && !summary.data)) && <CardSkeleton count={6} className='p-4' />}
            {summary.error && <ErrorState message={summary.error.message} onRetry={summary.reload} />}
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 p-4'>
              {(summary.data ?? []).map((item) => {
                const Icon = summaryIconMap[item.icon];

                return (
                  <div
                    key={item.id}
                    className='flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-green-300 hover:shadow-md'
                  >
                    {/* Icon */}
                    <div className='rounded-lg bg-green-100 p-1'>
                      <Icon size={22} className='text-green-700' />
                    </div>

                    {/* Content */}
                    <div>
                      <p className='text-xs text-gray-500'>{item.title}</p>

                      <h3 className='mt-1 text-xl font-bold text-green-700'>
                        {num(item.value)}
                        {item.unit && (
                          <span className='ml-1 text-sm font-medium text-gray-500'>
                            {item.unit}
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='col-span-12 xl:col-span-7 flex flex-col gap-6'>
          {/* Bed List */}
          <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-4 py-2 sm:px-6'>
              {/* Left */}
              <div>
                <h2 className='text-base font-semibold text-green-700'>
                  Nursery Bed / Section List
                </h2>
              </div>

              {/* Right */}
              <button
                type='button'
                className='flex cursor-pointer items-center gap-2 rounded-lg border border-green-700 bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800'
              >
                <Plus size={16} />
                Add Bed / Section
              </button>
            </div>

            <div className='overflow-x-auto border border-t-0 border-gray-200'>
              <table className='min-w-full border-collapse'>
                <thead>
                  <tr className='bg-gray-50'>
                    {nurseryManagementData.bedTableHeaders.map((header) => (
                      <th
                        key={header}
                        className='border border-gray-200 px-1 py-1 text-left text-sm font-semibold text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {waiting || (beds.loading && !beds.data) ? (
                    <TableSkeleton rows={4} columns={nurseryManagementData.bedTableHeaders.length} />
                  ) : beds.error ? (
                    <tr>
                      <td colSpan={nurseryManagementData.bedTableHeaders.length} className='p-4'>
                        <ErrorState message={beds.error.message} onRetry={beds.reload} />
                      </td>
                    </tr>
                  ) : bedRows.length === 0 ? (
                    <EmptyRow columns={nurseryManagementData.bedTableHeaders.length} />
                  ) : (
                  bedRows.map((bed, index) => (
                    <tr
                      key={bed.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='border border-gray-200 px-4 py-3 text-sm text-center'>
                        {index + 1}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.name}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.code}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {orDash(bed.clone)}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {bed.area == null ? DASH : `${Number(bed.area).toFixed(2)} Acre`}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {num(bed.plants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {longDate(bed.plantingDate)}
                      </td>

                      <td className='border border-gray-200 px-4 py-3 text-center'>
                        <span
                          className={`inline-flex rounded-full px-1 py-1 text-xs font-semibold ${BED_STATUS_CLASS[bed.status] ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {bed.status}
                        </span>
                      </td>

                      <td className='border border-gray-200 px-4 py-3'>
                        <div className='flex items-center justify-center gap-2'>
                          <button
                            type='button'
                            className='rounded-md cursor-pointer p-2 text-blue-600 transition hover:bg-blue-100'
                            title='Edit'
                          >
                            <SquarePen size={17} />
                          </button>

                          <button
                            type='button'
                            className='rounded-md cursor-pointer p-2 text-red-600 transition hover:bg-red-100'
                            title='Delete'
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
              {/* Table Footer */}

              <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-600 md:flex-row'>
                {/* Left */}
                <p>
                  Showing <span className='font-semibold text-gray-900'>{bedRows.length > 0 ? 1 : 0}</span>{" "}
                  to{" "}
                  <span className='font-semibold text-gray-900'>
                    {bedRows.length}
                  </span>{" "}
                  of{" "}
                  <span className='font-semibold text-green-700'>
                    {bedRows.length}
                  </span>{" "}
                  entries
                </p>

                {/* Right */}
                <p>
                  Total Beds :
                  <span className='ml-2 font-semibold text-green-700'>
                    {bedRows.length}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Nursery Map */}

          <div className='flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}

            <div className='border-b border-gray-200 px-5 py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Nursery Map / Layout
              </h2>
            </div>

            {/* Body */}
            <div className='relative min-h-80 flex-1 overflow-hidden'>
              <img
                src='/land-lease-map.webp'
                alt='Nursery Map Layout'
                className='absolute inset-0 h-full w-full object-cover'
              />
              {/* Map Legend */}

              <div className='absolute right-16 top-3 w-44 rounded-xl border border-gray-200 bg-white p-3 shadow-lg sm:right-20 sm:top-5 sm:w-56 sm:p-5'>
                <h3 className='mb-3 text-sm font-semibold text-gray-800 sm:mb-4 sm:text-base'>
                  Map Legend
                </h3>
                {/* Map Controls */}

                <div className='space-y-3'>
                  {nurseryManagementData.mapLegend.map((item) => (
                    <div key={item.id} className='flex items-center gap-3'>
                      <span
                        className='h-4 w-4 rounded border border-gray-300'
                        style={{ backgroundColor: item.color }}
                      />

                      <span className='text-sm font-medium text-gray-700'>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg sm:right-5 sm:top-5'>
                {/* Zoom In */}
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center border-b border-gray-200 text-gray-700 transition hover:bg-gray-100'
                >
                  <Plus size={18} />
                </button>

                {/* Zoom Out */}
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center border-b border-gray-200 text-gray-700 transition hover:bg-gray-100'
                >
                  <Minus size={18} />
                </button>

                {/* Full Screen */}
                <button
                  type='button'
                  className='flex h-11 w-11 items-center justify-center text-gray-700 transition hover:bg-gray-100'
                >
                  <Expand size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}

      <section className='grid grid-cols-12 gap-6'>
        {/* Stock */}

        <div className='col-span-12 xl:col-span-7'>
          <div className='h-full rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4'>
              <h2 className='text-base font-semibold text-green-700'>
                Plant Stock / Inventory
              </h2>

              <button
                type='button'
                className='flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800'
              >
                <Plus size={16} />
                Add Stock
              </button>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='min-w-full border-collapse border border-gray-200'>
                {/* Table Header */}
                <thead>
                  <tr className='bg-gray-50'>
                    {nurseryManagementData.stockTableHeaders.map((header) => (
                      <th
                        key={header}
                        className='border border-gray-200 px-2 py-2 text-left text-sm font-normal text-gray-700'
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {waiting || (stock.loading && !stock.data) ? (
                    <TableSkeleton rows={4} columns={nurseryManagementData.stockTableHeaders.length} />
                  ) : stock.error ? (
                    <tr>
                      <td colSpan={nurseryManagementData.stockTableHeaders.length} className='p-4'>
                        <ErrorState message={stock.error.message} onRetry={stock.reload} />
                      </td>
                    </tr>
                  ) : stockRows.length === 0 ? (
                    <EmptyRow columns={nurseryManagementData.stockTableHeaders.length} />
                  ) : null}
                  {stockRows.map((item, index) => (
                    <tr
                      key={item.id}
                      className='transition duration-200 hover:bg-gray-50'
                    >
                      {/* SL */}
                      <td className='border border-gray-200 px-3 py-2 text-sm text-gray-700'>
                        {index + 1}
                      </td>

                      {/* Clone / Seed */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {item.clone}
                      </td>

                      {/* Type */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {item.type}
                      </td>

                      {/* Total Plants */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {num(item.totalPlants)}
                      </td>

                      {/* Available Plants */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {num(item.availablePlants)}
                      </td>

                      {/* Reserved Plants */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {num(item.reservedPlants)}
                      </td>

                      {/* Distributed Plants */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {num(item.distributedPlants)}
                      </td>

                      {/* Unit */}
                      <td className='border border-gray-200 px-4 py-2 text-sm text-gray-700'>
                        {item.unit}
                      </td>

                      {/* Action */}
                      <td className='border border-gray-200 px-4 py-2 text-center'>
                        <button
                          type='button'
                          className='rounded-md  text-blue-600 transition hover:bg-blue-100 hover:text-blue-700'
                          title='View Details'
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {stockTotals.map((total) => (
                    <tr key={total.label} className='bg-gray-50 font-semibold'>
                      <td className='border border-gray-200 px-3 py-2'></td>

                      <td
                        colSpan={2}
                        className='border border-gray-200 px-4 py-2 text-center text-sm text-gray-700'
                      >
                        {total.label}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {num(total.totalPlants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {num(total.availablePlants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {num(total.reservedPlants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {num(total.distributedPlants)}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'>
                        {total.unit}
                      </td>

                      <td className='border border-gray-200 px-4 py-2'></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className='flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-4 sm:px-6'>
              <p className='text-sm text-gray-600'>
                Showing {stockRows.length > 0 ? 1 : 0} to {stockRows.length} of{" "}
                {stockRows.length} entries
              </p>

              <button
                type='button'
                className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100'
              >
                View Stock Details
              </button>
            </div>
          </div>
        </div>

        {/* Activity */}

        <div className='col-span-12 xl:col-span-5'>
          <div className='flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b border-gray-200 px-5 py-6'>
              <h2 className='text-base font-semibold text-green-700'>
                Recent Activities
              </h2>
            </div>

            {/* Body */}
            <div className='flex-1'>
              {activityRows.length === 0 && (
                <p className='px-5 py-6 text-center text-sm text-gray-500'>
                  {activities.error ? activities.error.message : "No recent activities"}
                </p>
              )}
              {activityRows.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between px-5 py-3 ${
                    index !== activityRows.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <p className='text-sm text-gray-700'>{item.activity}</p>

                  <span className='ml-4 shrink-0 text-xs text-gray-500'>
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
            {/* Footer: always at the bottom of the card */}
            <div className='mt-auto flex flex-col-reverse gap-3 rounded-xl border border-gray-200 px-4 py-5 sm:flex-row sm:justify-end sm:px-6'>
              {/* Cancel */}
              <button
                type='button'
                className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto'
              >
                <RotateCcw size={16} />
                Cancel
              </button>

              {/* Save */}
              <button
                type='submit'
                className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto'
              >
                <Save size={16} />
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NurseryManagement;
