import axios from "axios"

const baseURL = "http://127.0.0.1:5000/api";
//const baseURL = "https://braidz-world-backend.vercel.app/api";


const api = axios.create({
  baseURL: baseURL,
  headers: {

  },
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default api;
