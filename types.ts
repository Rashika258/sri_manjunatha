import { InvoiceType } from "@prisma/client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type InvoiceItem = {
  item_id?: number;
  product_id: string | undefined;
  product_name: string | undefined;
  quantity: number | undefined;
  hsn: number | undefined;
  bags: number | undefined;
  unit_price: number | undefined;
  total_price: number | undefined;
};

type BillingFormData = {
  invoice_number: string | undefined;
  invoice_id?: string | undefined;
  invoice_type:string | undefined;
  gstin: string | undefined;
  customer_name: string | undefined;
  customer_id: number | undefined;
  customer_address: string | undefined;
  customer_email: string | undefined;
  customer_phone: string | undefined;
  invoice_date: Date;
  due_date?: Date;
  total_amount: number;
  is_gst_bill: boolean;
  tax_amount?: number;
  payment_status: string | undefined;
  invoice_items: InvoiceItem[]; 
  state?: string | undefined;
  e_way_bill_num?: string | undefined;
  po_num?: string | undefined;
  dc_date?: Date | undefined;
  po_date?: Date | undefined;
  dc_num?: string | undefined;
  cgst?:number | undefined;
  sgst?:number | undefined;
  igst?:number | undefined;
  grand_total?: number | undefined;
};

type Customer = {
  customer_id?: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  gstin?: string;
  created_at?: Date;
};

type ActionItem = {
  label: string;
  icon: React.ReactNode;
  handler: (value: string) => void;
  isEnabled: boolean;
  buttonVariant?: "destructive" | "default" | "secondary" | "ghost";
};

type ProductCategory = {
  name: string;
  description?: string;
  created_at?: Date;
  category_id: string;
};

type FormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  isSubmitBtnLoading: boolean;
  data?: T;
  headerText: string;
};
type Employee = {
  employee_id?: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  designation?: string;
  date_of_joining?: Date;
  status?: "Active" | "Inactive";
  created_at?: Date;
};

type Product = {
  product_id?: number;
  name: string;
  product_category_id: string;
  product_category_name?: string;
  hsn_code?: number;
  price?: number;
  gst_rate?: number;
  stock_quantity?: number;
  adinath_price?: number;
  monthly_bill_price?: number;
  monthly_bill_percentage?: number;
  created_at?: Date;
};

type DeleteConfirmationPopupDetails = {
  openDeleteConfirmationPopup: boolean;
  isDeletingEmployee: boolean;
  rowId: string;
};

type AppDropdownOption = {
  value: string;
  label: string;
};

type AppDropdownProps = {
  options: AppDropdownOption[];
  field: {
    value: string;
    onChange: (value: string, label: string) => void;
  };
  placeholder: string;
  isLoading: boolean;
};

type ApiQueryParams = {
  start_date?: string | undefined;
  end_date?: string | undefined;
  invoice_type?: InvoiceType;
};

type FormErrors = {
  [key in keyof BillingFormData]?: string;
} & {
  [key: string]: string | undefined;
};

type FormField = {
  name: keyof BillingFormData;
  label: string;
  type: "input" | "dropdown" | "date";
  value: string | number | Date | undefined;
  options?: AppDropdownOption[];
  disabled?: boolean;
  inputType?: "number" | "text";
};

type ItemField = {
  name: `${string}[${number}].${keyof InvoiceItem}`;
  label: string;
  type: "input" | "dropdown" | "date";
  value: string | number | Date | undefined;
  options?: AppDropdownOption[];
  disabled?: boolean;
  inputType?: "number" | "text";
  itemName: keyof InvoiceItem;
};

type AllowedActions = 'EDIT' | 'DELETE' | 'SHARE' | 'DOWNLOAD';

type AllowedActionType = Partial<Record<AllowedActions, boolean>>


const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  product_category_id: z
    .string()
    .min(1, { message: "Please select a category" })
    .optional(),
  hsn_code: z
    .number()
    .min(1, { message: "HSN code must be a valid number" })
    .optional(),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  bags: z
    .number()
    .min(1, { message: "Bags must be a positive number" })
    .optional(),
  gst_rate: z
    .number()
    .min(0, { message: "GST rate cannot be negative" })
    .optional(),
  stock_quantity: z
    .number()
    .min(0, { message: "Stock quantity cannot be negative" })
    .optional(),
  adinath_price: z
    .number()
    .min(0, { message: "Adinath price must be a positive number" }),
  monthly_bill_price: z
    .number()
    .min(0, { message: "Monthly bill price must be a positive number" }),
  monthly_bill_percentage: z
    .number()
    .min(0, { message: "Monthly bill percentage cannot be negative" })
    .optional(),
  created_at: z.date().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const customerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .optional()
    .refine((val) => val === undefined || val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    }),
  address: z.string().optional(),
  gstin: z
    .string()
    .trim()
    .length(15, { message: "GSTIN must be exactly 15 characters" })
    .optional(),
  created_at: z.date().optional(),
});

type CustomerFormSchemaData = z.infer<typeof customerSchema>;


const employeeSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .optional()
    .refine((val) => val === undefined || val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    }),
  designation: z.string().optional(),
  date_of_joining: z.date().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export { productSchema, customerSchema, employeeSchema};

export type {
  InvoiceItem,
  AppDropdownOption,
  ProductFormData,
  BillingFormData,
  Customer,
  ActionItem,
  ProductCategory,
  Employee,
  Product,
  DeleteConfirmationPopupDetails,
  AppDropdownProps,
  ApiQueryParams,
  FormErrors,
  FormField,
  ItemField,
  FormProps,
  CustomerFormSchemaData,
  EmployeeFormData,
  AllowedActionType
};
