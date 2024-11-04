import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddProductMutation } from "@/api/product/product";

export const productAddSchema = z.object({
  productTitle: z.string().min(2, {
    message: 'Product title must be at least 2 characters.'
  }),
  productPrice: z.number().positive({
    message: 'Price must be a positive number.'
  }),
  productDescription: z.string().min(2, {
    message: 'Product description must be at least 2 characters.'
  }),
});

type AddFormValues = z.infer<typeof productAddSchema>;

const AddUserModal = () => {
  const form = useForm<AddFormValues>({
    resolver: zodResolver(productAddSchema),
    defaultValues: {
      productTitle: '',
      productPrice: 0,
      productDescription: '',
    }
  });

  const [addProduct] = useAddProductMutation();

  const onSubmit = async (data: AddFormValues) => {
    const formattedData = {
      ...data,
      productPrice: Number(data.productPrice),
      title: data.productTitle,
      price: data.productPrice,
      description: data.productDescription,
      categoryId: 1, 
      images: ["https://www.google.com/imgres?q=%D0%BB%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%D1%87%20%D0%BC%D0%B8%D1%88%D0%BA%D0%B0&imgurl=https%3A%2F%2Fcontent1.rozetka.com.ua%2Fgoods%2Fimages%2Foriginal%2F24709323.jpg&imgrefurl=https%3A%2F%2Frozetka.com.ua%2Flogitech_910_005823%2Fp213709267%2F&docid=tvvZEXqjhfeRvM&tbnid=dalcyM_mWi-9qM&vet=12ahUKEwj4_eme1cCJAxU9DRAIHcwMFzAQM3oECBcQAA..i&w=1200&h=1237&hcb=2&ved=2ahUKEwj4_eme1cCJAxU9DRAIHcwMFzAQM3oECBcQAA"], 
    };
    try {
      await addProduct(formattedData).unwrap();
      console.log("Product added successfully:", formattedData);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product Form</DialogTitle>
          <DialogDescription>Add your product for sale</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter product price"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? Number(value) : 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUserModal;