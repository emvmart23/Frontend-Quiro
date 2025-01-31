import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";

import { ShoppingBag } from "lucide-react";
import "../styles/animated-card.css";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  //FormDescription,
  FormField,
  FormItem,
  FormLabel,
  //FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres."
  }).max(50),
  surname: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres."
  }).max(50),
  email: z.string().email({
    message: "Ingresa un correo válido."
  }),
  phone: z.string().min(9, {
    message: "Número de teléfono inválido."
  }),
  date: z.string(),
  time: z.string(),
  service: z.string(),
})

type CardServiceProps = {
  title: string,
  price: number,
  image: string,
}

export default function ModalService({title, image, price}:CardServiceProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: title,
    },
  });

  const [number] = useState('51994225385');

  const api = 'https://api.whatsapp.com';
  const endpoint = '/send';
  let msg = '';

  const capitalize = (word:string) => {
    word = word.toLowerCase();
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    return capitalized;
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const fullname = `${capitalize(values.name)} ${capitalize(values.surname)}`;
    const schedule = (values.date.length > 0 && values.time.length > 0) ? ` para el día ${values.date} a las ${values.time}` : '';

    msg = `
      Hola, mi nombre es ${fullname}. Quiero realizar una reserva de ${title}${schedule}. Mi correo es ${values.email}.`;
    msg = msg.replace(/ /g, '%20');

    console.log(msg);
    window.location.replace(`${api}${endpoint}?phone=${number}&text=${msg}`);
  }

  return(
    <AlertDialog>

      <AlertDialogTrigger className="w-full">
      <div className="button-bag
         self-end justify-end place-items-end w-full"
        >
          <div className="self-end flex flex-row justify-end">
            <div className="curve-top w-8 h-8 rounded-tr-2xl"></div>
              <a className="bg-primary px-3 py-3 rounded-bl-2xl cursor-pointer">
                <ShoppingBag className="h-8 w-8" />
              </a>
          </div>
          <div className="curve-top self-end w-8 h-8 rounded-tr-2xl"></div>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col gap-6">
            <div style={{
              backgroundSize: 'cover',
            }}>
              <img src={image} alt={title} className="w-full h-48 rounded-md"/>
            </div>


            <div key={'form'} className="flex flex-col gap-4">
              <AlertDialogTitle className="text-muted-foreground text-sm flex flex-col gap-1">
                <p>Quiro Salón</p>
                <h1 className="text-primary text-xl">Reservar cita</h1>
              </AlertDialogTitle>

              <AlertDialogDescription className="flex flex-col gap-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre*</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apellido*</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu apellido" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo*</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu mejor correo" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono Móvil*</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu teléfono móvil" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de tu Cita</FormLabel>
                          <FormControl>
                            <Input placeholder="Fecha" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hora de tu Cita</FormLabel>
                          <FormControl>
                            <Input placeholder="Hora" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    </div>
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Servicio</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Servicio" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={`${title}`} >{title} - PEN {price}</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {!form.formState.isValid && <p className="text-xs text-red-500">* Complete los campos, por favor.</p>}
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction type="submit" disabled={!form.formState.isValid}>
                        Reservar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </AlertDialogDescription>
            </div>

          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>

  );
}
