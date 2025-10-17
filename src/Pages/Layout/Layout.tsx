import Navigation from "@/components/Navigation/NavigationMenu";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className=" ">
      <div>
        <nav className="sticky top-0 bg-white z-50 border-b">
          <Navigation />
        </nav>
        <div className="max-w-[1100px] mx-auto py-2 overflow-y h-[calc(100vh-3.1rem)] overflow-y-auto scrollbar-thin">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
