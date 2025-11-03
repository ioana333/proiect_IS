import axios from "axios";

// URL-ul API-ului vine din .env (frontend/.env)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// atașează token-ul dacă există în localStorage
api.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("token");
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});
