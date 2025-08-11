"use client";

import socket from "@/lib/socket";
// import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '@/services/messageService';
import { useChatStore } from '@/store/chatStore';
import { getChatById } from '@/services/chatService';
import { useAuthStore } from '@/store/userStore';
import { useEffect, useRef } from "react";

import Image from "next/image";

import type { Message, User } from "@/types/chat";

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
    
    // Mark messages as read when chat is opened
    if (user?._id) {
      socket.emit("markMessagesAsRead", {
        chatId: selectedChatId,
        userId: user._id
      });
      // Reset unread count when opening chat
      useChatStore.getState().updateUnreadCount(selectedChatId, () => 0);
    }

    socket.on("receiveMessage", (newMessage: Message) => {
      const currentChatId = useChatStore.getState().selectedChatId;
      const isActiveChat = newMessage.chat === currentChatId;
      
      // Always update last message
      useChatStore.getState().updateLastMessage(newMessage.chat, newMessage);

      if (isActiveChat) {
        addMessage(newMessage);
      } else {
        const senderId = typeof newMessage.sender === 'string' ? newMessage.sender : newMessage.sender._id;
        if (senderId !== user?._id) {
          useChatStore.getState().updateUnreadCount(newMessage.chat, (prev) => prev + 1);
        }
      }
    });

    // Handle read receipts
    socket.on("messagesRead", ({ chatId }) => {
      if (chatId === selectedChatId) {
        // Update messages with read status using current store state
        const updatedMessages = messages.map(msg => ({...msg, read: true}));
        setMessages(updatedMessages);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messagesRead");
    };
  }, [selectedChatId, user?._id, addMessage, setChatData, setLoading, setMessages]);

  useEffect(()=>{
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

  },[messages])

    const chatPartner = chatData?.users?.find((u: User) => u._id !== user?._id);
    if (!selectedChatId) return <p>Select a chat</p>;
    if (loading || !chatData) return <p>Loading chat...</p>;
    return (
        <div className="flex flex-col h-full overflow-hidden">
      {/* Chat Header */}
      <div className="max-h-20 border-b py-2 flex items-center space-x-3 shrink-0">
        <Image 
          src={chatPartner?.profilePicture || '/default-avatar.png'} 
          width={50} 
          height={50} 
          className="rounded-full ml-2"
          alt="Chat partner avatar"
        />
        <span className="text-2xl text-black">{chatPartner?.name}</span>
      </div>

      {/* Scrollable Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col space-y-3 px-2 pt-2 pb-4">
        {messages && messages.length > 0 ? (
          messages.map((message: Message) => {
            const isSentByUser =
              typeof message.sender === "string"
                ? message.sender === user?._id
                : message.sender && message.sender?._id === user?._id;
            return isSentByUser? (
              <div key={message._id} className="self-end bg-gray-200 text-black px-4 py-2 rounded-lg whitespace-pre-wrap">
                {message.content}
              </div>
            ) : (
              <div key={message._id} className="self-start bg-purple-600 text-white px-4 py-2 rounded-lg whitespace-pre-wrap">
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
