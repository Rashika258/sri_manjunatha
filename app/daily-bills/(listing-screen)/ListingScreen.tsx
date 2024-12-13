"use client";
import AppTable from "@/components/common/app-table";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import React from "react";

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
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <div className="flex gap-2">
          <DateRangePicker
          // value={dateRange[0]}
          // onChange={(date) => setDateRange([date, dateRange[1]])}
          // placeholder="Start Date"
          />
        </div>
        <Button onClick={() => {}}>Reset Filters</Button>
      </div>

      <AppTable data={mockData} />
    </div>
  );
};

export default ListingScreen;
