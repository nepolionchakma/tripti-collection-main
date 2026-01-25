import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/NavigationMenu";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="h-screen overflow-y-auto scrollbar-thin">
      <nav className="sticky top-0 bg-white z-50 border-b">
        <Navigation />
      </nav>
      <div className="flex-1">
        <div className="max-w-[1100px] mx-auto py-2 px-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

// return (
//   <div className="h-screen flex flex-col">
//     <nav className="sticky top-0 bg-white z-50 border-b">
//       <Navigation />
//     </nav>
//     <div className="flex-1 overflow-y-auto scrollbar-thin">
//       <div className="max-w-[1100px] mx-auto py-2 px-4">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   </div>
// );
