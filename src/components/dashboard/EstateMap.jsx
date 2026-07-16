import { Map } from "lucide-react";
import { mapLegend, mapPins } from "../../data/dashboardData";

const MAP_IMG = "/tea-estate-banner.png";

export default function EstateMap() {
  return (
    <div className='group cursor-pointer flex h-full flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg sm:p-5'>
      <div className='mb-3 flex flex-wrap items-center justify-between gap-2'>
        <h3 className='text-sm font-bold text-primary'>Estate Map</h3>
        <button
          type='button'
          className='inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50'
        >
          <Map className='h-3.5 w-3.5' />
          <span>View Full Map</span>
        </button>
      </div>

      <div className='flex min-h-0 flex-1 flex-col gap-3 lg:flex-row'>
        <div className='relative min-h-[160px] flex-1 overflow-hidden rounded-lg sm:min-h-[180px]'>
          <img
            src={MAP_IMG}
            alt='Estate satellite view'
            className='absolute inset-0 h-full w-full object-cover'
          />
          <div className='absolute inset-0 bg-primary/10' />

          {/* Estate boundary outline */}
          <svg
            className='absolute inset-0 h-full w-full'
            viewBox='0 0 400 240'
            preserveAspectRatio='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M40,50 L180,30 L320,55 L350,140 L280,200 L80,190 L30,120 Z'
              fill='none'
              stroke='white'
              strokeWidth='2.5'
              strokeOpacity='0.9'
            />
            <path
              d='M90,70 L160,60 L200,95 L150,130 L85,115 Z'
              fill='none'
              stroke='white'
              strokeWidth='1.5'
              strokeOpacity='0.7'
            />
            <path
              d='M210,80 L300,75 L320,130 L250,150 L200,120 Z'
              fill='none'
              stroke='white'
              strokeWidth='1.5'
              strokeOpacity='0.7'
            />
          </svg>

          {mapPins.map((pin) => (
            <div
              key={pin.id}
              className='absolute -translate-x-1/2 -translate-y-full drop-shadow'
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              title={pin.type}
            >
              <svg width='16' height='22' viewBox='0 0 18 24' fill='none'>
                <path
                  d='M9 0C4.03 0 0 4.03 0 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.97-4.03-9-9-9z'
                  fill={pin.color}
                />
                <circle cx='9' cy='9' r='3.2' fill='white' />
              </svg>
            </div>
          ))}
        </div>

        <ul className='flex shrink-0 flex-row flex-wrap gap-x-3 gap-y-2 lg:w-[140px] lg:flex-col lg:flex-nowrap lg:gap-y-2.5'>
          {mapLegend.map((item) => (
            <li
              key={item.label}
              className='flex items-center gap-2 text-[11px] text-slate-600'
            >
              <svg
                width='12'
                height='16'
                viewBox='0 0 18 24'
                fill='none'
                className='shrink-0'
              >
                <path
                  d='M9 0C4.03 0 0 4.03 0 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.97-4.03-9-9-9z'
                  fill={item.color}
                />
                <circle cx='9' cy='9' r='3.2' fill='white' />
              </svg>
              <span>
                {item.label} ({item.count})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
