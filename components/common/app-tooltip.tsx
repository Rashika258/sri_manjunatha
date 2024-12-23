"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/index";
import { CircleAlert } from "lucide-react";

const AppTooltip = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const isOverflowingNow = element.scrollWidth > element.clientWidth;
  
      // Fallback: Use getBoundingClientRect for an additional check
      const rect = element.getBoundingClientRect();
      const actualWidth = rect.width;
      const isOverflowingWithRect = element.scrollWidth > actualWidth;
  
      console.log({
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        actualWidth,
        isOverflowingNow,
        isOverflowingWithRect,
      });
  
      setIsOverflowing(isOverflowingNow || isOverflowingWithRect);
    }
  }, [text]);
  

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={textRef}
            className="overflow-hidden flex w-full"
            style={{
              overflow: "hidden",
              textOverflow: isOverflowing ? "ellipsis" : "clip",
              maxWidth: "200px",
            }}
          >
            <p className="overflow-hidden text-ellipsis">{text ? text : <NoData />}</p>
          </div>
        </TooltipTrigger>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
      
      </Tooltip>
    </TooltipProvider>
  );
};

const NoData = () => {
  return (
    <div className="flex items-center gap-2">
      <CircleAlert /> <p className="font-light text-sm">No Data</p>
    </div>
  );
};

export default AppTooltip;
