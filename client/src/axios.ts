import axios from "axios";
//import.meta.env.VITE_RENDER_URL
const api = axios.create({
  baseURL: "http://localhost:4996" ,
  withCredentials: true,
});

export default api;
