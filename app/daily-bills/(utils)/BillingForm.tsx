/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { SheetFooter } from "@/components/ui/sheet";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { AppDatePicker } from "@/components/common/app-datepicker";

type InvoiceItem = {
  product_id: string;
  product_name: string;
  quantity: number;
  hsn?: number;
  bags: number;
  unit_price: number;
  total_price: number;
};

type Company = {
  gstin: string;
  name: string;
  address: string;
};

type PaymentStatus = {
  payment_status: "Pending" | "Paid" | "Overdue";
  id: string;
};

type FormData = {
  invoice_number: string;
  gstin: string;
  customer_name: string;
  customer_id: number;
  customer_address: string;
  customer_email: string;
  customer_phone: string;
  invoice_date: Date;
  total_amount: number;
  is_gst_bill: boolean;
  tax_amount: number;
  payment_status: "Pending" | "Paid" | "Overdue";
  invoice_items: InvoiceItem[];
};

const itemsList = [
  { id: 1, name: "Item A", price: 100 },
  { id: 2, name: "Item B", price: 200 },
  { id: 3, name: "Item C", price: 300 },
];

const companies: Company[] = [
  { gstin: "1234567890A", name: "Company A", address: "123 Street, City A" },
  { gstin: "0987654321B", name: "Company B", address: "456 Avenue, City B" },
];

const paymentStatusOptions: PaymentStatus[] = [
  { id: "1234567890A", payment_status: "Paid" },
  { id: "0987654321B", payment_status: "Overdue" },
  { id: "0987654321B", payment_status: "Pending" },
];

const BillingForm = () => {
  const router = useRouter();

  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);

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
          product_id: z.number().min(1, { message: "Product ID is required." }),
          product_name: z
            .string()
            .min(1, { message: "Item name is required." }),

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

  const { register, control, handleSubmit, setValue, watch, formState } =
    useForm<FormData>({
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
        payment_status: "Pending",
        tax_amount: 0,
        total_amount: 0,
        invoice_date: new Date(),
        invoice_items: [],
      },
    });

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
      item.total_price = item.quantity * item.unit_price; // Update total whenever any of these fields change
    }
    update(index, item);
  };

  const handleGstinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gstin = e.target.value;
    const company = companies.find((c) => c.gstin === gstin);
    setCompanyDetails(company || null);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert("Bill submitted successfully!");
    console.log(data);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className="flex flex-col grow w-full overflow-hidden ">
      <div className="flex justify-between items-center pb-4">
        <h3 className="text-2xl text-foreground">Monthly Bills</h3>
        <Button onClick={() => router.back()} variant="link">
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Go back
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col grow justify-between space-y-4 mb-16">
            <div className="grid grid-cols-2 gap-4">
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
                        onChange={handleGstinChange}
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.gstin?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
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

            <FormField
              control={form.control}
              name="invoice_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Date</FormLabel>
                  <FormControl>
                    <AppDatePicker />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.invoice_date?.message}
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((company) => (
                          <SelectItem key={company.gstin} value={company.gstin}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    {formState.errors.customer_name?.message}
                  </FormMessage>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentStatusOptions.map((payment_status) => (
                          <SelectItem
                            key={payment_status.id}
                            value={payment_status.payment_status}
                          >
                            {payment_status.payment_status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>
                    {formState.errors.payment_status?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a product" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {itemsList.map((item) => (
                                      <SelectItem
                                        key={item.id}
                                        value={item.name}
                                      >
                                        {item.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
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
          <SheetFooter className="px-4 py-4 flex items-center justify-between space-x-4">
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
          </SheetFooter>
        </form>
      </Form>
    </div>
  );
};

export default BillingForm;
