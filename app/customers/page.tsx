"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  AppActionCell,
  AppDataTable,
  AppTableError,
  AppTableSkeleton,
} from "@/components/common/index";
import { format } from "date-fns";
import { useCustomers } from "./(api-utils)/route";
import { Customer } from "@/types";

const CustomerTable = () => {
  const { data, isLoading, error } = useCustomers();
  if (isLoading) return <AppTableSkeleton />;
  if (error) return <AppTableError />;
  type ColumnType = ColumnDef<Customer>[];

  const columns: ColumnType = [
    { accessorKey: "customer_id", header: "Customer ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "address", header: "Address" },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const formattedDate = format(
          new Date(row.getValue("created_at")),
          "dd MMM yyyy"
        );
        return formattedDate;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <AppActionCell id={row.getValue("customer_id")} />,
    },
  ];

  return (
    <div className="w-full h-full p-4">
      <AppDataTable
        columns={columns}
        data={data}
        redirectPath={"/customers/add-customer"}
      />
    </div>
  );
};

export default CustomerTable;
