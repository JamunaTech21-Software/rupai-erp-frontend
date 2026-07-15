import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { RefreshCw } from 'lucide-react'
import { attendance } from '../../data/dashboardData'

const total = attendance.reduce((sum, d) => sum + d.value, 0)

export default function WorkerAttendance() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-sm font-bold text-primary sm:mb-4">
        Worker Attendance (Today)
      </h3>

      <div className="flex flex-1 flex-col items-center gap-4 sm:flex-row sm:items-center">
        <div className="relative h-[150px] w-[150px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={attendance}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={68}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {attendance.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value.toLocaleString()} workers`, name]}
                contentStyle={{
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xl font-bold leading-none text-slate-800">
              {total.toLocaleString()}
            </p>
            <p className="mt-1 text-[10px] text-slate-500">Total Workers</p>
          </div>
        </div>

        <ul className="w-full space-y-3">
          {attendance.map((item) => (
            <li key={item.name} className="flex items-start gap-2.5">
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="text-xs text-slate-500">{item.name}</p>
                <p className={`text-sm font-bold ${item.textColor}`}>
                  {item.value.toLocaleString()} ({item.percent.toFixed(1)}%)
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
        <RefreshCw className="h-3 w-3" />
        <span>Last updated: 09:30 AM</span>
      </div>
    </div>
  )
}
