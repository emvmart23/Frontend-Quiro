import { getProducts } from "@/helpers/getProducts";
import { useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import {
  OrderTables,
  SearchHostess,
  SearchProduct,
  OrderAction,
} from "../components/index";
import { Button } from "@/components/ui/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import api from "@/service";
import { toast } from "@/hooks/useToast";
import { Loader2 } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
import useTitle from "@/hooks/useTitle";
import { ScrollArea } from "@/components/ui/ScrollArea";

export default function Orders() {
  // const { user } = useAuth();
  const { data, isLoading } = useQuery("products", getProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [formatOrder, setFormatOrder] = useState<Product[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [orders, setOrders] = useState<Product[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [value, setValue] = useState(0);
  const queryClient = useQueryClient();
  useTitle("Generar pedido");

  const formatOrders = (array: Product[]) => {
    const formattedOrders = array.reduce((acc, product) => {
      const existingProduct = acc.find((obj) => obj.id === product.id);
      if (existingProduct) {
        existingProduct.count = existingProduct.count + 1;
        existingProduct.price = Number(product.price) * existingProduct.count;
      } else {
        const newProduct = { ...product, count: 1 };

        const modifiedProduct = formatOrder.find(
          (order) => order.id === newProduct.id
        );
        if (modifiedProduct) {
          newProduct.price = modifiedProduct.price;
          newProduct.initialPrice = modifiedProduct.initialPrice;
        }

        acc.push(newProduct);
      }
      return acc;
    }, [] as Product[]);
    setFormatOrder(formattedOrders);
    return formattedOrders;
  };

  const totalPrice = formatOrder.reduce((acc, curr) => {
    return acc + Number(curr.price);
  }, 0);

  const ifHasMultipleCategoryOrder =
    pendingOrders.some((i) => Boolean(i.has_alcohol) === true) &&
    pendingOrders.some((i) => Boolean(i.has_alcohol) === false);

  const combineOrders = (
    formatOrders: Product[],
    totalPrice: number,
    hostess: number
  ) => {
    return formatOrders.map((order) => {
      return {
        ...order,
        hostess: hostess,
        total_price: totalPrice,
      };
    });
  };

  const saveOrder = async () => {
    setIsPending(true);

    if (value <= 1) {
      toast({
        description: "Debe seleccionar una anfitriona",
        variant: "warning",
      });
      setIsPending(false);
      return;
    } else if (ifHasMultipleCategoryOrder) {
      toast({
        description: "No puedes seleccionar múltiples categorías",
        variant: "warning",
      });
      setIsPending(false);
      return;
    }

    setTimeout(async () => {
      try {
        const orderWithHostesses = orders.map((order) => {
          return {
            ...order,
            product_id: order?.id,
            hostess_id: value,
          };
        });

        const response = await api.post("/orders/create", orderWithHostesses);

        if (response.status === 200) {
          toast({
            description: "Pedido guardado correctamente",
            variant: "success",
          });
          queryClient.invalidateQueries("headers");
        }
        setValue(0);
        setPendingOrders([]);
      } catch (error) {
        console.log(error);
        toast({
          description: "Hubo un error al guardar el pedido",
          variant: "destructive",
        });
      } finally {
        setIsPending(false);
      }
    }, 4000);
  };

  useEffect(() => {
    const newFormatOrders = formatOrders(pendingOrders);
    setFormatOrder(newFormatOrders);
  }, [pendingOrders]);

  useEffect(() => {
    const newFilteredProducts = (data ? data.product : []).filter(
      ({ name }: Product) => {
        const todoText = name.toLocaleLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      }
    );
    setFilteredProducts(newFilteredProducts);
  }, [data, searchValue]);

  useEffect(() => {
    const combinedOrders = combineOrders(formatOrder, totalPrice, value);
    setOrders(combinedOrders);
  }, [formatOrder]);

  return (
    <section className="flex justify-center items-center flex-col gap-8 w-full relative md:pr-16 lg:pr-2">
      <div className="relative md:fixed space-y-3 md:space-y-5 w-[90%] lg:w-[61%] h-[30rem] md:h-[27rem] top-[0.4rem] md:top-[6rem] p-5 bg-background z-30 shadow-2xl min-w-[300px]">
        <h3 className="text-3xl font-medium">Generar pedido</h3>
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-24">
            <SearchHostess value={value} setValue={setValue} />
            <SearchProduct
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
          <OrderTables
            setFormatOrder={setFormatOrder}
            formatOrder={formatOrder}
            pendingOrders={pendingOrders}
            setPendingOrders={setPendingOrders}
          />
          <div className="w-[15rem] md:w-[18rem] lg:w-[19rem] xl:w-[22rem] absolute -right-[0.4rem] sm:right-[2rem] md:right-[3rem] lg:right-[2.5rem] xl:right-[5.6rem] -bottom-[4rem] flex justify-between items-center gap-x-1 text-[0.8rem] lg:text-xl font-semibold">
            <div>
              <span>Total a pagar: </span>
              <span className="p-1 rounded-md bg-foreground/20">
                S/.{totalPrice}
              </span>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={orders.length <= 0 ? true : isPending}>
                  {isPending && (
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Guardar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Estas seguro que deseas guardar la orden ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={saveOrder}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className=" flex gap-4 relative top-[2rem] md:top-[27rem]">
        <ScrollArea className="h-96 p-8">
          <OrderAction
            isLoading={isLoading}
            setPendingOrders={setPendingOrders}
            pendingOrders={pendingOrders}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            formatOrders={formatOrders}
            setFormatOrder={setFormatOrder}
          />
        </ScrollArea>
      </div>
    </section>
  );
}
