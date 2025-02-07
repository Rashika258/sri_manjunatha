import { BillingFormData } from "@/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function numberToWords(amount: number) {
  const belowTwenty = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Million", "Billion"];

  function convertChunk(num: number) {
    let words = "";

    if (num >= 100) {
      words += belowTwenty[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }

    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }

    if (num > 0) {
      words += belowTwenty[num] + " ";
    }

    return words.trim();
  }

  function convertToWords(num: number) {
    if (num === 0) return "Zero";

    let words = "";
    let chunkCount = 0;

    while (num > 0) {
      const chunk = num % 1000;

      if (chunk > 0) {
        words =
          convertChunk(chunk) +
          (thousands[chunkCount] ? " " + thousands[chunkCount] : "") +
          " " +
          words;
      }

      num = Math.floor(num / 1000);
      chunkCount++;
    }

    return words.trim();
  }

  const [integerPart, decimalPart] = amount?.toFixed(2).split(".");

  let words = convertToWords(parseInt(integerPart));
  if (decimalPart && parseInt(decimalPart) > 0) {
    words += ` and ${convertToWords(parseInt(decimalPart))} Cents`;
  }

  return words + " Only";
}

export const generateInvoicePDF = (invoiceData: BillingFormData) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
  });

  // Width: 210 mm
  // Height: 297 mm
  doc.setFontSize(12);
  doc.setFont("helvetica");

  const renderContent = (
    title: string,
    value: string,
    titleX: number,
    titleY: number,
    valueX: number,
    valueY: number
  ) => {
    doc.setFont("helvetica", "bold");
    doc.text(title, titleX, titleY);
    doc.setFont("helvetica", "normal");
    const trimmedValue = doc.splitTextToSize(value, 70);
    doc.text(trimmedValue, valueX, valueY);
  };

  const renderHeader = () => {
    doc.rect(10, 10, 95, 110);
    renderContent(
      "Supplier:",
      "Sri Manjunatha Engineering Works",
      12,
      15,
      33,
      15
    );

    const address =
      "#11/1, 1st cross, 2nd main, Ramchandrapuram, Bangalore - 560021";
    const addressLines = doc.splitTextToSize(address, 70);
    doc.text(addressLines, 12, 20);

    renderContent("GSTIN:", process.env.REACT_APP_GSTIN!, 12, 40, 33, 40);
    renderContent("State Name:", "Karnataka", 12, 45, 40, 45);
    renderContent("Contact:", process.env.REACT_APP_CONTACT!, 12, 50, 33, 50);
    renderContent(
      "Email:",
      "sri.manjunatha.eng.333@gmail.com",
      12,
      55,
      33,
      55
    );
    renderContent("Purchaser:", invoiceData?.customer_name || "", 12, 65, 33, 65);


    doc.text(invoiceData?.customer_address || "", 12, 70);

    renderContent("GSTIN:", invoiceData?.gstin || "", 12, 90, 33, 90);
    renderContent("State Name:", "Karnataka", 12, 95, 40, 95);
    renderContent("Contact:", invoiceData?.customer_phone || "", 12, 100, 33, 100);
    renderContent(
      "Email:",
      invoiceData?.customer_email || "",
      12,
      105,
      33,
      105
    );

    doc.rect(105, 10, 95, 110);
    doc.rect(105, 10, 95, 10);
    doc.rect(155, 10, 0, 10);
    renderContent("Invoice Number:", invoiceData?.invoice_number || "", 107, 18, 170, 18);
    doc.rect(105, 20, 95, 10);
    doc.rect(155, 20, 0, 10);

    renderContent("Eway Bill Number:", invoiceData?.e_way_bill_num || "", 107, 28, 170, 28);
    doc.rect(105, 30, 95, 10);
    doc.rect(155, 30, 0, 10);

    renderContent("Invoice Number:", invoiceData?.invoice_number || "", 107, 38, 170, 38);
    doc.rect(105, 40, 95, 10);
    doc.rect(155, 40, 0, 10);

    renderContent("D.C Number & Date:",`${invoiceData?.dc_num} ${invoiceData?.dc_date ?new Date(invoiceData?.dc_date).toISOString() :""}` , 107, 48, 170, 48);
    doc.rect(105, 50, 95, 10);
    doc.rect(155, 50, 0, 10);

    renderContent("Party's Order Number:", invoiceData?.po_num || "", 107, 58, 170, 58);
    doc.rect(105, 60, 95, 10);
    doc.rect(155, 60, 0, 10);

    renderContent("Party's Order Date:", invoiceData?.po_date ?new Date(invoiceData?.po_date).toISOString() :"", 107, 68, 170, 68);
    doc.rect(105, 70, 95, 10);
    doc.rect(155, 70, 0, 10);

    renderContent("Code:", "29", 107, 78, 170, 78);

    doc.setFont("helvetica", "bold");
    doc.text("Bank Details", 107, 88);
    doc.setFont("helvetica", "normal");
    doc.text("State Bank of India", 107, 93);
    doc.text("John Doe", 107, 98);
    doc.text("78378972989498", 107, 103);
    doc.text("Ifsc code", 107, 108);
    doc.text("Branch Address", 107, 113);
  };

  const renderFooter = () => {
    doc.rect(10, 188, 95, 99);

    doc.rect(10, 188, 95, 44);
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount in Words:", 12, 200);
    doc.setFont("helvetica", "italic");
    const t67trimmedValue = doc.splitTextToSize(numberToWords(invoiceData?.total_amount), 90);
    doc.text(t67trimmedValue, 12, 205);

    doc.rect(10, 232, 95, 20);

    doc.setFont("helvetica", "bold");
    doc.text("Terms and Conditions:", 12, 238);
    doc.setFont("helvetica", "normal");

    const t1trimmedValue = doc.splitTextToSize(
      "Interest at 18% per annum will be charged on all invoices not paid within due date",
      90
    );
    doc.text(t1trimmedValue, 12, 243);

    // Footer Note
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    const trimmedValue = doc.splitTextToSize(
      "Certified that the above-mentioned details are true and correct.",
      90
    );
    doc.text(trimmedValue, 12, 258);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Receiver's Signature", 12, 268);

    doc.rect(105, 188, 95, 99);

    doc.rect(105, 188, 95, 10);
    doc.rect(150, 188, 0, 14);
    doc.rect(150, 200, 0, 10);
    renderContent("Total:", String(invoiceData?.total_amount), 107, 196, 155, 196);
    doc.rect(105, 210, 95, 10);
    doc.rect(150, 210, 0, 10);

    renderContent("CGST @9%", invoiceData?.cgst ? String(invoiceData?.cgst) : "", 107, 208, 155, 208);
    doc.rect(105, 220, 95, 10);
    doc.rect(150, 220, 0, 10);
    renderContent("SGST @9%", invoiceData?.sgst ? String(invoiceData?.sgst) : "", 107, 218, 155, 218);
    doc.rect(105, 230, 95, 10);
    doc.rect(150, 230, 0, 10);
    renderContent("IGST", invoiceData?.igst ? String(invoiceData?.igst) : "", 107, 228, 155, 228);
    renderContent("Grand Total", invoiceData?.grand_total ? String(invoiceData?.grand_total) : "", 107, 238, 155, 238);
    doc.setFont("helvetica", "bold");
    doc.text("For Sri Manjunatha Engineering Works", 107, 245);

    doc.setFont("helvetica", "normal");
    doc.text("Authorised Signatory", 107, 270);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    const trimmedValue12 = doc.splitTextToSize(
      "We undertake all type of precision job work and turning components",
      90
    );
    doc.text(trimmedValue12, 107, 275);
  };

  doc.rect(10, 120, 190, 68);

  autoTable(doc, {
    startY: 120,
    theme: "grid",
    margin:{
      top:120, bottom:105,left:10, right: 10
    },
  
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.2,
      lineColor: [0, 0, 0],
    },
    bodyStyles: {
      lineWidth: 0.2,
      lineColor: [0, 0, 0],
    },

    head: [["SI No", "Description", "HSN/SAC", "Quantity", "Rate", "Amount"]],
    body:invoiceData?.invoice_items && invoiceData?.invoice_items?.length
    ? invoiceData.invoice_items.map((item, idx) => [
        idx + 1, 
        item.product_name || "",
        item.hsn || "",
        item.quantity ?? 0,
        item.unit_price ?? 0,
        item.total_price ?? 0,
      ])
    : [],
    didDrawPage: () => {
      renderHeader();
      renderFooter();
    },
  });

  return doc
};
