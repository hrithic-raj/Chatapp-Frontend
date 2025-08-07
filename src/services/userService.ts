import apiClient from '@/lib/axios.config';

export const searchUsers = async (query: string) => {
    if (!query) return [];
    const res = await apiClient.get(`/users/search?query=${query}`);
    return res.data;
};

export const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const response = await apiClient.post('/auth/verify-token', { refreshToken });
    return response.data;
  } catch (error: any) {
    console.log("userService error usendeii", error);
    // throw new Error(error.response?.data?.message || 'Failed to verify refreshToken');
  }
};

export const setUsername = async (username: string) => {
  try {
    const response = await apiClient.post('/users/username', { username });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to set username');
  }
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await apiClient.get(`/users/check-username?username=${username}`);
    return response.data.available;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to check username');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get profile');
  }
};
