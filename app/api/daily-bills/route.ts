import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const dailyBills = await prisma.invoices.findMany({
      where: { is_gst_bill: false },
    });
    return NextResponse.json(dailyBills, { status: 200 });
  } catch (error) {
    console.error("Error fetching daily bills:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily bills" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_id, invoice_date, total_amount, grand_total } = body;

    if (!customer_id || !invoice_date || !total_amount || !grand_total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newBill = await prisma.invoices.create({
      data: {
        customer_id,
        invoice_date: new Date(invoice_date),
        total_amount,
        tax_amount: 0, // No GST for daily bills
        grand_total,
        is_gst_bill: false,
      },
    });

    return NextResponse.json(newBill, { status: 201 });
  } catch (error) {
    console.error("Error creating daily bill:", error);
    return NextResponse.json(
      { error: "Failed to create daily bill" },
      { status: 500 }
    );
  }
}
