"use client";
import React, {  useState } from "react";
import { Product } from "@/types"; 
import ProductForm from "../(utils)/product-form";

const ProductPage = () => {
  const [isSubmitBtnLoading, setSubmitBtnLoading] = useState(false);



  const handleFormSubmit = async (data: Product) => {
    setSubmitBtnLoading(true);
    try {
      console.log("Form submitted:", data);
    } finally {
      setSubmitBtnLoading(false);
    }
  };

  return (
    <div>
      <ProductForm
        onSubmit={handleFormSubmit}
        isSubmitBtnLoading={isSubmitBtnLoading}
        headerText="Add Product"
      />
    </div>
  );
};

export default ProductPage;
