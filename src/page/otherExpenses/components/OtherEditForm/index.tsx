import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from "@/hooks/useToast";
import { OtherExpensesSchema } from "@/lib/validators/other_scheme";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { getUnits } from "@/helpers/getUnits";
import { z } from "zod";

interface Props {
  data: OtherExpenses;
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export default function OtherEditForm({
  data,
  setIsPending,
  setIsOpen,
}: Props) {
  const { data: units } = useQuery("unit", getUnits);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof OtherExpensesSchema>>({
    resolver: zodResolver(OtherExpensesSchema),
    defaultValues: {
      count: data?.count,
      name: data?.name,
      unit_id: data?.unit_id,
      total: data?.total,
    },
  });

  const onSubmit = async (values: z.infer<typeof OtherExpensesSchema>) => {
    setIsPending(true);
    try {
      const response = await api.patch(`/other/update/${data.id}`, values);
      if (response.status === 200) {
        toast({
          description: "Gasto actualizado correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("o");
      setIsPending(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        description: "Error al actualizar Gasto",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        id="update-other-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[99%] p-[0.3rem]"
      >
        <div className="flex flex-col justify-between gap-4">
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input placeholder="Cantidad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Unidad de medida</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={data.unit_id.toString()}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`${
                        !field.value && "text-muted-foreground"
                      } hover:text-accent-foreground`}
                    >
                      <SelectValue placeholder="Seleccione un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(units ? units?.unit : [])?.map((unit: UnitMeasure) => (
                      <SelectItem
                        key={unit.unit_id}
                        value={unit.unit_id.toString()}
                      >
                        {unit.abbreviation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input placeholder="Total" {...field} />
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
