import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const storageUser = localStorage.getItem("@app:user");

  if (storageUser) {
    const { token } = JSON.parse(storageUser);

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
