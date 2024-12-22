import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/index";

interface AppDeleteConfirmationPopupProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onConfirm: (value: string) => void;
  title?: string;
  description?: string;
  rowId: string;
  isDeleting: boolean;
}

const AppDeleteConfirmationPopup: React.FC<AppDeleteConfirmationPopupProps> = ({
  rowId,
  isOpen,
  setIsOpen,
  onConfirm,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
}) => {
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDialog}>
            Cancel
          </AlertDialogCancel>
        <AlertDialogAction onClick={()=>onConfirm(rowId)}>
            Continue
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppDeleteConfirmationPopup;
