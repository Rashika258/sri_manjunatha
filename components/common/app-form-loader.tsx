"use client";

import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { useTheme } from "next-themes";

const AppFormLoader = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color={theme === "dark" ? "hsl(210 20% 98%)" : "hsl(224 71.4% 4.1%)"}
        secondaryColor={
          theme === "dark" ? "hsl(263.4 70% 50.4%)" : "hsl(262.1 83.3% 57.8%)"
        }
        radius="12.5"
        ariaLabel="mutating-dots-loading"
      />
      <p>This may take a few seconds, Please do not close or refresh this page</p>
    </div>
  );
};

export default AppFormLoader;
