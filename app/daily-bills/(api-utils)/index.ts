import { useQuery } from "@tanstack/react-query";

interface Invoice {
  id: number;
  customer_id: number;
  invoice_date: string;
  total_amount: number;
  grand_total: number;
  is_gst_bill: boolean;
}

const fetchDailyBills = async (): Promise<Invoice[]> => {
  const response = await fetch("/api/daily-bills", {
    method: "GET",});
  if (!response.ok) {
    throw new Error("Failed to fetch daily bills");
  }
  return response.json();
};

export const useDailyBills = () => {
    return useQuery({
      queryKey: ["dailyBills"], // Pass queryKey as part of the options object
      queryFn: fetchDailyBills, // Provide the query function here
    });
  };