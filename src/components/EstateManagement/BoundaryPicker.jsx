import { useEffect, useState } from "react";
import { CircleMarker, MapContainer, Polygon, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Check, Eraser, Undo2, X } from "lucide-react";
import "leaflet/dist/leaflet.css";

const STREET = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const SATELLITE = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

// Adds a point where the map is clicked.
function ClickToAdd({ onAdd }) {
  useMapEvents({ click: (event) => onAdd([event.latlng.lat, event.latlng.lng]) });
  return null;
}

// Fits the map to the saved boundary once, when the picker opens.
function FitOnOpen({ points }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    if (points.length >= 2) map.fitBounds(points, { padding: [30, 30], maxZoom: 18 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return null;
}

// A popup with a map where the boundary of a land is drawn: click to add corners, undo / clear, then use it.
// `value` is [[lat, lng], …] or null; `center` is where the map starts when there is no boundary yet.
export default function BoundaryPicker({ value, center, onCancel, onDone }) {
  const [points, setPoints] = useState(Array.isArray(value) ? value.map((point) => [Number(point[0]), Number(point[1])]) : []);
  const [satellite, setSatellite] = useState(false);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onCancel();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const start = points.length ? points[0] : center;
  return (
    <div className='fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-3 sm:p-4' onMouseDown={onCancel}>
      <div className='flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-xl' onMouseDown={(event) => event.stopPropagation()}>
        <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-5'>
          <div>
            <h2 className='text-base font-semibold text-green-800'>Select Boundary on Map</h2>
            <p className='text-xs text-gray-500'>Click the map to add each corner of the land, in order. At least 3 corners.</p>
          </div>
          <button type='button' onClick={onCancel} className='rounded-lg p-2 text-gray-500 transition hover:bg-gray-100' aria-label='Close'>
            <X size={20} />
          </button>
        </div>

        <div className='relative isolate h-[55vh] min-h-72 w-full'>
          <MapContainer center={start} zoom={points.length ? 17 : 15} className='h-full w-full' zoomControl>
            <TileLayer attribution='&copy; OpenStreetMap contributors' url={satellite ? SATELLITE : STREET} key={satellite ? "sat" : "street"} />
            <ClickToAdd onAdd={(point) => setPoints((current) => [...current, point])} />
            <FitOnOpen points={points} />
            {points.length >= 3 ? (
              <Polygon positions={points} pathOptions={{ color: "#15803d", fillColor: "#22c55e", fillOpacity: 0.35, weight: 3 }} />
            ) : (
              points.length === 2 && <Polyline positions={points} pathOptions={{ color: "#15803d", weight: 3 }} />
            )}
            {points.map((point, index) => (
              <CircleMarker
                key={`${index}-${point[0]}-${point[1]}`}
                center={point}
                radius={6}
                pathOptions={{ color: "#ffffff", fillColor: index === 0 ? "#dc2626" : "#15803d", fillOpacity: 1, weight: 2 }}
              />
            ))}
          </MapContainer>
          <button
            type='button'
            onClick={() => setSatellite((v) => !v)}
            className='absolute right-3 top-3 z-[1000] rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow hover:bg-gray-50'
          >
            {satellite ? "Street" : "Satellite"}
          </button>
        </div>

        <div className='flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5'>
          <p className='text-sm text-gray-600'>
            {points.length} {points.length === 1 ? "corner" : "corners"} selected
            {points.length > 0 && points.length < 3 ? " (add at least 3)" : ""}
          </p>
          <div className='flex flex-col gap-2 sm:flex-row'>
            <button
              type='button'
              onClick={() => setPoints((current) => current.slice(0, -1))}
              disabled={points.length === 0}
              className='flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 transition hover:bg-gray-50 disabled:opacity-50'
            >
              <Undo2 size={16} />
              Undo
            </button>
            <button
              type='button'
              onClick={() => setPoints([])}
              disabled={points.length === 0}
              className='flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 transition hover:bg-gray-50 disabled:opacity-50'
            >
              <Eraser size={16} />
              Clear
            </button>
            <button
              type='button'
              onClick={onCancel}
              className='flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 transition hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={() => onDone(points.length >= 3 ? points : null)}
              disabled={points.length > 0 && points.length < 3}
              className='flex h-10 items-center justify-center gap-2 rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition hover:bg-green-800 disabled:opacity-50'
            >
              <Check size={16} />
              {points.length === 0 ? "Remove boundary" : "Use this boundary"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
