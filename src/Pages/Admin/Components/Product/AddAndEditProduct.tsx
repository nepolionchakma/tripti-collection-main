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
import {
  Category,
  Collection,
  Color,
  Edition,
  Feature,
  Material,
  Section,
  Size,
  Product,
} from "@/types/Types";
import { Textarea } from "@/components/ui/textarea";
import ItemSelections from "../ItemSelections/ItemSelections";

interface IAddProductProps {
  setActionName: React.Dispatch<React.SetStateAction<string>>;
  selectedData?: Product[] | [];
  setSelectedData?: React.Dispatch<React.SetStateAction<Product[] | []>>;
  catalogData: {
    categories: Category[];
    collections: Collection[];
    colors: Color[];
    editions: Edition[];
    features: Feature[];
    materials: Material[];
    sections: Section[];
    sizes: Size[];
  };
}
const AddAndEditProduct = ({
  setActionName,
  selectedData,
  setSelectedData,
  catalogData,
}: IAddProductProps) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const { setChangeState } = useAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  // product_id, title, categories, collection,  prices, sizes, colors,  material, edition,  offer,  features, img,  images, stock_quantity, rating,  description, tags, visibility, is_available_product, is_featured_product,  created_at, updated_at,
  const formSchema = z.object({
    title: z.string(),
    categories: z.array(z.string()),
    sections: z.array(z.string()),
    collections: z.array(z.string()),
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
    materials: z.array(z.string()),
    editions: z.array(z.string()),
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
          sections: selectedData[0].sections,
          collections: selectedData[0].collections,
          prices: {
            original_price: selectedData[0].prices.original_price,
            new_price: selectedData[0].prices.new_price,
          },
          sizes: selectedData[0].sizes,
          colors: selectedData[0].colors,
          materials: selectedData[0].materials,
          editions: selectedData[0].editions,
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
          sections: ["HERO", "FEATURED", "RECENT"],
          collections: ["NEWEST", "HOT", "ALL", "TRENDING"],
          prices: {
            original_price: 10,
            new_price: 9,
          },
          sizes: ["S", "M", "L", "XL"],
          colors: ["White", "Black", "Green", "Red", "Blue", "Yellow"],
          materials: ["Cotton", "Leather", "Synthetic"],
          editions: ["New", "Old"],
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
      console.log(res, "res");
      if (res.status === 200) {
        toast(`${res.data.message}`);
        setActionName("");
        setSelectedData?.([]);
      }
    } catch (error) {
      console.log(error, "error");
      toast(`Error: ${error}`);
    } finally {
      setIsLoading(false);
      setChangeState(() => Math.random() + 1000 * 100);
    }
  };

  const isoToLocalInput = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const h = pad(d.getHours());
    const min = pad(d.getMinutes());
    return `${y}-${m}-${day}T${h}:${min}`;
  };

  return (
    <CustomModal className="w-[80%] h-[80%]">
      <div className="flex items-center justify-between bg-amber-300 p-2 sticky top-0 z-50">
        <h1 className="font-semibold">Add Product</h1>
        <X onClick={() => setActionName("")} className="cursor-pointer" />
      </div>
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-1">
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
                name="tags"
                render={({ field }) => (
                  <FormItem className="col-span-1">
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
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="sections"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Sections</FormLabel>
                    <FormControl>
                      <ItemSelections
                        className="w-[220px]"
                        data={catalogData.sections.map(
                          (item) => item.section_name
                        )}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <ItemSelections
                        className="w-[220px]"
                        data={catalogData.categories.map(
                          (item) => item.category_name
                        )}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collections"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Collections</FormLabel>
                    <FormControl>
                      <ItemSelections
                        className="w-[220px]"
                        data={catalogData.collections.map(
                          (item) => item.collection_name
                        )}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
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
                      <ItemSelections
                        className="w-[220px]"
                        data={catalogData.sizes.map((item) => item.size_name)}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
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
                      <ItemSelections
                        className="w-[220px]"
                        data={catalogData.colors.map((item) => item.color_name)}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="materials"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Materials</FormLabel>
                    <FormControl>
                      <ItemSelections
                        className="w-[220px]"
                        data={catalogData.materials.map(
                          (item) => item.material_name
                        )}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="editions"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Editions</FormLabel>
                    <FormControl>
                      <ItemSelections
                        className="w-[220px]"
                        data={catalogData.editions.map(
                          (item) => item.edition_name
                        )}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
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
                  <FormItem className="col-span-1">
                    <FormLabel>Features</FormLabel>
                    <FormControl>
                      <ItemSelections
                        className="w-[220px]"
                        data={catalogData.features.map(
                          (item) => item.feature_name
                        )}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* // offer  */}
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
                  <FormItem className="col-span-2">
                    <FormLabel>Offer Expires At</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        value={isoToLocalInput(field.value)}
                        onChange={(e) => {
                          const v = e.target.value; // e.g., 2025-10-17T12:30
                          field.onChange(v ? new Date(v).toISOString() : "");
                        }}
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
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="img"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Img</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-20 scrollbar-thin"
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
                  <FormItem className="col-span-2">
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-20 scrollbar-thin"
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
            </div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-20 scrollbar-thin"
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
