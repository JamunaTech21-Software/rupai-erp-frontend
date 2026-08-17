import { NavLink } from "react-router-dom";
import { hrWorkforceTabs } from "../../data/HrWorkforceData/hrWorkforceTabsData";

const HrWorkforceTabs = () => {
  return (
    <div className='mb-4 grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5'>
      {hrWorkforceTabs.map((tab, index) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            `flex min-h-16 items-center justify-center rounded-lg border px-2 py-2 text-center text-sm font-semibold leading-5 transition-all duration-200
            ${
              isActive
                ? "border-[#0B5D2A] bg-green-900 text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-700 hover:border-[#0B5D2A] hover:bg-green-50 hover:text-[#0B5D2A]"
            }`
          }
        >
          {index + 1}. {tab.label}
        </NavLink>
      ))}
    </div>
  );
};

export default HrWorkforceTabs;
