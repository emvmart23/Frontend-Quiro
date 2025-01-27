import { getAttendance } from "@/helpers/getAttendance";
import AttendanceActions from "../AttendaceActions";
import AttendanceDataTable from "../AttendaceDataTable";
import { useQuery } from "react-query";
import useTitle from "@/hooks/useTitle";
import { useBoxes } from "@/hooks/useBoxes";
import { getValueOfColumnsFilter } from "@/lib/utils/getValueOfColumnFilters";
import { useState } from "react";
import { ColumnFiltersState } from "@tanstack/react-table";

export default function Attendance() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data, isLoading } = useQuery("Attendance", getAttendance);
  const { data: allBoxes } = useBoxes();

  const lastId = (allBoxes ? allBoxes.boxes : []).reduceRight(
    (maxId: number, box: Box) => Math.max(maxId, box.id),
    0
  );

  const lastBox = (allBoxes ? allBoxes.boxes : []).find(
    (box: Box) => box.id === lastId
  );

  const currentAttendance = (data ? data.attendances : []).filter(
    (a: Attendace) =>
      a.box_date ===
      (getValueOfColumnsFilter(columnFilters, "box_date") ?? lastBox?.opening)
  );

  useTitle("Asistencia");

  return (
    <section className="flex flex-col gap-8 w-full">
      <h3 className="text-[1.4rem] md:text-3xl font-medium">Asistencias</h3>
      <AttendanceActions />
      <AttendanceDataTable
        data={currentAttendance}
        isLoading={isLoading}
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
      />
    </section>
  );
}
