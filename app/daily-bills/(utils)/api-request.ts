import {  BillingFormData, ApiQueryParams } from "@/types";  
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { generateInvoicePDF } from "./download-utils";


const addBill = async (bill: BillingFormData): Promise<void> => {
  const response = await fetch("/api/daily-bills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bill),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add bill");
  }

  return response.json();
};

const getBills = async (params?: ApiQueryParams | undefined): Promise<BillingFormData[]> => {
  try {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const url = `/api/daily-bills${query ? `?${query}` : ""}`;
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Failed to fetch bills: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw error;
  }
};

const updateBill = async (billId: string, billData: BillingFormData) => {
  try {
    const response = await fetch(`/api/daily-bills/${billId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update bill: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating bill:", error);
    throw error;
  }
};

const deleteBill = async (billId: string) => {
  try {
    const response = await fetch(`/api/daily-bills/${billId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete bill: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting bill:", error);
    throw error;
  }
};

const fetchBillData = async (id: string): Promise<BillingFormData> => {
  try {
    const response = await fetch(`/api/daily-bills/${id}`, {
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
    console.error("Error in fetchBillData:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};


const fetchBillDataAsInvoice = async (id: string) => {
  try {
    const response = await fetch(`/api/daily-bills/${id}`, {
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

    const pdfBase64 = generateInvoicePDF();
    return pdfBase64;
  } catch (error) {
    console.error("Error in fetchBillData:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};


const useBills = (
  params: ApiQueryParams | undefined,
  options?: UseQueryOptions<BillingFormData[], Error>
) => {
  return useQuery<BillingFormData[], Error>({
    queryKey: ["bills", params],
    queryFn: () => getBills(params),
    ...options,
  });
};

export {
  addBill,
  getBills,
  updateBill,
  deleteBill,
  useBills,
  fetchBillData,
  fetchBillDataAsInvoice
};
