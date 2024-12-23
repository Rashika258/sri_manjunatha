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
  Textarea,
} from "@/components/ui/index";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductCategoryFormProps {
  onSubmit: SubmitHandler<ProductCategoryFormData>;
  isSubmitBtnLoading: boolean;
  data?: ProductCategoryFormData;
  headerText: string;
}

const productCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters" })
    .optional(),
  created_at: z.date().optional(),
});

export type ProductCategoryFormData = z.infer<typeof productCategorySchema>;

const ProductCategoryForm = ({
  onSubmit,
  isSubmitBtnLoading,
  data,
  headerText,
}: ProductCategoryFormProps) => {
  const form = useForm<z.infer<typeof productCategorySchema>>({
    resolver: zodResolver(productCategorySchema),
  });
  const { handleSubmit, formState, control, reset } =
    useForm<ProductCategoryFormData>({
      resolver: zodResolver(productCategorySchema),
      defaultValues: {
        name: data?.name || "",
        description: data?.description || "",
      },
    });

  return (
    <div className="flex flex-col grow w-full h-full p-8 overflow-auto">
      <AppFormHeader headerText={headerText} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col grow justify-between space-y-4">
            <div className="flex w-full flex-col gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Category Name */}
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage>{formState.errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter category description (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formState.errors.description?.message}
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
                reset({
                  name: data?.name || "",
                  description: data?.description || "",
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

export default ProductCategoryForm;
