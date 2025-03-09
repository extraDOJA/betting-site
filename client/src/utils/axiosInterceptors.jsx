import axios from "axios";

export const addRequestInterceptor = (axiosInstance, accessToken) => {
  return axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export const addResponseInterceptor = (axiosInstance, tokenCallback) => {
  return axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const refreshUrl = "/accounts/api/token/refresh/";

      if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== refreshUrl) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await axios.get(refreshUrl);
          const newToken = refreshResponse.data.accessToken;
          tokenCallback(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

export const RequestInterceptor = (token) => {
  return addRequestInterceptor(axios, token);
};

export const ResponseInterceptor = (tokenCallback) => {
  return addResponseInterceptor(axios, tokenCallback);
};
