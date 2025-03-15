import { create } from 'zustand';

interface ChatState {
    selectedChatId: string | null;
    setSelectedChat: (chatId: string) => void;
    chats: any[];
    setChats: (chats: any[]) => void; 
}

export const useChatStore = create<ChatState>((set) => ({
    selectedChatId: null,
    setSelectedChat: (chatId) => set({ selectedChatId: chatId }),
    chats: [],
    setChats: (chats) => set({ chats }),
}));