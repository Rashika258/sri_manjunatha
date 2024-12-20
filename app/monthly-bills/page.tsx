/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { AppDataTable } from "@/components/common/app-datatable";
import { ColumnDef } from "@tanstack/react-table";
import { addDays, isWithinInterval, parseISO } from "date-fns";
import React, { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

const mockData = [
  {
    id: 1,
    bill_no: "BILL001",
    company_name: "Company A",
    date: "2024-12-01",
    items: "Item A, Item B",
    price: 100,
    qty: 2,
    total: 200,
    payment_status: "Paid",
    tax: 18,
    gst_no: "1234567890A",
  },
  {
    id: 2,
    bill_no: "BILL002",
    company_name: "Company B",
    date: "2024-12-05",
    items: "Item C, Item D",
    price: 150,
    qty: 1,
    total: 150,
    payment_status: "Unpaid",
    tax: 27,
    gst_no: "0987654321B",
  },
  {
    id: 3,
    bill_no: "BILL003",
    company_name: "Company C",
    date: "2024-12-10",
    items: "Item E, Item F",
    price: 200,
    qty: 3,
    total: 600,
    payment_status: "Paid",
    tax: 36,
    gst_no: "1122334455C",
  },
  // Add more mock data if needed
];

const BillPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 11, 1),
    to: addDays(new Date(2024, 11, 1), 30),
  });

  // Filtered data based on search and date range
  const filteredData = useMemo(() => {
    return mockData.filter((row) => {
      const matchesSearch =
        row.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.bill_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.gst_no.toLowerCase().includes(searchQuery.toLowerCase());

      const dateWithinRange =
        date?.from && date?.to
          ? isWithinInterval(parseISO(row.date), {
              start: date.from,
              end: date.to,
            })
          : true;

      return matchesSearch && dateWithinRange;
    });
  }, [searchQuery, date]);

  // Table columns definition
  const columns: ColumnDef<(typeof mockData)[0]>[] = [
    { accessorKey: "bill_no", header: "Bill No" },
    { accessorKey: "company_name", header: "Company Name" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "items", header: "Items" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "qty", header: "Quantity" },
    { accessorKey: "total", header: "Total" },
    { accessorKey: "payment_status", header: "Payment Status" },
    { accessorKey: "tax", header: "Tax" },
    { accessorKey: "gst_no", header: "GST No" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className={`w-full h-full flex items-center flex-col `}>
      <div className="flex flex-col w-full h-full space-y-4 p-8">
        <AppDataTable redirectPath={"/monthly-bills/add-bill"} columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default BillPage;
