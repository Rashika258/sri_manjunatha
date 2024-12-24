import { DailyBill } from "@/types";
import { useQuery } from "@tanstack/react-query";

const fetchDailyBills = async (): Promise<DailyBill[]> => {
  const response = await fetch("/api/daily-bills", {
    method: "GET",});
  if (!response.ok) {
    throw new Error("Failed to fetch daily bills");
  }
  return response.json();
};

export const useDailyBills = () => {
    return useQuery({
      queryKey: ["dailyBills"], 
      queryFn: fetchDailyBills,
    });
  };