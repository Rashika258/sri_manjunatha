"use client";

import * as React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { AppFormLoader, AppTableError } from "@/components/common/index";
import { ProductFormData } from "@/types";
import { toast } from "sonner";
import { fetchProductData, ProductForm, updateProduct } from "../(utils)/index";

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
    mutationFn: (data: ProductFormData) => updateProduct(productId, data),

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
      toast.error("Failed to update product. Please try again.");
    },
  });

  const onSubmit = (formData: ProductFormData) => {
    if (productId) {
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
