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
import { format } from "date-fns";
import { ProductCategory } from "@/types";
import {
  deleteProductCategory,
  useProductCategories,
} from "./(utils)/api-request";

const ProductCategoryTable = () => {
  type ColumnType = ColumnDef<ProductCategory>[];
  const { data, isLoading, error } = useProductCategories();

  const columns: ColumnType = React.useMemo(
    () => [
      {
        accessorKey: "category_id",
        header: "Category ID",
        cell: ({ row }) => (
          <AppTooltip text={row.getValue("category_id") || ""} />
        ),
      },
      {
        accessorKey: "name",
        header: "Category Name",
        cell: ({ row }) => <AppTooltip text={row.getValue("name") || ""} />,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <AppTooltip text={row.getValue("description") || ""} />
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
            title="product-category"
            deleteHandler={(categoryId: string) =>
              deleteProductCategory(categoryId)
            }
            enabledActions={{ EDIT: true, DELETE: true }}
            id={row.getValue("category_id")}
          />
        ),
      },
    ],
    []
  );

  if (isLoading) return <AppTableSkeleton />;
  if (error) return <AppTableError />;

  return (
    <div className="w-full h-full p-4">
      <AppDataTable<ProductCategory>
        columns={columns}
        data={data!}
        redirectPath={"/product-category/add-product-category"}
        date={undefined}
        setDate={() => {}}
      />
    </div>
  );
};

export default ProductCategoryTable;
