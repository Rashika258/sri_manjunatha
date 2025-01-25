import * as React from "react";
import { AppBillTable } from "@/components/common/index";

const BillPage = () => {
  return <AppBillTable invoiceType="DAILY" apiRoute="daily-bills" />;
};

export default BillPage;
