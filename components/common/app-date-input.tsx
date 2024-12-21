import React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Button,
  FormControl,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
} from "@/components/ui/index";

interface AppDateInputProps<T extends Date | undefined> {
  field: {
    value: T;
    onChange: (value: T) => void;
  };
  formatValue?: (value: T) => string;
  disabledDates?: (date: Date) => boolean;
}

const AppDateInput = <T extends Date | undefined>({
  field,
  formatValue,
  disabledDates,
}: AppDateInputProps<T>) => {
  const formattedValue = formatValue
    ? formatValue(field.value)
    : field.value instanceof Date
    ? format(field.value, "PPP")
    : "";

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
