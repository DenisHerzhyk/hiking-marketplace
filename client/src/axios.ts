import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_RENDER_URL || "http://localhost:4996",
  withCredentials: true,
});

export default api;
