"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppFormHeader } from "@/components/common/index";
import {
  Checkbox,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  Button,
  Input,
} from "@/components/ui/index";

// Define validation schema using Zod
const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  hsn_code: z
    .string()
    .max(10, { message: "HSN code should be at most 10 characters" })
    .optional(),
  price: z.number().positive({ message: "Price must be greater than zero" }),
  gst_rate: z
    .number()
    .min(0, { message: "GST rate must be at least 0" })
    .optional(),
  is_gst_applicable: z.boolean().optional(),
  stock_quantity: z
    .number()
    .int()
    .min(0, { message: "Stock quantity cannot be negative" })
    .optional(),
});

// Define TypeScript types for form data based on Zod schema
type ProductFormData = z.infer<typeof productSchema>;

const AddProductPage = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });
  const { handleSubmit, formState, control } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      hsn_code: "",
      price: 0,
      gst_rate: 0,
      is_gst_applicable: true,
      stock_quantity: 0,
    },
  });

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    console.log("Product Data:", data);
    // Call API or perform actions to save the product
  };

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto">
      <AppFormHeader headerText={"Add Product"} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col grow justify-between space-y-4 ">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage>{formState.errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* HSN Code */}
              <FormField
                control={form.control}
                name="hsn_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HSN Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter HSN code" {...field} />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.hsn_code?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.price?.message}</FormMessage>
                  </FormItem>
                )}
              ></FormField>

              {/* GST Rate */}
              <FormField
                control={control}
                name="gst_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Rate (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter GST rate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.gst_rate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>

              {/* Stock Quantity */}
              <FormField
                control={control}
                name="stock_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter stock quantity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.stock_quantity?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>
            </div>

            <div className="py-2 flex items-center">
              {/* Is GST Applicable */}
              <FormField
                control={control}
                name="is_gst_applicable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is GST Applicable</FormLabel>

                    <FormControl>
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          id="is_gst_applicable"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="is_gst_applicable"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Do you want to apply GST
                          </label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage>
                      {formState.errors.is_gst_applicable?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>
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

export default AddProductPage;
