import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
const validateEmployeeId = (id: string): number | null => {
  const employeeId = parseInt(id);
  return isNaN(employeeId) ? null : employeeId;
};



export async function GET(
  req: NextRequest,
  { params }: { params: { id?: string } } 
) {
  try {
    if (params.id) {
      const employeeId = validateEmployeeId(params.id);

      if (!employeeId) {
        return NextResponse.json(
          { error: "Invalid employee ID" },
          { status: 400 }
        );
      }
      const employee = await prisma.employees.findUnique({
        where: { employee_id: employeeId },
      });

      if (!employee) {
        return NextResponse.json(
          { error: "Employee not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(employee);
    }

  } catch (error) {
    console.error("Error fetching employee(s):", error);
    return NextResponse.json(
      { error: "Error fetching employee(s)" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    debugger
    const employeeId = validateEmployeeId(params.id);
    

    if (!employeeId) {
      return NextResponse.json(
        { error: "Invalid employee ID" },
        { status: 400 }
      );
    }

    const data = await req.json(); 

    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: "Name and email are required fields" },
        { status: 400 }
      );
    }

    const employeeExists = await prisma.employees.findUnique({
      where: { employee_id: employeeId },
    });

    if (!employeeExists) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 }
      );
    }

    const updatedEmployee = await prisma.employees.update({
      where: { employee_id: employeeId },
      data: data, 
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { error: "Error updating employee" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const employeeId = validateEmployeeId(params.id);

    if (!employeeId) {
      return NextResponse.json(
        { error: "Invalid employee ID" },
        { status: 400 }
      );
    }

    const deletedEmployee = await prisma.employees.delete({
      where: { employee_id: employeeId },
    });

    return NextResponse.json({ message: "Employee deleted successfully", data: deletedEmployee });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { error: "Error deleting employee" },
      { status: 500 }
    );
  }
}
