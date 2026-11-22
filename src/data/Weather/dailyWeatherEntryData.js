// Daily Weather Entry (RP1-219): labels only. Every option and number on the page comes from the API.
const dailyWeatherEntryData = {
  title: "Daily Weather Entry",
  subtitle: "Enter daily weather information for the selected estate and weather station.",
  viewEntries: "View Entries",
  entriesPath: "/weather-entries",

  // The form's keys that carry a number, with the range the server accepts.
  ranges: {
    totalRainfall: [0, 1000],
    morningRainfall: [0, 1000],
    afternoonRainfall: [0, 1000],
    eveningRainfall: [0, 1000],
    maxTemperature: [-10, 60],
    minTemperature: [-10, 60],
    morningTemperature: [-10, 60],
    afternoonTemperature: [-10, 60],
    eveningTemperature: [-10, 60],
    morningHumidity: [0, 100],
    afternoonHumidity: [0, 100],
    maxHumidity: [0, 100],
    minHumidity: [0, 100],
    windSpeed: [0, 300],
    maxWindSpeed: [0, 300],
    sunshineHours: [0, 24],
    cloudCoverage: [0, 100],
  },

  statusBadge: {
    DRAFT: "bg-slate-100 text-slate-700",
    SUBMITTED: "bg-emerald-100 text-emerald-700",
    PENDING: "bg-amber-100 text-amber-700",
  },
};

export default dailyWeatherEntryData;
