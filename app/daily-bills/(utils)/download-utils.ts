import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function numberToWords(amount: number) {
  const belowTwenty = [
      "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", 
      "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", 
      "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];
  const tens = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
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
              words = convertChunk(chunk) + (thousands[chunkCount] ? " " + thousands[chunkCount] : "") + " " + words;
          }

          num = Math.floor(num / 1000);
          chunkCount++;
      }

      return words.trim();
  }

  const [integerPart, decimalPart] = amount.toFixed(2).split(".");

  let words = convertToWords(parseInt(integerPart));
  if (decimalPart && parseInt(decimalPart) > 0) {
      words += ` and ${convertToWords(parseInt(decimalPart))} Cents`;
  }

  return words + " Only";
}

export const generateInvoicePDF = () => {
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

  doc.rect(10, 10, 95, 110);
  renderContent(
    "Exporter:",
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

  renderContent("GSTIN:", "29BDJPM3718A1ZO", 12, 40, 33, 40);
  renderContent("State Name:", "Karnataka", 12, 45, 40, 45);
  renderContent("Contact:", "08026756931, +91-9844036779", 12, 50, 33, 50);
  renderContent("Email:", "mahalaxmisteelsuppliers@gmail.com", 12, 55, 33, 55);

  renderContent("Exporter:", "Mahalaxmi Steel Suppliers", 12, 65, 33, 65);

  doc.text(addressLines, 12, 70);

  renderContent("GSTIN:", "29BDJPM3718A1ZO", 12, 90, 33, 90);
  renderContent("State Name:", "Karnataka", 12, 95, 40, 95);
  renderContent("Contact:", "08026756931, +91-9844036779", 12, 100, 33, 100);
  renderContent(
    "Email:",
    "mahalaxmisteelsuppliers@gmail.com",
    12,
    105,
    33,
    105
  );

  doc.rect(105, 10, 95, 110);
  renderContent("Invoice Number:", "1234", 107, 15, 170, 15);
  renderContent("Eway Bill Number:", "213849899", 107, 20, 170, 20);
  renderContent("Reference Number & Date:", "213849899", 107, 25, 170, 25);
  renderContent("Buyer Order Number:", "213849899", 107, 30, 170, 30);
  renderContent("Dispatch Doc Number:", "213849899", 107, 35, 170, 35);

  doc.rect(10, 120, 190, 72);

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

  autoTable(doc, {
    startY: 125,
    theme: "plain",

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

  doc.rect(10, 192, 95, 95);
  renderContent(
    "Total Amount in Words:",
    numberToWords(728337),
    12,
    200,
    60,
    200
  );

  doc.setFont("helvetica", "bold");
  doc.text("Terms and Conditions:", 12, 210);
  doc.setFont("helvetica", "normal");

  const t1trimmedValue = doc.splitTextToSize(
    "Interest at 18% per annum will be charged on all invoices not paid within due date",
    90
  );
  doc.text(t1trimmedValue, 12, 215);

  // Footer Note
  const trimmedValue = doc.splitTextToSize(
    "Certified that the above-mentioned details are true and correct.",
    90
  );
  doc.text(trimmedValue, 12, 260);
  doc.text("Receiver's Signature", 12, 270);

  doc.rect(105, 192, 95, 95);

  doc.rect(105, 192, 95, 10);
  doc.rect(150, 192, 0, 10);
  doc.rect(150, 200, 0, 10);
  renderContent("Total:", "1234", 107, 200, 170, 200);
  doc.rect(105, 210, 95, 10);
  doc.rect(150, 210, 0, 10);


  renderContent("CGST @9%", "213849899", 107, 208, 155, 208);
  doc.rect(105, 220, 95, 10);
  doc.rect(150, 220, 0, 10);
  renderContent("SGST @9%", "213849899", 107, 218, 155, 218);
  doc.rect(105, 230, 95, 10);
  doc.rect(150, 230, 0, 10);
  renderContent("IGST", "213849899", 107, 228, 155, 228);
  renderContent("Grand Total", "213849899", 107, 238, 155, 238);
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

  return doc.output("datauristring");
};
