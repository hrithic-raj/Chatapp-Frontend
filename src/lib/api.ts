// import apiClient from "./axios.config";

// export const searchUsers = async (query:string) =>{
//     const res = await apiClient.get(`/users/search?query=${query}`);
//     return res.data;
// };

// export const getUserChats = async () => {
//     const res = await apiClient.get(`/chats`);
//     return res.data;
// };

// export const createChat = async (userId: string) => {
//     const res = await apiClient.post(`/chats`, { userId });
//     return res.data;
// };

// export const fetchMessages = async (chatId: string) => {
//     const res = await apiClient.get(`/messages/${chatId}`);
//     return res.data;
// };

// export const sendMessage = async ({ chatId, content }: { chatId: string; content: string }) => {
//     const res = await apiClient.post(`/messages`, { chatId, content });
//     return res.data;
// };

// export const markAsRead = async (chatId: string) => {
//     await apiClient.post(`/messages/read/${chatId}`);
// };