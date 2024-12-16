/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { SheetFooter } from "../ui/sheet";
import { ArrowLeftIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";

type Item = {
  item: string;
  quantity: number;
  bags: number;
  price: number;
  total: number;
};

type Company = {
  gstin: string;
  name: string;
  address: string;
};

type FormData = {
  billNo: string;
  gstin: string;
  company_name: string;
  items: Item[];
};

const itemsList = [
  { id: 1, name: "Item A", price: 100 },
  { id: 2, name: "Item B", price: 200 },
  { id: 3, name: "Item C", price: 300 },
];

const companies: Company[] = [
  { gstin: "1234567890A", name: "Company A", address: "123 Street, City A" },
  { gstin: "0987654321B", name: "Company B", address: "456 Avenue, City B" },
];

const BillingForm = () => {
  const [companyDetails, setCompanyDetails] = useState<Company | null>(null);

  // Define schema for form validation
  const FormSchema = z.object({
    billNo: z
      .string({
        required_error: "Please enter the bill number to display.",
      })
      .min(1, { message: "Bill number is required." }),

    gstin: z
      .string({
        required_error: "Please enter the GST Number to display.",
      })
      .min(1, { message: "GST Number is required." }),

    company_name: z.string({
      required_error: "Please select a company name to display.",
    }),

    items: z
      .array(
        z.object({
          item: z.string().min(1, { message: "Item name is required." }),
          quantity: z
            .number()
            .min(1, { message: "Quantity must be greater than 0." }),
          bags: z
            .number()
            .min(0, { message: "Bags must be greater than or equal to 0." }),
          price: z
            .number()
            .min(1, { message: "Price must be greater than 0." }),
          total: z
            .number()
            .min(0, { message: "Total must be greater than or equal to 0." }),
        })
      )
      .min(1, { message: "At least one item is required." }),
  });

  const { register, control, handleSubmit, setValue, watch, formState } =
    useForm<FormData>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        billNo: Date.now().toString(),
        gstin: "",
        company_name: "",
        items: [{ item: "", quantity: 0, bags: 0, price: 0, total: 0 }],
      },
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "items",
  });

  const watchItems = watch("items");

  const calculateTotalBill = () =>
    watchItems.reduce((acc, item) => acc + Number(item.total || 0), 0);

  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: number | string
  ) => {
    const item = { ...fields[index], [field]: value };
    if (field === "quantity" || field === "bags" || field === "price") {
      item.total = item.quantity * item.price; // Update total whenever any of these fields change
    }
    update(index, item);
  };

  const handleGstinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gstin = e.target.value;
    const company = companies.find((c) => c.gstin === gstin);
    setCompanyDetails(company || null);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert("Bill submitted successfully!");
    console.log(data);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();
  return (
    
      <div className="flex flex-col grow w-full overflow-hidden ">
      <div className="flex justify-between items-center pb-4">
        <h3 className="text-2xl text-foreground">Monthly Bills</h3>
        <Button onClick={() => router.back()} variant="link">
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Go back
        </Button>
      </div>
      <Form {...form}>
      <form  onSubmit={handleSubmit(onSubmit)} >
      <div className="flex flex-col grow justify-between space-y-4 mb-16">
        <div className="grid grid-cols-2 gap-4">
        <FormField
            control={form.control}
            name="billNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill Number</FormLabel>
                <FormControl>
                  <Input placeholder="Bill Number" {...field} />
                </FormControl>
                <FormMessage>{formState.errors.billNo?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gstin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="GST Number"
                    {...field}
                    onChange={handleGstinChange}
                  />
                </FormControl>
                <FormMessage>{formState.errors.gstin?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
     

          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.gstin} value={company.gstin}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>
                  {formState.errors.company_name?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between ">
            <h3 className="font-bold text-lg">Items</h3>
            <Button
              onClick={() =>
                append({ item: "", quantity: 0, bags: 0, price: 0, total: 0 })
              }
              size={"icon"}
            >
              <PlusIcon />
            </Button>
          </div>
          <div className="overflow-auto w-full rounded-md border max-h-[200px]">

          <Table >
            <TableHeader>
              <TableRow className="w-full flex">
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Bags</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="company_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a product" />
                              </SelectTrigger>
                              <SelectContent>
                                {itemsList.map((item) => (
                                  <SelectItem key={item.id} value={item?.name}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage>
                            {formState.errors.company_name?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      {...register(`items.${index}.quantity`)}
                      defaultValue={field.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      {...register(`items.${index}.bags`)}
                      defaultValue={field.bags}
                      onChange={(e) =>
                        handleItemChange(index, "bags", Number(e.target.value))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      {...register(`items.${index}.price`)}
                      defaultValue={field.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", Number(e.target.value))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      disabled
                      {...register(`items.${index}.total`)}
                      value={field.total || 0}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size={"icon"}
                      onClick={() => remove(index)}
                    >
                      <Trash2Icon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          </div>
          
          {/* Total Amount */}
          <div className="mt-4">
            <h3 className="font-bold">Total Amount: {calculateTotalBill()}</h3>
          </div>

          {/* Submit Button */}

          <div className="flex justify-between  pt-4 bottom-8  fixed">
            <Button className="mr-8" variant="secondary">Reset</Button>
            <Button type="submit">Submit</Button>
          </div>
     
      </form>
      </Form>
      </div>

  );
};

export default BillingForm;
