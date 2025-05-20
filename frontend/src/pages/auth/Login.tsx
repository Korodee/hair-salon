"use client";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  login,
  loginWithGoogle,
  type LoginCredentials,
} from "../../services/authServices";
import { useApplicationContext } from "../../context/appContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useApplicationContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Login failed";
      if (message.includes("verify")) {
        navigate(`/check-inbox?email=${email}`);
      } else {
        setError(message);
      }
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: (token: string) => loginWithGoogle(token),
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Google login failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate({ email, password });
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/google/url`
      );
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast.error("Failed to initiate Google login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <RouterLink
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </RouterLink>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <RouterLink
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </RouterLink>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loginMutation.isPending ? (
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoginMutation.isPending}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {googleLoginMutation.isPending ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                ) : (
                  "Sign in with Google"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
