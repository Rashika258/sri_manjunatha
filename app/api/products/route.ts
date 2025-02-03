import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { isValid, parseISO } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      hsn_code,
      price,
      gst_rate,
      stock_quantity,
      adinath_price,
      monthly_bill_price,
      product_category_id,
    } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const newProduct = await prisma.products.create({
      data: {
        name,
        hsn_code,
        price,
        gst_rate,
        stock_quantity,
        adinath_price: adinath_price || 0,
        monthly_bill_price: monthly_bill_price || 0,
        product_category_id: product_category_id
          ? parseInt(product_category_id, 10)
          : undefined,
      },
    });

    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { start_date, end_date } = Object.fromEntries(
      new URL(request.url).searchParams
    );

    const conditions: {
      created_at?: { gte?: Date; lte?: Date };
    } = {};

    if (start_date) {
      const start = parseISO(start_date);
      if (isValid(start)) {
        conditions.created_at = {
          ...(conditions.created_at || {}),
          gte: start,
        };
      }
    }

    if (end_date) {
      const end = parseISO(end_date);
      if (isValid(end)) {
        conditions.created_at = { ...(conditions.created_at || {}), lte: end };
      }
    }

    const products = await prisma.products.findMany({
      where: conditions,
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching products" },
      { status: 500 }
    );
  }
}
