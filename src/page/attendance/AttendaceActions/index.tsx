import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { useState } from "react";
import AttendanceForm from "../AttendanceForm";
import api from "@/service";
import { useQuery } from "react-query";

const getBox = async () => {
  const { data } = await api.get("/boxes");
  return data;
};

export default function AttendanceActions() {
  const { data: allBoxes } = useQuery("boxInAttendance", getBox);

  const [isOpen, setIsOpen] = useState(false);

  const lastId = (allBoxes ? allBoxes.boxes : []).reduceRight(
    (maxId: number, box: Box) => Math.max(maxId, box.id),
    0
  );
  const lastBox = (allBoxes ? allBoxes.boxes : []).find(
    (box: Box) => box.id === lastId
  );
  const boxIsClose = Boolean(lastBox?.state);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-32" disabled={boxIsClose === true ? false : true}>
          Asistencia
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl h-[30rem]">
        <AttendanceForm setIsOpen={setIsOpen} lastBox={lastBox} />
      </DialogContent>
    </Dialog>
  );
}
