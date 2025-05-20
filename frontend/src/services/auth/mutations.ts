import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, signup, verifyEmail, resetPassword } from "./api";
import { toast } from "react-toastify";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to login");
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success("Account created successfully! Please verify your email.");
      navigate("/auth/signup/check-inbox");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create account");
    },
  });
};

export const useVerifyEmail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success("Email verified successfully!");
      navigate("/auth/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to verify email");
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully!");
      navigate("/auth/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
}; 