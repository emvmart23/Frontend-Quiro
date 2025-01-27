import UserActions from "../components/UserActions";
import { useQuery } from "react-query";
import UserDataTable from "../components/UserDataTable";
import { getUsers } from "@/helpers/users/getUsers";

export default function Users() {
  const { data, isLoading } = useQuery("users", getUsers);
  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-[1.4rem] md:text-3xl font-medium">Usuarios</h3>
      <UserActions />
      <UserDataTable data={data ? data.user : []} isLoading={isLoading} />
    </section>
  );
}
