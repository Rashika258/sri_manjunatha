"use client";
import { toast } from "@/components/ui/index";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import ProductCategoryForm, { ProductCategoryFormData } from "../(utils)/product-category-form";
import { addProductCategory } from "../(utils)/api-request";
import { useRouter } from "next/navigation";

const AddProductCategoryPage = () => {
  const router = useRouter();
  const [isAddingData, setIsAddingData] = React.useState(false);

  const mutation = useMutation({
    mutationFn: addProductCategory,
    onSuccess: () => {
      toast.success("Product Category added successfully!");
      mutation.reset();
      router.back();  // Redirects to the previous page after success
    },
    onMutate: () => {
      setIsAddingData(true);  // Shows loading state when data is being added
    },
    onSettled: () => {
      setIsAddingData(false);  // Hides loading state after mutation finishes
    },
    onError: (error: Error) => {
      console.error("Error adding product category:", error);
      toast("Failed to add product category. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<ProductCategoryFormData> = (data) => {
    mutation.mutate(data);  // Calls mutation to add product category
  };

  return (
    <ProductCategoryForm
      headerText="Add Product Category"
      onSubmit={onSubmit}
      isSubmitBtnLoading={isAddingData}  // Shows the loading spinner on submit button
    />
  );
};

export default AddProductCategoryPage;
