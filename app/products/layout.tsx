"use client";
import { useSidebar } from '@/components/ui/sidebar';
import React from 'react';

const InventoryLayout =  ({
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

export default InventoryLayout;
