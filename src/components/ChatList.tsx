import { fetchChats } from "@/services/chatService";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import type { Chat, User } from "@/types/chat";
import ProfileBar from "./ProfileBar";

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
        <div className="flex flex-col overflow-auto h-full">
          {chats && chats.length === 0 ? (
                  <div className="min-h-full flex justify-center items-center">
                    <p>No chats found. Start a conversation!</p>
                  </div>
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
        <ProfileBar/>
      </div>
    );
  }
