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
  items: string;
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
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  gstin?: string;
  created_at?: Date;
};


type ActionItem= {
  label: string;
  icon: React.ReactNode; 
  handler: (value: string) => void;
  isEnabled: boolean;
  buttonVariant?: "destructive" | "default" | "secondary" | "ghost";
}

type ProductCategory ={
  name: string;
  description?: string;
  created_at?: Date;
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
  Employee
};
