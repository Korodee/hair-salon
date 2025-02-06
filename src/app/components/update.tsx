import { FC } from "react";
import { BsBell } from "react-icons/bs";

const LatestNewsCard: FC = () => {
  return (
    <div className=" bg-green-900 h-[200px] text-white rounded-3xl p-6 space-y-2 shadow-lg">
      {/* Header */}

      <div className="relative flex items-center">
        {/* Notification icon */}
        <BsBell className="absolute left-0 " size={24} fill="yellow" />

        {/* Latest News text */}
        <span className="text-lg text-green-400 font-bold pl-8">
          Latest News
        </span>
      </div>
      {/* Main Content */}
      <h3 className="text-md font-medium">
        There’s going to be <span className="text-green-300">$200</span> of
        discount on the Lorem ipsum dolor sit amet, discount on the Lorem ipsum,
        discount on the Lorem dolor sit amet, consectetur adipiscing elit.
        <span className="text-green-300">12th of Feb</span> from{" "}
        <span className="text-green-300">10:00am</span> to{" "}
        <span className="text-green-300">2:00pm</span>.
      </h3>
      {/* Link */}
      {/* <button className="text-sm text-green-300 underline hover:text-green-400 transition">
        See Details &rarr;
      </button> */}
    </div>
  );
};

export default LatestNewsCard;
