// Weather Station Setup (RP1-216): labels only. Every value shown on the page comes from the API.
const weatherStationData = {
  title: "Weather Station Setup",
  subtitle: "Register, configure and manage weather stations (Manual / API / IoT) for your estates.",
  addButton: "Add Weather Station",
  notActive: "Not active yet",

  // The sensor name given to a sensor that is ticked in the form (the backend stores the name as typed).
  defaultSensorNames: {
    RAINFALL: "Tipping Bucket Rain Gauge",
    TEMPERATURE: "Temperature & Humidity Sensor",
    HUMIDITY: "Temperature & Humidity Sensor",
    WIND_SPEED: "Wind Speed Sensor",
    WIND_DIRECTION: "Wind Direction Sensor",
    SUNSHINE: "Solar Radiation Sensor",
  },

  // Badge colours by value (the labels come from the API).
  entryTypeBadge: {
    MANUAL: "bg-amber-100 text-amber-700",
    IOT: "bg-blue-100 text-blue-700",
    API: "bg-purple-100 text-purple-700",
  },
  statusBadge: {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-100 text-slate-600",
  },
  sensorStatusBadge: {
    online: "bg-emerald-100 text-emerald-700",
    offline: "bg-slate-100 text-slate-600",
    faulty: "bg-red-100 text-red-600",
  },
};

export default weatherStationData;
