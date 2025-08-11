"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/userStore";
import apiClient from "@/lib/axios.config";
export default function InitAuth() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    (async () => {
      try {
        const { data: user } = await apiClient.get("/users/profile");
        setUser(user);
        console.log("user got from initAuth", user)
        if (!user?.username || user?.newUser) {
          router.push("/set-username");
        } else if (!window.location.pathname.startsWith('/chat')) {
          router.replace("/chat");
        }
      } catch (error) {
        console.error("error in initAuth", error)
        // Error handling done by interceptor
      }
    })();
  }, [router, setUser]);

  return null;
}
