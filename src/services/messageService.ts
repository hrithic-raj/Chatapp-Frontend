import apiClient from '@/lib/axios.config';

export const fetchMessages = async (chatId: string) => {
    const { data } = await apiClient.get(`/messages/${chatId}`);
    return data;
};

export const sendMessage = async (chatId: string, message: string) => {
    const { data } = await apiClient.post('/messages/send', { chatId, message });
    return data;
};
