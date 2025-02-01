import ProductActions from "../components/ProductActions";
import useTitle from "@/hooks/useTitle";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductCatalog from "../components/ProdutcCatalog/ProductCatalog";
import { products } from "../components/data";

export default function Products() {
  useTitle("Productos");

  return (
    <section className="flex flex-col w-full">
      <ProductActions />
      <ProductCatalog />
      <ProductCard products={products} />
    </section>
  );
}
