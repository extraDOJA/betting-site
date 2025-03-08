import axios from "axios";

const API_URL = "accounts/api";

export const loginRequest = async (credentials) => {
  const response = await axios.post(`${API_URL}/token/`, credentials);
  return response.data;
};

export const registerRequest = async (credentials) => {
  const response = await axios.post(`${API_URL}/register/`, credentials);
  return response.data;
};

export const refreshTokenRequest = async () => {
  const response = await axios.get(`${API_URL}/token/refresh/`);
  return response.data;
};

export const logoutRequest = async () => {
  await axios.post(`${API_URL}/logout/`);
};