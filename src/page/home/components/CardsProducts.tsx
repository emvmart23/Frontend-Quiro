import { Card, CardContent, CardFooter} from "@/components/ui/Card"
import { Heart } from "lucide-react"

export const CardsProducts = () => {
    return (
        <div>
            <Card className="bg-[url('/public/images/image1.jpg')] bg-cover bg-center ">
                <CardContent className="flex">
                <p>Mascarilla Facial</p>
                <p>$29.99</p>
                </CardContent>
                <CardFooter className=" gap-4">
                    <div className="flex gap-1">
                        <Heart />
                        <p>20K</p>
                    </div>
                    <div className="flex gap-1">
                        <Heart />
                        <p>20K</p>
                    </div>
                    <div className="flex gap-1">
                        <Heart />
                        <p>20K</p>
                    </div>


                </CardFooter>

            </Card>
        </div>
    )
}