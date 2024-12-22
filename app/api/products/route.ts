import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      hsn_code,
      price,
      monthly_bill_percentage,
      monthly_bill_price,
      adinath_price,
      stock_quantity,
    } = body;

    // Validate input
    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required." },
        { status: 400 }
      );
    }

    // Create product in the database
    const product = await prisma.products.create({
      data: {
        name,
        hsn_code,
        price,
        monthly_bill_percentage,
        monthly_bill_price,
        adinath_price,
        stock_quantity,
      },
    });

    return NextResponse.json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
    try {
      // Fetch product data from the database
      const products = await prisma.products.findMany();
  
      // Return the data as JSON
      return NextResponse.json({ success: true, data: products });
    } catch (error) {
      console.error("Error fetching products:", error);
  
      // Return an error response
      return NextResponse.json(
        { success: false, error: "Failed to fetch products" },
        { status: 500 }
      );
    }
  }