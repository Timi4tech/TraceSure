import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true,
});

let csrfToken = null;

export const getCsrfToken = async () => {
  const res = await api.get("/api/csrf-token");
  return res.data.csrfToken;
};

export const initCsrf = async () => {
  csrfToken = await getCsrfToken();
};

api.interceptors.request.use((config) => {
  config.withCredentials = true;

  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

export default api;

