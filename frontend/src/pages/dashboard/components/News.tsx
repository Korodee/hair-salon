import React from "react";
import { FaNewspaper } from "react-icons/fa";

const News = () => {
  const newsItems = [
    {
      title: "New Services Available",
      description:
        "Check out our latest hair styling services and special offers.",
      date: "2024-03-20",
    },
    {
      title: "Holiday Hours",
      description:
        "We'll be open during the upcoming holidays with special appointments.",
      date: "2024-03-18",
    },
    {
      title: "Loyalty Program Update",
      description: "Earn double points on all bookings this month!",
      date: "2024-03-15",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <FaNewspaper className="text-indigo-600 text-2xl mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Latest News</h3>
      </div>
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 last:border-0"
          >
            <h4 className="font-medium text-gray-900">{item.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            <p className="text-xs text-gray-500 mt-2">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
