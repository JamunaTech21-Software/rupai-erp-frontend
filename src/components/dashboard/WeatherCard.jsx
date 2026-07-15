import { CloudRain, MapPin } from 'lucide-react'
import { weather } from '../../data/dashboardData'

export default function WeatherCard() {
  return (
    <div className="flex h-full min-h-[180px] flex-col rounded-xl bg-primary p-4 text-white shadow-sm sm:min-h-[200px] sm:p-5">
      <div className="flex items-center gap-2">
        <CloudRain className="h-4 w-4 text-white/80" />
        <p className="text-sm font-semibold text-white">Estate Weather</p>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-4 sm:mt-5 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <CloudRain className="h-10 w-10 shrink-0 text-white sm:h-12 sm:w-12" strokeWidth={1.5} />
          <div>
            <p className="text-3xl font-bold leading-none tracking-tight sm:text-4xl">
              {weather.temp}°C
            </p>
            <p className="mt-1.5 text-sm text-white/80">{weather.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:ml-auto sm:grid-cols-1 sm:gap-2 sm:border-l sm:border-white/20 sm:pl-4 sm:text-sm">
          <div className="rounded-lg bg-white/10 px-2 py-2 text-center sm:flex sm:items-center sm:justify-between sm:gap-6 sm:bg-transparent sm:p-0 sm:text-left">
            <span className="block text-[10px] text-white/70 sm:text-sm">Humidity</span>
            <span className="text-sm font-semibold">{weather.humidity}%</span>
          </div>
          <div className="rounded-lg bg-white/10 px-2 py-2 text-center sm:flex sm:items-center sm:justify-between sm:gap-6 sm:bg-transparent sm:p-0 sm:text-left">
            <span className="block text-[10px] text-white/70 sm:text-sm">Wind</span>
            <span className="text-sm font-semibold">{weather.wind} km/h</span>
          </div>
          <div className="rounded-lg bg-white/10 px-2 py-2 text-center sm:flex sm:items-center sm:justify-between sm:gap-6 sm:bg-transparent sm:p-0 sm:text-left">
            <span className="block text-[10px] text-white/70 sm:text-sm">Rainfall</span>
            <span className="text-sm font-semibold">{weather.rainfall} mm</span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-white/20 pt-3 text-[11px] text-white/75 sm:text-xs">
        <span className="truncate">{weather.datetime}</span>
        <span className="flex items-center gap-1 font-medium text-white">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {weather.location}
        </span>
      </div>
    </div>
  )
}
