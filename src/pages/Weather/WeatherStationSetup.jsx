import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  Battery,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Cpu,
  Database,
  Image as ImageIcon,
  Info,
  MapPin,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  Upload,
  Wifi,
  X,
} from "lucide-react";
import Select from "../../components/common/Select";
import TableSkeleton from "../../components/common/TableSkeleton";
import EmptyRow from "../../components/common/EmptyRow";
import ErrorState from "../../components/common/ErrorState";
import PendingBadge from "../../components/common/PendingBadge";
import { api, notifySaved } from "../../lib/api";
import { useApi } from "../../lib/useApi";
import { useForm } from "../../lib/useForm";
import { waitingTitle } from "../../lib/waitingTitle";
import weatherStationData from "../../data/Weather/weatherStationData";

const PER_PAGE = 10;
const EMPTY_FORM = {
  stationName: "",
  stationCode: "",
  estate: "",
  location: "",
  entryType: "",
  status: "active",
  installationDate: "",
  latitude: "",
  longitude: "",
  elevation: "",
  timezone: "Asia/Dhaka",
  dataInterval: "",
  communication: "",
  dataEndpoint: "",
  remarks: "",
};
const FORM_KEYS = Object.keys(EMPTY_FORM);

const labelClass = "mb-1 block text-xs font-semibold text-slate-700";
const boxClass = (error) =>
  `h-10 w-full rounded-md border bg-white px-3 text-sm outline-none focus:border-emerald-600 ${error ? "border-red-500" : "border-slate-300"}`;
const today = () => new Date().toISOString().slice(0, 10);

const useDebounced = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(String(value).length === 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};
const formatDateTime = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return `${formatDate(value)}, ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
};
const show = (value) => (value === null || value === undefined || value === "" ? "-" : value);

const NotActive = () => (
  <span className='ml-2 inline-block whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500'>{weatherStationData.notActive}</span>
);

const CardTitle = ({ icon: Icon, children, tag }) => (
  <h3 className='mb-3 flex items-center gap-2 text-base font-bold text-slate-900'>
    <Icon className='h-5 w-5 shrink-0 text-emerald-700' />
    {children}
    {tag && <NotActive />}
  </h3>
);

const Badge = ({ className, children }) => (
  <span className={`inline-block whitespace-nowrap rounded-md px-2.5 py-0.5 text-xs font-semibold ${className}`}>{children}</span>
);

const Detail = ({ label, children }) => (
  <div className='flex gap-2 py-1 text-sm'>
    <dt className='w-36 shrink-0 font-semibold text-slate-800'>{label}</dt>
    <dd className='min-w-0 break-words text-slate-700'>
      <span className='mr-2 text-slate-400'>:</span>
      {children}
    </dd>
  </div>
);

const ReadOnly = ({ label, value, tag, suffix }) => (
  <div>
    <p className='mb-1 text-xs font-semibold text-slate-700'>
      {label}
      {tag && <NotActive />}
    </p>
    <div className='flex min-h-10 items-center justify-between gap-2 break-all rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700'>
      <span>{show(value)}</span>
      {suffix && value !== null && value !== undefined && value !== "" && <span className='text-slate-500'>{suffix}</span>}
    </div>
  </div>
);

const WeatherStationSetup = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // the station (with its sensors) in the popup; none = a new one

  // The popup's parts that are not plain inputs.
  const [params, setParams] = useState([]); // ticked sensor parameters
  const [mapping, setMapping] = useState([]); // ticked data mapping values
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoRemoved, setPhotoRemoved] = useState(false);
  const photoInput = useRef(null);

  const searchText = useDebounced(search.trim());

  // =========================================================
  // DATA
  // =========================================================

  const options = useApi(() => api.get("/weather-stations/filter-options"), []);
  const estateOptions = useApi(() => api.get("/options/estates"), []);
  // The server lists by Station ID, so the stations are loaded together (up to its 100 limit) and the latest updated is shown first.
  const list = useApi(() => api.get("/weather-stations", { search: searchText, perPage: 100 }), [searchText]);
  const sorted = [...(list.data?.data ?? [])].sort((x, y) => new Date(y.updatedAt) - new Date(x.updatedAt));
  const rows = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const total = sorted.length;
  const totalPages = Math.max(Math.ceil(total / PER_PAGE), 1);
  const from = rows.length > 0 ? (page - 1) * PER_PAGE + 1 : 0;
  const to = (page - 1) * PER_PAGE + rows.length;

  // The first station is shown until one is clicked.
  const firstId = rows[0]?.id ?? null;
  useEffect(() => {
    if (!selectedId && firstId) setSelectedId(firstId);
  }, [firstId, selectedId]);

  // A page that no longer exists (after a search) steps back.
  useEffect(() => {
    if (!list.loading && list.data && rows.length === 0 && page > 1) setPage(page - 1);
  }, [list.loading, list.data, rows.length, page]);

  const detail = useApi(() => (selectedId ? api.get(`/weather-stations/${selectedId}`) : Promise.resolve(null)), [selectedId]);
  const station = detail.data;

  const entryTypes = options.data?.entryTypes ?? [];
  const dataIntervals = options.data?.dataIntervals ?? [];
  const communications = options.data?.communications ?? [];
  const timezones = options.data?.timezones ?? [];
  const parameters = options.data?.parameters ?? [];
  const sensorStatuses = options.data?.sensorStatuses ?? [];
  const dataMappingOptions = options.data?.dataMapping ?? [];
  const statuses = options.data?.statuses ?? [];
  const photoTypes = (options.data?.photoTypes ?? ["JPG", "PNG", "WEBP"]).join(", ");
  const maxPhotoMb = options.data?.maxPhotoMb ?? 2;
  const labelFrom = (items, value) => items.find((item) => item.value === value)?.label ?? show(value);

  // =========================================================
  // FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY_FORM });

  const waiting = editing ? (station?.id === editing.id ? station.pendingRequest : editing.pendingRequest) : null;
  const shownPhoto = photoPreview ?? (!photoRemoved ? editing?.photoUrl : null) ?? null;

  const clearPhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoRemoved(false);
    if (photoInput.current) photoInput.current.value = "";
  };

  const openNew = async (estateId = "") => {
    let stationCode = "";
    try {
      stationCode = (await api.get("/weather-stations/next-code"))?.stationCode ?? "";
    } catch {
      // the Station ID can be typed
    }
    clearPhoto();
    setEditing(null);
    setParams([]);
    setMapping([]);
    reset({ ...EMPTY_FORM, stationCode, estate: estateId });
    setFormOpen(true);
  };

  // Sent here from Daily Weather Entry (an estate with no active station): the Add popup opens with that estate chosen.
  const location = useLocation();
  const navigate = useNavigate();
  const newForEstate = location.state?.newStationEstate;
  useEffect(() => {
    if (!newForEstate) return;
    openNew(newForEstate);
    navigate(location.pathname, { replace: true, state: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newForEstate]);

  const openEdit = (row) => {
    clearPhoto();
    setEditing(row);
    setParams([...new Set((row.sensors ?? []).map((sensor) => sensor.parameter))]);
    setMapping(row.dataMapping ?? []);
    reset(Object.fromEntries(FORM_KEYS.map((key) => [key, key === "installationDate" ? String(row[key] ?? "").slice(0, 10) : (row[key] ?? "")])));
    setFormOpen(true);
  };

  const closeForm = () => {
    clearPhoto();
    setFormOpen(false);
    setEditing(null);
    reset(EMPTY_FORM);
  };

  const toggle = (setter) => (value) => setter((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  const toggleParam = toggle(setParams);
  const toggleMapping = toggle(setMapping);

  const pickPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error(`Use a ${photoTypes} image.`);
      event.target.value = "";
      return;
    }
    if (file.size > maxPhotoMb * 1024 * 1024) {
      toast.error(`The photo must be ${maxPhotoMb} MB or smaller.`);
      event.target.value = "";
      return;
    }
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoRemoved(false);
  };

  const removePhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoRemoved(true);
    if (photoInput.current) photoInput.current.value = "";
  };

  // The ticked parameters become sensor rows: a sensor the station already has keeps its name and status.
  const sensorRows = () => {
    const kept = (editing?.sensors ?? []).filter((sensor) => params.includes(sensor.parameter)).map(({ sensorName, parameter, unit, status }) => ({ sensorName, parameter, unit, status }));
    const added = params
      .filter((parameter) => !kept.some((sensor) => sensor.parameter === parameter))
      .map((parameter) => ({
        sensorName: weatherStationData.defaultSensorNames[parameter] ?? parameter,
        parameter,
        unit: parameters.find((item) => item.value === parameter)?.unit ?? null,
        status: "online",
      }));
    return [...kept, ...added];
  };

  const optionalText = (value) => (String(value).trim() === "" ? null : String(value).trim());
  const optionalNumber = (value) => (String(value).trim() === "" ? null : Number(value));

  const onSubmit = async (values) => {
    try {
      let photo = photoRemoved ? null : (editing?.photo ?? null);
      if (photoFile) photo = (await api.upload(photoFile)).id;
      const body = {
        stationCode: values.stationCode.trim(),
        stationName: values.stationName.trim(),
        estate: values.estate,
        location: values.location.trim(),
        entryType: values.entryType,
        status: values.status,
        deviceId: editing?.deviceId ?? null,
        installationDate: optionalText(values.installationDate),
        dataInterval: optionalText(values.dataInterval),
        communication: optionalText(values.communication),
        dataEndpoint: optionalText(values.dataEndpoint),
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        elevation: optionalNumber(values.elevation),
        timezone: values.timezone || "Asia/Dhaka",
        photo,
        dataMapping: mapping,
        remarks: optionalText(values.remarks),
        sensors: sensorRows(),
      };
      const result = editing ? await api.put(`/weather-stations/${editing.id}`, body) : await api.post("/weather-stations", body);
      notifySaved(result, editing ? "Weather station updated successfully!" : "Weather station saved successfully!");
      closeForm();
      // The saved station is now the latest updated, so the list goes back to its first page.
      setPage(1);
      if (!editing) {
        setSearch("");
        if (result?.id && !result.pending) setSelectedId(result.id);
      }
      list.reload();
      detail.reload();
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
    }
  };

  const entryType = watch("entryType");
  const pageButton = "flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";
  const card = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

  const fieldError = (name) => errors[name] && <p className='mt-1 text-xs text-red-500'>{errors[name].message}</p>;

  return (
    <div className='w-full space-y-4'>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className='flex flex-col gap-3 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600'>
            <CloudSun className='h-7 w-7' />
          </div>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>{weatherStationData.title}</h2>
            <p className='text-sm text-slate-600'>{weatherStationData.subtitle}</p>
          </div>
        </div>
        <button
          type='button'
          onClick={() => openNew()}
          className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-5 text-sm font-semibold text-white hover:bg-emerald-900'
        >
          <Plus className='h-4 w-4' />
          {weatherStationData.addButton}
        </button>
      </div>

      {/* =====================================================
          STATION LIST + STATION DETAILS
      ====================================================== */}

      <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
        <div className={card}>
          <CardTitle icon={Cpu}>Weather Stations</CardTitle>
          <div className='relative'>
            <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <input
              type='text'
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder='Search by station name, estate or ID...'
              className='h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-600'
            />
          </div>

          <div className='mt-3 overflow-x-auto'>
            <table className='w-full min-w-[460px] text-left text-sm'>
              <thead>
                <tr className='text-slate-800'>
                  <th className='px-2 py-2 font-bold'>#</th>
                  <th className='px-2 py-2 font-bold'>Station Name</th>
                  <th className='px-2 py-2 font-bold'>Estate</th>
                  <th className='px-2 py-2 font-bold'>Type</th>
                  <th className='px-2 py-2 font-bold'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {list.loading && !list.data ? (
                  <TableSkeleton rows={5} columns={5} />
                ) : list.error ? (
                  <tr>
                    <td colSpan={5} className='p-4'>
                      <ErrorState message={list.error.message} onRetry={list.reload} />
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <EmptyRow columns={5} message='No weather stations found' />
                ) : (
                  rows.map((row, index) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={`cursor-pointer hover:bg-emerald-50/60 ${row.id === selectedId ? "bg-emerald-50" : ""}`}
                    >
                      <td className='px-2 py-2.5'>{(page - 1) * PER_PAGE + index + 1}</td>
                      <td className='px-2 py-2.5 font-semibold text-slate-900'>{row.stationName}</td>
                      <td className='px-2 py-2.5 text-slate-700'>{show(row.estateName)}</td>
                      <td className='px-2 py-2.5'>
                        <Badge className={weatherStationData.entryTypeBadge[row.entryType] ?? "bg-slate-100 text-slate-600"}>{row.entryTypeLabel}</Badge>
                      </td>
                      <td className='px-2 py-2.5'>
                        <PendingBadge row={row} />
                        <Badge className={weatherStationData.statusBadge[row.status] ?? "bg-slate-100 text-slate-600"}>{row.statusLabel}</Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className='mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-xs font-semibold text-slate-600'>
              Showing {from} to {to} of {total} entries
            </p>
            <div className='flex items-center gap-1'>
              <button type='button' aria-label='Previous page' disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className={pageButton}>
                <ChevronLeft className='h-4 w-4' />
              </button>
              <span className='flex h-8 min-w-8 items-center justify-center rounded-md bg-emerald-800 px-2 text-xs font-semibold text-white'>{page}</span>
              <button type='button' aria-label='Next page' disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} className={pageButton}>
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>

        <div className={card}>
          <div className='mb-3 flex items-center justify-between gap-2'>
            <h3 className='flex min-w-0 items-center gap-2 text-base font-bold text-slate-900'>
              <Settings className='h-5 w-5 shrink-0 text-emerald-700' />
              <span className='truncate'>Station Details{station ? ` – ${station.stationName}` : ""}</span>
            </h3>
            <button
              type='button'
              disabled={!station || Boolean(station.pendingRequest)}
              title={station ? waitingTitle(station, "Edit") : "Edit"}
              onClick={() => openEdit(station)}
              className='flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
            >
              <Pencil className='h-4 w-4' />
              Edit
            </button>
          </div>

          {detail.error ? (
            <ErrorState message={detail.error.message} onRetry={detail.reload} />
          ) : !station ? (
            <p className='py-10 text-center text-sm text-slate-500'>{detail.loading || list.loading ? "Loading..." : "Select a weather station to see its details."}</p>
          ) : (
            <div className='flex flex-col gap-4 sm:flex-row'>
              <div className='flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 sm:w-52'>
                {station.photoUrl ? <img src={station.photoUrl} alt={station.stationName} className='h-full w-full object-cover' /> : <ImageIcon className='h-12 w-12 text-slate-300' />}
              </div>
              <dl className='min-w-0 flex-1'>
                {station.pendingRequest && (
                  <p role='status' className='mb-2 rounded-md bg-amber-50 px-3 py-1.5 text-xs text-amber-700'>
                    Waiting for approval ({station.pendingRequest.requestNo}).
                  </p>
                )}
                <Detail label='Station ID'>{show(station.stationCode)}</Detail>
                <Detail label='Station Name'>{show(station.stationName)}</Detail>
                <Detail label='Estate'>{show(station.estateName)}</Detail>
                <Detail label='Location / Division'>{show(station.location)}</Detail>
                <Detail label='Entry Type'>
                  <Badge className={weatherStationData.entryTypeBadge[station.entryType] ?? "bg-slate-100 text-slate-600"}>{station.entryTypeLabel}</Badge>
                </Detail>
                <Detail label='Device ID'>
                  {show(station.deviceId)}
                  {station.entryType !== "MANUAL" && <NotActive />}
                </Detail>
                <Detail label='Installation Date'>{formatDate(station.installationDate)}</Detail>
                <Detail label='Last Data Received'>{formatDateTime(station.lastDataReceived)}</Detail>
                <Detail label='Status'>
                  <Badge className={weatherStationData.statusBadge[station.status] ?? "bg-slate-100 text-slate-600"}>{station.statusLabel}</Badge>
                </Detail>
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          CONFIGURATION + SENSORS
      ====================================================== */}

      {station && (
        <>
          <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
            <div className={card}>
              <CardTitle icon={Settings}>Station Configuration</CardTitle>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <ReadOnly label='Entry Type' value={station.entryTypeLabel} />
                <ReadOnly label='Timezone' value={station.timezoneLabel} />
                <ReadOnly label='Latitude' value={station.latitude} />
                <ReadOnly label='Longitude' value={station.longitude} />
                <ReadOnly label='Elevation' value={station.elevation} suffix='m' />
                <ReadOnly label='Data Interval' value={station.dataIntervalLabel} tag />
                <ReadOnly label='Communication' value={station.communicationLabel} tag />
                <div className='sm:col-span-2'>
                  <ReadOnly label='Data Endpoint (API URL)' value={station.dataEndpoint} tag />
                </div>
              </div>
            </div>

            <div className={card}>
              <CardTitle icon={Cpu} tag>
                Installed Sensors
              </CardTitle>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[420px] text-left text-sm'>
                  <thead>
                    <tr className='text-slate-800'>
                      <th className='px-2 py-2 font-bold'>#</th>
                      <th className='px-2 py-2 font-bold'>Sensor</th>
                      <th className='px-2 py-2 font-bold'>Parameter</th>
                      <th className='px-2 py-2 font-bold'>Unit</th>
                      <th className='px-2 py-2 font-bold'>Status</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-100'>
                    {(station.sensors ?? []).length === 0 ? (
                      <EmptyRow columns={5} message='No sensors installed' />
                    ) : (
                      station.sensors.map((sensor, index) => (
                        <tr key={sensor.id ?? index}>
                          <td className='px-2 py-2'>{index + 1}</td>
                          <td className='px-2 py-2 font-medium text-slate-800'>{sensor.sensorName}</td>
                          <td className='px-2 py-2 text-slate-700'>{labelFrom(parameters, sensor.parameter)}</td>
                          <td className='px-2 py-2 text-slate-700'>{show(sensor.unit)}</td>
                          <td className='px-2 py-2'>
                            <Badge className={weatherStationData.sensorStatusBadge[sensor.status] ?? "bg-slate-100 text-slate-600"}>{labelFrom(sensorStatuses, sensor.status)}</Badge>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* =====================================================
              DATA MAPPING + CONNECTIVITY & HEALTH
          ====================================================== */}

          <div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
            <div className={card}>
              <CardTitle icon={Database} tag>
                Data Mapping
              </CardTitle>
              <div className='grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3'>
                {dataMappingOptions.map((option) => (
                  <label key={option.value} className='pointer-events-none flex items-center gap-2 text-sm text-slate-700'>
                    <input type='checkbox' readOnly tabIndex={-1} checked={(station.dataMapping ?? []).includes(option.value)} className='h-4 w-4 accent-emerald-700' />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div className={card}>
              <CardTitle icon={Activity} tag>
                Connectivity &amp; Health
              </CardTitle>
              <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
                {[
                  { icon: Wifi, label: "Connectivity", value: station.connectivity },
                  { icon: Database, label: "Last Data", value: station.lastDataReceived ? formatDateTime(station.lastDataReceived) : null },
                  { icon: Activity, label: "Data Interval", value: station.dataIntervalLabel },
                  { icon: Battery, label: "Device Health", value: station.deviceHealth },
                ].map((item) => (
                  <div key={item.label} className='flex flex-col items-center rounded-lg border border-slate-200 bg-slate-50 p-3 text-center'>
                    <item.icon className='h-6 w-6 text-emerald-700' />
                    <p className='mt-1 text-xs text-slate-600'>{item.label}</p>
                    <p className='mt-0.5 text-sm font-bold text-slate-900'>{show(item.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* =====================================================
          ADD / EDIT POPUP
      ====================================================== */}

      {formOpen && (
        <div
          className='fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-6'
          onMouseDown={(event) => event.target === event.currentTarget && closeForm()}
        >
          <form onSubmit={handleSubmit(onSubmit)} role='dialog' aria-modal='true' className='w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl'>
            <div className='flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4'>
              <div className='flex items-center gap-3'>
                <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600'>
                  <CloudSun className='h-6 w-6' />
                </div>
                <div>
                  <h2 className='text-lg font-bold text-slate-900'>{editing ? "Edit Weather Station" : "Add Weather Station"}</h2>
                  <p className='text-xs text-slate-600'>Register a weather station for weather data collection (Manual / API / IoT).</p>
                </div>
              </div>
              <button type='button' onClick={closeForm} aria-label='Close' title='Close' className='flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-600 hover:bg-slate-100'>
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='max-h-[72vh] overflow-y-auto p-5'>
              {waiting && (
                <p role='status' className='mb-4 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700'>
                  Waiting for approval ({waiting.requestNo}). This station cannot be saved until the request is decided.
                </p>
              )}

              <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                {/* ---------- left column ---------- */}
                <div className='space-y-4'>
                  <div className='rounded-lg border border-slate-200'>
                    <h4 className='flex items-center gap-2 rounded-t-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-900'>
                      <Info className='h-4 w-4 text-emerald-700' />
                      Basic Information
                    </h4>
                    <div className='grid grid-cols-1 gap-3 p-3 sm:grid-cols-2'>
                      <div>
                        <label className={labelClass}>
                          Station Name <span className='text-red-500'>*</span>
                        </label>
                        <input type='text' maxLength={120} {...register("stationName", { required: "Station Name is required" })} className={boxClass(errors.stationName)} />
                        {fieldError("stationName")}
                      </div>
                      <div>
                        <label className={labelClass}>
                          Station ID <span className='text-red-500'>*</span>
                        </label>
                        <input type='text' maxLength={20} placeholder='e.g. WS-005' {...register("stationCode", { required: "Station ID is required" })} className={boxClass(errors.stationCode)} />
                        {fieldError("stationCode")}
                      </div>
                      <div>
                        <label className={labelClass}>
                          Estate <span className='text-red-500'>*</span>
                        </label>
                        <Select {...register("estate", { required: "Estate is required" })} className={`${boxClass(errors.estate)} cursor-pointer`}>
                          <option value=''>Select Estate</option>
                          {(estateOptions.data ?? []).map((estate) => (
                            <option key={estate.id} value={estate.value}>
                              {estate.label}
                            </option>
                          ))}
                        </Select>
                        {fieldError("estate")}
                      </div>
                      <div>
                        <label className={labelClass}>
                          Division / Location <span className='text-red-500'>*</span>
                        </label>
                        <input type='text' maxLength={160} placeholder='e.g. North Division' {...register("location", { required: "Division / Location is required" })} className={boxClass(errors.location)} />
                        {fieldError("location")}
                      </div>
                      <div>
                        <label className={labelClass}>
                          Station Type / Entry Type <span className='text-red-500'>*</span>
                        </label>
                        <Select {...register("entryType", { required: "Entry Type is required" })} className={`${boxClass(errors.entryType)} cursor-pointer`}>
                          <option value=''>Select Entry Type</option>
                          {entryTypes.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                        {fieldError("entryType")}
                      </div>
                      <div>
                        <label className={labelClass}>
                          Status <span className='text-red-500'>*</span>
                        </label>
                        <Select {...register("status", { required: "Status is required" })} className={`${boxClass(errors.status)} cursor-pointer`}>
                          {statuses.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                        {fieldError("status")}
                      </div>
                      <div>
                        <label className={labelClass}>Installation Date</label>
                        <input
                          type='date'
                          max={today()}
                          {...register("installationDate", { validate: (value) => !value || value <= today() || "Installation date cannot be in the future." })}
                          className={boxClass(errors.installationDate)}
                        />
                        {fieldError("installationDate")}
                      </div>
                    </div>
                  </div>

                  <div className='rounded-lg border border-slate-200'>
                    <h4 className='flex items-center gap-2 rounded-t-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-900'>
                      <MapPin className='h-4 w-4 text-emerald-700' />
                      Location &amp; Time
                    </h4>
                    <div className='grid grid-cols-1 gap-3 p-3 sm:grid-cols-2'>
                      <div>
                        <label className={labelClass}>
                          Latitude <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='number'
                          step='any'
                          placeholder='e.g. 24.9045'
                          {...register("latitude", {
                            required: "Latitude is required",
                            validate: (value) => (Number(value) >= -90 && Number(value) <= 90) || "Latitude must be between -90 and 90.",
                          })}
                          className={boxClass(errors.latitude)}
                        />
                        {fieldError("latitude")}
                      </div>
                      <div>
                        <label className={labelClass}>
                          Longitude <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='number'
                          step='any'
                          placeholder='e.g. 91.8632'
                          {...register("longitude", {
                            required: "Longitude is required",
                            validate: (value) => (Number(value) >= -180 && Number(value) <= 180) || "Longitude must be between -180 and 180.",
                          })}
                          className={boxClass(errors.longitude)}
                        />
                        {fieldError("longitude")}
                      </div>
                      <div>
                        <label className={labelClass}>Elevation (m)</label>
                        <input type='number' step='any' placeholder='e.g. 110' {...register("elevation")} className={boxClass(errors.elevation)} />
                        {fieldError("elevation")}
                      </div>
                      <div>
                        <label className={labelClass}>Timezone</label>
                        <Select {...register("timezone")} className={`${boxClass(errors.timezone)} cursor-pointer`}>
                          {timezones.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                        {fieldError("timezone")}
                      </div>
                    </div>
                  </div>

                  <div className='rounded-lg border border-slate-200'>
                    <h4 className='flex items-center gap-2 rounded-t-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-900'>
                      <Wifi className='h-4 w-4 text-emerald-700' />
                      Communication &amp; Data
                      {entryType !== "MANUAL" && entryType !== "" ? <NotActive /> : null}
                    </h4>
                    <div className='grid grid-cols-1 gap-3 p-3 sm:grid-cols-2'>
                      <div>
                        <label className={labelClass}>Data Interval</label>
                        <Select {...register("dataInterval")} className={`${boxClass(errors.dataInterval)} cursor-pointer`}>
                          <option value=''>Select Data Interval</option>
                          {dataIntervals.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                        {fieldError("dataInterval")}
                      </div>
                      <div>
                        <label className={labelClass}>Communication</label>
                        <Select {...register("communication")} className={`${boxClass(errors.communication)} cursor-pointer`}>
                          <option value=''>Select Communication</option>
                          {communications.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                        {fieldError("communication")}
                      </div>
                      <div className='sm:col-span-2'>
                        <label className={labelClass}>Data Endpoint (API URL)</label>
                        <input type='text' maxLength={255} placeholder='https://' {...register("dataEndpoint")} className={boxClass(errors.dataEndpoint)} />
                        {fieldError("dataEndpoint")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------- right column ---------- */}
                <div className='space-y-4'>
                  <div className='rounded-lg border border-slate-200'>
                    <h4 className='flex items-center gap-2 rounded-t-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-900'>
                      <ImageIcon className='h-4 w-4 text-emerald-700' />
                      Station Image <span className='text-xs font-normal text-slate-500'>(Optional)</span>
                    </h4>
                    <div className='flex flex-col items-center gap-3 p-3 sm:flex-row'>
                      <div className='flex h-36 w-full items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 sm:w-56'>
                        {shownPhoto ? <img src={shownPhoto} alt='Station' className='h-full w-full object-cover' /> : <ImageIcon className='h-10 w-10 text-slate-300' />}
                      </div>
                      <div className='flex flex-col items-center gap-2'>
                        <input ref={photoInput} type='file' accept='image/jpeg,image/png,image/webp' onChange={pickPhoto} className='hidden' />
                        <button
                          type='button'
                          onClick={() => photoInput.current?.click()}
                          className='flex h-10 cursor-pointer items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-700 hover:bg-blue-100'
                        >
                          <Upload className='h-4 w-4' />
                          Upload Image
                        </button>
                        {shownPhoto && (
                          <button type='button' onClick={removePhoto} className='cursor-pointer text-xs font-semibold text-red-500 hover:underline'>
                            Remove image
                          </button>
                        )}
                        <p className='text-xs text-slate-500'>
                          {photoTypes} (Max {maxPhotoMb} MB)
                        </p>
                        {errors.photo && <p className='text-xs text-red-500'>{errors.photo.message}</p>}
                      </div>
                    </div>
                  </div>

                  <div className='rounded-lg border border-slate-200'>
                    <h4 className='flex items-center gap-2 rounded-t-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-900'>
                      <Cpu className='h-4 w-4 text-emerald-700' />
                      Installed Sensors
                      <NotActive />
                    </h4>
                    <div className='overflow-x-auto p-3'>
                      <table className='w-full min-w-[360px] text-left text-sm'>
                        <thead>
                          <tr className='text-xs text-slate-800'>
                            <th className='w-8 py-1.5' />
                            <th className='py-1.5 pr-2 font-bold'>Sensor</th>
                            <th className='py-1.5 pr-2 font-bold'>Parameter</th>
                            <th className='py-1.5 font-bold'>Unit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parameters.map((parameter) => (
                            <tr key={parameter.value}>
                              <td className='py-1.5'>
                                <input
                                  type='checkbox'
                                  aria-label={parameter.label}
                                  checked={params.includes(parameter.value)}
                                  onChange={() => toggleParam(parameter.value)}
                                  className='h-4 w-4 cursor-pointer accent-emerald-700'
                                />
                              </td>
                              <td className='py-1.5 pr-2 text-slate-800'>{weatherStationData.defaultSensorNames[parameter.value] ?? parameter.label}</td>
                              <td className='py-1.5 pr-2 text-slate-700'>{parameter.label}</td>
                              <td className='py-1.5 text-slate-700'>{show(parameter.unit)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className='rounded-lg border border-slate-200'>
                    <h4 className='flex items-center gap-2 rounded-t-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-900'>
                      <Database className='h-4 w-4 text-emerald-700' />
                      Data Mapping
                      <NotActive />
                    </h4>
                    <div className='grid grid-cols-1 gap-x-4 gap-y-2 p-3 sm:grid-cols-2'>
                      {dataMappingOptions.map((option) => (
                        <label key={option.value} className='flex cursor-pointer items-center gap-2 text-sm text-slate-700'>
                          <input type='checkbox' checked={mapping.includes(option.value)} onChange={() => toggleMapping(option.value)} className='h-4 w-4 cursor-pointer accent-emerald-700' />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className='rounded-lg border border-slate-200'>
                    <h4 className='flex items-center gap-2 rounded-t-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-slate-900'>
                      <Info className='h-4 w-4 text-emerald-700' />
                      Remarks
                    </h4>
                    <div className='p-3'>
                      <textarea
                        rows={3}
                        maxLength={500}
                        placeholder='Optional'
                        {...register("remarks")}
                        className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600 ${errors.remarks ? "border-red-500" : "border-slate-300"}`}
                      />
                      {fieldError("remarks")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end'>
              <button type='button' onClick={closeForm} className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 px-7 text-sm font-semibold text-slate-700 hover:bg-slate-50'>
                <X className='h-4 w-4' />
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting || Boolean(waiting)}
                className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-800 px-7 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60'
              >
                <Save className='h-4 w-4' />
                {isSubmitting ? "Saving..." : editing ? "Update Station" : "Save Station"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WeatherStationSetup;
