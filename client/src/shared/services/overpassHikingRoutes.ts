import api from "../../axios";

const BACKOFF_DELAYS = [2000, 5000, 10000];

export const getHikingRoutes = async (
  lat: number,
  lon: number,
  slice: number,
  fullGeom = true,
  retries = BACKOFF_DELAYS.length,
): Promise<any[]> => {
  try {
    const outMode = fullGeom ? "out geom" : "out tags center";

    const query = `
    [out:json][timeout:25];
    relation["type"="route"]["route"="hiking"](around:50000,${lat},${lon});
    ${outMode} ${slice};
  `;
    const res = await api.post(
      `/api/overpass/interpreter`,
      `data=${encodeURIComponent(query)}`,
    );

    const elements = res.data?.elements;
    if (!Array.isArray(elements))
      throw new Error("Unexpected response from Overpass");
    return elements.slice(0, slice);
  } catch (e) {
    const isRateLimited = (e as any)?.response?.status === 429;
    const attemptIndex = BACKOFF_DELAYS.length - retries;
    const delay =
      BACKOFF_DELAYS[attemptIndex] ?? BACKOFF_DELAYS[BACKOFF_DELAYS.length - 1];

    if (retries > 0) {
      if (isRateLimited) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      return getHikingRoutes(lat, lon, slice, fullGeom, retries - 1);
    }
    throw new Error("Trail search timed out, please try again.");
  }
};
