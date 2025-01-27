import { useState } from "react";
import { getAttendance } from "@/helpers/getAttendance";
import { getHeaders } from "@/helpers/getHeaders";
import { ReportHostessDataTable } from "../components/index";
import ReportHostessActions from "../components/ReportHostessActions";
import { ColumnFiltersState } from "@tanstack/react-table";
import { getValueOfColumnsFilter } from "@/lib/utils/getValueOfColumnFilters";
import { useQueries } from "react-query";
import { useBoxes } from "@/hooks/useBoxes";

export interface TotalNotSale {
  hostess_id: number;
  total_price: number;
}

// gets salary of hostess
export const currentSale = (array: TotalNotSale[], id: number) =>
  array?.reduce((acc, curr) => {
    if (curr.hostess_id === id) {
      acc = acc + Number(curr.total_price);
    }
    return acc;
  }, 0);

export default function ReportHostess() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const queries = useQueries([
    { queryKey: ["headInHostess"], queryFn: getAttendance },
    { queryKey: ["attendanceInHotess"], queryFn: getHeaders },
  ]);
  const [{ data: allAttendances, isLoading }, { data: allNoteDetails }] =
    queries;
  const { data: allBoxes } = useBoxes();

  const lastId = (allBoxes ? allBoxes.boxes : []).reduceRight(
    (maxId: number, box: Box) => Math.max(maxId, box.id),
    0
  );
  const lastBox = (allBoxes ? allBoxes.boxes : []).find(
    (box: Box) => box.id === lastId
  );

  const presentUsers: ReportHostess[] = (
    allAttendances ? allAttendances?.attendances : []
  )
    ?.filter(
      (hostess: Attendace) =>
        !!hostess.present === true &&
        hostess.box_date ===
          (getValueOfColumnsFilter(columnFilters, "box_date") ??
            lastBox?.opening) &&
        (hostess.role_user === 4 || hostess.role_user === 8)
    )
    .map((d: Attendace) => {
      const e = currentSale(
        allNoteDetails?.header
          .filter(
            (note: Header) =>
              note.box_date ===
                (getValueOfColumnsFilter(columnFilters, "box_date") ??
                  lastBox?.opening) &&
              !!note.state_doc == false &&
              note.state_doc !== null
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

      return {
        hostess: d.user,
        salary: d.salary,
        hostess_role: d.role_user,
        profit_margin: d.profit_margin,
        currentSale: e,
        comission: comission,
        total: Number(d.salary) + comission,
        box_date: d.box_date,
      };
    });

  const handleExportToBothDocuments = presentUsers.filter(
    (pdf) =>
      pdf.hostess_role ===
      Number(getValueOfColumnsFilter(columnFilters, "hostess_role"))
  );

  return (
    <section className="flex flex-col gap-y-6 md:w-[95%] mx-auto">
      <h1 className="text-[1.4rem] md:text-2xl font-medium">
        Reporte de anfitrionas
      </h1>
      <ReportHostessDataTable
        data={presentUsers}
        isLoading={isLoading}
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
      />
      <ReportHostessActions
        data={
          handleExportToBothDocuments.length <= 0
            ? presentUsers
            : handleExportToBothDocuments
        }
      />
    </section>
  );
}
