"use client";
import { Button, toast } from "@/components/ui/index";
import { ActionItem, AllowedActionType, BillingFormData } from "@/types";
import { useRouter } from "next/navigation";
import * as React from "react";
import AppDeleteConfirmationPopup from "./app-delete-confirmation-popup";
import { useMutation } from "@tanstack/react-query";
import { Download, Pencil, Share2, Trash } from "lucide-react";
import { capitalizeFirstLetter } from "./app-utils";
import AppSharePopup from "./app-share-popup";

const AppActionCell = ({
  id,
  enabledActions,
  title,
  deleteHandler,
  data
}: {
  id: string;
  enabledActions: AllowedActionType;
  title: string;
  deleteHandler: (id: string) => Promise<void>;
  data?: BillingFormData;
}) => {
  const router = useRouter();

  const [deleteConfirmationPopupDetails, setDeleteConfirmationPopupDetails] =
    React.useState({
      openDeleteConfirmationPopup: false,
      isDeletingProduct: false,
      rowId: "",
    });

  const [shareConfirmationPopupDetails, setShareConfirmationPopupDetails] =
    React.useState({
      openShareConfirmationPopup: false,
      isSharingProduct: false,
      rowId: "",
    });

  const actions: ActionItem[] = React.useMemo(
    () => [
      {
        label: "Edit",
        icon: <Pencil />,
        handler: (rowId: string) => {
          router.push(`/${title}/${rowId}`);
        },
        buttonVariant: "secondary",
        isEnabled: Boolean(enabledActions.EDIT),
      },
      {
        label: "Download",
        icon: <Download />,
        handler: (rowId: string) => {
          router.push(`/${title}/invoice/${rowId}`);
        },
        isEnabled: Boolean(enabledActions.DOWNLOAD),
        buttonVariant: "default",
      },
      {
        label: "Share",
        icon: <Share2 />,
        handler: (id: string) => {
          setShareConfirmationPopupDetails((prev) => ({
            ...prev,
            openShareConfirmationPopup: true,
            rowId: id,
          }));
        },
        isEnabled: Boolean(enabledActions.SHARE),
        buttonVariant: "secondary",
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
        isEnabled: Boolean(enabledActions.DELETE),
      },
    ],
    [
      enabledActions.DELETE,
      enabledActions.DOWNLOAD,
      enabledActions.EDIT,
      enabledActions.SHARE,
      router,
      title,
    ]
  );

  const updatedTitle = React.useMemo(
    () => capitalizeFirstLetter(title),
    [title]
  );

  const deleteMutation = useMutation({
    mutationFn: deleteHandler,
    onSuccess: () => {
      toast.success(`${updatedTitle} deleted successfully!`);
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
      console.error(`Error deleting ${updatedTitle}:`, error);
      toast.error(`Failed to delete ${updatedTitle}. Please try again.`);
    },
  });

  const handleConfirm = React.useCallback(
    (rowId: string) => {
      deleteMutation.mutate(rowId);
    },
    [deleteMutation]
  );

  return (
    <div className="grid gap-2 grid-flow-col">
      {actions.map((action, index) => (
        <div key={index} className="flex justify-between  items-center gap-4">
          <Button
            variant={action.buttonVariant ? action.buttonVariant : "ghost"}
            size={"icon"}
            onClick={() => action.handler(id)}
          >
            {action.icon}
          </Button>
        </div>
      ))}
      <AppDeleteConfirmationPopup
        description={`Do you want to delete this ${updatedTitle}?`}
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

      <AppSharePopup
        data={data}
        isOpen={shareConfirmationPopupDetails?.openShareConfirmationPopup}
        setIsOpen={(value: boolean) =>
          setShareConfirmationPopupDetails((prev) => ({
            ...prev,
            openShareConfirmationPopup: value,
          }))
        }
        rowId={shareConfirmationPopupDetails?.rowId}
      />
    </div>
  );
};

export default AppActionCell;
