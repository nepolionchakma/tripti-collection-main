import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "/vite.svg";
import { Link } from "react-router";
import {
  LogOut,
  Search,
  Settings,
  ShoppingCart,
  Star,
  UserCircle,
} from "lucide-react";
import { useShopContext } from "@/context/Context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navigation = () => {
  const { cart, wishlist, user, logout } = useShopContext();
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
        {user ? (
          <Popover>
            <PopoverTrigger>
              <div className="bg-slate-200 p-1 rounded-full cursor-pointer hover:bg-amber-200">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={user?.picture} />
                  <AvatarFallback>
                    {user?.first_name.slice(0, 1)}
                    {user?.last_name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-2">
              <div className="flex flex-col gap-2">
                <Link
                  to="/profile"
                  className="flex gap-2 items-center hover:bg-amber-200 px-2 rounded-md duration-300"
                >
                  <UserCircle size={18} />
                  <h5>Profile</h5>
                </Link>
                <button
                  disabled
                  className="flex gap-2 items-center hover:bg-amber-200 px-2 rounded-md duration-300 cursor-not-allowed"
                >
                  <Settings size={18} />
                  <h5>Settings</h5>
                </button>
                <button
                  className="flex gap-2 items-center bg-amber-400 hover:bg-amber-500 text-white px-2 rounded-md duration-300 cursor-pointer"
                  onClick={logout}
                >
                  <LogOut size={18} />
                  <h5>Logout</h5>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            to="/login"
            className="bg-amber-400 hover:bg-amber-500 text-white border px-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;
