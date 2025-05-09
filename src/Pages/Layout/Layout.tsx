import Navigation from "@/components/Navigation/NavigationMenu";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className=" ">
      <div>
        <nav className="sticky top-0 bg-white z-50">
          <Navigation />
        </nav>
        <div className="full max-w-[1100px] mx-auto py-2 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
