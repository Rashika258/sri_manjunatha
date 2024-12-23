/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isValid } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { first_name, last_name,  email, phone_number, designation, date_of_joining, status, created_at } = body;

    // Validate required fields
    if (!first_name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Add employee to the database
    const newEmployee = await prisma.employees.create({
      data: {
        first_name, last_name,  email, phone_number, designation, date_of_joining, status, created_at
      },
    });

    return NextResponse.json(
      { message: "Employee added successfully", employee: newEmployee },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding employee:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(request: Request) {
  try {
    const { search, startDate, endDate } = Object.fromEntries(new URL(request.url).searchParams);

    // Build the Prisma query conditions
    const conditions: any = {};

    // Add search filter
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
        conditions.created_at = { ...(conditions.created_at || {}), gte: start };
      }
    }

    if (endDate) {
      const end = parseISO(endDate);
      if (isValid(end)) {
        conditions.created_at = { ...(conditions.created_at || {}), lte: end };
      }
    }

    // Fetch filtered customers
    const customers = await prisma.employees.findMany({
      where: conditions,
      orderBy: { created_at: "desc" }, // Sort by creation date
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
