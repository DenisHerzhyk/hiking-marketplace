import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

const TrailMap = ({ geometry }: { geometry: LatLngTuple[] }) => {
  const center: LatLngTuple =
    geometry.length > 0
      ? geometry[Math.floor(geometry.length / 2)]
      : ([0, 0] as LatLngTuple);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border mb-5">
      <MapContainer center={center} zoom={12} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Polyline positions={geometry} />
      </MapContainer>
    </div>
  );
};

export default TrailMap;
