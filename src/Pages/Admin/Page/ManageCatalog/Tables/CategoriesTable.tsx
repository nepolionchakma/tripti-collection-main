import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CustomModal from "@/Pages/Admin/Components/CustomModal/CustomModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";
import Spinner from "@/components/Spinner/Spinner";
import { Category } from "@/types/Types";
import { API_BASE_URL } from "@/api/config";
export const columns = (
  setSelectedData: React.Dispatch<React.SetStateAction<Category[]>>
): ColumnDef<Category>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="cursor-pointer border-amber-500"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
          setTimeout(() => {
            const selectedRows = table
              .getSelectedRowModel()
              .rows.map((row) => row.original);
            setSelectedData(selectedRows);
          });
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="cursor-pointer"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          setSelectedData((prev) => {
            if (prev.includes(row.original)) {
              return prev.filter(
                (item) => item.category_id !== row.original.category_id
              );
            } else {
              return [...prev, row.original];
            }
          });
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category_name",
    header: "Category Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category_name")}</div>
    ),
  },
];
export function CategoriesTable() {
  const url = API_BASE_URL;
  const [selectedData, setSelectedData] = React.useState<Category[]>([]);
  const [data, setData] = React.useState<Category[]>([]);
  const [actionName, setActionName] = React.useState("");
  const [changeState, setChangeState] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns: columns(setSelectedData),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${url}/api/products/categories`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [changeState, url]);

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(`${url}/api/products/categories/create`, {
        category_name: inputValue,
      })
      .then((res) => {
        toast(res.data.message);
        setActionName("");
        setSelectedData([]);
        table.toggleAllPageRowsSelected(false);
      })
      .catch((err) => {
        toast(err.response.data.message);
      })
      .finally(() => {
        setInputValue("");
        setIsLoading(false);
        setChangeState(() => Math.random() + 1000 * 100);
      });
  };

  const handleEditCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .put(
        `${url}/api/products/categories/update/${selectedData[0].category_id}`,
        {
          category_name: inputValue,
        }
      )
      .then((res) => {
        toast(res.data.message);
        setActionName("");
        setSelectedData([]);
        table.toggleAllPageRowsSelected(false);
      })
      .catch((err) => {
        toast(err.response.data.message);
      })
      .finally(() => {
        setInputValue("");
        setIsLoading(false);
        setChangeState(() => Math.random() + 1000 * 100);
      });
  };

  const handleDeleteCategory = async () => {
    try {
      setIsLoading(true);
      const ids = selectedData.map((item) => item.category_id);
      await axios
        .delete(`${url}/api/products/categories/delete`, {
          data: ids,
        })
        .then((res) => {
          toast(res.data.message);
          setActionName("");
          setSelectedData([]);
          table.toggleAllPageRowsSelected(false);
        })
        .catch((err) => {
          toast(err.response.data.message);
        })
        .finally(() => {
          setInputValue("");
          setIsLoading(false);
          setChangeState(() => Math.random() + 1000 * 100);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseModal = () => {
    setActionName("");
    setInputValue("");
    // setSelectedData([]);
    // table.toggleAllPageRowsSelected(false);
  };
  return (
    <div className="w-full">
      {/* Action Modal*/}
      {actionName === "add" ? (
        <CustomModal className="w-[40%] scrollbar-thin">
          <div className="flex items-center justify-between bg-amber-300 py-0.5 px-1 sticky top-0">
            <h1 className="font-semibold">Add Category</h1>
            <X onClick={handleCloseModal} className="cursor-pointer" />
          </div>
          <form
            action=""
            onSubmit={handleAddCategory}
            className="flex items-center gap-2 p-2"
          >
            <Input
              autoFocus
              placeholder="Category Name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer"
            >
              Save
            </Button>
          </form>
        </CustomModal>
      ) : (
        actionName === "edit" && (
          <CustomModal className="w-[40%] scrollbar-thin">
            <div className="flex items-center justify-between bg-amber-300 py-0.5 px-1 sticky top-0">
              <h1 className="font-semibold">Edit Category</h1>
              <X onClick={handleCloseModal} className="cursor-pointer" />
            </div>
            <form
              action=""
              onSubmit={handleEditCategory}
              className="flex items-center gap-2 p-2"
            >
              <Input
                autoFocus
                placeholder="Category Name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer"
              >
                Save
              </Button>
            </form>
          </CustomModal>
        )
      )}
      {/* Table Header */}
      <div className="flex items-center py-1 gap-2">
        <div className="flex gap-2 px-2 py-1.5 w-full border rounded-md">
          <button
            onClick={() => setActionName("add")}
            className="cursor-pointer"
          >
            <Plus />
          </button>
          <button disabled={selectedData.length !== 1}>
            <Edit
              onClick={() => {
                setActionName("edit");
                setInputValue(selectedData[0].category_name);
              }}
              className={`${
                selectedData.length !== 1
                  ? "cursor-not-allowed text-slate-300"
                  : "cursor-pointer text-black"
              }`}
            />
          </button>
          <AlertDialog>
            <AlertDialogTrigger
              disabled={selectedData.length === 0}
              className="flex items-center"
            >
              <Trash
                className={`${
                  selectedData.length === 0
                    ? "cursor-not-allowed text-slate-300"
                    : "cursor-pointer text-black"
                }`}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteCategory}
                  className="cursor-pointer"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="rounded-md border max-h-[calc(35.2vh)] overflow-y-auto scrollbar-thin">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-amber-200">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center h-30">
                  <Spinner size="40" color="orange" speed="1.75" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
}
