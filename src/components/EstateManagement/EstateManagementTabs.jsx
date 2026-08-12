import { NavLink } from "react-router-dom";
import { estateProfileData } from "../../data/EstateManagementData/estateProfileData";

const EstateManagementTabs = () => {
  return (
    <div className='mb-6 rounded-xl border border-gray-200 bg-white p-2 shadow-sm'>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
        {estateProfileData.tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `flex h-11 items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "border-green-700 bg-green-800 text-white shadow-md"
                  : "border-gray-200 bg-white text-gray-700 hover:border-green-600 hover:bg-green-50 hover:text-green-700"
              }`
            }
          >
            {tab.id}. {tab.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default EstateManagementTabs;
