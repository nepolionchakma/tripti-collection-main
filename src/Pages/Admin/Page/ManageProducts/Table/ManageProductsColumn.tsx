import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/types/Types";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
export const columns = (
  data: Product[],
  setData: React.Dispatch<React.SetStateAction<Product[]>>,
  setSelectedData: React.Dispatch<React.SetStateAction<Product[]>>
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        // onCheckedChange={(value) => {
        //   table.toggleAllPageRowsSelected(!!value);
        //   const selectedRows = table
        //     .getSelectedRowModel()
        //     .rows.map((row) => row.original);
        //   setSelectedData(selectedRows);
        // }}
        onCheckedChange={(value) => {
          // Toggle all page rows selected
          table.toggleAllPageRowsSelected(!!value);
          setTimeout(() => {
            const selectedRows = table
              .getSelectedRowModel()
              .rows.map((row) => row.original);
            setSelectedData(selectedRows);
          });
        }}
        aria-label="Select all"
        className="mr-2 cursor-pointer border-black"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          // console.log(row.original, "row.original");
          row.toggleSelected(!!value);
          setSelectedData((prev) => {
            if (prev.includes(row.original)) {
              return prev.filter(
                (item) => item.product_id !== row.original.product_id
              );
            } else {
              return [...prev, row.original];
            }
          });
        }}
        aria-label="Select row"
        className="mr-2 cursor-pointer border-black"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-transparent cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize w-[15rem] ">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories: string[] = row.getValue("categories");
      return <div className="capitalize">{categories.join(", ")}</div>;
    },
  },
  {
    accessorKey: "original_price",
    header: "Original Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("original_price")}</div>
    ),
  },
  {
    accessorKey: "new_price",
    header: "New Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("new_price")}</div>
    ),
  },
  {
    accessorKey: "sizes",
    header: "Sizes",
    cell: ({ row }) => {
      const sizes: string[] = row.getValue("sizes");
      console.log(sizes, "sizes");
      return <div className="capitalize">{sizes.join(", ")}</div>;
    },
  },
  {
    accessorKey: "colors",
    header: "Colors",
    cell: ({ row }) => {
      const colors: string[] = row.getValue("colors");
      return <div className="capitalize">{colors.join(", ")}</div>;
    },
  },
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => {
      const material: string[] = row.getValue("material");
      return <div className="capitalize">{material.join(", ")}</div>;
    },
  },
  {
    accessorKey: "is_available_product",
    header: "Available",
    cell: ({ row }) => {
      const is_available_product: boolean = row.getValue(
        "is_available_product"
      );
      const url = import.meta.env.VITE_API_URL;
      const handleSwitchChange = async (newValue: boolean) => {
        const updatedData = await Promise.all(
          data.map(async (item) => {
            if (item.product_id === row.original.product_id) {
              try {
                const result = await axios.put(
                  `${url}/products/update/${item.product_id}`,
                  { is_available_product: newValue }
                );
                if (result.status === 200) {
                  toast(`${result.data.message}`);
                }
              } catch (error) {
                toast.error(`${error}`);
                console.error("Error updating availability:", error);
              }
            }
            // Return the updated item
            return item.product_id === row.original.product_id
              ? { ...item, is_available_product: newValue }
              : item;
          })
        );

        setData(updatedData);
      };

      return (
        <div className="flex items-center justify-center">
          <Switch
            checked={is_available_product}
            className="cursor-pointer"
            onCheckedChange={handleSwitchChange}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "edition",
    header: "Edition",
    cell: ({ row }) => {
      const edition: string[] = row.getValue("edition");
      return <div className="capitalize">{edition.join(", ")}</div>;
    },
  },
  {
    accessorKey: "offer",
    header: "Offer",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("offer")}</div>
    ),
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => {
      const features: string[] = row.getValue("features");
      return <div className="capitalize">{features.join(", ")}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    cell: ({ row }) => {
      const visibility: boolean = row.getValue("visibility");
      const url = import.meta.env.VITE_API_URL;
      const handleSwitchChange = async (newValue: boolean) => {
        const updatedData = await Promise.all(
          data.map(async (item) => {
            if (item.product_id === row.original.product_id) {
              try {
                const result = await axios.put(
                  `${url}/products/update/${item.product_id}`,
                  { visibility: newValue }
                );
                if (result.status === 200) {
                  toast(`${result.data.message}`);
                }
              } catch (error) {
                toast.error(`${error}`);
                console.error("Error updating availability:", error);
              }
            }
            // Return the updated item
            return item.product_id === row.original.product_id
              ? { ...item, visibility: newValue }
              : item;
          })
        );

        setData(updatedData);
      };

      return (
        <div className="flex items-center justify-center">
          <Switch
            checked={visibility}
            className="cursor-pointer"
            onCheckedChange={handleSwitchChange}
          />
        </div>
      );
    },
  },
];
