import apiClient from '@/lib/axios.config';

export const fetchChats = async () => {
    const { data } = await apiClient.get('/chats');
    return data;
};

export const createOrGetChat = async (userId: string) => {
    const { data } = await apiClient.post('/chats', { userId });
    return data;
};

export const getChatById = async (chatId: string) => {
    const { data } = await apiClient.get(`/chats/${chatId}`);
    return data;
};