import ImageSlide from "@/components/ImageSlide/ImageSlide";
import Spinner from "@/components/Spinner/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useShopContext } from "@/context/Global/GlobalContext";
import { Product } from "@/types/Types";
import axios from "axios";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const ProductDetails = () => {
  const url = import.meta.env.VITE_API_URL;
  const params = useParams().product_id;
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${url}/products/unique/${params}`);
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
  const { count, setCount, cart, setCart, wishlist, setWishlist } =
    useShopContext();
  const [size, setSize] = useState<string>("");
  console.log(cart, "cart");
  const handleAddWishlist = () => {
    if (productData) {
      setWishlist((prev) => {
        if (prev.includes(productData)) {
          const newWishlist = prev.filter((item) => item !== productData);
          localStorage.setItem("wishlist", JSON.stringify(newWishlist));
          return newWishlist;
        } else {
          const newWishlist = [...prev, productData];
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
      product: productData,
      quantity: count,
      sizes: size,
    };
    setCart([...cart, cartItems]);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast("Add cart successfully");
  };
  console.log(params, "params");
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner size="100" color="orange" speed="1.75" />
        </div>
      ) : (
        <div className="p-2">
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <ImageSlide data={productData!} />
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <div>
                <div className="flex gap-2">
                  <h3 className="text-2xl font-bold">{productData?.title}</h3>
                  <div
                    className={`${
                      wishlist.includes(productData!)
                        ? "bg-amber-400 text-white"
                        : "bg-slate-100"
                    } h-6 w-6 items-center justify-center flex p-1 rounded-full`}
                    onClick={handleAddWishlist}
                  >
                    <Star size={15} className="cursor-pointer" />
                  </div>
                  <p className="text-amber-600 text-[10px]">
                    {productData?.is_available_product && "In Stock"}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  {productData?.prices.new_price && (
                    <p className="text-amber-500 font-semibold">
                      ${productData.prices.new_price}
                    </p>
                  )}
                  <p
                    className={`${
                      productData?.prices.new_price
                        ? "line-through text-slate-500 text-[11px]"
                        : ""
                    }`}
                  >
                    ${productData?.prices.original_price}
                  </p>
                </div>
                {/* <p className="text-sm text-slate-400">{productData?.category}</p> */}
              </div>
              <hr />
              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="sm:block">
                  {productData?.description.slice(0, 100)}
                </p>
                <p className="sm:block hidden">
                  {productData?.description.slice(0, 200)}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-start">
                      <>
                        <span className="border-b underline cursor-pointer">
                          {productData?.description &&
                            productData?.description.length > 200 &&
                            "...."}
                        </span>
                      </>
                    </TooltipTrigger>
                    <TooltipContent className="w-80">
                      <p>{productData?.description}</p>
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
                    {productData?.sizes &&
                      productData?.sizes.map((s, index) => (
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
                    disabled={productData?.sizes && !size}
                    className={`${
                      productData?.sizes && size.length === 0
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
                  <span className="text-slate-500">
                    {productData?.categories}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductDetails;
