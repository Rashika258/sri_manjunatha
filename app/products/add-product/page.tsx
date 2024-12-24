"use client";
import { toast } from "@/components/ui/index";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import ProductForm, { ProductFormData } from "../(utils)/product-form";
import { addProduct } from "../(utils)/api-request";
import { useRouter } from "next/navigation";

const AddProductPage = () => {
  const router = useRouter();
  const [isAddingData, setIsAddingData] = React.useState(false);

  const mutation = useMutation({
    mutationFn: ()=>{ console.log("a11");
    },
    onSuccess: () => {
      // toast.success("Product added successfully!");
      // mutation.reset();
      // router.back();
    },
    onMutate: () => {
      setIsAddingData(true);
    },
    onSettled: () => {
      setIsAddingData(false);
    },
    onError: (error: Error) => {
      console.error("Error adding product:", error);
      toast("Failed to add product. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    debugger
    mutation.mutate(data);
  };

  return <ProductForm headerText="Add Product" onSubmit={onSubmit} isSubmitBtnLoading={isAddingData} />;
};

export default AddProductPage;
