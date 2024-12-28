"use client";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/index";
import { FallingLines } from "react-loader-spinner";
import { useTheme } from "next-themes";
import { AppDropdownProps } from "@/types";

const AppDropdownLoader = () => {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center flex-col p-2">
      <FallingLines
        color={
          theme === "dark" ? "hsl(215 27.9% 16.9%)" : "hsl(220 14.3% 95.9%)"
        }
        width="30"
        height="30"
        visible={true}
      />
      <span className="text-sm">Loading</span>
    </div>
  );
};

const AppDropdown = ({
  options,
  field,
  placeholder,
  isLoading,
}: AppDropdownProps) => {
  return (
    <Select onValueChange={(value)=> field.onChange(value, options?.find((option) => option.value === value)?.label as string)} defaultValue={field.value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {isLoading ? (
          <AppDropdownLoader />
        ) : (
          options?.map((option, index) => (
            <SelectItem key={index} value={option.value!}>
              {option.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default AppDropdown;
