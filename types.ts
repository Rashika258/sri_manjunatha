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
  


  export type { InvoiceItem, Company, PaymentStatus, FormData , DailyBill};