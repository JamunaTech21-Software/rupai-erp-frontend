import React, { useEffect, useState } from "react";
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
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import ConfirmDialog from "../../components/common/ConfirmDialog";

// Search boxes wait a moment after typing before asking the server.
const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const PER_PAGE = 100;
const EMPTY_DIVISION = { estate: "", divisionName: "", divisionCode: "", totalArea: "", totalSection: "", status: "", description: "" };
const EMPTY_SECTION = { division: "", parentSection: "", sectionName: "", sectionCode: "", totalArea: "", manager: "", status: "" };

const DivisionAndSection = () => {
  const [showDivisionModal, setShowDivisionModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editingDivision, setEditingDivision] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

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
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  // useForm
  const {
    register: registerSection,
    handleSubmit: handleSubmitSection,
    reset: resetSection,
    clearErrors: clearSectionErrors,
    setError: setSectionError,
    setValue: setSectionValue,
    watch: watchSection,
    formState: { errors: sectionErrors, isSubmitting: sectionSubmitting },
  } = useForm();

  // Data from the API
  const searchDivision = useDebounced(divisionSearch);
  const searchSection = useDebounced(sectionSearch);
  const divisions = useApi(
    () =>
      api.get("/divisions", {
        search: searchDivision,
        divisionCode: selectedDivision,
        status: divisionStatus,
        perPage: PER_PAGE,
      }),
    [searchDivision, selectedDivision, divisionStatus],
  );
  const sections = useApi(
    () =>
      api.get("/sections", {
        search: searchSection,
        division: selectedSectionDivision,
        status: sectionStatus,
        perPage: PER_PAGE,
      }),
    [searchSection, selectedSectionDivision, sectionStatus],
  );
  const summary = useApi(() => api.get("/divisions/summary"), []);
  // Unfiltered divisions fill the filter and form dropdowns.
  const allDivisions = useApi(() => api.get("/divisions", { perPage: 500 }), []);
  const estateOptions = useApi(() => api.get("/options/estates"), []);

  const filteredDivisions = divisions.data?.data ?? [];
  const filteredSections = sections.data?.data ?? [];
  const divisionRows = allDivisions.data?.data ?? [];

  // Parent Section follows the chosen division; "Select (If any)" stays first.
  const sectionDivision = watchSection("division");
  const parentOptions = useApi(
    () => (sectionDivision ? api.get("/options/sections", { division: sectionDivision }) : Promise.resolve([])),
    [sectionDivision],
  );
  // Opening a section for edit: the parent shows its saved value once the options have loaded.
  useEffect(() => {
    const saved = editingSection?.parentSection;
    if (saved && parentOptions.data?.some((option) => option.value === saved)) {
      setSectionValue("parentSection", saved);
    }
  }, [editingSection, parentOptions.data, setSectionValue]);
  const parentSectionChoices = [
    divisionSectionData.parentSectionOptions[0],
    ...(parentOptions.data ?? [])
      .filter((option) => option.id !== editingSection?.id)
      .map((option) => ({ id: option.id, value: option.value, label: option.label })),
  ];

  const inactiveDivision = summary.data ? summary.data.totalDivision - summary.data.activeDivision : "—";
  const inactiveSection = summary.data ? summary.data.totalSection - summary.data.activeSection : "—";
  const summaryCards = [
    { label: "Total Division", value: summary.data?.totalDivision ?? "—" },
    { label: "Total Section", value: summary.data?.totalSection ?? "—" },
    { label: "Total Area (Acre)", value: summary.data ? Number(summary.data.totalArea).toFixed(2) : "—" },
    { label: "Average Section Area", value: summary.data?.averageSectionArea ?? "—", unit: "Acre" },
    { label: "Active Division", value: summary.data?.activeDivision ?? "—" },
    { label: "Active Section", value: summary.data?.activeSection ?? "—" },
    { label: "Inactive Division", value: inactiveDivision, red: true },
    { label: "Inactive Section", value: inactiveSection, red: true },
  ];

  const reloadAll = () => {
    divisions.reload();
    sections.reload();
    summary.reload();
    allDivisions.reload();
  };

  // Division popup: new / edit / close
  const openNewDivision = () => {
    setEditingDivision(null);
    reset(EMPTY_DIVISION);
    clearErrors();
    setShowDivisionModal(true);
  };
  const openEditDivision = (division) => {
    setEditingDivision(division);
    clearErrors();
    reset({
      estate: division.estate ?? "",
      divisionName: division.divisionName ?? "",
      divisionCode: division.divisionCode ?? "",
      totalArea: division.totalArea ?? "",
      totalSection: division.totalSection ?? "",
      status: division.status ?? "",
      description: division.description ?? "",
    });
    setShowDivisionModal(true);
  };
  const closeDivisionModal = () => {
    reset(EMPTY_DIVISION);
    clearErrors();
    setEditingDivision(null);
    setShowDivisionModal(false);
  };

  // Section popup: new / edit / close
  const openNewSection = () => {
    setEditingSection(null);
    resetSection(EMPTY_SECTION);
    clearSectionErrors();
    setShowSectionModal(true);
  };
  const openEditSection = (section) => {
    setEditingSection(section);
    clearSectionErrors();
    resetSection({
      division: section.division ?? "",
      parentSection: section.parentSection ?? "",
      sectionName: section.sectionName ?? "",
      sectionCode: section.sectionCode ?? "",
      totalArea: section.totalArea ?? "",
      manager: section.manager ?? "",
      status: section.status ?? "",
    });
    setShowSectionModal(true);
  };
  const closeSectionModal = () => {
    resetSection(EMPTY_SECTION);
    clearSectionErrors();
    setEditingSection(null);
    setShowSectionModal(false);
  };

  // submitDivision
  const onSubmitDivision = async (values) => {
    try {
      if (editingDivision) {
        await api.put(`/divisions/${editingDivision.id}`, values);
        toast.success("Division updated successfully!");
        closeDivisionModal();
      } else {
        await api.post("/divisions", values);
        toast.success("Division saved successfully!");
        closeDivisionModal();
      }
      reloadAll();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setError(key, { message });
      toast.error(error.message);
    }
  };
  // submitSection
  const onSubmitSection = async (values) => {
    try {
      if (editingSection) {
        await api.put(`/sections/${editingSection.id}`, values);
        toast.success("Section updated successfully!");
        closeSectionModal();
      } else {
        await api.post("/sections", values);
        toast.success("Section saved successfully!");
        closeSectionModal();
      }
      reloadAll();
    } catch (error) {
      for (const [key, message] of Object.entries(error.fields ?? {})) setSectionError(key, { message });
      toast.error(error.message);
    }
  };

  // Delete (after the confirm dialog)
  const confirmDelete = async () => {
    setDeleteBusy(true);
    try {
      await api.del(`/${deleting.type}s/${deleting.row.id}`);
      toast.success(deleting.type === "division" ? "Division deleted successfully!" : "Section deleted successfully!");
      setDeleting(null);
      reloadAll();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteBusy(false);
    }
  };

  // Main Component
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
                  onClick={openNewDivision}
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

                    {divisionRows.map((division) => (
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
                        className={`sticky top-0 z-10 border border-gray-200 bg-gray-50 px-3 py-3 text-sm font-medium text-gray-700 ${
                          header === "SL"
                            ? "text-center"
                            : header === "Total Section" || header === "Status" || header === "Action"
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
                  {divisions.loading && !divisions.data ? (
                    <TableSkeleton rows={5} columns={divisionSectionData.divisionTableHeaders.length} />
                  ) : divisions.error ? (
                    <tr>
                      <td colSpan={divisionSectionData.divisionTableHeaders.length} className='p-4'>
                        <ErrorState message={divisions.error.message} onRetry={divisions.reload} />
                      </td>
                    </tr>
                  ) : filteredDivisions.length === 0 ? (
                    <EmptyRow columns={divisionSectionData.divisionTableHeaders.length} />
                  ) : (
                    filteredDivisions.map((division, index) => (
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
                        {Number(division.totalArea).toFixed(2)}
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
                            onClick={() => openEditDivision(division)}
                            className='text-blue-600 transition-colors hover:text-blue-800 cursor-pointer'
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            type='button'
                            onClick={() => setDeleting({ type: "division", row: division })}
                            className='text-red-600 transition-colors hover:text-red-800 cursor-pointer'
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
              <div className='flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 px-4 py-3 text-sm text-gray-600'>
                <p>
                  Showing {filteredDivisions.length > 0 ? 1 : 0} to {filteredDivisions.length} of{" "}
                  {divisions.data?.meta?.total ?? 0} entries
                </p>
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
                  onClick={openNewSection}
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

                    {divisionRows.map((division) => (
                      <option key={division.id} value={division.id}>
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
                        className={`sticky top-0 z-10 border border-gray-200 bg-gray-50 px-1 py-3 text-sm font-medium text-gray-700 ${
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
                  {sections.loading && !sections.data ? (
                    <TableSkeleton rows={5} columns={divisionSectionData.sectionTableHeaders.length} />
                  ) : sections.error ? (
                    <tr>
                      <td colSpan={divisionSectionData.sectionTableHeaders.length} className='p-4'>
                        <ErrorState message={sections.error.message} onRetry={sections.reload} />
                      </td>
                    </tr>
                  ) : filteredSections.length > 0 ? (
                    filteredSections.map((section, index) => (
                      <tr key={section.id} className='hover:bg-gray-50'>
                        {/* SL */}
                        <td className='border border-gray-200 px-3 py-3 text-center text-sm'>
                          {index + 1}
                        </td>

                        {/* Division */}
                        <td className='border border-gray-200 px-3 py-3 text-sm'>
                          {section.divisionName}
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
                          {section.parentSectionName ?? "-"}
                        </td>

                        {/* Total Area */}
                        <td className='border border-gray-200 px-3 py-3 text-sm'>
                          {Number(section.totalArea).toFixed(2)}
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
                              onClick={() => openEditSection(section)}
                              className='cursor-pointer text-blue-600 hover:text-blue-800'
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              type='button'
                              onClick={() => setDeleting({ type: "section", row: section })}
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
            </div>
              <div className='flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 px-4 py-3 text-sm text-gray-600'>
                <p>
                  Showing {filteredSections.length > 0 ? 1 : 0} to{" "}
                  {filteredSections.length} of {sections.data?.meta?.total ?? 0} entries
                </p>
              </div>
          </div>
        </div>
      </div>

      {/* ================= Division & Section Summary ================= */}
      <div className='flex flex-col bg-green-100 sm:flex-row'>
        {/* Left Icon */}
        <div className='flex w-full items-center justify-center border-b border-green-200 p-4 sm:w-24 sm:shrink-0 sm:border-b-0 sm:border-r sm:p-6'>
          <Map
            size={40}
            strokeWidth={1.8}
            className='text-green-700 sm:h-12 sm:w-12'
          />
        </div>

        {/* Right Content */}
        <div className='w-full min-w-0 sm:flex-1'>
          {/* Header */}
          <div className='border-b border-green-200 px-4 py-3 sm:px-6'>
            <h2 className='text-center text-sm font-semibold text-green-800 sm:text-left'>
              Division & Section Summary
            </h2>
          </div>

          {/* Summary: 2 cards across on phones, 4 on tablets and laptops, 8 on very wide screens */}
          <div className='grid grid-cols-2 gap-3 p-3 sm:p-4 md:grid-cols-4 2xl:grid-cols-8'>
            {summaryCards.map((card) => (
              <div key={card.label} className='min-w-0 rounded-lg border border-green-200 bg-white p-3 shadow-sm sm:p-4'>
                <p className='text-xs text-gray-500 sm:text-sm'>{card.label}</p>
                <h3 className={`mt-1 break-words text-lg font-bold sm:text-xl ${card.red ? "text-red-600" : "text-green-700"}`}>
                  {card.value}
                  {card.unit && <span className='ml-1 text-sm sm:text-base'>{card.unit}</span>}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ================= Division Information Popup / Modal ================= */}
      {showDivisionModal && (
        <div className='fixed inset-0 z-50 overflow-y-auto bg-black/50 p-3 sm:p-4'>
          {/* Division Modal Container */}
          <div className='mx-auto mt-6 mb-6 w-full max-w-3xl rounded-xl bg-white shadow-xl sm:mt-6'>
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b bg-green-50 px-4 py-4 sm:px-6'>
              <h2 className='text-lg font-semibold text-green-800'>
                Division Information
              </h2>

              {/* Close Modal Button */}
              <button
                type='button'
                onClick={closeDivisionModal}
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
                      onClick={closeDivisionModal}
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
                onClick={closeSectionModal}
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
                        onChange: () => setSectionValue("parentSection", ""),
                      })}
                      className='h-11 w-full rounded-lg border border-gray-300 bg-white px-4 outline-none transition focus:border-green-600'
                    >
                      <option value=''>
{allDivisions.data && divisionRows.length === 0
 ? "No divisions yet - add a division first"
 : "Select Division"}
</option>

                      {divisionRows.map((division) => (
                        <option key={division.id} value={division.id}>
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
                      {parentSectionChoices.map(
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
              <div className='mt-6 border-t p-4 pt-4 sm:p-6 sm:pt-6'>
                <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                  {/* Cancel */}
                  <button
                    type='button'
                    onClick={closeSectionModal}
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
      <ConfirmDialog
        open={Boolean(deleting)}
        title={deleting?.type === "division" ? "Delete division?" : "Delete section?"}
        message={`${deleting?.type === "division" ? deleting?.row?.divisionName : deleting?.row?.sectionName} will be removed from the list.`}
        loading={deleteBusy}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
};

export default DivisionAndSection;
