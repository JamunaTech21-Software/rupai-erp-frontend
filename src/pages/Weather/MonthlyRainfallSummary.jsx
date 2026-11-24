import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CloudRain,
  CloudRainWind,
  Download,
  FileSpreadsheet,
  MessageSquare,
  Printer,
  Search,
  Sigma,
  TrendingUp,
} from "lucide-react";
import Select from "../../components/common/Select";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import monthlyRainfallSummaryData from "../../data/Weather/monthlyRainfallSummaryData";

const card = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";
const filterClass = "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600";
const has = (value) => value !== null && value !== undefined && value !== "";
const num = (value, digits = 1) => (has(value) ? Number(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "-");
const mm = (value, digits = 1) => (has(value) ? `${num(value, digits)} mm` : "-");

// "2026-10" moved by a number of months.
const shiftMonth = (key, by) => {
  const date = new Date(Number(key.slice(0, 4)), Number(key.slice(5, 7)) - 1 + by, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};
const thisMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

// A highest / lowest day: "45.0 mm (22 Oct)".
const dayValue = (point) => (point ? { main: mm(point.value), sub: point.dateLabel } : { main: "-", sub: "" });

const TrendTick = ({ x, y, payload, rows }) => {
  const row = rows[payload.index];
  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={12} textAnchor='middle' fontSize={11} fill='#475569'>
        {payload.value}
      </text>
      {row && (payload.index === 0 || row.label === "Jan") && (
        <text dy={25} textAnchor='middle' fontSize={11} fill='#475569'>
          {row.year}
        </text>
      )}
    </g>
  );
};

const MonthlyRainfallSummary = () => {
  const [estate, setEstate] = useState("");
  const [station, setStation] = useState("");
  const [month, setMonth] = useState(thisMonth());
  const [compare, setCompare] = useState(shiftMonth(thisMonth(), -12));
  // View Summary copies the filters here; the report loads from these.
  const [applied, setApplied] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const estates = useApi(() => api.get("/options/estates"), []);
  const stations = useApi(() => (estate ? api.get("/options/weather-stations", { estate }) : Promise.resolve([])), [estate]);

  // The first estate is shown until another is picked, and its summary loads at once.
  const firstEstate = estates.data?.[0]?.value ?? "";
  useEffect(() => {
    if (!estate && firstEstate) {
      setEstate(firstEstate);
      setApplied({ estate: firstEstate, station: "", month: thisMonth(), compare: shiftMonth(thisMonth(), -12) });
    }
  }, [estate, firstEstate]);

  const report = useApi(() => (applied ? api.get("/weather/monthly-rainfall-summary", applied) : Promise.resolve(null)), [applied]);
  const data = report.data;
  const cards = data?.cards;
  const summary = data?.monthlySummary;
  const comparison = data?.comparison;
  const trend = data?.trend ?? [];

  const daily = (data?.dailyRainfall ?? []).map((row) => ({ day: String(row.day).padStart(2, "0"), rainfall: row.rainfall }));
  const comparisonRows = comparison ? [{ name: comparison.label, current: comparison.current.rainfall, compare: comparison.compare.rainfall }] : [];
  const trendRows = trend.map((row) => ({ ...row, name: row.label }));

  const viewSummary = () => setApplied({ estate, station, month, compare });

  const exportExcel = async () => {
    setMenuOpen(false);
    setExporting(true);
    try {
      const blob = await api.download("/weather/monthly-rainfall-summary/export", { ...applied, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `monthly-rainfall-summary-${data?.month ?? applied.month}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setExporting(false);
    }
  };

  const high = dayValue(cards?.highestDailyRainfall);
  const low = dayValue(cards?.lowestDailyRainfall);
  const change = summary?.changeVsLastYear;
  const up = change && change.mm > 0;
  const down = change && change.mm < 0;

  const cardItems = [
    { label: "Monthly Rainfall", value: mm(cards?.monthlyRainfall), icon: CloudRain, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600", text: "text-slate-900" },
    { label: "Rainy Days", value: has(cards?.rainyDays) ? `${cards.rainyDays} Days` : "-", icon: CalendarDays, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600", text: "text-slate-900" },
    { label: "Highest Daily Rainfall", value: high.main, sub: high.sub, icon: ArrowUp, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500", text: "text-red-600" },
    { label: "Lowest Daily Rainfall", value: low.main, sub: low.sub, icon: ArrowDown, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600", text: "text-slate-900" },
    { label: "Daily Average", value: has(cards?.dailyAverage) ? `${num(cards.dailyAverage, 2)} mm/day` : "-", icon: Sigma, tint: "from-purple-50 to-white border-purple-100", badge: "bg-purple-100 text-purple-600", text: "text-slate-900" },
  ];

  const summaryRows = summary
    ? [
        { label: "Total Rainfall", value: mm(summary.totalRainfall), icon: CloudRain, color: "text-blue-500" },
        { label: "Rainy Days (≥ 0.1 mm)", value: has(summary.rainyDays) ? `${summary.rainyDays} Days` : "-", icon: CalendarDays, color: "text-emerald-600" },
        { label: "Highest Daily Rainfall", value: summary.highestDailyRainfall ? `${mm(summary.highestDailyRainfall.value)} (${summary.highestDailyRainfall.dateLabel})` : "-", icon: ArrowUp, color: "text-red-500" },
        { label: "Lowest Daily Rainfall", value: summary.lowestDailyRainfall ? `${mm(summary.lowestDailyRainfall.value)} (${summary.lowestDailyRainfall.dateLabel})` : "-", icon: ArrowDown, color: "text-blue-500" },
        { label: "Daily Average Rainfall", value: has(summary.dailyAverageRainfall) ? `${num(summary.dailyAverageRainfall, 2)} mm/day` : "-", icon: Sigma, color: "text-purple-500" },
        { label: "Monthly Cumulative (YTD)", value: mm(summary.monthlyCumulativeYtd), icon: CalendarDays, color: "text-emerald-600" },
        { label: `Previous Month (${summary.previousMonth.label})`, value: mm(summary.previousMonth.rainfall), icon: CalendarDays, color: "text-emerald-600" },
        { label: `Same Month Last Year (${summary.sameMonthLastYear.label})`, value: mm(summary.sameMonthLastYear.rainfall), icon: CalendarDays, color: "text-emerald-600" },
      ]
    : [];

  const loadingFirst = report.loading && !data;

  return (
    <div className='w-full space-y-4'>
      {/* =====================================================
          HEADER BANNER
      ====================================================== */}

      <div className='flex flex-col gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
            <CloudRainWind className='h-7 w-7' />
          </span>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>{monthlyRainfallSummaryData.title}</h2>
            <p className='text-sm text-slate-600'>{monthlyRainfallSummaryData.subtitle}</p>
          </div>
        </div>
        <div className='flex gap-3 print:hidden'>
          <button
            type='button'
            onClick={() => window.print()}
            className='flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50 sm:flex-none'
          >
            <Printer className='h-4 w-4' />
            Print
          </button>
          <div className='relative flex-1 sm:flex-none'>
            <button
              type='button'
              onClick={() => setMenuOpen((open) => !open)}
              disabled={!applied || exporting}
              className='flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <Download className='h-4 w-4' />
              {exporting ? "Exporting..." : "Export"}
              <ChevronDown className='h-4 w-4' />
            </button>
            {menuOpen && (
              <>
                <button type='button' aria-label='Close menu' className='fixed inset-0 z-10 cursor-default' onClick={() => setMenuOpen(false)} />
                <div className='absolute right-0 z-20 mt-1 w-44 rounded-md border border-slate-200 bg-white py-1 shadow-lg'>
                  <button type='button' onClick={exportExcel} className='flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm text-slate-800 hover:bg-emerald-50'>
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

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end print:hidden'>
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
            <option value=''>All Stations</option>
            {(stations.data ?? []).map((item) => (
              <option key={item.id} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className='mb-1 block text-xs font-semibold text-slate-700'>
            Month <span className='text-red-500'>*</span>
          </label>
          <input
            type='month'
            value={month}
            onChange={(event) => {
              setMonth(event.target.value);
              // Compare With follows the month (the same month a year before) until it is changed.
              if (event.target.value) setCompare(shiftMonth(event.target.value, -12));
            }}
            className={filterClass}
          />
        </div>
        <div>
          <label className='mb-1 block text-xs font-semibold text-slate-700'>Compare With</label>
          <input type='month' value={compare} onChange={(event) => setCompare(event.target.value)} className={filterClass} />
        </div>
        <button
          type='button'
          onClick={viewSummary}
          disabled={!estate || !month}
          className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 lg:col-span-1'
        >
          <Search className='h-4 w-4' />
          View Summary
        </button>
      </div>

      {report.error ? (
        <ErrorState message={report.error.message} onRetry={report.reload} />
      ) : !estate && !estates.loading ? (
        <p className='rounded-xl border border-slate-200 bg-white py-10 text-center text-sm text-slate-500'>{monthlyRainfallSummaryData.noEstate}</p>
      ) : (
        <>
          {/* =====================================================
              CARDS
          ====================================================== */}

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5'>
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
              DAILY RAINFALL + SUMMARY
          ====================================================== */}

          <div className='grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]'>
            <div className={card}>
              <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
                <BarChart3 className='h-5 w-5 text-emerald-700' />
                Daily Rainfall – {data?.monthLabel ?? ""}
              </h3>
              {!daily.some((row) => has(row.rainfall)) ? (
                <p className='flex h-64 items-center justify-center text-sm text-slate-500'>{report.loading ? "Loading..." : monthlyRainfallSummaryData.noData}</p>
              ) : (
                <div className='h-64 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={daily} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                      <XAxis dataKey='day' tick={{ fontSize: 11 }} interval='preserveStartEnd' minTickGap={4} />
                      <YAxis tick={{ fontSize: 11 }} label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                      <Tooltip formatter={(value) => [mm(value), "Rainfall"]} labelFormatter={(label) => `Day ${label}`} />
                      <Bar dataKey='rainfall' fill='#2e9e3e' radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className={card}>
              <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
                <BarChart3 className='h-5 w-5 text-emerald-700' />
                Monthly Summary – {data?.monthLabel ?? ""}
              </h3>
              {!summary ? (
                <p className='py-16 text-center text-sm text-slate-500'>{report.loading ? "Loading..." : monthlyRainfallSummaryData.noData}</p>
              ) : (
                <ul className='divide-y divide-slate-100 text-sm'>
                  {summaryRows.map((row) => {
                    const Icon = row.icon;
                    return (
                      <li key={row.label} className='flex items-center justify-between gap-3 py-1.5'>
                        <span className='flex items-center gap-2 text-slate-700'>
                          <Icon className={`h-4 w-4 shrink-0 ${row.color}`} />
                          {row.label}
                        </span>
                        <span className='text-right font-bold text-slate-900'>{row.value}</span>
                      </li>
                    );
                  })}
                  <li className='flex items-center justify-between gap-3 py-1.5'>
                    <span className='flex items-center gap-2 text-slate-700'>
                      <TrendingUp className='h-4 w-4 shrink-0 text-emerald-600' />
                      Change vs. Last Year
                    </span>
                    <span className={`flex items-center gap-1 text-right font-bold ${up ? "text-emerald-600" : down ? "text-red-600" : "text-slate-900"}`}>
                      {up && <ArrowUp className='h-3.5 w-3.5' />}
                      {down && <ArrowDown className='h-3.5 w-3.5' />}
                      {change ? change.text : "-"}
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* =====================================================
              COMPARISON + TREND
          ====================================================== */}

          <div className='grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1.7fr]'>
            <div className={card}>
              <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
                <BarChart3 className='h-5 w-5 text-emerald-700' />
                Monthly Rainfall Comparison <span className='font-semibold text-slate-700'>(mm)</span>
              </h3>
              {comparisonRows.length === 0 ? (
                <p className='flex h-60 items-center justify-center text-sm text-slate-500'>{report.loading ? "Loading..." : monthlyRainfallSummaryData.noData}</p>
              ) : (
                <div className='h-60 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={comparisonRows} margin={{ top: 20, right: 8, left: 0, bottom: 0 }} barCategoryGap='20%' barGap={0}>
                      <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                      <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(value) => mm(value)} />
                      <Legend verticalAlign='top' align='right' wrapperStyle={{ fontSize: 12 }} />
                      <Bar dataKey='current' name={comparison.current.label} fill='#15803d' radius={[2, 2, 0, 0]}>
                        <LabelList dataKey='current' position='top' formatter={(value) => num(value)} style={{ fontSize: 12, fontWeight: 700 }} />
                      </Bar>
                      <Bar dataKey='compare' name={comparison.compare.label} fill='#cbd5e1' radius={[2, 2, 0, 0]}>
                        <LabelList dataKey='compare' position='top' formatter={(value) => num(value)} style={{ fontSize: 12, fontWeight: 700 }} />
                        <Cell fill='#cbd5e1' />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            <div className={card}>
              <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
                <BarChart3 className='h-5 w-5 text-emerald-700' />
                Monthly Rainfall Trend <span className='font-semibold text-slate-700'>(Last 12 Months)</span>
              </h3>
              {!trendRows.some((row) => has(row.rainfall)) ? (
                <p className='flex h-60 items-center justify-center text-sm text-slate-500'>{report.loading ? "Loading..." : monthlyRainfallSummaryData.noData}</p>
              ) : (
                <div className='h-60 w-full'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={trendRows} margin={{ top: 24, right: 24, left: 0, bottom: 14 }}>
                      <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                      <XAxis dataKey='name' interval={0} height={40} tick={(props) => <TrendTick {...props} rows={trendRows} />} />
                      <YAxis tick={{ fontSize: 11 }} label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                      <Tooltip formatter={(value) => [mm(value), "Rainfall"]} labelFormatter={(label, items) => `${label} ${items?.[0]?.payload?.year ?? ""}`} />
                      <Area type='monotone' dataKey='rainfall' stroke='#2e9e3e' fill='#bbf7d0' strokeWidth={2} dot={{ r: 3, fill: "#2e9e3e" }}>
                        <LabelList dataKey='rainfall' position='top' formatter={(value) => num(value)} style={{ fontSize: 10, fontWeight: 600 }} />
                      </Area>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* =====================================================
              REMARKS
          ====================================================== */}

          <div className={card}>
            <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
              <MessageSquare className='h-5 w-5 text-emerald-700' />
              Remarks
            </h3>
            <p className='rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700'>{data?.remarks ?? (report.loading ? "Loading..." : "-")}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlyRainfallSummary;
