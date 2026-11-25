import { useEffect, useState } from "react";
import { Bar, CartesianGrid, ComposedChart, LabelList, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, CalendarDays, Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudRainWind, CloudSun, Clock, Droplet, RefreshCw, Search, Sun, Thermometer, Wind, CheckCircle2 } from "lucide-react";
import Select from "../../components/common/Select";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { errorText, useWeatherEstate } from "../../lib/useWeatherEstate";
import weatherForecastData from "../../data/Weather/weatherForecastData";

const card = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";
const filterClass = "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600";
const has = (value) => value !== null && value !== undefined && value !== "";
const num = (value, digits = 1) => (has(value) ? Number(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "-");

// The same condition list as Daily Weather Entry.
const CONDITION_ICONS = {
  SUNNY: { icon: Sun, color: "text-amber-500" },
  PARTLY_CLOUDY: { icon: CloudSun, color: "text-amber-500" },
  CLOUDY: { icon: Cloud, color: "text-slate-400" },
  LIGHT_RAIN: { icon: CloudDrizzle, color: "text-sky-500" },
  MODERATE_RAIN: { icon: CloudRain, color: "text-sky-600" },
  HEAVY_RAIN: { icon: CloudRainWind, color: "text-blue-700" },
  THUNDERSTORM: { icon: CloudLightning, color: "text-violet-600" },
  FOGGY: { icon: CloudFog, color: "text-slate-400" },
};

const ConditionIcon = ({ condition, className = "h-6 w-6" }) => {
  const item = CONDITION_ICONS[condition] ?? CONDITION_ICONS.CLOUDY;
  const Icon = item.icon;
  return <Icon className={`${className} ${item.color}`} />;
};

const wind = (row) => (has(row?.windSpeed) ? `${num(row.windSpeed, 0)} km/h${row.windDirection ? ` (${row.windDirection})` : ""}` : "-");

const WeatherForecast = () => {
  const [estate, setEstate] = useState("");
  const [station, setStation] = useState("");
  const [days, setDays] = useState("7");
  // Get Forecast copies the filters here; the forecast loads from these.
  const [applied, setApplied] = useState(null);

  const estates = useApi(() => api.get("/options/estates"), []);
  const stations = useApi(() => (estate ? api.get("/options/weather-stations", { estate, status: "active" }) : Promise.resolve([])), [estate]);

  // The first estate is shown until another is picked, and its forecast loads at once.
  const firstEstate = useWeatherEstate(estates.data);
  useEffect(() => {
    if (!estate && firstEstate) {
      setEstate(firstEstate);
      setApplied({ estate: firstEstate, station: "", days: "7" });
    }
  }, [estate, firstEstate]);

  const report = useApi(() => (applied ? api.get("/weather/forecast", applied) : Promise.resolve(null)), [applied]);
  const data = report.data;
  const today = data?.today;
  const forecast = data?.forecast ?? [];
  const hourly = data?.hourly ?? [];
  const highlights = data?.highlights ?? [];

  const getForecast = () => setApplied({ estate, station, days });
  // Last Updated asks the server for a fresh forecast instead of the one it kept.
  const refresh = () => applied && setApplied({ ...applied, refresh: 1 });

  const cardItems = [
    { label: "Today's Forecast", value: today?.conditionLabel ?? "-", sub: today?.dateLabel, icon: CalendarDays, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600", text: "text-slate-900" },
    { label: "Max Temperature", value: has(today?.maxTemperature) ? `${num(today.maxTemperature)} °C` : "-", icon: Thermometer, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500", text: "text-red-600" },
    { label: "Min Temperature", value: has(today?.minTemperature) ? `${num(today.minTemperature)} °C` : "-", icon: Thermometer, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600", text: "text-blue-700" },
    { label: "Chance of Rain", value: has(today?.rainChance) ? `${num(today.rainChance, 0)} %` : "-", icon: CloudRain, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600", text: "text-slate-900" },
    { label: "Expected Rainfall", value: has(today?.rainfall) ? `${num(today.rainfall)} mm` : "-", icon: Droplet, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600", text: "text-slate-900" },
    { label: "Wind Speed", value: wind(today), icon: Wind, tint: "from-sky-50 to-white border-sky-100", badge: "bg-sky-100 text-sky-600", text: "text-slate-900" },
  ];

  const loadingFirst = report.loading && !data;

  return (
    <div className='w-full space-y-4'>
      {/* =====================================================
          HEADER BANNER
      ====================================================== */}

      <div className='flex flex-col gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
            <CloudSun className='h-7 w-7' />
          </span>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>{weatherForecastData.title}</h2>
            <p className='text-sm text-slate-600'>{data ? `Weather forecast for ${data.estateName} and surrounding area.` : "Weather forecast for the selected estate and surrounding area."}</p>
          </div>
        </div>
        <button
          type='button'
          onClick={refresh}
          disabled={!applied || report.loading}
          title='Get a fresh forecast'
          className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
        >
          <RefreshCw className={`h-4 w-4 ${report.loading && applied?.refresh ? "animate-spin" : ""}`} />
          Last Updated: {data?.lastUpdatedLabel ?? "-"}
        </button>
      </div>

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_1fr_auto] lg:items-end'>
        <div>
          <label className='mb-1 block text-xs font-semibold text-slate-700'>
            Estate <span className='text-red-500'>*</span>
          </label>
          <Select
            value={estate}
            onChange={(event) => {
              setEstate(event.target.value);
              setStation("");
            }}
            className={`${filterClass} cursor-pointer`}
          >
            {(estates.data ?? []).map((item) => (
              <option key={item.id} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className='mb-1 block text-xs font-semibold text-slate-700'>Weather Station</label>
          <Select value={station} onChange={(event) => setStation(event.target.value)} className={`${filterClass} cursor-pointer`}>
            <option value=''>First active station</option>
            {(stations.data ?? []).map((item) => (
              <option key={item.id} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className='mb-1 block text-xs font-semibold text-slate-700'>
            Forecast Period <span className='text-red-500'>*</span>
          </label>
          <Select value={days} onChange={(event) => setDays(event.target.value)} className={`${filterClass} cursor-pointer`}>
            {weatherForecastData.periods.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
        <button
          type='button'
          onClick={getForecast}
          disabled={!estate}
          className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 lg:col-span-1'
        >
          <Search className='h-4 w-4' />
          Get Forecast
        </button>
      </div>

      {report.error ? (
        <ErrorState message={errorText(report.error)} onRetry={report.reload} />
      ) : !estate && !estates.loading ? (
        <p className='rounded-xl border border-slate-200 bg-white py-10 text-center text-sm text-slate-500'>{weatherForecastData.noEstate}</p>
      ) : (
        <>
          {/* =====================================================
              CARDS
          ====================================================== */}

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
            {cardItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`flex items-center gap-3 rounded-xl border bg-gradient-to-r p-4 shadow-sm ${item.tint}`}>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.badge}`}>
                    <Icon className='h-6 w-6' />
                  </div>
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold leading-tight text-slate-800'>{item.label}</p>
                    {item.sub && !loadingFirst && <p className='text-xs text-slate-600'>{item.sub}</p>}
                    {loadingFirst ? (
                      <span className='mt-1 inline-block h-7 w-20 animate-pulse rounded bg-slate-200' />
                    ) : (
                      <p className={`text-xl font-bold ${item.text}`}>{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* =====================================================
              FORECAST TABLE + HOURLY
          ====================================================== */}

          <div className='grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]'>
            <div className={card}>
              <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
                <BarChart3 className='h-5 w-5 text-emerald-700' />
                {data?.days ?? days}-Day Weather Forecast
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[560px] text-left text-sm'>
                  <thead>
                    <tr className='bg-emerald-50 text-xs text-slate-800'>
                      <th className='px-2 py-2 font-bold'>Date</th>
                      <th className='px-2 py-2 font-bold'>Weather</th>
                      <th className='px-2 py-2 text-center font-bold'>Max (°C)</th>
                      <th className='px-2 py-2 text-center font-bold'>Min (°C)</th>
                      <th className='px-2 py-2 text-center font-bold'>Rain Chance</th>
                      <th className='px-2 py-2 text-center font-bold'>Rainfall (mm)</th>
                      <th className='px-2 py-2 text-center font-bold'>Wind (km/h)</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-100'>
                    {forecast.length === 0 ? (
                      <tr>
                        <td colSpan={7} className='px-2 py-8 text-center text-sm text-slate-500'>
                          {report.loading ? "Loading..." : "No forecast available."}
                        </td>
                      </tr>
                    ) : (
                      forecast.map((row) => (
                        <tr key={row.date}>
                          <td className='whitespace-nowrap px-2 py-2'>{row.dayLabel}</td>
                          <td className='px-2 py-2'>
                            <span className='flex items-center gap-2'>
                              <ConditionIcon condition={row.condition} />
                              {row.conditionLabel}
                            </span>
                          </td>
                          <td className='px-2 py-2 text-center font-bold text-red-600'>{num(row.maxTemperature)}</td>
                          <td className='px-2 py-2 text-center font-bold text-blue-700'>{num(row.minTemperature)}</td>
                          <td className='px-2 py-2 text-center'>{has(row.rainChance) ? `${num(row.rainChance, 0)} %` : "-"}</td>
                          <td className='px-2 py-2 text-center'>{num(row.rainfall)}</td>
                          <td className='whitespace-nowrap px-2 py-2 text-center'>{has(row.windSpeed) ? `${num(row.windSpeed, 0)}${row.windDirection ? ` (${row.windDirection})` : ""}` : "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='space-y-4'>
              <div className={card}>
                <h3 className='mb-3 flex items-center gap-2 text-base font-bold text-emerald-900'>
                  <Clock className='h-5 w-5 text-emerald-700' />
                  Hourly Forecast – Today {today ? `(${today.dateLabel})` : ""}
                </h3>
                {hourly.length === 0 ? (
                  <p className='py-8 text-center text-sm text-slate-500'>{report.loading ? "Loading..." : "No hourly forecast."}</p>
                ) : (
                  <div className='grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-7 xl:grid-cols-4 2xl:grid-cols-7'>
                    {hourly.map((slot) => (
                      <div key={slot.time} className='flex flex-col items-center gap-1 text-center' title={slot.conditionLabel}>
                        <span className='text-xs font-bold text-slate-800'>{slot.label}</span>
                        <ConditionIcon condition={slot.condition} className='h-8 w-8' />
                        <span className='text-xs font-bold text-slate-900'>{num(slot.temperature)} °C</span>
                        <span className='flex items-center gap-0.5 text-xs font-semibold text-blue-600'>
                          <Droplet className='h-3 w-3' />
                          {has(slot.rainChance) ? `${num(slot.rainChance, 0)} %` : "-"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className='rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm'>
                <h3 className='mb-3 flex items-center gap-2 text-base font-bold text-emerald-900'>
                  <BarChart3 className='h-5 w-5 text-emerald-700' />
                  Forecast Highlights
                </h3>
                {highlights.length === 0 ? (
                  <p className='text-sm text-slate-600'>{report.loading ? "Loading..." : "No highlights."}</p>
                ) : (
                  <ul className='space-y-2'>
                    {highlights.map((text) => (
                      <li key={text} className='flex items-start gap-2 text-sm text-slate-800'>
                        <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-emerald-600' />
                        {text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* =====================================================
              TEMPERATURE & RAINFALL CHART
          ====================================================== */}

          <div className={card}>
            <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
              <BarChart3 className='h-5 w-5 text-emerald-700' />
              Temperature & Rainfall Forecast (Next {data?.days ?? days} Days)
            </h3>
            {forecast.length === 0 ? (
              <p className='flex h-64 items-center justify-center text-sm text-slate-500'>{report.loading ? "Loading..." : "No forecast available."}</p>
            ) : (
              <div className='h-72 w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <ComposedChart data={forecast} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                    <XAxis dataKey='label' tick={{ fontSize: 11 }} />
                    <YAxis yAxisId='temp' tick={{ fontSize: 11 }} domain={["auto", "auto"]} label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                    <YAxis yAxisId='rain' orientation='right' tick={{ fontSize: 11 }} label={{ value: "Rainfall (mm)", angle: 90, position: "insideRight", fontSize: 11 }} />
                    <Tooltip formatter={(value, name) => [`${num(value)} ${name === "Rainfall (mm)" ? "mm" : "°C"}`, name]} />
                    <Legend verticalAlign='top' align='right' wrapperStyle={{ fontSize: 12 }} />
                    <Bar yAxisId='rain' dataKey='rainfall' name='Rainfall (mm)' fill='#bfdbfe' radius={[2, 2, 0, 0]}>
                      <LabelList dataKey='rainfall' position='top' formatter={(value) => num(value)} style={{ fontSize: 11, fontWeight: 600 }} />
                    </Bar>
                    <Line yAxisId='temp' type='monotone' dataKey='maxTemperature' name='Max Temp (°C)' stroke='#ef4444' strokeWidth={2} dot={{ r: 3 }} />
                    <Line yAxisId='temp' type='monotone' dataKey='minTemperature' name='Min Temp (°C)' stroke='#2563eb' strokeWidth={2} dot={{ r: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherForecast;
