
import { prisma } from "@/lib/prisma";
import { InvoiceItem } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const invoiceId = parseInt(params.id);
    const data = await req.json();

    // Ensure invoice_items is an array or default to an empty array
    const invoiceItems = Array.isArray(data.invoice_items) ? data.invoice_items : [];

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
        invoiceitem: {
          upsert: invoiceItems.map((item: InvoiceItem) => ({
            where: { item_id: item.item_id || 0 }, // Use `item_id` for `upsert` lookup
            update: {
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              bags: item.bags,
              unit_price: item.unit_price,
              total_price: item.total_price,
              hsn: item.hsn,
            },
            create: {
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              bags: item.bags,
              unit_price: item.unit_price,
              total_price: item.total_price,
              hsn: item.hsn,
              invoice: { connect: { invoice_id: invoiceId } },
            },
          })),
        },
      },
      include: { invoiceitem: true },
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error("Error updating invoice:", error);
    return NextResponse.json({ error: "Error updating invoice" }, { status: 500 });
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const invoiceId = parseInt(params.id, 10);

    // Validate invoiceId
    if (isNaN(invoiceId)) {
      return NextResponse.json(
        { error: "Invalid invoice ID" },
        { status: 400 }
      );
    }

    
    // Check if the invoice exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { invoice_id: invoiceId },
    });

    console.log("invoiceId================", invoiceId, existingInvoice);


    if (!existingInvoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    // Delete the invoice
    const deletedInvoice = await prisma.invoice.delete({
      where: { invoice_id: invoiceId },
      include:{invoiceitem: true}
    });


    return NextResponse.json({
      message: "Invoice deleted successfully",
      data: deletedInvoice,
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return NextResponse.json(
      { error: "Error deleting invoice" },
      { status: 500 }
    );
  }
}


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const invoiceId = parseInt(params.id);

    const invoice = await prisma.invoice.findUnique({
      where: { invoice_id: invoiceId },
      include: { invoiceitem: true },
    });


    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json(
      { error: "Error fetching invoice" },
      { status: 500 }
    );
  }
}

