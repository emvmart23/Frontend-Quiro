import { Button } from "@/components/ui/Button";
import { Slider } from "../components/slider";
import { CardsServices } from "../components/CardsServices";
import { Hero } from "../components/Hero";
import { CardsProducts } from "../components/CardsProducts";

export default function Dashboard() {


  return (
    <section className="w-full">
      <Slider />
      <div className="flex flex-col w-full justify-center items-center text-center gap-[24px] my-[50px]">
        <div>
          <h1 className="font-bold text-xl">Servicios principales</h1>
          <p className="text-[16px] text-gray-400">Los mejores servicios a tu disposición</p>
        </div>
        <div>
          <Button className="font-bold text-black bg-white border-2 border-black w-[162px] h-[54px] hover:text-white">Ver más servicios</Button>
        </div>
      </div>
      <div>
        <CardsServices />
      </div>
      <div>
        <Hero />
      </div>
      <div className="px-[64px] py-[50px]">
      <h1 className="underline decoration-red-500 decoration-4 underline-offset-8 text-[32px]">Las mejores ofertas en <span className="font-bold text-red-600">Productos</span></h1>
        <CardsProducts />
      </div>
    </section>
  );
}
