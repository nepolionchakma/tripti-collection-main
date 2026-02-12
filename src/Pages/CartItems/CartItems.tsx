import CartItem from "@/components/CartItem/CartItem";
import { CartProduct } from "@/types/Types";
import { ShoppingCart } from "lucide-react";

export interface ICartItems {
  user_id: number;
  product_id: number;
  title: string;
  quantity: number;
  price: number;
  sizes: {
    size_name: string;
    quantity: number;
  }[];
  image: string;
}

function CartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  console.log(cartItems);
  const handleSelectAll = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = cartItems.map((item: ICartItems) => item.product_id);
    localStorage.setItem("cart-checkout", JSON.stringify(newCart));
  };
  const handleSelectOne = (product: CartProduct) => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = cartItems.map((item: ICartItems) => item.product_id);
    localStorage.setItem("cart-checkout", JSON.stringify(newCart));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-4 border overflow-y-auto scrollbar-thin p-4">
        <div className="flex flex-col gap-2 col-span-2">
          <div className="flex items-center gap-2 bg-amber-200 p-2">
            <ShoppingCart />
            <h1>Cart Items</h1>
            <h1>{cartItems?.length}</h1>
            <h1>
              {cartItems
                ?.map((item: ICartItems) => item.price)
                .reduce((a: number, b: number) => a + b, 0)}
            </h1>
            <h1>
              {cartItems
                ?.map((item: ICartItems) => item.quantity)
                .reduce((a: number, b: number) => a + b, 0)}
            </h1>
          </div>
          <div className="flex items-center gap-2" onClick={handleSelectAll}>
            <input type="checkbox" name="all" id="all" />
            <label htmlFor="all">Select All</label>
          </div>
          {cartItems?.map((item: ICartItems) => (
            <CartItem
              key={item.product_id}
              item={item}
              handleSelectOne={handleSelectOne}
            />
          ))}
          {cartItems?.length === 0 && <p>No items in cart</p>}
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <div className="flex items-center gap-2 bg-amber-200 p-2">
            <h4>Price Details</h4>
          </div>

          <div className="flex flex-col gap-2 p-2">
            <div className="flex justify-between items-center">
              <h4>Subtotal</h4>
              <h4>${cartItems?.length}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h4>Ecom Discount</h4>
              <h4>${cartItems?.length}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h4>Delivery Charge</h4>
              <h4>${cartItems?.length}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h4>Grand Total</h4>
              <h4>${cartItems?.length}</h4>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <button className="bg-amber-200 hover:bg-amber-300 text-white border px-1 rounded cursor-pointer">
              Continue Shopping
            </button>
            <button className="bg-amber-400 hover:bg-amber-500 text-white border px-1 rounded cursor-pointer">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartItems;
