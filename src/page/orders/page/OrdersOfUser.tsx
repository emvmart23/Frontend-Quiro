import { OrdersOfUserDataTable } from "../components/OrdersOfUserDataTable";
import { useAuth } from "@/hooks/useAuth";
import useTitle from "@/hooks/useTitle";
import { useHeaders } from "@/hooks/useHeaders";
import { useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { getValueOfColumnsFilter } from "@/lib/utils/getValueOfColumnFilters";
import { useBoxes } from "@/hooks/useBoxes";

export default function OrdersOfUser() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, isLoading } = useHeaders();
  const { data: allBoxes } = useBoxes();
  const { user } = useAuth();

  useTitle("Lista de pedidos");

  const lastId = (allBoxes ? allBoxes.boxes : []).reduceRight(
    (maxId: number, box: Box) => Math.max(maxId, box.id),
    0
  );
  const lastBox = (allBoxes ? allBoxes.boxes : []).find(
    (box: Box) => box.id === lastId
  );

  const ordersOfCurrentUser: Header[] = (data ? data.header : [])
    .filter(
      (head: Header) =>
        head.current_user === user?.id &&
        head.box_date ===
          (getValueOfColumnsFilter(columnFilters, "box_date") ??
            lastBox?.opening)
    )
    .map((header: Header) => {
      const order = header.orders.find((order) => order);
      return {
        ...header,
        hostess: order?.hostess,
      };
    });

  return (
    <section className="flex flex-col gap-8 w-full">
      <h1 className="text-3xl font-medium">Lista de pedidos</h1>
      <OrdersOfUserDataTable
        data={ordersOfCurrentUser}
        isLoading={isLoading}
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
      />
    </section>
  );
}
