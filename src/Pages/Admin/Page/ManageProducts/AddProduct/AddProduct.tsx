// import CustomModal from "@/Pages/Admin/Components/CustomModal/CustomModal";
// import { X } from "lucide-react";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import axios from "axios";
// import { toast } from "sonner";
// import { useState } from "react";
// import { useAdminContext } from "@/Pages/Admin/Contexts/Admin/AdminContext";

// interface IAddProductProps {
//   setActionName: React.Dispatch<React.SetStateAction<string>>;
// }
// const AddProduct = ({ setActionName }: IAddProductProps) => {
//   const VITE_API_URL = import.meta.env.VITE_API_URL;
//   const { setChangeState } = useAdminContext();
//   const [isLoading, setIsLoading] = useState(false);
//   // title, category, original_price, new_price, size, colors, material, is_available, edition, offer, features, img, images, quantity, description, visibility,timestamp
//   const formSchema = z.object({
//     title: z.string(),
//     category: z.string(),
//     original_price: z.number(),
//     new_price: z.number(),
//     size: z.array(z.string()),
//     colors: z.array(z.string()),
//     material: z.array(z.string()),
//     is_available: z.boolean(),
//     edition: z.array(z.string()),
//     offer: z.string(),
//     features: z.array(z.string()),
//     img: z.string(),
//     images: z.array(z.string()),
//     quantity: z.number(),
//     description: z.string(),
//     visibility: z.boolean(),
//     timestamp: z.string(),
//   });
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "Men T-Shirt",
//       category: "Men",
//       original_price: 10,
//       new_price: 9,
//       size: ["S", "M", "L", "XL"],
//       colors: ["White", "Black", "Green", "Red", "Blue", "Yellow"],
//       material: ["Cotton", "Leather", "Synthetic"],
//       is_available: true,
//       edition: ["New", "Old"],
//       offer: "10% off",
//       features: ["Breathable", "Lightweight", "Waterproof"],
//       img: "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
//       images: [
//         "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
//         "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
//         "https://www.pngall.com/wp-content/uploads/2016/04/Women-Bag-PNG-HD.png",
//       ],
//       quantity: 10,
//       description: "This is a test description",
//       visibility: true,
//       timestamp: "",
//     },
//   });

//   // 2. Define a submit handler.
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     console.log(values, "values");
//     const data = { ...values, timestamp: new Date().toLocaleString() };
//     try {
//       setIsLoading(true);
//       const res = await axios.post(`${VITE_API_URL}/products/create`, data);
//       console.log(res.data, "res");
//       if (res.status === 200) {
//         toast(`${res.data.message}`);
//         setActionName("");
//       }
//     } catch (error) {
//       console.log(error, "error");
//       toast(`${error}`);
//     } finally {
//       setIsLoading(false);
//       setChangeState(() => Math.random() + 1000 * 100);
//     }
//   };

//   return (
//     <CustomModal className="w-[80%] scrollbar-thin">
//       <div className="flex items-center justify-between bg-amber-300 p-2 sticky top-0">
//         <h1 className="font-semibold">Add Product</h1>
//         <X onClick={() => setActionName("")} className="cursor-pointer" />
//       </div>
//       <div className="p-4">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//             <div className="grid grid-cols-8 gap-3">
//               <FormField
//                 control={form.control}
//                 name="title"
//                 render={({ field }) => (
//                   <FormItem className="col-span-3">
//                     <FormLabel>Title</FormLabel>
//                     <FormControl className="w-full">
//                       <Input placeholder="Title" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="category"
//                 render={({ field }) => (
//                   <FormItem className="col-span-3">
//                     <FormLabel>Category</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Category" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="original_price"
//                 render={({ field }) => (
//                   <FormItem className="col-span-1">
//                     <FormLabel>Original Price</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Original Price"
//                         {...field}
//                         type="number"
//                         onChange={(e) => {
//                           field.onChange(Number(e.target.value) || 0);
//                         }}
//                         value={field.value || ""}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="new_price"
//                 render={({ field }) => (
//                   <FormItem className="col-span-1">
//                     <FormLabel>New Price</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="New Price"
//                         {...field}
//                         type="number"
//                         onChange={(e) => {
//                           field.onChange(Number(e.target.value) || 0);
//                         }}
//                         value={field.value || ""}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid grid-cols-8 gap-4">
//               <FormField
//                 control={form.control}
//                 name="size"
//                 render={({ field }) => (
//                   <FormItem className="col-span-3">
//                     <FormLabel>Size</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter size (comma separated)"
//                         {...field}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           field.onChange(
//                             value.split(",").map((color) => color.trim())
//                           );
//                         }}
//                         value={field.value.join(", ")}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="colors"
//                 render={({ field }) => (
//                   <FormItem className="col-span-3">
//                     <FormLabel>Colors</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter colors (comma separated)"
//                         {...field}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           field.onChange(
//                             value.split(",").map((color) => color.trim())
//                           );
//                         }}
//                         value={field.value.join(", ")}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="is_available"
//                 render={({ field }) => (
//                   <FormItem className="col-span-1 w-full">
//                     <FormLabel>Is Available</FormLabel>
//                     <FormControl>
//                       <Select
//                         required
//                         onValueChange={(value) =>
//                           field.onChange(value === "true")
//                         }
//                         value={field.value ? "true" : "false"}
//                       >
//                         <FormControl>
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select True/False" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="true">True</SelectItem>
//                           <SelectItem value="false">False</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="visibility"
//                 render={({ field }) => (
//                   <FormItem className="col-span-1 w-full">
//                     <FormLabel>Visibility</FormLabel>
//                     <FormControl>
//                       <Select
//                         required
//                         onValueChange={(value) =>
//                           field.onChange(value === "true")
//                         }
//                         value={field.value ? "true" : "false"}
//                       >
//                         <FormControl>
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select True/False" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="true">True</SelectItem>
//                           <SelectItem value="false">False</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid grid-cols-8 gap-4">
//               <FormField
//                 control={form.control}
//                 name="material"
//                 render={({ field }) => (
//                   <FormItem className="col-span-3">
//                     <FormLabel>Material</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter material (comma separated)"
//                         {...field}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           field.onChange(
//                             value.split(",").map((color) => color.trim())
//                           );
//                         }}
//                         value={field.value.join(", ")}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="edition"
//                 render={({ field }) => (
//                   <FormItem className="col-span-3">
//                     <FormLabel>Edition</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter edition (comma separated)"
//                         {...field}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           field.onChange(
//                             value.split(",").map((color) => color.trim())
//                           );
//                         }}
//                         value={field.value.join(", ")}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="offer"
//                 render={({ field }) => (
//                   <FormItem className="col-span-1 w-full">
//                     <FormLabel>Offer</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Offer" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="quantity"
//                 render={({ field }) => (
//                   <FormItem className="col-span-1 w-full">
//                     <FormLabel>Quantity</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Quantity"
//                         {...field}
//                         type="number"
//                         onChange={(e) => {
//                           field.onChange(Number(e.target.value) || 0);
//                         }}
//                         value={field.value || ""}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="grid grid-cols-4 gap-4">
//               <FormField
//                 control={form.control}
//                 name="features"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Features</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter features (comma separated)"
//                         {...field}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           field.onChange(
//                             value.split(",").map((color) => color.trim())
//                           );
//                         }}
//                         value={field.value.join(", ")}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="img"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Image</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Image" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="images"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Images</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter images (comma separated)"
//                         {...field}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           field.onChange(
//                             value.split(",").map((color) => color.trim())
//                           );
//                         }}
//                         value={field.value.join(", ")}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Description</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Description" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex justify-end">
//               <Button type="submit" className="cursor-pointer">
//                 {isLoading ? "Loading..." : "Submit"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </CustomModal>
//   );
// };

// export default AddProduct;
