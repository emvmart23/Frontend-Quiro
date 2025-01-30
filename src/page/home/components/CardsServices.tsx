import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
export const CardsServices = () => {
    const services = [
        {
            id: 1,
            title: "Mascarilla facial",
            price: "15.99",
            description: "Mascarilla rica en minerales naturale que ayuda a limpiar profundamente los poros, eliminar impurezas y absorber el exceso de grasa, dejando la piel suave y revitalizada ideal para todo tipo de piel ",
            url: '/public/images/image1.jpg',
        },
        {
            id: 2,
            title: "Mascarilla facial",
            price: "18.99",
            description: "Mascarilla rica en minerales naturale que ayuda a limpiar profundamente los poros, eliminar impurezas y absorber el exceso de grasa, dejando la piel suave y revitalizada ideal para todo tipo de piel ",
            url: '/public/images/image1.jpg',
        },
        {
            id: 3,
            title: "Mascarilla facial",
            price: "19.99",
            description: "Mascarilla rica en minerales naturale que ayuda a limpiar profundamente los poros, eliminar impurezas y absorber el exceso de grasa, dejando la piel suave y revitalizada ideal para todo tipo de piel ",
            url: '/public/images/image1.jpg',
        }
    ];

    return (
        <div className="flex justify-center w-full px-[5px] lg:px-[64px] sm:px-[64px] pb-[50px]">
            <div className="grid grid-cols-1 md:grid-cols-3 px-4 gap-[8px] md:gap-[32px] mx-auto">
                {services.map((service) => (
                    <Card key={service.id} className="w-full  bg-primary text-white rounded-[20px] text-center">
                        <div className="w-full h-[260px] overflow-hidden rounded-t-[20px]">
                            <img
                                src={service.url}
                                alt={service.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle>{service.title}</CardTitle>
                            <p className="text-4xl font-bold ">S/. {service.price}</p>
                        </CardHeader>
                        <CardContent className="text-justify">
                            <p>{service.description}</p>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <Button className=" font-bold text-black bg-white border-2 w-full h-[54px] hover:text-white">Comprar</Button>

                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

