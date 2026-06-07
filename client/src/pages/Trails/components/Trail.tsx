import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Trail } from "../interfaces/TrailInterface";
import TrailMap from "../map/TrailMap";
import { LatLngTuple } from "leaflet";

const difficulties = ["Easy", "Moderate", "Hard", "Alpine"];

const networkLabel: Record<string, string> = {
  iwn: "International",
  nwn: "National",
  rwn: "Regional",
  lwn: "Local",
};

const TrailDetails = () => {
  const { state } = useLocation();
  const trail = state?.trail as Trail;
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [suggestion, setSuggestion] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [geometry, setGeometry] = useState<LatLngTuple[]>([]);
  const [distance, setDistance] = useState<string>("-");
  const [ascent, setAscent] = useState<string>("-");

  useEffect(() => {
    const { startLat, startLon, endLat, endLon } = trail?.tags ?? {};
    if (!startLat || !startLon || !endLat || !endLon) return;

    const fetchRoute = async () => {
      try {
        const data = await orsHikingRoute(startLat, startLon, endLat, endLon);
        const coords = data.features[0].geometry.coordinates.map(
          ([lon, lat]: [number, number]) => ({ lat, lon }),
        );
        const distanceKM = (
          data.features[0].properties.summary.distance / 1000
        ).toFixed(1);

        const ascent = await fetchAscent(coords);
        setAscent(`${ascent} m`);
        setDistance(distanceKM);

        const latLngCoords: LatLngTuple[] = coords.map(
          ({ lat, lon }: { lat: number; lon: number }) => [lat, lon],
        );
        setGeometry(latLngCoords);
      } catch (e) {
        console.error("Failed to fetch route", e);
      }
    };

    fetchRoute();
  }, [trail?.tags?.startLat, trail?.tags?.startLon]);

  const difficulty = (() => {
    const key = trail.tags.sac_scale ?? trail.tags.name ?? "";
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    }
    return difficulties[hash % difficulties.length];
  })();

  const fetchAscent = async (coords: { lat: number; lon: number }[]) => {
    const maxPoints = 100;
    const step = Math.max(1, Math.floor(coords.length / maxPoints));
    const sample = coords.filter((_, i) => i % step === 0).slice(0, maxPoints);

    const res = await axios.get("https://api.open-meteo.com/v1/elevation", {
      params: {
        latitude: sample.map((c) => c.lat).join(","),
        longitude: sample.map((c) => c.lon).join(","),
      },
    });

    const elevations: number[] = res.data.elevation;

    let ascent = 0;
    for (let i = 1; i < elevations.length; i++) {
      const diff = elevations[i] - elevations[i - 1];
      if (diff > 0) ascent += diff;
    }

    return Math.round(ascent);
  };
  const fetchWeather = async () => {
    if (!date || !trail) return null;
    const res = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: 47.37,
        longitude: 8.54,
        daily:
          "weathercode,temperature_2m_max,precipitation_sum,windspeed_10m_max",
        timezone: "auto",
        start_date: date,
        end_date: date,
      },
    });
    return res.data.daily;
  };

  const handleGetSuggestion = async () => {
    if (!date || !trail) return;
    setLoadingAI(true);
    setSuggestion("");

    try {
      const w = await fetchWeather();
      setWeather(w);

      const weatherDesc = {
        temp: w.temperature_2m_max[0],
        precipitation: w.precipitation_sum[0],
        wind: w.windspeed_10m_max[0],
        code: w.weathercode[0],
      };

      const res = await axios.post(
        "http://localhost:4996/api/ai/suggest",
        {
          trailName: trail.tags.name,
          difficulty,
          date,
          weather: weatherDesc,
        },
        { withCredentials: true },
      );
      setSuggestion(res.data.suggestion);
    } catch (e) {
      setSuggestion("Failed to get suggestion.");
    } finally {
      setLoadingAI(false);
    }
  };

  const orsHikingRoute = async (
    lat: number,
    lon: number,
    endLat: number,
    endLon: number,
  ) => {
    const res = await axios.post(
      "https://api.openrouteservice.org/v2/directions/foot-hiking/geojson",

      {
        coordinates: [
          [lon, lat],
          [endLon, endLat],
        ],
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_ORS_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  };

  if (!trail) return <p className="text-center mt-[150px]">Loading...</p>;

  const t = trail.tags;

  return (
    <div className="px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[150px] pb-[80px] max-w-[800px] mx-auto">
      <Link
        to="/trails"
        className="text-sm text-gray-400 flex items-center gap-1 mb-6 hover:text-black transition-colors"
      >
        ← Back to trails
      </Link>
      <div className="flex justify-between items-start flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-medium mb-1">
            {t.name ?? "Unnamed trail"}
          </h1>
          <p className="text-sm text-gray-400">
            {networkLabel[t.network ?? ""] ?? t.network ?? "No Network - fix"}{" "}
            route
          </p>
        </div>
        <span className="text-xs bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full">
          {difficulty}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <img
          src={trail?.tags?.photos?.[0]}
          alt={`${t.name} 1`}
          className="w-full h-[250px] rounded-xl object-cover"
        />
        <div className="w-full grid grid-cols-2 gap-2">
          {(trail?.tags?.photos ?? []).slice(1, 5).map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`${t.name} ${i + 2}`}
              className="w-full h-[200px] rounded-xl object-cover"
            />
          ))}
        </div>
      </div>

      <TrailMap geometry={geometry} />
      <div className="grid grid-cols-2 mobile:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Distance", value: distance },
          { label: "Ascent", value: ascent },
          { label: "Difficulty", value: difficulty },
          { label: "Network", value: networkLabel[t.network ?? ""] ?? "—" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-lg p-3">
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="text-lg font-medium">{value}</p>
          </div>
        ))}
      </div>
      <div className="border border-gray-200 rounded-xl p-5 mb-4">
        <p className="text-[11px] font-medium tracking-widest text-gray-400 uppercase mb-3">
          Plan your hike
        </p>
        <div className="flex gap-3 items-end flex-wrap">
          <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
            <label className="text-xs text-gray-500">Select date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black"
            />
          </div>
          <button
            onClick={handleGetSuggestion}
            disabled={!date || loadingAI}
            className="px-5 py-2 text-sm bg-black text-white rounded-lg hover:opacity-75 transition-opacity disabled:opacity-40"
          >
            {loadingAI ? "Thinking..." : "Get AI suggestion"}
          </button>
        </div>
      </div>
      {suggestion && (
        <div className="border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm">
              🤖
            </div>
            <p className="text-sm font-medium">AI gear suggestion</p>
            {weather && (
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                {weather.temperature_2m_max[0]}°C ·{" "}
                {weather.precipitation_sum[0]}mm rain
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
        </div>
      )}
      <Link
        to={`https://www.openstreetmap.org/relation/${trail.id}`}
        target="_blank"
        className="text-xs text-gray-400 hover:text-black transition-colors flex items-center gap-1 mt-5"
      >
        View on OpenStreetMap →
      </Link>
    </div>
  );
};

export default TrailDetails;
