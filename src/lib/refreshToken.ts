// lib/refreshToken.ts
import apiClient from "@/lib/axios.config";
import { useAuthStore } from "@/store/userStore";

export const refreshAccessToken = async () => {
  try {
    const res = await apiClient.get("/auth/refresh", { withCredentials: true });
    const { newAccessToken, user } = res.data;

    localStorage.setItem("accessToken", newAccessToken);
    useAuthStore.getState().setUser(user);
    return true;
  } catch (err) {
    console.error("Token refresh failed", err);
    useAuthStore.getState().logout(); // if refresh fails
    return false;
  }
};
