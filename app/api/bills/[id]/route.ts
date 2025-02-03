import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const invoiceId = parseInt(params.id);
    const data = await req.json();

    const invoiceItems = Array.isArray(data.invoice_items)
      ? data.invoice_items
      : [];

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
        e_way_bill_num: data.e_way_bill_num,
        po_num: data.po_num,
        invoice_type: data.invoice_type,
        dc_date: data.dc_date ? new Date(data.dc_date) : undefined,
        po_date: data.po_date ? new Date(data.po_date) : undefined,
        dc_num: data.dc_num,
        cgst: data.cgst,
        sgst: data.sgst,
        igst: data.igst,
        grand_total: data.grand_total,
      },
    });

    if (updatedInvoice) {
      for (const item of invoiceItems) {
        if (item.item_id) {
          await prisma.invoiceitem.update({
            where: { item_id: item.item_id },
            data: {
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              bags: item.bags,
              unit_price: item.unit_price,
              total_price: item.total_price,
              hsn: item.hsn,
            },
          });
        } else {
          await prisma.invoiceitem.create({
            data: {
              invoice_id: invoiceId,
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              bags: item.bags,
              unit_price: item.unit_price,
              total_price: item.total_price,
              hsn: item.hsn,
            },
          });
        }
      }
    }

    const finalInvoice = await prisma.invoice.findUnique({
      where: { invoice_id: invoiceId },
      include: { invoice_items: true },
    });

    return NextResponse.json(finalInvoice);
  } catch (error) {
    console.error("Error updating invoice or items:", error);
    return NextResponse.json(
      { error: "Error updating invoice or items" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const invoiceId = parseInt(params.id, 10);

    if (isNaN(invoiceId)) {
      return NextResponse.json(
        { error: "Invalid invoice ID" },
        { status: 400 }
      );
    }

    const existingInvoice = await prisma.invoice.findUnique({
      where: { invoice_id: invoiceId },
    });

    if (!existingInvoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const deletedInvoice = await prisma.invoice.delete({
      where: { invoice_id: invoiceId },
      include: { invoice_items: true },
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
      include: { invoice_items: true },
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
