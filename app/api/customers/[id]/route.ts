import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerId = parseInt(params.id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deletedCustomer = await prisma.customers.delete({
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
    const data = await req.json(); // Get the request body

    const updatedCustomer = await prisma.customers.update({
      where: { customer_id: customerId },
      data: data, // Data to update
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
  } catch (error) {
    console.error("Error fetching customer(s):", error);
    return NextResponse.json(
      { error: "Error fetching customer(s)" },
      { status: 500 }
    );
  }
}
