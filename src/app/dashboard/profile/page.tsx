"use client"
import { useApplicationContext } from "@/context/appContext";
import { useUpdateUser } from "@/queries/authQuery";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const totalPoints = 200;
  const pointsLeft = 80;
  const totalPointsEarned = totalPoints - pointsLeft;
  const progress = ((totalPoints - pointsLeft) / totalPoints) * 100;
  const { user } = useApplicationContext();
  const router = useRouter();
  const { mutate: updateUser, isLoading } = useUpdateUser();
  const [name, setName] = useState(user?.name);

  const handleUpdateUser = () => {
    updateUser({ name }, {
      onSuccess: () => {
        toast.success("User updated successfully");
      },
      onError: () => {
        toast.error("Failed to update user");
      }
    });
  };


  return (
    <div className="flex flex-col">
      <div
        className="relative bg-gray-900 text-center text-white rounded-md overflow-hidden mb-2 h-30  shadow-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/img/profile-banner.jpg')" }}
      >
        {/* Overlay (Optional, for contrast) */}
        <div className="bg-black/40 p-2 md:p-4 h-full w-full flex flex-col justify-center ">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-black text-4xl font-bold flex items-center justify-center rounded-full">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl text-left text-white font-semibold">
                {user?.name}
              </h1>
              <p className="text-gray-300">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Details */}
      <div className="text-black/80 ">
        <div className="text-white">
          {/* Profile Info */}
          <div className="mx-2 text-black my-4">
            <div className="flex items-center mb-3 justify-between">
              <div>
                {" "}
                <h2 className="text-xl font-semibold">Personal Info</h2>
                <p className="text-gray-800 text-sm md:text-md">
                  Update your personal info
                </p>
              </div>
              <button className="flex w-fit items-center gap-2 px-5 py-2 bg-black text-white rounded-md text-sm font-medium transition-all duration-300 transform hover:bg-white hover:text-black hover:scale-105 group" onClick={handleUpdateUser} disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Edit"}
              </button>
            </div>

            <div className="md:space-x-4 border-gray-500 border p-4 rounded-md justify-between md:flex">
              <div className="w-full">
                <label className="text-black font-medium block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full p-2 bg-transparent border border-gray-600 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="w-full pt-3 md:pt-0">
                <label className="text-black font-medium block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <hr className="my-4 border-t-1 mx-2 border-gray-900 opacity-50" /> */}
        <div className="mx-2 md:flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Your Bookings
              </h3>
              <p className="text-gray-700 text-sm">
                You&apos;ve made{" "}
                <span className="font-bold text-gray-700">{user?.bookings?.length}</span> bookings so
                far.
              </p>
            </div>
          </div>
          <Link href="/dashboard/booking-history">
            <button className="flex w-fit mt-3 md:mt-0 items-center gap-2 px-5 py-2 bg-black text-white rounded-md text-sm font-medium transition-all duration-300 transform hover:bg-white hover:text-black hover:scale-105 group">
              View History
            </button>
          </Link>
        </div>
        <hr className="my-4 border-t-1 mx-2 border-gray-900 opacity-50" />
        {/* Rewards */}
        <div className="mb-6 mx-2 ">
          <div className="flex justify-between">
            {" "}
            <div>
              {" "}
              <h3 className="text-xl font-semibold text-gray-900">
                Reward Points
              </h3>
              <p className="text-gray-700 text-sm">
                Track your reward points to unlock exclusive benefits!
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center mt-2">
            <div className="flex space-x-6 items-center">
              {/* Circular Progress Bar */}
              <div className="relative w-28 h-28">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    className="text-gray-300"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  {/* Progress Circle */}
                  <circle
                    className="text-green-500"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * progress) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-green-600">
                  {progress.toFixed(0)}%
                </div>
              </div>

              {/* Points Details */}
              <div className="">
                <div className="flex justify-between w-full">
                  <div className="text-md font-medium text-gray-800 w-full flex items-center">
                    Total Points:
                    <span className="text-yellow-600 font-bold text-xl mx-2">
                      {totalPoints}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between w-full">
                  <div className="text-md font-medium flex items-center text-gray-800 w-full">
                    Total Points Earned:{" "}
                    <span className="text-green-600 text-center justify-center font-bold text-xl mx-2">
                      {totalPointsEarned}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between w-full">
                  <div className="text-md font-medium flex items-center text-gray-800 w-full">
                    Points Left to Redeem:{" "}
                    <span className="text-red-500 font-bold text-xl mx-2">
                      {pointsLeft}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-t-1 mx-2 border-gray-900 opacity-50" />
        {/* Change Password */}
        <div className="mx-2 md:flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Password</h3>
              <p className="text-gray-700 text-sm">
                Modify your current password
              </p>
            </div>
          </div>

          <button className="flex mt-2 md:mt-0 w-fit items-center gap-2 px-5 py-2 bg-black text-white rounded-md text-sm font-medium transition-all duration-300 transform hover:bg-white hover:text-black hover:scale-105 group" onClick={() => router.push("/auth/login/recover-password")}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
