"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  AppActionCell,
  AppDataTable,
  AppTableError,
  AppTableSkeleton,
  AppTooltip,
} from "@/components/common/index";
import { convertISTToInstant } from "@/components/ui/index";
import { format } from "date-fns";
import { deleteCustomer, useCustomers } from "./(utils)/index";
import { ApiQueryParams, Customer } from "@/types";
import { DateRange } from "react-day-picker";

const CustomerTable = () => {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const params: ApiQueryParams | undefined = React.useMemo(() => {
    if (!date || !date.from || !date.to) return undefined;
    return {
      start_date: date.from ? convertISTToInstant(date.from) : undefined,
      end_date: date.to ? convertISTToInstant(date.to) : undefined,
    };
  }, [date]);
  const { data, isLoading, error, refetch } = useCustomers(params);

  const columns: ColumnDef<Customer>[] = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <AppTooltip text={row.getValue("name") || ""} />,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <AppTooltip text={row.getValue("email") || ""} />,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => <AppTooltip text={row.getValue("phone") || ""} />,
      },
      {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => <AppTooltip text={row.getValue("address") || ""} />,
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
          const formattedDate = format(
            new Date(row.getValue("created_at")),
            "dd MMM yyyy"
          );
          return <AppTooltip text={formattedDate} />;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <AppActionCell
            title="customers"
            deleteHandler={(customerId: string) => deleteCustomer(customerId)}
            enabledActions={{ EDIT: true, DELETE: true }}
            id={row.original.customer_id?.toString() as string}
          />
        ),
      },
    ],
    []
  );

  const applyDateFilter = React.useCallback(
    (date: DateRange | undefined) => {
      setDate(date);
      refetch();
    },
    [refetch]
  );

  if (isLoading) return <AppTableSkeleton />;
  if (error) return <AppTableError />;

  return (
    <div className="w-full h-full p-4">
      <AppDataTable<Customer>
        columns={columns}
        data={data!}
        redirectPath={"/customers/add-customer"}
        date={date}
        setDate={applyDateFilter}
      />
    </div>
  );
};

export default CustomerTable;
