import axios from "axios";

const baseURL =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "/api";

const API = axios.create({ baseURL });

API.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (_) {}
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      return Promise.reject(new Error("Server is not running. Start the backend first."));
    }

    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(new Error(message));
  }
);

export default API;
