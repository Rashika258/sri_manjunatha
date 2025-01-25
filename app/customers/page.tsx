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
import { deleteCustomer, useCustomers } from "./(utils)/index";
import { ActionItem, ApiQueryParams, Customer } from "@/types";
import { Pencil, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";

const CustomerTable = () => {
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [deleteConfirmationPopupDetails, setDeleteConfirmationPopupDetails] =
    React.useState({
      openDeleteConfirmationPopup: false,
      isDeletingCustomer: false,
      rowId: "",
    });

  const params: ApiQueryParams | undefined = React.useMemo(() => {
    if (!date || !date.from || !date.to) return undefined;
    return {
      start_date: date.from ? convertISTToInstant(date.from) : undefined,
      end_date: date.to ? convertISTToInstant(date.to) : undefined,
    };
  }, [date]);
  const { data, isLoading, error, refetch } = useCustomers(params);

  const actions: ActionItem[] = React.useMemo(
    () => [
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
            actions={actions}
            id={row.original.customer_id?.toString() as string}
          />
        ),
      },
    ],
    [actions]
  );

  const deleteMutation = useMutation({
    mutationFn: (customerId: string) => deleteCustomer(customerId),
    onSuccess: () => {
      toast.success("Customer deleted successfully!");
      setDeleteConfirmationPopupDetails((prev) => ({
        ...prev,
        openDeleteConfirmationPopup: false,
      }));
    },
    onMutate: () => {
      setDeleteConfirmationPopupDetails((prev) => ({
        ...prev,
        isDeletingCustomer: true,
      }));
    },
    onSettled: () => {
      setDeleteConfirmationPopupDetails((prev) => ({
        ...prev,
        isDeletingCustomer: false,
      }));
    },
    onError: (error: Error) => {
      console.error("Error adding customer:", error);
      toast.error("Failed to add customer. Please try again.");
    },
  });

  const handleConfirm = React.useCallback(
    (rowId: string) => {
      deleteMutation.mutate(rowId);
    },
    [deleteMutation]
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
      <AppDeleteConfirmationPopup
        description={"Do you want to delete this customer?"}
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
        isDeleting={deleteConfirmationPopupDetails?.isDeletingCustomer}
        rowId={deleteConfirmationPopupDetails?.rowId}
      />
    </div>
  );
};

export default CustomerTable;
