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
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="mr-2 cursor-pointer"
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
              return prev.filter((item) => item.id !== row.original.id);
            } else {
              return [...prev, row.original];
            }
          });
        }}
        aria-label="Select row"
        className="mr-2 cursor-pointer"
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
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
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
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const size: string[] = row.getValue("size");
      return <div className="capitalize">{size.join(", ")}</div>;
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
    accessorKey: "is_available",
    header: "Available",
    cell: ({ row }) => {
      const is_available: boolean = row.getValue("is_available");
      const url = import.meta.env.VITE_API_URL;
      const handleSwitchChange = async (newValue: boolean) => {
        const updatedData = await Promise.all(
          data.map(async (item) => {
            if (item.id === row.original.id) {
              try {
                const result = await axios.put(
                  `${url}/products/update/${item.id}`,
                  { is_available: newValue }
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
            return item.id === row.original.id
              ? { ...item, is_available: newValue }
              : item;
          })
        );

        setData(updatedData);
      };

      return (
        <div className="flex items-center justify-center">
          <Switch
            checked={is_available}
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
            if (item.id === row.original.id) {
              try {
                const result = await axios.put(
                  `${url}/products/update/${item.id}`,
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
            return item.id === row.original.id
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
