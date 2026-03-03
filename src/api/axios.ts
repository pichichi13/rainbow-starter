//Punto 9 della Documentazione: Collegare il token al frontend
//Salvare il token
//Inviarlo automaticamente nelle richieste protette

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
