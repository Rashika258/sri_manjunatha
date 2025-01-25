"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Badge,
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

      const tempSpan = document.createElement("span");
      tempSpan.style.position = "absolute";
      tempSpan.style.visibility = "hidden";
      tempSpan.style.whiteSpace = "nowrap";
      tempSpan.textContent = element.textContent;

      document.body.appendChild(tempSpan);
      const fullTextWidth = tempSpan.offsetWidth;
      document.body.removeChild(tempSpan);

      setIsOverflowing(fullTextWidth > element.clientWidth);
    }
  }, [text]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div ref={textRef} className=" flex w-full items-center">
            <p className="overflow-hidden text-ellipsis">
              {text ? text : <NoData />}
            </p>
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
  return (
    <Badge variant={"secondary"}>
      <div className="flex items-center gap-2">
        <CircleAlert size={12} />{" "}
        <p className="font-light text-[12px]">No Data</p>
      </div>
    </Badge>
  );
};

export default AppTooltip;
