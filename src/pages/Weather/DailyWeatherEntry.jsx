import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CloudRain, CloudSun, Droplets, FileText, Info, List, Paperclip, Plus, Save, Send, Sun, Thermometer, Wind, X } from "lucide-react";
import Select from "../../components/common/Select";
import ErrorState from "../../components/common/ErrorState";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { useForm } from "../../lib/useForm";
import dailyWeatherEntryData from "../../data/Weather/dailyWeatherEntryData";

const { ranges } = dailyWeatherEntryData;
const today = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

const EMPTY_FORM = {
  entryDate: "",
  estate: "",
  station: "",
  location: "",
  entryType: "MANUAL",
  recordingTime: "",
  totalRainfall: "",
  measurementTime: "",
  rainGaugeType: "",
  rainfallDuration: "",
  morningRainfall: "",
  afternoonRainfall: "",
  eveningRainfall: "",
  rainfallRemarks: "",
  maxTemperature: "",
  minTemperature: "",
  morningTemperature: "",
  afternoonTemperature: "",
  eveningTemperature: "",
  morningHumidity: "",
  afternoonHumidity: "",
  maxHumidity: "",
  minHumidity: "",
  windSpeed: "",
  maxWindSpeed: "",
  windDirection: "",
  windRemarks: "",
  sunshineHours: "",
  cloudCoverage: "",
  weatherCondition: "",
  fog: false,
  thunderstorm: false,
  hailstorm: false,
  generalRemarks: "",
};
const FORM_KEYS = Object.keys(EMPTY_FORM);

const isBlank = (value) => value === "" || value === null || value === undefined;
const toNumber = (value) => (isBlank(value) || String(value).trim() === "" ? null : Number(value));
const toText = (value) => (isBlank(value) || String(value).trim() === "" ? null : String(value).trim());
const round = (value, digits = 2) => Math.round(value * 10 ** digits) / 10 ** digits;
const show = (value) => (isBlank(value) ? "-" : value);
const withUnit = (value, unit, digits = 1) => (isBlank(value) ? "-" : `${Number(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })} ${unit}`);
const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const boxClass = (error) => `h-10 w-full rounded-md border bg-white px-3 text-sm outline-none focus:border-emerald-600 disabled:bg-slate-100 disabled:text-slate-500 ${error ? "border-red-500" : "border-slate-300"}`;
const labelClass = "mb-1 block text-xs font-semibold text-slate-700";
const sectionClass = "rounded-xl border border-slate-200 bg-white shadow-sm";

const Section = ({ id, icon: Icon, title, children, className = "" }) => (
  <section id={id} className={`${sectionClass} ${className}`}>
    <h3 className='flex items-center gap-2 rounded-t-xl bg-emerald-50 px-4 py-2.5 text-base font-bold text-slate-900'>
      <Icon className='h-5 w-5 text-emerald-700' />
      {title}
    </h3>
    <div className='p-4'>{children}</div>
  </section>
);

const Field = ({ label, required, error, children, className = "" }) => (
  <div className={className}>
    <label className={labelClass}>
      {label} {required && <span className='text-red-500'>*</span>}
    </label>
    {children}
    {error && <p className='mt-1 text-xs text-red-500'>{error.message}</p>}
  </div>
);

const DailyWeatherEntry = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const section = searchParams.get("section");

  const [attachments, setAttachments] = useState([]); // kept files of a saved entry: { id, url, name }
  const [newFiles, setNewFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [summaryRainfall, setSummaryRainfall] = useState("");
  const fileInput = useRef(null);
  const pendingStation = useRef(null);
  const loadedFor = useRef(null);

  const options = useApi(() => api.get("/weather-entries/filter-options"), []);
  const estates = useApi(() => api.get("/options/estates"), []);
  const me = useApi(() => api.get("/auth/me"), []);
  const entry = useApi(() => (editId ? api.get(`/weather-entries/${editId}`) : Promise.resolve(null)), [editId]);
  const saved = entry.data;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { ...EMPTY_FORM, entryDate: today(), recordingTime: nowTime() } });

  const estate = watch("estate");
  const stationId = watch("station");
  const entryDate = watch("entryDate");
  const maxTemperature = watch("maxTemperature");
  const minTemperature = watch("minTemperature");
  const maxHumidity = watch("maxHumidity");
  const minHumidity = watch("minHumidity");
  const morningRainfall = watch("morningRainfall");
  const afternoonRainfall = watch("afternoonRainfall");
  const eveningRainfall = watch("eveningRainfall");
  const totalRainfall = watch("totalRainfall");

  const stations = useApi(() => (estate ? api.get("/options/weather-stations", { estate, status: "active" }) : Promise.resolve([])), [estate]);
  // An estate is picked and its stations have loaded, but none is active.
  const noStation = Boolean(estate) && !stations.loading && (stations.data ?? []).length === 0;

  // A new entry starts on the first estate.
  const firstEstate = estates.data?.[0]?.value ?? "";
  useEffect(() => {
    if (!editId && !getValues("estate") && firstEstate) setValue("estate", firstEstate);
  }, [editId, firstEstate, getValues, setValue]);

  // A saved entry fills the form once, when the estates are there to pick from.
  useEffect(() => {
    if (!saved || !estates.data || loadedFor.current === saved.id) return;
    loadedFor.current = saved.id;
    pendingStation.current = saved.station;
    reset(Object.fromEntries(FORM_KEYS.map((key) => [key, typeof EMPTY_FORM[key] === "boolean" ? Boolean(saved[key]) : (saved[key] ?? "")])));
    setAttachments((saved.attachments ?? []).map((id, index) => ({ id, url: saved.attachmentsUrl?.[index] ?? null, name: saved.attachmentsName?.[index] ?? `File ${index + 1}` })));
  }, [saved, estates.data, reset]);

  // ...and its station once that estate's stations are loaded.
  useEffect(() => {
    if (pendingStation.current && stations.data && stations.data.some((item) => item.value === pendingStation.current)) {
      setValue("station", pendingStation.current);
      pendingStation.current = null;
    }
  }, [stations.data, setValue]);

  // Total Rainfall fills itself from the three parts once one of them is typed.
  useEffect(() => {
    const parts = [morningRainfall, afternoonRainfall, eveningRainfall];
    if (parts.every(isBlank)) return;
    const sum = round(parts.reduce((total, part) => total + (isBlank(part) ? 0 : Number(part) || 0), 0));
    if (String(getValues("totalRainfall")) !== String(sum)) setValue("totalRainfall", String(sum));
  }, [morningRainfall, afternoonRainfall, eveningRainfall, getValues, setValue]);

  const average = (a, b) => (isBlank(a) || isBlank(b) || Number.isNaN(Number(a)) || Number.isNaN(Number(b)) ? null : round((Number(a) + Number(b)) / 2, 1));
  const avgTemperature = average(maxTemperature, minTemperature) ?? saved?.avgTemperature ?? null;
  const avgHumidity = average(maxHumidity, minHumidity) ?? saved?.avgHumidity ?? null;

  // The side panels follow the station and date; the typed rainfall is passed along a moment after typing stops.
  useEffect(() => {
    const timer = setTimeout(() => setSummaryRainfall(totalRainfall), 400);
    return () => clearTimeout(timer);
  }, [totalRainfall]);
  const summary = useApi(
    () => (stationId && entryDate ? api.get("/weather-entries/summary", { station: stationId, date: entryDate, rainfall: summaryRainfall }) : Promise.resolve(null)),
    [stationId, entryDate, summaryRainfall],
  );
  const daily = summary.data?.dailySummary;
  const related = summary.data?.related;

  // "Add Temperature" on the dashboard opens the page at the Temperature section.
  useEffect(() => {
    if (section !== "temperature") return;
    const timer = setTimeout(() => {
      document.getElementById("temperature-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("maxTemperature")?.focus({ preventScroll: true });
    }, 300);
    return () => clearTimeout(timer);
  }, [section]);

  const waiting = saved?.pendingRequest ?? null;
  const isSubmitted = saved?.entryStatus === "SUBMITTED";
  const statusKey = waiting ? "PENDING" : (saved?.entryStatus ?? "DRAFT");
  const statusLabel = waiting ? "Pending" : (saved?.entryStatusLabel ?? "Draft");
  const maxAttachments = options.data?.maxAttachments ?? 5;
  const maxAttachmentMb = options.data?.maxAttachmentMb ?? 5;
  const attachmentTypes = (options.data?.attachmentTypes ?? ["PDF", "JPG", "PNG"]).join(", ");

  const pickFiles = (event) => {
    const picked = Array.from(event.target.files ?? []);
    event.target.value = "";
    const accepted = [];
    for (const file of picked) {
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        toast.error(`${file.name}: use a ${attachmentTypes} file.`);
      } else if (file.size > maxAttachmentMb * 1024 * 1024) {
        toast.error(`${file.name}: a file can be at most ${maxAttachmentMb} MB.`);
      } else accepted.push(file);
    }
    if (attachments.length + newFiles.length + accepted.length > maxAttachments) {
      toast.error(`At most ${maxAttachments} attachments.`);
      return;
    }
    setNewFiles((current) => [...current, ...accepted]);
  };

  const limit = (name, label) => ({
    validate: (value) => {
      if (isBlank(value) || String(value).trim() === "") return true;
      const [min, max] = ranges[name];
      const number = Number(value);
      if (Number.isNaN(number)) return `${label} must be a number.`;
      return (number >= min && number <= max) || `${label} must be between ${min} and ${max}.`;
    },
  });
  const required = (name, label) => ({
    required: `${label} is required`,
    ...limit(name, label),
  });

  const save = (entryStatus) =>
    handleSubmit(async (values) => {
      const rainfallParts = [values.morningRainfall, values.afternoonRainfall, values.eveningRainfall];
      if (rainfallParts.some((part) => !isBlank(part)) && Math.abs(Number(values.totalRainfall) - round(rainfallParts.reduce((sum, part) => sum + (Number(part) || 0), 0))) > 0.01) {
        setError("totalRainfall", { message: "Total Rainfall must equal Morning + Afternoon + Evening / Night." });
        return;
      }
      if (!isBlank(values.minTemperature) && Number(values.minTemperature) > Number(values.maxTemperature)) {
        setError("minTemperature", { message: "Minimum Temperature cannot be above the Maximum." });
        return;
      }
      if (!isBlank(values.minHumidity) && !isBlank(values.maxHumidity) && Number(values.minHumidity) > Number(values.maxHumidity)) {
        setError("minHumidity", { message: "Minimum Humidity cannot be above the Maximum." });
        return;
      }
      if (!isBlank(values.maxWindSpeed) && !isBlank(values.windSpeed) && Number(values.maxWindSpeed) < Number(values.windSpeed)) {
        setError("maxWindSpeed", { message: "Max Wind Speed cannot be below the Wind Speed." });
        return;
      }
      setBusy(true);
      try {
        const uploaded = [];
        for (const file of newFiles) uploaded.push((await api.upload(file)).id);
        const body = {
          entryDate: values.entryDate,
          estate: values.estate,
          station: values.station,
          location: (values.location ?? "").trim(),
          entryType: "MANUAL",
          recordingTime: values.recordingTime,
          entryStatus,
          totalRainfall: toNumber(values.totalRainfall),
          measurementTime: toText(values.measurementTime),
          rainGaugeType: toText(values.rainGaugeType),
          rainfallDuration: toText(values.rainfallDuration),
          morningRainfall: toNumber(values.morningRainfall),
          afternoonRainfall: toNumber(values.afternoonRainfall),
          eveningRainfall: toNumber(values.eveningRainfall),
          rainfallRemarks: toText(values.rainfallRemarks),
          maxTemperature: toNumber(values.maxTemperature),
          minTemperature: toNumber(values.minTemperature),
          morningTemperature: toNumber(values.morningTemperature),
          afternoonTemperature: toNumber(values.afternoonTemperature),
          eveningTemperature: toNumber(values.eveningTemperature),
          morningHumidity: toNumber(values.morningHumidity),
          afternoonHumidity: toNumber(values.afternoonHumidity),
          maxHumidity: toNumber(values.maxHumidity),
          minHumidity: toNumber(values.minHumidity),
          windSpeed: toNumber(values.windSpeed),
          maxWindSpeed: toNumber(values.maxWindSpeed),
          windDirection: toText(values.windDirection),
          windRemarks: toText(values.windRemarks),
          sunshineHours: toNumber(values.sunshineHours),
          cloudCoverage: toNumber(values.cloudCoverage),
          weatherCondition: values.weatherCondition,
          fog: Boolean(values.fog),
          thunderstorm: Boolean(values.thunderstorm),
          hailstorm: Boolean(values.hailstorm),
          generalRemarks: toText(values.generalRemarks),
          attachments: [...attachments.map((file) => file.id), ...uploaded],
        };
        const result = editId ? await api.put(`/weather-entries/${editId}`, body) : await api.post("/weather-entries", body);
        notifySaved(result, entryStatus === "DRAFT" ? "Weather entry saved as draft!" : editId ? "Weather entry updated successfully!" : "Weather entry saved successfully!");
        navigate(dailyWeatherEntryData.entriesPath);
      } catch (error) {
        const fields = error.fields ?? {};
        let unplaced = false;
        for (const [key, message] of Object.entries(fields)) {
          if (FORM_KEYS.includes(key)) setError(key, { message });
          else {
            unplaced = true;
            toast.error(message);
          }
        }
        // e.g. "There are no changes to save."
        if (!unplaced && Object.keys(fields).length === 0) toast.error(error.message);
      } finally {
        setBusy(false);
      }
    })();

  // One number input: Field + optional unit label inside the box.
  const numberInput = (name, label, { unit, isRequired, step = "any", className = "" } = {}) => (
    <Field key={name} label={label} required={isRequired} className={className}>
      <div className='relative'>
        <input id={name} type='number' step={step} inputMode='decimal' {...register(name, isRequired ? required(name, label) : limit(name, label))} className={`${boxClass(errors[name])} ${unit ? "pr-12" : ""}`} />
        {unit && <span className='pointer-events-none absolute right-3 top-2.5 text-xs text-slate-500'>{unit}</span>}
        {errors[name] && <p className='mt-1 text-xs text-red-500'>{errors[name].message}</p>}
      </div>
    </Field>
  );

  const readOnlyAverage = (label, value, unit) => (
    <Field label={label}>
      <div className='relative'>
        <input type='text' readOnly tabIndex={-1} value={isBlank(value) ? "" : Number(value).toFixed(1)} placeholder='-' className={`${boxClass(false)} bg-blue-50 pr-12 font-semibold`} />
        <span className='pointer-events-none absolute right-3 top-2.5 text-xs text-slate-500'>{unit}</span>
      </div>
    </Field>
  );

  const summaryRows = daily
    ? [
        { label: "Total Rainfall", icon: Droplets, color: "text-blue-500", value: withUnit(daily.totalRainfall, "mm") },
        { label: "Max Temperature", icon: Thermometer, color: "text-red-500", value: withUnit(daily.maxTemperature, "°C") },
        { label: "Min Temperature", icon: Thermometer, color: "text-blue-500", value: withUnit(daily.minTemperature, "°C") },
        { label: "Avg Temperature", icon: Thermometer, color: "text-slate-500", value: withUnit(daily.avgTemperature, "°C") },
        { label: "Humidity (Avg)", icon: Droplets, color: "text-blue-500", value: withUnit(daily.avgHumidity, "%", 0) },
        { label: "Wind Speed", icon: Wind, color: "text-sky-500", value: isBlank(daily.windSpeed) ? "-" : `${Number(daily.windSpeed).toFixed(1)} km/h${daily.windDirection ? ` (${daily.windDirection})` : ""}` },
        { label: "Sunshine Hours", icon: Sun, color: "text-amber-500", value: withUnit(daily.sunshineHours, "h") },
        { label: "Weather Condition", icon: CloudSun, color: "text-sky-500", value: show(daily.weatherConditionLabel) },
      ]
    : [];

  if (editId && entry.error) {
    return (
      <div className='w-full space-y-4'>
        <ErrorState message={entry.error.message} onRetry={entry.reload} />
      </div>
    );
  }

  const cancel = () => navigate(dailyWeatherEntryData.entriesPath);
  const disabled = busy || Boolean(waiting);

  return (
    <div className='w-full space-y-4'>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className='flex flex-col gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600'>
            <CloudRain className='h-7 w-7' />
          </div>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>{dailyWeatherEntryData.title}</h2>
            <p className='text-sm text-slate-600'>{dailyWeatherEntryData.subtitle}</p>
          </div>
        </div>
        <Link to={dailyWeatherEntryData.entriesPath} className='flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
          <List className='h-4 w-4' />
          {dailyWeatherEntryData.viewEntries}
        </Link>
      </div>

      {waiting && (
        <p role='status' className='rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700'>
          Waiting for approval ({waiting.requestNo}). This entry cannot be changed until the request is decided.
        </p>
      )}

      <form onSubmit={(event) => event.preventDefault()} noValidate className='grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]'>
        <div className='min-w-0 space-y-4'>
          {/* BASIC INFORMATION */}
          <Section icon={Info} title='Basic Information'>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
              <Field label='Entry Date' required error={errors.entryDate}>
                <input
                  type='date'
                  max={today()}
                  {...register("entryDate", { required: "Entry Date is required", validate: (value) => !value || value <= today() || "Entry Date cannot be in the future." })}
                  className={boxClass(errors.entryDate)}
                />
              </Field>
              <Field label='Estate' required error={errors.estate}>
                <Select {...register("estate", { required: "Estate is required", onChange: () => setValue("station", "") })} className={`${boxClass(errors.estate)} cursor-pointer`}>
                  <option value=''>Select Estate</option>
                  {(estates.data ?? []).map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label='Weather Station' required error={errors.station}>
                <Select {...register("station", { required: "Weather Station is required" })} className={`${boxClass(errors.station)} cursor-pointer`}>
                  <option value=''>{noStation ? "No active station" : "Select Station"}</option>
                  {(stations.data ?? []).map((item) => (
                    <option key={item.id} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Select>
                {noStation && (
                  <div className='mt-1 flex flex-wrap items-center gap-2'>
                    <p className='text-xs text-amber-600'>No active weather station for this estate.</p>
                    <button
                      type='button'
                      onClick={() => navigate("/weather-station-setup", { state: { newStationEstate: estate } })}
                      className='flex h-8 cursor-pointer items-center gap-1 rounded-md bg-emerald-700 px-3 text-xs font-semibold text-white hover:bg-emerald-800'
                    >
                      <Plus className='h-3.5 w-3.5' />
                      Create Active Station
                    </button>
                  </div>
                )}
              </Field>
              <Field label='Division / Location' error={errors.location}>
                <input type='text' maxLength={160} placeholder="The station's location" {...register("location")} className={boxClass(errors.location)} />
              </Field>
              <Field label='Entry Type' required>
                <Select {...register("entryType")} disabled className={boxClass(false)}>
                  {(options.data?.entryTypes ?? [{ value: "MANUAL", label: "Manual" }]).filter((item) => item.value === "MANUAL").map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label='Recorded By' required>
                <input type='text' readOnly tabIndex={-1} value={saved?.createdByName ?? me.data?.user?.name ?? ""} className={boxClass(false)} />
              </Field>
              <Field label='Recording Time' required error={errors.recordingTime}>
                <input type='time' {...register("recordingTime", { required: "Recording Time is required" })} className={boxClass(errors.recordingTime)} />
              </Field>
              <Field label='Entry Status'>
                <div className={`flex h-10 items-center rounded-md border border-slate-200 px-3`}>
                  <span className={`rounded-md px-3 py-0.5 text-xs font-semibold ${dailyWeatherEntryData.statusBadge[statusKey]}`}>{statusLabel}</span>
                </div>
              </Field>
            </div>
          </Section>

          {/* RAINFALL */}
          <Section icon={CloudRain} title='Rainfall Information'>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
              {numberInput("totalRainfall", "Today's Rainfall (Total)", { unit: "mm", isRequired: true })}
              <Field label='Measurement Time' error={errors.measurementTime}>
                <input type='time' {...register("measurementTime")} className={boxClass(errors.measurementTime)} />
              </Field>
              <Field label='Rain Gauge Type' error={errors.rainGaugeType}>
                <Select {...register("rainGaugeType")} className={`${boxClass(errors.rainGaugeType)} cursor-pointer`}>
                  <option value=''>Select Rain Gauge Type</option>
                  {(options.data?.rainGaugeTypes ?? []).map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label='Rainfall Duration'>
                <div className='relative'>
                  <input
                    type='text'
                    inputMode='numeric'
                    placeholder='HH:MM'
                    maxLength={5}
                    {...register("rainfallDuration", { validate: (value) => !value || /^\d{1,2}:[0-5]\d$/.test(value) || "Enter the duration as HH:MM, e.g. 02:30." })}
                    className={`${boxClass(errors.rainfallDuration)} pr-14`}
                  />
                  <span className='pointer-events-none absolute right-3 top-2.5 text-xs text-slate-500'>hours</span>
                  {errors.rainfallDuration && <p className='mt-1 text-xs text-red-500'>{errors.rainfallDuration.message}</p>}
                </div>
              </Field>
              {numberInput("morningRainfall", "Morning Rainfall", { unit: "mm" })}
              {numberInput("afternoonRainfall", "Afternoon Rainfall", { unit: "mm" })}
              {numberInput("eveningRainfall", "Evening/Night Rainfall", { unit: "mm" })}
              <Field label='Rainfall Remarks' error={errors.rainfallRemarks}>
                <input type='text' maxLength={500} {...register("rainfallRemarks")} className={boxClass(errors.rainfallRemarks)} />
              </Field>
            </div>
          </Section>

          {/* TEMPERATURE */}
          <Section id='temperature-section' icon={Thermometer} title='Temperature Information'>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {numberInput("maxTemperature", "Maximum Temperature", { unit: "°C", isRequired: true })}
              {numberInput("minTemperature", "Minimum Temperature", { unit: "°C", isRequired: true })}
              {readOnlyAverage("Average Temperature", avgTemperature, "°C")}
              {numberInput("morningTemperature", "Morning Temperature", { unit: "°C" })}
              {numberInput("afternoonTemperature", "Afternoon Temperature", { unit: "°C" })}
              {numberInput("eveningTemperature", "Evening Temperature", { unit: "°C" })}
            </div>
          </Section>

          <div className='grid grid-cols-1 gap-4 2xl:grid-cols-2'>
            {/* HUMIDITY */}
            <Section icon={Droplets} title='Humidity Information'>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                {numberInput("morningHumidity", "Morning Humidity", { unit: "%" })}
                {numberInput("afternoonHumidity", "Afternoon Humidity", { unit: "%" })}
                {numberInput("maxHumidity", "Maximum Humidity", { unit: "%" })}
                {numberInput("minHumidity", "Minimum Humidity", { unit: "%" })}
                {readOnlyAverage("Average Humidity", avgHumidity, "%")}
              </div>
            </Section>

            {/* WIND */}
            <Section icon={Wind} title='Wind Information'>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                {numberInput("windSpeed", "Wind Speed", { unit: "km/h" })}
                {numberInput("maxWindSpeed", "Maximum Wind Speed", { unit: "km/h" })}
                <Field label='Wind Direction' error={errors.windDirection}>
                  <Select {...register("windDirection")} className={`${boxClass(errors.windDirection)} cursor-pointer`}>
                    <option value=''>Select Direction</option>
                    {(options.data?.windDirections ?? []).map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label='Wind Remarks' error={errors.windRemarks} className='sm:col-span-2 lg:col-span-3'>
                  <input type='text' maxLength={500} {...register("windRemarks")} className={boxClass(errors.windRemarks)} />
                </Field>
              </div>
            </Section>

            {/* OTHER */}
            <Section icon={CloudSun} title='Other Weather Information'>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
                {numberInput("sunshineHours", "Sunshine Hours", { unit: "hours" })}
                {numberInput("cloudCoverage", "Cloud Coverage", { unit: "%" })}
                <Field label='Weather Condition' required error={errors.weatherCondition}>
                  <Select {...register("weatherCondition", { required: "Weather Condition is required" })} className={`${boxClass(errors.weatherCondition)} cursor-pointer`}>
                    <option value=''>Select Condition</option>
                    {(options.data?.weatherConditions ?? []).map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
              <div className='mt-3 flex flex-wrap gap-x-6 gap-y-2'>
                {[
                  ["fog", "Fog"],
                  ["thunderstorm", "Thunderstorm"],
                  ["hailstorm", "Hailstorm"],
                ].map(([name, label]) => (
                  <label key={name} className='flex cursor-pointer items-center gap-2 text-sm text-slate-700'>
                    <input type='checkbox' {...register(name)} className='h-4 w-4 cursor-pointer accent-emerald-700' />
                    {label}
                  </label>
                ))}
              </div>
            </Section>

            {/* REMARKS & ATTACHMENTS */}
            <Section icon={FileText} title='Remarks & Attachments'>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <Field label='General Remarks' error={errors.generalRemarks}>
                  <textarea rows={3} maxLength={500} {...register("generalRemarks")} className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600 ${errors.generalRemarks ? "border-red-500" : "border-slate-300"}`} />
                </Field>
                <div>
                  <label className={labelClass}>Attachments</label>
                  <input ref={fileInput} type='file' multiple accept='application/pdf,image/jpeg,image/png' onChange={pickFiles} className='hidden' />
                  <button
                    type='button'
                    onClick={() => fileInput.current?.click()}
                    disabled={attachments.length + newFiles.length >= maxAttachments}
                    className='flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'
                  >
                    <Paperclip className='h-4 w-4 text-blue-600' />
                    Choose File
                  </button>
                  <p className='mt-1 text-xs text-slate-500'>
                    {attachmentTypes}, max {maxAttachmentMb} MB each, up to {maxAttachments} files
                  </p>
                  <ul className='mt-1 space-y-1'>
                    {attachments.map((file) => (
                      <li key={file.id} className='flex items-center justify-between gap-2 rounded bg-slate-50 px-2 py-1 text-xs text-slate-700'>
                        {file.url ? (
                          <a href={file.url} target='_blank' rel='noreferrer' className='truncate text-blue-700 hover:underline'>
                            {file.name}
                          </a>
                        ) : (
                          <span className='truncate'>{file.name}</span>
                        )}
                        <button type='button' aria-label={`Remove ${file.name}`} onClick={() => setAttachments((current) => current.filter((item) => item.id !== file.id))} className='cursor-pointer text-slate-500 hover:text-red-500'>
                          <X className='h-3.5 w-3.5' />
                        </button>
                      </li>
                    ))}
                    {newFiles.map((file, index) => (
                      <li key={`${file.name}-${index}`} className='flex items-center justify-between gap-2 rounded bg-slate-50 px-2 py-1 text-xs text-slate-700'>
                        <span className='truncate'>{file.name}</span>
                        <button type='button' aria-label={`Remove ${file.name}`} onClick={() => setNewFiles((current) => current.filter((_, i) => i !== index))} className='cursor-pointer text-slate-500 hover:text-red-500'>
                          <X className='h-3.5 w-3.5' />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Section>
          </div>

          {/* BUTTONS */}
          <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <button type='button' onClick={cancel} className='flex h-11 cursor-pointer items-center justify-center rounded-md border border-slate-300 bg-white px-7 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
              Cancel
            </button>
            {!isSubmitted && (
              <button
                type='button'
                disabled={disabled}
                onClick={() => save("DRAFT")}
                className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-emerald-600 bg-white px-7 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60'
              >
                <Save className='h-4 w-4' />
                Save as Draft
              </button>
            )}
            <button
              type='button'
              disabled={disabled}
              onClick={() => save("SUBMITTED")}
              className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-7 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60'
            >
              <Send className='h-4 w-4' />
              {busy ? "Saving..." : "Save & Submit"}
            </button>
          </div>
        </div>

        {/* =====================================================
            SIDE PANELS
        ====================================================== */}

        <aside className='min-w-0 space-y-4'>
          <div className={`${sectionClass} p-4`}>
            <h3 className='text-base font-bold text-emerald-900'>Daily Weather Summary</h3>
            <p className='mb-3 text-sm font-semibold text-slate-700'>{formatDate(entryDate)}</p>
            {!stationId ? (
              <p className='py-6 text-center text-sm text-slate-500'>Select a weather station to see the summary.</p>
            ) : summary.error ? (
              <ErrorState message={summary.error.message} onRetry={summary.reload} />
            ) : !daily ? (
              <p className='py-6 text-center text-sm text-slate-500'>{summary.loading ? "Loading..." : "No saved entry for this day."}</p>
            ) : (
              <ul className='divide-y divide-slate-100'>
                {summaryRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <li key={row.label} className='flex items-center justify-between gap-2 py-2 text-sm'>
                      <span className='flex items-center gap-2 text-slate-700'>
                        <Icon className={`h-4 w-4 ${row.color}`} />
                        {row.label}
                      </span>
                      <span className='text-right font-semibold text-slate-900'>{row.value}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={`${sectionClass} p-4`}>
            <h3 className='mb-2 text-base font-bold text-emerald-900'>Related Information</h3>
            {!related ? (
              <p className='py-6 text-center text-sm text-slate-500'>{stationId && summary.loading ? "Loading..." : "-"}</p>
            ) : (
              <ul className='divide-y divide-slate-100 text-sm'>
                <li className='flex items-center justify-between gap-2 py-2'>
                  <span className='text-slate-700'>Monthly Cumulative Rainfall</span>
                  <span className='font-semibold text-slate-900'>{withUnit(related.monthlyCumulativeRainfall, "mm")}</span>
                </li>
                <li className='flex items-center justify-between gap-2 py-2'>
                  <span className='text-slate-700'>Year-to-Date Rainfall</span>
                  <span className='font-semibold text-slate-900'>{withUnit(related.yearToDateRainfall, "mm")}</span>
                </li>
                <li className='flex items-center justify-between gap-2 py-2'>
                  <span className='text-slate-700'>
                    Previous Day Rainfall
                    {related.previousDay && <span className='block text-xs text-slate-500'>({formatDate(related.previousDay)})</span>}
                  </span>
                  <span className='font-semibold text-slate-900'>{withUnit(related.previousDayRainfall, "mm")}</span>
                </li>
                <li className='flex items-center justify-between gap-2 py-2'>
                  <span className='text-slate-700'>Compared to Previous Day</span>
                  <span className={`font-semibold ${Number(related.changeVsPreviousDay) > 0 ? "text-emerald-600" : Number(related.changeVsPreviousDay) < 0 ? "text-red-500" : "text-slate-900"}`}>
                    {isBlank(related.changeVsPreviousDay) ? "-" : `${Number(related.changeVsPreviousDay) > 0 ? "▲ +" : Number(related.changeVsPreviousDay) < 0 ? "▼ " : ""}${Number(related.changeVsPreviousDay).toFixed(1)} mm`}
                  </span>
                </li>
              </ul>
            )}
          </div>
        </aside>
      </form>
    </div>
  );
};

export default DailyWeatherEntry;
