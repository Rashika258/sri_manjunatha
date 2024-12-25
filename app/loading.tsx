"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Bars } from "react-loader-spinner";

const AppLoader = () => {
  const { theme } = useTheme();

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <Bars
        height="80"
        width="80"
        color={theme === "dark" ? "hsl(215 27.9% 16.9%)" : "hsl(220 14.3% 95.9%)"}
        ariaLabel="bars-loading"
        visible={true}
      />
      <p>
        This may take a few seconds, Please do not close or refresh this page
      </p>
    </div>
  );
};

export default AppLoader;
