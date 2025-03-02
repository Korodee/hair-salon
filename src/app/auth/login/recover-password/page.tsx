"use client";
import { useRequestPasswordReset } from "@/queries/authQuery";
import { ErrorResponse } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");

  const { mutate: requestPasswordReset, isLoading } = useRequestPasswordReset();

  const handleSubmit = (
    e: React.FormEvent,
    successMessage: string = "Password reset link sent to email"
  ) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    requestPasswordReset(
      { email },
      {
        onSuccess: () => {
          toast.success(successMessage);
        },
        onError: (error: ErrorResponse) => {
          toast.error(error.response?.data?.message || "An error occurred");
        },
      }
    );
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray">
      <div className="w-full h-full bg-gray-100 flex py-2 px-6 md:py-6 md:px-6 rounded-lg shadow-lg">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 flex flex-col md:justify-center md:px-16 relative">
          {/* Braidz World Logo */}
          <div className="absolute top-6 md:left-6">
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
              Enter the email address associated with your account.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#0C1421]">Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition flex items-center justify-center space-x-5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                ) : (
                  "Recover Password"
                )}
              </button>
            </form>

            <p className="text-[#313957] mt-6 text-center text-sm">
              Didn&apos;t see any email?{" "}
              <button
                type="button"
                onClick={(e) =>
                  handleSubmit(e, "Password reset link resent to email")
                }
                className="text-[#103FC1] font-medium"
                disabled={isLoading}
              >
                Resend link
              </button>
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
