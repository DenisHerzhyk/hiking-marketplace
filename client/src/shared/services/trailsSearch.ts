import { getTrailPhotos } from "./pexelRequest";
import { getORSDistance } from "./orsDistanceCalculation";
import { Trail } from "../../pages/Trails/interfaces/TrailInterface";

const orsCache = new Map<string, string>();

const getCachedDistance = async (
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number,
): Promise<string> => {
  const key = `${startLat.toFixed(4)},${startLon.toFixed(4)}-${endLat.toFixed(4)},${endLon.toFixed(4)}`;
  const cached = orsCache.get(key);
  if (cached) return cached;

  const distance = await getORSDistance(startLat, startLon, endLat, endLon);
  if (distance !== "—") orsCache.set(key, distance);
  return distance;
};

export const trailsSearch = async ({
  routes,
  place,
}: {
  routes: any[];
  place: string;
}) => {
  const filtered = routes.filter((route: any) => route.tags?.name);

  const results = await Promise.allSettled(
    filtered.map(async (route) => {
      const trailName = route.tags?.name ?? `${place} Trail`;

      const members =
        route.members?.filter((m: any) => m.geometry?.length > 0) ?? [];

      const startCoord = members[0]?.geometry?.[0];
      const endCoord =
        members[members.length - 1]?.geometry?.[
          members[members.length - 1].geometry.length - 1
        ];
      const [photos, distance] = await Promise.all([
        getTrailPhotos(trailName),
        startCoord && endCoord
          ? getCachedDistance(
              startCoord.lat,
              startCoord.lon,
              endCoord.lat,
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
          ascent: route.tags?.ascent ?? "",
          difficulty: route.tags?.difficulty ?? route.tags?.sac_scale ?? "",
          network: route.tags?.network,
          sac_scale: route.tags?.sac_scale,
          startLat: startCoord?.lat,
          startLon: startCoord?.lon,
          endLat: endCoord?.lat,
          endLon: endCoord?.lon,
        },
        geometry: [],
      } as Trail;
    }),
  );

  return results
    .filter((r) => r.status === "fulfilled")
    .map((r) => (r as PromiseFulfilledResult<Trail>).value);
};
