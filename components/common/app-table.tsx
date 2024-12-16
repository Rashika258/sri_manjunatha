/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
interface ItemDetails {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface DataItem {
  id: number;
  bill_no: string;
  company_name: string;
  date: string;
  items: ItemDetails[];
  price: number;
  qty: number;
  total: number;
  payment_status: string;
  tax: number;
  e_way_bill_no: string;
  gst_no: string;
  hsn_code: string;
}

const AppTable = ({ data }: { data: DataItem[] }) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  const itemsPerPage = 5;

  // Columns configuration
  const columnDetails = [
    {
      name: "Price",
      key: "price",
      render: (item: DataItem) => <p>{item.price}</p>,
    },
    {
      name: "Bill No",
      key: "bill_no",
      render: (item: DataItem) => <p>{item.bill_no}</p>,
    },
    {
      name: "Company Name",
      key: "company_name",
      render: (item: DataItem) => <p>{item.company_name}</p>,
    },
    {
      name: "Date",
      key: "date",
      render: (item: DataItem) => (
        <p>
          {new Date(item.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      ),
    },
    {
      name: "Items",
      key: "items",
      render: (item: DataItem) => <p>{"test"}</p>,
    },
    {
      name: "Price",
      key: "price",
      render: (item: DataItem) => <p>{item.price}</p>,
    },
    { name: "Qty", key: "qty", render: (item: DataItem) => <p>{item.qty}</p> },
    {
      name: "Total",
      key: "total",
      render: (item: DataItem) => <p>{item.total}</p>,
    },
    {
      name: "Payment Status",
      key: "payment_status",
      render: (item: DataItem) => <p>{item.payment_status}</p>,
    },
    { name: "Tax", key: "tax", render: (item: DataItem) => <p>{item.tax}</p> },
    {
      name: "E Way Bill No",
      key: "e_way_bill_no",
      render: (item: DataItem) => <p>{item.e_way_bill_no}</p>,
    },
    {
      name: "GST No",
      key: "gst_no",
      render: (item: DataItem) => <p>{item.gst_no}</p>,
    },
    {
      name: "HSN Code",
      key: "hsn_code",
      render: (item: DataItem) => <p>{item.hsn_code}</p>,
    },
  ];

  // Sorting logic
  const handleSort = (key: string) => {
    const isAsc = sortBy === key && sortOrder === "asc";
    setSortBy(key);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const sortedData = useMemo(() => {
    const sorted = [...data];
    if (!sortBy) return sorted;

    return sorted.sort((a, b) => {
      const valA = a[sortBy as keyof DataItem];
      const valB = b[sortBy as keyof DataItem];

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortBy, sortOrder]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [currentPage, sortedData]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="flex items-center flex-col">
      <ScrollArea className=" w-full rounded-md border py-4">
        <Table className="">
          <TableHead>
            <TableRow>
              {columnDetails.map((col) => (
                <TableCell
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="cursor-pointer "
                >
                  {col.name}
                  {sortBy === col.key &&
                    (sortOrder === "asc" ? (
                      <ChevronUpIcon />
                    ) : (
                      <ChevronDownIcon />
                    ))}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                {columnDetails.map((col) => (
                  <TableCell className="" key={col.key}>
                    {col.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <Button
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((page) => Math.min(page + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AppTable;
