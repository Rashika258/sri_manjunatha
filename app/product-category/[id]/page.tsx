"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { fetchProductCategoryData, updateProductCategory } from "../(utils)/api-request";
import ProductCategoryForm, { ProductCategoryFormData } from "../(utils)/product-category-form";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { ProductCategory } from "@/types";
import { AppFormLoader } from "@/components/common";

const ProductCategoryEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const categoryId = Array.isArray(id) ? id[0] : id; // Ensure categoryId is a string or undefined
  const [isEditingData, setIsEditingData] = React.useState(false);

  // Fetch the product category data
  const { data, error, isLoading } = useQuery({
    queryKey: ["productCategory", categoryId],
    queryFn: () => fetchProductCategoryData(categoryId),
    enabled: !!categoryId, // Ensure the query runs only when categoryId is available
  });

  // Mutation to update the product category
  const editMutation = useMutation({
    mutationFn: (data: ProductCategory) => updateProductCategory(categoryId, data),
    onSuccess: () => {
      toast.success("Product Category updated successfully!");
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
      console.error("Error updating product category:", error);
      toast("Failed to update product category. Please try again.");
    },
  });

  // Submit handler for the form
  const onSubmit: SubmitHandler<ProductCategoryFormData> = (formData) => {
    if (categoryId) {
      editMutation.mutate(formData);
    }
  };

  // Loading and error handling
  if (isLoading) {
    return <AppFormLoader />;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!data) {
    return <div>No product category data found</div>;
  }

  return (
    <ProductCategoryForm
      onSubmit={onSubmit}
      data={data}
      isSubmitBtnLoading={isEditingData}
      headerText={"Edit Product Category"}
    />
  );
};

export default ProductCategoryEditPage;
