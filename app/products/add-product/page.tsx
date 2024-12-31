"use client";
import * as React from "react";
import {  ProductFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { addProduct, ProductForm } from "../(utils)/index";

const ProductPage = () => {
  const router = useRouter();
  const [isAddingData, setIsAddingData] = React.useState(false);

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product added successfully!");
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
      console.error("Error adding product :", error);
      toast.error("Failed to add product. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <ProductForm
      onSubmit={onSubmit}
      isSubmitBtnLoading={isAddingData}
      headerText="Add Product"
    />
  );
};

export default ProductPage;
