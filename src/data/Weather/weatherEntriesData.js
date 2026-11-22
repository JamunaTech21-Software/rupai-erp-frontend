// Weather Entries list (RP1-221): labels only. Every row and option comes from the API.
const weatherEntriesData = {
  title: "Weather Entries",
  addPath: "/weather-daily-entry",

  columns: [
    { key: "sl", label: "SL" },
    { key: "date", label: "Date" },
    { key: "station", label: "Station" },
    { key: "rainfall", label: "Total Rainfall (mm)", center: true },
    { key: "temperature", label: "Max / Min Temp (°C)", center: true },
    { key: "humidity", label: "Avg Humidity (%)", center: true },
    { key: "condition", label: "Condition" },
    { key: "status", label: "Status", center: true },
    { key: "recordedBy", label: "Recorded By" },
    { key: "action", label: "Action", center: true },
  ],

  statusBadge: {
    DRAFT: "bg-slate-100 text-slate-700",
    SUBMITTED: "bg-emerald-100 text-emerald-700",
  },

  // The edit log's action words.
  actions: {
    create: "Created",
    update: "Edited",
    delete: "Deleted",
    restore: "Restored",
  },
};

export default weatherEntriesData;
