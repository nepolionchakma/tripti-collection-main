import { Product } from "@/types/Types";
import { ShoppingCart } from "lucide-react";
import { NavLink } from "react-router";

interface ProductCardProps {
  item: Product;
}
const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <NavLink
      to={`/product/${item.product_id}`}
      key={item.product_id}
      className="shadow p-4 rounded-md hover:shadow-lg duration-300 cursor-pointer hover:bg-amber-100 hover:scale-105 relative"
    >
      <figure className="flex items-center justify-center ">
        <img src={item.img} alt="Shoes" className="w-40" />
        <div>
          <div className="absolute top-0 right-0 inline">
            {item.editions.map((a, i) => {
              return (
                <div
                  key={i}
                  className={`py-0.5 px-0.5 mr-0.5 rounded text-[9px] inline-block ${
                    item.editions.length ? " bg-green-300" : ""
                  }`}
                >
                  {a}
                </div>
              );
            })}
          </div>

          {/* <button className="absolute top-0 right-2 cursor-pointer bg-amber-200 p-1 rounded-full ">
        <Star size={15} />
      </button> */}
        </div>
      </figure>
      <div className="gap-2 w-full">
        <h3 className="font-semibold">
          {item.title.length > 20
            ? item.title.slice(0, 20) + "..."
            : item.title}
        </h3>
        <div className="flex justify-between ">
          <div className="flex flex-col gap-1">
            <div className="flex gap-3 items-center">
              {item.prices.new_price && (
                <p className="text-amber-500 font-semibold">
                  ${item.prices.new_price}
                </p>
              )}
              <p
                className={`${
                  item.prices.new_price
                    ? "line-through text-slate-500 text-[11px]"
                    : ""
                }`}
              >
                ${item.prices.original_price}
              </p>
            </div>
            <p className="text-sm text-slate-400">
              {item.categories.join(", ")}
            </p>
          </div>
          <div className="flex flex-col items-end justify-end">
            <button className="bg-amber-200 p-2 rounded-full">
              <ShoppingCart size={15} />
            </button>
          </div>
        </div>
      </div>
    </NavLink>
  );
};
export default ProductCard;
