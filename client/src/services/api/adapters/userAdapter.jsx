import { API_ENDPOINTS } from "../config";
import { ApiClient } from "../core/apiClient";

// Define the URLs for the user endpoints
const USER_URLS ={
    ADD_BALANCE: "/balance/",
}

// Create an instance of the ApiClient
class UserAdapter {
    constructor(){
        this.client = new ApiClient(API_ENDPOINTS.ACCOUNTS);
    }

    async addBalance(amount){
        return this.client.put(USER_URLS.ADD_BALANCE, amount);
    }
}

export const userAdapter = new UserAdapter();