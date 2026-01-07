import axios from "axios";
import { refreshAccessTokenApi } from "../api/user/userApi";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Extract status code safely
    const status = error?.response?.status;

    // ✔️ Only refresh when access token EXPIRED (498)
    if (status === 498 && !isRefreshing) {
      console.log("%c[498] Access token expired → refreshing...", "color: orange;");

      isRefreshing = true;

      try {
        console.log("%cCalling /refreshAccessToken ...", "color: yellow;");
        await refreshAccessTokenApi();

        console.log("%cRefresh successful → retrying original request...", "color: lime;");
        isRefreshing = false;

        return api(originalRequest);

      } catch (refreshError) {
        isRefreshing = false;
        console.log("%cRefresh failed → redirecting to login", "color: red; font-weight:bold;");

        window.location.href = "/users";
        return Promise.reject(refreshError);
      }
    }

    // ❌ If it's not 498 → do NOT refresh
    // This avoids loops when wrong password (401) or invalid token
    return Promise.reject(error);
  }
);

export default api;
