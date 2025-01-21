import * as React from "react";
import { AppBillTable } from "@/components/common/index";

const BillPage = () => {
  return <AppBillTable apiRoute="monthly-bills" />;
};

export default BillPage;