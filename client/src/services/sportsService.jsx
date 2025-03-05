import axios from "axios";

const API_URL = "/sports/api";

export const fetchPopularLeagues = async () => {
  const response = await axios.get(`${API_URL}/leagues/popular/`);
  return response.data;
};

export const fetchSportsWithLeagues = async () => {
  const response = await axios.get(`${API_URL}/leagues/`);
  return response.data;
};

export const fetchPopularMatches = async () => {
  const response = await axios.get(`${API_URL}/matches/popular/`);
  return response.data;
};

export const createBetSlip = async (betSlipData) => {
  const response = await axios.post(`${API_URL}/bet/`, betSlipData);
  return response.data;
};

export const fetchUserBets = async (statusFilter, page = 1, pageSize = 5) => {
  const params = { page, page_size: pageSize };
  if (statusFilter) params.status = statusFilter;
  const response = await axios.get(`${API_URL}/bets/`, { params });
  return response.data;
}