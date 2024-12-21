import React from "react";
import { Badge } from "@/components/ui/index";

const AppPaymentStatus = ({
  payment_status,
}: {
  payment_status: "PAID" | "UNPAID" | "INPROGRESS";
}) => {
  const badgeVariant = {
    PAID: "success",
    UNPAID: "destructive",
    INPROGRESS: "secondary",
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
