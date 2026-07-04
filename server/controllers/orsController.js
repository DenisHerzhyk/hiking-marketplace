import axios from "axios";

export const orsHikingRoute = async (req, res) => {
  try {
    const { coordinates } = req.body;

    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/foot-hiking/geojson",
      { coordinates },
      {
        params: { api_key: process.env.ORS_API_KEY },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res.json(response.data);
  } catch (err) {
    console.log("ORS error:", err.response?.status, err.response?.data);

    return res.status(500).json({ message: "Failed to fetch hiking route" });
  }
};
