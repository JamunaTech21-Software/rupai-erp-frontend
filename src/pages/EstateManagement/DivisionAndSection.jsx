import React, { useState } from "react";
import EstateManagementTabs from "../../components/EstateManagement/EstateManagementTabs";
import {
  X,
  RotateCcw,
  Save,
  Plus,
  Pencil,
  Trash2,
  Map,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { divisionSectionData } from "../../data/EstateManagementData/divisionAndSectionData";
import toast from "react-hot-toast";

const DivisionAndSection = () => {
  const [showDivisionModal, setShowDivisionModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);

  const [divisionSearch, setDivisionSearch] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisionStatus, setDivisionStatus] = useState("");

  const [sectionSearch, setSectionSearch] = useState("");
  const [selectedSectionDivision, setSelectedSectionDivision] = useState("");
  const [sectionStatus, setSectionStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const filteredDivisions = divisionSectionData.divisionList.filter(
    (division) => {
      const search = divisionSearch.toLowerCase().trim();

      // Search
      const matchesSearch =
        division.divisionName.toLowerCase().includes(search) ||
        division.divisionCode.toLowerCase().includes(search);

      // Division
      const matchesDivision =
        selectedDivision === "" || division.divisionCode === selectedDivision;

      // Status
      const matchesStatus =
        divisionStatus === "" || division.status === divisionStatus;

      return matchesSearch && matchesDivision && matchesStatus;
    },
  );

  const filteredSections = divisionSectionData.sectionList.filter((section) => {
    const search = sectionSearch.toLowerCase().trim();

    // Search condition
    const matchesSearch =
      section.sectionName.toLowerCase().includes(search) ||
      section.sectionCode.toLowerCase().includes(search) ||
      section.division.toLowerCase().includes(search);

    // Division condition
    const matchesDivision =
      selectedSectionDivision === "" ||
      section.division === selectedSectionDivision;

    // Status condition
    const matchesStatus =
      sectionStatus === "" || section.status === sectionStatus;

    return matchesSearch && matchesDivision && matchesStatus;
  });
  const {
    register: registerSection,
    handleSubmit: handleSubmitSection,
    reset: resetSection,
    clearErrors: clearSectionErrors,
    formState: { errors: sectionErrors, isSubmitting: sectionSubmitting },
  } = useForm();
  const onSubmitDivision = async (data) => {
    try {
      console.log(data);

      toast.success("Division saved successfully!");

      reset();
      clearErrors();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  const onSubmitSection = async (data) => {
    try {
      console.log(data);

      toast.success("Section saved successfully!");

      resetSection();
      clearSectionErrors();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Top Tabs */}
      <EstateManagementTabs />

      {/* Main Layout */}
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-12 space-y-6 xl:col-span-12'>
          {/* Division List */}
          <div className='rounded-xl bg-white shadow-sm'>
            <div className='border-b bg-green-50 px-4 py-3 sm:px-6'>
              <div className='flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='text-center text-lg font-semibold text-green-800'>
                  Division List
                </h2>

                <button
                  type='button'
                  onClick={() => setShowDivisionModal(true)}
                  className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800 sm:w-auto'
                >
                  <Plus size={18} />
                  Add Division
                </button>
              </div>
            </div>
            {/* Division Search */}
            <div className='border-b border-gray-200 p-3 sm:p-4'>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-12'>
                {/* Search */}
                <div className='relative md:col-span-5'>
                  <Search
                    size={18}
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                  />

                  <input
                    type='text'
                    value={divisionSearch}
                    onChange={(e) => setDivisionSearch(e.target.value)}
                    placeholder='Search division...'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Division */}
                <div className='md:col-span-3'>
                  <select
                    value={selectedDivision}
                    onChange={(e) => setSelectedDivision(e.target.value)}
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'
                  >
                    <option value=''>All Division</option>

                    {divisionSectionData.divisionList.map((division) => (
                      <option key={division.id} value={division.divisionCode}>
                        {division.divisionName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className='md:col-span-3'>
                  <select
                    value={divisionStatus}
                    onChange={(e) => setDivisionStatus(e.target.value)}
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'
                  >
                    <option value=''>All Status</option>

                    {divisionSectionData.divisionStatusOptions.map((status) => (
                      <option key={status.id} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter */}
                <div className='md:col-span-1'>
                  <button
                    type='button'
                    className='flex h-11 w-full items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                  >
                    <SlidersHorizontal size={18} />
                  </button>
                </div>
              </div>
            </div>
            <div className='max-h-78 overflow-auto'>
              <table className='min-w-full border border-gray-200 border-collapse'>
                <thead className='border border-gray-200 bg-gray-50 px-2 py-3 text-left text-sm font-regular text-gray-700'>
                  <tr>
                    {divisionSectionData.divisionTableHeaders.map((header) => (
                      <th
                        key={header}
                        className={`border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-medium text-gray-700 ${
                          header === "SL"
                            ? " left-0 z-20 text-center"
                            : header === "Status" || header === "Action"
                              ? "text-center"
                              : "text-left"
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredDivisions.map((division, index) => (
                    <tr key={division.id} className='hover:bg-gray-50'>
                      {/* SL */}
                      <td className='border border-gray-200 px-4 py-3 text-sm text-center'>
                        {index + 1}
                      </td>

                      {/* Division Name */}
                      <td className='border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800'>
                        {division.divisionName}
                      </td>

                      {/* Division Code */}
                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {division.divisionCode}
                      </td>

                      {/* Total Area */}
                      <td className='border border-gray-200 px-4 py-3 text-sm'>
                        {division.totalArea.toFixed(2)}
                      </td>

                      {/* Total Section */}
                      <td className='border border-gray-200 px-4 py-3 text-sm text-center'>
                        {division.totalSection}
                      </td>

                      {/* Status */}
                      <td className='border border-gray-200 px-4 py-3 text-center'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            division.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {division.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className='border border-gray-200 px-4 py-3'>
                        <div className='flex items-center justify-center gap-3'>
                          <button
                            type='button'
                            className='text-blue-600 transition-colors hover:text-blue-800 cursor-pointer'
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            type='button'
                            className='text-red-600 transition-colors hover:text-red-800 cursor-pointer'
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm text-gray-600'>
                <p>
                  Showing 1 to {divisionSectionData.divisionList.length} of{" "}
                  {divisionSectionData.divisionList.length} entries
                </p>
              </div>
            </div>
          </div>

          {/* ================= Section List ================= */}
          <div className='rounded-xl bg-white shadow-sm'>
            {/* Section Header */}
            <div className='border-b bg-green-50 px-4 py-3 sm:px-6 sm:py-4'>
              <div className='flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between'>
                <h2 className='text-center text-lg font-semibold text-green-800'>
                  Section List (Rangpur Division)
                </h2>

                <button
                  type='button'
                  onClick={() => setShowSectionModal(true)}
                  className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white hover:bg-green-800 sm:w-auto'
                >
                  <Plus size={18} />
                  Add Section
                </button>
              </div>
            </div>

            {/* Search + Division + Status + Filter */}
            <div className='border-b border-gray-200 p-3 sm:p-4'>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-12'>
                {/* Search */}
                <div className='relative md:col-span-5'>
                  <Search
                    size={18}
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                  />

                  <input
                    type='text'
                    value={sectionSearch}
                    onChange={(e) => setSectionSearch(e.target.value)}
                    placeholder='Search section...'
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-green-600'
                  />
                </div>

                {/* Division */}
                <div className='md:col-span-3'>
                  <select
                    value={selectedSectionDivision}
                    onChange={(e) => setSelectedSectionDivision(e.target.value)}
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'
                  >
                    <option value=''>All Division</option>

                    {divisionSectionData.divisionList.map((division) => (
                      <option key={division.id} value={division.divisionName}>
                        {division.divisionName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className='md:col-span-3'>
                  <select
                    value={sectionStatus}
                    onChange={(e) => setSectionStatus(e.target.value)}
                    className='h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-green-600'
                  >
                    <option value=''>All Status</option>

                    {divisionSectionData.sectionStatusOptions.map((status) => (
                      <option key={status.id} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter Icon */}
                <div className='md:col-span-1'>
                  <button
                    type='button'
                    onClick={() => {
                      setSectionSearch("");
                      setSelectedSectionDivision("");
                      setSectionStatus("");
                    }}
                    title='Reset Filters'
                    className='flex h-11 w-full items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                  >
                    <SlidersHorizontal size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Section Table */}
            <div className='max-h-78 overflow-auto'>
              <table className='min-w-full border-collapse border border-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    {divisionSectionData.sectionTableHeaders.map((header) => (
                      <th
                        key={header}
                        className={`border border-gray-200 bg-gray-50 px-1 py-3 text-sm font-medium text-gray-700 ${
                          header === "SL" ||
                          header === "Total Section" ||
                          header === "Status" ||
                          header === "Action"
                            ? "text-center"
                            : "text-left"
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredSections.length > 0 ? (
                    filteredSections.map((section, index) => (
                      <tr key={section.id} className='hover:bg-gray-50'>
                        {/* SL */}
                        <td className='border border-gray-200 px-3 py-3 text-center text-sm'>
                          {index + 1}
                        </td>

                        {/* Division */}
                        <td className='border border-gray-200 px-3 py-3 text-sm'>
                          {section.division}
                        </td>

                        {/* Section Name */}
                        <td className='border border-gray-200 px-3 py-3 text-sm font-medium text-gray-800'>
                          {section.sectionName}
                        </td>

                        {/* Section Code */}
                        <td className='border border-gray-200 px-3 py-3 text-sm'>
                          {section.sectionCode}
                        </td>

                        {/* Parent Section */}
                        <td className='border border-gray-200 px-3 py-3 text-sm'>
                          {section.parentSection}
                        </td>

                        {/* Total Area */}
                        <td className='border border-gray-200 px-3 py-3 text-sm'>
                          {section.totalArea.toFixed(2)}
                        </td>

                        {/* Manager */}
                        <td className='border border-gray-200 px-3 py-3 text-sm'>
                          {section.manager}
                        </td>

                        {/* Status */}
                        <td className='border border-gray-200 px-3 py-3 text-center'>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                              section.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {section.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className='border border-gray-200 px-3 py-3'>
                          <div className='flex items-center justify-center gap-3'>
                            <button
                              type='button'
                              className='cursor-pointer text-blue-600 hover:text-blue-800'
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              type='button'
                              className='cursor-pointer text-red-600 hover:text-red-800'
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={divisionSectionData.sectionTableHeaders.length}
                        className='border border-gray-200 px-4 py-8 text-center text-sm text-gray-500'
                      >
                        No section found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Entry Count */}
              <div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm text-gray-600'>
                <p>
                  Showing {filteredSections.length > 0 ? 1 : 0} to{" "}
                  {filteredSections.length} of {filteredSections.length} entries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Division & Section Summary ================= */}
      <div className='flex flex-col bg-green-100 sm:flex-row'>
        {/* Left Icon */}
        <div className='flex w-full items-center justify-center border-b border-green-200 p-4 sm:w-1/12 sm:border-b-0 sm:border-r sm:p-6'>
          <Map
            size={40}
            strokeWidth={1.8}
            className='text-green-700 sm:h-12 sm:w-12'
          />
        </div>

        {/* Right Content */}
        <div className='w-full sm:w-11/12'>
          {/* Header */}
          <div className='border-b border-green-200 px-4 py-3 sm:px-6'>
            <h2 className='text-center text-sm font-semibold text-green-800 sm:text-left'>
              Division & Section Summary
            </h2>
          </div>

          {/* Desktop Summary */}
          <div className='hidden gap-6 p-6 lg:grid lg:grid-cols-6'>
            {/* Total Division */}
            <div>
              <p className='text-sm text-gray-500'>Total Division</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.totalDivision}
              </h3>
            </div>

            {/* Total Section */}
            <div>
              <p className='text-sm text-gray-500'>Total Section</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.totalSection}
              </h3>
            </div>

            {/* Total Area */}
            <div>
              <p className='text-sm text-gray-500'>Total Area (Acre)</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.totalArea.toFixed(2)}
              </h3>
            </div>

            {/* Average Section Area */}
            <div>
              <p className='text-sm text-gray-500'>Average Section Area</p>
              <h3 className='mt-2 whitespace-nowrap text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.averageSectionArea}
                <span className='ml-1 text-lg'>Acre</span>
              </h3>
            </div>

            {/* Active Division */}
            <div>
              <p className='text-sm text-gray-500'>Active Division</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.activeDivision}
              </h3>
            </div>

            {/* Active Section */}
            <div>
              <p className='text-sm text-gray-500'>Active Section</p>
              <h3 className='mt-2 text-2xl font-bold text-green-700'>
                {divisionSectionData.summary.activeSection}
              </h3>
            </div>
          </div>

          {/* Mobile / Tablet Summary */}
          <div className='grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:hidden'>
            {/* Total Division */}
            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Total Division</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.totalDivision}
              </h3>
            </div>

            {/* Total Section */}
            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Total Section</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.totalSection}
              </h3>
            </div>

            {/* Total Area */}
            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Total Area (Acre)</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.totalArea.toFixed(2)}
              </h3>
            </div>

            {/* Average Section Area */}
            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Average Section Area</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.averageSectionArea}
                <span className='ml-1 text-base'>Acre</span>
              </h3>
            </div>

            {/* Active Division */}
            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Active Division</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.activeDivision}
              </h3>
            </div>

            {/* Active Section */}
            <div className='rounded-lg border border-green-200 bg-white p-4 shadow-sm'>
              <p className='text-sm text-gray-500'>Active Section</p>
              <h3 className='mt-1 text-xl font-bold text-green-700'>
                {divisionSectionData.summary.activeSection}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* ================= Division Information Popup / Modal ================= */}
      {showDivisionModal && (
        <div className='fixed inset-0 z-50 overflow-y-auto bg-black/50 p-3 sm:p-4'>
          {/* Division Modal Container */}
          <div className='mx-auto mt-6 mb-6 w-full max-w-3xl rounded-xl bg-white shadow-xl sm:mt-6'>
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b bg-green-50 px-6 py-4'>
              <h2 className='text-lg font-semibold text-green-800'>
                Division Information
              </h2>

              {/* Close Modal Button */}
              <button
                type='button'
                onClick={() => setShowDivisionModal(false)}
                className='rounded-lg p-2 text-gray-500 hover:bg-gray-100'
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onSubmitDivision)}>
              <div className='p-4 sm:p-6'>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                  {/* Estate */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Estate <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...register("estate", {
                        required: "Estate is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-green-600'
                    >
                      <option value=''>Select Estate</option>

                      {divisionSectionData.estateOptions.map((estate) => (
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

                  {/* Total Area */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Total Area (Acre) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      min={0}
                      step='0.01'
                      placeholder='Enter total area'
                      {...register("totalArea", {
                        required: "Total Area is required",
                        min: {
                          value: 0.01,
                          message: "Area must be greater than 0",
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {errors.totalArea && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.totalArea.message}
                      </p>
                    )}
                  </div>
                  {/* Division Name */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division Name <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter division name'
                      {...register("divisionName", {
                        required: "Division Name is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {errors.divisionName && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.divisionName.message}
                      </p>
                    )}
                  </div>

                  {/* Total Section */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Total Section
                    </label>

                    <input
                      type='number'
                      min={0}
                      placeholder='Enter total section'
                      {...register("totalSection", {
                        min: {
                          value: 0,
                          message: "Value cannot be negative",
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {errors.totalSection && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.totalSection.message}
                      </p>
                    )}
                  </div>

                  {/* Division Code */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division Code <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter division code'
                      {...register("divisionCode", {
                        required: "Division Code is required",
                        pattern: {
                          value: /^DIV-\d+$/,
                          message: "Example: DIV-01",
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {errors.divisionCode && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.divisionCode.message}
                      </p>
                    )}
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
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-green-600'
                    >
                      <option value=''>Select Status</option>

                      {divisionSectionData.divisionStatusOptions.map(
                        (status) => (
                          <option key={status.id} value={status.value}>
                            {status.label}
                          </option>
                        ),
                      )}
                    </select>

                    {errors.status && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                  {/* Description */}
                  <div className='mt-5'>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Description
                    </label>

                    <textarea
                      placeholder='Write division description...'
                      {...register("description", {
                        maxLength: {
                          value: 250,
                          message: "Maximum 250 characters",
                        },
                      })}
                      className='min-h-24 w-full resize-none rounded-lg border border-gray-300 p-4 outline-none transition focus:border-green-600'
                    />

                    {errors.description && (
                      <p className='mt-1 text-xs text-red-500'>
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Division Form Footer */}
                <div className='mt-6 border-t pt-6'>
                  <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                    {/* Cancel */}
                    <button
                      type='button'
                      onClick={() => {
                        reset();
                        clearErrors();
                        setShowDivisionModal(false);
                      }}
                      className='inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto'
                    >
                      <X size={18} />
                      Cancel
                    </button>

                    {/* Reset */}
                    <button
                      type='button'
                      onClick={() => {
                        reset();
                        clearErrors();
                      }}
                      className='inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-5 text-sm font-medium text-green-700 transition hover:bg-green-100 sm:w-auto'
                    >
                      <RotateCcw size={18} />
                      Reset
                    </button>

                    {/* Save Division */}
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                    >
                      <Save size={18} />
                      {isSubmitting ? "Saving..." : "Save Division"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= Section Information Popup / Modal ================= */}
      {showSectionModal && (
        <div className='fixed inset-0 z-50 overflow-y-auto bg-black/50 p-3 sm:p-4'>
          {/* Section Modal Container */}
          <div className='mx-auto mt-6 mb-6 w-full max-w-3xl rounded-xl bg-white shadow-xl sm:mt-6'>
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b bg-green-50 px-4 py-4 sm:px-6'>
              <h2 className='text-lg font-semibold text-green-800'>
                Section Information
              </h2>

              {/* Close Modal Button */}
              <button
                type='button'
                onClick={() => setShowSectionModal(false)}
                className='rounded-lg p-2 text-gray-500 hover:bg-gray-100'
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitSection(onSubmitSection)}>
              <div className='p-4 sm:p-6'>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                  {/* Division */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Division <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...registerSection("division", {
                        required: "Division is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-green-600'
                    >
                      <option value=''>Select Division</option>

                      {divisionSectionData.divisionList.map((division) => (
                        <option key={division.id} value={division.divisionCode}>
                          {division.divisionName}
                        </option>
                      ))}
                    </select>

                    {sectionErrors.division && (
                      <p className='mt-1 text-xs text-red-500'>
                        {sectionErrors.division.message}
                      </p>
                    )}
                  </div>

                  {/* Parent Section */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Parent Section
                    </label>

                    <select
                      {...registerSection("parentSection")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-green-600'
                    >
                      {divisionSectionData.parentSectionOptions.map(
                        (section) => (
                          <option key={section.id} value={section.value}>
                            {section.label}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {/* Section Name */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Section Name <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter section name'
                      {...registerSection("sectionName", {
                        required: "Section Name is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {sectionErrors.sectionName && (
                      <p className='mt-1 text-xs text-red-500'>
                        {sectionErrors.sectionName.message}
                      </p>
                    )}
                  </div>

                  {/* Manager / In-charge */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Manager / In-charge
                    </label>

                    <select
                      {...registerSection("manager")}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-green-600'
                    >
                      <option value=''>Select Manager</option>

                      {divisionSectionData.managerOptions.map((manager) => (
                        <option key={manager.id} value={manager.value}>
                          {manager.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Section Code */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Section Code <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='text'
                      placeholder='Enter section code'
                      {...registerSection("sectionCode", {
                        required: "Section Code is required",
                        pattern: {
                          value: /^SEC-\d+$/,
                          message: "Example: SEC-001",
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {sectionErrors.sectionCode && (
                      <p className='mt-1 text-xs text-red-500'>
                        {sectionErrors.sectionCode.message}
                      </p>
                    )}
                  </div>

                  {/* Total Area */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Total Area (Acre) <span className='text-red-500'>*</span>
                    </label>

                    <input
                      type='number'
                      min={0}
                      step='0.01'
                      placeholder='Enter total area'
                      {...registerSection("totalArea", {
                        required: "Total Area is required",
                        min: {
                          value: 0.01,
                          message: "Area must be greater than 0",
                        },
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 px-4 outline-none transition focus:border-green-600'
                    />

                    {sectionErrors.totalArea && (
                      <p className='mt-1 text-xs text-red-500'>
                        {sectionErrors.totalArea.message}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                      Status <span className='text-red-500'>*</span>
                    </label>

                    <select
                      {...registerSection("status", {
                        required: "Status is required",
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-green-600'
                    >
                      <option value=''>Select Status</option>

                      {divisionSectionData.sectionStatusOptions.map(
                        (status) => (
                          <option key={status.id} value={status.value}>
                            {status.label}
                          </option>
                        ),
                      )}
                    </select>

                    {sectionErrors.status && (
                      <p className='mt-1 text-xs text-red-500'>
                        {sectionErrors.status.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Section Form Footer */}
              <div className='mt-6 p-6 border-t pt-6'>
                <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                  {/* Cancel */}
                  <button
                    type='button'
                    onClick={() => {
                      resetSection();
                      clearSectionErrors();
                      setShowSectionModal(false);
                    }}
                    className='inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 sm:w-auto'
                  >
                    <X size={18} />
                    Cancel
                  </button>

                  {/* Reset */}
                  <button
                    type='button'
                    onClick={() => {
                      resetSection();
                      clearSectionErrors();
                    }}
                    className='inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-5 text-sm font-medium text-green-700 transition hover:bg-green-100 sm:w-auto'
                  >
                    <RotateCcw size={18} />
                    Reset
                  </button>

                  {/* Save Section */}
                  <button
                    type='submit'
                    disabled={sectionSubmitting}
                    className='inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                  >
                    <Save size={18} />
                    {sectionSubmitting ? "Saving..." : "Save Section"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DivisionAndSection;
