"use client"; // This makes the component a client-side component

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/auth/signup/check-inbox";
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray">
      <div className="w-full h-full bg-gray-100 flex p-6 rounded-lg shadow-lg">
        {/* Left Side (Form) */}
        <div className="w-1/2 flex flex-col justify-center px-16 relative">
          {/* Korode Salon Logo */}
          <div className="absolute top-6 left-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">K</span>
              </div>
              <span className="text-lg font-semibold text-black">
                Korode Salon
              </span>
            </div>
          </div>

          <h2 className="text-3xl text-[#0C1421] font-bold">
            Create an account
          </h2>
          <p className="text-[#313957] mt-2">
            Already have an account?{" "}
            <a href="/auth/login" className="text-[#103FC1] font-medium">
              Login
            </a>
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[#0C1421]">User Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-[#0C1421]">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-[#0C1421]">Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
            >
              Sign Up
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-gray-500">Or</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Sign Up */}
          <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
            <FcGoogle size={25} />
            <span className="ml-2 text-gray-600">Continue with Google</span>
          </button>

          <p className="text-gray-400 text-xs text-center mt-6">
            © 2025 All Rights Reserved
          </p>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src="/img/signup.png"
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
