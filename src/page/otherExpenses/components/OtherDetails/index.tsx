import { Button } from "@/components/ui/Button";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import OtherEditForm from "../OtherEditForm";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import { SheetContent, SheetFooter, SheetTitle } from "@/components/ui/Sheet";

interface Props {
  data: OtherExpenses;
  setIsOpen: (value: boolean) => void;
}

export default function OtherDetails({ data, setIsOpen }: Props) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient()

  const deleteMethod = async () => {
    try {
      const response = await api.delete(`/other/delete/${data.id}`);
      if (response.status === 200) {
        toast({
          description: "Gasto eliminado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("o");
      setIsOpen(false)
    } catch (error) {
      console.log(error);
      toast({
        description: "Error al eliminar el Gasto",
        variant: "destructive",
      })
    }
  };

  return (
    <SheetContent>
      <SheetTitle>Informacion del Gasto</SheetTitle>
      <OtherEditForm
        data={data}
        setIsOpen={setIsOpen}
        setIsPending={setIsPending}
      />
      <SheetFooter className="mt-2 p-2">
        <Button type="submit" form="update-other-form" disabled={isPending}>
          <Pencil className="mr-2 h-4 w-4" />
          Aplicar
        </Button>
        <Button variant="destructive" onClick={deleteMethod}>
          <X className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
