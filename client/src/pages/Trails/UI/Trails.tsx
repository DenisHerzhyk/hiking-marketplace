import { useState } from "react";
import { Trail } from "../interfaces/TrailInterface";
import TrailCard from "../components/TrailCard";
import temp_hike_card from "/images/temp-hike-suggestion/2.webp";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

const QUICK_SEARCHES = ["Swiss Alps", "Black Forest", "Dolomites", "Pyrenees"];

const difficultyLabel: Record<string, string> = {
  hiking: "Easy",
  mountain_hiking: "Moderate",
  demanding_mountain_hiking: "Hard",
  alpine_hiking: "Alpine",
};

const Trails = () => {
  const [query, setQuery] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [valLat, setLat] = useState<number | null>(null);
  const [valLon, setLon] = useState<number | null>(null);

  const geocode = async (place: string) => {
    const res = await axios(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`,
    );
    const data = await res.data;
    if (!data.length) throw new Error("Location not found");
    return { lat: data[0].lat, lon: data[0].lon };
  };

  const getTrailPhotos = async (trailName: string) => {
    const res = await axios.get(`https://api.pexels.com/v1/search`, {
      params: {
        query: `${trailName} mountain`,
        per_page: 5,
      },
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      },
    });

    return res.data.photos.map((photo: any) => photo.src.large);
  };

  const search = async (place: string) => {
    if (!place.trim()) return;
    setLoading(true);
    setTrails([]);
    setStatus("Searching...");

    try {
      const { lat, lon } = await geocode(place);
      setLat(lat);
      setLon(lon);
      const overpassQuery = `[out:json][timeout:25];relation["route"="hiking"](around:30000,${lat},${lon});out body;`;
      const res = await axios.post(
        "https://overpass-api.de/api/interpreter",
        overpassQuery,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        },
      );
      const data = res.data;
      const named = data.elements
        .filter((el: Trail) => el.tags?.name)
        .slice(0, 8);

      const trailsWithPhotos = await Promise.all(
        named.map(async (trail: Trail) => ({
          ...trail,
          tags: {
            ...trail.tags,
            photos: await getTrailPhotos(trail.tags.name!),
          },
        })),
      );

      setTrails(trailsWithPhotos);
      setStatus(`${named.length} routes found near ${place}`);
    } catch (e: any) {
      setStatus("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Trails px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] mt-[150px] pb-[80px]">
      <div className="mb-8">
        <h1 className="text-2xl font-medium mb-1">Find a trail</h1>
        <p className="text-sm text-gray-400">Search by city, park or region</p>
      </div>

      <div className="flex gap-2 mb-4 max-w-[600px]">
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-4 bg-white">
          <IoIosSearch className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search(query)}
            placeholder="e.g. Zurich, Alps, Black Forest..."
            className="flex-1 py-2.5 text-sm bg-transparent focus:outline-none"
          />
        </div>
        <button
          onClick={() => search(query)}
          disabled={loading}
          className="px-5 text-sm bg-black text-white rounded-xl hover:opacity-75 transition-opacity disabled:opacity-40"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {QUICK_SEARCHES.map((place) => (
          <button
            key={place}
            onClick={() => {
              setQuery(place);
              search(place);
            }}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:border-black transition-colors"
          >
            {place}
          </button>
        ))}
      </div>

      {status && <p className="text-sm text-gray-400 mb-4">{status}</p>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-y-9 gap-4">
        {trails.map((trail) => (
          <TrailCard
            key={trail.id}
            trail={trail}
            fallbackImg={trail.tags.photos ?? [temp_hike_card]}
            lat={valLat}
            lon={valLon}
          />
        ))}
      </div>
    </div>
  );
};

export default Trails;
