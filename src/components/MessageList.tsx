"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '@/services/messageService';
import { useChatStore } from '@/store/chatStore';
import { fetchChats, getChatById } from '@/services/chatService';
import { useAuthStore } from '@/store/userStore';

interface IMessage {
    _id: string;
    content: string;
}

const MessageList = () => {
    const { selectedChatId } = useChatStore();
    const { user } = useAuthStore();

    const { data: chat, isLoading:chatLoading } = useQuery({
        queryKey: ['chat', selectedChatId],
        queryFn: () => getChatById(selectedChatId!),
        enabled: !!selectedChatId
    });
    const { data: messages, isLoading } = useQuery({
        queryKey: ['messages', selectedChatId],
        queryFn: () => fetchMessages(selectedChatId!),
        enabled: !!selectedChatId
    });
    const chatPartner = chat?.users?.find((u: any) => u._id !== user?._id);
    if (!selectedChatId) return <p>Select a chat</p>;
    if (chatLoading || isLoading) return <p>Loading chat...</p>;
    return (
        <div className="flex flex-col justify-between h-full">
            <div className="max-h-20 border-b py-2 flex items-center space-x-3">
                <img src={chatPartner?.profilePicture} width={50} height={50} className="rounded-full ml-2" alt="" />
                <span className="text-2xl text-black">{chatPartner.name}</span>
            </div>
            <div className='flex flex-col space-y-3'>
                <div className="self-start bg-gray-200 text-black px-4 py-2 rounded-lg">Hey There!</div>
                <div className="self-start bg-gray-200 text-black px-4 py-2 rounded-lg">How are you?</div>
                <div className="self-end bg-purple-600 text-white px-4 py-2 rounded-lg">Hello!</div>
                <div className="self-end bg-purple-600 text-white px-4 py-2 rounded-lg">I am fine!</div>
            </div>
        </div>
    );
};

export default MessageList;
