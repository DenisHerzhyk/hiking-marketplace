import axios from "axios";

export const elevationOpenMeteo = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const response = await axios.get(
      "https://api.open-meteo.com/v1/elevation",
      {
        params: { latitude, longitude },
      },
    );

    return res.json(response.data);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch elevation" });
  }
};

export const forecastOpenMeteo = async (req, res) => {
  try {
    const { latitude, longitude, daily, timezone, start_date, end_date } =
      req.query;
    const response = await axios.get(
      "https://api.open-meteo.com/v1/elevation",
      {
        params: { latitude, longitude, daily, timezone, start_date, end_date },
      },
    );

    return res.json(response.data);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch forecast" });
  }
};
