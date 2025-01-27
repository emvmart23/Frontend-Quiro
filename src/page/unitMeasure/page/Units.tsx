import api from "@/service";
import { useQuery } from "react-query";
import UnitActions from "../components/UnitActions";
import UnitDataTable from "../components/UnitDataTable";

const getUnits = async () => {
    const  { data } = await api.get("/unit_measures");
    return data;
} 

export default function Units() {
    const {data, isLoading} = useQuery("units", getUnits)

  return (
    <section className="flex flex-col gap-8 w-full">
        <h3 className="text-[1.4rem] md:text-3xl font-medium">Unidades de medida</h3>
        <div>
          <UnitActions />
        </div>
        <UnitDataTable data={data ? data.unit : []} isLoading={isLoading} />
    </section>
  )
}