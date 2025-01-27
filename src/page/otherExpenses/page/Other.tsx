import { useQueries } from "react-query";
import useTitle from "@/hooks/useTitle";
import OtherExpensesAction from "../components/OtherExpensesAction";
import { getOtherExpenses } from "@/helpers/getOtherExpenses";
import OtherDataTable from "../components/OtherDataTable";
import { queryConfig } from "@/helpers/getQueryConfig";
import { useBoxes } from "@/hooks/useBoxes";

export default function Other() {
  const queries = useQueries([
    { queryKey: ["o"], queryFn: getOtherExpenses, ...queryConfig },
  ]);
  const [{ data: allOther, isLoading }] = queries;
  const { data: allBoxes } = useBoxes();

  const lastId = (allBoxes ? allBoxes.boxes : []).reduceRight(
    (maxId: number, box: Box) => Math.max(maxId, box.id),
    0
  );

  const lastBox = (allBoxes ? allBoxes.boxes : []).find(
    (box: Box) => box.id === lastId
  );
  useTitle("Productos");

  return (
    <section className="flex flex-col gap-8 w-full mx-auto">
      <h1 className="text-[1.4rem] md:text-3xl font-medium">Otros gastos</h1>
      <OtherExpensesAction />
      <OtherDataTable
        data={allOther ? allOther?.others : []}
        isLoading={isLoading}
        lastBox={lastBox}
      />
    </section>
  );
}
