export interface SocketMessage {
  chatId: string;
  sender: string;
  content: string;
  read: boolean;
  createdAt: string;
}
