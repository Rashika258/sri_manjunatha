/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { isValid, parseISO } from "date-fns";
import { productSchema } from "@/app/products/(utils)/product-form";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body using Zod schema
    const parsedData = productSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.errors },
        { status: 400 }
      );
    }

    const { 
      name, 
      hsn_code, 
      price, 
      gst_rate, 
      stock_quantity, 
      adinath_price, 
      monthly_bill_price, 
      created_at, 
      product_category_id 
    } = parsedData.data;

    // Add product to the database
    const newProduct = await prisma.products.create({
      data: {
        name,
        hsn_code,
        price,
        gst_rate,
        stock_quantity,
        adinath_price,
        monthly_bill_price,
        created_at: created_at ? new Date(created_at) : undefined,
        product_category_id,
      },
    });

    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(request: NextRequest) {
  try {
    const { search, startDate, endDate, categoryId } = Object.fromEntries(new URL(request.url).searchParams);

    // Build the Prisma query conditions
    const conditions: any = {};

    // Add search filter for product name
    if (search) {
      conditions.name = { contains: search, mode: "insensitive" };
    }

    // Add category filter
    if (categoryId) {
      conditions.product_category_id = parseInt(categoryId, 10);
    }

    // Add date filters for created_at
    if (startDate) {
      const start = parseISO(startDate);
      if (isValid(start)) {
        conditions.created_at = { ...(conditions.created_at || {}), gte: start };
      }
    }

    if (endDate) {
      const end = parseISO(endDate);
      if (isValid(end)) {
        conditions.created_at = { ...(conditions.created_at || {}), lte: end };
      }
    }

    // Fetch filtered products
    const products = await prisma.products.findMany({
      where: conditions,
      orderBy: { created_at: "desc" }, // Sort by creation date
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
