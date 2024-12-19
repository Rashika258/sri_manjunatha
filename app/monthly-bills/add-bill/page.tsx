import React from "react";
import AppBillingForm from "@/components/common/app-billing-form";

const AddBillingForm = () => {
  return (
    <div className={`w-full h-full flex items-center flex-col `}>
      <AppBillingForm headerText="Monthly Bill"  />
    </div>
  );
};

export default AddBillingForm;
