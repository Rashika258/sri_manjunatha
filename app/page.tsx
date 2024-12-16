import { HomeCards } from "@/components/common/home-cards";
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-background h-[100vh] w-full">
    <div className="w-full flex flex-grow">
      <HomeCards />
    </div>
  </div>
  );
};

export default HomePage;
