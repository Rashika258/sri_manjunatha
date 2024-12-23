import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const newCategory = await prisma.product_categories.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(
      { message: "Product Category added successfully", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.product_categories.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while fetching product categories",
      },
      { status: 500 }
    );
  }
}
