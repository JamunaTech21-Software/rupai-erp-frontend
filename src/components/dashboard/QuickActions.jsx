import {
  Sprout,
  UserCog,
  ClipboardList,
  Receipt,
  ScanFace,
  FileUp,
  ChevronRight,
} from "lucide-react";
import { quickActions } from "../../data/dashboardData";

const iconMap = {
  Sprout,
  UserCog,
  ClipboardList,
  Receipt,
  ScanFace,
  FileUp,
};

export default function QuickActions() {
  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-6'>
      {quickActions.map((action) => {
        const Icon = iconMap[action.icon] || Sprout;
        return (
          <button
            key={action.id}
            type='button'
            className='group flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3.5 text-left shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-primary/20 hover:shadow-lg'
          >
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50'>
              <Icon className='h-5 w-5 text-primary' />
            </div>
            <div className='min-w-0 flex-1'>
              <p className='text-[11px] font-bold text-slate-700'>
                {action.title}
              </p>
              <p className='truncate text-xs text-slate-500'>{action.label}</p>
            </div>
            <ChevronRight className='h-4 w-4 shrink-0 text-slate-300' />
          </button>
        );
      })}
    </div>
  );
}
