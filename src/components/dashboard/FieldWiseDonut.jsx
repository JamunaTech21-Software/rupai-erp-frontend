import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { fieldWisePlucking } from '../../data/dashboardData'

const total = fieldWisePlucking.reduce((sum, d) => sum + d.value, 0)

function formatKg(value) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
}

export default function FieldWiseDonut() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-bold text-primary">
        Field Wise Plucking (Today)
      </h3>

      <div className="flex flex-1 flex-col items-center gap-4 sm:flex-row sm:items-center">
        <div className="relative h-[170px] w-[170px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fieldWisePlucking}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {fieldWisePlucking.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${formatKg(value)} kg`, 'Plucking']}
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-base font-bold leading-tight text-slate-800">
              {formatKg(total)}
            </p>
            <p className="text-[11px] text-slate-500">kg</p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1">
          <div className="mb-2 grid grid-cols-[1fr_auto] gap-2 px-0.5 text-[11px] font-semibold text-slate-500">
            <span>Field</span>
            <span>Plucking (kg)</span>
          </div>
          <ul className="space-y-1.5">
            {fieldWisePlucking.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[1fr_auto] items-center gap-2 text-xs"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold tabular-nums text-slate-800">
                  {formatKg(item.value)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
            <span className="font-bold text-slate-700">Total</span>
            <span className="font-bold text-primary">{formatKg(total)} kg</span>
          </div>
        </div>
      </div>
    </div>
  )
}
