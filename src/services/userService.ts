import axios from '@/lib/axios.config';

export const setUsername = async (username: string) => {
  try {
    const response = await axios.post('/api/users/username', { username });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to set username');
  }
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await axios.get(`/api/users/check-username?username=${username}`);
    return response.data.available;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to check username');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get('/api/users/profile');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get profile');
  }
};
