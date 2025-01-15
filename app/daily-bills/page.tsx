"use client";
import * as React from "react";
import {
  AppActionCell,
  AppDataTable,
  AppDeleteConfirmationPopup,
  AppPaymentStatus,
  AppTableError,
  AppTableSkeleton,
  AppTooltip,
} from "@/components/common/index";
import { ActionItem, BillingFormData, ApiQueryParams } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Pencil, Share2, Trash } from "lucide-react";
import { deleteBill, useBills } from "./(utils)/api-request";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { convertInstantToIST, convertISTToInstant } from "@/components/ui/index";
import Invoice from "./(utils)/invoice";

type ColumnType = ColumnDef<BillingFormData>[];

const BillPage = () => {
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [deleteConfirmationPopupDetails, setDeleteConfirmationPopupDetails] =
  React.useState({
    openDeleteConfirmationPopup: false,
    isDeletingCustomer: false,
    rowId: "",
  });
  const [openDialogPopup, setOpenDialogPopup] = React.useState(false);

  const params: ApiQueryParams | undefined = React.useMemo(() => {
    if (!date || !date.from || !date.to) return undefined;
    return {
      start_date: date.from ? convertISTToInstant(date.from) : undefined,
      end_date: date.to ? convertISTToInstant(date.to) : undefined,
    };
  }, [date]);

  const { data, isLoading, error, refetch } = useBills(params);

  const actions: ActionItem[] = React.useMemo(
    () => [
      {
        label: "Edit",
        icon: <Pencil />,
        handler: (rowId: string) => {
          router.push(`/daily-bills/${rowId}`);
        },

        isEnabled: true,
        buttonVariant: "secondary",
      },
      {
        label: "Delete",
        icon: <Trash />,
        handler: (id: string) => {
          setDeleteConfirmationPopupDetails((prev) => ({
            ...prev,
            openDeleteConfirmationPopup: true,
            rowId: id,
          }));
        },
        isEnabled: true,
        buttonVariant: "destructive",
      },
      {
        label: "Download",
        icon: <Download />,
        handler: (id: string) => setOpenDialogPopup(!openDialogPopup),
        isEnabled: true,
        buttonVariant: "ghost",
      },
      {
        label: "Share",
        icon: <Share2 />,
        handler: () => console.log("Share clicked"),
        isEnabled: true,
        buttonVariant: "secondary",
      },
    ],
    [router]
  );

  const columns: ColumnType = [
    {
      accessorKey: "invoice_id",
      header: "Invoice Number",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "gstin",
      header: "GST Number",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "customer_address",
      header: "Customer Address",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "customer_email",
      header: "Customer Email",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "customer_phone",
      header: "Customer Phone",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "tax_amount",
      header: "Tax Amount",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "total_amount",
      header: "Total Amount",
      cell: (info) => <AppTooltip text={info?.getValue()?.toString() || ""} />,
    },
    {
      accessorKey: "invoice_date",
      header: "Invoice Date",
      cell: ({ row }) => {
        return <AppTooltip text={convertInstantToIST(row.getValue("invoice_date"))} />;
      },
    },
    {
      accessorKey: "due_date",
      header: "Due Date",
      cell: ({ row }) => {
          return <AppTooltip text={convertInstantToIST(row.getValue("due_date"))} />;
      },
    },

    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        return <AppTooltip text={convertInstantToIST(row.getValue("created_at"))} />;

      },
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => {

        return <AppTooltip text={convertInstantToIST(row.getValue("updated_at"))} />;

      },
    },
    {
      accessorKey: "payment_status",
      header: "Payment Status",
      cell: (info) => (
        <AppPaymentStatus
          payment_status={info.getValue() as "PAID" | "UNPAID" | "INPROGRESS"}
        />
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (info) => {
        return (
          <AppActionCell
            actions={actions}
            id={info.row.original?.invoice_id?.toString() as string}
          />
        );
      },
    },
  ];

  const deleteMutation = useMutation({
    mutationFn: (invoiceId: string) => deleteBill(invoiceId),
    onSuccess: () => {
      toast.success("Bill deleted successfully!");
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
      console.error("Error adding bill:", error);
      toast.error("Failed to add bill. Please try again.");
    },
  });

  const handleConfirm = React.useCallback(
    (rowId: string) => {
      deleteMutation.mutate(rowId);
    },
    [deleteMutation]
  );
  const applyDateFilter = (date: DateRange | undefined) => {
    setDate(date);
    refetch();
    
  }

  if (isLoading) return <AppTableSkeleton />;
  if (error) return <AppTableError />;



  return (
    <div className={`w-full h-full p-4 overflow-auto`}>
      <Invoice />
      {/* <AppDataTable<BillingFormData>
        redirectPath={"/daily-bills/add-bill"}
        columns={columns}
        data={data!}
        date={date}
        setDate={applyDateFilter}
      />
      
      <AppDeleteConfirmationPopup
        description={"Do you want to delete this bill?"}
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
      /> */}
    </div>
  );
};

export default BillPage;
