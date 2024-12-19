import AppBillingForm from "@/components/common/app-billing-form";
import React from "react";

const AppBillPage = () => {
  return (
    <div className={`w-full h-full flex items-center flex-col `}>
      <AppBillingForm headerText={"Daily Bill"} />
    </div>
  );
};

export default AppBillPage;
