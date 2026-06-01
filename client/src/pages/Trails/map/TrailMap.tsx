import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const TrailMap = ({
  name,
  lat,
  lon,
}: {
  name?: string;
  lat?: number;
  lon?: number;
}) => {
  const [center, setCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!name) return;
    const biasParam =
      lat && lon
        ? `&viewbox=${lon - 1},${lat - 1},${lon + 1},${lat + 1}&bounded=1`
        : "";
    axios(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(name)}&format=json&limit=1${biasParam}`,
    )
      .then((res) => res.data)
      .then((data) => {
        if (data.length > 0) {
          setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      });
  }, [name]);

  if (!center)
    return (
      <div className="w-full h-[400px] rounded-xl border border-gray-200 flex items-center justify-center mb-5">
        <p className="text-sm text-gray-400">Loading map...</p>
      </div>
    );

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200 mb-5">
      <MapContainer center={center} zoom={13} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

export default TrailMap;
