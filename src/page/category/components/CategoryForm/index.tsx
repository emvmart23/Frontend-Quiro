import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/useToast";
import { CategorySchema } from "@/lib/validators/category";
import api from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { z } from "zod";

interface Props {
    setIsPending: (value:boolean) => void;
    setIsOpen: (value:boolean) => void;
}

export default function CategoryForm({setIsPending, setIsOpen}: Props) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    setIsPending(true);
    try {
      const { status } = await api.post("/categories/create", values);
      if (status == 200) {
        toast({
          description: "Categoria creado correctamente",
          variant:"success"
        });
      }
      queryClient.invalidateQueries("categories");
      setIsOpen(false);
    } catch (error) {
      toast({
        description: "Error al crear Categoria",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Form {...form}>
      <form
        id="add-category-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-[99%] p-[0.3rem]"
      >
        <div className="flex justify-between gap-4">
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
        </div>
      </form>
    </Form>
  );
}
