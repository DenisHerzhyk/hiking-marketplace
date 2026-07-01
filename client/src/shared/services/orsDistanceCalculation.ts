import axios from "axios";

let orsQueue = Promise.resolve();

const orsRateLimited = async <T>(fn: () => Promise<T>): Promise<T> => {
  const prev = orsQueue;
  let release: () => void;
  orsQueue = new Promise<void>((resolve) => {
    release = resolve;
  });
  await prev;
  const result = await fn();
  setTimeout(() => release!(), 1100);
  return result;
};

export const getORSDistance = async (
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number,
): Promise<string> => {
  return orsRateLimited(async () => {
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
  });
};
