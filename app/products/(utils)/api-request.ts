import { GetProductsParams, Product } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const addProduct = async (product: Product): Promise<void> => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add product");
  }

  return response.json();
};

const getProducts = async (params?: GetProductsParams): Promise<Product[]> => {
  try {
    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const url = `/api/products${query ? `?${query}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const updateProduct = async (productId: string, productData: Product) => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

const fetchProductData = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to fetch data. Status: ${response.status}, Message: ${
          errorDetails.message || "Unknown error"
        }`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchProductData:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};

const useProducts = (
  params?: GetProductsParams,
  options?: UseQueryOptions<Product[], Error>
) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    ...options,
  });
};

export {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  useProducts,
  fetchProductData,
};
