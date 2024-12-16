"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import React from "react";

const AppNavbar = () => {
  // const navigationItems = [
  //   {
  //     label: "Item One",
  //     links: ["Link 1", "Link 2", "Link 3"],
  //   },
  //   {
  //     label: "Item Two",
  //     links: ["Submenu 1", "Submenu 2"],
  //   },
  // ];

  const { isMobile, open } = useSidebar();

  return (
    <nav
      className={`${
        isMobile || !open ? "w-full" : "w-[calc(100vw-16rem)]"
      } flex items-center justify-between py-4 px-8 fixed top-0 bg-navbar-background h-[60px]`}
    >
      <div className="flex items-center">
        <SidebarTrigger />
        <p className="caveat__font text-slate-600 text-2xl">
          Sri Manjunatha Engineering Works
        </p>
      </div>

      <div className="flex  items-center">
        {/* {navigationItems.map((item, index) => (
          <p className="inter__font text-base" key={index}>
            {item.label}
          </p>
        ))} */}

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
