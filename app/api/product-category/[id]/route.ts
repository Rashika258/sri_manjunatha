import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = parseInt(params.id);

    // Delete the customer
    await prisma.customers.delete({
      where: { customer_id: customerId },
    });

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Error deleting customer" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = parseInt(params.id);
    const data = await req.json();

    // Validate or sanitize the data here as needed (e.g., check email format)

    const updatedCustomer = await prisma.customers.update({
      where: { customer_id: customerId },
      data: data,
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Error updating customer" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } } // id is now optional
) {
  try {
    if (params.id) {
      const customerId = parseInt(params.id);

      // Validate if 'customerId' is a valid number
      if (isNaN(customerId)) {
        return NextResponse.json(
          { error: "Invalid customer ID" },
          { status: 400 }
        );
      }

      // Fetch customer by customerId
      const customer = await prisma.customers.findUnique({
        where: { customer_id: customerId },
      });

      if (!customer) {
        return NextResponse.json(
          { error: "Customer not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(customer);
    }

    // If no ID is provided, fetch all customers
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
