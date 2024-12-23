import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = parseInt(params.id);

    const deletedProductCategory = await prisma.product_categories.delete({
      where: { category_id: categoryId },
    });

    return NextResponse.json({
      message: "Product Category deleted successfully",
      data: deletedProductCategory,
    });
  } catch (error) {
    console.error("Error deleting product category:", error);
    return NextResponse.json(
      { error: "Error deleting product category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = parseInt(params.id);
    const data = await req.json();

    const updatedCustomer = await prisma.product_categories.update({
      where: { category_id: categoryId },
      data: data,
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating product category:", error);
    return NextResponse.json(
      { error: "Error updating product category" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } }
) {
  try {
    if (params.id) {
      const categoryId = parseInt(params.id);

      if (isNaN(categoryId)) {
        return NextResponse.json(
          { error: "Invalid customer ID" },
          { status: 400 }
        );
      }

      const customer = await prisma.product_categories.findUnique({
        where: { category_id: categoryId },
      });

      if (!customer) {
        return NextResponse.json(
          { error: "Customer not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(customer);
    }

    const customers = await prisma.customers.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customer(s):", error);
    return NextResponse.json(
      { error: "Error fetching customer(s)" },
      { status: 500 }
    );
  }
}
