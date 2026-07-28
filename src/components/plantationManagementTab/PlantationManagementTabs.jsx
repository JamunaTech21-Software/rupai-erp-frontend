import { NavLink } from "react-router-dom";
import { plantationManagementTabs } from "../../data/plantationManagementData";

const PlantationManagementTabs = () => {
  return (
    <div className='rounded-xl border border-gray-200 bg-white p-3 shadow-sm'>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {plantationManagementTabs.map((tab, index) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `flex items-center justify-center rounded-lg border px-4 py-3 text-center text-sm font-semibold transition-all duration-200
              ${
                isActive
                  ? "border-[#0B5D2A] bg-green-900 text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#0B5D2A] hover:bg-green-50 hover:text-[#0B5D2A]"
              }`
            }
          >
            <span className='mr-1 font-bold'>{index + 1}.</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PlantationManagementTabs;
