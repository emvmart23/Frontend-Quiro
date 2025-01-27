import NoteSaleDataTable from "../components/NoteSaleDataTable";
import useTitle from "@/hooks/useTitle";
import { useHeaders } from "@/hooks/useHeaders";

export default function Boxes() {
  const { data, isLoading } = useHeaders();
  useTitle("Cobranza");

  const formatHeader = (data ? data?.header : [])?.map((header: Header) => {
    const order = header?.orders.find((order) => order);
    return {
      ...header,
      hostess_id: order?.hostess_id,
      total_price: order?.total_price,
      hostess: order?.hostess,
    };
  });

  return (
    <section className="flex flex-col gap-8 w-full">
      <h1 className="text-[1.4rem] md:text-3xl font-medium">Cobranza</h1>
      <NoteSaleDataTable data={formatHeader} isLoading={isLoading} />
    </section>
  );
}
