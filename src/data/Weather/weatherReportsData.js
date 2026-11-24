// Weather Reports & Analytics (RP1-233): labels only. Every number on the page comes from the API.
const weatherReportsData = {
  title: "Weather Reports & Analytics",
  subtitle: "Comprehensive analysis and reports on rainfall, temperature, humidity and forecasts.",
  noData: "No weather data for this period.",
  noEstate: "No estate found. Add an estate to see the weather reports.",

  reportTypes: [
    { value: "ALL", label: "All Reports" },
    { value: "RAINFALL", label: "Rainfall" },
    { value: "TEMPERATURE", label: "Temperature" },
    { value: "HUMIDITY", label: "Humidity" },
  ],
};

export default weatherReportsData;
