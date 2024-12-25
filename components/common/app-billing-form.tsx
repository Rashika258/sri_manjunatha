"use client";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  Button,
  Input,
} from "@/components/ui/index";
import { format } from "date-fns";
import {
  AppDropdownOption,
  FormData,
  InvoiceItem,
} from "@/types";
import {
  AppDropdown,
  AppDateInput,
  AppFormHeader,
} from "@/components/common/index";
import { useCustomers } from "@/app/customers/(utils)/api-request";
import { useProducts } from "@/app/products/(utils)/api-request";


const paymentStatusOptions: AppDropdownOption[] = [
  { value: "1", label: "Paid" },
  { value: "2", label: "Overdue" },
  { value: "3", label: "Pending" },
];

const FormSchema = z.object({
  invoice_number: z
    .string({
      required_error: "Please enter the bill number to display.",
    })
    .min(1, { message: "Bill number is required." }),
  customer_address: z.string(),
  customer_email: z.string(),
  customer_phone: z.string(),
  is_gst_bill: z.boolean(),
  due_date: z.date(),
  customer_id: z
    .number({
      required_error: "Please enter the bill number to display.",
    })
    .min(1, { message: "Bill number is required." }),
  invoice_date: z.date({
    required_error: "Please enter the bill number to display.",
  }),

  gstin: z
    .string({
      required_error: "Please enter the GST Number to display.",
    })
    .min(1, { message: "GST Number is required." }),

  customer_name: z.string({
    required_error: "Please select a company name to display.",
  }),
  tax_amount: z.number(),
  total_amount: z.number(),
  payment_status: z.string({
    required_error: "Please select a payment status to display.",
  }),

  invoice_items: z
    .array(
      z.object({
        product_id: z.string().min(1, { message: "Product ID is required." }),
        product_name: z.string().min(1, { message: "Item name is required." }),
        quantity: z
          .number()
          .min(1, { message: "Quantity must be greater than 0." }),
        bags: z
          .number()
          .min(0, { message: "Bags must be greater than or equal to 0." }),
        unit_price: z
          .number()
          .min(1, { message: "Price must be greater than 0." }),
        total_price: z
          .number()
          .min(0, { message: "Total must be greater than or equal to 0." }),
      })
    )
    .min(1, { message: "At least one item is required." }),
});

const AppBillingForm = ({ headerText }: { headerText: string }) => {
  const customerData = useCustomers();
  const productData = useProducts();

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

  console.log("aa====", customerOptions, productOptions);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
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
          quantity: 0,
          bags: 0,
          unit_price: 0,
          total_price: 0,
        },
      ],
    },
  });

  const { register, control, handleSubmit, watch, formState } = form;
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "invoice_items",
  });

  const watchItems = watch("invoice_items");

  const calculateTotalBill = () =>
    watchItems.reduce((acc, item) => acc + Number(item.total_price || 0), 0);

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: number | string
  ) => {
    const item = { ...fields[index], [field]: value };
    if (field === "quantity" || field === "bags" || field === "unit_price") {
      item.total_price = item.quantity * item.unit_price;
    }
    update(index, item);
  };

  const onSubmit: SubmitHandler<FormData> = () => {
    alert("Bill submitted successfully!");
  };

  const fetchReferenceData = React.useCallback(async () => {}, []);

  React.useEffect(() => {
    fetchReferenceData();
  }, []);

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto ">
      <AppFormHeader headerText={headerText} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col grow justify-between space-y-4 ">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="invoice_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Bill Number" {...field} />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.invoice_number?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gstin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="GST Number"
                        {...field}
                     
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.gstin?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Status</FormLabel>
                    <FormControl>
                      <AppDropdown
                        isLoading={false}
                        options={paymentStatusOptions}
                        field={{
                          value: field.value,
                          onChange: field.onChange,
                        }}
                        placeholder="Select a payment status"
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.payment_status?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <FormControl>
                      <AppDropdown
                        isLoading={customerData.isLoading}
                        options={customerOptions!}
                        field={{
                          value: field.value,
                          onChange: field.onChange,
                        }}
                        placeholder="Select a company"
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.customer_name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="invoice_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Invoice Date</FormLabel>
                    <AppDateInput
                      field={field}
                      formatValue={(value) =>
                        value ? format(value, "PPP") : ""
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Due Date</FormLabel>
                    <AppDateInput
                      field={field}
                      formatValue={(value) =>
                        value ? format(value, "PPP") : ""
                      }
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customer_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Customer Address"
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customer_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Customer Phone"
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customer_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Customer Email"
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between ">
              <h3 className="font-bold text-lg">Invoice Items</h3>
              <Button
                onClick={() =>
                  append({
                    product_id: "",
                    product_name: "",
                    quantity: 0,
                    bags: 0,
                    unit_price: 0,
                    total_price: 0,
                  })
                }
                size={"icon"}
              >
                <PlusIcon />
              </Button>
            </div>
            <div className="overflow-auto w-full rounded-md border max-h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow className="w-full flex">
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Bags</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`invoice_items.${index}.product_name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <AppDropdown
                                  isLoading={productData.isLoading}
                                  options={productOptions!}
                                  field={{
                                    value: field.value,
                                    onChange: field.onChange,
                                  }}
                                  placeholder="Select a product"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          {...register(`invoice_items.${index}.quantity`)}
                          defaultValue={field.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          {...register(`invoice_items.${index}.bags`)}
                          defaultValue={field.bags}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "bags",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          {...register(`invoice_items.${index}.unit_price`)}
                          defaultValue={field.unit_price}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "unit_price",
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          disabled
                          {...register(`invoice_items.${index}.total_price`)}
                          value={field.total_price || 0}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
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
                onClick={() =>
                  form.reset({
                    invoice_number: Date.now().toString(),
                    customer_id: Math.random(),
                    gstin: "",
                    customer_name: "",
                    customer_email: "",
                    customer_phone: "",
                    is_gst_bill: false,
                    payment_status: "Pending",
                    tax_amount: 0,
                    total_amount: 0,
                    invoice_date: new Date(),
                    invoice_items: [],
                  })
                }
              >
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AppBillingForm;
