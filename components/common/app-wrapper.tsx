"use client";
import React, { Suspense } from "react";
import { useSidebar } from "../ui";

const AppWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isMobile, open } = useSidebar();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className={`${
          isMobile || !open ? "w-screen" : "w-[calc(100vw-16rem)]"
        }  mt-[60px]  flex h-full overflow-hidden `}
      >
        {children}
      </div>
    </Suspense>
  );
};
export default AppWrapper;
