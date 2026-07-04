export const overpassQuery = async (req, res) => {
  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(req.body.data)}`,
    });
    const data = response.text();
    console.log("Raw Overpass response:", text.slice(0, 500));

    return res.send(data);
  } catch (err) {
    console.log("Overpass error:", err);
    return res.status(500).json({ message: "Overpass query failed" });
  }
};
