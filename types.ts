import { SubmitHandler } from "react-hook-form";

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
  due_date?: Date;
  total_amount: number;
  is_gst_bill: boolean;
  tax_amount: number;
  payment_status: "Pending" | "Paid" | "Overdue";
  invoice_items: InvoiceItem[];
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
  headerText: string
}
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
}

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
}

export type {
  InvoiceItem,
  Company,
  PaymentStatus,
  FormData,
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
  EmployeeFormProps
};
