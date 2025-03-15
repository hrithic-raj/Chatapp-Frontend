import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "Request timed out. Please check your network connection and try again.",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config : InternalAxiosRequestConfig) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken && config.headers) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error : AxiosError) => {
      const orginalRequest = error.config as AxiosRequestConfig & {_retry?: boolean}
      if(error.response && error.response.status === 401 && !orginalRequest._retry){
      orginalRequest._retry = true;
      try{
        const response = await apiClient.post('/auth/refresh-token',{},{withCredentials:true});
        const accessToken = response.data.newAccessToken;
        console.log("new accessToken", accessToken);
          localStorage.setItem('accessToken', accessToken);
          if(orginalRequest.headers){
              orginalRequest.headers['Authorization'] = `Bearer ${accessToken}`; 
          }
          return axios(orginalRequest);
      }catch(refreshError){
          localStorage.clear()
          console.error('Token refresh failed:', refreshError);
      }
  }
      return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (err) => {
    console.error("Response Error:", err.response.data);
    return Promise.reject(err.response.data);
  }
);


export default apiClient;
