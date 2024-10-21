import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/Dialog";
import OtherDetails from "../OtherDetails";
import { useState } from "react";

export const columns: ColumnDef<OtherExpenses>[] = [
  {
    accessorKey: "count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cantidad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("count")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "unit_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unidad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("unit_name")}</div>;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("total")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setIsOpen] = useState(false);
      return (
        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Ver</Button>
          </DialogTrigger>
          <OtherDetails data={data} setIsOpen={setIsOpen} />
        </Dialog>
      );
    },
  },
  {
    accessorKey: "box_date",
    header: () => {
      return <Button className="invisible" />;
    },
    cell: ({ row }) => (
      <div className="invisible">{row.getValue("box_date")}</div>
    ),
  },
];
