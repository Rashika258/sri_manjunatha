"use client";
import React from "react";
import {  AppFormHeader } from "@/components/common/index";
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
import { useForm } from "react-hook-form";
import { CustomerFormProps } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const customerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .optional()
    .refine((val) => val === undefined || val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    }),
  address: z.string().optional(),
  gstin: z
    .string()
    .trim()  
    .length(15, { message: "GSTIN must be exactly 15 characters" })
    .optional(),
  created_at: z.date().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

const CustomerForm = ({
  onSubmit,
  isSubmitBtnLoading,
  data,
  headerText,
}: CustomerFormProps) => {
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || undefined,
      phone: data?.phone || undefined,
      address: data?.address || undefined,
      gstin: data?.gstin || undefined,
      created_at: data?.created_at ? new Date(data?.created_at) : new Date(),
    },
  });

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto">
      <AppFormHeader headerText={headerText} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col grow justify-between space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Customer Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
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
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.phone?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.address?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* GSTIN */}
              <FormField
                control={form.control}
                name="gstin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GSTIN</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter GSTIN" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.gstin?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

            </div>
          </div>

          {/* Submit & Reset Buttons */}
          <div className="px-4 py-4 flex w-full items-center justify-end space-x-4">
            <Button
              type="reset"
              variant="secondary"
              onClick={() => form.reset()}
            >
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

export default CustomerForm;
