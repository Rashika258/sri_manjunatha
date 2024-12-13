/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import React, { useState, useMemo } from "react";


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
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [sortBy, setSortBy] = useState<"name" | "date" | null>("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Default sort order

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Sorting Function
  const sortedData = useMemo(() => {
    const sorted = [...mockData].filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDateRange =
        (!dateRange[0] || new Date(item.date) >= dateRange[0]) &&
        (!dateRange[1] || new Date(item.date) <= dateRange[1]);

      return matchesSearch && matchesDateRange;
    });

    return sorted.sort((a, b) => {
      if (!sortBy) return 0;
      const valA = sortBy === "name" ? a.name : a.date;
      const valB = sortBy === "name" ? b.name : b.date;

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [searchQuery, dateRange, sortBy, sortOrder]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);

  const handleSort = (field: "name" | "date") => {
    const isAsc = sortBy === field && sortOrder === "asc";
    setSortBy(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  return (
    <div className="p-4">
      {/* Filters Section */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/3"
        />
        <div className="flex gap-2">
          <DateRangePicker
            // value={dateRange[0]}
            // onChange={(date) => setDateRange([date, dateRange[1]])}
            // placeholder="Start Date"
          />

        </div>
        <Button onClick={() => setSearchQuery("")}>Reset Filters</Button>
      </div>

      {/* Table Section */}
      <Table className="w-full">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => handleSort("name")} className="cursor-pointer">
              Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableCell>
            <TableCell onClick={() => handleSort("date")} className="cursor-pointer">
              Date {sortBy === "date" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <Button onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ListingScreen;
