"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/userStore";
import { refreshAccessToken } from "@/lib/refreshToken";

const InitAuth = () => {
  const { user } = useAuthStore();

   useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token && !user) {
      // Wait 1 second to give cookies time to set
      const timeout = setTimeout(() => {
        refreshAccessToken();
      }, 1000);

      return () => clearTimeout(timeout); // clean up
    }
   }, []);

  return null; // This component is just for running refresh logic
};

export default InitAuth;
