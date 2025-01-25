import { prisma } from "@/lib/prisma";
import { InvoiceItem } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
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
      invoice_date,
      due_date,
      invoiceitem,
      invoice_type
    } = data;

    console.log("data", data);

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
        invoice_date: new Date(invoice_date),
        due_date: new Date(due_date),  
        invoice_type       
      },
    });
    console.log("invoice", invoice);


    if (invoiceitem && invoiceitem.length > 0) {
      await prisma.invoiceitem.createMany({
        data: invoiceitem.map((item : InvoiceItem) => ({
          product_id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          bags: item.bags,
          unit_price: item.unit_price,
          total_price: item.total_price,
          hsn: item.hsn,
          invoice_id: invoice.invoice_id, 
        })),
      });
    }
    console.log("invoice", invoice);


    return NextResponse.json({ success: true, invoice }, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: "Error creating invoice" },
      { status: 500 }
    );
  }
}



const buildDateCondition = (date: string | undefined, operator: "gte" | "lte") => {
  if (date) {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      return { [operator]: parsedDate };
    }
  }
  return null;
};

export async function GET(req: NextRequest) {
  try {
    const { start_date, end_date, invoice_type } = Object.fromEntries(new URL(req.url).searchParams);

    debugger

    console.log("aa==========", invoice_type);
    

    // Validate and create conditions early
    const conditions: {
      invoice_date?: { gte?: Date; lte?: Date };
      created_at?: { gte?: Date; lte?: Date };
      updated_at?: { gte?: Date; lte?: Date };
      due_date?: { gte?: Date; lte?: Date };
      invoice_type?: string;
    } = {};

    // Build conditions dynamically using the helper function
    const startCondition = buildDateCondition(start_date, "gte");
    const endCondition = buildDateCondition(end_date, "lte");

    if (startCondition) {
      conditions.invoice_date = { ...conditions.invoice_date, ...startCondition };
      conditions.created_at = { ...conditions.created_at, ...startCondition };
      conditions.updated_at = { ...conditions.updated_at, ...startCondition };
      conditions.due_date = { ...conditions.due_date, ...startCondition };
    }

    if (endCondition) {
      conditions.invoice_date = { ...conditions.invoice_date, ...endCondition };
      conditions.created_at = { ...conditions.created_at, ...endCondition };
      conditions.updated_at = { ...conditions.updated_at, ...endCondition };
      conditions.due_date = { ...conditions.due_date, ...endCondition };
    }

    if (invoice_type) {
      conditions.invoice_type = invoice_type;
    }


    console.log("Generated conditions for the query:", conditions);

    // Fetch the bills based on the conditions
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

