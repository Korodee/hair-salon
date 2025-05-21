import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const TOKEN_KEY = "authToken";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  rewardPoints?: number;
  bookings?: Array<{
    _id: string;
    service: string;
    date: string;
    time: string;
    status: string;
  }>;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// List of public routes that don't require authentication
const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/verify-email",
  "/auth/check-inbox",
  "/auth/reset-password",
];

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(location.pathname);

    // For public routes, immediately set loading to false and return
    if (isPublicRoute) {
      setIsLoading(false);
      return;
    }

    // Only check authentication for protected routes
    const checkAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setUser(null);
        setIsLoading(false);
        navigate("/auth/login");
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
        localStorage.removeItem(TOKEN_KEY);
        navigate("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);

  return (
    <AppContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApplicationContext must be used within an AppProvider");
  }
  return context;
};
