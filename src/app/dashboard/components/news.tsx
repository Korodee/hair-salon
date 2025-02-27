import { useGetNews } from "@/queries/newsQuery";
import { FC } from "react";
import { BsBell } from "react-icons/bs";
import Spinner from "../components/spinner";

type News = {
  title: string;
  content: string;
  createdAt: string;
  highlight: boolean;
};

const NewsListCard: FC = () => {
  const { data: newsList, isLoading } = useGetNews();

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
      {isLoading && (
        <div className="py-20">
          <Spinner />
        </div>
      )}

      {/* News List */}
      {!isLoading && (
        <div className="space-y-3">
          {newsList?.map((news: News, index: number) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                news.highlight
                  ? "bg-[#1E293B] border border-[#4ADE80]"
                  : "bg-[#2C3A4A]"
              }`}
            >
              <h4 className="text-[#E0E7FF] font-semibold">{news.title}</h4>
              <p className="text-sm text-[#CBD5E1]">{news.content}</p>
              <span className="text-xs text-gray-400">
                {new Date(news.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsListCard;
