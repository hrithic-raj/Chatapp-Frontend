import socket from "@/lib/socket";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/userStore";
import { Send } from "lucide-react";
import { useState } from "react";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { selectedChatId } = useChatStore();
  const { user } = useAuthStore();
  const sendMessage = () => {
    if(!message.trim()) return;

    const newMessage = {
      chatId: selectedChatId,
      sender: user?._id,
      content: message,
      read: false,
      createdAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", newMessage);
    console.log("New Message", newMessage);
    setMessage("");
  }

  return (
    <div className="flex items-center p-3">
      <input 
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 bg-[#D8DEEC] rounded-lg text-gray-500 placeholder:text-gray-500 focus:outline-1 outline-gray-500"
      />
      <button className="ml-3 bg-purple-600 text-white p-2 rounded-lg" onClick={sendMessage}>
        <Send size={20} />
      </button>
    </div>
  );
}
