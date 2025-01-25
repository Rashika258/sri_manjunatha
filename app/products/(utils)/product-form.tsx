"use client";
import React from "react";
import { AppFormHeader } from "@/components/common/index";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/index";
import { useForm } from "react-hook-form";
import {
  AppDropdownOption,
  FormProps,
  ProductFormData,
  productSchema,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProductCategories } from "@/app/product-category/(utils)/api-request";

const ProductForm = ({
  onSubmit,
  isSubmitBtnLoading,
  data,
  headerText,
}: FormProps<ProductFormData>) => {
  const [categories, setCategories] = React.useState<AppDropdownOption[]>([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: data?.name || "",
      product_category_id: data?.product_category_id || undefined,
      hsn_code: data?.hsn_code || undefined,
      price: data?.price || undefined,
      gst_rate: data?.gst_rate || undefined,
      stock_quantity: data?.stock_quantity || undefined,
      adinath_price: data?.adinath_price || undefined,
      monthly_bill_price: data?.monthly_bill_price || undefined,
      monthly_bill_percentage: data?.monthly_bill_percentage || undefined,
      created_at: data?.created_at ? new Date(data?.created_at) : new Date(),
    },
  });

  const price = form.watch("price");
  const monthlyBillPercentage = form.watch("monthly_bill_percentage");

  React.useEffect(() => {
    if (price !== undefined && monthlyBillPercentage !== undefined) {
      const calculatedMonthlyBill = (price * monthlyBillPercentage) / 100;
      form.setValue("monthly_bill_price", calculatedMonthlyBill);
    }
  }, [price, monthlyBillPercentage, form]);

  const fetchProductCategories = React.useCallback(async () => {
    try {
      const response = await getProductCategories();
      const options = response.map((category) => ({
        label: category.name,
        value: category.category_id,
      }));
      setCategories(options);
    } catch (error) {
      console.error("Error fetching product categories:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchProductCategories();
  }, []);

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto">
      <AppFormHeader headerText={headerText} />
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <div className="flex flex-col grow justify-between space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Product Category */}
              <FormField
                control={form.control}
                name="product_category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        value={
                          categories.find(
                            (category) => category.value === field.value
                          )?.label
                        }
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("product_category_id", value);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product category">
                            {field.value
                              ? categories.find(
                                  (category) => category.value === field.value
                                )?.label
                              : "Select a category"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectGroup>
                          <SelectContent>
                            {categories.length > 0
                              ? categories.map((category) => (
                                  <SelectItem
                                    key={category.value}
                                    value={String(category.value)}
                                  >
                                    {category.label}
                                  </SelectItem>
                                ))
                              : "No Data"}
                          </SelectContent>
                        </SelectGroup>
                      </Select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.product_category_id?.message}
                    </FormMessage>
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
                        onChange={(e) => {
                          field.onChange(parseInt(e?.target?.value));
                        }}
                        placeholder="Enter HSN code"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.hsn_code?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

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
                        placeholder="Enter price"
                        onChange={(e) => {
                          field.onChange(parseInt(e?.target?.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* GST Rate */}
              <FormField
                control={form.control}
                name="gst_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Rate</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter GST rate"
                        onChange={(e) => {
                          field.onChange(parseInt(e?.target?.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.gst_rate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Stock Quantity */}
              <FormField
                control={form.control}
                name="stock_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter stock quantity"
                        onChange={(e) => {
                          field.onChange(parseInt(e?.target?.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.stock_quantity?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Bags */}
              <FormField
                control={form.control}
                name="bags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bags</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter bags"
                        onChange={(e) => {
                          field.onChange(parseInt(e?.target?.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.bags?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

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
                        placeholder="Enter Adinath price"
                        onChange={(e) => {
                          field.onChange(parseInt(e?.target?.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.adinath_price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

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
                        placeholder="Enter monthly bill price"
                        onChange={(e) => {
                          field.onChange(parseInt(e?.target?.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.monthly_bill_price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Monthly Bill Percentage */}
              <FormField
                control={form.control}
                name="monthly_bill_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Bill Percentage</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter monthly bill percentage"
                        onChange={(e) => {
                          field.onChange(parseInt(e?.target?.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.monthly_bill_percentage?.message}
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

export default ProductForm;
