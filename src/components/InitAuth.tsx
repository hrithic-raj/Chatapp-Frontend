"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/userStore";
import axios from "@/lib/axios.config";

export default function InitAuth() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/users/profile");
        const user = response.data;
        
        if (user?.newUser || !user?.username) {
          router.push("/set-username");
        } else {
          setUser(user);
        }
      } catch (error) {
        router.push("/login");
      }
    })();
  }, [router, setUser]);

  return null;
}
