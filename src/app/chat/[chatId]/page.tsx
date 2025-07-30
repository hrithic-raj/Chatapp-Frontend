"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useChatStore } from "@/store/chatStore";
import ChatBox from "./chatBox";

const ChatPage = () => {
    const params = useParams();
    const router = useRouter();
    const { setSelectedChat } = useChatStore();
    useEffect(() => {
        if (!params.chatId) {
            router.push("/select-chat");
        } else {
            setSelectedChat(params.chatId as string);
        }
    }, [params.chatId, setSelectedChat, router]);

    if (!params.chatId) {
        return <p className="text-center text-gray-500">Select a chat to start messaging.</p>;
    }

    return <ChatBox />;
};

export default ChatPage;