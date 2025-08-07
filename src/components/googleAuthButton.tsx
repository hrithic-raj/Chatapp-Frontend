"use client";
import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import apiClient from '@/lib/axios.config';
import { useAuthStore } from '@/store/userStore';


const GoogleAuthButton: React.FC = () => {
    const navigate = useRouter();
    const { setUser } = useAuthStore();
    const handleGoogleAuth =useGoogleLogin({
        onSuccess: async(credentialResponse)=>{
            try{
                const res = await apiClient.post('/auth/google',{credentialResponse});
                const {accessToken} = res.data;
                if(accessToken){
                    localStorage.setItem('accessToken', accessToken);
                    setUser(res.data.user);
                    navigate.push('/chat');
                }
            }catch(error){
                console.error("Google auth failed", error);
            }
        },
        onError: () => console.log("Google auth failed"),
    })
  return (
    <div className='flex flex-col justify-center items-center'>
        <button
            onClick={()=>handleGoogleAuth()}
            className='w-[311px] h-[43px] flex justify-center items-center space-x-3 rounded-[15px] border-2 border-[#46cec2] cursor-pointer'
        >
            <Image 
                src="/GoogleLogo.png" 
                alt="Google Logo" 
                width={32} 
                height={31} 
                className="rounded-full"
            />
            <span className="text-[#46cec2] text-xl font-normal font-['Geologica']">Continue with Google</span>
        </button>
    </div>
  )
}

export default GoogleAuthButton