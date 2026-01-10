import axios from "axios";
import { refreshAccessTokenApi } from "./user/userApi";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  response => response,

  async error => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (status === 498 && !isRefreshing) {
      isRefreshing = true;

      try {
        await refreshAccessTokenApi();
        isRefreshing = false;
        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
