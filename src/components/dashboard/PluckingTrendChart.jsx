import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import { ChevronDown } from 'lucide-react'
import { pluckingTrend } from '../../data/dashboardData'

function formatKg(value) {
  return value.toLocaleString('en-US')
}

function PointLabel(props) {
  const { x, y, value, index } = props
  const isLast = index === pluckingTrend.length - 1

  if (isLast) {
    return (
      <g>
        <rect x={x - 28} y={y - 28} width={56} height={20} rx={10} fill="#1b5e4b" />
        <text
          x={x}
          y={y - 14}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={10}
          fontWeight={700}
        >
          {formatKg(value)}
        </text>
      </g>
    )
  }

  return (
    <text
      x={x}
      y={y - 12}
      textAnchor="middle"
      fill="#64748b"
      fontSize={10}
      fontWeight={500}
    >
      {formatKg(value)}
    </text>
  )
}

export default function PluckingTrendChart() {
  const [showLabels, setShowLabels] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    const update = () => setShowLabels(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-primary">Plucking Trend (Last 7 Days)</h3>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600"
        >
          Last 7 Days
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>

      <div className="relative min-h-[200px] flex-1 sm:min-h-[240px]">
        <span className="absolute left-6 top-0 z-10 text-[10px] font-medium text-slate-400 sm:left-8">
          Kg
        </span>
        <ResponsiveContainer width="100%" height="100%" minHeight={200}>
          <AreaChart
            data={pluckingTrend}
            margin={{ top: 28, right: showLabels ? 16 : 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="pluckingFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1b5e4b" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#1b5e4b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 25000]}
              ticks={[0, 5000, 10000, 15000, 20000, 25000]}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v === 0 ? '0' : `${v / 1000}K`)}
              width={32}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                fontSize: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              formatter={(value) => [`${formatKg(value)} kg`, 'Plucking']}
            />
            <Area
              type="monotone"
              dataKey="kg"
              stroke="#1b5e4b"
              strokeWidth={2.5}
              fill="url(#pluckingFill)"
              dot={(props) => {
                const { cx, cy, index } = props
                const isLast = index === pluckingTrend.length - 1
                return (
                  <circle
                    key={`dot-${index}`}
                    cx={cx}
                    cy={cy}
                    r={isLast ? 5 : 3.5}
                    fill={isLast ? '#1b5e4b' : '#fff'}
                    stroke="#1b5e4b"
                    strokeWidth={2}
                  />
                )
              }}
              activeDot={{ r: 6, fill: '#1b5e4b', stroke: '#fff', strokeWidth: 2 }}
            >
              {showLabels && <LabelList dataKey="kg" content={<PointLabel />} />}
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
