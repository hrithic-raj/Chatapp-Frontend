import apiClient from '@/lib/axios.config';

export const searchUsers = async (query: string) => {
    if (!query) return [];
    const res = await apiClient.get(`/users/search?query=${query}`);
    return res.data;
};
