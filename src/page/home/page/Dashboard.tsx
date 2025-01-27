import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { queryConfig } from "@/helpers/getQueryConfig";
import { getBoxes } from "@/helpers/getBoxes";
import { getAttendance } from "@/helpers/getAttendance";
import { useQueries } from "react-query";
import { BringToFront, ShoppingBag, Users } from "lucide-react";
import { getOtherExpenses } from "@/helpers/getOtherExpenses";
import { getHeaders } from "@/helpers/getHeaders";
import Overview from "../components/Overview/index";
import { RecentSales } from "../components/RecentSales";
import useTitle from "@/hooks/useTitle";
import { getUsers } from "@/helpers/users/getUsers";

export default function Dashboard() {
  const queries = useQueries([
    { queryKey: ["boxInHome"], queryFn: getBoxes, ...queryConfig },
    { queryKey: ["attendInHome"], queryFn: getAttendance, ...queryConfig },
    { queryKey: ["otherInHome"], queryFn: getOtherExpenses, ...queryConfig },
    { queryKey: ["headInHome"], queryFn: getHeaders, ...queryConfig },
    { queryKey: ["usersInHome"], queryFn: getUsers, ...queryConfig },
  ]);

  const [
    { data: allBoxes },
    { data: allAttendances },
    { data: allOthers },
    { data: allHeaders },
    { data: allUsers },
  ] = queries;

  const lastId = (allBoxes ? allBoxes.boxes : []).reduceRight(
    (maxId: number, box: Box) => Math.max(maxId, box.id),
    0
  );

  const lastBox: Box = (allBoxes ? allBoxes.boxes : [])?.find(
    (box: Box) => box.id === lastId
  );

  const totalAttendance: Attendace[] = (
    allAttendances ? allAttendances?.attendances : []
  )?.filter(
    (atend: Attendace) =>
      atend.box_date === lastBox?.opening && Number(atend.present) === 1
  ).length;

  const getTotalOfExpenses = (allOthers ? allOthers.others : [])
    ?.filter((other: OtherExpenses) => other?.box_date === lastBox?.opening)
    ?.reduce((total: number, curr: OtherExpenses) => total + curr?.total, 0);

  const pendingOrders = (state: number) =>
    (allHeaders ? allHeaders.header : [])?.filter(
      (head: Header) =>
        head.box_date === lastBox?.opening && head.state_doc === state
    );

  const lastFiveBoxes = (allBoxes ? allBoxes.boxes : []).slice(
    allBoxes?.boxes?.length - 5
  );

  const data = [
    {
      title: "Usuarios asistidos",
      total: totalAttendance ?? 0,
      description:
        "Número de usuarios atendidos hoy, importante para evaluar la atención y flujo de clientes en el local.",
      icon: <Users />,
    },
    {
      title: "Numero de usuarios",
      total: allUsers?.user.length ?? 0,
      description:
        "La aplicacion esta siendo utilizada y puede soportar multiples ordenes y pedidos al mismo tiempo.",
    },
    {
      title: "Notas pendientes",
      total: pendingOrders(1).length ?? 0,
      description:
        "Si existe notas de venta pendientes no podras continuar con una nueva caja",
      icon: <ShoppingBag />,
    },
    {
      title: "Otros gastos",
      total: getTotalOfExpenses ?? 0,
      description: "Gastos fuera de lo planeado dependiendo de lo solicitado",
      icon: <BringToFront />,
    },
  ];

  useTitle("Dashboard");

  return (
    <section className="">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-28">
        {data.map((d, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{d.title}</CardTitle>
              {d.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{d.total}</div>
              <p className="text-xs text-muted-foreground">{d.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Cajas mas recientes</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview lastFiveBoxes={lastFiveBoxes} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Ventas recientes</CardTitle>
            <CardDescription>Tienes 5 ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales pendingOrders={pendingOrders(0)} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
