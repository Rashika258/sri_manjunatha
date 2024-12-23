import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, gstin, created_at } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Add customer to the database
    const newCustomer = await prisma.customers.create({
      data: {
        name,
        email,
        phone,
        address,
        gstin,
        created_at: created_at ? new Date(created_at) : undefined,
      },
    });

    return NextResponse.json(
      { message: "Customer added successfully", customer: newCustomer },
      { status: 201 }
    );
} catch (error) {
    console.error("Error adding customer:", error);

    // // Handle unique constraint errors
    // if (error.code === "P2002") {
    //   return NextResponse.json(
    //     { error: `Unique constraint failed on field: ${error.meta?.target}` },
    //     { status: 409 }
    //   );
    // }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
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

