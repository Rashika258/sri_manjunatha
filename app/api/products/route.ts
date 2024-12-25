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
      created_at,
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
        created_at: created_at ? new Date(created_at) : undefined,
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
    const { search, startDate, endDate, categoryId } = Object.fromEntries(
      new URL(request.url).searchParams
    );

    const conditions: any = {};

    if (search) {
      conditions.name = { contains: search, mode: "insensitive" };
    }

    if (categoryId) {
      conditions.product_category_id = parseInt(categoryId, 10);
    }

    if (startDate) {
      const start = parseISO(startDate);
      if (isValid(start)) {
        conditions.created_at = {
          ...(conditions.created_at || {}),
          gte: start,
        };
      }
    }

    if (endDate) {
      const end = parseISO(endDate);
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
