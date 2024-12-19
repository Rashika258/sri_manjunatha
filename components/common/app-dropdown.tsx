import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AppDropdownProps<T> {
  options: T[];
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  placeholder: string;
}

const AppDropdown = <T,>({
  options,
  field,
  getOptionLabel,
  getOptionValue,
  placeholder
}: AppDropdownProps<T>) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={index} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AppDropdown;
