import { useQuery } from "react-query";
import ProductActions from "../components/ProductActions";
import { getProducts } from "@/helpers/getProducts";
import useTitle from "@/hooks/useTitle";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductCatalog from "../components/ProdutcCatalog/ProductCatalog";


export default function Products() {
  const {} = useQuery("products", getProducts);
  useTitle("Productos")
  
  return (
    <section className="flex flex-col w-full">
      <ProductActions />
      <ProductCatalog products={[]} />
      <ProductCard />
    </section>
  );
}
