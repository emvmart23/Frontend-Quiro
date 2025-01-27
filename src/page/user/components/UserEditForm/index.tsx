import { Checkbox } from "@/components/ui/Checkbox";
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
import { getRoles } from "@/helpers/getRoles";
import { toast } from "@/hooks/useToast";
import { EditScheme, MainSchema } from "@/lib/validators/user";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

interface Props {
  user: User;
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export default function UserEditForm({ setIsOpen, setIsPending, user }: Props) {
  const [roles, setRoles] = useState<Role[]>([]);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof EditScheme>>({
    resolver: zodResolver(EditScheme),
    defaultValues: {
      name: user?.name,
      user: user?.user,
      salary: user?.salary,
      profit_margin: user?.profit_margin,
      role_id: user?.role_id,
      is_active: Boolean(user?.is_active)
    },
  });

  const onSubmit = async (values: z.infer<typeof MainSchema>) => {
    setIsPending(true);
    try {
      const { status } = await api.patch(`/users/update/${user?.id}`, values);
      if (status == 200) {
        toast({
          description: "Cuenta editada correctamente",
          variant: "success",
        });
      }
      queryClient.invalidateQueries("users");
      setIsOpen(false);
    } catch (error) {
      console.log(error)
      toast({
        description: "Error al editar cuenta",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.role);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <Form {...form}>
      <form
        id="update-user-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[99%] p-[0.3rem]"
      >
        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
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
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between gap-4">
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salario</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profit_margin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Porcentaje</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de Porcentaje" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="role_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Cargo</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={user?.role_id.toString()}
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
                  {roles.map((role) => (
                    <SelectItem key={role.role_id} value={role.role_id.toString()}>
                      {role.role_name}
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
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Activo</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
