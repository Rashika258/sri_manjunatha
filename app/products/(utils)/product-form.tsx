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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductFormProps {
  onSubmit: SubmitHandler<ProductFormData>;
  isSubmitBtnLoading: boolean;
  data?: ProductFormData;
  headerText: string;
}

export const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  hsn_code: z.preprocess(
    (val) => parseInt(z.string().parse(val), 10),
    z
      .number()
      .optional()
      .refine((val) => !val || val > 0, {
        message: "HSN code must be positive",
      })
  ),
  price: z.preprocess(
    (val) => parseFloat(z.string().parse(val)),
    z.number().min(0, { message: "Price must be a positive value" }).optional()
  ),
  gst_rate: z.preprocess(
    (val) => parseFloat(z.string().parse(val)),
    z
      .number()
      .min(0, { message: "GST rate must be a positive value" })
      .optional()
  ),
  monthly_bill_percentage: z.preprocess(
    (val) => parseFloat(z.string().parse(val)),
    z
      .number()
      .min(0, { message: "Monthly bill percentage is required" })
      .optional()
  ),
  stock_quantity: z.preprocess(
    (val) => parseInt(z.string().parse(val), 10),
    z
      .number()
      .min(0, { message: "Stock quantity must be a positive number" })
      .optional()
  ),
  adinath_price: z.preprocess(
    (val) => parseFloat(z.string().parse(val)),
    z.number().min(0, { message: "Adinath price is required" })
  ),
  monthly_bill_price: z.preprocess(
    (val) => parseFloat(z.string().parse(val)),
    z.number().min(0, { message: "Monthly bill price is required" })
  ),
  created_at: z.date().optional(),
  product_category_id: z.preprocess(
    (val) => parseInt(z.string().parse(val), 10),
    z.number().min(1, {
      message: "Category ID is required and must be a positive number",
    })
  ),
});
export type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = ({
  onSubmit,
  isSubmitBtnLoading,
  data,
  headerText,
}: ProductFormProps) => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: data?.name || "",
      hsn_code: data?.hsn_code || undefined,
      price: data?.price || undefined,
      gst_rate: data?.gst_rate || undefined,
      stock_quantity: data?.stock_quantity || undefined,
      adinath_price: data?.adinath_price || 0,
      monthly_bill_price: data?.monthly_bill_price || 0,
      created_at: data?.created_at ? new Date(data.created_at) : undefined,
      product_category_id: data?.product_category_id || undefined,
    },
  });

  const { handleSubmit, formState, control, reset, setValue, watch } = form;

   // Watch price and monthly_bill_percentage values
   const price = watch("price");
   const monthlyBillPercentage = watch("monthly_bill_percentage");
 
   // Effect to calculate monthly bill price whenever price or monthly_bill_percentage changes
   React.useEffect(() => {
     if (price && monthlyBillPercentage) {
       const calculatedMonthlyBillPrice = price * (monthlyBillPercentage / 100);
       setValue("monthly_bill_price", calculatedMonthlyBillPrice); // Set the calculated value for monthly_bill_price
     }
   }, [price, monthlyBillPercentage, setValue]);

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto">
      <AppFormHeader headerText={headerText} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col grow justify-between space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Product Name */}
              <FormField
                control={control}
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
                control={control}
                name="hsn_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HSN Code</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter HSN code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.hsn_code?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{formState.errors.price?.message}</FormMessage>
                  </FormItem>
                )}
              />

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
                        placeholder="Enter GST rate"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.gst_rate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

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
              />

              {/* Adinath Price */}
              <FormField
                control={control}
                name="adinath_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adinath Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Adinath price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.adinath_price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

                   {/* Monthly Bill Percentage */}
                   <FormField
                control={control}
                name="monthly_bill_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Bill Percentage</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter percentage"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.monthly_bill_percentage?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Monthly Bill Price */}
              <FormField
                control={control}
                name="monthly_bill_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Bill Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter monthly bill price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.monthly_bill_price?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Created At */}
              <FormField
                control={control}
                name="created_at"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col justify-end">
                    <FormLabel>Created At</FormLabel>
                    <FormControl>
                      <AppDateInput
                        field={field}
                        formatValue={(value) =>
                          value ? format(value, "PPP") : ""
                        }
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.created_at?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Product Category ID */}
              <FormField
                control={control}
                name="product_category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Category ID</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter category ID"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.product_category_id?.message}
                    </FormMessage>
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

export default ProductForm;
