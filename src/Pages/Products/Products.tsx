import ProductCard from "@/components/ProductCard/ProductCard";
import { useShopContext } from "@/context/Global/GlobalContext";

const Products = () => {
  const { products } = useShopContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => {
        return <ProductCard key={product.product_id} item={product} />;
      })}
    </div>
  );
};
export default Products;
