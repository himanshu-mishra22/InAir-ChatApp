import axios from "axios";

export const API_URL = "https://chatbackend-nkh3.onrender.com";
export const httpClient = axios.create({
    baseURL: API_URL,
    
});

