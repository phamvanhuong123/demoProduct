import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8071/v1",
});

// Gắn token tự động nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
