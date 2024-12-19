"use client";

import { useState, useMemo } from "react";
import { addDays, isWithinInterval, format } from "date-fns";
import { DateRange } from "react-day-picker";
import AppFilter from "@/components/common/app-filter";
import { ColumnDef } from "@tanstack/react-table";
import { AppDataTable } from "@/components/common/app-datatable";
import { AppActionCell } from "@/components/common/app-action-cell";
import AppTooltip from "@/components/common/app-tooltip";
import AppPaymentStatus from "@/components/common/app-payment-status";

// Function to generate mock data for a given date range
const generateMockData = (startDate: Date, days: number) => {
  const companyNames = [
    "Company A",
    "Company B",
    "Company C",
    "Company D",
    "Company E",
  ];
  const items = ["Item A", "Item B", "Item C", "Item D", "Item E"];
  const paymentStatuses = ["PAID", "UNPAID", "INPROGRESS"];

  const generateRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const mockData = [];

  for (let i = 0; i < days; i++) {
    const currentDate = addDays(startDate, i);
    const randomCompany =
      companyNames[generateRandomInt(0, companyNames.length - 1)];
    const randomItems = items
      .slice(
        generateRandomInt(0, items.length - 2),
        generateRandomInt(1, items.length)
      )
      .join(", ");
    const randomPrice = generateRandomInt(50, 500);
    const randomQty = generateRandomInt(1, 5);
    const randomTotal = randomPrice * randomQty;
    const randomPaymentStatus =
      paymentStatuses[generateRandomInt(0, paymentStatuses.length - 1)];
    const randomTax = generateRandomInt(10, 50);
    const randomGstNo = `GST${generateRandomInt(1000000000, 9999999999)}`;
    const billNo = `BILL${(i + 1).toString().padStart(3, "0")}`;

    mockData.push({
      id: i + 1,
      bill_no: billNo,
      company_name: randomCompany,
      date: format(currentDate, "yyyy-MM-dd"),
      items: randomItems,
      price: randomPrice,
      qty: randomQty,
      total: randomTotal,
      payment_status: randomPaymentStatus,
      tax: randomTax,
      gst_no: randomGstNo,
    });
  }

  return mockData;
};

// Generate mock data for December 2024
const startDate = new Date(2024, 11, 1); // December 1st, 2024
const mockData = generateMockData(startDate, 31); // 31 days for December

const ListingScreen = () => {
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
          ? isWithinInterval(new Date(row.date), {
              start: date.from,
              end: date.to,
            })
          : true;

      return matchesSearch && dateWithinRange;
    });
  }, [searchQuery, date]);

  // Table columns definition
  const columns: ColumnDef<(typeof mockData)[0]>[] = [
    {
      accessorKey: "bill_no",
      header: "Bill No",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "company_name",
      header: "Company Name",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "qty",
      header: "Quantity",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "payment_status",
      header: "Payment Status",
      cell: (info) => (
        <AppPaymentStatus
          payment_status={info.getValue() as "PAID" | "UNPAID" | "INPROGRESS"}
        />
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (info) => <AppActionCell id={info.row.original.id} />,
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      {/* Filter Section */}
      <AppFilter
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        date={date}
        setDate={setDate}
        redirectPath={"/daily-bills/add-bill"}
      />

      {/* DataTable */}
      <AppDataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default ListingScreen;
