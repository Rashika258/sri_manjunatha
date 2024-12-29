"use client";
import * as React from "react";
import { AppBillingForm } from "@/components/common";
import { toast } from "@/components/ui/index";
import { BillingFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addBill } from "../(utils)/api-request";

const AddBillPage = () => {
  const router = useRouter();
  const [isAddingData, setIsAddingData] = React.useState(false);

  const mutation = useMutation({
    mutationFn: addBill,
    onSuccess: () => {
      toast.success("Bill added successfully!");
      mutation.reset();
      router.back();
    },
    onMutate: () => {
      setIsAddingData(true);
    },
    onSettled: () => {
      setIsAddingData(false);
    },
    onError: (error: Error) => {
      console.error("Error adding bill:", error);
      toast("Failed to add bill. Please try again.");
    },
  });

  const onSubmit = (data: BillingFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full h-full flex items-center flex-col">
      <AppBillingForm headerText="Add Daily Bill" handleSubmit={onSubmit} isSubmitBtnLoading={isAddingData} />
    </div>
  );
};

export default AddBillPage;
