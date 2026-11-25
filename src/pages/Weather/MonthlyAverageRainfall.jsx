import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, CalendarDays, ChevronDown, CloudRain, CloudRainWind, Download, Droplet, FileSpreadsheet, MessageSquare, Printer, Search, Sigma, Table2 } from "lucide-react";
import Select from "../../components/common/Select";
import ErrorState from "../../components/common/ErrorState";
import { api } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { errorText, useWeatherEstate } from "../../lib/useWeatherEstate";
import monthlyAverageRainfallData from "../../data/Weather/monthlyAverageRainfallData";

const card = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";
const filterClass = "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600";
const has = (value) => value !== null && value !== undefined && value !== "";
const num = (value, digits = 2) => (has(value) ? Number(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "-");
const perDay = (value) => (has(value) ? `${num(value)} mm/day` : "-");

const thisYear = new Date().getFullYear();
const YEARS = Array.from({ length: Math.max(thisYear - monthlyAverageRainfallData.firstYear + 1, 1) }, (_, i) => thisYear - i);

const MonthlyAverageRainfall = () => {
  const [estate, setEstate] = useState("");
  const [station, setStation] = useState("");
  const [year, setYear] = useState(String(thisYear));
  const [compare, setCompare] = useState(String(thisYear - 1));
  // View Report copies the filters here; the report loads from these.
  const [applied, setApplied] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const estates = useApi(() => api.get("/options/estates"), []);
  const stations = useApi(() => (estate ? api.get("/options/weather-stations", { estate }) : Promise.resolve([])), [estate]);

  // The first estate is shown until another is picked, and its report loads at once.
  const firstEstate = useWeatherEstate(estates.data);
  useEffect(() => {
    if (!estate && firstEstate) {
      setEstate(firstEstate);
      setApplied({ estate: firstEstate, station: "", year: String(thisYear), compare: String(thisYear - 1) });
    }
  }, [estate, firstEstate]);

  const report = useApi(() => (applied ? api.get("/weather/monthly-average-rainfall", applied) : Promise.resolve(null)), [applied]);
  const data = report.data;
  const cards = data?.cards;
  const table = data?.table ?? [];
  const total = data?.total;
  const trend = data?.trend ?? [];
  const chart = data?.chart ?? [];

  const viewReport = () => setApplied({ estate, station, year, compare });

  const exportExcel = async () => {
    setMenuOpen(false);
    setExporting(true);
    try {
      const blob = await api.download("/weather/monthly-average-rainfall/export", { ...applied, format: "xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `monthly-average-rainfall-${data?.year ?? applied.year}.xlsx`;
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

  const monthCard = (point) => (point ? { value: perDay(point.value), sub: `${point.monthName} ${data?.year ?? ""}` } : { value: "-", sub: "" });
  const high = monthCard(cards?.highestMonthlyAverage);
  const low = monthCard(cards?.lowestMonthlyAverage);

  const cardItems = [
    { label: `Average Rainfall${data ? ` (${data.year})` : ""}`, value: perDay(cards?.averageRainfall?.value), sub: cards?.averageRainfall?.monthName ? `${cards.averageRainfall.monthName} ${data.year}` : "", icon: CloudRain, tint: "from-blue-50 to-white border-blue-100", badge: "bg-blue-100 text-blue-600", text: "text-slate-900" },
    { label: "Highest Monthly Average", value: high.value, sub: high.sub, icon: CalendarDays, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600", text: "text-emerald-700" },
    { label: "Lowest Monthly Average", value: low.value, sub: low.sub, icon: Droplet, tint: "from-red-50 to-white border-red-100", badge: "bg-red-100 text-red-500", text: "text-red-600" },
    { label: "Annual Average", value: perDay(cards?.annualAverage), icon: Sigma, tint: "from-purple-50 to-white border-purple-100", badge: "bg-purple-100 text-purple-600", text: "text-slate-900" },
    { label: "Months with Rain", value: has(cards?.monthsWithRain) ? `${cards.monthsWithRain} Months` : "-", sub: "≥ 0.1 mm/day", icon: CalendarDays, tint: "from-emerald-50 to-white border-emerald-100", badge: "bg-emerald-100 text-emerald-600", text: "text-slate-900" },
  ];

  const loadingFirst = report.loading && !data;
  const empty = (height) => <p className={`flex ${height} items-center justify-center text-sm text-slate-500`}>{report.loading ? "Loading..." : monthlyAverageRainfallData.noData}</p>;

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
            <h2 className='text-xl font-bold text-slate-900'>{monthlyAverageRainfallData.title}</h2>
            <p className='text-sm text-slate-600'>{monthlyAverageRainfallData.subtitle}</p>
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
            Year <span className='text-red-500'>*</span>
          </label>
          <Select
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
              // Compare With follows the year (the year before) until it is changed.
              setCompare(String(Number(event.target.value) - 1));
            }}
            className={`${filterClass} cursor-pointer`}
          >
            {YEARS.map((item) => (
              <option key={item} value={String(item)}>
                {item}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className='mb-1 block text-xs font-semibold text-slate-700'>Compare With</label>
          <Select value={compare} onChange={(event) => setCompare(event.target.value)} className={`${filterClass} cursor-pointer`}>
            <option value=''>Previous year</option>
            {YEARS.map((item) => (
              <option key={item} value={String(item)}>
                {item}
              </option>
            ))}
          </Select>
        </div>
        <button
          type='button'
          onClick={viewReport}
          disabled={!estate || !year}
          className='flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 lg:col-span-1'
        >
          <Search className='h-4 w-4' />
          View Report
        </button>
      </div>

      {report.error ? (
        <ErrorState message={errorText(report.error)} onRetry={report.reload} />
      ) : !estate && !estates.loading ? (
        <p className='rounded-xl border border-slate-200 bg-white py-10 text-center text-sm text-slate-500'>{monthlyAverageRainfallData.noEstate}</p>
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
              CHART + TABLE
          ====================================================== */}

          <div className='grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]'>
            <div className='space-y-4'>
              <div className={card}>
                <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
                  <BarChart3 className='h-5 w-5 text-emerald-700' />
                  Monthly Average Rainfall – {data ? `${data.year} vs ${data.compare}` : ""}
                </h3>
                {!chart.some((row) => has(row.year) || has(row.compare)) ? (
                  empty("h-64")
                ) : (
                  <div className='h-64 w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <BarChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                        <XAxis dataKey='label' tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} label={{ value: "Average Rainfall (mm/day)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                        <Tooltip formatter={(value, name) => [perDay(value), name]} />
                        <Legend verticalAlign='top' align='right' wrapperStyle={{ fontSize: 12 }} />
                        <Bar dataKey='year' name={`${data.year} (mm/day)`} fill='#15803d' radius={[2, 2, 0, 0]} />
                        <Bar dataKey='compare' name={`${data.compare} (mm/day)`} fill='#cbd5e1' radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className={card}>
                <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
                  <BarChart3 className='h-5 w-5 text-emerald-700' />
                  Average Rainfall Trend <span className='font-semibold text-slate-700'>(Last 5 Years)</span>
                </h3>
                {!trend.some((row) => has(row.average) && Number(row.average) > 0) ? (
                  empty("h-56")
                ) : (
                  <div className='h-56 w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <AreaChart data={trend} margin={{ top: 24, right: 24, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#e2e8f0' />
                        <XAxis dataKey='year' tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} label={{ value: "Average (mm/day)", angle: -90, position: "insideLeft", fontSize: 11 }} />
                        <Tooltip formatter={(value) => [perDay(value), "Average"]} />
                        <Area type='monotone' dataKey='average' stroke='#2e9e3e' fill='#bbf7d0' strokeWidth={2} dot={{ r: 3, fill: "#2e9e3e" }}>
                          <LabelList dataKey='average' position='top' formatter={(value) => num(value)} style={{ fontSize: 11, fontWeight: 600 }} />
                        </Area>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            <div className={`${card} self-start`}>
              <h3 className='mb-2 flex items-center gap-2 text-base font-bold text-emerald-900'>
                <Table2 className='h-5 w-5 text-emerald-700' />
                Monthly Average Rainfall – {data?.year ?? ""}
              </h3>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[320px] text-left text-sm'>
                  <thead>
                    <tr className='bg-emerald-50 text-xs text-slate-800'>
                      <th className='px-2 py-2 font-bold'>Month</th>
                      <th className='px-2 py-2 text-center font-bold'>Total Rainfall (mm)</th>
                      <th className='px-2 py-2 text-center font-bold'>Rainy Days</th>
                      <th className='px-2 py-2 text-center font-bold'>Average Rainfall (mm/day)</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-100'>
                    {table.length === 0 ? (
                      <tr>
                        <td colSpan={4} className='px-2 py-8 text-center text-sm text-slate-500'>
                          {report.loading ? "Loading..." : monthlyAverageRainfallData.noData}
                        </td>
                      </tr>
                    ) : (
                      <>
                        {table.map((row) => (
                          <tr key={row.month} className={row.isCurrent ? "bg-emerald-100 font-bold" : ""}>
                            <td className='px-2 py-1.5'>{row.name}</td>
                            <td className='px-2 py-1.5 text-center'>{num(row.totalRainfall, 1)}</td>
                            <td className='px-2 py-1.5 text-center'>{has(row.rainyDays) ? row.rainyDays : "-"}</td>
                            <td className='px-2 py-1.5 text-center'>{num(row.avgRainfall)}</td>
                          </tr>
                        ))}
                        <tr className='bg-emerald-100 font-bold'>
                          <td className='px-2 py-2'>Total / Average</td>
                          <td className='px-2 py-2 text-center'>{num(total?.totalRainfall, 1)}</td>
                          <td className='px-2 py-2 text-center'>{has(total?.rainyDays) ? total.rainyDays : "-"}</td>
                          <td className='px-2 py-2 text-center'>{num(total?.annualAverage)}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
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

export default MonthlyAverageRainfall;
