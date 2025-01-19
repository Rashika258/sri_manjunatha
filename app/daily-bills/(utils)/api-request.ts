import {  BillingFormData, ApiQueryParams } from "@/types";  
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const addBill = async (bill: BillingFormData): Promise<void> => {
  const response = await fetch("/api/daily-bills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bill),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add bill");
  }

  return response.json();
};

const getBills = async (params?: ApiQueryParams | undefined): Promise<BillingFormData[]> => {
  try {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const url = `/api/daily-bills${query ? `?${query}` : ""}`;
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Failed to fetch bills: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching bills:", error);
    throw error;
  }
};

const updateBill = async (billId: string, billData: BillingFormData) => {
  try {
    const response = await fetch(`/api/daily-bills/${billId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update bill: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating bill:", error);
    throw error;
  }
};

const deleteBill = async (billId: string) => {
  try {
    const response = await fetch(`/api/daily-bills/${billId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete bill: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting bill:", error);
    throw error;
  }
};

const fetchBillData = async (id: string): Promise<BillingFormData> => {
  try {
    const response = await fetch(`/api/daily-bills/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to fetch data. Status: ${response.status}, Message: ${errorDetails.message || "Unknown error"}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchBillData:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};


const generateInvoicePDF = () => {
  const doc = new jsPDF();

  // Exporter Details
  doc.setFontSize(12);
  doc.text("Exporter:", 10, 10);
  doc.text("Mahalaxmi Steel Suppliers", 30, 10);
  doc.text(
    "#S-5, Sunder Industrial Estate, New TimberYard Layout, Mysore Road, Bangalore-560026",
    10,
    15
  );
  doc.text("GSTIN/UIN: 29BDJPM3718A1ZO", 10, 20);
  doc.text("State Name: Karnataka, Code: 29", 10, 25);
  doc.text("Contact: 08026756931, +91-9844036779", 10, 30);
  doc.text("Email: mahalaxmisteelsuppliers@gmail.com", 10, 35);

  // Invoice Details
  doc.setFontSize(12);
  doc.text("Invoice Details:", 140, 10);
  doc.text("Invoice Number: 1234", 140, 15);
  doc.text("Eway Bill Number: 213849899", 140, 20);
  doc.text("Reference Number & Date: 213849899", 140, 25);
  doc.text("Buyer Order Number: 213849899", 140, 30);
  doc.text("Dispatch Doc Number: 213849899", 140, 35);

  // Item Table Data
  const itemData = [
    {
      siNo: 1,
      description: "Product A",
      hsnSac: "1234",
      quantity: 2,
      rate: 100,
      amount: 200,
    },
    {
      siNo: 2,
      description: "Product B",
      hsnSac: "5678",
      quantity: 1,
      rate: 150,
      amount: 150,
    },
  ];

  // Generate the Table
  autoTable(doc, {
    startY: 40,
    head: [["SI No", "Description", "HSN/SAC", "Quantity", "Rate", "Amount"]],
    body: itemData.map((item) => [
      item.siNo,
      item.description,
      item.hsnSac,
      item.quantity,
      item.rate,
      item.amount,
    ]),
  });

  // Footer
  const totalAmount = itemData.reduce((sum, item) => sum + item.amount, 0);
  doc.text("Total Amount in Words: Two Hundred and Fifty", 10, doc.lastAutoTable.finalY + 10);
  doc.text(`Total: ${totalAmount}`, 10, doc.lastAutoTable.finalY + 20);

  // Terms and Conditions
  const terms = [
    "We are not responsible for breakage, damage, fines.",
    "Interest will be charged at the rate of 24% per annum for unpaid invoices.",
    "Goods once sold cannot be returned or exchanged.",
    "Our weight is final.",
    "Payment by A/c payee cheque, RTGS, or LC only.",
  ];
  doc.text("Terms and Conditions:", 10, doc.lastAutoTable.finalY + 30);
  terms.forEach((term, index) => {
    doc.text(`${index + 1}. ${term}`, 10, doc.lastAutoTable.finalY + 35 + index * 5);
  });

  // Footer Note
  doc.text(
    "Certified that the above-mentioned details are true and correct.",
    10,
    doc.lastAutoTable.finalY + 60
  );
  doc.text("Authorized Signatory", 10, doc.lastAutoTable.finalY + 70);

  // const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
  // return pdfBuffer

  return doc.output("datauristring");

};


const fetchBillDataAsInvoice =  async (id: string) => {
  try {
    const response = await fetch(`/api/daily-bills/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("response", response);

    

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to fetch data. Status: ${response.status}, Message: ${errorDetails.message || "Unknown error"}`
      );
    }

  //  const doc = generateInvoicePDF();
  //   return new NextResponse(doc, { headers: { 
  //     "Content-Type": "application/pdf" ,
  //     "Content-Disposition":"inline; filename=invoice.pdf"
  //   } });

    const pdfBase64 = generateInvoicePDF();
    return pdfBase64;


  } catch (error) {
    console.error("Error in fetchBillData:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};


const useBills = (
  params: ApiQueryParams | undefined,
  options?: UseQueryOptions<BillingFormData[], Error>
) => {
  return useQuery<BillingFormData[], Error>({
    queryKey: ["bills", params],
    queryFn: () => getBills(params),
    ...options,
  });
};

export {
  addBill,
  getBills,
  updateBill,
  deleteBill,
  useBills,
  fetchBillData,
  fetchBillDataAsInvoice
};
