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
      setIsOverflowing(
        textRef.current.scrollWidth > textRef.current.clientWidth
      );
    }
  }, [text]);

  console.log("text======", text);
  

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            ref={textRef}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: isOverflowing ? "ellipsis" : "clip",
            }}
          >
            {text ? text : <NoData />}
          </div>
        </TooltipTrigger>
        {isOverflowing && (
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

const NoData = () => {
  return (<div className="flex items-center gap-2">
    <CircleAlert /> <p className="font-light text-sm">No Data</p>
  </div>);
};

export default AppTooltip;
