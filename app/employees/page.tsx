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
import { deleteEmployee, useEmployees } from "./(utils)/index";
import { ActionItem, ApiQueryParams, DeleteConfirmationPopupDetails, Employee } from "@/types";
import { Pencil, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";



const EmployeeTable = () => {
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const [deleteConfirmationPopupDetails, setDeleteConfirmationPopupDetails] = React.useState<DeleteConfirmationPopupDetails>({
    openDeleteConfirmationPopup: false,
    isDeletingEmployee: false,
    rowId: "",
  });


  const params: ApiQueryParams | undefined = React.useMemo(() => {
    if (!date || !date.from || !date.to) return undefined;
    return {
      start_date: date.from ? convertISTToInstant(date.from) : undefined,
      end_date: date.to ? convertISTToInstant(date.to) : undefined,
    };
  }, [date]);
  const { data, isLoading, error, refetch } = useEmployees(params);
  

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
      cell: ({ row }) => {        
        return (
          <AppActionCell actions={actions} id={row?.original?.employee_id?.toString() as string} />
        )
      },
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
      <AppDataTable<Employee>
        date={date}
        setDate={applyDateFilter}
       columns={columns} data={data!} redirectPath={"/employees/add-employee"} />
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
