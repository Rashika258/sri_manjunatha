
import { prisma } from "@/lib/prisma";
import { InvoiceItem } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const invoiceId = parseInt(params.id);
    const data = await req.json();

    const updatedInvoice = await prisma.invoice.update({
      where: { invoice_id: invoiceId },
      data: {
        invoice_number: data.invoice_number,
        gstin: data.gstin,
        customer_name: data.customer_name,
        customer_address: data.customer_address,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        payment_status: data.payment_status,
        is_gst_bill: data.is_gst_bill,
        tax_amount: data.tax_amount,
        total_amount: data.total_amount,
        invoice_date: new Date(data.invoice_date),
        due_date: new Date(data.due_date),
        items: {
          upsert: data.invoice_items.map((item: InvoiceItem) => ({
            where: { item_id: item.product_id || -1 }, // New item will have a different ID
            update: { ...item },
            create: { ...item },
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error("Error updating invoice:", error);
    return NextResponse.json({ error: "Error updating invoice" }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const invoiceId = parseInt(params.id);

    const deletedInvoice = await prisma.invoice.delete({
      where: { invoice_id: invoiceId },
    });

    return NextResponse.json({ message: "Invoice deleted successfully", data: deletedInvoice });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return NextResponse.json({ error: "Error deleting invoice" }, { status: 500 });
  }
};

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const invoiceId = parseInt(params.id);

    const invoice = await prisma.invoice.findUnique({
      where: { invoice_id: invoiceId },
      include: { items: true }, // Include the related items
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json({ error: "Error fetching invoice" }, { status: 500 });
  }
}

