"use client";
import AppFilter from "@/components/common/app-filter";
import AppTable from "@/components/common/app-table";
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

      <AppFilter />
      <AppTable data={mockData} />
    </div>
  );
};

export default ListingScreen;
