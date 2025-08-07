import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/userStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  timeoutErrorMessage: "Request timed out. Please check your network connection and try again.",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await apiClient.post("/auth/refresh-token", {}, { withCredentials: true });
        
        console.log("Ethittund", response)
        const newAccessToken = response.data.newAccessToken;
        const user = response.data.user;

        // Storing new accessToken is the localStorage
        localStorage.setItem("accessToken", newAccessToken);
        console.log("New AccessToken created", newAccessToken);
        
        // Update Zutand store
        useAuthStore.getState().setUser(user);

        // Set the new token for the original request
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return axios(originalRequest);

      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.clear();
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
