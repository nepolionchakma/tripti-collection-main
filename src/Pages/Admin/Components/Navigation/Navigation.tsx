import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "/vite.svg";
import { Link, useLocation } from "react-router";
import {
  Contact,
  Feather,
  Home,
  Info,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Star,
  UserCircle,
} from "lucide-react";
import { useShopContext } from "@/context/Global/GlobalContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navigation = () => {
  const { cart, wishlist, user, logout } = useShopContext();
  const totalCart = cart.reduce((acc, item) => acc + item.quantity, 0);
  const searchParams = useLocation();
  console.log(searchParams, "searchParams");
  const menus = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={16} />,
    },
    {
      name: "Shop",
      path: "/shop",
      icon: <ShoppingBag size={16} />,
    },
    {
      name: "Features",
      path: "/features",
      icon: <Feather size={16} />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <Contact size={16} />,
    },
    {
      name: "About",
      path: "/about",
      icon: <Info size={16} />,
    },
  ];
  return (
    <div className="flex justify-between items-center border-b shadow px-9 py-2 w-full">
      <div className="flex gap-3 items-center">
        <div className="md:hidden ">
          <Popover>
            <PopoverTrigger className="flex items-center">
              <Menu className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="ml-2 w-40">
              <div className=" ">
                {menus.map((menu) => (
                  <Link
                    key={menu.name}
                    to={menu.path}
                    className={`flex items-center gap-2 hover:text-amber-400 duration-300 hover:ml-1 ${
                      searchParams.pathname === menu.path
                        ? "text-amber-400"
                        : ""
                    }`}
                  >
                    <span className="inline-block">{menu.icon}</span>
                    <span>{menu.name}</span>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Avatar>
          <AvatarImage src={Logo} className="w-5" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="uppercase md:flex lg:*:flex gap-4 hidden">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            to={menu.path}
            className={`hover:text-amber-400 hover:underline duration-300 ${
              searchParams.pathname === menu.path ? "text-amber-400" : ""
            }`}
          >
            {menu.name}
          </Link>
        ))}
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
                <Avatar className="w-6 h-6 bg-white">
                  <AvatarImage src={user.picture} />
                  <AvatarFallback>
                    {user.first_name.slice(0, 1)}
                    {user.last_name.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-2 w-60">
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
