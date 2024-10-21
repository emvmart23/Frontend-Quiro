import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useCallback, useEffect, useMemo } from "react";

interface Props {
  nameMethods: MethodPayment[];
  totalWihoutAlcohol: Method | null;
  setExpensesWithoutAlcohol: (value: number) => void;
  expensesWithoutAlcohol: number;
  orders: {
    mozo: string;
    Credito: number;
    Efectivo: number;
    Tarjeta: number;
    Yape: number;
    Plin: number;
  }[];
}

export default function DataTableWithoutAlcohol({
  nameMethods,
  orders,
  totalWihoutAlcohol,
  setExpensesWithoutAlcohol,
  expensesWithoutAlcohol,
}: Props) {
  const totalOfAllMozos = useMemo(() => {
    if (!totalWihoutAlcohol) return 0;
    return Object.values(totalWihoutAlcohol).reduce((a, b) => a + b, 0);
  }, [totalWihoutAlcohol]);

  const updateExpensesWithAlcohol = useCallback(() => {
    setExpensesWithoutAlcohol(totalOfAllMozos);
  }, [setExpensesWithoutAlcohol, totalOfAllMozos]);

  useEffect(() => {
    updateExpensesWithAlcohol();
  }, [updateExpensesWithAlcohol]);

  return (
    <div className="overflow-y-auto h-44">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Mozo</TableHead>
            {nameMethods?.map(({ name, id }) => (
              <TableHead key={id}>{name}</TableHead>
            ))}
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.length === 0 ? (
            <TableRow>
              <TableCell className="text-center" colSpan={7}>No hay pedidos sin alcohol</TableCell>
            </TableRow>
          ) : (
            orders?.map((order, index: number) => {
              const total =
                order?.Efectivo +
                order?.Credito +
                order?.Tarjeta +
                order?.Yape +
                order?.Plin;
              return (
                <TableRow key={index}>
                  <TableCell>{order?.mozo}</TableCell>
                  <TableCell>{order?.Efectivo}</TableCell>
                  <TableCell>{order?.Tarjeta}</TableCell>
                  <TableCell>{order?.Yape}</TableCell>
                  <TableCell>{order?.Plin}</TableCell>
                  <TableCell>{order?.Credito}</TableCell>
                  <TableCell>{total}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total de ventas</TableCell>
            <TableCell className="text-righ">
              {totalWihoutAlcohol?.Efectivo}
            </TableCell>
            <TableCell className="text-righ">
              {totalWihoutAlcohol?.Tarjeta}
            </TableCell>
            <TableCell className="text-righ">
              {totalWihoutAlcohol?.Yape}
            </TableCell>
            <TableCell className="text-righ">
              {totalWihoutAlcohol?.Plin}
            </TableCell>
            <TableCell className="text-righ">
              {totalWihoutAlcohol?.Credito}
            </TableCell>
            <TableCell className="text-righ">
              {expensesWithoutAlcohol}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
