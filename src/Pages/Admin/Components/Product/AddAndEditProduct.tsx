import CustomModal from "@/Pages/Admin/Components/CustomModal/CustomModal";
import { X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useAdminContext } from "@/Pages/Admin/Contexts/Admin/AdminContext";
import { Product } from "@/types/Types";
import { Textarea } from "@/components/ui/textarea";

interface IAddProductProps {
  setActionName: React.Dispatch<React.SetStateAction<string>>;
  selectedData?: Product[] | [];
  setSelectedData?: React.Dispatch<React.SetStateAction<Product[] | []>>;
}
const AddAndEditProduct = ({
  setActionName,
  selectedData,
  setSelectedData,
}: IAddProductProps) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const { setChangeState } = useAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  // product_id, title, categories, collection,  prices, sizes, colors,  material, edition,  offer,  features, img,  images, stock_quantity, rating,  description, tags, visibility, is_available_product, is_featured_product,  created_at, updated_at,
  const formSchema = z.object({
    title: z.string(),
    categories: z.array(z.string()),
    collection: z.array(z.string()),
    prices: z.object({
      original_price: z.number(),
      new_price: z.number(),
    }),
    // original_price: z.number(),
    // .min(1, { message: "Original price must be at least 0" }),
    // new_price: z.number(),
    // .min(1, { message: "New price must be at least 0" }),
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    material: z.array(z.string()),
    edition: z.array(z.string()),
    offer: z.object({
      type: z.string(),
      amount: z.number(),
      expires_at: z.string(),
    }),
    features: z.array(z.string()),
    img: z.string(),
    images: z.array(z.string()),
    stock_quantity: z
      .number()
      .min(0, { message: "Quantity must be at least 0" }),
    rating: z.object({ total_reviews: z.number(), average_rating: z.number() }),
    description: z.string(),
    tags: z.array(z.string()),
    visibility: z.boolean(),
    is_available_product: z.boolean(),
    is_featured_product: z.boolean(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
  });

  // Determine if we're in edit mode
  const isEditMode = selectedData?.length === 1;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode
      ? {
          title: selectedData[0].title,
          categories: selectedData[0].categories,
          collection: selectedData[0].collection,
          prices: {
            original_price: selectedData[0].prices.original_price,
            new_price: selectedData[0].prices.new_price,
          },
          sizes: selectedData[0].sizes,
          colors: selectedData[0].colors,
          material: selectedData[0].material,
          edition: selectedData[0].edition,
          offer: {
            type: selectedData[0].offer.type,
            amount: selectedData[0].offer.amount,
            expires_at: selectedData[0].offer.expires_at,
          },
          features: selectedData[0].features,
          img: selectedData[0].img,
          images: selectedData[0].images,
          stock_quantity: selectedData[0].stock_quantity,
          rating: {
            total_reviews: selectedData[0].rating.total_reviews,
            average_rating: selectedData[0].rating.average_rating,
          },
          description: selectedData[0].description,
          tags: selectedData[0].tags,
          visibility: selectedData[0].visibility,
          is_available_product: selectedData[0].is_available_product,
          is_featured_product: selectedData[0].is_featured_product,
          created_at: selectedData[0].created_at,
          updated_at: new Date().toISOString(),
        }
      : {
          title: "Men T-Shirt",
          categories: ["Men", "Women", "Kids"],
          collection: ["Summer", "Winter", "Fall", "Spring"],
          prices: {
            original_price: 10,
            new_price: 9,
          },
          sizes: ["S", "M", "L", "XL"],
          colors: ["White", "Black", "Green", "Red", "Blue", "Yellow"],
          material: ["Cotton", "Leather", "Synthetic"],
          edition: ["New", "Old"],
          offer: {
            type: "10% off",
            amount: 10,
            expires_at: new Date().toISOString(),
          },
          features: ["Breathable", "Lightweight", "Waterproof"],
          img: "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
          images: [
            "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
            "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
            "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
          ],
          stock_quantity: 10,
          rating: {
            total_reviews: 0,
            average_rating: 0,
          },
          description: "This is a test description",
          tags: ["tag1", "tag2", "tag3"],
          visibility: true,
          is_available_product: true,
          is_featured_product: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = { ...values };
    console.log(data, "data");
    try {
      setIsLoading(true);

      // Use PUT if editing a product
      const res = isEditMode
        ? await axios.put(
            `${VITE_API_URL}/products/update/${selectedData[0].product_id}`,
            data
          )
        : await axios.post(`${VITE_API_URL}/products/create`, data);

      if (res.status === 200) {
        toast(`${res.data.message}`);
        setActionName("");
        setSelectedData?.([]);
      }
    } catch (error) {
      toast(`Error: ${error}`);
    } finally {
      setIsLoading(false);
      setChangeState(() => Math.random() + 1000 * 100);
    }
  };

  return (
    <CustomModal className="w-[80%] custom-scrollbar">
      <div className="flex items-center justify-between bg-amber-300 p-2 sticky top-0">
        <h1 className="font-semibold">Add Product</h1>
        <X onClick={() => setActionName("")} className="cursor-pointer" />
      </div>
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-8 gap-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Title</FormLabel>
                    <FormControl className="w-full">
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter categories (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prices.original_price"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Original Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Original Price"
                        {...field}
                        type="number"
                        min={1}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value) || 0);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prices.new_price"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>New Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New Price"
                        {...field}
                        type="number"
                        min={1}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value) || 0);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="collection"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Collection</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter collection (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Sizes</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter size (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter colors (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Material</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter material (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-8 gap-4">
              <FormField
                control={form.control}
                name="edition"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Edition</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter edition (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter features (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tags (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock_quantity"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter stock quantity (comma separated)"
                        {...field}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-8 gap-4">
              {/* // offer  */}
              <FormField
                control={form.control}
                name="offer.type"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Offer Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter offer type (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="offer.amount"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Offer Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter offer amount (comma separated)"
                        {...field}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="offer.expires_at"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Offer Expires At</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter offer expires at (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating.average_rating"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Average Rating</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        type="number"
                        {...field}
                        min={1}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value) || 0);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating.total_reviews"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Total Reviews</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        {...field}
                        type="number"
                        min={1}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value) || 0);
                        }}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Visibility</FormLabel>
                    <FormControl>
                      <Select
                        required
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                        value={field.value ? "true" : "false"}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select True/False" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_available_product"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Available Product</FormLabel>
                    <FormControl>
                      <Select
                        required
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                        value={field.value ? "true" : "false"}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select True/False" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_featured_product"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Featured Product</FormLabel>
                    <FormControl>
                      <Select
                        required
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                        value={field.value ? "true" : "false"}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select True/False" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-8 gap-4">
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Img</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-20"
                        placeholder="Enter img (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-20"
                        placeholder="Enter images (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value.join(", ")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-20"
                        placeholder="Enter description (comma separated)"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value.split(",").map((color) => color.trim())
                          );
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="cursor-pointer">
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </CustomModal>
  );
};

export default AddAndEditProduct;
