import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { LoginForm } from "../forms/LoginForm";

export default function LoginCard() {
  return (
    <>
      <Card className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[290px] md:w-[33%] h-[25rem]">
        <CardHeader>
          <CardTitle className="text-center pt-5">Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <Card className="absolute right-32 top-20  min-w-[290px] md:w-[20%] h-[20rem]">
        <CardHeader>
          <CardTitle className="pt-1">Notas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="font-medium">Usuario : Max</li>
            <li className="font-medium">Contraseña : Max123</li>
            <li className="font-medium">Descripción: Estás accediendo con un usuario que tiene permisos completos para visualizar todas las secciones. Este es un demo de cómo un local gestiona sus productos, pedidos y la información sobre los salarios del personal más la implementacion de un sistema de asistencia.</li>
            <li></li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
