import { Building2, Maximize2, LayoutGrid, Users } from 'lucide-react'
import { welcomeStats } from '../../data/dashboardData'

const BANNER_IMG = '/tea-estate-banner.png'

const iconMap = {
  Estate: Building2,
  'Total Area': Maximize2,
  'Total Fields': LayoutGrid,
  'Total Workers': Users,
}

export default function WelcomeBanner() {
  return (
    <div className="relative h-full min-h-[180px] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm sm:min-h-[200px]">
      <img
        src={BANNER_IMG}
        alt="Tea estate hills"
        className="absolute inset-0 h-full w-full object-cover object-center sm:object-right"
      />
      {/* Mobile: stronger fade; Desktop: soft left fade */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.88) 55%, rgba(255,255,255,0.75) 100%)',
        }}
      />
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            'linear-gradient(90deg, #ffffff 0%, #ffffff 32%, rgba(255,255,255,0.92) 45%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0.15) 78%, transparent 100%)',
        }}
      />

      <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between p-4 sm:min-h-[200px] sm:p-6">
        <div className="max-w-md">
          <h3 className="text-lg font-bold text-slate-800 sm:text-2xl">
            Welcome back, Md. Saadi! 👋
          </h3>
          <p className="mt-1 text-xs text-slate-500 sm:mt-1.5 sm:text-sm">
            Here&apos;s what&apos;s happening in Jamuna Tea Estate today.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:max-w-xl sm:grid-cols-4 sm:gap-6">
          {welcomeStats.map((stat) => {
            const Icon = iconMap[stat.label] || Building2
            return (
              <div key={stat.label} className="flex items-start gap-2 sm:gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 sm:h-8 sm:w-8">
                  <Icon className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-slate-500 sm:text-[11px]">
                    {stat.label}
                  </p>
                  <p className="truncate text-xs font-bold text-slate-800 sm:text-[15px]">
                    {stat.value}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
