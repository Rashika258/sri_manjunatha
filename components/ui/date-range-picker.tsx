"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Calendar,
} from "@/components/ui/index";

export function convertISTToInstant(istDateString: Date | string) {
  const istDate = new Date(istDateString);
  if (isNaN(istDate.getTime())) {
    throw new Error("Invalid IST date format");
  }
  const utcDate = new Date(istDate.getTime() - 5.5 * 60 * 60 * 1000);

  return utcDate.toISOString();
}

export function convertInstantToIST(istDateString: Date | string) {
  const istDate = new Date(
    istDateString.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  );
  const formattedDate = format(new Date(istDate), "dd MMM yyyy");
  return formattedDate;
}

export function DateRangePicker({
  className,
  onApply,
  value,
}: {
  className?: string;
  value: DateRange | undefined;
  onApply: (date: DateRange | undefined) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleApply = () => {
    onApply(date);
    setIsOpen(false);
  };

  const handleClear = () => {
    setDate(undefined);
    onApply(undefined);
    setIsOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-full lg:w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => {
                handleClear();
              }}
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                handleApply();
              }}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
