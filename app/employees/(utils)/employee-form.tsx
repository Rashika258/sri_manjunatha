"use client";
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
  Label,
  Switch,
} from "@/components/ui/index";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeFormData, employeeSchema, FormProps } from "@/types";


const EmployeeForm = ({
  onSubmit,
  isSubmitBtnLoading,
  data,
  headerText,
}: FormProps<EmployeeFormData>) => {

  const updatedData = {
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    email: data?.email || undefined,
    phone_number: data?.phone_number || undefined,
    designation: data?.designation || undefined,
    date_of_joining: data?.date_of_joining
      ? new Date(data?.date_of_joining)
      : new Date(),
    status: data?.status || "Active",
  };

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: updatedData,
  });

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto">
      <AppFormHeader headerText={headerText} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col grow justify-between space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* First Name */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.first_name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.last_name?.message}
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

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.phone_number?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Designation */}
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter designation" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.designation?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              
              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="status"
                            checked={field.value === "Active"}
                            onCheckedChange={(checked) =>
                              field.onChange(checked ? "Active" : "Inactive")
                            }
                          />
                          <Label htmlFor="status">
                            {field.value === "Active" ? "Active" : "Inactive"}
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.status?.message}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              />

              {/* Date of Joining */}
              <FormField
                control={form.control}
                name="date_of_joining"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Date of Joining</FormLabel>
                    <FormControl>
                      <AppDateInput
                        {...field}
                        date={field.value}
                        setDate={field.onChange}
    
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.date_of_joining?.message}
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
              onClick={() =>
                form.reset({
                  first_name: "",
                  last_name: "",
                  email: "",
                  phone_number: "",
                  designation: "",
                  date_of_joining: new Date(),
                  status: "Active",
                })
              }
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

export default EmployeeForm;
