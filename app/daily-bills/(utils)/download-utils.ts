import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
  });

  // Width: 210 mm
  // 10 + 10
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

  //   190/2 = 95

  // Top content
  // 1st half
  //   297-110-10-10
  doc.rect(10, 10, 95, 110);

  // Exporter Details
  renderContent("Exporter:", "Mahalaxmi Steel Suppliers", 12, 15, 33, 15);

  const address =
    "#S-5, Sunder Industrial Estate, New TimberYard Layout, Mysore Road, Bangalore-560026";
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

  // Invoice Details

  //   2nd half
  doc.rect(105, 10, 95, 110);
  renderContent("Invoice Number:", "1234", 107, 15, 170, 15);
  renderContent("Eway Bill Number:", "213849899", 107, 20, 170, 20);
  renderContent("Reference Number & Date:", "213849899", 107, 25, 170, 25);
  renderContent("Buyer Order Number:", "213849899", 107, 30, 170, 30);
  renderContent("Dispatch Doc Number:", "213849899", 107, 35, 170, 35);

  //   297-110-10-10-87
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

  // Generate the Table
  autoTable(doc, {
    startY: 125,

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

  // bottom content
  //   1st half

  //   297-110-10-10-72
  doc.rect(10, 192, 95, 95);
  const totalAmount = itemData.reduce((sum, item) => sum + item.amount, 0);
  doc.text(
    "Total Amount in Words: Two Hundred and Fifty",
    10,
    doc.lastAutoTable.finalY + 10
  );
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

  //   2nd half
  doc.rect(105, 192, 95, 95);
  terms.forEach((term, index) => {
    doc.text(
      `${index + 1}. ${term}`,
      10,
      doc.lastAutoTable.finalY + 35 + index * 5
    );
  });

  // Footer Note
  doc.text(
    "Certified that the above-mentioned details are true and correct.",
    10,
    doc.lastAutoTable.finalY + 60
  );
  doc.text("Authorized Signatory", 10, doc.lastAutoTable.finalY + 70);

  return doc.output("datauristring");
};
