"use client";
import { toast } from "@/components/ui/index";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import CustomerForm, { CustomerFormData } from "../(utils)/customer-form";
import { addCustomer } from "../(utils)/route";

const AddCustomerPage = () => {
  const [isAddingData, setIsAddingData] = React.useState(false);

  const mutation = useMutation({
    mutationFn: addCustomer,
    onSuccess: () => {
      toast.success("Customer added successfully!");
      mutation.reset();
      // reset();
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

  return <CustomerForm onSubmit={onSubmit} isSubmitBtnLoading={isAddingData} />;
};

export default AddCustomerPage;
