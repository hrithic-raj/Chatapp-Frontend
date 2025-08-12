import apiClient from '@/lib/axios.config';

export const searchUsers = async (query: string) => {
    if (!query) return [];
    const res = await apiClient.get(`/users/search?query=${query}`);
    return res.data;
};

// interface TokenResponse {
//   user: {
//     _id: string;
//     newUser?: boolean;
//     username?: string;
//   };
// }

export const verifyRefreshToken = async (refreshToken: string)=> {
  // try {
  //   const response = await apiClient.post('/auth/verify-token', { refreshToken });
  //   return response.data;
  // } catch (error: unknown) {
  //   console.error("Token verification failed:", error);
  //   const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
  //   throw new Error(errorMessage || 'Failed to verify refresh token');
  // }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refreshToken=${refreshToken}`,
      },
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || 'Failed to verify refresh token');
    }
    
    return data;
  } catch (error) {
    console.error("Token verification failed:", error);
    // throw new Error('Failed to verify refresh token');
    throw error;
  }
};

export const setUsername = async (username: string) => {
  try {
    const response = await apiClient.post('/users/username', { username });
    return response.data;
  } catch (error: unknown) {
    const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
    throw new Error(errorMessage || 'Failed to set username');
  }
};

export const checkUsernameAvailability = async (username: string) => {
  try {
    const response = await apiClient.get(`/users/check-username?username=${username}`);
    return response.data.available;
  } catch (error: unknown) {
    const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
    throw new Error(errorMessage || 'Failed to check username');
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error: unknown) {
    const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
    throw new Error(errorMessage || 'Failed to get profile');
  }
};
