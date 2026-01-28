import Product from "@/components/OurProducts/Product";
import { useShopContext } from "@/context/Global/GlobalContext";
import { Collection } from "@/types/Types";
import { useState } from "react";

const Products = () => {
  const { collections } = useShopContext();
  const [featureType, setFeatureType] = useState("ALL");
  console.log(collections, "collections");
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <div className="flex gap-4">
        {/* <p
          className={`${
            featureType === "All"
              ? "text-amber-500 border-b-2 border-amber-500"
              : "border-b-2 border-transparent"
          } cursor-pointer uppercase duration-300`}
          onClick={() => setFeatureType("ALL")}
        >
          ALL
        </p> */}
        {collections.map((item: Collection) => (
          <p
            key={item.collection_id}
            className={`${
              featureType === item.collection_name
                ? "text-amber-500 border-b-2 border-amber-500"
                : "border-b-2 border-transparent duration-300"
            } cursor-pointer uppercase`}
            onClick={() => setFeatureType(item.collection_name as string)}
          >
            {item.collection_name as string}
          </p>
        ))}
      </div>
      <div>
        <Product featureType={featureType} />
      </div>
    </div>
  );
};

export default Products;
