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
import AppDateInput from "@/components/common/app-date-input";
import { format } from "date-fns";

// Define validation schema using Zod
const customerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .optional(),
  address: z.string().optional(),
  gstin: z
    .string()
    .length(15, { message: "GSTIN must be exactly 15 characters" })
    .optional(),
  created_at: z.date().optional(),
});

// Define TypeScript types for form data based on Zod schema
type CustomerFormData = z.infer<typeof customerSchema>;

const AddCustomerPage = () => {
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
  });
  const { handleSubmit, formState, control, register } =
    useForm<CustomerFormData>({
      resolver: zodResolver(customerSchema),
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        address: "",
        gstin: "",
        created_at: new Date(),
      },
    });

  const onSubmit: SubmitHandler<CustomerFormData> = (data) => {
    console.log("Customer Data:", data);
    // Call API or perform actions to save the customer
  };

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto">
      <AppFormHeader headerText={"Add Customer"} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col grow justify-between space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Customer Name */}
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage>{formState.errors.name?.message}</FormMessage>
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

              {/* Phone */}
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage>{formState.errors.phone?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.address?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* GSTIN */}
              <FormField
                control={control}
                name="gstin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GSTIN</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter GSTIN" {...field} />
                    </FormControl>
                    <FormMessage>{formState.errors.gstin?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="created_at"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Created At</FormLabel>
                    <FormControl>
                      <AppDateInput
                        field={field}
                        formatValue={(value) =>
                          value ? format(value, "PPP") : ""
                        } // Custom date format
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.created_at?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit & Reset Buttons */}
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

export default AddCustomerPage;
