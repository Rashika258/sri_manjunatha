import { ProductData } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const addProduct = async (data: ProductData): Promise<void> => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add product.");
  }
};

export const fetchProducts = async () => {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.data;
  };


  export const useProducts= () => {
    return useQuery({
      queryKey: ["products"], 
      queryFn: fetchProducts, 
    });
  };


  
