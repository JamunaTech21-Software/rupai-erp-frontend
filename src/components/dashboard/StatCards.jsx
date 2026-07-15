import {
  Sprout,
  Briefcase,
  ChartNoAxesCombined,
  Users,
  Wallet,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { statCards } from '../../data/dashboardData'

const iconMap = {
  Sprout,
  Briefcase,
  ChartNoAxesCombined,
  Users,
  Wallet,
  BarChart3,
}

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {statCards.map((card) => {
        const Icon = iconMap[card.icon] || Sprout
        const TrendIcon = card.positive ? ArrowUpRight : ArrowDownRight

        return (
          <div
            key={card.id}
            className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${card.iconColor}`} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-500">{card.title}</p>
                <p className="mt-1 truncate text-base font-bold leading-tight text-slate-900">
                  {card.value}
                  {card.unit ? (
                    <span className="ml-1 text-xs font-medium text-slate-400">
                      {card.unit}
                    </span>
                  ) : null}
                </p>
                <div
                  className={`mt-1.5 flex items-center gap-0.5 text-[11px] font-medium ${
                    card.positive ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  <TrendIcon className="h-3.5 w-3.5" />
                  <span>{card.change}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
