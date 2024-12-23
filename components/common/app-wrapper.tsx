"use client";
import React from 'react';
import { useSidebar } from '../ui';

const AppWrapper =  ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const { isMobile, open } = useSidebar();
  
    return (
      <div
        className={`${
          isMobile || !open ? "w-screen" : "w-[calc(100vw-16rem)]"
        }  mt-[60px]  flex h-full overflow-hidden `}
      >
        {children}
      </div>
    );
}
export default AppWrapper;
