import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { InvoiceItem } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { invoice_number, customer_id, gstin, customer_name, customer_address, customer_email, customer_phone, payment_status, is_gst_bill, tax_amount, total_amount, invoice_date, due_date, invoice_items } = data;

    const invoice = await prisma.invoice.create({
      data: {
        invoice_number,
        customer_id,
        gstin,
        customer_name,
        customer_address,
        customer_email,
        customer_phone,
        payment_status,
        is_gst_bill,
        tax_amount,
        total_amount,
        invoice_date: new Date(invoice_date),  // Ensure the date is parsed properly
        due_date: new Date(due_date),          // Ensure the date is parsed properly
        invoiceitem: {
          create: invoice_items.map((item: InvoiceItem) => ({
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            bags: item.bags,
            unit_price: item.unit_price,
            total_price: item.total_price,
            invoice_number,  // Set the foreign key relation
          })),
        },
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: "Error creating invoice" },
      { status: 500 }
    );
  }
}

// GET request to fetch all bills, optionally filtered by customer_id or date range
export async function GET(req: NextRequest) {
  try {
    const { customer_id, startDate, endDate } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    const conditions: any = {};

    if (customer_id) {
      conditions.customer_id = parseInt(customer_id);
    }

    if (startDate) {
      const start = new Date(startDate);
      conditions.due_date = { gte: start };
    }

    if (endDate) {
      const end = new Date(endDate);
      conditions.due_date = { ...conditions.due_date, lte: end };
    }

    const bills = await prisma.invoice.findMany({
      where: conditions,
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching bills" },
      { status: 500 }
    );
  }
}
