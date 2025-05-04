import { useAdminContext } from "@/context/Admin/AdminContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const SidebarMenu = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useAdminContext();
  return (
    <div className="relative">
      <div className="absolute top-0 -right-2 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer z-50 p-1 border rounded-full bg-white"
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
            className="h-[calc(100vh-3rem)] text-[14px] z-40"
          >
            <Menu>
              <Menu>
                <SubMenu label="Charts">
                  <MenuItem> Pie charts</MenuItem>
                  <MenuItem> Line charts</MenuItem>
                  <MenuItem> Bar charts</MenuItem>
                </SubMenu>
                <SubMenu label="Maps">
                  <MenuItem> Google maps</MenuItem>
                  <MenuItem> Open street maps</MenuItem>
                </SubMenu>
                <SubMenu label="Theme">
                  <MenuItem> Dark</MenuItem>
                  <MenuItem> Light</MenuItem>
                </SubMenu>
              </Menu>
            </Menu>
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
