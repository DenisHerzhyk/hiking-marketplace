import { getTrailPhotos } from "./pexelRequest";
import { getORSDistance } from "./orsDistanceCalculation";
import { Trail } from "../../pages/Trails/interfaces/TrailInterface";

export const trailsSearch = async ({
  routes,
  place,
}: {
  routes: any[];
  place: string;
}) => {
  const trails: Trail[] = [];
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const filtered = await Promise.all(
    routes.filter((route: any) => route.tags?.name),
  );

  for (let i = 0; i < filtered.length; i++) {
    const route = filtered[i];
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
        ? getORSDistance(
            startCoord.lat,
            startCoord.lon,
            endCoord.lat,
            endCoord.lon,
          )
        : Promise.resolve("—"),
    ]);

    trails.push({
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
    });
    if (i < filtered.length - 1) await sleep(300);
  }
  return trails;
};
