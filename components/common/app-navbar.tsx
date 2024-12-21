"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  ModeToggle,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/index";
import React from "react";

const AppNavbar = () => {
  const { isMobile, open } = useSidebar();

  return (
    <nav
      className={`${
        isMobile || !open ? "w-screen" : "w-[calc(100vw-16rem)]"
      } flex items-center justify-between py-4 px-8 fixed top-0 bg-navbar-background h-[60px]`}
    >
      <div className="flex items-center">
        <SidebarTrigger />
        <p className="caveat__font text-slate-600 text-2xl">
          Sri Manjunatha Engineering Works
        </p>
      </div>

      <div className="flex  items-center">
        <ModeToggle />

        <Avatar className="h-8 w-8 ml-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default AppNavbar;
