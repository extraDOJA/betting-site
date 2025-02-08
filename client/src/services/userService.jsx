import axios from "axios";

const API_URL = "accounts/api";

export const addBalance = async (data) => {
    const response = await axios.post(`${API_URL}/balance/`, data);
    return response.data;
};