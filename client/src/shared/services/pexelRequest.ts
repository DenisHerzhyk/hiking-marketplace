import axios from "axios";

export const getTrailPhotos = async (trailName: string) => {
  const res = await axios.get(`https://api.pexels.com/v1/search`, {
    params: {
      query: `${trailName} hiking`,
      per_page: 5,
    },
    headers: {
      Authorization: import.meta.env.VITE_PEXELS_API_KEY,
    },
  });

  return res.data.photos.map((photo: any) => photo.src.large);
};
