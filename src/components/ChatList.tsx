import { fetchChats } from "@/services/chatService";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IChat {
    _id: string;
    user: {
        name: string;
    };
    lastMessage?: string;
}

export default function ChatList() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { chats, setChats, selectedChatId, setSelectedChat } = useChatStore();
  
  // const chats = [
    //   { _id: "1", name: "Friends Forever", lastMessage: "Hahahaha!", time: "9:52 PM" },
    //   { _id: "2", name: "Mera Gang", lastMessage: "Kyuuuu???", time: "12:31 PM" },
    //   { _id: "3", name: "Anil", lastMessage: "April Fool's Day", time: "9:52 PM" },
    // ];
  
    const { data: fetchedChats=[] , isLoading } = useQuery({
      queryKey: ['chats'],
      queryFn: fetchChats,
    });
    
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
      <div className="bg-white h-full rounded-2xl">
        {chats && chats.length === 0 ? (
                <p>No chats found. Start a conversation!</p>
            ) : (
                <ul className="p-1">
                    {chats.map((chat: any) => {
                        const chatPartner = chat.users.find((u: any) => u._id !== user?._id);

                        if (!chatPartner) return null;

                        return (
                          <div key={chat._id} onClick={() => handleChatClick(chat._id)} className={`flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-100 cursor-pointer ${selectedChatId===chat._id && 'bg-gray-100'}`}>
                                <img src={chatPartner.profilePicture} alt={chatPartner.name} className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
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
    );
  }
