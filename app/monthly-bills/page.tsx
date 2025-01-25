import * as React from "react";
import { AppBillTable } from "@/components/common/index";

const BillPage = () => {
  return <AppBillTable invoiceType="MONTHLY" apiRoute="monthly-bills" />;
};

export default BillPage;