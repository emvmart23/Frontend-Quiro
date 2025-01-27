import { CardDetails } from "../components/index";
import useTitle from "@/hooks/useTitle";
import { useHeaders } from "@/hooks/useHeaders";
import { ShoppingCart } from "lucide-react";

export default function OrderHandling() {
  const { data } = useHeaders();
  useTitle("Pedidos");
  const orderActives = (data ? data?.header : [])?.filter(
    (data: Header) => data.state === 1 && data.state_doc !== null
  );

  return (
    <section className="w-full">
      <h1 className="text-[1.4rem] md:text-3xl font-medium w-full">Pedidos</h1>
      {orderActives.length === 0 ? (
        <div className="flex flex-col w-[40%] items-center mx-auto gap-8 mt-40">
          <ShoppingCart className="min-h-[8rem] min-w-[8rem]" />
          <span className="font-semibold text-sm md:text-lg w-64 text-center">
            Aún no se han realizado pedidos
          </span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-y-8 mt-16">
          {orderActives?.map((header: Header, index: number) => (
            <CardDetails key={index} data={header} />
          ))}
        </div>
      )}
    </section>
  );
}
