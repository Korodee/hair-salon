"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$><_.~!%*?&`':;}{?#"^~+=(),\-\\/\[\]\|])[A-Za-z\d@$><_.~!%*?&`':;}{?#"^~+=(),\-\\/\[\]\|]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://booking-site-backend-production.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Something went wrong.");
      } else {
        router.push("/auth/signup/check-inbox");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray">
      <div className="w-full h-full bg-gray-100 flex py-2 px-6 md:py-6 md:px-6 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 flex flex-col md:justify-center md:px-16 relative">
          <div className="absolute top-8 md:left-6 transform md:-translate-x-1/2 md:transform-none">
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

          <div className="mt-[6rem] md:mt-[6rem]">
            <h2 className="text-3xl text-[#0C1421] font-bold">
              Create an account
            </h2>
            <p className="text-[#313957] mt-2">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#103FC1] font-medium">
                Login
              </Link>
            </p>

            {errorMessage && <p className="text-red-600">{errorMessage}</p>}

            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#0C1421]">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#0C1421]">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none"
                />
              </div>

              <div className="relative">
                <label className="block text-[#0C1421] mb-1">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none pr-10"
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
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none pr-10"
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
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <p className="px-3 text-gray-500">Or</p>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
              <FcGoogle size={25} />
              <span className="ml-2 text-gray-600">Continue with Google</span>
            </button>

            <p className="text-gray-400 text-xs text-center mt-6">
              © 2025 All Rights Reserved
            </p>
          </div>
        </div>

        <div className="w-1/2 hidden md:block items-center justify-center p-4">
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
