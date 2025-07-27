"use client";

import socket from "@/lib/socket";
import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '@/services/messageService';
import { useChatStore } from '@/store/chatStore';
import { fetchChats, getChatById } from '@/services/chatService';
import { useAuthStore } from '@/store/userStore';
import { useEffect, useRef } from "react";

interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface IMessage {
    _id: string;
    content: string;
    sender: string | IUser;
    chat: string;
}

const MessageList = () => {
    const {
        selectedChatId,
        messages,
        setMessages,
        addMessage,
        chatData,
        setChatData,
        loading,
        setLoading,
        } = useChatStore();

    const { user } = useAuthStore();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // const { data: chat, isLoading:chatLoading } = useQuery({
    //     queryKey: ['chat', selectedChatId],
    //     queryFn: () => getChatById(selectedChatId!),
    //     enabled: !!selectedChatId
    // });
    // const { data: messages, isLoading } = useQuery({
    //     queryKey: ['messages', selectedChatId],
    //     queryFn: () => fetchMessages(selectedChatId!),
    //     enabled: !!selectedChatId
    // });

    useEffect(() => {
    if (!selectedChatId) return;

    const loadChat = async () => {
    setLoading(true);
    const chat = await getChatById(selectedChatId);
    const msgs = await fetchMessages(selectedChatId);
    setChatData(chat);
    setMessages(msgs);
    setLoading(false);
    };

    loadChat();
    
    socket.emit("joinChat", selectedChatId);

    socket.on("receiveMessage", (newMessage: IMessage) => {
      if (newMessage.chat === selectedChatId) {
        // setMessages(prev => [...prev, newMessage]);
        addMessage(newMessage)
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedChatId]);

  useEffect(()=>{
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

  },[messages])

    const chatPartner = chatData?.users?.find((u: any) => u._id !== user?._id);
    if (!selectedChatId) return <p>Select a chat</p>;
    if (loading || !chatData) return <p>Loading chat...</p>;
    return (
        <div className="flex flex-col h-full overflow-hidden">
      {/* Chat Header */}
      <div className="max-h-20 border-b py-2 flex items-center space-x-3 shrink-0">
        <img src={chatPartner?.profilePicture} width={50} height={50} className="rounded-full ml-2" alt="" />
        <span className="text-2xl text-black">{chatPartner.name}</span>
      </div>

      {/* Scrollable Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col space-y-3 px-2 pt-2 pb-4">
        {messages && messages.length > 0 ? (
          messages.map((message: IMessage) => {
            const isSentByUser =
              typeof message.sender === "string"
                ? message.sender === user?._id
                : message.sender && message.sender?._id === user?._id;
            return isSentByUser? (
              <div key={message._id} className="self-end bg-gray-200 text-black px-4 py-2 rounded-lg">
                {message.content}
              </div>
            ) : (
              <div key={message._id} className="self-start bg-purple-600 text-white px-4 py-2 rounded-lg">
                {message.content}
              </div>
            )
          })
        ) : (
          <div className="text-center text-gray-400 mt-5">Start chatting</div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
    );
};

export default MessageList;
