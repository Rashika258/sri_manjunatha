"use client";
import * as  React from "react";
import AppSearch from "./app-search";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Button,
  DateRangePicker,
} from "@/components/ui/index";
import { ChevronDown } from "lucide-react";
import { Table as ReactTable } from "@tanstack/react-table";

const AppFilter = <T,>({
  searchQuery,
  handleSearch,
  date,
  setDate,
  redirectPath,
  table,
}: {
  searchQuery: string;
  handleSearch: (val: string) => void;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  redirectPath: string;
  table: ReactTable<T>;
}) => {
  const router = useRouter();
  const [localSearch, setLocalSearch] = React.useState(searchQuery);

  // Debounced search handling
  const debounceSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalSearch(value);

      // Debounce API call
      const timeout = setTimeout(() => {
        handleSearch(value);
      }, 300); // 300ms debounce time

      return () => clearTimeout(timeout);
    },
    [handleSearch]
  );


  return (
    <div className="flex justify-between flex-col sm:flex-row">
      <div className="flex flex-col sm:flex-row sm:w-full w-full items-start gap-2 py-4">
      <AppSearch searchQuery={localSearch} handleSearch={debounceSearch} />
        <DateRangePicker date={date} setDate={setDate} />

  
      </div>
      <div className="flex items-center gap-2">
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
        <Button variant="default" onClick={() => router.push(redirectPath)}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AppFilter;
