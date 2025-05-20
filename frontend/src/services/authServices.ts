import axios from "axios";
import type { User } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface GoogleLoginResponse {
  token: string;
  user: User;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const signup = async (credentials: SignupCredentials) => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/signup`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const loginWithGoogle = async (token: string) => {
  try {
    const response = await axios.post<GoogleLoginResponse>(`${API_URL}/auth/google`, { token });
    return response.data;
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const response = await axios.get<User>(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}; 