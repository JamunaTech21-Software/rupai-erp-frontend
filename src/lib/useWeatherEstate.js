import { api } from "./api";
import { useApi } from "./useApi";

// The estate a weather page opens on: the first one that has an active weather station
// (an estate without one has no weather data), else the first estate. "" until known.
export function useWeatherEstate(estates) {
  const ids = (estates ?? []).map((item) => item.value);
  const picked = useApi(
    async () => {
      if (!ids.length) return "";
      const lists = await Promise.all(ids.map((estate) => api.get("/options/weather-stations", { estate, status: "active" }).catch(() => [])));
      const index = lists.findIndex((list) => list.length > 0);
      return ids[index === -1 ? 0 : index];
    },
    [ids.join(",")],
  );
  return picked.data ?? "";
}

// The most useful text of a failed load: the first field message the API gave, else its message.
export const errorText = (error) => Object.values(error?.fields ?? {})[0] || error?.message || "Something went wrong";
