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
  Switch,
  Label,
} from "@/components/ui/index";
import {
  AppDropdownOption,
  BillingFormData,
  FormErrors,
  FormField,
  InvoiceItem,
  ItemField,
} from "@/types";
import {
  AppDateInput,
  AppDropdown,
  AppFormHeader,
} from "@/components/common/index";
import { useCustomers } from "@/app/customers/(utils)/api-request";
import { useProducts } from "@/app/products/(utils)/api-request";

const paymentStatusOptions: AppDropdownOption[] = [
  { value: "1", label: "Paid" },
  { value: "2", label: "Overdue" },
  { value: "3", label: "Pending" },
];

const defaultFormData = {
  invoice_number: undefined,
  customer_id: undefined,
  gstin: undefined,
  customer_address: undefined,
  customer_email: undefined,
  customer_name: undefined,
  customer_phone: undefined,
  is_gst_bill: false,
  payment_status: undefined,
  tax_amount: 0,
  total_amount: 0,
  due_date: new Date(),
  invoice_date: new Date(),
  invoiceitem: [
    {
      product_id: undefined,
      product_name: undefined,
      quantity: undefined,
      bags: undefined,
      unit_price: undefined,
      total_price: undefined,
      hsn: undefined,
    },
  ],
};

const AppBillingForm = ({
  headerText,
  isSubmitBtnLoading,
  handleSubmit,
}: {
  headerText: string;
  isSubmitBtnLoading: boolean;
  handleSubmit: (data: BillingFormData) => void;
}) => {
  const customerData = useCustomers();
  const productData = useProducts();
  const [formData, setFormData] =
    React.useState<BillingFormData>(defaultFormData);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const productOptions = React.useMemo(() => {
    return productData?.data?.map((product) => {
      return {
        value: product?.product_id?.toString() as string,
        label: product?.name,
      };
    });
  }, [productData?.data]);

  const customerOptions = React.useMemo(() => {
    return customerData?.data?.map((customer) => {
      return {
        value: customer?.customer_id?.toString() as string,
        label: customer?.name,
      };
    });
  }, [customerData?.data]);

  const onSubmit = () => {
    const formErrors: FormErrors = {};

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

    if (!formData.invoiceitem || formData.invoiceitem.length === 0) {
      formErrors.invoice_items = "At least one item is required";
    }

    // Validate invoice items
    formData.invoiceitem.forEach((item, index) => {
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

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      handleSubmit(formData);
    }
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      invoice_items: [
        ...prev.invoiceitem,
        {
          product_id: undefined,
          product_name: undefined,
          quantity: undefined,
          bags: undefined,
          unit_price: undefined,
          total_price: undefined,
          hsn: undefined,
        },
      ],
    }));
  };

  const updateItemField = (
    index: number,
    key: keyof InvoiceItem,
    value: string | number | Date | undefined
  ) => {
    setFormData((prev) => {
      const updatedItems = [...prev.invoiceitem];
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
      invoice_items: prev.invoiceitem.filter((_, i) => i !== index),
    }));
  };

  const calculateTotalBill = React.useCallback(
    () =>
      formData.invoiceitem.reduce(
        (total, item) => total + (item.total_price || 0),
        0
      ),
    [formData.invoiceitem]
  );

  const updateFormField = (
    key: keyof BillingFormData,
    value: string | number | Date | undefined | boolean
  ) => {
    console.log("key=========", key, "value========", value);
    if (key === "customer_id") {
      setFormData((prev) => {
        const selectedCustomer = customerOptions?.find(
          (customer) => customer?.value === value
        );
        return {
          ...prev,
          [key]: value,
          customer_name: selectedCustomer?.label || "", // Fallback to an empty string if not found
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const fields: FormField[] = React.useMemo(
    () => [
      {
        name: "invoice_number",
        label: "Invoice Number",
        type: "input",
        value: formData.invoice_number,
      },
      {
        name: "gstin",
        label: "GST Number",
        type: "input",
        value: formData.gstin,
      },
      {
        name: "payment_status",
        label: "Payment Status",
        type: "dropdown",
        value: formData.payment_status,
        options: paymentStatusOptions,
      },
      {
        name: "customer_id",
        label: "Customer Name",
        type: "dropdown",
        value: formData.customer_name,
        options: customerOptions,
      },
      {
        name: "invoice_date",
        label: "Invoice Date",
        type: "date",
        value: formData.invoice_date,
      },
      {
        name: "due_date",
        label: "Due Date",
        type: "date",
        value: formData.due_date,
      },
      {
        name: "customer_address",
        label: "Customer Address",
        type: "input",
        value: formData.customer_address,
      },
      {
        name: "customer_phone",
        label: "Customer Phone",
        type: "input",
        value: formData.customer_phone,
      },
      {
        name: "customer_email",
        label: "Customer Email",
        type: "input",
        value: formData.customer_email,
      },
      {
        name: "tax_amount",
        label: "Tax Amount",
        type: "input",
        value: formData.tax_amount,
      },
    ],
    [
      customerOptions,
      formData.customer_address,
      formData.customer_email,
      formData.customer_name,
      formData.customer_phone,
      formData.due_date,
      formData.gstin,
      formData.invoice_date,
      formData.invoice_number,
      formData.payment_status,
      formData.tax_amount,
    ]
  );

  const tableFields = React.useCallback(
    (item: InvoiceItem): ItemField[] => {
      return [
        {
          name: "product_name",
          label: "Product",
          type: "dropdown",
          value: item.product_name,
          options: productOptions,
        },
        {
          name: "quantity",
          label: "Quantity",
          type: "input",
          value: item.quantity,
          inputType: "number",
        },
        {
          name: "hsn",
          label: "HSN Code",
          type: "input",
          value: item.hsn,
          inputType: "number",
        },
        {
          name: "bags",
          label: "Bags",
          type: "input",
          value: item.bags,
          inputType: "number",
        },
        {
          name: "unit_price",
          label: "Unit Price",
          type: "input",
          value: item.unit_price,
        },
        {
          name: "total_price",
          label: "Total Price",
          type: "input",
          value: item.total_price,
          disabled: true,
        },
      ];
    },
    [productOptions]
  );

  const renderFormField = (
    field: FormField | ItemField,
    idx: number,
    renderType?: string
  ) => {
    const { name, label, type, value, options, inputType } = field;
    return (
      <div key={idx + label} className="flex flex-col gap-2">
        {renderType === "form" && <div className="font-semibold">{label}</div>}
        <div>
          {type === "input" && (
            <Input
              type={inputType || "text"}
              placeholder={label}
              value={value as string}
              onChange={(e) => {
                const value =
                  inputType === "number"
                    ? Number(e.target.value)
                    : e.target.value;

                if (renderType === "item") {
                  updateItemField(idx, name as keyof InvoiceItem, value);
                } else if (renderType === "form") {
                  updateFormField(name as keyof BillingFormData, value);
                }
              }}
            />
          )}

          {type === "dropdown" && (
            <AppDropdown
              isLoading={false}
              options={options!}
              field={{
                value:
                  (options?.find((option) => option.value === value) || {})
                    .value || "",
                onChange: (value, label) => {
                  console.log("value=====", value);

                  if (renderType === "item") {
                    updateItemField(
                      idx,
                      name as keyof InvoiceItem,
                      value,
                      label
                    );
                  } else if (renderType === "form") {
                    updateFormField(
                      name as keyof BillingFormData,
                      value,
                      label
                    );
                  }
                },
              }}
              placeholder={label}
            />
          )}

          {type === "date" && (
            <AppDateInput
              date={value ? new Date(value) : undefined}
              setDate={(value) => {
                if (renderType === "item") {
                  updateItemField(idx, name as keyof InvoiceItem, value);
                } else if (renderType === "form") {
                  updateFormField(name as keyof BillingFormData, value);
                }
              }}
            />
          )}
        </div>

        <div className="text-sm text-destructive-foreground">
          {errors[name]}
        </div>
      </div>
    );
  };

  console.log("aaa=======", formData);

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto ">
      <AppFormHeader headerText={headerText} />
      <form onSubmit={onSubmit}>
        <div className="flex flex-col grow justify-between space-y-4 ">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {fields.map((field, idx) => renderFormField(field, idx, "form"))}
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
                {formData?.invoiceitem.map((item, index) => (
                  <TableRow key={index}>
                    {tableFields(item).map((field, idx) => {
                      return (
                        <TableCell key={idx}>
                          {renderFormField(field, index, "item")}
                        </TableCell>
                      );
                    })}

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

        <div className="flex items-center space-x-2 py-4">
          <Switch
            id="status"
            checked={formData?.is_gst_bill}
            onCheckedChange={(checked) => {
              updateFormField("is_gst_bill", !checked);
            }}
          />
          <Label htmlFor="status">
            {formData?.is_gst_bill ? "Is gst bill" : "Not gst bill"}
          </Label>
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
            <Button loading={isSubmitBtnLoading} type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppBillingForm;
