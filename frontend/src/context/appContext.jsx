"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authServices";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (!loading && !user && !location.pathname.startsWith("/auth")) {
            navigate("/auth/login");
        }
    }, [user, loading, location.pathname, navigate]);

    const value = {
        user,
        setUser,
        loading,
        setLoading,
        location,
        navigate,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApplicationContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApplicationContext must be used within an AppProvider");
    }
    return context;
}
