/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import AppFormHeader from "@/components/common/app-form-header";
import { Checkbox } from "@/components/ui/checkbox";

// Define validation schema using Zod
const employeeSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .optional(),
  designation: z.string().optional(),
  date_of_joining: z
    .string()
    .min(1, { message: "Date of joining is required" }),
  status: z.enum(["Active", "Inactive"]).optional(),
});

// Define TypeScript types for form data based on Zod schema
type EmployeeFormData = z.infer<typeof employeeSchema>;

const AddEmployeePage = () => {
  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });
  const { handleSubmit, formState, control } = form;

  const onSubmit: SubmitHandler<EmployeeFormData> = (data) => {
    console.log("Employee Data:", data);
    // You can send the data to an API or perform actions to save the employee details
  };

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto">
      <AppFormHeader headerText={"Add Employee"} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col grow justify-between space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* First Name */}
              <FormField
                control={control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.first_name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.last_name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.phone_number?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Designation */}
              <FormField
                control={control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter designation" {...field} />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.designation?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Date of Joining */}
              <FormField
                control={control}
                name="date_of_joining"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Joining</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Select date of joining"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.date_of_joining?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* Employee Status */}
            <div className="py-2 flex items-center">
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          id="status"
                          checked={field.value === "Active"}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? "Active" : "Inactive");
                          }}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="status"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Do you want to make the employee active
                          </label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage>
                      {formState.errors.status?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="px-4 py-4 flex w-full items-center justify-end space-x-4">
            <Button type="reset" variant="secondary">
              Reset
            </Button>
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEmployeePage;
