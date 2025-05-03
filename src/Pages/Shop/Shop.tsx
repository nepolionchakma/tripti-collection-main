import axios from "axios";
import { useEffect, useState } from "react";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        console.log(response.data, "response.data");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);
  console.log(products, "products");
  return <div className="h-screen">Shop</div>;
};

export default Shop;
