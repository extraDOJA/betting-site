import axios from "axios";

const API_URL = "sports/api";

export const fetchPopularLeagues = async () => {
    const response = await axios.get(`${API_URL}/popular-leagues/`);
    return response.data;
}

export const fetchSportsWithLeagues = async () => {
    const response = await axios.get(`${API_URL}/sports-with-leagues/`);
    return response.data;
}