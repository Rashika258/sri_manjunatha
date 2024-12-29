import { SubmitHandler } from "react-hook-form";

type InvoiceItem = {
  product_id: string | undefined;
  product_name: string | undefined;
  quantity: number | undefined;
  hsn: number | undefined;
  bags: number | undefined;
  unit_price: number | undefined;
  total_price: number | undefined;
};

type Company = {
  gstin: string;
  name: string;
  address: string;
};



type BillingFormData = {
  invoice_number: string | undefined;
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
  invoiceitem: InvoiceItem[];
};

type DailyBill = {
  id: number;
  bill_no: string;
  company_name: string;
  date: Date;
  items: InvoiceItem[];
  price: number;
  qty: number;
  total: number;
  payment_status: "PAID" | "UNPAID" | "INPROGRESS";
};

type ProductData = {
  name: string;
  hsn_code?: number;
  price: number;
  monthly_bill_percentage?: number;
  monthly_bill_price?: number;
  adinath_price?: number;
  stock_quantity?: number;
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

type GetCustomersParams = {
  search?: string;
  startDate?: string;
  endDate?: string;
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

type CustomerFormProps = {
  onSubmit: SubmitHandler<Customer>;
  isSubmitBtnLoading: boolean;
  data?: Customer;
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

type EmployeeFormProps = {
  onSubmit: SubmitHandler<Employee>;
  isSubmitBtnLoading: boolean;
  data?: Employee;
  headerText: string;
};

type Product = {
  product_id?: number;
  name: string;
  product_category_id: string;
  hsn_code?: number;
  price?: number;
  gst_rate?: number;
  stock_quantity?: number;
  adinath_price?: number;
  monthly_bill_price?: number;
  monthly_bill_percentage?: number;
  created_at?: Date;
};

type GetProductsParams = {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
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

type Bill = {
  id: string;
  amount: number;
  date: string;
  description: string;
  dueDate: string;
  status: "paid" | "unpaid" | "overdue";
  createdAt: string;
  updatedAt: string;
};

type GetBillsParams = {
  search?: string;  
  startDate?: string;  
  endDate?: string;   
};

type FormErrors = {[key in keyof BillingFormData]?: string;
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


export type {
  InvoiceItem,
  Company,
  AppDropdownOption,
  BillingFormData,
  DailyBill,
  ProductData,
  Customer,
  ActionItem,
  ProductCategory,
  Employee,
  Product,
  GetProductsParams,
  GetCustomersParams,
  CustomerFormProps,
  DeleteConfirmationPopupDetails,
  EmployeeFormProps,
  AppDropdownProps,
  Bill,
  GetBillsParams,
  FormErrors,
  FormField,
  ItemField
};
