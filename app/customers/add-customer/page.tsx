"use client";
import * as React from "react";
import { toast } from "@/components/ui/index";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { CustomerForm, addCustomer } from "../(utils)/index";
import { CustomerFormData } from "../(utils)/customer-form";

const AddCustomerPage = () => {
  const router = useRouter();
  const [isAddingData, setIsAddingData] = React.useState(false);

  const mutation = useMutation({
    mutationFn: addCustomer,
    onSuccess: () => {
      toast.success("Customer added successfully!");
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
      console.error("Error adding customer:", error);
      toast("Failed to add customer. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<CustomerFormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <CustomerForm
      headerText="Add Customer"
      onSubmit={onSubmit}
      isSubmitBtnLoading={isAddingData}
    />
  );
};

export default AddCustomerPage;
