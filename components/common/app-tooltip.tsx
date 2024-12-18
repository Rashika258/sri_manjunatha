import React, { useRef, useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const AppTooltip = ({
  text,
}: {
  text: string;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Check if the text overflows the container width
  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [text]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            ref={textRef}
            style={{
              whiteSpace: "nowrap", // Prevent wrapping of text
              overflow: "hidden", // Hide overflowing text
              textOverflow: isOverflowing ? "ellipsis" : "clip", // Add ellipsis if overflowing
            }}
          >
            {text}
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

export default AppTooltip;
