"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDailyBills } from "./(api-utils)";
import {AppTableError, AppTableSkeleton, AppActionCell, AppDataTable, AppPaymentStatus, AppTooltip} from "@/components/common/index";
import { DailyBill } from "@/types";
import { Download, Pencil, Share2, Trash } from "lucide-react";


const BillPage = () => {
  const { data, isLoading, error } = useDailyBills();
  if (isLoading) return <AppTableSkeleton />;
  if (error) return  <AppTableError />;
  type ColumnType = ColumnDef<DailyBill>[];


  const columns: ColumnType = [
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

  const actions = [
    {
      label: "Edit",
      icon: <Pencil />,
      handler: () => console.log("Edit clicked"),
    },
    {
      label: "Delete",
      icon: <Trash />,
      handler: () => console.log("Delete clicked"),
    },
    {
      label: "Download",
      icon: <Download />,
      handler: () => console.log("Download clicked"),
    },
    {
      label: "Share",
      icon: <Share2 />,
      handler: () => console.log("Share clicked"),
    },
  ];
  return (
    <div className={`w-full h-full flex items-center flex-col `}>
      <div className="flex flex-col w-full h-full space-y-4 p-8">
        {/* DataTable */}
        <AppDataTable
          redirectPath={"/daily-bills/add-bill"}
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
};

export default BillPage;
