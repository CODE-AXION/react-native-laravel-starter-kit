import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "../utils/axios";
// import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if user is logged in on app start
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        const token = await SecureStore.getItemAsync("access_token");

        if (token) {
            try {
                const response = await axios.get("/api/v1/user");

                setUser(response.data);
            } catch (error) {}
        }

        setLoading(false);
    };
    
    const login = async (email, password) => {
        try {
            setLoading(true);
            
            const response = await axios.post("/api/sanctum/token", {
                email,
                password, 
                device_name: "Mobile",
            });

            await SecureStore.setItemAsync("access_token", response.data.token);
            await SecureStore.setItemAsync("refresh_token", response.data.refresh_token);
            
            setUser(response.data.user);
            setLoading(false);

        } catch (error) {
            setLoading(false); // Make sure to set loading false even on error
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login }}>
            {children}
        </AuthContext.Provider>
    );
}