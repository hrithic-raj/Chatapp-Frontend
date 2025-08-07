// lib/refreshToken.ts
import apiClient from "@/lib/axios.config";
import { useAuthStore } from "@/store/userStore";

export const verifyToken = async (token: string) => {
  try {
    const response = await apiClient.post('/auth/verify', null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
  } catch (error) {
    return null;
  }
};

// export const refreshAccessToken = async () => {
//   try {
//     const res = await apiClient.post("/auth/refresh-token", null, { withCredentials: true });
//     const { newAccessToken, user } = res.data;

//     localStorage.setItem("accessToken", newAccessToken);
//     useAuthStore.getState().setUser(user);
//     return true;
//   } catch (err) {
//     console.error("Token refresh failed", err);
//     useAuthStore.getState().logout(); // if refresh fails
//     return false;
//   }
// };
