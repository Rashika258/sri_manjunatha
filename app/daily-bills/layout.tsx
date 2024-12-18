"use client";

import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

const DailyBillsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isMobile, open } = useSidebar();

  return (
    <div
      className={`${
        isMobile || !open ? "w-full" : "w-[calc(100vw-16rem)]"
      } p-8 mt-[60px] h-full flex`}
    >
      {children}
    </div>
  );
};

export default DailyBillsLayout;
