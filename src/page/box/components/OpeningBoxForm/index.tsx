import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";
import { BoxSchema } from "@/lib/validators/box";
import api from "@/service";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { useBoxes } from "@/hooks/useBoxes";

interface Props {
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export default function OpeningBoxForm({ setIsPending, setIsOpen }: Props) {
  const { data: allBoxes } = useBoxes();
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof BoxSchema>>({
    resolver: zodResolver(BoxSchema),
    defaultValues: {
      user_opening: user?.user,
      final_balance: "0",
      opening: currentDate,
      state: true,
      initial_balance: "0",
    },
  });

  const lastId = (allBoxes ? allBoxes.boxes : [])?.reduceRight(
    (maxId: number, box: Box) => Math.max(maxId, box.id),
    0
  );

  const lastBox = (allBoxes ? allBoxes.boxes : []).find(
    (box: Box) => box.id === lastId
  );

  const onSubmit = async (values: z.infer<typeof BoxSchema>) => {
    const boxIsClose = Boolean(lastBox?.state);
    if (boxIsClose) {
      toast({
        description:
          "No se puede abrir una nueva caja. Cierra la caja actual antes de proceder",
        variant: "destructive",
      });
    } else {
      setIsPending(true);
      try {
        const { status } = await api.post("/boxes/create", values);
        if (status == 200) {
          toast({
            description: "Caja aperturada",
            variant: "success",
          });
        }
        queryClient.invalidateQueries("boxes");
        setIsOpen(false);
      } catch (error) {
        toast({
          description: "Error al crear caja",
          variant: "destructive",
        });
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        id="box-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[99%] p-[0.3rem]"
      >
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="user_opening"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input readOnly placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initial_balance"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Saldo inicial</FormLabel>
                <FormControl>
                  <Input placeholder="Saldo inicial" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
