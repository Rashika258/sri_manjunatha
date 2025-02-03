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
import { deleteProduct, useProducts } from "./(utils)/index";
import { ApiQueryParams, Product } from "@/types";
import { DateRange } from "react-day-picker";

const ProductTable = () => {
  type ColumnType = ColumnDef<Product>[];
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const params: ApiQueryParams | undefined = React.useMemo(() => {
    if (!date || !date.from || !date.to) return undefined;
    return {
      start_date: date.from ? convertISTToInstant(date.from) : undefined,
      end_date: date.to ? convertISTToInstant(date.to) : undefined,
    };
  }, [date]);
  const { data, isLoading, error, refetch } = useProducts(params);

  const columns: ColumnType = React.useMemo(
    () => [
      {
        accessorKey: "product_id",
        header: "Product ID",
        cell: ({ row }) => (
          <AppTooltip text={row.getValue("product_id") || ""} />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <AppTooltip text={row.getValue("name") || ""} />,
      },
      {
        accessorKey: "hsn_code",
        header: "HSN Code",
        cell: ({ row }) => <AppTooltip text={row.getValue("hsn_code") || ""} />,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <AppTooltip text={`₹${row.getValue("price") || 0}`} />
        ),
      },
      {
        accessorKey: "stock_quantity",
        header: "Stock Quantity",
        cell: ({ row }) => (
          <AppTooltip text={`${row.getValue("stock_quantity") || 0}`} />
        ),
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
            deleteHandler={(productId: string) => deleteProduct(productId)}
            title="products"
            enabledActions={{ EDIT: true, DELETE: true }}
            id={row.getValue("product_id")}
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
    <div className="w-full h-full p-8">
      <AppDataTable<Product>
        columns={columns}
        data={data!}
        redirectPath={"/products/add-product"}
        date={date}
        setDate={applyDateFilter}
      />
    </div>
  );
};

export default ProductTable;
