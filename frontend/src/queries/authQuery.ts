import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { ErrorResponse } from "../services/authService";
import { updateProfile } from "../services/authService";

interface UpdateUserData {
  name?: string;
  email?: string;
}

interface UpdateUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    rewardPoints: number;
  };
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      const response = await axios.post(`${API_URL}/auth/signup`, data);
      return response.data;
    },
  });
};

export const useUpdateUser = () => {
  return useMutation<UpdateUserResponse, ErrorResponse, UpdateUserData>({
    mutationFn: updateProfile,
    onSuccess: () => {
      // Invalidate and refetch user data
    }
  });
};

