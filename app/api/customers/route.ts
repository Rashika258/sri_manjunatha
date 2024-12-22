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

export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } } // id is now optional
) {
  try {
    // debugger
    // If the 'id' is passed in the params, fetch the customer by ID
    // if (params.id) {
    //   const customerId = parseInt(params.id);

    //   // Validate if 'customerId' is a valid number
    //   if (isNaN(customerId)) {
    //     return NextResponse.json(
    //       { error: "Invalid customer ID" },
    //       { status: 400 }
    //     );
    //   }

    //   // Fetch customer by customerId
    //   const customer = await prisma.customers.findUnique({
    //     where: { customer_id: customerId },
    //   });

    //   if (!customer) {
    //     return NextResponse.json(
    //       { error: "Customer not found" },
    //       { status: 404 }
    //     );
    //   }

    //   return NextResponse.json(customer);
    // }

    // If no 'id' is passed, fetch all customers
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


export async function PUT(
  req: Request,
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    debugger
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
