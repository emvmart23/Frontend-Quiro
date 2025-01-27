import OrdersProcessedDataTable from "../components/OrdersProcessedTable";
import useTitle from "@/hooks/useTitle";
import { useHeaders } from "@/hooks/useHeaders";

export default function OrdersProcessed() {
  const { data, isLoading } = useHeaders()
  useTitle("Pedidos atendidos");

  const dataHeaders = (data ? data?.header : [])?.filter(
    (head: Header) => head.state_doc !== null
  );

  const format = dataHeaders?.map((item: Header) => {
    const order = item.orders?.find((order) => order);
    return {
      ...item,
      hostess_id: order?.hostess_id,
      hostess: order?.hostess,
    };
  });

  return (
    <section className="flex flex-col gap-12 w-full">
      <h1 className="text-[1.4rem] md:text-3xl font-medium">Pedidos atendidos</h1>
      <OrdersProcessedDataTable data={format ?? []} isLoading={isLoading} />
    </section>
  );
}
