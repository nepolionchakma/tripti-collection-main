import Navigation from "@/components/navigation/Navigation";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="mx-auto">
      <div>
        <nav className="sticky top-0 z-50 bg-white">
          <Navigation />
        </nav>
        <div className="w-[1100px] mx-auto py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
