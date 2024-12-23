import { Customer } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const addCustomer = async (customer: Customer): Promise<void> => {
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add customer");
  }

  return response.json();
};

type GetCustomersParams = {
  search?: string;
  startDate?: string; // ISO string
  endDate?: string;   // ISO string
};

const getCustomers = async (params?: GetCustomersParams): Promise<Customer[]> => {
  try {
    // Build query string from parameters
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const url = `/api/customers${query ? `?${query}` : ""}`;

    // Fetch data from the API
    const response = await fetch(url, {
      method: "GET",
    });

    // Handle non-OK responses
    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.status} ${response.statusText}`);
    }

    // Parse and return JSON data
    return await response.json();
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // Rethrow to handle it in the calling function
  }
};

const updateCustomer = async (customerId: string, customerData: Customer) => {
  try {
    const response = await fetch(`/api/customers/${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update customer: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

const deleteCustomer = async (customerId: string) => {
  try {
    const response = await fetch(`/api/customers/${customerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete customer: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
const fetchCustomerData = async (id: string): Promise<Customer> => {
  try {
    const response = await fetch(`/api/customers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to fetch data. Status: ${response.status}, Message: ${errorDetails.message || "Unknown error"}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchCustomerData:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};


const useCustomers = (
  params?: GetCustomersParams,
  options?: UseQueryOptions<Customer[], Error>
) => {
  return useQuery<Customer[], Error>({
    queryKey: ["customers", params],
    queryFn: () => getCustomers(params),
    ...options,
  });
};

export {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  useCustomers,
  fetchCustomerData
};
