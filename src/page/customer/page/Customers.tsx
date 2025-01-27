import { useQuery } from "react-query";
import CustomerActions from "../components/CustomerActions";
import CustomerDataTable from "../components/CustomerDataTable";
import { getCustomer } from "@/helpers/getCustomer";
import useTitle from "@/hooks/useTitle";

export default function Customers() {
  const { data, isLoading } = useQuery("customers", getCustomer);
  useTitle("Clientes");

  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-[1.4rem] md:text-3xl font-medium">Clientes</h3>
      <CustomerActions />
      <CustomerDataTable
        data={data ? data.customer : []}
        isLoading={isLoading}
      />
    </section>
  );
}
