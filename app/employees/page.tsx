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
import { deleteEmployee, useEmployees } from "./(utils)/api-request";
import { ActionItem, Employee } from "@/types";
import { Pencil, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface DeleteConfirmationPopupDetails {
  openDeleteConfirmationPopup: boolean;
  isDeletingEmployee: boolean;
  rowId: string;
}

const EmployeeTable = () => {
  const router = useRouter();
  const { data, isLoading, error } = useEmployees();
  
  const [deleteConfirmationPopupDetails, setDeleteConfirmationPopupDetails] = React.useState<DeleteConfirmationPopupDetails>({
    openDeleteConfirmationPopup: false,
    isDeletingEmployee: false,
    rowId: "",
  });

  const actions: ActionItem[] = React.useMemo(() => [
    {
      label: "Edit",
      icon: <Pencil />,
      handler: (rowId: string) => {
        router.push(`/employees/${rowId}`);
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
  ], [router]);

  const columns: ColumnDef<Employee>[] = React.useMemo(() => [
    { accessorKey: "employee_id", header: "Employee ID", cell: ({ row }) => <AppTooltip text={row.getValue("employee_id") || ""} /> },
    { accessorKey: "first_name", header: "First Name", cell: ({ row }) => <AppTooltip text={row.getValue("first_name") || ""} /> },
    { accessorKey: "last_name", header: "Last Name", cell: ({ row }) => <AppTooltip text={row.getValue("last_name") || ""} /> },
    { accessorKey: "email", header: "Email", cell: ({ row }) => <AppTooltip text={row.getValue("email") || ""} /> },
    { accessorKey: "phone_number", header: "Phone", cell: ({ row }) => <AppTooltip text={row.getValue("phone_number") || ""} /> },
    { accessorKey: "position", header: "Position", cell: ({ row }) => <AppTooltip text={row.getValue("position") || ""} /> },
    {
      accessorKey: "created_at",
      header: "Created Date",
      cell: ({ row }) => {
        const formattedDate = format(new Date(row.getValue("created_at")), "dd MMM yyyy");
        return <AppTooltip text={formattedDate} />;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <AppActionCell actions={actions} id={row.getValue("employee_id")} />,
    },
  ], [actions]);

  const deleteMutation = useMutation({
    mutationFn: (employeeId: string) => deleteEmployee(employeeId),
    onSuccess: () => {
      toast.success("Employee deleted successfully!");
      setDeleteConfirmationPopupDetails((prev) => ({ ...prev, openDeleteConfirmationPopup: false }));
    },
    onMutate: () => {
      setDeleteConfirmationPopupDetails((prev) => ({ ...prev, isDeletingEmployee: true }));
    },
    onSettled: () => {
      setDeleteConfirmationPopupDetails((prev) => ({ ...prev, isDeletingEmployee: false }));
    },
    onError: (error: Error) => {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee. Please try again.");
    },
  });

  const handleConfirm = React.useCallback((rowId: string) => {
    deleteMutation.mutate(rowId);
  }, [deleteMutation]);

  if (isLoading) return <AppTableSkeleton />;
  if (error) return <AppTableError />;

  return (
    <div className="w-full h-full p-4">
      <AppDataTable columns={columns} data={data!} redirectPath={"/employees/add-employee"} />
      <AppDeleteConfirmationPopup
        description="Do you want to delete this employee?"
        onConfirm={(rowId: string) => {
          handleConfirm(rowId);
        }}
        isOpen={deleteConfirmationPopupDetails?.openDeleteConfirmationPopup}
        setIsOpen={(value: boolean) =>
          setDeleteConfirmationPopupDetails((prev) => ({ ...prev, openDeleteConfirmationPopup: value }))
        }
        isDeleting={deleteConfirmationPopupDetails?.isDeletingEmployee}
        rowId={deleteConfirmationPopupDetails?.rowId}
      />
    </div>
  );
};

export default EmployeeTable;
