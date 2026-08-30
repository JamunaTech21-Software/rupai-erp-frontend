import React from "react";
import MasterDataTabs from "./MasterDataTabs";
import { Link } from "react-router-dom";
import { masterDataDashboardData } from "../../data/MasterData/masterDataDashboardData";

const { summaryCards } = masterDataDashboardData;

import {
  Leaf,
  CupSoda,
  Coffee,
  UserRound,
  Landmark,
  Warehouse,
  ArrowRight,
  Ruler,
  Sprout,
  Factory,
  CircleCheck,
  ShieldCheck,
} from "lucide-react";

const summaryIconMap = {
  season: {
    icon: Leaf,
    color: "text-green-600",
    bg: "bg-green-50",
  },

  teaGrade: {
    icon: CupSoda,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },

  teaBrokers: {
    icon: UserRound,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },

  auctionCenters: {
    icon: Landmark,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },

  teaWarehouse: {
    icon: Warehouse,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
};
const iconMap = {
  season: Leaf,
  teaGrade: CupSoda,
  teaBrokers: UserRound,
  auctionCenters: Landmark,
  teaWarehouse: Warehouse,
  unitOfMeasurement: Ruler,
  teaType: Sprout,
  productionType: Factory,
  commonStatus: ShieldCheck,
};

const masterDataIconMap = {
  season: Leaf,
  teaGrade: CupSoda,
  teaBrokers: UserRound,
  auctionCenters: Landmark,
  teaWarehouse: Warehouse,
  unitOfMeasurement: Ruler,
  teaType: Sprout,
  productionType: Factory,
  commonStatus: CircleCheck,
};
const quickAccessIconMap = {
  season: {
    icon: Leaf,
    color: "text-green-600",
    bg: "bg-green-50",
  },

  teaGrade: {
    icon: CupSoda,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },

  teaBrokers: {
    icon: UserRound,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },

  auctionCenters: {
    icon: Landmark,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },

  teaWarehouse: {
    icon: Warehouse,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },

  unitOfMeasurement: {
    icon: Ruler,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },

  teaType: {
    icon: Sprout,
    color: "text-green-600",
    bg: "bg-green-50",
  },

  productionType: {
    icon: Factory,
    color: "text-pink-500",
    bg: "bg-pink-50",
  },

  commonStatus: {
    icon: ShieldCheck,
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
};
const MasterDataDashboard = () => {
  return (
    <div className='w-full space-y-4'>
      <MasterDataTabs />
      {/* =========================================================
          TOP SUMMARY CARDS
      ========================================================= */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {masterDataDashboardData.summaryCards.map((card) => {
          const iconConfig = summaryIconMap[card.icon];
          const Icon = iconConfig.icon;

          return (
            <div
              key={card.id}
              className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md'
            >
              <div className='flex items-center gap-4'>
                {/* ================= ICON ================= */}
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${iconConfig.bg}`}
                >
                  <Icon className={`h-7 w-7 ${iconConfig.color}`} />
                </div>

                {/* ================= CONTENT ================= */}
                <div className='min-w-0'>
                  <p className='text-xs font-semibold text-slate-600'>
                    {card.title}
                  </p>

                  <h3 className='mt-1 text-2xl font-bold leading-none text-slate-800'>
                    {card.total}
                  </h3>

                  <p className='mt-1 text-[11px] font-semibold text-green-600'>
                    {card.active === card.total
                      ? "All Active"
                      : `${card.active} Active`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <div className='grid grid-cols-1 gap-2 xl:grid-cols-12'>
        {/* =====================================================
            MASTER DATA OVERVIEW
        ===================================================== */}
        <div className='min-h-[420px] rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:col-span-6'>
          {/* =====================================================
                SECTION HEADER
            ====================================================== */}

          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-base font-bold text-emerald-700'>
              Master Data Overview
            </h2>
          </div>

          {/* =====================================================
                TABLE
            ====================================================== */}

          <div className='overflow-x-auto'>
            <table className='w-full  text-sm'>
              {/* ================= TABLE HEADER ================= */}

              <thead>
                <tr className='border-b border-slate-200 bg-slate-50'>
                  <th className='px-3 py-2 text-left font-semibold text-slate-700'>
                    Master Data
                  </th>

                  <th className='px-3 py-2 text-center font-semibold text-slate-700'>
                    Total
                  </th>

                  <th className='px-3 py-2 text-center font-semibold text-slate-700'>
                    Active
                  </th>

                  <th className='px-3 py-2 text-center font-semibold text-slate-700'>
                    Inactive
                  </th>

                  <th className='px-3 py-2 text-center font-semibold text-slate-700'>
                    Last Updated
                  </th>

                  <th className='px-3 py-2 text-center font-semibold text-slate-700'>
                    Action
                  </th>
                </tr>
              </thead>

              {/* ================= TABLE BODY ================= */}

              <tbody>
                {masterDataDashboardData.masterDataOverview.map((item) => {
                  const Icon = masterDataIconMap[item.icon];

                  return (
                    <tr
                      key={item.id}
                      className='border-b border-slate-100 transition hover:bg-slate-50'
                    >
                      {/* Master Data */}

                      <td className='px-3 py-2.5'>
                        <div className='flex items-center gap-2'>
                          <Icon className='h-4 w-4 text-emerald-600' />

                          <span className='font-medium text-slate-700'>
                            {item.name}
                          </span>
                        </div>
                      </td>

                      {/* Total */}

                      <td className='px-3 py-2.5 text-center font-semibold text-slate-700'>
                        {item.total}
                      </td>

                      {/* Active */}

                      <td className='px-3 py-2.5 text-center font-semibold text-emerald-600'>
                        {item.active}
                      </td>

                      {/* Inactive */}

                      <td className='px-3 py-2.5 text-center font-semibold text-red-500'>
                        {item.inactive}
                      </td>

                      {/* Last Updated */}

                      <td className='whitespace-nowrap px-3 py-2.5 text-center text-xs text-slate-500'>
                        {item.lastUpdated}
                      </td>

                      {/* Action */}

                      <td className='px-3 py-2.5 text-center'>
                        <Link
                          to={item.path}
                          className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700'
                        >
                          <ArrowRight className='h-4 w-4' />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* =====================================================
                VIEW ALL BUTTON
            ====================================================== */}

          <div className='mt-4 flex justify-center'>
            <Link
              to='/master-data-season'
              className='rounded-md border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50'
            >
              View All Master Data
            </Link>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}
        <div className='flex flex-col gap-6 xl:col-span-6'>
          {/* =========================================================
                RECENTLY ADDED
            ========================================================= */}
          <div className='min-h-[220px] rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
            {/* Header */}
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-sm font-bold text-emerald-700'>
                Recently Added
              </h2>

              <Link
                to='/master-data'
                className='text-xs font-semibold text-blue-600 hover:underline'
              >
                View All
              </Link>
            </div>

            {/* Table Header */}
            <div className='mb-2 grid grid-cols-4 gap-3 rounded-md bg-slate-50 px-2 py-2 text-[11px] font-semibold text-slate-600'>
              <span>Master Data</span>
              <span>Name</span>
              <span>Added On</span>
              <span>Added By</span>
            </div>

            {/* Recently Added Rows */}
            <div className='space-y-3'>
              {masterDataDashboardData.recentlyAdded.map((item) => {
                const Icon = iconMap[item.icon];

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className='grid grid-cols-4 items-center gap-3 rounded-md border-b border-slate-100 px-2 py-2.5 text-[12px] transition-colors hover:bg-slate-50'
                  >
                    {/* Master Data */}
                    <div className='flex min-w-0 items-center gap-2'>
                      <Icon className='h-5 w-5 shrink-0 text-emerald-600' />

                      <span className='truncate font-semibold text-slate-700'>
                        {item.masterData}
                      </span>
                    </div>

                    {/* Name */}
                    <span className='truncate font-medium text-slate-700'>
                      {item.name}
                    </span>

                    {/* Added On */}
                    <span className='truncate text-slate-500'>
                      {item.addedOn}
                    </span>

                    {/* Added By */}
                    <span className='truncate text-slate-600'>
                      {item.addedBy}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* =========================================================
                MASTER DATA HEALTH
            ========================================================= */}
          <div className='min-h-[280px] rounded-lg border border-slate-200 bg-white p-5 shadow-sm'>
            {/* Header */}
            <div className='mb-4'>
              <h2 className='text-sm font-bold text-emerald-700'>
                Master Data Health
              </h2>
            </div>

            {/* Health Content */}
            <div className='flex flex-col items-center justify-center gap-16 sm:flex-row'>
              {/* ================= HEALTH CHART ================= */}
              <div className='relative flex h-28 w-28 shrink-0 items-center justify-center'>
                <div
                  className='absolute inset-0 rounded-full'
                  style={{
                    background: `conic-gradient(
              #16a34a 0% ${masterDataDashboardData.masterDataHealth.percentages.active}%,
              #ef4444 ${masterDataDashboardData.masterDataHealth.percentages.active}% 100%
            )`,
                  }}
                ></div>

                {/* Inner Circle */}
                <div className='relative flex h-20 w-20 flex-col items-center justify-center rounded-full bg-white'>
                  <span className='text-lg font-bold text-slate-800'>
                    {masterDataDashboardData.masterDataHealth.total}
                  </span>

                  <span className='text-[10px] text-slate-500'>Total</span>
                </div>
              </div>

              {/* ================= STATISTICS ================= */}
              <div className='space-y-3'>
                {/* Active */}
                <div className='flex items-center gap-3'>
                  <span className='h-3 w-3 rounded-full bg-green-600'></span>

                  <div>
                    <p className='text-xs font-semibold text-slate-700'>
                      Active
                    </p>

                    <p className='text-[11px] text-slate-500'>
                      {masterDataDashboardData.masterDataHealth.active} (
                      {
                        masterDataDashboardData.masterDataHealth.percentages
                          .active
                      }
                      %)
                    </p>
                  </div>
                </div>

                {/* Inactive */}
                <div className='flex items-center gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full bg-red-500'></span>

                  <div>
                    <p className='text-xs font-semibold text-slate-700'>
                      Inactive
                    </p>

                    <p className='text-[12px] text-slate-500'>
                      {masterDataDashboardData.masterDataHealth.inactive} (
                      {
                        masterDataDashboardData.masterDataHealth.percentages
                          .inactive
                      }
                      %)
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className='flex items-center gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full bg-blue-500'></span>

                  <div>
                    <p className='text-xs font-semibold text-slate-700'>
                      Total
                    </p>

                    <p className='text-[11px] text-slate-500'>
                      {masterDataDashboardData.masterDataHealth.total} (100%)
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= HEALTH MESSAGE ================= */}
              <div className='w-full rounded-lg bg-green-50 p-4 sm:w-44'>
                <div className='mb-3 flex items-center gap-2'>
                  <ShieldCheck className='h-4 w-4 text-green-600' />

                  <h3 className='text-xs font-bold text-green-700'>
                    {masterDataDashboardData.masterDataHealth.message.title}
                  </h3>
                </div>

                <p className='text-[11px] leading-5 text-slate-600'>
                  {masterDataDashboardData.masterDataHealth.message.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          QUICK ACCESS
      ========================================================= */}
      <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-sm'>
        {/* Header */}
        <div className='mb-4'>
          <h2 className='text-sm font-bold text-emerald-700'>Quick Access</h2>
        </div>

        {/* Quick Access Cards */}
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9'>
          {masterDataDashboardData.quickAccess.map((item) => {
            const iconData = quickAccessIconMap[item.icon];

            const Icon = iconData?.icon;

            return (
              <Link
                key={item.id}
                to={item.path}
                className='flex min-h-20 flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white p-3 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-50'
              >
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconData?.bg}`}
                >
                  <Icon className={`h-6 w-6 ${iconData?.color}`} />
                </div>

                {/* Label */}
                <span className='text-center text-xs font-semibold text-slate-700'>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MasterDataDashboard;
