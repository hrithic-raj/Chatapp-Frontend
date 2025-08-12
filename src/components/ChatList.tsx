import { fetchChats } from "@/services/chatService";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import type { Chat, User } from "@/types/chat";
import { FiSettings } from 'react-icons/fi';

export default function ChatList() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { chats, setChats, selectedChatId, setSelectedChat } = useChatStore();
  
  const { data: fetchedChats = [] as Chat[], isLoading } = useQuery<Chat[]>({
      queryKey: ['chats'],
      queryFn: fetchChats,
    });

    // const { data: user = [], isLoading } = useQuery({
    //     queryKey: ['searchUsers', search],
    //     queryFn: () => searchUsers(search),
    //     enabled: !!search,
    // });
    
    useEffect(() => {
      if (fetchedChats && fetchedChats.length > 0) {
        setChats(fetchedChats);
      }
    }, [fetchedChats, setChats]);

    const handleChatClick =(chatId: string)=>{
      setSelectedChat(chatId);
      router.push(`/chat/${chatId}`);
    }
    if (isLoading) return <p>Loading...</p>;
    return (
      <div className="bg-white rounded-2xl min-h-[90%] flex flex-col justify-between">
        <div className="flex flex-col overflow-auto">
          {chats && chats.length === 0 ? (
                  <p>No chats found. Start a conversation!</p>
              ) : (
                  <ul className="p-1">
                      {chats.map((chat: Chat) => {
                          const chatPartner = chat.users.find((u: User) => u._id !== user?._id);

                          if (!chatPartner) return null;

                          return (
                                <div key={chat._id} onClick={() => handleChatClick(chat._id)} className={`flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-100 cursor-pointer ${selectedChatId===chat._id && 'bg-gray-100'}`}>
                                      <Image 
                                        src={chatPartner.profilePicture} 
                                        alt={chatPartner.name} 
                                        width={40} 
                                        height={40} 
                                        className="rounded-full"
                                      />
                                      <div className="flex-1 max-w-full overflow-hidden">
                                        <p className="font-semibold text-gray-600">{chatPartner.name}</p>
                                        {useChatStore.getState().lastMessages[chat._id]?.content && (
                                          <p className="text-sm text-gray-500 truncate">
                                            {useChatStore.getState().lastMessages[chat._id].content}
                                          </p>
                                        )}
                                      </div>
                                      {useChatStore.getState().unreadCounts[chat._id] > 0 && (
                                        <span className="bg-purple-600 text-white rounded-full px-2 py-1 text-xs">
                                          {useChatStore.getState().unreadCounts[chat._id]}
                                        </span>
                                      )}
                                </div>
                          );
                      })}
                  </ul>
              )}
        </div>
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
      </div>
    );
  }
