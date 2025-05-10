import { useAdminContext } from "@/context/Admin/AdminContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router";
import { menuData } from "../../Menu/MenuData.tsx";

const SidebarMenu = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useAdminContext();
  const searchParams = useLocation();

  return (
    <div className="relative">
      <div className="absolute top-0 -right-2 z-[60]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer p-1 border rounded-full bg-white"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={13} />
          ) : (
            <ChevronRight size={13} />
          )}
        </button>
      </div>
      <div>
        <div style={{ display: "flex", height: "100%" }}>
          <Sidebar
            collapsed={!isSidebarOpen}
            transitionDuration={1000}
            className="h-[calc(100vh-3rem)] text-[14px]"
          >
            <Menu>
              <Menu>
                {menuData.map((item) => (
                  <MenuItem
                    key={item.id}
                    component={<Link to={item.path}>{item.title}</Link>}
                    icon={item.icon}
                    className={`${
                      item.path === searchParams.pathname
                        ? "bg-amber-400 text-white font-bold"
                        : " "
                    }`}
                  >
                    {item.title}
                  </MenuItem>
                ))}
              </Menu>
            </Menu>
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
