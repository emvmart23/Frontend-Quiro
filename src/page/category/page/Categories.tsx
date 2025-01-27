import CategoryActions from "../components/CategoryActions";
import api from "@/service";
import { useQuery } from "react-query";
import CategoryDataTable from "../components/CategoryDataTable";
import useTitle from "@/hooks/useTitle";

const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export default function Categories() {
  const { data, isLoading } = useQuery("categories", getCategories);
  useTitle("Categorias");

  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-[1.4rem] md:text-3xl font-medium">Categorias</h3>
      <CategoryActions />
      <CategoryDataTable
        data={data ? data.category : []}
        isLoading={isLoading}
      />
    </section>
  );
}
