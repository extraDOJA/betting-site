import axios from "axios";

const API_URL = "sports/api";

export const fetchPopularLeagues = async () => {
    const response = await axios.get(`${API_URL}/leagues/popular/`);
    return response.data;
}

export const fetchSportsWithLeagues = async () => {
    const response = await axios.get(`${API_URL}/leagues/`);
    return response.data;
}

export const fetchPopularMatches = async () => {
    const response = await axios.get(`${API_URL}/matches/popular/`);
    return response.data;
}