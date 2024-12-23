import React from "react";
import { AppDateInput, AppFormHeader } from "@/components/common/index";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui/index";
import { format } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { Employee } from "@/types"; // Adjust the type import path
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EmployeeFormProps {
  onSubmit: SubmitHandler<Employee>;
  isSubmitBtnLoading: boolean;
  data?: Employee;
  headerText: string;
}

const employeeSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .optional()
    .refine((val) => val === undefined || val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    }),
  designation: z.string().optional(),
  date_of_joining: z.date().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});
export type EmployeeFormData = z.infer<typeof employeeSchema>;

const EmployeeForm = ({ onSubmit, isSubmitBtnLoading, data, headerText }: EmployeeFormProps) => {
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
  });

  const { handleSubmit, formState, control, reset } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      email: data?.email || undefined,
      phone_number: data?.phone_number || undefined,
      designation: data?.designation || undefined,
      date_of_joining: data?.date_of_joining ? new Date(data?.date_of_joining) : new Date(),
      status: data?.status || "Active",
    },
  });

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto">
      <AppFormHeader headerText={headerText} />
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
                    <FormMessage>{formState.errors.first_name?.message}</FormMessage>
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
                    <FormMessage>{formState.errors.last_name?.message}</FormMessage>
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
                    <FormMessage>{formState.errors.phone_number?.message}</FormMessage>
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
                    <FormMessage>{formState.errors.designation?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Date of Joining */}
              <FormField
                control={control}
                name="date_of_joining"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Date of Joining</FormLabel>
                    <FormControl>
                      <AppDateInput
                        field={field}
                        formatValue={(value) =>
                          value ? format(value, "PPP") : ""
                        } // Custom date format
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.date_of_joining?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select {...field}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </FormControl>
                    <FormMessage>{formState.errors.status?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit & Reset Buttons */}
          <div className="px-4 py-4 flex w-full items-center justify-end space-x-4">
            <Button type="reset" variant="secondary" onClick={() => reset()}>
              Reset
            </Button>
            <Button
              className="button__with__loader"
              loading={isSubmitBtnLoading}
              type="submit"
              variant="default"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeForm;
