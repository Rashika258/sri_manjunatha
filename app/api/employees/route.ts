import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isValid } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      first_name,
      last_name,
      email,
      phone_number,
      designation,
      date_of_joining,
      status,
      created_at,
    } = body;

    if (!first_name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newEmployee = await prisma.employees.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        designation,
        date_of_joining,
        status,
        created_at,
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

    const employees = await prisma.employees.findMany({
      where: conditions,
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees(s):", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while fetching employees" },
      { status: 500 }
    );
  }
}
