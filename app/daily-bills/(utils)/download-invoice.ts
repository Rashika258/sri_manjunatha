import { PDFDocument, StandardFonts } from 'pdf-lib';

const sampleData = {
  invoiceNumber: 'INV-1001',
  invoiceDate: '2024-12-31',
  supplierName: 'ABC Enterprises',
  supplierGSTIN: 'GSTIN-12345ABC',
  customerName: 'XYZ Pvt. Ltd.',
  customerGSTIN: 'GSTIN-67890XYZ',
  shippingAddress: '123 Street, City, State, 12345',
  billingAddress: '456 Avenue, City, State, 67890',
  placeOfSupply: 'State A',
  items: [
    {
      hsnCode: '1001',
      name: 'Product A',
      unitPrice: 100,
      quantity: 2,
      cgstRate: 9,
      sgstRate: 9,
      igstRate: 0,
    },
    {
      hsnCode: '1002',
      name: 'Product B',
      unitPrice: 200,
      quantity: 1,
      cgstRate: 9,
      sgstRate: 9,
      igstRate: 0,
    },
  ],
};
export const downloadInvoice = async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]); // Customize the size as needed
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
  let yPosition = height - 40;

  // Header Section (Supplier & Customer Details)
  page.drawText(`Invoice Number: ${sampleData.invoiceNumber}`, { x: 50, y: yPosition, size: 12, font });
  yPosition -= 20;
  page.drawText(`Invoice Date: ${sampleData.invoiceDate}`, { x: 50, y: yPosition, size: 12, font });
  yPosition -= 20;
  page.drawText(`Customer: ${sampleData.customerName}`, { x: 50, y: yPosition, size: 12, font });
  yPosition -= 20;
  page.drawText(`Customer GSTIN: ${sampleData.customerGSTIN}`, { x: 50, y: yPosition, size: 12, font });
  yPosition -= 40;

  // Shipping & Billing Address
  page.drawText(`Shipping Address: ${sampleData.shippingAddress}`, { x: 50, y: yPosition, size: 12, font });
  yPosition -= 20;
  page.drawText(`Billing Address: ${sampleData.billingAddress}`, { x: 50, y: yPosition, size: 12, font });
  yPosition -= 40;

  // Place of Supply
  page.drawText(`Place of Supply: ${sampleData.placeOfSupply}`, { x: 50, y: yPosition, size: 12, font });
  yPosition -= 20;

  // Table for Item Details
  page.drawText('HSN Code', { x: 50, y: yPosition, size: 12, font });
  page.drawText('Item Name', { x: 100, y: yPosition, size: 12, font });
  page.drawText('Unit Price', { x: 250, y: yPosition, size: 12, font });
  page.drawText('Quantity', { x: 350, y: yPosition, size: 12, font });
  page.drawText('CGST', { x: 450, y: yPosition, size: 12, font });
  page.drawText('SGST', { x: 500, y: yPosition, size: 12, font });
  page.drawText('IGST', { x: 550, y: yPosition, size: 12, font });
  yPosition -= 20;

  // Loop through items to add them to the invoice
  sampleData.items.forEach(item => {
    page.drawText(item.hsnCode, { x: 50, y: yPosition, size: 12, font });
    page.drawText(item.name, { x: 100, y: yPosition, size: 12, font });
    page.drawText(item.unitPrice.toFixed(2), { x: 250, y: yPosition, size: 12, font });
    page.drawText(item.quantity.toString(), { x: 350, y: yPosition, size: 12, font });
    page.drawText(item.cgstRate.toFixed(2), { x: 450, y: yPosition, size: 12, font });
    page.drawText(item.sgstRate.toFixed(2), { x: 500, y: yPosition, size: 12, font });
    page.drawText(item.igstRate.toFixed(2), { x: 550, y: yPosition, size: 12, font });
    yPosition -= 20;
  });

  // Calculate and display total taxes and taxable values
  const totalTaxableValue = sampleData.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const cgstTotal = totalTaxableValue * (sampleData.items[0].cgstRate / 100);
  const sgstTotal = totalTaxableValue * (sampleData.items[0].sgstRate / 100);
  const igstTotal = totalTaxableValue * (sampleData.items[0].igstRate / 100);

  page.drawText(`Total Taxable Value: ${totalTaxableValue.toFixed(2)}`, { x: 50, y: yPosition, size: 12, font });
  yPosition -= 20;
  page.drawText(`CGST Total: ${cgstTotal.toFixed(2)}`, { x: 50, y: yPosition, size: 12, font });
  page.drawText(`SGST Total: ${sgstTotal.toFixed(2)}`, { x: 150, y: yPosition, size: 12, font });
  page.drawText(`IGST Total: ${igstTotal.toFixed(2)}`, { x: 250, y: yPosition, size: 12, font });
  yPosition -= 40;

  // Total Amount
  const totalAmount = totalTaxableValue + cgstTotal + sgstTotal + igstTotal;
  page.drawText(`Total Amount: ${totalAmount.toFixed(2)}`, { x: 50, y: yPosition, size: 12, font });

  // Generate PDF
  const pdfBytes = await pdfDoc.save();
  const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
  window.open(pdfUrl);
};
