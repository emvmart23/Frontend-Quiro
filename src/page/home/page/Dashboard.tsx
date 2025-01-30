import { Button } from "@/components/ui/Button";
import { Slider } from "../components/slider";
import { CardsServices } from "../components/CardsServices";
import { Hero } from "../components/Hero";
import { CardsProducts } from "../components/CardsProducts";
import { CardsCommets } from "../components/CardsComments";

export default function Dashboard() {


  return (
    <>
      <Slider />
      <section className="flex flex-col w-full justify-center items-center text-center gap-[24px] my-[50px]">
        <div>
          <h1 className="font-bold text-xl">Servicios principales</h1>
          <p className="text-[16px] text-muted-foreground">Los mejores servicios a tu disposición</p>
        </div>
        <div>
          <Button className="font-bold text-primary bg-white border-2 border-primary w-[162px] h-[54px] hover:text-white">Ver más servicios</Button>
        </div>
      </section>
      <section>
        <CardsServices />
      </section>
      <section>
        <Hero />
      </section>
      <section className="px-[15px] py-[50px]">
        <h1 className="ml-[10px] lg:ml-[188px] underline decoration-primary decoration-4 underline-offset-8 text-[18px] lg:text-[32px] font-bold">Las mejores ofertas en <span className=" text-primary">Productos</span></h1>
        <CardsProducts />
      </section>
      <section className="bg-gray-400">
       <CardsCommets/>
      </section>
    </>
  );
}
