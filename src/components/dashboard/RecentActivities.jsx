import {
  Leaf,
  UserPlus,
  Sprout,
  ClipboardList,
  Users,
  Activity,
} from "lucide-react";
import { recentActivities } from "../../data/dashboardData";

const iconMap = {
  Leaf,
  UserPlus,
  Sprout,
  ClipboardList,
  Users,
};

export default function RecentActivities() {
  return (
    <div className='group cursor-pointer flex h-full flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg sm:p-5'>
      <h3 className='mb-4 text-sm font-bold text-primary'>Recent Activities</h3>

      <ul className='flex-1 space-y-3.5 overflow-y-auto'>
        {recentActivities.map((item) => {
          const Icon = iconMap[item.icon] || Activity;
          return (
            <li key={item.id} className='flex items-start gap-3'>
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
              >
                <Icon className={`h-4 w-4 ${item.iconColor}`} />
              </div>
              <div className='min-w-0 flex-1'>
                <div className='flex items-start justify-between gap-3'>
                  <p className='text-xs font-semibold leading-snug text-slate-800'>
                    {item.title}
                  </p>
                  <span className='shrink-0 text-[11px] text-slate-400'>
                    {item.time}
                  </span>
                </div>
                <p className='mt-0.5 text-[11px] text-slate-500'>
                  {item.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
