import Spinner from "@/components/Spinner/Spinner";
import { Product } from "@/types/Types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_BASE_URL } from "@/api/config";
import ProductCard from "@/components/ProductCard/ProductCard";

const CategoryDetails = () => {
  const url = API_BASE_URL;
  const params = useParams().category_name;
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<Product[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${url}/api/products/categories/unique/${params}`,
        );
        console.log(res, "adasd");
        if (res) {
          setProductData(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [params, url]);

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center h-[calc(90vh)]">
          <Spinner size="100" color="orange" speed="1.75" />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl text-amber-400">
            {params} category products
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productData?.map((item) => (
              <ProductCard key={item.product_id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default CategoryDetails;
