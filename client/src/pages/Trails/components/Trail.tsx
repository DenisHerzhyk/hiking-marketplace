import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import api from "../../../axios.ts";
import { Trail } from "../interfaces/TrailInterface";
import TrailMap from "../map/TrailMap";
import { LatLngTuple } from "leaflet";
import toast from "react-hot-toast";
import TrailDetailsSkeleton from "../../../shared/loading/TrailDetailsSkeleton";

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
  const [trailLoading, setTrailLoading] = useState(true);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [weather, setWeather] = useState<any>(null);
  const [suggestion, setSuggestion] = useState<any>(null);
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
      } finally {
        setTrailLoading(false);
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

    const res = await api.get("/api/open-meteo/elevation", {
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

    try {
      const res = await api.get("/api/open-meteo/forecast", {
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
    } catch (err) {
      toast.error("Problem with fetching the weather.");
      console.error(err);
      return null;
    }
  };

  const handleGetSuggestion = async () => {
    if (!date || !trail) return;

    const dateNow = new Date();
    const selectedDate = new Date(date);
    const daysDiff = Math.ceil(
      (selectedDate.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysDiff >= 16) {
      toast.error("The date should not exceed 15 days after the current date");
      return null;
    }
    setLoadingAI(true);
    setSuggestion("");

    try {
      const w = await fetchWeather();

      if (!w || !w.temperature_2m_max) {
        toast.error("Failed to fetch weather data.");
        setLoadingAI(false);
        return;
      }

      setWeather(w);

      const weatherDesc = {
        temp: w.temperature_2m_max[0],
        precipitation: w.precipitation_sum[0],
        wind: w.windspeed_10m_max[0],
        code: w.weathercode[0],
      };

      const res = await api.post(
        "/api/ai/suggest",
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
      toast.error("Failed to get AI suggestion.");
      console.log(e);
      setSuggestion(null);
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
    const res = await api.post("/api/ors/hiking-route", {
      coordinates: [
        [lon, lat],
        [endLon, endLat],
      ],
    });
    return res.data;
  };

  const t = trail.tags;

  if (trailLoading) return <TrailDetailsSkeleton />;

  return (
    <div className="px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[140px] pb-[80px] w-full max-w-[840px] mx-auto overflow-hidden">
      <Link
        to="/trails"
        className="inline-flex items-center gap-1 text-sm text-stone-400 mb-6 hover:text-stone-700 transition-colors"
      >
        ← Back to trails
      </Link>
      <div className="flex justify-between items-start flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-stone-800 mb-1">
            {t.name ?? "Unnamed trail"}
          </h1>
          <p className="text-sm text-stone-400">
            {(networkLabel[t.network ?? ""] ?? t.network ?? "NWN") + " "}
            route
          </p>
        </div>
        <span className="text-xs font-medium bg-stone-100 text-stone-600 px-3 py-1.5 rounded-full border border-stone-200">
          {difficulty}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-5">
        <div className="overflow-hidden rounded-xl">
          <img
            src={trail?.tags?.photos?.[0]}
            alt={`${t.name} 1`}
            className="w-full h-[220px] mobile:h-[280px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
          {(trail?.tags?.photos ?? []).slice(1, 5).map((photo, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <img
                src={photo}
                alt={`${t.name} ${i + 2}`}
                className="w-full h-[140px] mobile:h-[200px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      <TrailMap geometry={geometry} />
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: "Distance", value: distance },
          { label: "Ascent", value: ascent },
          { label: "Difficulty", value: difficulty },
          {
            label: "Network",
            value: networkLabel[t.network ?? "NWN"] ?? "NWN",
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-stone-50 rounded-xl p-4 border border-stone-100"
          >
            <p className="text-[11px] text-stone-400 uppercase tracking-wider mb-1 font-medium">
              {label}
            </p>
            <p className="text-lg font-semibold text-stone-800">{value}</p>
          </div>
        ))}
      </div>
      <div className="border border-stone-200 rounded-xl p-5 mb-4">
        <p className="text-[11px] font-semibold tracking-widest text-stone-400 uppercase mb-3">
          Plan your hike
        </p>
        <div className="flex flex-col mobile:flex-row gap-3 items-stretch mobile:items-end">
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <label className="text-xs text-stone-500 font-medium">
              Select date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-500 transition-colors w-full"
            />
          </div>
          <button
            onClick={handleGetSuggestion}
            disabled={!date || loadingAI}
            className="px-5 py-2.5 text-sm font-medium bg-white border border-stone-300 text-stone-700 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {loadingAI ? "Thinking..." : "Get AI suggestion"}
          </button>
        </div>
      </div>
      {suggestion && typeof suggestion === "object" && (
        <div className="border border-stone-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-sm border border-stone-200">
              🤖
            </div>
            <p className="text-sm font-semibold text-stone-700">
              AI gear suggestion
            </p>
          </div>

          <div className="grid grid-cols-1 mobile:grid-cols-2 gap-4 mb-4">
            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100">
              <p className="text-xs font-semibold text-stone-500 mb-3 uppercase tracking-wider">
                👤 Male combo
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  target="_blank"
                  to={`/product/${suggestion.male.top.id}`}
                  className="text-sm text-stone-700 hover:text-stone-900 font-medium bg-white border border-stone-200 px-3 py-2 rounded-lg hover:border-stone-400 transition-colors"
                >
                  Top: {suggestion.male.top.title}
                </Link>
                <Link
                  target="_blank"
                  to={`/product/${suggestion.male.bottom.id}`}
                  className="text-sm text-stone-700 hover:text-stone-900 font-medium bg-white border border-stone-200 px-3 py-2 rounded-lg hover:border-stone-400 transition-colors"
                >
                  Bottom: {suggestion.male.bottom.title}
                </Link>
              </div>
            </div>

            <div className="bg-stone-50 rounded-lg p-4 border border-stone-100">
              <p className="text-xs font-semibold text-stone-500 mb-3 uppercase tracking-wider">
                👤 Female combo
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  target="_blank"
                  to={`/product/${suggestion.female.top.id}`}
                  className="text-sm text-stone-700 hover:text-stone-900 font-medium bg-white border border-stone-200 px-3 py-2 rounded-lg hover:border-stone-400 transition-colors"
                >
                  Top: {suggestion.female.top.title}
                </Link>
                <Link
                  target="_blank"
                  to={`/product/${suggestion.female.bottom.id}`}
                  className="text-sm text-stone-700 hover:text-stone-900 font-medium bg-white border border-stone-200 px-3 py-2 rounded-lg hover:border-stone-400 transition-colors"
                >
                  Bottom: {suggestion.female.bottom.title}
                </Link>
              </div>
            </div>
          </div>

          <p className="text-xs text-stone-500 bg-stone-50 rounded-lg p-3 border border-stone-100">
            💡 {suggestion.reason}
          </p>
        </div>
      )}
      <Link
        to={`https://www.openstreetmap.org/relation/${trail.id}`}
        target="_blank"
        className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700 transition-colors mt-5"
      >
        View on OpenStreetMap →
      </Link>
    </div>
  );
};

export default TrailDetails;
