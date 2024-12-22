import { Customer } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  

const getCustomers = async () => {
  try {
    const response = await fetch('/api/customers', {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
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

const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"], 
    queryFn: getCustomers, 
  });
};




export { addCustomer, getCustomers, updateCustomer, deleteCustomer, useCustomers };
