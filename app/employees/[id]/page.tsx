"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { fetchEmployeeData, updateEmployee } from "../(utils)/api-request";
import EmployeeForm, { EmployeeFormData } from "../(utils)/employee-form";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Employee } from "@/types";
import { AppFormLoader } from "@/components/common";

const EmployeeEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const employeeId = typeof id === "string" ? id : id?.[0];
  const [isEditingData, setIsEditingData] = React.useState(false);

  // Fetch employee data
  const {
    data: employeeData,
    error: fetchError,
    isLoading: isFetching,
  } = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => fetchEmployeeData(employeeId),
    enabled: !!employeeId, // Only fetch if `employeeId` is valid
  });

  // Mutation to update employee
  const { mutate: updateEmployeeData, isLoading: isMutating } = useMutation({
    mutationFn: (data: Employee) => updateEmployee(employeeId, data),
    onSuccess: () => {
      toast.success("Employee updated successfully!");
      setIsEditingData(false);
      router.back(); // Navigate back to the previous page
    },
    onError: (error: Error) => {
      console.error("Error updating employee:", error);
      toast.error(`Failed to update employee: ${error.message}`);
    },
    onSettled: () => setIsEditingData(false),
  });

  // Submit handler for the form
  const onSubmit: SubmitHandler<EmployeeFormData> = (formData) => {
    if (employeeId) {
      setIsEditingData(true);
      updateEmployeeData(formData);
    }
  };

  // Display a loader if data is being fetched
  if (isFetching) {
    return <AppFormLoader />;
  }

  // Handle errors during data fetch
  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  // Handle case where no data is returned
  if (!employeeData) {
    return <div>No employee data found</div>;
  }

  return (
    <EmployeeForm
      onSubmit={onSubmit}
      data={employeeData}
      isSubmitBtnLoading={isMutating || isEditingData}
      headerText="Edit Employee"
    />
  );
};

export default EmployeeEditPage;
