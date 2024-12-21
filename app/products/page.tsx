/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { AppDataTable, AppActionCell } from "@/components/common/index";
import { ColumnDef } from "@tanstack/react-table";

const mockProducts = [
  {
    product_id: 1,
    name: "Product A",
    hsn_code: "12345",
    price: 100.0,
    gst_rate: 18.0,
    is_gst_applicable: true,
    stock_quantity: 50,
    created_at: "2024-12-01T12:00:00Z",
  },
  {
    product_id: 2,
    name: "Product B",
    hsn_code: "67890",
    price: 200.0,
    gst_rate: 12.0,
    is_gst_applicable: true,
    stock_quantity: 30,
    created_at: "2024-12-05T14:00:00Z",
  },
  // Add more mock data if needed
];

const ProductTable = () => {
  const [data, setData] = useState(mockProducts);

  const columns: ColumnDef<(typeof mockProducts)[0]>[] = [
    { accessorKey: "product_id", header: "Product ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "hsn_code", header: "HSN Code" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "gst_rate", header: "GST Rate (%)" },
    {
      accessorKey: "is_gst_applicable",
      header: "GST Applicable",
      cell: ({ row }) => (row.original.is_gst_applicable ? "Yes" : "No"),
    },
    { accessorKey: "stock_quantity", header: "Stock Quantity" },
    { accessorKey: "created_at", header: "Created At" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <AppActionCell id={row.original.product_id} />,
    },
  ];

  return (
    <div className="w-full h-full p-4">
      <AppDataTable
        columns={columns}
        data={data}
        redirectPath={"/products/add-product"}
      />
    </div>
  );
};

export default ProductTable;
