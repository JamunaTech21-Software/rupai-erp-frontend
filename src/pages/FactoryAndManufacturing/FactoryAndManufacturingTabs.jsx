import React from "react";
import { Link, useLocation } from "react-router-dom";
import { productionEntryTabs } from "../../data/FactoryAndManufacturing/factoryAndManufacturingTabs";

const FactoryAndManufacturingTabs = () => {
  const location = useLocation();

  return (
    <div className='w-full rounded-lg border border-slate-200 bg-white p-3 shadow-sm'>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'>
        {productionEntryTabs.map((tab) => {
          const isActive = location.pathname === tab.path;

          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex h-12 items-center justify-center rounded-lg border px-4 text-center text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "border-emerald-700 bg-emerald-700 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FactoryAndManufacturingTabs;
