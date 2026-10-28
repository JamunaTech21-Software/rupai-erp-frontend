import { useEffect } from "react";
import { useMap } from "react-leaflet";

// Leaflet only measures its box once; call this inside a <MapContainer> whose box changes size
// (full screen on / off) so the tiles fill the new size. `trigger` is any value that changes with it.
export default function MapResizer({ trigger }) {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 50);
    return () => clearTimeout(timer);
  }, [map, trigger]);
  return null;
}
