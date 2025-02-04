"use client";
import * as React from "react";
import {
  AppActionCell,
  AppDataTable,
  AppPaymentStatus,
  AppTableError,
  AppTableSkeleton,
  AppTooltip,
} from "@/components/common/index";
import { BillingFormData, ApiQueryParams } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import {
  convertInstantToIST,
  convertISTToInstant,
} from "@/components/ui/index";
import { deleteBill, useBills } from "@/app/daily-bills/(utils)";
import { InvoiceType } from "@prisma/client";
type ColumnType = ColumnDef<BillingFormData>[];

const AppBillTable = ({
  apiRoute,
  invoiceType,
}: {
  apiRoute: string;
  invoiceType: InvoiceType;
}) => {

  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const params: ApiQueryParams | undefined = React.useMemo(() => {
    if (!date || !date.from || !date.to) return undefined;

    return {
      start_date: date.from ? convertISTToInstant(date.from) : undefined,
      end_date: date.to ? convertISTToInstant(date.to) : undefined,
      invoice_type: invoiceType,
    };
  }, [date, invoiceType]);

  const { data, isLoading, error, refetch } = useBills({
    invoice_type: invoiceType,
    ...params,
  });

  const columns: ColumnType = [
    {
      accessorKey: "invoice_id",
      header: "Invoice Number",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "gstin",
      header: "GST Number",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "customer_address",
      header: "Customer Address",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "customer_email",
      header: "Customer Email",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "customer_phone",
      header: "Customer Phone",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "tax_amount",
      header: "Tax Amount",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "total_amount",
      header: "Total Amount",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "invoice_date",
      header: "Invoice Date",
      cell: ({ row }) => {
        return (
          <AppTooltip
            text={convertInstantToIST(row.getValue("invoice_date"))}
          />
        );
      },
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => {
        return (
          <AppTooltip text={convertInstantToIST(row.getValue("due_date"))} />
        );
      },
    },

    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        return (
          <AppTooltip text={convertInstantToIST(row.getValue("created_at"))} />
        );
      },
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => {
        return (
          <AppTooltip text={convertInstantToIST(row.getValue("updated_at"))} />
        );
      },
    },
    {
      accessorKey: "payment_status",
      header: "Payment Status",
      cell: (info) => (
        <AppPaymentStatus
          payment_status={info.getValue() as "PAID" | "UNPAID" | "OVERDUE"}
        />
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (info) => {
        return (
          <AppActionCell
          title={apiRoute}
          data={info.row.original}
          deleteHandler={(invoiceId: string) => deleteBill(invoiceId)}
          enabledActions={ {"EDIT": true, "DELETE": true, "DOWNLOAD": true, "SHARE": true}}
            id={info.row.original?.invoice_id?.toString() as string}
          />
        );
      },
    },
  ];

  const applyDateFilter = (date: DateRange | undefined) => {
    setDate(date);
    refetch();
  };

  if (isLoading) return <AppTableSkeleton />;
  if (error) return <AppTableError />;

  return (
    <div className={`w-full h-full p-4 overflow-auto`}>
      <AppDataTable<BillingFormData>
        redirectPath={`/${apiRoute}/add-bill`}
        columns={columns}
        data={data!}
        date={date}
        setDate={applyDateFilter}
      />

    </div>
  );
};

export default AppBillTable;
