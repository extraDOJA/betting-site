import axios from "axios";

export const RequestInterceptor = (accessToken) =>
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = !config._retry && accessToken ? `Bearer ${accessToken}` : config.headers.Authorization;
    return config;
  });

export const ResponseInterceptor = (handleAccessToken) =>
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && (error.response.data.detail === "Token is invalid or expired" || error.response.data.detail === "Authentication credentials were not provided.")) {
        try {
          const response = await axios.post("/api/token/refresh/");
          const { access } = response.data;
          handleAccessToken(access);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          originalRequest._retry = true;

          return axios(originalRequest);
        } catch {
          handleAccessToken(null);
        }
      }
      return Promise.reject(error);
    }
  );
