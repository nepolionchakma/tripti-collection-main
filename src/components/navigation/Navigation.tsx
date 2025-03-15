import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "/vite.svg";
import { Link } from "react-router";
import { CircleUserRound, Search, ShoppingCart, Star } from "lucide-react";
import { useShopContext } from "@/context/Context";
const Navigation = () => {
  const { cart, wishlist } = useShopContext();
  const totalCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="flex justify-between items-center border-b shadow px-9 py-2">
      <div>
        <Avatar>
          <AvatarImage src={Logo} className="w-5" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="uppercase flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/features">Features</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="flex gap-3 items-center">
        <div className="bg-slate-200 p-1 rounded-full cursor-pointer">
          <Search size={18} />
        </div>
        <div className="bg-slate-200 p-1 rounded-full cursor-pointer relative">
          <ShoppingCart size={18} />
          {cart.length > 0 && (
            <span className="absolute -top-3 -right-1 rounded-full bg-amber-400 w-5 h-5 flex items-center justify-center font-semibold">
              {totalCart}
            </span>
          )}
        </div>
        <div className="bg-slate-200 p-1 rounded-full cursor-pointer relative">
          <Star size={18} />
          {wishlist.length > 0 && (
            <span className="absolute -top-3 -right-1 rounded-full bg-amber-400 w-5 h-5 flex items-center justify-center font-semibold">
              {wishlist.length}
            </span>
          )}
        </div>
        <div className="bg-slate-200 p-1 rounded-full cursor-pointer">
          <CircleUserRound size={18} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
