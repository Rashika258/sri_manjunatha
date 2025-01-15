"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  AppActionCell,
  AppDataTable,
  AppTableError,
  AppTableSkeleton,
  AppDeleteConfirmationPopup,
  AppTooltip,
} from "@/components/common/index";
import { convertISTToInstant, toast } from "@/components/ui/index";
import { format } from "date-fns";
import { deleteProduct, useProducts } from "./(utils)/index";
import { ActionItem, ApiQueryParams, Product } from "@/types";
import { Pencil, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";

const ProductTable = () => {
  type ColumnType = ColumnDef<Product>[];
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [deleteConfirmationPopupDetails, setDeleteConfirmationPopupDetails] =
  React.useState({
    openDeleteConfirmationPopup: false,
    isDeletingProduct: false,
    rowId: "",
  });


  const params: ApiQueryParams | undefined = React.useMemo(() => {
    if (!date || !date.from || !date.to) return undefined;
    return {
      start_date: date.from ? convertISTToInstant(date.from) : undefined,
      end_date: date.to ? convertISTToInstant(date.to) : undefined,
    };
  }, [date]);
  const { data, isLoading, error, refetch } = useProducts(params);

  const actions: ActionItem[] = React.useMemo(
    () => [
      {
        label: "Edit",
        icon: <Pencil />,
        handler: (rowId: string) => {
          router.push(`/products/${rowId}`);
        },
        buttonVariant: "secondary",
        isEnabled: true,
      },
      {
        label: "Delete",
        icon: <Trash />,
        buttonVariant: "destructive",
        handler: (id: string) => {
          setDeleteConfirmationPopupDetails((prev) => ({
            ...prev,
            openDeleteConfirmationPopup: true,
            rowId: id,
          }));
        },
        isEnabled: true,
      },
    ],
    [router]
  );

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
          <AppActionCell actions={actions} id={row.getValue("product_id")} />
        ),
      },
    ],
    [actions]
  );

  const deleteMutation = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      toast.success("Product deleted successfully!");
      setDeleteConfirmationPopupDetails((prev) => ({
        ...prev,
        openDeleteConfirmationPopup: false,
      }));
    },
    onMutate: () => {
      setDeleteConfirmationPopupDetails((prev) => ({
        ...prev,
        isDeletingProduct: true,
      }));
    },
    onSettled: () => {
      setDeleteConfirmationPopupDetails((prev) => ({
        ...prev,
        isDeletingProduct: false,
      }));
    },
    onError: (error: Error) => {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    },
  });

  const handleConfirm = React.useCallback(
    (rowId: string) => {
      deleteMutation.mutate(rowId);
    },
    [deleteMutation]
  );
  const applyDateFilter = React.useCallback((date: DateRange | undefined) => {
    setDate(date);
    refetch();
    
  },[refetch])

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
      <AppDeleteConfirmationPopup
        description={"Do you want to delete this product?"}
        onConfirm={(rowId: string) => {
          handleConfirm(rowId);
        }}
        isOpen={deleteConfirmationPopupDetails?.openDeleteConfirmationPopup}
        setIsOpen={(value: boolean) =>
          setDeleteConfirmationPopupDetails((prev) => ({
            ...prev,
            openDeleteConfirmationPopup: value,
          }))
        }
        isDeleting={deleteConfirmationPopupDetails?.isDeletingProduct}
        rowId={deleteConfirmationPopupDetails?.rowId}
      />
    </div>
  );
};

export default ProductTable;
