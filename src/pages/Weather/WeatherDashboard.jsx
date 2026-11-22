import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, CalendarDays, CloudRain, CloudSun, Droplets, FileText, Plus, Sun, Thermometer, Wind } from "lucide-react";
import Select from "../../components/common/Select";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import weatherDashboardData from "../../data/Weather/weatherDashboardData";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const card = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";
const has = (value) => value !== null && value !== undefined && value !== "";
const show = (value) => (has(value) ? value : "-");
const num = (value, digits = 1) => (has(value) ? Number(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "-");
const withUnit = (value, unit, digits = 1) => (has(value) ? `${num(value, digits)} ${unit}` : "-");
const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};
const dayLabel = (row) => `${String(row.day).padStart(2, "0")} ${MONTHS[Number(row.date.slice(5, 7)) - 1]}`;
const today = () => new Date().toISOString().slice(0, 10);

const ChartCard = ({ title, sub, empty, children, className = "" }) => (
  <div className={`${card} ${className}`}>
    <h3 className='mb-2 text-base font-bold text-emerald-900'>
      {title} {sub && <span className='font-semibold text-slate-700'>{sub}</span>}
    </h3>
    {empty ? <p className='flex h-60 items-center justify-center text-sm text-slate-500'>{weatherDashboardData.noData}</p> : <div className='h-60 w-full'>{children}</div>}
  </div>
);

const WeatherDashboard = () => {
  const [estate, setEstate] = useState("");
  const [station, setStation] = useState("");
  const [date, setDate] = useState("");

  const estates = useApi(() => api.get("/options/estates"), []);
  const stations = useApi(() => (estate ? api.get("/options/weather-stations", { estate }) : Promise.resolve([])), [estate]);

  // The first estate is shown until another is picked.
  const firstEstate = estates.data?.[0]?.value ?? "";
  useEffect(() => {
    if (!estate && firstEstate) setEstate(firstEstate);
  }, [estate, firstEstate]);

  const report = useApi(() => (estate ? api.get("/weather/dashboard", { estate, station, date }) : Promise.resolve(null)), [estate, station, date]);
  const data = report.data;
  const cards = data?.cards;

  const rainfallTrend = (data?.dailyRainfallTrend ?? []).map((row) => ({ label: dayLabel(row), rainfall: row.rainfall }));
  const temperatureTrend = (data?.temperatureTrend ?? []).map((row) => ({ label: dayLabel(row), max: row.maxTemperature, min: row.minTemperature }));
  const monthly = data?.monthlyRainfallComparison ?? [];
  const yearly = data?.yearlyRainfallComparison ?? [];
  const weather = data?.todaysWeather;
  const summary = data?.monthlyRainfallSummary ?? [];
  const stationRows = data?.weatherStations ?? [];

  const cardItems = [
    { label: "Today's Rainfall", value: has(cards?.todaysRainfall) ? num(cards.todaysRainfall) : "-", unit: has(cards?.todaysRainfall) ? "mm" : "", icon: CloudRain, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600" },
    { label: "Monthly Rainfall", sub: cards ? `(${cards.monthLabel})` : "", value: num(cards?.monthlyRainfall), unit: has(cards?.monthlyRainfall) ? "mm" : "", icon: CalendarDays, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600" },
    { label: "Annual Rainfall", sub: cards ? `(${cards.year})` : "", value: num(cards?.annualRainfall), unit: has(cards?.annualRainfall) ? "mm" : "", icon: CalendarDays, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600" },
    { label: "Avg. Temperature", sub: "(Today)", value: num(cards?.avgTemperatureToday), unit: has(cards?.avgTemperatureToday) ? "°C" : "", icon: Thermometer, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500" },
    { label: "Rainy Days", sub: "(This Month)", value: has(cards?.rainyDaysThisMonth) ? cards.rainyDaysThisMonth : "-", unit: has(cards?.rainyDaysThisMonth) ? "Days" : "", icon: CloudRain, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600" },
    { label: "Weather Alerts", value: cards?.weatherAlerts?.label ?? "-", icon: AlertTriangle, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500", small: true },
  ];

  const weatherRows = weather
    ? [
        { label: "Rainfall", value: withUnit(weather.rainfall, "mm"), icon: Droplets, color: "text-blue-500" },
        { label: "Max Temperature", value: withUnit(weather.maxTemperature, "°C"), icon: Thermometer, color: "text-red-500" },
        { label: "Min Temperature", value: withUnit(weather.minTemperature, "°C"), icon: Thermometer, color: "text-blue-500" },
        { label: "Humidity", value: withUnit(weather.humidity, "%", 0), icon: Droplets, color: "text-blue-500" },
        { label: "Wind Speed", value: has(weather.windSpeed) ? `${num(weather.windSpeed, 0)} km/h${weather.windDirection ? ` (${weather.windDirection})` : ""}` : "-", icon: Wind, color: "text-sky-500" },
        { label: "Sunshine Hours", value: withUnit(weather.sunshineHours, "h"), icon: Sun, color: "text-amber-500" },
      ]
    : [];

  const quickActions = [
    { label: "Add Daily Rainfall", to: "/weather-daily-entry", icon: Plus, tint: "bg-emerald-50 border-emerald-200 text-emerald-800" },
    { label: "Add Temperature", to: "/weather-daily-entry?section=temperature", icon: Thermometer, tint: "bg-white border-slate-200 text-slate-800" },
    { label: "Add Weather Entry", to: "/weather-daily-entry", icon: CloudSun, tint: "bg-white border-slate-200 text-slate-800" },
    { label: "Monthly Report", to: "/weather-monthly-rainfall-summary", icon: FileText, tint: "bg-white border-slate-200 text-slate-800" },
  ];

  const filterClass = "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600";

  return (
    <div className='w-full space-y-4'>
      {/* =====================================================
          FILTERS
      ====================================================== */}

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
        <div>
          <label className='mb-1 block text-xs font-semibold text-slate-700'>Estate</label>
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
            <option value=''>All Stations</option>
            {(stations.data ?? []).map((item) => (
              <option key={item.id} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className='mb-1 block text-xs font-semibold text-slate-700'>Date</label>
          <input type='date' value={date} max={today()} onChange={(event) => setDate(event.target.value)} className={filterClass} />
        </div>
      </div>

      {report.error ? (
        <ErrorState message={report.error.message} onRetry={report.reload} />
      ) : !estate && !estates.loading ? (
        <p className='rounded-xl border border-slate-200 bg-white py-10 text-center text-sm text-slate-500'>No estate found. Add an estate to see the weather dashboard.</p>
      ) : (
        <>
          {/* =====================================================
              CARDS
          ====================================================== */}

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6'>
            {cardItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`flex items-center gap-3 rounded-xl border bg-gradient-to-r p-4 shadow-sm ${item.tint}`}>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.badge}`}>
                    <Icon className='h-6 w-6' />
                  </div>
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold leading-tight text-slate-800'>
                      {item.label}
                      {item.sub && <span className='block text-xs font-normal text-slate-500'>{item.sub}</span>}
                    </p>
                    {report.loading && !data ? (
                      <span className='mt-1 inline-block h-7 w-16 animate-pulse rounded bg-slate-200' />
                    ) : (
                      <p className={`font-bold text-slate-900 ${item.small ? "text-base" : "text-2xl"}`}>
                        {item.value} {item.unit && <span className='text-base font-semibold'>{item.unit}</span>}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* =====================================================
              TRENDS
          ====================================================== */}

          <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
            <ChartCard title='Daily Rainfall Trend' sub={cards ? `(${cards.monthLabel})` : ""} empty={!rainfallTrend.some((row) => has(row.rainfall))}>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={rainfallTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                  <XAxis dataKey='label' tick={{ fontSize: 11 }} interval={2} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                  <Tooltip formatter={(value) => [`${num(value)} mm`, "Rainfall"]} />
                  <Bar dataKey='rainfall' fill='#2e9e3e' radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title='Temperature Trend' sub={cards ? `(${cards.monthLabel})` : ""} empty={!temperatureTrend.some((row) => has(row.max) || has(row.min))}>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={temperatureTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                  <XAxis dataKey='label' tick={{ fontSize: 11 }} interval={2} />
                  <YAxis tick={{ fontSize: 11 }} domain={["auto", "auto"]} label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                  <Tooltip formatter={(value, name) => [`${num(value)} °C`, name]} />
                  <Legend verticalAlign='top' align='right' wrapperStyle={{ fontSize: 12 }} />
                  <Line type='monotone' dataKey='max' name='Max Temp' stroke='#ef4444' strokeWidth={2} dot={{ r: 2 }} connectNulls />
                  <Line type='monotone' dataKey='min' name='Min Temp' stroke='#2563eb' strokeWidth={2} dot={{ r: 2 }} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* =====================================================
                COMPARISONS
            ====================================================== */}

            <ChartCard title='Monthly Rainfall Comparison' sub='(mm)' empty={!monthly.some((row) => has(row.currentYear) || has(row.previousYear))}>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                  <XAxis dataKey='label' tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => `${num(value)} mm`} />
                  <Legend verticalAlign='top' align='right' wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey='currentYear' name={`${data?.currentYear ?? ""} (Current Year)`} fill='#2e9e3e' radius={[2, 2, 0, 0]} />
                  <Bar dataKey='previousYear' name={`${data?.previousYear ?? ""} (Previous Year)`} fill='#cbd5e1' radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title='Yearly Rainfall Comparison' empty={!yearly.some((row) => has(row.rainfall))}>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={yearly} margin={{ top: 24, right: 24, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                  <XAxis dataKey='year' tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                  <Tooltip formatter={(value) => [`${num(value)} mm`, "Rainfall"]} />
                  <Area type='monotone' dataKey='rainfall' stroke='#2e9e3e' fill='#bbf7d0' strokeWidth={2} dot={{ r: 3, fill: "#2e9e3e" }}>
                    <LabelList dataKey='rainfall' position='top' formatter={(value) => num(value)} style={{ fontSize: 11, fontWeight: 600 }} />
                  </Area>
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* =====================================================
              TODAY'S WEATHER + SUMMARY + STATIONS
          ====================================================== */}

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-[1fr_1.6fr_1.3fr]'>
            <div className={card}>
              <h3 className='text-base font-bold text-emerald-900'>{weather && !weather.isToday ? "Latest Weather" : "Today's Weather"}</h3>
              <p className='mb-3 text-xs text-blue-700'>{data ? [formatDate(weather?.date ?? data.date), data.estateName].filter(Boolean).join(", ") : ""}</p>
              {!weather ? (
                <p className='py-10 text-center text-sm text-slate-500'>{report.loading ? "Loading..." : "No weather entry yet."}</p>
              ) : (
                <>
                  <div className='mb-3 flex items-center justify-center gap-3'>
                    <CloudSun className='h-12 w-12 text-sky-400' />
                    <div className='text-center'>
                      <p className='text-3xl font-bold text-slate-900'>{withUnit(weather.avgTemperature, "°C")}</p>
                      <p className='text-sm text-slate-600'>{show(weather.weatherConditionLabel)}</p>
                    </div>
                  </div>
                  <ul className='divide-y divide-slate-100 rounded-lg border border-slate-200 px-3'>
                    {weatherRows.map((row) => {
                      const Icon = row.icon;
                      return (
                        <li key={row.label} className='flex items-center justify-between gap-2 py-2 text-sm'>
                          <span className='flex items-center gap-2 text-slate-700'>
                            <Icon className={`h-4 w-4 ${row.color}`} />
                            {row.label}
                          </span>
                          <span className='font-semibold text-slate-900'>{row.value}</span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            <div className={card}>
              <div className='mb-2 flex items-center justify-between gap-2'>
                <h3 className='text-base font-bold text-emerald-900'>
                  Monthly Rainfall Summary <span className='font-semibold text-slate-700'>({data?.currentYear ?? ""})</span>
                </h3>
                <Link to='/weather-monthly-rainfall-summary' className='whitespace-nowrap text-xs font-semibold text-emerald-700 hover:underline'>
                  View All →
                </Link>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[420px] text-left text-sm'>
                  <thead>
                    <tr className='bg-slate-50 text-xs text-slate-800'>
                      <th className='px-2 py-2 font-bold'>Month</th>
                      <th className='px-2 py-2 text-center font-bold'>Total Rainfall (mm)</th>
                      <th className='px-2 py-2 text-center font-bold'>Rainy Days</th>
                      <th className='px-2 py-2 text-center font-bold'>Avg. Daily Rainfall (mm)</th>
                      <th className='px-2 py-2 text-center font-bold'>Highest Daily (mm)</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-100'>
                    {summary.length === 0 ? (
                      <EmptyRow columns={5} message={report.loading ? "Loading..." : weatherDashboardData.noData} />
                    ) : (
                      summary.map((row) => (
                        <tr key={row.month} className={row.isCurrent ? "bg-emerald-100 font-bold" : ""}>
                          <td className='px-2 py-1.5'>{row.label}</td>
                          <td className='px-2 py-1.5 text-center'>{num(row.totalRainfall)}</td>
                          <td className='px-2 py-1.5 text-center'>{show(row.rainyDays)}</td>
                          <td className='px-2 py-1.5 text-center'>{num(row.avgDailyRainfall, 2)}</td>
                          <td className='px-2 py-1.5 text-center'>{num(row.highestDailyRainfall)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='space-y-4 lg:col-span-2 xl:col-span-1'>
              <div className={card}>
                <div className='mb-2 flex items-center justify-between gap-2'>
                  <h3 className='text-base font-bold text-emerald-900'>Weather Stations</h3>
                  <Link to='/weather-station-setup' className='whitespace-nowrap text-xs font-semibold text-emerald-700 hover:underline'>
                    View All →
                  </Link>
                </div>
                <div className='overflow-x-auto'>
                  <table className='w-full min-w-[340px] text-left text-sm'>
                    <thead>
                      <tr className='text-xs text-slate-800'>
                        <th className='px-2 py-1.5 font-bold'>SL</th>
                        <th className='px-2 py-1.5 font-bold'>Station Name</th>
                        <th className='px-2 py-1.5 font-bold'>Location</th>
                        <th className='px-2 py-1.5 font-bold'>Type</th>
                        <th className='px-2 py-1.5 font-bold'>Status</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-100'>
                      {stationRows.length === 0 ? (
                        <EmptyRow columns={5} message={report.loading ? "Loading..." : "No weather stations."} />
                      ) : (
                        stationRows.map((row) => (
                          <tr key={row.id ?? row.sl}>
                            <td className='px-2 py-1.5'>{row.sl}</td>
                            <td className='px-2 py-1.5 font-medium text-slate-800'>{row.stationName}</td>
                            <td className='px-2 py-1.5 text-slate-700'>{show(row.location)}</td>
                            <td className='px-2 py-1.5 text-slate-700'>{row.entryTypeLabel}</td>
                            <td className='px-2 py-1.5'>
                              <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${row.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{row.statusLabel}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={card}>
                <h3 className='mb-2 text-base font-bold text-emerald-900'>Quick Actions</h3>
                <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.label} to={action.to} className={`flex flex-col items-center gap-1 rounded-lg border p-2.5 text-center text-xs font-semibold hover:shadow-sm ${action.tint}`}>
                        <Icon className='h-6 w-6' />
                        {action.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
