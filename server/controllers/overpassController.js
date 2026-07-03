import axios from "axios";

export const overpassQuery = async (req, res) => {
  try {
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      `data=${encodeURIComponent(req.body.data)}`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );
    return res.send(response.data);
  } catch (err) {
    return res.status(500).json({ message: "Overpass query failed" });
  }
};
