import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Edit, Plus, Trash } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns as getColumns } from "./ManageProductsColumn";
import { Product } from "@/types/Types";
import Pagination from "@/components/Pagination/Pagination";
import axios from "axios";
import Spinner from "@/components/Spinner/Spinner";
import { useAdminContext } from "@/Pages/Admin/Contexts/Admin/AdminContext";
import AddAndEditProduct from "@/Pages/Admin/Components/Product/AddAndEditProduct";
import { toast } from "sonner";

export function ManageProductsTable() {
  const url = import.meta.env.VITE_API_URL;
  const { changeState, setChangeState } = useAdminContext();
  const [data, setData] = React.useState<Product[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPageNumbers, setTotalPageNumbers] = React.useState(1);
  const limit = 10;
  const [isLoading, setIsLoading] = React.useState(false);
  const [actionName, setActionName] = React.useState("");
  const [selectedData, setSelectedData] = React.useState<Product[] | []>([]);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios(
          `${url}/products/lazyloading/${page}/${limit}`
        );
        setData(response.data.result);
        setPage(response.data.page);
        setTotalPageNumbers(response.data.totalPageNumbers);
        table.toggleAllRowsSelected(false);
        setSelectedData([]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [page, url, changeState]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: getColumns(data, setData, setSelectedData),
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
  console.log(selectedData, "selectedData");
  const hiddenColumns = [
    "original_price",
    "new_price",
    "edition",
    "offer",
    "features",
    "description",
    "material",
  ];

  React.useEffect(() => {
    table.getAllColumns().forEach((column) => {
      if (hiddenColumns.includes(column.id)) {
        column.toggleVisibility(false);
      }
    });
  }, [table]);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      selectedData.forEach(async (item) => {
        const res = await axios.delete(
          `${url}/products/delete/${item.product_id}`
        );
        if (res.status === 200) {
          toast(`${res.data.message}`);
          setChangeState(() => Math.random() + 1000 * 100);
          table.toggleAllRowsSelected(false);
          setSelectedData([]);
        }
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {/* Action Modal*/}
      {actionName === "add" ? (
        <AddAndEditProduct setActionName={setActionName} />
      ) : (
        actionName === "edit" && (
          <AddAndEditProduct
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            setActionName={setActionName}
          />
        )
      )}
      {/* Table Header */}
      <div className="flex items-center py-4 gap-2">
        <div className="flex gap-2 px-2 py-1.5 border rounded-md">
          <button
            onClick={() => setActionName("add")}
            className="cursor-pointer"
          >
            <Plus />
          </button>
          <button disabled={selectedData.length !== 1}>
            <Edit
              onClick={() => setActionName("edit")}
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
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Input
          placeholder="Filter title..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-72 overflow-y-auto">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="border border-black bg-amber-400"
                    >
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
                <TableCell colSpan={10} className="h-64 text-center">
                  <Spinner size="100" color="orange" speed="1.75" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border border-black">
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
                <TableCell
                  colSpan={getColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between p-1">
        <div className="flex-1 text-sm text-gray-600">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          totalPageNumbers={totalPageNumbers}
        />
      </div>
    </div>
  );
}
