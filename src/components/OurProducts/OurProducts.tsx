import FeaturesType from "../../JSON/FeaturesType.json";
import { useState } from "react";
import Product from "./Product";
import { NavLink } from "react-router";

const OurProducts = () => {
  const [featureType, setFeatureType] = useState("All");

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <h1 className="text-2xl uppercase">Our Products</h1>
      <div className="flex gap-4">
        <p
          className={`${
            featureType === "All"
              ? "text-amber-500 border-b-2 border-amber-500"
              : "border-b-2 border-transparent"
          } cursor-pointer uppercase duration-300`}
          onClick={() => setFeatureType("All")}
        >
          All
        </p>
        {FeaturesType.map((item) => (
          <p
            key={item.id}
            className={`${
              featureType === item.type
                ? "text-amber-500 border-b-2 border-amber-500"
                : "border-b-2 border-transparent duration-300"
            } cursor-pointer uppercase`}
            onClick={() => setFeatureType(item.type)}
          >
            {item.type}
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
