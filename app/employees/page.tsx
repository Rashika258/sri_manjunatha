/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { AppDataTable } from "@/components/common/app-datatable";
import { ColumnDef } from "@tanstack/react-table";
import { AppActionCell } from "@/components/common/app-action-cell";
import { format } from "date-fns"; // Using date-fns to format the date

// Mock employee data
const mockEmployees = [
  {
    employee_id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    phone_number: "1234567890",
    designation: "Software Engineer",
    date_of_joining: "2023-01-15T12:00:00Z",
    status: "Active",
    created_at: "2023-01-15T12:00:00Z",
  },
  {
    employee_id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "janesmith@example.com",
    phone_number: "0987654321",
    designation: "Product Manager",
    date_of_joining: "2022-08-22T14:00:00Z",
    status: "Active",
    created_at: "2022-08-22T14:00:00Z",
  },
  // Add more mock data as needed
];

const EmployeeTable = () => {
  const [data, setData] = useState(mockEmployees);

  // Define columns for the table
  const columns: ColumnDef<(typeof mockEmployees)[0]>[] = [
    { accessorKey: "employee_id", header: "Employee ID" },
    { accessorKey: "first_name", header: "First Name" },
    { accessorKey: "last_name", header: "Last Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone_number", header: "Phone Number" },
    { accessorKey: "designation", header: "Designation" },
    {
      accessorKey: "date_of_joining",
      header: "Date of Joining",
      cell: ({ row }) => {
        const formattedDate = format(new Date(row.original.date_of_joining), 'dd MMM yyyy');
        return formattedDate; // Format the date of joining
      },
    },
    { accessorKey: "status", header: "Status" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <AppActionCell id={row.original.employee_id} />,
    },
  ];

  return (
    <div className="w-full h-full p-4">
      <AppDataTable
        columns={columns}
        data={data}
        redirectPath={"/employees/add-employee"} // Redirect path for adding a new employee
      />
    </div>
  );
};

export default EmployeeTable;
