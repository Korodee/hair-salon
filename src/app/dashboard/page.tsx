"use client";

import { useState } from "react";
import Rewards from "./components/rewards";
import News from "./components/news";
import Banner from "./components/banner";
import Calendar from "./components/calendar";

export default function Dashboard() {
  const [user] = useState({ name: "Jane Doe", points: 120 });
  return (
    <div>
      {/* Dashboard Content */}
      <div className="mb-2">
        <div className="md:flex md:space-x-2 space-y-4 md:space-y-0 justify-between">
          {/* Card 1: Welcome */}
          <div className="md:w-1/2">
            <Banner />
          </div>
          {/* Card 2: Latest News */}
          <div className="md:w-1/2">
            <Rewards points={user.points} />
          </div>
        </div>
      </div>
      <div className="md:flex md:space-x-2 my-3 space-y-4 md:space-y-0 justify-between">
        <div className="md:w-2/3">
          <Calendar />
        </div>
        <div className="md:w-1/3">
          <News />
        </div>{" "}
      </div>
    </div>
  );
}
