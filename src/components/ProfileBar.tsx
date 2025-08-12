import { useAuthStore } from "@/store/userStore";
import Image from "next/image";
import { FiSettings } from "react-icons/fi";

const ProfileBar = () => {
      const { user } = useAuthStore();
    return (
        <div className="max-h-[15%] rounded-2xl w-full px-1.5 pb-2">
            <div className="flex justify-between items-center rounded-2xl w-full h-full p-0.5 bg-[#D8DEEC]">
              <div className="flex gap-2">
                <div className="flex justify-center items-center rounded-full w-15 h-15">
                  <Image src={user?.profilePicture || '/dp.jpeg'} width={50} height={50} className="rounded-full" alt="" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl font-bold text-gray-600">{user?.name}</span>
                  <span className="text-gray-500">@ {user?.username}</span>
                </div>
              </div>
              <div className="flex justify-center items-center w-10 h-10 rounded-full mr-1">
                <FiSettings size={30} color="#3f4240" className="cursor-pointer"/>
              </div>
            </div>
        </div>
    );
};

export default ProfileBar;
