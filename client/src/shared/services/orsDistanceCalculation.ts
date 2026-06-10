import axios from "axios";

export const getORSDistance = async (
  startLat: number,
  startLon: number,
  endLat: number,
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
