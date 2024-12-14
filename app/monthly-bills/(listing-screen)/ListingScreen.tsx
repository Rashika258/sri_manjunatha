"use client";
import AppFilter from "@/components/common/app-filter";
import AppTable from "@/components/common/app-table";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

type DataItem = {
  id: number;
  name: string;
  date: string;
};

const mockData: DataItem[] = [
  { id: 1, name: "Item 1", date: "2024-12-01" },
  { id: 2, name: "Item 2", date: "2024-12-05" },
  { id: 3, name: "Item 3", date: "2024-12-10" },
  { id: 4, name: "Item 4", date: "2024-12-15" },
  { id: 5, name: "Item 5", date: "2024-12-20" },
  { id: 6, name: "Item 6", date: "2024-12-25" },
  { id: 7, name: "Item 7", date: "2024-12-30" },
  // Add more items for pagination effect
];

const ListingScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col ">
      <AppFilter searchQuery={searchQuery} handleSearch={handleSearch} date={date} setDate={setDate} />
      <AppTable data={mockData} />
    </div>
  );
};

export default ListingScreen;
