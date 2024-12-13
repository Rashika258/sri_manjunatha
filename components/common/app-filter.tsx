import React from "react";
import AppSearch from "./app-search";
import { DateRangePicker } from "../ui/date-range-picker";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";

const AppFilter = ({
  searchQuery,
  handleSearch,
  date,
  setDate
}: {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  date : DateRange | undefined,
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}) => {
  return (
    <div className="flex justify-between">
      <AppSearch searchQuery={searchQuery} handleSearch={handleSearch} />
      <div className="flex gap-2">
        <DateRangePicker date={date} setDate={setDate} />
        <Button onClick={() => {}}>Reset Filters</Button>
      </div>
    </div>
  );
};

export default AppFilter;
