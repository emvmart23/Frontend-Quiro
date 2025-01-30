import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Mascarilla Facial",
    price: 29.99,
    stats: [
      { id: 1, icon: Heart, value: "20K" },
      { id: 2, icon: MessageCircle, value: "15K" },
      { id: 3, icon: Share2, value: "10K" },
    ],
  },
  {
    id: 2,
    name: "Crema Hidratante",
    price: 34.99,
    stats: [
      { id: 1, icon: Heart, value: "18K" },
      { id: 2, icon: MessageCircle, value: "22K" },
      { id: 3, icon: Share2, value: "13K" },
    ],
  },
  {
    id: 3,
    name: "Sérum Facial",
    price: 45.99,
    stats: [
      { id: 1, icon: Heart, value: "25K" },
      { id: 2, icon: MessageCircle, value: "19K" },
      { id: 3, icon: Share2, value: "16K" },
    ],
  },
  {
    id: 4,
    name: "Sérum Facial",
    price: 45.99,
    stats: [
      { id: 1, icon: Heart, value: "25K" },
      { id: 2, icon: MessageCircle, value: "19K" },
      { id: 3, icon: Share2, value: "16K" },
    ],
  },
];
export const CardsProducts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] py-[32px] px-[5px] lg:px-[188px]">
      {products.map((product) => (
        <Card
          key={product.id}
          className="w-full 2xl:text-[24px] bg-[url('/public/images/image1.jpg')] bg-cover bg-center text-white font-bold h-[400px] "
        >
          <CardContent className=" flex gap-[32px] lg:gap-[72px] justify-center mt-5">
            <p>{product.name}</p>
            <p>${product.price}</p>
          </CardContent>
          <CardFooter className="gap-[24px] lg:gap-[48px] justify-center  mt-[270px]">
            {product.stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className="flex lg:gap-1">
                  <Icon />
                  <p>{stat.value}</p>
                </div>
              );
            })}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
