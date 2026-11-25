import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Area, Bar, BarChart, CartesianGrid, Cell, ComposedChart, LabelList, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart } from "recharts";
import { ArrowDown, ArrowUp, BarChart3, CalendarDays, CheckCircle2, ChevronDown, CloudRain, Download, Droplet, FileSpreadsheet, FileText, Lightbulb, Search, Thermometer } from "lucide-react";
import Select from "../../components/common/Select";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { errorText, useWeatherEstate } from "../../lib/useWeatherEstate";
import weatherReportsData from "../../data/Weather/weatherReportsData";

const card = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";
const filterClass = "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600";
const has = (value) => value !== null && value !== undefined && value !== "";
const num = (value, digits = 1) => (has(value) ? Number(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "-");

const monthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
const defaultTo = () => monthKey(new Date());
const defaultFrom = () => `${new Date().getFullYear()}-01`;

const saveBlob = (blob, name) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

const ChartCard = ({ title, sub, children, className = "" }) => (
  <div className={`${card} ${className}`}>
    <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
      <BarChart3 className='h-5 w-5 text-emerald-700' />
      <span>
        {title} {sub && <span className='font-semibold text-slate-700'>{sub}</span>}
      </span>
    </h3>
    {children}
  </div>
);

const WeatherReports = () => {
  const [estate, setEstate] = useState("");
  const [station, setStation] = useState("");
  const [from, setFrom] = useState(defaultFrom());
  const [to, setTo] = useState(defaultTo());
  const [type, setType] = useState("ALL");
  // View Report copies the filters here; the report loads from these.
  const [applied, setApplied] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState("");

  const estates = useApi(() => api.get("/options/estates"), []);
  const stations = useApi(() => (estate ? api.get("/options/weather-stations", { estate }) : Promise.resolve([])), [estate]);

  // The first estate is shown until another is picked, and its report loads at once.
  const firstEstate = useWeatherEstate(estates.data);
  useEffect(() => {
    if (!estate && firstEstate) {
      setEstate(firstEstate);
      setApplied({ estate: firstEstate, station: "", from: defaultFrom(), to: defaultTo(), type: "ALL" });
    }
  }, [estate, firstEstate]);

  const report = useApi(() => (applied ? api.get("/weather/reports", applied) : Promise.resolve(null)), [applied]);
  const data = report.data;
  const cards = data?.cards;

  const rainfallTrend = data?.monthlyRainfallTrend;
  const climateTrend = data?.temperatureHumidityTrend;
  const annual = data?.annualRainfallComparison;
  const averages = data?.monthlyAverageRainfall;
  const insights = data?.keyInsights ?? [];

  const viewReport = () => setApplied({ estate, station, from, to, type });

  // A quick report's path already has "?report=..."; the filters are added to it.
  const download = async (path, label, key) => {
    setMenuOpen(false);
    setBusy(key);
    try {
      const [base, query = ""] = path.split("?");
      const params = Object.fromEntries(new URLSearchParams(query));
      const blob = await api.download(base, { ...params, estate: applied.estate, station: applied.station, from: applied.from, to: applied.to, format: "xlsx" });
      saveBlob(blob, `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${applied.from}-to-${applied.to}.xlsx`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy("");
    }
  };

  const summaryPath = "/weather/reports/export?report=weather-summary";
  const lowest = cards?.lowestTemperature;
  const highest = cards?.highestTemperature;
  const temp = (point) => (point ? { value: `${num(point.value)} °C`, sub: point.dateLabel } : { value: "-", sub: "" });

  const cardItems = [
    { label: "Total Rainfall", value: has(cards?.totalRainfall) ? `${num(cards.totalRainfall)} mm` : "-", icon: CloudRain, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600", text: "text-slate-900" },
    { label: "Rainy Days", value: has(cards?.rainyDays) ? `${cards.rainyDays} Days` : "-", icon: CalendarDays, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600", text: "text-slate-900" },
    { label: "Avg. Temperature", value: has(cards?.avgTemperature) ? `${num(cards.avgTemperature)} °C` : "-", icon: Thermometer, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500", text: "text-red-600" },
    { label: "Avg. Humidity", value: has(cards?.avgHumidity) ? `${num(cards.avgHumidity, 0)} %` : "-", icon: Droplet, tint: "from-purple-50 to-white border-purple-100", badge: "bg-purple-100 text-purple-600", text: "text-purple-700" },
    { label: "Highest Temp.", value: temp(highest).value, sub: temp(highest).sub, icon: ArrowUp, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500", text: "text-red-600" },
    { label: "Lowest Temp.", value: temp(lowest).value, sub: temp(lowest).sub, icon: ArrowDown, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600", text: "text-blue-700" },
  ];

  const loadingFirst = report.loading && !data;
  // A section the chosen type leaves out comes back null.
  const emptyChart = (rows, height, hasValue) => (!rows || !rows.some(hasValue) ? <p className={`flex ${height} items-center justify-center text-sm text-slate-500`}>{report.loading ? "Loading..." : data && rows === null ? "Not part of this report type." : weatherReportsData.noData}</p> : null);

  const periodSub = data ? `– ${data.periodLabel}` : "";

  return (
    <div className='w-full space-y-4'>
      {/* =====================================================
          HEADER BANNER
      ====================================================== */}

      <div className='flex flex-col gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
            <BarChart3 className='h-7 w-7' />
          </span>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>{weatherReportsData.title}</h2>
            <p className='text-sm text-slate-600'>{weatherReportsData.subtitle}</p>
          </div>
        </div>
        <div className='flex gap-3 print:hidden'>
          <button
            type='button'
            onClick={() => download(summaryPath, "Weather Summary Report", "generate")}
            disabled={!applied || Boolean(busy)}
            className='flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none'
          >
            <FileText className='h-4 w-4' />
            {busy === "generate" ? "Generating..." : "Generate Report"}
          </button>
          <div className='relative flex-1 sm:flex-none'>
            <button
              type='button'
              onClick={() => setMenuOpen((open) => !open)}
              disabled={!applied || Boolean(busy)}
              className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <Download className='h-4 w-4' />
              {busy === "export" ? "Exporting..." : "Export"}
              <ChevronDown className='h-4 w-4' />
            </button>
            {menuOpen && (
              <>
                <button type='button' aria-label='Close menu' className='fixed inset-0 z-10 cursor-default' onClick={() => setMenuOpen(false)} />
                <div className='absolute right-0 z-20 mt-1 w-44 rounded-md border border-slate-200 bg-white py-1 shadow-lg'>
                  <button type='button' onClick={() => download(summaryPath, "Weather Summary Report", "export")} className='flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm text-slate-800 hover:bg-emerald-50'>
                    <FileSpreadsheet className='h-4 w-4 text-emerald-700' />
                    Excel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_1fr_auto] lg:items-end'>
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
          <label className='mb-1 block text-xs font-semibold text-slate-700'>Report Period</label>
          <div className='flex items-center gap-2'>
            <input type='month' aria-label='From month' value={from} max={to || undefined} onChange={(event) => setFrom(event.target.value)} className={filterClass} />
            <span className='text-sm text-slate-500'>–</span>
            <input type='month' aria-label='To month' value={to} min={from || undefined} onChange={(event) => setTo(event.target.value)} className={filterClass} />
          </div>
        </div>
        <div>
          <label className='mb-1 block text-xs font-semibold text-slate-700'>Report Type</label>
          <Select value={type} onChange={(event) => setType(event.target.value)} className={`${filterClass} cursor-pointer`}>
            {weatherReportsData.reportTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
        <button
          type='button'
          onClick={viewReport}
          disabled={!estate || !from || !to}
          className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 lg:col-span-1'
        >
          <Search className='h-4 w-4' />
          View Report
        </button>
      </div>

      {report.error ? (
        <ErrorState message={errorText(report.error)} onRetry={report.reload} />
      ) : !estate && !estates.loading ? (
        <p className='rounded-xl border border-slate-200 bg-white py-10 text-center text-sm text-slate-500'>{weatherReportsData.noEstate}</p>
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
                    {loadingFirst ? (
                      <span className='mt-1 inline-block h-7 w-20 animate-pulse rounded bg-slate-200' />
                    ) : (
                      <>
                        <p className={`text-xl font-bold ${item.text}`}>{item.value}</p>
                        {item.sub && <p className='text-xs text-slate-600'>({item.sub})</p>}
                      </>
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
            <ChartCard title='Monthly Rainfall Trend' sub={periodSub}>
              {emptyChart(rainfallTrend, "h-64", (row) => has(row.rainfall)) ?? (
                <div className='h-64 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={rainfallTrend} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                      <XAxis dataKey='label' tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                      <Tooltip formatter={(value) => [`${num(value)} mm`, "Rainfall"]} />
                      <Bar dataKey='rainfall' fill='#2e9e3e' radius={[2, 2, 0, 0]}>
                        {rainfallTrend.length <= 12 && <LabelList dataKey='rainfall' position='top' formatter={(value) => num(value)} style={{ fontSize: 10, fontWeight: 600 }} />}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </ChartCard>

            <ChartCard title='Temperature & Humidity Trend' sub={periodSub}>
              {emptyChart(climateTrend, "h-64", (row) => has(row.maxTemperature) || has(row.minTemperature) || has(row.humidity)) ?? (
                <div className='h-64 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <ComposedChart data={climateTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                      <XAxis dataKey='label' tick={{ fontSize: 11 }} />
                      <YAxis yAxisId='temp' tick={{ fontSize: 11 }} domain={["auto", "auto"]} label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                      <YAxis yAxisId='humidity' orientation='right' tick={{ fontSize: 11 }} domain={[0, 100]} label={{ value: "Humidity (%)", angle: 90, position: "insideRight", fontSize: 11 }} />
                      <Tooltip formatter={(value, name) => [`${num(value)} ${name === "Humidity (%)" ? "%" : "°C"}`, name]} />
                      <Legend verticalAlign='top' align='right' wrapperStyle={{ fontSize: 12 }} />
                      <Area yAxisId='humidity' type='monotone' dataKey='humidity' name='Humidity (%)' stroke='#86efac' fill='#dcfce7' connectNulls />
                      <Line yAxisId='temp' type='monotone' dataKey='maxTemperature' name='Max Temp (°C)' stroke='#ef4444' strokeWidth={2} dot={{ r: 2 }} connectNulls />
                      <Line yAxisId='temp' type='monotone' dataKey='minTemperature' name='Min Temp (°C)' stroke='#2563eb' strokeWidth={2} dot={{ r: 2 }} connectNulls />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              )}
            </ChartCard>
          </div>

          {/* =====================================================
              ANNUAL + AVERAGE + QUICK REPORTS
          ====================================================== */}

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-[1fr_1.1fr_0.9fr]'>
            <ChartCard title='Annual Rainfall Comparison'>
              {emptyChart(annual, "h-56", (row) => has(row.rainfall) && Number(row.rainfall) > 0) ?? (
                <div className='h-56 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={annual} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                      <XAxis dataKey='year' tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                      <Tooltip formatter={(value) => [`${num(value)} mm`, "Rainfall"]} />
                      <Bar dataKey='rainfall' radius={[2, 2, 0, 0]}>
                        {annual.map((row) => (
                          <Cell key={row.year} fill={row.upToDate ? "#15803d" : "#bbf7d0"} />
                        ))}
                        <LabelList dataKey='rainfall' position='top' formatter={(value) => num(value)} style={{ fontSize: 10, fontWeight: 600 }} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </ChartCard>

            <ChartCard title='Monthly Average Rainfall' sub='(mm/day)'>
              {emptyChart(averages, "h-56", (row) => has(row.average)) ?? (
                <div className='h-56 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={averages} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                      <XAxis dataKey='label' tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} label={{ value: "Avg. Rainfall (mm/day)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                      <Tooltip formatter={(value) => [`${num(value, 2)} mm/day`, "Average"]} />
                      <Area type='monotone' dataKey='average' stroke='#7c3aed' fill='#ede9fe' strokeWidth={2} dot={{ r: 3, fill: "#7c3aed" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </ChartCard>

            <div className={`${card} lg:col-span-2 xl:col-span-1`}>
              <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
                <FileText className='h-5 w-5 text-emerald-700' />
                Quick Reports
              </h3>
              {(data?.quickReports ?? []).length === 0 ? (
                <p className='py-8 text-center text-sm text-slate-500'>{report.loading ? "Loading..." : "No reports."}</p>
              ) : (
                <ul className='space-y-1.5'>
                  {data.quickReports.map((item) => (
                    <li key={item.key}>
                      <button
                        type='button'
                        onClick={() => download(item.path, item.label, item.key)}
                        disabled={Boolean(busy)}
                        className='flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60'
                      >
                        <span className='flex items-center gap-2'>
                          <FileText className='h-4 w-4 text-emerald-700' />
                          {busy === item.key ? "Downloading..." : item.label}
                        </span>
                        <Download className='h-4 w-4 shrink-0 text-slate-600' />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* =====================================================
              KEY INSIGHTS
          ====================================================== */}

          <div className='rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm'>
            <h3 className='mb-3 flex items-center gap-2 text-base font-bold text-emerald-900'>
              <Lightbulb className='h-5 w-5 text-emerald-700' />
              Key Insights
            </h3>
            {insights.length === 0 ? (
              <p className='text-sm text-slate-600'>{report.loading ? "Loading..." : weatherReportsData.noData}</p>
            ) : (
              <ul className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                {insights.map((text) => (
                  <li key={text} className='flex items-start gap-2 text-sm text-slate-800'>
                    <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 text-emerald-600' />
                    {text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherReports;
