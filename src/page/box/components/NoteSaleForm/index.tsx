import { Button } from "@/components/ui/Button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { getCustomer } from "@/helpers/getCustomer";
import { getMethodPayments } from "@/helpers/getMethodPayments";
import { toast } from "@/hooks/useToast";
import { NoteScheme } from "@/lib/validators/product";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { z } from "zod";

interface Props {
  setPaymentFields: (value: PaymentField[]) => void;
  ordersDetails: Orders | undefined;
  setIsOpen: (value: boolean) => void;
  header: Header;
}

export default function NoteSaleForm({
  ordersDetails,
  setIsOpen,
  setPaymentFields,
  header,
}: Props) {
  const { data } = useQuery("customer", getCustomer);
  const [methodPayments, setMethodPayments] = useState<MethodPayment[]>([]);
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof NoteScheme>>({
    resolver: zodResolver(NoteScheme),
    defaultValues: {
      hostess_id: header?.hostess_id,
      issue_date: format(new Date(), "yyyy-MM-dd"),
      total_price: Number(ordersDetails?.total_price),
      payment: [
        {
          mountain: Number(ordersDetails?.total_price),
          reference: "todo bien",
        },
      ],
    },
  });

  const onSubmit = async (values: z.infer<typeof NoteScheme>) => {
    setIsOpen(true);
    setIsPending(true);
    try {
      const response = await api.post(`/details/create/${header.id}`, values);
      if (response.status === 200) {
        toast({
          description: "Venta realizada correctamente",
          variant: "success",
        });
        queryClient.invalidateQueries("headers");
        queryClient.invalidateQueries("orders");
        queryClient.invalidateQueries("attend");
        queryClient.invalidateQueries("head");
        queryClient.invalidateQueries("otherInBox");
        queryClient.invalidateQueries("boxes");
        queryClient.invalidateQueries("headInHome");
        setIsOpen(false);
        setIsPending(false);
      } else {
        toast({
          description: "Error al realizar venta",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        description: "Error al realizar venta",
        variant: "destructive",
      });
    } finally {
      setIsOpen(false);
      setIsPending(false);
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: "payment",
    control: form.control,
  });

  const fetchMethosPayments = async () => {
    try {
      const { method } = await getMethodPayments();
      setMethodPayments(method);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMethosPayments();
  }, []);

  useEffect(() => {
    setPaymentFields(fields);
  }, [fields, setPaymentFields]);

  return (
    <Form {...form}>
      <form id="finish-sale-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-[60%] space-y-4">
          <FormField
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cliente</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`${
                        !field.value && "text-muted-foreground"
                      } hover:text-accent-foreground`}
                    >
                      <SelectValue placeholder="Seleccione un cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(data ? data?.customer : [])?.length <= 0 ? (
                      <span className="font-medium ml-2 text-[0.9rem] text-foreground/60">
                        No hay clientes registrados
                      </span>
                    ) : (
                      (data ? data?.customer : [])?.map((data: Customer) => (
                        <SelectItem key={data.id} value={data.id.toString()}>
                          {data.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="issue_date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="date" value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="total_price"
            render={({ field }) => (
              <FormItem className="w-full hidden">
                <FormControl>
                  <Input placeholder="referencia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="overflow-auto h-52 mt-4">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="pl-[0.5rem] w-40">Metodo de pago</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Referencia</TableHead>
                <TableHead>
                  <Button
                    type="button"
                    className="border-none space-x-1 underline-offset-4"
                    variant={"outline"}
                    onClick={() =>
                      append({
                        payment_id: 0,
                        mountain: 10,
                        reference: "ok",
                      })
                    }
                  >
                    <span>Agregar</span>
                    <Plus className="w-4 h-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields?.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`payment.${index}.payment_id`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                          >
                            <FormControl>
                              <SelectTrigger
                                className={`${
                                  !field.value && "text-muted-foreground"
                                } hover:text-accent-foreground`}
                              >
                                <SelectValue placeholder="Seleccione un metodo de pago" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {(methodPayments ? methodPayments : [])?.map(
                                (data: MethodPayment) => (
                                  <SelectItem
                                    key={data.id}
                                    value={data.id.toString()}
                                  >
                                    {data.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`payment.${index}.mountain`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="monto" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`payment.${index}.reference`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Referencia" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      form="finish-sale-form"
                      className={`${index == 0 && "invisible"}`}
                      variant={"outline"}
                      onClick={() => remove(index)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          form="finish-sale-form"
          disabled={isPending}
          type="submit"
          className="absolute right-8 bottom-6"
        >
          {isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Enviar
        </Button>
      </form>
    </Form>
  );
}
