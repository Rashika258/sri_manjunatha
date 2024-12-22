/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { AppDataTable, AppActionCell, AppTableSkeleton } from "@/components/common/index";
import { ColumnDef } from "@tanstack/react-table";
import { fetchProducts, useProducts } from "./(api-utils)/route";
import { ProductData } from "@/types";


const ProductTable = () => {
  const { data, isLoading, error } = useProducts()

  if (isLoading) return <AppTableSkeleton />;
  if (error) return <div>Error loading products</div>;

  const columns: ColumnDef<ProductData>[] = [
    { accessorKey: "product_id", header: "Product ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "hsn_code", header: "HSN Code" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "adinath_price", header: "Adinath Price" },
    { accessorKey: "monthly_bill_price", header: "Monthly Bill Price" },
    {
      accessorKey: "monthly_bill_percentage",
      header: "Monthly Bill Percentage",
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
