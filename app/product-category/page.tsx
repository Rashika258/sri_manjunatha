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
import { toast } from "@/components/ui/index";
import { format } from "date-fns";
import { ActionItem, ProductCategory } from "@/types";
import { Pencil, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  deleteProductCategory,
  useProductCategories,
} from "./(utils)/api-request";

const ProductCategoryTable = () => {
  type ColumnType = ColumnDef<ProductCategory>[];
  const router = useRouter();
  const { data, isLoading, error } = useProductCategories();
  const [deleteConfirmationPopupDetails, setDeleteConfirmationPopupDetails] =
    React.useState({
      openDeleteConfirmationPopup: false,
      isDeletingCategory: false,
      rowId: "",
    });

  const actions: ActionItem[] = React.useMemo(
    () => [
      {
        label: "Edit",
        icon: <Pencil />,
        handler: (rowId: string) => {
          router.push(`/product-category/${rowId}`);
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
          <AppActionCell actions={actions} id={row.getValue("category_id")} />
        ),
      },
    ],
    [actions]
  );

  const deleteMutation = useMutation({
    mutationFn: (categoryId: string) => deleteProductCategory(categoryId),
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      setDeleteConfirmationPopupDetails((prev) => ({
        ...prev,
        openDeleteConfirmationPopup: false,
      }));
    },
    onMutate: () => {
      setDeleteConfirmationPopupDetails((prev) => ({
        ...prev,
        isDeletingCategory: true,
      }));
    },
    onSettled: () => {
      setDeleteConfirmationPopupDetails((prev) => ({
        ...prev,
        isDeletingCategory: false,
      }));
    },
    onError: (error: Error) => {
      console.error("Error deleting category:", error);
      toast("Failed to delete category. Please try again.");
    },
  });

  const handleConfirm = React.useCallback(
    (rowId: string) => {
      deleteMutation.mutate(rowId);
    },
    [deleteMutation]
  );

  if (isLoading) return <AppTableSkeleton />;
  if (error) return <AppTableError />;

  return (
    <div className="w-full h-full p-4">
      <AppDataTable
        columns={columns}
        data={data!}
        redirectPath={"/product-category/add-product-category"}
      />
      <AppDeleteConfirmationPopup
        description={"Do you want to delete this category?"}
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
        isDeleting={deleteConfirmationPopupDetails?.isDeletingCategory}
        rowId={deleteConfirmationPopupDetails?.rowId}
      />
    </div>
  );
};

export default ProductCategoryTable;
