import { useEffect, useState } from "react";
import { Trail } from "../interfaces/TrailInterface";
import TrailCard from "../components/TrailCard";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

const QUICK_SEARCHES = ["Swiss Alps", "Black Forest", "Dolomites", "Pyrenees"];

const Trails = () => {
  const [query, setQuery] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const geocode = async (place: string) => {
    const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: place,
        format: "json",
        limit: 10,
        featuretype: "natural",
      },
    });
    const data = await res.data;
    if (!data.length) throw new Error("Location not found");

    const best =
      data.find(
        (r: any) =>
          [
            "natural",
            "peak",
            "mountain_range",
            "protected_area",
            "leisure",
          ].includes(r.type) ||
          ["natural", "leisure", "boundary"].includes(r.class),
      ) ?? data[0];
    return {
      lat: parseFloat(best.lat),
      lon: parseFloat(best.lon),
      osm_id: best.osm_id,
      osm_type: best.osm_type,
    };
  };

  const getORSDistance = async (
    startLat: number,
    endLat: number,
    startLon: number,
    endLon: number,
  ) => {
    try {
      const res = await axios.post(
        "https://api.openrouteservice.org/v2/directions/foot-hiking/geojson",
        {
          coordinates: [
            [startLon, startLat],
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

      const meters = res.data.features[0].properties.summary.distance;
      return (meters / 1000).toFixed(1);
    } catch (err: any) {
      return "—";
    }
  };

  const getHikingRoutes = async (
    lat: number,
    lon: number,
    retries = 2,
  ): Promise<any[]> => {
    try {
      const query = `
  [out:json][timeout:30];
  relation["type"="route"]["route"="hiking"](around:50000,${lat},${lon});
  out geom 20;
`;
      const res = await axios.post(
        "https://overpass-api.de/api/interpreter",
        `data=${encodeURIComponent(query)}`,
      );

      const elements = res.data?.elements;
      if (!Array.isArray(elements))
        throw new Error("Unexpected response from Overpass");
      return elements.slice(0, 20);
    } catch (e) {
      if (retries > 0) return getHikingRoutes(lat, lon, retries - 1);
      throw new Error("Trail search timed out, please try again.");
    }
  };

  const getTrailPhotos = async (trailName: string) => {
    const res = await axios.get(`https://api.pexels.com/v1/search`, {
      params: {
        query: `${trailName} hiking`,
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
      const routes = await getHikingRoutes(lat, lon);

      const trails: Trail[] = await Promise.all(
        routes
          .filter((route: any) => route.tags?.name)
          .map(async (route: any) => {
            const trailName = route.tags?.name ?? `${place} Trail`;

            const members =
              route.members?.filter((m: any) => m.geometry?.length > 0) ?? [];

            const firstMember = members[0];
            const lastMember = members[members.length - 1];

            const startCoord = members[0]?.geometry?.[0];
            const endCoord =
              members[members.length - 1]?.geometry?.[
                members[members.length - 1].geometry.length - 1
              ];
            const [photos, distance] = await Promise.all([
              getTrailPhotos(trailName),
              startCoord && endCoord
                ? getORSDistance(
                    startCoord.lat,
                    endCoord.lat,
                    startCoord.lon,
                    endCoord.lon,
                  )
                : Promise.resolve("—"),
            ]);

            return {
              id: route.id,
              type: "relation",
              tags: {
                name: trailName,
                photos,
                distance,
                network: route.tags?.network,
                sac_scale: route.tags?.sac_scale,
                startLat: startCoord?.lat,
                startLon: startCoord?.lon,
                endLat: endCoord?.lat,
                endLon: endCoord?.lon,
              },
              geometry: [],
            };
          }),
      );

      console.log(
        "trails before set:",
        trails.map((t) => ({
          name: t.tags.name,
          lat: t.tags.startLat,
          lon: t.tags.startLon,
          endLat: t.tags.endLat,
          endLon: t.tags.endLon,
        })),
      );

      setTrails(trails);
      setStatus("");
    } catch (e: any) {
      toast.error(e.message);
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
          <TrailCard key={trail.id} trail={trail} />
        ))}
      </div>
    </div>
  );
};

export default Trails;
