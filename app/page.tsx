
"use client";
import { HomeCards } from "@/components/common/home-cards";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

const HomePage = () => {
  const { isMobile, open } = useSidebar();


  return (
    <div  className={`${
      isMobile || !open ? "w-full" : "w-[calc(100vw-16rem)]"
    } p-8 mt-[60px] h-full flex`}>
      <div className="w-full flex flex-grow">
        <HomeCards />
      </div>
    </div>
  );
};

export default HomePage;
