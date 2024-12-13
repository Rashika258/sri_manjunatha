import React, { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Button } from "../ui/button";

interface DataItem {
    id: number;
    name: string;
    date: string;
}

const AppTable = ({data}:{data: DataItem[]}) => {
  const [sortBy, setSortBy] = useState<"name" | "date" | null>("name"); 
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); 
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field: "name" | "date") => {
    const isAsc = sortBy === field && sortOrder === "asc";
    setSortBy(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const itemsPerPage = 3;

  // Sorting Function
  const sortedData = useMemo(() => {
    const sorted = [...data].filter((item) => {
      const matchesSearch = item.name.toLowerCase();

      return matchesSearch;
    });

    return sorted.sort((a, b) => {
      if (!sortBy) return 0;
      const valA = sortBy === "name" ? a.name : a.date;
      const valB = sortBy === "name" ? b.name : b.date;

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortBy, sortOrder]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [currentPage, sortedData]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);


  return (
    <div className="py-4">
      <Table className="w-full">
        <TableHead>
          <TableRow>
            <TableCell
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </TableCell>
            <TableCell
              onClick={() => handleSort("date")}
              className="cursor-pointer"
            >
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

      <div className="mt-4 flex justify-between items-center">
        <Button onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((page) => Math.min(page + 1, totalPages))
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AppTable;
