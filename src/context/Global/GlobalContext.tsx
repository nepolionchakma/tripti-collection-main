import {
  CartProduct,
  IUser,
  Product,
  Collection,
  Category,
} from "@/types/Types";
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
import { API_BASE_URL } from "@/api/config";

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
  recentlyAddedProducts: Product[];
  collections: Collection[];
  categories: Category[];
}

const ShopContext = createContext({} as ShopContextType);

// eslint-disable-next-line react-refresh/only-export-components
export const useShopContext = () => {
  return useContext(ShopContext);
};

export const ShopContextProvider = ({ children }: ShopContextProps) => {
  const url = API_BASE_URL;

  const [selectedItem, setSelectedItem] = useState<Product>();
  const [count, setCount] = useState<number>(1);
  const [cart, setCart] = useState<CartProduct[]>(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") || "")
      : [],
  );
  const [wishlist, setWishlist] = useState<Product[]>(
    localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist") || "")
      : [],
  );
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [heroProducts, setHeroProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [recentlyAddedProducts, setRecentlyAddedProducts] = useState<Product[]>(
    [],
  );
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${url}/api/auth/me`, {
          withCredentials: true,
        });

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
  }, [url]);

  useEffect(() => {
    (async () => {
      // Products fetch
      const res2 = await axios.get(`${url}/api/products`, {
        withCredentials: true,
      });
      console.log(res2.data, "res2.data");
      if (res2.status === 200) {
        setProducts(res2.data ?? []);
        setHeroProducts(
          res2.data.filter((p: Product) =>
            p.sections.map((c) => c.toUpperCase()).includes("HERO"),
          ),
        );
        setFeaturedProducts(
          res2.data.filter((p: Product) =>
            p.sections.map((c) => c.toUpperCase()).includes("FEATURED"),
          ),
        );
        setRecentlyAddedProducts(
          res2.data.filter((p: Product) =>
            p.sections.map((c) => c.toUpperCase()).includes("RECENT"),
          ),
        );

        // Extract collections from all products and remove duplicates
        const allCollections = res2.data.flatMap(
          (product: Product) => product.collections,
        );
        const uniqueCollections = [...new Set(allCollections)];
        const sequence = [
          "ALL",
          "NEWEST",
          "TRENDING",
          "BEST SELLERS",
          "FEATURED",
        ];

        // Filter the unique collections based on the desired sequence
        const sortedCollections = sequence.filter((item) =>
          uniqueCollections.includes(item),
        );

        // Map to the desired format [{ id: 1, name: "NEWEST" }, ...]
        const collectionsWithIds: Collection[] = sortedCollections.map(
          (name, index) => ({
            collection_id: index + 1,
            collection_name: name,
          }),
        );
        // // Extract collections from all products
        // const allCollections: string[] = res2.data.flatMap(
        //   (product: Product) => product.collections
        // );

        // // Remove duplicates by converting to a Set and back to an array
        // const uniqueCollections: string[] = [...new Set(allCollections)];
        setCollections(collectionsWithIds);
      }
    })();
  }, [url]);

  useEffect(() => {
    (async () => {
      const [categories] = await Promise.all([
        axios.get(`${url}/api/products/categories`),
      ]);
      setCategories(categories.data);
    })();
  }, [url]);

  const logout = async () => {
    try {
      const res = await axios.get(`${url}/api/auth/logout`, {
        withCredentials: true,
      });
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
    recentlyAddedProducts,
    collections,
    categories,
  };

  return (
    <ShopContext.Provider value={values}>
      <AdminContextProvider>{children}</AdminContextProvider>
    </ShopContext.Provider>
  );
};
