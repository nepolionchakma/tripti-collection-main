import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/api/config";
import { Product } from "@/types/Types";
import ProductCard from "../ProductCard/ProductCard";

interface RelatedProductsProps {
  currentProductId: number;
  categories: string[];
}

const RelatedProducts = ({
  currentProductId,
  categories,
}: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        // Fetch products that share at least one category with the current product
        const response = await axios.get(
          `${API_BASE_URL}/api/products/related`,
          {
            params: {
              productId: currentProductId,
              categories: categories,
              limit: 4, // Get 4 related products
            },
          },
        );
        console.log(response.data, "related products data");
        if (response.data) {
          setRelatedProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchRelatedProducts();
    }
  }, [currentProductId, categories]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        Loading related products...
      </div>
    );
  }

  // if (relatedProducts.length === 0) {
  //   return null; // Don't show anything if no related products found
  // }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {relatedProducts.length > 0 ? (
        relatedProducts.map((product) => {
          return <ProductCard key={product.product_id} item={product} />;
        })
      ) : (
        <div className="col-span-full text-center py-8">
          No related products found
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;

//  {
//    relatedProducts.map((product) => (
//      <Link
//        to={`/product/${product.product_id}`}
//        key={product.product_id}
//        className="group block overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
//      >
//        <div className="relative h-64 overflow-hidden">
//          <img
//            src={product.img}
//            alt={product.title}
//            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//          />
//          {product.offer && (
//            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
//              {product.offer.type}
//            </span>
//          )}
//        </div>
//        <div className="p-4">
//          <h4 className="font-medium text-gray-900 line-clamp-2 h-12">
//            {product.title}
//          </h4>
//          <div className="mt-2 flex items-center">
//            <div className="flex text-yellow-400">
//              {[...Array(5)].map((_, i) => (
//                <Star
//                  key={i}
//                  className={`w-4 h-4 ${i < Math.floor(product.rating?.average_rating || 0) ? "fill-current" : ""}`}
//                />
//              ))}
//              <span className="text-gray-500 text-sm ml-1">
//                ({product.rating?.total_reviews || 0})
//              </span>
//            </div>
//          </div>
//          <div className="mt-2 flex items-center justify-between">
//            <div>
//              <span className="text-lg font-semibold text-gray-900">
//                ${product.prices.new_price.toFixed(2)}
//              </span>
//              {product.prices.original_price > product.prices.new_price && (
//                <span className="ml-2 text-sm text-gray-500 line-through">
//                  ${product.prices.original_price.toFixed(2)}
//                </span>
//              )}
//            </div>
//          </div>
//        </div>
//      </Link>
//    ));
//  }
