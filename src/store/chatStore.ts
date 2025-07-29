// import { create } from 'zustand';

// interface ChatState {
//     selectedChatId: string | null;
//     setSelectedChat: (chatId: string) => void;
//     chats: any[];
//     setChats: (chats: any[]) => void; 
// }

// export const useChatStore = create<ChatState>((set) => ({
//     selectedChatId: null,
//     setSelectedChat: (chatId) => set({ selectedChatId: chatId }),
//     chats: [],
//     setChats: (chats) => set({ chats }),
// }));


import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

import type { Chat, Message } from "@/types/chat";

interface ChatState {
  selectedChatId: string | null;
  setSelectedChat: (chatId: string) => void;

  chats: Chat[];
  unreadCounts: Record<string, number>;
  lastMessages: Record<string, Message>;
  setChats: (chats: Chat[]) => void;
  updateUnreadCount: (chatId: string, updater: (prev: number) => number) => void;
  updateLastMessage: (chatId: string, message: Message) => void;

  chatData: Chat | null;
  setChatData: (chat: Chat) => void;

  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;

  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  selectedChatId: null,
  setSelectedChat: (chatId) => set({ selectedChatId: chatId }),

  chats: [],
  unreadCounts: {},
  lastMessages: {},
  setChats: (chats) => set({ chats }),
  updateUnreadCount: (chatId, updater) => set(state => ({
    unreadCounts: { 
      ...state.unreadCounts, 
      [chatId]: updater(state.unreadCounts[chatId] || 0) 
    }
  })),
  updateLastMessage: (chatId, message) => set(state => ({
    lastMessages: { ...state.lastMessages, [chatId]: message }
  })),

  chatData: null,
  setChatData: (chat) => set({ chatData: chat }),

  messages: [] as Message[],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

  loading: false,
  setLoading: (state) => set({ loading: state }),
}));
