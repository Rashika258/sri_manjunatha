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
  Customer,
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
  { value: "Paid", label: "Paid" },
  { value: "Overdue", label: "Overdue" },
  { value: "Pending", label: "Pending" },
];

const indianStateOptions: AppDropdownOption[] = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
  {
    value: "Andaman and Nicobar Islands",
    label: "Andaman and Nicobar Islands",
  },
  { value: "Chandigarh", label: "Chandigarh" },
  {
    value: "Dadra and Nagar Haveli and Daman and Diu",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Delhi", label: "Delhi" },
  { value: "Puducherry", label: "Puducherry" },
];

const defaultFormData = (
  invoiceType: string,
  data?: BillingFormData
): BillingFormData => ({
  invoice_number: data?.invoice_number || undefined,
  customer_id: data?.customer_id || undefined,
  gstin: data?.gstin || undefined,
  customer_address: data?.customer_address || undefined,
  customer_email: data?.customer_email || undefined,
  customer_name: data?.customer_name || undefined,
  customer_phone: data?.customer_phone || undefined,
  is_gst_bill: data?.is_gst_bill || false,
  payment_status: data?.payment_status || undefined,
  tax_amount: data?.tax_amount || 0,
  total_amount: data?.total_amount || 0,
  due_date: data?.due_date || new Date(),
  invoice_date: data?.invoice_date || new Date(),
  invoice_type: invoiceType,
  state: data?.state || undefined,
  e_way_bill_num: data?.e_way_bill_num || undefined,
  po_num: data?.po_num || undefined,
  dc_date: data?.dc_date || undefined,
  po_date: data?.po_date || undefined,
  dc_num: data?.dc_num || undefined,
  cgst: data?.cgst || undefined,
  sgst: data?.sgst || undefined,
  igst: data?.igst || undefined,
  grand_total: data?.grand_total || undefined,
  invoice_items: data?.invoice_items || [
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
});
function generateFieldName<T extends keyof InvoiceItem>(
  prefix: string,
  index: number,
  field: T
): `${string}[${number}].${T}` {
  return `${prefix}[${index}].${field}` as const;
}

const AppBillingForm = ({
  headerText,
  isSubmitBtnLoading,
  handleSubmit,
  data,
  invoiceType,
}: {
  headerText: string;
  isSubmitBtnLoading: boolean;
  handleSubmit: (data: BillingFormData) => void;
  data?: BillingFormData;
  invoiceType: string;
}) => {
  const customerData = useCustomers();
  const productData = useProducts();
  const [formData, setFormData] = React.useState<BillingFormData>(
    defaultFormData(invoiceType, data)
  );
  const [errors, setErrors] = React.useState<FormErrors>({});

  console.log("formData===========", formData, data);
  

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

  const onSubmit = React.useCallback(() => {
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

    if (!formData.customer_name || !formData?.customer_id) {
      formErrors.customer_id = "Customer name is required";
    }
    if (!formData.invoice_items || formData.invoice_items.length === 0) {
      formErrors.invoice_items = "At least one item is required";
    }

    formData.invoice_items.forEach((item, index) => {
      if (!item.product_name || !item.product_id) {
        formErrors[`invoice_items[${index}].product_id`] =
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
      console.log("Form data:", formData);
      
      handleSubmit(formData);
    }
  }, [formData, handleSubmit]);

  const addItem = React.useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      invoice_items: [
        ...prev.invoice_items,
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
  }, []);

  const updateItemField = React.useCallback(
    (
      index: number,
      key: `${string}[${number}].${keyof InvoiceItem}`,
      value: string | number | Date | undefined,
      itemName: keyof InvoiceItem
    ) => {
      const prefix = "invoice_items";
      const itemProductId = generateFieldName(prefix, index, "product_id");
      const itemQuantity = generateFieldName(prefix, index, "quantity");
      const itemUnitPrice = generateFieldName(prefix, index, "unit_price");

      setFormData((prev) => {
        const updatedItems = [...prev.invoice_items];
        updatedItems[index] = {
          ...updatedItems[index],
          [itemName]: value,
        };
        if (key === itemProductId) {
          const selectedProduct = productOptions?.find(
            (product) => product?.value === value
          );
          updatedItems[index].product_name = selectedProduct?.label || "";
          // updatedItems[index].product_id = value as string;
        }
        if (key === itemQuantity || key === itemUnitPrice) {
          if (
            updatedItems[index]?.quantity &&
            updatedItems[index]?.unit_price
          ) {
            updatedItems[index].total_price =
              updatedItems[index]?.quantity * updatedItems[index]?.unit_price;
          }
        }
        return { ...prev, invoice_items: updatedItems };
      });
    },
    [productOptions]
  );

  const removeItem = React.useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      invoice_items: prev.invoice_items.filter((_, i) => i !== index),
    }));
  }, []);

  const calculateTotalBill = React.useCallback(() => {
    if (formData?.invoice_items) {
      return formData?.invoice_items.reduce(
        (total, item) => total + (item.total_price || 0),
        0
      );
    }
  }, [formData.invoice_items]);

  const updateFormField = React.useCallback(
    (
      key: keyof BillingFormData,
      value: string | number | Date | undefined | boolean
    ) => {
      if (key === "customer_id") {
        const selectedCustomer: Customer | null =
          customerData?.data?.find(
            (customer) => customer?.customer_id == value
          ) || null;

        if (selectedCustomer) {
          setFormData((prev) => {
            return {
              ...prev,
              [key]: value,
              customer_name: selectedCustomer?.name || "",
              customer_address: selectedCustomer?.address || "",
              gstin: selectedCustomer?.gstin || "",
              customer_email: selectedCustomer?.email || "",
              customer_phone: selectedCustomer?.phone || "",
            };
          });
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          [key]: value,
        }));
      }
    },
    [customerData?.data]
  );

  const fields: FormField[] = React.useMemo(
    () => [
      {
        name: "invoice_number",
        label: "Invoice Number",
        type: "input",
        value: formData.invoice_number,
        inputType: "number",
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
      {
        name: "state",
        label: "State",
        type: "dropdown",
        value: formData.state,
        options: indianStateOptions,
      },
      {
        name: "e_way_bill_num",
        label: "E Way Bill Number",
        type: "input",
        value: formData.e_way_bill_num,
      },
      {
        name: "po_num",
        label: "PO Number",
        type: "input",
        value: formData.po_num,
        inputType: "number",
      },
      {
        name: "po_date",
        label: "PO Date",
        type: "date",
        value: formData.po_date,
        
      },
      {
        name: "dc_date",
        label: "DC Date",
        type: "date",
        value: formData.dc_date,
      },
      {
        name: "dc_num",
        label: "DC Number",
        type: "input",
        value: formData.dc_num,
        inputType:"number",
      },
      {
        name: "igst",
        label: "IGST",
        type: "input",
        inputType:"number",
        value: formData.igst,
      },
      {
        name: "cgst",
        label: "CGST",
        type: "input",
        inputType:"number",
        value: formData.cgst,

      },
      {
        name: "sgst",
        label: "DC Number",
        type: "input",
        value: formData.sgst,
        inputType:"number",
      },
      {
        name: "grand_total",
        label: "Grand Total",
        type: "input",
        value: formData.grand_total,
        inputType:"number",
      },
    ],
    [customerOptions, formData.cgst, formData.customer_address, formData.customer_email, formData.customer_name, formData.customer_phone, formData.dc_date, formData.dc_num, formData.due_date, formData.e_way_bill_num, formData.grand_total, formData.gstin, formData.igst, formData.invoice_date, formData.invoice_number, formData.payment_status, formData.po_date, formData.po_num, formData.sgst, formData.state, formData.tax_amount]
  );

  const tableFields = React.useCallback(
    (item: InvoiceItem, index: number): ItemField[] => {
      const prefix = "invoice_items";

      return [
        {
          name: generateFieldName(prefix, index, "product_id"),
          label: "Product",
          type: "dropdown",
          value: item.product_id,
          options: productOptions,
          itemName: "product_id",
        },
        {
          name: generateFieldName(prefix, index, "quantity"),
          label: "Quantity",
          type: "input",
          value: item.quantity,
          inputType: "number",
          itemName: "quantity",
        },
        {
          name: generateFieldName(prefix, index, "hsn"),
          label: "HSN Code",
          type: "input",
          value: item.hsn,
          inputType: "number",
          itemName: "hsn",
        },
        {
          name: generateFieldName(prefix, index, "bags"),
          label: "Bags",
          type: "input",
          value: item.bags,
          inputType: "number",
          itemName: "bags",
        },
        {
          name: generateFieldName(prefix, index, "unit_price"),
          label: "Unit Price",
          type: "input",
          value: item.unit_price,
          inputType: "number",
          itemName: "unit_price",
        },
        {
          name: generateFieldName(prefix, index, "total_price"),
          label: "Total Price",
          type: "input",
          value: item.total_price,
          disabled: true,
          itemName: "total_price",
        },
      ];
    },
    [productOptions]
  );

  const renderFormField = React.useCallback(
    (
      field: FormField | ItemField,
      idx: number,
      renderType?: string,
      itemName?: keyof InvoiceItem
    ) => {
      const { name, label, type, value, options, inputType, disabled } = field;

      return (
        <div key={idx + label} className="flex flex-col gap-2 w-full">
          {renderType === "form" && (
            <div className="font-semibold">{label}</div>
          )}
          <div className="w-full">
            {type === "input" && (
              <Input
                type={inputType || "text"}
                placeholder={label}
                value={value as string}
                disabled={disabled}
                onChange={(e) => {
                  const value =
                    inputType === "number"
                      ? Number(e.target.value)
                      : e.target.value;

                  if (renderType === "item") {
                    updateItemField(
                      idx,
                      name as `${string}[${number}].${keyof InvoiceItem}`,
                      value,
                      itemName!
                    );
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
                  onChange: (value) => {
                    if (renderType === "item") {
                      updateItemField(
                        idx,
                        name as `${string}[${number}].${keyof InvoiceItem}`,
                        value,
                        itemName!
                      );
                    } else if (renderType === "form") {
                      updateFormField(name as keyof BillingFormData, value);
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
                    updateItemField(
                      idx,
                      name as `${string}[${number}].${keyof InvoiceItem}`,
                      value,
                      itemName!
                    );
                  } else if (renderType === "form") {
                    updateFormField(name as keyof BillingFormData, value);
                  }
                }}
              />
            )}
          </div>

          <div className="text-sm text-destructive">{errors[name]}</div>
        </div>
      );
    },
    [errors, updateFormField, updateItemField]
  );

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto ">
      <AppFormHeader headerText={headerText} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
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
                  <TableCell>HSN</TableCell>
                  <TableCell>Bags</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData?.invoice_items.map((item, index) => (
                  <TableRow key={index}>
                    {tableFields(item, index).map((field, idx) => {
                      return (
                        <TableCell key={idx}>
                          {renderFormField(
                            field,
                            index,
                            "item",
                            field?.itemName
                          )}
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
              onClick={() =>
                setFormData(defaultFormData(invoiceType, undefined))
              }
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
