import { Link, useLocation } from "react-router";
import { convertToTitleDictionary } from "./Services/Services";
import { ChevronRight } from "lucide-react";

const Breadcurmbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div className="sticky top-0 overflow-hidden z-10 bg-white mb-2 border-b-2">
      {/* <div className="py-2 sticky top-[7.9%] backdrop-blur-xl overflow-hidden"> */}
      <nav>
        <ul className="flex ">
          <li className="text-blue-500 underline font-bold ">
            <Link to="/" className="flex gap-1">
              <span>Home</span>
            </Link>
          </li>
          {pathnames.map((value: string, index: number) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const title = convertToTitleDictionary(value);
            return (
              <li key={to} className="flex">
                <span className="mx-2">
                  <ChevronRight />
                </span>
                {last ? (
                  <span>{title}</span>
                ) : (
                  <span>{title}</span>
                  // <Link to={to} className="text-url">
                  //   {title}
                  // </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
export default Breadcurmbs;
