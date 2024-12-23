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
import {
toast
} from "@/components/ui/index";
import { format } from "date-fns";
import { deleteCustomer, useCustomers } from "./(utils)/api-request";
import { ActionItem, Customer } from "@/types";
import { Pencil, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const CustomerTable = () => {
  type ColumnType = ColumnDef<Customer>[];
  const router = useRouter();
  const { data, isLoading, error } = useCustomers();
  const [deleteConfirmationPopupDetails, setDeleteConfirmationPopupDetails] = React.useState({
    openDeleteConfirmationPopup: false,
    isDeletingCustomer: false,
    rowId: ""
  })

  const actions: ActionItem[] = React.useMemo(() => [
      {
        label: "Edit",
        icon: <Pencil />,
        handler: (rowId: string) => {
          router.push(`/customers/${rowId}`);
        },
        buttonVariant: "secondary",

        isEnabled: true,
      },
      {
        label: "Delete",
        icon: <Trash />,
        buttonVariant: "destructive",
        handler: (id: string) => {
          setDeleteConfirmationPopupDetails((prev)=>({...prev, openDeleteConfirmationPopup: true, rowId: id}))
        },
        isEnabled: true,
      },
    ],[router]);

  const columns: ColumnType = React.useMemo(() => [
      { accessorKey: "customer_id", header: "Customer ID", cell: ({ row }) => <AppTooltip text={row.getValue("customer_id") || ""} /> },
      { accessorKey: "name", header: "Name", cell: ({ row }) => <AppTooltip text={row.getValue("name") || ""} /> },
      { accessorKey: "email", header: "Email",  cell: ({ row }) => <AppTooltip text={row.getValue("email") || ""} /> },
      { accessorKey: "phone", header: "Phone", cell: ({ row }) => <AppTooltip text={row.getValue("phone") || ""} /> },
      { accessorKey: "address", header: "Address", cell: ({ row }) => <AppTooltip text={row.getValue("address") || ""} /> },
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
          <AppActionCell  actions={actions} id={row.getValue("customer_id")} />
        ),
      },
    ],[actions]);

    const deleteMutation = useMutation({
      mutationFn: (customerId: string )=>deleteCustomer(customerId),
      onSuccess: () => {
        toast.success("Customer deleted successfully!");
        setDeleteConfirmationPopupDetails((prev)=>({...prev, openDeleteConfirmationPopup: false}))
      },
      onMutate: () => {
        setDeleteConfirmationPopupDetails((prev)=>({...prev, isDeletingCustomer: true}))
      },
      onSettled: () => {
        setDeleteConfirmationPopupDetails((prev)=>({...prev, isDeletingCustomer: false}))
      },
      onError: (error: Error) => {
        console.error("Error adding customer:", error);
        toast("Failed to add customer. Please try again.");
      },
    });

  const handleConfirm = React.useCallback((rowId : string) => {
    deleteMutation.mutate(rowId);
  
  }, [deleteMutation]);

  if (isLoading) return <AppTableSkeleton />;
  if (error) return <AppTableError />;

  return (
    <div className="w-full h-full p-4">
      <AppDataTable
        columns={columns}
        data={data!}
        redirectPath={"/customers/add-customer"}
      />
      <AppDeleteConfirmationPopup
        description={"Do you want to delete this customer?"}
        onConfirm={(rowId : string) => {
          handleConfirm(rowId);
        }}
        isOpen={deleteConfirmationPopupDetails?.openDeleteConfirmationPopup}
        setIsOpen={
          (value : boolean) => setDeleteConfirmationPopupDetails((prev)=>({...prev, openDeleteConfirmationPopup: value}))
        }
        isDeleting={deleteConfirmationPopupDetails?.isDeletingCustomer}
        rowId={deleteConfirmationPopupDetails?.rowId}
      />
    </div>
  );
};

export default CustomerTable;
