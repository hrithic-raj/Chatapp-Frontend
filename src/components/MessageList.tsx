"use client";

import socket from "@/lib/socket";
import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '@/services/messageService';
import { useChatStore } from '@/store/chatStore';
import { fetchChats, getChatById } from '@/services/chatService';
import { useAuthStore } from '@/store/userStore';
import { useEffect } from "react";

interface IMessage {
    _id: string;
    content: string;
    sender: string;
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
    console.log(newMessage, "socket msg");
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedChatId]);

    const chatPartner = chatData?.users?.find((u: any) => u._id !== user?._id);
    if (!selectedChatId) return <p>Select a chat</p>;
    if (loading || !chatData) return <p>Loading chat...</p>;
    return (
        <div className="flex flex-col justify-between h-full">
            <div className="max-h-20 border-b py-2 flex items-center space-x-3">
                <img src={chatPartner?.profilePicture} width={50} height={50} className="rounded-full ml-2" alt="" />
                <span className="text-2xl text-black">{chatPartner.name}</span>
            </div>
            <div className='flex flex-col space-y-3 overflow-auto pb-2 pt-2'>
                {/* <div className="self-start bg-gray-200 text-black px-4 py-2 rounded-lg">Hey There!</div>
                <div className="self-start bg-gray-200 text-black px-4 py-2 rounded-lg">How are you?</div>
                <div className="self-end bg-purple-600 text-white px-4 py-2 rounded-lg">Hello!</div>
                <div className="self-end bg-purple-600 text-white px-4 py-2 rounded-lg">I am fine!</div> */}
                {
                    (messages && messages.length !== 0)?(
                        messages.map((message:IMessage) => (
                            (message.sender === user?._id)?(
                                <div key={message._id} className="self-end bg-purple-600 text-white px-4 py-2 rounded-lg">{message.content}</div>
                                // <div key={message._id} className="self-end bg-purple-600 text-white px-4 py-2 rounded-lg">true</div>
                            ):(
                                <div key={message._id} className="self-start bg-gray-200 text-black px-4 py-2 rounded-lg">{message.content}</div>
                            )
                        ))
                    ):(
                        <div>start chating</div>
                    )
                }
            </div>
        </div>
    );
};

export default MessageList;
