export const overpassQuery = async (req, res) => {
  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "hiking-ecommerce/1.0 (denis.herzhyk88@gmail.com)",
      },
      body: `data=${encodeURIComponent(req.body.data)}`,
    });

    const text = await response.text();
    if (text.includes("<!DOCTYPE") || text.includes("<html")) {
      return res.status(429).json({ message: "Overpass rate limited" });
    }
    console.log("Raw Overpass response:", text.slice(0, 500));

    return res.set("Content-Type", "application/json").send(text);
  } catch (err) {
    console.log("Overpass error:", err);
    return res.status(500).json({ message: "Overpass query failed" });
  }
};
