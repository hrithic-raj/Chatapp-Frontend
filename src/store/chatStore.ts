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

interface IMessage {
  _id: string;
  content: string;
  sender: string;
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
  setChats: (chats: IChat[]) => void;

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
  setChats: (chats) => set({ chats }),

  chatData: null,
  setChatData: (chat) => set({ chatData: chat }),

  messages: [] as IMessage[],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

  loading: false,
  setLoading: (state) => set({ loading: state }),
}));
