import { Trophy } from "lucide-react";
import { topFields } from "../../data/dashboardData";

const medalColors = {
  1: "text-amber-500",
  2: "text-slate-400",
  3: "text-orange-400",
};

function formatProductivity(value) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function TopFieldsList() {
  return (
    <div className='group cursor-pointer flex h-full flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-primary/20 hover:shadow-lg sm:p-5'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
        <h3 className='text-sm font-bold text-primary'>
          <span className='sm:hidden'>Top Fields (Month)</span>
          <span className='hidden sm:inline'>
            Top Fields by Productivity (Month)
          </span>
        </h3>
        <button
          type='button'
          className='shrink-0 text-xs font-semibold text-primary hover:underline'
        >
          View All
        </button>
      </div>

      <ul className='flex flex-1 flex-col justify-between gap-4'>
        {topFields.map((field) => {
          const pct = Math.round((field.productivity / field.max) * 100);
          const medalColor = medalColors[field.rank];

          return (
            <li key={field.rank} className='flex items-center gap-2 sm:gap-3'>
              <div className='flex w-5 shrink-0 items-center justify-center sm:w-6'>
                {medalColor ? (
                  <Trophy
                    className={`h-4 w-4 ${medalColor}`}
                    fill='currentColor'
                  />
                ) : (
                  <span className='text-xs font-bold text-slate-400'>
                    {field.rank}
                  </span>
                )}
              </div>

              <div className='min-w-0 flex-1'>
                <div className='mb-1.5 flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5'>
                  <span className='truncate text-xs font-semibold text-slate-700'>
                    {field.name}
                  </span>
                  <span className='shrink-0 text-[11px] sm:text-xs'>
                    <span className='font-bold text-slate-800'>
                      {formatProductivity(field.productivity)}
                    </span>
                    <span className='ml-1 font-medium text-slate-400'>
                      kg/acre
                    </span>
                  </span>
                </div>
                <div className='h-2 overflow-hidden rounded-full bg-slate-100'>
                  <div
                    className='h-full rounded-full bg-primary'
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
