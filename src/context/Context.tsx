import { CartProduct, Product } from "@/types/Types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ShopContextProps {
  children: ReactNode;
}
interface ShopContextType {
  selectedItem: Product | undefined;
  setSelectedItem: React.Dispatch<React.SetStateAction<Product | undefined>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  wishlist: Product[];
  setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ShopContext = createContext({} as ShopContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useShopContext = () => {
  return useContext(ShopContext);
};
export const ShopContextProvider = ({ children }: ShopContextProps) => {
  const [selectedItem, setSelectedItem] = useState<Product>();
  const [count, setCount] = useState<number>(1);
  const [cart, setCart] = useState<CartProduct[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "")
      : []
  );
  const [wishlist, setWishlist] = useState<Product[]>(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist") || "")
      : []
  );

  // useEffect(() => {
  //   const localCart = localStorage.getItem("cart");
  //   if (localCart) setCart(JSON.parse(localCart));
  // }, [cart.length]);
  // useEffect(() => {
  //   const localWishlist = localStorage.getItem("wishlist");
  //   if (localWishlist) setWishlist(JSON.parse(localWishlist));
  // }, [wishlist.length]);

  const values = {
    selectedItem,
    setSelectedItem,
    count,
    setCount,
    cart,
    setCart,
    wishlist,
    setWishlist,
  };

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
};
