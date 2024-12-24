import { ProductCategory } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const addProductCategory = async (
  category: Omit<ProductCategory, "id" | "createdAt" | "updatedAt">
): Promise<ProductCategory> => {
  const response = await fetch("/api/product-category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add product category");
  }

  return response.json();
};

type GetProductCategoriesParams = {
  search?: string;
  startDate?: string;
  endDate?: string;
};

const getProductCategories = async (
  params?: GetProductCategoriesParams
): Promise<ProductCategory[]> => {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  const url = `/api/product-category`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product categories: ${response.statusText}`
    );
  }

  return await response.json();
};

const updateProductCategory = async (
  categoryId: string,
  categoryData: Partial<Omit<ProductCategory, "id">>
): Promise<ProductCategory> => {
  const response = await fetch(`/api/product-category/${categoryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update product category: ${response.statusText}`
    );
  }

  return await response.json();
};

const deleteProductCategory = async (categoryId: string): Promise<void> => {
  const response = await fetch(`/api/product-category/${categoryId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to delete product category: ${response.statusText}`
    );
  }

  return response.json();
};

const fetchProductCategoryData = async (categoryId: string) => {
  try {
    const response = await fetch(`/api/product-category/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product category: ${response.statusText}`
      );
    }

    // Parse the response body
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product category:", error);
    throw new Error("Failed to fetch product category data");
  }
};

const useProductCategories = (
  params?: GetProductCategoriesParams,
  options?: UseQueryOptions<ProductCategory[], Error>
) =>{
  return useQuery<ProductCategory[], Error>({
    queryKey: ["product-categories", params],
    queryFn: () => getProductCategories(params),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    ...options,
  });
};

export {
  addProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
  useProductCategories,
  fetchProductCategoryData,
  
  
};
