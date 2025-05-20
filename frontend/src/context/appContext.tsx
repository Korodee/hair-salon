import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authServices";

interface User {
  id: string;
  name: string;
  email: string;
  rewardPoints?: number;
  bookings?: Array<{
    id: string;
    service: string;
    date: string;
    time: string;
    status: string;
  }>;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  location: ReturnType<typeof useLocation>;
  navigate: ReturnType<typeof useNavigate>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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
