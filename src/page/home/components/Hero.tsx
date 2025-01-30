import { Heart } from "lucide-react"

export const Hero = () => {

    const solutions = [
        {
            id: 1,
            icon: <Heart className="mt-[10px]" size={32}/>,
            title: "Solucion",
            description: "Diseñamos nuestros servicios para resolver tus problemas de inicios a fin"
        },
        {
            id: 2,
            icon: <Heart className="mt-[10px]" size={32}/>,
            title: "Solucion",
            description: "Diseñamos nuestros servicios para resolver tus problemas de inicios a fin"
        },
        {
            id: 3,
            icon: <Heart className="mt-[10px]" size={32}/>,
            title: "Solucion",
            description: "Diseñamos nuestros servicios para resolver tus problemas de inicios a fin"
        },
        {
            id: 4,
            icon: <Heart className="mt-[10px]" size={32}/>,
            title: "Solucion",
            description: "Diseñamos nuestros servicios para resolver tus problemas de inicios a fin"
        }
    ];

    return(
        <div className="lg:flex w-full bg-primary p-[48px] justify-center">
            <div className="min-h-[300px] mb-8 lg:mb-0 ">
                <img 
                    src="/public/images/image1.jpg" 
                    alt="Hero" 
                    className="rounded-[20px] w-full h-full object-cover min-h-[300px] md:min-h-[400px] lg:min-h-[300px] lg:max-w-[300px]"
                />
            </div>
            <div className="lg:w-1/2 flex justify-center items-center">
                <div className="w-[90%] md:w-[80%]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                        {solutions.map((solution) => (
                            <div key={solution.id} className="flex gap-2 text-white">
                                <div className="gap-2 font-bold">
                                    {solution.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-[32px]">{solution.title}</p>  
                                    <p className="text-justify">{solution.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
