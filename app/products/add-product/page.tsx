"use client";
import * as React from "react";
import { Product } from "@/types"; 
import ProductForm from "../(utils)/product-form";
import { addProduct } from "../(utils)/api-request";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const router = useRouter();
  const [isAddingData, setIsAddingData] = React.useState(false);

  const mutation = useMutation({
    mutationFn: addProduct,
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

  const onSubmit: SubmitHandler<Product> = (data) => {
console.log("ee2", data);

    mutation.mutate(data);  // Calls mutation to add product category
  };

  return (
    <div>
      <ProductForm
        onSubmit={onSubmit}
        isSubmitBtnLoading={isAddingData}
        headerText="Add Product"
      />
    </div>
  );
};

export default ProductPage;
