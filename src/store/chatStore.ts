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
import { persist } from 'zustand/middleware';

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
  createdAt?: string;
}

interface IChat {
  _id: string;
  users: any[];
  lastMessage?: IMessage;
}

interface ChatState {
  selectedChatId: string | null;
  setSelectedChat: (chatId: string) => void;

  chats: IChat[];
  unreadCounts: Record<string, number>;
  lastMessages: Record<string, IMessage>;
  setChats: (chats: IChat[]) => void;
  updateUnreadCount: (chatId: string, updater: (prev: number) => number) => void;
  updateLastMessage: (chatId: string, message: IMessage) => void;

  chatData: IChat | null;
  setChatData: (chat: IChat) => void;

  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  addMessage: (message: IMessage) => void;

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

  messages: [] as IMessage[],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

  loading: false,
  setLoading: (state) => set({ loading: state }),
}));
