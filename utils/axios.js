import axios from "axios";
import * as SecureStore from "expo-secure-store";

const fetch = axios.create({
    baseURL: "https://27b7-103-241-226-97.ngrok-free.app",
});

// Add token to request headers
fetch.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default fetch;
