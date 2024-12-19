import React from "react";
import AppSearch from "./app-search";
import { DateRangePicker } from "../ui/date-range-picker";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Table as ReactTable } from "@tanstack/react-table";

const AppFilter = <T,>({
  searchQuery,
  handleSearch,
  date,
  setDate,
  redirectPath,
  table, // Accept the table instance
}: {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  redirectPath: string;
  table: ReactTable<T>; // Specify the type for the table instance
}) => {
  const router = useRouter();

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2 py-4">
        <AppSearch searchQuery={searchQuery} handleSearch={handleSearch} />
        <DateRangePicker date={date} setDate={setDate} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              ?.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="default" onClick={() => router.push(redirectPath)}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AppFilter;
