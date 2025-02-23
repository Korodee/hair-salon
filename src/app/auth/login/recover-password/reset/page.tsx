"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/queries/authQuery";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/services/authService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function RecoverPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { mutate: resetPassword, isLoading } = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid token");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword({ token, password }, {
      onSuccess: () => {
        toast.success("Password reset successfully");
        router.push("/auth/login");
      },
      onError: (error: ErrorResponse) => {
        toast.error(error.response?.data?.message || "An error occurred");
      },
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray">
      <div className="w-full h-full bg-gray-100 flex py-2 px-6 md:py-6 md:px-6 rounded-lg shadow-lg">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 flex flex-col md:justify-center md:px-16 relative">
          {/* Braidz World Logo */}
          <div className="absolute top-8 md:left-6 transform md:-translate-x-1/2 md:transform-none">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">B</span>
                </div>
                <span className="text-lg font-semibold text-black">
                  Braidzworld
                </span>
              </div>
            </Link>
          </div>
          <div className="mt-[6rem] md:mt-0">
            <h2 className="text-3xl text-[#0C1421] font-bold">
              Recover Password
            </h2>
            <p className="text-[#313957] mt-2">
              Enter your new password and confirm
            </p>

            <form className="mt-8 space-y-5">
              <div className="relative">
                <label className="block text-[#0C1421] mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-none pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#0C1421]">Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-none pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition flex items-center justify-center space-x-5"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading && (
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                )}
                Reset Password
              </button>
            </form>

            <p className="text-[#313957] mt-6 text-center text-sm">
              Remember your password?{" "}
              <a href="/auth/login" className="text-[#103FC1] font-medium">
                Back to login
              </a>
            </p>

            <p className="text-gray-400 text-xs text-center mt-6">
              ©️ 2025 All Rights Reserved
            </p>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2 hidden md:block  items-center justify-center p-4">
          <div className="relative  w-full h-full rounded-xl overflow-hidden">
            <Image
              src="/img/login.png"
              alt="Barber shop"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
