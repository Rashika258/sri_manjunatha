"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const AppNavbar = () => {
  const navigationItems = [
    {
      label: "Item One",
      links: ["Link 1", "Link 2", "Link 3"],
    },
    {
      label: "Item Two",
      links: ["Submenu 1", "Submenu 2"],
    },
  ];
  return (
    <nav className="w-full min-w-full flex items-center justify-between py-4 px-2">
      <div className="flex items-center">
        <SidebarTrigger />
        <p className="caveat--font text-slate-600 text-2xl">
          Sri Manjunatha Engineering Works
        </p>
      </div>

      <div className="flex  items-center">
        {navigationItems.map((item, index) => (
          <p className="inter__font text-base" key={index}>{item.label}</p>
        ))}

        <ModeToggle />

        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default AppNavbar;
