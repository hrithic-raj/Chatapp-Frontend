import { Home, MessageCircle, Bell, Settings } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="w-20 bg-purple-600 flex flex-col items-center py-4 space-y-10 rounded-2xl">
      <Image src="/dp.jpeg" alt="Profile" width={50} height={50} className="rounded-full" />
      <div className="w-full h-full flex flex-col items-center space-y-8">
        <Home className="text-white cursor-pointer" size={28} />
        <MessageCircle className="text-white cursor-pointer" size={28} />
        <Bell className="text-white cursor-pointer" size={28} />
        <Settings className="text-white cursor-pointer" size={28} />
      </div>
    </div>
  );
}
