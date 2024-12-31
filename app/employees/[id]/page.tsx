"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { EmployeeForm, fetchEmployeeData, updateEmployee } from "../(utils)/index";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {  EmployeeFormData } from "@/types";
import { AppFormLoader, AppTableError } from "@/components/common/index";

const EmployeeEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const employeeId = Array.isArray(id) ? id[0] : id;
  const [isEditingData, setIsEditingData] = React.useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => fetchEmployeeData(employeeId),
    enabled: !!employeeId,
  });

  const editMutation = useMutation({
    mutationFn: (data: EmployeeFormData) => updateEmployee(employeeId, data),
    onSuccess: () => {
      toast.success("Employee updated successfully!");
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
      console.error("Error updating employee:", error);
      toast.error(`Failed to update employee: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<EmployeeFormData> = (formData) => {
    if (employeeId) {
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
    return <div>No employee data found</div>;
  }

  return (
    <EmployeeForm
      onSubmit={onSubmit}
      data={data}
      isSubmitBtnLoading={isEditingData}
      headerText="Edit Employee"
    />
  );
};

export default EmployeeEditPage;
