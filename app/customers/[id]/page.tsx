"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { fetchCustomerData, updateCustomer } from "../(utils)/api-request";
import CustomerForm, { CustomerFormData } from "../(utils)/customer-form";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Customer } from "@/types";
import { AppFormLoader } from "@/components/common";

const CustomerEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const customerId = Array.isArray(id) ? id[0] : id;
  const [isEditingData, setIsEditingData] = React.useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["customer", customerId],     
    queryFn: () => fetchCustomerData(customerId), 
    enabled: !!customerId, 
  });


  const editMutation = useMutation({
    mutationFn: (data: Customer) => updateCustomer(customerId, data),

    onSuccess: () => {
      toast.success("Customer updated successfully!");
      setIsEditingData(false);
      editMutation.reset();
      router.back();
    },
    onMutate: () => {
      setIsEditingData(true); 
    },
    onSettled: () => {
      setIsEditingData(false);
    },
    onError: (error: Error) => {
      console.error("Error updating customer:", error);
      toast("Failed to update customer. Please try again.");
    },
  });



  const onSubmit: SubmitHandler<CustomerFormData> = (formData) => {
    if (id) {
      editMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return <AppFormLoader />;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!data) {
    return <div>No customer data found</div>;
  }

  return (
    <CustomerForm
      onSubmit={onSubmit}
      data ={data}
      isSubmitBtnLoading={isEditingData}
      headerText={"Edit Customer"}
    />
  );
};

export default CustomerEditPage;
