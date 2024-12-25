import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isValid } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, gstin, created_at } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

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
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { search, startDate, endDate } = Object.fromEntries(
      new URL(request.url).searchParams
    );

    const conditions = {};

    if (search) {
      conditions.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    // Add date filters
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

    const customers = await prisma.customers.findMany({
      where: conditions,
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customer(s):", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching customers" },
      { status: 500 }
    );
  }
}
