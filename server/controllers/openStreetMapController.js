import axios from "axios";

export const search = async (req, res) => {
  try {
    const { q, format, limit, featuretype } = req.query;
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: { q, format, limit, featuretype },
        headers: {
          "User-Agent": "hiking-ecommerce/1.0 (denis.herzhyk88@gmail.com)",
        },
      },
    );

    return res.json(response.data);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch search" });
  }
};
