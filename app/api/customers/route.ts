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

export async function GET(request: NextRequest) {
  try {
    const { start_date, end_date } = Object.fromEntries(
      new URL(request.url).searchParams
    );

    const conditions: {
      created_at?: { gte?: Date; lte?: Date };
    } = {};

    if (start_date) {
      const start = parseISO(start_date);
      if (isValid(start)) {
        conditions.created_at = {
          ...(conditions.created_at || {}),
          gte: start,
        };
      }
    }

    if (end_date) {
      const end = parseISO(end_date);
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
