import axios from "axios";

export const getHikingRoutes = async (
  lat: number,
  lon: number,
  slice: number,
  fullGeom = true,
  retries = 2,
): Promise<any[]> => {
  try {
    const outMode = fullGeom ? "out geom" : "out tags center";

    const query = `
    [out:json][timeout:25];
    relation["type"="route"]["route"="hiking"](around:50000,${lat},${lon});
    ${outMode} ${slice};
  `;
    const res = await axios.post(
      "https://overpass-api.de/api/interpreter",
      `data=${encodeURIComponent(query)}`,
    );

    const elements = res.data?.elements;
    if (!Array.isArray(elements))
      throw new Error("Unexpected response from Overpass");
    return elements.slice(0, slice);
  } catch (e) {
    if (retries > 0)
      return getHikingRoutes(lat, lon, slice, fullGeom, retries - 1);
    throw new Error("Trail search timed out, please try again.");
  }
};
