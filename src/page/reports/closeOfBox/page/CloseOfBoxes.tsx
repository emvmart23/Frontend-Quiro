import { getBoxes } from "@/helpers/getBoxes";
import {
  DataTableWithAlcohol,
  DataTableWithoutAlcohol,
} from "../components/index";
import { getOrders } from "@/helpers/getOrders";
import { useQueries } from "react-query";
import { useEffect, useState } from "react";
import { currentSale, TotalNotSale } from "../../hostess/page/ReportHostess";
import { getAttendance } from "@/helpers/getAttendance";
import { getHeaders } from "@/helpers/getHeaders";
import TotalExpensesTable from "../components/TotalExpensesTable";
import TotalCurrentSale from "../components/TotalCurrentSale";
import { getOtherExpenses } from "@/helpers/getOtherExpenses";
import { getTotalOfMethods } from "@/helpers/getTotalOfMethods";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfBox from "../Pdf";
import { Button } from "@/components/ui/Button";
import { getMethodPayments } from "@/helpers/getMethodPayments";
import { queryConfig } from "@/helpers/getQueryConfig";

export default function CloseOfBoxes() {
  const queries = useQueries([
    { queryKey: ["orders"], queryFn: getOrders, 
      ...queryConfig,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    staleTime: 1000,
    retry: 3,
    retryDelay: 4000,
    } ,
    { queryKey: ["box"], queryFn: getBoxes, ...queryConfig },
    { queryKey: ["attend"], queryFn: getAttendance, ...queryConfig },
    { queryKey: ["head"], queryFn: getHeaders, ...queryConfig },
    { queryKey: ["otherInBox"], queryFn: getOtherExpenses, ...queryConfig },
    { queryKey: ["methods"], queryFn: getMethodPayments, ...queryConfig },
  ]);

  const [
    { data: allOrders },
    { data: allBoxes },
    { data: allAttendances },
    { data: noteDetails },
    { data: allOthers },
    { data: allMethods },
  ] = queries;

  const [totalSalary, setTotalSalary] = useState(0);
  const [expensesWithAlcohol, setExpensesWithAlcohol] = useState(0);
  const [expensesWithoutAlcohol, setExpensesWithoutAlcohol] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const lastId = (allBoxes ? allBoxes.boxes : []).reduceRight(
    (maxId: number, box: Box) => Math.max(maxId, box.id),
    0
  );

  const lastBox: Box = (allBoxes ? allBoxes.boxes : [])?.find(
    (box: Box) => box.id === lastId
  );

  const withOrders =
    Boolean(lastBox?.state) == true
      ? allOrders
        ? allOrders?.alcoholOrders
        : []
      : [];

  const withoutOrders =
    Boolean(lastBox?.state) == true
      ? allOrders
        ? allOrders?.nonAlcoholOrders
        : []
      : [];

  const getTotalOfExpenses = (allOthers ? allOthers.others : [])
    ?.filter((other: OtherExpenses) => other?.box_date === lastBox?.opening)
    ?.reduce((total: number, curr: OtherExpenses) => total + curr?.total, 0);
  
  const presentUsers: { total: number }[] = (
    allAttendances ? allAttendances?.attendances : []
  )
    ?.filter(
      (hostess: Attendace) =>
        !!hostess?.present === true &&
        hostess?.box_date === lastBox?.opening &&
        (hostess?.role_user === 4 || hostess?.role_user === 8)
    )
    .map((d: Attendace) => {
      const e = currentSale(
        noteDetails?.header
          ?.filter(
            (note: Header) =>
              note?.box_date === lastBox?.opening && note?.state_doc === 0 && note.state_doc !== null
          )
          .map((order: Header) => {
            const orders = order.orders.find((or) => or);
            return {
              hostess_id: orders?.hostess_id,
              total_price: orders?.total_price,
            };
          }) as TotalNotSale[],
        d.user_id
      );
      const comission = e * (d.profit_margin / 100);

      return { total: Number(d.salary) + comission };
    });

  const totalWihtAlcohol = getTotalOfMethods(
    allOrders ? allOrders?.alcoholOrders : []
  );

  const totalWihoutAlcohol = getTotalOfMethods(
    allOrders ? allOrders?.nonAlcoholOrders : []
  );

  useEffect(() => {
    const totalSalary = presentUsers?.reduce(
      (total, hostess) => total + hostess.total,
      0
    );
    setTotalSalary(totalSalary);
  }, [presentUsers]);

  return (
    <section className="mr-4">
      <h1 className="text-[1.4rem] md:text-2xl font-medium mb-5">
        Reporte de cierre de cajas
      </h1>
      <div className="w-full md:[75%] lg:w-full space-y-10 relative">
        <PDFDownloadLink
          document={
            <PdfBox
              lastBox={lastBox}
              withOrder={withOrders}
              withoutOrder={withoutOrders}
              totalSalary={totalSalary}
              getTotalOfExpenses={getTotalOfExpenses}
              nameMethods={allMethods ? allMethods.method : []}
              totalWihtAlcohol={totalWihtAlcohol ?? null}
              totalWihoutAlcohol={totalWihoutAlcohol ?? null}
              expensesWithAlcohol={expensesWithAlcohol ?? 0}
              expensesWithoutAlcohol={expensesWithoutAlcohol ?? 0}
            />
          }
          fileName="cajas.pdf"
        >
          {() => (
            <Button className="w-32 absolute right-0 mb-2">
              Generar reporte
            </Button>
          )}
        </PDFDownloadLink>
        <div className="flex-col xl:flex-row 2xl:flex space-y-12 xl:space-y-0 2xl:space-x-20 pt-14">
          <div>
            <h2 className="font-semibold text-lg mb-3">Ventas con alcohol</h2>
            <DataTableWithAlcohol
              setExpensesWithAlcohol={setExpensesWithAlcohol}
              expensesWithAlcohol={expensesWithAlcohol}
              totalWihtAlcohol={
                Boolean(lastBox?.state) == true ? totalWihtAlcohol : null
              }
              orders={withOrders}
              nameMethods={allMethods ? allMethods.method : []}
            />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-3">Ventas sin alcohol</h2>
            <DataTableWithoutAlcohol
              setExpensesWithoutAlcohol={setExpensesWithoutAlcohol}
              expensesWithoutAlcohol={expensesWithoutAlcohol}
              totalWihoutAlcohol={
                Boolean(lastBox?.state) == true ? totalWihoutAlcohol : null
              }
              orders={withoutOrders}
              nameMethods={allMethods ? allMethods.method : []}
            />
          </div>
        </div>
        <TotalExpensesTable
          lastBox={lastBox}
          totalSalary={totalSalary}
          otherExpenses={getTotalOfExpenses}
          setTotalExpenses={setTotalExpenses}
          totalExpenses={totalExpenses}
        />
        <TotalCurrentSale
          lastBox={lastBox}
          expensesWithAlcohol={expensesWithAlcohol}
          expensesWithoutAlcohol={expensesWithoutAlcohol}
          totalExpenses={totalExpenses}
        />
      </div>
    </section>
  );
}
