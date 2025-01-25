"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { AppBillingForm, AppFormLoader, AppTableError } from "@/components/common/index";
import { toast } from "sonner";
import { fetchBillData, updateBill } from "../(utils)/index";
import { BillingFormData } from "@/types";

const EditBillPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const billId = Array.isArray(id) ? id[0] : id;
  const [isEditing, setIsEditing] = React.useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["bill", billId],
    queryFn: () => fetchBillData(billId),
    enabled: !!billId,
  });

  const editMutation = useMutation({
    mutationFn: (data: BillingFormData) => updateBill(billId, data),
    onSuccess: () => {
      toast.success("Bill updated successfully!");
      setIsEditing(false);
      router.back();
    },
    onMutate: () => {
      setIsEditing(true);
    },
    onSettled: () => {
      setIsEditing(false);
    },
    onError: (error: Error) => {
      console.error("Error updating bill:", error);
      toast.error("Failed to update bill. Please try again.");
    },
  });

  const onSubmit = (formData: BillingFormData) => {
    if (billId) {
      editMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return <AppFormLoader />;
  }

  if (error) {
    return <AppTableError />;
  }

  if (!data) {
    return <div>No bill data found</div>;
  }

  return (
    <AppBillingForm
      handleSubmit={onSubmit}
      data={data}
      invoiceType="DAILY"
      isSubmitBtnLoading={isEditing}
      headerText="Edit Bill"
    />
  );
};

export default EditBillPage;
