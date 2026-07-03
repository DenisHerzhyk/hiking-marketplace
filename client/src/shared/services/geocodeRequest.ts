import api from "../../axios";
export const geocode = async (place: string) => {
  const res = await api.get(`/api/osm/search`, {
    params: {
      q: place,
      format: "json",
      limit: 10,
      featuretype: "natural",
    },
  });
  const data = await res.data;
  if (!data.length) throw new Error("Location not found");

  const best =
    data.find(
      (r: any) =>
        [
          "natural",
          "peak",
          "mountain_range",
          "protected_area",
          "leisure",
        ].includes(r.type) ||
        ["natural", "leisure", "boundary"].includes(r.class),
    ) ?? data[0];
  return {
    lat: parseFloat(best.lat),
    lon: parseFloat(best.lon),
    osm_id: best.osm_id,
    osm_type: best.osm_type,
  };
};
