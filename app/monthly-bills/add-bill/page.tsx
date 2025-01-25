"use client";

import React from "react";
import AppBillingForm from "@/components/common/app-billing-form";
import { BillingFormData } from "@/types";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/index";
import { addBill } from "@/app/daily-bills/(utils)";


const AddBillingForm = () => {

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
      toast.error("Failed to add bill. Please try again.");
    },
  });

  const onSubmit = (data: BillingFormData) => {

    console.log("onSubmit=====", data);
    

    mutation.mutate(data);
  };


  return (
    <div className={`w-full h-full flex items-center flex-col `}>
      <AppBillingForm handleSubmit={onSubmit} isSubmitBtnLoading={isAddingData} invoiceType="MONTHLY"  headerText="Monthly Bill"  />
    </div>
  );
};

export default AddBillingForm;
