import { NavLink } from "react-router-dom";
import { hrWorkforceTabs } from "../../data/HrWorkforceData/hrWorkforceTabsData";

const HrWorkforceTabs = () => {
  return (
    <div className='mb-4 grid grid-cols-2 gap-1 md:grid-cols-3 xl:grid-cols-5'>
      {hrWorkforceTabs.map((tab, index) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            `flex min-h-12 items-center justify-center rounded-lg border  py-1 text-center text-sm font-semibold leading-4 transition-all duration-200
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
