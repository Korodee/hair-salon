import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LogIn() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray">
      <div className="w-full h-full bg-gray-100 flex p-6 rounded-lg shadow-lg">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-16 relative">
          {/* Korode Salon Logo */}
          <div className="absolute top-8 left-1/2 md:left-6 transform md:-translate-x-1/2 md:transform-none">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">K</span>
              </div>
              <span className="hidden md:block text-lg font-semibold text-black">
                Korode Salon
              </span>
            </div>
          </div>

          <h2 className="text-3xl text-[#0C1421] font-bold">Welcome Back 👋</h2>
          <p className="text-[#313957] mt-2">
            Today is a new day. It's your day. Sign in to managing your
            Schedule.
          </p>

          <form className="mt-8 space-y-5">
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

            <div className="flex justify-between items-center">
              <Link
                href="/auth/login/recover-password"
                className="text-[#103FC1] text-sm font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
            >
              Sign In
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <p className="px-3 text-gray-500">Or</p>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Sign In */}
          <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
            <FcGoogle size={25} />
            <span className="ml-2 text-gray-600">Sign in with Google</span>
          </button>

          <p className="text-[#313957] mt-6 text-center text-sm">
            Don't have an account?{" "}
            <a href="/auth/signup" className="text-[#103FC1] font-medium">
              Sign up
            </a>
          </p>

          <p className="text-gray-400 text-xs text-center mt-6">
            ©️ 2025 All Rights Reserved
          </p>
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
