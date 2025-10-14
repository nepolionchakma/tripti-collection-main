import { useShopContext } from "@/context/Global/GlobalContext";
import ProductCard from "../ProductCard/ProductCard";
interface Props {
  featureType: string;
}
const Product = ({ featureType }: Props) => {
  const { products } = useShopContext();

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products
          ?.slice(0, 8)
          .filter((item) =>
            item["collections"]
              .map((feature) => feature.toUpperCase())
              .includes(featureType.toUpperCase())
          )
          .map((item) => {
            return <ProductCard key={item.product_id} item={item} />;
          })}
      </div>
    </>
  );
};

export default Product;
