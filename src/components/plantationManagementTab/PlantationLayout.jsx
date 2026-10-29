import { Outlet } from "react-router-dom";
import PlantationManagementTabs from "./PlantationManagementTabs";

// The tab bar belongs to the group of pages, not to each page, so it stays on screen while the page under it changes.
export default function PlantationLayout() {
  return (
    <div className='space-y-6'>
      <PlantationManagementTabs />
      <Outlet />
    </div>
  );
}
