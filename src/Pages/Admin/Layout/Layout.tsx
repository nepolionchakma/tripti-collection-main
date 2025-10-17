import Navigation from "@/components/Navigation/NavigationMenu";
import { Outlet } from "react-router";
import SidebarMenu from "../Components/Sidebar/SidebarMenu";
import { useAdminContext } from "@/Pages/Admin/Contexts/Admin/AdminContext";

const Layout = () => {
  const { isSidebarOpen } = useAdminContext();
  return (
    <div className=" ">
      <div>
        <nav className="border-b sticky top-0 z-50 bg-white">
          <Navigation />
        </nav>

        <div className="flex gap-4 max-w-[1100px] mx-auto">
          <SidebarMenu />
          <div
            className={
              isSidebarOpen
                ? "w-[calc(101vw-11.2rem)] min-h-[calc(100vh-4rem)] duration-1000"
                : "w-[calc(101vw-3.5rem)] min-h-[calc(100vh-4rem)] duration-1000"
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
