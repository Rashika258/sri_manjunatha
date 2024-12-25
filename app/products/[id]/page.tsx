"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { fetchProductData, updateProduct } from "../(utils)/api-request"; 
import ProductForm, { ProductFormData } from "../(utils)/product-form"; 
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Product } from "@/types";
import { AppFormLoader } from "@/components/common/index"; 

const ProductEditPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const productId = Array.isArray(id) ? id[0] : id;
  const [isEditingData, setIsEditingData] = React.useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["product", productId],     
    queryFn: () => fetchProductData(productId), 
    enabled: !!productId, 
  });

  const editMutation = useMutation({
    mutationFn: (data: Product) => updateProduct(productId, data),

    onSuccess: () => {
      toast.success("Product updated successfully!");
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
      console.error("Error updating product:", error);
      toast("Failed to update product. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = (formData) => {
    if (productId) {
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
    return <div>No product data found</div>;
  }

  return (
    <ProductForm
      onSubmit={onSubmit}
      data={data}
      isSubmitBtnLoading={isEditingData}
      headerText={"Edit Product"}
    />
  );
};

export default ProductEditPage;
