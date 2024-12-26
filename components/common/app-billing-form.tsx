"use client";
import * as React from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  Input,
} from "@/components/ui/index";
import { AppDropdownOption, BillingFormData, InvoiceItem } from "@/types";
import { AppDropdown, AppFormHeader } from "@/components/common/index";
import { useCustomers } from "@/app/customers/(utils)/api-request";
import { useProducts } from "@/app/products/(utils)/api-request";

const paymentStatusOptions: AppDropdownOption[] = [
  { value: "1", label: "Paid" },
  { value: "2", label: "Overdue" },
  { value: "3", label: "Pending" },
];

const defaultFormData = {
  invoice_number: Date.now().toString(),
  customer_id: Math.random(),
  gstin: "",
  customer_address: "",
  customer_email: "",
  customer_name: "",
  customer_phone: "",
  is_gst_bill: false,
  payment_status: "",
  tax_amount: 0,
  total_amount: 0,
  due_date: new Date(),
  invoice_date: new Date(),
  invoice_items: [
    {
      product_id: "",
      product_name: "",
      quantity: undefined,
      bags: undefined,
      unit_price: undefined,
      total_price: undefined,
    },
  ],
};

type FormErrors = {
  [key in keyof BillingFormData]?: string;
} & {
  [key: string]: string | undefined; // Allow dynamic string keys like invoice_items[0].product_name
};




const AppBillingForm = ({ headerText }: { headerText: string }) => {
  const customerData = useCustomers();
  const productData = useProducts();
  const [formData, setFormData] =
    React.useState<BillingFormData>(defaultFormData);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const productOptions = React.useMemo(() => {
    return productData?.data?.map((product) => {
      return {
        value: product?.product_id?.toString(),
        label: product?.name,
      };
    });
  }, [productData?.data]);

  const customerOptions = React.useMemo(() => {
    return customerData?.data?.map((customer) => {
      return {
        value: customer?.customer_id?.toString(),
        label: customer?.name,
      };
    });
  }, [customerData?.data]);

  const onSubmit = () => {
    const formErrors: FormErrors = {};

    // Manually validate required fields
    if (!formData.invoice_number) {
      formErrors.invoice_number = "Invoice number is required";
    }

    if (!formData.gstin) {
      formErrors.gstin = "GST Number is required";
    }

    if (!formData.payment_status) {
      formErrors.payment_status = "Payment status is required";
    }

    if (!formData.customer_name) {
      formErrors.customer_name = "Customer name is required";
    }

    if (!formData.invoice_items || formData.invoice_items.length === 0) {
      formErrors.invoice_items = "At least one item is required";
    }

    // Validate invoice items
    formData.invoice_items.forEach((item, index) => {
      if (!item.product_name) {
        formErrors[`invoice_items[${index}].product_name`] =
          "Product name is required";
      }
      if (item.quantity === undefined || item.quantity <= 0) {
        formErrors[`invoice_items[${index}].quantity`] =
          "Quantity must be greater than 0";
      }
      if (item.unit_price === undefined || item.unit_price <= 0) {
        formErrors[`invoice_items[${index}].unit_price`] =
          "Price must be greater than 0";
      }
    });

    // If errors exist, don't submit the form
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      alert("Bill submitted successfully!");
    }
  };

  // Add new item
  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      invoice_items: [
        ...prev.invoice_items,
        {
          product_id: "",
          product_name: "",
          quantity: undefined,
          bags: undefined,
          unit_price: undefined,
          total_price: undefined,
        },
      ],
    }));
  };

  const updateItemField = (
    index: number,
    key: keyof InvoiceItem,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedItems = [...prev.invoice_items];
      updatedItems[index] = {
        ...updatedItems[index],
        [key]: value,
      };
      if (key === "quantity" || key === "unit_price") {
        if (updatedItems[index]?.quantity && updatedItems[index]?.unit_price) {
          updatedItems[index].total_price =
            updatedItems[index]?.quantity * updatedItems[index]?.unit_price;
        }
      }
      return { ...prev, invoice_items: updatedItems };
    });
  };
  // Remove item
  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      invoice_items: prev.invoice_items.filter((_, i) => i !== index),
    }));
  };

  const calculateTotalBill = React.useCallback(
    () =>
      formData.invoice_items.reduce(
        (total, item) => total + (item.total_price || 0),
        0
      ),
    [formData.invoice_items]
  );

  const updateFormField = (key: keyof BillingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchReferenceData = React.useCallback(async () => {}, []);

  React.useEffect(() => {
    fetchReferenceData();
  }, []);

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto ">
      <AppFormHeader headerText={headerText} />
      <form onSubmit={onSubmit}>
        <div className="flex flex-col grow justify-between space-y-4 ">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-2">
              <div className="font-semibold">Invoice Number</div>
              <div>
                <Input
                  placeholder="Bill Number"
                  value={formData.invoice_number}
                  onChange={(e) =>
                    updateFormField("invoice_number", e.target.value)
                  }
                />
              </div>
              {/* Conditionally display the error message */}
              {errors.invoice_number && (
                <div className="text-sm text-destructive-foreground">
                  {errors.invoice_number}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-semibold">GST Number</div>
              <div>
                <Input
                  placeholder="GST Number"
                  value={formData.gstin}
                  onChange={(e) => updateFormField("gstin", e.target.value)}
                />
              </div>
              {/* Conditionally display the error message using div */}
              {errors.gstin && (
                <div className="text-sm text-destructive-foreground">
                  {errors.gstin}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-semibold">Payment Status</div>
              <div>
                <AppDropdown
                  isLoading={false}
                  options={paymentStatusOptions}
                  field={{
                    value:
                      (
                        paymentStatusOptions?.find(
                          (option) => option.value === formData.payment_status
                        ) || {}
                      ).value || "",
                    onChange: (value) => {
                      updateFormField("payment_status", value);
                    },
                  }}
                  placeholder="Select a payment status"
                />
              </div>
              {/* Conditionally display the error message using div */}
              {errors.payment_status && (
                <div className="text-sm text-destructive-foreground">
                  {errors.payment_status}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-semibold">Customer</div>
              <div>
                <AppDropdown
                  isLoading={customerData.isLoading}
                  options={customerOptions!}
                  field={{
                    value:
                      (
                        customerOptions?.find(
                          (option) => option.value === formData.customer_name
                        ) || {}
                      ).value || "",
                    onChange: (value) => {
                      updateFormField("customer_name", value);
                    },
                  }}
                  placeholder="Select a company"
                />
              </div>
              {/* Conditionally display the error message using div */}
              {errors.customer_name && (
                <div className="text-sm text-destructive-foreground">
                  {errors.customer_name}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-semibold">Invoice Date</div>
              <div>{/* Add your AppDateInput component here */}</div>
              {/* Conditionally display error message */}
              {errors.invoice_date && (
                <div className="text-sm text-destructive-foreground">
                  {errors.invoice_date}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-semibold">Due Date</div>
              <div>{/* Add your AppDateInput component here */}</div>
              {/* Conditionally display error message */}
              {errors.due_date && (
                <div className="text-sm text-destructive-foreground">
                  {errors.due_date}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-semibold">Customer Address</div>
              <div>
                <Input
                  placeholder="Customer Address"
                  value={formData.customer_address}
                  onChange={(e) =>
                    updateFormField("customer_address", e.target.value)
                  }
                />
              </div>
              {/* Conditionally display error message */}
              {errors.customer_address && (
                <div className="text-sm text-destructive-foreground">
                  {errors.customer_address}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-semibold">Customer Phone</div>
              <div>
                <Input
                  placeholder="Customer Phone"
                  value={formData.customer_phone}
                  onChange={(e) =>
                    updateFormField("customer_phone", e.target.value)
                  }
                />
              </div>
              {/* Conditionally display error message */}
              {errors.customer_phone && (
                <div className="text-sm text-destructive-foreground">
                  {errors.customer_phone}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-semibold">Customer Email</div>
              <div>
                <Input
                  placeholder="Customer Email"
                  value={formData.customer_email}
                  onChange={(e) =>
                    updateFormField("customer_email", e.target.value)
                  }
                />
              </div>
              {/* Conditionally display error message */}
              {errors.customer_email && (
                <div className="text-sm text-destructive-foreground">
                  {errors.customer_email}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between ">
            <h3 className="font-bold text-lg">Invoice Items</h3>
            <Button onClick={() => addItem()} size={"icon"}>
              <PlusIcon />
            </Button>
          </div>
          <div className="overflow-auto w-full rounded-md border max-h-[200px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Bags</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData?.invoice_items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <AppDropdown
                        isLoading={productData.isLoading}
                        options={productOptions!}
                        field={{
                          value:
                            productOptions?.find(
                              (option) => option.value === item.product_id
                            )?.label || "",
                          onChange: (value) => {
                            updateItemField(index, "product_name", value);
                          },
                        }}
                        placeholder="Select a product"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItemField(index, "quantity", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.bags}
                        onChange={(e) =>
                          updateItemField(index, "bags", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.unit_price}
                        onChange={(e) =>
                          updateItemField(index, "unit_price", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        disabled
                        type="number"
                        value={item.total_price || 0}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="px-4 py-4 flex w-full items-center justify-between space-x-4">
          <div>
            <span>Total Bill: ₹ {calculateTotalBill()}</span>
          </div>
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setFormData(defaultFormData)}
            >
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppBillingForm;
