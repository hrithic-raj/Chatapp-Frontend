export interface Message {
  _id: string;
  content: string;
  sender: string | User;
  chat: string;
  createdAt: string;
  read: boolean;
}

export interface Chat {
  _id: string;
  users: User[];
  lastMessage?: Message;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  profilePicture: string;
}
