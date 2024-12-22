/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppFormHeader } from "@/components/common/index";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  Input,
  Button,
} from "@/components/ui/index";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../(api-utils)/route";
import { ProductData } from "@/types";

// Define validation schema using Zod
const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  hsn_code: z.coerce.number().optional(),
  price: z.coerce.number({
    required_error: "Price is required",
  }).positive(),
  adinath_price:  z.coerce.number().nonnegative().optional(),
  monthly_bill_percentage: z.coerce.number().min(0).max(100)
    .optional(),
  monthly_bill_price: z.coerce.number().nonnegative().optional(),
  stock_quantity:  z.coerce.number().int().min(0).optional(),
});


const AddProductPage = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });
  const { handleSubmit, formState } = useForm<ProductData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      hsn_code: 7308,
      price: 0,
      stock_quantity: undefined,
      monthly_bill_percentage: 0,
      monthly_bill_price: undefined,
      adinath_price: undefined,
    },
    shouldUnregister: true
  });

  const { watch, setValue } = form;
  const price = watch("price");
  const monthlyBillPercentage = watch("monthly_bill_percentage");

  // Update the monthly bill price dynamically based on price and percentage
  useEffect(() => {
    if (price && monthlyBillPercentage) {
      const calculatedMonthlyBillPrice = (price * monthlyBillPercentage) / 100;
      setValue("monthly_bill_price", calculatedMonthlyBillPrice);
    }
  }, [price, monthlyBillPercentage, setValue]);

  const testData = { name: "Product A", price: 10, monthly_bill_percentage: 10 };
  const a= {
    "name": "nejkewfdksejf",
    "price": 192878737837,
    "monthly_bill_price": 19287873783.7,
    "monthly_bill_percentage": "10"
}
console.log("aaa",productSchema.safeParse(a));


  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      alert("Product added successfully!");
      form.reset();
    },
    onError: (error: any) => {
      alert(error.message || "An unexpected error occurred.");
    },
  });

  const onSubmit: SubmitHandler<ProductData> = (data) => {
    mutation.mutate(data);
  };

  const handleReset = () => {
    form.reset({
      name: "",
      hsn_code: 7308,
      price: 0,
      stock_quantity: undefined,
      monthly_bill_percentage: 0,
      monthly_bill_price: undefined,
      adinath_price: undefined,
    });
  };

  console.log("Form Data:", form.getValues());
  

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
                      <Input 
                      {...field}
                      placeholder="Enter HSN code"
                                              onChange={(e) => field.onChange(parseFloat(Number(e.target.value)))}

                      
                       />
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
                      {...field}
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                        // value={field.value === undefined || field.value === null ? "" : field.value.toString()} 

                        onChange={(e) => field.onChange(parseFloat(Number(e.target.value)))}
                        
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.price?.message}</FormMessage>
                  </FormItem>
                )}
              ></FormField>

              {/* Adinath Price */}
              <FormField
                control={form.control}
                name="adinath_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adinath Price</FormLabel>
                    <FormControl>
                      <Input
                       {...field}
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                       
                        onChange={(e) => field.onChange(parseFloat(Number(e.target.value)))}

                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.adinath_price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>

              {/* Monthly Bill Price */}
              <FormField
                control={form.control}
                name="monthly_bill_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Bill Price</FormLabel>
                    <FormControl>
                      <Input
                       {...field}
                        type="number"
                        step="0.01"
                        placeholder="Enter Monthly Bill Price"
                       
                        onChange={(e) => field.onChange(parseFloat(Number(e.target.value)))}

                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.monthly_bill_price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>

              {/* Monthly Bill Percentage */}
              <FormField
                control={form.control}
                name="monthly_bill_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Bill Percentage (%)</FormLabel>
                    <FormControl>
                      <Input
                      {...field}
                        type="number"
                        step="0.01"
                        placeholder="Enter Monthly Bill Percentage"
                        
                        onChange={(e) => field.onChange(parseFloat(Number(e.target.value)))}

                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.monthly_bill_percentage?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>

              {/* Stock Quantity */}
              <FormField
                control={form.control}
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
            <div className="px-4 py-4 flex w-full items-center justify-end space-x-4">
    <Button type="reset" variant="secondary" onClick={handleReset}>
      Reset
    </Button>
    <Button type="submit" variant="default">
      Submit
    </Button>
  </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProductPage;
