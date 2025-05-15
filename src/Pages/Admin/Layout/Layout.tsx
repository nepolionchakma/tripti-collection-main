import Navigation from "@/components/Navigation/NavigationMenu";
import { Outlet } from "react-router";
import SidebarMenu from "../Components/Sidebar/SidebarMenu";

const Layout = () => {
  return (
    <div className=" ">
      <div>
        <nav className="sticky top-0 z-50 bg-white">
          <Navigation />
        </nav>
        <div className=" max-w-[1100px] mx-auto py-2 overflow-hidden ">
          {/* <Breadcurmbs /> */}
          <div className="flex gap-4 w-fit">
            <SidebarMenu />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
