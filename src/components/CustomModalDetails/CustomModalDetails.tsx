import { useShopContext } from "@/context/Global/GlobalContext";
import { Minus, Plus, ShoppingCart, Star, X } from "lucide-react";
import ImageSlide from "./ImageSlide";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const CustomModalDetails = () => {
  const {
    selectedItem,
    setSelectedItem,
    count,
    setCount,
    cart,
    setCart,
    wishlist,
    setWishlist,
  } = useShopContext();
  const [size, setSize] = useState<string>("");
  console.log(cart, "cart");
  const handleAddWishlist = () => {
    if (selectedItem) {
      setWishlist((prev) => {
        if (prev.includes(selectedItem)) {
          const newWishlist = prev.filter((item) => item !== selectedItem);
          localStorage.setItem("wishlist", JSON.stringify(newWishlist));
          return newWishlist;
        } else {
          const newWishlist = [...prev, selectedItem];
          localStorage.setItem("wishlist", JSON.stringify(newWishlist));
          return newWishlist;
        }
      });
    }
  };
  const handleSizeAdd = (size: string) => {
    setSize(size);
  };
  const handleAddToCart = () => {
    const cartItems = {
      product: selectedItem,
      quantity: count,
      sizes: size,
    };
    setCart([...cart, cartItems]);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast("Add cart successfully");
  };
  return (
    <div className="p-2">
      <div className="flex flex-row-reverse items-center gap-2 rounded-md">
        <X
          size={19}
          onClick={() => setSelectedItem(undefined)}
          className=" cursor-pointer"
        />
        <div
          className={`${
            wishlist.includes(selectedItem!)
              ? "bg-amber-400 text-white"
              : "bg-slate-100"
          }  p-1 rounded-full`}
          onClick={handleAddWishlist}
        >
          <Star size={15} className="cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <ImageSlide />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <div>
            <div className="flex gap-2">
              <h3 className="text-2xl font-bold">{selectedItem?.title}</h3>
              <p className="text-amber-600 text-[10px]">
                {selectedItem?.is_available_product && "In Stock"}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              {selectedItem?.prices.new_price && (
                <p className="text-amber-500 font-semibold">
                  ${selectedItem.prices.new_price}
                </p>
              )}
              <p
                className={`${
                  selectedItem?.prices.new_price
                    ? "line-through text-slate-500 text-[11px]"
                    : ""
                }`}
              >
                ${selectedItem?.prices.original_price}
              </p>
            </div>
            {/* <p className="text-sm text-slate-400">{selectedItem?.category}</p> */}
          </div>
          <hr />
          <div>
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="sm:block">
              {selectedItem?.description.slice(0, 100)}
            </p>
            <p className="sm:block hidden">
              {selectedItem?.description.slice(0, 200)}
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-start">
                  <>
                    <span className="border-b underline cursor-pointer">
                      {selectedItem?.description &&
                        selectedItem?.description.length > 200 &&
                        "...."}
                    </span>
                  </>
                </TooltipTrigger>
                <TooltipContent className="w-80">
                  <p>{selectedItem?.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <hr />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
              <div className="flex items-center gap-4 border px-3 py-1 rounded-full hover:shadow">
                <button
                  disabled={count === 1}
                  className={`${count === 1 && "cursor-not-allowed"}`}
                >
                  <Minus
                    size={15}
                    className={`${
                      count === 1
                        ? "cursor-not-allowed text-gray-300"
                        : "cursor-pointer"
                    }`}
                    onClick={() => setCount(count - 1)}
                  />
                </button>
                <span>{count}</span>
                <button>
                  <Plus
                    size={15}
                    className="cursor-pointer"
                    onClick={() => setCount(count + 1)}
                  />
                </button>
              </div>
              <div className="flex gap-2">
                <h5>Size:</h5>
                {selectedItem?.sizes &&
                  selectedItem?.sizes.map((s, index) => (
                    <button
                      key={index}
                      className={`${
                        size === s && "bg-amber-400"
                      } border px-1 rounded cursor-pointer hover:bg-amber-300 hover:shadow duration-300`}
                      onClick={() => handleSizeAdd(s)}
                    >
                      {s}
                    </button>
                  ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                disabled={selectedItem?.sizes && !size}
                className={`${
                  selectedItem?.sizes && size.length === 0
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } flex items-center justify-center gap-2 border px-3 py-1 rounded-full  bg-amber-200 hover:bg-amber-300 hover:shadow duration-300`}
                onClick={handleAddToCart}
              >
                <p>Add to Cart</p>
                <ShoppingCart size={15} />
              </button>
            </div>
          </div>
          <hr />
          <div>
            <h3>
              Category:{" "}
              <span className="text-slate-500">{selectedItem?.categories}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModalDetails;
