import { useState } from "react";
import { Trail } from "../interfaces/TrailInterface";
import TrailCard from "../components/TrailCard";
import { IoIosSearch } from "react-icons/io";
import toast from "react-hot-toast";
import TrailCardSkeleton from "../../../shared/loading/TrailCardSkeleton";
const QUICK_SEARCHES = ["Swiss Alps", "Black Forest", "Dolomites", "Pyrenees"];
import { geocode } from "../../../shared/services/geocodeRequest";
import { getHikingRoutes } from "../../../shared/services/overpassHikingRoutes";
import { trailsSearch } from "../../../shared/services/trailsSearch";

const Trails = () => {
  const [query, setQuery] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [trailsLoading, setTrailsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const search = async (place: string) => {
    if (!place.trim()) return;
    setLoading(true);
    setTrailsLoading(true);
    setTrails([]);
    setStatus("Searching...");
    try {
      const { lat, lon } = await geocode(place);
      const routes = await getHikingRoutes(lat, lon, 20);
      const trails = await trailsSearch({ routes, place });
      setTrails(trails);
      setStatus("");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
      setTrailsLoading(false);
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
        {trailsLoading
          ? Array.from({ length: 5 }).map((_, i) => <TrailCardSkeleton key={i} />)
          : trails.map((trail) => <TrailCard key={trail.id} trail={trail} />)}
      </div>
    </div>
  );
};

export default Trails;
