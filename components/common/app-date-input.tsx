import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils"; // Adjust the import path based on your project structure

interface AppDateInputProps<T extends Date | undefined> {
  field: {
    value: T;
    onChange: (value: T) => void;
  };
  formatValue?: (value: T) => string; // Custom formatting for the value
  disabledDates?: (date: Date) => boolean; // Optional custom disabled dates logic
}

const AppDateInput = <T extends Date | undefined>({
  field,
  formatValue,
  disabledDates,
}: AppDateInputProps<T>) => {
  const formattedValue = formatValue
    ? formatValue(field.value) // If a custom format function is provided, use it
    : field.value instanceof Date
    ? format(field.value, "PPP") // Default date formatting if it's a Date
    : ""; // If it's undefined, show nothing

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {formattedValue ? formattedValue : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={(date) => field.onChange(date as T)}
          disabled={disabledDates}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default AppDateInput;
