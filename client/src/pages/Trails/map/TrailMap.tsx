import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";
import { useEffect } from "react";

const RecenterMap = ({ center }: { center: LatLngTuple }) => {
  const map = useMap();
  useEffect(() => {
    if (center[0] !== 0 && center[1] !== 0) {
      map.setView(center, 13);
    }
  }, [center]);
  return null;
};

const TrailMap = ({ geometry }: { geometry: LatLngTuple[] }) => {
  const center: LatLngTuple =
    geometry.length > 0 ? geometry[Math.floor(geometry.length / 2)] : [0, 0];

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border mb-5">
      <MapContainer center={[0, 0]} zoom={12} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RecenterMap center={center} />
        <Polyline positions={geometry} />
      </MapContainer>
    </div>
  );
};

export default TrailMap;
