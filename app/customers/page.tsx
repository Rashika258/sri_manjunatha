/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { AppDataTable } from "@/components/common/app-datatable";
import { ColumnDef } from "@tanstack/react-table";
import { AppActionCell } from "@/components/common/app-action-cell";
import { format } from "date-fns"; // Using date-fns to format the date

// Mock customer data
const mockCustomers = [
  {
    customer_id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    address: "123 Street, City, Country",
    created_at: "2024-12-01T12:00:00Z",
  },
  {
    customer_id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "0987654321",
    address: "456 Avenue, City, Country",
    created_at: "2024-12-05T14:00:00Z",
  },
  // Add more mock data as needed
];

const CustomerTable = () => {
  const [data, setData] = useState(mockCustomers);

  // Define columns for the table
  const columns: ColumnDef<(typeof mockCustomers)[0]>[] = [
    { accessorKey: "customer_id", header: "Customer ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "address", header: "Address" },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const formattedDate = format(new Date(row.original.created_at), 'dd MMM yyyy');
        return formattedDate; // Format the created_at date
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <AppActionCell id={row.original.customer_id} />,
    },
  ];

  return (
    <div className="w-full h-full p-4">
      <AppDataTable
        columns={columns}
        data={data}
        redirectPath={"/customers/add-customer"} // Redirect path for adding a new customer
      />
    </div>
  );
};

export default CustomerTable;
