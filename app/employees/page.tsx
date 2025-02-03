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
import { deleteEmployee, useEmployees } from "./(utils)/index";
import { ApiQueryParams, Employee } from "@/types";
import { DateRange } from "react-day-picker";

const EmployeeTable = () => {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const params: ApiQueryParams | undefined = React.useMemo(() => {
    if (!date || !date.from || !date.to) return undefined;
    return {
      start_date: date.from ? convertISTToInstant(date.from) : undefined,
      end_date: date.to ? convertISTToInstant(date.to) : undefined,
    };
  }, [date]);
  const { data, isLoading, error, refetch } = useEmployees(params);

  const columns: ColumnDef<Employee>[] = React.useMemo(
    () => [
      {
        accessorKey: "first_name",
        header: "First Name",
        cell: ({ row }) => (
          <AppTooltip text={row.getValue("first_name") || ""} />
        ),
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        cell: ({ row }) => (
          <AppTooltip text={row.getValue("last_name") || ""} />
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <AppTooltip text={row.getValue("email") || ""} />,
      },
      {
        accessorKey: "phone_number",
        header: "Phone",
        cell: ({ row }) => (
          <AppTooltip text={row.getValue("phone_number") || ""} />
        ),
      },
      {
        accessorKey: "position",
        header: "Position",
        cell: ({ row }) => <AppTooltip text={row.getValue("position") || ""} />,
      },
      {
        accessorKey: "created_at",
        header: "Created Date",
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
        cell: ({ row }) => {
          return (
            <AppActionCell
              deleteHandler={(employeeId: string) => deleteEmployee(employeeId)}
              title="employees"
              enabledActions={{ EDIT: true, DELETE: true }}
              id={row?.original?.employee_id?.toString() as string}
            />
          );
        },
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
      <AppDataTable<Employee>
        date={date}
        setDate={applyDateFilter}
        columns={columns}
        data={data!}
        redirectPath={"/employees/add-employee"}
      />
    </div>
  );
};

export default EmployeeTable;
