import Navigation from "@/components/Navigation/NavigationMenu";
import { Outlet } from "react-router";
import SidebarMenu from "../Components/Sidebar/SidebarMenu";
import { useAdminContext } from "@/context/Admin/AdminContext";

const Layout = () => {
  const { isSidebarOpen } = useAdminContext();
  return (
    <div className=" ">
      <div>
        <nav className="sticky top-0 z-50 bg-white">
          <Navigation />
        </nav>

        <div className="flex gap-4">
          <SidebarMenu />
          <div
            className={
              isSidebarOpen
                ? "w-[calc(100vw-19rem)] min-h-[calc(100vh-4rem)] duration-1000"
                : "w-[calc(100vw-8rem)] min-h-[calc(100vh-4rem)] duration-1000"
            }
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
