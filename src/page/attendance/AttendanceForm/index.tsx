import { FormEvent, useState } from "react";
import { toast } from "@/hooks/useToast";
import api from "@/service";
import { format } from "date-fns";
import { Input } from "@/components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useQueryClient } from "react-query";
import { Skeleton } from "@/components/ui/Skeleton";
import { getUsers } from "@/helpers/users/getUsers";
import { getAttendance } from "@/helpers/getAttendance";
import { Loader2 } from "lucide-react";

interface Props {
  setIsOpen: (value: boolean) => void;
  lastBox: Box;
}

export default function AttendanceForm({ setIsOpen, lastBox }: Props) {
  const queryClient = useQueryClient();
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const [users, setUsers] = useState<Attendace[]>([]);
  const [textShadow, setTextShadow] = useState<User[]>([]);
  const [allAttendances, setAllAttendances] = useState<Attendace[]>([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const fetchData = async () => {
      try {
        const { user } = await getUsers();
        setTextShadow(user.map((user: User) => user.name));
        const { attendances } = await getAttendance();
        setAllAttendances(attendances);

        const isPresent = attendances.filter(
          (attendance: Attendace) => attendance?.box_date === lastBox.opening
        );
        const isAttendancePresent = (index: number) =>
          isPresent[index] ? isPresent[index].present : false;
        setUsers(
          user.map((u: Attendace, index: number) => {
            return {
              user_id: u.id,
              present: isAttendancePresent(index),
              date: currentDate,
            };
          })
        );
      } catch (err) {
        console.log(err);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [currentDate]);

  const isDateExist = allAttendances.some(
    (attendance) => attendance?.box_date === lastBox.opening
  );

  const handleCheckOnChange = (index: number) => {
    users[index].present = !users[index].present;
    setUsers([...users]);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!users || users.length === 0) {
      toast({
        description: "Debes marcar al menos una asistencia",
        variant: "warning",
      });
      return;
    }

    if (isDateExist) {
      setIsPending(true);
      try {
        const { status } = await api.patch("/attendances/update", users);
        queryClient.invalidateQueries("Attendance");
        queryClient.invalidateQueries("attendInHome");
        if (status == 200) {
          toast({
            description: "Asistencia actualizada",
            variant: "success",
          });
        }
        setIsOpen(false);
        setIsPending(false);
      } catch (error) {
        toast({
          description: "Error al actualizar",
          variant: "destructive",
        });
      }
    } else {
      setIsPending(true);
      try {
        const { status } = await api.post("/attendances/create", users);
        if (status == 201) {
          toast({
            description: "Asistencia guardada",
            variant: "success",
          });
          setIsOpen(false);
          queryClient.invalidateQueries("Attendance");
          queryClient.invalidateQueries("attendInHome");
          setIsPending(false);
        } else {
          toast({
            description: "Error al guardar asistencia",
            variant: "destructive",
          });
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast({
            description: "La caja anterior debe ser cerrada",
            variant: "destructive",
          });
        } else {
          toast({
            description: "Error al registrar",
            variant: "destructive",
          });
        }
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <form
      id="add-attendance-form"
      onSubmit={onSubmit}
      className="space-y-5 flex-col flex w-full p-8 border border-foreground rounded-md shadow-2xl overflow-auto relative"
    >
      {isPending ? (
        <Skeleton className="h-[326px] w-[34.5rem]" />
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-4">
              <label className="font-semibold">Fecha</label>
              <Input
                readOnly
                placeholder={format(new Date(), "yyyy-MM-dd' 'HH:mm:ss")}
              />
            </div>
            <div className="flex justify-center items-center gap-4">
              <label className="font-semibold">Fecha caja</label>
              <Input className="w-32" placeholder={lastBox?.opening} />
            </div>
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Asistencia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.user_id}>
                  <TableCell className="relative">
                    <Input
                      readOnly
                      type="text"
                      value={user.user_id}
                      className="transparent text-shadow hidden"
                    />
                    <span className="text-[1rem] font-medium">
                      {textShadow[index].toString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="w-8 h-8 p-1 ml-4">
                      <Input
                        className="w-full h-full"
                        type="checkbox"
                        onChange={() => handleCheckOnChange(index)}
                        value={user.present ? "on" : "off"}
                        checked={user.present ? true : false}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
      <div className="absolute bottom-[0.2rem] w-[95%] left-4">
        {isDateExist ? (
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Editar
          </Button>
        ) : (
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Guardar
          </Button>
        )}
      </div>
    </form>
  );
}
