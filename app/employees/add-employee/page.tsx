"use client";
import { toast } from "@/components/ui/index";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import EmployeeForm, { EmployeeFormData } from "../(utils)/employee-form";
import { useRouter } from "next/navigation";
import { addEmployee } from "../(utils)/api-request";

const AddEmployeePage = () => {
  const router = useRouter();
  const [isAddingData, setIsAddingData] = React.useState(false);

  const mutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      toast.success("Employee added successfully!");
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
      console.error("Error adding employee:", error);
      toast("Failed to add employee. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<EmployeeFormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <EmployeeForm
      headerText="Add Employee"
      onSubmit={onSubmit}
      isSubmitBtnLoading={isAddingData}
    />
  );
};

export default AddEmployeePage;
