"use client";
import React from "react";
import { AppDataTable } from "@/components/common/app-datatable";
import { AppActionCell } from "@/components/common/app-action-cell";
import AppTooltip from "@/components/common/app-tooltip";
import { ColumnDef } from "@tanstack/react-table";
import AppPaymentStatus from "@/components/common/app-payment-status";
import { useDailyBills } from "./(api-utils)";
import AppTableSkeleton from "@/components/common/app-table-skeleton";
import AppTableError from "@/components/common/app-table-error";
import { DailyBill } from "@/types";


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
