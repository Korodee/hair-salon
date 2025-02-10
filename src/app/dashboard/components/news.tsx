import { FC } from "react";
import { BsBell } from "react-icons/bs";

const newsList = [
  {
    title: "Upcoming Discount Event!",
    description:
      "Enjoy a $200 discount on selected items. Event takes place on 12th of Feb from 10:00am to 2:00pm.",
    date: "Feb 10, 2025",
    highlight: true,
  },
  {
    title: "New Hair Treatment Available",
    description:
      "Introducing our latest deep-conditioning hair treatment. Book your appointment today!",
    date: "Jan 28, 2025",
    highlight: false,
  },
  {
    title: "New Hair Treatment Available",
    description:
      "Introducing our latest deep-conditioning hair treatment. Book your appointment today!",
    date: "Jan 28, 2025",
    highlight: false,
  },
];

const NewsListCard: FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#3d5d8f] via-[#27374D] to-[#275eac] text-white rounded-3xl p-6 shadow-xl space-y-4 border border-[#334155] backdrop-blur-lg">
      {/* Header */}
      <div className="relative flex items-center">
        <div className="flex items-center justify-center bg-[#6366F1] p-2 rounded-full shadow-lg">
          <BsBell size={20} fill="white" />
        </div>
        <span className="text-lg font-semibold ml-4 text-[#E0E7FF] tracking-wide">
          News & Updates
        </span>
      </div>

      {/* News List */}
      <div className="space-y-3">
        {newsList.map((news, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              news.highlight
                ? "bg-[#1E293B] border border-[#4ADE80]"
                : "bg-[#2C3A4A]"
            }`}
          >
            <h4 className="text-[#E0E7FF] font-semibold">{news.title}</h4>
            <p className="text-sm text-[#CBD5E1]">{news.description}</p>
            <span className="text-xs text-gray-400">{news.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsListCard;
