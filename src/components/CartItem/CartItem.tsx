import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import unknownProductImage from "../../assets/unknown-product-vector.jpg";
import { ICartItems } from "@/Pages/CartItems/CartItems";
import { Minus, Plus, Trash } from "lucide-react";
import { CartProduct } from "@/types/Types";
import { Link } from "react-router";

interface ICartItem {
  item: ICartItems;
  handleSelectOne: (product: CartProduct) => void;
}
function CartItem({ item, handleSelectOne }: ICartItem) {
  const handleRemoveItem = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = cartItems.filter(
      (item: ICartItems) => item.product_id !== item.product_id,
    );
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="flex gap-2" onClick={() => handleSelectOne(item)}>
      <input type="checkbox" name="one" id="one" />
      <div className="flex gap-2 border border-amber-200 rounded p-2 justify-between items-center hover:shadow-md transition-all duration-300 w-full">
        <div className="flex gap-2">
          <Avatar className="w-14 h-14 bg-white">
            <AvatarImage src={item.image || unknownProductImage} />
            <AvatarFallback>{item.title.slice(0, 3)}</AvatarFallback>
          </Avatar>
          <div>
            <Link
              to={`/product/${item.product_id}`}
              className="font-semibold cursor-pointer"
            >
              {item.title}
            </Link>
            <p>${item.price}</p>
            <div className="flex justify-between items-center">
              <Minus className="cursor-pointer border rounded px-1" />
              <span className="border rounded px-2">{item.quantity}</span>
              <Plus className="cursor-pointer border rounded px-1" />
            </div>
          </div>
        </div>
        <div>
          <Trash onClick={handleRemoveItem} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
export default CartItem;
