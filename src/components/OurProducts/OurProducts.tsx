import { useState } from "react";
import Product from "./Product";
import { NavLink } from "react-router";
import { useShopContext } from "@/context/Global/GlobalContext";
import { Collection } from "@/types/Types";

const OurProducts = () => {
  const { collections } = useShopContext();
  const [featureType, setFeatureType] = useState("ALL");
  console.log(collections, "collections");
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <h1 className="text-2xl uppercase">Our Products</h1>
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
      <div className="flex justify-center my-4">
        <NavLink
          to={"products"}
          className="cursor-pointer bg-amber-300 px-2 py-1 rounded text-white"
        >
          Load More
        </NavLink>
      </div>
    </div>
  );
};

export default OurProducts;
