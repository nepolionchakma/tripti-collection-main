import { CartProduct, Product } from "@/types/Types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
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
  const url = import.meta.env.VITE_API_URL;
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

  const [user, setUser] = useState(null);
  console.log(user, "user");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${url}/auth/me`, {
          withCredentials: true,
        });
        if (res) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  (async () => {
    try {
      const response = await axios.get(
        "https://tripti-collection-server.onrender.com/products"
      );
      console.log(response.data, "response.data");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  })();

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
