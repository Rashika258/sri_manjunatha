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
import { deleteCustomer, useCustomers } from "./(api-utils)/route";
import { ActionItem, Customer } from "@/types";
import { Pencil, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

const CustomerTable = () => {
  type ColumnType = ColumnDef<Customer>[];
  const { data, isLoading, error } = useCustomers();
  const [openDeleteConfirmationPopup, setOpenDeleteConfirmationPopup] =
    React.useState(false);
  const [isDeletingCustomer, setIsDeletingCustomer] = React.useState(false);

  const actions: ActionItem[] = React.useMemo(() => [
      {
        label: "Edit",
        icon: <Pencil />,
        handler: () => {},
        buttonVariant: "secondary",

        isEnabled: true,
      },
      {
        label: "Delete",
        icon: <Trash />,
        buttonVariant: "destructive",
        handler: () => {
          setOpenDeleteConfirmationPopup(!openDeleteConfirmationPopup);
        },
        isEnabled: true,
      },
    ],[openDeleteConfirmationPopup]);

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
          <AppActionCell actions={actions} id={row.getValue("customer_id")} />
        ),
      },
    ],[actions]);

    const deleteMutation = useMutation({
      mutationFn: (customerId: string )=>deleteCustomer(customerId),
      onSuccess: () => {
        toast.success("Customer deleted successfully!");
        setOpenDeleteConfirmationPopup(!openDeleteConfirmationPopup);

      },
      onMutate: () => {
        setIsDeletingCustomer(true);
      },
      onSettled: () => {
        setIsDeletingCustomer(false);
      },
      onError: (error: Error) => {
        console.error("Error adding customer:", error);
        toast("Failed to add customer. Please try again.");
      },
    });

  const handleConfirm = React.useCallback((rowId : string) => {
    deleteMutation.mutate(rowId);
    
    
  }, []);

  if (isLoading) return <AppTableSkeleton />;
  if (error) return <AppTableError />;

  return (
    <div className="w-full h-full p-4">
      <AppDataTable
        columns={columns}
        data={data}
        redirectPath={"/customers/add-customer"}
      />
      <AppDeleteConfirmationPopup
        description={"Do you want to delete this customer?"}
        onConfirm={(rowId : string) => {
          handleConfirm(rowId);
        }}
        isOpen={openDeleteConfirmationPopup}
        setIsOpen={setOpenDeleteConfirmationPopup}
        isDeleting={isDeletingCustomer}
      />
    </div>
  );
};

export default CustomerTable;
