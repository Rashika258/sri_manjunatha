import { ApiQueryParams, Employee, EmployeeFormData } from "@/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const addEmployee = async (employee: Employee): Promise<void> => {
  const response = await fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add employee");
  }

  return response.json();
};


const getEmployees = async (params?: ApiQueryParams): Promise<Employee[]> => {
  try {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    const url = `/api/employees${query ? `?${query}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch employees: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error; 
  }
};

const updateEmployee = async (employeeId: string, employeeData: Employee) => {
  try {
    debugger
    const response = await fetch(`/api/employees/${employeeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update employee: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

const deleteEmployee = async (employeeId: string) => {
  try {
    const response = await fetch(`/api/employees/${employeeId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete employee: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

const fetchEmployeeData = async (id: string): Promise<EmployeeFormData> => {
  try {
    const response = await fetch(`/api/employees/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to fetch data. Status: ${response.status}, Message: ${errorDetails.message || "Unknown error"}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetchEmployeeData:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
};

const useEmployees = (
    params?: ApiQueryParams,
    options?: UseQueryOptions<Employee[], Error>
  ) => {
    return useQuery<Employee[], Error>({
        queryKey: ["employees", params],
        queryFn: () => getEmployees(params),
        ...options,
      });

  };
  

export {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  useEmployees,
  fetchEmployeeData
}