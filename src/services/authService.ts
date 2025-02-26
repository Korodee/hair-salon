import api from "./api";

export type ErrorResponse = {
    response: {
      data: {
        message: string;
      }
    }
  };

export const login = async (email: string, password: string) => {
    try {
     const response = await api.post("/auth/login", { email, password });
     return response.data;
    } catch (error) {
       throw error as ErrorResponse;
    }
}

export const register = async (email: string, password: string, name: string) => {
    try {
        const response = await api.post("/auth/register", { email, password, name });
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/auth/current-user");
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const verifyEmail = async (token: string) => {
    try {
        const response = await api.post("/auth/verify-email", { token });
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const requestPasswordReset = async (email: string) => {
    try {
        const response = await api.post("/auth/request-password-reset", { email });
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const resetPassword = async (token: string, password: string) => {
    try {
        const response = await api.post("/auth/reset-password", { token, password });
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const loginGmail = async (email: string) => {
    try {
        const response = await api.post("/auth/login-gmail", { email });
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const signupGmail = async (email: string) => {
    try {
        const response = await api.post("/auth/signup-gmail", { email });   
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const updateUser = async (name: string) => {
    try {
        const response = await api.put("/auth/update-user", { name });
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const deleteUser = async () => {
    try {
        const response = await api.delete("/auth/delete-user");
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const resendVerificationToken = async (email: string) => {
    try {
        const response = await api.post("/auth/resend-verification-token", { email });
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const loginWithGmail = async (data: object) => {
    try {
        const response = await api.post("/auth/login-gmail", data);
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}

export const signupWithGmail = async (data: object) => {
    try {
        const response = await api.post("/api/signup-gmail", data);
        return response.data;
    } catch (error) {
        throw error as ErrorResponse;
    }
}