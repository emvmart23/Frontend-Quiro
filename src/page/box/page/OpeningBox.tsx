import BoxActions from "../components/OpeningBoxActions";
import OpeningBoxDataTable from "../components/OpeningBoxDataTable";
import useTitle from "@/hooks/useTitle";
import { useBoxes } from "@/hooks/useBoxes";

export default function OpeningBoxes() {
  const { data, isLoading } = useBoxes();
  useTitle("Apertura de cajas");

  return (
    <section className="flex flex-col gap-8 w-full">
      <h1 className="text-[1.4rem] md:text-3xl font-medium">
        Apertura de cajas
      </h1>
      <BoxActions />
      <OpeningBoxDataTable
        data={data ? data?.boxes : []}
        isLoading={isLoading}
      />
    </section>
  );
}
