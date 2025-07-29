"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/userStore";
import GoogleAuthButton from "@/components/googleAuthButton"

const LoginPage = () => {
    const router = useRouter();
    const { user } = useAuthStore();

    useEffect(() => {
        if (user) {
            router.push("/chat");
        }
    }, [user, router]);

    return (
        <div className="flex justify-center items-center h-screen">
            <GoogleAuthButton/>
        </div>
    );
};

export default LoginPage;
