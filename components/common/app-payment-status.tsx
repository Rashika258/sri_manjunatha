import React from "react";
import { Badge } from "@/components/ui/index";

const AppPaymentStatus = ({
  payment_status,
}: {
  payment_status: "PAID" | "UNPAID" | "OVERDUE";
}) => {
  const badgeVariant = {
    PAID: "success",
    OVERDUE: "destructive",
    UNPAID: "secondary",
  };
  return (
    <Badge
      variant={
        badgeVariant[payment_status] as "success" | "destructive" | "secondary"
      }
    >
      {payment_status}
    </Badge>
  );
};

export default AppPaymentStatus;
