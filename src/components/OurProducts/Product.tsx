import { ShoppingCart } from "lucide-react";
import Items from "../../JSON/Items.json";
interface Props {
  featureType: string;
}
const Product = ({ featureType }: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Items.slice(0, 8)
          .filter((item) => item["features"].includes(featureType))
          .map((item) => {
            return (
              <div
                key={item.id}
                className="shadow p-4 rounded-md hover:shadow-lg duration-300 cursor-pointer hover:bg-amber-100 hover:scale-105"
              >
                <figure className="flex items-center justify-center relative">
                  <img src={item.img} alt="Shoes" className="w-40" />
                  <div>
                    <p
                      className={`absolute top-0 left-0 py-1 px-2 rounded text-[9px] ${
                        item.edition !== "" ? " bg-green-300" : ""
                      }`}
                    >
                      {item.edition}
                    </p>

                    {/* <button className="absolute top-0 right-2 cursor-pointer bg-amber-200 p-1 rounded-full ">
                      <Star size={15} />
                    </button> */}
                  </div>
                </figure>
                <div className="flex justify-between gap-2 w-full">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold"> {item.title}</h3>
                    <div className="flex gap-3 items-center">
                      {item["new_price"] && (
                        <p className="text-amber-500 font-semibold">
                          ${item["new_price"]}
                        </p>
                      )}
                      <p
                        className={`${
                          item["new_price"]
                            ? "line-through text-slate-500 text-[11px]"
                            : ""
                        }`}
                      >
                        ${item["original_price"]}
                      </p>
                    </div>
                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>
                  <div className="flex items-end">
                    <button className="bg-amber-200 p-2 rounded-full">
                      <ShoppingCart size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Product;
