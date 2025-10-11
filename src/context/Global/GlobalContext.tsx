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
import { redirect } from "react-router";
import { AdminContextProvider } from "../../Pages/Admin/Contexts/Admin/AdminContext";

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
  products: Product[];
  heroProducts: Product[];
  featuredProducts: Product[];
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
  const [products, setProducts] = useState<Product[]>([]);
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${url}/auth/me`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setUser(res.data.user);
        }

        // Products fetch
        const res2 = await axios.get(`${url}/products`, {
          withCredentials: true,
        });
        if (res2.status === 200) {
          setProducts(res2.data ?? []);
          setHeroProducts(
            res2.data.filter((p: Product) =>
              p.collection.map((c) => c.toUpperCase()).includes("HERO")
            )
          );
          setFeaturedProducts(
            res2.data.filter((p: Product) =>
              p.collection.map((c) => c.toUpperCase()).includes("FEATURED")
            )
          );
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
        redirect("/");
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
    products,
    heroProducts,
    featuredProducts,
  };

  return (
    <ShopContext.Provider value={values}>
      <AdminContextProvider>{children}</AdminContextProvider>
    </ShopContext.Provider>
  );
};
