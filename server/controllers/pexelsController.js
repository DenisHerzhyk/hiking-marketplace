import axios from "axios";

export const pexelsQuery = async (req, res) => {
  try {
    const { query, per_page } = req.query;
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: { query, per_page },
      headers: {
        Authorization: process.env.VITE_PEXELS_API_KEY,
      },
    });

    return res.json(response.data);
  } catch (err) {
    return res.status(500).json({ message: "Pexels query failed" });
  }
};
