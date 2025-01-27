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
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Skeleton } from "@/components/ui/Skeleton";
import { columns } from "../managment/column";
import { Combobox } from "@/components/ui/Combobox";
import { getUsers } from "@/helpers/users/getUsers";
import { formatUsers } from "@/helpers/users/formatUsers";

interface Props {
  data: Header[];
  isLoading: boolean;
}

export default function OrdersProcessedDataTable({ data, isLoading }: Props) {
  const [users, setUsers] = React.useState<[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "id",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: "state", value: "00" },
  ]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 6,
  });
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response?.user);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-[88%] mx-auto">
      <div className="flex flex-col md:flex-row gap-3 justify-between mb-6 xl:mr-[17rem] 2xl:mr-[35rem]">
        <Combobox
          heading={"Anfitriones"}
          selectItemMsg="Filtra por anfitriona"
          data={formatUsers(users, 4)}
          className="shadow-lg"
          onSelect={(value) =>
            table.getColumn("hostess")?.setFilterValue(value)
          }
          tabelValue={
            (table.getColumn("hostess")?.getFilterValue() as string) ?? ""
          }
          onChange={(value) =>
            table.getColumn("hostess")?.setFilterValue(value)
          }
        />
        <Combobox
          heading="Mozos"
          selectItemMsg="Filtra por mozo"
          data={formatUsers(users, 7)}
          onSelect={(value) => table.getColumn("mozo")?.setFilterValue(value)}
          className="min-w-[15rem] shadow-lg"
          tabelValue={
            (table.getColumn("mozo")?.getFilterValue() as string) ?? ""
          }
          onChange={(value) => table.getColumn("mozo")?.setFilterValue(value)}
        />
        <Input
          type="date"
          placeholder="Filter name..."
          value={
            (table.getColumn("created_at")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("created_at")?.setFilterValue(event.target.value)
          }
          className="min-w-[10] shadow-lg text-center"
        />
      </div>
      <div className="rounded-md border">
        {isLoading ? (
          <Skeleton className="w-full h-[17rem]" />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="p-0">
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-3">
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
                    colSpan={columns?.length}
                    className="h-24 text-center"
                  >
                    No hay resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
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
            Atras
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
