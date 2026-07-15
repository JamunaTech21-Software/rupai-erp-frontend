import { useMemo, useState } from 'react'
import {
  Map,
  Maximize2,
  Layers,
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Phone,
  User,
} from 'lucide-react'
import { estateSummary, estates, estateStatuses } from '../data/estateData'

const iconMap = { Map, Maximize2, Layers, Users }

const statusStyles = {
  Active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Inactive: 'bg-slate-100 text-slate-600 ring-slate-500/20',
}

export default function EstateList() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredEstates = useMemo(() => {
    return estates.filter((estate) => {
      const matchesSearch =
        estate.name.toLowerCase().includes(search.toLowerCase()) ||
        estate.code.toLowerCase().includes(search.toLowerCase()) ||
        estate.location.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'All' || estate.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">Plantation Management</p>
          <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">Estate List</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and view all registered tea estates
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Add Estate
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {estateSummary.map((card) => {
          const Icon = iconMap[card.icon] || Map
          return (
            <div
              key={card.id}
              className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">{card.title}</p>
                  <p className="text-lg font-bold text-slate-900">
                    {card.value}
                    {card.unit && (
                      <span className="ml-1 text-xs font-medium text-slate-400">
                        {card.unit}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Table card */}
      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative min-w-0 flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search estates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
              >
                {estateStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Status' : s}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-xs text-slate-500">
              {filteredEstates.length} of {estates.length}
            </span>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Estate
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Area
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Fields
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Workers
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Manager
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEstates.map((estate) => (
                <tr key={estate.id} className="transition hover:bg-slate-50/50">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                        <Map className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{estate.name}</p>
                        <p className="text-xs text-slate-400">
                          {estate.code} · Est. {estate.established}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-slate-700">{estate.district}</p>
                    <p className="text-xs text-slate-400">{estate.location}</p>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-800">
                    {estate.area.toLocaleString()} Acre
                  </td>
                  <td className="px-4 py-3.5 text-slate-700">{estate.fields}</td>
                  <td className="px-4 py-3.5 text-slate-700">{estate.workers}</td>
                  <td className="px-4 py-3.5">
                    <p className="text-slate-700">{estate.manager}</p>
                    <p className="text-xs text-slate-400">{estate.phone}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[estate.status]}`}
                    >
                      {estate.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-sky-50 hover:text-sky-600"
                        aria-label="View estate"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-amber-50 hover:text-amber-600"
                        aria-label="Edit estate"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete estate"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {filteredEstates.map((estate) => (
            <div key={estate.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                    <Map className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">{estate.name}</p>
                    <p className="text-xs text-slate-400">
                      {estate.code} · {estate.id}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${statusStyles[estate.status]}`}
                >
                  {estate.status}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-slate-50 px-2 py-2">
                  <p className="text-xs font-bold text-slate-800">{estate.area}</p>
                  <p className="text-[10px] text-slate-400">Acre</p>
                </div>
                <div className="rounded-lg bg-slate-50 px-2 py-2">
                  <p className="text-xs font-bold text-slate-800">{estate.fields}</p>
                  <p className="text-[10px] text-slate-400">Fields</p>
                </div>
                <div className="rounded-lg bg-slate-50 px-2 py-2">
                  <p className="text-xs font-bold text-slate-800">{estate.workers}</p>
                  <p className="text-[10px] text-slate-400">Workers</p>
                </div>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-slate-500">
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  {estate.location}
                </p>
                <p className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  {estate.manager}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  {estate.phone}
                </p>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEstates.length === 0 && (
          <div className="px-4 py-12 text-center">
            <Map className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-2 text-sm font-medium text-slate-600">No estates found</p>
            <p className="text-xs text-slate-400">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
