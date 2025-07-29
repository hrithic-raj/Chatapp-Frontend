"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/userStore";
import { refreshAccessToken } from "@/lib/refreshToken";
import { useRouter } from "next/navigation";

const InitAuth = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (!token && !user) {
        try {
          const refreshed = await refreshAccessToken();
          if (!refreshed) {
            router.push("/login");
          }
        } catch (error) {
          router.push("/login");
        }
      }
    };

    checkAuth();
  }, [user, router]);

  return null;
};

export default InitAuth;
