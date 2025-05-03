import { CartProduct, IUser, Product } from "@/types/Types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

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
  user: IUser | undefined;
  logout: () => void;
  isLoading: boolean;
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
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${url}/auth/me`, {
          withCredentials: true,
        });
        console.log(res, "res");
        if (res.status === 200) {
          setUser(res.data.user);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log("Failed to fetch user", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [url]); // Only trigger the effect on `url` change, not `user`

  const logout = async () => {
    try {
      const res = await axios.get(`${url}/auth/logout`, {
        withCredentials: true,
      });
      console.log(res, "res");
      if (res.status === 200) {
        setUser(undefined);
        toast(`${res.data.message}`);
      }
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const values = {
    selectedItem,
    setSelectedItem,
    count,
    setCount,
    cart,
    setCart,
    wishlist,
    setWishlist,
    user,
    logout,
    isLoading,
  };

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
};
