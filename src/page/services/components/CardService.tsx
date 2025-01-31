import {
  Card,
  CardContent,
  //CardFooter,
  //CardDescription,
  //CardHeader,
  //CardTitle,
} from "@/components/ui/Card";

import "@/page/services/styles/animated-card.css";
import ModalService from "./ModalService";

type CardServiceProps = {
  title: string,
  description?: string,
  price: number,
  image: string,
}

export default function CardService({title, description, price, image}:CardServiceProps) {

  return(
    <Card className={`animated-card
        relative p-0
        border-primary border-[12px] rounded-2xl
        text-lg text-white`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover'
      }}
    >
      <CardContent className="card-content
        aboslute p-0 top-0 left-0 bottom-0 right-0
        flex flex-col items-center justify-start
        gap-4 rounded-lg h-full
      ">

        <ModalService title={title} image={image} price={price} />

        <div className="info-container h-full">

          <div className="info h-full
          w-4/5 max-h-1/5 self-end flex flex-row">
            <div className="label-container relative self-end flex flex-col justify-end">

                <div className="curve-footer w-8 h-8 rounded-bl-2xl"></div>

                <div className="label bg-primary rounded-se-2xl">
                  <p className="title font-medium uppercase px-3 py-3">{title}</p>

                  <div className="details-container hover:flex hover:flex-col px-8 self-start">
                    <div className="description-container my-3">
                      <p className="text-muted-foreground">{description}</p>
                    </div>
                    <div className="price-container bg-black rounded-full w-fit px-3 py-1">
                      <p>PEN {price}</p>
                    </div>
                </div>
                </div>
              </div>

              <div className="curve-footer self-end w-8 h-8 rounded-bl-2xl"></div>
          </div>
        </div>

      </CardContent>

    </Card>
  );
}
