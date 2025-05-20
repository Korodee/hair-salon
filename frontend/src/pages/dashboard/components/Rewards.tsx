import React from "react";
import { FaGift } from "react-icons/fa";

interface RewardsProps {
  points: number;
}

const Rewards: React.FC<RewardsProps> = ({ points = 0 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Reward Points</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{points}</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <FaGift className="text-indigo-600 text-2xl" />
        </div>
      </div>
      <p className="text-gray-600 mt-4">
        Earn points with every booking and redeem them for exclusive rewards!
      </p>
    </div>
  );
};

export default Rewards;
