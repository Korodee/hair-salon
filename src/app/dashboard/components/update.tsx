import { FC } from "react";
import { BsBell } from "react-icons/bs";

const LatestNewsCard: FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#3d5d8f] via-[#27374D] to-[#275eac] text-white rounded-3xl p-6 shadow-xl md:h-[200px] space-y-4 border border-[#334155] backdrop-blur-lg">
      {/* Header */}
      <div className="relative flex items-center">
        {/* Notification Icon */}
        <div className="flex items-center justify-center bg-[#6366F1] p-2 rounded-full shadow-lg">
          <BsBell size={20} fill="white" />
        </div>

        {/* Latest News Text */}
        <span className="text-lg font-semibold ml-4 text-[#E0E7FF] tracking-wide">
          Latest News
        </span>
      </div>

      {/* Main Content */}
      <p className="text-sm leading-6 text-[#CBD5E1]">
        There’s going to be{" "}
        <span className="text-[#4ADE80] font-semibold">$200</span> off the Lorem
        ipsum dolor sit amet. Enjoy discounts on selected items. Event will take
        place on t amet. Enjoy discounts on selected items. Event will take{" "}
        <span className="text-[#4ADE80] font-semibold">12th of Feb</span> from{" "}
        <span className="text-[#4ADE80] font-semibold">10:00am</span> to{" "}
        <span className="text-[#4ADE80] font-semibold">2:00pm</span>.
      </p>

      {/* Button (Optional) */}
      {/* <button className="text-sm font-medium text-[#fff] underline hover:text-[#818CF8] transition duration-200">
        Book Appointment Now &rarr;
      </button> */}
    </div>
  );
};

export default LatestNewsCard;
