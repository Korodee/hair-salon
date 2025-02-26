"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/authService";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children, initialState = {} }) => {
  const [user, setUser] = useState(initialState.user || null);
  const pathname = usePathname();
  const router = useRouter();

  const fetchUser = async () => {
    const response = await getCurrentUser();
    if (response) {
      setUser(response);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const authPaths = [
      "/auth/login",
      "/auth/signup",
      "/auth/verify-email",
      "/auth/signup/check-inbox",
      "/auth/login/recover-password",
      "/auth/login/recover-password/reset",
      "/"
    ];

    if (!authPaths.some((path) => pathname.startsWith(path))) {
      const token = localStorage.getItem("authToken");
      if (token) {
        fetchUser();
      } else {
        router.push("/auth/login");
      }
    }
  }, [pathname]);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => useContext(ApplicationContext);
