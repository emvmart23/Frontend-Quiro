import { CardDetails } from "../components/index";
import useTitle from "@/hooks/useTitle";
import { useHeaders } from "@/hooks/useHeaders";

export default function OrderHandling() {
  const { data } = useHeaders();

  useTitle("Pedidos")
  
  const orderActives = (data ? data?.header : [])?.filter(
    (data: Header) => data.state === 1 && data.state_doc !== null
  );
console.log('orderActives',orderActives)
  return (
    <section>
      <h1 className="text-[1.5rem] mb-8">Pedidos</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-y-8">
        {orderActives?.map((header: Header, index:number) => (
          <CardDetails key={index} data={header} />
        ))}
      </div>
    </section>
  );
}
