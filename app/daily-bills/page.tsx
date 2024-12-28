"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {AppTableError, AppTableSkeleton, AppActionCell, AppDataTable, AppPaymentStatus, AppTooltip} from "@/components/common/index";
import { ActionItem, Bill } from "@/types";
import { Download, Pencil, Share2, Trash } from "lucide-react";
import { useBills } from "./(utils)/api-request";
import { downloadInvoice } from "./(utils)/download-invoice";


const BillPage = () => {
  const { data, isLoading, error } = useBills();

  console.log("data========", data);
  

  type ColumnType = ColumnDef<Bill>[];

  const actions: ActionItem[] = React.useMemo(() => [
    {
      label: "Edit",
      icon: <Pencil />,
      handler: () => console.log("Edit clicked"),
      isEnabled: true,
      buttonVariant: "secondary",
      
    },
    {
      label: "Delete",
      icon: <Trash />,
      handler: () => console.log("Delete clicked"),
      isEnabled: true,
      buttonVariant: "destructive",
    },
    {
      label: "Download",
      icon: <Download />,
      handler: (id: string) => downloadInvoice(id), 
      isEnabled: true,
      buttonVariant: "ghost",
    },
    {
      label: "Share",
      icon: <Share2 />,
      handler: () => console.log("Share clicked"),
      isEnabled: true,
      buttonVariant: "default",
    },
  ],[])


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
      cell: (info) => <AppActionCell actions={actions} id={info.row.original.id?.toString()} />,
    },
  ];

  if (isLoading) return <AppTableSkeleton />;
  if (error) return  <AppTableError />;


  return (
    <div className={`w-full h-full flex items-center flex-col `}>
      <div className="flex flex-col w-full h-full space-y-4 p-8">
        <AppDataTable<Bill>
          redirectPath={"/daily-bills/add-bill"}
          columns={columns}
          data={data!}
        />
      </div>
    </div>
  );
};

export default BillPage;
