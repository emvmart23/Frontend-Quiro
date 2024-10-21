import { useQueries } from "react-query";
import useTitle from "@/hooks/useTitle";
import OtherExpensesAction from "../components/OtherExpensesAction";
import { getOtherExpenses } from "@/helpers/getOtherExpenses";
import OtherDataTable from "../components/OtherDataTable";
import { queryConfig } from "@/helpers/getQueryConfig";

export default function Other() {
  const queries = useQueries([
    { queryKey: ["o"], queryFn: getOtherExpenses, ...queryConfig },
  ]);

  const [{ data: allOther, isLoading }] = queries;

  useTitle("Productos");

  return (
    <section className="flex flex-col gap-8 w-full mx-auto">
      <h1 className="text-[1.4rem] md:text-3xl font-medium">Otros gastos</h1>
      <OtherExpensesAction />
      <OtherDataTable
        data={allOther ? allOther?.others : []}
        isLoading={isLoading}
      />
    </section>
  );
}
