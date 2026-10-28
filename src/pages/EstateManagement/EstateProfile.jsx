import { useEffect, useRef, useState } from "react";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import CardSkeleton from "../../components/common/CardSkeleton";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { estateProfileData } from "../../data/EstateManagementData/estateProfileData";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Map,
  Leaf,
  Trees,
  Building2,
  LayoutGrid,
  Users,
  CalendarDays,
  X,
  RotateCcw,
  Save,
} from "lucide-react";
const summaryIconMap = {
  map: Map,
  leaf: Leaf,
  trees: Trees,
  building: Building2,
  section: LayoutGrid,
  field: LayoutGrid,
  users: Users,
  calendar: CalendarDays,
};
const actionIconMap = {
  cancel: X,
  reset: RotateCcw,
  submit: Save,
};
// The manager blocks of the form are keyed 1 and 2; the API calls them by type.
const managerIdByType = Object.fromEntries(
  estateProfileData.managerInformation.map((manager) => [manager.type, manager.id]),
);

// A saved estate as the form wants it (null -> empty, managers keyed by block).
const toForm = (estate) => ({
  ...estate,
  managers: Object.fromEntries(
    (estate.managers ?? []).map((manager) => [
      managerIdByType[manager.type],
      { name: manager.name ?? "", mobile: manager.mobile ?? "", email: manager.email ?? "" },
    ]),
  ),
});

const toImages = (estate) =>
  (estate.estateImages ?? []).map((id, index) => ({ id, url: estate.estateImagesUrl?.[index] }));

const EstateProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  // hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const estateId = searchParams.get("id");
  // After a save, return to the page the user came from (the dashboard when the page was opened directly).
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate("/"));
  const latitude = watch("latitude");
  const longitude = watch("longitude");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef(null);

  // The estate being edited (?id=) and the totals of all estates (shown while adding a new one).
  const estate = useApi(() => (estateId ? api.get(`/estates/${estateId}`) : Promise.resolve(null)), [estateId]);
  const totals = useApi(() => api.get("/estates/summary"), []);

  useEffect(() => {
    if (estate.data) {
      reset(toForm(estate.data));
      setImages(toImages(estate.data));
    }
  }, [estate.data, reset]);

  const overview = estateId ? estate.data : totals.data;

  // Upload each picked picture first, then keep its id with the form.
  const addImages = async (event) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) uploaded.push(await api.upload(file));
      setImages((current) => [...current, ...uploaded.map((item) => ({ id: item.id, url: item.url }))]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  // onsubmit functionality
  const estateProfileSubmit = async (values) => {
    const managers = [];
    for (const manager of estateProfileData.managerInformation) {
      const block = values.managers?.[manager.id];
      if (block) managers[manager.id] = { type: manager.type, ...block };
    }
    const body = { ...values, managers, estateImages: images.map((image) => image.id) };
    try {
      const saved = estateId ? await api.put(`/estates/${estateId}`, body) : await api.post("/estates", body);
      if (estateId) {
        toast.success("Estate updated");
        reset(toForm(saved));
        setImages(toImages(saved));
        estate.reload();
      } else {
        toast.success("Estate created");
        reset();
        setImages([]);
      }
      totals.reload();
      goBack();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(estateProfileSubmit)} className='space-y-6'>
      {/* Top Tabs */}
      <EstateManagementTabs />

      {estateId && estate.loading && !estate.data && <CardSkeleton count={4} />}
      {estateId && estate.error && (
        <ErrorState message={estate.error.message} onRetry={estate.reload} />
      )}

      {/* Main Layout */}
      <div className='grid grid-cols-12 gap-6'>
        {/* Left Side */}
        <div className='col-span-12 space-y-6 xl:col-span-7'>
          {/* Estate Basic Information */}

          <div className='rounded-xl  shadow-sm  '>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold  text-green-800 '>
                Estate Basic Information
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-5 p-6 md:grid-cols-2 xl:grid-cols-3'>
              {/* Estate Name */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter estate name'
                  {...register("estateName", {
                    required: "Estate Name is required",
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.estateName && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.estateName.message}
                  </p>
                )}
              </div>

              {/* Estate Code */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Code <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter estate code'
                  {...register("estateCode", {
                    required: "Estate Code is required",
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.estateCode && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.estateCode.message}
                  </p>
                )}
              </div>

              {/* Established Year */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Established Year
                </label>
                <input
                  type='number'
                  placeholder='e.g. 1998'
                  {...register("establishedYear", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.establishedYear && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.establishedYear.message}
                  </p>
                )}
              </div>

              {/* Company / Owner */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Company / Owner
                </label>
                <input
                  type='text'
                  placeholder='Enter company name'
                  {...register("companyOwner")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.companyOwner && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.companyOwner.message}
                  </p>
                )}
              </div>

              {/* Estate Type */}

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Type <span className='text-red-500'>*</span>
                </label>

                <select
                  {...register("estateType", {
                    required: "Estate Type is required",
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'
                >
                  <option value=''>Select Estate Type</option>

                  {estateProfileData.estateTypes.map((type) => (
                    <option key={type.id} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>

                {errors.estateType && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.estateType.message}
                  </p>
                )}
              </div>

              {/* Estate Category */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Estate Category <span className='text-red-500'>*</span>
                </label>

                <select
                  {...register("estateCategory", {
                    required: "Estate Category is required",
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'
                >
                  <option value=''>Select Category</option>

                  {estateProfileData.estateCategories.map((category) => (
                    <option key={category.id} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                {errors.estateCategory && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.estateCategory.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Address
                </label>

                <textarea
                  rows={1}
                  placeholder='Enter estate address'
                  {...register("address")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.address && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Police Station */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Police Station
                </label>
                <input
                  type='text'
                  placeholder='Police Station'
                  {...register("policeStation")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.policeStation && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.policeStation.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  District
                </label>
                <input
                  type='text'
                  placeholder='District'
                  {...register("district")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.district && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Division */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Division
                </label>
                <input
                  type='text'
                  placeholder='Division'
                  {...register("division")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.division && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.division.message}
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Country
                </label>
                <input
                  type='text'
                  placeholder='Country'
                  {...register("country")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.country && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* Zip Code */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Zip Code
                </label>
                <input
                  type='text'
                  placeholder='Zip Code'
                  {...register("zipCode")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.zipCode && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Phone
                </label>
                <input
                  type='text'
                  placeholder='+8801XXXXXXXXX'
                  {...register("phone", {
                    pattern: {
                      value: /^(\+8801|01)[3-9]\d{8}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.phone && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  placeholder='example@email.com'
                  {...register("email", {
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.email && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Website */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Website
                </label>
                <input
                  type='url'
                  placeholder='https://example.com'
                  {...register("website")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.website && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.website.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Estate Overview */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b px-6 py-4 bg-green-50'>
              <h2 className='text-lg font-semibold text-green-800'>
                Estate Overview
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 xl:grid-cols-4'>
              {/* Total Land Area */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Land Area (Acre)
                  <span className='ml-1 text-red-500'>*</span>
                </label>

                <input
                  type='number'
                  step='0.01'
                  placeholder='0.00'
                  {...register("totalLandArea", {
                    required: "Total Land Area is required",
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.totalLandArea && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalLandArea.message}
                  </p>
                )}
              </div>

              {/* Tea Area */}
              <div>
                <label className='mb-2 flex min-h-12 items-start text-sm font-medium leading-5 text-gray-700'>
                  Tea Area (Acre)
                  <span className='ml-1 text-red-500'>*</span>
                </label>

                <input
                  type='number'
                  step='0.01'
                  placeholder='0.00'
                  {...register("teaArea", {
                    required: "Tea Area is required",
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.teaArea && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.teaArea.message}
                  </p>
                )}
              </div>

              {/* Non Tea Area */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Non Tea Area (Acre)
                </label>

                <input
                  type='number'
                  step='0.01'
                  placeholder='0.00'
                  {...register("nonTeaArea", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.nonTeaArea && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.nonTeaArea.message}
                  </p>
                )}
              </div>

              {/* Total Field / Block */}
              <div>
                <label className='mb-2 flex min-h-12 items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Field / Block
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalFieldBlock", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalFieldBlock && (
                  <p className='text-xs text-red-500'>
                    {errors.totalFieldBlock.message}
                  </p>
                )}
              </div>

              {/* Total Division */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Division
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalDivision", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalDivision && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalDivision.message}
                  </p>
                )}
              </div>

              {/* Total Section */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Section
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalSection", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalSection && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalSection.message}
                  </p>
                )}
              </div>

              {/* Total Worker */}
              <div>
                <label className='mb-2 flex min-h-[48px] items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Worker
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalWorker", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalWorker && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalWorker.message}
                  </p>
                )}
              </div>

              {/* Total Family */}
              <div>
                <label className='mb-2 flex min-h-12 items-start text-sm font-medium leading-5 text-gray-700'>
                  Total Family
                </label>

                <input
                  type='number'
                  placeholder='0'
                  {...register("totalFamily", {
                    valueAsNumber: true,
                  })}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />
                {errors.totalFamily && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.totalFamily.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Manager / In-charge Information */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold bg-green-50 text-green-800'>
                Manager / In-charge Information
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 xl:grid-cols-3'>
              {estateProfileData.managerInformation.map((manager) => (
                <div
                  key={manager.id}
                  className='col-span-1 rounded-lg border border-gray-200 p-4 sm:col-span-2 xl:col-span-3'
                >
                  <div className='mb-4'>
                    <p className='text-xs text-gray-500'>
                      {manager.designation}
                    </p>
                  </div>

                  <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'>
                    {/* Name */}
                    <div>
                      <label className='mb-2 block text-sm font-medium text-gray-700'>
                        Name
                      </label>

                      <input
                        type='text'
                        {...register(`managers.${manager.id}.name`)}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-green-600'
                      />
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className='mb-2 block text-sm font-medium text-gray-700'>
                        Mobile
                      </label>

                      <input
                        type='tel'
                        {...register(`managers.${manager.id}.mobile`)}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-green-600'
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className='mb-2 block text-sm font-medium text-gray-700'>
                        Email
                      </label>

                      <input
                        type='email'
                        {...register(`managers.${manager.id}.email`)}
                        className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-green-600'
                      />
                    </div>
                  </div>
                  {["name", "mobile", "email"].map(
                    (field) =>
                      errors.managers?.[manager.id]?.[field] && (
                        <p key={field} className='mt-2 text-xs text-red-500'>
                          {errors.managers[manager.id][field].message}
                        </p>
                      ),
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Facilities / Amenities */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold bg-green-50 text-green-800'>
                Facilities / Amenities
              </h2>
            </div>

            {/* Body */}

            <div className='grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-4'>
              {/* Dynamic Facilities */}
              <div className='md:col-span-2 xl:col-span-3'>
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
                  {estateProfileData.facilityOptions.map((facility) => (
                    <label
                      key={facility.id}
                      className='flex items-center gap-2 text-sm text-gray-700'
                    >
                      <input
                        type='checkbox'
                        value={facility.value}
                        {...register("selectedFacilities")}
                        className='checkbox checkbox-success checkbox-sm rounded'
                      />

                      {facility.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Others */}
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Others (Specify)
                </label>

                <input
                  type='text'
                  placeholder='Gym, Guest House...'
                  {...register("otherFacilityName")}
                  className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
                />

                {errors.otherFacilityName && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.otherFacilityName.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='col-span-12 space-y-6 xl:col-span-5'>
          {/* Estate Images */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b px-6 py-4'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Estate Images
              </h2>
            </div>

            {/* Body */}
            <div className='p-6'>
              <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className='overflow-hidden rounded-xl border border-gray-200'
                  >
                    <img
                      src={image.url}
                      alt={`Estate image ${index + 1}`}
                      className='h-28 w-full object-cover transition duration-300 hover:scale-105 cursor-pointer'
                    />
                  </div>
                ))}

                {/* Add More */}
                <input
                  ref={fileInput}
                  type='file'
                  accept='image/jpeg,image/png,image/webp'
                  multiple
                  className='hidden'
                  onChange={addImages}
                />
                <button
                  type='button'
                  disabled={uploading}
                  onClick={() => fileInput.current?.click()}
                  className='flex h-28 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-500 transition hover:border-green-600 hover:text-green-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60'
                >
                  <span className='text-3xl font-light'>+</span>
                  <span className='mt-2 text-sm font-medium'>
                    {uploading ? "Uploading..." : "Add More"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Estate Summary */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Estate Summary
              </h2>
            </div>

            {/* Body */}
            <div className='p-6'>
              <div className='space-y-2'>
                {estateProfileData.estateOverview.map((item) => {
                  const Icon = summaryIconMap[item.icon];

                  return (
                    <div
                      key={item.id}
                      className='flex items-center justify-between py-1'
                    >
                      <div className='flex items-center gap-3'>
                        <Icon size={18} className='text-gray-500' />

                        <span className='text-sm text-gray-700'>
                          {item.title}
                        </span>
                      </div>

                      <span className='text-sm font-semibold text-green-700'>
                        {overview ? (overview[item.key] ?? 0) : "—"} {item.unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Geo Location */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Geo Location
              </h2>
            </div>

            {/* Body */}
            <div className='grid grid-cols-1 gap-5 p-3 lg:grid-cols-2'>
              {/* Left */}
              <div className='space-y-5'>
                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Latitude
                  </label>

                  <input
                    type='number'
                    step='any'
                    placeholder='26.3417'
                    {...register("latitude", {
                      required: "Latitude is required",
                      valueAsNumber: true,
                      min: {
                        value: -90,
                        message: "Latitude must be greater than -90",
                      },
                      max: {
                        value: 90,
                        message: "Latitude must be less than 90",
                      },
                    })}
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />

                  {errors.latitude && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.latitude.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-700'>
                    Longitude
                  </label>

                  <input
                    type='number'
                    step='any'
                    placeholder='88.0008'
                    {...register("longitude", {
                      required: "Longitude is required",
                      valueAsNumber: true,
                      min: {
                        value: -180,
                        message: "Longitude must be greater than -180",
                      },
                      max: {
                        value: 180,
                        message: "Longitude must be less than 180",
                      },
                    })}
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-green-600'
                  />

                  {errors.longitude && (
                    <p className='mt-1 text-xs text-red-500'>
                      {errors.longitude.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right */}
              <div className='overflow-hidden rounded-xl border border-gray-200'>
                <iframe
                  title='Estate Location'
                  src={`https://maps.google.com/maps?q=${latitude || 26.3417},${longitude || 88.0008}&z=14&output=embed`}
                  className='h-64 w-full'
                  loading='lazy'
                />
              </div>
            </div>
          </div>

          {/* Description / Note */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Header */}
            <div className='border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Description / Note
              </h2>
            </div>

            {/* Body */}
            <div className='p-6'>
              <textarea
                rows={10}
                placeholder='Write estate description...'
                {...register("description")}
                className='w-full resize-none rounded-lg border bg-white px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-green-600'
              />
              {errors.description && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
        <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
          <p className='text-sm text-red-500'>* Mandatory Field</p>

          <div className='flex flex-wrap items-center justify-end gap-3'>
            {estateProfileData.actions.map((action) => {
              const Icon = actionIconMap[action.type];

              // Cancel
              if (action.type === "cancel") {
                return (
                  <button
                    key={action.id}
                    type='button'
                    onClick={() => navigate(-1)}
                    className='inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-100'
                  >
                    <Icon size={18} />
                    {action.label}
                  </button>
                );
              }

              // Reset
              if (action.type === "reset") {
                return (
                  <button
                    key={action.id}
                    type='button'
                    onClick={() => reset()}
                    className='inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-6 text-sm font-medium text-green-700 transition-all duration-200 hover:border-green-300 hover:bg-green-100'
                  >
                    <Icon size={18} />
                    {action.label}
                  </button>
                );
              }

              // Submit / Save
              if (action.type === "submit") {
                return (
                  <button
                    key={action.id}
                    type='submit'
                    disabled={isSubmitting}
                    className='inline-flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-lg bg-green-700 px-6 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70'
                  >
                    <Icon size={18} />

                    {isSubmitting ? "Saving..." : action.label}
                  </button>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EstateProfile;
